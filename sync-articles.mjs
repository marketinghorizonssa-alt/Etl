import fs from 'node:fs';
import path from 'node:path';

const BASE = 'https://etlaala.com';
const OUT = path.resolve('data/articles.json');

// Curated from the 2026-08-10 backup only. These posts support the landing-page clusters
// without importing the full legacy archive or creating unnecessary index bloat.
const selected = [
  {id:10140,topic:'georgia',topicLabel:'جورجيا',landing:'/georgia/',seoScore:27},
  {id:9967, topic:'georgia',topicLabel:'جورجيا',landing:'/georgia/',seoScore:24},
  {id:10191,topic:'malaysia',topicLabel:'ماليزيا',landing:'/malaysia/',seoScore:26},
  {id:10138,topic:'malaysia',topicLabel:'ماليزيا',landing:'/malaysia/',seoScore:27},
  {id:10136,topic:'maldives',topicLabel:'المالديف',landing:'/maldives/',seoScore:27},
  {id:10175,topic:'maldives',topicLabel:'المالديف',landing:'/maldives/',seoScore:25},
  {id:10177,topic:'thailand',topicLabel:'تايلاند',landing:'/thailand/',seoScore:25},
  {id:10176,topic:'thailand',topicLabel:'تايلاند',landing:'/thailand/',seoScore:25},
  {id:10124,topic:'turkiye',topicLabel:'تركيا',landing:'/turkiye/',seoScore:27},
  {id:10180,topic:'turkiye',topicLabel:'تركيا',landing:'/turkiye/',seoScore:25},
  {id:10192,topic:'bosnia',topicLabel:'البوسنة والهرسك',landing:'/bosnia-and-herzegovina/',seoScore:26},
  {id:10181,topic:'bosnia',topicLabel:'البوسنة والهرسك',landing:'/bosnia-and-herzegovina/',seoScore:25},
  {id:9819, topic:'europe',topicLabel:'أوروبا',landing:'/europe/',seoScore:25},
  {id:9821, topic:'europe',topicLabel:'أوروبا',landing:'/europe/',seoScore:23}
];
const meta = new Map(selected.map(x => [x.id,x]));
const ids = selected.map(x=>x.id).join(',');

const sleep = ms => new Promise(r=>setTimeout(r,ms));
async function get(url, attempt=1){
  const ctrl=new AbortController();
  const timer=setTimeout(()=>ctrl.abort(),45000);
  try{
    const res=await fetch(url,{signal:ctrl.signal,headers:{accept:'application/json','user-agent':'EtlaalaMigration/1.0 (+https://etlaala.net)'}});
    if(!res.ok) throw new Error(`HTTP ${res.status}`);
    return await res.json();
  }catch(err){
    if(attempt>=3) throw err;
    await sleep(2000*attempt);
    return get(url,attempt+1);
  }finally{clearTimeout(timer);}
}
function plain(html=''){return String(html).replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/\s+/g,' ').trim();}
function firstImage(html=''){return String(html).match(/<img[^>]+src=["']([^"']+)["']/i)?.[1]||'';}

const posts = await get(`${BASE}/wp-json/wp/v2/posts?include=${ids}&per_page=100&orderby=include&_embed=1`);
const out=[];
for(const post of posts){
  const m=meta.get(post.id); if(!m) continue;
  const media=post?._embedded?.['wp:featuredmedia']?.[0];
  out.push({
    ...m,
    slug:post.slug,
    path:`/${post.slug}/`,
    date:post.date,
    modified:post.modified,
    oldLink:post.link,
    title:post.title?.rendered||'',
    excerpt:post.excerpt?.rendered||'',
    content:post.content?.rendered||'',
    featuredImage:media?.source_url||firstImage(post.content?.rendered||''),
    featuredAlt:media?.alt_text||plain(post.title?.rendered||'')
  });
}
out.sort((a,b)=>b.seoScore-a.seoScore||new Date(b.modified)-new Date(a.modified));
if(out.length < 10) throw new Error(`Only ${out.length} curated legacy articles were returned; expected most of 14.`);
fs.mkdirSync(path.dirname(OUT),{recursive:true});
fs.writeFileSync(OUT,JSON.stringify({source:'2026-08-10 curated legacy article set',count:out.length,posts:out},null,2));
console.log(`Synced ${out.length} curated SEO articles from the fixed 2026-08-10 selection.`);
