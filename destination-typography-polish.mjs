import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const cssPath = path.join(out, 'assets', 'styles.css');
const slugs = ['georgia', 'malaysia', 'maldives', 'thailand', 'bosnia-and-herzegovina', 'europe', 'turkiye'];
const fontTag = '<link data-destination-font rel="preconnect" href="https://fonts.googleapis.com"><link data-destination-font rel="preconnect" href="https://fonts.gstatic.com" crossorigin><link data-destination-font rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Alexandria:wght@500;600;700;800&display=swap">';

for (const slug of slugs) {
  const file = path.join(out, slug, 'index.html');
  if (!fs.existsSync(file)) continue;

  let html = fs.readFileSync(file, 'utf8');
  if (!html.includes('data-destination-font')) {
    html = html.replace('</head>', `${fontTag}</head>`);
    fs.writeFileSync(file, html);
  }
}

if (!fs.existsSync(cssPath)) process.exit(0);
let css = fs.readFileSync(cssPath, 'utf8');

if (!css.includes('destination-typography-polish-v1')) {
  css += `
/* destination-typography-polish-v1 */
.dp-page .dp-hero h1,
.tk-premium .tk-hero h1,
.dp-page .dp-copy h2,
.dp-page .dp-heading h2,
.dp-page .dp-programs-head h2,
.dp-page .dp-consult h2,
.tk-premium .tk-copy h2,
.tk-premium .tk-heading h2,
.tk-premium .tk-consult h2,
.tk-premium .tk-final-cta h2{
  font-family:'Alexandria','Segoe UI',Tahoma,Arial,sans-serif!important;
  font-weight:700!important;
  letter-spacing:0!important;
}

.dp-page .dp-hero h1,
.tk-premium .tk-hero h1{
  max-width:760px!important;
  margin-top:15px!important;
  margin-bottom:17px!important;
  font-size:clamp(2.3rem,3.8vw,3.6rem)!important;
  line-height:1.38!important;
  text-wrap:balance;
}

.dp-page .dp-hero-copy>p,
.tk-premium .tk-hero-copy>p{
  max-width:680px!important;
  font-size:.98rem!important;
  line-height:2.02!important;
  text-wrap:pretty;
}

.dp-page .dp-intro-grid .dp-copy,
.tk-premium .tk-route-grid .tk-copy{
  max-width:800px;
}

.dp-page .dp-copy h2,
.tk-premium .tk-copy h2{
  max-width:760px;
  margin:8px 0 18px!important;
  font-size:clamp(1.7rem,2.45vw,2.2rem)!important;
  line-height:1.58!important;
  text-wrap:balance;
}

.dp-page .dp-copy p,
.tk-premium .tk-copy p{
  max-width:780px;
  font-size:.96rem!important;
  line-height:2.08!important;
  text-wrap:pretty;
}

.dp-page .dp-copy p+p,
.tk-premium .tk-copy p+p{
  margin-top:14px!important;
}

.dp-page .dp-heading,
.tk-premium .tk-heading{
  max-width:780px!important;
}

.dp-page .dp-heading h2,
.dp-page .dp-programs-head h2,
.tk-premium .tk-heading h2{
  max-width:760px;
  margin-top:8px!important;
  margin-bottom:15px!important;
  font-size:clamp(1.6rem,2.25vw,2.08rem)!important;
  line-height:1.58!important;
  text-wrap:balance;
}

.dp-page .dp-heading p,
.dp-page .dp-programs-head>p,
.tk-premium .tk-heading p{
  max-width:720px;
  font-size:.9rem!important;
  line-height:2!important;
  text-wrap:pretty;
}

.dp-page .dp-section,
.tk-premium .tk-section{
  --destination-reading-width:780px;
}

@media(max-width:900px){
  .dp-page .dp-hero h1,
  .tk-premium .tk-hero h1{
    max-width:680px!important;
    font-size:clamp(2.05rem,7vw,2.8rem)!important;
    line-height:1.42!important;
  }
  .dp-page .dp-hero-copy>p,
  .tk-premium .tk-hero-copy>p{
    max-width:620px!important;
  }
}

@media(max-width:580px){
  .dp-page .dp-hero h1,
  .tk-premium .tk-hero h1{
    font-size:clamp(1.9rem,8.5vw,2.35rem)!important;
    line-height:1.45!important;
  }
  .dp-page .dp-hero-copy>p,
  .tk-premium .tk-hero-copy>p{
    font-size:.9rem!important;
    line-height:1.95!important;
  }
  .dp-page .dp-copy h2,
  .tk-premium .tk-copy h2,
  .dp-page .dp-heading h2,
  .dp-page .dp-programs-head h2,
  .tk-premium .tk-heading h2{
    font-size:1.55rem!important;
    line-height:1.62!important;
  }
  .dp-page .dp-copy p,
  .tk-premium .tk-copy p,
  .dp-page .dp-heading p,
  .dp-page .dp-programs-head>p,
  .tk-premium .tk-heading p{
    font-size:.9rem!important;
    line-height:2!important;
  }
}
`;
  fs.writeFileSync(cssPath, css);
}

console.log('Unified destination typography with Alexandria headings and cleaner desktop reading widths.');
