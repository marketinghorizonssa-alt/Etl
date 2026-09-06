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

function wrapDateInputs(html) {
  return html.replace(/(<input\b(?=[^>]*\btype=["']date["'])[^>]*>)/gi, (input) => {
    if (input.includes('data-date-picker-fixed')) return input;
    let patched = input;
    if (/\bclass=["'][^"']*["']/.test(patched)) {
      patched = patched.replace(/\bclass=(["'])([^"']*)\1/i, (m, q, classes) => `class=${q}${classes} date-input-fixed${q}`);
    } else {
      patched = patched.replace(/<input\b/i, '<input class="date-input-fixed"');
    }
    patched = patched.replace(/<input\b/i, '<input data-date-picker-fixed="true"');
    return `<span class="date-picker-wrap">${patched}<span class="date-picker-placeholder" aria-hidden="true">اختر تاريخ السفر</span></span>`;
  });
}

let patchedPages = 0;
let patchedInputs = 0;

for (const file of htmlFiles(out)) {
  let html = fs.readFileSync(file, 'utf8');
  const before = html;
  const countBefore = (html.match(/type=["']date["']/gi) || []).length;
  html = wrapDateInputs(html);
  const countAfter = (html.match(/data-date-picker-fixed="true"/g) || []).length;
  patchedInputs += Math.max(0, countAfter);

  if (!html.includes('id="date-field-mobile-fix"')) {
    const script = `<script id="date-field-mobile-fix">(function(){function openDate(input){if(!input||input.disabled||input.readOnly)return;try{input.focus({preventScroll:true})}catch(e){try{input.focus()}catch(_){}}if(typeof input.showPicker==='function'){try{input.showPicker()}catch(e){}}}function update(input){var wrap=input&&input.closest&&input.closest('.date-picker-wrap');if(wrap)wrap.classList.toggle('has-value',!!input.value)}function init(){document.querySelectorAll('.date-picker-wrap input[type="date"]').forEach(function(input){update(input);var label=input.closest('label');if(label)label.classList.add('date-label-fixed');input.addEventListener('input',function(){update(input)});input.addEventListener('change',function(){update(input)});input.addEventListener('focus',function(){update(input)});});}document.addEventListener('DOMContentLoaded',init);document.addEventListener('pointerdown',function(e){var wrap=e.target.closest&&e.target.closest('.date-picker-wrap');if(wrap){var input=wrap.querySelector('input[type="date"]');if(input)openDate(input);return;}var label=e.target.closest&&e.target.closest('label.date-label-fixed');if(label){var dateInput=label.querySelector('.date-picker-wrap input[type="date"]');if(dateInput)openDate(dateInput);}},true);document.addEventListener('click',function(e){var wrap=e.target.closest&&e.target.closest('.date-picker-wrap');if(wrap){var input=wrap.querySelector('input[type="date"]');if(input)openDate(input);return;}var label=e.target.closest&&e.target.closest('label.date-label-fixed');if(label){var dateInput=label.querySelector('.date-picker-wrap input[type="date"]');if(dateInput)openDate(dateInput);}},true);})();</script>`;
    html = html.replace('</body>', `${script}</body>`);
  }

  if (html !== before || countBefore > 0) {
    fs.writeFileSync(file, html);
    patchedPages += 1;
  }
}

if (fs.existsSync(cssPath)) {
  let css = fs.readFileSync(cssPath, 'utf8');
  const marker = 'date-field-mobile-fix-v1';
  if (!css.includes(marker)) {
    css += `
/* ${marker} */
.lead-form .date-picker-wrap{
  position:relative!important;
  display:block!important;
  width:100%!important;
  cursor:pointer!important;
}
.lead-form .date-picker-wrap input[type="date"]{
  -webkit-appearance:none!important;
  appearance:none!important;
  display:block!important;
  width:100%!important;
  height:58px!important;
  min-height:58px!important;
  line-height:58px!important;
  padding:0 18px 0 54px!important;
  border:1px solid #daddEC!important;
  border-radius:14px!important;
  background:#fbfcff!important;
  box-shadow:none!important;
  color:transparent!important;
  caret-color:transparent!important;
  direction:rtl!important;
  text-align:right!important;
  cursor:pointer!important;
  position:relative!important;
  z-index:1!important;
}
.lead-form .date-picker-wrap.has-value input[type="date"]{
  color:#17265f!important;
  -webkit-text-fill-color:#17265f!important;
  font-weight:800!important;
}
.lead-form .date-picker-wrap input[type="date"]:focus{
  border-color:var(--blue)!important;
  box-shadow:0 0 0 3px rgba(79,107,244,.10)!important;
  outline:0!important;
}
.lead-form .date-picker-wrap input[type="date"]::-webkit-calendar-picker-indicator{
  position:absolute!important;
  inset:0!important;
  width:100%!important;
  height:100%!important;
  opacity:0!important;
  cursor:pointer!important;
  z-index:4!important;
}
.lead-form .date-picker-wrap input[type="date"]::-webkit-date-and-time-value{
  min-height:58px!important;
  line-height:58px!important;
  text-align:right!important;
}
.lead-form .date-picker-placeholder{
  position:absolute!important;
  top:0!important;
  right:18px!important;
  left:54px!important;
  height:58px!important;
  display:flex!important;
  align-items:center!important;
  justify-content:flex-start!important;
  color:#8b94a9!important;
  font-weight:800!important;
  font-size:.95rem!important;
  line-height:1.4!important;
  pointer-events:none!important;
  z-index:2!important;
}
.lead-form .date-picker-wrap.has-value .date-picker-placeholder{
  display:none!important;
}
.lead-form .date-picker-wrap:after{
  content:""!important;
  position:absolute!important;
  left:18px!important;
  top:50%!important;
  width:18px!important;
  height:18px!important;
  transform:translateY(-50%)!important;
  border:2px solid #17265f!important;
  border-radius:4px!important;
  opacity:.92!important;
  pointer-events:none!important;
  z-index:3!important;
}
.lead-form .date-picker-wrap:before{
  content:""!important;
  position:absolute!important;
  left:22px!important;
  top:calc(50% - 4px)!important;
  width:10px!important;
  height:2px!important;
  background:#17265f!important;
  opacity:.92!important;
  pointer-events:none!important;
  z-index:4!important;
}
@media(max-width:680px){
  .lead-form .date-picker-wrap input[type="date"]{
    height:60px!important;
    min-height:60px!important;
    line-height:60px!important;
    padding:0 18px 0 56px!important;
    border-radius:16px!important;
    font-size:16px!important;
  }
  .lead-form .date-picker-placeholder{
    height:60px!important;
    left:56px!important;
    right:18px!important;
    font-size:16px!important;
  }
  .lead-form .date-picker-wrap input[type="date"]::-webkit-date-and-time-value{
    min-height:60px!important;
    line-height:60px!important;
  }
}
`;
    fs.writeFileSync(cssPath, css);
  }
}

console.log(`Date fields fixed on ${patchedPages} page(s), ${patchedInputs} date input(s).`);
