import fs from 'node:fs';
import path from 'node:path';

const file = path.resolve('dist/europe/index.html');
if (!fs.existsSync(file)) process.exit(0);

const oldSection = `<section class="dp-programs" id="programs"><div class="container"><div class="dp-programs-head"><div><span class="dp-kicker">أفكار برامج</span><h2>ثلاث أفكار نبدأ منها، وبعدها نضبطها لك</h2></div><p>هذه أمثلة للتوزيع، والبرنامج النهائي يتغير حسب تاريخ السفر وعدد المسافرين ومستوى الفنادق.</p></div><div class="dp-program-grid"><article class="dp-program "><div class="dp-program-top"><span>01</span><small>7 أيام</small></div><h3>مدينتان في أسبوع</h3><p>تجربة أعمق وتنقل أقل، بدل محاولة زيارة أربع مدن بسرعة.</p><a  href="#destination-quote-form">اطلب برنامجك <b aria-hidden="true">←</b></a></article><article class="dp-program is-featured"><div class="dp-program-top"><span>02</span><small>الأكثر طلبًا</small></div><h3>مسار متعدد المدن</h3><p>مدن متقاربة بترتيب واضح ووسيلة تنقل مناسبة لكل قطاع.</p><a  href="#destination-quote-form">اطلب برنامجك <b aria-hidden="true">←</b></a></article><article class="dp-program "><div class="dp-program-top"><span>03</span><small>مرن</small></div><h3>كروز + إقامة</h3><p>ليالٍ قبل أو بعد الكروز في مدينة الانطلاق أو الوصول.</p><a  href="#destination-quote-form">اطلب برنامجك <b aria-hidden="true">←</b></a></article></div></div></section>`;

const newSection = `<section class="dp-programs" id="programs"><div class="container"><div class="dp-programs-head"><div><span class="dp-kicker">أفكار برامج</span><h2>ثلاث أفكار نبدأ منها، وبعدها نضبطها لك</h2></div><p>هذه أمثلة للتوزيع، والبرنامج النهائي يتغير حسب تاريخ السفر وعدد المسافرين ومستوى الفنادق.</p></div><div class="dp-program-grid"><article class="dp-program "><div class="dp-program-top"><span>01</span><small>عائلات + طبيعة</small></div><h3>النمسا وبافاريا</h3><p>سالزبورغ ليلتان • زيلامسي أو كابرون 5 ليالٍ • ميونخ ليلتان.</p><a href="#destination-quote-form">اطلب برنامجك <b aria-hidden="true">←</b></a></article><article class="dp-program is-featured"><div class="dp-program-top"><span>02</span><small>شهر العسل</small></div><h3>باريس وسويسرا مع ميلانو</h3><p>باريس 4 ليالٍ • إنترلاكن 4 ليالٍ • لوغانو ليلتان • ميلانو 3 ليالٍ.</p><a href="#destination-quote-form">اطلب برنامجك <b aria-hidden="true">←</b></a></article><article class="dp-program "><div class="dp-program-top"><span>03</span><small>مرن</small></div><h3>كروز + إقامة</h3><p>ليالٍ قبل أو بعد الكروز في مدينة الانطلاق أو الوصول.</p><a href="#destination-quote-form">اطلب برنامجك <b aria-hidden="true">←</b></a></article></div></div></section>`;

const html = fs.readFileSync(file, 'utf8');
if (!html.includes(oldSection)) {
  console.log('Europe program routes: target section already changed or not found.');
  process.exit(0);
}

fs.writeFileSync(file, html.replace(oldSection, newSection));
console.log('Europe program routes updated.');
