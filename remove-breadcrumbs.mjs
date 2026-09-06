import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');

function walk(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else if (entry.isFile() && entry.name === 'index.html') files.push(full);
  }
  return files;
}

for (const file of walk(out)) {
  let html = fs.readFileSync(file, 'utf8');
  const before = html;

  // Remove visual breadcrumb containers by common class/id naming.
  html = html.replace(/<(nav|div|section|ol|ul|p)([^>]*(?:class|id)=["'][^"']*(?:breadcrumb|breadcrumbs|crumbs|page-crumb|page_crumb)[^"']*["'][^>]*)>[\s\S]*?<\/\1>/gi, '');

  // Remove breadcrumb navigation identified by accessibility labels.
  html = html.replace(/<nav([^>]*aria-label=["'](?:breadcrumb|breadcrumbs|مسار التنقل|مسار الصفحة)["'][^>]*)>[\s\S]*?<\/nav>/gi, '');

  if (html !== before) fs.writeFileSync(file, html);
}

// CSS fallback so any breadcrumb markup introduced by a later template variation stays hidden.
const cssPath = path.join(out, 'assets', 'styles.css');
if (fs.existsSync(cssPath)) {
  let css = fs.readFileSync(cssPath, 'utf8');
  if (!css.includes('remove-breadcrumbs-v1')) {
    css += `\n/* remove-breadcrumbs-v1 */\n[class*="breadcrumb" i],[id*="breadcrumb" i],[class~="crumbs"],[class*="page-crumb" i]{display:none!important}\n`;
    fs.writeFileSync(cssPath, css);
  }
}

console.log('Removed visual breadcrumbs from all generated pages.');
