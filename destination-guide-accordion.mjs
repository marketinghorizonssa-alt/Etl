import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const cssPath = path.join(out, 'assets', 'styles.css');
const marker = 'destination-guide-accordion-v1';

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) walk(full, files);
    else if (item.isFile() && item.name.endsWith('.html')) files.push(full);
  }
  return files;
}

function transformSection(section, slug) {
  if (!slug || slug === 'home') return section;

  // Keep only the useful label/title above the list; remove generic explanatory copy.
  section = section.replace(
    /(<header class="contextual-heading">[\s\S]*?<h2>[\s\S]*?<\/h2>)\s*<p>[\s\S]*?<\/p>([\s\S]*?<\/header>)/i,
    '$1$2'
  );

  // Turn the visible keyword cards into native accordions so only the useful titles
  // are visible initially while the supporting text remains available on tap/click.
  section = section.replace(
    /<article class="context-card">\s*<span class="context-card-index">([\s\S]*?)<\/span>\s*<h3>([\s\S]*?)<\/h3>\s*<p>([\s\S]*?)<\/p>\s*<\/article>/gi,
    (_m, index, title, answer) => `
      <details class="context-card context-guide-item">
        <summary>
          <span class="context-card-index">${index.trim()}</span>
          <h3>${title.trim()}</h3>
          <b class="context-guide-toggle" aria-hidden="true">+</b>
        </summary>
        <div class="context-guide-answer"><p>${answer.trim()}</p></div>
      </details>`
  );

  return section;
}

let patched = 0;
for (const file of walk(out)) {
  let html = fs.readFileSync(file, 'utf8');
  const before = html;
  html = html.replace(
    /<section class="contextual-seo contextual-seo-polished"\s+data-contextual-seo="([^"]+)">[\s\S]*?<\/section>/gi,
    (section, slug) => transformSection(section, slug)
  );
  if (html !== before) {
    fs.writeFileSync(file, html);
    patched++;
  }
}

const css = `
/* ${marker} */
.contextual-seo-polished[data-contextual-seo]:not([data-contextual-seo="home"]){
  padding:40px 0!important;
  background:linear-gradient(180deg,#f8faff 0%,#fff 100%)!important;
}
.contextual-seo-polished[data-contextual-seo]:not([data-contextual-seo="home"]) .contextual-heading{
  max-width:760px!important;
  margin:0 auto 18px!important;
  text-align:center!important;
}
.contextual-seo-polished[data-contextual-seo]:not([data-contextual-seo="home"]) .contextual-heading>span{
  margin-bottom:5px!important;
  font-size:13px!important;
}
.contextual-seo-polished[data-contextual-seo]:not([data-contextual-seo="home"]) .contextual-heading h2{
  margin:0!important;
  font-size:clamp(24px,2.5vw,34px)!important;
  line-height:1.35!important;
}
.contextual-seo-polished[data-contextual-seo]:not([data-contextual-seo="home"]) .context-card-grid{
  display:grid!important;
  grid-template-columns:repeat(2,minmax(0,1fr))!important;
  gap:10px 12px!important;
  align-items:start!important;
}
.contextual-seo-polished[data-contextual-seo]:not([data-contextual-seo="home"]) .context-guide-item{
  min-height:0!important;
  padding:0!important;
  border:1px solid #e1e7f2!important;
  border-radius:15px!important;
  background:#fff!important;
  box-shadow:0 5px 16px rgba(23,47,114,.035)!important;
  overflow:hidden!important;
}
.contextual-seo-polished[data-contextual-seo]:not([data-contextual-seo="home"]) .context-guide-item summary{
  display:grid!important;
  grid-template-columns:auto minmax(0,1fr) auto!important;
  align-items:center!important;
  gap:10px!important;
  min-height:62px!important;
  padding:12px 14px!important;
  cursor:pointer!important;
  list-style:none!important;
}
.contextual-seo-polished[data-contextual-seo]:not([data-contextual-seo="home"]) .context-guide-item summary::-webkit-details-marker{display:none!important}
.contextual-seo-polished[data-contextual-seo]:not([data-contextual-seo="home"]) .context-guide-item .context-card-index{
  min-width:30px!important;
  width:30px!important;
  height:25px!important;
  margin:0!important;
  padding:0!important;
  font-size:11px!important;
}
.contextual-seo-polished[data-contextual-seo]:not([data-contextual-seo="home"]) .context-guide-item h3{
  margin:0!important;
  font-size:16px!important;
  line-height:1.5!important;
  color:#173274!important;
}
.context-guide-toggle{
  display:grid!important;
  place-items:center!important;
  width:28px!important;
  height:28px!important;
  border-radius:50%!important;
  background:#edf3ff!important;
  color:#2d5de1!important;
  font-size:18px!important;
  line-height:1!important;
  transition:transform .2s ease!important;
}
.context-guide-item[open] .context-guide-toggle{transform:rotate(45deg)!important}
.context-guide-answer{
  padding:0 14px 14px!important;
  border-top:1px solid #edf1f7!important;
}
.context-guide-answer p{
  margin:11px 0 0!important;
  color:#5f6980!important;
  font-size:14.5px!important;
  line-height:1.82!important;
}
@media(max-width:760px){
  .contextual-seo-polished[data-contextual-seo]:not([data-contextual-seo="home"]){padding:28px 0!important}
  .contextual-seo-polished[data-contextual-seo]:not([data-contextual-seo="home"]) .contextual-heading{
    text-align:right!important;
    margin-bottom:14px!important;
  }
  .contextual-seo-polished[data-contextual-seo]:not([data-contextual-seo="home"]) .contextual-heading h2{
    font-size:23px!important;
  }
  .contextual-seo-polished[data-contextual-seo]:not([data-contextual-seo="home"]) .context-card-grid{
    grid-template-columns:1fr!important;
    gap:8px!important;
  }
  .contextual-seo-polished[data-contextual-seo]:not([data-contextual-seo="home"]) .context-guide-item summary{
    min-height:56px!important;
    padding:11px 12px!important;
  }
  .contextual-seo-polished[data-contextual-seo]:not([data-contextual-seo="home"]) .context-guide-item h3{
    font-size:15px!important;
  }
  .context-guide-answer{padding:0 12px 12px!important}
  .context-guide-answer p{font-size:14px!important;line-height:1.75!important}
}
`;

if (fs.existsSync(cssPath)) {
  let styles = fs.readFileSync(cssPath, 'utf8');
  styles = styles.replace(/\/\* destination-guide-accordion-v\d+ \*\/[\s\S]*?(?=\/\* [a-z0-9-]+-v\d+ \*\/|$)/g, '');
  styles += `\n${css}\n`;
  fs.writeFileSync(cssPath, styles);
}

const styleTag = `<style id="${marker}">${css}</style>`;
for (const file of walk(out)) {
  let html = fs.readFileSync(file, 'utf8');
  if (!html.includes('context-guide-item')) continue;
  html = html.replace(/<style id=["']destination-guide-accordion-v\d+["'][\s\S]*?<\/style>/gi, '');
  html = html.replace('</head>', `${styleTag}</head>`);
  fs.writeFileSync(file, html);
}

console.log(`Converted destination quick-guide cards to compact accordions on ${patched} page(s).`);
