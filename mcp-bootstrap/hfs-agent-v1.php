<?php
declare(strict_types=1);

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

const HFS_TOKEN = '__TOKEN__';
const HFS_USERNAME = '__USERNAME__';
const MAX_WRITE = 25165824;
const MAX_READ = 8388608;
const MAX_DOWNLOAD = 83886080;

function fail(string $message, int $status=400): never {
    http_response_code($status);
    echo json_encode(['ok'=>false,'error'=>$message], JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);
    exit;
}
function out(array $data): never {
    echo json_encode(['ok'=>true]+$data, JSON_UNESCAPED_SLASHES|JSON_UNESCAPED_UNICODE);
    exit;
}
function body(): array {
    $raw=file_get_contents('php://input');
    $j=json_decode($raw ?: '', true);
    if(!is_array($j)) fail('Invalid JSON');
    return $j;
}
function clean_rel($value): string {
    $s=str_replace('\\','/',trim((string)($value ?? '.')));
    if($s===''||$s==='.') return '.';
    if(str_contains($s, "\0") || str_starts_with($s,'/')) fail('Invalid path');
    $parts=[];
    foreach(explode('/',$s) as $p){
        if($p===''||$p==='.') continue;
        if($p==='..') fail('Path escapes root');
        $parts[]=$p;
    }
    return $parts ? implode('/',$parts) : '.';
}
function user_home(): string { return '/home/'.HFS_USERNAME; }
function resolve_root(string $root): string {
    $r=realpath($root);
    if($r===false || !is_dir($r)) fail('Root does not exist');
    $prefix=user_home().'/domains/';
    if(!str_starts_with($r.'/', $prefix)) fail('Root outside allowed hosting user');
    return rtrim($r,'/');
}
function assert_no_symlink(string $root,string $rel): void {
    if($rel==='.') return;
    $cur=$root;
    foreach(explode('/',$rel) as $p){
        $cur.='/'.$p;
        if(file_exists($cur) || is_link($cur)){
            if(is_link($cur)) fail('Symlink paths are not allowed');
        }
    }
}
function target(string $root,$rel): array {
    $rel=clean_rel($rel);
    assert_no_symlink($root,$rel);
    return [$rel, $rel==='.' ? $root : $root.'/'.$rel];
}
function rel_to(string $root,string $abs): string {
    $p=str_replace('\\','/',$abs);
    $r=str_replace('\\','/',$root);
    if($p===$r) return '.';
    if(!str_starts_with($p,$r.'/')) fail('Resolved path escaped root');
    return substr($p,strlen($r)+1);
}
function mode_text(string $p): string {
    $m=@fileperms($p);
    return $m===false ? '' : substr(sprintf('%o',$m),-3);
}
function meta(string $root,string $p): array {
    $st=@lstat($p); if($st===false) fail('Path not found',404);
    $type=is_link($p)?'symlink':(is_dir($p)?'directory':(is_file($p)?'file':'other'));
    $x=['path'=>rel_to($root,$p),'type'=>$type,'size'=>$st['size']??0,'mode'=>mode_text($p),'modified_at'=>gmdate('c',$st['mtime']??time())];
    if($type==='file') $x['sha256']=hash_file('sha256',$p);
    if($type==='symlink') $x['symlink_target']=readlink($p);
    return $x;
}
function backup_root(string $root): string {
    $b=user_home().'/.horizons-mcp-backups/'.sha1($root);
    if(!is_dir($b) && !mkdir($b,0700,true) && !is_dir($b)) fail('Cannot create backup root',500);
    return $b;
}
function backup(string $root,string $p,string $reason): ?string {
    if(!file_exists($p) && !is_link($p)) return null;
    $rel=rel_to($root,$p);
    $dest=backup_root($root).'/'.gmdate('Y-m-d\TH-i-s\Z').'/'.preg_replace('/[^A-Za-z0-9._-]+/','_', $reason).'/'.$rel;
    if(!is_dir(dirname($dest)) && !mkdir(dirname($dest),0700,true) && !is_dir(dirname($dest))) fail('Cannot create backup directory',500);
    if(is_dir($p)) copy_tree($p,$dest); else if(is_file($p)) { if(!copy($p,$dest)) fail('Backup failed',500); } else return null;
    return $dest;
}
function copy_tree(string $src,string $dst): void {
    if(is_link($src)) fail('Symlink copy refused');
    if(is_file($src)){ if(!is_dir(dirname($dst))) mkdir(dirname($dst),0755,true); if(!copy($src,$dst)) fail('Copy failed',500); return; }
    if(!is_dir($dst) && !mkdir($dst,0755,true) && !is_dir($dst)) fail('Cannot create destination',500);
    $it=new DirectoryIterator($src);
    foreach($it as $f){ if($f->isDot()) continue; copy_tree($f->getPathname(),$dst.'/'.$f->getFilename()); }
}
function rm_tree(string $p): void {
    if(is_link($p)||is_file($p)){ if(!unlink($p)) fail('Delete failed',500); return; }
    if(!is_dir($p)) return;
    foreach(new DirectoryIterator($p) as $f){ if($f->isDot()) continue; rm_tree($f->getPathname()); }
    if(!rmdir($p)) fail('Directory delete failed',500);
}
function atomic_write(string $p,string $bytes): void {
    if(strlen($bytes)>MAX_WRITE) fail('Write exceeds limit');
    if(!is_dir(dirname($p)) && !mkdir(dirname($p),0755,true) && !is_dir(dirname($p))) fail('Cannot create parent',500);
    $tmp=dirname($p).'/.'.basename($p).'.hfs-'.bin2hex(random_bytes(6)).'.tmp';
    if(file_put_contents($tmp,$bytes,LOCK_EX)===false) fail('Temporary write failed',500);
    @chmod($tmp,0644);
    if(!rename($tmp,$p)){ @unlink($tmp); fail('Atomic replace failed',500); }
}
function decode_content(array $a): string {
    $enc=$a['encoding']??'utf8'; $c=(string)($a['content']??'');
    if($enc==='base64'){ $b=base64_decode($c,true); if($b===false) fail('Invalid base64'); return $b; }
    return $c;
}
function list_entries(string $root,string $start,bool $recursive,int $depth,int $limit): array {
    $res=[]; $tr=false;
    $walk=function(string $dir,int $level) use (&$walk,&$res,&$tr,$root,$recursive,$depth,$limit){
        $items=@scandir($dir); if($items===false) fail('Cannot list directory',500);
        foreach($items as $n){ if($n==='.'||$n==='..') continue; $p=$dir.'/'.$n; $res[]=meta($root,$p); if(count($res)>=$limit){$tr=true;return;} if($recursive && $level<$depth && is_dir($p) && !is_link($p)){$walk($p,$level+1); if($tr)return;} }
    };
    $walk($start,0); return [$res,$tr];
}
function is_private_ip(string $ip): bool {
    return filter_var($ip,FILTER_VALIDATE_IP,FILTER_FLAG_NO_PRIV_RANGE|FILTER_FLAG_NO_RES_RANGE)===false;
}
function validate_https(string $url): string {
    $u=parse_url($url); if(!$u || strtolower($u['scheme']??'')!=='https' || empty($u['host'])) fail('Only public HTTPS URLs are allowed');
    if(isset($u['user'])||isset($u['pass'])) fail('URL credentials are not allowed');
    $ips=gethostbynamel($u['host']); if(!$ips || array_filter($ips,'is_private_ip')) fail('Private/local destinations are blocked');
    return $url;
}
function download_bytes(string $url): array {
    for($i=0;$i<6;$i++){
        $url=validate_https($url);
        $ch=curl_init($url); if($ch===false) fail('curl init failed',500);
        curl_setopt_array($ch,[CURLOPT_RETURNTRANSFER=>true,CURLOPT_HEADER=>true,CURLOPT_FOLLOWLOCATION=>false,CURLOPT_TIMEOUT=>45,CURLOPT_USERAGENT=>'HORIZONS-FS-Agent/1.0']);
        $raw=curl_exec($ch); if($raw===false){$e=curl_error($ch);curl_close($ch);fail('Download failed: '.$e);}
        $code=(int)curl_getinfo($ch,CURLINFO_HTTP_CODE); $hs=(int)curl_getinfo($ch,CURLINFO_HEADER_SIZE); curl_close($ch);
        $head=substr($raw,0,$hs); $data=substr($raw,$hs);
        if($code>=300&&$code<400&&preg_match('/^Location:\s*(.+)$/mi',$head,$m)){ $loc=trim($m[1]); if(!preg_match('#^https://#i',$loc)){ $b=parse_url($url); $loc='https://'.$b['host'].'/'.ltrim($loc,'/'); } $url=$loc; continue; }
        if($code<200||$code>=300) fail('Download HTTP '.$code);
        if(strlen($data)>MAX_DOWNLOAD) fail('Downloaded file exceeds limit');
        return [$data,$url];
    }
    fail('Too many redirects');
}
function find_entries(string $root,string $start,array $a): array {
    $needle=strtolower((string)($a['name_contains']??'')); $ext=(string)($a['extension']??''); $content=(string)($a['content_contains']??'');
    $maxDepth=min(16,max(0,(int)($a['max_depth']??6))); $limit=min(2000,max(1,(int)($a['limit']??200))); $res=[];$tr=false;
    $walk=function(string $dir,int $level) use (&$walk,&$res,&$tr,$root,$needle,$ext,$content,$maxDepth,$limit){
        $items=@scandir($dir); if($items===false)return;
        foreach($items as $n){ if($n==='.'||$n==='..')continue; $p=$dir.'/'.$n; if(is_link($p))continue; $ok=true;
            if($needle!==''&&!str_contains(strtolower($n),$needle))$ok=false;
            if($ext!==''&&is_file($p)&&!str_ends_with(strtolower($n),strtolower($ext)))$ok=false;
            if($content!==''&&is_file($p)){ $size=@filesize($p); if($size===false||$size>2097152)$ok=false; else { $c=@file_get_contents($p); if($c===false||stripos($c,$content)===false)$ok=false; } }
            if($ok)$res[]=meta($root,$p); if(count($res)>=$limit){$tr=true;return;}
            if(is_dir($p)&&$level<$maxDepth){$walk($p,$level+1);if($tr)return;}
        }
    };
    $walk($start,0); return [$res,$tr];
}

if($_SERVER['REQUEST_METHOD']!=='POST') fail('Not found',404);
$a=body();
if(!isset($a['token']) || !hash_equals(HFS_TOKEN,(string)$a['token'])) fail('Unauthorized',401);
$op=(string)($a['op']??''); $root=resolve_root((string)($a['root']??''));

if($op==='status') out(['username'=>HFS_USERNAME,'root'=>$root,'readable'=>is_readable($root),'writable'=>is_writable($root)]);
if($op==='list'){[$rel,$p]=target($root,$a['path']??'.'); if(!is_dir($p))fail('Not a directory'); [$e,$t]=list_entries($root,$p,(bool)($a['recursive']??false),min(12,max(0,(int)($a['max_depth']??3))),min(3000,max(1,(int)($a['limit']??500)))); out(['requested_path'=>$rel,'count'=>count($e),'truncated'=>$t,'entries'=>$e]);}
if($op==='stat'){[$rel,$p]=target($root,$a['path']??'.'); out(['entry'=>meta($root,$p)]);}
if($op==='read'){[$rel,$p]=target($root,$a['path']??''); if(!is_file($p))fail('Not a file'); $off=max(0,(int)($a['offset']??0));$len=min(MAX_READ,max(1,(int)($a['length']??MAX_READ)));$h=fopen($p,'rb');if(!$h)fail('Open failed',500);fseek($h,$off);$b=fread($h,$len);fclose($h);$enc=($a['encoding']??'utf8')==='base64'?'base64':'utf8';out(['path'=>$rel,'offset'=>$off,'returned_bytes'=>strlen($b),'file_size'=>filesize($p),'encoding'=>$enc,'content'=>$enc==='base64'?base64_encode($b):$b,'sha256'=>hash_file('sha256',$p)]);}
if($op==='write'){[$rel,$p]=target($root,$a['path']??''); if(isset($a['expected_sha256'])&&file_exists($p)&&hash_file('sha256',$p)!==(string)$a['expected_sha256'])fail('SHA-256 mismatch',409);$bak=backup($root,$p,'write');$b=decode_content($a);atomic_write($p,$b);out(['path'=>$rel,'size'=>strlen($b),'sha256'=>hash_file('sha256',$p),'backup'=>$bak]);}
if($op==='patch_text'){[$rel,$p]=target($root,$a['path']??'');if(!is_file($p))fail('Not a file');if(isset($a['expected_sha256'])&&hash_file('sha256',$p)!==(string)$a['expected_sha256'])fail('SHA-256 mismatch',409);$c=file_get_contents($p);if($c===false)fail('Read failed',500);$bak=backup($root,$p,'patch');foreach(($a['replacements']??[]) as $r){$s=(string)($r['search']??'');if($s==='')fail('Empty search');$rep=(string)($r['replace']??'');if(!str_contains($c,$s))fail('Search text not found: '.substr($s,0,120),409);$c=($r['all']??false)?str_replace($s,$rep,$c):preg_replace('/'.preg_quote($s,'/').'/',str_replace(['\\','$'],['\\\\','\\$'],$rep),$c,1);}atomic_write($p,$c);out(['path'=>$rel,'sha256'=>hash_file('sha256',$p),'backup'=>$bak]);}
if($op==='mkdir'){[$rel,$p]=target($root,$a['path']??'');if(!is_dir($p)&&!mkdir($p,0755,true))fail('mkdir failed',500);out(['path'=>$rel]);}
if($op==='copy'){[$sr,$sp]=target($root,$a['source']??'');[$dr,$dp]=target($root,$a['destination']??'');if((file_exists($dp)||is_link($dp))&&!($a['overwrite']??false))fail('Destination exists',409);$bak=($a['overwrite']??false)?backup($root,$dp,'copy-overwrite'):null;if(($a['overwrite']??false)&&(file_exists($dp)||is_link($dp)))rm_tree($dp);copy_tree($sp,$dp);out(['source'=>$sr,'destination'=>$dr,'backup'=>$bak]);}
if($op==='move'){[$sr,$sp]=target($root,$a['source']??'');[$dr,$dp]=target($root,$a['destination']??'');if((file_exists($dp)||is_link($dp))&&!($a['overwrite']??false))fail('Destination exists',409);$bak=($a['overwrite']??false)?backup($root,$dp,'move-overwrite'):null;if(($a['overwrite']??false)&&(file_exists($dp)||is_link($dp)))rm_tree($dp);if(!is_dir(dirname($dp)))mkdir(dirname($dp),0755,true);if(!rename($sp,$dp))fail('Move failed',500);out(['source'=>$sr,'destination'=>$dr,'backup'=>$bak]);}
if($op==='delete'){if(($a['confirm']??false)!==true)fail('Delete requires confirm=true');[$rel,$p]=target($root,$a['path']??'');if($rel==='.')fail('Cannot delete website root');$bak=backup($root,$p,'delete');if(is_dir($p)&&!is_link($p)&&!($a['recursive']??false)){if(!rmdir($p))fail('Directory not empty; set recursive=true');}else rm_tree($p);out(['path'=>$rel,'backup'=>$bak]);}
if($op==='download'){[$rel,$p]=target($root,$a['path']??'');[$b,$final]=download_bytes((string)($a['url']??''));if(isset($a['expected_sha256'])&&hash('sha256',$b)!==(string)$a['expected_sha256'])fail('Downloaded SHA-256 mismatch',409);$bak=backup($root,$p,'download');atomic_write($p,$b);out(['path'=>$rel,'size'=>strlen($b),'sha256'=>hash('sha256',$b),'final_url'=>$final,'backup'=>$bak]);}
if($op==='extract_zip'){[$zr,$zp]=target($root,$a['zip_path']??'');[$dr,$dp]=target($root,$a['destination']??'.');if(!is_file($zp))fail('ZIP not found');$z=new ZipArchive();if($z->open($zp)!==true)fail('Cannot open ZIP');$written=[];for($i=0;$i<$z->numFiles;$i++){ $n=str_replace('\\','/',$z->getNameIndex($i));$n=clean_rel($n);if($n==='.')continue;$opth=$dp.'/'.$n;if(str_ends_with($z->getNameIndex($i),'/')){if(!is_dir($opth))mkdir($opth,0755,true);continue;}if(file_exists($opth)&&!($a['overwrite']??false))fail('Destination exists: '.rel_to($root,$opth),409);if(file_exists($opth))backup($root,$opth,'zip-overwrite');$bytes=$z->getFromIndex($i);if($bytes===false)fail('ZIP read failed');atomic_write($opth,$bytes);$written[]=rel_to($root,$opth);if(count($written)>10000)fail('ZIP contains too many files');}$z->close();out(['zip_path'=>$zr,'destination'=>$dr,'files_written'=>count($written),'sample'=>array_slice($written,0,100)]);}
if($op==='find'){[$rel,$p]=target($root,$a['path']??'.');[$e,$t]=find_entries($root,$p,$a);out(['requested_path'=>$rel,'count'=>count($e),'truncated'=>$t,'entries'=>$e]);}
if($op==='read_many'){$files=[];$total=0;$maxEach=min(2097152,max(1,(int)($a['max_bytes_each']??262144)));$enc=($a['encoding']??'utf8')==='base64'?'base64':'utf8';foreach(array_slice($a['paths']??[],0,50) as $x){[$rel,$p]=target($root,$x);if($total>=MAX_READ)break;try{$b=file_get_contents($p,false,null,0,min($maxEach,MAX_READ-$total));if($b===false)throw new Exception('Read failed');$total+=strlen($b);$files[]=['path'=>$rel,'returned_bytes'=>strlen($b),'encoding'=>$enc,'content'=>$enc==='base64'?base64_encode($b):$b,'sha256'=>hash_file('sha256',$p)];}catch(Throwable $e){$files[]=['path'=>$rel,'error'=>$e->getMessage()];}}out(['count'=>count($files),'total_returned_bytes'=>$total,'files'=>$files]);}
if($op==='chmod'){[$rel,$p]=target($root,$a['path']??'');$m=(string)($a['mode']??'');if(!preg_match('/^[0-7]{3,4}$/',$m))fail('Invalid mode');if(!chmod($p,octdec($m)))fail('chmod failed',500);out(['path'=>$rel,'mode'=>$m]);}
if($op==='zip'){[$sr,$sp]=target($root,$a['source']??'');[$dr,$dp]=target($root,$a['destination_zip']??'');if(!str_ends_with(strtolower($dp),'.zip'))fail('destination_zip must end with .zip');if(file_exists($dp)&&!($a['overwrite']??false))fail('Destination exists',409);if(file_exists($dp))backup($root,$dp,'zip-overwrite');$z=new ZipArchive();if($z->open($dp,ZipArchive::CREATE|ZipArchive::OVERWRITE)!==true)fail('Cannot create ZIP');$add=function($src,$base)use(&$add,$z){if(is_link($src))return;if(is_file($src)){$z->addFile($src,$base);return;}foreach(new DirectoryIterator($src) as $f){if($f->isDot())continue;$add($f->getPathname(),$base===''?$f->getFilename():$base.'/'.$f->getFilename());}};$add($sp,is_file($sp)?basename($sp):'');$z->close();if(filesize($dp)>MAX_DOWNLOAD){unlink($dp);fail('Created ZIP exceeds limit');}out(['source'=>$sr,'destination_zip'=>$dr,'size'=>filesize($dp),'sha256'=>hash_file('sha256',$dp)]);}
if($op==='backup_list'){$b=backup_root($root);$sub=clean_rel($a['path']??'.');$p=$sub==='.'?$b:$b.'/'.$sub;if(!is_dir($p))fail('Backup path not found',404);$entries=[];$it=new RecursiveIteratorIterator(new RecursiveDirectoryIterator($p,FilesystemIterator::SKIP_DOTS),RecursiveIteratorIterator::SELF_FIRST);foreach($it as $f){$entries[]=['path'=>str_replace('\\','/',substr($f->getPathname(),strlen($b)+1)),'type'=>$f->isDir()?'directory':'file','size'=>$f->getSize(),'modified_at'=>gmdate('c',$f->getMTime())];if(count($entries)>=min(3000,max(1,(int)($a['limit']??500))))break;}out(['count'=>count($entries),'entries'=>$entries]);}
if($op==='backup_restore'){if(($a['confirm']??false)!==true)fail('Restore requires confirm=true');$b=backup_root($root);$br=clean_rel($a['backup_path']??'');$src=$b.'/'.$br;if(!file_exists($src))fail('Backup not found',404);[$dr,$dp]=target($root,$a['destination']??'');if(file_exists($dp)&&!($a['overwrite']??false))fail('Destination exists',409);$safety=file_exists($dp)?backup($root,$dp,'before-restore'):null;if(file_exists($dp))rm_tree($dp);copy_tree($src,$dp);out(['backup_path'=>$br,'destination'=>$dr,'safety_backup'=>$safety]);}
fail('Unknown operation: '.$op,404);
