import fs from 'node:fs';
import path from 'node:path';

const BASE = 'https://etlaala.com';
const API = `${BASE}/wp-json/wp/v2/posts`;
const OUT = path.resolve('data/articles.json');

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function fetchJson(url, attempt = 1) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 60000);
  try {
    const res = await fetch(url, {
      signal: ctrl.signal,
      headers: {
        'accept': 'application/json',
        'user-agent': 'EtlaalaMigration/1.0 (+https://etlaala.net)'
      }
    });
    if (!res.ok) throw new Error(`HTTP ${res.status} ${res.statusText}`);
    return { data: await res.json(), headers: res.headers };
  } catch (err) {
    if (attempt >= 4) throw err;
    await sleep(2500 * attempt);
    return fetchJson(url, attempt + 1);
  } finally {
    clearTimeout(timer);
  }
}

function firstImage(html = '') {
  const m = html.match(/<img[^>]+src=["']([^"']+)["']/i);
  return m ? m[1] : '';
}

function cleanText(html = '') {
  return html
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/g, ' ')
    .replace(/&amp;/g, '&')
    .replace(/&#8211;|&#x2013;/gi, '–')
    .replace(/&#8212;|&#x2014;/gi, '—')
    .replace(/&#8217;|&#x2019;/gi, '’')
    .replace(/&#8220;|&#x201c;/gi, '“')
    .replace(/&#8221;|&#x201d;/gi, '”')
    .replace(/\s+/g, ' ')
    .trim();
}

const all = [];
let page = 1;
let totalPages = 1;

while (page <= totalPages) {
  const url = `${API}?status=publish&per_page=100&page=${page}&orderby=date&order=desc&_embed=1`;
  console.log(`Fetching legacy posts page ${page}...`);
  const { data, headers } = await fetchJson(url);
  totalPages = Number(headers.get('x-wp-totalpages') || 1);
  for (const post of data) {
    const media = post?._embedded?.['wp:featuredmedia']?.[0];
    const featured = media?.source_url || firstImage(post.content?.rendered || '');
    const alt = media?.alt_text || cleanText(media?.caption?.rendered || '') || cleanText(post.title?.rendered || '');
    all.push({
      id: post.id,
      slug: post.slug,
      date: post.date,
      modified: post.modified,
      link: post.link,
      title: post.title?.rendered || '',
      excerpt: post.excerpt?.rendered || '',
      content: post.content?.rendered || '',
      featuredImage: featured,
      featuredAlt: alt,
      categories: post.categories || []
    });
  }
  page += 1;
}

all.sort((a, b) => new Date(b.date) - new Date(a.date));
fs.mkdirSync(path.dirname(OUT), { recursive: true });
fs.writeFileSync(OUT, JSON.stringify({
  source: BASE,
  syncedAt: new Date().toISOString(),
  count: all.length,
  posts: all
}, null, 2));
console.log(`Saved ${all.length} published posts to ${OUT}`);
