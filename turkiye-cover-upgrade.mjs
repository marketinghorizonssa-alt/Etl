import fs from 'node:fs';
import path from 'node:path';

const file = path.resolve('dist','turkiye','index.html');
const cssPath = path.resolve('dist','assets','styles.css');
if (!fs.existsSync(file)) process.exit(0);

const NEW_COVER = 'https://etlaala.com/wp-content/uploads/2024/02/pexels-caner-cankisi-3999943.jpg';

let html = fs.readFileSync(file,'utf8');
html = html.replace(/(<section class="tk-hero">\s*<img\s+src=")[^"]+("[^>]*>)/, `$1${NEW_COVER}$2`);
html = html.replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${NEW_COVER}">`);
html = html.replace(/<link rel="preload" as="image" href="[^"]*">/, `<link rel="preload" as="image" href="${NEW_COVER}">`);
fs.writeFileSync(file, html);

if (fs.existsSync(cssPath)) {
  let css = fs.readFileSync(cssPath,'utf8');
  if (!css.includes('turkiye-cover-upgrade-v1')) {
    css += `\n/* turkiye-cover-upgrade-v1 */\n.tk-hero>img{object-position:center 52%!important;filter:saturate(.96) contrast(1.03)}.tk-hero-overlay{background:linear-gradient(270deg,rgba(7,21,68,.94) 0%,rgba(13,37,100,.78) 44%,rgba(10,28,75,.38) 72%,rgba(7,20,52,.12) 100%)!important}@media(max-width:680px){.tk-hero>img{object-position:58% center!important}.tk-hero-overlay{background:linear-gradient(0deg,rgba(5,18,61,.96) 0%,rgba(10,31,86,.58) 66%,rgba(8,24,65,.12) 100%)!important}}\n`;
    fs.writeFileSync(cssPath,css);
  }
}

console.log('Upgraded Turkey landing page cover image and hero crop.');
