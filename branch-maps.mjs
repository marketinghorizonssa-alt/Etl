import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const cssPath = path.join(out, 'assets', 'styles.css');

const branches = {
  'makkah-office': {
    city: 'مكة المكرمة',
    query: 'برج القمرية 15 Al Jamiah Makkah 24242 Saudi Arabia'
  },
  'madina-office': {
    city: 'المدينة المنورة',
    query: 'شارع سلطانة العام مجمع الابتسامة الأجمل الدور السادس مكتب 1762 المدينة المنورة السعودية'
  }
};

for (const [slug, branch] of Object.entries(branches)) {
  const file = path.join(out, slug, 'index.html');
  if (!fs.existsSync(file)) continue;

  let html = fs.readFileSync(file, 'utf8');
  if (html.includes('class="branch-map-section"')) continue;

  const embedUrl = `https://www.google.com/maps?q=${encodeURIComponent(branch.query)}&output=embed`;
  const mapBlock = `<div class="container branch-map-section"><div class="branch-map-head"><div><span class="branch-label">الموقع على الخريطة</span><h2>مكتب إطلالة ${branch.city}</h2><p>استخدم الخريطة للتعرّف على موقع الفرع، ويمكنك فتحه مباشرة في خرائط Google للحصول على الاتجاهات.</p></div><a class="branch-map-open" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(branch.query)}" target="_blank" rel="noopener">فتح في خرائط Google</a></div><div class="branch-map-frame"><iframe title="خريطة مكتب إطلالة ${branch.city}" src="${embedUrl}" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe></div></div>`;

  html = html.replace('<div class="container branch-other">', `${mapBlock}<div class="container branch-other">`);
  fs.writeFileSync(file, html);
}

if (fs.existsSync(cssPath)) {
  let css = fs.readFileSync(cssPath, 'utf8');
  const marker = 'branch-maps-v1';
  if (!css.includes(marker)) {
    css += `\n/* ${marker} */\n.branch-map-section{max-width:1050px;margin-top:20px;background:#fff;border:1px solid #e4e9f4;border-radius:22px;padding:22px;box-shadow:0 12px 34px rgba(25,39,92,.05)}.branch-map-head{display:flex;align-items:flex-end;justify-content:space-between;gap:24px;margin-bottom:16px}.branch-map-head>div{min-width:0}.branch-map-head h2{margin:2px 0 6px;color:#18265f;font-size:1.28rem;line-height:1.5}.branch-map-head p{margin:0;max-width:690px;color:#67708a;font-size:.9rem;line-height:1.8}.branch-map-open{flex:0 0 auto;display:inline-flex;align-items:center;justify-content:center;min-height:42px;padding:0 16px;border:1px solid #dfe5f1;border-radius:12px;color:#2941b2;font-weight:900;background:#f9faff}.branch-map-open:hover{background:#f1f4ff}.branch-map-frame{position:relative;overflow:hidden;border-radius:16px;border:1px solid #e8ebf3;background:#eef2f8;aspect-ratio:16/6.3;min-height:330px}.branch-map-frame iframe{position:absolute;inset:0;width:100%;height:100%;border:0}.branch-map-section+.branch-other{margin-top:18px}@media(max-width:760px){.branch-map-section{padding:16px;border-radius:18px}.branch-map-head{display:block}.branch-map-open{margin-top:14px;width:100%}.branch-map-frame{aspect-ratio:auto;min-height:300px}}@media(max-width:480px){.branch-map-frame{min-height:270px}.branch-map-head h2{font-size:1.12rem}.branch-map-head p{font-size:.84rem}}\n`;
    fs.writeFileSync(cssPath, css);
  }
}

console.log('Added responsive Google Maps embeds to Makkah and Madina branch pages only.');
