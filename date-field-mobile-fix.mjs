import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const cssPath = path.join(out, 'assets', 'styles.css');

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

function normalizeDateInputs(html) {
  html = html.replace(/<span class=["']date-picker-wrap["']>\s*(<input\b(?=[^>]*\btype=["']date["'])[^>]*>)\s*<span class=["']date-picker-placeholder["'][^>]*>[\s\S]*?<\/span>\s*<\/span>/gi, '$1');

  return html.replace(/<input\b(?=[^>]*\btype=["']date["'])[^>]*>/gi, (input) => {
    let patched = input;
    patched = patched.replace(/\sdata-date-picker-fixed=["'][^"']*["']/gi, '');
    patched = patched.replace(/\sdata-travel-date-ready=["'][^"']*["']/gi, '');
    patched = patched.replace(/\splaceholder=["'][^"']*["']/gi, '');
    patched = patched.replace(/\sautocomplete=["'][^"']*["']/gi, '');
    patched = patched.replace(/\saria-label=["'][^"']*["']/gi, '');

    if (/\bclass=["'][^"']*["']/.test(patched)) {
      patched = patched.replace(/\bclass=(["'])([^"']*)\1/i, (m, q, classes) => {
        const next = classes.includes('travel-date-input') ? classes : `${classes} travel-date-input`;
        return `class=${q}${next.trim()}${q}`;
      });
    } else {
      patched = patched.replace(/<input\b/i, '<input class="travel-date-input"');
    }

    patched = patched.replace(/<input\b/i, '<input data-travel-date-field="true" placeholder="اختر تاريخ السفر" autocomplete="off" aria-label="تاريخ السفر"');
    return patched;
  });
}

const dateScript = `<script id="date-field-stable-fix">(function(){function pad(n){return String(n).padStart(2,'0')}function iso(d){return d.getFullYear()+'-'+pad(d.getMonth()+1)+'-'+pad(d.getDate())}function addDays(days){var d=new Date();d.setHours(12,0,0,0);d.setDate(d.getDate()+days);return d}function setup(input){if(!input||input.dataset.travelDateReady==='1')return;input.dataset.travelDateReady='1';var today=iso(addDays(0));var def=iso(addDays(3));if(!input.min)input.min=today;if(!input.value)input.value=def;input.setAttribute('autocomplete','off');input.setAttribute('aria-label','تاريخ السفر');input.classList.add('travel-date-input');}function init(){document.querySelectorAll('input[type="date"]').forEach(setup)}if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();document.addEventListener('pageshow',init);})();</script>`;

let patchedPages = 0;
let patchedInputs = 0;

for (const file of htmlFiles(out)) {
  let html = fs.readFileSync(file, 'utf8');
  const before = html;
  html = html.replace(/<script id=["']date-field-mobile-fix["'][\s\S]*?<\/script>/gi, '');
  html = html.replace(/<script id=["']date-field-stable-fix["'][\s\S]*?<\/script>/gi, '');
  html = normalizeDateInputs(html);
  patchedInputs += (html.match(/data-travel-date-field="true"/g) || []).length;
  html = html.replace('</body>', `${dateScript}</body>`);

  if (html !== before) {
    fs.writeFileSync(file, html);
    patchedPages += 1;
  }
}

if (fs.existsSync(cssPath)) {
  let css = fs.readFileSync(cssPath, 'utf8');
  const marker = 'date-field-stable-mobile-v2';
  if (!css.includes(marker)) {
    css += `
/* ${marker} */
.lead-form input[type="date"],
.lead-form input.travel-date-input{
  -webkit-appearance:none!important;
  appearance:none!important;
  display:block!important;
  width:100%!important;
  height:58px!important;
  min-height:58px!important;
  max-height:58px!important;
  line-height:normal!important;
  padding:0 18px 0 54px!important;
  border:1px solid #daddEC!important;
  border-radius:14px!important;
  background-color:#fbfcff!important;
  color:#17265f!important;
  -webkit-text-fill-color:#17265f!important;
  caret-color:#17265f!important;
  box-shadow:none!important;
  direction:rtl!important;
  text-align:right!important;
  font-weight:800!important;
  cursor:pointer!important;
  position:relative!important;
  background-image:url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='22' height='22' viewBox='0 0 24 24' fill='none' stroke='%2317265f' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='3' y='4' width='18' height='18' rx='3'/%3E%3Cpath d='M16 2v4M8 2v4M3 10h18'/%3E%3C/svg%3E")!important;
  background-repeat:no-repeat!important;
  background-position:left 18px center!important;
  background-size:21px 21px!important;
}
.lead-form input[type="date"]:focus,
.lead-form input.travel-date-input:focus{
  border-color:var(--blue)!important;
  box-shadow:0 0 0 3px rgba(79,107,244,.10)!important;
  outline:0!important;
}
.lead-form input[type="date"]::-webkit-calendar-picker-indicator,
.lead-form input.travel-date-input::-webkit-calendar-picker-indicator{
  position:absolute!important;
  inset:0!important;
  width:100%!important;
  height:100%!important;
  margin:0!important;
  padding:0!important;
  opacity:0!important;
  cursor:pointer!important;
}
.lead-form input[type="date"]::-webkit-date-and-time-value,
.lead-form input.travel-date-input::-webkit-date-and-time-value{
  text-align:right!important;
  min-height:auto!important;
  line-height:normal!important;
}
.lead-form input[type="date"]::-webkit-datetime-edit,
.lead-form input.travel-date-input::-webkit-datetime-edit{
  padding:0!important;
}
.lead-form input[type="date"]::-webkit-inner-spin-button,
.lead-form input.travel-date-input::-webkit-inner-spin-button{
  display:none!important;
}
.lead-form .date-picker-wrap,
.lead-form .date-picker-placeholder{
  display:contents!important;
}
@media(max-width:680px){
  .lead-form input:not([type="checkbox"]):not([type="radio"]),
  .lead-form select{
    height:58px!important;
    min-height:58px!important;
    max-height:58px!important;
    border-radius:14px!important;
    font-size:16px!important;
  }
  .lead-form textarea{
    min-height:122px!important;
    max-height:none!important;
    font-size:16px!important;
  }
  .lead-form input[type="date"],
  .lead-form input.travel-date-input{
    height:58px!important;
    min-height:58px!important;
    max-height:58px!important;
    padding:0 16px 0 52px!important;
    background-position:left 16px center!important;
    font-size:16px!important;
  }
}
`;
    fs.writeFileSync(cssPath, css);
  }
}

console.log(`Stable travel date fields on ${patchedPages} page(s), ${patchedInputs} date input(s). Default date is 3 days from visitor date.`);
