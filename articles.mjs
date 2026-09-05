import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const dataPath = path.resolve('data/articles.json');
const SITE = 'https://etlaala.net';
const OLD = 'https://etlaala.com';

if (!fs.existsSync(dataPath)) {
  console.log('No curated article data found; skipping articles build.');
  process.exit(0);
}

const { posts = [] } = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
if (!posts.length) {
  console.log('No curated articles selected; skipping articles build.');
  process.exit(0);
}

const templatePath = path.join(out, 'index.html');
let home = fs.readFileSync(templatePath, 'utf8');

const fallbackImages = {
  georgia: `${OLD}/wp-content/uploads/2025/02/Untitled-design-29.webp`,
  malaysia: `${OLD}/wp-content/uploads/2025/02/Untitled-design-31.png`,
  maldives: `${OLD}/wp-content/uploads/2025/02/Untitled-design-30.webp`,
  thailand: `${OLD}/wp-content/uploads/2025/02/Untitled-design-22.webp`,
  turkiye: `${OLD}/wp-content/uploads/2025/02/Untitled-design-33.webp`,
  bosnia: `${OLD}/wp-content/uploads/2025/06/3-3.webp`,
  europe: `${OLD}/wp-content/uploads/2024/03/pexels-margerretta-548077-scaled.jpg`
};

function decode(s='') {
  return String(s)
    .replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&quot;/g,'"').replace(/&#039;|&#39;/g,"'")
    .replace(/&lt;/g,'<').replace(/&gt;/g,'>')
    .replace(/&#8211;|&#x2013;/gi,'–').replace(/&#8212;|&#x2014;/gi,'—').replace(/&#8217;|&#x2019;/gi,'’')
    .replace(/&#8220;|&#x201c;/gi,'“').replace(/&#8221;|&#x201d;/gi,'”');
}
function text(html='') {
  return decode(String(html).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/\s+/g,' ').trim());
}
function esc(s='') { return String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c])); }
function desc(post) {
  const ex = text(post.excerpt || post.content || '');
  return ex.length > 155 ? `${ex.slice(0,152).trim()}…` : ex;
}
function image(post) { return post.featuredImage || fallbackImages[post.topic] || fallbackImages.georgia; }
function articlePath(post) { return `/${post.slug}/`; }
function dateAr(value) {
  try { return new Intl.DateTimeFormat('ar-SA',{year:'numeric',month:'long',day:'numeric'}).format(new Date(value)); }
  catch { return ''; }
}
function cleanContent(html='') {
  let s = String(html);
  s = s.replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,'');
  s = s.replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,'');
  s = s.replace(/<form\b[^>]*>[\s\S]*?<\/form>/gi,'');
  s = s.replace(/href=(["'])https?:\/\/(?:www\.)?etlaala\.com(\/[^"']*)\1/gi,'href=$1$2$1');
  s = s.replace(/href=(["'])https?:\/\/(?:www\.)?etlaala\.com\/?\1/gi,'href=$1/$1');
  return s;
}
function replaceHead(html, post) {
  const title = `${text(post.title)} | إطلالة للسفر والسياحة`;
  const description = desc(post);
  const canonical = `${SITE}${articlePath(post)}`;
  const img = image(post);
  html = html.replace(/<title>[\s\S]*?<\/title>/i, `<title>${esc(title)}</title>`);
  html = html.replace(/<meta name="description" content="[^"]*">/i, `<meta name="description" content="${esc(description)}">`);
  html = html.replace(/<link rel="canonical" href="[^"]*">/i, `<link rel="canonical" href="${canonical}">`);
  html = html.replace(/<meta property="og:title" content="[^"]*">/i, `<meta property="og:title" content="${esc(title)}">`);
  html = html.replace(/<meta property="og:description" content="[^"]*">/i, `<meta property="og:description" content="${esc(description)}">`);
  html = html.replace(/<meta property="og:url" content="[^"]*">/i, `<meta property="og:url" content="${canonical}">`);
  html = html.replace(/<meta property="og:type" content="[^"]*">/i, '<meta property="og:type" content="article">');
  if (/<meta property="og:image"/i.test(html)) html = html.replace(/<meta property="og:image" content="[^"]*">/i, `<meta property="og:image" content="${img}">`);
  else html = html.replace('</head>', `<meta property="og:image" content="${img}"></head>`);
  const schema = { '@context':'https://schema.org','@type':'Article',headline:text(post.title),description,datePublished:post.date,dateModified:post.modified,image:[img],mainEntityOfPage:canonical,publisher:{'@type':'Organization',name:'إطلالة للسفر والسياحة',url:SITE} };
  return html.replace('</head>', `<script type="application/ld+json">${JSON.stringify(schema)}</script></head>`);
}
function articleMain(post) {
  const content = cleanContent(post.content);
  return `<main id="main" class="article-main"><div class="article-shell container"><nav class="breadcrumbs" aria-label="مسار التنقل"><a href="/">الرئيسية</a><span>›</span><a href="/articles/">المقالات السياحية</a><span>›</span><span>${esc(post.topicLabel)}</span></nav><article class="article-page"><header class="article-head"><span class="article-topic">${esc(post.topicLabel)}</span><h1>${esc(text(post.title))}</h1><p class="article-date">${esc(dateAr(post.date))}</p></header><figure class="article-hero"><img src="${image(post)}" alt="${esc(post.featuredAlt || text(post.title))}" width="1200" height="675" loading="eager" fetchpriority="high"></figure><div class="article-content">${content}</div><aside class="article-cta"><div><span>خطط رحلتك إلى ${esc(post.topicLabel)}</span><strong>خلّ مستشار إطلالة يرتب لك البرنامج المناسب</strong></div><a class="gradient-btn" href="${post.landing}">شاهد برامج ${esc(post.topicLabel)}</a></aside></article></div></main>`;
}
function card(post) {
  const d = desc(post);
  return `<article class="seo-article-card"><a class="seo-article-image" href="${articlePath(post)}"><img src="${image(post)}" alt="${esc(post.featuredAlt || text(post.title))}" width="560" height="330" loading="lazy"></a><div class="seo-article-copy"><span>${esc(post.topicLabel)}</span><h3><a href="${articlePath(post)}">${esc(text(post.title))}</a></h3><p>${esc(d)}</p><a class="article-more" href="${articlePath(post)}">اقرأ المقال ←</a></div></article>`;
}

// Home: show three strong articles from different clusters.
const featured = [];
const seenTopics = new Set();
for (const post of posts) {
  if (seenTopics.has(post.topic)) continue;
  featured.push(post); seenTopics.add(post.topic);
  if (featured.length === 3) break;
}
const homeSection = `<section class="section seo-articles-home" id="articles"><div class="container"><div class="section-heading"><span>دليلك قبل السفر</span><h2>المقالات السياحية</h2><p>أدلة مختارة تدعم قرارك قبل الحجز وتجاوب أهم أسئلة السفر للوجهات التي نقدمها.</p></div><div class="seo-articles-grid">${featured.map(card).join('')}</div><div class="articles-all"><a class="ghost-link" href="/articles/">عرض كل المقالات المختارة</a></div></div></section>`;
if (!home.includes('id="articles"')) home = home.replace('</main>', `${homeSection}</main>`);
fs.writeFileSync(templatePath, home);

// Articles index.
const articleIndexMain = `<main id="main" class="articles-index"><section class="section"><div class="container"><div class="section-heading"><span>دليل إطلالة</span><h1>المقالات السياحية</h1><p>مقالات مختارة بعناية لدعم أهم وجهات إطلالة ونوايا البحث المفيدة للمسافر من السعودية.</p></div><div class="seo-articles-grid articles-full-grid">${posts.map(card).join('')}</div></div></section></main>`;
let indexHtml = home.replace(/<main id="main"[\s\S]*?<\/main>/i, articleIndexMain);
indexHtml = indexHtml.replace(/<title>[\s\S]*?<\/title>/i,'<title>المقالات السياحية | إطلالة للسفر والسياحة</title>')
  .replace(/<meta name="description" content="[^"]*">/i,'<meta name="description" content="أهم أدلة ومقالات السفر للوجهات السياحية التي تقدمها إطلالة للسفر والسياحة للمسافر من السعودية.">')
  .replace(/<link rel="canonical" href="[^"]*">/i,`<link rel="canonical" href="${SITE}/articles/">`)
  .replace(/<meta property="og:url" content="[^"]*">/i,`<meta property="og:url" content="${SITE}/articles/">`);
fs.mkdirSync(path.join(out,'articles'),{recursive:true});
fs.writeFileSync(path.join(out,'articles','index.html'),indexHtml);

// Individual article pages.
for (const post of posts) {
  let html = fs.readFileSync(templatePath,'utf8');
  html = replaceHead(html,post);
  html = html.replace(/<main id="main"[\s\S]*?<\/main>/i, articleMain(post));
  const dir = path.join(out, post.slug);
  fs.mkdirSync(dir,{recursive:true});
  fs.writeFileSync(path.join(dir,'index.html'),html);
}

// Add article URLs to sitemap.
const sitemapPath = path.join(out,'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  let sitemap = fs.readFileSync(sitemapPath,'utf8');
  const entries = [`${SITE}/articles/`, ...posts.map(p=>`${SITE}${articlePath(p)}`)].filter(u=>!sitemap.includes(`<loc>${u}</loc>`)).map(u=>`<url><loc>${u}</loc></url>`).join('');
  sitemap = sitemap.replace('</urlset>',`${entries}</urlset>`);
  fs.writeFileSync(sitemapPath,sitemap);
}

// Styling.
const cssPath = path.join(out,'assets','styles.css');
let css = fs.readFileSync(cssPath,'utf8');
if (!css.includes('seo-articles-curated-v1')) {
  css += `\n/* seo-articles-curated-v1 */\n.seo-articles-home{background:#fff}.seo-articles-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:22px}.seo-article-card{background:#fff;border:1px solid #e8ebf5;border-radius:18px;overflow:hidden;box-shadow:0 10px 32px rgba(22,33,77,.07);transition:transform .2s ease,box-shadow .2s ease}.seo-article-card:hover{transform:translateY(-4px);box-shadow:0 16px 38px rgba(22,33,77,.12)}.seo-article-image{display:block;aspect-ratio:16/9;overflow:hidden;background:#eef1f7}.seo-article-image img{width:100%;height:100%;object-fit:cover;transition:transform .3s ease}.seo-article-card:hover .seo-article-image img{transform:scale(1.025)}.seo-article-copy{padding:18px}.seo-article-copy>span,.article-topic{display:inline-block;color:#3e50d5;font-size:.82rem;font-weight:800;margin-bottom:8px}.seo-article-copy h3{font-size:1.12rem;line-height:1.6;margin:0 0 9px}.seo-article-copy h3 a{color:#152052}.seo-article-copy p{font-size:.92rem;line-height:1.8;color:#6a718d;margin:0 0 12px}.article-more,.ghost-link{color:#3a39c6;font-weight:800}.articles-all{text-align:center;margin-top:26px}.articles-full-grid{grid-template-columns:repeat(3,minmax(0,1fr))}.article-main{background:#f8f9fc;padding:34px 0 70px}.article-shell{max-width:1040px}.breadcrumbs{display:flex;flex-wrap:wrap;gap:8px;align-items:center;font-size:.86rem;color:#727997;margin-bottom:20px}.breadcrumbs a{color:#3848c9}.article-page{background:#fff;border-radius:24px;box-shadow:0 14px 50px rgba(20,31,78,.08);overflow:hidden}.article-head{padding:38px 44px 24px;text-align:right}.article-head h1{font-size:clamp(2rem,4vw,3rem);line-height:1.35;color:#152052;margin:0 0 10px}.article-date{color:#81879c;margin:0}.article-hero{margin:0}.article-hero img{display:block;width:100%;height:auto;max-height:560px;object-fit:cover}.article-content{padding:36px 44px;font-size:1.03rem;line-height:2;color:#31384f}.article-content h2,.article-content h3,.article-content h4{color:#17245c;line-height:1.5;margin-top:1.7em}.article-content img{max-width:100%;height:auto;border-radius:14px}.article-content a{color:#3548d4;text-decoration:underline;text-underline-offset:3px}.article-content ul,.article-content ol{padding-right:24px}.article-content table{display:block;max-width:100%;overflow:auto;border-collapse:collapse}.article-content td,.article-content th{border:1px solid #e1e4ed;padding:9px}.article-cta{margin:0 44px 40px;padding:22px;border-radius:18px;background:linear-gradient(135deg,#eef1ff,#fff3ec);display:flex;align-items:center;justify-content:space-between;gap:20px}.article-cta span{display:block;color:#5f6680;font-size:.9rem}.article-cta strong{display:block;color:#17245c;font-size:1.15rem;margin-top:4px}@media(max-width:900px){.seo-articles-grid,.articles-full-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.article-head,.article-content{padding-left:26px;padding-right:26px}.article-cta{margin-left:26px;margin-right:26px}}@media(max-width:620px){.seo-articles-grid,.articles-full-grid{grid-template-columns:1fr}.article-main{padding-top:20px}.article-page{border-radius:18px}.article-head{padding:28px 20px 18px}.article-content{padding:25px 20px;font-size:.98rem}.article-cta{margin:0 20px 28px;padding:18px;display:block}.article-cta .gradient-btn{display:inline-block;margin-top:14px}}\n`;
  fs.writeFileSync(cssPath,css);
}

console.log(`Built ${posts.length} curated SEO articles, /articles/, and homepage article cards.`);
