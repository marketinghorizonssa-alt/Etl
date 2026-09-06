import fs from 'node:fs';
import path from 'node:path';

const file = path.resolve('dist','turkiye','index.html');
const cssPath = path.resolve('dist','assets','styles.css');
if (!fs.existsSync(file) || !fs.existsSync(cssPath)) process.exit(0);

let html = fs.readFileSync(file,'utf8');

const formSection = `<section class="tk-bottom-form" id="turkey-quote-form" aria-labelledby="turkey-form-title">
  <div class="container tk-bottom-form-shell">
    <div class="tk-bottom-form-copy">
      <span>طلب سريع</span>
      <h2 id="turkey-form-title">خلّنا نرتّب لك رحلة تركيا</h2>
      <p>أرسل التفاصيل الأساسية، وفريق إطلالة يتواصل معك بالخيارات المناسبة.</p>
    </div>
    <form class="tk-mini-lead-form" data-lead-form novalidate>
      <div class="tk-mini-grid">
        <label><span>الاسم</span><input name="name" type="text" autocomplete="name" required placeholder="الاسم"></label>
        <label><span>رقم الجوال</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required pattern="(?:\\+?966|0)?5[0-9]{8}" maxlength="13" placeholder="05xxxxxxxx"></label>
        <label><span>عدد المسافرين</span><select name="travelers" required><option value="" selected disabled>اختر</option><option value="1">1</option><option value="2">2</option><option value="3-4">3–4</option><option value="5-6">5–6</option><option value="7+">7+</option></select></label>
        <label><span>تاريخ السفر</span><input name="travel_date" type="date"></label>
      </div>
      <label class="tk-mini-notes"><span>ملاحظة مختصرة</span><textarea name="notes" rows="2" placeholder="المدن أو عدد الأيام اللي في بالك"></textarea></label>
      <label class="privacy-consent tk-mini-consent"><input type="checkbox" name="privacy_consent" required value="yes"><span>أوافق على استخدام بياناتي للتواصل بخصوص طلب الرحلة وفق <a href="/privacy-policy/">سياسة الخصوصية</a>.</span></label>
      <div class="hp-field" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
      <div class="tk-mini-submit"><button type="submit" class="gradient-btn">اطلب عرض تركيا</button><div class="status" role="status" aria-live="polite"></div></div>
    </form>
  </div>
</section>`;

if (!html.includes('id="turkey-quote-form"')) {
  html = html.replace(/<\/main>/, `${formSection}\n</main>`);
}
html = html.replace(/<body([^>]*)>/i,(m,attrs)=>{
  if (/data-destination=/.test(attrs)) return m.replace(/data-destination="[^"]*"/,'data-destination="تركيا"');
  return `<body${attrs} data-destination="تركيا">`;
});
fs.writeFileSync(file,html);

let css = fs.readFileSync(cssPath,'utf8');
if (!css.includes('turkiye-bottom-form-v1')) {
  css += `\n/* turkiye-bottom-form-v1 */\n.tk-bottom-form{padding:34px 0 44px;background:#f6f8fd;border-top:1px solid #e8ecf5}.tk-bottom-form-shell{display:grid;grid-template-columns:minmax(260px,.7fr) minmax(0,1.3fr);gap:30px;align-items:center;padding:26px 28px;border:1px solid #e1e6f1;border-radius:24px;background:#fff;box-shadow:0 14px 40px rgba(25,40,100,.06)}.tk-bottom-form-copy>span{display:inline-block;color:#4762c8;font-size:.72rem;font-weight:900}.tk-bottom-form-copy h2{margin:6px 0 8px;color:#172760;font-size:clamp(1.35rem,2.2vw,1.85rem);line-height:1.5}.tk-bottom-form-copy p{margin:0;color:#6b748d;font-size:.84rem;line-height:1.8}.tk-mini-lead-form{min-width:0}.tk-mini-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:10px}.tk-mini-lead-form label{display:grid;gap:5px;margin:0;color:#394463;font-size:.72rem;font-weight:800}.tk-mini-lead-form input,.tk-mini-lead-form select,.tk-mini-lead-form textarea{width:100%;min-height:44px;padding:9px 11px;border:1px solid #dfe4ef;border-radius:11px;background:#fbfcff;color:#17213f;outline:0;font:inherit}.tk-mini-lead-form input:focus,.tk-mini-lead-form select:focus,.tk-mini-lead-form textarea:focus{border-color:#4f6bf4;box-shadow:0 0 0 3px rgba(79,107,244,.09)}.tk-mini-notes{margin-top:10px!important}.tk-mini-lead-form textarea{min-height:58px;resize:vertical}.tk-mini-consent{display:flex!important;align-items:flex-start!important;gap:8px!important;margin:10px 0 12px!important;font-size:.68rem!important;line-height:1.55!important;font-weight:500!important;color:#737b91!important}.tk-mini-consent input{width:16px!important;height:16px!important;min-height:0!important;padding:0!important;flex:0 0 16px;margin-top:2px}.tk-mini-consent a{font-weight:800;color:#2945b4;text-decoration:underline;text-underline-offset:2px}.tk-mini-submit{display:flex;align-items:center;gap:12px}.tk-mini-submit .gradient-btn{min-height:44px;padding:9px 22px;font-size:.82rem}.tk-mini-submit .status{margin:0;font-size:.72rem;line-height:1.5;flex:1}.tk-bottom-form .hp-field{position:absolute!important;left:-10000px!important;width:1px!important;height:1px!important;overflow:hidden!important}@media(max-width:980px){.tk-bottom-form-shell{grid-template-columns:1fr;gap:18px}.tk-mini-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:600px){.tk-bottom-form{padding:24px 0 30px}.tk-bottom-form-shell{padding:20px 18px;border-radius:18px}.tk-mini-grid{grid-template-columns:1fr}.tk-mini-submit{align-items:stretch;flex-direction:column}.tk-mini-submit .gradient-btn{width:100%}.tk-mini-notes{margin-top:9px!important}}\n`;
  fs.writeFileSync(cssPath,css);
}

console.log('Added compact Turkey lead form at the end of the destination page.');
