import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const mediaDir = path.join(out, 'assets', 'media');

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full, files);
    else if (entry.isFile() && /\.(?:html|css|js|xml|txt)$/i.test(entry.name)) files.push(full);
  }
  return files;
}

const fallbacks = {
  'جورجيا': 'https://etlaala.com/wp-content/uploads/2025/02/Untitled-design-29.webp',
  'ماليزيا': 'https://etlaala.com/wp-content/uploads/2025/02/Untitled-design-31.png',
  'المالديف': 'https://etlaala.com/wp-content/uploads/2025/02/Untitled-design-30.webp',
  'تايلاند': 'https://etlaala.com/wp-content/uploads/2025/02/Untitled-design-22.webp',
  'تركيا': 'https://etlaala.com/wp-content/uploads/2025/02/Untitled-design-33.webp',
  'البوسنة والهرسك': 'https://etlaala.com/wp-content/uploads/2025/06/3-3.webp',
  'أوروبا': 'https://etlaala.com/wp-content/uploads/2024/03/pexels-margerretta-548077-scaled.jpg'
};

const files = walk(out);
const missingRe = /\/assets\/media\/([A-Za-z0-9._-]+\.(?:avif|webp|png|jpe?g|gif|svg))/gi;
const replacementByRef = new Map();

// Learn which missing featured image belongs to which article topic from article pages.
for (const file of files.filter(f => /\.html$/i.test(f))) {
  const html = fs.readFileSync(file, 'utf8');
  const topic = html.match(/<span class=["']article-topic["']>([^<]+)<\/span>/i)?.[1]?.trim();
  if (!topic || !fallbacks[topic]) continue;

  for (const m of html.matchAll(missingRe)) {
    const ref = m[0];
    const name = m[1];
    if (!fs.existsSync(path.join(mediaDir, name))) replacementByRef.set(ref, fallbacks[topic]);
  }
}

let repairedRefs = 0;
let changedFiles = 0;
for (const file of files) {
  let text = fs.readFileSync(file, 'utf8');
  const before = text;
  for (const [ref, fallback] of replacementByRef.entries()) {
    if (text.includes(ref)) {
      text = text.split(ref).join(fallback);
      repairedRefs += 1;
    }
  }
  if (text !== before) {
    fs.writeFileSync(file, text);
    changedFiles += 1;
  }
}

// Fail the build if any local media reference is still missing.
const unresolved = new Set();
for (const file of files) {
  const text = fs.readFileSync(file, 'utf8');
  for (const m of text.matchAll(missingRe)) {
    if (!fs.existsSync(path.join(mediaDir, m[1]))) unresolved.add(m[0]);
  }
}

if (unresolved.size) {
  throw new Error(`Unresolved local media references: ${[...unresolved].join(', ')}`);
}

console.log(`Repaired ${replacementByRef.size} missing article media reference(s) across ${changedFiles} file(s).`);
