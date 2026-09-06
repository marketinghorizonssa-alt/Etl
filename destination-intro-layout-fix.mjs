import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const cssPath = path.join(out, 'assets', 'styles.css');

function allHtml(dir) {
  const result = [];
  if (!fs.existsSync(dir)) return result;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) result.push(...allHtml(full));
    else if (entry.isFile() && entry.name.endsWith('.html')) result.push(full);
  }
  return result;
}

// Remove the large inline image that was added above the planning content on every destination page.
for (const file of allHtml(out)) {
  let html = fs.readFileSync(file, 'utf8');
  const before = html;

  html = html.replace(/\s*<figure class="dp-inline-visual">[\s\S]*?<\/figure>\s*/g, '\n');
  html = html.replace(/\s*<figure class="tk-inline-visual">[\s\S]*?<\/figure>\s*/g, '\n');

  if (html !== before) fs.writeFileSync(file, html);
}

if (fs.existsSync(cssPath)) {
  let css = fs.readFileSync(cssPath, 'utf8');

  if (!css.includes('destination-intro-layout-fix-v2')) {
    css += `
/* destination-intro-layout-fix-v2 */
/* Keep the planning section compact and balanced without the large introductory image. */
.dp-page .dp-inline-visual,.tk-premium .tk-inline-visual{display:none!important}
.dp-page .dp-intro-grid{
  grid-template-columns:minmax(0,1.42fr) minmax(300px,.58fr)!important;
  gap:38px!important;
  align-items:start!important;
}
.dp-page .dp-intro-grid>.dp-copy{min-width:0}
.dp-page .dp-intro-grid>.dp-plan-note{align-self:start!important;width:100%!important}

.tk-premium .tk-route-grid{
  grid-template-columns:minmax(0,1.18fr) minmax(340px,.82fr)!important;
  gap:42px!important;
  align-items:start!important;
}
.tk-premium .tk-route-grid>.tk-copy{min-width:0}
.tk-premium .tk-route-grid>.tk-route-card{align-self:start!important;width:100%!important}

@media(max-width:1000px){
  .dp-page .dp-intro-grid,.tk-premium .tk-route-grid{grid-template-columns:1fr!important;gap:22px!important}
}
`;

    fs.writeFileSync(cssPath, css);
  }
}

console.log('Removed the large introductory image from all destination pages and kept the planning layout compact.');
