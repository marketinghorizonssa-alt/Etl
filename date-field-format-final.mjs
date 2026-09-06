import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const cssPath = path.join(out, 'assets', 'styles.css');
const marker = 'date-field-format-final-v1';

function htmlFiles(dir) {
  const files = [];
  if (!fs.existsSync(dir)) return files;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const file = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...htmlFiles(file));
    else if (entry.isFile() && entry.name.endsWith('.html')) files.push(file);
  }
  return files;
}

const cssFix = `
/* ${marker} */
form[data-lead-form] .travel-date-shell,
.lead-form .travel-date-shell,
.dp-hero-lead-form .travel-date-shell,
.dp-mini-lead-form .travel-date-shell{
  position:relative!important;
  display:block!important;
  width:100%!important;
  height:58px!important;
  min-height:58px!important;
  max-height:58px!important;
  border:1px solid #dfe4ef!important;
  border-radius:14px!important;
  background:#fbfcff!important;
  box-shadow:none!important;
  overflow:hidden!important;
  cursor:pointer!important;
}

form[data-lead-form] .travel-date-shell:after,
.lead-form .travel-date-shell:after,
.dp-hero-lead-form .travel-date-shell:after,
.dp-mini-lead-form .travel-date-shell:after{
  content:""!important;
  position:absolute!important;
  left:17px!important;
  top:50%!important;
  width:22px!important;
  height:22px!important;
  transform:translateY(-50%)!important;
  background:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='%2317265f' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='4' width='18' height='18' rx='3'/%3E%3Cpath d='M16 2v4M8 2v4M3 10h18'/%3E%3C/svg%3E") center/contain no-repeat!important;
  pointer-events:none!important;
}

form[data-lead-form] .travel-date-display,
.lead-form .travel-date-display,
.dp-hero-lead-form .travel-date-display,
.dp-mini-lead-form .travel-date-display{
  position:relative!important;
  z-index:1!important;
  display:flex!important;
  align-items:center!important;
  justify-content:flex-end!important;
  width:100%!important;
  height:100%!important;
  padding:0 17px 0 54px!important;
  color:#17265f!important;
  font-size:16px!important;
  font-weight:800!important;
  line-height:1!important;
  direction:ltr!important;
  text-align:right!important;
  unicode-bidi:isolate!important;
  pointer-events:none!important;
  white-space:nowrap!important;
}

form[data-lead-form] .travel-date-native,
.lead-form .travel-date-native,
.dp-hero-lead-form .travel-date-native,
.dp-mini-lead-form .travel-date-native,
form[data-lead-form] input[type="date"].travel-date-native,
.lead-form input[type="date"].travel-date-native,
.dp-hero-lead-form input[type="date"].travel-date-native,
.dp-mini-lead-form input[type="date"].travel-date-native{
  position:absolute!important;
  inset:0!important;
  z-index:2!important;
  display:block!important;
  width:100%!important;
  height:58px!important;
  min-height:58px!important;
  max-height:58px!important;
  margin:0!important;
  padding:0!important;
  border:0!important;
  border-radius:14px!important;
  background:transparent!important;
  box-shadow:none!important;
  color:transparent!important;
  -webkit-text-fill-color:transparent!important;
  caret-color:transparent!important;
  opacity:.01!important;
  cursor:pointer!important;
  appearance:none!important;
  -webkit-appearance:none!important;
}

form[data-lead-form] .travel-date-native::-webkit-calendar-picker-indicator,
.lead-form .travel-date-native::-webkit-calendar-picker-indicator,
.dp-hero-lead-form .travel-date-native::-webkit-calendar-picker-indicator,
.dp-mini-lead-form .travel-date-native::-webkit-calendar-picker-indicator{
  position:absolute!important;
  inset:0!important;
  width:100%!important;
  height:100%!important;
  margin:0!important;
  padding:0!important;
  opacity:0!important;
  cursor:pointer!important;
}

form[data-lead-form] label:has(.travel-date-shell),
.lead-form label:has(.travel-date-shell),
.dp-hero-lead-form label:has(.travel-date-shell),
.dp-mini-lead-form label:has(.travel-date-shell){
  gap:8px!important;
}

form[data-lead-form] .travel-date-shell:focus-within,
.lead-form .travel-date-shell:focus-within,
.dp-hero-lead-form .travel-date-shell:focus-within,
.dp-mini-lead-form .travel-date-shell:focus-within{
  border-color:#4f6bf4!important;
  box-shadow:0 0 0 3px rgba(79,107,244,.10)!important;
}

/* fallback if JS is delayed: keep native date input same size as the rest */
form[data-lead-form] input[type="date"]:not(.travel-date-native),
.lead-form input[type="date"]:not(.travel-date-native),
.dp-hero-lead-form input[type="date"]:not(.travel-date-native),
.dp-mini-lead-form input[type="date"]:not(.travel-date-native){
  height:58px!important;
  min-height:58px!important;
  max-height:58px!important;
  padding:0 17px!important;
  border-radius:14px!important;
  font-size:16px!important;
  line-height:1!important;
}

@media(max-width:760px){
  form[data-lead-form] .travel-date-shell,
  .lead-form .travel-date-shell,
  .dp-hero-lead-form .travel-date-shell,
  .dp-mini-lead-form .travel-date-shell,
  form[data-lead-form] .travel-date-native,
  .lead-form .travel-date-native,
  .dp-hero-lead-form .travel-date-native,
  .dp-mini-lead-form .travel-date-native{
    height:58px!important;
    min-height:58px!important;
    max-height:58px!important;
  }
  form[data-lead-form] .travel-date-display,
  .lead-form .travel-date-display,
  .dp-hero-lead-form .travel-date-display,
  .dp-mini-lead-form .travel-date-display{
    font-size:16px!important;
    padding:0 16px 0 52px!important;
  }
}
`;

const jsFix = `<script id="${marker}">(function(){
  function pad(n){return String(n).padStart(2,'0')}
  function iso(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())}
  function defaultDate(){var d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()+3);return d}
  function today(){var d=new Date();d.setHours(12,0,0,0);return d}
  function nice(value){
    if(!value||!/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/.test(value)) return 'اختر تاريخ السفر';
    var parts=value.split('-');
    return parts[2]+'/'+parts[1]+'/'+parts[0];
  }
  function enhance(input){
    if(!input||input.dataset.dateFormatFinal==='1') return;
    input.dataset.dateFormatFinal='1';
    input.classList.add('travel-date-native');
    input.setAttribute('autocomplete','off');
    input.setAttribute('aria-label','تاريخ السفر');
    if(!input.min) input.min=iso(today());
    if(!input.value) input.value=iso(defaultDate());

    var shell=input.closest('.travel-date-shell');
    var display;
    if(!shell){
      shell=document.createElement('span');
      shell.className='travel-date-shell';
      input.parentNode.insertBefore(shell,input);
      shell.appendChild(input);
    }
    display=shell.querySelector('.travel-date-display');
    if(!display){
      display=document.createElement('span');
      display.className='travel-date-display';
      shell.insertBefore(display,input);
    }
    function sync(){display.textContent=nice(input.value)}
    sync();
    input.addEventListener('change',sync);
    input.addEventListener('input',sync);
    shell.addEventListener('click',function(){
      try{ if(input.showPicker) input.showPicker(); else input.focus(); }catch(e){ input.focus(); }
    });
  }
  function init(){document.querySelectorAll('form[data-lead-form] input[type="date"], .lead-form input[type="date"], .dp-hero-lead-form input[type="date"], .dp-mini-lead-form input[type="date"]').forEach(enhance)}
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
  window.addEventListener('pageshow',init);
})();</script>`;

function patchHtml(html) {
  html = html.replace(/<style id=["']date-field-format-final-v\d+["'][\s\S]*?<\/style>/gi, '');
  html = html.replace(/<script id=["']date-field-format-final-v\d+["'][\s\S]*?<\/script>/gi, '');
  html = html.replace('</head>', `<style id="${marker}">${cssFix}</style></head>`);
  html = html.replace('</body>', `${jsFix}</body>`);
  return html;
}

let patched = 0;
for (const file of htmlFiles(out)) {
  let html = fs.readFileSync(file, 'utf8');
  if (!html.includes('type="date"') && !html.includes("type='date'")) continue;
  const next = patchHtml(html);
  if (next !== html) {
    fs.writeFileSync(file, next);
    patched += 1;
  }
}

if (fs.existsSync(cssPath)) {
  let css = fs.readFileSync(cssPath, 'utf8');
  css = css.replace(/\/\* date-field-format-final-v\d+ \*\/[\s\S]*?(?=\/\* [a-z0-9-]+-v\d+ \*\/|$)/g, '');
  css += `\n${cssFix}\n`;
  fs.writeFileSync(cssPath, css);
}

console.log(`Final date field size and dd/mm/yyyy display applied to ${patched} page(s).`);
