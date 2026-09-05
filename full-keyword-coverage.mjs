import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const pairs = [
  ['georgia','georgia-2'],
  ['malaysia','malaysia-2'],
  ['maldives','maldives-2'],
  ['thailand','thailand-2'],
  ['turkiye','turkey-2']
];

function sectionOf(html){
  const m=html.match(/<section class="section campaign-keywords"[\s\S]*?<\/section>/i);
  return m?m[0]:'';
}
function topicsOf(section){ return [...section.matchAll(/<article class="campaign-topic">[\s\S]*?<\/article>/gi)].map(m=>m[0]); }
function faqOf(section){ return [...section.matchAll(/<details class="campaign-faq">[\s\S]*?<\/details>/gi)].map(m=>m[0]); }
function unique(items){ const seen=new Set(); return items.filter(x=>{const k=x.replace(/\s+/g,' ').trim();if(seen.has(k))return false;seen.add(k);return true;}); }
function headingOf(section){
  const m=section.match(/<div class="section-heading">([\s\S]*?)<div class="campaign-topic-grid">/i);
  return m?m[1]:'';
}

let changed=0;
for(const [a,b] of pairs){
  const fa=path.join(out,a,'index.html'), fb=path.join(out,b,'index.html');
  if(!fs.existsSync(fa)||!fs.existsSync(fb)) continue;
  let ha=fs.readFileSync(fa,'utf8'), hb=fs.readFileSync(fb,'utf8');
  const sa=sectionOf(ha), sb=sectionOf(hb);
  if(!sa||!sb) continue;
  const topics=unique([...topicsOf(sa),...topicsOf(sb)]).join('');
  const faqs=unique([...faqOf(sa),...faqOf(sb)]).join('');
  const headA=headingOf(sa), headB=headingOf(sb);
  const make=(head)=>`<section class="section campaign-keywords" aria-labelledby="campaign-keywords-title"><div class="container"><div class="section-heading">${head}<div class="campaign-topic-grid">${topics}</div><div class="campaign-faq-wrap"><h3>أسئلة شائعة قبل الحجز</h3>${faqs}</div></div></section>`;
  ha=ha.replace(sa,make(headA));
  hb=hb.replace(sb,make(headB));
  fs.writeFileSync(fa,ha); fs.writeFileSync(fb,hb); changed+=2;
}
console.log(`Applied full campaign keyword coverage to ${changed} paired landing pages.`);
