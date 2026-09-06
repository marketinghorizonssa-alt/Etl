import fs from 'node:fs';
import path from 'node:path';

const cssPath = path.resolve('dist', 'assets', 'styles.css');
if (!fs.existsSync(cssPath)) process.exit(0);

const outAsset = path.resolve('dist', 'assets', 'purple-inner-hero-hq.webp');
const fallback = path.resolve('dist', 'assets', 'purple-inner-hero.webp');
const pickChunks = (prefix) => fs.readdirSync(process.cwd())
  .filter((name) => name.startsWith(prefix) && name.endsWith('.b64'))
  .sort((a, b) => a.localeCompare(b, 'en'));

const isValidWebp = (buf) => {
  if (!buf || buf.length < 12000) return false;
  if (buf.subarray(0, 4).toString('ascii') !== 'RIFF') return false;
  if (buf.subarray(8, 12).toString('ascii') !== 'WEBP') return false;
  const declared = buf.readUInt32LE(4) + 8;
  return declared === buf.length;
};

let source = '';
let image = null;
for (const prefix of ['hero-hq-final2-part-', 'hero-q78-part-', 'hero-hq2-part-', 'hero-hq-part-']) {
  const chunks = pickChunks(prefix);
  if (!chunks.length) continue;
  const raw = chunks.map((name) => fs.readFileSync(path.resolve(name), 'utf8').trim()).join('');
  const candidate = Buffer.from(raw, 'base64');
  if (isValidWebp(candidate)) {
    image = candidate;
    source = `${prefix}${chunks.length}`;
    break;
  }
}

if (image) {
  fs.writeFileSync(outAsset, image);
} else {
  if (!fs.existsSync(fallback)) throw new Error('No usable inner hero image asset found.');
  fs.copyFileSync(fallback, outAsset);
  source = 'fallback-public-asset';
}

let css = fs.readFileSync(cssPath, 'utf8');
const marker = 'purple-inner-hero-final-fix-v11-validated';

css += `
/* ${marker} */
.legal-hero,.branch-page-hero,.service-page-hero{
  position:relative!important;
  overflow:hidden!important;
  color:#fff!important;
  background-color:#263fc6!important;
  background-image:url("./purple-inner-hero-hq.webp?v=11")!important;
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
.branch-page-hero .branch-primary-btn,
.service-page-hero .gradient-btn{
  box-shadow:0 10px 26px rgba(3,13,46,.16)!important;
}
@media(max-width:680px){
  .legal-hero,.branch-page-hero,.service-page-hero{
    background-image:url("./purple-inner-hero-hq.webp?v=11")!important;
    background-position:34% center!important;
    background-size:cover!important;
  }
}
`;

fs.writeFileSync(cssPath, css);
console.log(`Applied validated inner hero from ${source}; size=${fs.statSync(outAsset).size} bytes.`);
