import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const SITE = 'https://etlaala.net';
const WHATSAPP = '966125422331';
const PHONE_TEL = '+966920029967';
const PHONE_DISPLAY = '920029967';
const cssPath = path.join(out, 'assets', 'styles.css');
const templatePath = path.join(out, 'index.html');

if (!fs.existsSync(templatePath)) process.exit(0);

const wa = (text) => `https://api.whatsapp.com/send?phone=${WHATSAPP}&text=${encodeURIComponent(text)}`;
const makkahMap = 'https://maps.app.goo.gl/bnpxziMndmdjT3G8A';
const madinaMap = 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent('شارع سلطانه العام مجمع الابتسامه الاجمل الدور 6 مكتب 1762 المدينة المنورة السعودية');

const breadcrumb = (current, parent = '') => `<nav class="page-breadcrumb" aria-label="مسار التنقل"><a href="/">الرئيسية</a>${parent ? `<span>←</span><span>${parent}</span>` : ''}<span>←</span><strong>${current}</strong></nav>`;

const privacyBody = `
<section class="legal-hero"><div class="container legal-hero-inner">${breadcrumb('سياسة الخصوصية')}<span class="legal-eyebrow">خصوصيتك مهمة لنا</span><h1>سياسة الخصوصية</h1><p>تنظم هذه السياسة طريقة التعامل مع البيانات التي يقدمها زوار موقع إطلالة عند طلب خدمات السفر والحجوزات.</p></div></section>
<section class="legal-page-section"><div class="container legal-layout">
<aside class="legal-side"><div class="legal-side-card"><span>في هذه الصفحة</span><a href="#privacy-intro">نطاق السياسة</a><a href="#privacy-points">التزامات الخصوصية</a><a href="#privacy-contact">التواصل معنا</a></div></aside>
<article class="legal-document">
<section class="legal-block" id="privacy-intro"><span class="legal-block-index">01</span><div><h2>خصوصية بيانات زوار إطلالة</h2><p>موقع إطلالة للسفر والسياحة متخصص في خدمات السفر وحجز تذاكر الطيران والتأشيرات والفنادق والخدمات السياحية. وتحترم إطلالة خصوصية زوار الموقع، لذلك يتم التعامل مع المعلومات التي يقدمها العميل في نطاق الخدمة المطلوبة.</p></div></section>
<section class="legal-block" id="privacy-points"><span class="legal-block-index">02</span><div><h2>التزامات سياسة الخصوصية</h2><ol class="privacy-points"><li><strong>معلومات العملاء:</strong> يتم الحفاظ على المعلومات التي يسجلها العملاء بإرادتهم داخل الموقع.</li><li><strong>إتمام الطلب:</strong> عند طلب حجز فندق أو تذكرة أو أي خدمة من خدمات إطلالة، يجب إدخال البيانات المطلوبة بصورة صحيحة حتى يمكن استكمال الحجز.</li><li><strong>استخدام المحتوى:</strong> لا يسمح بطباعة أو توزيع محتوى الموقع بطريقة غير قانونية.</li><li><strong>حقوق الموقع:</strong> محتوى موقع إطلالة للسفر والسياحة محفوظ الحقوق للجهة المالكة.</li><li><strong>مسؤولية الاستخدام:</strong> استخدام الموقع يتم على مسؤولية المستخدم، وعند حدوث مشكلة أو حجز غير مرغوب فيه يجب التواصل مع خدمة عملاء إطلالة.</li><li><strong>حماية البيانات:</strong> يتم الاحتفاظ ببيانات العملاء في مكان مخصص ولا تستخدم إلا في نطاق تقديم الخدمة المطلوبة.</li><li><strong>مشاركة البيانات لإتمام الحجز:</strong> عند حجز خدمة، قد يتم تزويد الجهة المنفذة للطلب بالبيانات اللازمة لإتمام الحجز، مثل شركة الطيران أو الفندق.</li><li><strong>صحة البيانات:</strong> العميل مسؤول عن صحة المعلومات التي يدخلها، ولا تتحمل إطلالة مسؤولية النتائج الناتجة عن إدخال بيانات غير صحيحة.</li><li><strong>وثائق السفر:</strong> تصاريح السفر وتأشيرات الخروج والعودة وتواريخ إصدار وانتهاء وثائق السفر مسؤولية المسافر نفسه.</li></ol></div></section>
<section class="legal-block legal-contact-block" id="privacy-contact"><span class="legal-block-index">03</span><div><h2>للاستفسار عن الخصوصية</h2><p>يمكنك التواصل مع فريق إطلالة عند وجود أي استفسار متعلق ببياناتك أو بطلب مقدم عبر الموقع.</p><div class="legal-actions"><a class="gradient-btn" href="mailto:info@etlaala.com">info@etlaala.com</a><a class="legal-outline-btn" data-track="call" href="tel:${PHONE_TEL}">${PHONE_DISPLAY}</a></div></div></section>
</article></div></section>`;

const termsSections = [
  ['01','قبول الشروط',`استخدامك لموقع etlaala.net، بما في ذلك حجز الرحلات أو قراءة المحتوى أو الاستفادة من أي من خدماتنا، يعتبر موافقة صريحة منك على هذه الشروط والأحكام. إذا كنت لا توافق عليها، يرجى عدم استخدام الموقع.`],
  ['02','سياسة الحجز والإلغاء والتعديل لرحلات الطيران',`<p>تعتمد سياسة الإلغاء والتعديل للرحلات الداخلية والدولية على سياسات شركة الطيران المختارة ونوع الدرجة المحجوزة.</p><ul><li><strong>التعديل والإلغاء:</strong> يتم الرجوع إلى شركة الطيران لمعرفة الشروط الخاصة بالحجز.</li><li><strong>رسوم التعديل:</strong> قد تفرض شركة الطيران رسومًا إضافية إلى جانب فرق السعر للرحلة الجديدة.</li><li><strong>رسوم الإلغاء:</strong> بعض درجات الحجز غير قابلة للاسترداد، وبعضها يخضع لغرامات تختلف حسب وقت الإلغاء.</li><li><strong>الاسترداد:</strong> في الحجوزات القابلة للاسترداد قد يتم رد المبلغ نقدًا بعد خصم الغرامات أو تحويله إلى رصيد حسب سياسة شركة الطيران.</li><li><strong>حقوق المسافر:</strong> تخضع حالات التأخير والإلغاء والرفض على متن الرحلة للوائح الهيئة العامة للطيران المدني والسياسات المطبقة على الحجز.</li></ul>`],
  ['03','متطلبات الإقامة في الفنادق',`<ul><li>يجب أن يكون سن النزيل المسؤول عن الحجز 18 عامًا فما فوق.</li><li>يجب تقديم وثيقة هوية سارية مثل جواز السفر أو الهوية الوطنية عند تسجيل الدخول.</li><li>يجب الاحتفاظ بتأكيد الحجز أو القسيمة الإلكترونية.</li><li>يبدأ تسجيل الدخول عادة من الساعة 14:00، وتسجيل الخروج عادة قبل الساعة 12:00 ظهرًا، وفق سياسة الفندق.</li><li>توجد حجوزات بأسعار مخفضة غير قابلة للإلغاء أو التعديل، وقد ينظر الفندق في الحالات القاهرة عند تقديم مستند رسمي وفق سياسته.</li></ul>`],
  ['04','سياسة الإلغاء للباقات السياحية',`يمكن استرداد مبالغ بعض الخدمات الفردية داخل الباقة، مثل السيارة بسائق خاص أو بعض الجولات السياحية، بشرط أن يسمح مزود الخدمة بذلك وأن يتم الإلغاء قبل 21 يومًا من موعد الاستفادة من الخدمة وفق شروط الحجز المؤكد.`],
  ['05','طرق الدفع',`توفر إطلالة للسفر والسياحة وسائل دفع متعددة بحسب المتاح، وتشمل التحويل البنكي، وبطاقات فيزا وماستركارد ومدى، والخدمات الرقمية مثل Apple Pay، وخيارات التقسيط المتاحة مثل تابي وتمارا.`],
  ['06','إخلاء المسؤولية عن وثائق السفر',`يتحمل المسافر مسؤولية تجهيز وصلاحية وثائق السفر والتأشيرات والتصاريح اللازمة للوجهة، ولا تتحمل إطلالة مسؤولية عدم استيفاء هذه المتطلبات.`],
  ['07','الملكية الفكرية',`جميع النصوص والشعارات والصور والمواد المنشورة على الموقع مملوكة لإطلالة أو مستخدمة بما يسمح بعرضها، ولا يجوز نسخها أو تعديلها أو إعادة استخدامها دون إذن.`],
  ['08','حدود المسؤولية',`تقدم الخدمات وفق تفاصيل الحجز المؤكد وسياسات مزودي الخدمة، ولا تتحمل إطلالة مسؤولية الخسائر الناتجة عن معلومات غير صحيحة يقدمها العميل أو متطلبات سفر لم يستوفها.`],
  ['09','القانون الحاكم وحل النزاعات',`تخضع هذه الشروط والأحكام للأنظمة المعمول بها في المملكة العربية السعودية، وتكون الجهات والمحاكم المختصة في المملكة المرجع عند نشوء أي نزاع.`],
  ['10','التعديلات على الشروط',`تحتفظ إطلالة بحق تحديث هذه الشروط عند الحاجة، ويعد استمرار استخدام الموقع بعد نشر النسخة المحدثة قبولًا بها.`],
  ['11','التصريح والضمانات',`يقر المستخدم بأن استخدامه للموقع يتوافق مع هذه الشروط، وأنه لن يستخدم الموقع لأي غرض غير قانوني أو محظور. إطلالة للسفر والسياحة كيان مرخص ويعمل وفق الأنظمة واللوائح المعمول بها في المملكة.`]
];

const termsBody = `
<section class="legal-hero"><div class="container legal-hero-inner">${breadcrumb('الشروط والأحكام')}<span class="legal-eyebrow">وضوح قبل الحجز</span><h1>الشروط والأحكام</h1><p>هذه الصفحة تنظم استخدام موقع إطلالة والخدمات المقدمة من خلاله، بما في ذلك الطيران والفنادق والباقات السياحية.</p></div></section>
<section class="legal-page-section"><div class="container legal-layout">
<aside class="legal-side"><div class="legal-side-card"><span>أقسام الشروط</span>${termsSections.map(([n,t])=>`<a href="#term-${n}">${n} — ${t}</a>`).join('')}</div></aside>
<article class="legal-document terms-document">${termsSections.map(([n,t,c])=>`<section class="legal-block" id="term-${n}"><span class="legal-block-index">${n}</span><div><h2>${t}</h2>${c.startsWith('<') ? c : `<p>${c}</p>`}</div></section>`).join('')}</article>
</div></section>`;

function branchBody({city, addressMain, addressSub, mapUrl, otherCity, otherSlug}) {
  return `
<section class="branch-page-hero"><div class="container branch-hero-inner">${breadcrumb(`مكتب ${city}`,'فروع إطلالة')}<span class="legal-eyebrow">فروع إطلالة</span><h1>مكتب إطلالة ${city}</h1><p>بيانات الفرع وطرق التواصل للوصول إلى فريق إطلالة بسهولة.</p><div class="branch-hero-actions"><a class="branch-primary-btn" href="${mapUrl}" target="_blank" rel="noopener">فتح موقع الفرع</a><a class="branch-secondary-btn" data-track="whatsapp" href="${wa(`مرحباً إطلالة، أريد التواصل مع مكتب ${city}`)}">تواصل عبر واتساب</a></div></div></section>
<section class="branch-page-section"><div class="container branch-page-grid">
<article class="branch-feature-card branch-location-card"><div class="branch-icon" aria-hidden="true">⌖</div><span class="branch-label">العنوان</span><h2>موقع مكتب إطلالة ${city}</h2><div class="branch-address-box"><strong>${addressMain}</strong><span>${addressSub}</span></div><a class="branch-text-link" href="${mapUrl}" target="_blank" rel="noopener">عرض الموقع على الخريطة ←</a></article>
<article class="branch-feature-card"><div class="branch-icon" aria-hidden="true">☎</div><span class="branch-label">تواصل معنا</span><h2>خدمة العملاء</h2><div class="branch-contact-list"><a data-track="call" href="tel:${PHONE_TEL}"><small>الهاتف</small><strong dir="ltr">${PHONE_DISPLAY}</strong></a><a href="mailto:info@etlaala.com"><small>البريد الإلكتروني</small><strong>info@etlaala.com</strong></a></div></article>
</div><div class="container branch-other"><span>تبحث عن الفرع الآخر؟</span><a href="/${otherSlug}/">مكتب إطلالة ${otherCity} ←</a></div></section>`;
}

const pages = [
  {slug:'privacy-policy', title:'سياسة الخصوصية | إطلالة للسفر والسياحة', desc:'سياسة الخصوصية الخاصة بموقع إطلالة للسفر والسياحة وكيفية التعامل مع بيانات العملاء وطلبات الحجز.', body:privacyBody},
  {slug:'terms-and-conditions', title:'الشروط والأحكام | إطلالة للسفر والسياحة', desc:'الشروط والأحكام المنظمة لاستخدام موقع إطلالة وخدمات الطيران والفنادق والباقات السياحية.', body:termsBody},
  {slug:'makkah-office', title:'مكتب إطلالة مكة المكرمة | إطلالة للسفر والسياحة', desc:'عنوان وبيانات التواصل مع مكتب إطلالة للسفر والسياحة في مكة المكرمة.', body:branchBody({city:'مكة المكرمة', addressMain:'برج القمرية، 15، Al Jamiah، Makkah 24242، Saudi Arabia', addressSub:'القمرية، العزيزية، مكة المكرمة، الدور الثالث', mapUrl:makkahMap, otherCity:'المدينة المنورة', otherSlug:'madina-office'})},
  {slug:'madina-office', title:'مكتب إطلالة المدينة المنورة | إطلالة للسفر والسياحة', desc:'عنوان وبيانات التواصل مع مكتب إطلالة للسفر والسياحة في المدينة المنورة.', body:branchBody({city:'المدينة المنورة', addressMain:'شارع سلطانة العام، مجمع الابتسامة الأجمل', addressSub:'الدور السادس، مكتب 1762، المدينة المنورة', mapUrl:madinaMap, otherCity:'مكة المكرمة', otherSlug:'makkah-office'})}
];

function updateHead(html,page){
  const canonical=`${SITE}/${page.slug}/`;
  html=html.replace(/<title>[\s\S]*?<\/title>/i,`<title>${page.title}</title>`);
  html=html.replace(/<meta name="description" content="[^"]*">/i,`<meta name="description" content="${page.desc}">`);
  html=html.replace(/<link rel="canonical" href="[^"]*">/i,`<link rel="canonical" href="${canonical}">`);
  html=html.replace(/<meta property="og:title" content="[^"]*">/i,`<meta property="og:title" content="${page.title}">`);
  html=html.replace(/<meta property="og:description" content="[^"]*">/i,`<meta property="og:description" content="${page.desc}">`);
  html=html.replace(/<meta property="og:url" content="[^"]*">/i,`<meta property="og:url" content="${canonical}">`);
  const schema={'@context':'https://schema.org','@type':'WebPage',name:page.title,description:page.desc,url:canonical,inLanguage:'ar-SA',isPartOf:{'@type':'WebSite',name:'إطلالة للسفر والسياحة',url:SITE}};
  return html.replace('</head>',`<script type="application/ld+json">${JSON.stringify(schema)}</script></head>`);
}

let template=fs.readFileSync(templatePath,'utf8');
template=template.replace(/https:\/\/etlaala\.com\/privacy-policy\//g,'/privacy-policy/').replace(/https:\/\/etlaala\.com\/terms-and-conditions\//g,'/terms-and-conditions/');
// Restore the header to the state before the branches dropdown was added.
template=template.replace(/<details class="branch-menu">[\s\S]*?<\/details>/g,'');

for(const page of pages){
  let html=updateHead(template,page);
  html=html.replace(/<main id="main"[\s\S]*?<\/main>/i,`<main id="main" class="static-info-main">${page.body}</main>`);
  const dir=path.join(out,page.slug);
  fs.mkdirSync(dir,{recursive:true});
  fs.writeFileSync(path.join(dir,'index.html'),html);
}

function htmlFiles(dir){
  const files=[];
  for(const e of fs.readdirSync(dir,{withFileTypes:true})){
    const full=path.join(dir,e.name);
    if(e.isDirectory()) files.push(...htmlFiles(full));
    else if(e.isFile()&&e.name.endsWith('.html')) files.push(full);
  }
  return files;
}

for(const file of htmlFiles(out)){
  let html=fs.readFileSync(file,'utf8');
  html=html.replace(/https:\/\/etlaala\.com\/privacy-policy\//g,'/privacy-policy/').replace(/https:\/\/etlaala\.com\/terms-and-conditions\//g,'/terms-and-conditions/');
  html=html.replace(/<details class="branch-menu">[\s\S]*?<\/details>/g,'');
  fs.writeFileSync(file,html);
}

const sitemapPath=path.join(out,'sitemap.xml');
if(fs.existsSync(sitemapPath)){
  let sitemap=fs.readFileSync(sitemapPath,'utf8');
  const additions=pages.map(p=>`${SITE}/${p.slug}/`).filter(u=>!sitemap.includes(`<loc>${u}</loc>`)).map(u=>`<url><loc>${u}</loc></url>`).join('');
  sitemap=sitemap.replace('</urlset>',`${additions}</urlset>`);
  fs.writeFileSync(sitemapPath,sitemap);
}

let css=fs.readFileSync(cssPath,'utf8');
const marker='legal-branches-pages-v2';
if(!css.includes(marker)){
css+=`\n/* ${marker} */\n.static-info-main{background:#f6f8fc}.page-breadcrumb{display:flex;align-items:center;gap:8px;flex-wrap:wrap;font-size:.8rem;margin-bottom:28px;color:rgba(255,255,255,.72)}.page-breadcrumb a{color:#fff;font-weight:700}.page-breadcrumb strong{color:#fff}.legal-hero,.branch-page-hero{position:relative;overflow:hidden;background:linear-gradient(125deg,#0f2d91 0%,#263ea8 46%,#7a2395 100%);color:#fff}.legal-hero:before,.branch-page-hero:before{content:"";position:absolute;width:420px;height:420px;border-radius:50%;background:radial-gradient(circle,rgba(255,255,255,.18),rgba(255,255,255,0) 68%);left:-120px;top:-180px;pointer-events:none}.legal-hero:after,.branch-page-hero:after{content:"";position:absolute;width:360px;height:360px;border:1px solid rgba(255,255,255,.13);border-radius:50%;right:-140px;bottom:-240px}.legal-hero-inner,.branch-hero-inner{position:relative;z-index:1;padding:54px 0 58px;max-width:1080px}.legal-eyebrow{display:inline-block;font-size:.8rem;font-weight:800;letter-spacing:.02em;color:#9be3ff;margin-bottom:8px}.legal-hero h1,.branch-page-hero h1{margin:0 0 12px;font-size:clamp(2.15rem,4.6vw,3.7rem);line-height:1.25;color:#fff}.legal-hero p,.branch-page-hero p{max-width:760px;margin:0;color:rgba(255,255,255,.88);font-size:1rem;line-height:1.9}.legal-page-section,.branch-page-section{padding:44px 0 68px}.legal-layout{display:grid;grid-template-columns:250px minmax(0,1fr);gap:26px;align-items:start;max-width:1120px}.legal-side{position:sticky;top:92px}.legal-side-card{background:#fff;border:1px solid #e4e9f4;border-radius:18px;padding:18px;box-shadow:0 12px 34px rgba(25,39,92,.05);display:grid;gap:4px}.legal-side-card>span{color:#18265f;font-weight:900;font-size:.92rem;padding:2px 8px 10px;border-bottom:1px solid #eef1f6;margin-bottom:5px}.legal-side-card a{padding:8px;border-radius:9px;color:#68718e;font-size:.82rem;line-height:1.5}.legal-side-card a:hover{background:#f3f5ff;color:#273bb5}.legal-document{display:grid;gap:16px;min-width:0}.legal-block{display:grid;grid-template-columns:54px minmax(0,1fr);gap:18px;background:#fff;border:1px solid #e4e9f4;border-radius:20px;padding:28px 30px;box-shadow:0 10px 30px rgba(25,39,92,.045);scroll-margin-top:100px}.legal-block-index{width:42px;height:42px;border-radius:13px;display:grid;place-items:center;background:linear-gradient(135deg,#eef3ff,#fff0f5);color:#263fa8;font-size:.78rem;font-weight:900}.legal-block h2{margin:2px 0 10px;color:#18265f;font-size:1.25rem;line-height:1.5}.legal-block p,.legal-block li{color:#566079;font-size:.95rem;line-height:1.95}.legal-block p{margin:0}.legal-block ul{margin:8px 0 0;padding-right:20px}.legal-block li+li{margin-top:7px}.privacy-points{counter-reset:privacy;list-style:none;padding:0!important;margin:12px 0 0!important;display:grid;gap:10px}.privacy-points li{position:relative;padding:13px 15px;background:#f9faff;border:1px solid #edf0f7;border-radius:12px}.privacy-points strong{color:#21347f}.legal-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:18px}.legal-outline-btn{display:inline-flex;align-items:center;justify-content:center;padding:11px 18px;border-radius:12px;border:1px solid #dce2f0;color:#24379f;font-weight:800;background:#fff}.branch-hero-actions{display:flex;gap:12px;flex-wrap:wrap;margin-top:26px}.branch-primary-btn,.branch-secondary-btn{display:inline-flex;align-items:center;justify-content:center;min-height:46px;padding:0 20px;border-radius:13px;font-weight:900}.branch-primary-btn{background:#fff;color:#16329b}.branch-secondary-btn{border:1px solid rgba(255,255,255,.45);color:#fff;background:rgba(255,255,255,.08)}.branch-page-grid{max-width:1050px;display:grid;grid-template-columns:1.15fr .85fr;gap:20px}.branch-feature-card{background:#fff;border:1px solid #e4e9f4;border-radius:22px;padding:28px;box-shadow:0 12px 34px rgba(25,39,92,.05)}.branch-icon{width:46px;height:46px;border-radius:14px;display:grid;place-items:center;background:linear-gradient(135deg,#eaf4ff,#fff0f7);color:#273eaa;font-size:1.35rem;margin-bottom:18px}.branch-label{display:inline-block;color:#5665bf;font-size:.78rem;font-weight:900;margin-bottom:6px}.branch-feature-card h2{margin:0 0 18px;color:#18265f;font-size:1.3rem}.branch-address-box{display:grid;gap:8px;padding:18px;background:#f8faff;border:1px solid #edf0f7;border-radius:15px}.branch-address-box strong{color:#26315e;line-height:1.75;font-size:1rem}.branch-address-box span{color:#707995;line-height:1.75;font-size:.9rem}.branch-text-link{display:inline-flex;margin-top:18px;color:#3045bc;font-weight:900}.branch-contact-list{display:grid;gap:10px}.branch-contact-list a{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:15px 16px;border:1px solid #edf0f7;border-radius:14px;background:#fbfcff}.branch-contact-list small{color:#7a829b;font-weight:700}.branch-contact-list strong{color:#1f2c68;font-size:.96rem}.branch-other{max-width:1050px;margin-top:18px;padding:16px 20px;background:#fff;border:1px solid #e6eaf3;border-radius:16px;display:flex;align-items:center;justify-content:space-between;gap:20px}.branch-other span{color:#6e7690}.branch-other a{color:#2c43b6;font-weight:900}@media(max-width:900px){.legal-layout{grid-template-columns:1fr}.legal-side{position:static}.legal-side-card{display:flex;overflow:auto;gap:6px}.legal-side-card>span{display:none}.legal-side-card a{white-space:nowrap;background:#f7f8fc}.branch-page-grid{grid-template-columns:1fr}.legal-hero-inner,.branch-hero-inner{padding:44px 0 48px}}@media(max-width:620px){.legal-hero-inner,.branch-hero-inner{padding:34px 0 38px}.page-breadcrumb{margin-bottom:20px}.legal-page-section,.branch-page-section{padding:28px 0 46px}.legal-block{grid-template-columns:1fr;padding:21px;border-radius:16px;gap:10px}.legal-block-index{width:36px;height:36px;border-radius:11px}.legal-block h2{font-size:1.08rem}.legal-block p,.legal-block li{font-size:.91rem}.branch-feature-card{padding:22px;border-radius:17px}.branch-hero-actions{align-items:stretch}.branch-primary-btn,.branch-secondary-btn{width:100%}.branch-other{display:block}.branch-other a{display:block;margin-top:6px}}\n`;
fs.writeFileSync(cssPath,css);
}

console.log('Redesigned privacy, terms, Makkah and Madina pages; restored the original header menu and updated legal links.');
