import fs from 'node:fs';
import path from 'node:path';

const BASE = 'https://etlaala.com';
const API = `${BASE}/wp-json/wp/v2/posts`;
const OUT = path.resolve('data/articles.json');

const topics = [
  { key:'georgia', label:'جورجيا', landing:'/georgia/', rx:/جورجيا|georgia/i, max:3 },
  { key:'malaysia', label:'ماليزيا', landing:'/malaysia/', rx:/ماليزيا|malaysia/i, max:3 },
  { key:'maldives', label:'المالديف', landing:'/maldives/', rx:/المالديف|مالديف|maldives/i, max:2 },
  { key:'thailand', label:'تايلاند', landing:'/thailand/', rx:/تايلاند|thailand|بانكوك|بوكيت|كرابي/i, max:3 },
  { key:'turkiye', label:'تركيا', landing:'/turkiye/', rx:/تركيا|turkey|turkiye|اسطنبول|إسطنبول|طرابزون/i, max:3 },
  { key:'bosnia', label:'البوسنة والهرسك', landing:'/bosnia-and-herzegovina/', rx:/البوسنة|البوسنه|bosnia|سراييفو/i, max:2 },
  { key:'europe', label:'أوروبا', landing:'/europe/', rx:/أوروبا|اوروبا|europe|شنغن|سويسرا|إيطاليا|ايطاليا|فرنسا|النمسا|بريطانيا|لندن/i, max:2 }
];
const intentRx = /السياحة|سياحي|عروض|تكلفة|ميزانية|جدول|برنامج|أفضل|افضل|وقت|موسم|شهر العسل|تأشيرة|فيزا|تذاكر|طيران|السعوديين|السعودية|دليل|رحلة|رحلتي/i;

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function fetchJson(url, attempt = 1) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 60000);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: { 'accept':'application/json', 'user-agent':'EtlaalaMigration/1.0 (+https://etlaala.net)' }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    return { data: await res.json(), headers: res.headers };
  } catch (err) {
    if (attempt >= 4) throw err;
    await sleep(2500 * attempt);
    return fetchJson(url, attempt + 1);
  } finally { clearTimeout(timer); }
}

function text(html='') {
  return String(html).replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi,' ').replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi,' ').replace(/<[^>]+>/g,' ').replace(/&nbsp;/g,' ').replace(/&amp;/g,'&').replace(/&#\d+;/g,' ').replace(/\s+/g,' ').trim();
}
function firstImage(html='') { return html.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1] || ''; }
function scorePost(post, topic) {
  const title = text(post.title?.rendered || '');
  const excerpt = text(post.excerpt?.rendered || '');
  const body = text(post.content?.rendered || '');
  if (!topic.rx.test(`${title} ${excerpt} ${body.slice(0,1200)}`)) return -1;
  if (body.length < 350) return -1;
  let score = topic.rx.test(title) ? 10 : 4;
  if (intentRx.test(title)) score += 4;
  if (/السعوديين|السعودية|من السعودية/i.test(title)) score += 3;
  if (/تكلفة|جدول|أفضل|افضل|تأشيرة|فيزا|شهر العسل|عروض/i.test(title)) score += 3;
  if (body.length > 1200) score += 2;
  if (body.length > 2500) score += 1;
  const ageDays = (Date.now() - new Date(post.modified || post.date).getTime()) / 86400000;
  if (ageDays < 400) score += 2;
  return score;
}

const all = [];
let page = 1, totalPages = 1;
while (page <= totalPages) {
  const { data, headers } = await fetchJson(`${API}?status=publish&per_page=100&page=${page}&orderby=date&order=desc&_embed=1`);
  totalPages = Number(headers.get('x-wp-totalpages') || 1);
  all.push(...data);
  page += 1;
}

const chosen = [];
const used = new Set();
for (const topic of topics) {
  const ranked = all.map(post => ({ post, score: scorePost(post, topic) })).filter(x => x.score >= 0).sort((a,b) => b.score - a.score || new Date(b.post.modified) - new Date(a.post.modified));
  let added = 0;
  for (const {post, score} of ranked) {
    if (used.has(post.id)) continue;
    const media = post?._embedded?.['wp:featuredmedia']?.[0];
    const oldLink = post.link || `${BASE}/${post.slug}/`;
    chosen.push({
      id: post.id,
      slug: post.slug,
      path: new URL(oldLink, BASE).pathname,
      topic: topic.key,
      topicLabel: topic.label,
      landing: topic.landing,
      seoScore: score,
      date: post.date,
      modified: post.modified,
      oldLink,
      title: post.title?.rendered || '',
      excerpt: post.excerpt?.rendered || '',
      content: post.content?.rendered || '',
      featuredImage: media?.source_url || firstImage(post.content?.rendered || ''),
      featuredAlt: media?.alt_text || text(post.title?.rendered || '')
    });
    used.add(post.id);
    added += 1;
    if (added >= topic.max) break;
  }
}

chosen.sort((a,b) => b.seoScore - a.seoScore || new Date(b.modified) - new Date(a.modified));
fs.mkdirSync(path.dirname(OUT), { recursive:true });
fs.writeFileSync(OUT, JSON.stringify({ source:BASE, syncedAt:new Date().toISOString(), count:chosen.length, posts:chosen }, null, 2));
console.log(`Selected ${chosen.length} SEO-supporting articles from ${all.length} published legacy posts.`);
