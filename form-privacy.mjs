import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const formMarker = 'privacy-consent';

function walk(dir){
  const files=[];
  for(const e of fs.readdirSync(dir,{withFileTypes:true})){
    const p=path.join(dir,e.name);
    if(e.isDirectory()) files.push(...walk(p));
    else if(e.isFile() && e.name==='index.html') files.push(p);
  }
  return files;
}

for(const file of walk(out)){
  let html=fs.readFileSync(file,'utf8');
  if(!html.includes('data-lead-form')) continue;
  html=html.replace(/<input name="phone" type="tel" inputmode="tel" autocomplete="tel" required placeholder="05xxxxxxxx">/g,
    '<input name="phone" type="tel" inputmode="tel" autocomplete="tel" required pattern="(?:\\+?966|0)?5[0-9]{8}" maxlength="13" aria-describedby="phone-help" placeholder="05xxxxxxxx"><small id="phone-help" class="field-help">اكتب رقم جوال سعودي صحيح.</small>');
  if(!html.includes(`class="${formMarker}"`)){
    html=html.replace(/<button type="submit" class="gradient-btn">إرسال الطلب<\/button>/g,
      '<label class="privacy-consent"><input type="checkbox" name="privacy_consent" required value="yes"><span>أوافق على استخدام بياناتي للتواصل بخصوص طلب الرحلة وفق <a href="/privacy-policy/">سياسة الخصوصية</a>.</span></label><div class="hp-field" aria-hidden="true"><label>Website<input type="text" name="website" tabindex="-1" autocomplete="off"></label></div><button type="submit" class="gradient-btn">إرسال الطلب</button>');
  }
  fs.writeFileSync(file,html);
}

// Privacy policy page. Keep it focused on the website lead form and avoid unverifiable legal promises.
const base=fs.readFileSync(path.join(out,'index.html'),'utf8');
const body=`<main id="main" class="privacy-page"><section class="section"><div class="container privacy-shell"><div class="section-heading"><span>إطلالة للسفر والسياحة</span><h1>سياسة الخصوصية</h1><p>توضح هذه الصفحة كيفية التعامل مع البيانات التي يرسلها المستخدم عبر نماذج طلب العروض على etlaala.net.</p></div><div class="privacy-copy"><h2>البيانات التي نجمعها</h2><p>عند إرسال نموذج طلب عرض قد نجمع الاسم، رقم الجوال، الوجهة، عدد المسافرين، تاريخ السفر، الملاحظات، والبيانات التقنية المرتبطة بمصدر الزيارة مثل UTM وGCLID عند توفرها.</p><h2>الغرض من الاستخدام</h2><p>نستخدم البيانات للتواصل معك، إعداد عرض الرحلة، متابعة طلب الحجز، وقياس أداء الحملات الإعلانية بصورة لا تتضمن إرسال الاسم أو رقم الجوال إلى أدوات القياس الإعلانية.</p><h2>من يمكنه الاطلاع على البيانات</h2><p>يقتصر الوصول إلى بيانات نموذج الموقع على الأشخاص المخولين بخدمة الطلب ومتابعة المبيعات والأنظمة اللازمة لتشغيل الخدمة.</p><h2>الأمان والخصوصية</h2><p>يتم إرسال بيانات النموذج إلى قناة استقبال مخصصة بدل تضمينها داخل روابط التتبع أو طبقة بيانات Google Tag Manager. كما نستخدم تحققًا من الحقول وحماية خفيفة ضد الإرسال الآلي.</p><h2>التصحيح أو طلب حذف البيانات</h2><p>لطلب تصحيح بياناتك أو الاستفسار عن استخدامها تواصل مع إطلالة عبر البريد <a href="mailto:info@etlaala.com">info@etlaala.com</a> أو رقم <a href="tel:+966920029967">920029967</a>.</p><p class="privacy-note">إرسال النموذج يعني موافقتك على استخدام البيانات بالقدر اللازم للتواصل بخصوص طلبك.</p></div></div></section></main>`;
let privacy=base.replace(/<main id="main"[\s\S]*?<\/main>/i,body)
  .replace(/<title>[\s\S]*?<\/title>/i,'<title>سياسة الخصوصية | إطلالة للسفر والسياحة</title>')
  .replace(/<meta name="description" content="[^"]*">/i,'<meta name="description" content="سياسة الخصوصية لنماذج طلب العروض على موقع إطلالة للسفر والسياحة.">')
  .replace(/<link rel="canonical" href="[^"]*">/i,'<link rel="canonical" href="https://etlaala.net/privacy-policy/">')
  .replace(/<meta property="og:url" content="[^"]*">/i,'<meta property="og:url" content="https://etlaala.net/privacy-policy/">');
fs.mkdirSync(path.join(out,'privacy-policy'),{recursive:true});
fs.writeFileSync(path.join(out,'privacy-policy','index.html'),privacy);

const cssPath=path.join(out,'assets','styles.css');
let css=fs.readFileSync(cssPath,'utf8');
if(!css.includes('lead-privacy-v1')) css += `\n/* lead-privacy-v1 */\n.privacy-consent{display:flex!important;align-items:flex-start;gap:10px;margin:12px 0 16px;font-size:.82rem;line-height:1.65;color:#59627d}.privacy-consent input{width:18px;height:18px;margin-top:2px;flex:0 0 auto;accent-color:#263ed0}.privacy-consent a{font-weight:800;text-decoration:underline;text-underline-offset:2px}.field-help{display:block;margin-top:5px;color:#757d93;font-size:.72rem}.hp-field{position:absolute!important;left:-10000px!important;width:1px!important;height:1px!important;overflow:hidden!important}.privacy-shell{max-width:920px}.privacy-copy{background:#fff;border:1px solid #e8ebf4;border-radius:22px;padding:34px;box-shadow:0 12px 36px rgba(25,38,100,.06)}.privacy-copy h2{color:#182963;margin-top:1.5em}.privacy-copy p{line-height:1.95;color:#565f78}.privacy-note{padding:14px 16px;background:#f4f6ff;border-radius:12px}@media(max-width:620px){.privacy-copy{padding:22px}}\n`;
fs.writeFileSync(cssPath,css);

console.log('Lead form privacy and validation applied.');
