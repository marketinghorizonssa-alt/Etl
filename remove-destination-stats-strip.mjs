import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const cssPath = path.join(out, 'assets', 'styles.css');

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

const sectionPatterns = [
  /<section\b[^>]*class=["'][^"']*\bdp-stats\b[^"']*["'][^>]*>[\s\S]*?<\/section>\s*/gi,
  /<section\b[^>]*class=["'][^"']*\btk-stats\b[^"']*["'][^>]*>[\s\S]*?<\/section>\s*/gi,
  /<section\b[^>]*class=["'][^"']*\bdestination-stats\b[^"']*["'][^>]*>[\s\S]*?<\/section>\s*/gi
];

let changedPages = 0;
let removedSections = 0;

for (const file of walk(out)) {
  let html = fs.readFileSync(file, 'utf8');
  const original = html;

  for (const re of sectionPatterns) {
    html = html.replace(re, () => {
      removedSections += 1;
      return '';
    });
  }

  if (html !== original) {
    fs.writeFileSync(file, html);
    changedPages += 1;
  }
}

// Safety guard in case a later/legacy template emits the strip with the same classes.
if (fs.existsSync(cssPath)) {
  let css = fs.readFileSync(cssPath, 'utf8');
  const marker = 'remove-destination-stats-strip-v1';
  if (!css.includes(marker)) {
    css += `\n/* ${marker} */\n.dp-stats,.tk-stats,.destination-stats{display:none!important}\n`;
    fs.writeFileSync(cssPath, css);
  }
}

console.log(`Removed ${removedSections} destination stats strip(s) from ${changedPages} page(s).`);
