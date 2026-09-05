import fs from 'node:fs';
import path from 'node:path';

const out = path.resolve('dist');
const cssPath = path.join(out, 'assets', 'styles.css');
const SITE = 'https://etlaala.net';
const OLD = 'https://etlaala.com/wp-content/uploads';
const PHONE = '+966920029967';
const WA = '966125422331';

const h = (s='') => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const wa = (text) => `https://api.whatsapp.com/send?phone=${WA}&text=${encodeURIComponent(text)}`;

const destinations = [
  {
    slug:'turkiye', aliases:['turkey-2'], name:'تركيا', hero:`${OLD}/2025/02/Untitled-design-33.webp`,
    title:'السياحة في تركيا | برامج وعروض تركيا من السعودية | إطلالة',
    meta:'خطط رحلتك إلى تركيا مع إطلالة: إسطنبول، طرابزون والشمال التركي، أنطاليا وكابادوكيا، مع برامج سياحية وبكجات قابلة للتخصيص من السعودية.',
    eyebrow:'تركيا مع إطلالة', h1:'رحلة تركيا على مقاسك، من إسطنبول إلى الشمال التركي',
    lead:'نرتّب لك برنامج تركيا حسب عدد الأيام وطبيعة الرحلة، مع خيارات للفنادق والانتقالات والجولات بين إسطنبول وطرابزون وأنطاليا وكابادوكيا وغيرها.',
    introTitle:'السياحة في تركيا بتجربة مرتبة وواضحة',
    intro:[
      'تركيا تجمع بين المدن التاريخية والطبيعة والبحر والتسوق، لذلك تختلف الرحلة المثالية من شخص لآخر. بعض المسافرين يفضّلون أسبوعًا في إسطنبول وما حولها، بينما تناسب العائلات برامج تجمع إسطنبول مع طرابزون والشمال التركي، ويمكن إضافة أنطاليا أو كابادوكيا للرحلات الأطول.',
      'في إطلالة ما نعتمد على بكج واحد للجميع. نبدأ بتاريخ السفر وعدد المسافرين والميزانية، ثم نبني برنامج سياحي لتركيا يوازن بين وقت التنقل، مستوى الفندق، الجولات والوجهات اللي تهمك فعلاً.'
    ],
    quick:[['مدن متنوعة','تاريخ، طبيعة، بحر وتسوق'],['برنامج مرن','من رحلة أسبوع إلى برامج أطول'],['مناسب للعائلات','خيارات مدن وفنادق متعددة'],['ترتيب متكامل','فنادق وانتقالات وجولات']],
    cities:[
      ['إسطنبول','البداية الأنسب لكثير من الرحلات؛ معالم تاريخية، البوسفور، أسواق وأحياء متنوعة.'],
      ['طرابزون والشمال التركي','خيار مناسب لمحبي الطبيعة والجبال والأجواء الهادئة، ويمكن بناء جدول سياحي في طرابزون وما حولها.'],
      ['أنطاليا','منتجعات وشواطئ وتجارب بحرية، وتناسب من يبحث عن برنامج سياحي في أنطاليا أو يجمعها مع مدينة أخرى.'],
      ['كابادوكيا','مناظر صخرية وتجربة المنطاد، وتضيف طابعًا مختلفًا للرحلات الأطول.'],
      ['بورصة','مدينة قريبة نسبيًا من إسطنبول وتناسب الرحلات اليومية أو الإقامة القصيرة بحسب الخطة.'],
      ['بودروم وفتحية','خيارات ساحلية لمن يفضّل البحر والمنتجعات خلال الموسم المناسب.']
    ],
    programs:[
      ['رحلة أسبوع','برنامج خفيف يركّز على مدينة رئيسية مع يوم أو يومين للرحلات القريبة، حتى ما يضيع وقتك في التنقل.'],
      ['إسطنبول + الشمال','من أكثر التركيبات طلبًا للعائلات؛ نقسّم الليالي بحسب الموسم ووقت الوصول والمغادرة.'],
      ['تركيا متعددة المدن','للرحلات الأطول يمكن إضافة أنطاليا أو كابادوكيا مع ترتيب الطيران الداخلي أو الانتقالات المناسبة.']
    ],
    activities:[
      ['المعالم التاريخية','آيا صوفيا، قصر توبكابي، الجامع الأزرق وغيرها ضمن خط سير إسطنبول.'],
      ['الطبيعة والمرتفعات','قرى وجبال وبحيرات الشمال التركي حول طرابزون بحسب الموسم.'],
      ['البحر والمنتجعات','أنطاليا وفتحية وبودروم خيارات مناسبة للراغبين في الاسترخاء والأنشطة البحرية.'],
      ['كابادوكيا','رحلات المنطاد والمناظر المميزة عند شروق الشمس من أشهر تجارب المنطقة.']
    ],
    faq:[
      ['هل أقدر أسوي رحلة إلى تركيا لمدة أسبوع؟','نعم. الأفضل في أسبوع تقليل عدد المدن حتى تكون الرحلة أريح، ونقترح خط السير بحسب مطار الوصول واهتماماتك.'],
      ['وش الأفضل: إسطنبول وطرابزون أو إسطنبول وأنطاليا؟','يعتمد على الموسم وطبيعة الرحلة؛ طرابزون للطبيعة والأجواء الجبلية، وأنطاليا للبحر والمنتجعات.'],
      ['هل عندكم بكج سفر لتركيا قابل للتعديل؟','نعم، البكج يُبنى حسب التاريخ وعدد المسافرين ومستوى الفنادق والجولات المطلوبة.'],
      ['هل يمكن ترتيب برنامج سياحي طرابزون؟','نعم، ويمكن دمج طرابزون مع مدن ومناطق الشمال التركي بحسب عدد الليالي.'],
      ['هل تقدرون ترتبون برنامج سياحي في أنطاليا؟','نعم، سواء كانت أنطاليا وجهة أساسية أو جزءًا من رحلة متعددة المدن.'],
      ['هل تشمل العروض الطيران؟','يختلف ذلك حسب العرض. نوضح لك قبل الحجز ما يشمله السعر من طيران وفنادق وانتقالات وجولات.']
    ]
  },
  {
    slug:'georgia', aliases:['georgia-2'], name:'جورجيا', hero:`${OLD}/2025/02/Untitled-design-29.webp`,
    title:'السياحة في جورجيا | عروض وبكجات جورجيا | إطلالة',
    meta:'السياحة في جورجيا من السعودية مع إطلالة: تبليسي، باتومي وكازبيجي، برامج 7 أيام وبكجات قابلة للتخصيص مع فنادق وانتقالات وجولات.',
    eyebrow:'جورجيا مع إطلالة', h1:'جورجيا بين تبليسي والجبال والبحر، ببرنامج يناسب رحلتك',
    lead:'سواء تبحث عن برنامج سياحي جورجيا 7 أيام، بكج عائلي أو رحلة لشخصين، نرتّب المدن والفنادق والانتقالات والجولات حسب وقتك وميزانيتك.',
    introTitle:'برنامج جورجيا يبدأ من نوع الرحلة، مو من قالب ثابت',
    intro:[
      'السياحة في جورجيا مناسبة للمسافر اللي يبغى يجمع مدينة حيوية مع طبيعة وجبال، ومع رحلة أطول يمكن إضافة الساحل. تبليسي غالبًا تكون نقطة البداية، ومنها تتوزع الرحلة إلى كازبيجي أو بورجومي، ومع عدد أيام مناسب يمكن إضافة باتومي.',
      'بدل ما نحط كل المدن في جدول مزدحم، نرتّب برنامج جورجيا السياحي على أساس مدة الرحلة وعدد المسافرين. بهذا الشكل يكون عندك وقت فعلي للاستمتاع بالوجهة بدل قضاء أغلب اليوم بين الطرق والفنادق.'
    ],
    quick:[['تبليسي','مدينة رئيسية ومعالم وأسواق'],['باتومي','ساحل وأجواء مختلفة'],['الجبال','كازبيجي ومناطق طبيعية'],['برنامج 7 أيام','قابل للتخصيص حسب رحلتك']],
    cities:[
      ['تبليسي','المدينة الأساسية لمعظم البرامج؛ تجمع المدينة القديمة والمطاعم والأسواق والمعالم.'],
      ['كازبيجي','من أشهر المناطق الجبلية، وتناسب الرحلات اليومية أو الإقامة حسب البرنامج.'],
      ['باتومي','وجهة ساحلية بطابع مختلف عن تبليسي، وتناسب الرحلات الأطول والموسم المناسب.'],
      ['بورجومي','طبيعة وأجواء هادئة ويمكن إضافتها ضمن خط سير يجمع أكثر من منطقة.'],
      ['كاخيتي','مناطق ريفية ومناظر مفتوحة وتجربة مختلفة عن المدن الرئيسية.'],
      ['متسخيتا','قريبة من تبليسي وتدخل بسهولة ضمن يوم جولات منظم.']
    ],
    programs:[
      ['جورجيا 7 أيام','نختار مدينتين أو قاعدة رئيسية مع رحلات قريبة حتى يظل الجدول متوازنًا.'],
      ['تبليسي + باتومي','مناسب لمن يملك وقتًا كافيًا ويرغب في الجمع بين المدينة والساحل.'],
      ['برنامج عائلي','فنادق وتنقلات ومسافات يومية أخف، مع أنشطة تناسب أفراد العائلة.']
    ],
    activities:[
      ['جولات تبليسي','المدينة القديمة، الإطلالات والأسواق ضمن يوم مرتب بدون تنقلات مرهقة.'],
      ['رحلات جبلية','التوجه إلى كازبيجي والمناطق الطبيعية بحسب الطقس وخطة الرحلة.'],
      ['باتومي','الممشى والواجهة البحرية ومناطق الجذب المناسبة للموسم.'],
      ['تجارب ريفية','إضافة مناطق خارج المدن لمن يفضّل الطبيعة والهدوء.']
    ],
    faq:[
      ['كم تكلفة السفر إلى جورجيا لمدة أسبوع؟','التكلفة تختلف حسب الموسم وعدد المسافرين ومستوى الفندق والمدن. نجهز لك خيارات واضحة بعد معرفة تاريخ السفر.'],
      ['ما أفضل برنامج سياحي جورجيا 7 أيام؟','الأفضل ألا يكون مزدحمًا. عادة نختار تبليسي مع منطقة أو مدينة إضافية بحسب الموسم واهتماماتك.'],
      ['هل يوجد بكج جورجيا لشخص واحد؟','نعم، ويمكن تسعير البرنامج لشخص واحد أو شخصين أو عائلة بحسب نوع الغرفة والتنقلات.'],
      ['هل أقدر أدمج تبليسي وباتومي؟','نعم إذا كانت مدة الرحلة تسمح، ونرتب عدد الليالي بطريقة تقلل التنقل غير الضروري.'],
      ['هل البرامج قابلة للتعديل؟','نعم، المدن والفنادق وعدد الليالي والجولات كلها قابلة للتخصيص قبل الحجز.'],
      ['هل يشمل العرض الانتقالات؟','بحسب البكج المختار، ونوضح لك جميع الخدمات المشمولة قبل التأكيد.']
    ]
  },
  {
    slug:'malaysia', aliases:['malaysia-2'], name:'ماليزيا', hero:`${OLD}/2025/02/Untitled-design-31.png`,
    title:'السياحة في ماليزيا | بكجات وبرامج ماليزيا | إطلالة',
    meta:'السياحة في ماليزيا من السعودية: كوالالمبور، لانكاوي وبينانج، برامج 7 و15 يوم وبكجات عائلية قابلة للتخصيص مع إطلالة.',
    eyebrow:'ماليزيا مع إطلالة', h1:'ماليزيا مدينة وطبيعة وجزر، بخط سير مريح من أول يوم',
    lead:'نرتّب لك برنامج ماليزيا بين كوالالمبور والجزر والمدن المناسبة لك، مع فنادق وانتقالات واضحة وخيارات تناسب العائلات والأزواج.',
    introTitle:'السياحة في ماليزيا تحتاج توزيع أيام ذكي',
    intro:[
      'ماليزيا سياحة متنوعة؛ كوالالمبور مناسبة للتسوق والمدينة، ولانكاوي للبحر والاسترخاء، وبينانج تضيف تجربة مختلفة من الطعام والثقافة. السر في البرنامج الجيد هو اختيار عدد مدن يناسب مدة الرحلة بدل محاولة زيارة كل شيء مرة واحدة.',
      'إذا كنت تبحث عن برنامج سياحي ماليزيا 7 أيام نركز على محطتين أساسيتين، أما برنامج 10 إلى 15 يومًا فيسمح بإضافة مدينة أو جزيرة أخرى براحة أكبر. كل خط سير يتغير بحسب الرحلات الجوية، عدد الأطفال وميزانية الإقامة.'
    ],
    quick:[['كوالالمبور','مدينة وتسوق ومعالم'],['لانكاوي','جزيرة واسترخاء'],['رحلات عائلية','خيارات واسعة للعائلات'],['7–15 يوم','برامج حسب مدة السفر']],
    cities:[
      ['كوالالمبور','نقطة البداية الأشهر، وتناسب التسوق والمعالم والأنشطة العائلية.'],
      ['لانكاوي','جزيرة مناسبة للمنتجعات والطبيعة والبحر، وتدخل غالبًا ضمن الرحلات المتوسطة والطويلة.'],
      ['بينانج','تجربة مختلفة تجمع المدينة والتراث والطعام، ويمكن دمجها مع وجهات أخرى.'],
      ['سيلانجور','قريبة من كوالالمبور وتضم خيارات ترفيهية ومناطق مناسبة للعائلات.'],
      ['مرتفعات جنتنج','وجهة قريبة نسبيًا من العاصمة ويمكن زيارتها ضمن يوم أو إقامة قصيرة.'],
      ['مرتفعات كاميرون','طبيعة وأجواء أبرد لمن يرغب في إضافة منطقة هادئة إلى البرنامج.']
    ],
    programs:[
      ['ماليزيا 7 أيام','محطتان أساسيتان مثل كوالالمبور مع جزيرة أو منطقة قريبة.'],
      ['ماليزيا 10 أيام','مساحة أفضل للجمع بين العاصمة وجزيرة ووجهة ثالثة بدون ضغط كبير.'],
      ['ماليزيا 15 يوم','برنامج أوسع للعائلات أو الأزواج مع توزيع مريح لليالي والتنقلات.']
    ],
    activities:[
      ['تجارب المدينة','معالم كوالالمبور والتسوق والمطاعم والأنشطة العائلية.'],
      ['الجزر والشواطئ','لانكاوي من أشهر الخيارات للاستجمام والأنشطة البحرية.'],
      ['الطبيعة والمرتفعات','جنتنج وكاميرون لمن يرغب في أجواء مختلفة عن المدن.'],
      ['رحلات عائلية','اختيار فنادق ومناطق وأنشطة تناسب الأطفال ومسافات التنقل.']
    ],
    faq:[
      ['ما أفضل برنامج سياحي ماليزيا 7 أيام؟','يفضل اختيار محطتين رئيسيتين حتى يكون الوقت كافيًا، ونحدد الأنسب بعد معرفة نوع الرحلة.'],
      ['هل يمكن برنامج سياحي في ماليزيا لمدة 15 يوم؟','نعم، والمدة الأطول تسمح بإضافة أكثر من مدينة أو جزيرة مع توزيع أريح لليالي.'],
      ['هل ماليزيا مناسبة للعائلات؟','نعم، وفيها خيارات واسعة للفنادق والأنشطة، ونراعي أعمار الأطفال عند ترتيب البرنامج.'],
      ['هل يوجد بكج ماليزيا قابل للتعديل؟','نعم، مستوى الفنادق والمدن وعدد الليالي والتنقلات كلها قابلة للتعديل.'],
      ['هل يمكن الجمع بين كوالالمبور ولانكاوي؟','نعم، وهو من أكثر خطوط السير شيوعًا للرحلات المتوسطة.'],
      ['هل العرض يشمل الطيران الداخلي؟','بحسب البرنامج؛ نوضح كل قطاع طيران أو انتقال ضمن تفاصيل العرض قبل الحجز.']
    ]
  },
  {
    slug:'maldives', aliases:['maldives-2'], name:'المالديف', hero:`${OLD}/2025/02/Untitled-design-30.webp`,
    title:'السياحة في المالديف | منتجعات وعروض شهر العسل | إطلالة',
    meta:'السفر إلى المالديف مع إطلالة: منتجعات وفلل فوق الماء، عروض شهر العسل، انتقالات بحرية أو جوية وخيارات تناسب الميزانية وعدد الليالي.',
    eyebrow:'المالديف مع إطلالة', h1:'اختيار منتجع المالديف الصح أهم من كثرة الخيارات',
    lead:'نساعدك تختار الجزيرة والمنتجع ونوع الفيلا ونظام الوجبات والانتقال المناسب، عشان تكون رحلة المالديف واضحة من السعر إلى الوصول.',
    introTitle:'رحلة المالديف تبدأ من المنتجع، مو من اسم الجزيرة فقط',
    intro:[
      'السياحة في المالديف مختلفة عن أغلب الوجهات؛ جودة الرحلة تعتمد بشكل كبير على اختيار المنتجع ونوع الغرفة ونظام الوجبات وطريقة الوصول من المطار. لذلك مقارنة السعر وحده ما تكفي، خصوصًا إذا كان أحد العروض يشمل انتقالًا أو وجبات أكثر من الآخر.',
      'لرحلات الأزواج وشهر العسل نركز على الخصوصية ونوع الفيلا والتجارب الهادئة، وللعائلات نهتم بسهولة الانتقال وتنوع الأنشطة ومساحة الغرف. بعدها نرتب لك أكثر من خيار واضح حتى تقارن على نفس المكونات.'
    ],
    quick:[['منتجعات مختارة','حسب الميزانية وطبيعة الرحلة'],['فلل متنوعة','شاطئية أو فوق الماء'],['شهر العسل','خيارات وتجارب للأزواج'],['انتقالات','بحرية أو جوية حسب المنتجع']],
    cities:[
      ['فلل فوق الماء','تجربة المالديف الأشهر، وتختلف الأسعار حسب المنتجع والموسم ونوع الفيلا.'],
      ['فلل شاطئية','خيار ممتاز لمن يفضّل الوصول المباشر للشاطئ ومساحة أكبر في بعض المنتجعات.'],
      ['منتجعات للأزواج','نبحث عن الخصوصية والأجواء الهادئة والخدمات المناسبة للمناسبات الخاصة.'],
      ['منتجعات للعائلات','أنشطة متنوعة وخيارات غرف مناسبة وسهولة أكبر في الحركة داخل المنتجع.'],
      ['انتقال بالقارب','مناسب للمنتجعات الأقرب إلى مطار مالي بحسب موقعها وظروف التشغيل.'],
      ['طائرة مائية أو داخلية','تُستخدم للوصول إلى بعض الجزر الأبعد وتدخل تكلفتها ضمن المقارنة الحقيقية للعرض.']
    ],
    programs:[
      ['إقامة قصيرة','مناسبة للاستجمام المركز، مع اختيار منتجع يقدم الأنشطة والوجبات اللي تحتاجها في مكان واحد.'],
      ['شهر عسل','نوازن بين الخصوصية ونوع الفيلا والوجبات والتجارب الخاصة بدون إضافات غير ضرورية.'],
      ['رحلة عائلية','نركز على سهولة الانتقال، مساحة الإقامة والأنشطة المناسبة لجميع أفراد العائلة.']
    ],
    activities:[
      ['الغوص والسنوركل','الشعاب المرجانية والحياة البحرية من أبرز أسباب اختيار المالديف.'],
      ['رحلات بحرية','قوارب وتجارب غروب الشمس والأنشطة البحرية حسب المنتجع.'],
      ['الاسترخاء والسبا','خيارات المنتجعات الصحية والجلسات المطلة على المحيط.'],
      ['أنشطة مائية','تختلف من منتجع لآخر وتشمل أنشطة هادئة ورياضية بحسب الباقة.']
    ],
    faq:[
      ['كم تكلفة السفر إلى المالديف لشخصين؟','تختلف بشكل كبير حسب الموسم والمنتجع ونوع الفيلا والوجبات وطريقة الانتقال، لذلك الأفضل مقارنة عروض بنفس المكونات.'],
      ['هل الفيلا فوق الماء أفضل من الشاطئية؟','ليست دائمًا. الاختيار يعتمد على الخصوصية والمساحة والميزانية وتجربة الإقامة اللي تفضلها.'],
      ['هل عندكم عروض شهر عسل للمالديف؟','نعم، ونرتب الخيارات حسب عدد الليالي ونوع الفيلا والتجارب المطلوبة.'],
      ['هل الانتقال من المطار مشمول؟','بحسب المنتجع والعرض، ونوضح نوع الانتقال وتكلفته ضمن تفاصيل الحجز.'],
      ['هل المالديف مناسبة للعائلات؟','نعم، لكن اختيار المنتجع مهم لأن الخدمات والأنشطة العائلية تختلف بين منتجع وآخر.'],
      ['هل يمكن تقسيم الإقامة بين فيلا شاطئية وفوق الماء؟','يمكن ذلك في كثير من الحالات حسب توفر الغرف وسياسة المنتجع، ونرتب الخيار المناسب عند التسعير.']
    ]
  },
  {
    slug:'thailand', aliases:['thailand-2'], name:'تايلاند', hero:`${OLD}/2025/02/Untitled-design-22.webp`,
    title:'السياحة في تايلاند | عروض وبكجات تايلاند | إطلالة',
    meta:'السياحة في تايلاند من السعودية: بانكوك، بوكيت وكرابي، عروض وبكجات تايلاند وبرامج قابلة للتخصيص للعائلات والأزواج مع إطلالة.',
    eyebrow:'تايلاند مع إطلالة', h1:'تايلاند من بانكوك إلى بوكيت وكرابي، بخطة سفر متوازنة',
    lead:'نرتّب المدن والجزر والفنادق والانتقالات حسب مدة الرحلة، سواء تبحث عن بكج تايلاند، رحلة عائلية أو برنامج للأزواج.',
    introTitle:'السياحة في تايلاند أجمل لما تختار المدن على قد أيامك',
    intro:[
      'تايلاند فيها خيارات كثيرة جدًا، من بانكوك كمدينة رئيسية إلى بوكيت وكرابي للبحر والجزر، إضافة إلى وجهات أخرى مثل بتايا. لذلك أفضل برنامج ما يكون الأطول قائمة، بل الأكثر توازنًا بين المدن ووقت التنقل.',
      'إذا كان هدفك عروض السفر إلى تايلاند أو بكج رحلات إلى تايلاند، نبدأ بعدد الأيام ونوع الرحلة ثم نختار الفنادق والمناطق المناسبة. بهذه الطريقة تعرف وش داخل العرض، بدل باقة عامة ما تراعي احتياجك.'
    ],
    quick:[['بانكوك','مدينة وتسوق ومعالم'],['بوكيت','شواطئ ومنتجعات وجزر'],['كرابي','طبيعة وبحر وأجواء أهدأ'],['بكجات مرنة','حسب المدة والميزانية']],
    cities:[
      ['بانكوك','مدينة مناسبة للتسوق والمعالم والمطاعم، وغالبًا تكون بداية أو نهاية الرحلة.'],
      ['بوكيت','من أشهر الوجهات الشاطئية، مع مناطق وفنادق متعددة تناسب أنماط سفر مختلفة.'],
      ['كرابي','طبيعة ساحلية وجزر وأجواء أهدأ، ويمكن دمجها مع بوكيت في برنامج أطول.'],
      ['بتايا','قريبة نسبيًا من بانكوك وتدخل ضمن بعض البرامج بحسب طبيعة الرحلة.'],
      ['جزر قريبة من بوكيت','رحلات بحرية يومية تتغير حسب الموسم والطقس ونقطة الانطلاق.'],
      ['مناطق بوكيت','اختيار المنطقة مهم بقدر اختيار الفندق، لأن الأجواء والقرب من الخدمات تختلف بشكل واضح.']
    ],
    programs:[
      ['بانكوك + بوكيت','تركيبة مناسبة لأول زيارة وتجمع المدينة مع البحر.'],
      ['بوكيت + كرابي','خيار لمحبي البحر والطبيعة مع تقليل وقت المدن الكبيرة.'],
      ['برنامج عائلي','نرتب فنادق ومناطق أسهل للعائلات ونوازن بين الأنشطة وأيام الراحة.']
    ],
    activities:[
      ['جولات بانكوك','معالم وتسوق وأسواق ومطاعم ضمن أيام موزعة بدون استعجال.'],
      ['جزر بوكيت','رحلات بحرية متنوعة يمكن إضافتها حسب الموسم وحالة البحر.'],
      ['طبيعة كرابي','شواطئ وتكوينات صخرية وتجارب بحرية بطابع أهدأ.'],
      ['منتجعات واسترخاء','خيارات كثيرة من الفنادق والمنتجعات بحسب المنطقة والميزانية.']
    ],
    faq:[
      ['ما أفضل الأماكن في بوكيت؟','يعتمد على نوع الرحلة؛ بعض المناطق أنسب للحركة والخدمات، وأخرى أهدأ للمنتجعات والعائلات.'],
      ['هل يوجد بكج تايلاند يجمع بانكوك وبوكيت؟','نعم، ويمكن تعديل عدد الليالي والفنادق وإضافة الجولات حسب مدة السفر.'],
      ['هل يمكن الجمع بين بوكيت وكرابي؟','نعم إذا كانت مدة الرحلة تسمح، ونرتب الانتقال بطريقة تقلل الوقت الضائع.'],
      ['هل تايلاند مناسبة للعائلات؟','نعم، ومع اختيار المناطق والفنادق المناسبة يمكن بناء برنامج مريح للعائلات.'],
      ['هل تحجزون فنادق في تايلاند فقط؟','يمكن ترتيب الفندق كخدمة مستقلة أو ضمن برنامج أشمل حسب طلبك.'],
      ['هل عروض تايلاند ثابتة طوال السنة؟','لا، الأسعار والتوفر تتغير حسب الموسم وتاريخ السفر ومستوى الفندق، لذلك يتم التسعير على تاريخك الفعلي.']
    ]
  },
  {
    slug:'bosnia-and-herzegovina', aliases:[], name:'البوسنة والهرسك', hero:`${OLD}/2025/06/3-3.webp`,
    title:'السياحة في البوسنة والهرسك | برامج وبكجات البوسنة | إطلالة',
    meta:'السياحة في البوسنة والهرسك مع إطلالة: سراييفو وموستار والطبيعة، برامج وبكجات قابلة للتخصيص للعائلات والأزواج من السعودية.',
    eyebrow:'البوسنة والهرسك مع إطلالة', h1:'البوسنة بهدوء الطبيعة وروح المدن، ببرنامج بعيد عن الزحمة',
    lead:'نرتّب لك سراييفو والطبيعة والمدن القريبة في خط سير مريح، مع فنادق وانتقالات وجولات تناسب العائلات والأزواج.',
    introTitle:'السياحة في البوسنة للي يفضّل الطبيعة والرحلة الهادئة',
    intro:[
      'البوسنة والهرسك تجمع بين سراييفو التاريخية والأنهار والجبال والمدن الصغيرة، وهذا يجعلها مناسبة للرحلات اللي تبغى وتيرة أهدأ من المدن الأوروبية الكبيرة. يمكن بناء البرنامج حول سراييفو مع جولات يومية، أو توزيع الليالي على أكثر من منطقة إذا كانت مدة السفر تسمح.',
      'سواء تبحث عن بكج البوسنة أو برنامج سياحي البوسنة، نركز على المسافات الفعلية بين المناطق ونوع الفندق والانتقالات. النتيجة جدول واضح يعطي كل منطقة وقتها بدل التنقل المستمر.'
    ],
    quick:[['سراييفو','مدينة رئيسية وتاريخ وأسواق'],['موستار','مدينة تاريخية ونهرية'],['طبيعة','أنهار وجبال ومناطق هادئة'],['رحلات عائلية','وتيرة مناسبة وبرامج مرنة']],
    cities:[
      ['سراييفو','قاعدة رئيسية ممتازة، تجمع الأسواق والتاريخ والمطاعم وجولات قريبة متعددة.'],
      ['موستار','مدينة معروفة بجسرها التاريخي وأجوائها المختلفة، ويمكن زيارتها ضمن خط سير منظم.'],
      ['ترافنيك','مدينة تاريخية بطابع هادئ، وتدخل ضمن بعض البرامج البرية.'],
      ['يايتسا','طبيعة وشلالات ومشهد مختلف عن المدن الرئيسية.'],
      ['بيهاتش','منطقة طبيعية مناسبة للرحلات الأطول التي تركز على الأنهار والطبيعة.'],
      ['المناطق الجبلية','خيارات إضافية لعشاق الطبيعة بحسب الموسم وخطة الرحلة.']
    ],
    programs:[
      ['سراييفو وما حولها','برنامج بسيط ومريح لمن يفضّل قاعدة واحدة مع رحلات يومية.'],
      ['سراييفو + موستار','توزيع مناسب للرحلات المتوسطة مع مزيج من المدينة والطبيعة.'],
      ['البوسنة الطبيعية','للرحلات الأطول يمكن إضافة مناطق أبعد مع تقليل عدد التنقلات اليومية.']
    ],
    activities:[
      ['المدينة القديمة','أسواق وشوارع تاريخية ومطاعم في سراييفو.'],
      ['موستار','جولة في المركز التاريخي والمناطق المحيطة بحسب البرنامج.'],
      ['الشلالات والأنهار','وجهات طبيعية متعددة يمكن إضافتها حسب خط السير.'],
      ['الجبال والطبيعة','أيام مخصصة للمناظر والمناطق المفتوحة لعشاق الهدوء.']
    ],
    faq:[
      ['ما أفضل برنامج سياحي للبوسنة؟','يعتمد على عدد الأيام؛ الرحلة الأقصر تستفيد من قاعدة رئيسية، والرحلة الأطول تسمح بإضافة موستار ومناطق طبيعية أخرى.'],
      ['هل يوجد بكج سفر للبوسنة للعائلات؟','نعم، ونرتب مستوى الفندق ونوع السيارة وعدد الليالي حسب حجم العائلة.'],
      ['هل سراييفو تكفي كقاعدة للرحلة؟','يمكن أن تكون قاعدة ممتازة للرحلات القصيرة مع جولات قريبة، أما المدة الأطول فتسمح بتوزيع الإقامة.'],
      ['هل البوسنة مناسبة لمحبي الطبيعة؟','نعم، وفيها خيارات واسعة من الأنهار والجبال والشلالات والمناطق الريفية.'],
      ['هل البرنامج قابل للتخصيص؟','نعم، المدن والفنادق والانتقالات والجولات قابلة للتعديل حسب الميزانية والمدة.'],
      ['هل يمكن دمج موستار مع سراييفو؟','نعم، وهو خط سير مناسب لكثير من الرحلات المتوسطة بحسب عدد الليالي.']
    ]
  },
  {
    slug:'europe', aliases:[], name:'أوروبا', hero:`${OLD}/2024/03/pexels-margerretta-548077-scaled.jpg`,
    title:'رحلات أوروبا | بكجات وكروز أوروبا | إطلالة للسفر والسياحة',
    meta:'رحلات أوروبا مع إطلالة: برامج سياحية وبكجات أوروبا وكروز أوروبا، مع تخطيط المدن والفنادق والانتقالات حسب مدة الرحلة والميزانية.',
    eyebrow:'أوروبا مع إطلالة', h1:'أوروبا ما تحتاج مدن أكثر، تحتاج خط سير أذكى',
    lead:'نرتّب لك المدن والدول حسب عدد الأيام ومسافات التنقل، سواء كانت رحلتك مدن أوروبية، بكج متعدد الوجهات أو كروز أوروبا.',
    introTitle:'رحلات أوروبا تبدأ من المسار، قبل اختيار الفنادق',
    intro:[
      'سياحة أوروبا ممكن تكون رحلة مدينة واحدة، أو برنامج يجمع أكثر من دولة، أو رحلة كروز تمر بعدة موانئ. الخطأ الشائع هو إضافة مدن كثيرة بدون حساب وقت القطارات والطيران وتسجيل الدخول والخروج من الفنادق، لذلك نبدأ دائمًا ببناء مسار منطقي.',
      'إذا كنت تبحث عن بكجات أوروبا أو رحلات سياحية إلى أوروبا، نرتب الوجهات حسب قربها من بعض ونوع التجربة المطلوبة. بعدها نحدد الإقامة والانتقالات والجولات، حتى تكون الميزانية موجهة للتجربة نفسها بدل التنقلات غير الضرورية.'
    ],
    quick:[['مدن أوروبية','مسارات حسب الاهتمامات'],['أكثر من دولة','بترتيب تنقل منطقي'],['كروز أوروبا','رحلات بحرية متعددة الموانئ'],['برنامج مخصص','حسب الأيام والميزانية']],
    cities:[
      ['أوروبا الغربية','مدن متنوعة للفن والثقافة والتسوق، ويُبنى المسار بحسب نقاط الوصول والتنقل.'],
      ['أوروبا الوسطى','خيارات ممتازة لرحلات المدن المتقاربة والقطارات بحسب البرنامج.'],
      ['أوروبا الشرقية','مدن تاريخية وطبيعة وتجارب مختلفة ويمكن دمج بعضها في رحلة واحدة.'],
      ['جنوب أوروبا','مدن ساحلية وثقافة وطعام، وتناسب الرحلات الموسمية والكروز.'],
      ['رحلات القطارات','مناسبة لمسارات معينة بين المدن القريبة وتقلل الحاجة إلى الطيران الداخلي.'],
      ['كروز أوروبا','خيار مختلف يجمع عدة موانئ مع إقامة رئيسية على السفينة.']
    ],
    programs:[
      ['مدينة أو دولتان','أفضل للرحلات القصيرة حتى تستفيد من وقتك بدل كثرة التنقل.'],
      ['مسار متعدد المدن','نرتب المدن المتقاربة ونحدد وسيلة التنقل الأنسب لكل قطاع.'],
      ['كروز + إقامة','يمكن إضافة ليالٍ قبل أو بعد الكروز في مدينة الانطلاق أو الوصول.']
    ],
    activities:[
      ['جولات المدن','معالم وأحياء وأسواق وتجارب محلية حسب كل مدينة.'],
      ['الطبيعة والريف','إضافة مناطق خارج المدن لمن يرغب في توازن بين المدينة والطبيعة.'],
      ['القطارات والمناظر','تجربة عملية وجميلة في المسارات المناسبة بين المدن الأوروبية.'],
      ['الكروز','رحلات بحرية بمسارات مختلفة حسب الموسم وشركة الرحلة وميناء الانطلاق.']
    ],
    faq:[
      ['ما أفضل دول أوروبا للسياحة؟','الأفضل يعتمد على الموسم وعدد الأيام ونوع الرحلة؛ لذلك نرشح المسار بعد معرفة اهتماماتك وميزانيتك.'],
      ['هل يمكن عمل بكج أوروبا لأكثر من دولة؟','نعم، ونركز على الدول والمدن المتقاربة حتى يكون وقت التنقل منطقيًا.'],
      ['هل ترتبون رحلات كروز أوروبا؟','نعم، ويمكن ترتيب الكروز مع إقامة قبل أو بعد الرحلة حسب ميناء الانطلاق.'],
      ['كم مدينة مناسبة لرحلة قصيرة؟','كلما كانت الرحلة أقصر كان الأفضل تقليل المدن. نحدد العدد بعد حساب أوقات الوصول والتنقل الفعلية.'],
      ['هل يمكن تخصيص البرنامج بالكامل؟','نعم، الوجهات والفنادق ووسائل التنقل والجولات قابلة للتخصيص حسب الرحلة.'],
      ['هل البكج يشمل الطيران؟','بحسب العرض المختار، وتكون جميع الخدمات المشمولة موضحة قبل التأكيد.']
    ]
  }
];

const bySlug = Object.fromEntries(destinations.map(d => [d.slug,d]));

function allHtml(dir) {
  const result=[];
  if (!fs.existsSync(dir)) return result;
  for (const e of fs.readdirSync(dir,{withFileTypes:true})) {
    const p=path.join(dir,e.name);
    if (e.isDirectory()) result.push(...allHtml(p));
    else if (e.isFile() && e.name.endsWith('.html')) result.push(p);
  }
  return result;
}

function destinationLinks() {
  return destinations.map(d => `<a href="/${d.slug}/"><span>${h(d.name)}</span><small>اكتشف الوجهة</small></a>`).join('');
}

const nav = `<nav class="navlinks navlinks-unified" aria-label="التنقل الرئيسي"><a href="/">الرئيسية</a><a href="/about/">من نحن</a><details class="nav-dropdown"><summary>الوجهات <span aria-hidden="true">⌄</span></summary><div class="nav-dropdown-menu dest-dropdown-menu">${destinationLinks()}</div></details><a href="/#services">الخدمات</a><details class="nav-dropdown branch-dropdown"><summary>الفروع <span aria-hidden="true">⌄</span></summary><div class="nav-dropdown-menu"><a href="/makkah-office/"><span>مكة المكرمة</span><small>مكتب إطلالة</small></a><a href="/madina-office/"><span>المدينة المنورة</span><small>مكتب إطلالة</small></a></div></details><a href="/articles/">المقالات</a><a href="/#contact">تواصل معنا</a></nav>`;

function removeFaqSchema(html) {
  return html.replace(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g,(m,body)=>body.includes('FAQPage')? '':m);
}

function schema(d) {
  return {
    '@context':'https://schema.org',
    '@graph':[
      {'@type':'TouristDestination',name:d.name,url:`${SITE}/${d.slug}/`,description:d.meta},
      {'@type':'FAQPage',mainEntity:d.faq.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))}
    ]
  };
}

function quickCards(d) {
  return d.quick.map(([t,p])=>`<div><strong>${h(t)}</strong><span>${h(p)}</span></div>`).join('');
}
function cityCards(d) {
  return d.cities.map(([t,p],i)=>`<article class="ud-city-card"><span>${String(i+1).padStart(2,'0')}</span><h3>${h(t)}</h3><p>${h(p)}</p></article>`).join('');
}
function programCards(d) {
  return d.programs.map(([t,p],i)=>`<article class="ud-program-card"><div class="ud-program-num">0${i+1}</div><h3>${h(t)}</h3><p>${h(p)}</p><a href="/#contact">اطلب برنامجًا مشابهًا</a></article>`).join('');
}
function activityCards(d) {
  return d.activities.map(([t,p])=>`<article><span class="ud-dot"></span><div><h3>${h(t)}</h3><p>${h(p)}</p></div></article>`).join('');
}
function faqCards(d) {
  return d.faq.map(([q,a])=>`<details><summary>${h(q)}</summary><p>${h(a)}</p></details>`).join('');
}

function main(d) {
  return `<main id="main" class="destination-unified" data-unified-destination="${h(d.slug)}">
  <section class="ud-hero">
    <img class="ud-hero-img" src="${d.hero}" width="1920" height="900" fetchpriority="high" decoding="async" alt="السياحة في ${h(d.name)} مع إطلالة">
    <div class="ud-hero-shade"></div>
    <div class="container ud-hero-content">
      <span class="ud-eyebrow">${h(d.eyebrow)}</span>
      <h1>${h(d.h1)}</h1>
      <p>${h(d.lead)}</p>
      <div class="ud-hero-actions"><a class="gradient-btn" href="/#contact">اطلب برنامجك</a><a class="ghost-btn" data-track="whatsapp" href="${wa(`مرحباً إطلالة، أبغى عرض ${d.name}`)}">واتساب</a></div>
    </div>
  </section>
  <nav class="ud-anchor-nav" aria-label="محتوى الصفحة"><div class="container"><a href="#overview">عن الوجهة</a><a href="#places">المدن والمناطق</a><a href="#programs">أفكار البرامج</a><a href="#activities">التجارب</a><a href="#faq">الأسئلة الشائعة</a></div></nav>
  <section class="ud-quick"><div class="container">${quickCards(d)}</div></section>
  <section class="ud-section" id="overview"><div class="container ud-intro-grid"><div class="ud-copy"><span class="mini-title">خطط رحلتك بشكل أوضح</span><h2>${h(d.introTitle)}</h2>${d.intro.map(p=>`<p>${h(p)}</p>`).join('')}</div><aside class="ud-plan-box"><span>وش نرتّب لك؟</span><ul><li>اختيار المدن وعدد الليالي</li><li>فنادق تناسب نوع الرحلة</li><li>انتقالات وجولات حسب المسار</li><li>عرض واضح قبل تأكيد الحجز</li></ul><a data-track="whatsapp" href="${wa(`مرحباً إطلالة، أبغى مستشار يساعدني في تخطيط رحلة ${d.name}`)}">تحدث مع مستشار</a></aside></div></section>
  <section class="ud-section ud-soft" id="places"><div class="container"><div class="ud-heading"><span>اختيار المناطق</span><h2>أماكن تستحق تكون ضمن برنامج ${h(d.name)}</h2><p>نختار منها حسب مدة السفر والموسم وطبيعة رحلتك، مو لازم تجمعها كلها في برنامج واحد.</p></div><div class="ud-city-grid">${cityCards(d)}</div></div></section>
  <section class="ud-section" id="programs"><div class="container"><div class="ud-heading"><span>أفكار للبرنامج</span><h2>مسارات قابلة للتخصيص، مو بكجات جامدة</h2><p>هذه أمثلة لطريقة توزيع الرحلة، والتفاصيل النهائية تتحدد على تاريخك وعدد المسافرين.</p></div><div class="ud-program-grid">${programCards(d)}</div></div></section>
  <section class="ud-section ud-activities" id="activities"><div class="container ud-activities-grid"><div class="ud-heading"><span>تجارب الوجهة</span><h2>وش ممكن تضيف لرحلتك؟</h2><p>نرتب الأنشطة بشكل يخدم خط السير بدل ما تتحول الرحلة إلى قائمة طويلة من الحجوزات.</p></div><div class="ud-activity-list">${activityCards(d)}</div></div></section>
  <section class="ud-cta"><div class="container"><div><span>جاهز تبدأ التخطيط؟</span><h2>أرسل تاريخ السفر وعدد المسافرين، ونرتّب لك خيارات ${h(d.name)}</h2></div><div><a class="gradient-btn" href="/#contact">اطلب عرضك</a><a class="ud-cta-link" data-track="call" href="tel:${PHONE}">أو اتصل بنا</a></div></div></section>
  <section class="ud-section ud-faq" id="faq"><div class="container"><div class="ud-heading"><span>أسئلة شائعة</span><h2>قبل ما تحجز رحلة ${h(d.name)}</h2><p>إجابات مختصرة على الأسئلة اللي تتكرر أثناء التخطيط.</p></div><div class="ud-faq-grid">${faqCards(d)}</div></div></section>
  </main>`;
}

function patchMeta(html,d) {
  const canonical=`${SITE}/${d.slug}/`;
  html = removeFaqSchema(html)
    .replace(/<title>[\s\S]*?<\/title>/,`<title>${h(d.title)}</title>`)
    .replace(/<meta name="description" content="[^"]*">/,`<meta name="description" content="${h(d.meta)}">`)
    .replace(/<link rel="canonical" href="[^"]*">/,`<link rel="canonical" href="${canonical}">`)
    .replace(/<meta property="og:title" content="[^"]*">/,`<meta property="og:title" content="${h(d.title)}">`)
    .replace(/<meta property="og:description" content="[^"]*">/,`<meta property="og:description" content="${h(d.meta)}">`)
    .replace(/<meta property="og:url" content="[^"]*">/,`<meta property="og:url" content="${canonical}">`)
    .replace(/<meta property="og:image" content="[^"]*">/,`<meta property="og:image" content="${d.hero}">`);
  html = html.replace('</head>',`<script id="unified-destination-schema" type="application/ld+json">${JSON.stringify(schema(d))}</script></head>`);
  return html;
}

function patchGlobal(html) {
  html = html.replace(/<nav class="navlinks(?:\s+navlinks-unified)?" aria-label="التنقل الرئيسي">[\s\S]*?<\/nav>/g,nav);
  const aliases = {'/turkey-2/':'/turkiye/','/georgia-2/':'/georgia/','/malaysia-2/':'/malaysia/','/maldives-2/':'/maldives/','/thailand-2/':'/thailand/'};
  for (const [from,to] of Object.entries(aliases)) html = html.split(`href="${from}"`).join(`href="${to}"`);
  return html;
}

for (const d of destinations) {
  const file=path.join(out,d.slug,'index.html');
  if (!fs.existsSync(file)) continue;
  let html=fs.readFileSync(file,'utf8');
  html=patchGlobal(html).replace(/<main id="main"[\s\S]*?<\/main>/,main(d));
  html=patchMeta(html,d);
  fs.writeFileSync(file,html);
}

for (const d of destinations) {
  for (const alias of d.aliases) {
    const file=path.join(out,alias,'index.html');
    if (!fs.existsSync(file)) continue;
    let html=fs.readFileSync(file,'utf8');
    html=patchGlobal(html);
    const canonical=`${SITE}/${d.slug}/`;
    html=html.replace(/<link rel="canonical" href="[^"]*">/,`<link rel="canonical" href="${canonical}">`)
      .replace(/<meta name="robots" content="[^"]*">/,`<meta name="robots" content="noindex,follow">`)
      .replace(/<title>[\s\S]*?<\/title>/,`<title>انتقل إلى صفحة ${h(d.name)} | إطلالة</title>`)
      .replace('</head>',`<script>location.replace('../${d.slug}/');</script></head>`)
      .replace(/<main id="main"[\s\S]*?<\/main>/,`<main id="main"><section class="ud-redirect"><div class="container"><h1>صفحة ${h(d.name)} أصبحت في رابط واحد</h1><p>جاري تحويلك إلى صفحة ${h(d.name)} الموحدة.</p><a class="gradient-btn" href="/${d.slug}/">فتح الصفحة</a></div></section></main>`);
    fs.writeFileSync(file,html);
  }
}

// Keep the unified navigation and canonical links everywhere, including legal, service, branch and article pages.
for (const file of allHtml(out)) {
  let html=fs.readFileSync(file,'utf8');
  html=patchGlobal(html);
  fs.writeFileSync(file,html);
}

// The old homepage honeymoon card pointed at a second Maldives page; send it to the actual honeymoon service instead.
const homePath=path.join(out,'index.html');
if (fs.existsSync(homePath)) {
  let home=fs.readFileSync(homePath,'utf8');
  home=home.split('href="/maldives-2/"').join('href="/رحلات-الكروز-وشهر-العسل/"');
  fs.writeFileSync(homePath,home);
}

// Remove secondary destination URLs from the sitemap. Canonical destination URLs remain indexed.
const sitemapPath=path.join(out,'sitemap.xml');
if (fs.existsSync(sitemapPath)) {
  let sitemap=fs.readFileSync(sitemapPath,'utf8');
  for (const alias of ['turkey-2','georgia-2','malaysia-2','maldives-2','thailand-2']) {
    const re=new RegExp(`<url><loc>${SITE.replace(/[.*+?^${}()|[\]\\]/g,'\\$&')}/${alias}/<\\/loc>[\\s\\S]*?<\\/url>`,'g');
    sitemap=sitemap.replace(re,'');
  }
  fs.writeFileSync(sitemapPath,sitemap);
}

let css=fs.readFileSync(cssPath,'utf8');
if (!css.includes('unified-destinations-v1')) {
  css += `\n/* unified-destinations-v1 */\n.navlinks-unified{gap:2px!important;align-items:center}.navlinks-unified>a,.nav-dropdown>summary{display:flex;align-items:center;gap:5px;padding:9px 10px;border-radius:9px;color:#26346f;font-weight:800;font-size:.82rem;white-space:nowrap;cursor:pointer;list-style:none;text-decoration:none}.nav-dropdown>summary::-webkit-details-marker{display:none}.nav-dropdown{position:relative}.nav-dropdown>summary:hover,.nav-dropdown[open]>summary,.navlinks-unified>a:hover{background:#f4f6ff;color:#173cad}.nav-dropdown-menu{position:absolute;z-index:100;right:0;top:calc(100% + 10px);min-width:230px;padding:9px;background:#fff;border:1px solid #e3e7f2;border-radius:16px;box-shadow:0 18px 50px rgba(20,34,89,.14);display:grid;gap:3px}.dest-dropdown-menu{grid-template-columns:repeat(2,minmax(190px,1fr));min-width:430px}.nav-dropdown-menu a{display:flex!important;flex-direction:column;align-items:flex-start!important;gap:1px;padding:10px 11px!important;border-radius:10px!important;color:#23316d!important;text-decoration:none}.nav-dropdown-menu a:hover{background:#f5f7ff}.nav-dropdown-menu a span{font-weight:900}.nav-dropdown-menu a small{color:#8991a8;font-size:.68rem}.destination-unified{background:#fff;color:#1b285d}.ud-hero{min-height:510px;position:relative;overflow:hidden;display:flex;align-items:center;color:#fff;background:#0e266f}.ud-hero-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover}.ud-hero-shade{position:absolute;inset:0;background:linear-gradient(270deg,rgba(7,20,64,.96) 0%,rgba(10,32,94,.83) 46%,rgba(8,24,69,.38) 76%,rgba(5,16,45,.16) 100%)}.ud-hero-content{position:relative;z-index:2;padding-top:70px;padding-bottom:70px}.ud-eyebrow{display:inline-flex;padding:7px 11px;border:1px solid rgba(255,255,255,.22);border-radius:999px;background:rgba(255,255,255,.09);font-size:.75rem;font-weight:900;color:#d9f5ff}.ud-hero h1{max-width:820px;margin:13px 0 14px;color:#fff;font-size:clamp(2.4rem,5vw,4.25rem);line-height:1.28;letter-spacing:-.02em;text-shadow:0 4px 24px rgba(0,0,0,.22)}.ud-hero p{max-width:720px;margin:0;color:rgba(255,255,255,.91);font-size:1rem;line-height:1.95}.ud-hero-actions{display:flex;gap:10px;flex-wrap:wrap;margin-top:24px}.ud-anchor-nav{position:sticky;top:74px;z-index:20;background:rgba(255,255,255,.94);backdrop-filter:blur(12px);border-bottom:1px solid #e9ecf5}.ud-anchor-nav .container{display:flex;gap:4px;overflow:auto;scrollbar-width:none}.ud-anchor-nav a{padding:13px 15px;color:#5f6985;font-weight:800;font-size:.78rem;white-space:nowrap}.ud-anchor-nav a:hover{color:#173cad;background:#f6f8ff}.ud-quick{background:#fff;border-bottom:1px solid #edf0f6}.ud-quick .container{display:grid;grid-template-columns:repeat(4,minmax(0,1fr))}.ud-quick .container>div{padding:20px 24px;border-left:1px solid #edf0f6}.ud-quick .container>div:last-child{border-left:0}.ud-quick strong,.ud-quick span{display:block}.ud-quick strong{font-size:.94rem;color:#18368f;margin-bottom:4px}.ud-quick span{font-size:.78rem;color:#7c859c;line-height:1.6}.ud-section{padding:64px 0;scroll-margin-top:140px}.ud-soft{background:#f7f9fd}.ud-intro-grid{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(300px,.7fr);gap:40px;align-items:start}.ud-copy h2,.ud-heading h2{margin:7px 0 15px;color:#17265f;font-size:clamp(1.7rem,3vw,2.45rem);line-height:1.5}.ud-copy p{margin:0;color:#59647f;font-size:.97rem;line-height:2.05}.ud-copy p+p{margin-top:13px}.ud-plan-box{padding:26px;border:1px solid #e2e7f3;border-radius:22px;background:#fff;box-shadow:0 16px 46px rgba(25,39,92,.06)}.ud-plan-box>span{display:block;font-size:1.1rem;font-weight:900;color:#17368e;margin-bottom:14px}.ud-plan-box ul{display:grid;gap:10px;margin:0 0 20px;padding:0;list-style:none}.ud-plan-box li{position:relative;padding-right:22px;color:#4e5a78;line-height:1.7;font-size:.88rem}.ud-plan-box li:before{content:'✓';position:absolute;right:0;color:#1b7bc7;font-weight:900}.ud-plan-box a{display:flex;justify-content:center;padding:11px 14px;border-radius:11px;background:#eef4ff;color:#173da9;font-weight:900;font-size:.82rem}.ud-heading{max-width:760px;margin-bottom:28px}.ud-heading>span{color:#4563cc;font-weight:900;font-size:.76rem}.ud-heading p{margin:0;color:#69738d;line-height:1.9;font-size:.9rem}.ud-city-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:14px}.ud-city-card{position:relative;min-height:190px;padding:23px;border:1px solid #e3e8f2;border-radius:20px;background:#fff;overflow:hidden}.ud-city-card>span{position:absolute;left:16px;top:13px;color:#e0e6f5;font-size:2rem;font-weight:900}.ud-city-card h3{position:relative;margin:28px 0 8px;color:#1a2d74;font-size:1.05rem}.ud-city-card p{position:relative;margin:0;color:#68728b;font-size:.85rem;line-height:1.85}.ud-program-grid{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:15px}.ud-program-card{padding:25px;border-radius:22px;background:linear-gradient(145deg,#112d91,#243dab);color:#fff;box-shadow:0 16px 38px rgba(18,45,145,.16)}.ud-program-num{font-size:.72rem;color:#9fddff;font-weight:900}.ud-program-card h3{margin:10px 0 8px;color:#fff;font-size:1.1rem}.ud-program-card p{min-height:76px;margin:0;color:rgba(255,255,255,.83);font-size:.84rem;line-height:1.85}.ud-program-card a{display:inline-flex;margin-top:17px;color:#fff;font-size:.78rem;font-weight:900;border-bottom:1px solid rgba(255,255,255,.4)}.ud-activities{background:#fff}.ud-activities-grid{display:grid;grid-template-columns:.75fr 1.25fr;gap:48px;align-items:start}.ud-activity-list{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.ud-activity-list article{display:flex;gap:13px;padding:20px;border:1px solid #e4e8f2;border-radius:17px;background:#fbfcff}.ud-dot{width:10px;height:10px;border-radius:50%;background:linear-gradient(135deg,#1bb4eb,#1335ae);flex:0 0 10px;margin-top:7px}.ud-activity-list h3{margin:0 0 6px;color:#1d327f;font-size:.98rem}.ud-activity-list p{margin:0;color:#69738d;font-size:.82rem;line-height:1.8}.ud-cta{padding:36px 0;background:linear-gradient(120deg,#102d8f,#293fb2 62%,#8b246e);color:#fff}.ud-cta .container{display:flex;justify-content:space-between;align-items:center;gap:30px}.ud-cta span{font-size:.76rem;color:#a9e8ff;font-weight:900}.ud-cta h2{max-width:760px;margin:6px 0 0;color:#fff;font-size:clamp(1.35rem,2.6vw,2rem);line-height:1.55}.ud-cta>div>div:last-child{display:flex;align-items:center;gap:15px;flex:0 0 auto}.ud-cta-link{color:#fff;font-weight:800;font-size:.82rem}.ud-faq{background:#f7f9fd}.ud-faq-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px;align-items:start}.ud-faq-grid details{background:#fff;border:1px solid #e2e7f2;border-radius:15px;padding:0 18px;box-shadow:0 5px 18px rgba(24,39,93,.03)}.ud-faq-grid summary{cursor:pointer;padding:16px 26px 16px 0;color:#1c307b;font-size:.9rem;font-weight:900;line-height:1.65;position:relative;list-style:none}.ud-faq-grid summary::-webkit-details-marker{display:none}.ud-faq-grid summary:before{content:'+';position:absolute;right:0;top:14px;width:20px;height:20px;display:grid;place-items:center;border-radius:7px;background:#edf3ff;color:#2041af}.ud-faq-grid details[open] summary:before{content:'−'}.ud-faq-grid details p{margin:0;padding:0 26px 17px 0;color:#66718b;font-size:.82rem;line-height:1.85}.ud-redirect{padding:100px 0;text-align:center}.ud-redirect h1{color:#17265f}.destination-unified .ud-section,.destination-unified .ud-cta{content-visibility:auto;contain-intrinsic-size:700px}\n@media(max-width:1100px){.navlinks-unified>a,.nav-dropdown>summary{padding:8px 7px;font-size:.75rem}.dest-dropdown-menu{min-width:390px}.ud-city-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:900px){.navlinks-unified{flex-wrap:wrap;justify-content:center}.nav-dropdown-menu{position:fixed;right:16px;left:16px;top:auto;min-width:0}.dest-dropdown-menu{grid-template-columns:repeat(2,minmax(0,1fr));min-width:0}.ud-hero{min-height:470px}.ud-hero-shade{background:linear-gradient(0deg,rgba(6,18,59,.96),rgba(10,32,92,.55) 68%,rgba(8,24,64,.18))}.ud-hero-content{padding-top:120px;padding-bottom:48px;align-self:flex-end}.ud-quick .container{grid-template-columns:repeat(2,minmax(0,1fr))}.ud-quick .container>div{border-bottom:1px solid #edf0f6}.ud-intro-grid,.ud-activities-grid{grid-template-columns:1fr;gap:26px}.ud-program-grid{grid-template-columns:1fr}.ud-program-card p{min-height:0}.ud-cta .container{align-items:flex-start;flex-direction:column}.ud-cta>div>div:last-child{width:100%;justify-content:flex-start}}@media(max-width:640px){.navlinks-unified{display:flex!important;gap:2px!important}.navlinks-unified>a,.nav-dropdown>summary{font-size:.72rem;padding:8px}.dest-dropdown-menu{grid-template-columns:1fr;max-height:60vh;overflow:auto}.ud-hero{min-height:500px}.ud-hero h1{font-size:2.25rem}.ud-hero p{font-size:.9rem;line-height:1.9}.ud-anchor-nav{top:68px}.ud-anchor-nav a{padding:11px 12px;font-size:.72rem}.ud-quick .container>div{padding:16px 14px}.ud-section{padding:42px 0}.ud-intro-grid{gap:22px}.ud-plan-box{padding:20px;border-radius:17px}.ud-city-grid{grid-template-columns:1fr;gap:10px}.ud-city-card{min-height:0;padding:20px}.ud-city-card h3{margin-top:21px}.ud-program-card{padding:21px;border-radius:18px}.ud-activity-list{grid-template-columns:1fr}.ud-activities-grid{gap:16px}.ud-cta{padding:28px 0}.ud-cta>div>div:last-child{display:flex;flex-wrap:wrap}.ud-faq-grid{grid-template-columns:1fr}.ud-faq-grid summary{font-size:.85rem}.ud-heading{margin-bottom:20px}}\n`;
  fs.writeFileSync(cssPath,css);
}

console.log('Unified destination pages, canonicalized legacy pairs, rebuilt dropdown navigation and compact two-column FAQs.');
