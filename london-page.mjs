import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const europeFile = path.join(out, 'europe', 'index.html');
const londonDir = path.join(out, 'europe', 'london');
const londonFile = path.join(londonDir, 'index.html');
const sitemapFile = path.join(out, 'sitemap.xml');

if (!fs.existsSync(europeFile)) throw new Error('Missing Europe source page: dist/europe/index.html');

const canonical = 'https://etlaala.net/europe/london/';
const title = 'السياحة في لندن 2026 | عروض وبكجات وبرامج لندن | إطلالة';
const description = 'خطط للسياحة في لندن من السعودية مع إطلالة: عروض وبكجات وبرامج لندن للعوائل والأزواج، مع فنادق وانتقالات وجدول قابل للتخصيص.';
const whatsappHref = `https://api.whatsapp.com/send?phone=966125422331&text=${encodeURIComponent('مرحباً إطلالة، أبغى برنامج سياحي للندن')}`;
const heroImage = 'https://etlaala.com/wp-content/uploads/2025/03/Untitled-design-66.webp';
const introImage = 'https://etlaala.com/wp-content/uploads/2024/08/أهم-المعالم-السياحية-في-لندن-2.webp';

let europe = fs.readFileSync(europeFile, 'utf8');

const faq = [
  ['كم يوم مناسب للسياحة في لندن؟', 'يعتمد على أسلوب الرحلة، لكن برنامج من عدة أيام يسمح بزيارة أهم معالم لندن مع وقت للتسوق وتجربة الأحياء المختلفة، ويمكن إضافة رحلة يوم خارج المدينة إذا كانت المدة مناسبة.'],
  ['هل يمكن تجهيز بكج لندن من السعودية؟', 'نعم، يتم ترتيب البكج حسب تاريخ السفر وعدد المسافرين ومستوى الفندق والتنقلات والأنشطة المطلوبة، مع توضيح الخدمات المشمولة قبل التأكيد.'],
  ['هل يمكن تجهيز عرض لندن لمدة 7 أيام؟', 'نعم، ويمكن توزيع الأيام بين المعالم الرئيسية والتسوق وتجارب العائلة أو الأزواج بدون ضغط الجدول، ثم تعديل التفاصيل حسب الموسم ووقت الوصول والمغادرة.'],
  ['هل توجد عروض لندن لشخصين؟', 'يمكن تجهيز برنامج لشخصين حسب عدد الليالي ومستوى الفندق ونوع الرحلة، سواء كانت رحلة مدينة أو تسوق أو مناسبة خاصة.'],
  ['هل لندن مناسبة للعوائل؟', 'نعم، ويمكن ترتيب الأيام بحيث تجمع بين المعالم المفتوحة والمتاحف وتجارب الأطفال والتسوق، مع تقليل التنقلات الطويلة قدر الإمكان.'],
  ['هل لندن مناسبة في الشتاء؟', 'نعم، لكن شكل البرنامج يختلف مع قصر ساعات النهار والطقس البارد. لذلك نزيد الأنشطة الداخلية ونرتب الجولات الخارجية في الأوقات الأنسب خلال اليوم.']
];

const topics = [
  ['السياحة في لندن من السعودية', 'إذا كنت تخطط للسياحة في لندن من السعودية، نبدأ بعدد الأيام وعدد المسافرين ونوع الرحلة. بعدها نرتب الفندق والتنقلات والمعالم بحيث يكون البرنامج واضحًا من أول يوم إلى آخر يوم.'],
  ['عروض السفر إلى لندن', 'عروض السفر إلى لندن تختلف حسب الموسم وعدد الليالي ومستوى الفندق والخدمات المشمولة. الأفضل مقارنة العرض كاملًا بدل الاعتماد على سعر منفصل لا يوضح تفاصيل الإقامة أو التنقلات.'],
  ['بكج لندن وبكجات السفر', 'بكج لندن يمكن أن يكون بسيطًا لفندق وتنقلات أساسية أو برنامجًا أوسع يشمل جولات وأنشطة. نحدد الشكل المناسب حسب ميزانية الرحلة وعدد المسافرين بدل إضافة خدمات غير ضرورية.'],
  ['برنامج سياحي في لندن', 'البرنامج السياحي في لندن يكون أفضل عندما نجمع المعالم المتقاربة في نفس اليوم. بهذه الطريقة نقلل الوقت في المواصلات ونترك مساحة للتسوق والمطاعم والتجارب الشخصية.'],
  ['برنامج لندن 7 أيام', 'سبعة أيام تعطي مساحة جيدة لزيارة معالم لندن الأساسية بدون استعجال، مع وقت للتسوق ويوم مرن يمكن تخصيصه للعائلة أو لرحلة يوم خارج المدينة حسب الرغبة.'],
  ['عروض لندن لشخصين', 'عند تجهيز عرض لندن لشخصين نركز على موقع الفندق وسهولة التنقل وتوزيع الأيام. ويمكن جعل الرحلة أكثر هدوءًا للأزواج بدل ملء الجدول بعدد كبير من الزيارات.'],
  ['لندن للعوائل', 'لندن مناسبة للعوائل لأن المعالم متنوعة بين الحدائق والمتاحف والعروض وتجارب الأطفال. نرتب الأيام بشكل أخف ونترك فترات راحة حتى لا تصبح الرحلة مجهدة.'],
  ['السفر إلى لندن في الشتاء', 'السفر إلى لندن في الشتاء يحتاج جدولًا مختلفًا عن الصيف. نضع الأنشطة الخارجية في ساعات النهار ونوزع المتاحف والتسوق والتجارب الداخلية على بقية اليوم.']
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'TouristDestination', name: 'لندن', url: canonical, description },
    {
      '@type': 'FAQPage',
      mainEntity: faq.map(([q, a]) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a }
      }))
    }
  ]
};

const faqHtml = faq.map(([q, a]) => `<details class="unified-faq-item"><summary><span>${q}</span><b aria-hidden="true">+</b></summary><div class="unified-faq-answer"><p>${a}</p></div></details>`).join('');
const topicsHtml = topics.map(([heading, text], i) => `<details class="context-card context-guide-item"><summary><span class="context-card-index">${String(i + 1).padStart(2, '0')}</span><h3>${heading}</h3><b class="context-guide-toggle" aria-hidden="true">+</b></summary><div class="context-guide-answer"><p>${text}</p></div></details>`).join('');

const formHtml = `<aside id="destination-quote-form" class="dp-hero-form" aria-label="طلب عرض سريع للندن">
  <span>طلب سريع</span>
  <strong>خلّنا نرتّب لك رحلة لندن</strong>
  <form class="dp-hero-lead-form" data-lead-form novalidate>
    <div class="dp-hero-mini-grid">
      <label><span>الاسم</span><input name="name" type="text" autocomplete="name" required placeholder="الاسم"></label>
      <label><span>رقم الجوال</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required pattern="(?:\\+?966|0)?5[0-9]{8}" maxlength="13" placeholder="05xxxxxxxx"></label>
      <label><span>عدد المسافرين</span><select name="travelers" required><option value="" selected disabled>اختر</option><option value="1">1</option><option value="2">2</option><option value="3-4">3–4</option><option value="5-6">5–6</option><option value="7+">7+</option></select></label>
      <label><span>تاريخ السفر</span><span class="travel-date-shell"><span class="travel-date-display" aria-hidden="true">اختر تاريخ السفر</span><input data-travel-date-field="true" placeholder="اختر تاريخ السفر" autocomplete="off" aria-label="تاريخ السفر" class="travel-date-input travel-date-native" name="travel_date" type="date"></span></label>
    </div>
    <label class="dp-hero-notes"><span>ملاحظة مختصرة</span><textarea name="notes" rows="2" placeholder="عدد الأيام أو نوع الرحلة اللي في بالك"></textarea></label>
    <label class="privacy-consent dp-hero-consent"><input type="checkbox" name="privacy_consent" required value="yes" checked><span>أوافق على استخدام بياناتي للتواصل بخصوص طلب الرحلة وفق <a href="/privacy-policy/">سياسة الخصوصية</a>.</span></label>
    <div class="hp-field" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
    <div class="dp-hero-submit"><button type="submit" class="gradient-btn">اطلب عرض لندن</button><div class="status" role="status" aria-live="polite"></div></div>
  </form>
  <script id="destination-date-early-init-v2">(function(){var i=document.querySelector('input[name="travel_date"]');if(!i)return;function p(n){return String(n).padStart(2,'0')}function iso(d){return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate())}var t=new Date();t.setHours(12,0,0,0);var d=new Date(t);d.setDate(d.getDate()+3);if(!i.min)i.min=iso(t);if(!i.value)i.value=iso(d);var s=i.closest('.travel-date-shell');var o=s&&s.querySelector('.travel-date-display');if(o&&i.value){var a=i.value.split('-');o.textContent=a[2]+'/'+a[1]+'/'+a[0]}})();</script>
</aside>`;

const londonStyle = `<style id="london-page-polish-v1">
.dp-ln .london-intro-visual{display:block!important;width:100%!important;max-width:540px!important;aspect-ratio:16/10!important;margin:0 auto!important;overflow:hidden!important;border:1px solid #e0e5ef!important;border-radius:26px!important;background:#eef3ff!important;box-shadow:0 18px 46px rgba(25,49,125,.10)!important}
.dp-ln .london-intro-visual img{display:block!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:center!important;border-radius:0!important}
@media(max-width:900px){.dp-ln .london-intro-visual{max-width:600px!important}}
@media(max-width:620px){.dp-ln .london-intro-visual{max-width:100%!important;border-radius:20px!important}}
</style>`;

const main = `<main id="main" class="dp-page dp-eu dp-ln" data-premium-destination="london">
<section class="dp-hero"><img src="${heroImage}" width="1600" height="499" alt="السياحة في لندن مع إطلالة" fetchpriority="high" decoding="async" loading="eager"><div class="dp-hero-overlay"></div><div class="container dp-hero-wrap"><div class="dp-hero-copy"><span class="dp-pill">لندن مع إطلالة</span><h1>السياحة في لندن بعرض وبرنامج مرتب من أول يوم</h1><p>نرتّب لك بكج لندن من السعودية حسب عدد الأيام والموسم، مع فندق مناسب وتنقلات وجدول يجمع المعالم والتسوق وتجارب العائلة أو الأزواج بدون ما يكون اليوم مزدحمًا.</p><div class="dp-actions"><a class="gradient-btn" data-track="whatsapp" href="${whatsappHref}">تواصل واتساب</a><a class="ghost-btn" data-track="call" href="tel:+966920029967">اتصل بنا</a></div></div>${formHtml}</div></section>
<section class="legacy-destination-intro" id="plan" data-old-site-intro="true"><div class="container legacy-intro-grid"><div class="legacy-intro-content"><span class="legacy-intro-kicker">رحلتك إلى لندن مع إطلالة</span><h2>مدينة واحدة فيها أكثر من نوع رحلة</h2><p class="legacy-intro-lead">لندن مناسبة لمن يريد المعالم والتسوق والمتاحف والحدائق في رحلة واحدة. ولو تفضّل تتعامل مع شركة سياحة لترتيب لندن كاملة، نوزع الأيام حسب موقع الفندق ووقت الوصول ونوع المسافرين بدل استخدام جدول ثابت لكل الرحلات.</p><div class="legacy-intro-consult"><h3>نرتّب التفاصيل حسب أسلوب رحلتك</h3><ul><li><span aria-hidden="true">✓</span><b>عروض وبكجات لندن للعوائل والأزواج</b></li><li><span aria-hidden="true">✓</span><b>فنادق وتنقلات مرتبة حسب الجدول</b></li><li><span aria-hidden="true">✓</span><b>برامج 7 أيام أو مدد أقصر حسب الرحلة</b></li><li><span aria-hidden="true">✓</span><b>توزيع المعالم والتسوق بدون ضغط اليوم</b></li></ul><a class="gradient-btn legacy-intro-cta" href="#destination-quote-form">اطلب برنامجك</a></div></div><figure class="legacy-intro-visual london-intro-visual"><img width="1024" height="575" src="${introImage}" alt="أهم المعالم السياحية في لندن" loading="lazy" decoding="async"></figure></div></section>
<section class="dp-section dp-soft" id="places"><div class="container"><div class="dp-heading"><span class="dp-kicker">لندن على طريقتك</span><h2>رتّب الأيام حسب المنطقة ونوع التجربة</h2><p>بدل التنقل العشوائي بين أطراف المدينة، نجمع الأماكن القريبة في نفس اليوم ونترك وقتًا كافيًا للمشي والتسوق والراحة.</p></div><div class="dp-places-grid"><article class="dp-place dp-place-1"><span>معالم كلاسيكية</span><h3>وستمنستر وبيغ بن</h3><p>منطقة مناسبة لبداية الرحلة، ومنها يمكن ترتيب جولة تشمل نهر التايمز والمعالم القريبة بدون انتقالات طويلة.</p></article><article class="dp-place dp-place-2"><span>إطلالة ونهر</span><h3>London Eye وSouth Bank</h3><p>تجربة سهلة الدمج مع يوم وسط لندن، مع مطاعم وممشى على النهر ومعالم قريبة.</p></article><article class="dp-place dp-place-3"><span>قصر وحدائق</span><h3>باكنغهام وهايد بارك</h3><p>يوم أخف يجمع الحدائق والمناطق المفتوحة ويمكن ربطه بالتسوق أو أحياء قريبة حسب الوقت.</p></article><article class="dp-place dp-place-4"><span>تسوق وأجواء مدينة</span><h3>أكسفورد ستريت وكوفنت غاردن</h3><p>مناسب لمن يضع التسوق ضمن أولويات الرحلة، مع مطاعم وتجارب مدينة يمكن توزيعها على أكثر من مساء.</p></article><article class="dp-place dp-place-5"><span>متاحف وثقافة</span><h3>المتحف البريطاني والمتاحف الكبرى</h3><p>خيار جيد للأيام الباردة أو الممطرة، ويمكن دمجه مع أحياء مركزية بدل تخصيص يوم كامل للتنقل.</p></article><article class="dp-place dp-place-6"><span>رحلة يوم</span><h3>وندسور أو أكسفورد</h3><p>للرحلات الأطول يمكن إضافة يوم خارج لندن إذا كان جدول المدينة نفسه مريحًا ولا يحتاج ضغطًا إضافيًا.</p></article></div></div></section>
<section class="dp-programs" id="programs"><div class="container"><div class="dp-programs-head"><div><span class="dp-kicker">أفكار برامج لندن</span><h2>ابدأ من عدد الأيام ونوع المسافرين</h2></div><p>هذه أمثلة لتوزيع الرحلة، والبرنامج النهائي يتغير حسب تاريخ السفر والفندق ووقت الوصول والمغادرة.</p></div><div class="dp-program-grid"><article class="dp-program"><div class="dp-program-top"><span>01</span><small>5–6 أيام</small></div><h3>لندن المركزة</h3><p>أهم المعالم مع التسوق ووقت حر، مناسبة لأول زيارة بدون إضافة رحلات خارجية كثيرة.</p><a href="#destination-quote-form">اطلب برنامجك <b aria-hidden="true">←</b></a></article><article class="dp-program is-featured"><div class="dp-program-top"><span>02</span><small>7 أيام</small></div><h3>لندن 7 أيام</h3><p>توزيع أهدأ للمعالم والتسوق مع يوم مرن للعائلة أو رحلة خارج المدينة حسب الرغبة.</p><a href="#destination-quote-form">اطلب برنامجك <b aria-hidden="true">←</b></a></article><article class="dp-program"><div class="dp-program-top"><span>03</span><small>شخصان</small></div><h3>لندن لشخصين</h3><p>برنامج أخف يركز على موقع الفندق والمشي والتجارب المسائية، ويمكن تخصيصه لرحلة زوجين أو شهر عسل.</p><a href="#destination-quote-form">اطلب برنامجك <b aria-hidden="true">←</b></a></article></div></div></section>
<section class="contextual-seo contextual-seo-polished" data-contextual-seo="london"><div class="container"><header class="contextual-heading"><span>دليل لندن</span><h2>دليلك للتخطيط لرحلة لندن</h2></header><div class="context-card-grid">${topicsHtml}</div></div></section>
<section class="dp-consult"><div class="container dp-consult-grid"><div><span>جاهز تبدأ؟</span><h2>أرسل تاريخ السفر وعدد المسافرين ونرتّب لك عرض لندن المناسب</h2><p>نحدد عدد الليالي والفندق والتنقلات ونوزع الأيام حسب نوع الرحلة، سواء عائلية أو لشخصين أو زيارة شتوية.</p></div><div class="dp-consult-actions"><a class="gradient-btn" href="#destination-quote-form">اطلب عرضك</a><a href="/europe/">شاهد صفحة أوروبا</a></div></div></section>
<section class="unified-faq-section" id="faq"><div class="container"><header class="unified-faq-heading"><span>أسئلة شائعة</span><h2>قبل حجز رحلتك إلى لندن</h2></header><div class="unified-faq-grid">${faqHtml}</div></div></section>
</main>`;

const base = fs.readFileSync(europeFile, 'utf8');
const headEnd = base.indexOf('</head>');
const bodyStart = base.indexOf('<body');
const bodyTagEnd = base.indexOf('>', bodyStart);
const headerStart = base.indexOf('<header', bodyTagEnd);
const mainStart = base.indexOf('<main', headerStart);
const mainEnd = base.indexOf('</main>', mainStart) + '</main>'.length;
if ([headEnd, bodyStart, bodyTagEnd, headerStart, mainStart, mainEnd].some(v => v < 0)) throw new Error('Cannot parse Europe page shell');
let head = base.slice(0, headEnd);
const bodyTag = '<body data-destination="لندن">';
const header = base.slice(headerStart, mainStart);
const tail = base.slice(mainEnd);
head = head.replace(/<link rel="preload" as="image" fetchpriority="high" href="[^"]+">/, `<link rel="preload" as="image" fetchpriority="high" href="${heroImage}">`);
head = head.replace(/<title>[\s\S]*?<\/title>/, `<title>${title}</title>`)
  .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${description}">`)
  .replace(/<link rel="canonical" href="[^"]+">/, `<link rel="canonical" href="${canonical}">`)
  .replace(/<meta property="og:title" content="[^"]*">/, '<meta property="og:title" content="إطلالة للسفر والسياحة | لندن">')
  .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${description}">`)
  .replace(/<meta property="og:url" content="[^"]+">/, `<meta property="og:url" content="${canonical}">`)
  .replace(/<meta name="twitter:title" content="[^"]*">/, '<meta name="twitter:title" content="إطلالة للسفر والسياحة | لندن">')
  .replace(/<meta name="twitter:description" content="[^"]*">/, '<meta name="twitter:description" content="السياحة في لندن من السعودية مع عروض وبكجات وبرامج مرنة للعوائل والأزواج حسب مدة الرحلة.">');
head = head.replace(/<script id="unified-destination-schema" type="application\/ld\+json">[\s\S]*?<\/script>/, `<script id="unified-destination-schema" type="application/ld+json">${JSON.stringify(schema)}</script>`);
head += londonStyle;
const output = `${head}</head>${bodyTag}${header}${main}${tail}`;
fs.mkdirSync(londonDir, { recursive: true });
fs.writeFileSync(londonFile, output);

const card = '<article class="dp-place dp-place-london"><span>وجهة أوروبية</span><h3><a href="/europe/london/">لندن</a></h3><p>عروض وبكجات وبرامج لندن للعوائل والأزواج، مع خطط 7 أيام وخيارات شتوية.</p><a href="/europe/london/" aria-label="اكتشف السياحة في لندن">اكتشف لندن ←</a></article>';
if (!europe.includes('/europe/london/')) {
  const italyCard = /<article class="dp-place dp-place-italy">[\s\S]*?<\/article>/;
  if (italyCard.test(europe)) europe = europe.replace(italyCard, m => `${m}${card}`);
  else {
    const gridClose = '</div></div></section>\n<section class="dp-programs"';
    if (!europe.includes(gridClose)) throw new Error('Cannot find Europe places grid for London card');
    europe = europe.replace(gridClose, `${card}</div></div></section>\n<section class="dp-programs"`);
  }
  fs.writeFileSync(europeFile, europe);
}

if (fs.existsSync(sitemapFile)) {
  let sitemap = fs.readFileSync(sitemapFile, 'utf8');
  if (!sitemap.includes(canonical)) {
    const entry = `<url><loc>${canonical}</loc><lastmod>2026-09-14</lastmod><changefreq>weekly</changefreq><priority>0.9</priority></url>`;
    const italyEntry = /<url><loc>https:\/\/etlaala\.net\/europe\/italy\/<\/loc>[\s\S]*?<\/url>/;
    if (italyEntry.test(sitemap)) sitemap = sitemap.replace(italyEntry, m => `${m}\n${entry}`);
    else sitemap = sitemap.replace('</urlset>', `${entry}\n</urlset>`);
    fs.writeFileSync(sitemapFile, sitemap);
  }
}

console.log('London page generated with campaign-aligned intent coverage.');
