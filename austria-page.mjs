import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const europeFile = path.join(out, 'europe', 'index.html');
const austriaDir = path.join(out, 'europe', 'austria');
const austriaFile = path.join(austriaDir, 'index.html');
const sitemapFile = path.join(out, 'sitemap.xml');

if (!fs.existsSync(europeFile)) throw new Error('Missing Europe source page: dist/europe/index.html');

const canonical = 'https://etlaala.net/europe/austria/';
const title = 'السياحة في النمسا 2026 | بكجات وبرامج النمسا من السعودية | إطلالة';
const description = 'خطط للسياحة في النمسا مع إطلالة: برامج وبكجات من السعودية تشمل فيينا وزيلامسي وكابرون وسالزبورغ وهالشتات، مع فنادق وانتقالات ومسار مخصص.';
const whatsappHref = `https://api.whatsapp.com/send?phone=966125422331&text=${encodeURIComponent('مرحباً إطلالة، أبغى برنامج سياحي للنمسا')}`;
const viennaImage = 'https://etlaala.com/wp-content/uploads/2024/11/الطبيعة-في-فيينا.webp';

let europe = fs.readFileSync(europeFile, 'utf8');
const heroImg = europe.match(/<section class="dp-hero"><img\b[^>]*>/i)?.[0]
  ?.replace('<section class="dp-hero">', '')
  ?.replace(/alt="[^"]*"/i, 'alt="السياحة في النمسا مع إطلالة"') || '';
if (!heroImg) throw new Error('Could not extract Europe hero image');

const faq = [
  ['ما أفضل المدن للسياحة في النمسا؟', 'فيينا مناسبة للمعالم والثقافة والتسوق، بينما زيلامسي وكابرون للطبيعة والجبال. وإذا كانت الرحلة أطول يمكن إضافة سالزبورغ أو هالشتات حسب المسار.'],
  ['هل يمكن تجهيز برنامج سياحي في النمسا للعوائل؟', 'نعم، ونرتب عدد المدن والتنقلات بما يناسب مدة الرحلة وأعمار المسافرين مع خيارات فنادق وأنشطة أكثر مرونة للعائلة.'],
  ['هل ترتبون بكجات النمسا من السعودية؟', 'نعم، يتم تجهيز البكج حسب تاريخ السفر وعدد المسافرين ومستوى الفنادق والخدمات المطلوبة، وتظهر العناصر المشمولة بوضوح قبل التأكيد.'],
  ['هل يمكن الجمع بين فيينا وزيلامسي وكابرون في رحلة واحدة؟', 'نعم، وهذا من المسارات المناسبة عندما تسمح مدة الرحلة، مع ترتيب وسيلة الانتقال والليالي بحيث لا يصبح البرنامج مزدحمًا.'],
  ['هل النمسا مناسبة لشهر العسل؟', 'نعم، خصوصًا لمن يفضل الجمع بين أجواء فيينا والطبيعة الهادئة حول زيلامسي وكابرون، ويمكن تخصيص الفنادق وعدد الليالي حسب الموسم.'],
  ['هل البكج يشمل الطيران والفنادق والانتقالات؟', 'يعتمد ذلك على العرض المختار. يمكن ترتيب الطيران والفنادق والانتقالات والجولات، وتكون كل خدمة مشمولة موضحة قبل الحجز.']
];

const topics = [
  ['السياحة في النمسا من السعودية', 'إذا كنت تخطط للسياحة في النمسا من السعودية، فالأفضل أن تبدأ بعدد الأيام ثم تختار المدن. في الرحلات القصيرة نركز على مدينتين أو ثلاث مترابطة، أما الرحلات الأطول فتسمح بإضافة سالزبورغ أو هالشتات بدون ضغط البرنامج.'],
  ['بكجات وعروض النمسا', 'بكجات النمسا وعروض السفر إليها تختلف حسب الموسم وعدد الليالي ومستوى الفنادق والتنقلات. نرتب المقارنة على نفس الخدمات حتى يكون اختيار البكج مبنيًا على قيمة الرحلة كاملة، وليس السعر وحده.'],
  ['برنامج سياحي في النمسا', 'يمكن بناء برنامج سياحي في النمسا يبدأ من فيينا ثم ينتقل إلى زيلامسي وكابرون، مع إضافة مدن أخرى إذا سمحت المدة. ترتيب المدن يكون حسب المسافات ووسيلة الانتقال المناسبة حتى يظل الجدول مريحًا.'],
  ['برنامج النمسا 7 أيام أو 10 أيام', 'في رحلة مدتها 7 أيام يفضل تقليل عدد المحطات والتركيز على فيينا مع زيلامسي وكابرون. أما برنامج النمسا 10 أيام فيعطي مساحة أكبر لإضافة سالزبورغ أو هالشتات بدون تحويل الرحلة إلى تنقل مستمر.'],
  ['السياحة في فيينا', 'فيينا مناسبة لمن يحب القصور والمتاحف والمقاهي والتسوق والأحياء التاريخية. ويمكن أن تكون وجهة مستقلة أو بداية عملية لرحلة أوسع داخل النمسا قبل الانتقال إلى مناطق الطبيعة.'],
  ['السياحة في زيلامسي وكابرون', 'زيلامسي وكابرون من أشهر اختيارات محبي الطبيعة والبحيرات والجبال في النمسا. وغالبًا يتم دمجهما في نفس الجزء من الرحلة لأنهما متقاربتان ويكمل كل منهما تجربة الأخرى.'],
  ['شهر العسل في النمسا', 'شهر العسل في النمسا يناسب من يريد مزيجًا بين أجواء المدن الراقية والطبيعة الهادئة. يمكن توزيع الليالي بين فيينا وزيلامسي أو كابرون واختيار فنادق وتجارب تناسب أسلوب الرحلة والميزانية.'],
  ['النمسا مع ألمانيا أو سويسرا', 'يمكن دمج النمسا مع ألمانيا أو سويسرا في رحلة واحدة عندما يكون المسار منطقيًا. نختار المدن المتقاربة ونرتب القطارات أو السيارة أو الطيران الداخلي حسب المسافة حتى لا تضيع أيام الرحلة في التنقل.']
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'TouristDestination', name: 'النمسا', url: canonical, description },
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

const formHtml = `<aside id="destination-quote-form" class="dp-hero-form" aria-label="طلب عرض سريع للنمسا">
  <span>طلب سريع</span>
  <strong>خلّنا نرتّب لك رحلة النمسا</strong>
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
    <div class="dp-hero-submit"><button type="submit" class="gradient-btn">اطلب عرض النمسا</button><div class="status" role="status" aria-live="polite"></div></div>
  </form>
  <script id="destination-date-early-init-v2">(function(){var i=document.querySelector('input[name="travel_date"]');if(!i)return;function p(n){return String(n).padStart(2,'0')}function iso(d){return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate())}var t=new Date();t.setHours(12,0,0,0);var d=new Date(t);d.setDate(d.getDate()+3);if(!i.min)i.min=iso(t);if(!i.value)i.value=iso(d);var s=i.closest('.travel-date-shell');var o=s&&s.querySelector('.travel-date-display');if(o&&i.value){var a=i.value.split('-');o.textContent=a[2]+'/'+a[1]+'/'+a[0]}})();</script>
</aside>`;

const austriaStyle = `<style id="austria-page-polish-v1">
.dp-at .austria-intro-visual{display:grid!important;place-items:center!important;width:100%!important;max-width:470px!important;aspect-ratio:4/3!important;margin:0 auto!important;padding:18px!important;overflow:hidden!important;border:1px solid #e0e5ef!important;border-radius:26px!important;background:linear-gradient(145deg,#ffffff 0%,#eef3ff 56%,#f8f3ff 100%)!important;box-shadow:0 18px 46px rgba(25,49,125,.10)!important}
.dp-at .austria-intro-visual img{display:block!important;width:100%!important;height:100%!important;max-height:none!important;object-fit:contain!important;object-position:center!important;border-radius:18px!important;background:#fff!important;box-shadow:0 8px 26px rgba(18,39,105,.07)!important}
.dp-at .context-card-grid{align-items:start!important}
@media(max-width:900px){.dp-at .austria-intro-visual{max-width:540px!important}}
@media(max-width:620px){.dp-at .austria-intro-visual{max-width:100%!important;padding:12px!important;border-radius:20px!important}.dp-at .austria-intro-visual img{border-radius:14px!important}}
</style>`;

const main = `<main id="main" class="dp-page dp-eu dp-at" data-premium-destination="austria">
<section class="dp-hero">${heroImg}<div class="dp-hero-overlay"></div><div class="container dp-hero-wrap"><div class="dp-hero-copy"><span class="dp-pill">النمسا مع إطلالة</span><h1>السياحة في النمسا من فيينا إلى زيلامسي بمسار مرتب</h1><p>نرتّب لك رحلة تجمع المدن الراقية والطبيعة الأوروبية حسب عدد الأيام والموسم، مع فنادق وانتقالات وبرنامج قابل للتخصيص للعوائل والأزواج.</p><div class="dp-actions"><a class="gradient-btn" data-track="whatsapp" href="${whatsappHref}">تواصل واتساب</a><a class="ghost-btn" data-track="call" href="tel:+966920029967">اتصل بنا</a></div></div>${formHtml}</div></section>
<section class="legacy-destination-intro" id="plan" data-old-site-intro="true"><div class="container legacy-intro-grid"><div class="legacy-intro-content"><span class="legacy-intro-kicker">رحلتك إلى النمسا مع إطلالة</span><h2>مدينة راقية وطبيعة هادئة في برنامج واحد</h2><p class="legacy-intro-lead">النمسا من الوجهات التي تناسب من يريد الجمع بين تجربة المدينة والطبيعة في نفس الرحلة. نقدر نبدأ من فيينا للمعالم والتسوق، ثم ننتقل إلى زيلامسي وكابرون للبحيرات والجبال، ونضيف سالزبورغ أو هالشتات فقط عندما تسمح مدة السفر بذلك.</p><div class="legacy-intro-consult"><h3>نرتّب المسار حسب رحلتك، لا حسب قالب ثابت</h3><ul><li><span aria-hidden="true">✓</span><b>خيارات مناسبة للعوائل والأزواج وشهر العسل</b></li><li><span aria-hidden="true">✓</span><b>فنادق وانتقالات مختارة حسب ترتيب المدن</b></li><li><span aria-hidden="true">✓</span><b>إمكانية الجمع بين فيينا وزيلامسي وكابرون</b></li><li><span aria-hidden="true">✓</span><b>إضافة سالزبورغ أو هالشتات للرحلات الأطول</b></li></ul><a class="gradient-btn legacy-intro-cta" href="#destination-quote-form">اطلب برنامجك</a></div></div><figure class="legacy-intro-visual austria-intro-visual"><img width="1024" height="1617" src="${viennaImage}" alt="الطبيعة في فيينا ضمن رحلة النمسا" loading="lazy" decoding="async"></figure></div></section>
<section class="dp-section dp-soft" id="places"><div class="container"><div class="dp-heading"><span class="dp-kicker">مدن النمسا</span><h2>اختار المدن حسب نوع الرحلة، مش عدد الأسماء</h2><p>كل مدينة تضيف تجربة مختلفة. نختار منها ما يخدم مدة السفر والموسم حتى يبقى البرنامج مريحًا والتنقل منطقيًا.</p></div><div class="dp-places-grid"><article class="dp-place dp-place-1"><span>ثقافة وتسوق</span><h3>فيينا</h3><p>قصور ومتاحف ومقاهٍ وأسواق وأحياء تاريخية، ومناسبة كبداية للرحلة قبل الانتقال إلى مناطق الطبيعة.</p></article><article class="dp-place dp-place-2"><span>بحيرة وجبال</span><h3>زيلامسي</h3><p>وجهة مناسبة للعوائل والأزواج ومحبي الطبيعة والبحيرات والأنشطة الخارجية، وغالبًا تُدمج مع كابرون.</p></article><article class="dp-place dp-place-3"><span>جبال وطبيعة</span><h3>كابرون</h3><p>تكمل تجربة زيلامسي وتناسب من يريد إطلالات جبلية وأجواء هادئة ضمن نفس الجزء من الرحلة.</p></article><article class="dp-place dp-place-4"><span>تاريخ وموسيقى</span><h3>سالزبورغ</h3><p>مدينة تاريخية جميلة يمكن إضافتها للرحلات الأطول، خصوصًا إذا كان المسار يمر بمنطقة البحيرات.</p></article><article class="dp-place dp-place-5"><span>قرية وبحيرة</span><h3>هالشتات</h3><p>زيارة مناسبة لمحبي القرى والمناظر الطبيعية، وغالبًا تكون جزءًا من يوم أو مسار مرتبط بسالزبورغ والمنطقة المحيطة.</p></article></div></div></section>
<section class="dp-programs" id="programs"><div class="container"><div class="dp-programs-head"><div><span class="dp-kicker">أفكار برامج</span><h2>ابدأ من مدة الرحلة، وبعدها نختار المدن</h2></div><p>هذه أمثلة تساعدك تتخيل توزيع الرحلة، والبرنامج النهائي يتغير حسب التاريخ وعدد المسافرين والفنادق.</p></div><div class="dp-program-grid"><article class="dp-program"><div class="dp-program-top"><span>01</span><small>رحلة أخف</small></div><h3>فيينا + زيلامسي</h3><p>مزيج واضح بين المدينة والطبيعة مع عدد تنقلات أقل.</p><a href="#destination-quote-form">اطلب برنامجك <b aria-hidden="true">←</b></a></article><article class="dp-program is-featured"><div class="dp-program-top"><span>02</span><small>متوازن</small></div><h3>فيينا + زيلامسي + كابرون</h3><p>مسار مناسب لمن يريد المدينة والبحيرة والجبال في رحلة واحدة.</p><a href="#destination-quote-form">اطلب برنامجك <b aria-hidden="true">←</b></a></article><article class="dp-program"><div class="dp-program-top"><span>03</span><small>مدة أطول</small></div><h3>أضف سالزبورغ أو هالشتات</h3><p>للرحلات الأطول نوسع المسار بدون ما نضغط الأيام أو نكثر تبديل الفنادق.</p><a href="#destination-quote-form">اطلب برنامجك <b aria-hidden="true">←</b></a></article></div></div></section>
<section class="contextual-seo contextual-seo-polished" data-contextual-seo="austria"><div class="container"><header class="contextual-heading"><span>دليل النمسا</span><h2>إجابات واضحة لأهم نوايا البحث عن النمسا</h2></header><div class="context-card-grid">${topicsHtml}</div></div></section>
<section class="dp-consult"><div class="container dp-consult-grid"><div><span>جاهز تبدأ؟</span><h2>أرسل تاريخ السفر وعدد المسافرين ونرتّب لك خيارات النمسا</h2><p>نحدد المدن والليالي والفنادق والتنقلات في عرض واضح وقابل للتعديل قبل الحجز.</p></div><div class="dp-consult-actions"><a class="gradient-btn" href="#destination-quote-form">اطلب عرضك</a><a href="/europe/">شاهد صفحة أوروبا</a></div></div></section>
<section class="unified-faq-section" id="faq"><div class="container"><header class="unified-faq-heading"><span>أسئلة شائعة</span><h2>قبل حجز رحلتك إلى النمسا</h2></header><div class="unified-faq-grid">${faqHtml}</div></div></section>
</main>`;

let austria = europe.replace(/<main id="main"[\s\S]*?<\/main>/i, main);
austria = austria
  .replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`)
  .replace(/<meta name="description" content="[^"]*">/i, `<meta name="description" content="${description}">`)
  .replace(/<link rel="canonical" href="[^"]*">/i, `<link rel="canonical" href="${canonical}">`)
  .replace(/<meta property="og:title" content="[^"]*">/i, '<meta property="og:title" content="إطلالة للسفر والسياحة | النمسا">')
  .replace(/<meta property="og:description" content="[^"]*">/i, `<meta property="og:description" content="${description}">`)
  .replace(/<meta property="og:url" content="[^"]*">/i, `<meta property="og:url" content="${canonical}">`)
  .replace(/<meta name="twitter:title" content="[^"]*">/i, '<meta name="twitter:title" content="إطلالة للسفر والسياحة | النمسا">')
  .replace(/<meta name="twitter:description" content="[^"]*">/i, `<meta name="twitter:description" content="${description}">`)
  .replace(/<script id="unified-destination-schema" type="application\/ld\+json">[\s\S]*?<\/script>/i, `<script id="unified-destination-schema" type="application/ld+json">${JSON.stringify(schema)}</script>`)
  .replace(/<body data-destination="[^"]*">/i, '<body data-destination="النمسا">')
  .replace('</head>', `${austriaStyle}</head>`);

fs.mkdirSync(austriaDir, { recursive: true });
fs.writeFileSync(austriaFile, austria);

const austriaCard = '<article class="dp-place dp-place-austria"><span>وجهة فرعية</span><h3><a href="/europe/austria/">النمسا</a></h3><p>فيينا وزيلامسي وكابرون وسالزبورغ وهالشتات ضمن برنامج مصمم حسب مدة الرحلة.</p><a href="/europe/austria/" aria-label="اكتشف السياحة في النمسا">اكتشف النمسا ←</a></article>';
if (!europe.includes('/europe/austria/')) {
  europe = europe.replace(/(<div class="dp-places-grid">)/i, `$1${austriaCard}`);
  fs.writeFileSync(europeFile, europe);
}

if (fs.existsSync(sitemapFile)) {
  let sitemap = fs.readFileSync(sitemapFile, 'utf8');
  if (!sitemap.includes(canonical)) {
    sitemap = sitemap.replace(/<\/urlset>\s*$/i, `<url><loc>${canonical}</loc></url></urlset>`);
    fs.writeFileSync(sitemapFile, sitemap);
  }
}

console.log('Created polished /europe/austria/, linked it from /europe/, and updated sitemap.');
