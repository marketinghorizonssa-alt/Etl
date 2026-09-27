<?php
$target = $argv[1] ?? '';
if (!$target || !is_file($target)) { fwrite(STDERR, "target missing\n"); exit(2); }
$s = file_get_contents($target);
if (strpos($s, "const VERSION = '1.0.1';") !== false) { echo "already patched\n"; exit(0); }
$backup = $target . '.bak-1.0.0-' . gmdate('YmdHis');
if (!copy($target, $backup)) { fwrite(STDERR, "backup failed\n"); exit(3); }

function repl1($pattern, $replacement, $text, $label) {
  $count = 0;
  $out = preg_replace_callback($pattern, function() use ($replacement) { return $replacement; }, $text, 1, $count);
  if ($out === null || $count !== 1) { fwrite(STDERR, "patch failed: $label count=$count\n"); exit(4); }
  return $out;
}

$s = str_replace("const VERSION = '1.0.0';", "const VERSION = '1.0.1';", $s, $n1);
if ($n1 !== 1) { fwrite(STDERR, "version patch failed\n"); exit(5); }

$needle = "const MCP_ACCESS_TOKEN = String(process.env.MCP_ACCESS_TOKEN || '').trim();";
$add = $needle . "\nconst PUBLIC_BASE_URL = String(process.env.MCP_PUBLIC_URL || 'https://palegreen-gull-523362.hostingersite.com').replace(/\\\/$/, '');\nconst transferStore = new Map();";
$s = str_replace($needle, $add, $s, $n2);
if ($n2 !== 1) { fwrite(STDERR, "constant patch failed\n"); exit(6); }

$upload = <<<'JS'
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
  const url = `${PUBLIC_BASE_URL}/_t/${token}`;
  try {
    await runShell(site, `curl -fsSL -o ${shellQuote(dest)} ${shellQuote(url)}`);
    return { path: dest, bytes: bytes.length, transport: 'cron-curl' };
  } finally {
    transferStore.delete(token);
  }
}

async function uploadBytes(site, relPath, bytes) {
  const dest = normalizeRel(relPath);
  try {
    const creds = await generateUpload(site);
    const uploadUrl = String(creds?.url || '').replace(/\/$/, '');
    const authKey = creds?.auth_key;
    const restKey = creds?.rest_auth_key;
    if (!uploadUrl || !authKey || !restKey) throw new Error('Hostinger did not return valid upload credentials.');
    const target = `${uploadUrl}/${dest.split('/').map(encodeURIComponent).join('/')}?override=true`;
    const common = {
      'X-Auth': authKey,
      'X-Auth-Rest': restKey,
      'Tus-Resumable': '1.0.0',
    };
    const createRes = await fetch(target, {
      method: 'POST',
      headers: { ...common, 'Upload-Length': String(bytes.length), 'Upload-Offset': '0' },
      body: '',
    });
    if (createRes.status !== 201) throw new Error(`TUS create failed (${createRes.status}): ${await createRes.text()}`);
    const location = createRes.headers.get('location');
    const patchTarget = location ? new URL(location, target).toString() : target;
    const patchRes = await fetch(patchTarget, {
      method: 'PATCH',
      headers: { ...common, 'Content-Type': 'application/offset+octet-stream', 'Upload-Offset': '0' },
      body: bytes,
    });
    if (patchRes.status !== 204) throw new Error(`TUS upload failed (${patchRes.status}): ${await patchRes.text()}`);
    return { path: dest, bytes: bytes.length, upload_offset: patchRes.headers.get('upload-offset'), transport: 'tus' };
  } catch (error) {
    console.warn(`[FullFS] TUS unavailable for ${site.domain}; using cron-curl fallback: ${error?.message || error}`);
    return uploadBytesViaCron(site, dest, bytes);
  }
}

async function createCron
JS;
$s = repl1('~async function uploadBytes\\(site, relPath, bytes\\) \\{.*?\\n\\}\\n\\nasync function createCron~s', $upload, $s, 'upload');

$s = str_replace(
  "if (command.length > 240) throw new Error(`Filesystem command is too long for Hostinger cron transport (${command.length}/240). Use shorter paths or a direct upload tool.`);",
  "if (command.length > 250) throw new Error(`Filesystem command is too long for Hostinger cron transport (${command.length}/250).`);",
  $s,
  $n3
);
if ($n3 !== 1) { fwrite(STDERR, "cron limit patch failed\n"); exit(7); }

$run = <<<'JS'
async function runShell(site, shell) {
  const marker = `R${crypto.randomBytes(2).toString('hex')}`;
  const root = shortRoot(site);
  const rootExpr = root.startsWith('~') ? root : shellQuote(root);
  const command = `cd ${rootExpr}&&(${shell});printf '${marker}%s' $?`;
  const created = await createCron(site, command);
  const uid = created?.uid;
  if (!uid) throw new Error('Hostinger did not return a cron uid.');
  try {
    const deadline = Date.now() + 90000;
    while (Date.now() < deadline) {
      await sleep(2000);
      const payload = await getCronOutput(site, uid);
      const output = String(payload?.output || '');
      const m = output.match(new RegExp(`${marker}(\\d+)`));
      if (m) {
        const code = Number(m[1]);
        const clean = output.replace(new RegExp(`${marker}\\d+\\s*$`), '');
        if (code !== 0) throw new Error(`Filesystem command failed with exit code ${code}: ${clean}`);
        return clean;
      }
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
$s = repl1('~async function runShell\\(site, shell\\) \\{.*?\\n\\}\\n\\nfunction backupName\\(rel\\) \\{.*?\\n\\}\\n\\nasync function backupIfExists\\(site, rel\\) \\{.*?\\n\\}\\n~s', $run, $s, 'runShell');

$s = str_replace("const listing = await fsList(site, '.', 0, 20, 0);", "const listing = await fsList(site, '.', 1, 20, 0);", $s, $n4);
if ($n4 !== 1) { fwrite(STDERR, "status patch failed\n"); exit(8); }

$s = str_replace("max_depth: { type: 'integer', minimum: 0, maximum: 12, default: 6 }", "max_depth: { type: 'integer', minimum: 1, maximum: 10, default: 6 }", $s, $n5);
if ($n5 !== 1) { fwrite(STDERR, "find schema patch failed\n"); exit(9); }

$s = str_replace("const listing = await fsList(site, args.path || '.', args.max_depth ?? 6, Math.min(args.limit ?? 200, 1000), 0);", "const listing = await fsList(site, args.path || '.', Math.max(1, Math.min(10, args.max_depth ?? 6)), Math.min(args.limit ?? 200, 1000), 0);", $s, $n6);
if ($n6 !== 1) { fwrite(STDERR, "find call patch failed\n"); exit(10); }

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
$health = "app.get('/health', (_req, res) => res.json({";
$pos = strpos($s, $health);
if ($pos === false) { fwrite(STDERR, "health insertion point missing\n"); exit(11); }
$s = substr($s, 0, $pos) . $route . substr($s, $pos);

if (file_put_contents($target, $s) === false) { fwrite(STDERR, "write failed\n"); exit(12); }
echo "patched $target backup=$backup\n";
?>