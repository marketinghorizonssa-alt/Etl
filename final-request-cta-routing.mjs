import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const PHONE = '+966920029967';
const WA = '966125422331';
const waHref = `https://api.whatsapp.com/send?phone=${WA}&text=${encodeURIComponent('مرحباً إطلالة، أبغى أطلب عرض رحلة')}`;

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

function visibleText(inner){
  return inner.replace(/<[^>]*>/g,' ').replace(/&nbsp;/g,' ').replace(/\s+/g,' ').trim();
}

function cleanAttrs(attrs){
  return attrs
    .replace(/\s+href=("[^"]*"|'[^']*')/gi,'')
    .replace(/\s+data-track=("[^"]*"|'[^']*')/gi,'');
}

function routeRequestAnchors(html){
  return html.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi,(whole,attrs,inner)=>{
    const text=visibleText(inner);
    if(!/اطلب\s+(?:عرضك|برنامجك)/.test(text)) return whole;
    return `<a${cleanAttrs(attrs)} href="${waHref}" data-track="whatsapp">${inner}</a>`;
  });
}

function forceHeroPair(html, className){
  const re=new RegExp(`<div class="${className}">([\\s\\S]*?)<\\/div>`,'g');
  return html.replace(re,(whole,body)=>{
    const anchors=[...body.matchAll(/<a\b[^>]*>[\s\S]*?<\/a>/gi)].map(m=>m[0]);
    const request=anchors.find(a=>/اطلب\s+(?:عرضك|برنامجك)/.test(visibleText(a))) || null;
    if(!request) return whole;
    const routed=routeRequestAnchors(request);
    return `<div class="${className}">${routed}<a class="ghost-btn" data-track="call" href="tel:${PHONE}">اتصل بنا</a></div>`;
  });
}

for(const file of allHtml(out)){
  let html=fs.readFileSync(file,'utf8');
  html=routeRequestAnchors(html);
  html=forceHeroPair(html,'tk-actions');
  html=forceHeroPair(html,'ud-hero-actions');

  // Normalize every visible "اتصل بنا" anchor to a direct phone link.
  html=html.replace(/<a\b([^>]*)>([\s\S]*?)<\/a>/gi,(whole,attrs,inner)=>{
    if(visibleText(inner)!=='اتصل بنا') return whole;
    let a=attrs
      .replace(/\s+href=("[^"]*"|'[^']*')/gi,'')
      .replace(/\s+data-track=("[^"]*"|'[^']*')/gi,'');
    return `<a${a} href="tel:${PHONE}" data-track="call">${inner}</a>`;
  });

  fs.writeFileSync(file,html);
}

console.log('Forced all request-offer/program CTAs to WhatsApp and all adjacent call actions to tel links.');
