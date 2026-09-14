import fs from 'node:fs';
import path from 'node:path';

const file = path.resolve('dist/europe/austria/index.html');
if (!fs.existsSync(file)) throw new Error('Missing Austria page');

let html = fs.readFileSync(file, 'utf8');
const heroImg = html.match(/<section class="dp-hero">\s*(<img\b[^>]*>)/i)?.[1];
if (!heroImg) throw new Error('Austria hero image not found');

const introImg = heroImg
  .replace(/\sfetchpriority="[^"]*"/i, '')
  .replace(/\sloading="eager"/i, ' loading="lazy"')
  .replace(/alt="[^"]*"/i, 'alt="مناظر النمسا بين المدن والجبال"')
  .replace(/sizes="[^"]*"/i, 'sizes="(max-width:620px) calc(100vw - 52px), (max-width:900px) min(540px, calc(100vw - 40px)), 520px"');

const figureRe = /(<figure class="legacy-intro-visual austria-intro-visual">)[\s\S]*?(<\/figure>)/i;
if (!figureRe.test(html)) throw new Error('Austria intro figure not found');
html = html.replace(figureRe, `$1${introImg}$2`);

const style = `<style id="austria-intro-landscape-fix-v2">
.dp-at .austria-intro-visual{display:block!important;width:100%!important;max-width:520px!important;aspect-ratio:4/3!important;margin:0 auto!important;padding:0!important;overflow:hidden!important;border:1px solid #e0e5ef!important;border-radius:26px!important;background:#eef3ff!important;box-shadow:0 18px 46px rgba(25,49,125,.10)!important}
.dp-at .austria-intro-visual img{display:block!important;width:100%!important;height:100%!important;max-height:none!important;object-fit:cover!important;object-position:center!important;border-radius:0!important;background:transparent!important;box-shadow:none!important}
@media(max-width:900px){.dp-at .austria-intro-visual{max-width:560px!important}}
@media(max-width:620px){.dp-at .austria-intro-visual{max-width:100%!important;border-radius:20px!important}}
</style>`;

html = html.replace('</head>', `${style}</head>`);
fs.writeFileSync(file, html);
console.log('Austria intro now reuses the existing landscape hero image.');
