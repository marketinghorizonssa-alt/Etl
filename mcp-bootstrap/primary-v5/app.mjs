import crypto from 'node:crypto';
import process from 'node:process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import express from 'express';
import { createFilesystemLayer } from './filesystem.mjs';
import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { CallToolRequestSchema, ListToolsRequestSchema, isInitializeRequest } from '@modelcontextprotocol/sdk/types.js';

const MODERN_PROTOCOL = '2026-07-28';
const LEGACY_PROTOCOL = '2025-06-18';
const BRIDGE_VERSION = '5.0.0';
const ACCOUNT_SELECTOR = 'hostinger_account';

function humanizeAccountName(value) {
  const clean = String(value || '').trim().replace(/^_+|_+$/g, '');
  if (!clean) return 'Hostinger Account';
  return clean
    .split(/_+/)
    .filter(Boolean)
    .map((part) => {
      if (/^[A-Z0-9]{2,5}$/.test(part)) return part;
      return part.charAt(0).toUpperCase() + part.slice(1).toLowerCase();
    })
    .join(' ');
}

function discoverAccounts() {
  const accounts = [];
  const seenTokens = new Set();
  const usedIds = new Set();
  let nextAccountNumber = 2;

  const nextId = () => {
    while (usedIds.has(`account_${nextAccountNumber}`)) nextAccountNumber += 1;
    const id = `account_${nextAccountNumber}`;
    nextAccountNumber += 1;
    return id;
  };

  const add = (token, requestedId, label) => {
    const clean = String(token || '').trim();
    if (!clean || seenTokens.has(clean)) return;

    let id = requestedId ? String(requestedId).trim() : '';
    if (!id || usedIds.has(id)) id = nextId();

    seenTokens.add(clean);
    usedIds.add(id);
    accounts.push({ id, label: String(label || id).trim() || id, token: clean });
  };

  // Primary account (backward compatible).
  add(process.env.HOSTINGER_API_TOKEN, 'primary', process.env.HOSTINGER_ACCOUNT_NAME || 'Primary');

  // Existing v4.5 Viora variable (backward compatible).
  add(
    process.env.HOSTINGER_API_TOKEN_2 || process.env.VIORA,
    'account_2',
    process.env.HOSTINGER_ACCOUNT_2_NAME || process.env.HOSTINGER_LABEL_VIORA || 'Viora',
  );

  // Existing numbered variables remain supported: HOSTINGER_API_TOKEN_3 ... _50.
  for (let i = 2; i <= 50; i += 1) {
    add(
      process.env[`HOSTINGER_API_TOKEN_${i}`],
      `account_${i}`,
      process.env[`HOSTINGER_ACCOUNT_${i}_NAME`] || `Account ${i}`,
    );
  }

  // Direct compatibility for the current third account. This makes ETLALA=<token>
  // work immediately after deploying v4.6, without renaming the environment variable.
  add(process.env.ETLALA, undefined, process.env.HOSTINGER_LABEL_ETLALA || 'Etlala');

  // Preferred open-ended format: one variable per account, no code edits needed.
  // Examples:
  //   HOSTINGER_TOKEN_ETLALA=<token>
  //   HOSTINGER_TOKEN_NEW_CLIENT=<token>
  //   HOSTINGER_ACCOUNT_SALWA_TOKEN=<token>
  // Optional label override: HOSTINGER_LABEL_ETLALA="إطلالة"
  const envKeys = Object.keys(process.env).sort();
  for (const key of envKeys) {
    let suffix = null;
    let match = key.match(/^HOSTINGER_TOKEN_([A-Z0-9_]+)$/);
    if (match) suffix = match[1];
    if (!suffix) {
      match = key.match(/^HOSTINGER_ACCOUNT_([A-Z][A-Z0-9_]*)_TOKEN$/);
      if (match) suffix = match[1];
    }
    if (!suffix) continue;

    const label = process.env[`HOSTINGER_LABEL_${suffix}`]
      || process.env[`HOSTINGER_ACCOUNT_${suffix}_NAME`]
      || humanizeAccountName(suffix);
    add(process.env[key], undefined, label);
  }

  // Truly arbitrary plain environment-variable names can be opted in safely.
  // Example: HOSTINGER_ACCOUNT_VARS=VIORA,ETLALA,CLIENT_X and then CLIENT_X=<token>.
  const plainAccountVars = String(process.env.HOSTINGER_ACCOUNT_VARS || '')
    .split(/[\n,;]+/)
    .map((x) => x.trim())
    .filter(Boolean);
  for (const key of plainAccountVars) {
    if (!/^[A-Za-z_][A-Za-z0-9_]*$/.test(key)) {
      console.warn(`Ignoring invalid HOSTINGER_ACCOUNT_VARS entry: ${key}`);
      continue;
    }
    const suffix = key.toUpperCase();
    const label = process.env[`HOSTINGER_LABEL_${suffix}`] || humanizeAccountName(key);
    add(process.env[key], undefined, label);
  }

  // Packed token list remains supported for compatibility.
  const packed = String(process.env.HOSTINGER_API_TOKENS || '').trim();
  if (packed) {
    packed
      .split(/[\n,;]+/)
      .map((x) => x.trim())
      .filter(Boolean)
      .forEach((token, idx) => add(token, undefined, `Extra ${idx + 1}`));
  }

  return accounts;
}

const accounts = discoverAccounts();
if (!accounts.length) {
  console.error('Missing required environment variable: HOSTINGER_API_TOKEN');
  process.exit(1);
}
console.log(`Detected ${accounts.length} Hostinger API account credential(s): ${accounts.map((a) => a.id).join(', ')}`);

const upstreamPackage = JSON.parse(readFileSync(new URL('./node_modules/hostinger-api-mcp/package.json', import.meta.url), 'utf8'));
console.log(`Using hostinger-api-mcp ${upstreamPackage.version}`);
const port = Number(process.env.PORT || 3000);
const hostingerMcpEntry = fileURLToPath(new URL('./node_modules/hostinger-api-mcp/src/servers/hosting.js', import.meta.url));

async function openUpstream(account, label = 'request') {
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [hostingerMcpEntry],
    env: { ...process.env, HOSTINGER_API_TOKEN: account.token, DEBUG: process.env.DEBUG || 'false' },
  });
  transport.onclose = () => console.log(`[UPSTREAM ${account.id}/${label}] stdio closed`);
  transport.onerror = (error) => console.error(`[UPSTREAM ${account.id}/${label}] stdio error: ${error?.stack || error}`);
  const client = new Client({ name: `easttwist-hostinger-${account.id}-${label}`.slice(0, 80), version: BRIDGE_VERSION }, { capabilities: {} });
  await client.connect(transport);
  return { client, transport };
}

async function withFreshUpstream(account, label, fn) {
  const { client, transport } = await openUpstream(account, label);
  try { return await fn(client); }
  finally {
    try { await client.close(); } catch {}
    try { await transport.close(); } catch {}
  }
}

async function loadAllToolSchemas() {
  return withFreshUpstream(accounts[0], 'schema-cache', async (client) => {
    const tools = [];
    let cursor;
    do {
      const result = cursor ? await client.listTools({ cursor }) : await client.listTools();
      tools.push(...(result.tools || []));
      cursor = result.nextCursor;
    } while (cursor);
    return tools;
  });
}

function addAccountSelector(tool) {
  const schema = structuredClone(tool.inputSchema || { type: 'object', properties: {} });
  schema.type ||= 'object';
  schema.properties ||= {};
  schema.properties[ACCOUNT_SELECTOR] = {
    type: 'string',
    description: 'Optional Hostinger account selector. Use an account id or label returned by hostinger_listConnectedAccounts (for example primary, account_2, Etlala). Omit to auto-resolve by domain/username/order ID when possible.',
  };
  return { ...tool, inputSchema: schema };
}

const upstreamTools = await loadAllToolSchemas();
const customAccountTool = {
  name: 'hostinger_listConnectedAccounts',
  description: 'List Hostinger accounts configured in this V2 bridge without exposing API tokens.',
  inputSchema: { type: 'object', properties: {}, additionalProperties: false },
};
let cachedTools = [...upstreamTools.map(addAccountSelector), customAccountTool];
console.log(`Cached ${upstreamTools.length} Hostinger tool schemas + 1 multi-account helper`);

function extractJsonFromToolResult(result) {
  const textBlock = result?.content?.find?.((item) => item?.type === 'text' && typeof item.text === 'string');
  if (!textBlock) return null;
  try { return JSON.parse(textBlock.text); } catch { return null; }
}

function textResult(payload) {
  return { content: [{ type: 'text', text: JSON.stringify(payload) }] };
}

function accountPublic(account) {
  return { id: account.id, label: account.label };
}

function getAccountBySelector(selector) {
  if (!selector) return null;
  const needle = String(selector).trim().toLowerCase();
  return accounts.find((a) => a.id.toLowerCase() === needle || a.label.toLowerCase() === needle) || null;
}

async function rawCall(account, toolName, args, label) {
  return withFreshUpstream(account, label, async (client) => client.callTool({ name: toolName, arguments: args || {} }));
}

async function listWebsitesFor(account, filters = {}) {
  const all = [];
  const perPage = 100;
  for (let page = 1; page <= 100; page += 1) {
    const result = await rawCall(account, 'hosting_listWebsitesV1', { ...filters, page, per_page: perPage }, `route-websites-${page}`);
    if (result?.isError) return [];
    const payload = extractJsonFromToolResult(result);
    const rows = Array.isArray(payload?.data) ? payload.data : [];
    all.push(...rows);
    const total = Number(payload?.meta?.total ?? all.length);
    if (rows.length < perPage || all.length >= total) break;
  }
  return all;
}

async function listOrdersFor(account, filters = {}) {
  const all = [];
  const perPage = 100;
  for (let page = 1; page <= 100; page += 1) {
    const args = { ...filters, page, per_page: perPage };
    const result = await rawCall(account, 'hosting_listOrdersV1', args, `route-orders-${page}`);
    if (result?.isError) return [];
    const payload = extractJsonFromToolResult(result);
    const rows = Array.isArray(payload?.data) ? payload.data : [];
    all.push(...rows);
    const total = Number(payload?.meta?.total ?? all.length);
    if (rows.length < perPage || all.length >= total) break;
  }
  return all;
}

async function resolveAccount(args = {}) {
  const selector = args[ACCOUNT_SELECTOR];
  if (selector) {
    const selected = getAccountBySelector(selector);
    if (!selected) throw new Error(`Unknown Hostinger account selector: ${selector}`);
    return selected;
  }
  if (accounts.length === 1) return accounts[0];

  const domain = args.domain || args.website_domain;
  if (domain) {
    for (const account of accounts) {
      const rows = await listWebsitesFor(account, { domain });
      if (rows.some((x) => String(x?.domain).toLowerCase() === String(domain).toLowerCase())) return account;
    }
  }
  if (args.username) {
    for (const account of accounts) {
      const rows = await listWebsitesFor(account, { username: args.username });
      if (rows.length) return account;
    }
  }
  const orderId = args.order_id ?? (Array.isArray(args.order_ids) ? args.order_ids[0] : undefined);
  if (orderId !== undefined) {
    for (const account of accounts) {
      const rows = await listOrdersFor(account, { order_ids: [Number(orderId)] });
      if (rows.length) return account;
    }
  }
  return accounts[0];
}

const filesystemLayer = createFilesystemLayer({
  rawCall,
  listWebsitesFor,
  resolveAccount,
  extractJsonFromToolResult,
  textResult,
});
cachedTools = [...cachedTools, ...filesystemLayer.tools];
console.log('Added ' + filesystemLayer.tools.length + ' routed filesystem tools');
async function aggregateListTool(toolName, args) {
  const selector = args[ACCOUNT_SELECTOR];
  const targets = selector ? [getAccountBySelector(selector)].filter(Boolean) : accounts;
  if (!targets.length) throw new Error(`Unknown Hostinger account selector: ${selector}`);
  const cleanArgs = { ...args };
  delete cleanArgs[ACCOUNT_SELECTOR];
  delete cleanArgs.page;
  delete cleanArgs.per_page;
  const merged = [];
  for (const account of targets) {
    const rows = toolName === 'hosting_listWebsitesV1'
      ? await listWebsitesFor(account, cleanArgs)
      : await listOrdersFor(account, cleanArgs);
    for (const row of rows) merged.push({ ...row, hostinger_account: account.id, hostinger_account_label: account.label });
  }
  const page = Number(args.page || 1);
  const perPage = Number(args.per_page || 100);
  const start = Math.max(0, (page - 1) * perPage);
  return textResult({
    data: merged.slice(start, start + perPage),
    meta: { current_page: page, per_page: perPage, total: merged.length, accounts: targets.map(accountPublic) },
  });
}

async function callHostingerTool(toolName, args = {}, label = 'request') {
  if (filesystemLayer.has(toolName)) return filesystemLayer.call(toolName, args);
  if (toolName === customAccountTool.name) {
    return textResult({ data: accounts.map((a, index) => ({ ...accountPublic(a), primary: index === 0 })), total: accounts.length });
  }
  if (toolName === 'hosting_listWebsitesV1' || toolName === 'hosting_listOrdersV1') {
    return aggregateListTool(toolName, args);
  }
  const account = await resolveAccount(args);
  const cleanArgs = { ...args };
  delete cleanArgs[ACCOUNT_SELECTOR];
  const result = await rawCall(account, toolName, cleanArgs, `${label}-${account.id}`);
  console.log(`[ROUTER] ${toolName} -> ${account.id}${result?.isError ? ' (MCP error)' : ''}`);
  return result;
}

async function auditAccessibleHostingScope() {
  for (const account of accounts) {
    try {
      const websites = await listWebsitesFor(account);
      const usernames = new Set(websites.map((x) => x?.username).filter(Boolean));
      console.log(`[SELFTEST ${account.id}] auth OK: ${websites.length} websites across ${usernames.size || 'unknown'} hosting username(s)`);
    } catch (error) {
      console.error(`[SELFTEST ${account.id}] failed: ${error instanceof Error ? error.stack : String(error)}`);
    }
  }
}
await auditAccessibleHostingScope();

const app = express();
app.use(express.json({ limit: '12mb' }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, MCP-Session-Id, MCP-Protocol-Version, Mcp-Method, Mcp-Name, Last-Event-ID');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS');
  res.setHeader('Access-Control-Expose-Headers', 'MCP-Session-Id, MCP-Protocol-Version');
  next();
});
app.options('/mcp', (_req, res) => res.sendStatus(204));
app.get('/health', (_req, res) => res.json({
  status: 'ok', transport: 'streamable-http', authentication: 'none', upstream: 'hostinger-stdio-fresh-per-call',
  upstream_version: upstreamPackage.version, bridge_version: BRIDGE_VERSION, protocols: [MODERN_PROTOCOL, LEGACY_PROTOCOL],
  tools: cachedTools.length, hostinger_accounts: accounts.map(accountPublic),
}));

function jsonRpcResult(res, id, result, status = 200) { res.status(status).json({ jsonrpc: '2.0', id: id ?? null, result }); }
function jsonRpcError(res, id, code, message, status = 400, data) {
  const error = { code, message }; if (data !== undefined) error.data = data;
  res.status(status).json({ jsonrpc: '2.0', id: id ?? null, error });
}
function requestProtocol(req) {
  const header = req.headers['mcp-protocol-version'];
  const meta = req.body?.params?._meta?.['io.modelcontextprotocol/protocolVersion'];
  return String(header || meta || '');
}
function isModernEnvelope(req) { return req.body?.method === 'server/discover' || requestProtocol(req) === MODERN_PROTOCOL; }

async function handleModernRequest(req, res) {
  const body = req.body || {}; const method = body.method; const id = body.id ?? null;
  console.log(`[MCP modern] ${method} protocol=${requestProtocol(req) || MODERN_PROTOCOL}`);
  res.setHeader('MCP-Protocol-Version', MODERN_PROTOCOL);
  if (method === 'server/discover') return jsonRpcResult(res, id, {
    resultType: 'complete', supportedVersions: [MODERN_PROTOCOL], capabilities: { tools: {} },
    _meta: { 'io.modelcontextprotocol/serverInfo': { name: 'East Twist Hostinger MCP', version: BRIDGE_VERSION } },
    instructions: 'Manage multiple separate Hostinger accounts through one bridge. Reads across websites/orders are aggregated; domain/username/order-scoped operations are auto-routed. Full filesystem tools provide scoped list/read/write/patch/copy/move/delete/download/extract/find/chmod/zip/backup/restore access per website root.',
    ttlMs: 60000, cacheScope: 'private',
  });
  if (method === 'tools/list') return jsonRpcResult(res, id, { resultType: 'complete', tools: cachedTools, ttlMs: 60000, cacheScope: 'private' });
  if (method === 'tools/call') {
    const toolName = body?.params?.name;
    if (!toolName) return jsonRpcError(res, id, -32602, 'Missing tool name', 400);
    try {
      const result = await callHostingerTool(toolName, body?.params?.arguments || {}, `modern-${toolName}`);
      return jsonRpcResult(res, id, { resultType: 'complete', ...result });
    } catch (error) {
      console.error(`[MCP modern] ${toolName} failed: ${error instanceof Error ? error.stack : String(error)}`);
      return jsonRpcError(res, id, -32603, `Hostinger tool failed: ${toolName}: ${error?.message || error}`, 500);
    }
  }
  return jsonRpcError(res, id, -32601, `Method not found: ${method}`, 404);
}

const sessions = new Map();
function createDownstreamSession() {
  const downstreamServer = new Server({ name: 'East Twist Hostinger MCP', version: BRIDGE_VERSION }, { capabilities: { tools: {} } });
  downstreamServer.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: cachedTools }));
  downstreamServer.setRequestHandler(CallToolRequestSchema, async (request) => callHostingerTool(request.params.name, request.params.arguments || {}, `legacy-${request.params.name}`));
  let transport;
  transport = new StreamableHTTPServerTransport({
    sessionIdGenerator: () => crypto.randomUUID(),
    onsessioninitialized: (sessionId) => { sessions.set(sessionId, { transport, server: downstreamServer }); console.log(`[MCP legacy] session initialized: ${sessionId}`); },
  });
  transport.onclose = () => { if (transport.sessionId) sessions.delete(transport.sessionId); };
  return { transport, server: downstreamServer };
}

app.post('/mcp', async (req, res) => {
  const sessionId = req.headers['mcp-session-id'];
  if (isModernEnvelope(req)) return handleModernRequest(req, res);
  try {
    let session;
    if (typeof sessionId === 'string' && sessions.has(sessionId)) session = sessions.get(sessionId);
    else if (!sessionId && isInitializeRequest(req.body)) { session = createDownstreamSession(); await session.server.connect(session.transport); }
    else return jsonRpcError(res, req.body?.id, -32000, 'Invalid or missing MCP session', 400);
    await session.transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error(`[HTTP] POST /mcp failed: ${error instanceof Error ? error.stack : String(error)}`);
    if (!res.headersSent) jsonRpcError(res, req.body?.id, -32603, 'Internal MCP proxy error', 500);
  }
});

async function handleSessionRequest(req, res) {
  const sessionId = req.headers['mcp-session-id'];
  if (typeof sessionId !== 'string' || !sessions.has(sessionId)) {
    if (req.method === 'GET') { res.setHeader('Allow', 'POST'); res.sendStatus(405); return; }
    res.status(400).send('Invalid or missing MCP session ID'); return;
  }
  try { await sessions.get(sessionId).transport.handleRequest(req, res); }
  catch (error) { console.error(error); if (!res.headersSent) res.sendStatus(500); }
}
app.get('/mcp', handleSessionRequest);
app.delete('/mcp', handleSessionRequest);
app.get('/', (_req, res) => res.json({
  name: 'East Twist Hostinger MCP', version: BRIDGE_VERSION, mcp_endpoint: '/mcp', authentication: 'none',
  protocols: [MODERN_PROTOCOL, LEGACY_PROTOCOL], tools: cachedTools.length, hostinger_accounts: accounts.map(accountPublic),
}));

const httpServer = app.listen(port, '0.0.0.0', () => {
  console.log(`ChatGPT-compatible Hostinger MCP v${BRIDGE_VERSION} listening on port ${port}`);
  console.log(`Accounts configured: ${accounts.map((a) => a.id).join(', ')}`);
  console.log(`Tools exposed: ${cachedTools.length}`);
});
async function shutdown(signal) {
  console.log(`Received ${signal}; shutting down`); httpServer.close();
  for (const { transport, server } of sessions.values()) { try { await transport.close(); } catch {} try { await server.close(); } catch {} }
  process.exit(0);
}
process.on('SIGTERM', () => void shutdown('SIGTERM'));
process.on('SIGINT', () => void shutdown('SIGINT'));
