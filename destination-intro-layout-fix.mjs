import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const cssPath = path.join(out, 'assets', 'styles.css');

const destinationSlugs = [
  'georgia',
  'malaysia',
  'maldives',
  'thailand',
  'bosnia-and-herzegovina',
  'europe'
];

function moveDestinationIntroImage(slug) {
  const file = path.join(out, slug, 'index.html');
  if (!fs.existsSync(file)) return;

  let html = fs.readFileSync(file, 'utf8');
  if (!html.includes('class="dp-page')) return;

  const match = html.match(/<figure class="dp-inline-visual">[\s\S]*?<\/figure>/);
  if (!match) return;

  const figure = match[0];
  html = html.replace(/\s*<figure class="dp-inline-visual">[\s\S]*?<\/figure>\s*/g, '\n');
  html = html.replace(
    '<div class="container dp-intro-grid">',
    `<div class="container dp-intro-grid">${figure}`
  );

  fs.writeFileSync(file, html);
}

for (const slug of destinationSlugs) moveDestinationIntroImage(slug);

const turkeyPath = path.join(out, 'turkiye', 'index.html');
if (fs.existsSync(turkeyPath)) {
  let html = fs.readFileSync(turkeyPath, 'utf8');
  const match = html.match(/<figure class="tk-inline-visual">[\s\S]*?<\/figure>/);

  if (match) {
    const turkeyFigure = match[0]
      .replace(/src="[^"]*"/, 'src="https://etlaala.com/wp-content/uploads/2025/06/تركيا-2-scaled.webp"')
      .replace(/alt="[^"]*"/, 'alt="إسطنبول والطبيعة في تركيا"');

    html = html.replace(/\s*<figure class="tk-inline-visual">[\s\S]*?<\/figure>\s*/g, '\n');
    html = html.replace(
      '<div class="container tk-route-grid">',
      `<div class="container tk-route-grid">${turkeyFigure}`
    );

    fs.writeFileSync(turkeyPath, html);
  }
}

if (fs.existsSync(cssPath)) {
  let css = fs.readFileSync(cssPath, 'utf8');

  if (!css.includes('destination-intro-layout-fix-v1')) {
    css += `
/* destination-intro-layout-fix-v1 */
/* Put the destination image above the planning copy so the section uses the full width instead of leaving a large empty column. */
.dp-page .dp-intro-grid{
  grid-template-columns:minmax(0,1.42fr) minmax(300px,.58fr)!important;
  gap:30px 38px!important;
  align-items:start!important;
}
.dp-page .dp-intro-grid>.dp-inline-visual{
  grid-column:1/-1!important;
  grid-row:1!important;
  width:100%!important;
  margin:0!important;
  border-radius:24px!important;
  overflow:hidden!important;
}
.dp-page .dp-intro-grid>.dp-inline-visual img{
  width:100%!important;
  height:clamp(300px,31vw,430px)!important;
  object-fit:cover!important;
  object-position:center!important;
}
.dp-page .dp-intro-grid>.dp-copy{grid-column:1!important;grid-row:2!important;min-width:0}
.dp-page .dp-intro-grid>.dp-plan-note{grid-column:2!important;grid-row:2!important;align-self:start!important;width:100%!important}

/* Turkey follows the same image-first structure while keeping its route card beside the copy. */
.tk-premium .tk-route-grid{
  grid-template-columns:minmax(0,1.18fr) minmax(340px,.82fr)!important;
  gap:30px 42px!important;
  align-items:start!important;
}
.tk-premium .tk-route-grid>.tk-inline-visual{
  grid-column:1/-1!important;
  grid-row:1!important;
  width:100%!important;
  margin:0!important;
  border-radius:24px!important;
  overflow:hidden!important;
}
.tk-premium .tk-route-grid>.tk-inline-visual img{
  width:100%!important;
  height:clamp(300px,31vw,430px)!important;
  object-fit:cover!important;
  object-position:center!important;
}
.tk-premium .tk-route-grid>.tk-copy{grid-column:1!important;grid-row:2!important;min-width:0}
.tk-premium .tk-route-grid>.tk-route-card{grid-column:2!important;grid-row:2!important;align-self:start!important;width:100%!important}

@media(max-width:1000px){
  .dp-page .dp-intro-grid,.tk-premium .tk-route-grid{grid-template-columns:1fr!important;gap:22px!important}
  .dp-page .dp-intro-grid>.dp-inline-visual,.dp-page .dp-intro-grid>.dp-copy,.dp-page .dp-intro-grid>.dp-plan-note,
  .tk-premium .tk-route-grid>.tk-inline-visual,.tk-premium .tk-route-grid>.tk-copy,.tk-premium .tk-route-grid>.tk-route-card{
    grid-column:1!important;
    grid-row:auto!important;
  }
  .dp-page .dp-intro-grid>.dp-inline-visual img,.tk-premium .tk-route-grid>.tk-inline-visual img{height:300px!important}
}

@media(max-width:600px){
  .dp-page .dp-intro-grid>.dp-inline-visual,.tk-premium .tk-route-grid>.tk-inline-visual{border-radius:16px!important}
  .dp-page .dp-intro-grid>.dp-inline-visual img,.tk-premium .tk-route-grid>.tk-inline-visual img{height:220px!important}
}
`;

    fs.writeFileSync(cssPath, css);
  }
}

console.log('Moved destination context images above the planning copy, removed desktop dead space, and replaced the Turkey intro image with a Turkey-specific visual.');
