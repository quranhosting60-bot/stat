export interface MenuLeaf {
  label: string;
  href: string;
  isQuote?: boolean;
}

export interface MenuSection {
  heading: string;
  items: MenuLeaf[];
}

export interface MenuTab {
  slug: string;
  label: string;
  image: string;
  categorySlug?: string;
  sections: MenuSection[];
}

function quote(label: string): MenuLeaf {
  return { label, href: `/quote?item=${encodeURIComponent(label)}`, isQuote: true };
}
function product(label: string, slug: string): MenuLeaf {
  return { label, href: `/products/${slug}` };
}

export const megaMenuTabs: MenuTab[] = [
  {
    slug: "business-stationery",
    categorySlug: "business-stationery",
    label: "Business Stationery",
    image: "/images/categories/business-stationery.webp",
    sections: [
      {
        heading: "Business Cards printing",
        items: [
          product("Standard Cards", "premium-business-cards"),
          product("Premium Cards", "premium-business-cards"),
          quote("Special Finishes"),
          quote("NFC Cards"),
          quote("Special offers"),
          quote("Smooth finish"),
          quote("Textured finish"),
          quote("Specialty textured"),
          quote("Holders & More"),
        ],
      },
      {
        heading: "Letterheads",
        items: [
          product("Standard letterhead", "corporate-letterhead"),
          quote("Textured Finish LH"),
          quote("Smooth Finish LH"),
          quote("Specialty Textured LH"),
          quote("Special offers LH"),
          quote("Recycled LH"),
        ],
      },
      { heading: "NFC Business Cards", items: [quote("NFC Business Cards")] },
      {
        heading: "Folders",
        items: [
          product("Standard", "presentation-folders"),
          product("Premium", "presentation-folders"),
          quote("Special offers"),
        ],
      },
      {
        heading: "Envelopes",
        items: [
          product("Standard Envelopes", "branded-envelopes"),
          product("Window Envelopes", "window-envelopes"),
          quote("Textured finish"),
          quote("Smooth finish"),
        ],
      },
      {
        heading: "Certificates",
        items: [quote("Presentation Accessories"), quote("Standard"), quote("Premium")],
      },
      { heading: "Invitations", items: [quote("Standard"), quote("Premium")] },
      { heading: "Invoices & Vouchers", items: [product("Carbonless Invoice Books", "ncr-invoice-books")] },
      { heading: "Stamps", items: [product("Custom Rubber Stamps", "rubber-stamps")] },
    ],
  },
  {
    slug: "marketing-materials",
    categorySlug: "marketing-print",
    label: "Marketing Materials",
    image: "/images/categories/marketing-print.webp",
    sections: [
      {
        heading: "Flyers Printing",
        items: [
          product("A5 Flyers", "a5-flyers"),
          product("A4 Flyers", "a4-flyers"),
          product("A3 Posters", "a3-posters"),
          product("A2 Posters", "event-posters-a2"),
          quote("Special Finishes"),
          quote("Textured finish"),
          quote("Recycled"),
        ],
      },
      {
        heading: "Brochures",
        items: [
          product("Tri-Fold", "tri-fold-brochures"),
          product("Bi-Fold", "bifold-brochures"),
        ],
      },
      {
        heading: "Stickers/Labels",
        items: [
          product("Vinyl Labels", "product-labels"),
          quote("Paper Labels"),
          quote("Roll Labels"),
        ],
      },
      { heading: "CD/DVD Jackets", items: [quote("CD/DVD Jackets")] },
      {
        heading: "Books & Booklets",
        items: [
          product("Saddle-Stitch Booklets", "saddle-stitch-booklets"),
          quote("Perfect Bound Booklets"),
          quote("Self-Cover Booklets"),
          quote("Hardcover Booklets"),
        ],
      },
      {
        heading: "Notepads/Notebooks",
        items: [product("Standard", "desk-notepads"), quote("Premium")],
      },
      {
        heading: "Calendars & Planners",
        items: [
          product("Wall Calendars", "wall-calendars"),
          product("Desk Calendars", "desk-calendars"),
          quote("Poster Calendars"),
        ],
      },
      {
        heading: "Tags/Bookmarks",
        items: [product("Standard", "product-hang-tags"), quote("Premium")],
      },
      { heading: "Tablemats", items: [product("Standard", "table-tent-cards"), quote("Special offers")] },
      { heading: "Menu", items: [product("Standard", "restaurant-menus"), quote("Premium")] },
      { heading: "Print and Play", items: [quote("Print and Play")] },
    ],
  },
  {
    slug: "large-format-printing",
    categorySlug: "large-format",
    label: "Large Format Printing",
    image: "/images/categories/large-format.webp",
    sections: [
      {
        heading: "Posters & Banners",
        items: [
          product("Posters", "event-posters-a2"),
          quote("3M Vinyl Graphics"),
          product("One Way Vision Film", "window-graphics"),
          quote("Flex Banners"),
          product("Backlit Prints", "backlit-fabric-banners"),
          quote("Whiteboard Film"),
        ],
      },
      { heading: "Wallpapers", items: [product("Wall Murals", "wall-murals")] },
      {
        heading: "Canvas Printing",
        items: [product("Canvas Prints", "large-canvas-prints"), quote("Canvas With Frame")],
      },
      {
        heading: "Rollups",
        items: [
          product("Standard", "roll-up-banners"),
          quote("Premium"),
          product("X-Stand Banner", "x-banner-stands"),
        ],
      },
      {
        heading: "Popups",
        items: [
          product("Pop-Up Display Straight", "pop-up-displays"),
          quote("Pop-Up Display Curved"),
          quote("Pop-Up Display Counter"),
          quote("Promotional table"),
        ],
      },
      {
        heading: "Displays",
        items: [
          product("Acrylic Sign Holders", "acrylic-signage"),
          product("Acrylic Name Plates & Desk Stands", "office-door-signs"),
        ],
      },
    ],
  },
  {
    slug: "packaging-boxes",
    categorySlug: "packaging-labels",
    label: "Packaging & Boxes",
    image: "/images/categories/packaging-labels.webp",
    sections: [
      {
        heading: "Boxes",
        items: [
          product("Custom Mailer Boxes", "custom-mailer-boxes"),
          product("Rigid Luxury Boxes", "rigid-luxury-boxes"),
          product("Corrugated Shipping Boxes", "corrugated-shipping-boxes"),
          product("Gift Boxes", "gift-boxes"),
          product("Food Packaging Boxes", "food-packaging-boxes"),
        ],
      },
      {
        heading: "Labels",
        items: [
          product("Product Labels", "product-labels"),
          product("Barcode & Batch Labels", "barcode-batch-labels"),
          product("Bottle Labels", "bottle-labels"),
          product("Jar & Cosmetic Labels", "cosmetic-jar-labels"),
        ],
      },
      {
        heading: "Bags",
        items: [
          product("Branded Paper Bags", "branded-paper-bags"),
          product("Branded Courier Bags", "branded-courier-bags"),
        ],
      },
      {
        heading: "Tape & Inserts",
        items: [
          product("Shipping Tape", "shipping-tape"),
          product("Branded Tissue Paper", "branded-tissue-paper"),
          product("Thank You Insert Cards", "thank-you-insert-cards"),
          product("Product Hang Tags", "product-hang-tags"),
        ],
      },
    ],
  },
  {
    slug: "promotional-products",
    categorySlug: "promotional-gifts",
    label: "Promotional Products",
    image: "/images/categories/promotional-gifts.webp",
    sections: [
      {
        heading: "Drinkware",
        items: [
          product("Ceramic Mugs", "ceramic-mugs"),
          product("Water Bottles", "branded-water-bottles"),
        ],
      },
      {
        heading: "Writing & Desk",
        items: [
          product("Branded Pens", "branded-pens"),
          product("Notebooks", "branded-notebooks"),
        ],
      },
      {
        heading: "Tech",
        items: [
          product("USB Drives", "usb-drives"),
          product("Power Banks", "branded-power-banks"),
          product("Mousepads", "custom-mousepads"),
        ],
      },
      {
        heading: "Outdoor & Events",
        items: [
          product("Umbrellas", "branded-umbrellas"),
          product("Keychains", "custom-keychains"),
          product("Event Lanyards & Badges", "event-lanyards-badges"),
        ],
      },
    ],
  },
  {
    slug: "apparel-wearables",
    categorySlug: "branded-apparel",
    label: "Apparel & Wearables",
    image: "/images/categories/branded-apparel.webp",
    sections: [
      { heading: "Safety Products", items: [product("Hi-Vis Safety Vests", "hi-vis-safety-vests")] },
      { heading: "T-Shirts Printing", items: [product("Printed T-Shirts", "printed-tshirts")] },
      { heading: "Caps", items: [product("Branded Caps", "branded-caps")] },
      { heading: "Badges", items: [product("Event Lanyards & Badges", "event-lanyards-badges")] },
      { heading: "Lanyard", items: [product("Event Lanyards & Badges", "event-lanyards-badges")] },
      {
        heading: "Polos & Uniforms",
        items: [
          product("Embroidered Polos", "embroidered-polos"),
          product("Staff Polo Dresses", "staff-polo-dresses"),
          product("Branded Abayas", "branded-abayas"),
          product("Lab Coats", "branded-lab-coats"),
          product("Corporate Ties", "corporate-ties"),
        ],
      },
      {
        heading: "Outerwear",
        items: [
          product("Workwear Jackets", "workwear-jackets"),
          product("Branded Hoodies", "branded-hoodies"),
        ],
      },
      { heading: "Sportswear", items: [product("Custom Sports Jerseys", "custom-sports-jerseys")] },
      {
        heading: "Accessories",
        items: [
          product("Branded Beanies", "branded-beanies"),
          product("Branded Bandanas", "branded-bandanas"),
          product("Printed Socks", "custom-printed-socks"),
          product("Branded Aprons", "branded-aprons"),
        ],
      },
    ],
  },
  {
    slug: "corporate-event-branding",
    categorySlug: "signage-displays",
    label: "Corporate & Event Branding",
    image: "/images/categories/signage-displays.webp",
    sections: [
      {
        heading: "Exhibition & Events",
        items: [
          product("Exhibition Booth Panels", "exhibition-booth-panels"),
          product("Pop-Up Display Stands", "pop-up-displays"),
        ],
      },
      {
        heading: "Office Signage",
        items: [
          product("Acrylic Signage", "acrylic-signage"),
          product("Office Door Signs", "office-door-signs"),
          product("Building Directory Boards", "building-directory-boards"),
        ],
      },
      {
        heading: "Branding Materials",
        items: [
          product("Event Lanyards & Badges", "event-lanyards-badges"),
          product("Custom LED Neon Signs", "custom-led-neon-signs"),
        ],
      },
    ],
  },
  {
    slug: "occasions-industries",
    label: "Occasions & Industries",
    image: "/images/categories/marketing-print.webp",
    sections: [
      {
        heading: "Curated Collections",
        items: [quote("Saudi National Day"), quote("Restaurants"), quote("Saudi Franchise Expo")],
      },
    ],
  },
];
