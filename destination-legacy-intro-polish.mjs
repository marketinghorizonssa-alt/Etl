import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const pages = [
  'georgia','georgia-2','malaysia','malaysia-2','maldives','maldives-2',
  'thailand','thailand-2','bosnia-and-herzegovina','europe','turkiye','turkey-2'
];

const marker = 'legacy-intro-polish-v2';
const style = `
<style id="${marker}">
@media (min-width:901px){
  .legacy-destination-intro{padding:62px 0 66px!important}
  .legacy-intro-grid{
    display:grid!important;
    grid-template-columns:minmax(340px,.82fr) minmax(0,1.18fr)!important;
    grid-template-areas:"visual content"!important;
    gap:54px!important;
    align-items:center!important;
    direction:ltr!important;
  }
  .legacy-intro-content{
    grid-area:content!important;
    direction:rtl!important;
    text-align:right!important;
    padding:6px 0!important;
    max-width:780px!important;
    justify-self:stretch!important;
  }
  .legacy-intro-visual{
    grid-area:visual!important;
    direction:rtl!important;
    justify-self:stretch!important;
    width:100%!important;
    margin:0!important;
  }
}
.legacy-intro-kicker{
  display:inline-flex!important;
  align-items:center!important;
  gap:7px!important;
  margin:0 0 10px!important;
  color:#3563da!important;
  font-size:14px!important;
  font-weight:900!important;
  line-height:1.5!important;
  letter-spacing:0!important;
}
.legacy-intro-content h2{
  max-width:760px!important;
  margin:0 0 17px!important;
  color:#173276!important;
  font-size:clamp(31px,2.65vw,43px)!important;
  font-weight:900!important;
  line-height:1.34!important;
  letter-spacing:-.025em!important;
  text-wrap:balance!important;
}
.legacy-intro-lead{
  max-width:760px!important;
  margin:0!important;
  color:#667188!important;
  font-size:16.5px!important;
  font-weight:500!important;
  line-height:1.9!important;
}
.legacy-intro-consult{
  margin-top:25px!important;
  padding-top:22px!important;
  border-top:1px solid #e5eaf4!important;
}
.legacy-intro-consult h3{
  margin:0 0 16px!important;
  color:#172e70!important;
  font-size:clamp(23px,1.9vw,29px)!important;
  font-weight:900!important;
  line-height:1.5!important;
  text-wrap:balance!important;
}
.legacy-intro-consult ul{
  display:grid!important;
  grid-template-columns:repeat(2,minmax(0,1fr))!important;
  gap:10px 12px!important;
  margin:0 0 20px!important;
  padding:0!important;
  list-style:none!important;
}
.legacy-intro-consult li{
  display:flex!important;
  align-items:flex-start!important;
  gap:9px!important;
  min-height:54px!important;
  padding:10px 11px!important;
  border:1px solid #e8edf6!important;
  border-radius:13px!important;
  background:#fbfcff!important;
  color:#46536f!important;
  font-size:14.25px!important;
  font-weight:700!important;
  line-height:1.62!important;
}
.legacy-intro-consult li span{
  display:grid!important;
  place-items:center!important;
  flex:0 0 22px!important;
  width:22px!important;
  height:22px!important;
  margin-top:1px!important;
  border-radius:50%!important;
  background:#eaf8f2!important;
  color:#238c68!important;
  font-size:12px!important;
  font-weight:900!important;
}
.legacy-intro-consult li b{font-weight:700!important}
.legacy-intro-cta{
  display:inline-flex!important;
  align-items:center!important;
  justify-content:center!important;
  min-width:150px!important;
  min-height:48px!important;
  padding:12px 26px!important;
  border-radius:14px!important;
  font-size:16px!important;
  font-weight:900!important;
  box-shadow:0 10px 24px rgba(45,78,180,.16)!important;
}
.legacy-intro-visual{
  min-height:430px!important;
  padding:20px!important;
  border-radius:38px!important;
  background:linear-gradient(145deg,#f8faff 0%,#fff 100%)!important;
  box-shadow:0 18px 45px rgba(33,58,126,.08)!important;
}
.legacy-intro-visual img{
  width:100%!important;
  height:420px!important;
  object-fit:contain!important;
  object-position:center!important;
  border-radius:28px!important;
}
@media (max-width:900px){
  .legacy-destination-intro{padding:42px 0 48px!important}
  .legacy-intro-grid{
    display:grid!important;
    grid-template-columns:1fr!important;
    grid-template-areas:"visual" "content"!important;
    gap:24px!important;
    direction:rtl!important;
  }
  .legacy-intro-content{grid-area:content!important;direction:rtl!important;text-align:right!important;padding:0!important}
  .legacy-intro-visual{grid-area:visual!important;min-height:320px!important;max-width:560px!important;width:100%!important;margin:0 auto!important;padding:14px!important}
  .legacy-intro-visual img{height:310px!important;border-radius:24px!important}
}
@media (max-width:620px){
  .legacy-destination-intro{padding:32px 0 38px!important}
  .legacy-intro-grid{gap:19px!important}
  .legacy-intro-kicker{font-size:12px!important;margin-bottom:7px!important}
  .legacy-intro-content h2{font-size:27px!important;line-height:1.42!important;margin-bottom:11px!important}
  .legacy-intro-lead{font-size:14.75px!important;line-height:1.82!important}
  .legacy-intro-consult{margin-top:18px!important;padding-top:17px!important}
  .legacy-intro-consult h3{font-size:20.5px!important;line-height:1.5!important;margin-bottom:12px!important}
  .legacy-intro-consult ul{grid-template-columns:1fr!important;gap:8px!important;margin-bottom:16px!important}
  .legacy-intro-consult li{min-height:0!important;padding:9px 10px!important;font-size:13.75px!important}
  .legacy-intro-cta{width:100%!important;min-height:47px!important}
  .legacy-intro-visual{min-height:270px!important;padding:10px!important;border-radius:28px!important}
  .legacy-intro-visual img{height:260px!important;border-radius:20px!important}
}
</style>`;

let changed = [];
for (const slug of pages) {
  const file = path.join(out, slug, 'index.html');
  if (!fs.existsSync(file)) continue;
  let html = fs.readFileSync(file, 'utf8');
  if (!html.includes('legacy-destination-intro')) continue;
  html = html.replace(new RegExp(`<style id=["']${marker}["']>[\\s\\S]*?<\\/style>`, 'i'), '');
  html = html.includes('</head>') ? html.replace('</head>', `${style}\n</head>`) : `${style}\n${html}`;
  fs.writeFileSync(file, html);
  changed.push(slug);
}

console.log(`Polished destination intro layout (text right, image left) on: ${changed.join(', ') || 'no pages'}.`);
