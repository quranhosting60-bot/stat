import { CategorySlug } from "./categories";

export interface ProductOption {
  name: string;
  choices: { label: string; priceModifier: number }[];
}

export interface Product {
  slug: string;
  category: CategorySlug;
  name: string;
  shortDescription: string;
  description: string;
  basePrice: number;
  unit: string;
  minQty: number;
  photo?: string;
  options: ProductOption[];
  specs: { label: string; value: string }[];
}

export const products: Product[] = [
  // Business & Stationery
  {
    slug: "premium-business-cards",
    photo: "/images/products/premium-business-cards.jpg",
    category: "business-stationery",
    name: "Premium Business Cards",
    shortDescription: "350gsm matte or gloss, sharp edge every time.",
    description:
      "Double-sided business cards on heavyweight 350gsm stock. Choose matte, gloss or soft-touch lamination for a finish that survives a wallet.",
    basePrice: 85,
    unit: "per 100 cards",
    minQty: 100,
    options: [
      {
        name: "Finish",
        choices: [
          { label: "Matte lamination", priceModifier: 0 },
          { label: "Gloss lamination", priceModifier: 0 },
          { label: "Soft-touch lamination", priceModifier: 25 },
          { label: "Spot UV", priceModifier: 45 },
        ],
      },
      {
        name: "Corners",
        choices: [
          { label: "Sharp", priceModifier: 0 },
          { label: "Rounded", priceModifier: 10 },
        ],
      },
    ],
    specs: [
      { label: "Stock", value: "350gsm art card" },
      { label: "Size", value: "90 × 50 mm" },
      { label: "Print", value: "Full colour, both sides" },
    ],
  },
  {
    slug: "corporate-letterhead",
    photo: "/images/products/corporate-letterhead.jpg",
    category: "business-stationery",
    name: "Corporate Letterhead",
    shortDescription: "A4 letterhead on textured bond paper.",
    description:
      "Set the tone before anyone reads a word. Printed on 100gsm bond paper with your logo, address block and brand colours.",
    basePrice: 180,
    unit: "per 500 sheets",
    minQty: 500,
    options: [
      {
        name: "Paper",
        choices: [
          { label: "100gsm bond", priceModifier: 0 },
          { label: "120gsm linen texture", priceModifier: 35 },
        ],
      },
    ],
    specs: [
      { label: "Size", value: "A4 (210 × 297 mm)" },
      { label: "Print", value: "Full colour, single side" },
    ],
  },
  {
    slug: "branded-envelopes",
    photo: "/images/products/branded-envelopes.jpg",
    category: "business-stationery",
    name: "Branded Envelopes",
    shortDescription: "DL and C4 envelopes with logo print.",
    description:
      "Peel-and-seal envelopes printed with your logo and return address, available in DL and C4 sizes for letters and documents.",
    basePrice: 220,
    unit: "per 500 envelopes",
    minQty: 500,
    options: [
      {
        name: "Size",
        choices: [
          { label: "DL (110 × 220 mm)", priceModifier: 0 },
          { label: "C4 (229 × 324 mm)", priceModifier: 60 },
        ],
      },
    ],
    specs: [
      { label: "Paper", value: "100gsm offset" },
      { label: "Seal", value: "Peel and seal strip" },
    ],
  },
  {
    slug: "desk-notepads",
    photo: "/images/products/desk-notepads.jpg",
    category: "business-stationery",
    name: "Branded Notepads",
    shortDescription: "Glue-bound A5 notepads, 50 sheets each.",
    description:
      "A5 notepads glue-bound at the top, header printed with your logo — practical desk branding for meetings and giveaways.",
    basePrice: 12,
    unit: "per notepad",
    minQty: 50,
    options: [
      {
        name: "Cover",
        choices: [
          { label: "No cover", priceModifier: 0 },
          { label: "Card cover", priceModifier: 3 },
        ],
      },
    ],
    specs: [
      { label: "Size", value: "A5, 50 sheets" },
      { label: "Binding", value: "Top glue-bound" },
    ],
  },

  // Marketing & Print Ads
  {
    slug: "tri-fold-brochures",
    photo: "/images/products/tri-fold-brochures.jpg",
    category: "marketing-print",
    name: "Tri-Fold Brochures",
    shortDescription: "A4 tri-fold on gloss art paper.",
    description:
      "Six-panel tri-fold brochures for product ranges, price lists or service overviews. Bright, durable gloss finish.",
    basePrice: 260,
    unit: "per 250 pieces",
    minQty: 250,
    options: [
      {
        name: "Paper weight",
        choices: [
          { label: "150gsm gloss", priceModifier: 0 },
          { label: "200gsm gloss", priceModifier: 40 },
        ],
      },
    ],
    specs: [
      { label: "Size", value: "A4 flat, folds to A5/3" },
      { label: "Print", value: "Full colour, both sides" },
    ],
  },
  {
    slug: "event-flyers",
    photo: "/images/products/event-flyers.jpg",
    category: "marketing-print",
    name: "Event Flyers",
    shortDescription: "A5 flyers for launches, sales and events.",
    description:
      "Fast-turnaround A5 flyers on bright white stock — built for handouts, counters and pop-up promotions.",
    basePrice: 90,
    unit: "per 500 pieces",
    minQty: 500,
    options: [
      {
        name: "Sides",
        choices: [
          { label: "Single side", priceModifier: 0 },
          { label: "Both sides", priceModifier: 30 },
        ],
      },
    ],
    specs: [
      { label: "Size", value: "A5 (148 × 210 mm)" },
      { label: "Paper", value: "170gsm gloss" },
    ],
  },
  {
    slug: "product-catalogues",
    photo: "/images/products/product-catalogues.jpg",
    category: "marketing-print",
    name: "Product Catalogues",
    shortDescription: "Saddle-stitched catalogues, up to 48 pages.",
    description:
      "Multi-page catalogues saddle-stitched and trimmed clean, for showcasing full product or service ranges.",
    basePrice: 950,
    unit: "per 100 copies (24pp)",
    minQty: 100,
    options: [
      {
        name: "Page count",
        choices: [
          { label: "24 pages", priceModifier: 0 },
          { label: "48 pages", priceModifier: 550 },
        ],
      },
    ],
    specs: [
      { label: "Size", value: "A4 portrait" },
      { label: "Binding", value: "Saddle-stitched" },
    ],
  },
  {
    slug: "point-of-sale-posters",
    photo: "/images/products/point-of-sale-posters.jpg",
    category: "marketing-print",
    name: "Point-of-Sale Posters",
    shortDescription: "A2/A3 posters for storefronts and counters.",
    description:
      "Bright, tear-resistant posters sized for windows, counters and in-store display stands.",
    basePrice: 45,
    unit: "per poster",
    minQty: 10,
    options: [
      {
        name: "Size",
        choices: [
          { label: "A3", priceModifier: 0 },
          { label: "A2", priceModifier: 25 },
        ],
      },
    ],
    specs: [
      { label: "Paper", value: "200gsm gloss" },
      { label: "Finish", value: "Matte laminate optional" },
    ],
  },

  // Large Format
  {
    slug: "roll-up-banners",
    photo: "/images/products/roll-up-banners.jpg",
    category: "large-format",
    name: "Roll-Up Banners",
    shortDescription: "85×200cm retractable stand banners.",
    description:
      "Free-standing retractable banners with carry case — set up in under a minute for exhibitions, counters and entrances.",
    basePrice: 220,
    unit: "per banner",
    minQty: 1,
    options: [
      {
        name: "Base",
        choices: [
          { label: "Standard base", priceModifier: 0 },
          { label: "Premium weighted base", priceModifier: 60 },
        ],
      },
    ],
    specs: [
      { label: "Size", value: "85 × 200 cm" },
      { label: "Material", value: "440gsm PVC banner" },
    ],
  },
  {
    slug: "mesh-banners",
    photo: "/images/products/mesh-banners.jpg",
    category: "large-format",
    name: "Mesh Banners",
    shortDescription: "Wind-through mesh for building wraps.",
    description:
      "Perforated mesh banners that let wind pass through — built for scaffolding wraps, building facades and outdoor rigs.",
    basePrice: 45,
    unit: "per m²",
    minQty: 5,
    options: [
      {
        name: "Hemming",
        choices: [
          { label: "Standard hem and eyelets", priceModifier: 0 },
          { label: "Reinforced hem, wind-rated", priceModifier: 12 },
        ],
      },
    ],
    specs: [
      { label: "Material", value: "Perforated mesh PVC" },
      { label: "Finish", value: "Hemmed with eyelets" },
    ],
  },
  {
    slug: "vehicle-wraps",
    photo: "/images/products/vehicle-wraps.jpg",
    category: "large-format",
    name: "Vehicle Wraps",
    shortDescription: "Partial or full wraps for cars and vans.",
    description:
      "Cast vinyl vehicle graphics, from door decals to full wraps, laid out around your vehicle's exact panels.",
    basePrice: 1400,
    unit: "per vehicle (partial)",
    minQty: 1,
    options: [
      {
        name: "Coverage",
        choices: [
          { label: "Partial wrap", priceModifier: 0 },
          { label: "Full wrap", priceModifier: 2200 },
        ],
      },
    ],
    specs: [
      { label: "Material", value: "Cast vinyl, laminated" },
      { label: "Lifespan", value: "5+ years outdoor" },
    ],
  },
  {
    slug: "window-graphics",
    photo: "/images/products/window-graphics.jpg",
    category: "large-format",
    name: "Window Graphics",
    shortDescription: "Perforated or opaque storefront vinyl.",
    description:
      "One-way vision or opaque vinyl for storefront windows — visible from outside, see-through from inside.",
    basePrice: 60,
    unit: "per m²",
    minQty: 2,
    options: [
      {
        name: "Type",
        choices: [
          { label: "One-way vision (perforated)", priceModifier: 0 },
          { label: "Opaque vinyl", priceModifier: -10 },
        ],
      },
    ],
    specs: [
      { label: "Material", value: "Perforated or cast vinyl" },
      { label: "Application", value: "Interior or exterior" },
    ],
  },

  // Packaging & Labels
  {
    slug: "custom-mailer-boxes",
    photo: "/images/products/custom-mailer-boxes.jpg",
    category: "packaging-labels",
    name: "Custom Mailer Boxes",
    shortDescription: "Printed corrugated boxes for shipping.",
    description:
      "Die-cut mailer boxes printed inside and out, sized to your product to cut wasted space and cushion the contents.",
    basePrice: 6.5,
    unit: "per box",
    minQty: 100,
    options: [
      {
        name: "Print",
        choices: [
          { label: "Outside only", priceModifier: 0 },
          { label: "Inside and outside", priceModifier: 1.5 },
        ],
      },
    ],
    specs: [
      { label: "Material", value: "E-flute corrugated board" },
      { label: "Sizing", value: "Custom die-line" },
    ],
  },
  {
    slug: "product-labels",
    photo: "/images/products/product-labels.jpg",
    category: "packaging-labels",
    name: "Product Labels",
    shortDescription: "Roll labels for bottles, jars and packs.",
    description:
      "Waterproof roll labels for cosmetics, food and retail packaging, die-cut to any shape you need.",
    basePrice: 0.35,
    unit: "per label",
    minQty: 500,
    options: [
      {
        name: "Material",
        choices: [
          { label: "Paper, matte", priceModifier: 0 },
          { label: "Waterproof vinyl", priceModifier: 0.1 },
        ],
      },
    ],
    specs: [
      { label: "Finish", value: "Matte or gloss laminate" },
      { label: "Shape", value: "Custom die-cut" },
    ],
  },
  {
    slug: "shipping-tape",
    photo: "/images/products/shipping-tape.jpg",
    category: "packaging-labels",
    name: "Branded Shipping Tape",
    shortDescription: "48mm printed packing tape.",
    description:
      "Reinforced packing tape printed with your logo — a small detail that makes every shipped box look intentional.",
    basePrice: 14,
    unit: "per roll",
    minQty: 36,
    options: [
      {
        name: "Colour count",
        choices: [
          { label: "1 colour print", priceModifier: 0 },
          { label: "2 colour print", priceModifier: 3 },
        ],
      },
    ],
    specs: [
      { label: "Width", value: "48 mm" },
      { label: "Length", value: "100 m per roll" },
    ],
  },
  {
    slug: "gift-boxes",
    photo: "/images/products/gift-boxes.jpg",
    category: "packaging-labels",
    name: "Rigid Gift Boxes",
    shortDescription: "Two-piece rigid boxes with lid.",
    description:
      "Sturdy two-piece rigid boxes for retail gifting and premium unboxing moments, finished in your brand colours.",
    basePrice: 18,
    unit: "per box",
    minQty: 100,
    options: [
      {
        name: "Finish",
        choices: [
          { label: "Matte wrap", priceModifier: 0 },
          { label: "Gloss wrap with foil logo", priceModifier: 6 },
        ],
      },
    ],
    specs: [
      { label: "Construction", value: "Rigid board, two-piece" },
      { label: "Sizing", value: "Custom to product" },
    ],
  },

  // Promotional & Corporate Gifts
  {
    slug: "branded-pens",
    photo: "/images/products/branded-pens.jpg",
    category: "promotional-gifts",
    name: "Branded Pens",
    shortDescription: "Metal or plastic pens, pad-printed logo.",
    description:
      "Reliable everyday pens pad-printed with your logo — one of the highest-mileage giveaways per riyal spent.",
    basePrice: 3.5,
    unit: "per pen",
    minQty: 100,
    options: [
      {
        name: "Body",
        choices: [
          { label: "Plastic", priceModifier: 0 },
          { label: "Metal", priceModifier: 4 },
        ],
      },
    ],
    specs: [
      { label: "Print", value: "1-colour pad print" },
      { label: "Colours", value: "10+ body colours" },
    ],
  },
  {
    slug: "ceramic-mugs",
    photo: "/images/products/ceramic-mugs.jpg",
    category: "promotional-gifts",
    name: "Ceramic Mugs",
    shortDescription: "11oz mugs with full-colour sublimation.",
    description:
      "Dishwasher-safe ceramic mugs printed edge-to-edge with your logo or campaign artwork.",
    basePrice: 16,
    unit: "per mug",
    minQty: 50,
    options: [
      {
        name: "Style",
        choices: [
          { label: "White, standard", priceModifier: 0 },
          { label: "Colour-inside, colour-change", priceModifier: 5 },
        ],
      },
    ],
    specs: [
      { label: "Capacity", value: "11 oz (325 ml)" },
      { label: "Print", value: "Full-colour sublimation" },
    ],
  },
  {
    slug: "branded-notebooks",
    photo: "/images/products/branded-notebooks.jpg",
    category: "promotional-gifts",
    name: "Branded Notebooks",
    shortDescription: "A5 hardcover notebooks, foil-stamped.",
    description:
      "Hardcover A5 notebooks with elastic closure and ribbon, foil-stamped with your logo for a gift that gets used daily.",
    basePrice: 22,
    unit: "per notebook",
    minQty: 50,
    options: [
      {
        name: "Cover",
        choices: [
          { label: "PU leather", priceModifier: 0 },
          { label: "Linen fabric", priceModifier: 5 },
        ],
      },
    ],
    specs: [
      { label: "Size", value: "A5, 160 pages" },
      { label: "Branding", value: "Foil-stamped logo" },
    ],
  },
  {
    slug: "usb-drives",
    photo: "/images/products/usb-drives.jpg",
    category: "promotional-gifts",
    name: "Branded USB Drives",
    shortDescription: "16GB USB drives, laser-etched logo.",
    description:
      "16GB flash drives laser-etched with your logo, packaged in a branded gift box — practical tech gifting for clients.",
    basePrice: 28,
    unit: "per drive",
    minQty: 50,
    options: [
      {
        name: "Capacity",
        choices: [
          { label: "16GB", priceModifier: 0 },
          { label: "32GB", priceModifier: 12 },
        ],
      },
    ],
    specs: [
      { label: "Branding", value: "Laser-etched logo" },
      { label: "Packaging", value: "Branded gift box" },
    ],
  },

  // Branded Apparel
  {
    slug: "embroidered-polos",
    photo: "/images/products/embroidered-polos.jpg",
    category: "branded-apparel",
    name: "Embroidered Polo Shirts",
    shortDescription: "Cotton-piqué polos, embroidered logo.",
    description:
      "Breathable cotton-piqué polos with your logo embroidered on the chest — built for staff uniforms that hold up in the wash.",
    basePrice: 55,
    unit: "per shirt",
    minQty: 20,
    options: [
      {
        name: "Fit",
        choices: [
          { label: "Regular fit", priceModifier: 0 },
          { label: "Slim fit", priceModifier: 0 },
        ],
      },
    ],
    specs: [
      { label: "Fabric", value: "220gsm cotton-piqué" },
      { label: "Branding", value: "Chest embroidery" },
    ],
  },
  {
    slug: "printed-tshirts",
    photo: "/images/products/printed-tshirts.jpg",
    category: "branded-apparel",
    name: "Printed T-Shirts",
    shortDescription: "Cotton tees, screen or DTF printed.",
    description:
      "Soft cotton t-shirts for events and giveaways, printed front and/or back in full colour.",
    basePrice: 32,
    unit: "per shirt",
    minQty: 30,
    options: [
      {
        name: "Print area",
        choices: [
          { label: "Front only", priceModifier: 0 },
          { label: "Front and back", priceModifier: 10 },
        ],
      },
    ],
    specs: [
      { label: "Fabric", value: "180gsm cotton" },
      { label: "Print", value: "Screen or DTF" },
    ],
  },
  {
    slug: "workwear-jackets",
    photo: "/images/products/workwear-jackets.jpg",
    category: "branded-apparel",
    name: "Branded Workwear Jackets",
    shortDescription: "Hi-vis and softshell jackets, logo print.",
    description:
      "Durable workwear jackets — softshell or hi-vis — branded with your logo for site staff and field teams.",
    basePrice: 140,
    unit: "per jacket",
    minQty: 10,
    options: [
      {
        name: "Type",
        choices: [
          { label: "Softshell", priceModifier: 0 },
          { label: "Hi-vis", priceModifier: 20 },
        ],
      },
    ],
    specs: [
      { label: "Branding", value: "Embroidered or heat-transfer" },
      { label: "Sizes", value: "S–4XL" },
    ],
  },
  {
    slug: "branded-caps",
    photo: "/images/products/branded-caps.jpg",
    category: "branded-apparel",
    name: "Branded Caps",
    shortDescription: "Cotton caps, embroidered front logo.",
    description:
      "Adjustable cotton caps with your logo embroidered on the front panel — a low-cost, high-visibility team item.",
    basePrice: 24,
    unit: "per cap",
    minQty: 30,
    options: [
      {
        name: "Closure",
        choices: [
          { label: "Velcro strap", priceModifier: 0 },
          { label: "Metal buckle", priceModifier: 2 },
        ],
      },
    ],
    specs: [
      { label: "Fabric", value: "Cotton twill" },
      { label: "Branding", value: "Front embroidery" },
    ],
  },
];

export function getProduct(slug: string) {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: CategorySlug) {
  return products.filter((p) => p.category === category);
}
