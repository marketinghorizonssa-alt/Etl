import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const file = path.join(out, 'turkiye', 'index.html');
const cssPath = path.join(out, 'assets', 'styles.css');

if (!fs.existsSync(file) || !fs.existsSync(cssPath)) process.exit(0);

let html = fs.readFileSync(file, 'utf8');

const heroForm = `<aside id="destination-quote-form" class="dp-hero-form tk-hero-form" aria-label="طلب عرض سريع لتركيا">
  <span>طلب سريع</span>
  <strong>خلّنا نرتّب لك رحلة تركيا</strong>
  <form class="dp-hero-lead-form" data-lead-form novalidate>
    <div class="dp-hero-mini-grid">
      <label><span>الاسم</span><input name="name" type="text" autocomplete="name" required placeholder="الاسم"></label>
      <label><span>رقم الجوال</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required pattern="(?:\\+?966|0)?5[0-9]{8}" maxlength="13" placeholder="05xxxxxxxx"></label>
      <label><span>عدد المسافرين</span><select name="travelers" required><option value="" selected disabled>اختر</option><option value="1">1</option><option value="2">2</option><option value="3-4">3–4</option><option value="5-6">5–6</option><option value="7+">7+</option></select></label>
      <label><span>تاريخ السفر</span><input name="travel_date" type="date"></label>
    </div>
    <label class="dp-hero-notes"><span>ملاحظة مختصرة</span><textarea name="notes" rows="2" placeholder="عدد الأيام أو المدن اللي في بالك"></textarea></label>
    <label class="privacy-consent dp-hero-consent"><input type="checkbox" name="privacy_consent" required value="yes"><span>أوافق على استخدام بياناتي للتواصل بخصوص طلب الرحلة وفق <a href="/privacy-policy/">سياسة الخصوصية</a>.</span></label>
    <div class="hp-field" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
    <div class="dp-hero-submit"><button type="submit" class="gradient-btn">اطلب عرض تركيا</button><div class="status" role="status" aria-live="polite"></div></div>
  </form>
</aside>`;

html = html.replace(/<aside class="tk-hero-card">[\s\S]*?<\/aside>/, heroForm);
html = html.replace(/<section class="tk-bottom-form"[\s\S]*?<\/section>\s*(?=<footer|<section class="compact-brand")/, '');
fs.writeFileSync(file, html);

let css = fs.readFileSync(cssPath, 'utf8');
if (!css.includes('turkiye-hero-form-v1')) {
  css += `\n/* turkiye-hero-form-v1 */\n.tk-hero-wrap{grid-template-columns:minmax(0,1fr) 370px;align-items:center}.tk-hero-form{width:100%;max-width:370px;justify-self:end}.tk-hero-form .dp-hero-mini-grid{grid-template-columns:1fr 1fr}.tk-hero-form .dp-hero-submit .gradient-btn{width:100%;justify-content:center}.tk-hero-form .privacy-consent a{color:#fff;text-decoration:underline}@media(max-width:900px){.tk-hero-wrap{grid-template-columns:1fr}.tk-hero-form{max-width:720px;justify-self:stretch}.tk-hero-form .dp-hero-mini-grid{grid-template-columns:1fr 1fr}}@media(max-width:580px){.tk-hero-form .dp-hero-mini-grid{grid-template-columns:1fr}}\n`;
  fs.writeFileSync(cssPath, css);
}

console.log('Moved Turkey lead form into the hero to match the other destination pages.');
