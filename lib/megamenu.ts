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
          product("Standard Cards", "standard-business-cards"),
          product("Premium Cards", "premium-business-cards"),
          product("Foil Finishes (Gold / Silver / Multi)", "premium-business-cards"),
          quote("NFC Cards"),
          quote("Smooth finish"),
          quote("Textured finish"),
          quote("Specialty textured"),
          quote("Holders & More"),
        ],
      },
      {
        heading: "Letterheads",
        items: [product("Letterheads", "corporate-letterhead")],
      },
      { heading: "NFC Business Cards", items: [quote("NFC Business Cards")] },
      {
        heading: "Folders",
        items: [
          product("Standard", "presentation-folders"),
          product("Premium", "premium-presentation-folders"),
        ],
      },
      {
        heading: "Envelopes",
        items: [
          product("Standard Envelopes", "branded-envelopes"),
          product("Window Envelopes", "window-envelopes"),
        ],
      },
      {
        heading: "Certificates",
        items: [
          quote("Presentation Accessories"),
          product("Standard", "certificates-standard"),
          product("Premium", "certificates-premium"),
        ],
      },
      { heading: "Invitations", items: [product("Standard (Digital)", "invitation-cards-standard"), quote("Premium")] },
      {
        heading: "Invoices & Vouchers",
        items: [
          product("A4 Invoice Books", "ncr-invoice-books"),
          product("A5 Payment Voucher Books", "payment-voucher-books"),
          product("A5 Receipt Voucher Books", "receipt-voucher-books"),
        ],
      },
      { heading: "ID Cards", items: [product("ID Cards", "id-cards")] },
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
          product("Waterproof Plastic Stickers", "waterproof-plastic-stickers"),
          product("Paper Labels", "paper-labels"),
          quote("Roll Labels"),
        ],
      },
      {
        heading: "Books & Booklets",
        items: [
          product("Saddle-Stitch Booklets", "saddle-stitch-booklets"),
          product("Perfect Bound Booklets", "perfect-bound-booklets"),
          quote("Self-Cover Booklets"),
          product("Hard Cover Books", "hard-cover-books"),
        ],
      },
      {
        heading: "Notepads/Notebooks",
        items: [product("Notepad with Cover", "desk-notepads")],
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
        items: [product("Tags", "product-hang-tags"), product("Tags – Premium Material", "premium-hang-tags")],
      },
      { heading: "Table Tent Cards", items: [product("Table Tent Cards", "table-tent-cards")] },
      { heading: "Menus", items: [product("Menus", "restaurant-menus")] },
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
          quote("Flex Banners"),
          quote("Vinyl Banners"),
          quote("3M Vinyl Graphics"),
          product("Backlit Prints", "backlit-fabric-banners"),
          quote("Promotional Banners"),
          quote("Event Banners"),
          quote("Outdoor Banners"),
          quote("Whiteboard Film"),
        ],
      },
      { heading: "One-Way Vision", items: [product("One Way Vision Film", "window-graphics")] },
      { heading: "Window & Vinyl Graphics", items: [product("Window & Vinyl Graphics", "window-graphics")] },
      { heading: "Wallpapers", items: [product("Wall Murals", "wall-murals")] },
      {
        heading: "Canvas Printing",
        items: [product("Canvas Prints", "large-canvas-prints"), quote("Canvas With Frame"), quote("Custom Wall Art")],
      },
      {
        heading: "Rollups",
        items: [
          product("Standard Roll-Ups", "roll-up-banners"),
          quote("Premium Roll-Ups"),
          quote("Double-Sided Roll-Ups"),
          product("X-Stand Banners", "x-banner-stands"),
        ],
      },
      {
        heading: "Popups",
        items: [
          product("Straight Pop-Up Displays", "pop-up-displays"),
          quote("Curved Pop-Up Displays"),
          quote("Pop-Up Counters"),
          quote("Promotional Tables & Displays"),
        ],
      },
      {
        heading: "Displays",
        items: [
          product("Acrylic Sign Holders", "acrylic-signage"),
          product("Acrylic Name Plates & Desk Stands", "office-door-signs"),
          quote("Display Holders"),
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
        heading: "Specialty Boxes",
        items: [
          quote("Fancy Gift Sets"),
          quote("Cube Boxes"),
          quote("Soft Boxes"),
          quote("Dates & Specialty Boxes"),
        ],
      },
      {
        heading: "Food & Drink Packaging",
        items: [
          quote("Pizza Boxes"),
          quote("Burger Boxes"),
          quote("Meal Boxes"),
          quote("Takeaway Boxes"),
          quote("Bakery Boxes"),
          quote("Cake Boxes"),
          quote("Dessert Boxes"),
          quote("Food Sleeves"),
          quote("Paper Cups (4–12 oz)"),
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
          quote("Travel Mugs & Tumblers"),
          quote("Glassware"),
          quote("Tea Coasters"),
        ],
      },
      {
        heading: "Writing & Desk",
        items: [
          product("Branded Pens", "branded-pens"),
          product("Notebooks", "branded-notebooks"),
          quote("Diaries & Agendas"),
          quote("Business Card Cases"),
        ],
      },
      {
        heading: "Tech",
        items: [
          product("USB Drives", "usb-drives"),
          product("Power Banks", "branded-power-banks"),
          product("Mousepads", "custom-mousepads"),
          quote("Mobile Accessories"),
        ],
      },
      {
        heading: "Fun & Giveaways",
        items: [quote("Pillows"), quote("Stress Balls"), quote("Balloons"), quote("Ribbons")],
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
          quote("Uniform Branding"),
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
        heading: "Exhibition Services",
        items: [quote("Backdrops"), quote("Promotional Counters"), quote("Promotional Tables"), quote("Event Signage")],
      },
      {
        heading: "Promotional Bags",
        items: [
          product("Paper Bags", "branded-paper-bags"),
          quote("Non-Woven Bags"),
          quote("Cotton Bags"),
          quote("Drawstring Bags"),
          quote("Promotional Gift Bags"),
        ],
      },
      {
        heading: "Awards & Memories",
        items: [quote("Trophy Awards & Mementos"), quote("Photobooks")],
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
    slug: "signage-branding",
    categorySlug: "signage-displays",
    label: "Signage & Branding",
    image: "/images/categories/signage-displays.webp",
    sections: [
      {
        heading: "Shop & Outdoor",
        items: [
          product("Shop Signage", "light-box-signs"),
          product("LED Sign Boards", "custom-led-neon-signs"),
          quote("3D Letter Signage"),
          product("Illuminated Signs", "light-box-signs"),
          quote("Outdoor Signage"),
          product("A-Frame Signs", "a-frame-pavement-signs"),
        ],
      },
      {
        heading: "Office & Indoor",
        items: [
          product("Acrylic Signage", "acrylic-signage"),
          quote("Stainless Steel Signage"),
          quote("Reception Signs"),
          product("Office Signs", "office-door-signs"),
          product("Door Signs", "door-hangers"),
          quote("Indoor Signage"),
          quote("Menu Boards"),
        ],
      },
      {
        heading: "Parking & Directions",
        items: [product("Parking Signs", "parking-signage"), quote("Directional Signs")],
      },
      {
        heading: "Walls, Glass & Vehicles",
        items: [
          product("Wall Branding", "wall-murals"),
          product("Glass Branding", "window-graphics"),
          product("Window Graphics", "window-graphics"),
          product("Vehicle Branding", "vehicle-wraps"),
        ],
      },
    ],
  },
  {
    slug: "restaurants-cafes",
    label: "Restaurants & Cafés",
    image: "/images/categories/packaging-labels.webp",
    sections: [
      {
        heading: "Menus & Table Display",
        items: [
          product("Menus", "restaurant-menus"),
          product("Table Tent Cards", "table-tent-cards"),
          quote("Table Mats"),
          quote("Takeaway Menus"),
        ],
      },
      {
        heading: "Food Packaging",
        items: [
          product("Food Packaging Boxes", "food-packaging-boxes"),
          quote("Pizza & Burger Boxes"),
          quote("Paper Cups"),
          product("Stickers & Labels", "product-labels"),
        ],
      },
      {
        heading: "Print & Promotion",
        items: [
          product("Business Cards", "standard-business-cards"),
          product("Flyers", "a5-flyers"),
          product("Posters", "event-posters-a2"),
          product("Wall Graphics", "wall-murals"),
          quote("Outdoor Signage"),
          quote("Promotional Materials"),
        ],
      },
      {
        heading: "Café Branding",
        items: [
          product("Window Graphics", "window-graphics"),
          product("Acrylic Signage", "acrylic-signage"),
          quote("Café Branding"),
        ],
      },
    ],
  },
  {
    slug: "custom-printing",
    label: "Custom Printing",
    image: "/images/categories/business-stationery.webp",
    sections: [
      { heading: "Size & Material", items: [quote("Custom Sizes"), quote("Custom Materials"), quote("Custom Shapes")] },
      { heading: "Packaging & Branding", items: [quote("Custom Packaging"), quote("Custom Branding"), quote("Custom Signage")] },
      {
        heading: "Products & Gifts",
        items: [quote("Custom Promotional Products"), quote("Custom Corporate Gifts"), quote("Custom Event Products")],
      },
    ],
  },
  {
    slug: "corporate-gifts",
    label: "Corporate Gifts",
    image: "/images/categories/promotional-gifts.webp",
    sections: [
      { heading: "Gift Sets", items: [quote("Gift Sets"), quote("Executive Gift Sets"), product("Gift Boxes", "gift-boxes")] },
      {
        heading: "Drinkware",
        items: [product("Mugs", "ceramic-mugs"), quote("Tumblers"), product("Bottles", "branded-water-bottles")],
      },
      {
        heading: "Office & Tech",
        items: [
          quote("Diaries"),
          product("Pens", "branded-pens"),
          product("Power Banks", "branded-power-banks"),
          product("USB Drives", "usb-drives"),
        ],
      },
      {
        heading: "Holders & Bags",
        items: [
          product("Keychains", "custom-keychains"),
          quote("Card Holders"),
          quote("Business Card Holders"),
          product("Bags", "branded-paper-bags"),
          quote("Promotional Accessories"),
        ],
      },
    ],
  },
  {
    slug: "event-printing",
    label: "Event Printing",
    image: "/images/categories/marketing-print.webp",
    sections: [
      {
        heading: "Invitations & Papers",
        items: [
          product("Invitations", "invitation-cards-standard"),
          product("Posters", "event-posters-a2"),
          product("Menus", "restaurant-menus"),
          quote("Table Mats"),
          product("Certificates", "certificates-standard"),
        ],
      },
      {
        heading: "Backdrops & Signage",
        items: [
          quote("Event Backdrops"),
          quote("Photo Booth Backdrops"),
          quote("Welcome Boards"),
          quote("Event Signage"),
          product("Banners", "mesh-banners"),
        ],
      },
      {
        heading: "Badges & Tables",
        items: [
          product("Name Badges", "event-lanyards-badges"),
          product("ID Cards", "id-cards"),
          product("Lanyards", "event-lanyards-badges"),
          product("Table Numbers", "table-tent-cards"),
        ],
      },
      {
        heading: "Giveaways & Awards",
        items: [quote("Promotional Giveaways"), quote("Awards & Trophies")],
      },
    ],
  },
  {
    slug: "photo-products",
    label: "Photo Products",
    image: "/images/categories/large-format.webp",
    sections: [
      {
        heading: "Photobooks & Albums",
        items: [quote("Photobooks"), quote("Hardcover Photobooks"), quote("Photo Albums")],
      },
      {
        heading: "Canvas & Wall Art",
        items: [product("Canvas Prints", "large-canvas-prints"), quote("Framed Canvas"), product("Wall Art", "wall-murals")],
      },
      { heading: "Gifts", items: [quote("Personalized Photo Gifts")] },
    ],
  },
  {
    slug: "design-services",
    label: "Design Services",
    image: "/images/categories/marketing-print.webp",
    sections: [
      {
        heading: "Brand",
        items: [quote("Logo Design"), quote("Brand Identity"), quote("Social Media Design")],
      },
      {
        heading: "Print & Packaging",
        items: [quote("Packaging Design"), quote("Menu Design"), quote("Print-Ready Artwork")],
      },
      { heading: "Video", items: [quote("Motion Graphics"), quote("Video Editing")] },
    ],
  },
  {
    slug: "occasions-industries",
    label: "Occasions & Industries",
    image: "/images/categories/marketing-print.webp",
    sections: [
      { heading: "Occasions", items: [quote("Saudi National Day"), quote("Saudi Franchise Expo")] },
      { heading: "Industries", items: [quote("Restaurants")] },
      { heading: "Special Offers", items: [quote("Special offers")] },
    ],
  },
];
