import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

function plain(value = '') {
  return String(value).replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

const legacyRouteMap = new Map([
  ['/skiing-georgia-winter-tourism-2026/', '/georgia/'],
  ['/السياحة-في-جورجيا/', '/georgia/'],
  ['/بكج-سفر-جورجيا/', '/georgia/'],
  ['/kazbegi-georgia-tourism-guide-2026/', '/georgia/'],
  ['/kutaisi-georgia-tourism-guide-2026/', '/georgia/'],
  ['/saudi-passport-visa-free-countries-2026/', '/articles/'],
  ['/summer-2026-family-egypt-turkey-malaysia/', '/malaysia/'],
  ['/honeymoon-packages-winter-2026/', '/رحلات-الكروز-وشهر-العسل/']
]);

let changed = 0;
let normalizedPreviewLinks = 0;
let legacyLinksFixed = 0;
let duplicateH1Removed = 0;
let stalePreloadsRemoved = 0;

for (const file of walk(out)) {
  let html = fs.readFileSync(file, 'utf8');
  const before = html;

  // Production must never inherit the GitHub Pages /Etl/ preview base path.
  html = html.replace(/\b(href|src)=(['"])(?:\/Etl)+(\/[^'"]*)\2/gi, (_m, attr, q, rest) => {
    normalizedPreviewLinks += 1;
    return `${attr}=${q}${rest}${q}`;
  });
  html = html.replace(/\b(href|src)=(['"])\/Etl\/?\2/gi, (_m, attr, q) => {
    normalizedPreviewLinks += 1;
    return `${attr}=${q}/${q}`;
  });

  // Replace links to legacy articles/pages that are intentionally not part of the new site.
  for (const [from, to] of legacyRouteMap) {
    const escaped = from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const re = new RegExp(`href=(['"])${escaped}(?:#[^'"]*)?\\1`, 'gi');
    html = html.replace(re, (_m, q) => {
      legacyLinksFixed += 1;
      return `href=${q}${to}${q}`;
    });
  }

  // Keep a single H1 on article pages when the imported content repeats the article title.
  const headerTitle = html.match(/<header class="article-head">[\s\S]*?<h1[^>]*>([\s\S]*?)<\/h1>/i)?.[1];
  if (headerTitle) {
    html = html.replace(/(<div class="article-content">\s*)<h1[^>]*>([\s\S]*?)<\/h1>/i, (m, prefix, inner) => {
      if (plain(inner) !== plain(headerTitle)) return m;
      duplicateH1Removed += 1;
      return prefix;
    });
  }

  // Remove stale image preloads that do not point to an image actually used in this document,
  // and deduplicate valid preloads. Hero images already carry fetchpriority="high".
  const preloadRe = /<link\b[^>]*rel=["']preload["'][^>]*as=["']image["'][^>]*>/gi;
  const preloadTags = [...html.matchAll(preloadRe)].map(m => m[0]);
  const seenPreloads = new Set();
  for (const tag of preloadTags) {
    const href = tag.match(/href=["']([^"']+)["']/i)?.[1];
    if (!href) continue;
    const withoutTag = html.replace(tag, '');
    const escapedHref = href.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const usedInImg = new RegExp(`<img\\b[^>]*src=["']${escapedHref}["']`, 'i').test(withoutTag);
    if (!usedInImg || seenPreloads.has(href)) {
      html = html.replace(tag, '');
      stalePreloadsRemoved += 1;
    } else {
      seenPreloads.add(href);
    }
  }

  // HTML cleanup and copy consistency for the sheet-only form flow.
  html = html.replace(/(?:\s+decoding=["']async["']){2,}/gi, ' decoding="async"');
  html = html.replaceAll(
    'عبّ البيانات اللي تعرفها، ونرتّب معك باقي التفاصيل على واتساب.',
    'عبّ البيانات اللي تعرفها، ومستشارنا يتواصل معك لإكمال باقي التفاصيل.'
  );

  if (html !== before) {
    fs.writeFileSync(file, html);
    changed += 1;
  }
}

console.log(`Final production QA updated ${changed} page(s): normalized ${normalizedPreviewLinks} preview link(s), fixed ${legacyLinksFixed} legacy link(s), removed ${duplicateH1Removed} duplicate H1(s), removed ${stalePreloadsRemoved} stale/duplicate image preload(s).`);
