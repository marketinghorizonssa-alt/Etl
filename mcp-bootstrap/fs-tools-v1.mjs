const AGENT_TOKEN = '__TOKEN__';

const AGENTS = {
  u414915683: 'https://almowahid.sa/hfs-agent-9f27c1.php',
  u878466595: 'https://fammous-sa.com/hfs-agent-9f27c1.php',
  u577066560: 'https://alhalqhanet.com/hfs-agent-9f27c1.php',
  u958097356: 'https://arkan2030.com/hfs-agent-9f27c1.php',
  u395847043: 'https://missloren.com/hfs-agent-9f27c1.php',
  u240970533: 'https://ebtikaraat.com/hfs-agent-9f27c1.php',
};

const commonProps = {
  domain: { type: 'string', description: 'Website or subdomain whose exact Hostinger root_directory should be used.' },
  hostinger_account: { type: 'string', description: 'Optional Hostinger account selector; normally omit and let the Primary router resolve by domain.' },
};

const obj = (properties, required=[]) => ({ type:'object', properties:{...commonProps,...properties}, required:['domain',...required], additionalProperties:false });

export const fsTools = [
  { name:'horizons_fs_scope_status', description:'Verify direct filesystem read/write access for a website root resolved from its Hostinger domain.', inputSchema:obj({}) },
  { name:'horizons_fs_list', description:'List files and directories under the selected website root.', inputSchema:obj({
      path:{type:'string',description:'Relative path under the website root. Default: .'},
      recursive:{type:'boolean'}, max_depth:{type:'integer',minimum:0,maximum:12}, limit:{type:'integer',minimum:1,maximum:3000}
    }) },
  { name:'horizons_fs_stat', description:'Get file/directory metadata and SHA-256 for files.', inputSchema:obj({path:{type:'string'}},['path']) },
  { name:'horizons_fs_read', description:'Read a text or binary file. Binary content can be returned as base64.', inputSchema:obj({
      path:{type:'string'}, encoding:{type:'string',enum:['utf8','base64'],default:'utf8'}, offset:{type:'integer',minimum:0,default:0}, length:{type:'integer',minimum:1}
    },['path']) },
  { name:'horizons_fs_write', description:'Create or atomically replace a file. Existing files are backed up automatically.', inputSchema:obj({
      path:{type:'string'}, content:{type:'string'}, encoding:{type:'string',enum:['utf8','base64'],default:'utf8'}, expected_sha256:{type:'string'}
    },['path','content']) },
  { name:'horizons_fs_patch_text', description:'Apply exact UTF-8 text replacements with optional SHA-256 optimistic locking and automatic backup.', inputSchema:obj({
      path:{type:'string'}, expected_sha256:{type:'string'}, replacements:{type:'array',minItems:1,maxItems:100,items:{type:'object',properties:{search:{type:'string'},replace:{type:'string'},all:{type:'boolean',default:false}},required:['search','replace'],additionalProperties:false}}
    },['path','replacements']) },
  { name:'horizons_fs_mkdir', description:'Create a directory recursively.', inputSchema:obj({path:{type:'string'}},['path']) },
  { name:'horizons_fs_copy', description:'Copy a file or directory inside the selected website root.', inputSchema:obj({
      source:{type:'string'},destination:{type:'string'},overwrite:{type:'boolean',default:false}
    },['source','destination']) },
  { name:'horizons_fs_move', description:'Move or rename a file/directory inside the selected website root.', inputSchema:obj({
      source:{type:'string'},destination:{type:'string'},overwrite:{type:'boolean',default:false}
    },['source','destination']) },
  { name:'horizons_fs_delete', description:'Delete a file or directory. A backup is attempted first. Requires confirm=true.', inputSchema:obj({
      path:{type:'string'},recursive:{type:'boolean',default:false},confirm:{type:'boolean'}
    },['path','confirm']) },
  { name:'horizons_download_to_file', description:'Download a public HTTPS URL directly into the selected website root. Private/local network destinations are blocked.', inputSchema:obj({
      url:{type:'string'},path:{type:'string'},expected_sha256:{type:'string'}
    },['url','path']) },
  { name:'horizons_extract_zip', description:'Extract a ZIP already stored under the selected website root. Zip-slip paths are blocked.', inputSchema:obj({
      zip_path:{type:'string'},destination:{type:'string'},overwrite:{type:'boolean',default:false}
    },['zip_path','destination']) },
  { name:'horizons_fs_find', description:'Search files/directories by name and optionally UTF-8 content.', inputSchema:obj({
      path:{type:'string',default:'.'},name_contains:{type:'string'},extension:{type:'string'},content_contains:{type:'string'},max_depth:{type:'integer',minimum:0,maximum:16,default:6},limit:{type:'integer',minimum:1,maximum:2000,default:200}
    }) },
  { name:'horizons_fs_read_many', description:'Read several files in one call.', inputSchema:obj({
      paths:{type:'array',minItems:1,maxItems:50,items:{type:'string'}},encoding:{type:'string',enum:['utf8','base64'],default:'utf8'},max_bytes_each:{type:'integer',minimum:1,maximum:2097152,default:262144}
    },['paths']) },
  { name:'horizons_fs_chmod', description:'Change POSIX permissions for a file or directory.', inputSchema:obj({
      path:{type:'string'},mode:{type:'string',pattern:'^[0-7]{3,4}$'}
    },['path','mode']) },
  { name:'horizons_fs_zip', description:'Create a ZIP from a file or directory and save it under the selected website root.', inputSchema:obj({
      source:{type:'string'},destination_zip:{type:'string'},overwrite:{type:'boolean',default:false}
    },['source','destination_zip']) },
  { name:'horizons_backup_list', description:'List automatic MCP filesystem backups for the selected website root.', inputSchema:obj({
      path:{type:'string',default:'.'},limit:{type:'integer',minimum:1,maximum:3000,default:500}
    }) },
  { name:'horizons_backup_restore', description:'Restore a file/directory from automatic backup. Existing destination is backed up first. Requires confirm=true.', inputSchema:obj({
      backup_path:{type:'string'},destination:{type:'string'},overwrite:{type:'boolean',default:false},confirm:{type:'boolean'}
    },['backup_path','destination','confirm']) },
];

for (const tool of fsTools) {
  tool.annotations = {
    title: tool.name,
    readOnlyHint: ['horizons_fs_scope_status','horizons_fs_list','horizons_fs_stat','horizons_fs_read','horizons_fs_find','horizons_fs_read_many','horizons_backup_list'].includes(tool.name),
    destructiveHint: ['horizons_fs_delete','horizons_backup_restore'].includes(tool.name),
  };
}

const OP = {
  horizons_fs_scope_status:'status',
  horizons_fs_list:'list',
  horizons_fs_stat:'stat',
  horizons_fs_read:'read',
  horizons_fs_write:'write',
  horizons_fs_patch_text:'patch_text',
  horizons_fs_mkdir:'mkdir',
  horizons_fs_copy:'copy',
  horizons_fs_move:'move',
  horizons_fs_delete:'delete',
  horizons_download_to_file:'download',
  horizons_extract_zip:'extract_zip',
  horizons_fs_find:'find',
  horizons_fs_read_many:'read_many',
  horizons_fs_chmod:'chmod',
  horizons_fs_zip:'zip',
  horizons_backup_list:'backup_list',
  horizons_backup_restore:'backup_restore',
};

function textResult(payload, isError=false) {
  return { ...(isError ? {isError:true} : {}), content:[{type:'text',text:JSON.stringify(payload,null,2)}] };
}

export async function handleFsTool(toolName, args, target) {
  const op=OP[toolName];
  if(!op) throw new Error('Unknown HORIZONS filesystem tool: '+toolName);
  if(!target?.username || !target?.root_directory) throw new Error('Filesystem target could not be resolved');
  const endpoint=AGENTS[target.username];
  if(!endpoint) throw new Error('No filesystem agent configured for hosting username '+target.username);

  const payload={...args,token:AGENT_TOKEN,op,root:target.root_directory};
  delete payload.domain;
  delete payload.hostinger_account;

  let response;
  try {
    response=await fetch(endpoint,{
      method:'POST',
      headers:{'content-type':'application/json','accept':'application/json'},
      body:JSON.stringify(payload),
      signal:AbortSignal.timeout(90000),
    });
  } catch (error) {
    return textResult({ok:false,error:'Filesystem agent request failed',detail:error?.message||String(error),username:target.username,root_directory:target.root_directory},true);
  }

  const raw=await response.text();
  let data;
  try { data=JSON.parse(raw); } catch { data={ok:false,error:'Invalid agent response',http_status:response.status,body:raw.slice(0,2000)}; }
  data.hostinger_username=target.username;
  data.root_directory=target.root_directory;
  if(!response.ok || data.ok===false) return textResult(data,true);
  return textResult(data,false);
}
