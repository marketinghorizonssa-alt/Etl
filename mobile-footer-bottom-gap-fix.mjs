import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const cssPath = path.join(out, 'assets', 'styles.css');
const marker = 'mobile-footer-bottom-gap-fix-v1';

const cssFix = `
/* ${marker} */
@media(max-width:760px){
  html{
    min-height:100%!important;
    background:#0b2f86!important;
    overflow-x:hidden!important;
  }
  body{
    min-height:100dvh!important;
    margin:0!important;
    display:flex!important;
    flex-direction:column!important;
    background:#0b2f86!important;
    overflow-x:hidden!important;
  }
  body>main,
  main#main{
    flex:1 0 auto!important;
    background:#fff;
  }
  footer,
  .compact-footer{
    flex-shrink:0!important;
    position:relative!important;
    display:block!important;
    margin:0!important;
    padding:0!important;
    border:0!important;
    overflow:visible!important;
    background-color:#0b2f86!important;
    background-position:center bottom!important;
  }
  .compact-footer:after{
    content:""!important;
    position:absolute!important;
    left:0!important;
    right:0!important;
    bottom:-64px!important;
    height:64px!important;
    background:#0b2f86!important;
    pointer-events:none!important;
  }
  .compact-footer-overlay{
    margin:0!important;
    padding-bottom:max(18px,env(safe-area-inset-bottom))!important;
    background:
      linear-gradient(180deg,rgba(21,55,153,.94),rgba(13,63,156,.88) 45%,rgba(10,46,126,.96))!important;
  }
  .compact-footer-bottom{
    margin-bottom:0!important;
    padding-bottom:max(18px,env(safe-area-inset-bottom))!important;
  }
  .compact-footer + *,
  footer + *{
    display:none!important;
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
  if (!css.includes(marker)) {
    css += `\n${cssFix}\n`;
    fs.writeFileSync(cssPath, css);
  }
}

const styleTag = `<style id="${marker}">${cssFix}</style>`;
let patched = 0;
for (const file of htmlFiles(out)) {
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes(`id="${marker}"`)) continue;
  html = html.replace('</head>', `${styleTag}</head>`);
  fs.writeFileSync(file, html);
  patched += 1;
}

console.log(`Mobile footer bottom gap removed on ${patched} page(s).`);
