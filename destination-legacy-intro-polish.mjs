import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const pages = [
  'georgia','georgia-2','malaysia','malaysia-2','maldives','maldives-2',
  'thailand','thailand-2','bosnia-and-herzegovina','europe','turkiye','turkey-2'
];

const introImages = {
  georgia: 'https://etlaala.com/wp-content/uploads/2025/07/%D8%AC%D9%88%D8%B1%D8%AC%D9%8A%D8%A7-1-1-768x1273.png',
  'georgia-2': 'https://etlaala.com/wp-content/uploads/2025/07/%D8%AC%D9%88%D8%B1%D8%AC%D9%8A%D8%A7-1-1-768x1273.png',
  maldives: 'https://etlaala.com/wp-content/uploads/2025/06/%D8%A7%D9%84%D9%85%D8%A7%D9%84%D8%AF%D9%8A%D9%81-768x1273.webp',
  'maldives-2': 'https://etlaala.com/wp-content/uploads/2025/06/%D8%A7%D9%84%D9%85%D8%A7%D9%84%D8%AF%D9%8A%D9%81-768x1273.webp',
  thailand: 'https://etlaala.com/wp-content/uploads/2025/06/%D8%AA%D8%A7%D9%8A%D9%84%D8%A7%D9%86%D8%AF-1-768x1273.webp',
  'thailand-2': 'https://etlaala.com/wp-content/uploads/2025/06/%D8%AA%D8%A7%D9%8A%D9%84%D8%A7%D9%86%D8%AF-1-768x1273.webp',
  'bosnia-and-herzegovina': 'https://etlaala.com/wp-content/uploads/2025/06/%D8%A7%D9%84%D8%A8%D9%88%D8%B3%D9%86%D8%A9-768x1273.webp',
  turkiye: 'https://etlaala.com/wp-content/uploads/2025/06/%D8%AA%D8%B1%D9%83%D9%8A%D8%A7-768x1273.webp',
  'turkey-2': 'https://etlaala.com/wp-content/uploads/2025/06/%D8%AA%D8%B1%D9%83%D9%8A%D8%A7-768x1273.webp'
};

const marker = 'legacy-intro-polish-v5';
const oldMarkers = ['legacy-intro-polish-v2', 'legacy-intro-polish-v3', 'legacy-intro-polish-v4', 'legacy-intro-polish-v5'];

const style = `
<style id="${marker}">
.legacy-destination-intro{
  padding:58px 0 62px!important;
  background:#f3f4f8!important;
}
.legacy-intro-grid{
  align-items:center!important;
}
.legacy-intro-content{
  direction:rtl!important;
  text-align:right!important;
  min-width:0!important;
}
.legacy-intro-content,
.legacy-intro-content *{
  font-family:'Alexandria','Segoe UI',Tahoma,Arial,sans-serif!important;
  letter-spacing:0!important;
}
.legacy-intro-kicker{
  display:inline-flex!important;
  align-items:center!important;
  margin:0 0 8px!important;
  color:#3563da!important;
  font-size:.82rem!important;
  font-weight:700!important;
  line-height:1.7!important;
}
.legacy-intro-content h2{
  max-width:760px!important;
  margin:6px 0 15px!important;
  color:#182d72!important;
  font-size:clamp(1.65rem,2.25vw,2.08rem)!important;
  font-weight:700!important;
  line-height:1.58!important;
  letter-spacing:0!important;
  text-wrap:balance!important;
}
.legacy-intro-lead{
  max-width:780px!important;
  margin:0!important;
  color:#5f6981!important;
  font-size:.96rem!important;
  font-weight:500!important;
  line-height:2.08!important;
  text-wrap:pretty!important;
}
.legacy-intro-consult{
  margin-top:24px!important;
  padding-top:22px!important;
  border-top:1px solid #dde2ec!important;
}
.legacy-intro-consult h3{
  margin:0 0 15px!important;
  color:#172760!important;
  font-size:clamp(1.35rem,1.85vw,1.72rem)!important;
  font-weight:700!important;
  line-height:1.62!important;
  letter-spacing:0!important;
  text-wrap:balance!important;
}
.legacy-intro-consult ul{
  display:grid!important;
  grid-template-columns:repeat(2,minmax(0,1fr))!important;
  gap:9px 12px!important;
  margin:0 0 20px!important;
  padding:0!important;
  list-style:none!important;
}
.legacy-intro-consult li{
  display:flex!important;
  align-items:flex-start!important;
  gap:9px!important;
  min-height:0!important;
  padding:10px 11px!important;
  border:1px solid #e0e5ef!important;
  border-radius:13px!important;
  background:rgba(255,255,255,.62)!important;
  color:#46536f!important;
  font-size:.89rem!important;
  font-weight:600!important;
  line-height:1.72!important;
}
.legacy-intro-consult li span{
  display:grid!important;
  place-items:center!important;
  flex:0 0 22px!important;
  width:22px!important;
  height:22px!important;
  margin-top:2px!important;
  border-radius:50%!important;
  background:#e6f4ef!important;
  color:#238c68!important;
  font-size:12px!important;
  font-weight:800!important;
}
.legacy-intro-consult li b{font-weight:600!important}
.legacy-intro-cta{
  display:inline-flex!important;
  align-items:center!important;
  justify-content:center!important;
  min-width:148px!important;
  min-height:47px!important;
  padding:11px 24px!important;
  border-radius:13px!important;
  font-size:.95rem!important;
  font-weight:700!important;
  box-shadow:0 10px 24px rgba(45,78,180,.14)!important;
}

.legacy-intro-visual{
  position:relative!important;
  min-height:0!important;
  width:100%!important;
  margin:0!important;
  padding:0!important;
  overflow:hidden!important;
  aspect-ratio:4/3!important;
  border:0!important;
  border-radius:26px!important;
  background:#f3f4f8!important;
  box-shadow:none!important;
  isolation:auto!important;
}
.legacy-intro-visual:before,
.legacy-intro-visual:after{
  content:none!important;
  display:none!important;
}
.legacy-intro-visual img{
  display:block!important;
  width:100%!important;
  height:100%!important;
  object-fit:cover!important;
  object-position:center!important;
  border-radius:26px!important;
  box-shadow:none!important;
}
.legacy-intro-visual--portrait{
  width:min(100%,410px)!important;
  justify-self:center!important;
  aspect-ratio:auto!important;
  overflow:visible!important;
  border-radius:0!important;
  background:#f3f4f8!important;
  box-shadow:none!important;
}
.legacy-intro-visual--portrait img{
  width:auto!important;
  max-width:100%!important;
  height:auto!important;
  max-height:520px!important;
  margin:0 auto!important;
  object-fit:contain!important;
  border-radius:0!important;
  box-shadow:none!important;
}

@media (min-width:901px){
  .legacy-intro-grid{
    display:grid!important;
    grid-template-columns:minmax(340px,.82fr) minmax(0,1.18fr)!important;
    grid-template-areas:"visual content"!important;
    gap:50px!important;
    direction:ltr!important;
  }
  .legacy-intro-content{
    grid-area:content!important;
    justify-self:stretch!important;
    max-width:780px!important;
    padding:4px 0!important;
  }
  .legacy-intro-visual{
    grid-area:visual!important;
    justify-self:stretch!important;
  }
}

@media (max-width:900px){
  .legacy-destination-intro{padding:40px 0 46px!important}
  .legacy-intro-grid{
    display:grid!important;
    grid-template-columns:1fr!important;
    grid-template-areas:"visual" "content"!important;
    gap:23px!important;
    direction:rtl!important;
  }
  .legacy-intro-content{grid-area:content!important;padding:0!important}
  .legacy-intro-visual{
    grid-area:visual!important;
    max-width:560px!important;
    width:100%!important;
    margin:0 auto!important;
  }
  .legacy-intro-visual--portrait{max-width:360px!important}
  .legacy-intro-visual--portrait img{max-height:460px!important}
}

@media (max-width:620px){
  .legacy-destination-intro{padding:30px 0 36px!important}
  .legacy-intro-grid{gap:18px!important}
  .legacy-intro-kicker{font-size:.76rem!important;margin-bottom:5px!important}
  .legacy-intro-content h2{
    font-size:1.55rem!important;
    line-height:1.62!important;
    margin-bottom:10px!important;
  }
  .legacy-intro-lead{
    font-size:.9rem!important;
    line-height:2!important;
  }
  .legacy-intro-consult{margin-top:17px!important;padding-top:16px!important}
  .legacy-intro-consult h3{
    font-size:1.22rem!important;
    line-height:1.65!important;
    margin-bottom:11px!important;
  }
  .legacy-intro-consult ul{grid-template-columns:1fr!important;gap:7px!important;margin-bottom:15px!important}
  .legacy-intro-consult li{padding:9px 10px!important;font-size:.86rem!important;line-height:1.72!important}
  .legacy-intro-cta{width:100%!important;min-height:46px!important}
  .legacy-intro-visual{border-radius:20px!important}
  .legacy-intro-visual img{border-radius:20px!important}
  .legacy-intro-visual--portrait{max-width:300px!important;border-radius:0!important}
  .legacy-intro-visual--portrait img{max-height:420px!important;border-radius:0!important}
}
</style>`;

let changed = [];
for (const slug of pages) {
  const file = path.join(out, slug, 'index.html');
  if (!fs.existsSync(file)) continue;

  let html = fs.readFileSync(file, 'utf8');
  if (!html.includes('legacy-destination-intro')) continue;

  for (const oldMarker of oldMarkers) {
    html = html.replace(new RegExp(`<style id=["']${oldMarker}["']>[\\s\\S]*?<\\/style>`, 'i'), '');
  }

  const suppliedImage = introImages[slug];
  if (suppliedImage) {
    html = html.replace(
      /(<figure class="legacy-intro-visual"[^>]*>[\s\S]*?<img\s+[^>]*?src=")[^"]+("[^>]*>)/i,
      `$1${suppliedImage}$2`
    );
    html = html.replace(
      '<figure class="legacy-intro-visual">',
      '<figure class="legacy-intro-visual legacy-intro-visual--portrait">'
    );
  }

  html = html.includes('</head>') ? html.replace('</head>', `${style}\n</head>`) : `${style}\n${html}`;
  fs.writeFileSync(file, html);
  changed.push(slug);
}

console.log(`Applied supplied portrait destination artwork and blended intro styling on: ${changed.join(', ') || 'no pages'}.`);
