import fs from 'node:fs';
import path from 'node:path';

const cssPath = path.resolve('dist', 'assets', 'styles.css');
if (!fs.existsSync(cssPath)) process.exit(0);

let css = fs.readFileSync(cssPath, 'utf8');
const before = css;

css = css.replace(
  /(\.legal-hero,\.branch-page-hero\{)background-image:linear-gradient\([\s\S]*?\),url\(/,
  '$1background-image:url('
);

if (css !== before) {
  fs.writeFileSync(cssPath, css);
  console.log('Removed the color overlay from the purple hero image covers.');
} else {
  console.log('Purple hero overlay rule was not found; no changes made.');
}
