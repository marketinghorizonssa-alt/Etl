import fs from 'node:fs';
import path from 'node:path';

const cssPath = path.resolve('dist', 'assets', 'styles.css');
if (!fs.existsSync(cssPath)) process.exit(0);

let css = fs.readFileSync(cssPath, 'utf8');
const marker = 'mobile-footer-polish-v1';

if (!css.includes(marker)) {
  css += `
/* ${marker} */
@media(max-width:640px){
  .compact-footer{
    background-position:center bottom!important;
  }
  .compact-footer-overlay{
    padding:34px 0 18px!important;
    background:
      linear-gradient(180deg,rgba(21,55,153,.94),rgba(13,63,156,.88) 45%,rgba(10,46,126,.92))!important;
  }
  .compact-footer-main{
    display:grid!important;
    grid-template-columns:1fr!important;
    gap:18px!important;
    align-items:start!important;
  }
  .compact-brand{
    gap:12px!important;
    padding:0 0 4px!important;
  }
  .compact-logo{
    width:150px!important;
    max-height:76px!important;
    object-fit:contain!important;
    margin-inline:auto!important;
  }
  .compact-brand-row{
    display:grid!important;
    grid-template-columns:auto auto!important;
    justify-content:center!important;
    align-items:center!important;
    gap:12px!important;
  }
  .compact-qr{
    width:84px!important;
    height:84px!important;
    border-radius:10px!important;
    padding:5px!important;
    object-fit:cover!important;
    background:#fff!important;
    box-shadow:0 10px 26px rgba(0,0,0,.12)!important;
  }
  .compact-socials{
    grid-template-columns:repeat(4,32px)!important;
    gap:7px!important;
  }
  .compact-socials a{
    width:32px!important;
    height:32px!important;
    border-radius:9px!important;
    background:rgba(2,14,49,.76)!important;
    box-shadow:0 8px 18px rgba(0,0,0,.14)!important;
  }
  .compact-socials svg{
    width:17px!important;
    height:17px!important;
  }
  .compact-license,.compact-contact{
    width:100%!important;
    max-width:360px!important;
    margin-inline:auto!important;
  }
  .compact-license h2,.compact-contact h2{
    margin:0 0 10px!important;
    text-align:center!important;
    font-size:22px!important;
    line-height:1.35!important;
  }
  .license-card{
    border-radius:18px!important;
    padding:11px 14px!important;
    background:rgba(3,14,45,.78)!important;
    box-shadow:0 14px 34px rgba(0,0,0,.14)!important;
  }
  .license-card>div{
    display:grid!important;
    grid-template-columns:minmax(0,1fr) auto!important;
    gap:10px!important;
    align-items:center!important;
    padding:10px 0!important;
  }
  .license-card span{
    font-size:13px!important;
    line-height:1.55!important;
    text-align:right!important;
  }
  .license-card strong{
    font-size:14px!important;
    line-height:1.4!important;
    text-align:left!important;
    direction:ltr!important;
    unicode-bidi:isolate!important;
  }
  .compact-contact{
    display:grid!important;
    gap:8px!important;
  }
  .compact-contact .contact-line{
    display:grid!important;
    grid-template-columns:1fr!important;
    gap:4px!important;
    padding:12px 14px!important;
    border:1px solid rgba(255,255,255,.16)!important;
    border-radius:15px!important;
    background:rgba(255,255,255,.08)!important;
    text-align:center!important;
  }
  .compact-contact .contact-line>b,
  .compact-contact .contact-line>span{
    grid-column:1!important;
    text-align:center!important;
  }
  .compact-contact .contact-line>b{
    font-size:13px!important;
    line-height:1.45!important;
  }
  .compact-contact .contact-line>span{
    font-size:13px!important;
    line-height:1.75!important;
    color:rgba(255,255,255,.94)!important;
  }
  .compact-contact .contact-phone-number,
  .compact-contact .contact-email{
    text-align:center!important;
    white-space:normal!important;
    direction:ltr!important;
    unicode-bidi:isolate!important;
  }
  .compact-footer-bottom{
    display:grid!important;
    justify-content:center!important;
    justify-items:center!important;
    gap:14px!important;
    min-height:0!important;
    margin-top:16px!important;
    padding:14px 0 22px!important;
    border-top:1px solid rgba(255,255,255,.22)!important;
  }
  .payment-wrap{
    width:100%!important;
    max-width:286px!important;
    flex:none!important;
  }
  .payment-wrap img{
    width:min(270px,82vw)!important;
    margin:0 auto!important;
    border-radius:12px!important;
  }
  .legal-wrap{
    display:grid!important;
    justify-items:center!important;
    gap:9px!important;
    width:100%!important;
    text-align:center!important;
  }
  .legal-wrap nav{
    display:flex!important;
    justify-content:center!important;
    align-items:center!important;
    flex-wrap:wrap!important;
    gap:12px 18px!important;
  }
  .legal-wrap a{
    font-size:13px!important;
    font-weight:800!important;
  }
  .legal-wrap p{
    max-width:310px!important;
    margin:0 auto!important;
    font-size:11px!important;
    line-height:1.8!important;
    color:rgba(255,255,255,.9)!important;
  }
}
@media(max-width:380px){
  .compact-brand-row{
    grid-template-columns:1fr!important;
    justify-items:center!important;
  }
  .compact-socials{
    order:2!important;
  }
  .compact-qr{
    order:1!important;
  }
}
`;
  fs.writeFileSync(cssPath, css);
}

console.log('Mobile footer polished: compact brand block, centered contact cards, payment and legal rows tightened.');
