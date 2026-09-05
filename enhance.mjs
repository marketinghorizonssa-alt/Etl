import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const PHONE_TEL = '+966920029967';
const WHATSAPP = '966125422331';
const wa = `https://api.whatsapp.com/send?phone=${WHATSAPP}&text=${encodeURIComponent('مرحباً إطلالة، أريد عرضاً سياحياً')}`;

const destinationMenu = `<details class="dest-menu"><summary aria-label="فتح قائمة الوجهات"><span>الوجهات</span><span class="dest-chevron" aria-hidden="true">⌄</span></summary><div class="dest-dropdown" role="menu"><a role="menuitem" href="/georgia/">جورجيا</a><a role="menuitem" href="/georgia-2/">عروض جورجيا</a><a role="menuitem" href="/malaysia/">ماليزيا</a><a role="menuitem" href="/malaysia-2/">عروض ماليزيا</a><a role="menuitem" href="/maldives/">المالديف</a><a role="menuitem" href="/maldives-2/">عروض المالديف</a><a role="menuitem" href="/thailand/">تايلاند</a><a role="menuitem" href="/thailand-2/">عروض تايلاند</a><a role="menuitem" href="/turkiye/">تركيا</a><a role="menuitem" href="/turkey-2/">عروض تركيا</a><a role="menuitem" href="/bosnia-and-herzegovina/">البوسنة والهرسك</a><a role="menuitem" href="/europe/">أوروبا</a></div></details>`;

const floating = `<div class="floating-contact" aria-label="تواصل سريع"><a class="float-btn float-wa" data-track="whatsapp" href="${wa}" aria-label="تواصل عبر واتساب" title="واتساب"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3a8 8 0 0 0-6.9 12.05L4 20l5.1-1.06A8 8 0 1 0 12 3Zm0 2a6 6 0 1 1-2.25 11.56l-.3-.12-2.8.58.6-2.7-.15-.32A6 6 0 0 1 12 5Zm-2.15 3.2c-.2 0-.4.02-.57.2-.17.18-.65.63-.65 1.54 0 .9.66 1.78.75 1.9.1.12 1.3 1.98 3.14 2.78 1.55.67 1.87.54 2.2.5.34-.06 1.1-.45 1.26-.89.15-.44.15-.82.1-.9-.04-.08-.17-.12-.36-.22-.2-.1-1.1-.54-1.27-.6-.17-.06-.3-.1-.42.1-.13.2-.48.6-.59.73-.11.13-.22.15-.41.05-.2-.1-.82-.3-1.56-.96a5.85 5.85 0 0 1-1.08-1.34c-.11-.2-.01-.3.08-.4.08-.08.2-.22.29-.33.1-.11.13-.2.2-.32.06-.13.03-.24-.02-.34-.05-.1-.43-1.04-.59-1.42-.15-.37-.31-.38-.5-.38Z"/></svg><span class="float-label">واتساب</span></a><a class="float-btn float-call" data-track="call" href="tel:${PHONE_TEL}" aria-label="اتصل بإطلالة" title="اتصال"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7.1 3.5 9.4 8a1.4 1.4 0 0 1-.28 1.62l-1.2 1.18a14.2 14.2 0 0 0 5.28 5.28l1.18-1.2A1.4 1.4 0 0 1 16 14.6l4.5 2.3a1.4 1.4 0 0 1 .72 1.55l-.35 1.72A2.3 2.3 0 0 1 18.6 22C9.44 22 2 14.56 2 5.4a2.3 2.3 0 0 1 1.83-2.27l1.72-.35a1.4 1.4 0 0 1 1.55.72Z"/></svg><span class="float-label">اتصال</span></a></div>`;

function htmlFiles(dir) {
  const files = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...htmlFiles(full));
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

for (const file of htmlFiles(out)) {
  let html = fs.readFileSync(file, 'utf8');
  if (!html.includes('class="dest-menu"')) {
    html = html.replace('</a><nav class="navlinks"', `</a>${destinationMenu}<nav class="navlinks"`);
  }
  if (!html.includes('class="floating-contact"')) {
    html = html.replace('</body>', `${floating}</body>`);
  }
  fs.writeFileSync(file, html);
}

const cssPath = path.join(out, 'assets', 'styles.css');
let css = fs.readFileSync(cssPath, 'utf8');
if (!css.includes('floating-contact-and-destinations-v2')) {
  css += `\n/* floating-contact-and-destinations-v2 */\n.dest-menu{position:relative;z-index:90;flex:0 0 auto}.dest-menu summary{list-style:none;cursor:pointer;display:flex;align-items:center;gap:7px;padding:10px 14px;border-radius:12px;font-weight:800;color:#fff;background:rgba(255,255,255,.10);border:1px solid rgba(255,255,255,.18);transition:.2s ease}.dest-menu summary::-webkit-details-marker{display:none}.dest-menu summary:hover,.dest-menu[open] summary{background:rgba(255,255,255,.18)}.dest-chevron{font-size:1.05em;line-height:1;transition:transform .2s ease}.dest-menu[open] .dest-chevron{transform:rotate(180deg)}.dest-dropdown{position:absolute;top:calc(100% + 12px);right:0;width:520px;max-width:78vw;padding:12px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:7px;background:#fff;border:1px solid rgba(17,32,82,.1);border-radius:18px;box-shadow:0 20px 60px rgba(8,19,58,.22)}.dest-dropdown:before{content:"";position:absolute;top:-7px;right:28px;width:14px;height:14px;background:#fff;transform:rotate(45deg);border-left:1px solid rgba(17,32,82,.08);border-top:1px solid rgba(17,32,82,.08)}.dest-dropdown a{position:relative;z-index:1;padding:11px 12px;border-radius:11px;color:#16214d;font-weight:750;background:#f8f9ff;border:1px solid transparent;transition:.18s ease}.dest-dropdown a:hover,.dest-dropdown a:focus-visible{background:#eef0ff;border-color:#dfe3ff;color:#5526b7;transform:translateY(-1px)}.mobile-bar{display:none!important}.floating-contact{display:contents}.float-btn{position:fixed;bottom:max(22px,env(safe-area-inset-bottom));z-index:120;width:62px;height:62px;border-radius:50%;display:grid;place-items:center;box-shadow:0 12px 30px rgba(0,0,0,.22);transition:transform .2s ease,box-shadow .2s ease}.float-btn:hover{transform:translateY(-4px) scale(1.03);box-shadow:0 16px 36px rgba(0,0,0,.28)}.float-btn svg{width:29px;height:29px;fill:#fff}.float-wa{right:22px;background:#25D366}.float-call{left:22px;background:linear-gradient(135deg,#1335AE,#6D22B7 58%,#F15A29)}.float-label{position:absolute;top:50%;transform:translateY(-50%);padding:7px 10px;background:#141a30;color:#fff;border-radius:9px;font-size:.85rem;font-weight:800;white-space:nowrap;opacity:0;pointer-events:none;transition:.18s ease}.float-wa .float-label{right:72px}.float-call .float-label{left:72px}.float-btn:hover .float-label,.float-btn:focus-visible .float-label{opacity:1}@media(max-width:900px){.nav{gap:10px}.navlinks{display:none!important}.header-cta{display:none!important}.brand img{width:150px;height:auto}.dest-menu{margin-inline-start:auto}.dest-menu summary{padding:9px 11px}.dest-dropdown{position:fixed;top:112px;right:16px;left:16px;width:auto;max-width:none;max-height:64vh;overflow:auto;grid-template-columns:repeat(2,minmax(0,1fr))}.dest-dropdown:before{display:none}.float-btn{width:56px;height:56px;bottom:max(16px,env(safe-area-inset-bottom))}.float-btn svg{width:26px;height:26px}.float-wa{right:14px}.float-call{left:14px}.float-label{display:none}}@media(max-width:520px){.dest-dropdown{grid-template-columns:1fr;top:104px}.dest-menu summary span:first-child{font-size:.9rem}}\n`;
  fs.writeFileSync(cssPath, css);
}

console.log(`Enhanced ${htmlFiles(out).length} HTML pages with destinations menu and floating contacts.`);
