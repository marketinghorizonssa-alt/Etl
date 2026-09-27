#!/bin/sh
set -eu
APP=/home/u577066560/domains/palegreen-gull-523362.hostingersite.com/hbuilds/current/nodejs/app.mjs
MOD=/home/u577066560/domains/palegreen-gull-523362.hostingersite.com/hbuilds/current/nodejs/fs-tools.mjs
[ -f "$APP" ] || { echo "missing app"; exit 1; }
[ -f "$MOD" ] || { echo "missing fs-tools module"; exit 1; }
cp "$APP" "$APP.pre-horizons-fs"

grep -q "fs-tools.mjs" "$APP" || sed -i "/import express from 'express';/a import { fsTools, handleFsTool } from './fs-tools.mjs';" "$APP"

if grep -q "const cachedTools = \[...upstreamTools.map(addAccountSelector), customAccountTool\];" "$APP"; then
  sed -i "s/const cachedTools = \[...upstreamTools.map(addAccountSelector), customAccountTool\];/const cachedTools = [...upstreamTools.map(addAccountSelector), customAccountTool, ...fsTools];/" "$APP"
elif ! grep -q "customAccountTool, ...fsTools" "$APP"; then
  echo "cachedTools anchor missing"; exit 2
fi

if ! grep -q "HORIZONS_FS_ROUTER_V1" "$APP"; then
  sed -i "/async function callHostingerTool(toolName, args = {}, label = 'request') {/a\
  // HORIZONS_FS_ROUTER_V1\
  if (fsTools.some((tool) => tool.name === toolName)) {\
    if (!args.domain) throw new Error('domain is required for filesystem tools');\
    const account = await resolveAccount(args);\
    const rows = await listWebsitesFor(account, { domain: args.domain });\
    const target = rows.find((x) => String(x?.domain || '').toLowerCase() === String(args.domain).toLowerCase());\
    if (!target?.username || !target?.root_directory) throw new Error('Filesystem target not found for domain: ' + args.domain);\
    return handleFsTool(toolName, args, target);\
  }" "$APP"
fi

grep -q "HORIZONS_FS_ROUTER_V1" "$APP" || { echo "router patch missing"; exit 3; }
grep -q "customAccountTool, ...fsTools" "$APP" || { echo "tool list patch missing"; exit 4; }
node --check "$APP"
echo "HORIZONS_FS_PATCH_OK"
