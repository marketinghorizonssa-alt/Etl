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

function stripTags(value = '') {
  return value
    .replace(/<script\b[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style\b[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;|&#160;/gi, ' ')
    .replace(/&amp;/gi, '&')
    .replace(/&quot;|&#34;/gi, '"')
    .replace(/&#39;|&apos;/gi, "'")
    .replace(/\s+/g, ' ')
    .trim();
}

function balancedTag(html, start, tag) {
  if (start < 0) return null;
  const re = new RegExp(`<\\/?${tag}\\b[^>]*>`, 'gi');
  re.lastIndex = start;
  let depth = 0;
  let first = -1;
  let openEnd = -1;
  let match;

  while ((match = re.exec(html))) {
    const closing = /^<\//.test(match[0]);
    if (!closing) {
      if (first < 0) {
        first = match.index;
        openEnd = re.lastIndex;
      }
      depth += 1;
    } else {
      depth -= 1;
      if (depth === 0 && first >= 0) {
        return {
          start: first,
          end: re.lastIndex,
          openEnd,
          closeStart: match.index,
          html: html.slice(first, re.lastIndex)
        };
      }
    }
  }
  return null;
}

function answerLength(detailsHtml = '') {
  const answer = detailsHtml.replace(/<summary\b[\s\S]*?<\/summary>/i, ' ');
  return stripTags(answer).length;
}

function sortDetailsInContainer(html, className) {
  const containerRe = new RegExp(`<div\\b[^>]*class=["'][^"']*\\b${className}\\b[^"']*["'][^>]*>`, 'gi');
  let searchFrom = 0;
  let changes = 0;

  while (true) {
    containerRe.lastIndex = searchFrom;
    const match = containerRe.exec(html);
    if (!match) break;

    const container = balancedTag(html, match.index, 'div');
    if (!container) break;

    const inner = html.slice(container.openEnd, container.closeStart);
    const detailStarts = [];
    const detailOpenRe = /<details\b[^>]*>/gi;
    let detailMatch;
    while ((detailMatch = detailOpenRe.exec(inner))) {
      const detail = balancedTag(inner, detailMatch.index, 'details');
      if (!detail) continue;
      detailStarts.push(detail);
      detailOpenRe.lastIndex = detail.end;
    }

    if (detailStarts.length >= 2) {
      const ranked = detailStarts.map((detail, index) => ({
        html: detail.html,
        length: answerLength(detail.html),
        index
      })).sort((a, b) => (a.length - b.length) || (a.index - b.index));

      const first = detailStarts[0].start;
      const last = detailStarts[detailStarts.length - 1].end;
      const sortedBlock = ranked.map(item => item.html).join('');
      const nextInner = inner.slice(0, first) + sortedBlock + inner.slice(last);
      const nextContainer = html.slice(container.start, container.openEnd) + nextInner + html.slice(container.closeStart, container.end);

      if (nextContainer !== container.html) {
        html = html.slice(0, container.start) + nextContainer + html.slice(container.end);
        changes += 1;
        searchFrom = container.start + nextContainer.length;
        continue;
      }
    }

    searchFrom = container.end;
  }

  return { html, changes };
}

function isDestinationPage(html) {
  return /data-premium-destination=|data-destination=|class=["'][^"']*\bdp-page\b|class=["'][^"']*\btk-premium\b|class=["'][^"']*\bdestination-hero\b/i.test(html);
}

const faqContainers = ['unified-faq-grid', 'dp-faq-grid', 'tk-faq-grid'];
let pagesChanged = 0;
let gridsChanged = 0;

for (const file of walk(out)) {
  let html = fs.readFileSync(file, 'utf8');
  if (!isDestinationPage(html)) continue;

  const before = html;
  for (const className of faqContainers) {
    const result = sortDetailsInContainer(html, className);
    html = result.html;
    gridsChanged += result.changes;
  }

  if (html !== before) {
    fs.writeFileSync(file, html);
    pagesChanged += 1;
  }
}

console.log(`Ordered destination FAQs from shortest to longest answer on ${pagesChanged} page(s), ${gridsChanged} FAQ grid(s).`);
