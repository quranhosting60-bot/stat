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
    photo: "/images/categories/business-stationery.jpg",
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
    photo: "/images/categories/marketing-print.jpg",
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
    photo: "/images/categories/large-format.jpg",
    name: "Large Format",
    nameAr: "الطباعة الكبيرة",
    tagline: "Made to be seen from the street",
    taglineAr: "صُنعت لتُرى من الشارع",
    description:
      "Roll-up banners, mesh banners, vehicle wraps and window graphics for spaces that need scale.",
    descriptionAr: "بانرات قابلة للطي وشبكية وأغلفة مركبات ورسومات نوافذ للمساحات الكبيرة.",
    icon: "large-format",
    turnaround: "3–5 working days",
    turnaroundAr: "٣-٥ أيام عمل",
  },
  {
    slug: "packaging-labels",
    photo: "/images/categories/packaging-labels.jpg",
    name: "Packaging & Labels",
    nameAr: "التغليف والملصقات",
    tagline: "The box is part of the product",
    taglineAr: "الصندوق جزء من المنتج",
    description:
      "Custom boxes, mailers, stickers and product labels that hold up in shipping and stand out on a shelf.",
    descriptionAr: "صناديق ومغلفات وملصقات مخصصة تتحمل الشحن وتبرز على الرف.",
    icon: "packaging-labels",
    turnaround: "4–6 working days",
    turnaroundAr: "٤-٦ أيام عمل",
  },
  {
    slug: "promotional-gifts",
    photo: "/images/categories/promotional-gifts.jpg",
    name: "Promotional & Corporate Gifts",
    nameAr: "الهدايا الترويجية والمؤسسية",
    tagline: "Branding people actually keep",
    taglineAr: "علامة تجارية يحتفظ بها الناس فعلاً",
    description:
      "Pens, mugs, notebooks and desk gifts imprinted with your logo — quiet marketing that sits on a desk for years.",
    descriptionAr: "أقلام وأكواب ومفكرات وهدايا مكتبية بشعارك — تسويق هادئ يبقى على المكتب لسنوات.",
    icon: "promotional-gifts",
    turnaround: "3–5 working days",
    turnaroundAr: "٣-٥ أيام عمل",
  },
  {
    slug: "branded-apparel",
    photo: "/images/categories/branded-apparel.jpg",
    name: "Branded Apparel",
    nameAr: "الأزياء المطبوعة",
    tagline: "Your team, dressed on brand",
    taglineAr: "فريقك، بزي يعكس هويتك",
    description:
      "Embroidered and printed polos, t-shirts and workwear for staff, events and giveaways.",
    descriptionAr: "بولو وتيشيرتات وملابس عمل مطرزة ومطبوعة للموظفين والفعاليات والهدايا.",
    icon: "branded-apparel",
    turnaround: "5–7 working days",
    turnaroundAr: "٥-٧ أيام عمل",
  },
  {
    slug: "signage-displays",
    photo: "/images/categories/signage-displays.jpg",
    name: "Signage & Displays",
    nameAr: "اللافتات وواجهات العرض",
    tagline: "Retail spaces that guide themselves",
    taglineAr: "مساحات بيع تُرشد نفسها",
    description:
      "Acrylic and light-box signage, standees, shelf talkers and counter displays for stores, offices and events.",
    descriptionAr: "لافتات أكريليك وصناديق إضاءة وستاندات ولافتات رفوف وعروض كاونتر للمتاجر والمكاتب.",
    icon: "signage-displays",
    turnaround: "4–6 working days",
    turnaroundAr: "٤-٦ أيام عمل",
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
