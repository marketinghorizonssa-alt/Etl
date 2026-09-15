import fs from 'node:fs';
import path from 'node:path';

const file = path.resolve('dist/europe/index.html');
if (!fs.existsSync(file)) process.exit(0);

const removeTitles = new Set([
  'أوروبا الوسطى',
  'أوروبا الشرقية',
  'جنوب أوروبا',
  'القطارات الأوروبية',
  'رحلات القطارات'
]);

let html = fs.readFileSync(file, 'utf8');
let removed = 0;

html = html.replace(/<article\b[^>]*class="[^"]*\bdp-place\b[^"]*"[^>]*>[\s\S]*?<\/article>/g, (card) => {
  const match = card.match(/<h3>(?:<a[^>]*>)?([^<]+)(?:<\/a>)?<\/h3>/i);
  const title = match ? match[1].trim() : '';
  if (!removeTitles.has(title)) return card;
  removed += 1;
  return '';
});

if (removed) fs.writeFileSync(file, html);
console.log(`Removed ${removed} generic Europe cards.`);
