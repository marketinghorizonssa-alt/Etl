import fs from 'node:fs';
import path from 'node:path';

const file = path.resolve('dist', 'index.html');

function balancedTag(html, start, tag) {
  if (start < 0) return null;
  const re = new RegExp(`<\\/?${tag}\\b[^>]*>`, 'gi');
  re.lastIndex = start;
  let depth = 0;
  let first = -1;
  let m;
  while ((m = re.exec(html))) {
    const closing = /^<\//.test(m[0]);
    if (!closing) {
      if (first < 0) first = m.index;
      depth++;
    } else {
      depth--;
      if (depth === 0 && first >= 0) {
        return { start: first, end: re.lastIndex };
      }
    }
  }
  return null;
}

if (fs.existsSync(file)) {
  let html = fs.readFileSync(file, 'utf8');
  const start = html.search(/<section\b[^>]*class=["'][^"']*contextual-seo[^"']*["'][^>]*data-contextual-seo=["'](?:general|home)["'][^>]*>/i);
  const section = start >= 0 ? balancedTag(html, start, 'section') : null;

  if (section) {
    html = html.slice(0, section.start) + html.slice(section.end);
    fs.writeFileSync(file, html);
    console.log('Removed contextual keyword card section from homepage only.');
  } else {
    console.log('Homepage contextual section not found; nothing to remove.');
  }
}
