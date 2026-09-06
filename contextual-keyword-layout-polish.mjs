import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const cssPath = path.join(out, 'assets', 'styles.css');

function walk(dir, files = []) {
  if (!fs.existsSync(dir)) return files;
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) walk(full, files);
    else if (item.isFile() && item.name.endsWith('.html')) files.push(full);
  }
  return files;
}

function stripTags(s = '') {
  return s.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
}

function splitSentences(html = '') {
  const text = html.trim();
  if (!text) return { summary: '', rest: '' };
  const parts = text.split(/(?<=[.!؟])\s+/).filter(Boolean);
  if (parts.length <= 1) return { summary: text, rest: '' };

  let summary = parts[0];
  let used = 1;
  if (parts[1] && stripTags(summary + ' ' + parts[1]).length <= 360) {
    summary += ' ' + parts[1];
    used = 2;
  }
  return { summary, rest: parts.slice(used).join(' ') };
}

function shortTopic(heading = '') {
  let x = stripTags(heading)
    .replace(/[؟?]/g, '')
    .replace(/^(سياحة|السياحة في|دليل|كيف تختار|كيف تخطط)\s*/i, '')
    .trim();
  if (x.includes(':')) x = x.split(':')[0].trim();
  if (x.length > 58) x = x.slice(0, 58).replace(/\s+\S*$/, '') + '…';
  return x || 'الرحلة';
}

const questionTemplates = [
  topic => `ما التفاصيل المهمة عن ${topic}؟`,
  topic => `كيف نختار الخيارات المناسبة في ${topic}؟`,
  topic => `كيف يختلف البرنامج حسب مدة الرحلة في ${topic}؟`,
  topic => `ما الذي يجب مقارنته قبل الحجز في ${topic}؟`,
  topic => `كيف نرتب ${topic} بدون تنقلات مرهقة؟`,
  topic => `ما أفضل طريقة لتخصيص ${topic}؟`
];

function transformSection(section) {
  const slug = (section.match(/data-contextual-seo="([^"]+)"/i) || [,''])[1];
  const innerMatch = section.match(/<div class="container">([\s\S]*)<\/div>\s*<\/section>/i);
  if (!innerMatch) return section;

  const blocks = [...innerMatch[1].matchAll(/<div class="contextual-seo-block">([\s\S]*?)<\/div>/gi)];
  if (!blocks.length) return section;

  const cards = [];
  const faqs = [];

  blocks.forEach((m, blockIndex) => {
    const block = m[1];
    const heading = (block.match(/<h2>([\s\S]*?)<\/h2>/i) || [,''])[1].trim();
    const paras = [...block.matchAll(/<p>([\s\S]*?)<\/p>/gi)].map(x => x[1].trim()).filter(Boolean);
    if (!heading || !paras.length) return;

    const { summary, rest } = splitSentences(paras[0]);
    cards.push(`<article class="context-card"><span class="context-card-index">${String(blockIndex + 1).padStart(2,'0')}</span><h3>${heading}</h3><p>${summary || paras[0]}</p></article>`);

    const answers = [];
    if (rest) answers.push(rest);
    answers.push(...paras.slice(1));
    const topic = shortTopic(heading);
    answers.forEach((answer, i) => {
      if (!stripTags(answer)) return;
      const q = questionTemplates[i % questionTemplates.length](topic);
      faqs.push(`<details class="context-faq"><summary><span>${q}</span><b aria-hidden="true">+</b></summary><div class="context-faq-answer"><p>${answer}</p></div></details>`);
    });
  });

  const labels = {
    'turkiye': ['دليل مختصر لتركيا', 'اختيارات أوضح لرحلة متوازنة'],
    'thailand': ['دليل مختصر لتايلاند', 'اختيارات عملية بين المدن والجزر'],
    'georgia': ['دليل مختصر لجورجيا', 'خطط الرحلة حسب المدن والمدة'],
    'malaysia': ['دليل مختصر لماليزيا', 'رتّب المدن والجزر بدون تعقيد'],
    'maldives': ['دليل مختصر للمالديف', 'اختيار المنتجع والبكج المناسب'],
    'bosnia-and-herzegovina': ['دليل مختصر للبوسنة', 'مسار أهدأ بين المدن والطبيعة'],
    'europe': ['دليل مختصر لأوروبا', 'خطط المدن والتنقلات بشكل أذكى'],
    'home': ['كيف تختار رحلتك؟', 'خدمات السفر مرتبة في خطوات واضحة']
  };
  const [kicker, title] = labels[slug] || ['دليل سريع للرحلة', 'معلومات تساعدك تختار بشكل أوضح'];

  return `<section class="contextual-seo contextual-seo-polished" data-contextual-seo="${slug}">
  <div class="container">
    <header class="contextual-heading">
      <span>${kicker}</span>
      <h2>${title}</h2>
      <p>جمعنا أهم التفاصيل التي تفرق في اختيار البرنامج، ثم وضعنا التفاصيل الإضافية في أسئلة قصيرة حتى تظل الصفحة سهلة وواضحة.</p>
    </header>
    <div class="context-card-grid">${cards.join('')}</div>
    ${faqs.length ? `<div class="context-faq-wrap"><div class="context-faq-head"><span>أسئلة تساعدك قبل الحجز</span><h3>التفاصيل المهمة بدون إطالة</h3></div>${faqs.join('')}</div>` : ''}
  </div>
</section>`;
}

let changed = 0;
for (const file of walk(out)) {
  let html = fs.readFileSync(file, 'utf8');
  const re = /<section class="contextual-seo"\s+data-contextual-seo="[^"]+">[\s\S]*?<\/section>/gi;
  if (!re.test(html)) continue;
  re.lastIndex = 0;
  html = html.replace(re, section => transformSection(section));
  fs.writeFileSync(file, html);
  changed++;
}

if (fs.existsSync(cssPath)) {
  let css = fs.readFileSync(cssPath, 'utf8');
  const marker = 'contextual-keyword-layout-polish-v1';
  if (!css.includes(marker)) {
    css += `
/* ${marker} */
.contextual-seo-polished{padding:64px 0!important;background:linear-gradient(180deg,#f8faff 0%,#fff 42%,#fff 100%)!important}
.contextual-seo-polished>.container{max-width:1180px!important}
.contextual-heading{max-width:820px;margin:0 auto 30px;text-align:center}
.contextual-heading>span{display:inline-block;margin-bottom:8px;color:#2f62ea;font-size:15px;font-weight:900}
.contextual-heading h2{margin:0 0 12px;color:#142d72;font-size:clamp(28px,3vw,42px);line-height:1.3}
.contextual-heading p{margin:0;color:#68738b;font-size:16px;line-height:1.85}
.context-card-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:16px;align-items:stretch}
.context-card{position:relative;min-width:0;padding:24px 24px 22px;border:1px solid #e2e8f5;border-radius:22px;background:#fff;box-shadow:0 12px 36px rgba(23,47,114,.06)}
.context-card-index{display:inline-flex;align-items:center;justify-content:center;min-width:38px;height:30px;padding:0 9px;margin-bottom:14px;border-radius:999px;background:#edf3ff;color:#2c5ce2;font-size:13px;font-weight:900}
.context-card h3{margin:0 0 10px;color:#173274;font-size:21px;line-height:1.45}
.context-card p{margin:0;color:#5f6980;font-size:16px;line-height:1.9}
.context-faq-wrap{max-width:980px;margin:34px auto 0;padding-top:30px;border-top:1px solid #e5ebf6}
.context-faq-head{text-align:center;margin-bottom:16px}
.context-faq-head span{color:#2f62ea;font-size:14px;font-weight:900}
.context-faq-head h3{margin:5px 0 0;color:#162f70;font-size:clamp(23px,2.4vw,32px)}
.context-faq{margin:0 0 10px;border:1px solid #e1e7f3;border-radius:16px;background:#fff;overflow:hidden;box-shadow:0 7px 22px rgba(22,47,112,.04)}
.context-faq summary{display:flex;align-items:center;justify-content:space-between;gap:16px;cursor:pointer;list-style:none;padding:17px 19px;color:#1b377b;font-weight:850;line-height:1.5}
.context-faq summary::-webkit-details-marker{display:none}
.context-faq summary b{display:grid;place-items:center;flex:0 0 30px;width:30px;height:30px;border-radius:50%;background:#eef3ff;color:#2d5de1;font-size:20px;line-height:1;transition:transform .2s ease}
.context-faq[open] summary b{transform:rotate(45deg)}
.context-faq-answer{padding:0 19px 18px;border-top:1px solid #eef1f7}
.context-faq-answer p{margin:14px 0 0;color:#5f6980;font-size:16px;line-height:1.95}
@media(max-width:820px){.contextual-seo-polished{padding:48px 0!important}.contextual-heading{text-align:right;margin-bottom:22px}.context-card-grid{grid-template-columns:1fr}.context-card{padding:20px}.context-faq-wrap{margin-top:26px;padding-top:24px}.context-faq-head{text-align:right}.context-faq summary{padding:15px 16px}.context-faq-answer{padding:0 16px 16px}}
`;
    fs.writeFileSync(cssPath, css);
  }
}

console.log(`Polished contextual keyword content into concise cards and expandable FAQs on ${changed} pages while preserving all original keyword text.`);
