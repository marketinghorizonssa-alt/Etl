import fs from 'node:fs';
import path from 'node:path';

const cssPath = path.resolve('dist', 'assets', 'styles.css');
const purpleSourcePath = path.resolve('purple-hero-image.mjs');
if (!fs.existsSync(cssPath) || !fs.existsSync(purpleSourcePath)) process.exit(0);

let css = fs.readFileSync(cssPath, 'utf8');
const purpleSource = fs.readFileSync(purpleSourcePath, 'utf8');

// Read the exact original purple artwork directly from the source script.
const imageMatch = purpleSource.match(/data:image\/webp;base64,[^'"\r\n]+/i);
if (!imageMatch) {
  throw new Error('Original purple generated hero image was not found in purple-hero-image.mjs.');
}

const HERO = imageMatch[0];
const marker = 'purple-inner-hero-final-fix-v4';

if (!css.includes(marker)) {
  css += `
/* ${marker} */
.legal-hero,.branch-page-hero,.service-page-hero{
  position:relative!important;
  overflow:hidden!important;
  color:#fff!important;
  background-color:#182b89!important;
  background-image:url("${HERO}")!important;
  background-size:cover!important;
  background-position:center center!important;
  background-repeat:no-repeat!important;
}
.legal-hero:before,.legal-hero:after,
.branch-page-hero:before,.branch-page-hero:after,
.service-page-hero:before,.service-page-hero:after{
  opacity:0!important;
  background:none!important;
  border:0!important;
}
.legal-hero .container,.branch-page-hero .container,.service-page-hero .container,
.legal-hero-inner,.branch-hero-inner{
  position:relative!important;
  z-index:2!important;
}
.legal-hero h1,.branch-page-hero h1,.service-page-hero h1{
  color:#fff!important;
  text-shadow:0 3px 18px rgba(0,0,0,.30)!important;
}
.legal-hero p,.branch-page-hero p,.service-page-hero p{
  color:rgba(255,255,255,.96)!important;
  text-shadow:0 2px 10px rgba(0,0,0,.22)!important;
}
.legal-eyebrow,.service-eyebrow,.branch-page-hero .branch-label{
  color:#b7efff!important;
  text-shadow:0 2px 8px rgba(0,0,0,.22)!important;
}
.branch-page-hero .branch-primary-btn,
.service-page-hero .gradient-btn{
  box-shadow:0 10px 26px rgba(3,13,46,.16)!important;
}
@media(max-width:680px){
  .legal-hero,.branch-page-hero,.service-page-hero{
    background-image:url("${HERO}")!important;
    background-position:center center!important;
  }
}
`;
  fs.writeFileSync(cssPath, css);
}

console.log('Applied the original purple generated cover to every legal, branch and service page, replacing the Europe photo.');
