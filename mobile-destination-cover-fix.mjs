import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const cssPath = path.join(out, 'assets', 'styles.css');
const marker = 'mobile-destination-cover-fix-v1';

const cssFix = `
/* ${marker} */
@media(max-width:760px){
  /* ضبط كفر صفحات الوجهات على الموبايل بدون لمس السكرول أو جسم الصفحة */
  .dp-page .dp-hero,
  .tk-premium .tk-hero,
  .destination-hero{
    position:relative!important;
    min-height:min(680px,92svh)!important;
    height:auto!important;
    overflow:hidden!important;
    background:#10255f!important;
  }

  .dp-page .dp-hero>img,
  .tk-premium .tk-hero>img,
  .destination-hero .hero-photo,
  .destination-hero>img{
    position:absolute!important;
    inset:0!important;
    display:block!important;
    width:100%!important;
    height:100%!important;
    min-height:100%!important;
    max-width:none!important;
    object-fit:cover!important;
    object-position:center center!important;
    transform:none!important;
    opacity:1!important;
  }

  .dp-page .dp-hero-overlay,
  .tk-premium .tk-hero-overlay,
  .destination-hero .hero-overlay{
    position:absolute!important;
    inset:0!important;
    z-index:1!important;
    background:linear-gradient(0deg,rgba(4,16,54,.97) 0%,rgba(8,25,76,.78) 45%,rgba(8,25,76,.28) 78%,rgba(8,25,76,.10) 100%)!important;
  }

  .dp-page .dp-hero-wrap,
  .tk-premium .tk-hero-wrap,
  .destination-hero .destination-hero-content{
    position:relative!important;
    z-index:2!important;
  }

  .dp-page .dp-hero-wrap,
  .tk-premium .tk-hero-wrap{
    padding-top:118px!important;
    padding-bottom:34px!important;
  }

  .destination-hero .destination-hero-content{
    min-height:min(680px,92svh)!important;
    padding-top:112px!important;
    padding-bottom:38px!important;
  }

  /* نقاط تركيز مختلفة حسب صورة كل وجهة حتى لا يتم قص الجزء المهم */
  .dp-page[data-premium-destination="georgia"] .dp-hero>img{object-position:54% center!important}
  .dp-page[data-premium-destination="malaysia"] .dp-hero>img{object-position:50% center!important}
  .dp-page[data-premium-destination="maldives"] .dp-hero>img{object-position:52% center!important}
  .dp-page[data-premium-destination="thailand"] .dp-hero>img,
  .dp-th .dp-hero>img{object-position:43% center!important}
  .dp-page[data-premium-destination="bosnia-and-herzegovina"] .dp-hero>img{object-position:50% center!important}
  .dp-page[data-premium-destination="europe"] .dp-hero>img{object-position:46% center!important}
  .tk-premium[data-premium-destination="turkiye"] .tk-hero>img,
  .tk-premium .tk-hero>img{object-position:48% center!important}

  body[data-destination="جورجيا"] .destination-hero .hero-photo{object-position:54% center!important}
  body[data-destination="ماليزيا"] .destination-hero .hero-photo{object-position:50% center!important}
  body[data-destination="المالديف"] .destination-hero .hero-photo{object-position:52% center!important}
  body[data-destination="تايلاند"] .destination-hero .hero-photo{object-position:43% center!important}
  body[data-destination="تركيا"] .destination-hero .hero-photo{object-position:48% center!important}
  body[data-destination="البوسنة والهرسك"] .destination-hero .hero-photo{object-position:50% center!important}
  body[data-destination="أوروبا"] .destination-hero .hero-photo{object-position:46% center!important}

  .dp-page .dp-hero h1,
  .tk-premium .tk-hero h1,
  .destination-hero h1{
    text-shadow:0 8px 26px rgba(0,0,0,.35)!important;
  }
}

@media(max-width:420px){
  .dp-page .dp-hero,
  .tk-premium .tk-hero,
  .destination-hero{
    min-height:min(650px,90svh)!important;
  }
  .dp-page .dp-hero-wrap,
  .tk-premium .tk-hero-wrap{
    padding-top:104px!important;
    padding-bottom:30px!important;
  }
  .destination-hero .destination-hero-content{
    min-height:min(650px,90svh)!important;
    padding-top:104px!important;
    padding-bottom:32px!important;
  }
}
`;

function htmlFiles(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...htmlFiles(file));
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(file);
  }
  return files;
}

if (fs.existsSync(cssPath)) {
  let css = fs.readFileSync(cssPath, 'utf8');
  css = css.replace(/\/\* mobile-destination-cover-fix-v\d+ \*\/[\s\S]*?(?=\/\* [a-z0-9-]+-v\d+ \*\/|$)/g, '');
  css += `\n${cssFix}\n`;
  fs.writeFileSync(cssPath, css);
}

const styleTag = `<style id="${marker}">${cssFix}</style>`;
const destinationMarkers = [
  'class="dp-page',
  'class="tk-premium',
  'class="destination-hero"'
];
let patched = 0;
for (const file of htmlFiles(out)) {
  let html = fs.readFileSync(file, 'utf8');
  if (!destinationMarkers.some(m => html.includes(m))) continue;
  html = html.replace(/<style id=["']mobile-destination-cover-fix-v\d+["'][\s\S]*?<\/style>/gi, '');
  html = html.replace('</head>', `${styleTag}</head>`);
  fs.writeFileSync(file, html);
  patched += 1;
}

console.log(`Mobile destination cover images fixed on ${patched} destination page(s).`);
