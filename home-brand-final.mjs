import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const OLD = 'https://etlaala.com/wp-content/uploads';

// General, non-seasonal Etlaala company visual from the existing media library.
// It carries the Etlaala identity itself rather than a destination/season campaign.
const HOME_BRAND_IMAGE = `${OLD}/2024/08/شركة-إطلالة-للسفر-والسياحةة-1024x1024.webp`;

// Use the square brand/site icon source instead of the long horizontal logo.
// Browser tabs will downscale it cleanly; Apple keeps the native 180px asset.
const FAVICON = `${OLD}/2024/04/cropped-logo-lookups-03-2-180x180.png`;
const APPLE_ICON = `${OLD}/2024/04/cropped-logo-lookups-03-2-180x180.png`;

function htmlFiles(dir) {
  const result = [];
  if (!fs.existsSync(dir)) return result;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, e.name);
    if (e.isDirectory()) result.push(...htmlFiles(p));
    else if (e.isFile() && e.name.endsWith('.html')) result.push(p);
  }
  return result;
}

function patchFavicons(html) {
  html = html
    .replace(/<link[^>]*data-etlaala-favicon[^>]*>/gi, '')
    .replace(/<link[^>]*rel="apple-touch-icon"[^>]*>/gi, '')
    .replace(/<link[^>]*rel="shortcut icon"[^>]*>/gi, '');

  const tags = `<link data-etlaala-favicon rel="icon" type="image/png" href="${FAVICON}">` +
    `<link rel="shortcut icon" type="image/png" href="${FAVICON}">` +
    `<link rel="apple-touch-icon" sizes="180x180" href="${APPLE_ICON}">`;

  return html.replace('</head>', `${tags}</head>`);
}

function patchHome(html) {
  // Mark the new hero treatment.
  html = html.replace('<section class="home-hero">', '<section class="home-hero home-hero--brand">');

  // Swap only the home hero visual; keep destination heroes untouched.
  html = html.replace(
    /<picture class="hero-picture" data-hero="home">[\s\S]*?<\/picture>/,
    `<picture class="hero-picture home-brand-picture" data-hero="home"><source media="(max-width:640px)" srcset="${HOME_BRAND_IMAGE}"><img class="hero-photo hero-home" src="${HOME_BRAND_IMAGE}" width="1024" height="1024" fetchpriority="high" decoding="async" alt="إطلالة للسفر والسياحة"></picture>`
  );

  // If an earlier build still has the original picture markup, cover that too.
  html = html.replace(
    /<section class="home-hero home-hero--brand"><picture>[\s\S]*?<\/picture>/,
    `<section class="home-hero home-hero--brand"><picture class="hero-picture home-brand-picture" data-hero="home"><source media="(max-width:640px)" srcset="${HOME_BRAND_IMAGE}"><img class="hero-photo hero-home" src="${HOME_BRAND_IMAGE}" width="1024" height="1024" fetchpriority="high" decoding="async" alt="إطلالة للسفر والسياحة"></picture>`
  );

  // Final approved evergreen homepage message.
  html = html.replace(
    /(<div class="container home-hero-content">[\s\S]*?<span class="kicker">)[\s\S]*?(<\/span>)/,
    '$1إطلالة للسفر والسياحة$2'
  );
  html = html.replace(
    /(<div class="container home-hero-content">[\s\S]*?<h1>)[\s\S]*?(<\/h1>)/,
    '$1رحلتك تبدأ مع إطلالة$2'
  );
  html = html.replace(
    /(<div class="container home-hero-content">[\s\S]*?<h1>[\s\S]*?<\/h1><p>)[\s\S]*?(<\/p>)/,
    '$1وجهات مميزة، عروض متنوعة، وخدمة سفر متكاملة تناسب رحلتك.$2'
  );

  // Keep social preview and LCP preload aligned with the new hero.
  html = html.replace(/<meta property="og:image" content="[^"]*">/i, `<meta property="og:image" content="${HOME_BRAND_IMAGE}">`);
  html = html.replace(/<link rel="preload" as="image"[^>]*>/gi, '');
  html = html.replace('</head>', `<link rel="preload" as="image" href="${HOME_BRAND_IMAGE}">${'</head>'}`);

  return html;
}

for (const file of htmlFiles(out)) {
  let html = fs.readFileSync(file, 'utf8');
  if (path.relative(out, file).replace(/\\/g, '/') === 'index.html') html = patchHome(html);
  html = patchFavicons(html);
  fs.writeFileSync(file, html);
}

const cssPath = path.join(out, 'assets', 'styles.css');
let css = fs.readFileSync(cssPath, 'utf8');
if (!css.includes('home-brand-final-v1')) {
  css += `\n/* home-brand-final-v1 */\n.home-hero--brand{min-height:620px;background:radial-gradient(circle at 18% 26%,rgba(70,195,239,.24),transparent 30%),radial-gradient(circle at 18% 78%,rgba(255,141,2,.16),transparent 30%),linear-gradient(135deg,#0c1752 0%,#1335ae 54%,#17205a 100%)}.home-hero--brand .home-brand-picture{position:absolute;inset:0;z-index:-3;pointer-events:none}.home-hero--brand .home-brand-picture .hero-photo{position:absolute;left:clamp(22px,4vw,76px);right:auto;top:50%;bottom:auto;transform:translateY(-50%);width:min(46vw,720px);height:min(86%,610px);object-fit:contain;object-position:center;border-radius:30px;filter:drop-shadow(0 24px 46px rgba(5,14,54,.28))}.home-hero--brand .hero-overlay,[dir=rtl] .home-hero--brand .hero-overlay{background:linear-gradient(270deg,rgba(6,12,49,.97) 0%,rgba(13,28,88,.92) 39%,rgba(17,40,108,.55) 61%,rgba(7,18,58,.06) 100%)}.home-hero--brand .home-hero-content{max-width:620px;padding-top:84px;padding-bottom:84px}.home-hero--brand .home-hero-content h1{font-size:clamp(42px,5vw,66px);max-width:620px;margin-bottom:16px}.home-hero--brand .home-hero-content p{max-width:590px;font-size:clamp(15px,1.45vw,18px)}@media(max-width:900px){.home-hero--brand{min-height:690px}.home-hero--brand .home-brand-picture .hero-photo{left:50%;top:18px;transform:translateX(-50%);width:min(82vw,560px);height:330px;border-radius:24px}.home-hero--brand .hero-overlay,[dir=rtl] .home-hero--brand .hero-overlay{background:linear-gradient(0deg,rgba(6,12,49,.98) 0%,rgba(13,29,87,.93) 43%,rgba(13,35,103,.35) 68%,rgba(8,20,61,.04) 100%)}.home-hero--brand .home-hero-content{justify-content:flex-end;padding:350px 0 46px;max-width:none}.home-hero--brand .home-hero-content h1{font-size:clamp(34px,8vw,46px)}}@media(max-width:580px){.home-hero--brand{min-height:650px}.home-hero--brand .home-brand-picture .hero-photo{top:12px;width:calc(100% - 28px);height:300px;border-radius:20px}.home-hero--brand .home-hero-content{padding:318px 0 38px;justify-content:flex-end}.home-hero--brand .home-hero-content h1{font-size:34px;line-height:1.35}.home-hero--brand .home-hero-content p{font-size:13px;line-height:1.85}.home-hero--brand .kicker{font-size:12px}}\n`;
  fs.writeFileSync(cssPath, css);
}

console.log('Homepage refreshed with evergreen Etlaala brand hero, approved copy, and corrected square favicon treatment.');
