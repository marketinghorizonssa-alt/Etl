import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const cssPath = path.join(out, 'assets', 'styles.css');

const finalCss = `
/* mobile-narrow-layout-final-v1 */
@media(max-width:1200px){
  html,body{max-width:100%!important;overflow-x:hidden!important}
  .dp-page,.dp-th,.static-info-main,.legal-page-section,.legal-hero{max-width:100%!important;overflow-x:hidden!important}
  .dp-page .container,.static-info-main .container,.legal-page-section .container,.legal-hero .container{max-width:100%!important;min-width:0!important}

  /* Force Thailand merged city/experience section to collapse cleanly before it breaks */
  .dp-th .dp-section,
  .dp-th .dp-soft{overflow:hidden!important}
  .dp-th .dp-heading{width:100%!important;max-width:100%!important;margin:0 0 18px!important;text-align:right!important}
  .dp-th .dp-heading h2{max-width:100%!important;font-size:clamp(1.55rem,5vw,2.05rem)!important;line-height:1.55!important;letter-spacing:0!important;text-wrap:balance!important;overflow-wrap:break-word!important}
  .dp-th .dp-heading p{max-width:100%!important;font-size:.95rem!important;line-height:1.9!important;overflow-wrap:break-word!important}
  .dp-th .dp-places-grid,
  .dp-page[data-premium-destination="thailand"] .dp-places-grid{
    display:grid!important;
    grid-template-columns:1fr!important;
    grid-auto-flow:row!important;
    grid-auto-rows:auto!important;
    gap:12px!important;
    width:100%!important;
    max-width:100%!important;
    min-width:0!important;
    overflow:visible!important;
  }
  .dp-th .dp-places-grid > *,
  .dp-page[data-premium-destination="thailand"] .dp-places-grid > *{
    grid-column:1 / -1!important;
    grid-row:auto!important;
    width:100%!important;
    max-width:100%!important;
    min-width:0!important;
    transform:none!important;
    position:relative!important;
    inset:auto!important;
  }
  .dp-th .dp-place,
  .dp-page[data-premium-destination="thailand"] .dp-place{
    display:block!important;
    min-height:0!important;
    height:auto!important;
    padding:18px!important;
    border-radius:16px!important;
    overflow:hidden!important;
    background:#fff!important;
    color:#1c285a!important;
    box-shadow:0 8px 24px rgba(25,39,92,.05)!important;
    isolation:auto!important;
  }
  .dp-th .dp-place:before,
  .dp-page[data-premium-destination="thailand"] .dp-place:before{display:none!important;content:none!important}
  .dp-th .dp-place .dp-place-image,
  .dp-page[data-premium-destination="thailand"] .dp-place .dp-place-image{
    position:relative!important;
    inset:auto!important;
    z-index:0!important;
    display:block!important;
    width:100%!important;
    max-width:100%!important;
    height:190px!important;
    object-fit:cover!important;
    border-radius:14px!important;
    margin:0 0 13px!important;
    transform:none!important;
  }
  .dp-th .dp-place > *:not(.dp-place-image),
  .dp-page[data-premium-destination="thailand"] .dp-place > *:not(.dp-place-image){position:relative!important;z-index:1!important;max-width:100%!important}
  .dp-th .dp-place span,
  .dp-page[data-premium-destination="thailand"] .dp-place span{color:#4963c8!important;font-size:.72rem!important;font-weight:900!important}
  .dp-th .dp-place h3,
  .dp-page[data-premium-destination="thailand"] .dp-place h3{color:#19357f!important;font-size:1.12rem!important;line-height:1.45!important;margin:8px 0 6px!important}
  .dp-th .dp-place p,
  .dp-page[data-premium-destination="thailand"] .dp-place p{color:#68728a!important;font-size:.9rem!important;line-height:1.85!important;margin:0!important;overflow-wrap:break-word!important}

  /* Thailand hero and form: keep everything within viewport on tablet/mobile */
  .dp-th .dp-hero-wrap{grid-template-columns:1fr!important;display:flex!important;flex-direction:column!important;width:calc(100% - 28px)!important;max-width:100%!important;margin-inline:auto!important;gap:18px!important;align-items:stretch!important}
  .dp-th .dp-hero-copy,.dp-th .dp-hero-form{width:100%!important;max-width:100%!important;min-width:0!important;justify-self:stretch!important}
  .dp-th .dp-hero h1{font-size:clamp(2rem,7vw,3.1rem)!important;max-width:100%!important;line-height:1.35!important;overflow-wrap:break-word!important;text-wrap:balance!important}
  .dp-th .dp-actions{display:grid!important;grid-template-columns:1fr 1fr!important;gap:8px!important;width:100%!important}
  .dp-th .dp-actions a{width:100%!important;min-width:0!important;text-align:center!important;white-space:normal!important}
  .dp-th .dp-hero-mini-grid,.dp-th .dp-mini-grid{grid-template-columns:1fr!important}
}

@media(max-width:760px){
  .dp-th .dp-place .dp-place-image,
  .dp-page[data-premium-destination="thailand"] .dp-place .dp-place-image{height:165px!important}
  .dp-th .dp-section{padding:34px 0!important}
  .dp-th .dp-actions{grid-template-columns:1fr!important}
}

@media(max-width:1200px){
  /* Terms page: no side navigation and no horizontal overflow */
  .legal-layout{display:block!important;width:calc(100% - 24px)!important;max-width:100%!important;margin-inline:auto!important;min-width:0!important}
  .legal-side{display:none!important}
  .legal-document{width:100%!important;max-width:100%!important;min-width:0!important;display:grid!important;gap:12px!important}
  .legal-block{display:block!important;width:100%!important;max-width:100%!important;min-width:0!important;overflow:hidden!important;padding:20px 18px!important;border-radius:16px!important}
  .legal-block h2{font-size:clamp(1.05rem,3vw,1.22rem)!important;line-height:1.55!important;overflow-wrap:break-word!important}
  .legal-block p,.legal-block li{font-size:.92rem!important;line-height:1.85!important;overflow-wrap:break-word!important}
  .page-breadcrumb{display:none!important}
}
`;

const styleTag = `<style id="mobile-narrow-layout-final-v1">${finalCss}</style>`;

function patchPage(relative) {
  const file = path.join(out, relative, 'index.html');
  if (!fs.existsSync(file)) return false;
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/<style id=["']mobile-narrow-layout-final-v1["'][\s\S]*?<\/style>/gi, '');
  html = html.replace('</head>', `${styleTag}</head>`);
  fs.writeFileSync(file, html);
  return true;
}

const patched = [];
for (const p of ['thailand','terms-and-conditions','thailand-2']) {
  if (patchPage(p)) patched.push(p);
}

if (fs.existsSync(cssPath)) {
  let css = fs.readFileSync(cssPath, 'utf8');
  if (!css.includes('mobile-narrow-layout-final-v1')) {
    css += `\n${finalCss}\n`;
    fs.writeFileSync(cssPath, css);
  }
}

console.log(`Final narrow/mobile layout guard applied to: ${patched.join(', ') || 'none'}.`);
