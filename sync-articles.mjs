import fs from 'node:fs';
import path from 'node:path';

const SNAPSHOT_BASE = 'https://marketinghorizonssa-alt.github.io/Etl';
const OUT = path.resolve('data/articles.json');

// Fixed curated set selected from the 2026-08-10 Etlaala backup.
// We read the already-migrated article pages from the stable GitHub Pages snapshot
// instead of depending on the very slow legacy WordPress server during every build.
const selected = [
  {id:10140,slug:'georgia-honeymoon-packages-saudi-2026',topic:'georgia',topicLabel:'جورجيا',landing:'/georgia/',seoScore:27},
  {id:9967, slug:'best-time-visit-georgia-2026',topic:'georgia',topicLabel:'جورجيا',landing:'/georgia/',seoScore:24},
  {id:10191,slug:'malaysia-best-time-to-visit-seasons-islands-saudi-2026',topic:'malaysia',topicLabel:'ماليزيا',landing:'/malaysia/',seoScore:26},
  {id:10138,slug:'malaysia-luxury-packages-kl-langkawi-saudi-2026',topic:'malaysia',topicLabel:'ماليزيا',landing:'/malaysia/',seoScore:27},
  {id:10136,slug:'maldives-honeymoon-packages-saudi-2026',topic:'maldives',topicLabel:'المالديف',landing:'/maldives/',seoScore:27},
  {id:10175,slug:'maldives-budget-travel-saudi-2026',topic:'maldives',topicLabel:'المالديف',landing:'/maldives/',seoScore:25},
  {id:10177,slug:'thailand-family-packages-saudi-2026',topic:'thailand',topicLabel:'تايلاند',landing:'/thailand/',seoScore:25},
  {id:10176,slug:'thailand-honeymoon-packages-saudi-2026',topic:'thailand',topicLabel:'تايلاند',landing:'/thailand/',seoScore:25},
  {id:10124,slug:'turkey-luxury-family-packages-saudi-2026',topic:'turkiye',topicLabel:'تركيا',landing:'/turkiye/',seoScore:27},
  {id:10180,slug:'turkey-honeymoon-packages-saudi-2026',topic:'turkiye',topicLabel:'تركيا',landing:'/turkiye/',seoScore:25},
  {id:10192,slug:'bosnia-visa-free-saudi-deadline-september-2026',topic:'bosnia',topicLabel:'البوسنة والهرسك',landing:'/bosnia-and-herzegovina/',seoScore:26},
  {id:10181,slug:'bosnia-complete-guide-saudi-2026',topic:'bosnia',topicLabel:'البوسنة والهرسك',landing:'/bosnia-and-herzegovina/',seoScore:25},
  {id:9819, slug:'schengen-visa-saudi-2026',topic:'europe',topicLabel:'أوروبا',landing:'/europe/',seoScore:25},
  {id:9821, slug:'halal-restaurants-europe-guide',topic:'europe',topicLabel:'أوروبا',landing:'/europe/',seoScore:23}
];

function decode(s='') {
  return String(s)
    .replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#039;|&#39;/g,"'")
    .replace(/&lt;/g,'<').replace(/&gt;/g,'>');
}
function plain(html='') {
  return decode(String(html).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim());
}
function attr(html, re) { return html.match(re)?.[1] || ''; }
function normalizePreviewPaths(html='') {
  return String(html)
    .replace(/\b(href|src)=(['"])(?:\/Etl)+(\/[^'"]*)\2/gi, '$1=$2$3$2')
    .replace(/\b(href|src)=(['"])\/Etl\/?\2/gi, '$1=$2/$2');
}
async function getText(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 15000);
  try {
    const res = await fetch(url, { signal: ctrl.signal, headers: { accept:'text/html', 'user-agent':'EtlaalaBuild/2.0' } });
    if (!res.ok) throw new Error(`HTTP ${res.status} ${url}`);
    return await res.text();
  } finally { clearTimeout(timer); }
}

const posts = [];
for (const item of selected) {
  try {
    const html = await getText(`${SNAPSHOT_BASE}/${item.slug}/`);
    const title = plain(attr(html, /<h1[^>]*>([\s\S]*?)<\/h1>/i)) || item.slug;
    const content = normalizePreviewPaths(attr(html, /<div class="article-content">([\s\S]*?)<\/div>\s*<aside class="article-cta">/i));
    const featuredImage = normalizePreviewPaths(attr(html, /<meta property="og:image" content="([^"]*)">/i));
    const firstP = attr(content, /<p[^>]*>([\s\S]*?)<\/p>/i);
    let date = '2026-08-10T00:00:00';
    let modified = date;
    const schemas = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
    for (const m of schemas) {
      try {
        const schema = JSON.parse(m[1]);
        if (schema?.['@type'] === 'Article') {
          date = schema.datePublished || date;
          modified = schema.dateModified || date;
          break;
        }
      } catch {}
    }
    if (!content) throw new Error(`Article content not found for ${item.slug}`);
    posts.push({
      ...item,
      path:`/${item.slug}/`,
      date,
      modified,
      oldLink:`https://etlaala.com/${item.slug}/`,
      title,
      excerpt:plain(firstP),
      content,
      featuredImage,
      featuredAlt:title
    });
  } catch (err) {
    console.warn(`Article snapshot skipped: ${item.slug}: ${err.message}`);
  }
}

posts.sort((a,b)=>b.seoScore-a.seoScore || a.slug.localeCompare(b.slug));
if (posts.length < 10) throw new Error(`Only ${posts.length} curated article snapshots were available; expected at least 10.`);
fs.mkdirSync(path.dirname(OUT), { recursive:true });
fs.writeFileSync(OUT, JSON.stringify({source:'2026-08-10 curated legacy article set via Etlaala migration snapshot',count:posts.length,posts}, null, 2));
console.log(`Loaded ${posts.length} curated SEO articles from the stable Etlaala migration snapshot.`);
