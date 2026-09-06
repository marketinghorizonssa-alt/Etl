import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const file = path.join(out, 'index.html');
const cssPath = path.join(out, 'assets', 'styles.css');

function balancedTag(html, start, tag) {
  if (start < 0) return null;
  const re = new RegExp(`<\\/?${tag}\\b[^>]*>`, 'gi');
  re.lastIndex = start;
  let depth = 0;
  let first = -1;
  let m;
  while ((m = re.exec(html))) {
    const closing = /^<\//.test(m[0]);
    if (!closing) {
      if (first < 0) first = m.index;
      depth++;
    } else {
      depth--;
      if (depth === 0 && first >= 0) {
        return { start: first, end: re.lastIndex, html: html.slice(first, re.lastIndex) };
      }
    }
  }
  return null;
}

if (fs.existsSync(file)) {
  let html = fs.readFileSync(file, 'utf8');
  const sectionStart = html.search(/<section class="contextual-seo contextual-seo-polished"\s+data-contextual-seo="general">/i);
  const section = sectionStart >= 0 ? balancedTag(html, sectionStart, 'section') : null;

  if (section) {
    let sectionHtml = section.html;

    // Remove only the homepage guide heading (kicker + H2), while keeping the cards/content.
    const headingStart = sectionHtml.search(/<header class="contextual-heading">/i);
    const heading = headingStart >= 0 ? balancedTag(sectionHtml, headingStart, 'header') : null;
    if (heading) {
      sectionHtml = sectionHtml.slice(0, heading.start) + sectionHtml.slice(heading.end);
    }

    const faqStart = sectionHtml.search(/<div class="context-faq-wrap context-faq-wrap-unified">/i);
    const faqWrap = faqStart >= 0 ? balancedTag(sectionHtml, faqStart, 'div') : null;
    const faqAnswers = [];

    if (faqWrap) {
      const faqRe = /<details class="unified-faq-item">([\s\S]*?)<\/details>/gi;
      let fm;
      while ((fm = faqRe.exec(faqWrap.html))) {
        const answer = (fm[1].match(/<div class="unified-faq-answer">([\s\S]*?)<\/div>/i) || [,''])[1].trim();
        if (answer) faqAnswers.push(answer);
      }
      sectionHtml = sectionHtml.slice(0, faqWrap.start) + sectionHtml.slice(faqWrap.end);
    }

    let cardIndex = 0;
    sectionHtml = sectionHtml.replace(/<article class="context-card">([\s\S]*?)<\/article>/gi, (_full, body) => {
      const index = (body.match(/<span class="context-card-index">([\s\S]*?)<\/span>/i) || [,''])[1].trim();
      const title = (body.match(/<h3>([\s\S]*?)<\/h3>/i) || [,''])[1].trim();
      const lead = (body.match(/<p>([\s\S]*?)<\/p>/i) || [,''])[1].trim();
      const extra = faqAnswers[cardIndex] || '';
      cardIndex++;

      const copy = [lead ? `<p>${lead}</p>` : '', extra].filter(Boolean).join('');
      return `<article class="context-card home-context-card"><div class="home-context-card-title"><span class="context-card-index">${index}</span><h3>${title}</h3></div><div class="home-context-card-copy">${copy}</div></article>`;
    });

    html = html.slice(0, section.start) + sectionHtml + html.slice(section.end);
    fs.writeFileSync(file, html);
  }
}

if (fs.existsSync(cssPath)) {
  let css = fs.readFileSync(cssPath, 'utf8');
  const marker = 'homepage-context-four-column-cards-v3';
  if (!css.includes(marker)) {
    css += `
/* ${marker} */
.contextual-seo[data-contextual-seo="general"]>.container{max-width:1380px!important}
.contextual-seo[data-contextual-seo="general"] .context-card-grid{display:grid!important;grid-template-columns:repeat(4,minmax(0,1fr))!important;gap:16px!important;max-width:none!important;margin:0 auto;align-items:stretch!important}
.contextual-seo[data-contextual-seo="general"] .home-context-card{display:flex!important;flex-direction:column;align-items:stretch;gap:14px;min-width:0;height:100%;padding:22px 20px!important;border-radius:20px!important}
.contextual-seo[data-contextual-seo="general"] .home-context-card-title{padding:0 0 14px!important;border-inline-end:0!important;border-bottom:1px solid #e7ecf6}
.contextual-seo[data-contextual-seo="general"] .home-context-card-title .context-card-index{margin-bottom:10px}
.contextual-seo[data-contextual-seo="general"] .home-context-card-title h3{margin:0!important;font-size:19px!important;line-height:1.45}
.contextual-seo[data-contextual-seo="general"] .home-context-card-copy{flex:1}
.contextual-seo[data-contextual-seo="general"] .home-context-card-copy p{margin:0 0 9px!important;color:#5f6980;font-size:14.5px;line-height:1.78}
.contextual-seo[data-contextual-seo="general"] .home-context-card-copy p:last-child{margin-bottom:0!important}
.contextual-seo[data-contextual-seo="general"] .context-faq-wrap,
.contextual-seo[data-contextual-seo="general"] .unified-faq-section{display:none!important}
@media(max-width:1180px){
  .contextual-seo[data-contextual-seo="general"] .context-card-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}
}
@media(max-width:680px){
  .contextual-seo[data-contextual-seo="general"] .context-card-grid{grid-template-columns:1fr!important;gap:12px!important}
  .contextual-seo[data-contextual-seo="general"] .home-context-card{padding:19px!important}
  .contextual-seo[data-contextual-seo="general"] .home-context-card-title h3{font-size:18px!important}
}
`;
    fs.writeFileSync(cssPath, css);
  }
}

console.log('Homepage keeps the four content cards but removes the guide heading only.');
