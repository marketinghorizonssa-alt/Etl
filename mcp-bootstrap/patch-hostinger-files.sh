#!/bin/sh
set -eu
F=/home/u577066560/domains/palegreen-gull-523362.hostingersite.com/nodejs/node_modules/hostinger-api-mcp/src/core/tools/hosting.js
B="$F.v123.bak"
[ -f "$B" ] || cp "$F" "$B"
T="$F.tmp"
head -n -1 "$F" > "$T"
cat >> "$T" <<'EOF'
,
  {
    "name": "hosting_generateUploadURLV1",
    "title": "Generate upload URL",
    "annotations": {"title":"Generate upload URL","readOnlyHint":false,"destructiveHint":false},
    "description": "Generate authenticated TUS upload credentials for uploading or overwriting a file inside a website public_html.",
    "method": "POST",
    "path": "/api/hosting/v1/files/upload-urls",
    "inputSchema": {
      "type": "object",
      "properties": {
        "username": {"type":"string","description":"Account username"},
        "domain": {"type":"string","description":"Website domain"}
      },
      "required": ["username","domain"]
    },
    "security": [{"apiToken":[]}],
    "group": "hosting"
  },
  {
    "name": "hosting_listWebsiteFilesAndDirectoriesV1",
    "title": "List website files and directories",
    "annotations": {"title":"List website files and directories","readOnlyHint":true,"destructiveHint":false},
    "description": "List files and directories under a website document root.",
    "method": "GET",
    "path": "/api/hosting/v1/accounts/{username}/domains/{domain}/files",
    "inputSchema": {
      "type": "object",
      "properties": {
        "username": {"type":"string","description":"Account username"},
        "domain": {"type":"string","description":"Domain name"},
        "directory": {"type":"string","description":"Directory relative to document root"},
        "max_depth": {"type":"integer","description":"Recursion depth"},
        "max_items": {"type":"integer","description":"Maximum entries"},
        "offset": {"type":"integer","description":"Entries to skip"},
        "file_types": {"type":"array","items":{"type":"string","enum":["file","directory","symlink","other"]}}
      },
      "required": ["username","domain"]
    },
    "security": [{"apiToken":[]}],
    "group": "hosting"
  },
  {
    "name": "hosting_getWebsiteFileContentV1",
    "title": "Get website file content",
    "annotations": {"title":"Get website file content","readOnlyHint":true,"destructiveHint":false},
    "description": "Read a text file relative to the website document root.",
    "method": "GET",
    "path": "/api/hosting/v1/accounts/{username}/domains/{domain}/files/content",
    "inputSchema": {
      "type": "object",
      "properties": {
        "username": {"type":"string","description":"Account username"},
        "domain": {"type":"string","description":"Domain name"},
        "path": {"type":"string","description":"File path relative to document root"},
        "from_line": {"type":"integer","description":"Starting line"},
        "max_lines": {"type":"integer","description":"Maximum lines"}
      },
      "required": ["username","domain","path"]
    },
    "security": [{"apiToken":[]}],
    "group": "hosting"
  }
];
EOF
mv "$T" "$F"
grep -E 'hosting_(generateUploadURL|listWebsiteFilesAndDirectories|getWebsiteFileContent)V1' "$F"
