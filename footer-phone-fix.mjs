import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const cssPath = path.join(out, 'assets', 'styles.css');

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

for (const file of htmlFiles(out)) {
  let html = fs.readFileSync(file, 'utf8');

  // Normalize any generated call row to a stable Arabic label + isolated LTR number.
  html = html.replace(
    /<a class="contact-line(?: [^"]*)?" data-track="call" href="tel:\+966920029967">[\s\S]*?<\/a>/g,
    '<a class="contact-line contact-phone-line" data-track="call" href="tel:+966920029967"><b>تحدث إلينا</b><bdi class="contact-phone-number" dir="ltr">+966 9200 29967</bdi></a>'
  );

  fs.writeFileSync(file, html);
}

let css = fs.readFileSync(cssPath, 'utf8');
const marker = 'footer-phone-fix-v3';
if (!css.includes(marker)) {
  css += `\n/* ${marker} */\n.compact-contact .contact-phone-line{display:flex!important;flex-direction:row!important;align-items:baseline!important;justify-content:flex-start!important;gap:10px!important;width:100%!important;max-width:100%!important;padding:7px 0!important;direction:rtl!important;grid-template-columns:none!important}.compact-contact .contact-phone-line b{margin:0!important;white-space:nowrap!important;font-size:14px!important;font-weight:800!important;line-height:1.5!important}.compact-contact .contact-phone-number{display:inline-block!important;direction:ltr!important;unicode-bidi:isolate!important;white-space:nowrap!important;font-size:14px!important;font-weight:700!important;letter-spacing:0!important;line-height:1.5!important;color:#fff!important}.compact-contact .contact-phone-line span{width:auto!important}@media(max-width:640px){.compact-contact .contact-phone-line{gap:8px!important;justify-content:flex-start!important}.compact-contact .contact-phone-number{font-size:13px!important}}\n`;
  fs.writeFileSync(cssPath, css);
}

console.log('Footer phone row fixed: تحدث إلينا +966 9200 29967 with stable RTL/LTR ordering.');
