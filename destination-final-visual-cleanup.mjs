import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const cssPath = path.join(out, 'assets', 'styles.css');

const pages = {
  georgia: {
    name: 'جورجيا',
    introImage: 'https://etlaala.com/wp-content/uploads/2025/02/Untitled-design-40.png',
    introAlt: 'الطبيعة في جورجيا',
    firstPlaceImage: 'https://etlaala.com/wp-content/uploads/2025/02/%D8%A8%D8%AD%D9%8A%D8%B1%D8%A9-%D8%A7%D9%84%D8%B3%D9%84%D8%A7%D8%AD%D9%81-1-1.jpg',
    firstPlaceAlt: 'تبليسي والطبيعة في جورجيا'
  },
  malaysia: {
    name: 'ماليزيا',
    introImage: 'https://etlaala.com/wp-content/uploads/2025/02/Tourism-in-malaysia-body-ar-02-20220622-1024x640-1.webp',
    introAlt: 'طبيعة ماليزيا',
    firstPlaceImage: 'https://etlaala.com/wp-content/uploads/2025/02/Untitled-design-45.png',
    firstPlaceAlt: 'كوالالمبور ماليزيا'
  },
  maldives: {
    name: 'المالديف',
    introImage: 'https://etlaala.com/wp-content/uploads/2025/02/sachika-new.webp',
    introAlt: 'رحلة بحرية في المالديف',
    firstPlaceImage: 'https://etlaala.com/wp-content/uploads/2025/02/Untitled-design-19.png',
    firstPlaceAlt: 'فلل ومنتجعات المالديف فوق الماء'
  },
  thailand: {
    name: 'تايلاند',
    introImage: 'https://etlaala.com/wp-content/uploads/2025/02/Koh-Tao-1.webp',
    introAlt: 'جزر وطبيعة تايلاند',
    firstPlaceImage: 'https://etlaala.com/wp-content/uploads/2025/02/Untitled-design-47.png',
    firstPlaceAlt: 'الأسواق العائمة في تايلاند'
  },
  'bosnia-and-herzegovina': {
    name: 'البوسنة والهرسك',
    introImage: 'https://etlaala.com/wp-content/uploads/2025/03/Untitled-design-83.png',
    introAlt: 'الطبيعة في البوسنة والهرسك',
    firstPlaceImage: 'https://etlaala.com/wp-content/uploads/2025/06/%D8%B3%D8%B1%D8%A7%D9%8A%D9%8A%D9%81%D9%88-1.webp',
    firstPlaceAlt: 'سراييفو البوسنة والهرسك'
  },
  europe: {
    name: 'أوروبا',
    introImage: 'https://etlaala.com/wp-content/uploads/2024/11/%D8%A7%D9%84%D8%B3%D9%8A%D8%A7%D8%AD%D8%A9-%D9%81%D9%8A-%D8%A3%D9%85%D8%B3%D8%AA%D8%B1%D8%AF%D8%A7%D9%85.webp',
    introAlt: 'رحلات أوروبا',
    firstPlaceImage: 'https://etlaala.com/wp-content/uploads/2024/11/%D8%A3%D9%85%D8%A7%D9%83%D9%86-%D8%B3%D9%8A%D8%A7%D8%AD%D9%8A%D8%A9-%D9%81%D9%8A-%D9%81%D8%B1%D9%86%D8%B3%D8%A7.webp',
    firstPlaceAlt: 'فرنسا ضمن رحلات أوروبا'
  }
};

function cleanDestination(slug, d) {
  const file = path.join(out, slug, 'index.html');
  if (!fs.existsSync(file)) return;
  let html = fs.readFileSync(file, 'utf8');
  if (!html.includes('class="dp-page')) return;

  // Remove the standalone three-image gallery section completely.
  html = html.replace(/\s*<section class="dp-photo-story"[\s\S]*?<\/section>\s*/g, '\n');

  // Make the operation idempotent when the build is rerun.
  html = html.replace(/\s*<figure class="dp-inline-visual"[\s\S]*?<\/figure>\s*/g, '\n');
  html = html.replace(/<img class="dp-place-image"[^>]*>/g, '');

  const introFigure = `<figure class="dp-inline-visual"><img src="${d.introImage}" alt="${d.introAlt}" loading="lazy" decoding="async"></figure>`;
  html = html.replace(/(<div class="dp-copy">[\s\S]*?)(<a class="dp-text-link")/, `$1${introFigure}$2`);

  html = html.replace(
    /<article class="dp-place dp-place-1">/,
    `<article class="dp-place dp-place-1"><img class="dp-place-image" src="${d.firstPlaceImage}" alt="${d.firstPlaceAlt}" loading="lazy" decoding="async">`
  );

  fs.writeFileSync(file, html);
}

for (const [slug, d] of Object.entries(pages)) cleanDestination(slug, d);

const turkeyPath = path.join(out, 'turkiye', 'index.html');
if (fs.existsSync(turkeyPath)) {
  let html = fs.readFileSync(turkeyPath, 'utf8');

  // Turkey: remove any old gallery and the old bottom form, then move the same compact lead form into the hero.
  html = html.replace(/<a href="#gallery">صور تركيا<\/a>/g, '');
  html = html.replace(/\s*<section class="tk-section tk-gallery-section" id="gallery">[\s\S]*?<\/section>\s*/g, '\n');
  html = html.replace(/\s*<section class="tk-bottom-form"[\s\S]*?<\/section>\s*/g, '\n');
  html = html.replace(/\s*<figure class="tk-inline-visual"[\s\S]*?<\/figure>\s*/g, '\n');

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

  const turkeyIntro = `<figure class="tk-inline-visual"><img src="https://etlaala.com/wp-content/uploads/2025/06/تركيا-1-scaled.webp" alt="مناظر من تركيا" loading="lazy" decoding="async"></figure>`;
  html = html.replace(/(<div class="tk-copy tk-reveal">[\s\S]*?)(<a class="tk-text-link")/, `$1${turkeyIntro}$2`);

  fs.writeFileSync(turkeyPath, html);
}

if (fs.existsSync(cssPath)) {
  let css = fs.readFileSync(cssPath, 'utf8');
  if (!css.includes('destination-final-visual-cleanup-v1')) {
    css += `
/* destination-final-visual-cleanup-v1 */
/* Match every destination cover headline to the homepage headline typography. */
.dp-page .dp-hero h1,.tk-premium .tk-hero h1{font-family:'Noto Kufi Arabic',Tahoma,Arial,sans-serif!important;font-weight:800!important;letter-spacing:-1.5px!important;line-height:1.32!important}

/* Replace the detached gallery with contextual imagery inside the content. */
.dp-photo-story{display:none!important}
.dp-inline-visual,.tk-inline-visual{margin:24px 0 2px;border-radius:22px;overflow:hidden;background:#e9edf6;box-shadow:0 16px 38px rgba(22,40,100,.09)}
.dp-inline-visual img,.tk-inline-visual img{display:block;width:100%;height:285px;object-fit:cover}
.dp-place-1{isolation:isolate}
.dp-place-1 .dp-place-image{position:absolute!important;inset:0!important;z-index:0!important;width:100%!important;height:100%!important;object-fit:cover!important;display:block!important}
.dp-place-1:before{z-index:1!important;background:linear-gradient(180deg,rgba(9,27,71,.12) 5%,rgba(8,23,65,.88) 94%)!important}
.dp-place-1>*:not(.dp-place-image){position:relative!important;z-index:2!important}

/* Turkey hero form now follows the same top-of-page structure as the other destinations. */
.tk-hero-wrap{grid-template-columns:minmax(0,1.12fr) minmax(360px,.88fr)!important;gap:40px!important;align-items:center!important}
.tk-hero-form{width:100%;max-width:380px;justify-self:end}
.tk-hero-form .dp-hero-mini-grid{grid-template-columns:repeat(2,minmax(0,1fr))}
.tk-hero-form .dp-hero-submit .gradient-btn{width:100%;justify-content:center}

@media(max-width:980px){
  .dp-inline-visual img,.tk-inline-visual img{height:260px}
  .tk-hero-wrap{grid-template-columns:1fr!important;gap:24px!important}
  .tk-hero-form{max-width:720px;justify-self:stretch}
}
@media(max-width:600px){
  .dp-page .dp-hero h1,.tk-premium .tk-hero h1{font-size:2.15rem!important;line-height:1.35!important;letter-spacing:-.5px!important}
  .dp-inline-visual,.tk-inline-visual{margin-top:19px;border-radius:16px}
  .dp-inline-visual img,.tk-inline-visual img{height:220px}
  .tk-hero-form .dp-hero-mini-grid{grid-template-columns:1fr}
}
`;
    fs.writeFileSync(cssPath, css);
  }
}

console.log('Unified destination hero typography, removed detached galleries, redistributed destination imagery, and moved Turkey form into the hero.');
