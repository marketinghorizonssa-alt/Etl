import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
if (!fs.existsSync(out)) process.exit(0);

const europeAnchor = '<a href="/europe/"><span>أوروبا</span><small>برامج وكروز أوروبا</small></a>';
const europeGroup = `<div class="europe-menu-group" data-europe-menu-group="true">
  <a class="europe-menu-parent" href="/europe/"><span>أوروبا</span><small>برامج وكروز أوروبا</small></a>
  <div class="europe-menu-children" aria-label="وجهات أوروبا">
    <a href="/europe/austria/"><span>النمسا</span><small>فيينا وزيلامسي</small></a>
    <a href="/europe/france/"><span>فرنسا</span><small>باريس وديزني</small></a>
    <a href="/europe/italy/"><span>إيطاليا</span><small>روما وميلانو</small></a>
    <a href="/europe/london/"><span>لندن</span><small>عروض وبرامج لندن</small></a>
    <a href="/europe/switzerland/"><span>سويسرا</span><small>إنترلاكن ولوسيرن</small></a>
    <a href="/europe/poland/"><span>بولندا</span><small>وارسو وكراكوف</small></a>
  </div>
</div>`;

const style = `<style id="europe-menu-pages-v1">
.dest-dropdown-menu>.europe-menu-group{grid-column:1/-1!important;display:grid!important;gap:6px!important;padding-top:7px!important;border-top:1px solid #edf0f6!important}
.dest-dropdown-menu>.europe-menu-group>.europe-menu-parent{background:#f4f6ff!important;border:1px solid #e4e9f5!important}
.europe-menu-children{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:5px!important}
.europe-menu-children>a{padding:8px 10px!important;background:#fbfcff!important;border:1px solid #edf0f7!important}
.europe-menu-children>a span{font-size:.76rem!important}
.europe-menu-children>a small{font-size:.58rem!important}
.mobile-dest-grid>.europe-menu-group{grid-column:1/-1!important;display:grid!important;gap:6px!important;padding-top:7px!important;border-top:1px solid #edf0f6!important}
.mobile-dest-grid>.europe-menu-group>.europe-menu-parent{background:#f4f6ff!important;border-color:#dfe5f3!important}
.mobile-dest-grid .europe-menu-children{grid-template-columns:repeat(2,minmax(0,1fr))!important}
@media(max-width:480px){.mobile-dest-grid>.europe-menu-group{grid-column:1!important}.mobile-dest-grid .europe-menu-children{grid-template-columns:repeat(2,minmax(0,1fr))!important}}
</style>`;

function htmlFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...htmlFiles(full));
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

let changed = 0;
for (const file of htmlFiles(out)) {
  let html = fs.readFileSync(file, 'utf8');
  const before = html;
  if (!html.includes('data-europe-menu-group="true"') && html.includes(europeAnchor)) {
    html = html.split(europeAnchor).join(europeGroup);
  } else if (html.includes('data-europe-menu-group="true"')) {
    html = html.replace(/<div class="europe-menu-group" data-europe-menu-group="true">[\s\S]*?<\/div>\s*<\/div>/, `${europeGroup}</div>`);
  }
  if (html.includes('data-europe-menu-group="true"') && !html.includes('id="europe-menu-pages-v1"')) {
    html = html.replace('</head>', `${style}</head>`);
  }
  if (html !== before) {
    fs.writeFileSync(file, html);
    changed += 1;
  }
}

console.log(`Europe menu pages applied to ${changed} HTML files.`);
