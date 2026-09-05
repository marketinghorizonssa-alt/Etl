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
    '<a class="contact-line contact-phone-line" data-track="call" href="tel:+966920029967"><b>تحدث إلينا</b><span class="contact-phone-number" dir="ltr">920029967</span></a>'
  );
  fs.writeFileSync(file, html);
}

let css = fs.readFileSync(cssPath, 'utf8');
const marker = 'footer-contact-grid-final-v1';
if (!css.includes(marker)) {
  css += `\n/* ${marker} */\n.compact-contact .contact-line{display:grid!important;grid-template-columns:108px minmax(0,1fr)!important;gap:12px!important;align-items:start!important;width:100%!important;padding:7px 0!important;border:0!important;direction:rtl!important}.compact-contact .contact-line>b{grid-column:1!important;text-align:right!important;margin:0!important;font-size:14px!important;font-weight:800!important;line-height:1.6!important}.compact-contact .contact-line>span{grid-column:2!important;font-size:13px!important;line-height:1.65!important;color:#fff!important}.compact-contact .contact-phone-number,.compact-contact .contact-email{direction:ltr!important;unicode-bidi:isolate!important;text-align:left!important;white-space:nowrap!important}.compact-contact .contact-phone-number{font-size:14px!important;font-weight:800!important}@media(max-width:640px){.compact-contact .contact-line{grid-template-columns:96px minmax(0,1fr)!important;gap:10px!important}.compact-contact .contact-line>b,.compact-contact .contact-phone-number{font-size:13px!important}}\n`;
  fs.writeFileSync(cssPath, css);
}

console.log('Footer contact rows locked to right-side labels, left-side values, with no white divider lines.');
