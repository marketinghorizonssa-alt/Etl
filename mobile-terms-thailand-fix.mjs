import fs from 'node:fs';
import path from 'node:path';

const cssPath = path.resolve('dist/assets/styles.css');
if (!fs.existsSync(cssPath)) process.exit(0);

let css = fs.readFileSync(cssPath, 'utf8');
const marker = 'mobile-terms-thailand-fix-v1';

if (!css.includes(marker)) {
  css += `
/* ${marker} */
@media(max-width:760px){
  html,body{max-width:100%!important;overflow-x:hidden!important}
  main,.dp-page,.legal-page-section,.legal-hero{max-width:100%!important;overflow-x:hidden!important}
  .container{max-width:100%!important}

  /* Terms / legal mobile layout */
  .legal-hero{min-height:auto!important;background-position:center!important;background-size:cover!important}
  .legal-hero-inner{width:calc(100% - 28px)!important;padding:30px 0 34px!important;margin:auto!important;text-align:right!important}
  .legal-hero h1{font-size:clamp(2.05rem,10vw,2.75rem)!important;line-height:1.25!important;margin-bottom:10px!important;letter-spacing:0!important;word-break:normal!important}
  .legal-hero p{font-size:.92rem!important;line-height:1.85!important;max-width:100%!important}
  .legal-eyebrow{font-size:.78rem!important;margin-bottom:8px!important}
  .page-breadcrumb{display:none!important}
  .legal-page-section{padding:22px 0 42px!important;background:#f6f8fc!important}
  .legal-layout{display:block!important;width:calc(100% - 24px)!important;max-width:100%!important;margin:auto!important}
  .legal-side{display:none!important}
  .legal-document{display:grid!important;gap:12px!important;width:100%!important;min-width:0!important}
  .legal-block{display:block!important;width:100%!important;min-width:0!important;padding:18px 16px!important;border-radius:16px!important;overflow:hidden!important;box-shadow:0 8px 22px rgba(25,39,92,.045)!important}
  .legal-block-index{width:34px!important;height:34px!important;border-radius:10px!important;margin-bottom:9px!important;font-size:.72rem!important}
  .legal-block h2{font-size:1.04rem!important;line-height:1.55!important;margin:0 0 8px!important;word-break:normal!important}
  .legal-block p,.legal-block li{font-size:.88rem!important;line-height:1.85!important;overflow-wrap:anywhere!important}
  .legal-block ul,.legal-block ol{padding-right:18px!important;margin:8px 0 0!important}
  .privacy-points{display:grid!important;gap:8px!important;padding:0!important;margin-top:10px!important}
  .privacy-points li{padding:12px!important;border-radius:12px!important}
  .legal-actions{display:grid!important;grid-template-columns:1fr!important;gap:9px!important}
  .legal-actions a,.legal-outline-btn{width:100%!important;min-width:0!important;justify-content:center!important;text-align:center!important}

  /* Thailand destination mobile cleanup */
  .dp-page[data-premium-destination="thailand"],
  .dp-th{overflow-x:hidden!important}
  .dp-page[data-premium-destination="thailand"] .dp-hero,
  .dp-th .dp-hero{min-height:auto!important;display:block!important;background:#0b1f5f!important;overflow:hidden!important}
  .dp-page[data-premium-destination="thailand"] .dp-hero>img,
  .dp-th .dp-hero>img{height:100%!important;min-height:100%!important;object-position:center top!important;transform:none!important}
  .dp-page[data-premium-destination="thailand"] .dp-hero-wrap,
  .dp-th .dp-hero-wrap{display:flex!important;flex-direction:column!important;width:calc(100% - 28px)!important;max-width:100%!important;margin:auto!important;padding:32px 0 32px!important;gap:16px!important;align-items:stretch!important}
  .dp-page[data-premium-destination="thailand"] .dp-hero-copy,
  .dp-th .dp-hero-copy{width:100%!important;min-width:0!important;text-align:right!important;order:1!important}
  .dp-page[data-premium-destination="thailand"] .dp-pill,
  .dp-th .dp-pill{font-size:.72rem!important;padding:6px 10px!important;margin-bottom:4px!important}
  .dp-page[data-premium-destination="thailand"] .dp-hero h1,
  .dp-th .dp-hero h1{font-size:clamp(2rem,9vw,2.75rem)!important;line-height:1.28!important;margin:10px 0 9px!important;max-width:100%!important;letter-spacing:0!important;text-wrap:balance!important}
  .dp-page[data-premium-destination="thailand"] .dp-hero-copy>p,
  .dp-th .dp-hero-copy>p{font-size:.86rem!important;line-height:1.85!important;max-width:100%!important}
  .dp-page[data-premium-destination="thailand"] .dp-actions,
  .dp-th .dp-actions{display:grid!important;grid-template-columns:1fr 1fr!important;gap:8px!important;margin-top:16px!important;width:100%!important}
  .dp-page[data-premium-destination="thailand"] .dp-actions a,
  .dp-th .dp-actions a{min-width:0!important;width:100%!important;padding:10px 8px!important;font-size:.82rem!important;white-space:nowrap!important}
  .dp-page[data-premium-destination="thailand"] .dp-hero-form,
  .dp-th .dp-hero-form{order:2!important;width:100%!important;max-width:100%!important;margin:0!important;padding:18px 16px!important;border-radius:18px!important;background:rgba(9,27,76,.76)!important;backdrop-filter:blur(10px)!important}
  .dp-page[data-premium-destination="thailand"] .dp-hero-form>strong,
  .dp-th .dp-hero-form>strong{font-size:1.02rem!important;line-height:1.55!important;margin-bottom:12px!important}
  .dp-page[data-premium-destination="thailand"] .dp-hero-mini-grid,
  .dp-th .dp-hero-mini-grid{grid-template-columns:1fr!important;gap:10px!important}
  .dp-page[data-premium-destination="thailand"] .dp-hero-lead-form label,
  .dp-th .dp-hero-lead-form label{font-size:.82rem!important;gap:6px!important}
  .dp-page[data-premium-destination="thailand"] .dp-hero-lead-form input:not([type="checkbox"]),
  .dp-page[data-premium-destination="thailand"] .dp-hero-lead-form select,
  .dp-th .dp-hero-lead-form input:not([type="checkbox"]),
  .dp-th .dp-hero-lead-form select{height:54px!important;min-height:54px!important;max-height:54px!important;border-radius:13px!important;font-size:16px!important;padding:0 14px!important}
  .dp-page[data-premium-destination="thailand"] .dp-hero-lead-form textarea,
  .dp-th .dp-hero-lead-form textarea{min-height:88px!important;border-radius:13px!important;font-size:16px!important;padding:12px 14px!important}
  .dp-page[data-premium-destination="thailand"] .dp-hero-consent,
  .dp-th .dp-hero-consent{font-size:.76rem!important;line-height:1.65!important;margin:11px 0!important}
  .dp-page[data-premium-destination="thailand"] .dp-hero-submit,
  .dp-th .dp-hero-submit{display:block!important}
  .dp-page[data-premium-destination="thailand"] .dp-hero-submit .gradient-btn,
  .dp-th .dp-hero-submit .gradient-btn{width:100%!important;min-height:52px!important;font-size:.9rem!important;border-radius:13px!important}
  .dp-page[data-premium-destination="thailand"] .dp-photo-story,
  .dp-th .dp-photo-story{padding:32px 0!important}
  .dp-page[data-premium-destination="thailand"] .dp-photo-story-head,
  .dp-th .dp-photo-story-head{display:block!important;margin-bottom:14px!important}
  .dp-page[data-premium-destination="thailand"] .dp-photo-story-head h2,
  .dp-th .dp-photo-story-head h2{font-size:1.35rem!important;line-height:1.5!important;margin-top:6px!important}
  .dp-page[data-premium-destination="thailand"] .dp-stats .container,
  .dp-th .dp-stats .container{grid-template-columns:1fr 1fr!important;width:100%!important}
  .dp-page[data-premium-destination="thailand"] .dp-section,
  .dp-th .dp-section{padding:38px 0!important}
  .dp-page[data-premium-destination="thailand"] .dp-heading h2,
  .dp-page[data-premium-destination="thailand"] .dp-copy h2,
  .dp-th .dp-heading h2,
  .dp-th .dp-copy h2{font-size:1.45rem!important;line-height:1.55!important}
}

@media(max-width:380px){
  .dp-page[data-premium-destination="thailand"] .dp-actions,
  .dp-th .dp-actions{grid-template-columns:1fr!important}
  .legal-hero h1{font-size:2rem!important}
}
`;
  fs.writeFileSync(cssPath, css);
}

console.log('Mobile layout fixed for terms/legal pages and Thailand destination page.');
