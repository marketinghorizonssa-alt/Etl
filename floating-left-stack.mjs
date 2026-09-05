import fs from 'node:fs';
import path from 'node:path';

const cssPath = path.resolve('dist/assets/styles.css');
if (!fs.existsSync(cssPath)) process.exit(0);

let css = fs.readFileSync(cssPath, 'utf8');
const marker = 'floating-left-stack-v1';

if (!css.includes(marker)) {
  css += `\n/* ${marker} */\n.float-call{left:22px!important;right:auto!important;bottom:max(22px,env(safe-area-inset-bottom))!important}.float-wa{left:22px!important;right:auto!important;bottom:94px!important}.float-wa .float-label,.float-call .float-label{left:72px!important;right:auto!important}@media(max-width:900px){.float-call{left:14px!important;right:auto!important;bottom:max(16px,env(safe-area-inset-bottom))!important}.float-wa{left:14px!important;right:auto!important;bottom:82px!important}}\n`;
  fs.writeFileSync(cssPath, css);
}

console.log('Stacked WhatsApp and Call floating buttons on the left.');
