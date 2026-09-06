import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');

const duplicateToPrimary = {
  'georgia-2': 'georgia',
  'malaysia-2': 'malaysia',
  'maldives-2': 'maldives',
  'thailand-2': 'thailand',
  'turkey-2': 'turkiye'
};

const textExtensions = new Set(['.html', '.xml', '.txt', '.json', '.js', '.css']);

function walk(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => {
    const full = path.join(dir, entry.name);
    return entry.isDirectory() ? walk(full) : [full];
  });
}

let rewrittenFiles = 0;
for (const file of walk(out)) {
  if (!textExtensions.has(path.extname(file).toLowerCase())) continue;

  let text = fs.readFileSync(file, 'utf8');
  const original = text;

  // Remove duplicate destination URLs from sitemap-style XML blocks instead of
  // turning them into repeated primary URLs.
  if (path.extname(file).toLowerCase() === '.xml') {
    for (const duplicate of Object.keys(duplicateToPrimary)) {
      const escaped = duplicate.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      text = text
        .replace(new RegExp(`<url>\\s*[\\s\\S]*?<loc>[^<]*\\/${escaped}\\/?<\\/loc>[\\s\\S]*?<\\/url>`, 'gi'), '')
        .replace(new RegExp(`<sitemap>\\s*[\\s\\S]*?<loc>[^<]*\\/${escaped}\\/?<\\/loc>[\\s\\S]*?<\\/sitemap>`, 'gi'), '');
    }
  }

  // Point every remaining internal reference at the single canonical page.
  for (const [duplicate, primary] of Object.entries(duplicateToPrimary)) {
    text = text
      .replaceAll(`/${duplicate}/`, `/${primary}/`)
      .replaceAll(`/${duplicate}\"`, `/${primary}/\"`)
      .replaceAll(`/${duplicate}'`, `/${primary}/'`);
  }

  if (text !== original) {
    fs.writeFileSync(file, text);
    rewrittenFiles += 1;
  }
}

const removed = [];
for (const duplicate of Object.keys(duplicateToPrimary)) {
  const dir = path.join(out, duplicate);
  if (fs.existsSync(dir)) {
    fs.rmSync(dir, { recursive: true, force: true });
    removed.push(duplicate);
  }
}

console.log(`Removed duplicate destination pages: ${removed.join(', ') || 'none found'}. Rewritten references in ${rewrittenFiles} files.`);
