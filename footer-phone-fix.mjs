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

  html = html.replace(
    /<a class="contact-line(?: [^"]*)?" data-track="call" href="tel:\+966920029967">[\s\S]*?<\/a>/g,
    '<a class="contact-line contact-phone-line" data-track="call" href="tel:+966920029967"><b class="contact-phone-label">تحدث إلينا</b><bdi class="contact-phone-number" dir="ltr">920029967</bdi></a>'
  );

  fs.writeFileSync(file, html);
}

let css = fs.readFileSync(cssPath, 'utf8');
const marker = 'footer-phone-fix-v4';
if (!css.includes(marker)) {
  css += `\n/* ${marker} */\n.compact-contact .contact-phone-line{display:grid!important;grid-template-columns:max-content max-content!important;justify-content:end!important;align-items:baseline!important;column-gap:8px!important;width:100%!important;max-width:100%!important;padding:7px 0!important;direction:ltr!important}.compact-contact .contact-phone-label{grid-column:1!important;direction:rtl!important;text-align:right!important;margin:0!important;white-space:nowrap!important;font-size:14px!important;font-weight:800!important;line-height:1.5!important}.compact-contact .contact-phone-number{grid-column:2!important;direction:ltr!important;unicode-bidi:isolate!important;white-space:nowrap!important;text-align:right!important;font-size:14px!important;font-weight:800!important;letter-spacing:0!important;line-height:1.5!important;color:#fff!important}@media(max-width:640px){.compact-contact .contact-phone-line{grid-template-columns:max-content max-content!important;justify-content:end!important;column-gap:7px!important}.compact-contact .contact-phone-number{font-size:13px!important}.compact-contact .contact-phone-label{font-size:13px!important}}\n`;
  fs.writeFileSync(cssPath, css);
}

console.log('Footer phone visually aligned: display 920029967; tel link keeps +966.');
