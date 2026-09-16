export interface BlogPost {
  slug: string;
  title: string;
  titleAr: string;
  excerpt: string;
  excerptAr: string;
  content: string[];
  contentAr: string[];
  date: string;
  category: string;
}

export const blogPosts: BlogPost[] = [
  {
    slug: "choosing-right-paper-stock",
    title: "How to Choose the Right Paper Stock for Business Cards",
    titleAr: "كيف تختار نوع الورق المناسب لبطاقات الأعمال",
    excerpt:
      "Weight, finish and texture all change how a business card feels in someone's hand — here's how to pick.",
    excerptAr: "الوزن والتشطيب والملمس كلها تؤثر على شعور بطاقة العمل في اليد — إليك كيفية الاختيار.",
    date: "2026-08-02",
    category: "Stationery",
    content: [
      "The paper stock behind a business card does more work than most people realise. A 300gsm card feels noticeably more solid than a standard 250gsm sheet, and that weight is often the first thing someone notices before they've read a word.",
      "Matte lamination gives a soft, premium touch and hides fingerprints well, while gloss lamination makes colours pop and photography look sharper. Uncoated stock, on the other hand, is ideal if you want a card that can be written on.",
      "For most businesses, 350gsm with matte lamination hits the balance of durability, feel and cost that works across almost every industry.",
    ],
    contentAr: [
      "نوع الورق خلف بطاقة العمل يقوم بدور أكبر مما يتخيله معظم الناس. البطاقة بوزن ٣٠٠ جرام تشعر بصلابة أكبر بشكل ملحوظ من الورق العادي بوزن ٢٥٠ جرام.",
      "التغليف المطفي يمنح لمسة ناعمة وفاخرة ويخفي بصمات الأصابع جيداً، بينما التغليف اللامع يجعل الألوان أكثر حيوية والصور أوضح.",
      "لمعظم الشركات، ٣٥٠ جرام مع تغليف مطفي يحقق التوازن الأمثل بين المتانة والملمس والتكلفة.",
    ],
  },
  {
    slug: "packaging-unboxing-experience",
    title: "Why Packaging Is Part of the Product, Not an Afterthought",
    titleAr: "لماذا التغليف جزء من المنتج وليس فكرة لاحقة",
    excerpt:
      "Custom boxes and mailers shape how a customer feels about your brand before they've even used what's inside.",
    excerptAr: "الصناديق والمغلفات المخصصة تشكل شعور العميل تجاه علامتك التجارية قبل استخدام المنتج نفسه.",
    date: "2026-07-18",
    category: "Packaging",
    content: [
      "Unboxing has become part of the product experience, especially for e-commerce brands. A plain brown box says one thing about a business; a branded mailer with tissue paper and a thank-you card says another.",
      "The good news is that a meaningful packaging upgrade doesn't have to mean a large minimum order. Printed tape and a branded thank-you insert are two of the lowest-cost ways to lift the experience without redesigning your whole box.",
    ],
    contentAr: [
      "أصبحت تجربة فتح الطرد جزءاً من تجربة المنتج، خاصة لعلامات التجارة الإلكترونية. الصندوق البني العادي يقول شيئاً عن العمل، بينما المغلف المصمم بورق تغليف وبطاقة شكر يقول شيئاً مختلفاً تماماً.",
      "الخبر الجيد أن تحسين التغليف لا يتطلب طلبية كبيرة بالضرورة. شريط التغليف المطبوع وبطاقة الشكر من أرخص الطرق لتحسين التجربة دون إعادة تصميم الصندوق بالكامل.",
    ],
  },
  {
    slug: "large-format-outdoor-durability",
    title: "What Makes a Banner Survive Six Months Outdoors",
    titleAr: "ما الذي يجعل البانر يصمد ستة أشهر في الهواء الطلق",
    excerpt:
      "Material choice and finishing determine whether outdoor signage fades in six weeks or holds up for a season.",
    excerptAr: "اختيار المادة والتشطيب يحددان إن كانت اللافتة الخارجية تبهت خلال ستة أسابيع أو تصمد لموسم كامل.",
    date: "2026-06-30",
    category: "Large Format",
    content: [
      "Mesh banners are built for wind, not just weather — the perforated material lets air pass through instead of catching it like a sail, which is why they're the standard choice for fencing and building wraps.",
      "For anything expected to stay up for more than a few weeks, UV-resistant ink is non-negotiable. Standard ink will visibly fade within a month of direct Saudi sun exposure, while UV-rated ink is formulated to hold its colour for significantly longer.",
    ],
    contentAr: [
      "البانرات الشبكية مصممة لمقاومة الرياح وليس فقط الطقس — المادة المثقبة تسمح بمرور الهواء بدلاً من الإمساك به كالشراع، لهذا هي الخيار المعتمد للأسوار وأغلفة المباني.",
      "لأي شيء متوقع بقاؤه لأكثر من بضعة أسابيع، الحبر المقاوم للأشعة فوق البنفسجية أمر ضروري. الحبر العادي يبهت بشكل ملحوظ خلال شهر تحت شمس السعودية المباشرة.",
    ],
  },
];

export function getBlogPost(slug: string) {
  return blogPosts.find((p) => p.slug === slug);
}
