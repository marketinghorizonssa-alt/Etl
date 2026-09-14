import fs from 'node:fs';
import path from 'node:path';

const file = path.resolve('dist/europe/index.html');
if (!fs.existsSync(file)) process.exit(0);

let html = fs.readFileSync(file, 'utf8');
let changed = false;

html = html.replace(/<article\b[^>]*class="[^"]*\bdp-place\b[^"]*"[^>]*>[\s\S]*?<\/article>/g, (card) => {
  if (!card.includes('href="/europe/austria/"')) return card;
  if (card.includes('aria-label="اكتشف السياحة في النمسا"')) return card;
  changed = true;
  return card.replace('</article>', '<a href="/europe/austria/" aria-label="اكتشف السياحة في النمسا">اكتشف النمسا ←</a></article>');
});

if (changed) {
  fs.writeFileSync(file, html);
  console.log('Austria Europe card CTA added.');
} else {
  console.log('Austria Europe card CTA already present or card not found.');
}
