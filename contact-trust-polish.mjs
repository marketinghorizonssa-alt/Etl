import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const homePath = path.join(out, 'index.html');
const cssPath = path.join(out, 'assets', 'styles.css');
const PHONE = '+966920029967';
const PHONE_DISPLAY = '920029967';
const WA = '966125422331';
const wa = (text) => `https://api.whatsapp.com/send?phone=${WA}&text=${encodeURIComponent(text)}`;

if (fs.existsSync(homePath)) {
  let html = fs.readFileSync(homePath, 'utf8');

  // Shorter, cleaner Saudi-facing copy beside the lead form.
  html = html.replace(
    /<div class="why-copy contact-copy">[\s\S]*?<\/div>(?=<form class="lead-form)/,
    `<div class="why-copy contact-copy"><span class="mini-title">رتّب رحلتك مع إطلالة</span><h2>قل لنا وجهتك، ونرتّب لك الباقي</h2><p>أرسل تفاصيل بسيطة عن رحلتك، ومستشارنا يقترح لك أنسب خيارات الطيران والفنادق والانتقالات.</p><ul><li>برامج للعائلات والأزواج وشهر العسل</li><li>خيارات تناسب ميزانيتك وموعد سفرك</li><li>تفاصيل واضحة ومتابعة حتى تثبيت الحجز</li></ul><div class="contact-direct"><a data-track="whatsapp" href="${wa('مرحباً إطلالة، أبغى أرتب رحلتي مع مستشار سياحي')}">واتساب</a><a data-track="call" href="tel:${PHONE}">${PHONE_DISPLAY}</a></div></div>`
  );

  fs.writeFileSync(homePath, html);
}

if (fs.existsSync(cssPath)) {
  let css = fs.readFileSync(cssPath, 'utf8');
  if (!css.includes('contact-trust-polish-v1')) {
    css += `\n/* contact-trust-polish-v1 */\n.contact-final{padding:40px 0 44px!important}.contact-final .split{align-items:center!important;gap:44px!important}.contact-copy{max-width:610px;padding:0!important}.contact-copy .mini-title{font-size:.86rem!important}.contact-copy h2{max-width:560px!important;font-size:clamp(1.75rem,3vw,2.3rem)!important;line-height:1.42!important;margin:7px 0 10px!important}.contact-copy>p{max-width:570px!important;font-size:.94rem!important;line-height:1.85!important;margin:0!important}.contact-copy ul{grid-template-columns:1fr!important;gap:7px!important;margin:16px 0 0!important;max-width:580px!important}.contact-copy li{font-size:.91rem!important;line-height:1.65!important;padding-right:23px!important}.contact-copy li:before{top:0!important}.contact-direct{margin-top:18px!important;gap:9px!important}.contact-direct a{min-height:40px!important;padding:0 16px!important;border-radius:10px!important;font-size:.9rem!important}.contact-final .lead-form{align-self:center!important}\n.trust-ribbon{background:#fff!important;border-top:1px solid #eef1f7!important;border-bottom:1px solid #eef1f7!important}.trust-ribbon .container{min-height:132px!important}.trust-ribbon .container>div.trust-item{min-height:132px!important;padding:16px 14px!important;gap:5px!important}.trust-large-icon{width:56px!important;height:56px!important;border-radius:50%!important;margin-bottom:4px!important;background:linear-gradient(145deg,#f3f7ff,#fff)!important;box-shadow:0 7px 20px rgba(24,55,160,.08),inset 0 0 0 1px rgba(32,64,170,.08)!important}.trust-large-icon svg{width:28px!important;height:28px!important;fill:#2042b4!important}.trust-ribbon .trust-item strong{font-size:1rem!important;line-height:1.4!important}.trust-ribbon .trust-item>span:last-child{font-size:.79rem!important;line-height:1.5!important;color:#737b91!important}\n@media(max-width:760px){.contact-final{padding:30px 0 34px!important}.contact-final .split{gap:22px!important}.contact-copy h2{font-size:1.6rem!important}.contact-copy>p{font-size:.9rem!important}.trust-ribbon .container{min-height:auto!important}.trust-ribbon .container>div.trust-item{min-height:118px!important;padding:14px 8px!important}.trust-large-icon{width:50px!important;height:50px!important}.trust-large-icon svg{width:25px!important;height:25px!important}}\n`;
    fs.writeFileSync(cssPath, css);
  }
}

console.log('Contact copy shortened and trust ribbon restyled with cleaner large icons.');
