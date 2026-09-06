import fs from 'node:fs';
import path from 'node:path';

const cssPath = path.resolve('dist', 'assets', 'styles.css');
if (!fs.existsSync(cssPath)) process.exit(0);

const DESKTOP = 'https://etlaala.com/wp-content/uploads/2024/03/pexels-margerretta-548077-scaled.jpg';
const MOBILE = 'https://etlaala.com/wp-content/uploads/2024/02/pexels-roman-odintsov-8180458-scaled.jpg';

let css = fs.readFileSync(cssPath, 'utf8');
const marker = 'purple-inner-hero-final-fix-v1';

if (!css.includes(marker)) {
  css += `
/* ${marker} */
.legal-hero,.branch-page-hero,.service-page-hero{
  position:relative!important;
  overflow:hidden!important;
  color:#fff!important;
  background-color:#10245f!important;
  background-image:linear-gradient(90deg,rgba(5,15,48,.62) 0%,rgba(8,20,65,.46) 48%,rgba(11,25,70,.34) 100%),url("${DESKTOP}")!important;
  background-size:cover!important;
  background-position:center 48%!important;
  background-repeat:no-repeat!important;
}
.legal-hero .container,.branch-page-hero .container,.service-page-hero .container,
.legal-hero-inner,.branch-hero-inner{
  position:relative!important;
  z-index:2!important;
}
.legal-hero h1,.branch-page-hero h1,.service-page-hero h1{
  color:#fff!important;
  text-shadow:0 3px 18px rgba(0,0,0,.28)!important;
}
.legal-hero p,.branch-page-hero p,.service-page-hero p{
  color:rgba(255,255,255,.94)!important;
  text-shadow:0 2px 10px rgba(0,0,0,.18)!important;
}
.legal-eyebrow,.service-eyebrow,.branch-page-hero .branch-label{
  color:#a9edff!important;
  text-shadow:0 2px 8px rgba(0,0,0,.16)!important;
}
.legal-hero:before,.branch-page-hero:before{
  background:radial-gradient(circle,rgba(255,255,255,.10),rgba(255,255,255,0) 68%)!important;
}
.service-page-hero:after,.legal-hero:after,.branch-page-hero:after{
  opacity:.58!important;
}
.branch-page-hero .branch-primary-btn,
.service-page-hero .gradient-btn{
  box-shadow:0 10px 26px rgba(3,13,46,.16)!important;
}
@media(max-width:680px){
  .legal-hero,.branch-page-hero,.service-page-hero{
    background-image:linear-gradient(0deg,rgba(5,15,48,.72) 0%,rgba(8,20,65,.48) 58%,rgba(10,24,69,.28) 100%),url("${MOBILE}")!important;
    background-position:center 45%!important;
  }
}
`;
  fs.writeFileSync(cssPath, css);
}

console.log('Fixed all former purple inner-page hero covers, including legal, branch and service pages, with a valid travel image and readable neutral contrast.');
