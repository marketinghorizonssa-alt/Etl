import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const cssPath = path.join(out, 'assets', 'styles.css');
const MAX_VISIBLE_CARDS = 4;

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
  if (parts[1] && stripTags(summary + ' ' + parts[1]).length <= 330) {
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
  topic => `ما أهم التفاصيل عن ${topic}؟`,
  topic => `كيف نختار الخيارات المناسبة في ${topic}؟`,
  topic => `ما الذي يجب معرفته قبل حجز ${topic}؟`,
  topic => `كيف نرتب ${topic} بشكل أريح؟`,
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

    const topic = shortTopic(heading);
    const isVisibleCard = blockIndex < MAX_VISIBLE_CARDS;
    const { summary, rest } = splitSentences(paras[0]);

    if (isVisibleCard) {
      cards.push(`<article class="context-card"><span class="context-card-index">${String(blockIndex + 1).padStart(2,'0')}</span><h3>${heading}</h3><p>${summary || paras[0]}</p></article>`);
    }

    const answerParts = [];
    if (isVisibleCard) {
      if (rest) answerParts.push(rest);
      answerParts.push(...paras.slice(1));
    } else {
      answerParts.push(...paras);
    }

    if (answerParts.length) {
      const q = questionTemplates[blockIndex % questionTemplates.length](topic);
      const answerHtml = answerParts.map(p => `<p>${p}</p>`).join('');
      faqs.push(`<details class="context-faq"><summary><span>${q}</span><b aria-hidden="true">+</b></summary><div class="context-faq-answer">${answerHtml}</div></details>`);
    }
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
      <p>أهم النقاط في كروت سريعة، والتفاصيل الإضافية داخل أسئلة مختصرة حتى تفضل الصفحة خفيفة وسهلة التصفح.</p>
    </header>
    <div class="context-card-grid">${cards.join('')}</div>
    ${faqs.length ? `<div class="context-faq-wrap"><div class="context-faq-head"><span>أسئلة تساعدك قبل الحجز</span><h3>تفاصيل أكثر عند الحاجة</h3></div>${faqs.join('')}</div>` : ''}
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
  const marker = 'contextual-keyword-layout-polish-v2';
  if (!css.includes(marker)) {
    css += `
/* ${marker} */
.contextual-seo-polished{padding:58px 0!important;background:linear-gradient(180deg,#f8faff 0%,#fff 42%,#fff 100%)!important}
.contextual-seo-polished>.container{max-width:1180px!important}
.contextual-heading{max-width:780px;margin:0 auto 26px;text-align:center}
.contextual-heading>span{display:inline-block;margin-bottom:7px;color:#2f62ea;font-size:15px;font-weight:900}
.contextual-heading h2{margin:0 0 10px;color:#142d72;font-size:clamp(28px,3vw,40px);line-height:1.3}
.contextual-heading p{margin:0;color:#68738b;font-size:16px;line-height:1.8}
.context-card-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:15px;align-items:stretch}
.context-card{position:relative;min-width:0;padding:22px;border:1px solid #e2e8f5;border-radius:20px;background:#fff;box-shadow:0 10px 30px rgba(23,47,114,.055)}
.context-card-index{display:inline-flex;align-items:center;justify-content:center;min-width:36px;height:28px;padding:0 8px;margin-bottom:12px;border-radius:999px;background:#edf3ff;color:#2c5ce2;font-size:12px;font-weight:900}
.context-card h3{margin:0 0 9px;color:#173274;font-size:20px;line-height:1.42}
.context-card p{margin:0;color:#5f6980;font-size:15.5px;line-height:1.82}
.context-faq-wrap{max-width:940px;margin:28px auto 0;padding-top:26px;border-top:1px solid #e5ebf6}
.context-faq-head{text-align:center;margin-bottom:14px}
.context-faq-head span{color:#2f62ea;font-size:14px;font-weight:900}
.context-faq-head h3{margin:4px 0 0;color:#162f70;font-size:clamp(22px,2.2vw,30px)}
.context-faq{margin:0 0 9px;border:1px solid #e1e7f3;border-radius:15px;background:#fff;overflow:hidden;box-shadow:0 6px 18px rgba(22,47,112,.035)}
.context-faq summary{display:flex;align-items:center;justify-content:space-between;gap:14px;cursor:pointer;list-style:none;padding:15px 17px;color:#1b377b;font-weight:850;line-height:1.45}
.context-faq summary::-webkit-details-marker{display:none}
.context-faq summary b{display:grid;place-items:center;flex:0 0 28px;width:28px;height:28px;border-radius:50%;background:#eef3ff;color:#2d5de1;font-size:19px;line-height:1;transition:transform .2s ease}
.context-faq[open] summary b{transform:rotate(45deg)}
.context-faq-answer{padding:0 17px 16px;border-top:1px solid #eef1f7}
.context-faq-answer p{margin:12px 0 0;color:#5f6980;font-size:15.5px;line-height:1.88}
@media(max-width:820px){.contextual-seo-polished{padding:44px 0!important}.contextual-heading{text-align:right;margin-bottom:20px}.context-card-grid{grid-template-columns:1fr}.context-card{padding:19px}.context-faq-wrap{margin-top:24px;padding-top:22px}.context-faq-head{text-align:right}.context-faq summary{padding:14px 15px}.context-faq-answer{padding:0 15px 15px}}
`;
    fs.writeFileSync(cssPath, css);
  }
}

console.log(`Condensed contextual keyword content into up to ${MAX_VISIBLE_CARDS} visible cards plus grouped FAQs on ${changed} pages without removing any original keyword text.`);
