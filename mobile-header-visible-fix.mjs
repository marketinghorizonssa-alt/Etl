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

if (fs.existsSync(cssPath)) {
  let css = fs.readFileSync(cssPath, 'utf8');
  const marker = 'mobile-header-always-visible-v1';
  if (!css.includes(marker)) {
    css += `
/* ${marker} */
@media(max-width:850px){
  html{scroll-padding-top:70px!important}
  body{padding-top:70px!important}
  .site-header{
    position:fixed!important;
    top:0!important;
    right:0!important;
    left:0!important;
    width:100%!important;
    z-index:1200!important;
    transform:none!important;
    opacity:1!important;
    visibility:visible!important;
    overflow:visible!important;
  }
  .site-header .nav{height:70px!important;min-height:70px!important}
  .mobile-nav-panel{top:76px!important;z-index:1300!important}
  .home-hero,.destination-hero,.legal-hero,.branch-page-hero,.service-page-hero,
  section[id],main[id]{scroll-margin-top:78px!important}
}
@media(max-width:580px){
  body{padding-top:70px!important;padding-bottom:60px!important}
  .site-header .nav{height:70px!important;min-height:70px!important}
  .mobile-nav-panel{top:76px!important;max-height:calc(100dvh - 88px)!important}
}
@supports(padding-top:env(safe-area-inset-top)){
  @media(max-width:850px){
    body{padding-top:calc(70px + env(safe-area-inset-top))!important}
    .site-header{padding-top:env(safe-area-inset-top)!important}
    .mobile-nav-panel{top:calc(76px + env(safe-area-inset-top))!important}
  }
}
`;
    fs.writeFileSync(cssPath, css);
  }
}

const script = `<script id="mobile-header-visible-fix">(function(){try{if('scrollRestoration' in history)history.scrollRestoration='manual'}catch(e){}if(location.hash)return;var done=false;function fix(){if(done)return;done=true;if(window.matchMedia&&window.matchMedia('(max-width:850px)').matches&&window.scrollY>0&&window.scrollY<140){window.scrollTo(0,0)}}window.addEventListener('pageshow',function(){setTimeout(fix,0);setTimeout(fix,180)},{once:true});})();</script>`;
let patched = 0;
for (const file of htmlFiles(out)) {
  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('id="mobile-header-visible-fix"')) continue;
  html = html.replace('</body>', `${script}</body>`);
  fs.writeFileSync(file, html);
  patched += 1;
}

console.log(`Mobile header fixed at the top and visible on first load across ${patched} page(s).`);
