import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const cssPath = path.join(out, 'assets', 'styles.css');

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) walk(full, files);
    else if (item.isFile() && item.name.endsWith('.html')) files.push(full);
  }
  return files;
}

function stripTags(s = '') {
  return s.replace(/<[^>]*>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
}

function balancedTag(html, start, tag) {
  if (start < 0) return null;
  const re = new RegExp(`<\\/?${tag}\\b[^>]*>`, 'gi');
  re.lastIndex = start;
  let depth = 0;
  let first = -1;
  let m;
  while ((m = re.exec(html))) {
    const closing = /^<\//.test(m[0]);
    if (!closing) {
      if (first < 0) first = m.index;
      depth++;
    } else {
      depth--;
      if (depth === 0 && first >= 0) {
        return { start: first, end: re.lastIndex, html: html.slice(first, re.lastIndex) };
      }
    }
  }
  return null;
}

function byClass(html, className, tag = 'div') {
  const re = new RegExp(`<${tag}\\b[^>]*class=["'][^"']*\\b${className}\\b[^"']*["'][^>]*>`, 'i');
  const m = re.exec(html);
  return m ? balancedTag(html, m.index, tag) : null;
}

function nativeFaqSection(html) {
  const patterns = [
    /<section class="dp-section dp-faq" id="faq">/i,
    /<section class="tk-section tk-faq" id="faq">/i
  ];
  for (const re of patterns) {
    const m = re.exec(html);
    if (m) return balancedTag(html, m.index, 'section');
  }
  return null;
}

function normalizeQuestion(q = '') {
  return stripTags(q)
    .replace(/[؟?!،,.؛:]/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

function contextItems(wrapHtml = '') {
  const items = [];
  const re = /<details class="context-faq">([\s\S]*?)<\/details>/gi;
  let m;
  while ((m = re.exec(wrapHtml))) {
    const body = m[1];
    const q = ((body.match(/<summary>[\s\S]*?<span>([\s\S]*?)<\/span>[\s\S]*?<\/summary>/i) || [,''])[1]).trim();
    const a = ((body.match(/<div class="context-faq-answer">([\s\S]*?)<\/div>/i) || [,''])[1]).trim();
    if (q && a) items.push({ q, a });
  }
  return items;
}

function nativeItems(sectionHtml = '') {
  const items = [];
  const re = /<details(?:\s[^>]*)?>([\s\S]*?)<\/details>/gi;
  let m;
  while ((m = re.exec(sectionHtml))) {
    const body = m[1];
    const q = ((body.match(/<summary>([\s\S]*?)<\/summary>/i) || [,''])[1]).trim();
    let a = body.replace(/<summary>[\s\S]*?<\/summary>/i, '').trim();
    if (q && a) items.push({ q, a });
  }
  return items;
}

function uniqueItems(items = []) {
  const seen = new Set();
  return items.filter(item => {
    const key = normalizeQuestion(item.q);
    if (!key || seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

function itemHtml(item) {
  return `<details class="unified-faq-item"><summary><span>${item.q}</span><b aria-hidden="true">+</b></summary><div class="unified-faq-answer">${item.a}</div></details>`;
}

function unifiedSection(items) {
  return `<section class="unified-faq-section" id="faq">
  <div class="container">
    <header class="unified-faq-heading">
      <span>أسئلة شائعة</span>
      <h2>كل ما تحتاج تعرفه قبل الحجز</h2>
      <p>جمعنا أهم أسئلة التخطيط والحجز في مكان واحد، بإجابات مختصرة وتفاصيل إضافية عند الحاجة.</p>
    </header>
    <div class="unified-faq-grid">${items.map(itemHtml).join('')}</div>
  </div>
</section>`;
}

function standaloneContextWrap(wrapHtml) {
  const items = uniqueItems(contextItems(wrapHtml));
  if (!items.length) return wrapHtml;
  return `<div class="context-faq-wrap context-faq-wrap-unified">
    <div class="context-faq-head"><span>أسئلة شائعة</span><h3>إجابات سريعة قبل الحجز</h3></div>
    <div class="unified-faq-grid">${items.map(itemHtml).join('')}</div>
  </div>`;
}

let merged = 0;
let compacted = 0;

for (const file of walk(out)) {
  let html = fs.readFileSync(file, 'utf8');
  const contextWrap = byClass(html, 'context-faq-wrap', 'div');
  if (!contextWrap) continue;

  const native = nativeFaqSection(html);
  if (native) {
    const items = uniqueItems([...contextItems(contextWrap.html), ...nativeItems(native.html)]);
    if (!items.length) continue;

    // Remove the keyword-content FAQ from its earlier section, then replace the native FAQ with one unified block.
    html = html.slice(0, contextWrap.start) + html.slice(contextWrap.end);

    // Re-find the native section after the first removal because offsets changed.
    const nativeAfter = nativeFaqSection(html);
    if (!nativeAfter) continue;
    const replacement = unifiedSection(items);
    html = html.slice(0, nativeAfter.start) + replacement + html.slice(nativeAfter.end);
    fs.writeFileSync(file, html);
    merged++;
  } else {
    const replacement = standaloneContextWrap(contextWrap.html);
    html = html.slice(0, contextWrap.start) + replacement + html.slice(contextWrap.end);
    fs.writeFileSync(file, html);
    compacted++;
  }
}

if (fs.existsSync(cssPath)) {
  let css = fs.readFileSync(cssPath, 'utf8');
  const marker = 'unified-faq-two-column-v1';
  if (!css.includes(marker)) {
    css += `
/* ${marker} */
.unified-faq-section{padding:64px 0;background:linear-gradient(180deg,#f7f9ff 0%,#fff 100%)}
.unified-faq-section>.container{max-width:1120px}
.unified-faq-heading{max-width:760px;margin:0 auto 26px;text-align:center}
.unified-faq-heading>span{display:inline-block;margin-bottom:7px;color:#2f62ea;font-size:14px;font-weight:900}
.unified-faq-heading h2{margin:0 0 10px;color:#142d72;font-size:clamp(27px,2.8vw,38px);line-height:1.3}
.unified-faq-heading p{margin:0;color:#6b758c;font-size:15px;line-height:1.8}
.unified-faq-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px 14px;align-items:start}
.unified-faq-item{min-width:0;margin:0;border:1px solid #e0e7f3;border-radius:16px;background:#fff;overflow:hidden;box-shadow:0 7px 22px rgba(22,47,112,.045)}
.unified-faq-item summary{display:flex;align-items:center;justify-content:space-between;gap:14px;cursor:pointer;list-style:none;padding:15px 17px;color:#193778;font-size:15px;font-weight:850;line-height:1.55}
.unified-faq-item summary::-webkit-details-marker{display:none}
.unified-faq-item summary b{display:grid;place-items:center;flex:0 0 28px;width:28px;height:28px;border-radius:50%;background:#edf3ff;color:#2f5fe2;font-size:18px;line-height:1;transition:transform .2s ease}
.unified-faq-item[open] summary b{transform:rotate(45deg)}
.unified-faq-answer{padding:0 17px 16px;border-top:1px solid #edf1f7;color:#5f6980}
.unified-faq-answer p{margin:12px 0 0;color:#5f6980;font-size:15px;line-height:1.85}
.unified-faq-answer p+p{margin-top:9px}
.context-faq-wrap-unified{max-width:1040px!important;margin:30px auto 0!important;padding-top:26px!important}
.context-faq-wrap-unified .context-faq-head{margin-bottom:14px!important}
.context-faq-wrap-unified .unified-faq-grid{margin-top:0}
@media(max-width:760px){
  .unified-faq-section{padding:46px 0}
  .unified-faq-heading{text-align:right;margin-bottom:20px}
  .unified-faq-grid{grid-template-columns:1fr;gap:10px}
  .unified-faq-item summary{padding:14px 15px;font-size:15px}
  .unified-faq-answer{padding:0 15px 15px}
}
`;
    fs.writeFileSync(cssPath, css);
  }
}

console.log(`Merged duplicate FAQ sections on ${merged} pages and compacted standalone FAQ content on ${compacted} pages.`);
