import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const cssPath = path.join(out, 'assets', 'styles.css');

function htmlFiles(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...htmlFiles(file));
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(file);
  }
  return files;
}

const criticalCss = `
/* mobile-header-first-load-lock-v3 */
@media(max-width:900px){
  :root{--etlaala-mobile-header-h:70px}
  html{scroll-padding-top:var(--etlaala-mobile-header-h)!important}
  body{padding-top:var(--etlaala-mobile-header-h)!important}
  .brand-strip{display:none!important}
  .site-header{
    display:block!important;
    position:fixed!important;
    top:0!important;
    right:0!important;
    left:0!important;
    width:100%!important;
    min-height:var(--etlaala-mobile-header-h)!important;
    max-height:none!important;
    z-index:2147483000!important;
    transform:translate3d(0,0,0)!important;
    opacity:1!important;
    visibility:visible!important;
    pointer-events:auto!important;
    overflow:visible!important;
    clip-path:none!important;
    margin:0!important;
    background:var(--gradient)!important;
    box-shadow:0 6px 26px rgba(17,30,93,.18)!important;
  }
  .site-header *{visibility:visible!important}
  .site-header .nav{
    height:var(--etlaala-mobile-header-h)!important;
    min-height:var(--etlaala-mobile-header-h)!important;
    display:flex!important;
    align-items:center!important;
    gap:10px!important;
    overflow:visible!important;
  }
  .site-header .brand{
    display:flex!important;
    align-items:center!important;
    margin-left:auto!important;
    width:150px!important;
    min-width:132px!important;
    max-width:150px!important;
  }
  .site-header .brand img{
    display:block!important;
    width:auto!important;
    max-width:150px!important;
    max-height:58px!important;
    object-fit:contain!important;
  }
  .site-header .mobile-nav{display:block!important;opacity:1!important;visibility:visible!important;margin-right:auto!important;z-index:2147483100!important}
  .site-header .mobile-nav>summary{display:grid!important;opacity:1!important;visibility:visible!important}
  .site-header .navlinks,.site-header .navlinks-unified{display:none!important}
  .site-header .header-cta{display:none!important}
  .mobile-nav-panel{position:fixed!important;top:calc(var(--etlaala-mobile-header-h) + 6px)!important;right:10px!important;left:10px!important;z-index:2147483200!important;max-height:calc(100dvh - var(--etlaala-mobile-header-h) - 24px)!important}
  .home-hero,.destination-hero,.legal-hero,.branch-page-hero,.service-page-hero,main,section[id]{scroll-margin-top:calc(var(--etlaala-mobile-header-h) + 8px)!important}
  .float-wa,.float-call{
    display:grid!important;
    position:fixed!important;
    left:16px!important;
    right:auto!important;
    width:64px!important;
    height:64px!important;
    border-radius:50%!important;
    z-index:2147482600!important;
    opacity:1!important;
    visibility:visible!important;
    transform:none!important;
    pointer-events:auto!important;
  }
  .float-call{bottom:calc(86px + env(safe-area-inset-bottom))!important}
  .float-wa{bottom:calc(158px + env(safe-area-inset-bottom))!important}
}
@media(max-width:480px){
  @media(max-width:900px){
    .site-header .brand{width:138px!important;min-width:122px!important;max-width:138px!important}
    .site-header .brand img{max-width:138px!important}
    .float-wa,.float-call{left:14px!important;width:58px!important;height:58px!important}
    .float-call{bottom:calc(84px + env(safe-area-inset-bottom))!important}
    .float-wa{bottom:calc(150px + env(safe-area-inset-bottom))!important}
  }
}
`;

if (fs.existsSync(cssPath)) {
  let css = fs.readFileSync(cssPath, 'utf8');
  css = css.replace(/\/\* mobile-header-first-load-lock-v[\s\S]*?\/\* end-mobile-header-first-load-lock \*\//g, '');
  css += `\n${criticalCss}\n/* end-mobile-header-first-load-lock */\n`;
  fs.writeFileSync(cssPath, css);
}

const headStyle = `<style id="mobile-header-first-load-lock">${criticalCss}</style>`;
const script = `<script id="mobile-header-visible-fix">(function(){function q(s){return document.querySelector(s)}function all(s){return Array.prototype.slice.call(document.querySelectorAll(s))}function force(){var mobile=!window.matchMedia||window.matchMedia('(max-width:900px)').matches;if(!mobile)return;document.documentElement.classList.add('etlaala-mobile-first-load');var h=q('.site-header');if(h){var st=h.style;st.setProperty('display','block','important');st.setProperty('position','fixed','important');st.setProperty('top','0','important');st.setProperty('right','0','important');st.setProperty('left','0','important');st.setProperty('width','100%','important');st.setProperty('z-index','2147483000','important');st.setProperty('transform','translate3d(0,0,0)','important');st.setProperty('opacity','1','important');st.setProperty('visibility','visible','important');st.setProperty('pointer-events','auto','important');st.setProperty('overflow','visible','important');}document.body&&document.body.style.setProperty('padding-top','70px','important');all('.float-wa,.float-call').forEach(function(b,i){var st=b.style;st.setProperty('display','grid','important');st.setProperty('position','fixed','important');st.setProperty('left','14px','important');st.setProperty('right','auto','important');st.setProperty('z-index','2147482600','important');st.setProperty('opacity','1','important');st.setProperty('visibility','visible','important');st.setProperty('transform','none','important');st.setProperty('bottom',i===0?'150px':'84px','important')});}try{if('scrollRestoration' in history)history.scrollRestoration='manual'}catch(e){}if(!location.hash){window.addEventListener('pageshow',function(){force();setTimeout(force,40);setTimeout(force,220);setTimeout(function(){if(window.scrollY>0&&window.scrollY<260)window.scrollTo(0,0);force()},420)})}document.addEventListener('DOMContentLoaded',function(){force();setTimeout(force,150)});window.addEventListener('resize',force,{passive:true});window.addEventListener('scroll',force,{passive:true});})();</script>`;

let patched = 0;
for (const file of htmlFiles(out)) {
  let html = fs.readFileSync(file, 'utf8');
  html = html.replace(/<style id="mobile-header-first-load-lock">[\s\S]*?<\/style>/g, '');
  html = html.replace(/<script id="mobile-header-visible-fix">[\s\S]*?<\/script>/g, '');
  html = html.replace('</head>', `${headStyle}</head>`);
  html = html.replace('</body>', `${script}</body>`);
  fs.writeFileSync(file, html);
  patched += 1;
}

console.log(`Mobile header and floating call buttons forced visible on first load across ${patched} page(s).`);
