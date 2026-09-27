import crypto from 'node:crypto';

const WRITE_LIMIT = 8 * 1024 * 1024;
const AGENT_VERSION = '1.0.0';
const TOOL_PREFIX = 'hostinger_';

function fsTool(name, description, properties, required = []) {
  return {
    name: TOOL_PREFIX + name,
    description,
    inputSchema: {
      type: 'object',
      properties: {
        domain: { type: 'string', description: 'Target website or subdomain. Files are scoped to its document root.' },
        ...properties,
        hostinger_account: { type: 'string', description: 'Optional Hostinger account selector. Normally omit; the bridge auto-routes from domain.' },
      },
      required: ['domain', ...required],
      additionalProperties: false,
    },
  };
}

const tools = [
  fsTool('scope_status', 'Verify filesystem scope and direct read/write agent availability for a Hostinger website.', {}, []),
  fsTool('fs_list', 'List files and directories under the selected website root.', {
    path: { type: 'string', description: 'Relative path. Default: .' },
    recursive: { type: 'boolean', description: 'Recursively list children. Default false.' },
    max_depth: { type: 'integer', minimum: 0, maximum: 12 },
    limit: { type: 'integer', minimum: 1, maximum: 3000 },
  }),
  fsTool('fs_stat', 'Get file or directory metadata and SHA-256 for files.', {
    path: { type: 'string' },
  }, ['path']),
  fsTool('fs_read', 'Read a text or binary file. Binary content can be returned as base64.', {
    path: { type: 'string' },
    encoding: { type: 'string', enum: ['utf8', 'base64'] },
    offset: { type: 'integer', minimum: 0 },
    length: { type: 'integer', minimum: 1, maximum: WRITE_LIMIT },
  }, ['path']),
  fsTool('fs_write', 'Create or replace a text/binary file using an atomic write and automatic backup.', {
    path: { type: 'string' },
    content: { type: 'string' },
    encoding: { type: 'string', enum: ['utf8', 'base64'] },
    expected_sha256: { type: 'string' },
  }, ['path', 'content']),
  fsTool('fs_patch_text', 'Apply exact text replacements to a UTF-8 file with optional SHA-256 optimistic locking and automatic backup.', {
    path: { type: 'string' },
    expected_sha256: { type: 'string' },
    replacements: {
      type: 'array', minItems: 1, maxItems: 100,
      items: {
        type: 'object',
        properties: {
          search: { type: 'string' },
          replace: { type: 'string' },
          all: { type: 'boolean' },
        },
        required: ['search', 'replace'],
        additionalProperties: false,
      },
    },
  }, ['path', 'replacements']),
  fsTool('fs_mkdir', 'Create a directory recursively.', {
    path: { type: 'string' },
  }, ['path']),
  fsTool('fs_copy', 'Copy a file inside the selected website root. Existing destination is backed up first when overwrite=true.', {
    source: { type: 'string' },
    destination: { type: 'string' },
    overwrite: { type: 'boolean' },
  }, ['source', 'destination']),
  fsTool('fs_move', 'Move or rename a file/directory inside the selected website root.', {
    source: { type: 'string' },
    destination: { type: 'string' },
    overwrite: { type: 'boolean' },
  }, ['source', 'destination']),
  fsTool('fs_delete', 'Delete a file or directory. File backup is attempted first. Requires confirm=true.', {
    path: { type: 'string' },
    recursive: { type: 'boolean' },
    confirm: { type: 'boolean' },
  }, ['path', 'confirm']),
  fsTool('download_to_file', 'Download a public HTTPS URL directly into the selected website root. Private/local network URLs are blocked.', {
    url: { type: 'string' },
    path: { type: 'string' },
    expected_sha256: { type: 'string' },
  }, ['url', 'path']),
  fsTool('extract_zip', 'Extract a ZIP already stored under the selected website root. Zip-slip paths are blocked.', {
    zip_path: { type: 'string' },
    destination: { type: 'string' },
    overwrite: { type: 'boolean' },
    strip_single_root: { type: 'boolean' },
  }, ['zip_path', 'destination']),
  fsTool('fs_find', 'Search files/directories by name and optionally search UTF-8 file contents.', {
    path: { type: 'string' },
    name_contains: { type: 'string' },
    extension: { type: 'string' },
    content_contains: { type: 'string' },
    max_depth: { type: 'integer', minimum: 0, maximum: 16 },
    limit: { type: 'integer', minimum: 1, maximum: 2000 },
  }),
  fsTool('fs_read_many', 'Read several files from the selected website root in one call.', {
    paths: { type: 'array', minItems: 1, maxItems: 50, items: { type: 'string' } },
    encoding: { type: 'string', enum: ['utf8', 'base64'] },
    max_bytes_each: { type: 'integer', minimum: 1, maximum: 2097152 },
  }, ['paths']),
  fsTool('fs_chmod', 'Change POSIX permissions for a file or directory. Example mode: 644 or 755.', {
    path: { type: 'string' },
    mode: { type: 'string', pattern: '^[0-7]{3,4}$' },
  }, ['path', 'mode']),
  fsTool('fs_zip', 'Create a ZIP archive from a file or directory and save it under the selected website root.', {
    source: { type: 'string' },
    destination_zip: { type: 'string' },
    overwrite: { type: 'boolean' },
  }, ['source', 'destination_zip']),
  fsTool('backup_list', 'List automatic MCP filesystem backups for the selected hosting user.', {
    path: { type: 'string' },
    recursive: { type: 'boolean' },
    max_depth: { type: 'integer', minimum: 0, maximum: 12 },
    limit: { type: 'integer', minimum: 1, maximum: 3000 },
  }),
  fsTool('backup_restore', 'Restore a file from an automatic MCP backup into the selected website root. Requires confirm=true.', {
    backup_path: { type: 'string' },
    destination: { type: 'string' },
    overwrite: { type: 'boolean' },
    confirm: { type: 'boolean' },
  }, ['backup_path', 'destination', 'confirm']),
];

function extractTextJson(result) {
  const block = result && result.content && result.content.find && result.content.find((x) => x && x.type === 'text' && typeof x.text === 'string');
  if (!block) return null;
  try { return JSON.parse(block.text); } catch { return null; }
}

function cleanDomain(value) {
  const d = String(value || '').trim().toLowerCase().replace(/^https?:\/\//, '').replace(/\/.*$/, '');
  if (!d || !/^[a-z0-9.-]+$/.test(d)) throw new Error('Invalid domain');
  return d;
}

function normalizeRelative(value, allowDot = true) {
  const raw = String(value === undefined || value === null ? '.' : value).replace(/\\/g, '/').trim();
  if (raw.includes('\0') || raw.startsWith('/')) throw new Error('Path must be relative to the website root');
  const parts = raw.split('/').filter((x) => x && x !== '.');
  if (parts.some((x) => x === '..')) throw new Error('Path traversal is not allowed');
  const out = parts.join('/');
  return out || (allowDot ? '.' : '');
}

function accountSecret(account, username) {
  return crypto.createHash('sha256').update('horizons-hostinger-fs-v1\n' + username + '\n' + account.token).digest('hex');
}

function agentFilename(secret) {
  return '.horizons-fs-' + secret.slice(0, 16) + '.php';
}

function phpQuote(value) {
  return String(value).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
}

function buildAgentPhp(secret, username) {
  const baseDomains = '/home/' + username + '/domains';
  const backupRoot = '/home/' + username + '/.horizons-mcp-backups';
  return String.raw`<?php
declare(strict_types=1);
header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');
const AGENT_VERSION = '1.0.0';
const MAX_BYTES = 8388608;
$SECRET = '${phpQuote(secret)}';
$BASE_DOMAINS = '${phpQuote(baseDomains)}';
$BACKUP_ROOT = '${phpQuote(backupRoot)}';

function fail_json(string $m, int $code=400): void { http_response_code($code); echo json_encode(['ok'=>false,'error'=>$m], JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE); exit; }
function ok_json($v): void { echo json_encode(['ok'=>true,'data'=>$v], JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE); exit; }
$token = $_SERVER['HTTP_X_HORIZONS_FS_TOKEN'] ?? '';
if (!is_string($token) || !hash_equals($SECRET, $token)) { http_response_code(404); exit; }
if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') fail_json('POST required', 405);
$body = json_decode((string)file_get_contents('php://input'), true);
if (!is_array($body)) fail_json('Invalid JSON');
$op = (string)($body['op'] ?? '');
$rootInput = (string)($body['root'] ?? '');
$root = realpath($rootInput);
$base = realpath($BASE_DOMAINS);
if ($root === false || $base === false || ($root !== $base && strpos($root, $base . DIRECTORY_SEPARATOR) !== 0)) fail_json('Invalid root');
if (!is_dir($BACKUP_ROOT) && !@mkdir($BACKUP_ROOT, 0700, true) && !is_dir($BACKUP_ROOT)) fail_json('Cannot create backup directory', 500);

function rel_clean($p, bool $dot=true): string {
  $p = str_replace('\\', '/', trim((string)$p));
  if ($p === '' || $p === '.') return $dot ? '.' : '';
  if ($p[0] === '/' || strpos($p, "\0") !== false) fail_json('Absolute or invalid path');
  $out = [];
  foreach (explode('/', $p) as $part) {
    if ($part === '' || $part === '.') continue;
    if ($part === '..') fail_json('Path traversal blocked');
    $out[] = $part;
  }
  return count($out) ? implode('/', $out) : ($dot ? '.' : '');
}
function within(string $base, string $candidate): bool { return $candidate === $base || strpos($candidate, $base . DIRECTORY_SEPARATOR) === 0; }
function target_path(string $root, $rel, bool $existing=false): string {
  $rel = rel_clean($rel);
  $candidate = $rel === '.' ? $root : $root . DIRECTORY_SEPARATOR . str_replace('/', DIRECTORY_SEPARATOR, $rel);
  if ($existing) {
    $real = realpath($candidate);
    if ($real === false || !within($root, $real)) fail_json('Path not found or outside root', 404);
    if (is_link($candidate)) fail_json('Symlinks are not allowed');
    return $real;
  }
  $parent = dirname($candidate);
  if (!is_dir($parent) && !@mkdir($parent, 0755, true) && !is_dir($parent)) fail_json('Cannot create parent directory', 500);
  $parentReal = realpath($parent);
  if ($parentReal === false || !within($root, $parentReal)) fail_json('Destination outside root');
  return $parentReal . DIRECTORY_SEPARATOR . basename($candidate);
}
function rel_from(string $base, string $p): string {
  if ($p === $base) return '.';
  return str_replace(DIRECTORY_SEPARATOR, '/', substr($p, strlen($base) + 1));
}
function file_sha(string $p): ?string { return is_file($p) ? hash_file('sha256', $p) : null; }
function backup_file(string $root, string $p, string $backupRoot): ?string {
  if (!is_file($p) || is_link($p)) return null;
  $rel = rel_from($root, $p);
  $stamp = gmdate('Ymd_His') . '_' . bin2hex(random_bytes(3));
  $dir = $backupRoot . DIRECTORY_SEPARATOR . substr(hash('sha256', $root), 0, 16) . DIRECTORY_SEPARATOR . $stamp;
  if (!@mkdir($dir, 0700, true) && !is_dir($dir)) fail_json('Cannot create backup path', 500);
  $dest = $dir . DIRECTORY_SEPARATOR . str_replace('/', '__', $rel);
  if (!@copy($p, $dest)) fail_json('Backup failed', 500);
  return rel_from($backupRoot, $dest);
}
function rm_tree(string $p): void {
  if (is_link($p) || is_file($p)) { if (!@unlink($p)) fail_json('Delete failed', 500); return; }
  if (!is_dir($p)) return;
  $it = new FilesystemIterator($p, FilesystemIterator::SKIP_DOTS);
  foreach ($it as $item) rm_tree($item->getPathname());
  if (!@rmdir($p)) fail_json('Directory delete failed', 500);
}
function entry_info(string $root, string $p): array {
  $type = is_link($p) ? 'symlink' : (is_dir($p) ? 'directory' : (is_file($p) ? 'file' : 'other'));
  $v = ['path'=>rel_from($root,$p),'type'=>$type,'size'=>is_file($p)?filesize($p):null,'mode'=>substr(sprintf('%o', fileperms($p)), -4),'modified_at'=>gmdate('c', filemtime($p))];
  if ($type === 'file') $v['sha256'] = hash_file('sha256',$p);
  return $v;
}
function list_entries(string $root, string $start, bool $recursive, int $maxDepth, int $limit): array {
  $out = []; $stack = [[$start,0]];
  while ($stack && count($out) < $limit) {
    [$dir,$depth] = array_pop($stack);
    if (!is_dir($dir)) { $out[] = entry_info($root,$dir); continue; }
    $items = [];
    foreach (new FilesystemIterator($dir, FilesystemIterator::SKIP_DOTS) as $item) $items[] = $item->getPathname();
    sort($items, SORT_NATURAL|SORT_FLAG_CASE);
    foreach ($items as $p) {
      if (count($out) >= $limit) break;
      $out[] = entry_info($root,$p);
      if ($recursive && is_dir($p) && !is_link($p) && $depth < $maxDepth) $stack[] = [$p,$depth+1];
    }
  }
  return $out;
}
function read_one(string $root, string $rel, string $encoding='utf8', int $offset=0, int $length=262144): array {
  $p = target_path($root,$rel,true);
  if (!is_file($p)) fail_json('Not a file', 400);
  $size = filesize($p);
  $length = max(1,min($length,MAX_BYTES));
  $offset = max(0,$offset);
  $fh = fopen($p,'rb'); if (!$fh) fail_json('Read failed',500);
  fseek($fh,$offset); $data = fread($fh,$length); fclose($fh);
  if ($data === false) fail_json('Read failed',500);
  return ['path'=>rel_clean($rel),'encoding'=>$encoding,'offset'=>$offset,'size'=>$size,'bytes'=>strlen($data),'sha256'=>hash_file('sha256',$p),'content'=>$encoding==='base64'?base64_encode($data):$data,'truncated'=>($offset+strlen($data))<$size];
}
function write_bytes(string $root, string $rel, string $bytes, ?string $expected, string $backupRoot): array {
  if (strlen($bytes) > MAX_BYTES) fail_json('Write exceeds 8 MB limit',413);
  $p = target_path($root,$rel,false);
  if (is_link($p)) fail_json('Symlinks are not allowed');
  if ($expected !== null && $expected !== '') {
    if (!is_file($p) || !hash_equals(strtolower($expected), strtolower((string)hash_file('sha256',$p)))) fail_json('SHA-256 optimistic lock failed',409);
  }
  $backup = is_file($p) ? backup_file($root,$p,$backupRoot) : null;
  $tmp = $p . '.mcp-' . bin2hex(random_bytes(6)) . '.tmp';
  if (file_put_contents($tmp,$bytes,LOCK_EX) === false) fail_json('Write failed',500);
  @chmod($tmp,0644);
  if (!@rename($tmp,$p)) { @unlink($tmp); fail_json('Atomic rename failed',500); }
  return ['path'=>rel_clean($rel),'bytes'=>strlen($bytes),'sha256'=>hash_file('sha256',$p),'backup_path'=>$backup];
}
function public_ip_for_host(string $host): bool {
  if ($host === 'localhost') return false;
  $records = @dns_get_record($host, DNS_A|DNS_AAAA);
  if (!$records) return false;
  foreach ($records as $r) {
    $ip = $r['ip'] ?? ($r['ipv6'] ?? null);
    if (!$ip || filter_var($ip,FILTER_VALIDATE_IP,FILTER_FLAG_NO_PRIV_RANGE|FILTER_FLAG_NO_RES_RANGE) === false) return false;
  }
  return true;
}
function zip_add_path(ZipArchive $zip, string $source, string $baseName): void {
  if (is_file($source)) { $zip->addFile($source,$baseName); return; }
  $it = new RecursiveIteratorIterator(new RecursiveDirectoryIterator($source,FilesystemIterator::SKIP_DOTS),RecursiveIteratorIterator::SELF_FIRST);
  foreach ($it as $item) {
    if ($item->isLink()) continue;
    $rel = $baseName . '/' . str_replace(DIRECTORY_SEPARATOR,'/',substr($item->getPathname(),strlen($source)+1));
    if ($item->isDir()) $zip->addEmptyDir($rel); else $zip->addFile($item->getPathname(),$rel);
  }
}

switch ($op) {
  case 'scope_status':
    ok_json(['service'=>'horizons-hostinger-filesystem','agent_version'=>AGENT_VERSION,'root'=>$root,'backup_root'=>$BACKUP_ROOT,'root_exists'=>is_dir($root),'root_readable'=>is_readable($root),'root_writable'=>is_writable($root)]);
  case 'fs_list':
    $start = target_path($root,$body['path'] ?? '.',true);
    $recursive = (bool)($body['recursive'] ?? false);
    $maxDepth = max(0,min(12,(int)($body['max_depth'] ?? 3)));
    $limit = max(1,min(3000,(int)($body['limit'] ?? 500)));
    $entries = list_entries($root,$start,$recursive,$maxDepth,$limit);
    ok_json(['root'=>$root,'requested_path'=>rel_clean($body['path'] ?? '.'),'count'=>count($entries),'truncated'=>count($entries)>=$limit,'entries'=>$entries]);
  case 'fs_stat':
    $p = target_path($root,$body['path'] ?? '',true); ok_json(entry_info($root,$p));
  case 'fs_read':
    ok_json(read_one($root,$body['path'] ?? '',(string)($body['encoding'] ?? 'utf8'),(int)($body['offset'] ?? 0),(int)($body['length'] ?? 262144)));
  case 'fs_write':
    $enc = (string)($body['encoding'] ?? 'utf8'); $raw = (string)($body['content'] ?? '');
    $bytes = $enc === 'base64' ? base64_decode($raw,true) : $raw; if ($bytes === false) fail_json('Invalid base64');
    ok_json(write_bytes($root,$body['path'] ?? '',$bytes,isset($body['expected_sha256'])?(string)$body['expected_sha256']:null,$BACKUP_ROOT));
  case 'fs_patch_text':
    $p = target_path($root,$body['path'] ?? '',true); if (!is_file($p)) fail_json('Not a file');
    $old = file_get_contents($p); if ($old === false) fail_json('Read failed',500);
    if (isset($body['expected_sha256']) && $body['expected_sha256'] !== '' && !hash_equals(strtolower((string)$body['expected_sha256']),strtolower(hash_file('sha256',$p)))) fail_json('SHA-256 optimistic lock failed',409);
    $new = $old; $applied = [];
    foreach (($body['replacements'] ?? []) as $i=>$r) {
      $search = (string)($r['search'] ?? ''); $replace = (string)($r['replace'] ?? ''); if ($search === '') fail_json('Empty search string');
      $count = substr_count($new,$search); if ($count === 0) fail_json('Replacement search not found at index '.$i,409);
      if ((bool)($r['all'] ?? false)) { $new = str_replace($search,$replace,$new,$n); $applied[] = $n; }
      else { $pos = strpos($new,$search); $new = substr($new,0,$pos).$replace.substr($new,$pos+strlen($search)); $applied[] = 1; }
    }
    $w = write_bytes($root,$body['path'] ?? '',$new,null,$BACKUP_ROOT); $w['replacements_applied']=$applied; ok_json($w);
  case 'fs_mkdir':
    $p = target_path($root,$body['path'] ?? '',false); if (!is_dir($p) && !@mkdir($p,0755,true) && !is_dir($p)) fail_json('mkdir failed',500); ok_json(['path'=>rel_from($root,realpath($p))]);
  case 'fs_copy':
    $src = target_path($root,$body['source'] ?? '',true); if (!is_file($src)) fail_json('Source must be a file');
    $dst = target_path($root,$body['destination'] ?? '',false); $overwrite=(bool)($body['overwrite'] ?? false);
    if (file_exists($dst) && !$overwrite) fail_json('Destination exists',409); $backup=file_exists($dst)?backup_file($root,$dst,$BACKUP_ROOT):null;
    if (!@copy($src,$dst)) fail_json('Copy failed',500); ok_json(['source'=>rel_from($root,$src),'destination'=>rel_from($root,$dst),'sha256'=>hash_file('sha256',$dst),'backup_path'=>$backup]);
  case 'fs_move':
    $src = target_path($root,$body['source'] ?? '',true); $dst=target_path($root,$body['destination'] ?? '',false); $overwrite=(bool)($body['overwrite'] ?? false);
    $backup=null; if (file_exists($dst) || is_link($dst)) { if (!$overwrite) fail_json('Destination exists',409); if (is_file($dst)) $backup=backup_file($root,$dst,$BACKUP_ROOT); else rm_tree($dst); }
    if (!@rename($src,$dst)) fail_json('Move failed',500); ok_json(['source'=>rel_clean($body['source'] ?? ''),'destination'=>rel_clean($body['destination'] ?? ''),'backup_path'=>$backup]);
  case 'fs_delete':
    if (($body['confirm'] ?? false) !== true) fail_json('confirm=true required',400);
    $p = target_path($root,$body['path'] ?? '',true); if ($p === $root) fail_json('Cannot delete website root');
    if (is_dir($p) && !is_link($p) && !($body['recursive'] ?? false)) fail_json('recursive=true required for directories',400);
    $backup=is_file($p)?backup_file($root,$p,$BACKUP_ROOT):null; rm_tree($p); ok_json(['deleted'=>rel_clean($body['path'] ?? ''),'backup_path'=>$backup]);
  case 'download_to_file':
    $url=(string)($body['url'] ?? ''); $u=parse_url($url); if (!$u || ($u['scheme'] ?? '')!=='https' || empty($u['host']) || !public_ip_for_host(strtolower($u['host']))) fail_json('Only public HTTPS URLs are allowed');
    if (!function_exists('curl_init')) fail_json('cURL extension unavailable',500);
    $dst=target_path($root,$body['path'] ?? '',false); $tmp=$dst.'.download-'.bin2hex(random_bytes(4)); $fh=fopen($tmp,'wb'); if(!$fh) fail_json('Cannot create temp file',500);
    $ch=curl_init($url); curl_setopt_array($ch,[CURLOPT_FILE=>$fh,CURLOPT_FOLLOWLOCATION=>true,CURLOPT_MAXREDIRS=>3,CURLOPT_CONNECTTIMEOUT=>15,CURLOPT_TIMEOUT=>120,CURLOPT_PROTOCOLS=>CURLPROTO_HTTPS,CURLOPT_FAILONERROR=>true]);
    $ok=curl_exec($ch); $err=curl_error($ch); curl_close($ch); fclose($fh); if(!$ok){@unlink($tmp);fail_json('Download failed: '.$err,502);}
    if (filesize($tmp)>MAX_BYTES*16) {@unlink($tmp);fail_json('Downloaded file too large',413);}
    if (isset($body['expected_sha256']) && $body['expected_sha256']!=='' && !hash_equals(strtolower((string)$body['expected_sha256']),strtolower(hash_file('sha256',$tmp)))) {@unlink($tmp);fail_json('SHA-256 mismatch',409);}
    $backup=is_file($dst)?backup_file($root,$dst,$BACKUP_ROOT):null; if(!@rename($tmp,$dst)){@unlink($tmp);fail_json('Move downloaded file failed',500);} ok_json(['path'=>rel_clean($body['path'] ?? ''),'bytes'=>filesize($dst),'sha256'=>hash_file('sha256',$dst),'backup_path'=>$backup]);
  case 'extract_zip':
    if (!class_exists('ZipArchive')) fail_json('ZipArchive unavailable',500);
    $zipPath=target_path($root,$body['zip_path'] ?? '',true); $dest=target_path($root,$body['destination'] ?? '.',false); if(!is_dir($dest)&&!@mkdir($dest,0755,true)&&!is_dir($dest)) fail_json('Cannot create destination',500);
    $zip=new ZipArchive(); if($zip->open($zipPath)!==true) fail_json('Cannot open ZIP'); $names=[]; for($i=0;$i<$zip->numFiles;$i++){ $n=str_replace('\\','/',$zip->getNameIndex($i)); if($n===''||$n[0]==='/'||preg_match('~(^|/)\.\.(/|$)~',$n)){$zip->close();fail_json('Unsafe ZIP entry');}$names[]=$n;}
    $strip=(bool)($body['strip_single_root'] ?? false); $prefix=''; if($strip && $names){$first=explode('/',$names[0])[0];$same=true;foreach($names as $n){if(explode('/',$n)[0]!==$first){$same=false;break;}}if($same)$prefix=$first.'/';}
    $count=0; foreach($names as $i=>$n){$rel=$prefix!==''&&strpos($n,$prefix)===0?substr($n,strlen($prefix)):$n;if($rel==='')continue;$out=target_path($root,rel_from($root,$dest).'/'.$rel,false);if(substr($n,-1)==='/'){if(!is_dir($out))@mkdir($out,0755,true);continue;}if(file_exists($out)&&!($body['overwrite']??false)){$zip->close();fail_json('Destination file exists: '.$rel,409);}if(file_exists($out))backup_file($root,$out,$BACKUP_ROOT);$stream=$zip->getStream($n);if(!$stream){$zip->close();fail_json('ZIP read failed',500);}$fh=fopen($out,'wb');stream_copy_to_stream($stream,$fh);fclose($fh);fclose($stream);$count++;}
    $zip->close(); ok_json(['zip_path'=>rel_clean($body['zip_path'] ?? ''),'destination'=>rel_clean($body['destination'] ?? '.'),'files_extracted'=>$count]);
  case 'fs_find':
    $start=target_path($root,$body['path'] ?? '.',true); $needle=strtolower((string)($body['name_contains'] ?? '')); $ext=(string)($body['extension'] ?? ''); $contentNeedle=(string)($body['content_contains'] ?? ''); $maxDepth=max(0,min(16,(int)($body['max_depth'] ?? 6))); $limit=max(1,min(2000,(int)($body['limit'] ?? 200))); $out=[]; $stack=[[$start,0]];
    while($stack&&count($out)<$limit){[$p,$depth]=array_pop($stack);if(is_dir($p)){foreach(new FilesystemIterator($p,FilesystemIterator::SKIP_DOTS) as $item){$ip=$item->getPathname();if($item->isDir()&&!$item->isLink()&&$depth<$maxDepth)$stack[]=[$ip,$depth+1];$baseName=basename($ip);$match=$needle===''||strpos(strtolower($baseName),$needle)!==false;if($match&&$ext!==''&&is_file($ip)&&strtolower(substr($baseName,-strlen($ext)))!==strtolower($ext))$match=false;if($match&&$contentNeedle!==''&&is_file($ip)){if(filesize($ip)>2097152)$match=false;else{$txt=@file_get_contents($ip);$match=is_string($txt)&&stripos($txt,$contentNeedle)!==false;}}if($match)$out[]=entry_info($root,$ip);if(count($out)>=$limit)break;}}else{$out[]=entry_info($root,$p);}}
    ok_json(['count'=>count($out),'truncated'=>count($out)>=$limit,'matches'=>$out]);
  case 'fs_read_many':
    $out=[];$enc=(string)($body['encoding']??'utf8');$max=max(1,min(2097152,(int)($body['max_bytes_each']??262144)));foreach(($body['paths']??[]) as $rp){$out[]=read_one($root,(string)$rp,$enc,0,$max);}ok_json(['files'=>$out]);
  case 'fs_chmod':
    $p=target_path($root,$body['path']??'',true);$modeStr=(string)($body['mode']??'');if(!preg_match('/^[0-7]{3,4}$/',$modeStr))fail_json('Invalid mode');if(!@chmod($p,octdec($modeStr)))fail_json('chmod failed',500);ok_json(['path'=>rel_from($root,$p),'mode'=>substr(sprintf('%o',fileperms($p)),-4)]);
  case 'fs_zip':
    if(!class_exists('ZipArchive'))fail_json('ZipArchive unavailable',500);$src=target_path($root,$body['source']??'',true);$dst=target_path($root,$body['destination_zip']??'',false);if(file_exists($dst)&&!($body['overwrite']??false))fail_json('Destination exists',409);if(file_exists($dst))backup_file($root,$dst,$BACKUP_ROOT);$zip=new ZipArchive();if($zip->open($dst,ZipArchive::CREATE|ZipArchive::OVERWRITE)!==true)fail_json('Cannot create ZIP',500);zip_add_path($zip,$src,basename($src));$zip->close();ok_json(['source'=>rel_clean($body['source']??''),'destination_zip'=>rel_clean($body['destination_zip']??''),'bytes'=>filesize($dst),'sha256'=>hash_file('sha256',$dst)]);
  case 'backup_list':
    $sub=rel_clean($body['path']??'.');$start=$sub==='.'?$BACKUP_ROOT:$BACKUP_ROOT.DIRECTORY_SEPARATOR.str_replace('/',DIRECTORY_SEPARATOR,$sub);if(!file_exists($start))ok_json(['count'=>0,'entries'=>[]]);$real=realpath($start);$br=realpath($BACKUP_ROOT);if($real===false||$br===false||!within($br,$real))fail_json('Invalid backup path');$entries=list_entries($br,$real,(bool)($body['recursive']??true),max(0,min(12,(int)($body['max_depth']??5))),max(1,min(3000,(int)($body['limit']??500))));ok_json(['count'=>count($entries),'entries'=>$entries]);
  case 'backup_restore':
    if(($body['confirm']??false)!==true)fail_json('confirm=true required');$br=realpath($BACKUP_ROOT);$b=realpath($BACKUP_ROOT.DIRECTORY_SEPARATOR.str_replace('/',DIRECTORY_SEPARATOR,rel_clean($body['backup_path']??'')));if($b===false||$br===false||!within($br,$b)||!is_file($b))fail_json('Backup file not found',404);$dst=target_path($root,$body['destination']??'',false);if(file_exists($dst)&&!($body['overwrite']??false))fail_json('Destination exists',409);$prior=is_file($dst)?backup_file($root,$dst,$BACKUP_ROOT):null;if(!@copy($b,$dst))fail_json('Restore failed',500);ok_json(['backup_path'=>rel_clean($body['backup_path']??''),'destination'=>rel_clean($body['destination']??''),'sha256'=>hash_file('sha256',$dst),'prior_backup'=>$prior]);
  default: fail_json('Unsupported operation',404);
}
?>`;
}

export function createFilesystemLayer(ctx) {
  const { rawCall, listWebsitesFor, resolveAccount, extractJsonFromToolResult, textResult } = ctx;
  const agentCache = new Map();

  async function payloadCall(account, toolName, args, label) {
    const result = await rawCall(account, toolName, args, label);
    if (result && result.isError) {
      const msg = result.content && result.content[0] && result.content[0].text ? result.content[0].text : ('Tool failed: ' + toolName);
      throw new Error(msg);
    }
    const payload = extractJsonFromToolResult(result) || extractTextJson(result);
    if (!payload) throw new Error('Invalid Hostinger response from ' + toolName);
    return payload;
  }

  async function findSubdomain(account, domain) {
    const labels = domain.split('.');
    for (let i = 1; i < labels.length - 1; i += 1) {
      const parent = labels.slice(i).join('.');
      const parents = await listWebsitesFor(account, { domain: parent });
      for (const row of parents) {
        if (String(row.domain).toLowerCase() !== parent) continue;
        const result = await rawCall(account, 'hosting_listWebsiteSubdomainsV1', { username: row.username, domain: row.domain }, 'fs-subdomains');
        if (result && result.isError) continue;
        const p = extractJsonFromToolResult(result) || extractTextJson(result);
        const rows = Array.isArray(p) ? p : (Array.isArray(p && p.data) ? p.data : []);
        const match = rows.find((x) => String(x.domain || x.subdomain || '').toLowerCase() === domain);
        if (match) return { ...match, username: match.username || row.username, parent_domain: row.domain };
      }
    }
    return null;
  }

  async function resolveScope(args) {
    const domain = cleanDomain(args.domain);
    const account = await resolveAccount(args);
    let rows = await listWebsitesFor(account, { domain });
    let row = rows.find((x) => String(x.domain).toLowerCase() === domain) || null;
    if (!row) row = await findSubdomain(account, domain);
    if (!row || !row.username || !row.root_directory) throw new Error('Could not resolve Hostinger filesystem root for ' + domain);
    return { account, domain, username: String(row.username), root: String(row.root_directory), row };
  }

  async function uploadAgent(scope, anchorDomain, filename, secret) {
    const credentials = await payloadCall(scope.account, 'hosting_generateUploadURLV1', { username: scope.username, domain: anchorDomain }, 'fs-upload-url');
    const url = String(credentials.url || '').replace(/\/$/, '');
    const auth = credentials.auth_key;
    const rest = credentials.rest_auth_key;
    if (!url || !auth || !rest) throw new Error('Invalid Hostinger upload credentials');
    const bytes = Buffer.from(buildAgentPhp(secret, scope.username), 'utf8');
    const target = url + '/' + encodeURIComponent(filename) + '?override=true';
    let response = await fetch(target, {
      method: 'POST',
      headers: {
        'X-Auth': auth,
        'X-Auth-Rest': rest,
        'Tus-Resumable': '1.0.0',
        'Upload-Length': String(bytes.length),
        'Upload-Offset': '0',
      },
    });
    if (response.status !== 201 && response.status !== 204) throw new Error('Agent upload init failed: HTTP ' + response.status);
    response = await fetch(target, {
      method: 'PATCH',
      headers: {
        'X-Auth': auth,
        'X-Auth-Rest': rest,
        'Tus-Resumable': '1.0.0',
        'Content-Type': 'application/offset+octet-stream',
        'Upload-Offset': '0',
      },
      body: bytes,
    });
    if (response.status !== 204 && response.status !== 200) throw new Error('Agent upload failed: HTTP ' + response.status);
  }

  async function ping(url, secret, root) {
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'X-Horizons-FS-Token': secret },
        body: JSON.stringify({ op: 'scope_status', root }),
        redirect: 'follow',
      });
      if (!response.ok) return null;
      const body = await response.json();
      return body && body.ok ? body.data : null;
    } catch { return null; }
  }

  async function ensureAgent(scope) {
    const key = scope.account.id + ':' + scope.username;
    const secret = accountSecret(scope.account, scope.username);
    const filename = agentFilename(secret);
    const cached = agentCache.get(key);
    if (cached) {
      const status = await ping(cached.url, secret, scope.root);
      if (status) return { ...cached, secret, status };
      agentCache.delete(key);
    }

    const websites = await listWebsitesFor(scope.account, { username: scope.username });
    const candidates = websites
      .filter((x) => x && x.domain && x.is_enabled !== false)
      .sort((a, b) => {
        const score = (x) => x.website_type === 'wordpress' ? 0 : (x.website_type === 'other' ? 1 : 2);
        return score(a) - score(b);
      });
    if (!candidates.length) throw new Error('No anchor website is available for hosting user ' + scope.username);

    for (const site of candidates) {
      const domain = cleanDomain(site.domain);
      const url = 'https://' + domain + '/' + filename;
      let status = await ping(url, secret, scope.root);
      if (!status) {
        try {
          await uploadAgent(scope, domain, filename, secret);
          status = await ping(url, secret, scope.root);
        } catch {}
      }
      if (status) {
        const agent = { url, anchor_domain: domain, filename };
        agentCache.set(key, agent);
        return { ...agent, secret, status };
      }
    }
    throw new Error('Could not bootstrap the protected filesystem agent for hosting user ' + scope.username);
  }

  async function agentCall(scope, op, payload) {
    const agent = await ensureAgent(scope);
    const response = await fetch(agent.url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Horizons-FS-Token': agent.secret },
      body: JSON.stringify({ op, root: scope.root, ...payload }),
      redirect: 'follow',
    });
    const text = await response.text();
    let parsed;
    try { parsed = JSON.parse(text); } catch { throw new Error('Filesystem agent returned invalid JSON (HTTP ' + response.status + ')'); }
    if (!response.ok || !parsed.ok) throw new Error(parsed.error || ('Filesystem agent failed: HTTP ' + response.status));
    return { ...parsed.data, domain: scope.domain, username: scope.username, root: scope.root, hostinger_account: scope.account.id, agent_anchor: agent.anchor_domain };
  }

  async function call(toolName, args = {}) {
    const scope = await resolveScope(args);
    const clean = { ...args };
    delete clean.domain;
    delete clean.hostinger_account;
    const op = toolName.replace(/^hostinger_/, '');
    if (op === 'scope_status') {
      const result = await agentCall(scope, 'scope_status', {});
      return textResult(result);
    }
    const normalized = { ...clean };
    for (const key of ['path', 'source', 'destination', 'zip_path', 'destination_zip']) {
      if (normalized[key] !== undefined) normalized[key] = normalizeRelative(normalized[key]);
    }
    if (op === 'fs_write') {
      const enc = normalized.encoding || 'utf8';
      const bytes = enc === 'base64' ? Math.floor(String(normalized.content || '').length * 0.75) : Buffer.byteLength(String(normalized.content || ''), 'utf8');
      if (bytes > WRITE_LIMIT) throw new Error('hostinger_fs_write is limited to 8 MB per call; use download_to_file or Hostinger upload URL for larger files');
    }
    return textResult(await agentCall(scope, op, normalized));
  }

  const names = new Set(tools.map((x) => x.name));
  return { tools, has: (name) => names.has(name), call };
}
