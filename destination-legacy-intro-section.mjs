import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const cssPath = path.join(out, 'assets', 'styles.css');
const WA = '966125422331';
const wa = text => `https://api.whatsapp.com/send?phone=${WA}&text=${encodeURIComponent(text)}`;

const destinations = {
  georgia: {
    name: 'جورجيا',
    image: 'https://etlaala.com/wp-content/uploads/2025/02/Untitled-design-40.png',
    intro: 'مع إطلالة للسفر والسياحة، خَلِّ رحلتك إلى جورجيا تجربة تجمع بين الطبيعة الخلابة والمعالم التاريخية. نرتّب لك تبليسي والجبال والمناطق الساحلية مع فنادق وانتقالات وجولات تناسب وقتك وطبيعة رحلتك.',
    bullets: [
      'برامج سياحية متكاملة بين تبليسي والطبيعة والمدن المناسبة لمدة رحلتك',
      'فنادق وانتقالات وجولات مرتبة في عرض واضح قبل الحجز',
      'خيارات مناسبة للعائلات والأزواج ورحلات الشخصين',
      'مستشار سياحي يتابع معك من اختيار البرنامج حتى الوصول'
    ]
  },
  malaysia: {
    name: 'ماليزيا',
    image: 'https://etlaala.com/wp-content/uploads/2025/02/Untitled-design-45.png',
    intro: 'مع إطلالة للسفر والسياحة، عِش ماليزيا بين المدينة والطبيعة والجزر في برنامج واحد متوازن. نرتّب كوالالمبور ولانكاوي وبينانج والمرتفعات حسب عدد الأيام، مع إقامة مريحة وانتقالات واضحة.',
    bullets: [
      'برامج مرنة تجمع كوالالمبور والجزر بدون تنقلات مرهقة',
      'اختيارات فنادق ومنتجعات تناسب العائلات والأزواج',
      'ترتيب الطيران الداخلي والانتقالات بين محطات الرحلة',
      'مستشار سياحي يساعدك في اختيار عدد الليالي والمسار الأنسب'
    ]
  },
  maldives: {
    name: 'المالديف',
    image: 'https://etlaala.com/wp-content/uploads/2025/02/Untitled-design-20.png',
    intro: 'مع إطلالة للسفر والسياحة، اجعل رحلتك إلى المالديف تجربة استثنائية تجمع بين الراحة والفخامة. نساعدك تختار المنتجع ونوع الفيلا ونظام الوجبات والانتقال المناسب، سواء كانت الرحلة شهر عسل أو إجازة عائلية.',
    bullets: [
      'باقات متكاملة تشمل الإقامة والانتقالات والخدمات حسب العرض',
      'اختيار منتجعات وفلل مناسبة لشهر العسل والعائلات',
      'مقارنة واضحة بين نوع الفيلا والوجبات وطريقة الانتقال',
      'مرونة في الحجز وخيارات دفع تناسب الباقة المختارة'
    ]
  },
  thailand: {
    name: 'تايلاند',
    image: 'https://etlaala.com/wp-content/uploads/2025/02/Untitled-design-26.webp',
    intro: 'مع إطلالة للسفر والسياحة، استمتع بتايلاند بين أجواء بانكوك وشواطئ بوكيت وكرابي. نرتّب المدن والجزر والفنادق والانتقالات في برنامج مريح يجمع الثقافة والطبيعة والاسترخاء بدون جدول مزدحم.',
    bullets: [
      'برامج تجمع بانكوك وبوكيت وكرابي حسب عدد أيام السفر',
      'فنادق ومنتجعات نختارها حسب المنطقة وطبيعة الرحلة',
      'تنظيم الرحلات البحرية والأنشطة والانتقالات بين المدن',
      'خيارات مناسبة للعائلات والأزواج مع برنامج قابل للتعديل'
    ]
  },
  'bosnia-and-herzegovina': {
    name: 'البوسنة والهرسك',
    image: 'https://etlaala.com/wp-content/uploads/2025/03/Untitled-design-83.png',
    intro: 'مع إطلالة للسفر والسياحة، استمتع برحلة إلى البوسنة والهرسك تجمع هدوء الطبيعة وسحر المدن والتاريخ. نرتّب سراييفو وموستار والمناطق الطبيعية في مسار مريح مع فنادق وسيارة وجولات مناسبة.',
    bullets: [
      'برامج مرتبة بين سراييفو وموستار والطبيعة بدون تنقلات عشوائية',
      'فنادق وسيارة وجولات تناسب العائلات والرحلات الهادئة',
      'وجهة مناسبة للسعوديين مع ترتيب واضح قبل السفر',
      'مستشار سياحي يساعدك في اختيار خط السير وعدد الليالي'
    ]
  },
  europe: {
    name: 'أوروبا',
    image: 'https://etlaala.com/wp-content/uploads/2024/11/السياحة-في-أمستردام.webp',
    intro: 'مع إطلالة للسفر والسياحة، خطط لرحلة أوروبا بمسار واضح بدل كثرة المدن والتنقلات. نرتّب المدن والدول والفنادق ووسائل الانتقال حسب مدة السفر، سواء كانت رحلتك بين مدينتين أو أكثر من دولة أو كروز أوروبي.',
    bullets: [
      'مسارات متعددة المدن والدول بترتيب يقلل وقت التنقل',
      'فنادق وقطارات وطيران داخلي حسب كل قطاع من الرحلة',
      'إمكانية دمج كروز أوروبا مع إقامة قبل أو بعد الرحلة',
      'برنامج قابل للتخصيص للعائلات والأزواج وشهر العسل'
    ]
  },
  turkiye: {
    name: 'تركيا',
    image: 'https://etlaala.com/wp-content/uploads/2025/06/تركيا-1-scaled.webp',
    intro: 'مع إطلالة للسفر والسياحة، اجعل رحلتك إلى تركيا مميزة بين التاريخ والطبيعة والبحر. نرتّب إسطنبول وطرابزون والشمال التركي وأنطاليا أو كابادوكيا حسب عدد الأيام، مع فنادق وانتقالات وجولات في برنامج متوازن.',
    bullets: [
      'برامج سياحية مرنة من إسطنبول إلى الشمال التركي والمدن الساحلية',
      'فنادق وانتقالات وجولات حسب الموسم والميزانية',
      'خيارات مناسبة للعائلات والأزواج وبرامج شهر العسل',
      'مستشار سياحي معك خطوة بخطوة حتى تثبيت تفاصيل الرحلة'
    ]
  }
};

const aliases = {
  'georgia-2': 'georgia',
  'malaysia-2': 'malaysia',
  'maldives-2': 'maldives',
  'thailand-2': 'thailand',
  'turkey-2': 'turkiye'
};

function sectionHtml(d, id) {
  const bulletHtml = d.bullets.map(text => `<li><span aria-hidden="true">✓</span><b>${text}</b></li>`).join('');
  return `<section class="legacy-destination-intro" id="${id}" data-old-site-intro="true">
  <div class="container legacy-intro-grid">
    <div class="legacy-intro-content">
      <span class="legacy-intro-kicker">رحلتك مع إطلالة</span>
      <h2>إطلالة رفيقك في ${d.name} من الحجز حتى الوصول</h2>
      <p class="legacy-intro-lead">${d.intro}</p>
      <div class="legacy-intro-consult">
        <h3>تحدث الآن مع مستشار سياحي مجانًا من إطلالة</h3>
        <ul>${bulletHtml}</ul>
        <a class="gradient-btn legacy-intro-cta" data-track="whatsapp" href="${wa(`مرحباً إطلالة، أبغى أرتب رحلة ${d.name}`)}">احجز الآن</a>
      </div>
    </div>
    <figure class="legacy-intro-visual">
      <img src="${d.image}" alt="رحلات ${d.name} مع إطلالة" loading="lazy" decoding="async">
    </figure>
  </div>
</section>`;
}

function replaceFirstSection(html, d, id) {
  const re = new RegExp(`<section\\b[^>]*\\bid=["']${id}["'][^>]*>[\\s\\S]*?<\\/section>`, 'i');
  if (!re.test(html)) return { html, changed: false };
  return { html: html.replace(re, sectionHtml(d, id)), changed: true };
}

let changed = [];
for (const [slug, d] of Object.entries(destinations)) {
  const file = path.join(out, slug, 'index.html');
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, 'utf8');
  const id = slug === 'turkiye' ? 'route' : 'plan';
  const result = replaceFirstSection(html, d, id);
  if (!result.changed) continue;
  fs.writeFileSync(file, result.html);
  changed.push(slug);
}

for (const [alias, sourceSlug] of Object.entries(aliases)) {
  const file = path.join(out, alias, 'index.html');
  if (!fs.existsSync(file)) continue;
  const d = destinations[sourceSlug];
  let html = fs.readFileSync(file, 'utf8');
  const ids = sourceSlug === 'turkiye' ? ['route', 'plan'] : ['plan', 'route'];
  let didChange = false;
  for (const id of ids) {
    const result = replaceFirstSection(html, d, id);
    if (result.changed) {
      html = result.html;
      didChange = true;
      break;
    }
  }
  if (didChange) {
    fs.writeFileSync(file, html);
    changed.push(alias);
  }
}

if (fs.existsSync(cssPath)) {
  let css = fs.readFileSync(cssPath, 'utf8');
  const marker = 'destination-legacy-intro-section-v1';
  if (!css.includes(marker)) {
    css += `
/* ${marker} */
.legacy-destination-intro{position:relative;padding:64px 0 68px;background:#fff;overflow:hidden}
.legacy-destination-intro:before{content:'';position:absolute;left:-90px;top:42px;width:270px;height:270px;border-radius:50%;background:radial-gradient(circle,rgba(48,92,220,.07),rgba(48,92,220,0) 70%);pointer-events:none}
.legacy-intro-grid{display:grid;grid-template-columns:minmax(0,1.18fr) minmax(330px,.82fr);gap:56px;align-items:center;direction:ltr}
.legacy-intro-content,.legacy-intro-visual{direction:rtl;min-width:0}
.legacy-intro-content{padding:8px 0}
.legacy-intro-kicker{display:inline-block;margin-bottom:8px;color:#385bd2;font-size:14px;font-weight:900}
.legacy-intro-content h2{max-width:720px;margin:0 0 16px;color:#182d72;font-size:clamp(30px,3.1vw,45px);line-height:1.35;letter-spacing:-.02em}
.legacy-intro-lead{max-width:760px;margin:0;color:#5f6981;font-size:16.5px;line-height:1.95}
.legacy-intro-consult{margin-top:28px;padding-top:24px;border-top:1px solid #e7ebf4}
.legacy-intro-consult h3{margin:0 0 16px;color:#172760;font-size:clamp(22px,2.1vw,30px);line-height:1.45}
.legacy-intro-consult ul{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px 18px;margin:0 0 22px;padding:0;list-style:none}
.legacy-intro-consult li{display:flex;align-items:flex-start;gap:9px;color:#43506e;font-size:14.5px;line-height:1.65}
.legacy-intro-consult li span{display:grid;place-items:center;flex:0 0 23px;width:23px;height:23px;margin-top:1px;border-radius:50%;background:#eaf7f2;color:#248d69;font-size:12px;font-weight:900}
.legacy-intro-consult li b{font-weight:700}
.legacy-intro-cta{display:inline-flex;min-width:145px;justify-content:center;padding:13px 25px!important;border-radius:14px!important}
.legacy-intro-visual{position:relative;margin:0;min-height:470px;display:grid;place-items:center;border-radius:42px;background:linear-gradient(145deg,#f8faff,#fff);isolation:isolate}
.legacy-intro-visual:before{content:'';position:absolute;inset:16px -20px -16px 22px;border:2px solid rgba(62,83,172,.14);border-radius:48% 52% 48% 52% / 38% 42% 58% 62%;z-index:-1}
.legacy-intro-visual:after{content:'';position:absolute;right:-26px;bottom:28px;width:110px;height:110px;border-radius:50%;background:linear-gradient(135deg,rgba(38,164,223,.12),rgba(114,55,190,.08));z-index:-1}
.legacy-intro-visual img{display:block;width:100%;height:470px;object-fit:contain;object-position:center;border-radius:36px}
@media(max-width:900px){
  .legacy-destination-intro{padding:48px 0 54px}
  .legacy-intro-grid{grid-template-columns:1fr;gap:28px;direction:rtl}
  .legacy-intro-content{order:1}
  .legacy-intro-visual{order:2;min-height:360px;max-width:520px;width:100%;margin:0 auto}
  .legacy-intro-visual img{height:360px}
}
@media(max-width:620px){
  .legacy-destination-intro{padding:36px 0 42px}
  .legacy-intro-grid{gap:22px}
  .legacy-intro-kicker{font-size:12px}
  .legacy-intro-content h2{font-size:29px;line-height:1.4;margin-bottom:12px}
  .legacy-intro-lead{font-size:15px;line-height:1.85}
  .legacy-intro-consult{margin-top:20px;padding-top:18px}
  .legacy-intro-consult h3{font-size:21px;margin-bottom:13px}
  .legacy-intro-consult ul{grid-template-columns:1fr;gap:9px;margin-bottom:18px}
  .legacy-intro-consult li{font-size:14px}
  .legacy-intro-cta{width:100%}
  .legacy-intro-visual{min-height:300px;border-radius:28px}
  .legacy-intro-visual:before{inset:10px -10px -10px 12px}
  .legacy-intro-visual img{height:300px;border-radius:24px}
}
`;
    fs.writeFileSync(cssPath, css);
  }
}

console.log(`Replaced the first planning section with old-site-inspired visual content on: ${changed.join(', ') || 'no pages'}.`);
