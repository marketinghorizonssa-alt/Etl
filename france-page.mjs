import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const europeFile = path.join(out, 'europe', 'index.html');
const franceDir = path.join(out, 'europe', 'france');
const franceFile = path.join(franceDir, 'index.html');
const sitemapFile = path.join(out, 'sitemap.xml');

if (!fs.existsSync(europeFile)) throw new Error('Missing Europe source page: dist/europe/index.html');

const canonical = 'https://etlaala.net/europe/france/';
const title = 'السياحة في فرنسا وباريس 2026 | بكجات وبرامج فرنسا | إطلالة';
const description = 'خطط للسياحة في فرنسا من السعودية مع إطلالة: بكجات وبرامج باريس، ديزني لاند باريس، فرساي وآنسي، مع فنادق وانتقالات ومسار قابل للتخصيص.';
const whatsappHref = `https://api.whatsapp.com/send?phone=966125422331&text=${encodeURIComponent('مرحباً إطلالة، أبغى برنامج سياحي لفرنسا وباريس')}`;
const franceHero = 'https://etlaala.com/wp-content/uploads/2025/03/10128-2986.jpg';

let europe = fs.readFileSync(europeFile, 'utf8');

const faq = [
  ['كم يوم مناسب لباريس ضمن رحلة فرنسا؟', 'يعتمد على أسلوب الرحلة، لكن غالبًا يمكن تخصيص عدة أيام لباريس ثم إضافة ديزني لاند أو فرساي، ومع مدة أطول يمكن توسيع المسار إلى مدن أخرى داخل فرنسا.'],
  ['هل يمكن تجهيز بكج باريس من السعودية؟', 'نعم، يتم ترتيب البكج حسب تاريخ السفر وعدد المسافرين ومستوى الفنادق والخدمات المطلوبة، مع توضيح العناصر المشمولة في العرض قبل التأكيد.'],
  ['هل يمكن إضافة ديزني لاند باريس داخل البرنامج؟', 'نعم، يمكن بناء البرنامج بحيث يشمل وقتًا مناسبًا لديزني لاند باريس، مع ترتيب الإقامة والتنقلات وخيارات التذاكر ضمن تفاصيل العرض حسب الطلب.'],
  ['هل يمكن اختيار فندق قريب من ديزني لاند باريس؟', 'نعم، يمكن مقارنة خيارات الإقامة القريبة من ديزني لاند مع فنادق وسط باريس حسب عدد الأيام وطبيعة الرحلة وميزانية المسافرين.'],
  ['هل فرنسا مناسبة للعوائل؟', 'نعم، ويمكن بناء رحلة عائلية تجمع معالم باريس مع ديزني لاند وأيام أخف في فرساي أو مدن أخرى، مع تقليل التنقلات الطويلة قدر الإمكان.'],
  ['هل يمكن تجهيز برنامج فرنسا لمدة 10 أيام؟', 'نعم، والمدة الأطول تسمح بالجمع بين باريس وديزني لاند وفرساي، ثم إضافة وجهة أخرى مثل آنسي أو الريفييرا الفرنسية حسب الموسم وطريقة التنقل.']
];

const topics = [
  ['السياحة في فرنسا من السعودية', 'إذا كنت تخطط للسفر إلى فرنسا من السعودية، فالأفضل أن تبدأ بعدد الأيام ونوع الرحلة. بعدها نحدد هل يكون التركيز على باريس فقط، أو نضيف ديزني لاند وفرساي ومدن أخرى داخل فرنسا بدون ما يتحول البرنامج إلى تنقل مستمر.'],
  ['سياحة باريس', 'باريس مناسبة لمن يريد المعالم الأيقونية والمتاحف والتسوق والأحياء التاريخية. يمكن أن تكون الرحلة كلها داخل باريس أو تكون نقطة البداية قبل ديزني لاند أو فرساي أو مدينة فرنسية أخرى.'],
  ['بكج باريس', 'بكج باريس يتحدد حسب عدد الليالي ومستوى الفندق والتنقلات والأنشطة المطلوبة. نرتب العرض على نفس الخدمات حتى تكون المقارنة واضحة، بدل الاعتماد على سعر منفصل بدون تفاصيل.'],
  ['بكج فرنسا', 'بكج فرنسا يمكن أن يكون مركزًا على باريس فقط أو يمتد إلى أكثر من منطقة حسب مدة الرحلة. كلما زادت المدن نراعي ترتيبها جغرافيًا حتى يظل وقت الاستمتاع أكبر من وقت التنقل.'],
  ['برنامج سياحي في فرنسا', 'يمكن بناء برنامج سياحي في فرنسا يبدأ بباريس ثم يتوسع إلى ديزني لاند وفرساي، ومع مدة أطول نضيف آنسي أو الريفييرا الفرنسية. ترتيب الأيام يتغير حسب الموسم وعدد المسافرين وطريقة التنقل.'],
  ['تكلفة السياحة في فرنسا', 'تكلفة السياحة في فرنسا تختلف حسب الموسم ومدة الرحلة ومستوى الفنادق والطيران والتنقلات والأنشطة. لذلك نحدد التكلفة بعد معرفة تفاصيل الرحلة بدل نشر رقم عام قد لا يعكس البكج الفعلي.'],
  ['برنامج باريس 5 أيام أو 10 أيام', 'في رحلة أقصر نركز على أهم معالم باريس مع يوم مستقل لديزني لاند أو فرساي. أما 10 أيام فتعطي مساحة أكبر لإضافة مدينة أخرى داخل فرنسا بدون ضغط الجدول.'],
  ['ديزني لاند باريس: التذاكر والفنادق', 'إذا كانت ديزني لاند جزءًا أساسيًا من الرحلة، نرتب اليوم أو الأيام المخصصة لها داخل البرنامج من البداية. ويمكن مقارنة خيارات تذاكر ديزني لاند باريس مع فنادق قريبة منها أو الإقامة في باريس والتنقل منها، حسب شكل الرحلة.']
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'TouristDestination', name: 'فرنسا', url: canonical, description },
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

const formHtml = `<aside id="destination-quote-form" class="dp-hero-form" aria-label="طلب عرض سريع لفرنسا">
  <span>طلب سريع</span>
  <strong>خلّنا نرتّب لك رحلة فرنسا</strong>
  <form class="dp-hero-lead-form" data-lead-form novalidate>
    <div class="dp-hero-mini-grid">
      <label><span>الاسم</span><input name="name" type="text" autocomplete="name" required placeholder="الاسم"></label>
      <label><span>رقم الجوال</span><input name="phone" type="tel" inputmode="tel" autocomplete="tel" required pattern="(?:\\+?966|0)?5[0-9]{8}" maxlength="13" placeholder="05xxxxxxxx"></label>
      <label><span>عدد المسافرين</span><select name="travelers" required><option value="" selected disabled>اختر</option><option value="1">1</option><option value="2">2</option><option value="3-4">3–4</option><option value="5-6">5–6</option><option value="7+">7+</option></select></label>
      <label><span>تاريخ السفر</span><span class="travel-date-shell"><span class="travel-date-display" aria-hidden="true">اختر تاريخ السفر</span><input data-travel-date-field="true" placeholder="اختر تاريخ السفر" autocomplete="off" aria-label="تاريخ السفر" class="travel-date-input travel-date-native" name="travel_date" type="date"></span></label>
    </div>
    <label class="dp-hero-notes"><span>ملاحظة مختصرة</span><textarea name="notes" rows="2" placeholder="عدد الأيام أو هل تبغى ديزني لاند ضمن الرحلة؟"></textarea></label>
    <label class="privacy-consent dp-hero-consent"><input type="checkbox" name="privacy_consent" required value="yes" checked><span>أوافق على استخدام بياناتي للتواصل بخصوص طلب الرحلة وفق <a href="/privacy-policy/">سياسة الخصوصية</a>.</span></label>
    <div class="hp-field" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div>
    <div class="dp-hero-submit"><button type="submit" class="gradient-btn">اطلب عرض فرنسا</button><div class="status" role="status" aria-live="polite"></div></div>
  </form>
  <script id="destination-date-early-init-v2">(function(){var i=document.querySelector('input[name="travel_date"]');if(!i)return;function p(n){return String(n).padStart(2,'0')}function iso(d){return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate())}var t=new Date();t.setHours(12,0,0,0);var d=new Date(t);d.setDate(d.getDate()+3);if(!i.min)i.min=iso(t);if(!i.value)i.value=iso(d);var s=i.closest('.travel-date-shell');var o=s&&s.querySelector('.travel-date-display');if(o&&i.value){var a=i.value.split('-');o.textContent=a[2]+'/'+a[1]+'/'+a[0]}})();</script>
</aside>`;

const franceStyle = `<style id="france-page-polish-v1">
.dp-fr .france-intro-visual{display:block!important;width:100%!important;max-width:540px!important;aspect-ratio:16/10!important;margin:0 auto!important;overflow:hidden!important;border:1px solid #e0e5ef!important;border-radius:26px!important;background:#eef3ff!important;box-shadow:0 18px 46px rgba(25,49,125,.10)!important}
.dp-fr .france-intro-visual img{display:block!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:center!important;border-radius:0!important}
.dp-fr .disney-focus{padding:76px 0;background:linear-gradient(145deg,#f7f9ff 0%,#fff 58%,#f7f4ff 100%)}
.dp-fr .disney-focus-grid{display:grid;grid-template-columns:1.05fr .95fr;gap:32px;align-items:center}
.dp-fr .disney-focus-copy{padding:34px;border:1px solid #e4e8f4;border-radius:24px;background:#fff;box-shadow:0 14px 40px rgba(28,45,113,.08)}
.dp-fr .disney-focus-copy h2{margin:8px 0 12px;font-size:clamp(1.8rem,3vw,2.7rem);line-height:1.45}
.dp-fr .disney-focus-copy p{margin:0;color:#5c6685;line-height:2}
.dp-fr .disney-focus-points{display:grid;gap:10px;margin:18px 0 0;padding:0;list-style:none}
.dp-fr .disney-focus-points li{padding:13px 15px;border:1px solid #e9ecf5;border-radius:14px;background:#fbfcff;font-weight:800;color:#23346f}
@media(max-width:900px){.dp-fr .disney-focus-grid{grid-template-columns:1fr}.dp-fr .france-intro-visual{max-width:600px}}
@media(max-width:620px){.dp-fr .disney-focus{padding:48px 0}.dp-fr .disney-focus-copy{padding:22px}.dp-fr .france-intro-visual{border-radius:20px}}
</style>`;

const heroImg = `<img src="${franceHero}" width="1600" height="900" alt="السياحة في فرنسا وباريس مع إطلالة" fetchpriority="high" decoding="async" loading="eager">`;

const main = `<main id="main" class="dp-page dp-eu dp-fr" data-premium-destination="france">
<section class="dp-hero">${heroImg}<div class="dp-hero-overlay"></div><div class="container dp-hero-wrap"><div class="dp-hero-copy"><span class="dp-pill">فرنسا وباريس مع إطلالة</span><h1>السياحة في فرنسا وباريس ببرنامج يناسب رحلتك</h1><p>نرتّب لك بكج فرنسا أو بكج باريس حسب عدد الأيام والموسم، من معالم باريس إلى ديزني لاند وفرساي، مع فنادق وانتقالات وبرنامج قابل للتخصيص للعوائل والأزواج.</p><div class="dp-actions"><a class="gradient-btn" data-track="whatsapp" href="${whatsappHref}">تواصل واتساب</a><a class="ghost-btn" data-track="call" href="tel:+966920029967">اتصل بنا</a></div></div>${formHtml}</div></section>
<section class="legacy-destination-intro" id="plan" data-old-site-intro="true"><div class="container legacy-intro-grid"><div class="legacy-intro-content"><span class="legacy-intro-kicker">رحلتك إلى فرنسا مع إطلالة</span><h2>باريس أولًا، وبعدها نوسع المسار حسب مدة الرحلة</h2><p class="legacy-intro-lead">فرنسا تجمع الفن والتاريخ والتسوق وتجارب العائلة في رحلة واحدة. نقدر نخلي باريس هي الأساس، ونضيف ديزني لاند أو فرساي بسهولة، ومع مدة أطول نوسع البرنامج إلى آنسي أو الريفييرا الفرنسية بدل ما نحشر مدن كثيرة في وقت قصير.</p><div class="legacy-intro-consult"><h3>البرنامج يتبني على هدف الرحلة</h3><ul><li><span aria-hidden="true">✓</span><b>بكجات باريس وفرنسا للعوائل والأزواج</b></li><li><span aria-hidden="true">✓</span><b>فنادق وانتقالات مرتبة حسب المسار</b></li><li><span aria-hidden="true">✓</span><b>إضافة ديزني لاند أو فرساي بدون ضغط الأيام</b></li><li><span aria-hidden="true">✓</span><b>إمكانية توسيع الرحلة لمدن أخرى داخل فرنسا</b></li></ul><a class="gradient-btn legacy-intro-cta" href="#destination-quote-form">اطلب برنامجك</a></div></div><figure class="legacy-intro-visual france-intro-visual"><img width="1600" height="900" src="${franceHero}" alt="باريس وفرنسا ضمن برنامج سياحي مرتب" loading="lazy" decoding="async"></figure></div></section>
<section class="dp-section dp-soft" id="places"><div class="container"><div class="dp-heading"><span class="dp-kicker">أماكن فرنسا</span><h2>اختار التجربة اللي تناسبك، وبعدها نرتب الأيام</h2><p>من سياحة باريس إلى ديزني لاند وفرساي ومدن الطبيعة، نربط الأماكن ببعض بحيث يظل البرنامج مريحًا وسهل التنفيذ.</p></div><div class="dp-places-grid"><article class="dp-place dp-place-1"><span>معالم وتسوق</span><h3>باريس</h3><p>برج إيفل واللوفر والشانزليزيه وأحياء المدينة، وهي الأساس الطبيعي لمعظم برامج فرنسا.</p></article><article class="dp-place dp-place-2"><span>عائلات وترفيه</span><h3>ديزني لاند باريس</h3><p>يمكن تخصيص يوم أو أكثر لديزني لاند داخل برنامج باريس، مع ترتيب الفندق والتنقلات وخيارات التذاكر حسب البكج.</p></article><article class="dp-place dp-place-3"><span>تاريخ وحدائق</span><h3>فرساي</h3><p>إضافة سهلة من باريس لمن يريد القصر والحدائق ضمن يوم منفصل بدون تغيير الفندق.</p></article><article class="dp-place dp-place-4"><span>طبيعة ومدينة قديمة</span><h3>آنسي</h3><p>مناسبة لمن يريد إضافة طبيعة وبحيرة ومدينة هادئة إلى برنامج فرنسا الأطول.</p></article><article class="dp-place dp-place-5"><span>ساحل وفرنسا الجنوبية</span><h3>الريفيرا الفرنسية</h3><p>اختيار مناسب للرحلات الأطول لمن يريد الجمع بين باريس وأجواء الساحل في جنوب فرنسا.</p></article></div></div></section>
<section class="disney-focus" id="disneyland-paris"><div class="container disney-focus-grid"><div class="disney-focus-copy"><span class="dp-kicker">ديزني لاند باريس</span><h2>خلي ديزني جزء من البرنامج، مش يوم منفصل عشوائي</h2><p>لو هدف الرحلة الأساسي ديزني لاند باريس، نرتبها من البداية داخل مسار باريس: عدد الأيام، مكان السكن، الانتقال، وتوقيت الزيارة. كده نقدر نقارن بين حجز فندق قريب من ديزني لاند أو الإقامة في باريس، ونوضح خيارات تذاكر ديزني لاند باريس داخل تفاصيل العرض.</p><ul class="disney-focus-points"><li>توزيع أيام باريس وديزني بشكل مريح للعائلة</li><li>مقارنة فنادق ديزني لاند باريس والفنادق القريبة</li><li>إضافة تذاكر ديزني لاند باريس حسب العرض المطلوب</li></ul></div><div class="dp-program is-featured"><div class="dp-program-top"><span>Disney</span><small>عائلات</small></div><h3>باريس + ديزني لاند</h3><p>مسار مناسب للعائلة يجمع معالم باريس مع وقت كافٍ لديزني بدون تنقلات غير ضرورية.</p><a href="#destination-quote-form">اطلب برنامج باريس وديزني <b aria-hidden="true">←</b></a></div></div></section>
<section class="dp-programs" id="programs"><div class="container"><div class="dp-programs-head"><div><span class="dp-kicker">أفكار برامج فرنسا</span><h2>ابدأ من مدة الرحلة، وبعدها نحدد الأماكن</h2></div><p>هذه أمثلة تساعدك تتخيل توزيع الرحلة، والبرنامج النهائي يتغير حسب التاريخ وعدد المسافرين ونوع الفنادق.</p></div><div class="dp-program-grid"><article class="dp-program"><div class="dp-program-top"><span>01</span><small>5–6 أيام</small></div><h3>باريس مركزة</h3><p>أهم معالم باريس مع وقت للتسوق وجولة فرساي أو تجربة إضافية حسب رغبتك.</p><a href="#destination-quote-form">اطلب برنامجك <b aria-hidden="true">←</b></a></article><article class="dp-program is-featured"><div class="dp-program-top"><span>02</span><small>عائلات</small></div><h3>باريس + ديزني لاند</h3><p>برنامج يوازن بين المدينة وديزني مع ترتيب الفندق والتنقلات من البداية.</p><a href="#destination-quote-form">اطلب برنامجك <b aria-hidden="true">←</b></a></article><article class="dp-program"><div class="dp-program-top"><span>03</span><small>10 أيام</small></div><h3>باريس + فرنسا أوسع</h3><p>مع مدة أطول نضيف آنسي أو وجهة أخرى داخل فرنسا بدون تحويل الرحلة إلى تنقل مستمر.</p><a href="#destination-quote-form">اطلب برنامجك <b aria-hidden="true">←</b></a></article></div></div></section>
<section class="contextual-seo contextual-seo-polished" data-contextual-seo="france"><div class="container"><header class="contextual-heading"><span>دليل فرنسا وباريس</span><h2>إجابات مفيدة حسب نية البحث الحقيقية</h2></header><div class="context-card-grid">${topicsHtml}</div></div></section>
<section class="dp-consult"><div class="container dp-consult-grid"><div><span>جاهز تبدأ؟</span><h2>أرسل تاريخ السفر وعدد المسافرين ونرتّب لك بكج فرنسا المناسب</h2><p>نحدد هل الأنسب باريس فقط، باريس مع ديزني، أو برنامج أوسع داخل فرنسا حسب المدة والميزانية.</p></div><div class="dp-consult-actions"><a class="gradient-btn" href="#destination-quote-form">اطلب عرضك</a><a href="/europe/">شاهد صفحة أوروبا</a></div></div></section>
<section class="unified-faq-section" id="faq"><div class="container"><header class="unified-faq-heading"><span>أسئلة شائعة</span><h2>قبل حجز رحلتك إلى فرنسا وباريس</h2></header><div class="unified-faq-grid">${faqHtml}</div></div></section>
</main>`;

let france = europe.replace(/<main id="main"[\s\S]*?<\/main>/i, main);
france = france
  .replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`)
  .replace(/<meta name="description" content="[^"]*">/i, `<meta name="description" content="${description}">`)
  .replace(/<link rel="canonical" href="[^"]*">/i, `<link rel="canonical" href="${canonical}">`)
  .replace(/<meta property="og:title" content="[^"]*">/i, '<meta property="og:title" content="إطلالة للسفر والسياحة | فرنسا وباريس">')
  .replace(/<meta property="og:description" content="[^"]*">/i, `<meta property="og:description" content="${description}">`)
  .replace(/<meta property="og:url" content="[^"]*">/i, `<meta property="og:url" content="${canonical}">`)
  .replace(/<meta name="twitter:title" content="[^"]*">/i, '<meta name="twitter:title" content="إطلالة للسفر والسياحة | فرنسا وباريس">')
  .replace(/<meta name="twitter:description" content="[^"]*">/i, `<meta name="twitter:description" content="${description}">`)
  .replace(/<script id="unified-destination-schema" type="application\/ld\+json">[\s\S]*?<\/script>/i, `<script id="unified-destination-schema" type="application/ld+json">${JSON.stringify(schema)}</script>`)
  .replace(/<body data-destination="[^"]*">/i, '<body data-destination="فرنسا">')
  .replace('</head>', `${franceStyle}</head>`);

fs.mkdirSync(franceDir, { recursive: true });
fs.writeFileSync(franceFile, france);

const franceCard = '<article class="dp-place dp-place-france"><span>وجهة فرعية</span><h3><a href="/europe/france/">فرنسا</a></h3><p>باريس وديزني لاند وفرساي وآنسي ضمن برنامج مصمم حسب مدة الرحلة.</p><a href="/europe/france/" aria-label="اكتشف السياحة في فرنسا">اكتشف فرنسا ←</a></article>';
if (!europe.includes('/europe/france/')) {
  europe = europe.replace(/(<div class="dp-places-grid">)/i, `$1${franceCard}`);
  fs.writeFileSync(europeFile, europe);
}

if (fs.existsSync(sitemapFile)) {
  let sitemap = fs.readFileSync(sitemapFile, 'utf8');
  if (!sitemap.includes(canonical)) {
    sitemap = sitemap.replace(/<\/urlset>\s*$/i, `<url><loc>${canonical}</loc></url></urlset>`);
    fs.writeFileSync(sitemapFile, sitemap);
  }
}

console.log('Created /europe/france/, linked it from /europe/, and updated sitemap.');
