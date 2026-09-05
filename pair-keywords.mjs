import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');

const pairs = [
  {
    slugs: ['georgia', 'georgia-2'],
    meta: 'السياحة في جورجيا وعروض وبكجات جورجيا من السعودية: تبليسي وباتومي، برنامج 7 أيام، تكلفة السفر، برامج وبكج سفر جورجيا مع إطلالة.'
  },
  {
    slugs: ['malaysia', 'malaysia-2'],
    meta: 'السياحة في ماليزيا وبكجات وعروض ماليزيا من السعودية: برامج 7 و15 يوم، كوالالمبور والجزر، فنادق وانتقالات وبكج سياحي ماليزيا.'
  },
  {
    slugs: ['maldives', 'maldives-2'],
    meta: 'السياحة في المالديف وعروض وبكجات المالديف من السعودية: جزر ومنتجعات، تكلفة وأسعار السفر، فلل مائية وشهر العسل لشخصين.'
  },
  {
    slugs: ['thailand', 'thailand-2'],
    meta: 'السياحة في تايلاند وتايلند وعروض وبكجات السفر من السعودية: بانكوك وبوكيت وكرابي، فنادق ومنتجعات وبرامج وبكج شهر عسل.'
  },
  {
    slugs: ['turkiye', 'turkey-2'],
    meta: 'السياحة في تركيا وعروض وبكجات تركيا من السعودية: إسطنبول وطرابزون والشمال التركي وأنطاليا وبورصة، برامج ورحلات وحجز بكج تركيا.'
  }
];

function uniq(items) {
  return [...new Set(items.map(x => x.trim()).filter(Boolean))];
}

function extractSection(html) {
  const section = html.match(/<section class="section campaign-keywords"[\s\S]*?<\/section>/i)?.[0] || '';
  if (!section) return null;
  const heading = section.match(/<div class="section-heading">[\s\S]*?<\/div>/i)?.[0] || '';
  const topicsBody = section.match(/<div class="campaign-topic-grid">([\s\S]*?)<\/div>/i)?.[1] || '';
  const faqBody = section.match(/<div class="campaign-faq-wrap">[\s\S]*?<h3>[^<]*<\/h3>([\s\S]*?)<\/div>/i)?.[1] || '';
  const topics = topicsBody.match(/<article class="campaign-topic">[\s\S]*?<\/article>/gi) || [];
  const faqs = faqBody.match(/<details class="campaign-faq">[\s\S]*?<\/details>/gi) || [];
  return { section, heading, topics, faqs };
}

function replaceFaqSchema(html, faqs) {
  const qa = faqs.map(item => {
    const q = item.match(/<summary>([\s\S]*?)<\/summary>/i)?.[1]?.replace(/<[^>]+>/g, '').trim() || '';
    const a = item.match(/<p>([\s\S]*?)<\/p>/i)?.[1]?.replace(/<[^>]+>/g, '').trim() || '';
    return q && a ? { '@type':'Question', name:q, acceptedAnswer:{ '@type':'Answer', text:a } } : null;
  }).filter(Boolean);
  if (!qa.length) return html;
  const schema = JSON.stringify({ '@context':'https://schema.org', '@type':'FAQPage', mainEntity:qa });
  const scripts = [...html.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/gi)];
  for (const m of scripts) {
    if (!m[1].includes('FAQPage')) continue;
    return html.replace(m[0], `<script type="application/ld+json">${schema}</script>`);
  }
  return html.replace('</head>', `<script type="application/ld+json">${schema}</script></head>`);
}

let changed = 0;
for (const pair of pairs) {
  const docs = pair.slugs.map(slug => {
    const file = path.join(out, slug, 'index.html');
    if (!fs.existsSync(file)) return null;
    const html = fs.readFileSync(file, 'utf8');
    const extracted = extractSection(html);
    return extracted ? { slug, file, html, ...extracted } : null;
  }).filter(Boolean);

  if (docs.length < 2) continue;

  const allTopics = uniq(docs.flatMap(d => d.topics));
  const allFaqs = uniq(docs.flatMap(d => d.faqs));

  for (const doc of docs) {
    // Keep each page's own heading/intro and visual identity, but make the
    // underlying paid-search keyword coverage identical across the pair.
    const mergedSection = `<section class="section campaign-keywords" aria-labelledby="campaign-keywords-title"><div class="container">${doc.heading}<div class="campaign-topic-grid">${allTopics.join('')}</div><div class="campaign-faq-wrap"><h3>أسئلة شائعة قبل الحجز</h3>${allFaqs.join('')}</div></div></section>`;
    let html = doc.html.replace(doc.section, mergedSection);
    html = html.replace(/<meta name="description" content="[^"]*">/i, `<meta name="description" content="${pair.meta}">`);
    html = replaceFaqSchema(html, allFaqs);
    fs.writeFileSync(doc.file, html);
    changed++;
  }
}

console.log(`Mirrored complete destination keyword coverage across ${changed} paired landing pages.`);
