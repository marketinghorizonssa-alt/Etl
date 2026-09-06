import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const file = path.join(out, 'turkiye', 'index.html');
if (!fs.existsSync(file)) process.exit(0);

const esc = (s = '') => String(s).replace(/[&<>"']/g, c => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
}[c]));

const cards = [
  ['مدينة ومعالم وبوسفور', 'إسطنبول', 'آيا صوفيا وتوبكابي والأسواق والبوسفور في نفس المحطة؛ مناسبة كبداية أو نهاية الرحلة مع أيام للمعالم والتسوق والرحلات البحرية بدون تكرار نفس التجارب في قسم منفصل.'],
  ['طبيعة وجبال', 'طرابزون والشمال التركي', 'مرتفعات وقرى وبحيرات وطرق جبلية، مع جولات طبيعية تتوزع حسب الموسم والطقس وعدد الليالي بدل ضغطها في يوم واحد.'],
  ['بحر ومنتجعات', 'أنطاليا', 'شواطئ ومنتجعات وأنشطة بحرية ووقت للراحة، وتناسب من يريد موازنة الجولات مع الإقامة الهادئة بدون زيادة تنقلات غير ضرورية.'],
  ['مناظر ومنطاد', 'كابادوكيا', 'تكوينات صخرية ومشاهد شروق الشمس ورحلات المنطاد، وتدخل بشكل أفضل ضمن برنامج أطول مع مراعاة الطقس والتوفر.'],
  ['قريبة من إسطنبول', 'بورصة', 'طبيعة وأسواق وأجواء مختلفة عن إسطنبول، وتناسب رحلة يومية أو إقامة قصيرة حسب خط السير ومدة الرحلة.'],
  ['ساحل واسترخاء', 'فتحية وبودروم', 'شواطئ ومنتجعات ورحلات بحرية خلال الموسم المناسب، وتناسب من يفضل تجربة الساحل التركي والأنشطة البحرية بهدوء أكثر.']
];

const cardHtml = cards.map(([tag, name, text], i) => {
  const image = i === 0
    ? '<img class="dp-place-image" src="https://etlaala.com/wp-content/uploads/2025/06/تركيا-618x1024.webp" alt="إسطنبول ضمن رحلات تركيا" loading="lazy" decoding="async">'
    : '';
  return `<article class="dp-place dp-place-${i + 1}">${image}<span>${esc(tag)}</span><h3>${esc(name)}</h3><p>${esc(text)}</p></article>`;
}).join('');

const mergedSection = `<section class="dp-section dp-soft tk-merged-places" id="cities"><div class="container"><div class="dp-heading"><span class="dp-kicker">مدن ومناطق وتجارب</span><h2>تركيا: كل مدينة ومعها التجربة اللي تستحق وقتك</h2><p>جمعنا المدن والتجارب في قسم واحد حتى يكون خط السير أوضح: تختار المدينة ومعها أهم ما يميزها، بدون تكرار نفس المعلومات في قسم منفصل.</p></div><div class="dp-places-grid">${cardHtml}</div></div></section>`;

let html = fs.readFileSync(file, 'utf8');

html = html.replace(/<a href="#cities">[^<]*<\/a>/, '<a href="#cities">المدن والتجارب</a>');
html = html.replace(/<a href="#experiences">[^<]*<\/a>/g, '');

html = html.replace(
  /<section class="(?:tk-section tk-soft|dp-section dp-soft tk-merged-places)" id="cities">[\s\S]*?<\/section>/,
  mergedSection
);

html = html.replace(/\s*<section class="tk-section" id="experiences">[\s\S]*?<\/section>\s*/g, '\n');
html = html.replace(/\s*<section class="dp-section dp-experiences" id="experiences">[\s\S]*?<\/section>\s*/g, '\n');

fs.writeFileSync(file, html);
console.log('Turkey cities and experiences now use the same merged card layout as the other destination pages.');
