(function(){
window.dataLayer=window.dataLayer||[];
var LEAD_ENDPOINT=(window.ETLAALA_LEAD_ENDPOINT||document.documentElement.getAttribute('data-lead-endpoint')||'https://script.google.com/macros/s/AKfycbw7aNMwjKJdv3NJLro8hwUxRrVqx8CFKmc_ABHIRk3cGynXRkzKhE9Y3yDpr5k8mVPX/exec').trim();
var ATTR_KEYS=['gclid','gbraid','wbraid','utm_source','utm_medium','utm_campaign','utm_term','utm_content'];
function readAttribution(){var q=new URLSearchParams(location.search),a={};ATTR_KEYS.forEach(function(k){var v=q.get(k);if(v){try{sessionStorage.setItem('etlaala_'+k,v);}catch(_){}a[k]=v;}else{try{v=sessionStorage.getItem('etlaala_'+k);}catch(_){v=null;}if(v)a[k]=v;}});return a;}
var attribution=readAttribution();
function push(event,extra){window.dataLayer.push(Object.assign({event:event,page_path:location.pathname,page_location:location.href,destination:document.body.dataset.destination||'general'},attribution,extra||{}));}
function cleanPhone(v){return String(v||'').replace(/[\s()-]/g,'');}
function field(form,name){var el=form.querySelector('[name="'+name+'"]');return el?String(el.value||'').trim():'';}
function postLead(payload){if(!LEAD_ENDPOINT)return Promise.resolve(false);var body=new URLSearchParams();Object.keys(payload).forEach(function(k){if(payload[k]!==undefined&&payload[k]!==null)body.append(k,String(payload[k]));});return fetch(LEAD_ENDPOINT,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},body:body.toString(),keepalive:true}).then(function(){return true;}).catch(function(){return false;});}
function isLeadForm(form){return !!(form&&form.matches('form[data-lead-form],form.lead-form,form.dp-hero-lead-form,form.tk-hero-form')) && !!form.querySelector('[name="phone"]');}
function validationMessage(el){
  if(el.validity.valueMissing){
    if(el.type==='checkbox')return 'يرجى الموافقة على سياسة الخصوصية قبل إرسال الطلب.';
    if(el.name==='name')return 'يرجى كتابة الاسم.';
    if(el.name==='phone')return 'يرجى كتابة رقم الجوال.';
    if(el.name==='travelers')return 'يرجى تحديد عدد المسافرين.';
    if(el.name==='travel_date')return 'يرجى اختيار تاريخ السفر.';
    return 'يرجى تعبئة هذا الحقل.';
  }
  if(el.name==='phone'&&(el.validity.patternMismatch||el.validity.typeMismatch||el.validity.tooLong))return 'يرجى إدخال رقم جوال سعودي صحيح مثل 05xxxxxxxx.';
  if(el.validity.rangeUnderflow)return 'يرجى اختيار قيمة أو تاريخ صحيح.';
  if(el.validity.rangeOverflow)return 'القيمة المدخلة أكبر من المسموح.';
  if(el.validity.badInput)return 'يرجى إدخال قيمة صحيحة.';
  return 'يرجى مراجعة هذا الحقل.';
}
function clearValidation(e){var el=e.target;var form=el&&el.form;if(isLeadForm(form))el.setCustomValidity('');}
function ensureStatus(form){
  var status=form.querySelector('.status,.form-status,[data-form-status]');
  if(!status){status=document.createElement('p');status.className='status';status.setAttribute('role','status');status.setAttribute('aria-live','polite');form.appendChild(status);}
  status.style.display='block';status.style.marginTop='12px';status.style.fontSize='.9rem';status.style.lineHeight='1.8';status.style.fontWeight='700';
  return status;
}

document.addEventListener('invalid',function(e){var el=e.target;var form=el&&el.form;if(!isLeadForm(form))return;el.setCustomValidity(validationMessage(el));},true);
document.addEventListener('input',clearValidation,true);
document.addEventListener('change',clearValidation,true);
document.addEventListener('click',function(e){var wa=e.target.closest('[data-track="whatsapp"]');if(wa)push('whatsapp_click',{cta_type:'whatsapp',link_url:wa.href});var call=e.target.closest('[data-track="call"]');if(call)push('call_click',{cta_type:'call',link_url:call.href});});
document.addEventListener('submit',function(e){
  var form=e.target.closest('form');if(!isLeadForm(form))return;
  e.preventDefault();
  Array.prototype.forEach.call(form.elements||[],function(el){if(el&&el.setCustomValidity)el.setCustomValidity('');});
  if(!form.reportValidity())return;
  var hp=form.querySelector('[name="website"]');if(hp&&hp.value)return;
  var consent=form.querySelector('[name="privacy_consent"]');
  if(consent&&!consent.checked){consent.setCustomValidity('يرجى الموافقة على سياسة الخصوصية قبل إرسال الطلب.');consent.reportValidity();return;}

  var name=field(form,'name');var phone=cleanPhone(field(form,'phone'));var travelers=field(form,'travelers');var date=field(form,'travel_date');var notes=field(form,'notes');var dest=field(form,'destination')||document.body.dataset.destination||'رحلة سياحية';var formId=form.id||form.getAttribute('data-form-id')||'travel_quote';
  var payload=Object.assign({name:name,phone:phone,destination:dest,travelers:travelers,travel_date:date,notes:notes,page_path:location.pathname,page_url:location.href,privacy_consent:consent?'yes':'yes',source:'Website Form',form_id:formId},attribution);
  push('form_submit',{form_id:formId,lead_destination:dest,travelers:travelers||undefined});

  var status=ensureStatus(form);var submit=form.querySelector('[type="submit"]');var oldText=submit?submit.textContent:'';
  status.style.color='#46536f';status.textContent='جارٍ إرسال طلبك...';
  if(submit){submit.disabled=true;submit.textContent='جارٍ الإرسال...';}

  postLead(payload).then(function(ok){
    if(ok){status.style.color='#18794e';status.textContent='شكراً، تم إرسال طلبك بنجاح. سيتواصل معك أحد مستشاري السفر قريباً.';push('form_submit_success',{form_id:formId,lead_destination:dest});}
    else{status.style.color='#b42318';status.textContent='تعذر إرسال الطلب حالياً. يرجى المحاولة مرة أخرى بعد قليل.';push('form_submit_error',{form_id:formId,lead_destination:dest});}
  }).finally(function(){if(submit){submit.disabled=false;submit.textContent=oldText||'إرسال الطلب';}});
});
})();
