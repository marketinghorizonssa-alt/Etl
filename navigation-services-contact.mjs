import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const cssPath = path.join(out, 'assets', 'styles.css');
const homePath = path.join(out, 'index.html');
const SITE = 'https://etlaala.net';
const PHONE = '+966920029967';
const PHONE_DISPLAY = '920029967';
const WA = '966125422331';

if (!fs.existsSync(homePath)) process.exit(0);

const wa = (text) => `https://api.whatsapp.com/send?phone=${WA}&text=${encodeURIComponent(text)}`;
const h = (s='') => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

const services = [
  {
    slug: 'حجز-تذاكر-الطيران', icon: '✈', title: 'حجز تذاكر الطيران', short: 'خيارات للرحلات الداخلية والدولية مع ترتيب أوضح للموعد والميزانية.',
    meta: 'حجز تذاكر الطيران مع إطلالة للسفر والسياحة للرحلات الداخلية والدولية، مع مساعدة في مقارنة الخيارات ومتابعة تفاصيل الحجز.',
    lead: 'من أول اختيار موعد السفر إلى تثبيت الرحلة المناسبة، نساعدك ترتّب خيارات الطيران الداخلية والدولية بطريقة أوضح وأسهل.',
    introTitle: 'خلّ اختيار الرحلة أسهل عليك',
    intro: [
      'خدمة حجز تذاكر الطيران في إطلالة مخصصة للمسافر الذي يبغى يشوف الخيارات المناسبة لخطته بدون ما يضيع بين عشرات المواعيد والأسعار. نراجع معك الوجهة، تاريخ السفر، عدد المسافرين والوقت المناسب، ثم نرتّب الخيارات الأقرب لاحتياجك.',
      'الخدمة تشمل الرحلات الداخلية والدولية، وتناسب رحلات العمل والإجازات والرحلات العائلية. الهدف أن تكون تفاصيل الحجز واضحة من البداية، مع متابعة من فريق إطلالة عند الحاجة.'
    ],
    benefits: [
      ['رحلات داخلية ودولية','مقارنة خيارات الرحلات حسب الوجهة والتاريخ وعدد المسافرين.'],
      ['خيارات تناسب خطتك','نرتّب لك البدائل الأقرب للميزانية ووقت السفر المناسب.'],
      ['حجز أوضح','تفاصيل الرحلة تكون واضحة قبل تأكيد الحجز.'],
      ['دعم عند الحاجة','فريق إطلالة يساعدك في تفاصيل الحجز والاستفسارات المتعلقة برحلتك.']
    ],
    faq: [
      ['هل توفر إطلالة حجز رحلات داخلية ودولية؟','نعم، خدمة حجز تذاكر الطيران تشمل الرحلات الداخلية والدولية بحسب الوجهة والتوفر.'],
      ['ما البيانات التي تساعد في اختيار الرحلة؟','الوجهة، تاريخ السفر، عدد المسافرين والوقت المفضل تساعد في تضييق الخيارات والوصول للرحلة الأنسب.'],
      ['هل أقدر أطلب أكثر من خيار قبل الحجز؟','نعم، يمكن مقارنة الخيارات المتاحة قبل تأكيد الحجز بحسب التاريخ والوجهة.']
    ]
  },
  {
    slug: 'short-destinations', icon: '▣', title: 'حجز الفنادق', short: 'فنادق ومنتجعات لرحلاتك القصيرة والدولية بخيارات تناسب نوع الرحلة.',
    meta: 'حجز الفنادق والمنتجعات مع إطلالة للسفر والسياحة، خيارات إقامة للعائلات والأزواج والرحلات القصيرة في وجهات متعددة.',
    lead: 'سواء رحلتك قصيرة أو إجازة كاملة، نساعدك تختار فندق أو منتجع يناسب موقعك وميزانيتك وطبيعة سفرك.',
    introTitle: 'إقامة مرتبة بدون دوخة البحث',
    intro: [
      'إطلالة توفر خيارات متعددة لحجز الفنادق والمنتجعات في وجهات مختلفة، من رحلات الشرق الأوسط والإقامات القصيرة إلى الرحلات الدولية. نركز على أن يكون موقع الفندق ومستواه وطبيعة الغرف مناسبين لطريقة سفرك.',
      'الخدمة تناسب العائلات والأزواج والمسافر الفردي، ومع كل طلب نرتّب الخيارات حسب الميزانية والوجهة والتوفر، بحيث تعرف وش يناسبك قبل تثبيت الحجز.'
    ],
    benefits: [
      ['فنادق ومنتجعات متنوعة','خيارات بمستويات مختلفة بحسب الوجهة والميزانية.'],
      ['حجز سهل وسريع','نرتّب لك الاختيارات المهمة بدل البحث الطويل بين عشرات الفنادق.'],
      ['مناسب للعائلات والأزواج','نراعي عدد المسافرين وطبيعة الرحلة عند ترشيح الإقامة.'],
      ['وجهات متعددة','خيارات للإقامات القصيرة والرحلات السياحية في مدن ووجهات مختلفة.']
    ],
    faq: [
      ['هل الخدمة مخصصة لوجهات معينة؟','الخدمة تشمل وجهات متعددة بحسب التوفر، ونرتّب الخيارات على أساس المدينة وتاريخ السفر.'],
      ['هل توجد خيارات للعائلات؟','نعم، يتم ترشيح خيارات مناسبة للعائلات بحسب عدد المسافرين ونوع الغرف المطلوبة.'],
      ['هل يمكن اختيار مستوى الفندق والميزانية؟','نعم، تحديد الميزانية ومستوى الإقامة يساعد في تقديم خيارات أقرب لاحتياجك.']
    ]
  },
  {
    slug: 'رحلات-الكروز-وشهر-العسل', icon: '♡', title: 'رحلات الكروز وشهر العسل', short: 'رحلات خاصة للأزواج والكروز بترتيب يناسب المناسبة والمدة والميزانية.',
    meta: 'رحلات الكروز وشهر العسل مع إطلالة للسفر والسياحة، برامج مخصصة للأزواج وتجارب بحرية وإقامات تناسب المناسبات الخاصة.',
    lead: 'إذا الرحلة مناسبة خاصة، نرتّبها من البداية على جوّكم: كروز، شهر عسل، إقامة مميزة وتجارب تناسب المدة والميزانية.',
    introTitle: 'رحلة لها طابعها الخاص',
    intro: [
      'رحلات الكروز تمنحك فرصة تجمع بين الاسترخاء واكتشاف أكثر من وجهة في رحلة واحدة، بينما برامج شهر العسل تحتاج تفاصيل أهدأ وأكثر خصوصية. إطلالة تساعدك في ترتيب النوع المناسب من الرحلة بحسب المناسبة والمدة والوجهات التي تفضلها.',
      'يمكن تخصيص البرنامج ليجمع بين الإقامة والتجارب والأنشطة، مع خيارات تناسب الباحثين عن أجواء رومانسية أو استرخاء أو ترفيه متنوع خلال الرحلة.'
    ],
    benefits: [
      ['كروز وتجارب بحرية','خيارات رحلات بحرية تجمع بين الراحة واكتشاف وجهات متعددة.'],
      ['برامج شهر عسل','ترتيب رحلات مخصصة للأزواج والمناسبات الخاصة.'],
      ['تجربة قابلة للتخصيص','اختيار البرنامج حسب المدة والوجهة ونوع الأنشطة.'],
      ['تفاصيل من البداية','مساعدة في ترتيب الإقامة والرحلة بما يتناسب مع الخطة المختارة.']
    ],
    faq: [
      ['هل يمكن تخصيص برنامج شهر العسل؟','نعم، يمكن ترتيب البرنامج حسب المدة والوجهة والميزانية ونوع التجارب التي تفضلونها.'],
      ['هل الكروز مناسب لشهر العسل؟','يمكن أن يكون الكروز جزءًا من رحلة شهر العسل بحسب نوع الرحلة والوجهات المتاحة.'],
      ['هل تشمل الخدمة الإقامة؟','يتم ترتيب مكونات البرنامج بحسب العرض المختار، ويمكن أن تشمل الإقامة والتجارب المرتبطة بالرحلة.']
    ]
  },
  {
    slug: 'الاستقبال-والتوديع-من-والي-المطار', icon: '◆', title: 'الاستقبال والتوديع من وإلى المطار', short: 'انتقالات مرتبة من وإلى المطار لبداية ونهاية أهدأ لرحلتك.',
    meta: 'خدمة الاستقبال والتوديع من وإلى المطار مع إطلالة، تنظيم انتقالات المطار والاستقبال والتوديع بحسب المدينة والرحلة.',
    lead: 'من لحظة الوصول إلى وقت الرجعة، نرتّب انتقالات المطار بشكل يخلّي بداية الرحلة ونهايتها أريح وأوضح.',
    introTitle: 'ابدأ رحلتك وانتهِ منها براحة',
    intro: [
      'خدمة الاستقبال والتوديع من وإلى المطار صُممت لتخفف عليك تفاصيل الوصول والمغادرة. بحسب الحجز، يتم ترتيب الاستقبال أو التوديع أو الاثنين معًا، مع مراعاة المدينة والمطار وعدد المسافرين والأمتعة.',
      'الهدف أن يكون الانتقال بين المطار ومكان الإقامة واضحًا ومريحًا، خصوصًا للعائلات والمجموعات أو عند الوصول إلى وجهة جديدة لأول مرة.'
    ],
    benefits: [
      ['استقبال من المطار','ترتيب الانتقال عند الوصول بحسب بيانات الرحلة والمدينة.'],
      ['توديع إلى المطار','تنظيم العودة للمطار بما يتناسب مع موعد المغادرة.'],
      ['حسب عدد المسافرين','نراعي عدد الأشخاص والأمتعة عند ترتيب نوع الانتقال.'],
      ['تنسيق مسبق','تجهيز تفاصيل الخدمة قبل الوصول لتكون الخطوات أوضح.']
    ],
    faq: [
      ['هل أقدر أحجز استقبال فقط أو توديع فقط؟','نعم، الخدمة يمكن ترتيبها استقبال أو توديع أو الاثنين معًا بحسب احتياج الرحلة.'],
      ['وش المعلومات المطلوبة؟','المدينة والمطار وموعد الرحلة وعدد المسافرين والأمتعة من أهم البيانات لترتيب الخدمة.'],
      ['هل تناسب العائلات والمجموعات؟','نعم، يتم ترتيب الخيار بحسب عدد المسافرين والأمتعة والتوفر في الوجهة.']
    ]
  },
  {
    slug: 'الدفع-بالتقسيط-للبرامج-السياحية', icon: '◈', title: 'الدفع بالتقسيط للبرامج السياحية', short: 'خيارات دفع مرنة للبرامج السياحية بحسب العرض وشروط مزود الخدمة.',
    meta: 'الدفع بالتقسيط للبرامج السياحية مع إطلالة، خيارات سداد مرنة بحسب العرض والأهلية وشروط مزود خدمة الدفع.',
    lead: 'إذا تبي ترتّب ميزانية الرحلة على دفعات، نوضح لك خيارات التقسيط المتاحة على البرنامج قبل تأكيد الحجز.',
    introTitle: 'مرونة أكثر في ترتيب ميزانية السفر',
    intro: [
      'تتيح إطلالة خيارات دفع بالتقسيط لبعض البرامج السياحية بحسب العرض والخدمة المتاحة وقت الحجز. الفكرة أن تقدر تخطط لرحلتك وتعرف طريقة السداد من البداية بدل دفع كامل المبلغ دفعة واحدة عند توفر خيار التقسيط.',
      'مدة السداد والأهلية والموافقة النهائية تخضع لشروط مزود خدمة الدفع والعرض المختار، لذلك يتم توضيح التفاصيل المتاحة قبل إتمام الحجز.'
    ],
    benefits: [
      ['خيارات سداد مرنة','التقسيط متاح على بعض البرامج بحسب العرض والشروط المطبقة.'],
      ['تفاصيل واضحة','نوضح لك طريقة السداد المتاحة قبل إتمام الحجز.'],
      ['تخطيط أفضل للميزانية','يساعدك خيار التقسيط على توزيع تكلفة الرحلة عند توفره.'],
      ['إجراء بسيط','يتم استكمال الطلب وفق خطوات وشروط مزود خدمة الدفع.']
    ],
    faq: [
      ['هل التقسيط متاح على كل البرامج؟','يعتمد توفر التقسيط على العرض والخدمة ومزود الدفع وقت الحجز.'],
      ['هل الموافقة على التقسيط مضمونة؟','لا، الموافقة والأهلية النهائية تخضع لشروط مزود خدمة الدفع.'],
      ['متى أعرف تفاصيل الأقساط؟','يتم توضيح خيار السداد والتفاصيل المتاحة قبل إتمام الحجز.']
    ]
  },
  {
    slug: 'makkah-hotels-booking-offers', icon: '⌂', title: 'فنادق مكة والمدينة', short: 'خيارات فنادق قريبة من الحرمين بمستويات فاخرة واقتصادية حسب التوفر.',
    meta: 'حجز فنادق مكة والمدينة مع إطلالة، خيارات فنادق قريبة من الحرمين بمستويات فاخرة واقتصادية وخدمة حجز ومتابعة.',
    lead: 'نرتّب لك خيارات فنادق مكة والمدينة حسب قربها من الحرم، مستوى الفندق، عدد المسافرين والميزانية.',
    introTitle: 'إقامة أقرب لراحتك وخطتك',
    intro: [
      'تقدم إطلالة خيارات لحجز فنادق مكة والمدينة، من الفنادق الفاخرة القريبة من الحرم إلى الخيارات الاقتصادية التي تناسب ميزانيات مختلفة. في مكة تشمل الخيارات فنادق بإطلالات مميزة وقرب مباشر من المسجد الحرام، إضافة إلى فنادق مريحة في مناطق قريبة.',
      'الاختيار يعتمد على التوفر وتاريخ الإقامة وعدد الضيوف ونوع الغرفة، ونساعدك تقارن بين الموقع والسعر ومستوى الفندق قبل الحجز.'
    ],
    benefits: [
      ['فنادق قريبة من الحرم','خيارات في مكة والمدينة بحسب القرب والتوفر.'],
      ['فاخرة واقتصادية','مستويات مختلفة من الإقامة لتناسب احتياجات وميزانيات متعددة.'],
      ['خيارات عائلية','ترتيب الغرف والإقامة بحسب عدد المسافرين.'],
      ['متابعة الحجز','مساعدة من وقت اختيار الفندق حتى تثبيت تفاصيل الإقامة.']
    ],
    extra: `<section class="service-detail-band"><div class="container"><div class="section-heading"><span>خيارات مكة</span><h2>أمثلة من الفنادق التي عرضتها إطلالة سابقًا</h2><p>تظل الأسعار والتوفر مرتبطة بتاريخ الحجز، لكن هذه أمثلة من الخيارات التي كانت ضمن صفحة الخدمة القديمة.</p></div><div class="service-hotel-list"><span>المروة ريحان</span><span>دبل تري باي هيلتون جبل عمر</span><span>سويس أوتيل</span><span>هيلتون الأجنحة</span><span>فور بوينتس باي شيراتون مكة النسيم</span><span>بارك إن راديسون مكة النسيم</span></div></div></section>`,
    faq: [
      ['هل توجد فنادق فاخرة واقتصادية؟','نعم، توجد خيارات بمستويات مختلفة بحسب التوفر وتاريخ الإقامة.'],
      ['هل يمكن اختيار فندق قريب من الحرم؟','نعم، يمكن طلب خيارات بحسب القرب من الحرم والميزانية ونوع الغرفة.'],
      ['هل الخدمة تشمل مكة والمدينة؟','نعم، صفحة الخدمة مخصصة لخيارات الفنادق في مكة المكرمة والمدينة المنورة.']
    ]
  }
];

const serviceNav = services.map(s => `<a href="/${s.slug}/">${h(s.title)}</a>`).join('');
const nav = `<nav class="navlinks" aria-label="التنقل الرئيسي"><a href="/">الرئيسية</a><a href="/about/">من نحن</a><a href="/#destinations">الوجهات</a><a href="/#services">الخدمات</a><a href="/#contact">تواصل معنا</a></nav>`;

function allHtml(dir) {
  const result = [];
  for (const e of fs.readdirSync(dir, {withFileTypes:true})) {
    const p = path.join(dir,e.name);
    if (e.isDirectory()) result.push(...allHtml(p));
    else if (e.isFile() && e.name.endsWith('.html')) result.push(p);
  }
  return result;
}

function patchGlobal(html) {
  html = html.replace(/<nav class="navlinks" aria-label="التنقل الرئيسي">[\s\S]*?<\/nav>/g, nav);
  html = html.replace(/<footer([^>]*?)\sid="contact"([^>]*)>/g, '<footer$1 id="site-footer"$2>');
  html = html.replace(/<footer([^>]*?)\sid="why"([^>]*)>/g, '<footer$1 id="site-footer"$2>');
  return html;
}

function patchHome(html) {
  const cards = services.map(s => `<a class="service-card service-link-card" href="/${s.slug}/"><span class="service-icon">${s.icon}</span><h3>${h(s.title)}</h3><p>${h(s.short)}</p><b>اعرف أكثر ←</b></a>`).join('');
  const serviceSection = `<section class="section soft" id="services"><div class="container"><div class="section-heading"><span>خدمات إطلالة</span><h2>كل تفاصيل سفرك في مكان واحد</h2><p>من الطيران والفنادق إلى الكروز والانتقالات وخيارات الدفع، اختر الخدمة اللي تحتاجها واعرف تفاصيلها.</p></div><div class="services-grid services-grid--linked">${cards}</div></div></section>`;
  html = html.replace(/<section class="section soft" id="services">[\s\S]*?<\/section>/, serviceSection);

  const formSectionMatch = html.match(/<section class="section why" id="why">[\s\S]*?<\/section>/);
  if (formSectionMatch) {
    let section = formSectionMatch[0];
    html = html.replace(formSectionMatch[0], '');
    section = section
      .replace('class="section why" id="why"', 'class="section why contact-final" id="contact"')
      .replace(/<div class="why-copy">[\s\S]*?<\/div>(?=<form class="lead-form)/, `<div class="why-copy contact-copy"><span class="mini-title">ودّك نرتّب الرحلة معك من البداية؟</span><h2>قل لنا وين ودّك تروح، والباقي نرتبه معك</h2><p>أرسل لنا تفاصيل رحلتك حتى لو لسه ما حددت كل شيء. مستشار إطلالة يراجع طلبك ويرتّب لك خيارات واضحة للطيران والفنادق والانتقالات والجولات حسب ميزانيتك وطبيعة سفرك.</p><ul><li>برامج تناسب العائلات والأزواج وشهر العسل</li><li>خيارات طيران وفنادق وانتقالات حسب الوجهة</li><li>تفاصيل واضحة قبل الحجز بدون لف ودوران</li><li>متابعة مع مستشار سياحي من التخطيط إلى تثبيت الرحلة</li></ul><div class="contact-direct"><a data-track="whatsapp" href="${wa('مرحباً إطلالة، أبغى أرتب رحلتي مع مستشار سياحي')}">واتساب</a><a data-track="call" href="tel:${PHONE}">${PHONE_DISPLAY}</a></div></div>`)
      .replace(/<div class="form-head">[\s\S]*?<\/div>/, `<div class="form-head"><span>خلّنا نعرف تفاصيل رحلتك</span><h2>أرسل طلبك ومستشار إطلالة يكمل معك</h2><p>عبّ البيانات اللي تعرفها، ونرتّب معك باقي التفاصيل على واتساب.</p></div>`);
    html = html.replace('</main>', `${section}</main>`);
  }
  return html;
}

function pageBody(s) {
  const benefits = s.benefits.map(([t,d]) => `<article><span>✓</span><h3>${h(t)}</h3><p>${h(d)}</p></article>`).join('');
  const faqs = s.faq.map(([q,a]) => `<details><summary>${h(q)}</summary><p>${h(a)}</p></details>`).join('');
  return `<main id="main" class="service-page-main"><section class="service-page-hero"><div class="container"><span class="service-eyebrow">خدمات إطلالة</span><h1>${h(s.title)}</h1><p>${h(s.lead)}</p><div class="hero-actions"><a class="gradient-btn" href="/#contact">اطلب الخدمة</a><a class="ghost-btn" data-track="whatsapp" href="${wa(`مرحباً إطلالة، أريد الاستفسار عن ${s.title}`)}">اسأل على واتساب</a></div></div></section><section class="service-page-section"><div class="container service-layout"><article class="service-copy-card"><span class="mini-title">${h(s.title)}</span><h2>${h(s.introTitle)}</h2>${s.intro.map(p=>`<p>${h(p)}</p>`).join('')}<a class="inline-service-cta" href="/#contact">خلّ مستشار إطلالة يرتّبها معك ←</a></article><aside class="service-side-nav"><span>خدماتنا</span>${serviceNav}</aside></div></section><section class="section soft service-benefits-section"><div class="container"><div class="section-heading"><span>وش يشمل ترتيب الخدمة؟</span><h2>تفاصيل أوضح قبل الحجز</h2></div><div class="service-benefits-grid">${benefits}</div></div></section>${s.extra || ''}<section class="section service-faq"><div class="container service-faq-wrap"><div class="section-heading"><span>أسئلة شائعة</span><h2>قبل ما تطلب ${h(s.title)}</h2></div><div class="faq-list">${faqs}</div></div></section><section class="service-bottom-cta"><div class="container"><div><span>جاهز ترتّب الخدمة؟</span><h2>أرسل تفاصيلك وخلك على تواصل مع مستشار إطلالة</h2></div><a class="gradient-btn" href="/#contact">ابدأ من نموذج التواصل</a></div></section></main>`;
}

function serviceSchema(s) {
  return {
    '@context':'https://schema.org',
    '@graph':[
      {'@type':'Service',name:s.title,serviceType:s.title,url:`${SITE}/${s.slug}/`,provider:{'@type':'TravelAgency',name:'إطلالة للسفر والسياحة',url:SITE,telephone:PHONE}},
      {'@type':'FAQPage',mainEntity:s.faq.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))}
    ]
  };
}

function buildServicePage(base, s) {
  let html = base.replace(/<main id="main">[\s\S]*?<\/main>/, pageBody(s));
  const title = `${s.title} | إطلالة للسفر والسياحة`;
  const canonical = `${SITE}/${s.slug}/`;
  html = html
    .replace(/<title>[\s\S]*?<\/title>/, `<title>${h(title)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${h(s.meta)}">`)
    .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${canonical}">`)
    .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${h(title)}">`)
    .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${h(s.meta)}">`)
    .replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${canonical}">`)
    .replace(/<body([^>]*)data-destination="[^"]*"([^>]*)>/, `<body$1data-destination="${h(s.title)}"$2>`)
    .replace('</head>', `<script type="application/ld+json">${JSON.stringify(serviceSchema(s))}</script></head>`);
  return patchGlobal(html);
}

let home = fs.readFileSync(homePath,'utf8');
home = patchGlobal(patchHome(home));
fs.writeFileSync(homePath, home);

// Create service pages from the fully polished site shell so header, footer, tracking and floating buttons stay consistent.
for (const s of services) {
  const dir = path.join(out, s.slug);
  fs.mkdirSync(dir,{recursive:true});
  fs.writeFileSync(path.join(dir,'index.html'), buildServicePage(home,s));
}

// Final navigation/footer patch on every page generated by the previous build steps.
for (const file of allHtml(out)) {
  let html = fs.readFileSync(file,'utf8');
  html = patchGlobal(html);
  fs.writeFileSync(file,html);
}

// Add all new service URLs to the sitemap.
const sitemapPath = path.join(out,'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  let sitemap = fs.readFileSync(sitemapPath,'utf8');
  const entries = services.filter(s=>!sitemap.includes(`${SITE}/${s.slug}/`)).map(s=>`<url><loc>${SITE}/${s.slug}/</loc><changefreq>monthly</changefreq><priority>0.80</priority></url>`).join('');
  if (entries) sitemap = sitemap.replace('</urlset>', `${entries}</urlset>`);
  fs.writeFileSync(sitemapPath,sitemap);
}

let css = fs.readFileSync(cssPath,'utf8');
if (!css.includes('navigation-services-contact-v1')) {
  css += `\n/* navigation-services-contact-v1 */\n.navlinks{align-items:center}.navlinks>a{white-space:nowrap}.services-grid--linked{grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}.service-link-card{display:flex;flex-direction:column;align-items:flex-start;text-decoration:none;color:inherit;min-height:220px;transition:transform .18s ease,box-shadow .18s ease,border-color .18s ease}.service-link-card:hover{transform:translateY(-4px);border-color:#d8def7;box-shadow:0 16px 38px rgba(22,42,110,.09)}.service-link-card .service-icon{display:grid;place-items:center;width:46px;height:46px;border-radius:14px;background:linear-gradient(135deg,#eef4ff,#fff0f5);font-size:1.25rem}.service-link-card h3{margin-top:15px}.service-link-card p{flex:1}.service-link-card b{font-size:.82rem;color:#263fb0;margin-top:12px}.contact-final{padding:52px 0 58px!important;background:linear-gradient(180deg,#f7f9ff,#fff)!important}.contact-final .split{align-items:center;gap:38px}.contact-copy{padding:10px 6px}.contact-copy h2{max-width:580px;font-size:clamp(1.8rem,3.5vw,2.65rem);line-height:1.5;margin:8px 0 14px}.contact-copy>p{max-width:620px;color:#5c6681;font-size:.98rem;line-height:2}.contact-copy ul{display:grid;gap:9px;margin:20px 0 0;padding:0;list-style:none}.contact-copy li{position:relative;padding-right:25px;color:#35415f;line-height:1.7}.contact-copy li:before{content:'✓';position:absolute;right:0;top:1px;color:#1f61ca;font-weight:900}.contact-direct{display:flex;gap:10px;flex-wrap:wrap;margin-top:22px}.contact-direct a{display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:0 15px;border:1px solid #dfe4f2;border-radius:11px;color:#23399f;font-weight:900;background:#fff}.contact-final .lead-form{box-shadow:0 18px 55px rgba(24,40,100,.09);border:1px solid #e4e9f5}.service-page-main{background:#f7f9fd}.service-page-hero{position:relative;overflow:hidden;color:#fff;background:radial-gradient(circle at 14% 30%,rgba(70,195,239,.25),transparent 30%),linear-gradient(120deg,#0d2c8f,#203bad 58%,#6f259b);padding:62px 0 66px}.service-page-hero:after{content:'';position:absolute;width:430px;height:430px;border:1px solid rgba(255,255,255,.13);border-radius:50%;left:-160px;bottom:-330px}.service-page-hero .container{position:relative;z-index:1}.service-eyebrow{display:inline-block;color:#9fe8ff;font-size:.8rem;font-weight:900;margin-bottom:8px}.service-page-hero h1{margin:0 0 13px;color:#fff;font-size:clamp(2.1rem,4.8vw,3.7rem);line-height:1.3}.service-page-hero p{max-width:760px;margin:0;color:rgba(255,255,255,.9);font-size:1rem;line-height:1.95}.service-page-hero .hero-actions{margin-top:24px}.service-page-section{padding:48px 0}.service-layout{display:grid;grid-template-columns:minmax(0,1fr) 270px;gap:24px;align-items:start;max-width:1120px}.service-copy-card,.service-side-nav{background:#fff;border:1px solid #e3e8f3;border-radius:22px;box-shadow:0 12px 34px rgba(25,39,92,.05)}.service-copy-card{padding:34px}.service-copy-card h2{margin:6px 0 16px;color:#18265f;font-size:clamp(1.5rem,3vw,2.1rem);line-height:1.5}.service-copy-card p{color:#59637e;line-height:2;font-size:.97rem}.service-copy-card p+p{margin-top:12px}.inline-service-cta{display:inline-flex;margin-top:20px;color:#263fb0;font-weight:900}.service-side-nav{padding:18px;position:sticky;top:94px;display:grid;gap:5px}.service-side-nav>span{font-weight:900;color:#1c2a68;padding:2px 8px 10px;margin-bottom:4px;border-bottom:1px solid #edf0f6}.service-side-nav a{padding:10px;border-radius:10px;color:#66708a;font-size:.82rem;line-height:1.5}.service-side-nav a:hover{background:#f5f7ff;color:#253db0}.service-benefits-section{padding-top:44px!important}.service-benefits-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:15px}.service-benefits-grid article{background:#fff;border:1px solid #e5e9f3;border-radius:18px;padding:22px;box-shadow:0 9px 28px rgba(25,39,92,.04)}.service-benefits-grid article>span{display:grid;place-items:center;width:34px;height:34px;border-radius:11px;background:#edf3ff;color:#2441b0;font-weight:900}.service-benefits-grid h3{margin:14px 0 8px;color:#1b2b68;font-size:1rem}.service-benefits-grid p{margin:0;color:#68728d;font-size:.86rem;line-height:1.85}.service-detail-band{padding:48px 0;background:#fff}.service-hotel-list{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}.service-hotel-list span{padding:10px 14px;border-radius:999px;border:1px solid #e1e5f2;background:#f8faff;color:#34436f;font-size:.84rem;font-weight:800}.service-faq{background:#fff}.service-faq-wrap{max-width:940px}.faq-list{display:grid;gap:10px}.faq-list details{border:1px solid #e4e8f2;border-radius:14px;background:#fbfcff;padding:0 18px}.faq-list summary{cursor:pointer;padding:16px 0;color:#21306e;font-weight:900}.faq-list p{margin:0;padding:0 0 17px;color:#626d88;line-height:1.9}.service-bottom-cta{padding:32px 0 38px;background:#fff}.service-bottom-cta .container{display:flex;align-items:center;justify-content:space-between;gap:24px;padding:28px 32px;border-radius:22px;background:linear-gradient(120deg,#112f98,#283eb1);color:#fff}.service-bottom-cta span{font-size:.78rem;color:#a9e7ff;font-weight:900}.service-bottom-cta h2{margin:5px 0 0;color:#fff;font-size:1.45rem;line-height:1.5}.service-bottom-cta .gradient-btn{white-space:nowrap;background:#fff;color:#17339f}.dest-menu{display:none!important}\n@media(max-width:980px){.services-grid--linked{grid-template-columns:repeat(2,minmax(0,1fr))}.service-layout{grid-template-columns:1fr}.service-side-nav{position:static;grid-template-columns:repeat(2,minmax(0,1fr))}.service-side-nav>span{grid-column:1/-1}.service-benefits-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:680px){.services-grid--linked{grid-template-columns:1fr}.service-link-card{min-height:0}.contact-final{padding:34px 0 38px!important}.contact-final .split{gap:24px}.contact-copy h2{font-size:1.65rem}.service-page-hero{padding:42px 0 46px}.service-page-hero h1{font-size:2rem}.service-page-section{padding:30px 0}.service-copy-card{padding:22px;border-radius:17px}.service-side-nav{grid-template-columns:1fr;padding:14px}.service-benefits-grid{grid-template-columns:1fr}.service-bottom-cta .container{display:block;padding:24px}.service-bottom-cta .gradient-btn{margin-top:16px;width:100%}}\n`;
  fs.writeFileSync(cssPath,css);
}

console.log('Navigation simplified, six legacy service pages created, homepage service links added, and contact form moved directly above footer.');
