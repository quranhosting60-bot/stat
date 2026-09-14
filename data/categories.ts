export type CategorySlug =
  | "business-stationery"
  | "marketing-print"
  | "large-format"
  | "packaging-labels"
  | "promotional-gifts"
  | "branded-apparel";

export interface Category {
  slug: CategorySlug;
  name: string;
  tagline: string;
  description: string;
  icon: CategorySlug;
  photo: string;
  turnaround: string;
}

export const categories: Category[] = [
  {
    slug: "business-stationery",
    photo: "/images/categories/business-stationery.jpg",
    name: "Business & Stationery",
    tagline: "The paper that shakes hands for you",
    description:
      "Business cards, letterheads, envelopes and notepads finished on premium stock — the first impression, printed right.",
    icon: "business-stationery",
    turnaround: "2–3 working days",
  },
  {
    slug: "marketing-print",
    photo: "/images/categories/marketing-print.jpg",
    name: "Marketing & Print Ads",
    tagline: "Ideas that leave the screen",
    description:
      "Flyers, brochures, posters and catalogues built to move people from curious to convinced.",
    icon: "marketing-print",
    turnaround: "2–4 working days",
  },
  {
    slug: "large-format",
    photo: "/images/categories/large-format.jpg",
    name: "Large Format",
    tagline: "Made to be seen from the street",
    description:
      "Roll-up banners, mesh banners, vehicle wraps and window graphics for spaces that need scale.",
    icon: "large-format",
    turnaround: "3–5 working days",
  },
  {
    slug: "packaging-labels",
    photo: "/images/categories/packaging-labels.jpg",
    name: "Packaging & Labels",
    tagline: "The box is part of the product",
    description:
      "Custom boxes, mailers, stickers and product labels that hold up in shipping and stand out on a shelf.",
    icon: "packaging-labels",
    turnaround: "4–6 working days",
  },
  {
    slug: "promotional-gifts",
    photo: "/images/categories/promotional-gifts.jpg",
    name: "Promotional & Corporate Gifts",
    tagline: "Branding people actually keep",
    description:
      "Pens, mugs, notebooks and desk gifts imprinted with your logo — quiet marketing that sits on a desk for years.",
    icon: "promotional-gifts",
    turnaround: "3–5 working days",
  },
  {
    slug: "branded-apparel",
    photo: "/images/categories/branded-apparel.jpg",
    name: "Branded Apparel",
    tagline: "Your team, dressed on brand",
    description:
      "Embroidered and printed polos, t-shirts and workwear for staff, events and giveaways.",
    icon: "branded-apparel",
    turnaround: "5–7 working days",
  },
];

export function getCategory(slug: string) {
  return categories.find((c) => c.slug === slug);
}
