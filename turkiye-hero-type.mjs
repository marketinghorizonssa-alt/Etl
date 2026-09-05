import fs from 'node:fs';
import path from 'node:path';

const cssPath = path.resolve('dist','assets','styles.css');
if (!fs.existsSync(cssPath)) process.exit(0);

let css = fs.readFileSync(cssPath,'utf8');
if (!css.includes('turkiye-hero-type-v1')) {
  css += `\n/* turkiye-hero-type-v1 */\n.tk-hero h1{font-family:Tahoma,Arial,sans-serif!important;font-weight:700!important;letter-spacing:0!important;line-height:1.28!important;font-size:clamp(2.45rem,4.65vw,4.15rem)!important;max-width:790px!important;text-wrap:balance}.tk-pill{font-family:Tahoma,Arial,sans-serif!important;font-weight:700!important}.tk-hero p{font-family:Tahoma,Arial,sans-serif!important;font-weight:400!important;line-height:1.85!important;max-width:690px!important}@media(max-width:680px){.tk-hero h1{font-size:2.15rem!important;line-height:1.35!important}.tk-hero p{font-size:.92rem!important;line-height:1.8!important}}\n`;
  fs.writeFileSync(cssPath,css);
}

console.log('Refined Turkey hero typography with a cleaner Arabic system stack.');
