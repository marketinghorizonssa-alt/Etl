import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const cssPath = path.join(out,'assets','styles.css');

const destinationLinks = `
<a href="/turkiye/"><span>تركيا</span><small>برامج وعروض تركيا</small></a>
<a href="/georgia/"><span>جورجيا</span><small>تبليسي وباتومي والطبيعة</small></a>
<a href="/malaysia/"><span>ماليزيا</span><small>كوالالمبور والجزر</small></a>
<a href="/maldives/"><span>المالديف</span><small>منتجعات وشهر العسل</small></a>
<a href="/thailand/"><span>تايلاند</span><small>بانكوك وبوكيت وكرابي</small></a>
<a href="/bosnia-and-herzegovina/"><span>البوسنة والهرسك</span><small>سراييفو والطبيعة</small></a>
<a href="/europe/"><span>أوروبا</span><small>برامج وكروز أوروبا</small></a>`;

const desktopNav = `<nav class="navlinks navlinks-unified" aria-label="التنقل الرئيسي">
<a href="/">الرئيسية</a>
<a href="/about/">من نحن</a>
<details class="nav-dropdown nav-destinations"><summary>الوجهات</summary><div class="nav-dropdown-menu dest-dropdown-menu">${destinationLinks}</div></details>
<a href="/#services">الخدمات</a>
<details class="nav-dropdown branch-dropdown"><summary>الفروع</summary><div class="nav-dropdown-menu"><a href="/makkah-office/"><span>مكة المكرمة</span><small>مكتب إطلالة</small></a><a href="/madina-office/"><span>المدينة المنورة</span><small>مكتب إطلالة</small></a></div></details>
<a href="/articles/">المقالات</a>
<a href="/#contact">تواصل معنا</a>
</nav>`;

const mobileNav = `<details class="mobile-nav" aria-label="قائمة الموقع"><summary aria-label="فتح القائمة"><span></span><span></span><span></span></summary><div class="mobile-nav-panel"><div class="mobile-main-links"><a href="/">الرئيسية</a><a href="/about/">من نحن</a><a href="/#services">الخدمات</a><a href="/articles/">المقالات</a><a href="/#contact">تواصل معنا</a></div><div class="mobile-nav-section"><strong>الوجهات</strong><div class="mobile-dest-grid">${destinationLinks}</div></div><div class="mobile-nav-section"><strong>الفروع</strong><div class="mobile-branch-grid"><a href="/makkah-office/">مكة المكرمة</a><a href="/madina-office/">المدينة المنورة</a></div></div></div></details>`;

function htmlFiles(dir){
  const files=[];
  if(!fs.existsSync(dir)) return files;
  for(const e of fs.readdirSync(dir,{withFileTypes:true})){
    const p=path.join(dir,e.name);
    if(e.isDirectory()) files.push(...htmlFiles(p));
    else if(e.isFile()&&e.name.endsWith('.html')) files.push(p);
  }
  return files;
}

for(const file of htmlFiles(out)){
  let html=fs.readFileSync(file,'utf8');
  html=html.replace(/<nav class="navlinks(?:\s+navlinks-unified)?" aria-label="التنقل الرئيسي">[\s\S]*?<\/nav>/g,desktopNav);
  html=html.replace(/<details class="mobile-nav"[\s\S]*?<\/details>(?=<a class="header-cta")/g,'');
  html=html.replace(/(<\/nav>)(<a class="header-cta")/,`$1${mobileNav}$2`);
  if(!html.includes('id="etlaala-menu-behavior"')){
    html=html.replace('</body>',`<script id="etlaala-menu-behavior">document.addEventListener('DOMContentLoaded',()=>{const drops=[...document.querySelectorAll('.navlinks-unified .nav-dropdown')];drops.forEach(d=>d.addEventListener('toggle',()=>{if(d.open)drops.forEach(o=>{if(o!==d)o.open=false})}));document.addEventListener('click',e=>{if(!e.target.closest('.navlinks-unified'))drops.forEach(d=>d.open=false)});document.addEventListener('keydown',e=>{if(e.key==='Escape')drops.forEach(d=>d.open=false)});const mobile=document.querySelector('.mobile-nav');if(mobile){mobile.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>mobile.open=false));document.addEventListener('click',e=>{if(mobile.open&&!e.target.closest('.mobile-nav')&&!e.target.closest('.brand'))mobile.open=false})}});</script></body>`);
  }
  fs.writeFileSync(file,html);
}

if(fs.existsSync(cssPath)){
  let css=fs.readFileSync(cssPath,'utf8');
  if(!css.includes('menu-polish-v1')){
    css += `\n/* menu-polish-v1 */\n.site-header{overflow:visible!important}.site-header .nav{height:76px!important;gap:12px!important;overflow:visible!important}.site-header .brand{width:165px!important;min-width:145px!important}.site-header .brand img{max-width:165px!important;max-height:62px!important}.site-header .header-cta{min-height:42px!important;padding:8px 14px!important;font-size:12px!important}.navlinks-unified{display:flex!important;flex:1!important;align-items:center!important;justify-content:center!important;gap:2px!important;min-width:0!important;overflow:visible!important;color:#fff!important}.navlinks-unified>a,.navlinks-unified>.nav-dropdown>summary{position:relative!important;display:flex!important;align-items:center!important;justify-content:center!important;min-height:42px!important;padding:9px 10px!important;border:0!important;border-radius:10px!important;background:transparent!important;color:#fff!important;font-size:12px!important;font-weight:800!important;line-height:1.4!important;white-space:nowrap!important;cursor:pointer!important;list-style:none!important;transition:background .16s ease,color .16s ease!important}.navlinks-unified>a:after{display:none!important}.navlinks-unified>.nav-dropdown>summary::-webkit-details-marker{display:none!important}.navlinks-unified>.nav-dropdown>summary:after{content:''!important;width:6px!important;height:6px!important;border-left:1.7px solid currentColor!important;border-bottom:1.7px solid currentColor!important;transform:rotate(-45deg)!important;margin-right:7px!important;margin-top:-4px!important;transition:transform .16s ease!important}.navlinks-unified>.nav-dropdown[open]>summary:after{transform:rotate(135deg)!important;margin-top:4px!important}.navlinks-unified>a:hover,.navlinks-unified>.nav-dropdown>summary:hover,.navlinks-unified>.nav-dropdown[open]>summary{background:rgba(255,255,255,.14)!important;color:#fff!important}.navlinks-unified>.nav-dropdown{position:relative!important;margin:0!important;padding:0!important}.nav-dropdown-menu{position:absolute!important;z-index:300!important;top:calc(100% + 12px)!important;right:50%!important;left:auto!important;transform:translateX(50%)!important;display:grid!important;gap:5px!important;min-width:250px!important;padding:10px!important;border:1px solid rgba(32,54,132,.12)!important;border-radius:16px!important;background:#fff!important;box-shadow:0 24px 70px rgba(12,24,78,.22)!important;overflow:hidden!important}.dest-dropdown-menu{grid-template-columns:repeat(2,minmax(175px,1fr))!important;width:390px!important;max-width:calc(100vw - 28px)!important}.branch-dropdown .nav-dropdown-menu{grid-template-columns:1fr!important;width:255px!important;min-width:255px!important}.nav-dropdown-menu a{position:relative!important;display:flex!important;flex-direction:column!important;align-items:flex-start!important;gap:1px!important;padding:11px 12px!important;border-radius:11px!important;background:transparent!important;color:#1d2f75!important;text-decoration:none!important;text-align:right!important;transition:background .15s ease!important}.nav-dropdown-menu a:after{display:none!important}.nav-dropdown-menu a:hover{background:#f3f6ff!important;color:#173cad!important}.nav-dropdown-menu a span{font-size:.88rem!important;font-weight:900!important;line-height:1.5!important}.nav-dropdown-menu a small{font-size:.66rem!important;font-weight:600!important;color:#8992a9!important;line-height:1.55!important}.mobile-nav{display:none!important;position:relative!important}.mobile-nav>summary{list-style:none!important;width:42px!important;height:42px!important;border:1px solid rgba(255,255,255,.24)!important;border-radius:11px!important;background:rgba(255,255,255,.12)!important;display:grid!important;place-content:center!important;gap:4px!important;cursor:pointer!important}.mobile-nav>summary::-webkit-details-marker{display:none!important}.mobile-nav>summary span{display:block!important;width:18px!important;height:2px!important;border-radius:9px!important;background:#fff!important}.mobile-nav-panel{position:fixed!important;z-index:400!important;top:72px!important;right:12px!important;left:12px!important;max-height:calc(100vh - 92px)!important;overflow:auto!important;padding:14px!important;border:1px solid #e1e6f2!important;border-radius:18px!important;background:#fff!important;box-shadow:0 24px 70px rgba(12,24,78,.24)!important;color:#1f2f70!important}.mobile-main-links{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:7px!important}.mobile-main-links a{padding:11px 12px!important;border-radius:10px!important;background:#f6f8ff!important;color:#1d327d!important;font-size:.82rem!important;font-weight:900!important}.mobile-nav-section{margin-top:15px!important;padding-top:13px!important;border-top:1px solid #edf0f6!important}.mobile-nav-section>strong{display:block!important;margin-bottom:9px!important;color:#1b2d73!important;font-size:.82rem!important}.mobile-dest-grid{display:grid!important;grid-template-columns:repeat(2,minmax(0,1fr))!important;gap:6px!important}.mobile-dest-grid a{display:flex!important;flex-direction:column!important;gap:1px!important;padding:9px 10px!important;border-radius:9px!important;border:1px solid #e8ebf4!important;color:#253675!important}.mobile-dest-grid a span{font-size:.78rem!important;font-weight:900!important}.mobile-dest-grid a small{font-size:.61rem!important;color:#8a92a7!important}.mobile-branch-grid{display:grid!important;grid-template-columns:1fr 1fr!important;gap:7px!important}.mobile-branch-grid a{padding:10px!important;border:1px solid #e8ebf4!important;border-radius:9px!important;color:#253675!important;font-size:.76rem!important;font-weight:900!important;text-align:center!important}@media(max-width:1080px){.site-header .nav{gap:8px!important}.site-header .brand{width:140px!important;min-width:125px!important}.site-header .brand img{max-width:140px!important}.navlinks-unified>a,.navlinks-unified>.nav-dropdown>summary{padding:8px 7px!important;font-size:11px!important}.site-header .header-cta{padding:7px 10px!important;font-size:11px!important}}@media(max-width:960px){.site-header .brand{width:125px!important;min-width:115px!important}.site-header .brand img{max-width:125px!important}.site-header .header-cta{display:none!important}.navlinks-unified>a,.navlinks-unified>.nav-dropdown>summary{padding:8px 8px!important;font-size:11px!important}.dest-dropdown-menu{width:370px!important}}@media(max-width:850px){.site-header .nav{height:70px!important}.site-header .brand{margin-left:auto!important;width:150px!important;min-width:135px!important}.site-header .brand img{max-width:150px!important}.navlinks-unified{display:none!important}.mobile-nav{display:block!important;margin-right:auto!important}.site-header .header-cta{display:none!important}}@media(max-width:480px){.mobile-nav-panel{right:8px!important;left:8px!important;padding:11px!important}.mobile-dest-grid{grid-template-columns:1fr!important}.mobile-main-links{grid-template-columns:1fr 1fr!important}}\n`;
    fs.writeFileSync(cssPath,css);
  }
}

console.log('Navigation polished: single-open desktop dropdowns, clean contrast, responsive spacing and a proper mobile menu.');
