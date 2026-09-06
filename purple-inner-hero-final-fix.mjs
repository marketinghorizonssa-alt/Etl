import fs from 'node:fs';
import path from 'node:path';

const cssPath = path.resolve('dist', 'assets', 'styles.css');
const assetPath = path.resolve('dist', 'assets', 'purple-inner-hero-hq.webp');
const b64Path = path.resolve('hero-hq2-part-00.b64');

if (!fs.existsSync(cssPath)) process.exit(0);
if (!fs.existsSync(b64Path)) throw new Error('HQ hero base64 source is missing.');

const raw = fs.readFileSync(b64Path, 'utf8').trim();
const image = Buffer.from(raw, 'base64');
if (image.length < 100000 || image.subarray(0,4).toString('ascii') !== 'RIFF' || image.subarray(8,12).toString('ascii') !== 'WEBP') {
  throw new Error(`Invalid HQ WebP asset (${image.length} bytes).`);
}
fs.writeFileSync(assetPath, image);

let css = fs.readFileSync(cssPath, 'utf8');
const marker = 'purple-inner-hero-final-fix-v8-hq';

css += `
/* ${marker} */
.legal-hero,.branch-page-hero,.service-page-hero{
  position:relative!important;
  overflow:hidden!important;
  color:#fff!important;
  background-color:#263fc6!important;
  background-image:url("./purple-inner-hero-hq.webp?v=8")!important;
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
  color:#c5f3ff!important;
  text-shadow:0 2px 8px rgba(0,0,0,.22)!important;
}
@media(max-width:680px){
  .legal-hero,.branch-page-hero,.service-page-hero{
    background-image:url("./purple-inner-hero-hq.webp?v=8")!important;
    background-position:32% center!important;
    background-size:cover!important;
  }
}
`;

fs.writeFileSync(cssPath, css);
console.log(`Applied HQ Santorini hero (${image.length} bytes) to legal, branch and service pages.`);
