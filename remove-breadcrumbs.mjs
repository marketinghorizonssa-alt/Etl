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

  // Exact Etlaala legal/branch breadcrumb markup.
  html = html.replace(/<nav\s+class=["']page-breadcrumb["'][^>]*>[\s\S]*?<\/nav>/gi, '');

  // Accessibility-labelled breadcrumb navigation.
  html = html.replace(/<nav[^>]*aria-label=["'](?:breadcrumb|breadcrumbs|مسار التنقل|مسار الصفحة)["'][^>]*>[\s\S]*?<\/nav>/gi, '');

  // Common breadcrumb containers used by other generated page variants.
  html = html.replace(/<(nav|div|section|ol|ul|p)([^>]*(?:class|id)=["'][^"']*(?:breadcrumb|breadcrumbs|crumbs|page-crumb|page_crumb)[^"']*["'][^>]*)>[\s\S]*?<\/\1>/gi, '');

  // Last-resort visual breadcrumb signature: homepage + arrow inside a short nav.
  html = html.replace(/<nav\b[^>]*>[\s\S]{0,1200}?<a\b[^>]*href=["'][^"']*["'][^>]*>\s*الرئيسية\s*<\/a>[\s\S]{0,600}?(?:←|&larr;|&#8592;)[\s\S]{0,600}?<\/nav>/gi, '');

  // Inline fallback avoids any stale external stylesheet keeping a breadcrumb visible.
  if (!html.includes('breadcrumb-inline-kill-v2')) {
    html = html.replace(/<\/head>/i, '<style id="breadcrumb-inline-kill-v2">.page-breadcrumb,[class*="breadcrumb" i],[id*="breadcrumb" i],[class~="crumbs"],[class*="page-crumb" i]{display:none!important}</style></head>');
  }

  fs.writeFileSync(file, html);
}

const cssPath = path.join(out, 'assets', 'styles.css');
if (fs.existsSync(cssPath)) {
  let css = fs.readFileSync(cssPath, 'utf8');
  if (!css.includes('remove-breadcrumbs-v2')) {
    css += `\n/* remove-breadcrumbs-v2 */\n.page-breadcrumb,[class*="breadcrumb" i],[id*="breadcrumb" i],[class~="crumbs"],[class*="page-crumb" i]{display:none!important}\n`;
    fs.writeFileSync(cssPath, css);
  }
}

console.log('Removed breadcrumbs from every generated page with inline and stylesheet fallbacks.');
