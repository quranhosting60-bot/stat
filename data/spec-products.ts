import type { Product, ProductOption } from "./products";

/**
 * Products built from the client's "Website Updates" spec sheet.
 * Entries with an existing slug replace that product's fields; new slugs are added.
 * NOTE: all prices/modifiers below are placeholders until the client confirms a price list.
 */

type Choice = { label: string; priceModifier: number };
type SpecProduct = Partial<Product> & { slug: string };

const r2 = (n: number) => Math.round(n * 100) / 100;
const ch = (labels: string[], mod = 0): Choice[] => labels.map((label) => ({ label, priceModifier: mod }));
const chm = (rows: [string, number][]): Choice[] => rows.map(([label, priceModifier]) => ({ label, priceModifier }));

function opt(name: string, choices: Choice[], extra: Partial<ProductOption> = {}): ProductOption {
  return { name, choices, ...extra };
}

/* ---------- shared lists (copied from the client sheet) ---------- */
const COATED = (gsms: number[]) => gsms.flatMap((g) => [`${g} Coated Matt`, `${g} Coated Gloss`]);

const PAPER_FLYER = [
  ...COATED([130, 150, 170, 200, 250, 300, 350]),
  "90 GSM Wooden Free", "80 GSM Wooden Free", "180 Bristol", "300 Bristol White", "300 Splendrogel",
  "160 Splendrogel", "90 Coated Gloss", "90 Coated Matt", "120 GSM Wooden Free", "400 Invercote (Ivory Board)",
  "115 Coated Matt", "115 Coated Gloss", "110 Calc Paper", "Tintoretto Cylon Sesamo 950 GSM",
];
const PAPER_COVER = [
  ...COATED([170, 200, 250, 300, 350]),
  "180 Bristol", "300 Bristol White", "300 Sirio Pearl Ice White", "300 Sirio Pearl Oyster Shell",
  "290 Majestic M Gold", "280 Laid Constellation Snow", "300 Splendrogel",
];
const PAPER_BOOKLET_COVER = [
  ...COATED([200, 250, 300, 350]),
  "300 Sirio Pearl Ice White", "300 Sirio Pearl Oyster Shell", "280 Laid Constellation Snow",
];
const PAPER_BOOKLET_INSIDE = [
  ...COATED([130, 150, 170, 200, 250, 300, 350]),
  "90 GSM Wooden Free", "80 GSM Wooden Free", "300 Sirio Pearl Ice White", "300 Sirio Pearl Oyster Shell",
  "125 Sirio Pearl Ice White", "125 Sirio Pearl Oyster Shell",
];
const PAPER_PERFECT_INSIDE = [
  ...COATED([130, 150, 170, 200, 250, 300, 350]),
  "90 GSM Wooden Free", "80 GSM Wooden Free", "180 Bristol", "240 Bristol", "300 Bristol White",
  "300 Sirio Pearl Ice White", "300 Sirio Pearl Oyster Shell", "125 Sirio Pearl Ice White",
  "125 Sirio Pearl Oyster Shell", "100 Letter head Brilliant White Laid – D", "290 Majestic M Gold",
  "100 Century Brilliant White Laid", "280 Laid Constellation Snow", "300 Splendrogel", "160 Splendrogel",
];
const PAPER_HARDCOVER_INSIDE = [...COATED([130, 150, 170, 200, 250]), "90 GSM Wooden Free", "180 Bristol"];
const PAPER_CARD_STANDARD = [...COATED([170, 200, 250, 300, 350]), "180 Bristol", "300 Bristol White"];
const PAPER_PREMIUM_CARD = [
  "300 Sirio Pearl Ice White", "300 Sirio Pearl Oyster Shell", "300 Conqueror Brilliant White Wove",
  "300 Conqueror Contour", "290 Majestic M Gold", "290 Majestic M Silver White", "280 Laid Constellation Snow",
  "300 Splendrogel", "350 Coated Matt",
];
const PAPER_INVITE = [...COATED([170, 200, 250, 300, 350]), "300 Bristol White"];
const PAPER_TAG = [...COATED([150, 170, 200, 250, 300, 350]), "300 Bristol White"];
const PAPER_TAG_PREMIUM = [
  "300 Sirio Pearl Ice White", "300 Sirio Pearl Oyster Shell", "300 Conqueror Brilliant White Laid",
  "300 Conqueror Contour", "290 Majestic M Gold", "280 Laid Constellation Snow",
];
const PAPER_TABLE_TENT = ["300 Coated Matt", "300 Coated Gloss", "350 Coated Matt", "350 Coated Gloss", "300 Bristol", "300 Splendrogel"];
const PAPER_MENU = [
  ...COATED([130, 150, 170, 200, 250, 300, 350]),
  "90 GSM Wooden Free", "80 GSM Wooden", "180 Bristol", "240 Bristol", "300 Bristol White", "300 Splendrogel",
];
const PAPER_NOTEPAD_COVER = [...COATED([250, 300, 350]), "300 Sirio Pearl Ice White", "300 Sirio Pearl Oyster Shell", "280 Laid Constellation Snow", "300 Splendrogel"];
const PAPER_CALENDAR_HANGING = COATED([170, 200, 250, 300, 350]);
const PAPER_CALENDAR_DESK = [...COATED([170, 200, 250, 300]), "300 Sirio Pearl Ice White", "300 Sirio Pearl Oysters Shell", "280 Laid Constellation Snow", "300 Splendrogel"];
const PAPER_PRESENT_PREMIUM = [
  "300 Sirio Pearl Ice White", "300 Sirio Pearl Oyster Shell", "300 Conqueror Brilliant White Wove",
  "300 Conqueror Contour", "280 Laid Constellation Snow", "300 Splendrogel", "350 Coated Matt - P", "280 Amber Coat",
];

const CORNERS = ["Upper Left", "Upper Right", "Lower Left", "Lower Right"];
const A_SIZES = (list: string[]) => {
  const all: Record<string, string> = {
    A3: "A3 (29.7×42)", A4: "A4 (21×29.7)", A5: "A5 (14.8×21)", A6: "A6 (10.5×14.8)", A7: "A7 (7.4×10.5)",
    A8: "A8 (5.2×7.4)", A9: "A9 (3.7×5.2)", A10: "A10 (2.6×3.7)",
  };
  return list.map((k) => all[k]);
};
const SIZE_MULT: Record<string, number> = { A6: 0.7, A5: 1, A4: 1.7, A3: 3.4 };
const sizeMods = (sizes: string[], defaultKey: string, base: number): Choice[] =>
  sizes.map((label) => {
    const key = label.slice(0, 2);
    const mult = SIZE_MULT[key] ?? 1;
    return { label, priceModifier: r2(base * (mult / (SIZE_MULT[defaultKey] ?? 1) - 1)) };
  });

/* ---------- reusable option groups ---------- */
const sides = (extraFor2: number, section?: string): ProductOption =>
  opt("Sides", chm([["1 side", 0], ["2 sides", extraFor2]]), { section });

function laminationGroup(base: number, types: string[], section?: string, hint?: string): ProductOption[] {
  const m = r2(base * 0.08);
  return [
    opt("Lamination", [{ label: "No lamination", priceModifier: 0 }, ...types.map((label) => ({ label, priceModifier: /soft/i.test(label) ? r2(base * 0.14) : m }))], { section, hint }),
    opt("Lamination Sides", chm([["1 side", 0], ["2 sides", m]]), { section, showIf: { option: "Lamination", notEquals: "No lamination" } }),
  ];
}
function spotUvGroup(base: number, section?: string): ProductOption[] {
  return [
    opt("Spot UV", chm([["No Spot UV", 0], ["Spot UV", r2(base * 0.15)]]), {
      section, hint: "Requires lamination", showIf: { option: "Lamination", notEquals: "No lamination" },
    }),
    opt("Spot UV Sides", chm([["1 side", 0], ["2 sides", r2(base * 0.15)]]), { section, showIf: { option: "Spot UV", equals: "Spot UV" } }),
  ];
}
const foilGroup = (base: number, name = "Foiling", section?: string): ProductOption =>
  opt(name, chm([["No foiling", 0], ["Gold", r2(base * 0.3)], ["Silver", r2(base * 0.3)], ["Multicolor (Rainbow)", r2(base * 0.4)]]), { section });
const cornersGroup = (section?: string): ProductOption =>
  opt("Round Corners", ch(CORNERS), { display: "multi", section, hint: "Tick the corners to round — leave empty for sharp corners" });
const pagesGroup = (name: string, pages: number[], divisor: number, perPage: number, section?: string): ProductOption =>
  opt(name, pages.map((p) => ({ label: String(p), priceModifier: r2(p * perPage) })), { display: "select", sheetsDivisor: divisor, section });
const range = (from: number, to: number, step: number) => {
  const out: number[] = [];
  for (let n = from; n <= to; n += step) out.push(n);
  return out;
};

/* ---------- Flyers & Brochures (shared) ---------- */
function flyerOptions(defaultSize: "A3" | "A4" | "A5" | "A6", base: number): ProductOption[] {
  const sizes = A_SIZES(["A3", "A4", "A5", "A6"]);
  return [
    opt("Size", sizeMods(sizes, defaultSize, base), { defaultChoice: A_SIZES([defaultSize])[0] }),
    sides(r2(base * 0.5)),
    opt("Paper Quality", ch(PAPER_FLYER), { display: "select", defaultChoice: "170 Coated Gloss" }),
    ...laminationGroup(base, ["Matt", "Gloss"], undefined, "Coated papers only"),
    opt("Creasing Without Folding", ch(["None", "1 Crease", "2 Crease", "3 Crease", "Multi Crease"])),
    opt("Folding", ch(["No folding", "1-Fold", "2-Fold", "3-Fold", "Multi Fold"])),
    opt("Perforation", ch(["None", "1 Perforation", "2 Perforation", "3 Perforation", "Multi Perforation"])),
    opt("Die Cutting", ch(["None", "Manual Die Cut", "Die Cutting (New Simple Die Cutting)", "Die Cutting (New Complex Die)", "Die Cutting (Ready Die)"]), { display: "select" }),
    cornersGroup(),
    opt("Fit & Finish", ch(["No punch", "1 Hole Punch"])),
    opt("Hold Side", ch(["Left", "Center", "Right"]), { showIf: { option: "Fit & Finish", equals: "1 Hole Punch" } }),
  ];
}
const flyerSpecs = [
  { label: "Sizes", value: "A3, A4, A5 or A6" },
  { label: "Stock", value: "80–400gsm, many finishes" },
];

/* ---------- label sizes ---------- */
const stickerSizes: [string, number, number][] = [
  ["B2 (50×70.7)", 50, 70.7], ["A3 (29.7×42)", 29.7, 42], ["A4 (21×29.7)", 21, 29.7],
  ["Square 3×3", 3, 3], ["Square 4×4", 4, 4], ["Square 5×5", 5, 5], ["Square 7×7", 7, 7], ["Square 10×10", 10, 10], ["Square 15×15", 15, 15],
  ["Circle 3×3", 3, 3], ["Circle 4×4", 4, 4], ["Circle 5×5", 5, 5], ["Circle 7×7", 7, 7], ["Circle 10×10", 10, 10], ["Custom Shape", 5, 5],
];
const areaMods = (rows: [string, number, number][], perCm2: number, minArea = 9): Choice[] =>
  rows.map(([label, w, h]) => ({ label, priceModifier: r2(Math.max(0, w * h - minArea) * perCm2) }));

const BOOK_SIZES = A_SIZES(["A3", "A4", "A5", "A6"]);

export const specProducts: SpecProduct[] = [
  /* ================= Business cards ================= */
  {
    slug: "standard-business-cards",
    category: "business-stationery",
    photo: "/images/products/standard-business-cards.webp",
    name: "Standard Business Cards",
    nameAr: "بطاقات أعمال عادية",
    shortDescription: "Crisp 350gsm cards with sharp square corners.",
    description:
      "Classic 350gsm business cards with clean, sharp corners. Choose single-sided or double-sided printing in matte or gloss lamination.",
    descriptionAr: "بطاقات أعمال كلاسيكية بورق 350 جرام وزوايا حادة. اختر الطباعة على وجه واحد أو وجهين.",
    basePrice: 45,
    unit: "per 100 cards",
    minQty: 100,
    options: [
      opt("Sides", chm([["Single side", 0], ["2 sides", 20]])),
      opt("Finish", chm([["Matte lamination", 0], ["Gloss lamination", 0]])),
    ],
    specs: [
      { label: "Stock", value: "350gsm art card" },
      { label: "Size", value: "90 × 50 mm" },
      { label: "Corners", value: "Sharp edges only" },
    ],
  },
  {
    slug: "premium-business-cards",
    luxe: true,
    shortDescription: "Soft-touch, spot UV and gold, silver or multi-colour foil.",
    description:
      "Our premium range: heavyweight 350gsm stock finished with soft-touch lamination, spot UV and gold, silver or multi-colour foiling — a card that feels as good as it looks, and tells people they're dealing with a serious brand.",
    options: [
      opt("Finish", chm([["Matte lamination", 0], ["Gloss lamination", 0], ["Soft-touch lamination", 25], ["Spot UV", 45]])),
      opt("Foiling", chm([["No foiling", 0], ["Gold", 60], ["Silver", 60], ["Multi Color", 90]])),
      opt("Corners", chm([["Sharp", 0], ["Rounded", 10]])),
    ],
    specs: [
      { label: "Stock", value: "350gsm premium card" },
      { label: "Size", value: "90 × 50 mm" },
      { label: "Print", value: "Full colour, both sides" },
    ],
  },

  /* ================= Letterheads ================= */
  {
    slug: "corporate-letterhead",
    shortDescription: "Your logo, address block and brand colours on quality paper.",
    description:
      "Set the tone before anyone reads a word. Choose A4 or Letter size on Conqueror, Smooth or Commander paper in 80, 90 or 100gsm.",
    basePrice: 0.36,
    unit: "per sheet",
    minQty: 1,
    qtyStep: 10,
    maxQty: 1000,
    options: [
      opt("Paper Size", ch(["A4", "Letter"])),
      opt("Paper Quality", chm([["Conqueror Plain", 0.08], ["Conqueror Texture", 0.12], ["Smooth", 0], ["Commander", 0.1]])),
      opt("Paper GSM", chm([["80 gsm", 0], ["90 gsm", 0.03], ["100 gsm", 0.06]])),
    ],
    specs: [
      { label: "Size", value: "A4 or Letter" },
      { label: "Paper", value: "80 / 90 / 100gsm" },
      { label: "Print", value: "Full colour, single side" },
    ],
  },

  /* ================= Folders ================= */
  {
    slug: "presentation-folders",
    shortDescription: "30.5 × 43 cm pocket folders for proposals and press kits.",
    description:
      "Large 30.5 cm × 43 cm presentation folders with a pasted pocket — ideal for proposals, press kits and onboarding packs.",
    basePrice: 12,
    unit: "per folder",
    minQty: 50,
    options: [
      opt("Material Quality", chm([["300 Matt", 0], ["300 Glossy", 0], ["350 Matt", 1.5], ["350 Glossy", 1.5], ["300 Bristol White", 0.8]])),
      opt("Spine", chm([["0.5 cm", 0], ["1 cm", 0.6]])),
      opt("Sides", chm([["1 side", 0], ["2 sides", 1.2]])),
      opt("Pasting Pocket", chm([["1 side", 0], ["2 sides", 1]])),
      opt("Pocket At", ch(["Right Bottom", "Left Bottom"])),
    ],
    specs: [
      { label: "Size", value: "30.5 × 43 cm" },
      { label: "Stock", value: "300–350gsm board" },
    ],
  },
  {
    slug: "premium-presentation-folders",
    category: "business-stationery",
    luxe: true,
    premium: true,
    photo: "/images/products/presentation-folders.webp",
    name: "Premium Presentation Folders",
    nameAr: "مجلدات عرض فاخرة",
    shortDescription: "Designer papers, soft-touch lamination and spot UV.",
    description:
      "A statement folder on designer stock — Sirio, Conqueror, Constellation and more — with velvet lamination and optional spot UV. Available at 30.5 × 43 cm or A3.",
    basePrice: 24,
    unit: "per folder",
    minQty: 50,
    options: [
      opt("Size", ch(["30.5 × 43 cm", "A3"])),
      opt("Material Quality", chm(PAPER_PRESENT_PREMIUM.map((l) => [l, /Coated|Amber/.test(l) ? 0 : 2.5] as [string, number])), { display: "select" }),
      opt("Lamination Sides", chm([["1 side", 1], ["2 sides", 2]])),
      opt("Lamination Quality", chm([["Matt", 0], ["Gloss", 0], ["Soft Touch (Velvet)", 1.5]])),
      opt("Spine", chm([["0.5 cm", 0], ["1 cm", 0.6]])),
      opt("Pasting Pocket", chm([["1 side", 0], ["2 sides", 1]])),
      opt("Pocket At", ch(["Right", "Left"])),
      opt("UV Spot", chm([["No UV Spot", 0], ["UV Spot", 3]])),
    ],
    specs: [
      { label: "Size", value: "30.5 × 43 cm or A3" },
      { label: "Stock", value: "280–350gsm designer" },
    ],
  },

  /* ================= Envelopes ================= */
  {
    slug: "branded-envelopes",
    shortDescription: "Branded envelopes in six sizes on Conqueror paper.",
    description:
      "Envelopes printed with your logo and return address on Conqueror Wove or Smooth paper — from DL to A3.",
    basePrice: 0.44,
    unit: "per envelope",
    minQty: 50,
    qtyStep: 50,
    maxQty: 1000,
    options: [
      opt("Size", chm([["DL (11 × 22 cm)", 0], ["C5 (16.2 × 22.9 cm)", 0.1], ["A5 (25 × 17 cm)", 0.12], ["C4 (22.9 × 32.4 cm)", 0.25], ["A4 (25 × 35 cm)", 0.35], ["A3 (35 × 45 cm)", 0.6]])),
      opt("Paper Quality", chm([["Conqueror Envelopes Wove", 0.05], ["Conqueror Envelopes Smooth", 0.05]])),
    ],
    specs: [
      { label: "Print", value: "1 side" },
      { label: "Quantity", value: "50 to 1,000" },
    ],
  },

  /* ================= Certificates ================= */
  {
    slug: "certificates-standard",
    category: "business-stationery",
    photo: "/images/products/corporate-letterhead.webp",
    name: "Certificates — Standard",
    nameAr: "شهادات عادية",
    shortDescription: "Printed certificates in A5, A4 or A3.",
    description: "Standard printed certificates on coated or bristol stock, with optional matt or gloss lamination.",
    basePrice: 6,
    unit: "per certificate",
    minQty: 10,
    options: [
      opt("Size", chm([["A5 (14.8×21)", 0], ["A4 (21×29.7)", 1.5], ["A3 (29.7×42)", 4.5]]), { defaultChoice: "A4 (21×29.7)" }),
      sides(1.5),
      opt("Paper Quality", ch(PAPER_CARD_STANDARD), { display: "select", defaultChoice: "300 Coated Matt" }),
      ...laminationGroup(6, ["Gloss", "Matt"]),
    ],
    specs: [
      { label: "Sizes", value: "A5, A4, A3" },
      { label: "Stock", value: "170–350gsm" },
    ],
  },
  {
    slug: "certificates-premium",
    category: "business-stationery",
    luxe: true,
    premium: true,
    photo: "/images/products/corporate-letterhead.webp",
    name: "Certificates — Premium",
    nameAr: "شهادات فاخرة",
    shortDescription: "Designer papers with gold, silver or multi-colour foil.",
    description: "Premium certificates on designer stock with round-corner options and gold, silver or multi-colour foiling.",
    basePrice: 14,
    unit: "per certificate",
    minQty: 10,
    options: [
      opt("Size", chm([["A5 (14.8×21)", 0], ["A4 (21×29.7)", 3], ["A3 (29.7×42)", 9]]), { defaultChoice: "A4 (21×29.7)" }),
      sides(3),
      opt("Paper Quality", chm(PAPER_PREMIUM_CARD.map((l) => [l, /Coated/.test(l) ? 0 : 2.5] as [string, number])), { display: "select" }),
      ...laminationGroup(14, ["Matt", "Gloss"]),
      cornersGroup(),
      opt("Premium Finishes", chm([["No foiling", 0], ["Gold Foiling", 5], ["Silver Foiling", 5], ["Multi Color Foiling", 7]])),
    ],
    specs: [
      { label: "Sizes", value: "A5, A4, A3" },
      { label: "Stock", value: "280–350gsm designer" },
    ],
  },

  /* ================= Invitations ================= */
  {
    slug: "invitation-cards-standard",
    category: "business-stationery",
    photo: "/images/products/invitation-cards-standard.webp",
    name: "Invitation Cards — Standard (Digital)",
    nameAr: "بطاقات دعوة (طباعة رقمية)",
    shortDescription: "Digitally printed invitations from A7 to A4.",
    description: "Digitally printed invitation cards in four sizes, with optional folding and round corners.",
    basePrice: 2.2,
    unit: "per card",
    minQty: 25,
    options: [
      opt("Size", sizeMods(A_SIZES(["A4", "A5", "A6", "A7"]), "A5", 2.2), { defaultChoice: "A5 (14.8×21)" }),
      sides(1),
      opt("Paper Quality", ch(PAPER_INVITE), { display: "select", defaultChoice: "300 Coated Matt" }),
      opt("Folding", chm([["No fold", 0], ["1 fold", 0.4]])),
      cornersGroup(),
    ],
    specs: [
      { label: "Sizes", value: "A4, A5, A6, A7" },
      { label: "Print", value: "Digital, 1 or 2 sides" },
    ],
  },

  /* ================= ID cards ================= */
  {
    slug: "id-cards",
    category: "business-stationery",
    photo: "/images/products/event-lanyards-badges.webp",
    name: "ID Cards",
    nameAr: "بطاقات هوية",
    shortDescription: "Photo ID cards with your branding, ready for a lanyard or clip.",
    description: "Photo ID cards with your branding, ready for a lanyard or clip. Print on one side or both.",
    descriptionAr: "بطاقات هوية بصور وبعلامتك التجارية، جاهزة للحبل أو المشبك.",
    basePrice: 6,
    unit: "per card",
    minQty: 10,
    options: [opt("Sides", chm([["1 side", 0], ["2 sides", 2]]))],
    specs: [
      { label: "Size", value: "CR80 (85.6 × 54 mm)" },
      { label: "Print", value: "Full colour, 1 or 2 sides" },
    ],
  },

  /* ================= Invoice / voucher books ================= */
  ...[
    { slug: "ncr-invoice-books", name: "A4 Invoice Books", ar: "دفاتر فواتير A4", base: 55, size: "A4", desc: "A4 invoice books printed 4-colour offset on both sides, with sequence numbering and coloured copies.", photo: "ncr-invoice-books" },
    { slug: "payment-voucher-books", name: "A5 Payment Voucher Books", ar: "دفاتر سندات صرف A5", base: 38, size: "A5", desc: "A5 payment voucher books printed 4-colour offset, with sequence numbering and coloured copies.", photo: "payment-voucher-books" },
    { slug: "receipt-voucher-books", name: "A5 Receipt Voucher Books", ar: "دفاتر سندات قبض A5", base: 38, size: "A5", desc: "A5 receipt voucher books printed 4-colour offset, with sequence numbering and coloured copies.", photo: "receipt-voucher-books" },
  ].map(
    (b): SpecProduct => ({
      slug: b.slug,
      category: "business-stationery",
      photo: `/images/products/${b.photo}.webp`,
      name: b.name,
      nameAr: b.ar,
      shortDescription: `${b.size} books, (1+2) 4-colour offset, numbered.`,
      description: b.desc,
      basePrice: b.base,
      unit: "per book of 50 sets",
      minQty: 10,
      options: [
        opt("Sequence Numbering", chm([["No numbering", 0], ["Sequence numbering", 4]])),
        opt("Colors for Copies", ch(["White – Red – Green", "White – Green – Red", "White – Red – Blue"])),
      ],
      specs: [
        { label: "Size", value: b.size },
        { label: "Print", value: "(1+2) 4 colour – offset" },
      ],
    })
  ),

  /* ================= Flyers & brochures ================= */
  { slug: "a5-flyers", shortDescription: "Flyers in A3–A6 with full finishing options.", description: "Flyers and handouts in A3, A4, A5 or A6 — choose paper, lamination, folding, perforation, die-cutting and more.", options: flyerOptions("A5", 0.35), specs: flyerSpecs },
  { slug: "a4-flyers", shortDescription: "Flyers in A3–A6 with full finishing options.", description: "Flyers and handouts in A3, A4, A5 or A6 — choose paper, lamination, folding, perforation, die-cutting and more.", options: flyerOptions("A4", 0.6), specs: flyerSpecs },
  { slug: "event-flyers", unit: "per piece", basePrice: 0.18, minQty: 500, options: flyerOptions("A5", 0.18), specs: flyerSpecs },
  { slug: "bifold-brochures", options: flyerOptions("A4", 1.6), specs: flyerSpecs },
  { slug: "tri-fold-brochures", unit: "per piece", basePrice: 1.05, minQty: 250, options: flyerOptions("A4", 1.05), specs: flyerSpecs },

  /* ================= Labels & stickers ================= */
  { slug: "product-labels", minQty: 50, qtyStep: 50 },
  {
    slug: "waterproof-plastic-stickers",
    category: "packaging-labels",
    photo: "/images/products/waterproof-plastic-stickers.webp",
    name: "Waterproof Plastic Stickers",
    nameAr: "ملصقات بلاستيك مقاومة للماء",
    shortDescription: "Durable waterproof stickers incl. 3M films.",
    description: "Waterproof plastic stickers in standard, square, circle or custom shapes — including 3M Controltac and reflective films, with optional lamination and 3D visual effect.",
    basePrice: 0.5,
    unit: "per sticker",
    minQty: 50,
    qtyStep: 50,
    options: [
      opt("Size", areaMods(stickerSizes, 0.012), { display: "select", defaultChoice: "Square 5×5" }),
      opt("Sticker Quality", chm([["Matt Sticker", 0], ["Glossy Sticker", 0], ["Glossy Transparent", 0.08], ["3M Controltac Print Film 40C-10R", 0.45], ["3M Reflective 7310 White", 0.6], ["3M Transparent Glossy 1170C", 0.4]]), { display: "select" }),
      opt("Lamination Type", chm([["No lamination", 0], ["Matt", 0.05], ["Gloss", 0.05]])),
      opt("Premium Finish", chm([["None", 0], ["3D Visual Effect", 0.35]])),
      opt("Pasting On", chm([["None", 0], ["5MM Foam Board", 1.2], ["10MM Foam Board", 1.8], ["Forex 3MM", 1.5], ["Forex 5MM", 2]])),
    ],
    specs: [
      { label: "Material", value: "Waterproof plastic / 3M" },
      { label: "Min qty", value: "50" },
    ],
  },
  {
    slug: "paper-labels",
    category: "packaging-labels",
    photo: "/images/products/product-labels.webp",
    name: "Paper Labels",
    nameAr: "ملصقات ورقية",
    shortDescription: "135gsm matt or glossy paper labels, A3 to A10 and squares.",
    description: "Paper labels from A3 down to A10 plus square sizes, in 135gsm matt or glossy stock with lamination, round corners and pasting options.",
    basePrice: 0.3,
    unit: "per label",
    minQty: 50,
    qtyStep: 50,
    options: [
      opt("Size", chm([
        ...(["A3 (29.7×42)", "A4 (21×29.7)", "A5 (14.8×21)", "A6 (10.5×14.8)", "A7 (7.4×10.5)", "A8 (5.2×7.4)", "A9 (3.7×5.2)", "A10 (2.6×3.7)"].map((l, i) => [l, [3.2, 1.6, 0.8, 0.4, 0.2, 0.1, 0.05, 0.02][i]] as [string, number])),
        ["Square 3×3", 0], ["Square 4×4", 0.02], ["Square 5×5", 0.04], ["Square 7×7", 0.1], ["Square 10×10", 0.25], ["Square 15×15", 0.6],
      ]), { display: "select", defaultChoice: "Square 5×5" }),
      opt("Sticker", ch(["135 Matt", "135 Glossy"])),
      opt("Lamination", chm([["No lamination", 0], ["Matt", 0.04], ["Gloss", 0.04]])),
      cornersGroup(),
      opt("Pasting On", chm([["None", 0], ["Foam Board 3MM", 1.2], ["Foam Board 5MM", 1.6], ["Forex 3MM", 1.5], ["Forex 5MM", 2]])),
    ],
    specs: [
      { label: "Stock", value: "135gsm matt / glossy" },
      { label: "Min qty", value: "50" },
    ],
  },

  /* ================= Booklets & books ================= */
  {
    slug: "saddle-stitch-booklets",
    name: "Booklet with Cover A4 (Saddle Stitch)",
    shortDescription: "A4 stapled booklets with a separate printed cover.",
    description: "Saddle-stitched A4 booklets with a separately specified cover and inside pages — choose paper, lamination, spot UV and foiling for the cover.",
    basePrice: 3,
    unit: "per booklet",
    minQty: 10,
    qtyStep: 10,
    options: [
      opt("Booklet Size", ch(["A4 Portrait", "A4 Landscape"]), { section: "Booklet" }),
      pagesGroup("Cover Pages", [2, 4], 2, 0.25, "Cover (Part 1)"),
      opt("Paper Quality", ch(PAPER_BOOKLET_COVER), { display: "select", section: "Cover (Part 1)", defaultChoice: "300 Coated Matt" }),
      ...laminationGroup(3, ["Matt", "Gloss", "Soft Touch (Velvet)"], "Cover (Part 1)"),
      ...spotUvGroup(3, "Cover (Part 1)"),
      foilGroup(3, "Foiling", "Cover (Part 1)"),
      pagesGroup("Inside Pages", range(4, 48, 4), 2, 0.22, "Inside pages (Part 2)"),
      opt("Paper Quality", ch(PAPER_BOOKLET_INSIDE), { display: "select", section: "Inside pages (Part 2)", defaultChoice: "130 Coated Matt" }),
    ],
    specs: [
      { label: "Binding", value: "Saddle stapler" },
      { label: "Pages", value: "4 to 48 inside" },
      { label: "Min qty", value: "10" },
    ],
  },
  {
    slug: "perfect-bound-booklets",
    category: "marketing-print",
    photo: "/images/products/product-catalogues.webp",
    name: "Perfect Bound Booklets",
    nameAr: "كتيبات بتجليد لاصق",
    shortDescription: "50–200 page books with a printed cover.",
    description: "Perfect-bound booklets and books with separate cover and inside specifications, from A6 to A3.",
    basePrice: 14,
    unit: "per book",
    minQty: 10,
    qtyStep: 10,
    options: [
      opt("Book Size", chm(BOOK_SIZES.map((l, i) => [l, [6, 3, 0, -2][i]] as [string, number])), { section: "Book", defaultChoice: "A4 (21×29.7)" }),
      pagesGroup("Pages", [50, 100, 200], 2, 0.06, "Book inside (Part 1)"),
      opt("Paper Quality", ch(PAPER_PERFECT_INSIDE), { display: "select", section: "Book inside (Part 1)", defaultChoice: "130 Coated Matt" }),
      ...laminationGroup(14, ["Matt", "Gloss"], "Book inside (Part 1)"),
      opt("Binding", ch(["Perfect Binding", "Side Staple", "Tear-Off", "Wire Binding", "Hole Punch"]), { section: "Book inside (Part 1)" }),
      opt("Holes", ch(["None", "1 Hole Punching", "2 Hole Punching", "3 Hole Punching"]), { section: "Book inside (Part 1)" }),
      ...spotUvGroup(14, "Book inside (Part 1)"),
      opt("Creasing Without Folding", ch(["None", "1 Crease", "2 Crease", "3 Crease"]), { section: "Book inside (Part 1)" }),
      cornersGroup("Book inside (Part 1)"),
      pagesGroup("Cover Pages", [2, 4], 2, 0.25, "Cover (Part 2)"),
      opt("Paper Quality", ch(PAPER_COVER), { display: "select", section: "Cover (Part 2)", defaultChoice: "300 Coated Matt" }),
      ...laminationGroup(14, ["Matt", "Gloss", "Soft Touch (Velvet)"], "Cover (Part 2)"),
      ...spotUvGroup(14, "Cover (Part 2)"),
      foilGroup(14, "Foiling", "Cover (Part 2)"),
    ],
    specs: [
      { label: "Binding", value: "Perfect bound" },
      { label: "Pages", value: "50, 100 or 200" },
    ],
  },
  {
    slug: "hard-cover-books",
    category: "marketing-print",
    photo: "/images/products/product-catalogues.webp",
    name: "Hard Cover Books",
    nameAr: "كتب بغلاف مقوى",
    shortDescription: "Hard-bound books with a printed cover.",
    description: "Hard-binding books with separately specified inside pages and printed cover.",
    basePrice: 30,
    unit: "per book",
    minQty: 10,
    qtyStep: 10,
    options: [
      opt("Book Size", chm(BOOK_SIZES.map((l, i) => [l, [10, 5, 0, -3][i]] as [string, number])), { section: "Book", defaultChoice: "A4 (21×29.7)" }),
      pagesGroup("Pages", range(4, 48, 4), 2, 0.3, "Book inside (hard binding)"),
      opt("Paper Quality", ch(PAPER_HARDCOVER_INSIDE), { display: "select", section: "Book inside (hard binding)", defaultChoice: "130 Coated Matt" }),
      ...laminationGroup(30, ["Gloss", "Matt"], "Book inside (hard binding)", "Coated paper only"),
      opt("Cover Lamination", chm([["Matt", 1.5], ["Gloss", 1.5]]), { section: "Cover printing (Part 2)" }),
    ],
    specs: [
      { label: "Binding", value: "Hard cover" },
      { label: "Pages", value: "4 to 48" },
    ],
  },
  {
    slug: "desk-notepads",
    name: "Notepad with Cover",
    nameAr: "دفتر ملاحظات بغلاف",
    shortDescription: "Branded notepads with a printed cover and tear-off sheets.",
    description: "Notepads with a printed cover (optional lamination, spot UV and foil) and your choice of paper, page count and binding.",
    basePrice: 12,
    unit: "per notepad",
    minQty: 50,
    options: [
      opt("Paper Size", chm(A_SIZES(["A4", "A5", "A6"]).map((l, i) => [l, [4, 0, -3][i]] as [string, number])), { section: "Notepad", defaultChoice: "A5 (14.8×21)" }),
      pagesGroup("Cover Pages", [2, 4], 2, 0.25, "Cover (Part 1)"),
      opt("Paper Quality", ch(PAPER_NOTEPAD_COVER), { display: "select", section: "Cover (Part 1)", defaultChoice: "300 Coated Matt" }),
      ...laminationGroup(12, ["Matt", "Gloss", "Soft Touch (Velvet)"], "Cover (Part 1)", "Coated papers only"),
      ...spotUvGroup(12, "Cover (Part 1)"),
      foilGroup(12, "Premium Finishes", "Cover (Part 1)"),
      pagesGroup("Sheets in Pad", [25, 50, 100, 200, 250], 1, 0.05, "Note pads (Part 2)"),
      opt("Paper Quality", ch(["90 GSM Wooden Free", "100 Letterhead Brilliant White Laid – D"]), { section: "Note pads (Part 2)" }),
      opt("Binding", ch(["Hot Glue", "Tear-Off", "Wire Binding"]), { section: "Note pads (Part 2)" }),
    ],
    specs: [
      { label: "Sizes", value: "A4, A5, A6" },
      { label: "Sheets", value: "25 to 250" },
    ],
  },

  /* ================= Calendars ================= */
  {
    slug: "wall-calendars",
    shortDescription:
      "Custom 12-month promotional wall calendars offer a practical, low-cost way to keep your brand visible in clients' offices or homes every single day",
    description:
      "Custom 12-month promotional wall calendars offer a practical, low-cost way to keep your brand visible in clients' offices or homes every single day",
    options: [
      opt("Size", chm([["A3 (29.7×42)", 4], ["A4 (21×29.7)", 0]]), { defaultChoice: "A4 (21×29.7)" }),
      sides(3),
      pagesGroup("Number of Pages", [12, 14, 24, 26, 28], 2, 0.4),
      opt("Paper Quality", ch(PAPER_CALENDAR_HANGING), { display: "select", defaultChoice: "250 Coated Matt" }),
      opt("Wire Color", ch(["Black", "White"])),
    ],
    specs: [
      { label: "Sizes", value: "A3 or A4" },
      { label: "Binding", value: "Wire binding" },
    ],
  },
  {
    slug: "desk-calendars",
    options: [
      opt("Size", chm([["A4 (21×29.7)", 3], ["A5 (14.8×21)", 0]]), { defaultChoice: "A5 (14.8×21)" }),
      sides(3),
      pagesGroup("Number of Pages", [12, 14, 16, 24, 26, 28, 30, 32, 34, 36], 2, 0.4),
      opt("Paper Quality", ch(PAPER_CALENDAR_DESK), { display: "select", defaultChoice: "250 Coated Matt" }),
      opt("Wire Color", ch(["Black", "White"])),
      ...laminationGroup(28, ["Gloss", "Matt", "Soft Touch (Velvet)"], undefined, "Coated papers only"),
      ...spotUvGroup(28),
      opt("Fit & Finish", chm([["Soft Desk Calendar Stand Making", 0], ["Hard Desk Calendar Making", 6]])),
    ],
    specs: [
      { label: "Sizes", value: "A4 or A5" },
      { label: "Binding", value: "Wire binding" },
    ],
  },

  /* ================= Tags ================= */
  {
    slug: "product-hang-tags",
    name: "Tags",
    nameAr: "بطاقات تعليق",
    shortDescription: "Hang tags in seven sizes on 150–350gsm stock.",
    description: "Printed tags in A7, A8, A9 and square sizes with round-corner and hole-punch options.",
    options: [
      opt("Size", chm([["A7 (7.4×10.5)", 0.08], ["A8 (5.2×7.4)", 0], ["A9 (3.7×5.2)", -0.05], ["Square 4×4", -0.04], ["Square 5×5", -0.02], ["Square 7×7", 0.06]]), { defaultChoice: "A8 (5.2×7.4)" }),
      sides(0.1),
      opt("Paper Quality", ch(PAPER_TAG), { display: "select", defaultChoice: "300 Coated Matt" }),
      cornersGroup(),
      opt("Hole Punches", ch(["No hole", "1 Hole Punch"]), { defaultChoice: "1 Hole Punch" }),
      opt("Hole Side", ch(["Left", "Center", "Right"]), { showIf: { option: "Hole Punches", equals: "1 Hole Punch" }, defaultChoice: "Center" }),
    ],
    specs: [
      { label: "Sizes", value: "A7–A9, squares" },
      { label: "Stock", value: "150–350gsm" },
    ],
  },
  {
    slug: "premium-hang-tags",
    category: "packaging-labels",
    luxe: true,
    premium: true,
    photo: "/images/products/product-hang-tags.webp",
    name: "Tags — Premium Material",
    nameAr: "بطاقات تعليق فاخرة",
    shortDescription: "Designer-paper hang tags.",
    description: "Hang tags on Sirio, Conqueror, Majestic and Constellation designer papers with round corners and hole-punch options.",
    basePrice: 0.9,
    unit: "per tag",
    minQty: 250,
    options: [
      opt("Size", chm([["A7 (7.4×10.5)", 0.2], ["A8 (5.2×7.4)", 0], ["A9 (3.7×5.2)", -0.1], ["Square 4×4", -0.08], ["Square 5×5", -0.04], ["Square 7×7", 0.12]]), { defaultChoice: "A8 (5.2×7.4)" }),
      sides(0.2),
      opt("Paper Quality", ch(PAPER_TAG_PREMIUM), { display: "select" }),
      cornersGroup(),
      opt("Hole Punches", ch(["No hole", "1 Hole Punch"]), { defaultChoice: "1 Hole Punch" }),
      opt("Hole Side", ch(["Left", "Center", "Right"]), { showIf: { option: "Hole Punches", equals: "1 Hole Punch" }, defaultChoice: "Center" }),
    ],
    specs: [
      { label: "Sizes", value: "A7–A9, squares" },
      { label: "Stock", value: "280–300gsm designer" },
    ],
  },

  /* ================= Table tents & menus ================= */
  {
    slug: "table-tent-cards",
    shortDescription: "Free-standing table tent cards for menus, offers and table numbers.",
    description: "Free-standing table tent cards for menus, offers and table numbers, folded and creased with 4 folds.",
    options: [
      opt("Size", chm([["A5 (14.8×21)", 1.2], ["A6 (10.5×14.8)", 0], ["A7 (7.4×10.5)", -0.8], ["A5 Landscape", 1.2], ["A5 Portrait", 1.2], ["A4 Landscape", 3], ["A4 Portrait", 3]]), { defaultChoice: "A6 (10.5×14.8)", display: "select" }),
      sides(0.8),
      opt("Paper Quality", ch(PAPER_TABLE_TENT), { display: "select", defaultChoice: "350 Coated Matt" }),
      ...laminationGroup(3.5, ["Matt", "Gloss"], undefined, "Coated papers only"),
    ],
    specs: [
      { label: "Creasing", value: "4 folds" },
      { label: "Stock", value: "300–350gsm" },
    ],
  },
  {
    slug: "restaurant-menus",
    shortDescription: "Printed restaurant menus in A3 or A4 with full finishing.",
    description: "Restaurant menus in A3 or A4 — choose paper, lamination, folding style, spot UV and a 3D visual effect.",
    options: [
      opt("Size", chm([["A4 (21×29.7)", 0], ["A3 (29.7×42)", 12]])),
      sides(4),
      opt("Paper Quality", ch(PAPER_MENU), { display: "select", defaultChoice: "250 Coated Matt" }),
      ...laminationGroup(18, ["Matt", "Gloss", "Soft Touch (Velvet)"], undefined, "Coated papers only"),
      opt("Creasing", ch(["None", "1 Fold", "2 Fold", "3 Fold", "4 Fold", "Gate Fold", "Z Fold"])),
      ...spotUvGroup(18),
      opt("Premium Finishes", chm([["None", 0], ["3D Visual Effect", 6]])),
    ],
    specs: [
      { label: "Sizes", value: "A3 or A4" },
      { label: "Stock", value: "80–350gsm" },
    ],
  },
];
