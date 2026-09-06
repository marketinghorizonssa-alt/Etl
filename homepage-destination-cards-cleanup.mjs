import fs from 'node:fs';
import path from 'node:path';

const file = path.resolve('dist', 'index.html');
if (!fs.existsSync(file)) process.exit(0);

let html = fs.readFileSync(file, 'utf8');
const before = html;
let changedCards = 0;

html = html.replace(/(<a\b[^>]*class="[^"]*\bdestination-card\b[^"]*"[^>]*>[\s\S]*?<div>)([\s\S]*?)(<\/div><\/a>)/g, (match, start, inner, end) => {
  const originalInner = inner;
  inner = inner.replace(/<small>[\s\S]*?<\/small>/g, '');
  inner = inner.replace(/اكتشف الرحلة/g, 'اكتشف الوجهة');
  if (inner !== originalInner) changedCards += 1;
  return `${start}${inner}${end}`;
});

// Visual fallback in case a future card template injects a small price line again.
if (!html.includes('homepage-destination-cards-cleanup-v1')) {
  html = html.replace('</head>', `<style id="homepage-destination-cards-cleanup-v1">\n#destinations .destination-card small{display:none!important}\n</style></head>`);
}

if (html !== before) {
  fs.writeFileSync(file, html);
}

console.log(`Homepage destination cards cleaned: removed price lines and changed CTA to الوجهة on ${changedCards} card(s).`);
