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

const branchMenu = `<details class="branch-menu"><summary aria-label="فتح قائمة الفروع"><span>فروعنا</span></summary><div class="branch-dropdown" role="menu"><a role="menuitem" href="/makkah-office/">مكتب مكة المكرمة</a><a role="menuitem" href="/madina-office/">مكتب المدينة المنورة</a></div></details>`;

const privacyBody = `
<section class="info-hero"><div class="container"><span>الخصوصية أولاً</span><h1>سياسة الخصوصية</h1><p>توضح هذه الصفحة كيفية تعامل إطلالة للسفر والسياحة مع البيانات التي يقدمها زوار الموقع عند طلب خدمة أو حجز.</p></div></section>
<section class="info-section"><div class="container info-shell"><article class="info-card legal-copy">
<h2>خصوصية بيانات زوار إطلالة</h2>
<p>موقع إطلالة للسفر والسياحة متخصص في خدمات السفر وحجوزات الطيران والفنادق والخدمات السياحية. نحترم خصوصية زوار الموقع ونتعامل مع البيانات المقدمة بهدف تنفيذ الطلبات والخدمات المطلوبة.</p>
<ol class="legal-list">
<li><strong>البيانات المقدمة:</strong> نحافظ على المعلومات التي يسجلها العميل بإرادته داخل الموقع.</li>
<li><strong>إتمام الخدمة:</strong> عند طلب حجز فندق أو تذكرة أو أي خدمة، يلزم إدخال البيانات المطلوبة بصورة صحيحة حتى يمكن استكمال الطلب.</li>
<li><strong>محتوى الموقع:</strong> لا يسمح بطباعة أو توزيع محتوى الموقع بصورة غير قانونية.</li>
<li><strong>حقوق المحتوى:</strong> محتوى موقع إطلالة ومواده محفوظة الحقوق للجهة المالكة.</li>
<li><strong>استخدام الموقع:</strong> استخدام الموقع يتم على مسؤولية المستخدم، وعند وجود مشكلة أو حجز غير مرغوب فيه يجب التواصل مع خدمة عملاء إطلالة.</li>
<li><strong>حماية المعلومات:</strong> يتم الاحتفاظ ببيانات العملاء في بيئة مخصصة ولا تستخدم خارج غرض تقديم الخدمة.</li>
<li><strong>مشاركة البيانات لإتمام الحجز:</strong> قد يتم تزويد مزود الخدمة المعني بالبيانات اللازمة لإتمام الحجز، مثل شركة الطيران أو الفندق أو الجهة المنفذة للخدمة.</li>
<li><strong>صحة البيانات:</strong> العميل مسؤول عن صحة المعلومات التي يدخلها، ولا تتحمل الشركة مسؤولية النتائج الناتجة عن بيانات غير صحيحة.</li>
<li><strong>وثائق وتصاريح السفر:</strong> صلاحية جوازات ووثائق السفر وتصاريح الخروج والعودة والتأشيرات المطلوبة مسؤولية المسافر نفسه.</li>
</ol>
<div class="info-note">عند إرسال نموذج بالموقع، يتم استخدام بيانات التواصل للرد على طلبك ومتابعته مع فريق إطلالة.</div>
</article></div></section>`;

const termsBody = `
<section class="info-hero"><div class="container"><span>وضوح قبل الحجز</span><h1>الشروط والأحكام</h1><p>باستخدامك موقع etlaala.net أو طلب أي من خدمات إطلالة، فإنك تقر بالاطلاع على الشروط المنظمة للحجز والخدمات.</p></div></section>
<section class="info-section"><div class="container info-shell"><article class="info-card legal-copy">
<h2>1. قبول الشروط</h2><p>استخدام الموقع أو الاستفادة من خدماته، بما في ذلك قراءة المحتوى أو طلب الحجز، يعد موافقة على هذه الشروط والأحكام.</p>
<h2>2. حجز وتعديل وإلغاء رحلات الطيران</h2><p>تخضع التعديلات والإلغاءات لسياسة شركة الطيران ونوع التذكرة والدرجة المحجوزة. قد تترتب رسوم تعديل أو فروقات سعر، كما أن بعض الحجوزات تكون غير قابلة للاسترداد. وفي الحجوزات القابلة للاسترداد يتم تطبيق شروط شركة الطيران والغرامات إن وجدت.</p><p>حقوق المسافر المتعلقة بالتأخير والإلغاء والرفض على الرحلة تخضع للوائح الهيئة العامة للطيران المدني والسياسات المطبقة على الحجز.</p>
<h2>3. متطلبات الإقامة في الفنادق</h2><ul><li>قد تشترط المنشأة أن يكون صاحب الحجز المسؤول بالغاً.</li><li>يجب تقديم هوية أو جواز سفر ساري عند تسجيل الدخول بحسب سياسة الفندق.</li><li>يجب الاحتفاظ بتأكيد الحجز أو القسيمة الإلكترونية.</li><li>مواعيد الدخول والخروج وسياسات الإلغاء أو التعديل يحددها الفندق ونوع السعر المختار.</li></ul>
<h2>4. إلغاء الخدمات ضمن الباقات السياحية</h2><p>تخضع الخدمات الفردية داخل الباقة، مثل السيارة بسائق أو الجولات، لشروط المزود وموعد طلب الإلغاء. وقد تكون بعض الخدمات قابلة للاسترداد عند الإلغاء قبل مدة كافية وفق شروط الحجز المؤكد.</p>
<h2>5. طرق الدفع</h2><p>تتيح إطلالة وسائل دفع متعددة حسب المتاح، ومنها التحويل البنكي وبطاقات فيزا وماستركارد ومدى وخدمات الدفع الرقمية مثل Apple Pay وخيارات التقسيط المتاحة مثل تابي وتمارا.</p>
<h2>6. وثائق السفر</h2><p>يتحمل المسافر مسؤولية صلاحية جواز السفر ووثائق السفر والتصاريح والتأشيرات المطلوبة للوجهة وفق حالته.</p>
<h2>7. الملكية الفكرية</h2><p>النصوص والشعارات والصور والمواد المنشورة على الموقع مملوكة لإطلالة أو مستخدمة بموجب حقوق تسمح بعرضها، ولا يجوز نسخها أو إعادة استخدامها دون إذن.</p>
<h2>8. حدود المسؤولية</h2><p>تقدم الخدمات وفق تفاصيل الحجز المؤكد وسياسات مزودي الخدمة، ولا تتحمل إطلالة مسؤولية ما ينشأ عن معلومات غير صحيحة يقدمها العميل أو متطلبات سفر لم يستوفها.</p>
<h2>9. القانون الحاكم وحل النزاعات</h2><p>تخضع هذه الشروط للأنظمة المعمول بها في المملكة العربية السعودية، وتكون الجهات المختصة في المملكة مرجعاً في أي نزاع.</p>
<h2>10. تعديل الشروط</h2><p>يجوز تحديث هذه الشروط عند الحاجة، ويعد استمرار استخدام الموقع بعد نشر النسخة المحدثة قبولاً بها.</p>
<h2>11. الاستخدام المشروع</h2><p>يلتزم المستخدم باستخدام الموقع وخدماته بصورة نظامية وعدم استخدامه لأي غرض محظور أو غير قانوني.</p>
</article></div></section>`;

function branchBody({city, addressLines, mapUrl, intro}) {
  const address = addressLines.join('، ');
  return `
<section class="info-hero branch-hero"><div class="container"><span>فروع إطلالة</span><h1>مكتب إطلالة ${city}</h1><p>${intro}</p></div></section>
<section class="info-section"><div class="container branch-shell">
<article class="branch-card"><span class="branch-kicker">العنوان</span><h2>موقع مكتب إطلالة ${city}</h2><div class="branch-address">${addressLines.map(x=>`<p>${x}</p>`).join('')}</div><div class="branch-actions"><a class="gradient-btn" href="${mapUrl}" target="_blank" rel="noopener">فتح موقع الفرع</a><a class="ghost-link branch-call" data-track="call" href="tel:${PHONE_TEL}">اتصل ${PHONE_DISPLAY}</a></div></article>
<article class="branch-card branch-contact"><span class="branch-kicker">تواصل معنا</span><h2>فريق إطلالة جاهز لخدمتك</h2><p>للاستفسار عن البرامج السياحية أو الحجوزات أو متابعة طلب قائم، تواصل معنا مباشرة عبر واتساب أو الهاتف.</p><div class="branch-actions"><a class="gradient-btn" data-track="whatsapp" href="${wa(`مرحباً إطلالة، أريد التواصل مع مكتب ${city}`)}">واتساب</a><a class="ghost-link" href="mailto:info@etlaala.com">info@etlaala.com</a></div></article>
</div></section>
<section class="branch-summary"><div class="container"><div class="branch-summary-card"><strong>إطلالة للسفر والسياحة</strong><span>خدمات سفر وحجوزات وبرامج سياحية من داخل المملكة إلى أبرز الوجهات.</span></div></div></section>`;
}

const pages = [
  {slug:'privacy-policy', title:'سياسة الخصوصية | إطلالة للسفر والسياحة', desc:'سياسة الخصوصية الخاصة بموقع إطلالة للسفر والسياحة وكيفية التعامل مع بيانات العملاء وطلبات الحجز.', body:privacyBody},
  {slug:'terms-and-conditions', title:'الشروط والأحكام | إطلالة للسفر والسياحة', desc:'الشروط والأحكام المنظمة لاستخدام موقع إطلالة وخدمات حجز الطيران والفنادق والباقات السياحية.', body:termsBody},
  {slug:'makkah-office', title:'مكتب إطلالة مكة المكرمة | العنوان والتواصل', desc:'عنوان مكتب إطلالة للسفر والسياحة في مكة المكرمة وطرق التواصل وموقع الفرع.', body:branchBody({city:'مكة المكرمة',addressLines:['برج القمرية','العزيزية، مكة المكرمة','الدور الثالث','15, Al Jamiah, Makkah 24242, Saudi Arabia'],mapUrl:makkahMap,intro:'زورنا في مكتب مكة المكرمة أو تواصل معنا مباشرة لتخطيط رحلتك ومتابعة الحجوزات.'})},
  {slug:'madina-office', title:'مكتب إطلالة المدينة المنورة | العنوان والتواصل', desc:'عنوان مكتب إطلالة للسفر والسياحة في المدينة المنورة وطرق التواصل وموقع الفرع.', body:branchBody({city:'المدينة المنورة',addressLines:['شارع سلطانه العام','مجمع الابتسامة الأجمل','الدور السادس','مكتب رقم 1762'],mapUrl:madinaMap,intro:'تواصل مع مكتب إطلالة في المدينة المنورة لخدمات السفر والحجوزات والبرامج السياحية.'})}
];

function updateHead(html, page) {
  const canonical = `${SITE}/${page.slug}/`;
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${page.title}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*">/i, `<meta name="description" content="${page.desc}">`);
  html = html.replace(/<link rel="canonical" href="[^"]*">/i, `<link rel="canonical" href="${canonical}">`);
  html = html.replace(/<meta property="og:title" content="[^"]*">/i, `<meta property="og:title" content="${page.title}">`);
  html = html.replace(/<meta property="og:description" content="[^"]*">/i, `<meta property="og:description" content="${page.desc}">`);
  html = html.replace(/<meta property="og:url" content="[^"]*">/i, `<meta property="og:url" content="${canonical}">`);
  const schema = { '@context':'https://schema.org','@type':'WebPage',name:page.title,description:page.desc,url:canonical,inLanguage:'ar-SA',isPartOf:{'@type':'WebSite',name:'إطلالة للسفر والسياحة',url:SITE} };
  return html.replace('</head>', `<script type="application/ld+json">${JSON.stringify(schema)}</script></head>`);
}

let template = fs.readFileSync(templatePath, 'utf8');
template = template.replace(/https:\/\/etlaala\.com\/privacy-policy\//g, '/privacy-policy/').replace(/https:\/\/etlaala\.com\/terms-and-conditions\//g, '/terms-and-conditions/');

for (const page of pages) {
  let html = updateHead(template, page);
  html = html.replace(/<main id="main"[\s\S]*?<\/main>/i, `<main id="main" class="static-info-main">${page.body}</main>`);
  const dir = path.join(out, page.slug);
  fs.mkdirSync(dir, {recursive:true});
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

function htmlFiles(dir) {
  const files=[];
  for (const e of fs.readdirSync(dir,{withFileTypes:true})) {
    const full=path.join(dir,e.name);
    if(e.isDirectory()) files.push(...htmlFiles(full));
    else if(e.isFile()&&e.name.endsWith('.html')) files.push(full);
  }
  return files;
}

for (const file of htmlFiles(out)) {
  let html=fs.readFileSync(file,'utf8');
  html=html.replace(/https:\/\/etlaala\.com\/privacy-policy\//g,'/privacy-policy/').replace(/https:\/\/etlaala\.com\/terms-and-conditions\//g,'/terms-and-conditions/');
  if (!html.includes('class="branch-menu"') && html.includes('class="dest-menu"')) {
    html = html.replace(/(<details class="dest-menu">[\s\S]*?<\/details>)/, `$1${branchMenu}`);
  }
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
if(!css.includes('legal-branches-pages-v1')){
css += `
/* legal-branches-pages-v1 */
.navlinks>.branch-menu{position:relative;z-index:90;flex:0 0 auto;color:inherit;font:inherit}.navlinks>.branch-menu>summary{list-style:none;cursor:pointer;position:relative;padding:25px 0;color:inherit;font:inherit;background:none;border:0}.navlinks>.branch-menu>summary::-webkit-details-marker{display:none}.navlinks>.branch-menu>summary:after{content:"";position:absolute;right:0;left:0;bottom:18px;height:2px;background:var(--cyan);transform:scaleX(0);transition:transform .2s ease}.navlinks>.branch-menu>summary:hover:after,.navlinks>.branch-menu[open]>summary:after{transform:scaleX(1)}.branch-dropdown{position:absolute;top:calc(100% + 2px);right:50%;transform:translateX(50%);width:230px;padding:10px;display:grid;gap:7px;background:#fff;border:1px solid rgba(17,32,82,.1);border-radius:14px;box-shadow:0 20px 55px rgba(8,19,58,.2)}.branch-dropdown a{padding:10px 12px!important;border-radius:9px;color:#16214d!important;font-weight:700;background:#fff;border:1px solid #eef0f7}.branch-dropdown a:after{display:none!important}.branch-dropdown a:hover{background:#f6f7ff;color:#5526b7!important}.static-info-main{background:#f7f9fc}.info-hero{padding:64px 0 46px;background:linear-gradient(135deg,#eef5ff,#fff 56%,#fff4ed);text-align:right;border-bottom:1px solid #e8ecf5}.info-hero .container{max-width:1000px}.info-hero span,.branch-kicker{display:inline-block;color:#3e50d5;font-size:.82rem;font-weight:800;margin-bottom:8px}.info-hero h1{margin:0 0 12px;color:#142154;font-size:clamp(2rem,4vw,3.1rem);line-height:1.3}.info-hero p{max-width:760px;margin:0;color:#68718d;font-size:1rem;line-height:1.9}.info-section{padding:42px 0 64px}.info-shell{max-width:1000px}.info-card{background:#fff;border:1px solid #e5e9f2;border-radius:22px;box-shadow:0 14px 42px rgba(22,33,77,.06);padding:34px 38px}.legal-copy h2{font-size:1.2rem;color:#17245c;margin:28px 0 10px;line-height:1.5}.legal-copy h2:first-child{margin-top:0}.legal-copy p,.legal-copy li{color:#4f5873;font-size:.96rem;line-height:1.95}.legal-copy ul,.legal-copy ol{padding-right:24px}.legal-list{display:grid;gap:12px}.legal-list li{padding:14px 16px;background:#f9faff;border:1px solid #edf0f7;border-radius:14px}.legal-list strong{color:#1c2b68}.info-note{margin-top:24px;padding:16px 18px;border-radius:14px;background:#eef3ff;color:#30417e;font-weight:700;line-height:1.8}.branch-shell{max-width:1000px;display:grid;grid-template-columns:1.1fr .9fr;gap:20px}.branch-card{background:#fff;border:1px solid #e5e9f2;border-radius:22px;padding:30px;box-shadow:0 14px 42px rgba(22,33,77,.06)}.branch-card h2{margin:0 0 14px;color:#17245c;font-size:1.35rem}.branch-address p{margin:4px 0;color:#4f5873;line-height:1.75}.branch-contact>p{color:#5d657f;line-height:1.9}.branch-actions{display:flex;gap:12px;align-items:center;flex-wrap:wrap;margin-top:22px}.branch-actions .ghost-link{padding:10px 15px;border:1px solid #dfe4f2;border-radius:12px;text-decoration:none}.branch-summary{padding:0 0 64px}.branch-summary-card{max-width:1000px;margin:auto;background:linear-gradient(135deg,#17256a,#2c4bc4);color:#fff;border-radius:18px;padding:20px 24px;display:flex;justify-content:space-between;gap:18px;align-items:center}.branch-summary-card strong{font-size:1.1rem}.branch-summary-card span{color:rgba(255,255,255,.86);line-height:1.7}@media(max-width:900px){.branch-shell{grid-template-columns:1fr}.info-hero{padding:48px 0 34px}.info-card{padding:28px}.branch-summary-card{display:block}.branch-summary-card span{display:block;margin-top:6px}}@media(max-width:620px){.info-hero{padding:38px 0 28px}.info-section{padding:28px 0 44px}.info-card,.branch-card{padding:22px;border-radius:17px}.legal-copy h2{font-size:1.08rem}.legal-copy p,.legal-copy li{font-size:.91rem}.branch-actions{align-items:stretch}.branch-actions a{width:100%;text-align:center}}
`;
fs.writeFileSync(cssPath,css);
}

console.log('Created privacy, terms, Makkah and Madina pages; updated footer legal links and branch navigation.');
