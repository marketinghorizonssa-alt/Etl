import fs from 'node:fs';
import path from 'node:path';

const file = path.resolve('dist/europe/austria/index.html');
if (!fs.existsSync(file)) throw new Error('Missing Austria page');
let html = fs.readFileSync(file, 'utf8');

const title = 'السياحة في النمسا | بكج سفر النمسا وبرامج النمسا | إطلالة';
const desc = 'السياحة في النمسا من السعودية مع إطلالة: بكج سفر النمسا وبرامج فيينا وزيلامسي وسالزبورغ، برامج 7 و10 أيام، شهر العسل والعوائل ومسارات النمسا مع ألمانيا وسويسرا.';

html = html
  .replace(/<title>[\s\S]*?<\/title>/i, `<title>${title}</title>`)
  .replace(/<meta name="description" content="[^"]*">/i, `<meta name="description" content="${desc}">`)
  .replace(/<meta property="og:description" content="[^"]*">/i, `<meta property="og:description" content="${desc}">`)
  .replace(/<meta name="twitter:description" content="[^"]*">/i, `<meta name="twitter:description" content="${desc}">`)
  .replace(/<h1>السياحة في النمسا:[\s\S]*?<\/h1>/i, '<h1>السياحة في النمسا | بكجات وبرامج النمسا من السعودية</h1>')
  .replace(/رتّب رحلتك بين فيينا وزيلامسي وكابرون وسالزبورغ وهالشتات بخطة تناسب عدد الأيام والموسم، مع فنادق وانتقالات وتجارب قابلة للتخصيص\./, 'إذا كان بحثك عن النمسا سياحة أو سياحة النمسا أو بكج سفر النمسا، نرتّب لك رحلة بين فيينا وزيلامسي وكابرون وسالزبورغ وهالشتات حسب عدد الأيام والموسم، مع فنادق وانتقالات وتجارب قابلة للتخصيص.');

const coverage = `<section class="contextual-seo contextual-seo-polished" data-contextual-seo="austria-campaign">
  <div class="container">
    <header class="contextual-heading"><span>دليل النمسا حسب أكثر عمليات البحث في حملتنا</span><h2>بكجات وبرامج النمسا: من فيينا وزيلامسي إلى مسارات 7 و10 أيام</h2></header>
    <div class="context-card-grid">
      <details class="context-card context-guide-item"><summary><span class="context-card-index">01</span><h3>النمسا سياحة وسياحة النمسا</h3><b class="context-guide-toggle" aria-hidden="true">+</b></summary><div class="context-guide-answer"><p>سواء كتبت النمسا سياحة أو سياحة النمسا أو السياحة في النمسا، القرار الأهم هو ترتيب المدن حسب مدة الرحلة. نبدأ عادةً بفيينا ثم نضيف زيلامسي وكابرون أو سالزبورغ وهالشتات بما يناسب الموسم وعدد الأيام.</p></div></details>
      <details class="context-card context-guide-item"><summary><span class="context-card-index">02</span><h3>بكج سفر النمسا وبكجات النمسا</h3><b class="context-guide-toggle" aria-hidden="true">+</b></summary><div class="context-guide-answer"><p>عند طلب بكج سفر النمسا أو بكج النمسا أو بكج سياحي النمسا أو بكج سياحي للنمسا، نوضح الفنادق والتنقلات والخدمات المشمولة قبل التأكيد. السعر يتغير حسب الموسم وعدد المسافرين ومستوى الفنادق والمسار.</p></div></details>
      <details class="context-card context-guide-item"><summary><span class="context-card-index">03</span><h3>برنامج سياحي في النمسا وجدول سياحي للنمسا</h3><b class="context-guide-toggle" aria-hidden="true">+</b></summary><div class="context-guide-answer"><p>يمكن تجهيز برنامج سياحي النمسا، برنامج سياحي في النمسا، برنامج سياحي للنمسا أو برنامج سياحي الى النمسا حسب عدد الأيام. وإذا كنت تبحث عن جدول سياحي النمسا أو جدول سياحي للنمسا، نوزع الليالي بحيث تقل تبديلات الفنادق ويظل وقت التنقل منطقيًا.</p></div></details>
      <details class="context-card context-guide-item"><summary><span class="context-card-index">04</span><h3>برنامج النمسا لمدة أسبوع أو 10 أيام</h3><b class="context-guide-toggle" aria-hidden="true">+</b></summary><div class="context-guide-answer"><p>برنامج سياحي في النمسا لمدة اسبوع أو برنامج سياحي للنمسا لمدة اسبوع يناسب عادةً مسارًا مركزًا مثل فيينا مع زيلامسي وكابرون. أما برنامج سياحي في النمسا 10 ايام أو برنامج سياحي للنمسا لمدة 10 ايام أو جدول سياحي للنمسا 10 ايام فيسمح بإضافة سالزبورغ أو هالشتات بدون ضغط كبير على الرحلة.</p></div></details>
      <details class="context-card context-guide-item"><summary><span class="context-card-index">05</span><h3>فيينا سياحة وبرنامج سياحي فيينا</h3><b class="context-guide-toggle" aria-hidden="true">+</b></summary><div class="context-guide-answer"><p>فيينا سياحة تجمع القصور والمتاحف والتسوق والمقاهي، لذلك تظهر بقوة في البحث عن السياحة في فيينا. نقدر نجهز برنامج سياحي فيينا أو برنامج سياحي في فيينا كرحلة مستقلة، أو كبداية لمسار أكبر داخل النمسا. وللأزواج يمكن إدخال شهر العسل في فيينا ضمن برنامج يجمع المدينة مع الطبيعة.</p></div></details>
      <details class="context-card context-guide-item"><summary><span class="context-card-index">06</span><h3>السياحة في زيلامسي وبكج زيلامسي</h3><b class="context-guide-toggle" aria-hidden="true">+</b></summary><div class="context-guide-answer"><p>السياحة في زيلامسي مناسبة للطبيعة والبحيرات والأنشطة الخارجية. يمكن ترتيب بكج زيلامسي أو بكج سياحي زيلامسي، وكذلك برنامج سياحي زيلامسي أو برنامج سياحي في زيلامسي. وإذا كانت الرحلة قصيرة يمكن تجهيز جدول سياحي في زيلامسي أو جدول سياحي زيلامسي 4 ايام مع كابرون والمناطق القريبة.</p></div></details>
      <details class="context-card context-guide-item"><summary><span class="context-card-index">07</span><h3>السياحة في سالزبورغ ضمن رحلة النمسا</h3><b class="context-guide-toggle" aria-hidden="true">+</b></summary><div class="context-guide-answer"><p>السياحة في سالزبورغ مناسبة لمن يريد مدينة تاريخية بطابع هادئ، ويمكن إضافتها إلى فيينا أو منطقة البحيرات إذا كانت مدة الرحلة تسمح. نفضل إضافتها عندما تخدم المسار بدل زيادة عدد المدن فقط.</p></div></details>
      <details class="context-card context-guide-item"><summary><span class="context-card-index">08</span><h3>السياحة في النمسا للعوائل وشهر العسل</h3><b class="context-guide-toggle" aria-hidden="true">+</b></summary><div class="context-guide-answer"><p>السياحة في النمسا للعوائل تستفيد من عدد أقل من تبديلات الفنادق وبرامج يومية مرنة. أما شهر العسل النمسا أو شهر العسل في النمسا أو شهر العسل بالنمسا فيمكن تصميمه بين فيينا وزيلامسي وكابرون. تكلفة شهر العسل في النمسا وأسعار النمسا شهر العسل تتغير حسب الموسم ونوعية الفنادق وعدد الليالي والخدمات المختارة، لذلك نحدد السعر بعد تفاصيل الرحلة بدل نشر رقم عام مضلل.</p></div></details>
      <details class="context-card context-guide-item"><summary><span class="context-card-index">09</span><h3>النمسا مع ألمانيا أو سويسرا</h3><b class="context-guide-toggle" aria-hidden="true">+</b></summary><div class="context-guide-answer"><p>يمكن بناء برنامج سياحي النمسا والمانيا أو جدول سياحي في النمسا وسويسرا عندما تكون المدة كافية. ومن المسارات الممكنة برنامج سياحي ميونخ زيلامسي انترلاكن، لكننا نحسب المسافات ووسيلة الانتقال أولًا حتى لا تتحول الرحلة إلى تنقلات متواصلة.</p></div></details>
    </div>
  </div>
</section>`;

const sectionRe = /<section class="contextual-seo contextual-seo-polished" data-contextual-seo="austria">[\s\S]*?<\/section>/i;
if (!sectionRe.test(html)) throw new Error('Austria contextual SEO section not found');
html = html.replace(sectionRe, coverage);

const required = [
  'النمسا سياحة','بكج سفر النمسا','بكج النمسا','سياحة النمسا','السياحة في النمسا','فيينا سياحة','السياحة في فيينا',
  'برنامج سياحي فيينا','السياحة في زيلامسي','بكج زيلامسي','برنامج سياحي النمسا','برنامج سياحي في النمسا','بكج سياحي النمسا',
  'بكج سياحي للنمسا','جدول سياحي النمسا','برنامج سياحي للنمسا','برنامج سياحي في النمسا 10 ايام','برنامج سياحي الى النمسا',
  'السياحة في سالزبورغ','برنامج سياحي في زيلامسي','بكج سياحي زيلامسي','برنامج سياحي زيلامسي','برنامج سياحي في النمسا لمدة اسبوع',
  'جدول سياحي للنمسا','شهر العسل النمسا','السياحة في النمسا للعوائل','برنامج سياحي النمسا والمانيا','جدول سياحي في النمسا وسويسرا',
  'شهر العسل في فيينا','جدول سياحي في زيلامسي','برنامج سياحي في فيينا','شهر العسل في النمسا','برنامج سياحي ميونخ زيلامسي انترلاكن',
  'جدول سياحي زيلامسي 4 ايام','برنامج سياحي للنمسا لمدة اسبوع','برنامج سياحي للنمسا لمدة 10 ايام','تكلفة شهر العسل في النمسا',
  'جدول سياحي للنمسا 10 ايام','اسعار النمسا شهر العسل','شهر العسل بالنمسا'
];
for (const phrase of required) {
  if (!html.includes(phrase)) throw new Error(`Missing Austria campaign phrase: ${phrase}`);
}

fs.writeFileSync(file, html);
console.log(`Austria campaign coverage verified for ${required.length} keywords.`);
