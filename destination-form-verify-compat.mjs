import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const slugs = ['europe','georgia','malaysia','maldives','thailand','bosnia-and-herzegovina'];

for (const slug of slugs) {
  const file = path.join(out, slug, 'index.html');
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, 'utf8');
  if (!html.includes('id="destination-quote-form"') && html.includes('class="dp-hero-form"')) {
    html = html.replace('class="dp-hero-form"', 'id="destination-quote-form" class="dp-hero-form"');
    fs.writeFileSync(file, html);
  }
}

console.log('Kept destination quote form id on the new hero form.');
