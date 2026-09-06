import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const cssPath = path.join(out, 'assets', 'styles.css');

const criticalCss = `
/* mobile-targeted-terms-thailand-v2 */
@media(max-width:850px){
  html,body{width:100%!important;max-width:100%!important;overflow-x:hidden!important}
  body.mobile-target-terms,
  body.mobile-target-thailand,
  body.mobile-target-thailand-offer{padding-top:70px!important;overflow-x:hidden!important}
  body.mobile-target-terms .site-header,
  body.mobile-target-thailand .site-header,
  body.mobile-target-thailand-offer .site-header{position:fixed!important;top:0!important;right:0!important;left:0!important;width:100%!important;z-index:5000!important;transform:none!important;opacity:1!important;visibility:visible!important}
  body.mobile-target-terms main,
  body.mobile-target-thailand main,
  body.mobile-target-thailand-offer main{width:100%!important;max-width:100%!important;overflow-x:hidden!important}
  body.mobile-target-terms .container,
  body.mobile-target-thailand .container,
  body.mobile-target-thailand-offer .container{width:calc(100% - 28px)!important;max-width:100%!important;margin-inline:auto!important}

  /* الشروط والأحكام */
  body.mobile-target-terms .legal-hero{min-height:auto!important;overflow:hidden!important;background-size:cover!important;background-position:center!important}
  body.mobile-target-terms .legal-hero:before,
  body.mobile-target-terms .legal-hero:after{display:none!important}
  body.mobile-target-terms .legal-hero-inner{width:calc(100% - 28px)!important;max-width:100%!important;padding:32px 0 34px!important;margin:auto!important;text-align:right!important}
  body.mobile-target-terms .page-breadcrumb,
  body.mobile-target-terms .legal-side{display:none!important}
  body.mobile-target-terms .legal-eyebrow{font-size:.78rem!important;margin-bottom:8px!important}
  body.mobile-target-terms .legal-hero h1{font-size:clamp(2rem,10vw,2.72rem)!important;line-height:1.22!important;margin:0 0 10px!important;letter-spacing:0!important;word-break:normal!important;text-wrap:balance!important}
  body.mobile-target-terms .legal-hero p{font-size:.92rem!important;line-height:1.85!important;max-width:100%!important;margin:0!important}
  body.mobile-target-terms .legal-page-section{padding:24px 0 42px!important;background:#f6f8fc!important;overflow:hidden!important}
  body.mobile-target-terms .legal-layout{display:block!important;width:calc(100% - 24px)!important;max-width:100%!important;margin:auto!important;min-width:0!important}
  body.mobile-target-terms .legal-document{display:grid!important;gap:12px!important;width:100%!important;max-width:100%!important;min-width:0!important}
  body.mobile-target-terms .legal-block{display:block!important;width:100%!important;max-width:100%!important;min-width:0!important;padding:18px 16px!important;border-radius:16px!important;overflow:hidden!important;box-shadow:0 8px 22px rgba(25,39,92,.045)!important}
  body.mobile-target-terms .legal-block-index{width:34px!important;height:34px!important;border-radius:10px!important;margin-bottom:9px!important;font-size:.72rem!important}
  body.mobile-target-terms .legal-block h2{font-size:1.04rem!important;line-height:1.55!important;margin:0 0 8px!important;word-break:normal!important;text-wrap:balance!important}
  body.mobile-target-terms .legal-block p,
  body.mobile-target-terms .legal-block li{font-size:.88rem!important;line-height:1.85!important;overflow-wrap:break-word!important;word-break:normal!important}
  body.mobile-target-terms .legal-block ul,
  body.mobile-target-terms .legal-block ol{padding-right:18px!important;margin:8px 0 0!important;max-width:100%!important}
  body.mobile-target-terms .privacy-points{display:grid!important;gap:8px!important;padding:0!important;margin-top:10px!important}
  body.mobile-target-terms .privacy-points li{padding:12px!important;border-radius:12px!important}
  body.mobile-target-terms .legal-actions{display:grid!important;grid-template-columns:1fr!important;gap:9px!important}
  body.mobile-target-terms .legal-actions a,
  body.mobile-target-terms .legal-outline-btn{width:100%!important;min-width:0!important;justify-content:center!important;text-align:center!important}

  /* تايلاند الجديدة /thailand/ */
  body.mobile-target-thailand .dp-page,
  body.mobile-target-thailand .dp-th{width:100%!important;max-width:100%!important;overflow-x:hidden!important}
  body.mobile-target-thailand .dp-hero{min-height:auto!important;display:block!important;background:#0b1f5f!important;overflow:hidden!important}
  body.mobile-target-thailand .dp-hero>img{height:100%!important;min-height:100%!important;object-position:center top!important;transform:none!important}
  body.mobile-target-thailand .dp-hero-wrap{display:flex!important;flex-direction:column!important;width:calc(100% - 28px)!important;max-width:100%!important;margin:auto!important;padding:34px 0 34px!important;gap:16px!important;align-items:stretch!important}
  body.mobile-target-thailand .dp-hero-copy{width:100%!important;min-width:0!important;text-align:right!important;order:1!important}
  body.mobile-target-thailand .dp-pill{font-size:.72rem!important;padding:6px 10px!important;margin-bottom:4px!important}
  body.mobile-target-thailand .dp-hero h1{font-size:clamp(2rem,9vw,2.75rem)!important;line-height:1.28!important;margin:10px 0 9px!important;max-width:100%!important;letter-spacing:0!important;text-wrap:balance!important}
  body.mobile-target-thailand .dp-hero-copy>p{font-size:.86rem!important;line-height:1.85!important;max-width:100%!important}
  body.mobile-target-thailand .dp-actions{display:grid!important;grid-template-columns:1fr 1fr!important;gap:8px!important;margin-top:16px!important;width:100%!important}
  body.mobile-target-thailand .dp-actions a{min-width:0!important;width:100%!important;padding:10px 8px!important;font-size:.82rem!important;white-space:nowrap!important}
  body.mobile-target-thailand .dp-hero-form{order:2!important;width:100%!important;max-width:100%!important;margin:0!important;padding:18px 16px!important;border-radius:18px!important;background:rgba(9,27,76,.76)!important;backdrop-filter:blur(10px)!important}
  body.mobile-target-thailand .dp-hero-mini-grid{grid-template-columns:1fr!important;gap:10px!important}
  body.mobile-target-thailand .dp-hero-lead-form input:not([type="checkbox"]),
  body.mobile-target-thailand .dp-hero-lead-form select{height:54px!important;min-height:54px!important;max-height:54px!important;border-radius:13px!important;font-size:16px!important;padding:0 14px!important}
  body.mobile-target-thailand .dp-hero-lead-form textarea{min-height:88px!important;border-radius:13px!important;font-size:16px!important;padding:12px 14px!important}
  body.mobile-target-thailand .dp-hero-consent{font-size:.76rem!important;line-height:1.65!important;margin:11px 0!important}
  body.mobile-target-thailand .dp-hero-submit{display:block!important}
  body.mobile-target-thailand .dp-hero-submit .gradient-btn{width:100%!important;min-height:52px!important;font-size:.9rem!important;border-radius:13px!important}
  body.mobile-target-thailand .dp-photo-story{padding:32px 0!important}
  body.mobile-target-thailand .dp-photo-story-head{display:block!important;margin-bottom:14px!important}
  body.mobile-target-thailand .dp-photo-story-head h2{font-size:1.35rem!important;line-height:1.5!important;margin-top:6px!important}
  body.mobile-target-thailand .dp-photo-grid{grid-template-columns:1fr!important;gap:12px!important}
  body.mobile-target-thailand .dp-photo-grid figure{height:220px!important;border-radius:16px!important}
  body.mobile-target-thailand .dp-stats .container{grid-template-columns:1fr 1fr!important;width:100%!important}
  body.mobile-target-thailand .dp-section{padding:38px 0!important}
  body.mobile-target-thailand .dp-places-grid,
  body.mobile-target-thailand .dp-activity-list,
  body.mobile-target-thailand .dp-program-grid,
  body.mobile-target-thailand .dp-faq-grid{grid-template-columns:1fr!important}
  body.mobile-target-thailand .dp-heading h2,
  body.mobile-target-thailand .dp-copy h2{font-size:1.45rem!important;line-height:1.55!important}

  /* تايلاند القديمة /thailand-2/ */
  body.mobile-target-thailand-offer .destination-hero{min-height:auto!important;display:block!important;overflow:hidden!important;background:#10255f!important}
  body.mobile-target-thailand-offer .destination-hero .hero-photo{height:100%!important;object-position:center top!important}
  body.mobile-target-thailand-offer .destination-hero-content{width:calc(100% - 28px)!important;max-width:100%!important;margin:auto!important;min-height:0!important;padding:46px 0 42px!important;align-items:stretch!important;justify-content:flex-end!important}
  body.mobile-target-thailand-offer .destination-hero h1{font-size:clamp(2.05rem,10vw,2.85rem)!important;line-height:1.25!important;margin:12px 0 10px!important;max-width:100%!important;text-wrap:balance!important}
  body.mobile-target-thailand-offer .destination-hero p{font-size:.9rem!important;line-height:1.85!important;max-width:100%!important}
  body.mobile-target-thailand-offer .destination-hero .hero-actions{display:grid!important;grid-template-columns:1fr!important;gap:9px!important;width:100%!important;margin-top:18px!important}
  body.mobile-target-thailand-offer .destination-hero .hero-actions a{width:100%!important;min-width:0!important}
  body.mobile-target-thailand-offer .visual-grid,
  body.mobile-target-thailand-offer .offer-benefits,
  body.mobile-target-thailand-offer .services-grid,
  body.mobile-target-thailand-offer .advantages-grid{grid-template-columns:1fr!important}
  body.mobile-target-thailand-offer .visual-grid figure{height:220px!important;border-radius:16px!important}
  body.mobile-target-thailand-offer .section{padding:42px 0!important}
  body.mobile-target-thailand-offer .section-heading h2{font-size:1.55rem!important;line-height:1.5!important}
  body.mobile-target-thailand-offer .offer-form-wrap{max-width:100%!important;margin-top:22px!important}
  body.mobile-target-thailand-offer .lead-form{padding:20px 16px!important;border-radius:18px!important;width:100%!important;max-width:100%!important}
  body.mobile-target-thailand-offer .form-grid,
  body.mobile-target-thailand-offer .offer-form-wrap .form-grid{grid-template-columns:1fr!important;gap:10px!important}
  body.mobile-target-thailand-offer .lead-form input:not([type="checkbox"]),
  body.mobile-target-thailand-offer .lead-form select{height:56px!important;min-height:56px!important;max-height:56px!important;border-radius:14px!important;font-size:16px!important}
  body.mobile-target-thailand-offer .lead-form textarea{min-height:118px!important;font-size:16px!important;border-radius:14px!important}
}
@media(max-width:380px){
  body.mobile-target-thailand .dp-actions{grid-template-columns:1fr!important}
  body.mobile-target-terms .legal-hero h1{font-size:2rem!important}
}
`;

const styleTag = `<style id="mobile-targeted-terms-thailand-v2">${criticalCss}</style>`;

function addBodyClass(html, cls) {
  return html.replace(/<body([^>]*)>/i, (m, attrs) => {
    if (/\bclass=(['"])(.*?)\1/i.test(attrs)) {
      return '<body' + attrs.replace(/\bclass=(['"])(.*?)\1/i, (mm, q, classes) => {
        const parts = new Set(String(classes).split(/\s+/).filter(Boolean));
        cls.split(/\s+/).forEach(c => parts.add(c));
        return `class=${q}${Array.from(parts).join(' ')}${q}`;
      }) + '>';
    }
    return `<body${attrs} class="${cls}">`;
  });
}

function patchPage(relative, cls) {
  const file = path.join(out, relative, 'index.html');
  if (!fs.existsSync(file)) return false;
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/<style id=["']mobile-targeted-terms-thailand-v2["'][\s\S]*?<\/style>/gi, '');
  html = addBodyClass(html, cls);
  html = html.replace('</head>', `${styleTag}</head>`);
  fs.writeFileSync(file, html);
  return true;
}

const patched = [];
if (patchPage('terms-and-conditions', 'mobile-target-terms')) patched.push('terms-and-conditions');
if (patchPage('thailand', 'mobile-target-thailand')) patched.push('thailand');
if (patchPage('thailand-2', 'mobile-target-thailand-offer')) patched.push('thailand-2');

if (fs.existsSync(cssPath)) {
  let css = fs.readFileSync(cssPath, 'utf8');
  const marker = 'mobile-targeted-terms-thailand-v2';
  if (!css.includes(marker)) {
    css += `\n${criticalCss}\n`;
    fs.writeFileSync(cssPath, css);
  }
}

console.log(`Inline mobile fixes applied for: ${patched.join(', ') || 'none'}.`);
