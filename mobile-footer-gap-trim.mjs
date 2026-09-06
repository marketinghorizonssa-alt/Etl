import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const cssPath = path.join(out, 'assets', 'styles.css');
const oldMarker = 'mobile-footer-bottom-gap-fix-v1';
const marker = 'mobile-footer-gap-trim-v1';

const safeCss = `
/* ${marker} */
@media(max-width:760px){
  /* Safer footer-bottom trim: no body flex, no html/body background, no overflow lock, no hidden siblings. */
  footer,
  .compact-footer{
    display:block!important;
    position:relative!important;
    margin:0!important;
    margin-bottom:0!important;
    padding:0!important;
    border:0!important;
    min-height:0!important;
    overflow:hidden!important;
  }
  .compact-footer:before,
  .compact-footer:after{
    display:none!important;
    content:none!important;
  }
  .compact-footer-overlay{
    margin:0!important;
    padding-bottom:0!important;
  }
  .compact-footer-main{
    margin-bottom:0!important;
    padding-bottom:0!important;
  }
  .compact-footer-bottom{
    margin-top:12px!important;
    margin-bottom:0!important;
    padding-bottom:8px!important;
    min-height:0!important;
  }
  .legal-wrap{
    margin-bottom:0!important;
    padding-bottom:0!important;
  }
  .legal-wrap p{
    margin-bottom:0!important;
    padding-bottom:0!important;
  }
  body>footer:last-child,
  body>.compact-footer:last-child{
    margin-bottom:0!important;
  }
}
`;

function htmlFiles(dir){
  const files=[];
  if(!fs.existsSync(dir)) return files;
  for(const entry of fs.readdirSync(dir,{withFileTypes:true})){
    const file=path.join(dir, entry.name);
    if(entry.isDirectory()) files.push(...htmlFiles(file));
    else if(entry.isFile() && entry.name.endsWith('.html')) files.push(file);
  }
  return files;
}

if(fs.existsSync(cssPath)){
  let css=fs.readFileSync(cssPath,'utf8');
  // Remove the previous risky fix if it is ever present in a generated CSS file.
  css=css.replace(new RegExp(`/\\* ${oldMarker} \\*/[\\s\\S]*?(?=/\\* |$)`, 'g'), '');
  if(!css.includes(marker)) css += `\n${safeCss}\n`;
  fs.writeFileSync(cssPath, css);
}

const styleTag = `<style id="${marker}">${safeCss}</style>`;
let patched=0;
for(const file of htmlFiles(out)){
  let html=fs.readFileSync(file,'utf8');
  html=html.replace(new RegExp(`<style id=["']${oldMarker}["'][\\s\\S]*?<\\/style>`, 'gi'), '');
  html=html.replace(new RegExp(`<style id=["']${marker}["'][\\s\\S]*?<\\/style>`, 'gi'), '');
  html=html.replace('</head>', `${styleTag}</head>`);
  fs.writeFileSync(file, html);
  patched++;
}

console.log(`Reverted risky mobile footer gap fix and applied safe footer trim on ${patched} page(s).`);
