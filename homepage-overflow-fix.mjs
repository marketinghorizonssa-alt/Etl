import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const homePath = path.join(out, 'index.html');
const cssPath = path.join(out, 'assets', 'styles.css');

if (!fs.existsSync(homePath) || !fs.existsSync(cssPath)) process.exit(0);

let html = fs.readFileSync(homePath, 'utf8');
html = html.replace(/<html([^>]*)>/i, (m, attrs) => {
  if (/class=/.test(attrs)) {
    return m.replace(/class="([^"]*)"/, (_m, cls) => `class="${cls} home-root"`);
  }
  return `<html${attrs} class="home-root">`;
});
fs.writeFileSync(homePath, html);

let css = fs.readFileSync(cssPath, 'utf8');
if (!css.includes('homepage-overflow-fix-v1')) {
  css += `\n/* homepage-overflow-fix-v1 */\nhtml.home-root,html.home-root body{width:100%!important;max-width:100%!important;overflow-x:hidden!important}html.home-root body{position:relative}html.home-root #main,html.home-root .site-header,html.home-root .compact-footer,html.home-root section,html.home-root header,html.home-root footer{max-width:100%!important}html.home-root img,html.home-root video,html.home-root iframe{max-width:100%}html.home-root .float-btn{max-width:none!important}\n`;
  fs.writeFileSync(cssPath, css);
}

console.log('Removed homepage horizontal overflow and left-side white gap.');
