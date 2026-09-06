import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');

function walk(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (entry.isFile() && entry.name === 'index.html') files.push(full);
  }
  return files;
}

let updatedFiles = 0;
let updatedInputs = 0;

for (const file of walk(out)) {
  let html = fs.readFileSync(file, 'utf8');
  let changed = false;

  html = html.replace(/<input\b([^>]*\bname=["']privacy_consent["'][^>]*)>/gi, (full, attrs) => {
    if (/\bchecked(?:\s*=|\s|$)/i.test(attrs)) return full;
    changed = true;
    updatedInputs += 1;
    return `<input${attrs} checked>`;
  });

  if (changed) {
    fs.writeFileSync(file, html);
    updatedFiles += 1;
  }
}

console.log(`Defaulted privacy consent checkbox to checked on ${updatedInputs} form(s) across ${updatedFiles} page(s).`);
