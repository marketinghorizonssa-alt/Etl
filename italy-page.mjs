import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const europeFile = path.join(out, 'europe', 'index.html');
const italyDir = path.join(out, 'europe', 'italy');
const italyFile = path.join(italyDir, 'index.html');
const sitemapFile = path.join(out, 'sitemap.xml');

if (!fs.existsSync(europeFile)) throw new Error('Missing Europe source page: dist/europe/index.html');

const canonical = 'https://etlaala.net/europe/italy/';
const title = 'السياحة في إيطاليا 2026 | بكجات وبرامج إيطاليا من السعودية | إطلالة';
const description = 'خطط للسياحة في إيطاليا من السعودية مع إطلالة: بكجات وبرامج روما وفلورنسا وفينيسيا وميلانو وبحيرة كومو، مع فنادق وانتقالات ومسار قابل للتخصيص.';
const whatsappHref = `https://api.whatsapp.com/send?phone=966125422331&text=${encodeURIComponent('مرحباً إطلالة، أبغى برنامج سياحي لإيطاليا')}`;
const heroImage = 'https://etlaala.com/wp-content/uploads/2024/03/روما.jpg';
const introImage = 'https://etlaala.com/wp-content/uploads/2024/03/أهم-المدن-السياحية-في-إيطاليا.webp';

let europe = fs.readFileSync(europeFile, 'utf8');

const faq = [
  ['كم يوم مناسب للسياحة في إيطاليا؟', 'يعتمد على عدد المدن. في رحلة أقصر نركز على مسار واضح مثل روما وفلورنسا وفينيسيا، ومع مدة أطول يمكن إضافة ميلانو أو بحيرة كومو أو منطقة ساحلية بدون ضغط الجدول.'],
  ['هل يمكن تجهيز بكج إيطاليا من السعودية؟', 'نعم، يتم ترتيب البكج حسب تاريخ السفر وعدد المسافرين ومستوى الفنادق والتنقلات والمدن المطلوبة، وتظهر الخدمات المشمولة بوضوح قبل التأكيد.'],
  ['هل إيطاليا مناسبة للعوائل؟', 'نعم، ويمكن تقليل تبديل الفنادق واختيار مدن مترابطة بالقطار مع أيام أخف، ثم إضافة بحيرة كومو أو تجربة طبيعية عندما تناسب مدة الرحلة.'],
  ['هل إيطاليا مناسبة لشهر العسل؟', 'نعم، ويمكن بناء رحلة تجمع مدينة تاريخية مثل روما مع فينيسيا أو بحيرة كومو أو ساحل أمالفي حسب الموسم ومدة السفر.'],
  ['هل يمكن الجمع بين إيطاليا وسويسرا في رحلة واحدة؟', 'نعم، خصوصًا عندما ينتهي مسار إيطاليا في ميلانو أو شمال البلاد. نرتب المدن حسب المسافات حتى لا تضيع أيام كثيرة في التنقل.'],
  ['هل الأفضل البدء من روما أم ميلانو؟', 'يعتمد على خط الرحلة والطيران. روما مناسبة لمسار كلاسيكي يتجه شمالًا إلى فلورنسا وفينيسيا، بينما ميلانو مناسبة إذا كان التركيز على الشمال وبحيرة كومو أو الدمج مع سويسرا.']
];

const topics = [
  ['السياحة في إيطاليا من السعودية', 'إذا كنت تخطط للسياحة في إيطاليا من السعودية، فابدأ بعدد الأيام ونوع الرحلة قبل اختيار المدن. نحدد بعدها هل الأفضل مسار المدن الكلاسيكية أو الشمال والبحيرات أو رحلة تجمع أكثر من تجربة.'],
  ['بكجات وعروض إيطاليا', 'بكجات إيطاليا تختلف حسب الموسم وعدد الليالي ومستوى الفنادق والتنقلات. نرتب العرض على خدمات واضحة حتى تكون المقارنة على قيمة الرحلة كاملة، وليس على سعر منفصل بدون تفاصيل.'],
  ['برنامج سياحي في إيطاليا', 'البرنامج الجيد يربط المدن في اتجاه واحد قدر الإمكان. روما وفلورنسا وفينيسيا مسار مناسب للزيارة الأولى، بينما ميلانو وبحيرة كومو يناسبان من يريد الشمال والطبيعة والتسوق.'],
  ['برنامج إيطاليا 7 أيام أو 10 أيام', 'في 7 أيام نركز على عدد أقل من المدن، أما 10 أيام فتعطي مساحة أكبر لإضافة ميلانو أو بحيرة كومو أو يوم ريفي بدون تحويل الرحلة إلى تبديل فنادق يومي.'],
  ['السياحة في روما', 'روما مناسبة لمن يحب التاريخ والمعالم والمشي في قلب المدينة. يمكن أن تكون بداية لمسار يتجه إلى فلورنسا ثم فينيسيا بدل الرجوع لنقطة البداية.'],
  ['ميلانو وبحيرة كومو', 'ميلانو مناسبة للتسوق والتصميم والمعالم الحضرية، ويمكن دمجها مع بحيرة كومو لمن يريد يومًا أو أكثر من الطبيعة والهدوء في شمال إيطاليا.'],
  ['روما وفلورنسا وفينيسيا', 'هذا المسار يجمع التاريخ والفن والقنوات في رحلة واحدة، ويمكن توزيعه على عدة أيام مع انتقالات مرتبة بالقطار بين المدن بدل إضافة محطات كثيرة في وقت قصير.'],
  ['شهر العسل في إيطاليا', 'شهر العسل في إيطاليا يمكن أن يجمع روما مع فينيسيا أو بحيرة كومو أو ساحل أمالفي. نختار المسار حسب الموسم وعدد الأيام وطريقة التنقل المطلوبة.']
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'TouristDestination', name: 'إيطاليا', url: canonical, description },
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

const formHtml = `<aside id="destination-quote-form" class="dp-hero-form" aria-label="طلب عرض سريع لإيطاليا">
  <span>طلب سريع</span>
  <strong>خلّنا نرتّب لك رحلة إيطاليا</strong>
  <form class="dp-hero-lead-form" data-lead-form novalidate>
    <div class="dp-hero-mini-grid">
      <label><span>الاسم</span><input name="name" type="text" autocomplete="name" required placeholder="الاسم"></label>
      <label><span>رقم الجوال</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required pattern="(?:\\+?966|0)?5[0-9]{8}" maxlength="13" placeholder="05xxxxxxxx"></label>
      <label><span>عدد المسافرين</span><select name="travelers" required><option value="" selected disabled>اختر</option><option value="1">1</option><option value="2">2</option><option value="3-4">3–4</option><option value="5-6">5–6</option><option value="7+">7+</option></select></label>
      <label><span>تاريخ السفر</span><span class="travel-date-shell"><span class="travel-date-display" aria-hidden="true">اختر تاريخ السفر</span><input data-travel-date-field="true" placeholder="اختر تاريخ السفر" autocomplete="off" aria-label="تاريخ السفر" class="travel-date-input travel-date-native" name="travel_date" type="date"></span></label>
    </div>
    <label class="dp-hero-notes"><span>ملاحظة مختصرة</span><textarea name="notes" rows="2" placeholder="عدد الأيام أو المدن اللي في بالك"></textarea></label>
    <label class="privacy-consent dp-hero-consent"><input type="checkbox" name="privacy_consent" required value="yes" checked><span>أوافق على استخدام بياناتي للتواصل بخصوص طلب الرحلة وفق <a href="/privacy-policy/">سياسة الخصوصية</a>.</span></label>
    <div class="hp-field" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
    <div class="dp-hero-submit"><button type="submit" class="gradient-btn">اطلب عرض إيطاليا</button><div class="status" role="status" aria-live="polite"></div></div>
  </form>
  <script id="destination-date-early-init-v2">(function(){var i=document.querySelector('input[name="travel_date"]');if(!i)return;function p(n){return String(n).padStart(2,'0')}function iso(d){return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate())}var t=new Date();t.setHours(12,0,0,0);var d=new Date(t);d.setDate(d.getDate()+3);if(!i.min)i.min=iso(t);if(!i.value)i.value=iso(d);var s=i.closest('.travel-date-shell');var o=s&&s.querySelector('.travel-date-display');if(o&&i.value){var a=i.value.split('-');o.textContent=a[2]+'/'+a[1]+'/'+a[0]}})();</script>
</aside>`;

const italyStyle = `<style id="italy-page-polish-v1">
.dp-it .italy-intro-visual{display:block!important;width:100%!important;max-width:540px!important;aspect-ratio:4/3!important;margin:0 auto!important;overflow:hidden!important;border:1px solid #e0e5ef!important;border-radius:26px!important;background:#eef3ff!important;box-shadow:0 18px 46px rgba(25,49,125,.10)!important}
.dp-it .italy-intro-visual img{display:block!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:center!important;border-radius:0!important}
@media(max-width:900px){.dp-it .italy-intro-visual{max-width:600px!important}}
@media(max-width:620px){.dp-it .italy-intro-visual{max-width:100%!important;border-radius:20px!important}}
</style>`;

const main = `<main id="main" class="dp-page dp-eu dp-it" data-premium-destination="italy">
<section class="dp-hero"><img src="${heroImage}" width="1024" height="683" alt="السياحة في إيطاليا وروما مع إطلالة" fetchpriority="high" decoding="async" loading="eager"><div class="dp-hero-overlay"></div><div class="container dp-hero-wrap"><div class="dp-hero-copy"><span class="dp-pill">إيطاليا مع إطلالة</span><h1>السياحة في إيطاليا ببرنامج يجمع المدن والطبيعة بدون تنقلات مرهقة</h1><p>نرتّب لك بكج إيطاليا من السعودية حسب عدد الأيام والموسم، من روما وفلورنسا وفينيسيا إلى ميلانو وبحيرة كومو، مع فنادق وانتقالات وبرنامج قابل للتخصيص للعوائل والأزواج.</p><div class="dp-actions"><a class="gradient-btn" data-track="whatsapp" href="${whatsappHref}">تواصل واتساب</a><a class="ghost-btn" data-track="call" href="tel:+966920029967">اتصل بنا</a></div></div>${formHtml}</div></section>
<section class="legacy-destination-intro" id="plan" data-old-site-intro="true"><div class="container legacy-intro-grid"><div class="legacy-intro-content"><span class="legacy-intro-kicker">رحلتك إلى إيطاليا مع إطلالة</span><h2>مدن تاريخية، فن، تسوق وطبيعة في مسار واحد</h2><p class="legacy-intro-lead">إيطاليا مناسبة لرحلات كثيرة، لكن أفضل تجربة تبدأ من اختيار مسار واضح. نقدر نركز على روما وفلورنسا وفينيسيا للزيارة الأولى، أو نتحرك شمالًا إلى ميلانو وبحيرة كومو، ونضيف أمالفي للرحلات الأطول أو شهر العسل عندما يكون المسار مناسبًا.</p><div class="legacy-intro-consult"><h3>نرتّب المدن حسب وقتك وطريقة سفرك</h3><ul><li><span aria-hidden="true">✓</span><b>بكجات إيطاليا للعوائل والأزواج وشهر العسل</b></li><li><span aria-hidden="true">✓</span><b>فنادق وانتقالات مرتبة حسب خط الرحلة</b></li><li><span aria-hidden="true">✓</span><b>مسارات تجمع روما وفلورنسا وفينيسيا</b></li><li><span aria-hidden="true">✓</span><b>إمكانية إضافة ميلانو وكومو أو الدمج مع سويسرا</b></li></ul><a class="gradient-btn legacy-intro-cta" href="#destination-quote-form">اطلب برنامجك</a></div></div><figure class="legacy-intro-visual italy-intro-visual"><img width="860" height="650" src="${introImage}" alt="أهم المدن السياحية في إيطاليا" loading="lazy" decoding="async"></figure></div></section>
<section class="dp-section dp-soft" id="places"><div class="container"><div class="dp-heading"><span class="dp-kicker">مدن وتجارب إيطاليا</span><h2>اختار نوع الرحلة، وبعدها نرتب المدن</h2><p>إيطاليا متنوعة جدًا؛ لذلك نوزع الأيام على مدن مترابطة بدل ما نحشر أكبر عدد من الأسماء في نفس البكج.</p></div><div class="dp-places-grid"><article class="dp-place dp-place-1"><span>تاريخ ومعالم</span><h3>روما</h3><p>بداية قوية للزيارة الأولى مع المعالم التاريخية والساحات والأحياء التي يمكن استكشافها بالمشي، ومنها يبدأ مسار سهل باتجاه فلورنسا.</p></article><article class="dp-place dp-place-2"><span>فن ومدينة قديمة</span><h3>فلورنسا</h3><p>مناسبة لعشاق الفن والعمارة والجو التاريخي، وتأتي طبيعيًا بين روما وفينيسيا ضمن مسار المدن الكلاسيكية.</p></article><article class="dp-place dp-place-3"><span>قنوات ورومانسية</span><h3>فينيسيا</h3><p>مدينة مختلفة تمامًا عن باقي إيطاليا، ويمكن تخصيص ليلة أو أكثر لها ضمن برنامج رومانسي أو رحلة متعددة المدن.</p></article><article class="dp-place dp-place-4"><span>تسوق وشمال إيطاليا</span><h3>ميلانو</h3><p>مناسبة للتسوق والتصميم، كما أنها نقطة عملية للوصول إلى بحيرة كومو أو استكمال الرحلة نحو سويسرا.</p></article><article class="dp-place dp-place-5"><span>بحيرة وطبيعة</span><h3>بحيرة كومو</h3><p>خيار هادئ للعوائل والأزواج وشهر العسل، ويمكن إضافتها من ميلانو ضمن برنامج شمال إيطاليا.</p></article><article class="dp-place dp-place-6"><span>ساحل ومناظر</span><h3>ساحل أمالفي</h3><p>يناسب الرحلات الأطول أو شهر العسل لمن يريد إضافة البحر والمناظر الساحلية إلى برنامج إيطاليا.</p></article></div></div></section>
<section class="dp-programs" id="programs"><div class="container"><div class="dp-programs-head"><div><span class="dp-kicker">أفكار برامج إيطاليا</span><h2>ابدأ من مدة الرحلة، وبعدها نختار المسار</h2></div><p>هذه أمثلة تساعدك تتخيل الرحلة، والبرنامج النهائي يتغير حسب التاريخ وعدد المسافرين ونوع الفنادق.</p></div><div class="dp-program-grid"><article class="dp-program"><div class="dp-program-top"><span>01</span><small>7–8 أيام</small></div><h3>روما + فلورنسا + فينيسيا</h3><p>مسار كلاسيكي مناسب للزيارة الأولى ويجمع التاريخ والفن والقنوات بدون الرجوع لنقطة البداية.</p><a href="#destination-quote-form">اطلب برنامجك <b aria-hidden="true">←</b></a></article><article class="dp-program is-featured"><div class="dp-program-top"><span>02</span><small>8–10 أيام</small></div><h3>ميلانو + كومو + فينيسيا</h3><p>مناسب لمن يريد التسوق والطبيعة وتجربة مدينة رومانسية في شمال إيطاليا.</p><a href="#destination-quote-form">اطلب برنامجك <b aria-hidden="true">←</b></a></article><article class="dp-program"><div class="dp-program-top"><span>03</span><small>شهر عسل</small></div><h3>روما + أمالفي أو كومو</h3><p>نختار الساحل أو البحيرة حسب الموسم ونضيف مدينة واحدة أو اثنتين فقط حتى يظل الإيقاع هادئًا.</p><a href="#destination-quote-form">اطلب برنامجك <b aria-hidden="true">←</b></a></article></div></div></section>
<section class="contextual-seo contextual-seo-polished" data-contextual-seo="italy"><div class="container"><header class="contextual-heading"><span>دليل إيطاليا</span><h2>دليلك للتخطيط لرحلة إيطاليا</h2></header><div class="context-card-grid">${topicsHtml}</div></div></section>
<section class="dp-consult"><div class="container dp-consult-grid"><div><span>جاهز تبدأ؟</span><h2>أرسل تاريخ السفر وعدد المسافرين ونرتّب لك بكج إيطاليا المناسب</h2><p>نحدد هل الأنسب مسار روما وفلورنسا وفينيسيا، أو شمال إيطاليا مع ميلانو وكومو، أو برنامج شهر عسل أهدأ.</p></div><div class="dp-consult-actions"><a class="gradient-btn" href="#destination-quote-form">اطلب عرضك</a><a href="/europe/">شاهد صفحة أوروبا</a></div></div></section>
<section class="unified-faq-section" id="faq"><div class="container"><header class="unified-faq-heading"><span>أسئلة شائعة</span><h2>قبل حجز رحلتك إلى إيطاليا</h2></header><div class="unified-faq-grid">${faqHtml}</div></div></section>
</main>`;

let italy = europe.replace(/<main id="main"[\s\S]*?<\/main>/i, main);
italy = italy
  .replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`)
  .replace(/<meta name="description" content="[^"]*">/i, `<meta name="description" content="${description}">`)
  .replace(/<link rel="canonical" href="[^"]*">/i, `<link rel="canonical" href="${canonical}">`)
  .replace(/<meta property="og:title" content="[^"]*">/i, '<meta property="og:title" content="إطلالة للسفر والسياحة | إيطاليا">')
  .replace(/<meta property="og:description" content="[^"]*">/i, `<meta property="og:description" content="${description}">`)
  .replace(/<meta property="og:url" content="[^"]*">/i, `<meta property="og:url" content="${canonical}">`)
  .replace(/<meta name="twitter:title" content="[^"]*">/i, '<meta name="twitter:title" content="إطلالة للسفر والسياحة | إيطاليا">')
  .replace(/<meta name="twitter:description" content="[^"]*">/i, `<meta name="twitter:description" content="${description}">`)
  .replace(/<script id="unified-destination-schema" type="application\/ld\+json">[\s\S]*?<\/script>/i, `<script id="unified-destination-schema" type="application/ld+json">${JSON.stringify(schema)}</script>`)
  .replace(/<body data-destination="[^"]*">/i, '<body data-destination="إيطاليا">')
  .replace('</head>', `${italyStyle}</head>`);

fs.mkdirSync(italyDir, { recursive: true });
fs.writeFileSync(italyFile, italy);

const italyCard = '<article class="dp-place dp-place-italy"><span>وجهة أوروبية</span><h3><a href="/europe/italy/">إيطاليا</a></h3><p>روما وفلورنسا وفينيسيا وميلانو وبحيرة كومو ضمن برنامج مصمم حسب مدة الرحلة.</p><a href="/europe/italy/" aria-label="اكتشف السياحة في إيطاليا">اكتشف إيطاليا ←</a></article>';
if (!europe.includes('/europe/italy/')) {
  europe = europe.replace(/(<div class="dp-places-grid">)/i, `$1${italyCard}`);
  fs.writeFileSync(europeFile, europe);
}

if (fs.existsSync(sitemapFile)) {
  let sitemap = fs.readFileSync(sitemapFile, 'utf8');
  if (!sitemap.includes(canonical)) {
    sitemap = sitemap.replace(/<\/urlset>\s*$/i, `<url><loc>${canonical}</loc></url></urlset>`);
    fs.writeFileSync(sitemapFile, sitemap);
  }
}

console.log('Created /europe/italy/, linked it from /europe/, and updated sitemap.');
