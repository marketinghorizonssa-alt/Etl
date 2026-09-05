import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const homePath = path.join(out, 'index.html');
const cssPath = path.join(out, 'assets', 'styles.css');
const OLD_MEDIA = 'https://etlaala.com/wp-content/uploads';

if (!fs.existsSync(homePath) || !fs.existsSync(cssPath)) {
  console.log('Home/CSS not found; skipping reviews section.');
  process.exit(0);
}

const reviews = [
  {
    name: 'shadenUN',
    avatar: `${OLD_MEDIA}/2025/04/unnamed-3.png`,
    text: 'تعامل راقي و محترم من الشركة. أعطوني كامل الاسعار و التفاصيل قبل السداد و كانت من أفضل الشركات للحجز.'
  },
  {
    name: 'Abdelrahman Mohamed',
    avatar: `${OLD_MEDIA}/2025/04/unnamed-5.png`,
    text: 'اشكركم على المعامله الممتازة والاسلوب الراقى جدا فى التعامل والاحترافية فى العمل وتوفير افضل شئ للعملاء. شغلكم مره رائع.'
  },
  {
    name: 'Gerges sabry',
    avatar: `${OLD_MEDIA}/2025/04/unnamed-1.png`,
    text: 'خدمه ممتازه جدآ وشكرآ خاص ل الاستاذه شهد ع مجهوداتها والتعامل معاها كان ممتاز جدا.'
  },
  {
    name: 'علي محمد',
    avatar: `${OLD_MEDIA}/2025/04/unnamed-2.png`,
    text: 'السلام عليكم، اشكر شركة اطلاله للسفر والسياحه بالخصوص الاستاذة أسـراء على حسن التعامل التقدير والاهتمام في ادق التفاصيل.'
  },
  {
    name: 'UMsulyman ss',
    avatar: `${OLD_MEDIA}/2025/04/unnamed-4.png`,
    text: 'تجربتنا كانت مرة رائعة مع شركة إطلالة وشكرا علي حسن التعامل تبعكم.'
  }
];

const videos = [
  {
    url: 'https://www.youtube.com/shorts/ZKEs9o3-ZW0',
    thumb: `${OLD_MEDIA}/2025/03/Untitled-design-81.png`,
    title: 'تجربة عميل مع إطلالة'
  },
  {
    url: 'https://www.youtube.com/shorts/3AdoSIFXgzE',
    thumb: `${OLD_MEDIA}/2025/04/93283495_thinkstockphotos-529358575.jpg`,
    title: 'رأي عميل في إطلالة'
  },
  {
    url: 'https://www.youtube.com/shorts/ivW3aSZ8Vbw',
    thumb: `${OLD_MEDIA}/2025/03/10128-2986.jpg`,
    title: 'تجربة سفر مع إطلالة'
  }
];

const googleMark = `<svg class="review-google" viewBox="0 0 256 262" aria-hidden="true"><path fill="#4285F4" d="M255.9 133.5c0-10.7-.9-18.6-2.8-26.7H130.6v48.4h71.9c-1.5 12-9.3 30.2-26.7 42.4l-.2 1.6 38.8 30 2.7.3c24.7-22.8 38.8-56.3 38.8-96z"/><path fill="#34A853" d="M130.6 261.1c35.2 0 64.8-11.6 86.5-31.6l-41.2-31.9c-11 7.7-25.8 13-45.3 13-34.5 0-63.8-22.7-74.3-54.2l-1.5.1-40.3 31.2-.5 1.5c21.5 42.6 65.5 71.9 116.6 71.9"/><path fill="#FBBC05" d="M56.3 156.4c-2.8-8.1-4.4-16.8-4.4-25.8s1.6-17.7 4.2-25.8l-.1-1.8-40.8-31.7-1.3.6C5.1 89.6 0 109.5 0 130.6s5.1 40.9 13.9 58.6l42.4-32.8"/><path fill="#EB4335" d="M130.6 50.5c24.5 0 41 10.6 50.5 19.4L217.9 34C195.2 12.9 165.8 0 130.6 0 79.5 0 35.4 29.3 13.9 71.9l42.2 32.8c10.6-31.5 39.9-54.2 74.5-54.2"/></svg>`;

const reviewCards = reviews.map(r => `<article class="review-card" role="listitem"><div class="review-top"><img class="review-avatar" src="${r.avatar}" width="64" height="64" loading="lazy" alt="${r.name}"><div class="review-name"><strong>${r.name}</strong><span>${googleMark} Google</span></div></div><p>${r.text}</p></article>`).join('');

const videoCards = videos.map(v => `<a class="review-video" href="${v.url}" target="_blank" rel="noopener" aria-label="${v.title} - يفتح على يوتيوب"><img src="${v.thumb}" width="720" height="405" loading="lazy" alt="${v.title}"><span class="review-video-shade"></span><span class="review-play" aria-hidden="true">▶</span><span class="review-video-label">${v.title}</span></a>`).join('');

const section = `<section class="section reviews-section" id="reviews"><div class="container"><div class="reviews-heading"><span>آراء عملائنا</span><h2>قالوا عنا</h2><p>تجارب حقيقية من عملاء إطلالة، ومعها فيديوهات مباشرة على يوتيوب.</p></div><div class="reviews-shell"><button class="reviews-arrow reviews-prev" type="button" aria-label="آراء سابقة" onclick="this.parentElement.querySelector('.reviews-track').scrollBy({left:420,behavior:'smooth'})">‹</button><div class="reviews-track" role="list" aria-label="آراء عملاء إطلالة">${reviewCards}</div><button class="reviews-arrow reviews-next" type="button" aria-label="آراء تالية" onclick="this.parentElement.querySelector('.reviews-track').scrollBy({left:-420,behavior:'smooth'})">›</button></div><div class="reviews-dots" aria-hidden="true"><i></i><i></i><i class="active"></i><i></i><i></i></div><div class="review-videos">${videoCards}</div></div></section>`;

let home = fs.readFileSync(homePath, 'utf8');
if (!home.includes('id="reviews"')) {
  if (home.includes('<section class="section seo-articles-home"')) {
    home = home.replace('<section class="section seo-articles-home"', `${section}<section class="section seo-articles-home"`);
  } else {
    home = home.replace('</main>', `${section}</main>`);
  }
  fs.writeFileSync(homePath, home);
}

let css = fs.readFileSync(cssPath, 'utf8');
if (!css.includes('reviews-section-v1')) {
  css += `\n/* reviews-section-v1 */\n.reviews-section{background:#fff;padding-top:58px;padding-bottom:56px;overflow:hidden}.reviews-heading{text-align:center;max-width:760px;margin:0 auto 28px}.reviews-heading>span{display:inline-block;color:#6b70a3;font-size:.9rem;font-weight:800;margin-bottom:5px}.reviews-heading h2{margin:0;color:#2943d1;font-size:clamp(2rem,4vw,3rem);line-height:1.25}.reviews-heading p{margin:9px 0 0;color:#747b96;font-size:.95rem}.reviews-shell{position:relative}.reviews-track{display:flex;gap:18px;overflow-x:auto;scroll-snap-type:x mandatory;scroll-behavior:smooth;padding:4px 2px 10px;scrollbar-width:none}.reviews-track::-webkit-scrollbar{display:none}.review-card{flex:0 0 calc((100% - 36px)/3);scroll-snap-align:start;background:#fff;border:1px solid #e9ebf4;border-radius:18px;padding:19px 20px;box-shadow:0 9px 28px rgba(25,38,92,.06);min-height:166px}.review-top{display:flex;align-items:center;gap:12px;margin-bottom:12px}.review-avatar{width:48px;height:48px;border-radius:50%;object-fit:cover;background:#f1f3f8}.review-name{min-width:0}.review-name strong{display:block;color:#181b2e;font-size:1rem;line-height:1.35;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.review-name span{display:flex;align-items:center;gap:5px;margin-top:4px;color:#8a8fa4;font-size:.72rem}.review-google{width:18px;height:18px;flex:none}.review-card p{margin:0;color:#2e3348;font-size:.9rem;line-height:1.9;font-weight:600}.reviews-arrow{position:absolute;top:50%;z-index:2;transform:translateY(-50%);width:34px;height:34px;border:0;border-radius:50%;background:#fff;box-shadow:0 6px 22px rgba(32,43,91,.14);color:#2943d1;font-size:25px;line-height:1;display:grid;place-items:center;cursor:pointer}.reviews-prev{right:-15px}.reviews-next{left:-15px}.reviews-dots{display:flex;justify-content:center;gap:8px;margin:8px 0 27px}.reviews-dots i{width:7px;height:7px;border-radius:999px;background:#ced1dc}.reviews-dots i.active{background:#171b2c;width:9px;height:9px}.review-videos{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:18px}.review-video{position:relative;display:block;aspect-ratio:16/9;border-radius:20px;overflow:hidden;background:#e9edf6;box-shadow:0 12px 30px rgba(21,35,84,.1)}.review-video img{width:100%;height:100%;object-fit:cover;display:block;transition:transform .28s ease}.review-video:hover img{transform:scale(1.025)}.review-video-shade{position:absolute;inset:0;background:linear-gradient(180deg,transparent 50%,rgba(6,12,32,.58))}.review-play{position:absolute;inset:50% auto auto 50%;transform:translate(-50%,-50%);width:58px;height:58px;border-radius:50%;display:grid;place-items:center;padding-left:3px;background:rgba(255,255,255,.84);color:#080b14;font-size:24px;box-shadow:0 8px 24px rgba(0,0,0,.2)}.review-video-label{position:absolute;right:18px;bottom:14px;color:#fff;font-weight:800;font-size:.88rem;text-shadow:0 2px 10px rgba(0,0,0,.25)}@media(max-width:900px){.review-card{flex-basis:calc((100% - 18px)/2)}.review-videos{grid-template-columns:repeat(2,minmax(0,1fr))}.review-video:last-child{grid-column:1/-1;max-width:620px;width:100%;justify-self:center}}@media(max-width:620px){.reviews-section{padding-top:44px;padding-bottom:44px}.reviews-heading{margin-bottom:22px}.reviews-heading p{font-size:.88rem}.review-card{flex-basis:88%;min-height:154px}.reviews-arrow{display:none}.reviews-track{padding-inline:7px}.review-videos{grid-template-columns:1fr;gap:14px}.review-video:last-child{grid-column:auto;max-width:none}.review-play{width:50px;height:50px;font-size:20px}.review-video-label{right:14px;bottom:11px;font-size:.8rem}}\n`;
  fs.writeFileSync(cssPath, css);
}

console.log(`Added reviews section from August backup: ${reviews.length} Google reviews + ${videos.length} YouTube review videos.`);
