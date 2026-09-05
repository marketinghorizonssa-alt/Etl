import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const cssPath = path.join(out, 'assets', 'styles.css');
const homePath = path.join(out, 'index.html');

const trustIcons = {
  experience: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a6 6 0 0 0-6 6v2.2A3.8 3.8 0 0 0 3 13.9V17a3 3 0 0 0 3 3h2v-7H6.2V8a5.8 5.8 0 0 1 11.6 0v5H16v7h2a3 3 0 0 0 3-3v-3.1a3.8 3.8 0 0 0-3-3.7V8a6 6 0 0 0-6-6Z"/><path d="M10 20h4v2h-4z"/></svg>',
  choices: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h12v2H3V5Zm0 6h8v2H3v-2Zm0 6h6v2H3v-2Zm14.2-5.7 1.3 2.6 2.9.4-2.1 2 .5 2.9-2.6-1.4-2.6 1.4.5-2.9-2.1-2 2.9-.4 1.3-2.6Z"/></svg>',
  support: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2a9 9 0 0 0-9 9v5a3 3 0 0 0 3 3h2v-7H5v-1a7 7 0 1 1 14 0v1h-3v7h2.1A6.1 6.1 0 0 1 13 22h-2v-2h2c1.2 0 2.3-.4 3.1-1H14v-7h5v-1a7 7 0 0 0-7-7Z"/></svg>',
  payment: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 5h18a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm0 2v2h18V7H3Zm0 5v5h18v-5H3Zm3 2h5v2H6v-2Z"/></svg>'
};

const instagramSvg = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849s-.012 3.584-.069 4.849c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.584-.012-4.849-.07c-3.26-.149-4.771-1.699-4.919-4.92-.058-1.264-.07-1.644-.07-4.849s.013-3.583.07-4.849c.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069ZM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0Zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324ZM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8Zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881Z"/></svg>';

function htmlFiles(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...htmlFiles(full));
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

if (fs.existsSync(homePath)) {
  let home = fs.readFileSync(homePath, 'utf8');
  home = home.replace(
    /<section class="trust-ribbon"><div class="container"><div><strong>خبرة واسعة<\/strong><span>في تنظيم الرحلات<\/span><\/div><div><strong>أفضل الخيارات<\/strong><span>فنادق وبرامج متنوعة<\/span><\/div><div><strong>دعم مع مستشار<\/strong><span>قبل وأثناء الرحلة<\/span><\/div><div><strong>خطط دفع مرنة<\/strong><span>وفق العرض المتاح<\/span><\/div><\/div><\/section>/,
    `<section class="trust-ribbon"><div class="container"><div class="trust-item"><span class="trust-large-icon">${trustIcons.experience}</span><strong>خبرة واسعة</strong><span>في تنظيم الرحلات</span></div><div class="trust-item"><span class="trust-large-icon">${trustIcons.choices}</span><strong>أفضل الخيارات</strong><span>فنادق وبرامج متنوعة</span></div><div class="trust-item"><span class="trust-large-icon">${trustIcons.support}</span><strong>دعم مع مستشار</strong><span>قبل وأثناء الرحلة</span></div><div class="trust-item"><span class="trust-large-icon">${trustIcons.payment}</span><strong>خطط دفع مرنة</strong><span>وفق العرض المتاح</span></div></div></section>`
  );
  fs.writeFileSync(homePath, home);
}

for (const file of htmlFiles(out)) {
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(
    /<a class="instagram"([^>]*)>[\s\S]*?<\/a>/g,
    `<a class="instagram"$1>${instagramSvg}</a>`
  );
  fs.writeFileSync(file, html);
}

if (fs.existsSync(cssPath)) {
  let css = fs.readFileSync(cssPath, 'utf8');
  if (!css.includes('trust-icons-instagram-final-v1')) {
    css += `\n/* trust-icons-instagram-final-v1 */\n.trust-ribbon .container>div.trust-item{min-height:176px;padding:22px 18px;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px;text-align:center}.trust-large-icon{width:70px;height:70px;border-radius:22px;display:grid;place-items:center;margin-bottom:5px;background:linear-gradient(135deg,#edf5ff,#f8efff);box-shadow:inset 0 0 0 1px rgba(33,63,176,.08)}.trust-large-icon svg{width:38px;height:38px;fill:#173fb5}.trust-ribbon .trust-item strong{font-size:1.08rem}.trust-ribbon .trust-item>span:last-child{font-size:.86rem}.compact-social a.instagram svg{width:24px!important;height:24px!important;display:block!important;fill:#fff!important;overflow:visible!important}@media(max-width:760px){.trust-ribbon .container>div.trust-item{min-height:150px;padding:18px 10px}.trust-large-icon{width:60px;height:60px;border-radius:19px}.trust-large-icon svg{width:33px;height:33px}.trust-ribbon .trust-item strong{font-size:.98rem}}\n`;
    fs.writeFileSync(cssPath, css);
  }
}

console.log('Added large trust icons and corrected the Instagram footer icon.');
