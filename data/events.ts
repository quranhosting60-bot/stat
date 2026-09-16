export interface EventItem {
  slug: string;
  title: string;
  titleAr: string;
  description: string;
  descriptionAr: string;
  date: string;
  location: string;
  locationAr: string;
  type: "exhibition" | "workshop" | "open-day";
}

export const events: EventItem[] = [
  {
    slug: "riyadh-print-expo-2026",
    title: "Riyadh Print & Packaging Expo",
    titleAr: "معرض الرياض للطباعة والتغليف",
    description:
      "Visit our booth to see live demos of large format printing and get same-day quotes on packaging.",
    descriptionAr: "زوروا جناحنا لمشاهدة عروض حية للطباعة الكبيرة والحصول على عروض أسعار فورية للتغليف.",
    date: "2026-10-14",
    location: "Riyadh International Convention Centre",
    locationAr: "مركز الرياض الدولي للمؤتمرات",
    type: "exhibition",
  },
  {
    slug: "packaging-design-workshop",
    title: "Packaging Design Workshop for Small Brands",
    titleAr: "ورشة تصميم التغليف للعلامات التجارية الصغيرة",
    description:
      "A hands-on session on choosing box styles, materials and finishes for a new product line.",
    descriptionAr: "جلسة تطبيقية حول اختيار أنماط الصناديق والمواد والتشطيبات لخط منتجات جديد.",
    date: "2026-11-05",
    location: "Smart Printing Head Office, Riyadh",
    locationAr: "المكتب الرئيسي لسمارت برنتنق، الرياض",
    type: "workshop",
  },
  {
    slug: "jeddah-branch-open-day",
    title: "Jeddah Branch Open Day",
    titleAr: "يوم مفتوح في فرع جدة",
    description:
      "Tour the new Jeddah production floor and meet the local account team over coffee.",
    descriptionAr: "جولة في خط الإنتاج الجديد بجدة ولقاء فريق الحسابات المحلي.",
    date: "2026-09-28",
    location: "Smart Printing Jeddah Branch",
    locationAr: "فرع سمارت برنتنق في جدة",
    type: "open-day",
  },
];
