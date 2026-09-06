import fs from 'node:fs';
import path from 'node:path';
import https from 'node:https';

const assetDir = path.resolve('dist', 'assets');
const cssPath = path.resolve(assetDir, 'styles.css');
if (!fs.existsSync(cssPath)) process.exit(0);

const heroJpg = path.resolve(assetDir, 'purple-inner-hero-hq.jpg');
const heroSvg = path.resolve(assetDir, 'purple-inner-hero-fallback.svg');

const photoUrl = 'https://images.unsplash.com/photo-1568323993161-ecfa8d1d6b9d?auto=format&fit=crop&fm=jpg&ixlib=rb-4.1.0&q=82&w=3000';

const download = (url, dest) => new Promise((resolve, reject) => {
  const file = fs.createWriteStream(dest);
  const req = https.get(url, { headers: { 'User-Agent': 'Etlaala-GitHub-Pages-Build/1.0' } }, (res) => {
    if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
      file.close(() => fs.rmSync(dest, { force: true }));
      return download(res.headers.location, dest).then(resolve, reject);
    }
    if (res.statusCode !== 200) {
      file.close(() => fs.rmSync(dest, { force: true }));
      return reject(new Error(`Image download failed with status ${res.statusCode}`));
    }
    res.pipe(file);
    file.on('finish', () => file.close(() => resolve(dest)));
  });
  req.on('error', (err) => {
    file.close(() => fs.rmSync(dest, { force: true }));
    reject(err);
  });
  req.setTimeout(15000, () => req.destroy(new Error('Image download timed out')));
});

const fallbackSvg = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 2172 724" width="2172" height="724" preserveAspectRatio="xMidYMid slice">
  <defs>
    <linearGradient id="sky" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#ffb15d"/><stop offset=".32" stop-color="#2577ff"/><stop offset=".7" stop-color="#153fd0"/><stop offset="1" stop-color="#7648f1"/></linearGradient>
    <linearGradient id="sea" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#245edc"/><stop offset=".55" stop-color="#0739b8"/><stop offset="1" stop-color="#0a2a90"/></linearGradient>
    <radialGradient id="sun" cx="18%" cy="52%" r="26%"><stop offset="0" stop-color="#fff7ab"/><stop offset=".25" stop-color="#ffb95e" stop-opacity=".92"/><stop offset="1" stop-color="#ff7d87" stop-opacity="0"/></radialGradient>
    <filter id="soft"><feGaussianBlur stdDeviation="12"/></filter>
  </defs>
  <rect width="2172" height="724" fill="url(#sky)"/>
  <rect width="2172" height="724" fill="url(#sun)" opacity=".96"/>
  <path d="M0 396 C310 350 520 370 760 386 C1050 405 1280 385 1518 405 C1780 428 1980 385 2172 402 L2172 724 L0 724 Z" fill="url(#sea)"/>
  <path d="M0 410 C340 375 740 440 1120 411 C1500 382 1830 395 2172 381" fill="none" stroke="#78a8ff" stroke-opacity=".22" stroke-width="5"/>
  <path d="M305 430 C445 372 560 392 710 454 C528 483 410 480 305 430Z" fill="#172b79" opacity=".72"/>
  <path d="M1800 455 C1960 380 2060 382 2172 430 L2172 724 L1770 724 Z" fill="#16296d" opacity=".58"/>
  <g opacity=".92">
    <path d="M0 420 L0 724 L255 724 C240 645 230 570 250 495 C188 470 95 455 0 420Z" fill="#163477"/>
    <path d="M0 372 C55 318 122 294 198 287 C169 340 161 389 178 437 C108 425 45 408 0 372Z" fill="#ffffff"/>
    <circle cx="72" cy="300" r="54" fill="#fff"/><path d="M18 300 A54 54 0 0 1 126 300 Z" fill="#064dd4"/>
    <path d="M64 246 h20 v-38 h-20 z" fill="#fff"/><circle cx="74" cy="204" r="8" fill="#fff"/>
    <path d="M122 348 c42-34 83-31 124 0 v116 H122Z" fill="#fff"/><path d="M146 346 a38 38 0 0 1 76 0z" fill="#fff"/><rect x="152" y="390" width="26" height="54" rx="13" fill="#1d63d8" opacity=".55"/>
    <path d="M0 500 C70 458 150 478 220 525 C140 548 62 560 0 550Z" fill="#feffff" opacity=".95"/>
    <path d="M0 626 C68 598 152 610 250 654 L250 724 H0Z" fill="#ff2eb5" opacity=".68"/>
  </g>
  <g opacity=".38" filter="url(#soft)"><path d="M1660 615 C1840 536 2000 560 2172 602 L2172 724 L1600 724Z" fill="#ffc2ff"/></g>
  <path d="M1510 570 C1650 340 1815 265 2022 300 C2110 315 2160 344 2190 386" fill="none" stroke="#fff" stroke-opacity=".48" stroke-width="3"/>
  <path d="M1335 602 C1510 398 1735 320 2070 334" fill="none" stroke="#fff" stroke-opacity=".24" stroke-width="2"/>
  <g transform="translate(640 182) rotate(-11)" opacity=".9"><path d="M0 11 L82 0 L105 10 L84 20 Z" fill="#1b275a"/><path d="M60 2 L43 -25 L56 -25 L92 6 Z" fill="#1b275a"/><path d="M58 18 L31 42 L45 43 L91 16 Z" fill="#1b275a"/></g>
  <path d="M248 225 C375 190 495 178 626 159" fill="none" stroke="#fff" stroke-opacity=".55" stroke-width="4"/>
  <path d="M0 0 H2172 V724 H0Z" fill="url(#sky)" opacity=".18"/>
</svg>`;
fs.writeFileSync(heroSvg, fallbackSvg, 'utf8');

let source = 'svg-fallback';
try {
  await download(photoUrl, heroJpg);
  const size = fs.statSync(heroJpg).size;
  if (size < 180000) throw new Error(`Downloaded image too small: ${size}`);
  source = `downloaded-photo-${size}`;
} catch (error) {
  fs.rmSync(heroJpg, { force: true });
  console.warn(`Could not download sharp inner hero; using SVG fallback. ${error.message}`);
}

const heroUrl = source.startsWith('downloaded-photo')
  ? './purple-inner-hero-hq.jpg?v=14'
  : './purple-inner-hero-fallback.svg?v=14';

let css = fs.readFileSync(cssPath, 'utf8');
const marker = 'purple-inner-hero-final-fix-v14-sharp-responsive';

css += `
/* ${marker} */
.legal-hero,.branch-page-hero,.service-page-hero{
  position:relative!important;
  overflow:hidden!important;
  color:#fff!important;
  isolation:isolate!important;
  background:#153fc6!important;
  background-image:none!important;
}
.legal-hero:before,.branch-page-hero:before,.service-page-hero:before{
  content:""!important;
  position:absolute!important;
  inset:0!important;
  z-index:0!important;
  opacity:1!important;
  border:0!important;
  background-image:url("${heroUrl}")!important;
  background-size:cover!important;
  background-position:center center!important;
  background-repeat:no-repeat!important;
  transform:scaleX(-1)!important;
  filter:saturate(1.16) contrast(1.05)!important;
}
.legal-hero:after,.branch-page-hero:after,.service-page-hero:after{
  content:""!important;
  position:absolute!important;
  inset:0!important;
  z-index:1!important;
  opacity:1!important;
  border:0!important;
  background:linear-gradient(90deg,rgba(15,42,150,.34),rgba(37,59,197,.12) 42%,rgba(112,61,224,.18))!important;
  pointer-events:none!important;
}
.legal-hero .container,.branch-page-hero .container,.service-page-hero .container,
.legal-hero-inner,.branch-hero-inner,.service-page-hero .service-hero-inner{
  position:relative!important;
  z-index:2!important;
}
.legal-hero h1,.branch-page-hero h1,.service-page-hero h1{
  color:#fff!important;
  text-shadow:0 4px 20px rgba(0,0,0,.34)!important;
}
.legal-hero p,.branch-page-hero p,.service-page-hero p{
  color:rgba(255,255,255,.97)!important;
  text-shadow:0 2px 12px rgba(0,0,0,.28)!important;
}
.legal-eyebrow,.service-eyebrow,.branch-page-hero .branch-label{
  color:#c9f6ff!important;
  text-shadow:0 2px 10px rgba(0,0,0,.3)!important;
}
.branch-page-hero .branch-primary-btn,
.service-page-hero .gradient-btn{
  box-shadow:0 12px 30px rgba(3,13,46,.20)!important;
}
@media(max-width:900px){
  .legal-hero:before,.branch-page-hero:before,.service-page-hero:before{
    background-position:58% center!important;
  }
}
@media(max-width:680px){
  .legal-hero,.branch-page-hero,.service-page-hero{
    min-height:420px!important;
  }
  .legal-hero:before,.branch-page-hero:before,.service-page-hero:before{
    background-size:cover!important;
    background-position:54% center!important;
    filter:saturate(1.12) contrast(1.04)!important;
  }
  .legal-hero:after,.branch-page-hero:after,.service-page-hero:after{
    background:linear-gradient(180deg,rgba(12,31,116,.48),rgba(22,48,164,.24) 42%,rgba(92,44,203,.28))!important;
  }
}
`;

fs.writeFileSync(cssPath, css);
console.log(`Applied sharp responsive inner hero (${source}).`);
