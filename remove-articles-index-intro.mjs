import fs from 'node:fs';
import path from 'node:path';

const file = path.resolve('dist', 'articles', 'index.html');
const sentence = 'مقالات مختارة بعناية لدعم أهم وجهات إطلالة ونوايا البحث المفيدة للمسافر من السعودية.';

function escapeRegExp(value) {
  return String(value).replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

if (!fs.existsSync(file)) {
  console.log('Articles index not found; skipping intro sentence removal.');
  process.exit(0);
}

let html = fs.readFileSync(file, 'utf8');
const before = html;
const sentencePattern = escapeRegExp(sentence);

html = html
  .replace(new RegExp(`<p>\\s*${sentencePattern}\\s*<\\/p>`, 'g'), '')
  .replace(new RegExp(sentencePattern, 'g'), '');

if (html !== before) {
  fs.writeFileSync(file, html);
}

console.log('Removed articles index intro sentence.');
