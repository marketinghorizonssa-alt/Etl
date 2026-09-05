import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const SITE = 'https://etlaala.net';
const OLD = 'https://etlaala.com/wp-content/uploads';
const PHONE = '+966920029967';
const WA = '966125422331';
const favicon = `${OLD}/2024/07/Etlaala-150x150.webp`;
const appleIcon = `${OLD}/2024/04/cropped-logo-lookups-03-2-180x180.png`;

const heroes = {
  home: {
    desktop: `${OLD}/2024/03/pexels-margerretta-548077-scaled.jpg`,
    mobile: `${OLD}/2024/02/pexels-roman-odintsov-8180458-scaled.jpg`,
    alt: 'رحلات وتجارب سياحية مع إطلالة'
  },
  georgia: {
    desktop: `${OLD}/2024/02/pexels-roman-odintsov-8180458-scaled.jpg`,
    mobile: `${OLD}/2025/07/جورجيا-1-1.png`,
    alt: 'السياحة في جورجيا مع إطلالة'
  },
  malaysia: {
    desktop: `${OLD}/2024/02/pexels-tom-fisk-3733565.jpg`,
    mobile: `${OLD}/2025/06/ماليزيا.png-2-1.png`,
    alt: 'السياحة في ماليزيا مع إطلالة'
  },
  maldives: {
    desktop: `${OLD}/2024/02/pexels-asad-photo-maldives-3250613-scaled.jpg`,
    mobile: `${OLD}/2025/06/المالديف.webp`,
    alt: 'السياحة في المالديف وشهر العسل مع إطلالة'
  },
  thailand: {
    desktop: `${OLD}/2024/02/pexels-javon-swaby-2798256-scaled.jpg`,
    mobile: `${OLD}/2024/08/عروض-السفر-الى-تايلاند-من-السعودية-1.webp`,
    alt: 'السياحة في تايلاند مع إطلالة'
  },
  turkiye: {
    desktop: `${OLD}/2024/02/pexels-caner-cankisi-3999943.jpg`,
    mobile: `${OLD}/2024/02/pexels-caner-cankisi-3999943.jpg`,
    alt: 'السياحة في تركيا مع إطلالة'
  },
  bosnia: {
    desktop: `${OLD}/2024/03/pexels-hatice-baran-18037873-scaled.jpg`,
    mobile: `${OLD}/2025/06/3-3.webp`,
    alt: 'السياحة في البوسنة والهرسك مع إطلالة'
  },
  europe: {
    desktop: `${OLD}/2024/03/pexels-margerretta-548077-scaled.jpg`,
    mobile: `${OLD}/2024/03/pexels-margerretta-548077-scaled.jpg`,
    alt: 'رحلات أوروبا مع إطلالة'
  }
};

const slugHero = {
  'georgia': heroes.georgia,
  'georgia-2': heroes.georgia,
  'malaysia': heroes.malaysia,
  'malaysia-2': heroes.malaysia,
  'maldives': heroes.maldives,
  'maldives-2': heroes.maldives,
  'thailand': heroes.thailand,
  'thailand-2': heroes.thailand,
  'turkiye': heroes.turkiye,
  'turkey-2': heroes.turkiye,
  'bosnia-and-herzegovina': heroes.bosnia,
  'europe': heroes.europe
};

function files(dir) {
  const result = [];
  if (!fs.existsSync(dir)) return result;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) result.push(...files(p));
    else if (e.isFile() && e.name.endsWith('.html')) result.push(p);
  }
  return result;
}

function imageHead(html, asset) {
  html = html.replace(/<meta property="og:image" content="[^"]*">/i, `<meta property="og:image" content="${asset.desktop}">`);
  html = html.replace(/<link rel="preload" as="image" href="[^"]*">/i, `<link rel="preload" as="image" media="(min-width:641px)" href="${asset.desktop}"><link rel="preload" as="image" media="(max-width:640px)" href="${asset.mobile}">`);
  return html;
}

function faviconHead(html) {
  if (!html.includes('data-etlaala-favicon')) {
    html = html.replace('</head>', `<link data-etlaala-favicon rel="icon" type="image/webp" sizes="150x150" href="${favicon}"><link rel="apple-touch-icon" sizes="180x180" href="${appleIcon}"></head>`);
  }
  return html;
}

function heroPicture(asset, key) {
  return `<picture class="hero-picture" data-hero="${key}"><source media="(max-width:640px)" srcset="${asset.mobile}"><img class="hero-photo hero-${key}" src="${asset.desktop}" width="1920" height="900" fetchpriority="high" decoding="async" alt="${asset.alt}"></picture>`;
}

function patchHome(html) {
  const asset = heroes.home;
  html = html.replace(/<section class="home-hero"><picture>[\s\S]*?<\/picture>/, `<section class="home-hero">${heroPicture(asset, 'home')}`);
  return imageHead(html, asset);
}

function patchDestination(html, slug) {
  const asset = slugHero[slug];
  if (!asset) return html;
  html = html.replace(/<section class="destination-hero"><(?:picture[^>]*>[\s\S]*?<\/picture>|img class="hero-photo"[^>]*>)/, `<section class="destination-hero">${heroPicture(asset, slug)}`);
  return imageHead(html, asset);
}

function patchNav(html) {
  if (!html.includes('href="/about/"')) {
    html = html.replace('<nav class="navlinks" aria-label="التنقل الرئيسي"><a href="/">الرئيسية</a>', '<nav class="navlinks" aria-label="التنقل الرئيسي"><a href="/">الرئيسية</a><a href="/about/">من نحن</a>');
  }
  return html;
}

for (const file of files(out)) {
  let html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(out, file).replace(/\\/g, '/');
  if (rel === 'index.html') html = patchHome(html);
  else {
    const slug = rel.split('/')[0];
    if (slugHero[slug]) html = patchDestination(html, slug);
  }
  html = patchNav(faviconHead(html));
  fs.writeFileSync(file, html);
}

// Build a refreshed About page from the already-polished site shell so header/footer/floating CTAs stay identical.
const homePath = path.join(out, 'index.html');
let shell = fs.readFileSync(homePath, 'utf8');
const aboutHero = `${OLD}/2024/08/شركة-إطلالة-للسفر-والسياحةة.webp`;
const aboutBody = `<main id="main"><section class="about-hero"><div class="container about-hero-grid"><div class="about-hero-copy"><span class="kicker">من نحن</span><h1>إطلالة للسفر والسياحة</h1><p>شركة سعودية متخصصة في صناعة تجارب السفر، نساعد المسافر على الانتقال من فكرة الرحلة إلى حجز مرتب وواضح، للرحلات المحلية والدولية.</p><div class="hero-actions"><a class="gradient-btn" data-track="whatsapp" href="https://api.whatsapp.com/send?phone=${WA}&text=${encodeURIComponent('مرحباً إطلالة، أريد التحدث مع مستشار سياحي')}">تحدث مع مستشار</a><a class="ghost-btn" data-track="call" href="tel:${PHONE}">اتصل بنا</a></div></div><figure class="about-hero-media"><img src="${aboutHero}" width="760" height="760" fetchpriority="high" alt="شركة إطلالة للسفر والسياحة"></figure></div></section><section class="section about-intro"><div class="container about-intro-grid"><div><span class="mini-title">رحلتك تبدأ من فهم احتياجك</span><h2>تجربة سفر أسهل من أول استفسار حتى تفاصيل الرحلة</h2></div><div><p>تأسست إطلالة للسفر والسياحة في المملكة العربية السعودية بهدف تقديم تجربة سفر متميزة وتسهيل الحجز للرحلات المحلية والدولية. نعمل عبر قنوات متعددة، ونطوّر خدماتنا وعروضنا باستمرار وفق احتياجات المسافرين.</p><p>هدفنا أن يجد العميل خيارات واضحة، خدمة سريعة، وبرنامجًا يناسب نوع الرحلة والميزانية؛ سواء كانت رحلة عائلية، شهر عسل، كروز أو إجازة خاصة.</p></div></div></section><section class="section soft"><div class="container"><div class="section-heading"><span>رؤيتنا ورسالتنا</span><h2>نسافر معك بفكرة واضحة وخدمة تستحق الثقة</h2></div><div class="about-values"><article><span>01</span><h3>رؤيتنا</h3><p>أن نكون من الخيارات المفضلة للمسافرين في المملكة ودول الخليج عبر خدمات سفر متنوعة وتجربة حجز واضحة ومتطورة.</p></article><article><span>02</span><h3>رسالتنا</h3><p>تقديم تجربة سفر تتجاوز التوقعات عبر تطوير المنتجات، فهم احتياجات المسافر، وتقديم حلول مناسبة لكل رحلة.</p></article><article><span>03</span><h3>أسلوبنا</h3><p>نبدأ بالاستماع، نقارن الخيارات، نرتب التفاصيل، ثم نتابع مع العميل حتى تصبح الرحلة أسهل وأكثر راحة.</p></article></div></div></section><section class="section"><div class="container"><div class="section-heading"><span>خدمات إطلالة</span><h2>كل ما تحتاجه في مكان واحد</h2></div><div class="about-services"><article><h3>تذاكر الطيران</h3><p>خيارات للرحلات المحلية والدولية وفق خطة السفر.</p></article><article><h3>حجز الفنادق</h3><p>فنادق ومنتجعات بمستويات متنوعة للعائلات والأزواج.</p></article><article><h3>التأشيرات</h3><p>مساعدة في إجراءات التأشيرات للوجهات المتاحة.</p></article><article><h3>الاستقبال والتوديع</h3><p>تنظيم الانتقالات من وإلى المطار حسب البرنامج.</p></article><article><h3>الكروز وشهر العسل</h3><p>رحلات وتجارب مصممة للمناسبات والرحلات الخاصة.</p></article><article><h3>الدفع بالتقسيط</h3><p>خيارات دفع مرنة للبرامج السياحية وفق الشروط المتاحة.</p></article></div></div></section><section class="section about-trust"><div class="container about-trust-grid"><div><span class="mini-title">شركة مرخصة</span><h2>بيانات واضحة وثقة قبل الحجز</h2><p>إطلالة للسفر والسياحة تعمل ضمن نشاط سياحي مرخص في المملكة العربية السعودية.</p></div><div class="license-list"><div><span>ترخيص وزارة السياحة</span><strong>73104738</strong></div><div><span>السجل التجاري</span><strong>4031293290</strong></div><div><span>رقم المنشأة الموحد</span><strong>7037638678</strong></div></div></div></section><section class="section about-cta"><div class="container"><div><span>خطتك جاهزة تبدأ؟</span><h2>خلّ مستشار إطلالة يرتب لك الخيارات المناسبة</h2></div><a class="gradient-btn" data-track="whatsapp" href="https://api.whatsapp.com/send?phone=${WA}&text=${encodeURIComponent('مرحباً إطلالة، أريد تخطيط رحلة')}">ابدأ التخطيط</a></div></section></main>`;

shell = shell.replace(/<title>[\s\S]*?<\/title>/, '<title>من نحن | إطلالة للسفر والسياحة</title>')
  .replace(/<meta name="description" content="[^"]*">/, '<meta name="description" content="تعرف على إطلالة للسفر والسياحة، رؤيتنا ورسالتنا وخدماتنا في تنظيم الرحلات والطيران والفنادق والتأشيرات والكروز وشهر العسل.">')
  .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${SITE}/about/">`)
  .replace(/<meta property="og:title" content="[^"]*">/, '<meta property="og:title" content="من نحن | إطلالة للسفر والسياحة">')
  .replace(/<meta property="og:description" content="[^"]*">/, '<meta property="og:description" content="تعرف على إطلالة للسفر والسياحة ورؤيتنا ورسالتنا وخدماتنا.">')
  .replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${SITE}/about/">`)
  .replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${aboutHero}">`)
  .replace(/<link rel="preload" as="image"[^>]*>/g, '')
  .replace(/<body data-destination="[^"]*">/, '<body data-destination="من نحن">')
  .replace(/<main id="main">[\s\S]*?<\/main>/, aboutBody);
shell = patchNav(faviconHead(shell));
const aboutDir = path.join(out, 'about');
fs.mkdirSync(aboutDir, { recursive: true });
fs.writeFileSync(path.join(aboutDir, 'index.html'), shell);

const sitemap = path.join(out, 'sitemap.xml');
if (fs.existsSync(sitemap)) {
  let xml = fs.readFileSync(sitemap, 'utf8');
  if (!xml.includes(`${SITE}/about/`)) xml = xml.replace('</urlset>', `<url><loc>${SITE}/about/</loc></urlset>`);
  fs.writeFileSync(sitemap, xml);
}

const cssPath = path.join(out, 'assets', 'styles.css');
let css = fs.readFileSync(cssPath, 'utf8');
if (!css.includes('brand-refresh-v1')) {
  css += `\n/* brand-refresh-v1 */\n.hero-picture{display:contents}.about-hero{background:linear-gradient(135deg,#121d61 0%,#243c9c 48%,#6d22b7 100%);color:#fff;overflow:hidden;position:relative}.about-hero:after{content:"";position:absolute;inset:auto 0 0;height:6px;background:var(--gradient)}.about-hero-grid{min-height:570px;display:grid;grid-template-columns:1.05fr .95fr;gap:54px;align-items:center}.about-hero-copy h1{font-size:clamp(42px,5vw,68px);line-height:1.25;margin:17px 0 16px}.about-hero-copy p{max-width:680px;color:rgba(255,255,255,.92);font-size:17px}.about-hero-media{margin:0;justify-self:end;width:min(470px,100%);aspect-ratio:1;border-radius:36% 64% 54% 46% / 46% 42% 58% 54%;overflow:hidden;border:8px solid rgba(255,255,255,.12);box-shadow:0 28px 70px rgba(5,10,45,.28)}.about-hero-media img{width:100%;height:100%;object-fit:cover}.about-intro-grid{display:grid;grid-template-columns:.9fr 1.1fr;gap:60px;align-items:start}.about-intro h2,.about-trust h2{color:#17286e;font-size:clamp(28px,3.4vw,42px);line-height:1.5;margin:12px 0}.about-intro p{color:#626a82;margin:0 0 14px}.about-values{display:grid;grid-template-columns:repeat(3,1fr);gap:18px}.about-values article{background:#fff;border:1px solid var(--line);border-radius:22px;padding:26px;box-shadow:0 12px 34px rgba(32,45,120,.06)}.about-values article>span{font-size:12px;font-weight:900;color:var(--orange)}.about-values h3{color:#17286e;font-size:20px;margin:8px 0}.about-values p{color:#686f84;font-size:13px;margin:0}.about-services{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}.about-services article{border:1px solid var(--line);border-radius:18px;padding:21px;background:linear-gradient(180deg,#fff,#fbfcff)}.about-services h3{color:#1b2c75;margin:0 0 6px;font-size:16px}.about-services p{color:#697087;font-size:12px;margin:0}.about-trust{background:#f6f8ff}.about-trust-grid{display:grid;grid-template-columns:1fr 1fr;gap:48px;align-items:center}.license-list{display:grid;gap:10px}.license-list>div{display:flex;justify-content:space-between;align-items:center;gap:20px;padding:15px 18px;border:1px solid #e1e6f5;border-radius:14px;background:#fff}.license-list span{color:#606a84;font-size:12px}.license-list strong{color:#17286e;font-size:16px}.about-cta{padding-top:55px;padding-bottom:55px}.about-cta .container{border-radius:24px;background:linear-gradient(135deg,#152b82,#6d22b7 58%,#f15a29);color:#fff;padding:30px 34px;display:flex;align-items:center;justify-content:space-between;gap:30px}.about-cta span{font-size:13px;font-weight:800;opacity:.85}.about-cta h2{margin:6px 0 0;font-size:clamp(22px,3vw,32px)}.about-cta .gradient-btn{background:#fff;color:#23317f;box-shadow:none;white-space:nowrap}@media(max-width:850px){.about-hero-grid,.about-intro-grid,.about-trust-grid{grid-template-columns:1fr}.about-hero-grid{padding:54px 0;gap:30px}.about-hero-media{justify-self:center;width:min(390px,85%)}.about-values,.about-services{grid-template-columns:1fr 1fr}.about-cta .container{align-items:flex-start;flex-direction:column}}@media(max-width:640px){.home-hero .hero-home{object-position:center 48%}.destination-hero .hero-georgia,.destination-hero .hero-georgia-2{object-position:center 55%}.destination-hero .hero-malaysia,.destination-hero .hero-malaysia-2{object-position:center 52%}.destination-hero .hero-maldives,.destination-hero .hero-maldives-2{object-position:center 55%}.destination-hero .hero-thailand,.destination-hero .hero-thailand-2{object-position:center 52%}.destination-hero .hero-turkiye,.destination-hero .hero-turkey-2{object-position:center 50%}.destination-hero .hero-bosnia-and-herzegovina,.destination-hero .hero-europe{object-position:center 52%}.about-hero-grid{min-height:auto;padding:44px 0}.about-hero-copy h1{font-size:37px}.about-hero-copy p{font-size:13px;line-height:1.9}.about-hero-media{width:82%;border-width:5px}.about-values,.about-services{grid-template-columns:1fr}.about-intro-grid,.about-trust-grid{gap:24px}.license-list>div{align-items:flex-start;flex-direction:column;gap:2px}.about-cta .container{padding:24px}.about-cta .gradient-btn{width:100%}}\n`;
  fs.writeFileSync(cssPath, css);
}

console.log('Brand refresh applied: new responsive heroes, About page, nav link, sitemap entry and favicon.');
