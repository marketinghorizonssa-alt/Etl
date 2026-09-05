import fs from 'node:fs';
import path from 'node:path';

const file = path.resolve('dist','turkiye','index.html');
const cssPath = path.resolve('dist','assets','styles.css');
if (!fs.existsSync(file) || !fs.existsSync(cssPath)) process.exit(0);

let html = fs.readFileSync(file,'utf8');

const section = `<section class="tk-programs tk-programs-refined"><div class="container">
  <div class="tk-programs-head">
    <div><span class="tk-kicker">أفكار برامج</span><h2>اختَر شكل الرحلة اللي يناسب وقتك</h2></div>
    <p>نماذج بسيطة نبدأ منها، وبعدها نعدّل المدن والليالي والفنادق حسب تاريخ السفر وطبيعة الرحلة.</p>
  </div>
  <div class="tk-program-grid tk-program-grid-refined">
    <article class="tk-program-card tk-program-card-light">
      <div class="tk-program-top"><span class="tk-program-no">01</span><span class="tk-program-tag">7 أيام</span></div>
      <h3>تركيا في أسبوع</h3>
      <p>إسطنبول مع رحلات قريبة أو مدينة إضافية واحدة، بدون زحمة تنقلات.</p>
      <a href="/#contact">رتّب برنامج مشابه <span aria-hidden="true">←</span></a>
    </article>
    <article class="tk-program-card tk-program-card-featured">
      <div class="tk-program-top"><span class="tk-program-no">02</span><span class="tk-program-tag">الأكثر طلبًا</span></div>
      <h3>إسطنبول + الشمال التركي</h3>
      <p>مزيج متوازن بين المدينة والطبيعة، مناسب للعائلات ومحبي الأجواء الجبلية.</p>
      <a href="/#contact">رتّب برنامج مشابه <span aria-hidden="true">←</span></a>
    </article>
    <article class="tk-program-card tk-program-card-light tk-program-card-warm">
      <div class="tk-program-top"><span class="tk-program-no">03</span><span class="tk-program-tag">10+ أيام</span></div>
      <h3>تركيا متعددة المدن</h3>
      <p>إسطنبول مع أنطاليا أو كابادوكيا للرحلات الأطول، حسب الموسم واهتماماتك.</p>
      <a href="/#contact">رتّب برنامج مشابه <span aria-hidden="true">←</span></a>
    </article>
  </div>
</div></section>`;

html = html.replace(/<section class="tk-programs">[\s\S]*?<\/section>\s*(?=<section class="tk-consult">|<section class="tk-section tk-gallery-section")/, `${section}\n`);
// Ensure the removed gallery cannot come back if build ordering changes later.
html = html.replace(/<a href="#gallery">صور تركيا<\/a>/g,'');
html = html.replace(/<section class="tk-section tk-gallery-section" id="gallery">[\s\S]*?<\/section>\s*(?=<section class="tk-consult">)/g,'');
fs.writeFileSync(file,html);

let css = fs.readFileSync(cssPath,'utf8');
if (!css.includes('turkiye-programs-refined-v1')) {
  css += `\n/* turkiye-programs-refined-v1 */\n.tk-programs.tk-programs-refined{position:relative;padding:68px 0 72px;background:linear-gradient(180deg,#f7f9fd 0%,#fff 100%);color:#1b2b68;overflow:hidden}.tk-programs-refined:before{content:'';position:absolute;right:-120px;top:-140px;width:360px;height:360px;border-radius:50%;background:radial-gradient(circle,rgba(27,180,235,.09),rgba(27,180,235,0) 68%);pointer-events:none}.tk-programs-head{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(300px,.7fr);gap:44px;align-items:end;margin-bottom:28px}.tk-programs-head h2{margin:7px 0 0;color:#172760;font-size:clamp(1.75rem,3vw,2.45rem);line-height:1.45}.tk-programs-head>p{margin:0;color:#6b748d;font-size:.9rem;line-height:1.9;max-width:520px}.tk-program-grid.tk-program-grid-refined{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px;align-items:stretch}.tk-program-grid-refined .tk-program-card{position:relative;min-height:250px;padding:24px 24px 22px;border-radius:22px;display:flex;flex-direction:column;overflow:hidden;transition:transform .22s ease,box-shadow .22s ease,border-color .22s ease}.tk-program-grid-refined .tk-program-card:before{content:'';position:absolute;right:0;left:0;top:0;height:4px;background:linear-gradient(90deg,#1bb4eb,#1335ae)}.tk-program-grid-refined .tk-program-card-light{background:#fff;border:1px solid #e2e7f2;box-shadow:0 12px 32px rgba(24,42,105,.055)}.tk-program-grid-refined .tk-program-card-warm:before{background:linear-gradient(90deg,#b20a42,#ff8d02)}.tk-program-grid-refined .tk-program-card-featured{transform:translateY(-10px);background:linear-gradient(145deg,#102d8f 0%,#1d3aad 58%,#6f2b92 100%);border:1px solid rgba(255,255,255,.1);box-shadow:0 22px 48px rgba(22,48,145,.2);color:#fff}.tk-program-grid-refined .tk-program-card-featured:before{background:linear-gradient(90deg,#46c3ef,#fff,#fea760);opacity:.92}.tk-program-grid-refined .tk-program-card:hover{transform:translateY(-6px);box-shadow:0 20px 46px rgba(24,42,105,.11)}.tk-program-grid-refined .tk-program-card-featured:hover{transform:translateY(-14px)}.tk-program-top{display:flex;align-items:center;justify-content:space-between;gap:12px;margin-bottom:22px}.tk-program-no{display:grid!important;place-items:center;width:42px;height:42px;border-radius:13px;background:#edf3ff;color:#1d3da9!important;font-size:.72rem!important;font-weight:900}.tk-program-tag{display:inline-flex!important;width:auto!important;height:auto!important;padding:5px 9px;border-radius:999px;background:#f5f7fc;color:#6b7691!important;font-size:.67rem!important;font-weight:900}.tk-program-card-featured .tk-program-no{background:rgba(255,255,255,.14);color:#fff!important}.tk-program-card-featured .tk-program-tag{background:rgba(255,255,255,.12);color:#dff5ff!important}.tk-program-grid-refined .tk-program-card h3{margin:0 0 9px;color:#1a2f7c;font-size:1.08rem;line-height:1.55}.tk-program-grid-refined .tk-program-card p{min-height:0;margin:0;color:#68738c;font-size:.84rem;line-height:1.85;flex:1}.tk-program-grid-refined .tk-program-card a{display:inline-flex;align-items:center;gap:7px;width:max-content;margin-top:20px;padding-bottom:3px;color:#2442ad;font-size:.78rem;font-weight:900;border-bottom:1px solid #cad3ef}.tk-program-grid-refined .tk-program-card a span{color:inherit!important;font-size:inherit!important}.tk-program-grid-refined .tk-program-card-featured h3{color:#fff}.tk-program-grid-refined .tk-program-card-featured p{color:rgba(255,255,255,.82)}.tk-program-grid-refined .tk-program-card-featured a{color:#fff;border-bottom-color:rgba(255,255,255,.35)}@media(max-width:900px){.tk-programs-head{grid-template-columns:1fr;gap:10px}.tk-programs-head>p{max-width:700px}.tk-program-grid.tk-program-grid-refined{grid-template-columns:1fr}.tk-program-grid-refined .tk-program-card{min-height:0}.tk-program-grid-refined .tk-program-card-featured{transform:none}.tk-program-grid-refined .tk-program-card-featured:hover{transform:translateY(-6px)}}@media(max-width:680px){.tk-programs.tk-programs-refined{padding:46px 0 50px}.tk-programs-head{margin-bottom:20px}.tk-program-grid-refined .tk-program-card{padding:21px;border-radius:18px}.tk-program-top{margin-bottom:16px}}\n`;
  fs.writeFileSync(cssPath,css);
}

console.log('Refined Turkey program ideas section and ensured the gallery stays removed.');
