import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const cssPath = path.join(out, 'assets', 'styles.css');
const OLD = 'https://etlaala.com/wp-content/uploads';

// August-10 backup asset: high-resolution, non-seasonal regional/coastal travel scene.
// It is more relevant to the Saudi/Gulf audience than the previous European landscape.
const HERO = `${OLD}/2026/03/Gemini_Generated_Image_qzvy1zqzvy1zqzvy_optimized_1500-1.png`;
const FOOTER_BG = `${OLD}/2025/06/empty-hammock-swing-around-beach-sea-ocean-with-white-cloud-blue-sky-travel-vacation-scaled.webp`;

function htmlFiles(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...htmlFiles(full));
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

for (const file of htmlFiles(out)) {
  let html = fs.readFileSync(file, 'utf8');
  const rel = path.relative(out, file).replace(/\\/g, '/');

  // Footer background on every generated page.
  html = html.replace(
    /style="--compact-footer-bg:url\('[^']*'\)"/g,
    `style="--compact-footer-bg:url('${FOOTER_BG}')"`
  );

  // Remove the always-visible phone helper that made the form look broken.
  html = html
    .replace(/\s*<small id="phone-help" class="field-help">[\s\S]*?<\/small>/g, '')
    .replace(/ aria-describedby="phone-help"/g, '');

  if (rel === 'index.html') {
    // Remove the white logo card from the hero completely.
    html = html.replace(/<div class="home-brand-lockup">[\s\S]*?<\/div>/g, '');

    // Replace the hero with the approved high-resolution travel visual.
    const picture = `<picture class="hero-picture home-final-picture" data-hero="home"><source media="(max-width:640px)" srcset="${HERO}"><img class="hero-photo hero-home" src="${HERO}" width="2048" height="1142" fetchpriority="high" decoding="async" alt="رحلتك تبدأ مع إطلالة"></picture>`;
    html = html.replace(
      /<picture class="hero-picture[^>]*data-hero="home"[^>]*>[\s\S]*?<\/picture>/,
      picture
    );
    html = html.replace(
      /<section class="home-hero([^>]*)><picture>[\s\S]*?<\/picture>/,
      `<section class="home-hero$1>${picture}`
    );

    // Keep approved evergreen copy.
    html = html.replace(
      /(<div class="container home-hero-content">[\s\S]*?<h1>)[\s\S]*?(<\/h1>)/,
      '$1رحلتك تبدأ مع إطلالة$2'
    );
    html = html.replace(
      /(<div class="container home-hero-content">[\s\S]*?<h1>[\s\S]*?<\/h1><p>)[\s\S]*?(<\/p>)/,
      '$1وجهات مميزة، عروض متنوعة، وخدمة سفر متكاملة تناسب رحلتك.$2'
    );

    html = html.replace(/<meta property="og:image" content="[^"]*">/i, `<meta property="og:image" content="${HERO}">`);
    html = html.replace(/<link rel="preload" as="image"[^>]*>/gi, '');
    html = html.replace('</head>', `<link rel="preload" as="image" href="${HERO}"></head>`);
  }

  fs.writeFileSync(file, html);
}

let css = fs.readFileSync(cssPath, 'utf8');
if (!css.includes('homepage-final-fix-v1')) {
  css += `\n/* homepage-final-fix-v1 */\n.home-hero--brand{min-height:620px;background:#0d1b4d}.home-hero--brand .home-final-picture{position:absolute;inset:0;z-index:-3;display:block}.home-hero--brand .home-final-picture .hero-photo{position:absolute!important;inset:0!important;transform:none!important;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;object-fit:cover!important;object-position:center 51%!important;border-radius:0!important;filter:none!important}.home-brand-lockup{display:none!important}.home-hero--brand .hero-overlay,[dir=rtl] .home-hero--brand .hero-overlay{background:linear-gradient(270deg,rgba(5,12,45,.93) 0%,rgba(9,28,79,.77) 43%,rgba(10,30,70,.28) 70%,rgba(5,17,45,.08) 100%)}.home-hero--brand .home-hero-content{max-width:690px;padding-top:78px;padding-bottom:78px}.home-hero--brand .home-hero-content h1{font-size:clamp(42px,5vw,66px);line-height:1.3;max-width:660px;text-shadow:0 3px 20px rgba(0,0,0,.24)}.home-hero--brand .home-hero-content p{max-width:610px}\n.lead-form{overflow:hidden}.lead-form .form-grid{align-items:start;gap:16px}.lead-form label{gap:8px;margin-bottom:0;font-size:13px;color:#26335f}.lead-form input,.lead-form select,.lead-form textarea{min-height:54px;padding:13px 15px;border-radius:13px;background:#fff;border-color:#d8deed;color:#172150}.lead-form input::placeholder,.lead-form textarea::placeholder{color:#8a94aa;opacity:1}.lead-form input[name="phone"]{direction:ltr;text-align:left;font-weight:700}.lead-form input[type="date"]{direction:rtl;text-align:right}.field-help{display:none!important}.lead-form textarea{min-height:116px}.privacy-consent{margin-top:14px!important;align-items:flex-start!important}.privacy-consent input{width:18px!important;height:18px!important;min-height:18px!important;padding:0!important;flex:0 0 18px!important}.privacy-consent span{font-size:11px;line-height:1.7}\n.compact-footer{background-position:center 58%!important}.compact-footer-overlay{background:linear-gradient(90deg,rgba(31,42,125,.88),rgba(10,78,168,.9))!important}.compact-contact a.contact-line[data-track="call"]{display:flex!important;align-items:baseline!important;justify-content:flex-start!important;gap:9px!important;grid-template-columns:none!important}.compact-contact a.contact-line[data-track="call"] b,.compact-contact a.contact-line[data-track="call"] span{width:auto!important;white-space:nowrap}.compact-contact a.contact-line[data-track="call"] span{font-size:14px;font-weight:800}\n@media(max-width:900px){.home-hero--brand{min-height:630px}.home-hero--brand .home-final-picture .hero-photo{object-position:58% center!important}.home-hero--brand .hero-overlay,[dir=rtl] .home-hero--brand .hero-overlay{background:linear-gradient(0deg,rgba(5,12,45,.95) 0%,rgba(10,29,82,.74) 52%,rgba(8,24,62,.18) 100%)}.home-hero--brand .home-hero-content{padding:68px 0 46px;justify-content:flex-end}}@media(max-width:580px){.home-hero--brand{min-height:590px}.home-hero--brand .home-final-picture .hero-photo{object-position:61% center!important}.home-hero--brand .home-hero-content{padding:58px 0 36px}.home-hero--brand .home-hero-content h1{font-size:34px}.lead-form .form-grid{grid-template-columns:1fr;gap:13px}.lead-form input,.lead-form select{min-height:52px}.compact-contact a.contact-line[data-track="call"]{gap:7px!important;justify-content:center!important}}\n`;
  fs.writeFileSync(cssPath, css);
}

console.log('Final homepage hero, lead form and footer presentation fixes applied.');
