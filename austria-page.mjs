import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const europeFile = path.join(out, 'europe', 'index.html');
const austriaDir = path.join(out, 'europe', 'austria');
const austriaFile = path.join(austriaDir, 'index.html');
const sitemapFile = path.join(out, 'sitemap.xml');

if (!fs.existsSync(europeFile)) throw new Error('Missing Europe source page: dist/europe/index.html');

const canonical = 'https://etlaala.net/europe/austria/';
const title = 'السياحة في النمسا | بكجات وعروض النمسا من السعودية | إطلالة';
const description = 'السياحة في النمسا من السعودية مع إطلالة: بكجات وعروض وبرامج سياحية إلى فيينا وزيلامسي وكابرون وسالزبورغ وهالشتات، مع فنادق وانتقالات وخطة قابلة للتخصيص.';
const whatsappText = encodeURIComponent('مرحباً إطلالة، أبغى برنامج سياحي للنمسا');
const whatsappHref = `https://api.whatsapp.com/send?phone=966125422331&text=${whatsappText}`;
const viennaImage = 'https://etlaala.com/wp-content/uploads/2024/11/الطبيعة-في-فيينا.webp';

let europe = fs.readFileSync(europeFile, 'utf8');
const heroImg = europe.match(/<section class="dp-hero"><img\b[^>]*>/i)?.[0]
  ?.replace('<section class="dp-hero">', '')
  ?.replace(/alt="[^"]*"/i, 'alt="السياحة في النمسا مع إطلالة"') || '';
if (!heroImg) throw new Error('Could not extract Europe hero image');

const faq = [
  ['ما أفضل المدن للسياحة في النمسا؟', 'فيينا مناسبة للثقافة والتسوق، بينما زيلامسي وكابرون للطبيعة والجبال، وسالزبورغ وهالشتات تضيف مدنًا تاريخية وبحيرات. نرتب المدن حسب عدد الأيام وموسم السفر.'],
  ['هل يمكن تجهيز برنامج سياحي في النمسا للعوائل؟', 'نعم، يمكن تجهيز برنامج للنمسا للعوائل مع عدد تنقلات أقل وفنادق مناسبة وخيارات يومية مرنة حسب أعمار المسافرين.'],
  ['هل ترتبون بكجات النمسا من السعودية؟', 'نعم، نرتب بكجات وعروض النمسا من السعودية حسب التاريخ وعدد المسافرين ومستوى الفنادق والخدمات المطلوبة، وتظهر تفاصيل ما هو مشمول قبل التأكيد.'],
  ['هل يمكن الجمع بين فيينا وزيلامسي وكابرون في رحلة واحدة؟', 'نعم، ويمكن بناء مسار يجمع فيينا مع زيلامسي وكابرون عندما تسمح مدة الرحلة بذلك، مع ترتيب وسيلة الانتقال بين المدن بشكل عملي.'],
  ['هل النمسا مناسبة لشهر العسل؟', 'النمسا مناسبة لمن يفضّل مزيج المدن الراقية والطبيعة والبحيرات والجبال، ويمكن تصميم برنامج شهر عسل يجمع فيينا مع زيلامسي أو كابرون حسب الموسم.'],
  ['هل البكج يشمل الطيران والفنادق والانتقالات؟', 'الخدمات تختلف حسب العرض المختار. يمكن ترتيب الطيران والفنادق والانتقالات والجولات، وتكون العناصر المشمولة موضحة قبل تأكيد الحجز.']
];

const schema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'TouristDestination',
      name: 'النمسا',
      url: canonical,
      description
    },
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

const main = `<main id="main" class="dp-page dp-eu dp-at" data-premium-destination="austria">
<section class="dp-hero">${heroImg}<div class="dp-hero-overlay"></div><div class="container dp-hero-wrap"><div class="dp-hero-copy"><span class="dp-pill">النمسا مع إطلالة</span><h1>السياحة في النمسا: بكجات وبرامج من السعودية</h1><p>رتّب رحلتك بين فيينا وزيلامسي وكابرون وسالزبورغ وهالشتات بخطة تناسب عدد الأيام والموسم، مع فنادق وانتقالات وتجارب قابلة للتخصيص.</p><div class="dp-actions"><a class="gradient-btn" data-track="whatsapp" href="${whatsappHref}">تواصل واتساب</a><a class="ghost-btn" data-track="call" href="tel:+966920029967">اتصل بنا</a></div></div>${formHtml}</div></section>
<section class="legacy-destination-intro" id="plan" data-old-site-intro="true"><div class="container legacy-intro-grid"><div class="legacy-intro-content"><span class="legacy-intro-kicker">رحلات النمسا مع إطلالة</span><h2>من فيينا إلى جبال وبحيرات النمسا بمسار واحد واضح</h2><p class="legacy-intro-lead">السفر إلى النمسا يجمع المدن الراقية والطبيعة الأوروبية في رحلة واحدة. نرتّب لك البرنامج حسب مدة السفر: فيينا للمعالم والثقافة والتسوق، وزيلامسي وكابرون للطبيعة والجبال، مع إمكانية إضافة سالزبورغ أو هالشتات حسب الوقت.</p><div class="legacy-intro-consult"><h3>خلّ برنامج النمسا مناسب لرحلتك، مو العكس</h3><ul><li><span aria-hidden="true">✓</span><b>بكجات النمسا للعوائل والأزواج وشهر العسل</b></li><li><span aria-hidden="true">✓</span><b>فنادق النمسا وانتقالات بين المدن حسب المسار</b></li><li><span aria-hidden="true">✓</span><b>برامج تجمع فيينا وزيلامسي وكابرون بترتيب عملي</b></li><li><span aria-hidden="true">✓</span><b>إمكانية إضافة سالزبورغ وهالشتات حسب عدد الأيام</b></li></ul><a class="gradient-btn legacy-intro-cta" href="#destination-quote-form">اطلب برنامجك</a></div></div><figure class="legacy-intro-visual legacy-intro-visual--portrait"><img width="1024" height="1617" src="${viennaImage}" alt="الطبيعة في فيينا ضمن السياحة في النمسا" loading="lazy" decoding="async"></figure></div></section>
<section class="dp-section dp-soft" id="places"><div class="container"><div class="dp-heading"><span class="dp-kicker">أجمل وجهات النمسا</span><h2>مدن وطبيعة تكمل بعض في نفس الرحلة</h2><p>اختيار المدن يعتمد على مدة السفر والموسم. الهدف هو برنامج سياحي في النمسا يعطيك وقتًا حقيقيًا للاستمتاع بدل كثرة التنقل.</p></div><div class="dp-places-grid"><article class="dp-place dp-place-1"><span>ثقافة وتسوق</span><h3>فيينا</h3><p>بداية مناسبة لرحلات النمسا مع القصور والمتاحف والمقاهي والأسواق، ومنها يمكن ترتيب الانتقال لباقي المدن.</p></article><article class="dp-place dp-place-2"><span>بحيرة وجبال</span><h3>زيلامسي</h3><p>من أشهر خيارات السياحة في النمسا للعوائل والأزواج، وتناسب من يبحث عن الطبيعة والبحيرات والأنشطة الخارجية.</p></article><article class="dp-place dp-place-3"><span>طبيعة مرتفعة</span><h3>كابرون</h3><p>تكمل زيلامسي ضمن مسار واحد، وتناسب الرحلات التي تركز على الجبال والمناظر الطبيعية والهدوء.</p></article><article class="dp-place dp-place-4"><span>مدينة تاريخية</span><h3>سالزبورغ</h3><p>مدينة تجمع العمارة والتاريخ والموسيقى، ويمكن إضافتها إذا كانت مدة برنامج النمسا تسمح بمسار أوسع.</p></article><article class="dp-place dp-place-5"><span>بحيرة وقرية</span><h3>هالشتات</h3><p>خيار مناسب كزيارة ضمن مسار سالزبورغ أو منطقة البحيرات، خصوصًا لمحبي المناظر الطبيعية والقرى الهادئة.</p></article></div></div></section>
<section class="dp-programs" id="programs"><div class="container"><div class="dp-programs-head"><div><span class="dp-kicker">أفكار برامج</span><h2>ثلاث طرق لبناء جدول سياحي في النمسا</h2></div><p>هذه أفكار بداية فقط؛ البرنامج النهائي يتغير حسب تاريخ السفر وعدد المسافرين ومستوى الفنادق.</p></div><div class="dp-program-grid"><article class="dp-program"><div class="dp-program-top"><span>01</span><small>مدن + طبيعة</small></div><h3>فيينا + زيلامسي</h3><p>مزيج بين المدينة والطبيعة مع تنقل أقل، ومناسب لرحلة قصيرة أو متوسطة.</p><a href="#destination-quote-form">اطلب برنامجك <b aria-hidden="true">←</b></a></article><article class="dp-program is-featured"><div class="dp-program-top"><span>02</span><small>متوازن</small></div><h3>فيينا + زيلامسي + كابرون</h3><p>مسار شائع لمن يريد المدينة والبحيرة والجبال ضمن رحلة واحدة مرتبة.</p><a href="#destination-quote-form">اطلب برنامجك <b aria-hidden="true">←</b></a></article><article class="dp-program"><div class="dp-program-top"><span>03</span><small>أطول</small></div><h3>النمسا بأكثر من منطقة</h3><p>إضافة سالزبورغ أو هالشتات حسب عدد الأيام حتى يبقى وقت التنقل منطقيًا.</p><a href="#destination-quote-form">اطلب برنامجك <b aria-hidden="true">←</b></a></article></div></div></section>
<section class="contextual-seo contextual-seo-polished" data-contextual-seo="austria"><div class="container"><header class="contextual-heading"><span>دليل مختصر للنمسا</span><h2>كل ما تحتاجه قبل حجز رحلة النمسا</h2></header><div class="context-card-grid">
<details class="context-card context-guide-item"><summary><span class="context-card-index">01</span><h3>السياحة في النمسا والسفر من السعودية</h3><b class="context-guide-toggle" aria-hidden="true">+</b></summary><div class="context-guide-answer"><p>عند التخطيط للسياحة في النمسا أو السفر إلى النمسا من السعودية، ابدأ بعدد الأيام ثم اختر المدن. رحلات النمسا القصيرة تناسبها مدينتان أو ثلاث مترابطة، أما الرحلات الأطول فيمكن إضافة سالزبورغ أو هالشتات بدون ضغط الجدول.</p></div></details>
<details class="context-card context-guide-item"><summary><span class="context-card-index">02</span><h3>بكجات وعروض النمسا</h3><b class="context-guide-toggle" aria-hidden="true">+</b></summary><div class="context-guide-answer"><p>عروض النمسا وبكجات النمسا تختلف حسب الموسم وعدد الليالي ومستوى الفنادق والتنقلات. نقارن الخيارات على نفس الأساس ونوضح ما يشمله البكج قبل الحجز بدل الاعتماد على السعر وحده.</p></div></details>
<details class="context-card context-guide-item"><summary><span class="context-card-index">03</span><h3>برنامج سياحي وجدول سياحي في النمسا</h3><b class="context-guide-toggle" aria-hidden="true">+</b></summary><div class="context-guide-answer"><p>يمكن تجهيز برنامج سياحي في النمسا أو جدول سياحي في النمسا يجمع فيينا وزيلامسي وكابرون، ثم إضافة سالزبورغ أو هالشتات إذا كانت مدة السفر تسمح. نرتب المدن حسب المسافة ووسيلة الانتقال المناسبة.</p></div></details>
<details class="context-card context-guide-item"><summary><span class="context-card-index">04</span><h3>النمسا للعوائل وشهر العسل</h3><b class="context-guide-toggle" aria-hidden="true">+</b></summary><div class="context-guide-answer"><p>السياحة في النمسا للعوائل تستفيد من تقليل تبديل الفنادق واختيار أنشطة مرنة، بينما شهر العسل في النمسا يناسب من يريد الجمع بين فيينا والطبيعة الهادئة في زيلامسي أو كابرون.</p></div></details>
<details class="context-card context-guide-item"><summary><span class="context-card-index">05</span><h3>فنادق النمسا والتنقل بين المدن</h3><b class="context-guide-toggle" aria-hidden="true">+</b></summary><div class="context-guide-answer"><p>اختيار فنادق النمسا مرتبط بمسار الرحلة، وليس بالتصنيف فقط. نختار موقع الفندق بما يخدم الجولات والتنقل، ثم نحدد القطارات أو السيارة أو الانتقالات الخاصة حسب كل جزء من البرنامج.</p></div></details>
</div></div></section>
<section class="dp-consult"><div class="container dp-consult-grid"><div><span>جاهز تبدأ؟</span><h2>أرسل تاريخ السفر وعدد المسافرين، ونرتّب لك خيارات النمسا</h2><p>من فيينا إلى زيلامسي وكابرون، نخلي المسار واضح والخدمات المشمولة معروفة قبل التأكيد.</p></div><div class="dp-consult-actions"><a class="gradient-btn" href="#destination-quote-form">اطلب عرضك</a><a href="/europe/">شاهد صفحة أوروبا</a></div></div></section>
<section class="unified-faq-section" id="faq"><div class="container"><header class="unified-faq-heading"><span>أسئلة شائعة</span><h2>كل ما تحتاج تعرفه قبل السفر إلى النمسا</h2></header><div class="unified-faq-grid">${faqHtml}</div></div></section>
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
  .replace(/<body data-destination="[^"]*">/i, '<body data-destination="النمسا">');

fs.mkdirSync(austriaDir, { recursive: true });
fs.writeFileSync(austriaFile, austria);

const austriaCard = '<article class="dp-place dp-place-austria"><span>وجهة فرعية</span><h3><a href="/europe/austria/">النمسا</a></h3><p>فيينا وزيلامسي وكابرون وسالزبورغ وهالشتات ضمن برامج وبكجات قابلة للتخصيص.</p><a href="/europe/austria/" aria-label="اكتشف السياحة في النمسا">اكتشف النمسا ←</a></article>';
if (!europe.includes('/europe/austria/')) {
  europe = europe.replace(/(<div class="dp-places-grid">)/i, `$1${austriaCard}`);
  fs.writeFileSync(europeFile, europe);
}

if (fs.existsSync(sitemapFile)) {
  let sitemap = fs.readFileSync(sitemapFile, 'utf8');
  if (!sitemap.includes(canonical)) {
    const entry = `<url><loc>${canonical}</loc></url>`;
    sitemap = sitemap.replace(/<\/urlset>\s*$/i, `${entry}</urlset>`);
    fs.writeFileSync(sitemapFile, sitemap);
  }
}

console.log('Created /europe/austria/, linked it from /europe/, and updated sitemap.');
