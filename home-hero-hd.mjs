import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const indexPath = path.join(out, 'index.html');
const cssPath = path.join(out, 'assets', 'styles.css');
const OLD = 'https://etlaala.com/wp-content/uploads';

// Use full-resolution existing Etlaala library photography for the large canvas.
// Keep the Etlaala identity as a separate sharp logo element instead of baking it
// into a 1024px square graphic and stretching that graphic on HiDPI laptops.
const DESKTOP = `${OLD}/2024/03/pexels-margerretta-548077-scaled.jpg`;
const MOBILE = `${OLD}/2024/02/pexels-roman-odintsov-8180458-scaled.jpg`;
const LOGO = `${OLD}/2024/03/Etlala-logo-Ar-01-01.png`;

if (!fs.existsSync(indexPath)) throw new Error('dist/index.html not found');

let html = fs.readFileSync(indexPath, 'utf8');

const newPicture = `<picture class="hero-picture home-hd-picture" data-hero="home"><source media="(max-width:640px)" srcset="${MOBILE}"><img class="hero-photo hero-home" src="${DESKTOP}" width="2560" height="1440" fetchpriority="high" decoding="async" alt="رحلتك تبدأ مع إطلالة"></picture>`;

html = html.replace(
  /<picture class="hero-picture[^>]*data-hero="home"[^>]*>[\s\S]*?<\/picture>/,
  newPicture
);

// Fallback if earlier markup differs slightly.
html = html.replace(
  /<section class="home-hero[^>]*><picture>[\s\S]*?<\/picture>/,
  match => match.replace(/<picture>[\s\S]*?<\/picture>/, newPicture)
);

// Remove any previous brand lockup before inserting the crisp logo once.
html = html.replace(/<div class="home-brand-lockup">[\s\S]*?<\/div>/g, '');
html = html.replace(
  '<div class="container home-hero-content">',
  `<div class="container home-hero-content"><div class="home-brand-lockup"><img src="${LOGO}" width="260" height="88" alt="إطلالة للسفر والسياحة"></div>`
);

// Social preview + LCP preload should use the HD sources, not the old 1024 square.
html = html.replace(/<meta property="og:image" content="[^"]*">/i, `<meta property="og:image" content="${DESKTOP}">`);
html = html.replace(/<link rel="preload" as="image"[^>]*>/gi, '');
html = html.replace('</head>', `<link rel="preload" as="image" media="(min-width:641px)" href="${DESKTOP}"><link rel="preload" as="image" media="(max-width:640px)" href="${MOBILE}"></head>`);

fs.writeFileSync(indexPath, html);

let css = fs.readFileSync(cssPath, 'utf8');
if (!css.includes('home-hero-hd-v1')) {
  css += `\n/* home-hero-hd-v1 */\n.home-hero--brand{min-height:620px;background:#101b54}.home-hero--brand .home-hd-picture{position:absolute;inset:0;z-index:-3;display:block}.home-hero--brand .home-hd-picture .hero-photo{position:absolute!important;inset:0!important;transform:none!important;width:100%!important;height:100%!important;max-width:none!important;max-height:none!important;object-fit:cover!important;object-position:center 48%!important;border-radius:0!important;filter:none!important}.home-hero--brand .hero-overlay,[dir=rtl] .home-hero--brand .hero-overlay{background:linear-gradient(270deg,rgba(5,12,48,.94) 0%,rgba(12,28,86,.82) 42%,rgba(10,24,70,.34) 68%,rgba(7,17,54,.12) 100%)}.home-brand-lockup{display:inline-flex;align-items:center;justify-content:center;width:max-content;max-width:230px;margin-bottom:14px;padding:9px 14px;border:1px solid rgba(255,255,255,.25);border-radius:15px;background:rgba(255,255,255,.94);box-shadow:0 12px 35px rgba(5,12,44,.18);backdrop-filter:blur(7px)}.home-brand-lockup img{display:block;width:min(190px,42vw);height:auto;max-height:62px;object-fit:contain}.home-hero--brand .home-hero-content{max-width:660px}.home-hero--brand .home-hero-content h1{text-shadow:0 3px 18px rgba(0,0,0,.22)}@media(max-width:900px){.home-hero--brand{min-height:650px}.home-hero--brand .home-hd-picture .hero-photo{object-position:center center!important}.home-hero--brand .hero-overlay,[dir=rtl] .home-hero--brand .hero-overlay{background:linear-gradient(0deg,rgba(5,12,48,.96) 0%,rgba(10,26,82,.77) 52%,rgba(7,20,63,.24) 100%)}.home-hero--brand .home-hero-content{padding:72px 0 48px;justify-content:flex-end}.home-brand-lockup{margin-bottom:10px;padding:8px 12px;border-radius:13px}.home-brand-lockup img{width:160px;max-height:54px}}@media(max-width:580px){.home-hero--brand{min-height:610px}.home-hero--brand .home-hd-picture .hero-photo{object-position:center 44%!important}.home-hero--brand .home-hero-content{padding:64px 0 38px}.home-brand-lockup img{width:145px}.home-brand-lockup{padding:7px 10px}.home-hero--brand .home-hero-content h1{font-size:34px}}\n`;
  fs.writeFileSync(cssPath, css);
}

console.log('Homepage hero switched from 1024px branded artwork to HD photo + crisp Etlaala logo overlay.');
