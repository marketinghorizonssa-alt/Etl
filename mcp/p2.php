<?php
$target = $argv[1] ?? '';
if (!$target || !is_file($target)) { fwrite(STDERR, "target missing\n"); exit(2); }
$s = file_get_contents($target);
if (strpos($s, "const VERSION = '1.0.1';") !== false) { echo "already patched\n"; exit(0); }
$backup = $target . '.pre-fullfs-fix.bak';
if (!is_file($backup) && !copy($target, $backup)) { fwrite(STDERR, "backup failed\n"); exit(3); }

function rep_once($s, $old, $new, $label) {
  $pos = strpos($s, $old);
  if ($pos === false) { fwrite(STDERR, "missing: $label\n"); exit(10); }
  if (strpos($s, $old, $pos + 1) !== false) { fwrite(STDERR, "duplicate: $label\n"); exit(11); }
  return substr($s, 0, $pos) . $new . substr($s, $pos + strlen($old));
}

$s = rep_once($s, "const VERSION = '1.0.0';", "const VERSION = '1.0.1';", 'version');
$needle = "const MCP_ACCESS_TOKEN = String(process.env.MCP_ACCESS_TOKEN || '').trim();";
$add = $needle . "\nconst PUBLIC_BASE_URL = String(process.env.MCP_PUBLIC_URL || 'https://palegreen-gull-523362.hostingersite.com').replace(/\\\/$/, '');\nconst transferStore = new Map();";
$s = rep_once($s, $needle, $add, 'constants');

$s = rep_once($s, "async function uploadBytes(site, relPath, bytes) {", "async function uploadBytesTus(site, relPath, bytes) {", 'upload rename');
$s = rep_once($s, "async function runShell(site, shell) {", "async function runShellOld(site, shell) {", 'runshell rename');
$s = rep_once($s, "function backupName(rel) {", "function backupNameOld(rel) {", 'backupname rename');
$s = rep_once($s, "async function backupIfExists(site, rel) {", "async function backupIfExistsOld(site, rel) {", 'backupif rename');

$insertUpload = <<<'JS'
function shortRoot(site) {
  const prefix = `/home/${site.username}`;
  if (String(site.root || '').startsWith(prefix)) return `~${site.root.slice(prefix.length)}`;
  return site.root;
}

async function uploadBytesViaCron(site, relPath, bytes) {
  const dest = normalizeRel(relPath);
  const parent = path.posix.dirname(dest);
  if (parent && parent !== '.') await runShell(site, `mkdir -p ${shellQuote(parent)}`);
  const token = crypto.randomBytes(10).toString('hex');
  transferStore.set(token, { bytes: Buffer.from(bytes), expires: Date.now() + 180000 });
  const timer = setTimeout(() => transferStore.delete(token), 180000);
  timer.unref?.();
  try {
    const url = `${PUBLIC_BASE_URL}/_t/${token}`;
    await runShell(site, `curl -fsSL -o ${shellQuote(dest)} ${shellQuote(url)}`);
    return { path: dest, bytes: bytes.length, transport: 'cron-curl' };
  } finally {
    transferStore.delete(token);
  }
}

async function uploadBytes(site, relPath, bytes) {
  try {
    return await uploadBytesTus(site, relPath, bytes);
  } catch (error) {
    console.warn(`[FullFS] TUS unavailable for ${site.domain}; using cron-curl fallback: ${error?.message || error}`);
    return uploadBytesViaCron(site, relPath, bytes);
  }
}

JS;
$s = rep_once($s, "async function createCron(site, command) {", $insertUpload . "async function createCron(site, command) {", 'upload insert');

$oldLimit = "if (command.length > 240) throw new Error(\`Filesystem command is too long for Hostinger cron transport (\${command.length}/240). Use shorter paths or a direct upload tool.\`);";
$newLimit = "if (command.length > 250) throw new Error(\`Filesystem command is too long for Hostinger cron transport (\${command.length}/250).\`);";
$s = rep_once($s, $oldLimit, $newLimit, 'cron limit');

$insertRun = <<<'JS'
async function runShell(site, shell) {
  const marker = `R${crypto.randomBytes(2).toString('hex')}`;
  const root = shortRoot(site);
  const rootExpr = root.startsWith('~') ? root : shellQuote(root);
  const command = `cd ${rootExpr}&&(${shell})&&echo ${marker}0||echo ${marker}1`;
  const created = await createCron(site, command);
  const uid = created?.uid;
  if (!uid) throw new Error('Hostinger did not return a cron uid.');
  try {
    const deadline = Date.now() + 90000;
    while (Date.now() < deadline) {
      await sleep(2000);
      const payload = await getCronOutput(site, uid);
      const output = String(payload?.output || '');
      if (output.includes(`${marker}0`)) return output.replace(`${marker}0`, '').trimEnd();
      if (output.includes(`${marker}1`)) throw new Error(`Filesystem command failed: ${output.replace(`${marker}1`, '').trim()}`);
    }
    throw new Error('Timed out waiting for Hostinger cron filesystem command.');
  } finally {
    await deleteCron(site, uid);
  }
}

function backupName(_rel) {
  return `.horizons-mcp-backups/${Date.now().toString(36)}-${crypto.randomBytes(2).toString('hex')}`;
}

async function backupIfExists(site, rel) {
  const p = normalizeRel(rel);
  const b = backupName(p);
  await runShell(site, 'mkdir -p .horizons-mcp-backups');
  await runShell(site, `[ ! -e ${shellQuote(p)} ]||cp -a ${shellQuote(p)} ${shellQuote(b)}`);
  return b;
}

JS;
$s = rep_once($s, "const fsTools = [", $insertRun . "const fsTools = [", 'run insert');

$s = rep_once($s, "const listing = await fsList(site, '.', 0, 20, 0);", "const listing = await fsList(site, '.', 1, 20, 0);", 'status depth');
$s = str_replace("maximum: 12", "maximum: 10", $s);
$s = rep_once($s, "if (name === 'hostinger_fs_list') return textResult(await fsList(site, args.path || '.', args.max_depth ?? 1, args.limit ?? 500, args.offset ?? 0));", "if (name === 'hostinger_fs_list') return textResult(await fsList(site, args.path || '.', Math.max(1, Math.min(10, args.max_depth ?? 1)), args.limit ?? 500, args.offset ?? 0));", 'list clamp');
$s = rep_once($s, "const listing = await fsList(site, args.path || '.', args.max_depth ?? 6, Math.min(args.limit ?? 200, 1000), 0);", "const listing = await fsList(site, args.path || '.', Math.max(1, Math.min(10, args.max_depth ?? 6)), Math.min(args.limit ?? 200, 1000), 0);", 'find clamp');

$route = <<<'JS'
app.get('/_t/:token', (req, res) => {
  const token = String(req.params.token || '');
  const item = transferStore.get(token);
  if (!item || item.expires < Date.now()) {
    if (item) transferStore.delete(token);
    return res.sendStatus(404);
  }
  res.setHeader('Cache-Control', 'no-store');
  res.setHeader('Content-Type', 'application/octet-stream');
  res.send(item.bytes);
});

JS;
$s = rep_once($s, "app.get('/health', (_req, res) => res.json({", $route . "app.get('/health', (_req, res) => res.json({", 'transfer route');

if (file_put_contents($target, $s) === false) { fwrite(STDERR, "write failed\n"); exit(20); }
echo "patched\n";
?>