import fs from 'node:fs';
import path from 'node:path';

const file = path.resolve('dist', 'europe', 'london', 'index.html');
if (!fs.existsSync(file)) throw new Error(`Missing London page: ${file}`);

const oldIntro = 'https://etlaala.com/wp-content/uploads/2024/08/أهم-المعالم-السياحية-في-لندن-2.webp';
const cleanLondon = 'https://etlaala.com/wp-content/uploads/2025/03/london-eye-945497_1280-1024x576.jpg';

let html = fs.readFileSync(file, 'utf8');
if (!html.includes(oldIntro)) {
  console.log('London intro image already clean; no change needed.');
  process.exit(0);
}

html = html.replace(oldIntro, cleanLondon);
fs.writeFileSync(file, html);
console.log('Replaced branded London intro image with a clean London image.');
