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
    /<a class="contact-line" data-track="call" href="tel:\+966920029967"><b>تحدث إلينا<\/b><span dir="ltr">\+966 920029967<\/span><\/a>/g,
    '<a class="contact-line contact-phone-line" data-track="call" href="tel:+966920029967"><b>تحدث إلينا</b><bdi class="contact-phone-number" dir="ltr">920029967</bdi></a>'
  );
  fs.writeFileSync(file, html);
}

let css = fs.readFileSync(cssPath, 'utf8');
if (!css.includes('footer-phone-fix-v1')) {
  css += `\n/* footer-phone-fix-v1 */\n.compact-contact .contact-phone-line{display:inline-flex!important;align-items:center!important;justify-content:flex-start!important;gap:10px!important;width:max-content!important;max-width:100%!important;padding:7px 0!important;direction:rtl!important;grid-template-columns:none!important}.compact-contact .contact-phone-line b{margin:0!important;white-space:nowrap!important;font-size:14px!important}.compact-contact .contact-phone-number{display:inline-block!important;direction:ltr!important;unicode-bidi:isolate!important;white-space:nowrap!important;font-size:15px!important;font-weight:800!important;letter-spacing:.2px!important;line-height:1.5!important;color:#fff!important}.compact-contact .contact-phone-line span{width:auto!important}@media(max-width:640px){.compact-contact .contact-phone-line{margin-inline:auto!important;gap:8px!important}.compact-contact .contact-phone-number{font-size:14px!important}}\n`;
  fs.writeFileSync(cssPath, css);
}

console.log('Footer phone row fixed as compact RTL label + isolated local phone number.');
