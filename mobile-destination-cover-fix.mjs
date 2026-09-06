import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const cssPath = path.join(out, 'assets', 'styles.css');
const marker = 'mobile-destination-cover-fix-v2';

const mobileCoverH = 'clamp(250px,42svh,330px)';

const cssFix = `
/* ${marker} */
@media(max-width:760px){
  /* نخلي صور كفر الوجهات زي منطق الهوم: صورة واضحة فوق، والمحتوى فوق كارت مقروء بدل فرد صورة landscape على طول شاشة الموبايل */
  .dp-page .dp-hero,
  .tk-premium .tk-hero,
  .destination-hero{
    position:relative!important;
    display:block!important;
    min-height:0!important;
    height:auto!important;
    padding:0!important;
    overflow:hidden!important;
    background:linear-gradient(180deg,#071b5b 0%,#081748 100%)!important;
    color:#fff!important;
  }

  .dp-page .dp-hero>img,
  .tk-premium .tk-hero>img,
  .destination-hero .hero-photo,
  .destination-hero>img{
    position:relative!important;
    inset:auto!important;
    display:block!important;
    width:100%!important;
    height:${mobileCoverH}!important;
    min-height:0!important;
    max-height:${mobileCoverH}!important;
    max-width:none!important;
    object-fit:cover!important;
    object-position:center center!important;
    transform:none!important;
    filter:none!important;
    opacity:1!important;
    border-radius:0!important;
  }

  .dp-page .dp-hero-overlay,
  .tk-premium .tk-hero-overlay,
  .destination-hero .hero-overlay{
    position:absolute!important;
    top:0!important;
    right:0!important;
    left:0!important;
    bottom:auto!important;
    width:100%!important;
    height:${mobileCoverH}!important;
    z-index:1!important;
    pointer-events:none!important;
    background:linear-gradient(180deg,rgba(5,15,52,.12) 0%,rgba(5,15,52,.22) 48%,rgba(5,15,52,.72) 100%)!important;
  }

  .dp-page .dp-hero-wrap,
  .tk-premium .tk-hero-wrap{
    position:relative!important;
    z-index:2!important;
    display:flex!important;
    flex-direction:column!important;
    align-items:stretch!important;
    width:calc(100% - 28px)!important;
    max-width:100%!important;
    margin:-68px auto 0!important;
    padding:0 0 26px!important;
    gap:13px!important;
  }

  .destination-hero .destination-hero-content{
    position:relative!important;
    z-index:2!important;
    width:calc(100% - 28px)!important;
    max-width:100%!important;
    min-height:0!important;
    margin:-68px auto 0!important;
    padding:22px 16px 26px!important;
    border:1px solid rgba(255,255,255,.16)!important;
    border-radius:22px!important;
    background:linear-gradient(180deg,rgba(7,24,76,.94),rgba(6,16,52,.98))!important;
    box-shadow:0 22px 46px rgba(0,0,0,.18)!important;
    backdrop-filter:blur(10px)!important;
    text-align:right!important;
  }

  .dp-page .dp-hero-copy,
  .tk-premium .tk-hero-copy{
    width:100%!important;
    max-width:100%!important;
    min-width:0!important;
    order:1!important;
    padding:22px 16px 18px!important;
    border:1px solid rgba(255,255,255,.16)!important;
    border-radius:22px!important;
    background:linear-gradient(180deg,rgba(7,24,76,.94),rgba(6,16,52,.98))!important;
    box-shadow:0 22px 46px rgba(0,0,0,.18)!important;
    backdrop-filter:blur(10px)!important;
    text-align:right!important;
  }

  .dp-page .dp-pill,
  .tk-premium .tk-pill,
  .destination-hero .kicker{
    margin-bottom:9px!important;
    font-size:.72rem!important;
    line-height:1.4!important;
    padding:6px 10px!important;
    background:rgba(255,255,255,.10)!important;
    border-color:rgba(255,255,255,.24)!important;
  }

  .dp-page .dp-hero h1,
  .tk-premium .tk-hero h1,
  .destination-hero h1{
    max-width:100%!important;
    margin:8px 0 10px!important;
    font-size:clamp(2rem,8.4vw,2.65rem)!important;
    line-height:1.32!important;
    letter-spacing:-.4px!important;
    text-wrap:balance!important;
    color:#fff!important;
    text-shadow:0 8px 24px rgba(0,0,0,.25)!important;
  }

  .dp-page .dp-hero-copy>p,
  .tk-premium .tk-hero-copy>p,
  .destination-hero p{
    max-width:100%!important;
    margin:0!important;
    font-size:.9rem!important;
    line-height:1.9!important;
    color:rgba(255,255,255,.90)!important;
  }

  .dp-page .dp-actions,
  .tk-premium .tk-actions,
  .destination-hero .hero-actions{
    display:grid!important;
    grid-template-columns:1fr 1fr!important;
    gap:9px!important;
    width:100%!important;
    margin-top:17px!important;
  }

  .dp-page .dp-actions a,
  .tk-premium .tk-actions a,
  .destination-hero .hero-actions a{
    width:100%!important;
    min-width:0!important;
    min-height:48px!important;
    padding:10px 8px!important;
    border-radius:14px!important;
    font-size:.86rem!important;
    justify-content:center!important;
    white-space:nowrap!important;
  }

  .dp-page .dp-hero-card,
  .tk-premium .tk-hero-card,
  .dp-page .dp-hero-form,
  .tk-premium .tk-hero-form{
    order:2!important;
    width:100%!important;
    max-width:100%!important;
    margin:0!important;
    padding:18px 16px!important;
    border-radius:22px!important;
    border:1px solid rgba(255,255,255,.14)!important;
    background:rgba(6,17,54,.88)!important;
    box-shadow:0 18px 40px rgba(0,0,0,.14)!important;
    backdrop-filter:blur(10px)!important;
  }

  .dp-page .dp-hero-card{
    display:grid!important;
    grid-template-columns:1fr!important;
    gap:0!important;
  }
  .dp-page .dp-hero-card>span,
  .tk-premium .tk-hero-card>span{
    margin-bottom:8px!important;
  }
  .dp-page .dp-hero-card>div,
  .tk-premium .tk-hero-card>div{
    border-right:0!important;
    border-top:1px solid rgba(255,255,255,.12)!important;
    padding:9px 0!important;
  }

  .dp-page .dp-hero-mini-grid,
  .tk-premium .dp-hero-mini-grid,
  .tk-premium .tk-hero-form .dp-hero-mini-grid{
    grid-template-columns:1fr!important;
    gap:10px!important;
  }

  .dp-page .dp-hero-lead-form input:not([type="checkbox"]),
  .dp-page .dp-hero-lead-form select,
  .tk-premium .dp-hero-lead-form input:not([type="checkbox"]),
  .tk-premium .dp-hero-lead-form select{
    height:54px!important;
    min-height:54px!important;
    max-height:54px!important;
    border-radius:14px!important;
    font-size:16px!important;
  }

  .dp-page .dp-hero-lead-form textarea,
  .tk-premium .dp-hero-lead-form textarea{
    min-height:88px!important;
    border-radius:14px!important;
    font-size:16px!important;
  }

  /* نقاط تركيز لكل صورة وهي في وضع بانر موبايل */
  .dp-page[data-premium-destination="georgia"] .dp-hero>img{object-position:50% 48%!important}
  .dp-page[data-premium-destination="malaysia"] .dp-hero>img{object-position:50% 46%!important}
  .dp-page[data-premium-destination="maldives"] .dp-hero>img{object-position:52% 50%!important}
  .dp-page[data-premium-destination="thailand"] .dp-hero>img,
  .dp-th .dp-hero>img{object-position:50% 48%!important}
  .dp-page[data-premium-destination="bosnia-and-herzegovina"] .dp-hero>img{object-position:50% 47%!important}
  .dp-page[data-premium-destination="europe"] .dp-hero>img{object-position:50% 48%!important}
  .tk-premium[data-premium-destination="turkiye"] .tk-hero>img,
  .tk-premium .tk-hero>img{object-position:50% 48%!important}

  body[data-destination="جورجيا"] .destination-hero .hero-photo{object-position:50% 48%!important}
  body[data-destination="ماليزيا"] .destination-hero .hero-photo{object-position:50% 46%!important}
  body[data-destination="المالديف"] .destination-hero .hero-photo{object-position:52% 50%!important}
  body[data-destination="تايلاند"] .destination-hero .hero-photo{object-position:50% 48%!important}
  body[data-destination="تركيا"] .destination-hero .hero-photo{object-position:50% 48%!important}
  body[data-destination="البوسنة والهرسك"] .destination-hero .hero-photo{object-position:50% 47%!important}
  body[data-destination="أوروبا"] .destination-hero .hero-photo{object-position:50% 48%!important}
}

@media(max-width:420px){
  .dp-page .dp-hero>img,
  .tk-premium .tk-hero>img,
  .destination-hero .hero-photo,
  .destination-hero>img,
  .dp-page .dp-hero-overlay,
  .tk-premium .tk-hero-overlay,
  .destination-hero .hero-overlay{
    height:clamp(235px,39svh,305px)!important;
    max-height:clamp(235px,39svh,305px)!important;
  }
  .dp-page .dp-hero-wrap,
  .tk-premium .tk-hero-wrap,
  .destination-hero .destination-hero-content{
    margin-top:-58px!important;
  }
  .dp-page .dp-hero h1,
  .tk-premium .tk-hero h1,
  .destination-hero h1{
    font-size:clamp(1.85rem,8.1vw,2.35rem)!important;
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

console.log(`Mobile destination cover images changed to sharp banner mode on ${patched} destination page(s).`);
