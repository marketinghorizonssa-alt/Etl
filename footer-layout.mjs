import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const cssPath = path.join(out, 'assets', 'styles.css');
const OLD_MEDIA = 'https://etlaala.com/wp-content/uploads';
const LOGO = `${OLD_MEDIA}/2025/03/Etlala-logo-Ar-01-01-e1710003034565.png`;
const QR = `${OLD_MEDIA}/2025/03/qr.png`;
const BG = `${OLD_MEDIA}/2024/02/pexels-dimitri-dim-1802183-1024x683.jpg`;
const PAYMENTS = `${OLD_MEDIA}/2025/03/طرق-الدفع-1024x512.png`;

const socialIcon = {
  facebook: '<svg viewBox="0 0 512 512" aria-hidden="true"><path d="M504 256C504 119 393 8 256 8S8 119 8 256c0 123.8 90.7 226.4 209.3 245V327.7h-63V256h63v-54.6c0-62.2 37-96.5 93.7-96.5 27.1 0 55.5 4.8 55.5 4.8v61h-31.3c-30.8 0-40.4 19.1-40.4 38.7V256h68.8l-11 71.7h-57.8V501C413.3 482.4 504 379.8 504 256z"/></svg>',
  instagram: '<svg viewBox="0 0 448 512" aria-hidden="true"><path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8s-26.8-12-26.8-26.8 12-26.8 26.8-26.8 26.8 12 26.8 26.8z"/></svg>',
  x: '<svg viewBox="0 0 512 512" aria-hidden="true"><path d="M389.2 48h70.6L305.6 224.2 487 464H345L233.7 318.6 106.5 464H35.8L200.7 275.5 26.8 48H172.4L272.9 180.9 389.2 48zM364.4 421.8h39.1L151.1 88h-42L364.4 421.8z"/></svg>',
  youtube: '<svg viewBox="0 0 576 512" aria-hidden="true"><path d="M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zM232.1 337.6V175.2l142.7 81.2-142.7 81.2z"/></svg>',
  snapchat: '<svg viewBox="0 0 496 512" aria-hidden="true"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm169.5 338.9c-3.5 8.1-18.1 14-44.8 18.2-1.4 1.9-2.5 9.8-4.3 15.9-1.1 3.7-3.7 5.9-8.1 5.9-6.2 0-12.8-2.9-25.8-2.9-17.6 0-23.7 4-37.4 13.7-14.5 10.3-28.4 19.1-49.2 18.2-21 1.6-38.6-11.2-48.5-18.2-13.8-9.7-19.8-13.7-37.4-13.7-12.5 0-20.4 3.1-25.8 3.1-5.4 0-7.5-3.3-8.3-6-1.8-6.1-2.9-14.1-4.3-16-13.8-2.1-44.8-7.5-45.5-21.4-.2-3.6 2.3-6.8 5.9-7.4 46.3-7.6 67.1-55.1 68-57.1 2.6-5.2 3.1-9.4 1.7-12.8-3.4-7.9-17.9-10.7-24-13.2-15.8-6.2-18-13.4-17-18.3 1.6-8.5 14.4-13.8 21.9-10.3 5.9 2.8 11.2 4.2 15.7 4.2 3.3 0 5.5-.8 6.6-1.4-1.4-23.9-4.7-58 3.8-77.1C183.1 100 230.7 96 244.7 96c34.7 0 68 17.8 84.3 54.3 8.5 19.1 5.2 53.1 3.8 77.1 1.1.6 2.9 1.3 5.7 1.4 4.3-.2 9.2-1.6 14.7-4.2 4-1.9 9.6-1.6 13.6 0 6.3 2.3 10.3 6.8 10.4 11.9.1 6.5-5.7 12.1-17.2 16.6-1.4.6-3.1 1.1-4.9 1.7-6.5 2.1-16.4 5.2-19 11.5-1.4 3.3-.8 7.5 1.6 12.5.9 2 21.7 49.5 68 57.1 4 1 7.1 5.5 4.9 10.8z"/></svg>',
  telegram: '<svg viewBox="0 0 496 512" aria-hidden="true"><path d="M248 8C111 8 0 119 0 256s111 248 248 248 248-111 248-248S385 8 248 8zm121.8 169.9-40.7 191.8c-3 13.6-11.1 16.9-22.4 10.5l-62-45.7-29.9 28.8c-3.3 3.3-6.1 6.1-12.5 6.1l4.4-63.1 114.9-103.8c5-4.4-1.1-6.9-7.7-2.5l-142 89.4-61.2-19.1c-13.3-4.2-13.6-13.3 2.8-19.7l239.1-92.2c11.1-4 20.8 2.7 17.2 19.5z"/></svg>',
  threads: '<svg viewBox="0 0 448 512" aria-hidden="true"><path d="M331.5 235.7c29.2 14.1 50.6 35.2 61.8 61.4 15.7 36.5 17.2 95.8-30.3 143.2-36.2 36.2-80.3 52.5-142.6 53-70.2-.5-124.1-24.1-160.4-70.2-32.3-41-48.9-98.1-49.5-169.6.5-71.5 17.1-128.6 49.4-169.6C96.2 37.8 150.2 14.2 220.4 13.7c70.3.5 124.9 24 162.3 69.9 18.4 22.7 32 50 40.6 81.7l-40.4 10.8c-7.1-25.8-17.8-47.8-32.2-65.4-29.2-35.8-73-54.2-130.5-54.6-57 .5-100.1 18.8-128.2 54.4-26.2 33.3-39.8 81.5-40.3 143.2.5 61.7 14.1 109.9 40.3 143.3 28 35.6 71.2 53.9 128.2 54.4 51.4-.4 85.4-12.6 113.7-40.9 32.3-32.2 31.7-71.8 21.4-95.9-6.1-14.2-17.1-26-31.9-34.9-3.7 26.9-11.8 48.3-24.7 64.8-17.1 21.8-41.4 33.6-72.7 35.3-23.6 1.3-46.3-4.4-63.9-16-20.8-13.8-33-34.8-34.3-59.3-2.5-48.3 35.7-83 95.2-86.4 21.1-1.2 40.9-.3 59.2 2.8-2.4-14.8-7.3-26.6-14.6-35.2-10-11.7-25.6-17.7-46.2-17.8-16.6 0-39 4.6-53.3 26.3l-34.4-23.6c19.2-29.1 50.3-45.1 87.8-45.1 62.6.4 99.9 39.5 103.7 107.7zm-156 68.8c1.3 25.1 28.4 36.8 54.6 35.3 25.6-1.4 54.6-11.4 59.5-73.2-13.2-2.9-27.8-4.4-43.4-4.4-4.8 0-9.6.1-14.4.4-42.9 2.4-57.2 23.2-56.2 41.8z"/></svg>',
  tiktok: '<svg viewBox="0 0 448 512" aria-hidden="true"><path d="M448 209.9a210.1 210.1 0 0 1-122.8-39.3v178.8A162.6 162.6 0 1 1 185 188v89.9a74.6 74.6 0 1 0 52.2 71.5V0h88a121.5 121.5 0 0 0 1.9 22.2 122.2 122.2 0 0 0 53.9 80.3A121.7 121.7 0 0 0 448 122.2z"/></svg>'
};

const socials = [
  ['facebook','https://www.facebook.com/etlaala','Facebook'],
  ['instagram','https://www.instagram.com/etlaalatravel','Instagram'],
  ['x','https://x.com/etlaalatravel','X'],
  ['youtube','https://www.youtube.com/@etlaala/featured','YouTube'],
  ['tiktok','https://www.tiktok.com/@etlaala','TikTok'],
  ['telegram','https://t.me/etlaalatravelagency','Telegram'],
  ['threads','https://www.threads.net/@etlaalatravel','Threads'],
  ['snapchat','https://www.snapchat.com/add/etlaala','Snapchat']
].map(([cls,url,label]) => `<a class="${cls}" href="${url}" target="_blank" rel="noopener" aria-label="${label}">${socialIcon[cls]}</a>`).join('');

const compactFooter = `<footer class="compact-footer" id="contact" style="--compact-footer-bg:url('${BG}')"><div class="compact-footer-overlay"><div class="container compact-footer-main"><section class="compact-brand"><img class="compact-logo" src="${LOGO}" width="1024" height="549" loading="lazy" alt="إطلالة للسفر والسياحة"><div class="compact-brand-row"><img class="compact-qr" src="${QR}" width="860" height="837" loading="lazy" alt="رمز QR لإطلالة"><div class="compact-socials" aria-label="حسابات إطلالة">${socials}</div></div></section><section class="compact-license"><h2>شركة مرخصة</h2><div class="license-card"><div><span>مرخص من وزارة السياحة</span><strong>73104738</strong></div><div><span>رقم السجل التجاري</span><strong>4031293290</strong></div><div><span>رقم المنشأة الموحد</span><strong>7037638678</strong></div></div></section><section class="compact-contact"><h2>تواصل معنا</h2><div class="contact-line"><b>العنوان</b><span>مكتب إطلالة مكة، القمرية، العزيزية، مكة المكرمة، الدور الثالث</span></div><a class="contact-line" data-track="call" href="tel:+966920029967"><b>تحدث إلينا</b><span dir="ltr">+966 920029967</span></a><a class="contact-line" href="mailto:info@etlaala.com"><b>البريد الإلكتروني</b><span>info@etlaala.com</span></a></section></div><div class="container compact-footer-bottom"><div class="payment-wrap"><img src="${PAYMENTS}" width="1024" height="512" loading="lazy" alt="طرق دفع متعددة وآمنة"></div><div class="legal-wrap"><nav aria-label="روابط قانونية"><a href="https://etlaala.com/privacy-policy/">سياسة الخصوصية</a><a href="https://etlaala.com/terms-and-conditions/">الشروط والأحكام</a></nav><p>©2025، إطلالة للسفر والسياحة. جميع الحقوق محفوظة.</p></div></div></div></footer>`;

function htmlFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...htmlFiles(full));
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

for (const file of htmlFiles(out)) {
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/<footer class="legacy-footer"[\s\S]*?<\/footer>/, compactFooter);
  fs.writeFileSync(file, html);
}

let css = fs.readFileSync(cssPath, 'utf8');
const marker = 'compact-footer-v3';
if (!css.includes(marker)) {
  css += `\n/* ${marker} */\n.compact-footer{position:relative;color:#fff;background-image:var(--compact-footer-bg);background-size:cover;background-position:center 48%;background-repeat:no-repeat}.compact-footer-overlay{background:linear-gradient(90deg,rgba(48,55,165,.76),rgba(18,91,203,.82));padding:26px 0 0}.compact-footer a{color:#fff}.compact-footer-main{display:grid;grid-template-columns:.95fr 1.05fr 1.15fr;gap:clamp(24px,4vw,58px);align-items:center}.compact-brand{display:grid;gap:12px;justify-items:center}.compact-logo{width:190px;max-height:100px;object-fit:contain}.compact-brand-row{display:flex;align-items:center;gap:14px}.compact-qr{width:106px;height:106px;object-fit:cover;background:#fff;padding:4px}.compact-socials{display:grid;grid-template-columns:repeat(4,30px);gap:7px}.compact-socials a{width:30px;height:30px;border-radius:8px;display:grid;place-items:center;background:rgba(3,10,35,.72);transition:transform .18s ease,background .18s ease}.compact-socials a:hover{transform:translateY(-2px);background:rgba(3,10,35,.95)}.compact-socials svg{width:17px;height:17px;fill:#fff}.compact-socials .facebook{background:#1877f2}.compact-socials .instagram{background:linear-gradient(135deg,#833ab4,#fd1d1d,#fcb045)}.compact-socials .youtube{background:#ff0000}.compact-socials .telegram{background:#2AABEE}.compact-socials .snapchat{background:#c8d500}.compact-license h2,.compact-contact h2{margin:0 0 12px;color:#fff;font-size:22px;line-height:1.3}.license-card{background:rgba(3,14,45,.78);border:1px solid rgba(255,255,255,.12);border-radius:18px;padding:14px 16px;box-shadow:0 12px 30px rgba(0,0,0,.12)}.license-card>div{display:flex;align-items:center;justify-content:space-between;gap:16px;padding:10px 0;border-bottom:1px solid rgba(255,255,255,.11)}.license-card>div:last-child{border-bottom:0}.license-card span{font-size:13px;font-weight:700}.license-card strong{font-size:14px;font-weight:800;letter-spacing:.2px}.compact-contact{min-width:0}.contact-line{display:grid;grid-template-columns:108px 1fr;gap:12px;align-items:start;padding:7px 0;border-bottom:1px solid rgba(255,255,255,.11)}.contact-line:last-child{border-bottom:0}.contact-line b{font-size:14px}.contact-line span{font-size:13px;line-height:1.65;color:#fff}.compact-footer-bottom{margin-top:22px;padding:15px 0 16px;border-top:1px solid rgba(255,255,255,.28);display:flex;align-items:center;justify-content:space-between;gap:24px}.payment-wrap{flex:0 1 300px}.payment-wrap img{display:block;width:280px;max-width:100%;height:auto;border-radius:10px}.legal-wrap{display:flex;align-items:center;gap:20px;flex-wrap:wrap;justify-content:flex-start}.legal-wrap nav{display:flex;align-items:center;gap:18px}.legal-wrap a{font-size:12px;font-weight:700}.legal-wrap a:hover{color:#8fe4ff}.legal-wrap p{margin:0;font-size:11px;color:rgba(255,255,255,.9)}@media(max-width:980px){.compact-footer-main{grid-template-columns:1fr 1fr;gap:28px}.compact-brand{grid-column:1/-1}.compact-brand-row{justify-content:center}.compact-footer-bottom{flex-direction:column}.legal-wrap{justify-content:center;text-align:center}.payment-wrap{flex-basis:auto}}@media(max-width:640px){.compact-footer-overlay{padding-top:22px}.compact-footer-main{grid-template-columns:1fr;gap:24px}.compact-logo{width:170px}.compact-qr{width:94px;height:94px}.compact-socials{grid-template-columns:repeat(4,28px)}.compact-socials a{width:28px;height:28px}.compact-license,.compact-contact{max-width:390px;width:100%;margin:auto}.compact-license h2,.compact-contact h2{text-align:center;font-size:20px}.contact-line{grid-template-columns:96px 1fr}.compact-footer-bottom{margin-top:18px;padding:14px 0 15px}.payment-wrap img{width:240px}.legal-wrap{gap:10px}.legal-wrap nav{gap:14px;flex-wrap:wrap;justify-content:center}.legal-wrap a{font-size:11px}.legal-wrap p{font-size:10px}}\n`;
  fs.writeFileSync(cssPath, css);
}

console.log(`Rebuilt compact footer on ${htmlFiles(out).length} pages with licensing, payments and complete social links.`);
