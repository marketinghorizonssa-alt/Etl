import fs from 'node:fs';
import path from 'node:path';

const file = path.resolve('dist','turkiye','index.html');
const cssPath = path.resolve('dist','assets','styles.css');
if (!fs.existsSync(file) || !fs.existsSync(cssPath)) process.exit(0);

let html = fs.readFileSync(file,'utf8');

const activities = `<section class="tk-activities" id="experiences"><div class="container">
  <div class="tk-activities-head">
    <div><span class="tk-kicker">الأنشطة السياحية في تركيا</span><h2>تجارب تضيف للرحلة، مو بس أماكن تزورها</h2></div>
    <p>اختَر النشاط اللي يناسب أسلوب سفرك، ونرتّبه داخل البرنامج بدون ما يصير الجدول مزدحم.</p>
  </div>
  <div class="tk-activities-grid">
    <article class="tk-activity-card tk-activity-history">
      <div class="tk-activity-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 9.5 12 4l9 5.5V11H3V9.5Zm2 3h2V19h2v-6.5h2V19h2v-6.5h2V19h2v-6.5h2V19h2v2H3v-2h2v-6.5Z"/></svg></div>
      <div><span>تاريخ وثقافة</span><h3>زيارة المعالم التاريخية</h3><p>آيا صوفيا، قصر توبكابي والجامع الأزرق من أبرز محطات إسطنبول، ونرتّبها ضمن يوم واضح ومريح.</p></div>
    </article>
    <article class="tk-activity-card tk-activity-sea">
      <div class="tk-activity-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M3 16.5c1.5 0 2.1-.9 3.4-.9 1.3 0 1.9.9 3.4.9s2.1-.9 3.4-.9 1.9.9 3.4.9 2.1-.9 3.4-.9v2c-1.3 0-1.9.9-3.4.9s-2.1-.9-3.4-.9-1.9.9-3.4.9-2.1-.9-3.4-.9-1.9.9-3.4.9v-2Zm0 4c1.5 0 2.1-.9 3.4-.9 1.3 0 1.9.9 3.4.9s2.1-.9 3.4-.9 1.9.9 3.4.9 2.1-.9 3.4-.9v2c-1.3 0-1.9.9-3.4.9s-2.1-.9-3.4-.9-1.9.9-3.4.9-2.1-.9-3.4-.9-1.9.9-3.4.9v-2ZM12 3a4 4 0 1 1 0 8 4 4 0 0 1 0-8Z"/></svg></div>
      <div><span>بحر واسترخاء</span><h3>الشواطئ والمنتجعات</h3><p>أولودينيز في فتحية وشواطئ أنطاليا خيارات مميزة للبحر والمنتجعات خلال الموسم المناسب.</p></div>
    </article>
    <article class="tk-activity-card tk-activity-balloon">
      <div class="tk-activity-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M12 2c4 0 7 3.2 7 7.1 0 3.2-2 5.5-4.3 7.3L14 18h-4l-.7-1.6C7 14.6 5 12.3 5 9.1 5 5.2 8 2 12 2Zm-2 17h4l-1 3h-2l-1-3Z"/></svg></div>
      <div><span>تجربة أيقونية</span><h3>رحلات المنطاد في كابادوكيا</h3><p>مشهد شروق الشمس فوق تضاريس كابادوكيا من أشهر تجارب تركيا، ويحتاج ترتيبًا مبكرًا حسب الطقس والتوفر.</p></div>
    </article>
    <article class="tk-activity-card tk-activity-nature">
      <div class="tk-activity-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="m12 3 4.7 7H14l4.5 7H5.5l4.5-7H7.3L12 3Zm-1 14h2v4h-2v-4Z"/></svg></div>
      <div><span>طبيعة ومغامرة</span><h3>استكشاف الطبيعة والمغامرات</h3><p>مرتفعات الشمال، البحيرات والمناطق الجبلية تضيف جانبًا مختلفًا للرحلة بعيدًا عن أجواء المدن.</p></div>
    </article>
  </div>
</div></section>`;

html = html.replace(/<section class="tk-section" id="experiences">[\s\S]*?<\/section>\s*(?=<section class="tk-programs)/, `${activities}\n`);
html = html.replace(/<a href="#experiences">التجارب<\/a>/g,'<a href="#experiences">الأنشطة</a>');
fs.writeFileSync(file,html);

let css = fs.readFileSync(cssPath,'utf8');
if (!css.includes('turkiye-activities-polish-v1')) {
  css += `\n/* turkiye-activities-polish-v1 */\n.tk-activities{position:relative;padding:68px 0;background:#fff;overflow:hidden;scroll-margin-top:135px}.tk-activities:before{content:'';position:absolute;left:-140px;bottom:-170px;width:420px;height:420px;border-radius:50%;background:radial-gradient(circle,rgba(178,10,66,.06),rgba(178,10,66,0) 68%);pointer-events:none}.tk-activities-head{position:relative;display:grid;grid-template-columns:minmax(0,1fr) minmax(300px,.72fr);gap:42px;align-items:end;margin-bottom:30px}.tk-activities-head h2{margin:7px 0 0;color:#172760;font-size:clamp(1.75rem,3vw,2.5rem);line-height:1.48}.tk-activities-head>p{margin:0;color:#6b748c;font-size:.9rem;line-height:1.9;max-width:500px}.tk-activities-grid{position:relative;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px}.tk-activity-card{position:relative;display:grid;grid-template-columns:62px 1fr;gap:18px;align-items:start;min-height:205px;padding:24px;border:1px solid #e3e8f2;border-radius:22px;background:#fff;box-shadow:0 10px 30px rgba(24,42,105,.045);overflow:hidden;transition:transform .22s ease,box-shadow .22s ease,border-color .22s ease}.tk-activity-card:after{content:'';position:absolute;right:0;bottom:0;width:120px;height:4px;border-radius:4px 0 0 0;background:linear-gradient(90deg,#1bb4eb,#1335ae)}.tk-activity-sea:after{background:linear-gradient(90deg,#46c3ef,#1c69bf)}.tk-activity-balloon:after{background:linear-gradient(90deg,#7b39a6,#b20a42)}.tk-activity-nature:after{background:linear-gradient(90deg,#1335ae,#ff8d02)}.tk-activity-card:hover{transform:translateY(-5px);border-color:#d5ddf2;box-shadow:0 18px 42px rgba(24,42,105,.09)}.tk-activity-icon{display:grid;place-items:center;width:58px;height:58px;border-radius:17px;background:linear-gradient(145deg,#eef5ff,#f8f2ff);color:#173fae}.tk-activity-icon svg{width:30px;height:30px;fill:currentColor}.tk-activity-sea .tk-activity-icon{background:linear-gradient(145deg,#eafaff,#eef5ff);color:#1672ad}.tk-activity-balloon .tk-activity-icon{background:linear-gradient(145deg,#f6edff,#fff0f4);color:#8b2a75}.tk-activity-nature .tk-activity-icon{background:linear-gradient(145deg,#eef4ff,#fff6ea);color:#a55f16}.tk-activity-card>div:last-child>span{display:inline-flex;margin-bottom:5px;color:#566cc5;font-size:.69rem;font-weight:900}.tk-activity-card h3{margin:0 0 8px;color:#1b307b;font-size:1.06rem;line-height:1.55}.tk-activity-card p{margin:0;color:#69738c;font-size:.84rem;line-height:1.86}.tk-activity-card:nth-child(2),.tk-activity-card:nth-child(4){transform:translateY(12px)}.tk-activity-card:nth-child(2):hover,.tk-activity-card:nth-child(4):hover{transform:translateY(7px)}@media(max-width:900px){.tk-activities-head{grid-template-columns:1fr;gap:10px}.tk-activities-head>p{max-width:700px}.tk-activities-grid{grid-template-columns:1fr}.tk-activity-card:nth-child(2),.tk-activity-card:nth-child(4),.tk-activity-card:nth-child(2):hover,.tk-activity-card:nth-child(4):hover{transform:none}}@media(max-width:680px){.tk-activities{padding:46px 0}.tk-activities-head{margin-bottom:20px}.tk-activity-card{grid-template-columns:50px 1fr;gap:13px;min-height:0;padding:20px;border-radius:18px}.tk-activity-icon{width:48px;height:48px;border-radius:14px}.tk-activity-icon svg{width:25px;height:25px}.tk-activity-card h3{font-size:.98rem}}\n`;
  fs.writeFileSync(cssPath,css);
}

console.log('Added polished Turkey tourism activities section from the legacy landing content.');
