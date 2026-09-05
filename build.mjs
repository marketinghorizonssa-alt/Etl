import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const out = path.join(__dirname, "dist");
const publicDir = path.join(__dirname, "public");
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });
fs.cpSync(publicDir, path.join(out, "assets"), { recursive: true });

const SITE = "https://etlaala.net";
const OLD_MEDIA = "https://etlaala.com/wp-content/uploads";
const GTM_ID = "GTM-MSF3NWFN";
const PHONE_DISPLAY = "920029967";
const PHONE_TEL = "+966920029967";
const WHATSAPP = "966125422331";
const BUILD_DATE = "2026-09-05";
const LOGO = `${OLD_MEDIA}/2024/03/Etlala-logo-Ar-01-01.png`;
const h = (s="") => String(s).replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));

const destinationCards = [
  ["georgia","جورجيا","ابتداءً من 2200 ر.س",`${OLD_MEDIA}/2024/02/pexels-roman-odintsov-8180458-scaled.jpg`],
  ["malaysia","ماليزيا","ابتداءً من 3500 ر.س",`${OLD_MEDIA}/2024/02/pexels-tom-fisk-3733565.jpg`],
  ["maldives","المالديف","ابتداءً من 8500 ر.س",`${OLD_MEDIA}/2024/02/pexels-asad-photo-maldives-3250613-scaled.jpg`],
  ["thailand","تايلاند","ابتداءً من 4200 ر.س",`${OLD_MEDIA}/2024/02/pexels-javon-swaby-2798256-scaled.jpg`],
  ["turkiye","تركيا","ابتداءً من 3274 ر.س",`${OLD_MEDIA}/2024/02/pexels-caner-cankisi-3999943.jpg`],
  ["bosnia-and-herzegovina","البوسنة والهرسك","ابتداءً من 3422 ر.س",`${OLD_MEDIA}/2024/03/pexels-hatice-baran-18037873-scaled.jpg`],
  ["europe","رحلات أوروبا","ابتداءً من 14266 ر.س",`${OLD_MEDIA}/2024/03/pexels-margerretta-548077-scaled.jpg`],
  ["maldives-2","شهر العسل","برامج خاصة للأزواج",`${OLD_MEDIA}/2025/06/المالديف.webp`]
];

const sharedAdvantages = [
  ["✈","برامج سياحية متكاملة","نرتب تفاصيل الرحلة من الإقامة والانتقالات والجولات حسب خطتك."],
  ["★","إقامة في أفضل المنتجعات","خيارات مختارة بمستويات متنوعة تناسب الميزانية ونمط الرحلة."],
  ["♡","خدمات مخصصة للأزواج","برامج شهر عسل وتجارب خاصة مصممة للأزواج."],
  ["⌂","برامج للعائلات","خطط مرنة تراعي الأطفال وعدد المسافرين واحتياجات الأسرة."],
  ["◎","مرشدون سياحيون محترفون","مساعدة وتنظيم في الوجهة لتجربة أسهل وأكثر راحة."],
  ["◆","تنظيم رحلات خاصة","يمكن تخصيص المدن والمدة والفنادق والأنشطة حسب الطلب."],
  ["₿","خطط دفع مرنة","خيارات دفع وتقسيط متاحة بحسب العرض وشروط الحجز."],
  ["24","دعم مع مستشار","مستشار سياحي يتابع معك قبل الحجز وحتى تفاصيل الرحلة."]
];

const pages = {
  "georgia": {
    dest:"جورجيا", mode:"long", hero:`${OLD_MEDIA}/2025/02/Untitled-design-29.webp`,
    title:"السياحة في جورجيا 2026 | عروض وبرامج جورجيا | إطلالة", desc:"اكتشف برامج وعروض السياحة في جورجيا مع إطلالة للسفر والسياحة، فنادق وانتقالات وجولات وخيارات للعائلات والأزواج.",
    h1:"اكتشف سحر جورجيا", lead:"حيث يلتقي الجمال بالتاريخ مع إطلالة للسفر والسياحة، عِش تجربة مميزة بين الطبيعة الخلابة والمعالم التاريخية العريقة، واستمتع بإقامة فاخرة وجولات ساحرة بين الجبال الخضراء والشلالات المذهلة.",
    sub:"مميزات إطلالة للسفر والسياحة في رحلات جورجيا"
  },
  "malaysia": {
    dest:"ماليزيا", mode:"long", hero:`${OLD_MEDIA}/2025/02/Untitled-design-31.png`,
    title:"السياحة في ماليزيا 2026 | برامج وعروض ماليزيا | إطلالة", desc:"برامج السياحة في ماليزيا مع إطلالة: فنادق وانتقالات وتجارب للعائلات والأزواج وخطط سفر مرنة.",
    h1:"اكتشف سحر ماليزيا", lead:"حيث يلتقي الجمال بالمغامرة! مع إطلالة للسفر والسياحة، اجعل رحلتك تجربة مميزة واستمتع بإقامة فاخرة بين أحضان الطبيعة الخلابة، وغابات ساحرة، وأماكن تأسر القلوب وتجارب تجمع بين الفخامة والإثارة.",
    sub:"مميزات إطلالة للسفر والسياحة في رحلات ماليزيا"
  },
  "maldives": {
    dest:"المالديف", mode:"long", hero:`${OLD_MEDIA}/2025/02/Untitled-design-30.webp`,
    title:"السياحة في المالديف 2026 | منتجعات وشهر عسل | إطلالة", desc:"خطط لرحلة المالديف مع إطلالة: منتجعات وفلل وشهر عسل وانتقالات وخيارات فاخرة من السعودية.",
    h1:"اكتشف روعة المالديف", lead:"حيث يبدأ السحر ولا ينتهي. مع إطلالة للسفر والسياحة، اجعل أحلامك حقيقة واستمتع بإقامة فاخرة وسط الطبيعة الساحرة، وشواطئ تخطف الأنفاس، وتجارب تجمع بين الفخامة والسحر لتبقى معك مدى الحياة.",
    sub:"مميزات إطلالة للسفر والسياحة في رحلات المالديف"
  },
  "thailand": {
    dest:"تايلاند", mode:"long", hero:`${OLD_MEDIA}/2025/02/Untitled-design-22.webp`,
    title:"السياحة في تايلاند 2026 | برامج بانكوك وبوكيت | إطلالة", desc:"اكتشف برامج وعروض تايلاند من السعودية مع إطلالة، بانكوك وبوكيت وكرابي وفنادق وانتقالات وتجارب متنوعة.",
    h1:"اكتشف سحر تايلاند", lead:"حيث المغامرة والاسترخاء يلتقيان. مع إطلالة للسفر والسياحة، انغمس في عالم من الجمال والطبيعة الخلابة، واستمتع بشواطئ ذهبية ساحرة وإقامة فاخرة وتجارب تمتزج فيها الثقافة العريقة مع أجواء الاستجمام.",
    sub:"مميزات إطلالة للسفر والسياحة في رحلات تايلاند"
  },
  "turkiye": {
    dest:"تركيا", mode:"long", hero:`${OLD_MEDIA}/2025/02/Untitled-design-33.webp`,
    title:"السياحة في تركيا 2026 | إسطنبول وطرابزون | إطلالة", desc:"برامج وعروض تركيا من السعودية مع إطلالة تشمل الفنادق والانتقالات والجولات وخيارات إسطنبول وطرابزون.",
    h1:"اكتشف سحر تركيا", lead:"حيث يلتقي التاريخ بالجمال بلا حدود! مع إطلالة للسفر والسياحة، اجعل رحلتك حماسية ومميزة واستمتع بإقامة فاخرة بين المعالم التاريخية الخالدة والطبيعة الساحرة وشواطئ الفيروز.",
    sub:"مميزات إطلالة للسفر والسياحة في رحلات تركيا"
  },
  "bosnia-and-herzegovina": {
    dest:"البوسنة والهرسك", mode:"long", hero:`${OLD_MEDIA}/2025/06/3-3.webp`,
    title:"السياحة في البوسنة والهرسك 2026 | عروض وبرامج | إطلالة", desc:"برامج البوسنة والهرسك للسعوديين مع إطلالة تشمل الإقامة والانتقالات والطبيعة وسراييفو، وبدون تأشيرة للسعوديين وفق المتطلبات السارية.",
    h1:"اكتشف سحر البوسنة والهرسك", lead:"حيث يندمج التاريخ المميز مع روعة الأجواء. مع إطلالة للسفر والسياحة، اجعل رحلتك إلى البوسنة مثالية، وتجول بين المعالم الأيقونية واستمتع بالطبيعة الساحرة واسترخِ في فنادق تمنحك الراحة والرفاهية.",
    sub:"مميزات إطلالة للسفر والسياحة في رحلات البوسنة والهرسك"
  },
  "georgia-2": {
    dest:"جورجيا", mode:"offer", hero:`${OLD_MEDIA}/2025/07/جورجيا-1-1.png`,
    title:"عروض جورجيا 2026 | بكجات جورجيا من السعودية | إطلالة", desc:"عروض وبكجات جورجيا من السعودية مع إطلالة: فنادق وانتقالات وبرامج مخصصة للعائلات والأزواج.",
    h1:"اكتشف سحر جورجيا... مع إطلالة", lead:"ودك تعيش مغامرة بطابع أوروبي وجو ما تلقاه إلا في جورجيا؟ من تبليسي القديمة لجبال القوقاز الساحرة، نرتب لك برنامجًا يناسب مدة الرحلة والميزانية.",
    slides:[`${OLD_MEDIA}/2025/06/white-concrete-houses-scaled.webp`,`${OLD_MEDIA}/2025/06/indian-city-buildings-scene-scaled.webp`]
  },
  "malaysia-2": {
    dest:"ماليزيا", mode:"offer", hero:`${OLD_MEDIA}/2025/06/ماليزيا.png-2-1.png`,
    title:"عروض ماليزيا 2026 | بكجات ماليزيا من السعودية | إطلالة", desc:"عروض ماليزيا وبكجات سياحية من السعودية تشمل الفنادق والانتقالات وبرامج مرنة مع إطلالة.",
    h1:"السياحة في ماليزيا... مع إطلالة", lead:"اجعل رحلتك مميزة واستمتع بإقامة فاخرة بين الطبيعة الاستوائية والمدن النابضة، مع برنامج مرتب ومخصص لعدد المسافرين وتواريخ الرحلة.",
    slides:[`${OLD_MEDIA}/2025/06/view-world-monument-celebrate-world-heritage-day-scaled.jpg`,`${OLD_MEDIA}/2025/06/beautiful-city-chongqing-scaled.jpg`]
  },
  "maldives-2": {
    dest:"المالديف", mode:"offer", hero:`${OLD_MEDIA}/2025/06/المالديف.webp`,
    title:"عروض المالديف 2026 | بكجات شهر العسل | إطلالة", desc:"عروض المالديف وشهر العسل مع إطلالة، منتجعات وفلل وانتقالات وخيارات تناسب الأزواج والعائلات.",
    h1:"السياحة في المالديف... الوجهة المثالية", lead:"تستمتع بأجواء المالديف الفاخرة والرومانسية في رحلة أحلام مصممة حسب ميزانيتك، مع خيارات منتجعات وفلل وخطط وجبات وانتقالات.",
    slides:[`${OLD_MEDIA}/2025/06/maldives-island-scaled.webp`,`${OLD_MEDIA}/2025/06/empty-hammock-swing-around-beach-sea-ocean-with-white-cloud-blue-sky-travel-vacation-scaled.webp`]
  },
  "thailand-2": {
    dest:"تايلاند", mode:"offer", hero:`${OLD_MEDIA}/2025/06/تايلاند-1.webp`,
    title:"عروض تايلاند 2026 | بكجات بانكوك وبوكيت | إطلالة", desc:"عروض السفر إلى تايلاند من السعودية مع إطلالة: بانكوك وبوكيت وكرابي، فنادق وانتقالات وبرامج عائلية.",
    h1:"جرب عجائب تايلاند", lead:"رحلة تجمع بين الثقافة والهدوء، وبين المدن والجزر. نرتب لك عدد الليالي والمدن والفنادق والانتقالات في برنامج واضح ومريح.",
    slides:[`${OLD_MEDIA}/2025/06/wat-arun-temple-twilight-bangkok-thailand-1-scaled.webp`,`${OLD_MEDIA}/2025/06/beautiful-mountains-ratchaprapha-dam-khao-sok-national-park-surat-thani-province-thailand-scaled.webp`]
  },
  "turkey-2": {
    dest:"تركيا", mode:"offer", hero:`${OLD_MEDIA}/2025/06/تركيا.webp`,
    title:"عروض تركيا 2026 | بكجات تركيا من السعودية | إطلالة", desc:"عروض وبكجات تركيا من السعودية تشمل الفنادق والانتقالات والجولات وبرامج إسطنبول وطرابزون مع إطلالة.",
    h1:"اكتشف سحر تركيا... مع إطلالة", lead:"رحلة تجمع بين التاريخ والطبيعة. استمتع بإقامة فاخرة وخدمة تليق فيك، وأرسل لنا تاريخ السفر وعدد المسافرين لنرتب البكج المناسب.",
    slides:[`${OLD_MEDIA}/2025/06/goreme-town-twilight-cappadocia-turkey-scaled.webp`,`${OLD_MEDIA}/2025/06/aerial-drone-panoramic-view-istanbul-sunset-turkey-scaled.webp`]
  },
  "europe": {
    dest:"أوروبا", mode:"offer", hero:`${OLD_MEDIA}/2026/06/Gemini_Generated_Image_yd0fcsyd0fcsyd0f-scaled.png`,
    title:"عروض أوروبا 2026 | سويسرا وإيطاليا والنمسا | إطلالة", desc:"رحلات أوروبا المصممة للمسافر من السعودية مع إطلالة، سويسرا وإيطاليا والنمسا وتنظيم التنقلات والفنادق.",
    h1:"عش سحر أوروبا", lead:"مع إطلالة.. استكشف سحر سويسرا، إيطاليا، والنمسا في رحلة مصممة خصيصًا للمسافر الباحث عن الرفاهية والخصوصية. نحن نتولى تعقيدات التنقل بين الدول الأوروبية لتستمتع برحلتك.",
    slides:[`${OLD_MEDIA}/2026/06/mixboard-image-2.png`,`${OLD_MEDIA}/2026/06/mixboard-image-3.png`,`${OLD_MEDIA}/2026/06/mixboard-image.png`]
  }
};

function gtmHead(){return `<!-- Google Tag Manager --><script>(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');</script><!-- End Google Tag Manager -->`;}
function wa(text){return `https://api.whatsapp.com/send?phone=${WHATSAPP}&text=${encodeURIComponent(text)}`;}
function header(){return `<div class="brand-strip"><div class="container"><span>إطلالة عالم تستحق أن تعيشه</span><div><a data-track="call" href="tel:${PHONE_TEL}">☎ ${PHONE_DISPLAY}</a><span class="dot">•</span><a data-track="whatsapp" href="${wa('مرحباً إطلالة، أريد الاستفسار عن عروض السفر')}">واتساب</a></div></div></div><header class="site-header"><div class="container nav"><a class="brand" href="/" aria-label="إطلالة للسفر والسياحة - الرئيسية"><img src="${LOGO}" width="220" height="74" alt="إطلالة للسفر والسياحة" fetchpriority="high"><span class="brand-fallback">إطلالة</span></a><nav class="navlinks" aria-label="التنقل الرئيسي"><a href="/">الرئيسية</a><a href="/#destinations">عروض سياحية 2026</a><a href="/#services">الخدمات</a><a href="/#why">لماذا إطلالة؟</a><a href="/#contact">تواصل معنا</a></nav><a class="header-cta" data-track="whatsapp" href="${wa('مرحباً إطلالة، أريد حجز رحلة')}">احجز الآن</a></div></header>`;}
function footer(){return `<footer class="footer" id="contact"><div class="container footer-grid"><div><img class="footer-logo" src="${LOGO}" width="210" height="70" loading="lazy" alt="إطلالة للسفر والسياحة"><p>إطلالة عالم تستحق أن تعيشه. برامج سياحية وحجوزات مصممة للمسافر من السعودية إلى أبرز الوجهات العالمية.</p></div><div><h3>روابط سريعة</h3><a href="/#destinations">الوجهات والعروض</a><a href="/#services">خدمات إطلالة</a><a href="/#why">لماذا إطلالة؟</a></div><div><h3>تواصل معنا</h3><a data-track="call" href="tel:${PHONE_TEL}">${PHONE_DISPLAY}</a><a data-track="whatsapp" href="${wa('مرحباً إطلالة، أريد الاستفسار')}">واتساب</a><span>ترخيص وزارة السياحة: 73104738</span></div><div><h3>وجهات مميزة</h3><a href="/georgia/">جورجيا</a><a href="/malaysia/">ماليزيا</a><a href="/maldives/">المالديف</a><a href="/turkiye/">تركيا</a><a href="/europe/">أوروبا</a></div></div><div class="container copyright">© ${new Date().getFullYear()} إطلالة للسفر والسياحة. جميع الحقوق محفوظة.</div></footer><div class="mobile-bar" aria-label="تواصل سريع"><a class="mobile-call" data-track="call" href="tel:${PHONE_TEL}">اتصال</a><a class="mobile-wa" data-track="whatsapp" href="${wa('مرحباً إطلالة، أريد عرضاً سياحياً')}">واتساب</a></div>`;}
function quickForm(dest="رحلة سياحية", compact=false){return `<form class="lead-form ${compact?'compact':''}" data-lead-form id="quote"><div class="form-head"><span>اطلب عرضك</span><h2>${dest==='رحلة سياحية'?'خطط رحلتك مع مستشارك السياحي':`تحدث الآن مع مستشارك السياحي المتخصص في ${h(dest)}`}</h2><p>أرسل البيانات الأساسية وسنكمل معك التفاصيل على واتساب.</p></div><div class="form-grid"><label>الاسم<input name="name" autocomplete="name" required placeholder="الاسم"></label><label>رقم الجوال<input name="phone" type="tel" inputmode="tel" autocomplete="tel" required placeholder="05xxxxxxxx"></label><label>عدد المسافرين<select name="travelers"><option value="">اختر</option><option>1-2</option><option>3-4</option><option>5-6</option><option>7+</option></select></label><label>تاريخ السفر<input name="travel_date" type="date"></label></div><label>ملاحظات<textarea name="notes" placeholder="المدة، المدن، الميزانية أو أي تفاصيل مهمة"></textarea></label><button type="submit" class="gradient-btn">إرسال الطلب</button><div class="status" role="status" aria-live="polite"></div></form>`;}
function head({title,desc,canonical,hero}){const agency={"@context":"https://schema.org","@type":"TravelAgency",name:"إطلالة للسفر والسياحة",url:SITE,telephone:PHONE_TEL,address:{"@type":"PostalAddress",addressCountry:"SA"}};return `<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${h(title)}</title><meta name="description" content="${h(desc)}"><meta name="robots" content="index,follow,max-image-preview:large"><link rel="canonical" href="${canonical}"><meta name="theme-color" content="#1335AE"><meta property="og:type" content="website"><meta property="og:locale" content="ar_SA"><meta property="og:site_name" content="إطلالة للسفر والسياحة"><meta property="og:title" content="${h(title)}"><meta property="og:description" content="${h(desc)}"><meta property="og:url" content="${canonical}">${hero?`<meta property="og:image" content="${hero}"><link rel="preload" as="image" href="${hero}">`:''}<link rel="preconnect" href="https://etlaala.com" crossorigin><link rel="stylesheet" href="/assets/styles.css">${gtmHead()}<script type="application/ld+json">${JSON.stringify(agency)}</script></head>`;}
function shell(body, meta, dest="general"){return `<!doctype html><html lang="ar" dir="rtl">${head(meta)}<body data-destination="${h(dest)}"><noscript><iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript><a class="skip" href="#main">تجاوز إلى المحتوى</a>${header()}<main id="main">${body}</main>${footer()}<script src="/assets/main.js" defer></script></body></html>`;}

function home(){const hero=`${OLD_MEDIA}/2026/06/web-cover-scaled.png`, mobile=`${OLD_MEDIA}/2025/12/web-mobile-cover-2_1_optimized.png`;const cards=destinationCards.map(([slug,name,price,img])=>`<a class="destination-card" href="/${slug}/"><img src="${img}" loading="lazy" width="540" height="420" alt="${h(name)}"><span class="shade"></span><div><strong>${h(name)}</strong><small>${h(price)}</small><span class="discover">اكتشف الرحلة ←</span></div></a>`).join('');const services=[["✈","تذاكر الطيران","خيارات طيران تناسب خطتك وميزانيتك."],["▣","الفنادق","حجوزات فنادق ومنتجعات في أبرز الوجهات."],["♡","الكروز وشهر العسل","تجارب خاصة للأزواج ورحلات المناسبات."],["◈","التقسيط","خطط دفع مرنة وفق العروض المتاحة."]].map(([i,t,d])=>`<article class="service-card"><span>${i}</span><h3>${t}</h3><p>${d}</p></article>`).join('');const body=`<section class="home-hero"><picture><source media="(max-width:640px)" srcset="${mobile}"><img class="hero-photo" src="${hero}" width="1920" height="900" fetchpriority="high" alt="إطلالة للسفر والسياحة"></picture><div class="hero-overlay"></div><div class="container home-hero-content"><span class="kicker">إطلالة عالم تستحق أن تعيشه</span><h1>اطلالتك على العالم<br><em>رفيق رحلتك.. دليلك للعالم</em></h1><p>الصيف هو الأجمل. اكتشف مغامرات تصنع الحكايات، وبرامج سياحية مرتبة من البداية حتى العودة.</p><div class="hero-actions"><a class="gradient-btn" href="#destinations">البرامج السياحية</a><a class="ghost-btn" data-track="whatsapp" href="${wa('مرحباً إطلالة، أريد معرفة أفضل عروض السفر الحالية')}">احجز عبر واتساب</a></div></div></section><section class="trust-ribbon"><div class="container"><div><strong>خبرة واسعة</strong><span>في تنظيم الرحلات</span></div><div><strong>أفضل الخيارات</strong><span>فنادق وبرامج متنوعة</span></div><div><strong>دعم مع مستشار</strong><span>قبل وأثناء الرحلة</span></div><div><strong>خطط دفع مرنة</strong><span>وفق العرض المتاح</span></div></div></section><section class="section" id="destinations"><div class="container"><div class="section-heading"><span>اشهر وجهاتنا</span><h2>اختر وجهتك القادمة مع إطلالة</h2><p>نفس الوجهات والعروض التي عرفتها في إطلالة، بتجربة أسرع وأوضح للحجز.</p></div><div class="destination-grid">${cards}</div></div></section><section class="section soft" id="services"><div class="container"><div class="section-heading"><span>خدمات إطلالة</span><h2>كل ما تحتاجه لرحلة مرتبة</h2></div><div class="services-grid">${services}</div></div></section><section class="section why" id="why"><div class="container split"><div class="why-copy"><span class="mini-title">ليه تختار إطلالة للسفر والسياحة؟</span><h2>نرتب التفاصيل.. وأنت استمتع بالرحلة</h2><p>برامج مخصصة، أفضل الأسعار المتاحة، انتقالات منظمة، وخدمة مستشار سياحي يساعدك في اختيار الأنسب.</p><ul><li>برامج مخصصة للعائلات والأزواج</li><li>إقامة وخيارات متعددة للفنادق</li><li>انتقالات وجولات منظمة</li><li>دعم ومتابعة مع مستشار</li></ul><a class="gradient-btn" data-track="whatsapp" href="${wa('مرحباً إطلالة، أريد أن يساعدني مستشار سياحي في اختيار رحلة')}">تحدث مع مستشار</a></div>${quickForm('رحلة سياحية',true)}</div></section>`;return shell(body,{title:"إطلالة للسفر والسياحة | عروض وبرامج سياحية 2026",desc:"إطلالة للسفر والسياحة: برامج وعروض سياحية، فنادق وطيران وانتقالات وشهر عسل للعائلات والأزواج من السعودية.",canonical:`${SITE}/`,hero},"عروض سياحية");}

function destination(slug,p){const canonical=`${SITE}/${slug}/`;const waLink=wa(`مرحباً إطلالة، أريد عرض ${p.dest}`);const hero=`<section class="destination-hero"><img class="hero-photo" src="${p.hero}" width="1920" height="900" fetchpriority="high" alt="${h(p.dest)}"><div class="hero-overlay"></div><div class="container destination-hero-content"><span class="kicker">إطلالة للسفر والسياحة</span><h1>${h(p.h1)}</h1><p>${h(p.lead)}</p><div class="hero-actions"><a class="gradient-btn" data-track="whatsapp" href="${waLink}">احجز الآن عبر الواتساب</a><a class="ghost-btn" data-track="call" href="tel:${PHONE_TEL}">اتصل بنا</a></div></div></section>`;
const advantages=sharedAdvantages.map(([i,t,d])=>`<article class="adv-card"><span class="adv-icon">${i}</span><h3>${h(t)}</h3><p>${h(d)}</p></article>`).join('');
const slideStrip=p.slides?.length?`<section class="visual-strip"><div class="container visual-grid">${p.slides.map((u,i)=>`<figure><img src="${u}" loading="lazy" width="700" height="480" alt="${h(p.dest)} ${i+1}"></figure>`).join('')}</div></section>`:'';
const offerCards=`<div class="offer-benefits"><article><span>✓</span><h3>افضل الخيارات</h3><p>نقارن الخيارات المناسبة للمدة والميزانية.</p></article><article><span>٪</span><h3>أفضل العروض</h3><p>عروض واضحة وقابلة للتخصيص قبل الحجز.</p></article><article><span>◆</span><h3>نظام دفع آمن</h3><p>ترتيب الحجز والدفع عبر قنوات واضحة.</p></article><article><span>24</span><h3>خدمة عملاء</h3><p>متابعة مع مستشار سياحي عند الحاجة.</p></article></div>`;
const middle=p.mode==='long'?`<section class="section"><div class="container"><div class="section-heading"><span>${h(p.sub)}</span><h2>رحلتك مع إطلالة من البداية للنهاية</h2></div><div class="advantages-grid">${advantages}</div></div></section><section class="section soft"><div class="container split"><div class="why-copy"><span class="mini-title">ليه تختار إطلالة للسفر والسياحة؟</span><h2>خدمات مرتبة وبرنامج يناسب رحلتك</h2><p>خبرة واسعة، دعم مع مستشار، خدمات تقسيط، برامج مخصصة، باقات للعائلات والأزواج، وأسعار وانتقالات منظمة.</p><ul><li>خبرة واسعة في الوجهات السياحية</li><li>برامج مخصصة حسب عدد المسافرين</li><li>أفضل الخيارات المتاحة للفنادق</li><li>انتقالات منظمة ودعم أثناء الرحلة</li></ul></div>${quickForm(p.dest,true)}</div></section>`:`${slideStrip}<section class="section"><div class="container"><div class="section-heading"><span>مع إطلالة</span><h2>تحدث الآن مع مستشارك السياحي</h2><p>${h(p.lead)}</p></div>${offerCards}<div class="offer-form-wrap">${quickForm(p.dest,false)}</div></div></section>`;
return shell(hero+middle,{title:p.title,desc:p.desc,canonical,hero:p.hero},p.dest);}

fs.writeFileSync(path.join(out,"index.html"),home());
for(const [slug,p] of Object.entries(pages)){const dir=path.join(out,slug);fs.mkdirSync(dir,{recursive:true});fs.writeFileSync(path.join(dir,"index.html"),destination(slug,p));}
const urls=[`${SITE}/`,...Object.keys(pages).map(s=>`${SITE}/${s}/`)];
fs.writeFileSync(path.join(out,"sitemap.xml"),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map(u=>`<url><loc>${u}</loc><lastmod>${BUILD_DATE}</lastmod><changefreq>weekly</changefreq><priority>${u===SITE+'/'?'1.0':'0.9'}</priority></url>`).join('\n')}\n</urlset>`);
fs.writeFileSync(path.join(out,"robots.txt"),`User-agent: *\nAllow: /\nSitemap: ${SITE}/sitemap.xml\n`);
fs.writeFileSync(path.join(out,"llms.txt"),`# إطلالة للسفر والسياحة\nOfficial site: ${SITE}/\nPrimary language: Arabic (Saudi Arabia)\nServices: travel packages, hotels, flights, transfers, honeymoon, cruises and family travel.\nKey destinations: Georgia, Malaysia, Maldives, Thailand, Turkey, Bosnia and Europe.\n`);
fs.writeFileSync(path.join(out,"404.html"),shell(`<section class="section"><div class="container not-found"><h1>الصفحة غير موجودة</h1><p>ارجع للرئيسية أو اختر إحدى الوجهات.</p><a class="gradient-btn" href="/">الرئيسية</a></div></section>`,{title:"الصفحة غير موجودة | إطلالة",desc:"الصفحة غير موجودة",canonical:`${SITE}/404.html`},"general"));
console.log(`Built ${Object.keys(pages).length+1} pages in ${out}`);
