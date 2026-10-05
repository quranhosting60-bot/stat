export type CategorySlug =
  | "business-stationery"
  | "marketing-print"
  | "large-format"
  | "packaging-labels"
  | "promotional-gifts"
  | "branded-apparel"
  | "signage-displays";

export interface Category {
  slug: CategorySlug;
  name: string;
  nameAr: string;
  tagline: string;
  taglineAr: string;
  description: string;
  descriptionAr: string;
  icon: CategorySlug;
  photo: string;
  turnaround: string;
  turnaroundAr: string;
}

export const categories: Category[] = [
  {
    slug: "business-stationery",
    photo: "/images/categories/business-stationery.webp",
    name: "Business & Stationery",
    nameAr: "الأعمال والقرطاسية",
    tagline: "The paper that shakes hands for you",
    taglineAr: "الورق الذي يصافح عنك",
    description:
      "Business cards, letterheads, envelopes and notepads finished on premium stock — the first impression, printed right.",
    descriptionAr:
      "بطاقات أعمال وترويسات وأظرف ومفكرات مطبوعة على ورق فاخر — الانطباع الأول، مطبوعاً بشكل صحيح.",
    icon: "business-stationery",
    turnaround: "2–3 working days",
    turnaroundAr: "٢-٣ أيام عمل",
  },
  {
    slug: "marketing-print",
    photo: "/images/categories/marketing-print.webp",
    name: "Marketing & Print Ads",
    nameAr: "التسويق والإعلانات المطبوعة",
    tagline: "Ideas that leave the screen",
    taglineAr: "أفكار تغادر الشاشة",
    description:
      "Flyers, brochures, posters and catalogues built to move people from curious to convinced.",
    descriptionAr: "منشورات وكتيبات وملصقات وكتالوجات مصممة لتحويل الفضول إلى قناعة.",
    icon: "marketing-print",
    turnaround: "2–4 working days",
    turnaroundAr: "٢-٤ أيام عمل",
  },
  {
    slug: "large-format",
    photo: "/images/categories/large-format.webp",
    name: "Large Format",
    nameAr: "الطباعة الكبيرة",
    tagline: "Made to be seen from the street",
    taglineAr: "صُنعت لتُرى من الشارع",
    description:
      "Make your brand impossible to miss with high-impact large-format printing — banners, posters, wall graphics, wallpapers, roll-up displays, pop-up systems and other large-scale visual solutions.",
    descriptionAr: "اجعل علامتك التجارية لا تُنسى مع طباعة الأحجام الكبيرة: بانرات وملصقات وجداريات وورق جدران ورول أب وأنظمة بوب أب وحلول بصرية ضخمة أخرى.",
    icon: "large-format",
    turnaround: "3–5 working days",
    turnaroundAr: "٣-٥ أيام عمل",
  },
  {
    slug: "packaging-labels",
    photo: "/images/categories/packaging-labels.webp",
    name: "Packaging & Labels",
    nameAr: "التغليف والملصقات",
    tagline: "The box is part of the product",
    taglineAr: "الصندوق جزء من المنتج",
    description:
      "Packaging is more than protection — it is part of your brand experience. Customised packaging solutions for restaurants, retailers, e-commerce businesses, gifts and corporate products.",
    descriptionAr: "التغليف أكثر من مجرد حماية — إنه جزء من تجربة علامتك التجارية. حلول تغليف مخصصة للمطاعم وتجار التجزئة والتجارة الإلكترونية والهدايا والمنتجات المؤسسية.",
    icon: "packaging-labels",
    turnaround: "4–6 working days",
    turnaroundAr: "٤-٦ أيام عمل",
  },
  {
    slug: "promotional-gifts",
    photo: "/images/categories/promotional-gifts.webp",
    name: "Promotional & Corporate Gifts",
    nameAr: "الهدايا الترويجية والمؤسسية",
    tagline: "Branding people actually keep",
    taglineAr: "علامة تجارية يحتفظ بها الناس فعلاً",
    description:
      "Put your brand into everyday life with customised promotional products. From pens and mugs to power banks, bags and corporate gift sets — memorable branded merchandise.",
    descriptionAr: "أدخل علامتك التجارية في الحياة اليومية بمنتجات ترويجية مخصصة، من الأقلام والأكواب إلى الشواحن المحمولة والحقائب وأطقم الهدايا المؤسسية.",
    icon: "promotional-gifts",
    turnaround: "3–5 working days",
    turnaroundAr: "٣-٥ أيام عمل",
  },
  {
    slug: "branded-apparel",
    photo: "/images/categories/branded-apparel.webp",
    name: "Branded Apparel",
    nameAr: "الأزياء المطبوعة",
    tagline: "Your team, dressed on brand",
    taglineAr: "فريقك، بزي يعكس هويتك",
    description:
      "Turn your team and customers into brand ambassadors with customised apparel and wearable promotional products.",
    descriptionAr: "حوّل فريقك وعملاءك إلى سفراء لعلامتك التجارية بملابس ومنتجات قابلة للارتداء مخصصة.",
    icon: "branded-apparel",
    turnaround: "5–7 working days",
    turnaroundAr: "٥-٧ أيام عمل",
  },
  {
    slug: "signage-displays",
    photo: "/images/categories/signage-displays.webp",
    name: "Signage & Displays",
    nameAr: "اللافتات وواجهات العرض",
    tagline: "Retail spaces that guide themselves",
    taglineAr: "مساحات بيع تُرشد نفسها",
    description:
      "Make your business easy to find and impossible to overlook with professionally produced signage and branding solutions.",
    descriptionAr: "اجعل نشاطك التجاري سهل الوصول إليه ولا يمكن تجاهله مع حلول لافتات وهوية بصرية احترافية.",
    icon: "signage-displays",
    turnaround: "4–6 working days",
    turnaroundAr: "٤-٦ أيام عمل",
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
