import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const cssPath = path.join(out,'assets','styles.css');
const PHONE = '+966920029967';
const WA = '966125422331';
const waHref = `https://api.whatsapp.com/send?phone=${WA}&text=${encodeURIComponent('مرحباً إطلالة، أبغى عرض رحلة')}`;

function allHtml(dir){
  const files=[];
  if(!fs.existsSync(dir)) return files;
  for(const e of fs.readdirSync(dir,{withFileTypes:true})){
    const p=path.join(dir,e.name);
    if(e.isDirectory()) files.push(...allHtml(p));
    else if(e.isFile() && e.name.endsWith('.html')) files.push(p);
  }
  return files;
}

function attrsToWhatsApp(attrs){
  let a=attrs.replace(/\s+href="[^"]*"/,'');
  a=a.replace(/\s+data-track="[^"]*"/g,'');
  return `${a} href="${waHref}" data-track="whatsapp"`;
}

for(const file of allHtml(out)){
  let html=fs.readFileSync(file,'utf8');

  // Every visible primary CTA named "اطلب عرضك" or "اطلب برنامجك" opens WhatsApp directly.
  html=html.replace(/<a([^>]*)>([\s\S]*?)(اطلب\s+(?:عرضك|برنامجك))([\s\S]*?)<\/a>/g,(m,attrs,before,label,after)=>{
    return `<a${attrsToWhatsApp(attrs)}>${before}${label}${after}</a>`;
  });

  // In hero CTA pairs, the secondary button is always a direct phone call.
  html=html.replace(/(<div class="tk-actions">\s*<a[^>]*>[\s\S]*?اطلب\s+برنامجك[\s\S]*?<\/a>)\s*<a[^>]*>[\s\S]*?<\/a>/g,
    `$1<a class="ghost-btn" data-track="call" href="tel:${PHONE}">اتصل بنا</a>`);
  html=html.replace(/(<div class="ud-hero-actions">\s*<a[^>]*>[\s\S]*?اطلب\s+برنامجك[\s\S]*?<\/a>)\s*<a[^>]*>[\s\S]*?<\/a>/g,
    `$1<a class="ghost-btn" data-track="call" href="tel:${PHONE}">اتصل بنا</a>`);

  // Normalize CTA sections that already have a phone link beside the WhatsApp CTA.
  html=html.replace(/<a([^>]*)data-track="call"([^>]*)href="tel:[^"]+"([^>]*)>(?:أو\s*)?اتصل بنا<\/a>/g,
    `<a$1data-track="call"$2href="tel:${PHONE}"$3>اتصل بنا</a>`);

  fs.writeFileSync(file,html);
}

if(fs.existsSync(cssPath)){
  let css=fs.readFileSync(cssPath,'utf8');
  if(!css.includes('turkey-featured-hover-fix-v1')){
    css += `\n/* turkey-featured-hover-fix-v1 */\n.tk-program-grid.tk-program-grid-refined article.tk-program-card-featured:hover{background:linear-gradient(145deg,#102d8f 0%,#1d3aad 58%,#6f2b92 100%);color:#fff;transform:translateY(-14px);box-shadow:0 24px 52px rgba(22,48,145,.24)}.tk-program-grid.tk-program-grid-refined article.tk-program-card-featured:hover h3{color:#fff}.tk-program-grid.tk-program-grid-refined article.tk-program-card-featured:hover p{color:rgba(255,255,255,.84)}.tk-program-grid.tk-program-grid-refined article.tk-program-card-featured:hover a{color:#fff;border-bottom-color:rgba(255,255,255,.4)}.tk-program-grid.tk-program-grid-refined article.tk-program-card-featured:hover .tk-program-no{background:rgba(255,255,255,.16);color:#fff!important}.tk-program-grid.tk-program-grid-refined article.tk-program-card-featured:hover .tk-program-tag{background:rgba(255,255,255,.14);color:#e7f8ff!important}\n`;
    fs.writeFileSync(cssPath,css);
  }
}

console.log('Fixed featured program hover and routed request CTAs to WhatsApp with adjacent phone actions.');
