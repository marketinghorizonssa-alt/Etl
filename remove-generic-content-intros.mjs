import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const phrases = [
  'أهم النقاط في كروت سريعة، والتفاصيل الإضافية داخل أسئلة مختصرة حتى تفضل الصفحة خفيفة وسهلة التصفح.',
  'جمعنا أهم أسئلة التخطيط والحجز في مكان واحد، بإجابات مختصرة وتفاصيل إضافية عند الحاجة.'
];

const escapeRe = s => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

function cleanHtml(html) {
  let outHtml = html;
  for (const phrase of phrases) {
    const pRe = new RegExp(`<p\\b[^>]*>\\s*${escapeRe(phrase)}\\s*<\\/p>`, 'gi');
    outHtml = outHtml.replace(pRe, '');
    outHtml = outHtml.split(phrase).join('');
  }
  return outHtml;
}

function walk(dir) {
  if (!fs.existsSync(dir)) return;
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) walk(full);
    else if (item.isFile() && item.name.endsWith('.html')) {
      const html = fs.readFileSync(full, 'utf8');
      const cleaned = cleanHtml(html);
      if (cleaned !== html) fs.writeFileSync(full, cleaned);
    }
  }
}

walk(out);
console.log('Removed generic card/FAQ intro sentences from all generated pages.');
