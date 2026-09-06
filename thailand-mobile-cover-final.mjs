import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const cssPath = path.join(out, 'assets', 'styles.css');
const marker = 'thailand-mobile-cover-final-v2';
const THAILAND_COVER = 'https://etlaala.com/wp-content/uploads/2025/02/Koh-Tao-1.webp';

function patchHeroImage(relativePath) {
  const file = path.join(out, relativePath, 'index.html');
  if (!fs.existsSync(file)) return false;

  let html = fs.readFileSync(file, 'utf8');
  const original = html;

  // New premium Thailand page.
  html = html.replace(
    /(<section class="dp-hero">\s*<img\s+src=")[^"]+("[^>]*alt="رحلات تايلاند مع إطلالة"[^>]*>)/,
    `$1${THAILAND_COVER}$2`
  );

  // Legacy Thailand offer page / any older destination hero markup.
  html = html.replace(
    /(<section class="destination-hero"[\s\S]*?<img\s+class="hero-photo"\s+src=")[^"]+("[^>]*>)/,
    `$1${THAILAND_COVER}$2`
  );

  if (html !== original) {
    fs.writeFileSync(file, html);
    return true;
  }
  return false;
}

const cssFix = `
/* ${marker} */
@media(max-width:760px){
  /* Thailand only: shorten the scenic cover so the CTA buttons stay visible sooner. */
  .dp-page[data-premium-destination="thailand"] .dp-hero>img,
  body.mobile-target-thailand .dp-hero>img,
  .dp-th .dp-hero>img,
  body[data-destination="تايلاند"] .destination-hero .hero-photo{
    height:clamp(180px,27svh,210px)!important;
    min-height:0!important;
    max-height:clamp(180px,27svh,210px)!important;
    object-fit:cover!important;
    object-position:center 54%!important;
    transform:none!important;
    filter:none!important;
  }

  .dp-page[data-premium-destination="thailand"] .dp-hero-overlay,
  body.mobile-target-thailand .dp-hero-overlay,
  body[data-destination="تايلاند"] .destination-hero .hero-overlay{
    height:clamp(180px,27svh,210px)!important;
    max-height:clamp(180px,27svh,210px)!important;
    background:linear-gradient(180deg,rgba(5,15,52,.08) 0%,rgba(5,15,52,.20) 45%,rgba(5,15,52,.70) 100%)!important;
  }

  .dp-page[data-premium-destination="thailand"] .dp-hero-wrap,
  .dp-th .dp-hero-wrap,
  body[data-destination="تايلاند"] .destination-hero .destination-hero-content{
    margin-top:-42px!important;
  }
}

@media(max-width:420px){
  .dp-page[data-premium-destination="thailand"] .dp-hero>img,
  body.mobile-target-thailand .dp-hero>img,
  .dp-th .dp-hero>img,
  body[data-destination="تايلاند"] .destination-hero .hero-photo,
  .dp-page[data-premium-destination="thailand"] .dp-hero-overlay,
  body.mobile-target-thailand .dp-hero-overlay,
  body[data-destination="تايلاند"] .destination-hero .hero-overlay{
    height:180px!important;
    max-height:180px!important;
  }

  .dp-page[data-premium-destination="thailand"] .dp-hero-wrap,
  .dp-th .dp-hero-wrap,
  body[data-destination="تايلاند"] .destination-hero .destination-hero-content{
    margin-top:-36px!important;
  }
}
`;

if (fs.existsSync(cssPath)) {
  let css = fs.readFileSync(cssPath, 'utf8');
  css = css.replace(/\/\* thailand-mobile-cover-final-v\d+ \*\/[\s\S]*?(?=\/\* [a-z0-9-]+-v\d+ \*\/|$)/g, '');
  css += `\n${cssFix}\n`;
  fs.writeFileSync(cssPath, css);
}

const styleTag = `<style id="${marker}">${cssFix}</style>`;
let patchedStyles = 0;
for (const relativePath of ['thailand', 'thailand-2']) {
  const file = path.join(out, relativePath, 'index.html');
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/<style id=["']thailand-mobile-cover-final-v\d+["'][\s\S]*?<\/style>/gi, '');
  html = html.replace('</head>', `${styleTag}</head>`);
  fs.writeFileSync(file, html);
  patchedStyles += 1;
}

const patched = ['thailand', 'thailand-2'].filter(patchHeroImage);
console.log(`Thailand mobile cover shortened for: ${patched.join(', ') || 'none'}; inline styles on ${patchedStyles} page(s).`);
