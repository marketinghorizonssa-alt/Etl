import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const cssPath = path.join(out, 'assets', 'styles.css');
const removedLine = '<p>نفس الوجهات والعروض التي عرفتها في إطلالة، بتجربة أسرع وأوضح للحجز.</p>';

function htmlFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...htmlFiles(full));
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

let changed = 0;
for (const file of htmlFiles(out)) {
  let html = fs.readFileSync(file, 'utf8');
  const next = html.replace(removedLine, '');
  if (next !== html) {
    fs.writeFileSync(file, next);
    changed += 1;
  }
}

let css = fs.readFileSync(cssPath, 'utf8');
const marker = 'final-footer-polish-v1';
if (!css.includes(marker)) {
  css += `\n/* ${marker} */\n.compact-footer-overlay{padding-top:18px}.compact-footer-main{gap:clamp(18px,3vw,40px)}.compact-brand{gap:8px}.compact-logo{width:165px;max-height:84px}.compact-brand-row{gap:11px}.compact-qr{width:90px;height:90px}.compact-socials{grid-template-columns:repeat(4,28px);gap:6px}.compact-socials a{width:28px;height:28px}.compact-socials svg{width:16px;height:16px}.compact-license h2,.compact-contact h2{margin-bottom:8px;font-size:20px}.license-card{padding:10px 14px;border-radius:16px}.license-card>div{padding:7px 0}.contact-line{padding:5px 0}.compact-contact a[data-track="call"].contact-line{display:flex;align-items:center;justify-content:flex-start;gap:9px}.compact-contact a[data-track="call"].contact-line b,.compact-contact a[data-track="call"].contact-line span{flex:0 0 auto}.compact-footer-bottom{margin-top:16px;padding:10px 0 11px;gap:18px}.payment-wrap{flex-basis:260px}.payment-wrap img{width:240px}.legal-wrap{gap:15px}.legal-wrap nav{gap:15px}@media(max-width:640px){.compact-footer-overlay{padding-top:16px}.compact-footer-main{gap:18px}.compact-logo{width:150px}.compact-qr{width:82px;height:82px}.compact-license h2,.compact-contact h2{font-size:19px}.compact-footer-bottom{margin-top:14px;padding:9px 0 10px}.payment-wrap img{width:220px}}\n`;
  fs.writeFileSync(cssPath, css);
}

console.log(`Final polish applied: removed homepage line from ${changed} file(s), tightened footer, and aligned the phone beside its label.`);
