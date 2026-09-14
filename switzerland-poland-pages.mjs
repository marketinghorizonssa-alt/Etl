import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const europeFile = path.join(out, 'europe', 'index.html');
const templateFile = path.join(out, 'europe', 'italy', 'index.html');
const sitemapFile = path.join(out, 'sitemap.xml');

if (!fs.existsSync(europeFile)) throw new Error('Missing Europe hub: dist/europe/index.html');
if (!fs.existsSync(templateFile)) throw new Error('Missing Europe destination template: dist/europe/italy/index.html');

const configs = [
  {
    slug: 'switzerland',
    code: 'ch',
    name: 'سويسرا',
    canonical: 'https://etlaala.net/europe/switzerland/',
    title: 'السياحة في سويسرا 2026 | بكجات وبرامج سويسرا من السعودية | إطلالة',
    description: 'خطط للسياحة في سويسرا من السعودية مع إطلالة: بكجات وبرامج زيورخ ولوسيرن وإنترلاكن وجريندلوالد ومونترو، مع فنادق وانتقالات ومسار قابل للتخصيص.',
    whatsapp: 'مرحباً إطلالة، أبغى برنامج سياحي لسويسرا',
    heroAlt: 'السياحة في سويسرا مع إطلالة',
    introImage: 'https://etlaala.com/wp-content/uploads/2025/01/السياحة-في-سويسرا.webp',
    introWidth: 630,
    introHeight: 455,
    pill: 'سويسرا مع إطلالة',
    h1: 'السياحة في سويسرا بمسار يجمع البحيرات والجبال والمدن بدون زحمة تنقلات',
    lead: 'نرتّب لك بكج سويسرا من السعودية حسب عدد الأيام والموسم، من زيورخ ولوسيرن إلى إنترلاكن وجريندلوالد، مع فنادق وانتقالات وبرنامج قابل للتخصيص للعوائل والأزواج وشهر العسل.',
    introKicker: 'رحلتك إلى سويسرا مع إطلالة',
    introTitle: 'سويسرا أجمل لما نقلل القواعد ونخلي الطبيعة هي محور الرحلة',
    introLead: 'بدل ما تتحول الرحلة إلى تبديل فنادق كل يوم، نرتبها على مدن وقواعد قليلة تخدم البحيرات والجبال. إنترلاكن مناسبة كنقطة قوية للطبيعة، ولوسيرن تضيف المدينة والبحيرة، وزيورخ عملية للبداية أو النهاية، ومع وقت أطول نضيف جريندلوالد أو مونترو حسب المسار.',
    bullets: [
      'بكجات سويسرا للعوائل والأزواج وشهر العسل',
      'فنادق وانتقالات مرتبة حسب خط الرحلة',
      'مسارات تجمع لوسيرن وإنترلاكن وزيورخ',
      'إمكانية إضافة جريندلوالد أو مونترو أو الدمج مع إيطاليا'
    ],
    placesTitle: 'مدن وتجارب سويسرا',
    placesHeading: 'اختار إيقاع الرحلة، وبعدها نوزع المدن والقرى',
    placesLead: 'سويسرا مناسبة لرحلة هادئة أكثر من كونها سباق مدن؛ لذلك نختار قواعد قليلة ونبني منها أيام البحيرات والجبال والقرى.',
    places: [
      ['مدينة وبداية عملية', 'زيورخ', 'مناسبة للوصول أو المغادرة مع وسط مدينة مرتب وبحيرة، وتخدم بداية أو نهاية المسار بدون الحاجة لإقامة طويلة إذا كانت الطبيعة هي الهدف الأساسي.'],
      ['بحيرة ومدينة', 'لوسيرن', 'قاعدة مريحة تجمع المدينة القديمة والبحيرة وتسمح بأيام جبلية قريبة بدون تغيير الفندق كل يوم.'],
      ['طبيعة ومغامرات', 'إنترلاكن', 'تقع بين بحيرتين وتخدم رحلات جبال وقرى كثيرة، لذلك تعتبر قاعدة عملية لمن يريد الطبيعة في قلب البرنامج.'],
      ['قرية جبلية', 'جريندلوالد', 'خيار مناسب لمن يريد أجواء جبال أقرب وإقامة أهدأ، ويمكن دمجها مع إنترلاكن حسب عدد الليالي.'],
      ['بحيرة وهدوء', 'مونترو', 'واجهة على بحيرة جنيف وأجواء مختلفة عن وسط سويسرا، وتناسب البرامج الأطول أو المسارات المفتوحة.'],
      ['قرى وشلالات', 'لوتربرونين', 'منطقة طبيعية يمكن زيارتها من إنترلاكن ضمن يوم مرتب بدل إضافة فندق جديد للرحلة.']
    ],
    programs: [
      ['7–8 أيام', 'لوسيرن + إنترلاكن + زيورخ', 'ثلاث قواعد واضحة لأول زيارة مع وقت كافٍ للبحيرات والطبيعة ويوم خفيف قبل السفر.'],
      ['8–10 أيام', 'لوسيرن + إنترلاكن + جريندلوالد', 'مناسب للعوائل ومحبي الطبيعة مع وقت أطول في منطقة الجبال بدل كثرة المدن.'],
      ['شهر عسل', 'إنترلاكن + لوسيرن + مونترو', 'مسار أهدأ يجمع بحيرات وجبال وأجواء رومانسية بدون برنامج مزدحم.']
    ],
    topics: [
      ['السياحة في سويسرا من السعودية', 'إذا كنت تخطط للسياحة في سويسرا من السعودية، فابدأ بعدد الأيام ومطار الوصول ونوع الرحلة. بعدها نحدد عدد القواعد المناسب ونوزع الطبيعة والمدن بدون تكرار التنقل.'],
      ['بكجات وعروض سويسرا', 'بكجات سويسرا تختلف حسب الموسم وعدد الليالي ومستوى الفنادق وطريقة التنقل. نرتب العرض على خدمات واضحة حتى تكون المقارنة على قيمة الرحلة كاملة.'],
      ['برنامج سياحي في سويسرا', 'البرنامج المتوازن يعتمد على قواعد قليلة. لوسيرن وإنترلاكن وزيورخ تكفي لرحلة أولى قصيرة، ومع مدة أطول يمكن إضافة جريندلوالد أو مونترو.'],
      ['برنامج سويسرا 7 أيام أو 10 أيام', 'في 7 أيام نركز على عدد أقل من القواعد، أما 10 أيام فتعطي مساحة أكبر للطبيعة أو إضافة منطقة جديدة بدون تبديل فندق كل ليلة.'],
      ['السياحة في إنترلاكن', 'إنترلاكن قاعدة قوية لمحبي البحيرات والجبال والرحلات القريبة، ويمكن منها ترتيب أيام لجريندلوالد ولوتربرونين ومناطق الطبيعة المحيطة.'],
      ['زيورخ ولوسيرن', 'زيورخ عملية للوصول والمغادرة، بينما لوسيرن تعطي تجربة مدينة وبحيرة أكثر هدوءًا. الجمع بينهما يكون مفيدًا عندما يخدم خط الرحلة بدل تكرار الإقامة.'],
      ['سويسرا شهر عسل', 'سويسرا شهر عسل تناسب الأزواج الذين يريدون الطبيعة والبحيرات والقرى الجبلية. نختار فنادق ومسارًا أهدأ ونقلل تبديل المدن قدر الإمكان.'],
      ['بكج شهر عسل سويسرا', 'بكج شهر عسل سويسرا يمكن أن يجمع إنترلاكن ولوسيرن مع مونترو أو زيورخ حسب الطيران والموسم، مع توزيع ليالٍ يترك وقتًا فعليًا للاستمتاع بالوجهة.']
    ],
    faq: [
      ['كم يوم مناسب للسياحة في سويسرا؟', '7 إلى 10 أيام مدة عملية لرحلة أولى عندما نركز على عدد محدود من القواعد، والمدة الأطول تسمح بإضافة منطقة جديدة براحة أكبر.'],
      ['هل يمكن تجهيز بكج سويسرا من السعودية؟', 'نعم، يتم ترتيب البكج حسب تاريخ السفر وعدد المسافرين ومستوى الفنادق وطريقة التنقل، وتظهر الخدمات المشمولة بوضوح قبل التأكيد.'],
      ['هل سويسرا مناسبة للعوائل؟', 'نعم، والأفضل تقليل تبديل الفنادق واختيار قواعد قريبة من الأنشطة حتى تكون الأيام أخف على العائلة.'],
      ['هل سويسرا مناسبة لشهر العسل؟', 'نعم، خصوصًا لمن يريد البحيرات والجبال والقرى الهادئة، ويمكن بناء مسار مريح حول إنترلاكن ولوسيرن ومونترو أو زيورخ.'],
      ['هل يمكن الجمع بين سويسرا وإيطاليا؟', 'نعم، ويمكن بناء مسار منطقي عندما تكون ميلانو أو شمال إيطاليا ضمن الرحلة، مع ترتيب المدن بحيث يكون الانتقال في اتجاه واحد قدر الإمكان.'],
      ['هل الأفضل السكن في إنترلاكن أم جريندلوالد؟', 'يعتمد على أسلوب الرحلة؛ إنترلاكن عملية للتنقلات والرحلات اليومية، بينما جريندلوالد تعطي أجواء جبلية أقرب وهدوءًا أكبر.']
    ],
    hubCopy: 'زيورخ ولوسيرن وإنترلاكن وجريندلوالد ضمن برنامج مصمم حسب مدة الرحلة.',
    hubCta: 'اكتشف سويسرا'
  },
  {
    slug: 'poland',
    code: 'pl',
    name: 'بولندا',
    canonical: 'https://etlaala.net/europe/poland/',
    title: 'السياحة في بولندا 2026 | عروض وبكجات بولندا من السعودية | إطلالة',
    description: 'خطط للسياحة في بولندا من السعودية مع إطلالة: عروض وبكجات وبرامج وارسو وكراكوف وزاكوباني، مع فنادق وانتقالات ومسار قابل للتخصيص للعوائل والأزواج.',
    whatsapp: 'مرحباً إطلالة، أبغى برنامج سياحي لبولندا',
    heroAlt: 'السياحة في بولندا مع إطلالة',
    introImage: 'https://etlaala.com/wp-content/uploads/2024/10/عروض-السفر-الى-بولندا.webp',
    introWidth: 1024,
    introHeight: 698,
    pill: 'بولندا مع إطلالة',
    h1: 'السياحة في بولندا بين المدن التاريخية والطبيعة ببرنامج مرتب من البداية',
    lead: 'نرتّب لك عروض السفر إلى بولندا حسب عدد الأيام والموسم، من وارسو وكراكوف إلى زاكوباني، مع فنادق وانتقالات وبرنامج قابل للتخصيص للعوائل والأزواج والشباب.',
    introKicker: 'رحلتك إلى بولندا مع إطلالة',
    introTitle: 'مدينة حديثة، تاريخ واضح وطبيعة جبلية في رحلة واحدة',
    introLead: 'بولندا تعطيك أكثر من نوع رحلة بدون الحاجة إلى عدد كبير من المدن. وارسو مناسبة كبداية حضرية، كراكوف تضيف المدينة القديمة والتاريخ، وزاكوباني تعطي الطبيعة والجبال. نوزع الليالي بينهم حسب المدة بدل جدول سريع يضيع الوقت في الطريق.',
    bullets: [
      'عروض وبكجات بولندا للعوائل والأزواج',
      'فنادق وانتقالات مرتبة حسب خط الرحلة',
      'مسارات تجمع وارسو وكراكوف وزاكوباني',
      'برامج مرنة للرحلات الصيفية والشتوية حسب الموسم'
    ],
    placesTitle: 'مدن وتجارب بولندا',
    placesHeading: 'ثلاث محطات أساسية تكفي لبناء رحلة متنوعة',
    placesLead: 'نختار المدن حسب نوع الرحلة؛ مدينة عصرية، تاريخ وثقافة، ثم طبيعة جبلية إذا كانت المدة تسمح.',
    places: [
      ['عاصمة ومدينة حديثة', 'وارسو', 'مناسبة لبداية أو نهاية الرحلة مع وسط المدينة والأحياء التاريخية والمتاحف والتسوق، وتخدم الطيران الدولي بشكل عملي.'],
      ['تاريخ ومدينة قديمة', 'كراكوف', 'مدينة مناسبة للمشي والمعالم التاريخية والساحات، وتعتبر محطة رئيسية في معظم برامج بولندا.'],
      ['جبال وطبيعة', 'زاكوباني', 'وجهة جبلية جنوب البلاد تناسب الطبيعة والهواء الطلق، ويمكن دمجها بسهولة مع كراكوف ضمن برنامج متوازن.'],
      ['مدينة بحرية', 'غدانسك', 'خيار إضافي للبرامج الأطول لمن يريد أجواء ساحلية ومدينة مختلفة عن وارسو وكراكوف.'],
      ['طبيعة وبحيرات', 'مازوريا', 'منطقة مناسبة لمن يبحث عن هدوء وبحيرات وطبيعة في رحلة أطول بدل التركيز على المدن فقط.'],
      ['تنقل عملي', 'المسار بين المدن', 'نرتب اتجاه الرحلة بحيث نقلل الرجوع لنفس المدينة ونختار القطار أو السيارة حسب كل قطاع.']
    ],
    programs: [
      ['7–8 أيام', 'وارسو + كراكوف', 'مسار بسيط لأول زيارة يركز على مدينتين ويترك وقتًا حقيقيًا للاستكشاف بدون استعجال.'],
      ['8–10 أيام', 'وارسو + كراكوف + زاكوباني', 'مزيج متوازن بين المدينة والتاريخ والطبيعة الجبلية، مناسب للعوائل والأزواج.'],
      ['رحلة أهدأ', 'كراكوف + زاكوباني', 'مناسب لمن يريد تقليل المدن والتركيز على التاريخ والطبيعة ضمن مسافات أقصر.']
    ],
    topics: [
      ['السياحة في بولندا من السعودية', 'إذا كنت تخطط للسياحة في بولندا من السعودية، فابدأ بعدد الأيام ونوع الرحلة. بعدها نحدد هل الأفضل الاكتفاء بوارسو وكراكوف أو إضافة زاكوباني للطبيعة.'],
      ['عروض السفر إلى بولندا', 'عروض السفر إلى بولندا تختلف حسب الموسم وعدد الليالي ومستوى الفنادق والتنقلات. نوضح مكونات العرض قبل المقارنة حتى يكون القرار على الرحلة كاملة وليس على رقم منفصل.'],
      ['بكجات بولندا', 'بكجات بولندا يمكن بناؤها للعوائل أو الأزواج أو رحلة أصدقاء، مع توزيع المدن حسب مدة الرحلة بدل الاعتماد على قالب واحد لكل المسافرين.'],
      ['برنامج سياحي في بولندا', 'البرنامج المتوازن غالبًا يبدأ من وارسو ثم كراكوف، ومع مدة أطول نضيف زاكوباني. ترتيب الاتجاه يقلل وقت الرجوع ويجعل الانتقالات أوضح.'],
      ['السياحة في وارسو', 'وارسو تجمع المدينة الحديثة مع مناطق تاريخية وتسوق ومتاحف، وتصلح كبداية أو نهاية عملية لبرنامج بولندا.'],
      ['السياحة في كراكوف', 'كراكوف مناسبة للمشي في المدينة القديمة والمعالم التاريخية، وتدخل بسهولة في برنامج يجمعها مع زاكوباني.'],
      ['زاكوباني والطبيعة', 'زاكوباني تضيف الجبال والطبيعة لبرنامج بولندا، وتناسب من يريد كسر إيقاع المدن بيومين أو أكثر في منطقة جبلية.'],
      ['بولندا للعوائل والشباب', 'بولندا تناسب أكثر من نوع رحلة، ويمكن تغيير توزيع الليالي والأنشطة حسب العائلة أو الشباب أو الأزواج بدل استخدام جدول ثابت للجميع.']
    ],
    faq: [
      ['كم يوم مناسب للسياحة في بولندا؟', '7 إلى 10 أيام مدة مناسبة لرحلة تجمع مدينتين أو ثلاث حسب سرعة البرنامج، ومع الرحلات الأقصر يفضل تقليل المحطات.'],
      ['هل يمكن تجهيز عروض وبكجات بولندا من السعودية؟', 'نعم، يتم ترتيب العرض حسب تاريخ السفر وعدد المسافرين ومستوى الفنادق والتنقلات، وتظهر الخدمات المشمولة بوضوح قبل التأكيد.'],
      ['هل بولندا مناسبة للعوائل؟', 'نعم، ويمكن بناء جدول أخف مع عدد مدن أقل ومسافات يومية منطقية، وإضافة زاكوباني إذا كانت الطبيعة أولوية للعائلة.'],
      ['هل يمكن الجمع بين وارسو وكراكوف وزاكوباني؟', 'نعم، وهذا مسار عملي عندما تسمح مدة الرحلة، مع ترتيب الانتقالات بحيث لا يتحول البرنامج إلى تنقل مستمر.'],
      ['هل بولندا مناسبة للشتاء؟', 'يمكن زيارتها شتاءً، لكن نوع الأنشطة والملابس والتنقلات يتغير حسب الطقس، لذلك نضبط البرنامج على تاريخ السفر الفعلي.'],
      ['هل الأفضل البدء من وارسو أم كراكوف؟', 'يعتمد على الطيران ومسار الرحلة؛ نختار نقطة البداية والنهاية بما يقلل الرجوع ويخدم المدن المطلوبة.']
    ],
    hubCopy: 'وارسو وكراكوف وزاكوباني ضمن برنامج يجمع المدن التاريخية والطبيعة.',
    hubCta: 'اكتشف بولندا'
  }
];

const europeHtml = fs.readFileSync(europeFile, 'utf8');
const template = fs.readFileSync(templateFile, 'utf8');
const europeHero = europeHtml.match(/<section class="dp-hero"><img\b[^>]*>/i)?.[0]?.replace('<section class="dp-hero">', '') || '';
if (!europeHero) throw new Error('Could not extract Europe hero image');

function formHtml(cfg) {
  return `<aside id="destination-quote-form" class="dp-hero-form" aria-label="طلب عرض سريع لـ ${cfg.name}">
  <span>طلب سريع</span>
  <strong>خلّنا نرتّب لك رحلة ${cfg.name}</strong>
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
    <div class="dp-hero-submit"><button type="submit" class="gradient-btn">اطلب عرض ${cfg.name}</button><div class="status" role="status" aria-live="polite"></div></div>
  </form>
  <script id="destination-date-early-init-v2">(function(){var i=document.querySelector('input[name="travel_date"]');if(!i)return;function p(n){return String(n).padStart(2,'0')}function iso(d){return d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate())}var t=new Date();t.setHours(12,0,0,0);var d=new Date(t);d.setDate(d.getDate()+3);if(!i.min)i.min=iso(t);if(!i.value)i.value=iso(d);var s=i.closest('.travel-date-shell');var o=s&&s.querySelector('.travel-date-display');if(o&&i.value){var a=i.value.split('-');o.textContent=a[2]+'/'+a[1]+'/'+a[0]}})();</script>
</aside>`;
}

function renderPage(cfg) {
  const faqHtml = cfg.faq.map(([q, a]) => `<details class="unified-faq-item"><summary><span>${q}</span><b aria-hidden="true">+</b></summary><div class="unified-faq-answer"><p>${a}</p></div></details>`).join('');
  const topicsHtml = cfg.topics.map(([heading, text], i) => `<details class="context-card context-guide-item"><summary><span class="context-card-index">${String(i + 1).padStart(2, '0')}</span><h3>${heading}</h3><b class="context-guide-toggle" aria-hidden="true">+</b></summary><div class="context-guide-answer"><p>${text}</p></div></details>`).join('');
  const placesHtml = cfg.places.map(([tag, name, text], i) => `<article class="dp-place dp-place-${i + 1}"><span>${tag}</span><h3>${name}</h3><p>${text}</p></article>`).join('');
  const programsHtml = cfg.programs.map(([tag, name, text], i) => `<article class="dp-program${i === 1 ? ' is-featured' : ''}"><div class="dp-program-top"><span>${String(i + 1).padStart(2, '0')}</span><small>${tag}</small></div><h3>${name}</h3><p>${text}</p><a href="#destination-quote-form">اطلب برنامجك <b aria-hidden="true">←</b></a></article>`).join('');
  const bulletHtml = cfg.bullets.map(text => `<li><span aria-hidden="true">✓</span><b>${text}</b></li>`).join('');
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'TouristDestination', name: cfg.name, url: cfg.canonical, description: cfg.description },
      { '@type': 'FAQPage', mainEntity: cfg.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) }
    ]
  };
  const hero = cfg.slug === 'switzerland'
    ? europeHero.replace(/alt="[^"]*"/i, `alt="${cfg.heroAlt}"`)
    : `<img src="${cfg.introImage}" width="${cfg.introWidth}" height="${cfg.introHeight}" alt="${cfg.heroAlt}" fetchpriority="high" decoding="async" loading="eager">`;
  const whatsappHref = `https://api.whatsapp.com/send?phone=966125422331&text=${encodeURIComponent(cfg.whatsapp)}`;
  const style = `<style id="${cfg.slug}-page-polish-v1">.dp-${cfg.code} .country-intro-visual{display:block!important;width:100%!important;max-width:540px!important;aspect-ratio:4/3!important;margin:0 auto!important;overflow:hidden!important;border:1px solid #e0e5ef!important;border-radius:26px!important;background:#eef3ff!important;box-shadow:0 18px 46px rgba(25,49,125,.10)!important}.dp-${cfg.code} .country-intro-visual img{display:block!important;width:100%!important;height:100%!important;object-fit:cover!important;object-position:center!important}@media(max-width:900px){.dp-${cfg.code} .country-intro-visual{max-width:600px!important}}@media(max-width:620px){.dp-${cfg.code} .country-intro-visual{max-width:100%!important;border-radius:20px!important}}</style>`;
  const main = `<main id="main" class="dp-page dp-eu dp-${cfg.code}" data-premium-destination="${cfg.slug}">
<section class="dp-hero">${hero}<div class="dp-hero-overlay"></div><div class="container dp-hero-wrap"><div class="dp-hero-copy"><span class="dp-pill">${cfg.pill}</span><h1>${cfg.h1}</h1><p>${cfg.lead}</p><div class="dp-actions"><a class="gradient-btn" data-track="whatsapp" href="${whatsappHref}">تواصل واتساب</a><a class="ghost-btn" data-track="call" href="tel:+966920029967">اتصل بنا</a></div></div>${formHtml(cfg)}</div></section>
<section class="legacy-destination-intro" id="plan" data-old-site-intro="true"><div class="container legacy-intro-grid"><div class="legacy-intro-content"><span class="legacy-intro-kicker">${cfg.introKicker}</span><h2>${cfg.introTitle}</h2><p class="legacy-intro-lead">${cfg.introLead}</p><div class="legacy-intro-consult"><h3>نرتّب المسار حسب وقتك وطريقة سفرك</h3><ul>${bulletHtml}</ul><a class="gradient-btn legacy-intro-cta" href="#destination-quote-form">اطلب برنامجك</a></div></div><figure class="legacy-intro-visual country-intro-visual"><img width="${cfg.introWidth}" height="${cfg.introHeight}" src="${cfg.introImage}" alt="${cfg.name} مع إطلالة" loading="lazy" decoding="async"></figure></div></section>
<section class="dp-section dp-soft" id="places"><div class="container"><div class="dp-heading"><span class="dp-kicker">${cfg.placesTitle}</span><h2>${cfg.placesHeading}</h2><p>${cfg.placesLead}</p></div><div class="dp-places-grid">${placesHtml}</div></div></section>
<section class="dp-programs" id="programs"><div class="container"><div class="dp-programs-head"><div><span class="dp-kicker">أفكار برامج ${cfg.name}</span><h2>ابدأ من مدة الرحلة، وبعدها نختار المسار</h2></div><p>هذه أمثلة تساعدك تتخيل الرحلة، والبرنامج النهائي يتغير حسب التاريخ وعدد المسافرين ونوع الفنادق.</p></div><div class="dp-program-grid">${programsHtml}</div></div></section>
<section class="contextual-seo contextual-seo-polished" data-contextual-seo="${cfg.slug}"><div class="container"><header class="contextual-heading"><span>دليل ${cfg.name}</span><h2>دليلك للتخطيط لرحلة ${cfg.name}</h2></header><div class="context-card-grid">${topicsHtml}</div></div></section>
<section class="dp-consult"><div class="container dp-consult-grid"><div><span>جاهز تبدأ؟</span><h2>أرسل تاريخ السفر وعدد المسافرين ونرتّب لك بكج ${cfg.name} المناسب</h2><p>نحدد المسار الأفضل حسب عدد الأيام والموسم وطريقة التنقل بدل استخدام برنامج واحد لكل الرحلات.</p></div><div class="dp-consult-actions"><a class="gradient-btn" href="#destination-quote-form">اطلب عرضك</a><a href="/europe/">شاهد صفحة أوروبا</a></div></div></section>
<section class="unified-faq-section" id="faq"><div class="container"><header class="unified-faq-heading"><span>أسئلة شائعة</span><h2>قبل حجز رحلتك إلى ${cfg.name}</h2></header><div class="unified-faq-grid">${faqHtml}</div></div></section>
</main>`;

  let html = template.replace(/<main id="main"[\s\S]*?<\/main>/i, main);
  html = html
    .replace(/<title>[\s\S]*?<\/title>/i, `<title>${cfg.title}</title>`)
    .replace(/<meta name="description" content="[^"]*">/i, `<meta name="description" content="${cfg.description}">`)
    .replace(/<link rel="canonical" href="[^"]*">/i, `<link rel="canonical" href="${cfg.canonical}">`)
    .replace(/<meta property="og:title" content="[^"]*">/i, `<meta property="og:title" content="إطلالة للسفر والسياحة | ${cfg.name}">`)
    .replace(/<meta property="og:description" content="[^"]*">/i, `<meta property="og:description" content="${cfg.description}">`)
    .replace(/<meta property="og:url" content="[^"]*">/i, `<meta property="og:url" content="${cfg.canonical}">`)
    .replace(/<meta name="twitter:title" content="[^"]*">/i, `<meta name="twitter:title" content="إطلالة للسفر والسياحة | ${cfg.name}">`)
    .replace(/<meta name="twitter:description" content="[^"]*">/i, `<meta name="twitter:description" content="${cfg.description}">`)
    .replace(/<script id="unified-destination-schema" type="application\/ld\+json">[\s\S]*?<\/script>/i, `<script id="unified-destination-schema" type="application/ld+json">${JSON.stringify(schema)}</script>`)
    .replace(/<body data-destination="[^"]*">/i, `<body data-destination="${cfg.name}">`)
    .replace('</head>', `${style}</head>`);
  const dir = path.join(out, 'europe', cfg.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

for (const cfg of configs) renderPage(cfg);

let europe = fs.readFileSync(europeFile, 'utf8');
for (const cfg of configs) {
  if (!europe.includes(`/europe/${cfg.slug}/`)) {
    const card = `<article class="dp-place dp-place-${cfg.slug}"><span>وجهة أوروبية</span><h3><a href="/europe/${cfg.slug}/">${cfg.name}</a></h3><p>${cfg.hubCopy}</p><a href="/europe/${cfg.slug}/" aria-label="اكتشف السياحة في ${cfg.name}">${cfg.hubCta} ←</a></article>`;
    europe = europe.replace(/(<div class="dp-places-grid">)/i, `$1${card}`);
  }
}
fs.writeFileSync(europeFile, europe);

if (fs.existsSync(sitemapFile)) {
  let sitemap = fs.readFileSync(sitemapFile, 'utf8');
  for (const cfg of configs) {
    if (!sitemap.includes(cfg.canonical)) sitemap = sitemap.replace(/<\/urlset>\s*$/i, `<url><loc>${cfg.canonical}</loc></url></urlset>`);
  }
  fs.writeFileSync(sitemapFile, sitemap);
}

console.log('Created Switzerland and Poland pages, linked them from Europe, and updated sitemap.');
