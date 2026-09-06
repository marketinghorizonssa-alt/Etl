import fs from 'node:fs';
import path from 'node:path';

const assetDir = path.resolve('dist', 'assets');
const cssPath = path.resolve(assetDir, 'styles.css');
if (!fs.existsSync(cssPath)) process.exit(0);

const HOME_COVER = 'https://etlaala.com/wp-content/uploads/2026/03/Gemini_Generated_Image_qzvy1zqzvy1zqzvy_optimized_1500-1.png';

let css = fs.readFileSync(cssPath, 'utf8');
const marker = 'inner-page-heroes-use-home-cover-v16-branch-cover-clean';

css += `
/* ${marker} */
.legal-hero,.branch-page-hero,.service-page-hero{
  position:relative!important;
  overflow:hidden!important;
  color:#fff!important;
  isolation:isolate!important;
  background:#133fc4!important;
  background-image:none!important;
}
.legal-hero:before,.branch-page-hero:before,.service-page-hero:before{
  content:""!important;
  position:absolute!important;
  inset:0!important;
  left:0!important;
  right:0!important;
  top:0!important;
  bottom:0!important;
  width:auto!important;
  height:auto!important;
  max-width:none!important;
  max-height:none!important;
  z-index:0!important;
  border:0!important;
  border-radius:0!important;
  opacity:1!important;
  pointer-events:none!important;
  background-image:url("${HOME_COVER}")!important;
  background-size:cover!important;
  background-position:center center!important;
  background-repeat:no-repeat!important;
  transform:none!important;
  filter:saturate(1.04) contrast(1.02)!important;
}
.legal-hero:after,.branch-page-hero:after,.service-page-hero:after{
  content:""!important;
  position:absolute!important;
  inset:0!important;
  left:0!important;
  right:0!important;
  top:0!important;
  bottom:0!important;
  width:auto!important;
  height:auto!important;
  max-width:none!important;
  max-height:none!important;
  z-index:1!important;
  border:0!important;
  border-radius:0!important;
  opacity:1!important;
  pointer-events:none!important;
  background:
    linear-gradient(90deg,rgba(4,17,68,.64),rgba(13,42,132,.38) 44%,rgba(9,24,86,.34)),
    linear-gradient(180deg,rgba(0,0,0,.22),rgba(0,0,0,.28))!important;
}
.branch-page-hero:before{
  background-position:center center!important;
}
.branch-page-hero:after{
  background:
    linear-gradient(90deg,rgba(4,17,68,.60),rgba(13,42,132,.34) 44%,rgba(9,24,86,.32)),
    linear-gradient(180deg,rgba(0,0,0,.18),rgba(0,0,0,.26))!important;
}
.legal-hero .container,.branch-page-hero .container,.service-page-hero .container,
.legal-hero-inner,.branch-hero-inner,.service-page-hero .service-hero-inner{
  position:relative!important;
  z-index:2!important;
}
.legal-hero h1,.branch-page-hero h1,.service-page-hero h1{
  color:#fff!important;
  text-shadow:0 4px 22px rgba(0,0,0,.42)!important;
}
.legal-hero p,.branch-page-hero p,.service-page-hero p{
  color:rgba(255,255,255,.96)!important;
  text-shadow:0 2px 14px rgba(0,0,0,.34)!important;
}
.legal-eyebrow,.service-eyebrow,.branch-page-hero .branch-label{
  color:#d8f8ff!important;
  text-shadow:0 2px 12px rgba(0,0,0,.36)!important;
}
.branch-page-hero .branch-primary-btn,
.service-page-hero .gradient-btn{
  box-shadow:0 12px 30px rgba(3,13,46,.22)!important;
}
@media(max-width:900px){
  .legal-hero:before,.service-page-hero:before{
    background-position:center center!important;
  }
  .branch-page-hero:before{
    background-position:center center!important;
  }
}
@media(max-width:680px){
  .legal-hero,.branch-page-hero,.service-page-hero{
    min-height:410px!important;
  }
  .legal-hero:before,.service-page-hero:before{
    background-size:cover!important;
    background-position:center center!important;
    filter:saturate(1.03) contrast(1.02)!important;
  }
  .branch-page-hero:before{
    background-size:cover!important;
    background-position:center center!important;
    filter:saturate(1.03) contrast(1.02)!important;
  }
  .legal-hero:after,.service-page-hero:after{
    background:
      linear-gradient(180deg,rgba(3,17,70,.62),rgba(12,39,125,.36) 45%,rgba(4,16,64,.48)),
      linear-gradient(90deg,rgba(0,0,0,.34),rgba(0,0,0,.16))!important;
  }
  .branch-page-hero:after{
    background:
      linear-gradient(180deg,rgba(3,17,70,.58),rgba(12,39,125,.32) 45%,rgba(4,16,64,.44)),
      linear-gradient(90deg,rgba(0,0,0,.30),rgba(0,0,0,.14))!important;
  }
}
`;

fs.writeFileSync(cssPath, css);
console.log('Applied homepage cover as a clean full-width cover and removed circular branch hero artwork.');
