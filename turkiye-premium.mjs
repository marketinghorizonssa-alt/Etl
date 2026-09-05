import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const file = path.join(out,'turkiye','index.html');
const cssPath = path.join(out,'assets','styles.css');
if (!fs.existsSync(file)) process.exit(0);

const OLD='https://etlaala.com/wp-content/uploads';
const WA='966125422331';
const PHONE='+966920029967';
const wa=(t)=>`https://api.whatsapp.com/send?phone=${WA}&text=${encodeURIComponent(t)}`;

const main=`<main id="main" class="tk-premium" data-premium-destination="turkiye">
<section class="tk-hero">
  <img src="${OLD}/2025/02/Untitled-design-33.webp" width="1920" height="900" alt="رحلات تركيا مع إطلالة" fetchpriority="high" decoding="async">
  <div class="tk-hero-overlay"></div>
  <div class="container tk-hero-wrap">
    <div class="tk-hero-copy">
      <span class="tk-pill">تركيا مع إطلالة</span>
      <h1>تركيا على طريقتك، من إسطنبول إلى الشمال التركي</h1>
      <p>نرتّب لك برنامجًا متوازنًا بين المدن والطبيعة والبحر، مع خيارات للفنادق والانتقالات والجولات حسب عدد الأيام والميزانية.</p>
      <div class="tk-actions"><a class="gradient-btn" href="/#contact">اطلب برنامجك</a><a class="ghost-btn" data-track="whatsapp" href="${wa('مرحباً إطلالة، أبغى برنامج سياحي لتركيا')}">واتساب</a></div>
    </div>
    <aside class="tk-hero-card">
      <span>نقترح المسار حسب رحلتك</span>
      <div><b>7 أيام</b><small>مدينة رئيسية + رحلات قريبة</small></div>
      <div><b>8–10 أيام</b><small>إسطنبول + الشمال التركي</small></div>
      <div><b>10+ أيام</b><small>إضافة أنطاليا أو كابادوكيا</small></div>
    </aside>
  </div>
</section>

<nav class="tk-anchor"><div class="container"><a href="#route">خط السير</a><a href="#cities">المدن</a><a href="#experiences">التجارب</a><a href="#gallery">صور تركيا</a><a href="#faq">الأسئلة الشائعة</a></div></nav>

<section class="tk-stats"><div class="container">
  <div><strong>إسطنبول</strong><span>تاريخ، تسوق وبوسفور</span></div>
  <div><strong>طرابزون</strong><span>طبيعة وشمال تركي</span></div>
  <div><strong>أنطاليا</strong><span>بحر ومنتجعات</span></div>
  <div><strong>كابادوكيا</strong><span>مناظر وتجربة مختلفة</span></div>
</div></section>

<section class="tk-section" id="route"><div class="container tk-route-grid">
  <div class="tk-copy tk-reveal">
    <span class="tk-kicker">بداية التخطيط</span>
    <h2>برنامج تركيا الجيد يبدأ من عدد الأيام، مو من كثرة المدن</h2>
    <p>تركيا فيها خيارات كثيرة، لكن الرحلة الممتعة ما تحتاج تجمع كل شيء. نختار المدن اللي تناسب الموسم ووقت السفر، ونوزع الليالي بطريقة تقلل التنقل وتخلي كل محطة تاخذ حقها.</p>
    <p>لرحلة أسبوع نفضّل مسارًا أخف. وللرحلات الأطول نقدر نجمع إسطنبول مع طرابزون والشمال التركي، أو نضيف أنطاليا أو كابادوكيا حسب طبيعة الرحلة.</p>
    <a class="tk-text-link" href="/#contact">خلّ مستشار إطلالة يقترح لك المسار ←</a>
  </div>
  <div class="tk-route-card tk-reveal">
    <div class="tk-route-line"></div>
    <article><span>01</span><div><b>إسطنبول</b><small>بداية مناسبة لأغلب الرحلات</small></div></article>
    <article><span>02</span><div><b>الشمال التركي</b><small>طرابزون والطبيعة والمناطق الجبلية</small></div></article>
    <article><span>03</span><div><b>أنطاليا أو كابادوكيا</b><small>إضافة اختيارية للرحلات الأطول</small></div></article>
  </div>
</div></section>

<section class="tk-section tk-soft" id="cities"><div class="container">
  <div class="tk-heading"><span class="tk-kicker">مدن ومناطق</span><h2>اختَر اللي يناسب رحلتك، مو اللي يزحم جدولك</h2><p>نركّب البرنامج من هذه الخيارات حسب الموسم ومدة السفر واهتماماتك.</p></div>
  <div class="tk-city-grid">
    <article class="tk-city featured"><div><span>مدينة رئيسية</span><h3>إسطنبول</h3><p>آيا صوفيا، توبكابي، البوسفور، الأسواق والأحياء المتنوعة؛ خيار مناسب كبداية أو نهاية للرحلة.</p></div></article>
    <article class="tk-city"><span>طبيعة</span><h3>طرابزون والشمال التركي</h3><p>مرتفعات وقرى وبحيرات وأجواء أهدأ، وتناسب العائلات ومحبي الطبيعة.</p></article>
    <article class="tk-city"><span>بحر</span><h3>أنطاليا</h3><p>منتجعات وشواطئ وخيارات استرخاء، وتناسب من يبغى يوازن بين الجولات والراحة.</p></article>
    <article class="tk-city"><span>تجربة مختلفة</span><h3>كابادوكيا</h3><p>مناظر صخرية ورحلات منطاد عند شروق الشمس، وتدخل بسهولة ضمن برنامج أطول.</p></article>
    <article class="tk-city"><span>قريبة من إسطنبول</span><h3>بورصة</h3><p>خيار مناسب لرحلة يومية أو إقامة قصيرة بحسب المسار وموسم السفر.</p></article>
    <article class="tk-city"><span>ساحل</span><h3>فتحية وبودروم</h3><p>لمن يفضّل البحر والمنتجعات والأجواء الصيفية خلال الموسم المناسب.</p></article>
  </div>
</div></section>

<section class="tk-section" id="experiences"><div class="container tk-exp-grid">
  <div class="tk-heading tk-heading-side"><span class="tk-kicker">تجارب تركيا</span><h2>أشياء تستحق وقتك فعلًا</h2><p>اختر الأنشطة اللي تضيف للرحلة بدل ما يتحول الجدول لقائمة حجوزات.</p></div>
  <div class="tk-exp-list">
    <article><span class="tk-ico">⌂</span><div><h3>المعالم التاريخية</h3><p>آيا صوفيا، قصر توبكابي والجامع الأزرق ضمن يوم مرتب في إسطنبول.</p></div></article>
    <article><span class="tk-ico">≈</span><div><h3>البوسفور والبحر</h3><p>رحلات بحرية وإطلالات مختلفة على المدينة، مع خيارات ساحلية في أنطاليا وفتحية.</p></div></article>
    <article><span class="tk-ico">◌</span><div><h3>منطاد كابادوكيا</h3><p>واحدة من أشهر تجارب تركيا، وتحتاج ترتيبًا مبكرًا بحسب الطقس والتوفر.</p></div></article>
    <article><span class="tk-ico">▲</span><div><h3>طبيعة الشمال</h3><p>مرتفعات ومناطق جبلية وبحيرات حول طرابزون بحسب الموسم وخط السير.</p></div></article>
  </div>
</div></section>

<section class="tk-programs"><div class="container">
  <div class="tk-heading light"><span>أفكار برامج</span><h2>ثلاث طرق مختلفة لرحلة تركيا</h2></div>
  <div class="tk-program-grid">
    <article><span>01</span><h3>تركيا في أسبوع</h3><p>إسطنبول مع رحلات قريبة أو مدينة إضافية واحدة، عشان تستفيد من الوقت بدون تنقل زائد.</p><a href="/#contact">اطلب عرضًا مشابهًا</a></article>
    <article><span>02</span><h3>إسطنبول + الشمال التركي</h3><p>مزيج مناسب للعائلات ومحبي الطبيعة، مع توزيع مريح لليالي بين المدينة والجبال.</p><a href="/#contact">اطلب عرضًا مشابهًا</a></article>
    <article><span>03</span><h3>تركيا متعددة المدن</h3><p>للرحلات الأطول: إسطنبول مع أنطاليا أو كابادوكيا، حسب الموسم وطبيعة السفر.</p><a href="/#contact">اطلب عرضًا مشابهًا</a></article>
  </div>
</div></section>

<section class="tk-section tk-gallery-section" id="gallery"><div class="container">
  <div class="tk-heading"><span class="tk-kicker">من تركيا</span><h2>الوجهة فيها أكثر من شكل واحد</h2><p>نفس السبب اللي يخلي تركيا مناسبة لرحلات مختلفة: مدينة، طبيعة، بحر وتجارب خاصة.</p></div>
  <div class="tk-gallery">
    <figure class="g1"><img src="${OLD}/2025/06/تركيا-1-scaled.webp" alt="مشهد سياحي من تركيا" loading="lazy" decoding="async"></figure>
    <figure class="g2"><img src="${OLD}/2025/06/تركيا-2-scaled.webp" alt="مناظر من تركيا" loading="lazy" decoding="async"></figure>
    <figure class="g3"><img src="${OLD}/2025/06/تركيا-3-scaled.webp" alt="رحلات تركيا" loading="lazy" decoding="async"></figure>
    <figure class="g4"><img src="${OLD}/2025/06/تركيا-4-scaled.webp" alt="السياحة في تركيا" loading="lazy" decoding="async"></figure>
  </div>
</div></section>

<section class="tk-consult"><div class="container tk-consult-grid">
  <div><span>ترتيب واضح من البداية</span><h2>أرسل لنا تاريخ السفر، ونرتّب لك الخيارات بدون دوخة البحث</h2><p>تقدر تطلب تذاكر وفنادق وانتقالات وجولات ضمن عرض واحد، أو تختار الخدمة اللي تحتاجها فقط.</p></div>
  <ul><li>فنادق حسب الميزانية والموقع</li><li>انتقالات بين المدن والمطار</li><li>جولات وأنشطة حسب البرنامج</li><li>تفاصيل واضحة قبل تأكيد الحجز</li></ul>
  <a class="gradient-btn" data-track="whatsapp" href="${wa('مرحباً إطلالة، أبغى أرتب رحلة تركيا')}">ابدأ على واتساب</a>
</div></section>

<section class="tk-section tk-faq" id="faq"><div class="container">
  <div class="tk-heading"><span class="tk-kicker">أسئلة شائعة</span><h2>قبل ما تحجز رحلة تركيا</h2><p>إجابات سريعة على أكثر الأسئلة اللي تتكرر أثناء التخطيط.</p></div>
  <div class="tk-faq-grid">
    <details><summary>هل أقدر أسوي رحلة إلى تركيا لمدة أسبوع؟</summary><p>نعم، والأفضل في أسبوع تقليل عدد المدن حتى تكون الرحلة أريح ونختار خط السير حسب مطار الوصول واهتماماتك.</p></details>
    <details><summary>وش الأفضل: إسطنبول وطرابزون أو إسطنبول وأنطاليا؟</summary><p>يعتمد على الموسم؛ طرابزون للطبيعة والأجواء الجبلية، وأنطاليا للبحر والمنتجعات.</p></details>
    <details><summary>هل عندكم بكج سفر لتركيا قابل للتعديل؟</summary><p>نعم، البكج يُبنى حسب التاريخ وعدد المسافرين ومستوى الفنادق والجولات المطلوبة.</p></details>
    <details><summary>هل يمكن ترتيب برنامج سياحي طرابزون؟</summary><p>نعم، ويمكن دمج طرابزون مع مناطق الشمال التركي بحسب عدد الليالي وطبيعة الرحلة.</p></details>
    <details><summary>هل تقدرون ترتبون برنامج سياحي في أنطاليا؟</summary><p>نعم، سواء كانت أنطاليا وجهة أساسية أو جزءًا من رحلة متعددة المدن.</p></details>
    <details><summary>هل تشمل العروض الطيران؟</summary><p>يختلف حسب العرض، ونوضح لك قبل الحجز ما يشمله السعر من طيران وفنادق وانتقالات وجولات.</p></details>
  </div>
</div></section>

<section class="tk-final-cta"><div class="container"><div><span>جاهز ترتّب الرحلة؟</span><h2>خلّ برنامج تركيا يتبني على رحلتك أنت</h2></div><div><a class="gradient-btn" href="/#contact">اطلب عرضك</a><a data-track="call" href="tel:${PHONE}">أو اتصل بنا</a></div></div></section>
</main>`;

let html=fs.readFileSync(file,'utf8');
html=html.replace(/<main id="main"[\s\S]*?<\/main>/,main);
fs.writeFileSync(file,html);

let css=fs.readFileSync(cssPath,'utf8');
if (!css.includes('turkiye-premium-v1')) {
css += `\n/* turkiye-premium-v1 */\n.tk-premium{background:#fff;color:#1c2b65}.tk-hero{position:relative;min-height:620px;overflow:hidden;display:flex;align-items:center;color:#fff;background:#102762}.tk-hero>img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.tk-hero-overlay{position:absolute;inset:0;background:linear-gradient(270deg,rgba(6,20,70,.96) 0%,rgba(13,39,108,.84) 46%,rgba(12,27,69,.38) 78%,rgba(8,21,55,.15) 100%)}.tk-hero-wrap{position:relative;z-index:2;display:grid;grid-template-columns:minmax(0,1fr) 310px;gap:42px;align-items:end;padding-top:88px;padding-bottom:70px}.tk-hero-copy{max-width:760px}.tk-pill{display:inline-flex;padding:7px 12px;border:1px solid rgba(255,255,255,.24);border-radius:999px;background:rgba(255,255,255,.09);font-size:.76rem;font-weight:900;color:#d7f5ff;backdrop-filter:blur(7px)}.tk-hero h1{margin:14px 0 15px;max-width:840px;color:#fff;font-size:clamp(2.65rem,5.2vw,4.7rem);line-height:1.24;letter-spacing:-.025em;text-shadow:0 5px 24px rgba(0,0,0,.2)}.tk-hero p{max-width:710px;margin:0;color:rgba(255,255,255,.92);font-size:1rem;line-height:1.95}.tk-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:25px}.tk-hero-card{padding:21px;border:1px solid rgba(255,255,255,.18);border-radius:22px;background:rgba(8,25,75,.44);backdrop-filter:blur(15px);box-shadow:0 22px 55px rgba(4,13,45,.2)}.tk-hero-card>span{display:block;color:#c8edff;font-size:.72rem;font-weight:900;margin-bottom:10px}.tk-hero-card>div{display:grid;gap:1px;padding:12px 0;border-top:1px solid rgba(255,255,255,.12)}.tk-hero-card b{color:#fff;font-size:.98rem}.tk-hero-card small{color:rgba(255,255,255,.72);font-size:.72rem}.tk-anchor{position:sticky;top:74px;z-index:25;border-bottom:1px solid #e8ecf5;background:rgba(255,255,255,.93);backdrop-filter:blur(12px)}.tk-anchor .container{display:flex;justify-content:center;gap:4px;overflow:auto;scrollbar-width:none}.tk-anchor a{padding:13px 16px;color:#64708f;font-weight:800;font-size:.78rem;white-space:nowrap}.tk-anchor a:hover{color:#173cad;background:#f5f7ff}.tk-stats{background:#fff;border-bottom:1px solid #edf0f6}.tk-stats .container{display:grid;grid-template-columns:repeat(4,minmax(0,1fr))}.tk-stats .container>div{padding:20px 24px;border-left:1px solid #edf0f6}.tk-stats .container>div:last-child{border-left:0}.tk-stats strong,.tk-stats span{display:block}.tk-stats strong{font-size:.95rem;color:#17378f}.tk-stats span{font-size:.76rem;color:#7b8499;margin-top:3px}.tk-section{padding:68px 0;scroll-margin-top:135px}.tk-soft{background:linear-gradient(180deg,#f8faff,#f3f6fb)}.tk-route-grid{display:grid;grid-template-columns:minmax(0,1.05fr) minmax(340px,.95fr);gap:55px;align-items:center}.tk-kicker{display:inline-block;color:#4864c9;font-weight:900;font-size:.75rem}.tk-copy h2,.tk-heading h2{margin:8px 0 14px;color:#172760;font-size:clamp(1.75rem,3.1vw,2.55rem);line-height:1.48}.tk-copy p{margin:0;color:#5f6984;font-size:.96rem;line-height:2}.tk-copy p+p{margin-top:12px}.tk-text-link{display:inline-flex;margin-top:19px;color:#2344b5;font-weight:900;font-size:.84rem}.tk-route-card{position:relative;padding:21px 22px 21px 28px;border-radius:24px;background:linear-gradient(145deg,#102c8c,#213caf 68%,#5d2f99);box-shadow:0 22px 60px rgba(19,51,155,.18);overflow:hidden}.tk-route-card:after{content:'';position:absolute;width:220px;height:220px;border:1px solid rgba(255,255,255,.14);border-radius:50%;left:-120px;bottom:-145px}.tk-route-line{position:absolute;right:40px;top:54px;bottom:54px;width:2px;background:linear-gradient(#53c9f2,#fff2,#fea760)}.tk-route-card article{position:relative;z-index:1;display:grid;grid-template-columns:48px 1fr;gap:14px;align-items:center;padding:15px 0}.tk-route-card article>span{display:grid;place-items:center;width:44px;height:44px;border-radius:14px;background:#fff;color:#1a3aab;font-weight:900}.tk-route-card b,.tk-route-card small{display:block}.tk-route-card b{color:#fff;font-size:.98rem}.tk-route-card small{color:rgba(255,255,255,.72);font-size:.75rem;line-height:1.7}.tk-heading{max-width:760px;margin-bottom:28px}.tk-heading p{margin:0;color:#69738d;font-size:.9rem;line-height:1.85}.tk-city-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.tk-city{position:relative;min-height:195px;padding:23px;border:1px solid #e3e8f2;border-radius:20px;background:#fff;overflow:hidden;transition:transform .22s ease,box-shadow .22s ease,border-color .22s ease}.tk-city:hover{transform:translateY(-5px);border-color:#d5ddf5;box-shadow:0 16px 38px rgba(24,42,105,.08)}.tk-city>span{display:inline-flex;color:#4c67c8;font-size:.7rem;font-weight:900}.tk-city h3{margin:10px 0 8px;color:#1a2f7c;font-size:1.05rem}.tk-city p{margin:0;color:#68728c;font-size:.84rem;line-height:1.85}.tk-city.featured{grid-row:span 2;min-height:404px;display:flex;align-items:flex-end;color:#fff;background:linear-gradient(0deg,rgba(8,24,72,.88),rgba(8,24,72,.22)),url('${OLD}/2025/06/تركيا-618x1024.webp') center/cover no-repeat;border:0}.tk-city.featured span{color:#bfeeff}.tk-city.featured h3{color:#fff;font-size:1.5rem}.tk-city.featured p{color:rgba(255,255,255,.86)}.tk-exp-grid{display:grid;grid-template-columns:.72fr 1.28fr;gap:50px;align-items:start}.tk-heading-side{position:sticky;top:150px}.tk-exp-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.tk-exp-list article{display:flex;gap:14px;padding:20px;border:1px solid #e3e8f2;border-radius:18px;background:#fbfcff;transition:transform .2s ease,background .2s ease}.tk-exp-list article:hover{transform:translateY(-3px);background:#fff}.tk-ico{display:grid;place-items:center;width:42px;height:42px;border-radius:13px;background:linear-gradient(135deg,#eaf7ff,#f4efff);color:#173fae;font-size:1.1rem;font-weight:900;flex:0 0 42px}.tk-exp-list h3{margin:0 0 6px;color:#1c327f;font-size:.98rem}.tk-exp-list p{margin:0;color:#69738c;font-size:.82rem;line-height:1.8}.tk-programs{padding:62px 0;background:linear-gradient(125deg,#0f2b89,#243aaa 60%,#8c266e);color:#fff;overflow:hidden}.tk-heading.light{max-width:700px}.tk-heading.light span{color:#aee8ff;font-size:.75rem;font-weight:900}.tk-heading.light h2{color:#fff}.tk-program-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.tk-program-grid article{padding:24px;border:1px solid rgba(255,255,255,.14);border-radius:21px;background:rgba(255,255,255,.075);backdrop-filter:blur(8px);transition:transform .22s ease,background .22s ease}.tk-program-grid article:hover{transform:translateY(-5px);background:rgba(255,255,255,.11)}.tk-program-grid span{color:#9be7ff;font-size:.72rem;font-weight:900}.tk-program-grid h3{margin:10px 0 8px;color:#fff;font-size:1.08rem}.tk-program-grid p{min-height:82px;margin:0;color:rgba(255,255,255,.82);font-size:.83rem;line-height:1.85}.tk-program-grid a{display:inline-flex;margin-top:16px;color:#fff;font-size:.77rem;font-weight:900;border-bottom:1px solid rgba(255,255,255,.35)}.tk-gallery-section{background:#fff}.tk-gallery{display:grid;grid-template-columns:1.3fr .7fr .7fr;grid-template-rows:250px 250px;gap:12px}.tk-gallery figure{margin:0;border-radius:20px;overflow:hidden;background:#eef1f7}.tk-gallery img{width:100%;height:100%;object-fit:cover;transition:transform .55s ease}.tk-gallery figure:hover img{transform:scale(1.045)}.tk-gallery .g1{grid-row:1/3}.tk-gallery .g4{grid-column:2/4}.tk-consult{padding:42px 0;background:#f4f7fc}.tk-consult-grid{display:grid;grid-template-columns:1.25fr .9fr auto;gap:28px;align-items:center;padding:28px 30px;border:1px solid #e0e6f1;border-radius:24px;background:#fff;box-shadow:0 14px 42px rgba(28,42,100,.06)}.tk-consult span{font-size:.72rem;color:#4b63c4;font-weight:900}.tk-consult h2{margin:6px 0 8px;color:#172760;font-size:1.45rem;line-height:1.55}.tk-consult p{margin:0;color:#6a748d;font-size:.86rem;line-height:1.8}.tk-consult ul{display:grid;gap:8px;margin:0;padding:0;list-style:none}.tk-consult li{position:relative;padding-right:20px;color:#4c5876;font-size:.82rem}.tk-consult li:before{content:'✓';position:absolute;right:0;color:#1d7cc4;font-weight:900}.tk-faq{background:#f8faff}.tk-faq-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px;align-items:start}.tk-faq-grid details{background:#fff;border:1px solid #e2e7f2;border-radius:15px;padding:0 18px}.tk-faq-grid summary{cursor:pointer;position:relative;list-style:none;padding:16px 26px 16px 0;color:#1c307b;font-size:.88rem;font-weight:900;line-height:1.65}.tk-faq-grid summary::-webkit-details-marker{display:none}.tk-faq-grid summary:before{content:'+';position:absolute;right:0;top:14px;width:20px;height:20px;display:grid;place-items:center;border-radius:7px;background:#edf3ff;color:#2041af}.tk-faq-grid details[open] summary:before{content:'−'}.tk-faq-grid p{margin:0;padding:0 26px 17px 0;color:#66718b;font-size:.82rem;line-height:1.85}.tk-final-cta{padding:34px 0;background:#fff;border-top:1px solid #edf0f6}.tk-final-cta .container{display:flex;justify-content:space-between;gap:25px;align-items:center}.tk-final-cta span{font-size:.72rem;color:#5066c3;font-weight:900}.tk-final-cta h2{margin:5px 0 0;color:#172760;font-size:1.6rem}.tk-final-cta .container>div:last-child{display:flex;align-items:center;gap:14px}.tk-final-cta .container>div:last-child>a:last-child{color:#2942a8;font-weight:900;font-size:.82rem}.tk-reveal{animation:tkReveal .65s ease both}.tk-route-card{animation-delay:.08s}@keyframes tkReveal{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:none}}.tk-premium .tk-section,.tk-premium .tk-programs,.tk-premium .tk-consult{content-visibility:auto;contain-intrinsic-size:700px}\n@media(max-width:1000px){.tk-hero-wrap{grid-template-columns:1fr}.tk-hero-card{max-width:520px}.tk-city-grid{grid-template-columns:repeat(2,minmax(0,1fr))}.tk-city.featured{grid-row:auto;min-height:260px}.tk-route-grid,.tk-exp-grid{grid-template-columns:1fr}.tk-heading-side{position:static}.tk-program-grid{grid-template-columns:1fr}.tk-program-grid p{min-height:0}.tk-consult-grid{grid-template-columns:1fr 1fr}.tk-consult-grid>.gradient-btn{grid-column:1/-1;justify-self:start}.tk-gallery{grid-template-columns:1fr 1fr;grid-template-rows:260px 210px 210px}.tk-gallery .g1{grid-row:1/3}.tk-gallery .g4{grid-column:1/3}.tk-stats .container{grid-template-columns:repeat(2,minmax(0,1fr))}.tk-stats .container>div{border-bottom:1px solid #edf0f6}}@media(max-width:680px){.tk-hero{min-height:590px;align-items:flex-end}.tk-hero-overlay{background:linear-gradient(0deg,rgba(5,18,61,.97),rgba(10,31,86,.64) 70%,rgba(8,24,65,.16))}.tk-hero-wrap{padding-top:130px;padding-bottom:38px;gap:22px}.tk-hero h1{font-size:2.35rem}.tk-hero p{font-size:.88rem}.tk-hero-card{display:grid;grid-template-columns:1fr;gap:0;padding:15px 18px;border-radius:17px}.tk-hero-card>div{padding:9px 0}.tk-anchor{top:68px}.tk-anchor a{padding:11px 12px;font-size:.7rem}.tk-stats .container>div{padding:15px 13px}.tk-section{padding:44px 0}.tk-route-grid{gap:24px}.tk-route-card{padding:18px}.tk-route-card article{grid-template-columns:42px 1fr}.tk-route-card article>span{width:38px;height:38px;border-radius:12px}.tk-city-grid{grid-template-columns:1fr}.tk-city{min-height:0;padding:20px}.tk-city.featured{min-height:300px}.tk-exp-list{grid-template-columns:1fr}.tk-programs{padding:44px 0}.tk-gallery{grid-template-columns:1fr 1fr;grid-template-rows:220px 160px 160px}.tk-gallery .g1{grid-column:1/3;grid-row:auto}.tk-gallery .g4{grid-column:1/3}.tk-consult{padding:28px 0}.tk-consult-grid{grid-template-columns:1fr;padding:22px}.tk-consult-grid>.gradient-btn{grid-column:auto;width:100%}.tk-faq-grid{grid-template-columns:1fr}.tk-final-cta .container{align-items:flex-start;flex-direction:column}.tk-final-cta .container>div:last-child{width:100%;flex-wrap:wrap}}@media(prefers-reduced-motion:reduce){.tk-reveal,.tk-city,.tk-exp-list article,.tk-program-grid article,.tk-gallery img{animation:none!important;transition:none!important}}\n`;
fs.writeFileSync(cssPath,css);
}

console.log('Built premium Turkey landing page prototype.');
