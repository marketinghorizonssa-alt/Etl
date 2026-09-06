import fs from 'node:fs';
import path from 'node:path';

const file = path.resolve('dist', 'index.html');
if (!fs.existsSync(file)) process.exit(0);

let html = fs.readFileSync(file, 'utf8');
const before = html;
let changedCards = 0;
let routedHoneymoonCard = false;

html = html.replace(/(<a\b[^>]*class="[^"]*\bdestination-card\b[^"]*"[^>]*>[\s\S]*?<div>)([\s\S]*?)(<\/div><\/a>)/g, (match, start, inner, end) => {
  const originalStart = start;
  const originalInner = inner;
  const isHoneymoonCard = /<strong>\s*شهر العسل\s*<\/strong>/.test(inner);

  if (isHoneymoonCard) {
    start = start.replace(/href="[^"]*"/, 'href="/رحلات-الكروز-وشهر-العسل/"');
    inner = inner.replace(/اكتشف الرحلة|اكتشف الوجهة/g, 'اكتشف الخدمة');
    routedHoneymoonCard = true;
  }

  inner = inner.replace(/<small>[\s\S]*?<\/small>/g, '');
  if (!isHoneymoonCard) {
    inner = inner.replace(/اكتشف الرحلة/g, 'اكتشف الوجهة');
  }

  if (start !== originalStart || inner !== originalInner) changedCards += 1;
  return `${start}${inner}${end}`;
});

// Visual fallback in case a future card template injects a small price line again.
if (!html.includes('homepage-destination-cards-cleanup-v1')) {
  html = html.replace('</head>', `<style id="homepage-destination-cards-cleanup-v1">\n#destinations .destination-card small{display:none!important}\n</style></head>`);
}

if (html !== before) {
  fs.writeFileSync(file, html);
}

console.log(`Homepage destination cards cleaned: removed price lines, routed honeymoon card=${routedHoneymoonCard}, changed ${changedCards} card(s).`);
