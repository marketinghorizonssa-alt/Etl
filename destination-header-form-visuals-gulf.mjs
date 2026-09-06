import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const cssPath = path.join(out, 'assets', 'styles.css');

const pages = {
  georgia: {
    name: 'جورجيا',
    photos: [
      ['https://etlaala.com/wp-content/uploads/2025/02/%D8%A8%D8%AD%D9%8A%D8%B1%D8%A9-%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D8%AD%D9%81-1-1.jpg', 'تبليسي والطبيعة'],
      ['https://etlaala.com/wp-content/uploads/2025/02/Untitled-design-40.png', 'الطبيعة الجورجية'],
      ['https://etlaala.com/wp-content/uploads/2025/02/PsJ8hzMbbOdMyONhMUOtIPDYJLikBNjiQeimQtbY.webp', 'بحيرة السلاحف']
    ]
  },
  malaysia: {
    name: 'ماليزيا',
    photos: [
      ['https://etlaala.com/wp-content/uploads/2025/02/Untitled-design-45.png', 'كوالالمبور'],
      ['https://etlaala.com/wp-content/uploads/2025/02/BOH-Tea-Plantation-what-to-do-in-Cameron-Highlands-Malaysia.jpg', 'مرتفعات كاميرون'],
      ['https://etlaala.com/wp-content/uploads/2025/02/Tourism-in-malaysia-body-ar-02-20220622-1024x640-1.webp', 'طبيعة ماليزيا']
    ]
  },
  maldives: {
    name: 'المالديف',
    photos: [
      ['https://etlaala.com/wp-content/uploads/2025/02/Untitled-design-19.png', 'فلل فوق الماء'],
      ['https://etlaala.com/wp-content/uploads/2025/02/%D8%B1%D9%8A%D8%A7%D8%B6%D8%A9-%D8%A7%D9%84%D8%BA%D9%88%D8%B5-413x275-1.webp', 'الغوص والشعاب المرجانية'],
      ['https://etlaala.com/wp-content/uploads/2025/02/sachika-new.webp', 'رحلات بحرية']
    ]
  },
  thailand: {
    name: 'تايلاند',
    photos: [
      ['https://etlaala.com/wp-content/uploads/2025/02/Untitled-design-26.webp', 'منتجعات تايلاند'],
      ['https://etlaala.com/wp-content/uploads/2025/02/Koh-Tao-1.webp', 'رحلات الجزر'],
      ['https://etlaala.com/wp-content/uploads/2025/02/Untitled-design-47.png', 'الأسواق العائمة']
    ]
  },
  'bosnia-and-herzegovina': {
    name: 'البوسنة والهرسك',
    photos: [
      ['https://etlaala.com/wp-content/uploads/2025/06/%D8%B3%D8%B1%D8%A7%D9%8A%D9%8A%D9%81%D9%88-1.webp', 'سراييفو'],
      ['https://etlaala.com/wp-content/uploads/2025/06/%D9%85%D9%88%D8%B3%D8%AA%D8%A7%D8%B1.jpg', 'موستار'],
      ['https://etlaala.com/wp-content/uploads/2025/03/Untitled-design-83.png', 'الطبيعة في البوسنة']
    ]
  },
  europe: {
    name: 'أوروبا',
    photos: [
      ['https://etlaala.com/wp-content/uploads/2024/11/%D8%A3%D9%85%D8%A7%D9%83%D9%86-%D8%B3%D9%8A%D8%A7%D8%AD%D9%8A%D8%A9-%D9%81%D9%8A-%D9%81%D8%B1%D9%86%D8%B3%D8%A7.webp', 'فرنسا'],
      ['https://etlaala.com/wp-content/uploads/2024/11/%D8%A7%D9%84%D8%B3%D9%8A%D8%A7%D8%AD%D8%A9-%D9%81%D9%8A-%D8%A8%D9%84%D8%AC%D9%8A%D9%83%D8%A7-%D9%81%D9%8A-%D8%A7%D9%84%D8%B4%D8%AA%D8%A7%D8%A1.webp', 'بلجيكا'],
      ['https://etlaala.com/wp-content/uploads/2024/11/%D8%A7%D9%84%D8%B3%D9%8A%D8%A7%D8%AD%D8%A9-%D9%81%D9%8A-%D8%A3%D9%85%D8%B3%D8%AA%D8%B1%D8%AF%D8%A7%D9%85.webp', 'أمستردام']
    ]
  }
};

const esc = (s = '') => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function heroForm(d) {
  return `<aside class="dp-hero-form" aria-label="طلب عرض سريع لـ ${esc(d.name)}">
    <span>طلب سريع</span>
    <strong>خلّنا نرتّب لك رحلة ${esc(d.name)}</strong>
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
      <div class="dp-hero-submit"><button type="submit" class="gradient-btn">اطلب عرض ${esc(d.name)}</button><div class="status" role="status" aria-live="polite"></div></div>
    </form>
  </aside>`;
}

function photoSection(d) {
  const figs = d.photos.map(([src, caption], i) => `<figure class="dp-photo-${i + 1}"><img src="${src}" alt="${esc(caption)} - ${esc(d.name)}" loading="lazy" decoding="async"><figcaption>${esc(caption)}</figcaption></figure>`).join('');
  return `<section class="dp-photo-story" aria-label="صور من ${esc(d.name)}"><div class="container"><div class="dp-photo-story-head"><span class="dp-kicker">من ${esc(d.name)}</span><h2>لقطات تعطيك إحساس الوجهة قبل الرحلة</h2></div><div class="dp-photo-grid">${figs}</div></div></section>`;
}

const gulfReplacements = [
  ['على قد مدة السفر', 'حسب مدة السفر'],
  ['على قد عدد الأيام', 'حسب عدد الأيام'],
  ['بشكل يخلي وقتك للرحلة مو للطريق', 'بشكل يعطيك وقت أكثر للاستمتاع بالرحلة بدل الطريق'],
  ['جورجيا أجمل لما ما نحاول نحط كل المدن في جدول واحد', 'جورجيا أجمل لما نختار المدن اللي تناسب مدة الرحلة'],
  ['تعرف فيه ليه اخترنا كل محطة', 'تعرف فيه ليش اخترنا كل محطة'],
  ['قبل ما نرسل العرض', 'قبل إرسال العرض'],
  ['نركّب البرنامج من الخيارات المناسبة', 'نرتّب البرنامج من الخيارات المناسبة'],
  ['بدون ما يتحول كل يوم لقائمة حجوزات', 'بدون ما يصير كل يوم مجرد قائمة حجوزات'],
  ['ثلاث طرق نبدأ منها، وبعدها نضبطها عليك', 'ثلاث أفكار نبدأ منها، وبعدها نضبطها لك'],
  ['ابدأ بمسار الرحلة قبل ما تبدأ تحجز الفنادق', 'ابدأ بمسار الرحلة قبل حجز الفنادق'],
  ['الأيام اللي تضيع في الطريق', 'الأيام اللي تروح في الطريق'],
  ['بجدول ما يستهلكك في التنقل', 'بجدول مريح بدون تنقلات مرهقة'],
  ['بدون استعجال', 'براحة أكثر'],
  ['مالها داعي', 'غير ضرورية'],
  ['مو دائمًا الأغلى هو الأنسب', 'مو بالضرورة الأغلى هو الأنسب']
];

for (const [slug, d] of Object.entries(pages)) {
  const file = path.join(out, slug, 'index.html');
  if (!fs.existsSync(file)) continue;

  let html = fs.readFileSync(file, 'utf8');
  if (!html.includes('class="dp-page')) continue;

  html = html.replace(/<aside class="dp-hero-card">[\s\S]*?<\/aside>/, heroForm(d));
  html = html.replace(/<section class="dp-bottom-form"[\s\S]*?<\/section>\s*/g, '');

  if (!html.includes('class="dp-photo-story"')) {
    html = html.replace(/<section class="dp-section dp-soft" id="places">/, `${photoSection(d)}\n<section class="dp-section dp-soft" id="places">`);
  }

  for (const [from, to] of gulfReplacements) html = html.split(from).join(to);

  fs.writeFileSync(file, html);
}

if (fs.existsSync(cssPath)) {
  let css = fs.readFileSync(cssPath, 'utf8');
  if (!css.includes('destination-header-form-visuals-gulf-v1')) {
    css += `
/* destination-header-form-visuals-gulf-v1 */
.dp-page .dp-hero h1{font-family:Tahoma,Arial,sans-serif!important;font-weight:700!important;letter-spacing:0!important;line-height:1.28!important;font-size:clamp(2.45rem,4.65vw,4.15rem)!important;max-width:790px!important;text-wrap:balance}
.dp-page .dp-hero-wrap{grid-template-columns:minmax(0,1.12fr) minmax(360px,.88fr)!important;gap:40px!important}
.dp-hero-form{padding:20px;border:1px solid rgba(255,255,255,.22);border-radius:22px;background:rgba(9,27,76,.62);backdrop-filter:blur(16px);box-shadow:0 22px 58px rgba(0,0,0,.2);color:#fff}
.dp-hero-form>span{display:block;margin-bottom:4px;color:#bfefff;font-size:.7rem;font-weight:900}.dp-hero-form>strong{display:block;margin-bottom:14px;color:#fff;font-family:Tahoma,Arial,sans-serif;font-size:1rem;line-height:1.55}
.dp-hero-lead-form{min-width:0}.dp-hero-mini-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.dp-hero-lead-form label{display:grid;gap:4px;margin:0;color:rgba(255,255,255,.9);font-size:.66rem;font-weight:800}.dp-hero-lead-form input,.dp-hero-lead-form select,.dp-hero-lead-form textarea{width:100%;min-height:41px;padding:8px 10px;border:1px solid rgba(255,255,255,.24);border-radius:10px;background:rgba(255,255,255,.96);color:#18213f;outline:0;font:inherit}.dp-hero-lead-form input:focus,.dp-hero-lead-form select:focus,.dp-hero-lead-form textarea:focus{border-color:#8bdcff;box-shadow:0 0 0 3px rgba(139,220,255,.15)}.dp-hero-notes{margin-top:9px!important}.dp-hero-lead-form textarea{min-height:52px;resize:vertical}.dp-hero-consent{display:flex!important;align-items:flex-start!important;gap:7px!important;margin:9px 0 11px!important;color:rgba(255,255,255,.78)!important;font-size:.62rem!important;line-height:1.5!important;font-weight:500!important}.dp-hero-consent input{width:15px!important;height:15px!important;min-height:0!important;padding:0!important;flex:0 0 15px;margin-top:2px}.dp-hero-consent a{color:#d8f5ff!important;font-weight:800;text-decoration:underline;text-underline-offset:2px}.dp-hero-form .hp-field{position:absolute!important;left:-10000px!important;width:1px!important;height:1px!important;overflow:hidden!important}.dp-hero-submit{display:flex;align-items:center;gap:9px}.dp-hero-submit .gradient-btn{width:100%;min-height:42px;padding:9px 16px;font-size:.78rem}.dp-hero-submit .status{margin:0;color:#fff;font-size:.66rem;line-height:1.45}
.dp-photo-story{padding:8px 0 66px;background:#fff}.dp-photo-story-head{display:flex;align-items:end;justify-content:space-between;gap:20px;margin-bottom:17px}.dp-photo-story-head h2{max-width:720px;margin:5px 0 0;color:#172760;font-family:Tahoma,Arial,sans-serif;font-size:clamp(1.55rem,2.5vw,2.15rem);font-weight:700;line-height:1.42}.dp-photo-grid{display:grid;grid-template-columns:1.2fr .9fr .9fr;gap:12px}.dp-photo-grid figure{position:relative;height:285px;margin:0;border-radius:20px;overflow:hidden;background:#e9edf6;box-shadow:0 14px 34px rgba(22,40,100,.08)}.dp-photo-grid figure:first-child{height:330px}.dp-photo-grid img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .45s ease}.dp-photo-grid figure:hover img{transform:scale(1.035)}.dp-photo-grid figure:after{content:'';position:absolute;inset:auto 0 0;height:44%;background:linear-gradient(180deg,transparent,rgba(6,18,52,.68));pointer-events:none}.dp-photo-grid figcaption{position:absolute;z-index:2;right:16px;bottom:14px;color:#fff;font-family:Tahoma,Arial,sans-serif;font-size:.78rem;font-weight:800;text-shadow:0 2px 12px rgba(0,0,0,.35)}
@media(max-width:980px){.dp-page .dp-hero-wrap{grid-template-columns:1fr!important;gap:24px!important}.dp-hero-form{max-width:720px}.dp-photo-grid{grid-template-columns:1fr 1fr}.dp-photo-grid figure:first-child{grid-column:1/-1;height:300px}.dp-photo-grid figure{height:240px}}
@media(max-width:600px){.dp-page .dp-hero h1{font-size:2.15rem!important;line-height:1.35!important}.dp-hero-form{padding:16px;border-radius:18px}.dp-hero-mini-grid{grid-template-columns:1fr}.dp-hero-submit{align-items:stretch;flex-direction:column}.dp-photo-story{padding:4px 0 42px}.dp-photo-story-head{display:block}.dp-photo-grid{grid-template-columns:1fr;gap:10px}.dp-photo-grid figure,.dp-photo-grid figure:first-child{grid-column:auto;height:220px;border-radius:16px}}
`;
    fs.writeFileSync(cssPath, css);
  }
}

console.log('Moved compact forms into destination heroes, matched Turkey hero typography, added destination imagery, and normalized Gulf copy.');
