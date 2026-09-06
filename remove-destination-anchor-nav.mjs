import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) walk(full, files);
    else if (item.isFile() && item.name.endsWith('.html')) files.push(full);
  }
  return files;
}

let changed = 0;
for (const file of walk(out)) {
  let html = fs.readFileSync(file, 'utf8');
  if (!/data-premium-destination=/i.test(html)) continue;

  const before = html;
  html = html
    .replace(/\s*<nav\b[^>]*class=["'][^"']*\bdp-anchor\b[^"']*["'][^>]*>[\s\S]*?<\/nav>\s*/gi, '\n')
    .replace(/\s*<nav\b[^>]*class=["'][^"']*\btk-anchor\b[^"']*["'][^>]*>[\s\S]*?<\/nav>\s*/gi, '\n');

  if (html !== before) {
    fs.writeFileSync(file, html);
    changed++;
  }
}

console.log(`Removed sticky destination anchor navigation from ${changed} destination pages.`);
