import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const branchPages = ['makkah-office', 'madina-office'];

for (const slug of branchPages) {
  const file = path.join(out, slug, 'index.html');
  if (!fs.existsSync(file)) continue;

  let html = fs.readFileSync(file, 'utf8');

  // Branch pages should start directly with the branch identity, without breadcrumb clutter.
  html = html.replace(/<nav class="page-breadcrumb"[^>]*>[\s\S]*?<\/nav>/, '');

  fs.writeFileSync(file, html);
}

const cssPath = path.join(out, 'assets', 'styles.css');
if (fs.existsSync(cssPath)) {
  let css = fs.readFileSync(cssPath, 'utf8');
  const marker = 'branch-page-compact-hero-v1';

  if (!css.includes(marker)) {
    css += `\n/* ${marker} */\n.branch-page-hero .branch-hero-inner{padding:30px 0 34px;max-width:1080px}\n.branch-page-hero h1{font-size:clamp(1.9rem,3.8vw,3rem);margin-bottom:8px}\n.branch-page-hero p{font-size:.95rem;line-height:1.7}\n.branch-page-hero .branch-hero-actions{margin-top:18px}\n@media(max-width:900px){.branch-page-hero .branch-hero-inner{padding:26px 0 30px}}\n@media(max-width:620px){.branch-page-hero .branch-hero-inner{padding:22px 0 26px}.branch-page-hero h1{font-size:1.85rem}.branch-page-hero .branch-hero-actions{margin-top:14px}}\n`;
    fs.writeFileSync(cssPath, css);
  }
}

console.log('Removed branch breadcrumbs and compacted branch hero covers.');
