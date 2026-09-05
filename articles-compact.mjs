import fs from 'node:fs';
import path from 'node:path';

const cssPath = path.resolve('dist', 'assets', 'styles.css');
if (!fs.existsSync(cssPath)) process.exit(0);

let css = fs.readFileSync(cssPath, 'utf8');
const marker = 'homepage-articles-compact-v1';
if (!css.includes(marker)) {
  css += `
/* ${marker} */
.seo-articles-home{padding:38px 0!important}
.seo-articles-home .section-heading{margin-bottom:18px!important}
.seo-articles-home .section-heading>span{font-size:.76rem!important;margin-bottom:4px!important}
.seo-articles-home .section-heading h2{font-size:clamp(1.55rem,2.4vw,2rem)!important;margin-bottom:6px!important;line-height:1.3!important}
.seo-articles-home .section-heading p{max-width:650px!important;font-size:.88rem!important;line-height:1.65!important;margin-bottom:0!important}
.seo-articles-home .seo-articles-grid{gap:16px!important}
.seo-articles-home .seo-article-card{border-radius:14px!important;box-shadow:0 7px 22px rgba(22,33,77,.06)!important}
.seo-articles-home .seo-article-image{aspect-ratio:2.05/1!important}
.seo-articles-home .seo-article-copy{padding:13px 14px 14px!important}
.seo-articles-home .seo-article-copy>span{font-size:.72rem!important;margin-bottom:5px!important}
.seo-articles-home .seo-article-copy h3{font-size:.96rem!important;line-height:1.5!important;margin:0 0 6px!important;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.seo-articles-home .seo-article-copy p{font-size:.8rem!important;line-height:1.6!important;margin:0 0 8px!important;display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden}
.seo-articles-home .article-more{font-size:.8rem!important}
.seo-articles-home .articles-all{margin-top:16px!important}
.seo-articles-home .ghost-link{font-size:.84rem!important}
@media(max-width:900px){.seo-articles-home{padding:32px 0!important}.seo-articles-home .seo-articles-grid{gap:14px!important}}
@media(max-width:620px){.seo-articles-home{padding:28px 0!important}.seo-articles-home .section-heading{margin-bottom:14px!important}.seo-articles-home .seo-articles-grid{display:grid!important;grid-template-columns:1fr!important;gap:12px!important}.seo-articles-home .seo-article-image{aspect-ratio:2.2/1!important}.seo-articles-home .seo-article-copy p{display:none!important}.seo-articles-home .articles-all{margin-top:14px!important}}
`;
  fs.writeFileSync(cssPath, css);
}

console.log('Homepage articles section compacted.');
