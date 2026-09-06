(function(){
window.dataLayer=window.dataLayer||[];
var LEAD_ENDPOINT=(window.ETLAALA_LEAD_ENDPOINT||document.documentElement.getAttribute('data-lead-endpoint')||'https://script.google.com/macros/s/AKfycbymz8Xm74ymJSre4K7DWzAHZlCGiQWEs6laLlgkDpgojpo2gRjvR1SF817objIsI8Q0/exec').trim();
var ATTR_KEYS=['gclid','gbraid','wbraid','utm_source','utm_medium','utm_campaign','utm_term','utm_content'];
function readAttribution(){var q=new URLSearchParams(location.search),a={};ATTR_KEYS.forEach(function(k){var v=q.get(k);if(v){try{sessionStorage.setItem('etlaala_'+k,v);}catch(_){}a[k]=v;}else{try{v=sessionStorage.getItem('etlaala_'+k);}catch(_){v=null;}if(v)a[k]=v;}});return a;}
var attribution=readAttribution();
function push(event,extra){window.dataLayer.push(Object.assign({event:event,page_path:location.pathname,page_location:location.href,destination:document.body.dataset.destination||'general'},attribution,extra||{}));}
function cleanPhone(v){return String(v||'').replace(/[\s()-]/g,'');}
function field(form,name){var el=form.querySelector('[name="'+name+'"]');return el?String(el.value||'').trim():'';}
function postLead(payload){if(!LEAD_ENDPOINT)return Promise.resolve(false);var body=new URLSearchParams();Object.keys(payload).forEach(function(k){if(payload[k]!==undefined&&payload[k]!==null)body.append(k,String(payload[k]));});return fetch(LEAD_ENDPOINT,{method:'POST',mode:'no-cors',headers:{'Content-Type':'application/x-www-form-urlencoded;charset=UTF-8'},body:body.toString(),keepalive:true}).then(function(){return true;}).catch(function(){return false;});}
function isLeadForm(form){return !!(form&&form.matches('form[data-lead-form],form.lead-form,form.dp-hero-lead-form,form.tk-hero-form')) && !!form.querySelector('[name="phone"]');}
document.addEventListener('click',function(e){var wa=e.target.closest('[data-track="whatsapp"]');if(wa)push('whatsapp_click',{cta_type:'whatsapp',link_url:wa.href});var call=e.target.closest('[data-track="call"]');if(call)push('call_click',{cta_type:'call',link_url:call.href});});
document.addEventListener('submit',function(e){var form=e.target.closest('form');if(!isLeadForm(form))return;e.preventDefault();if(!form.reportValidity())return;var hp=form.querySelector('[name="website"]');if(hp&&hp.value)return;var consent=form.querySelector('[name="privacy_consent"]');if(consent&&!consent.checked)return;
var name=field(form,'name');var phone=cleanPhone(field(form,'phone'));var travelers=field(form,'travelers');var date=field(form,'travel_date');var notes=field(form,'notes');var dest=field(form,'destination')||document.body.dataset.destination||'رحلة سياحية';var formId=form.id||form.getAttribute('data-form-id')||'travel_quote';
var payload=Object.assign({name:name,phone:phone,destination:dest,travelers:travelers,travel_date:date,notes:notes,page_path:location.pathname,page_url:location.href,privacy_consent:consent?'yes':'yes',source:'Website Form',form_id:formId},attribution);
push('form_submit',{form_id:formId,lead_destination:dest,travelers:travelers||undefined});
var text='مرحباً إطلالة، أريد عرضاً لـ '+dest+'\nالاسم: '+name+'\nالجوال: '+phone+(travelers?'\nعدد المسافرين: '+travelers:'')+(date?'\nتاريخ السفر: '+date:'')+(notes?'\nملاحظات: '+notes:'');
var status=form.querySelector('.status');if(status){status.style.display='block';status.textContent=LEAD_ENDPOINT?'تم تسجيل طلبك، وسيتم فتح واتساب لإكمال التفاصيل.':'سيتم فتح واتساب لإكمال التفاصيل.';}
var sent=postLead(payload);var target='https://api.whatsapp.com/send?phone=966125422331&text='+encodeURIComponent(text);var moved=false;function go(){if(moved)return;moved=true;location.href=target;}
Promise.race([sent,new Promise(function(resolve){setTimeout(resolve,650);})]).finally(function(){window.dataLayer.push({event:'form_submit_navigation',event_callback:go,event_timeout:350});setTimeout(go,400);});
});
})();
