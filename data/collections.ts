/**
 * Descriptive copy from the client's "Smart Print Website Updates" sheet.
 * A collection is a menu section (Large Format, Restaurants & Cafés …) with an intro and
 * one short blurb per sub-category. Chips link to a product page when the mega menu has a
 * matching label, otherwise to a WhatsApp quote request.
 */
export interface Blurb {
  title: string;
  text?: string;
  items?: string[];
}
export interface Collection {
  slug: string;
  title: string;
  intro: string;
  /** Shown on this category page. Collections without one get their own /collections/<slug> page. */
  categorySlug?: string;
  blurbs: Blurb[];
}

export const collections: Collection[] = [
  {
    slug: "large-format-printing",
    categorySlug: "large-format",
    title: "Large Format Printing",
    intro:
      "Make your brand impossible to miss with high-impact large-format printing — banners, posters, wall graphics, wallpapers, roll-up displays, pop-up systems and other large-scale visual solutions.",
    blurbs: [
      { title: "Posters & Banners", text: "Create attention-grabbing promotional displays for indoor and outdoor campaigns, events, retail spaces and corporate environments.", items: ["Posters", "Flex Banners", "Vinyl Banners", "3M Vinyl Graphics", "Backlit Prints", "Promotional Banners", "Event Banners", "Outdoor Banners"] },
      { title: "One-Way Vision", text: "Transform glass surfaces into powerful advertising spaces while maintaining visibility from inside. Ideal for storefronts, offices, vehicles and commercial buildings." },
      { title: "Window & Vinyl Graphics", text: "Promote your brand with professionally printed vinyl graphics suitable for windows, walls, doors, vehicles and other smooth surfaces." },
      { title: "Wallpapers", text: "Transform interiors with custom printed wallpapers designed for homes, offices, restaurants, hotels, retail spaces and commercial environments." },
      { title: "Canvas Printing", text: "Turn your artwork, photographs and creative designs into premium canvas prints for homes, offices, hotels, restaurants and galleries.", items: ["Canvas Prints", "Canvas With Frame", "Custom Wall Art"] },
      { title: "Roll-Up Banners", text: "Portable and professional advertising displays perfect for exhibitions, conferences, retail promotions, corporate events and presentations.", items: ["Standard Roll-Ups", "Premium Roll-Ups", "Double-Sided Roll-Ups"] },
      { title: "X-Stand Banners", text: "Lightweight and portable display solutions that are easy to install and ideal for promotional campaigns, events and exhibitions." },
      { title: "Pop-Up Displays", text: "Create an impressive exhibition backdrop with professional pop-up display systems available in straight and curved formats.", items: ["Straight Pop-Up Displays", "Curved Pop-Up Displays", "Pop-Up Counters"] },
      { title: "Promotional Tables & Displays", text: "Create complete branded event setups with customized promotional tables and display solutions." },
      { title: "Acrylic Displays", text: "Present products, information and branding elegantly with professionally produced acrylic display solutions.", items: ["Acrylic Sign Holders", "Acrylic Name Plates", "Desk Stands", "Display Holders"] },
    ],
  },
  {
    slug: "packaging-boxes",
    categorySlug: "packaging-labels",
    title: "Packaging & Boxes",
    intro:
      "Packaging is more than protection — it is part of your brand experience. Customised packaging solutions for restaurants, retailers, e-commerce businesses, gifts and corporate products.",
    blurbs: [
      { title: "Fancy Boxes", text: "Give your products a premium presentation with customized rigid and specialty boxes designed around your brand." },
      { title: "Corrugated Boxes", text: "Strong and practical custom printed corrugated boxes suitable for shipping, e-commerce, retail and product packaging." },
      { title: "Gift Boxes", text: "Create memorable gifting experiences with customized gift boxes available in different sizes, styles and finishing options." },
      { title: "Fancy Gift Sets", text: "Combine premium packaging with branded promotional products to create elegant corporate and personal gift sets." },
      { title: "Cube Boxes", text: "Compact and versatile cube boxes ideal for gifts, promotional products, retail packaging and special occasions." },
      { title: "Soft Boxes", text: "Flexible packaging solutions suitable for a wide variety of products, gifts and promotional applications." },
      { title: "Food Packaging", items: ["Pizza Boxes", "Burger Boxes", "Meal Boxes", "Takeaway Boxes", "Bakery Boxes", "Cake Boxes", "Dessert Boxes", "Food Sleeves", "Paper Cups", "Custom Food Packaging"] },
      { title: "Paper Cups", text: "Promote your brand every time your customer enjoys a drink with custom printed disposable and insulated paper cups.", items: ["4 oz", "6 oz", "8 oz", "12 oz", "Custom Sizes"] },
      { title: "Dates & Specialty Boxes", text: "Premium custom packaging for dates, chocolates, sweets, gifts and specialty products." },
    ],
  },
  {
    slug: "promotional-products",
    categorySlug: "promotional-gifts",
    title: "Promotional Products",
    intro:
      "Put your brand into everyday life with customised promotional products. From pens and mugs to power banks, bags and corporate gift sets — memorable branded merchandise.",
    blurbs: [
      { title: "Mouse Pads", items: ["Standard Mouse Pads", "Leather Mouse Pads", "Gaming Mouse Pads", "Wrist Rest Mouse Pads", "Desk Organizer Mouse Pads"] },
      { title: "Mugs", text: "Create personalized mugs for corporate gifting, employee rewards, promotional campaigns, restaurants, cafés and special occasions." },
      { title: "Water Bottles", text: "Keep your brand visible throughout the day with customized reusable water bottles." },
      { title: "Travel Mugs & Tumblers", text: "Premium branded drinkware designed for offices, travel, events and corporate gifting." },
      { title: "Glassware", text: "Customize glass products for restaurants, cafés, hotels, corporate gifts and special events." },
      { title: "Pillows", text: "Add custom graphics, photographs, logos or promotional designs to personalized pillows." },
      { title: "Diaries & Agendas", text: "Professional branded diaries and agendas ideal for corporate gifts, employees, customers and events." },
      { title: "Pens", text: "Keep your brand in customers' hands with customized promotional pens." },
      { title: "USB Flash Drives", text: "Practical branded USB drives suitable for corporate gifts, conferences, training programs and promotional campaigns." },
      { title: "Power Banks", text: "Useful and memorable branded technology gifts for customers, employees and corporate events." },
      { title: "Stress Balls", text: "Fun promotional products designed for offices, events, employee campaigns and giveaways." },
      { title: "Balloons", text: "Customized balloons for birthdays, promotions, grand openings, events and celebrations." },
      { title: "Ribbons", text: "Branded ribbons for gifts, events, ceremonies and promotional packaging." },
      { title: "Tea Coasters", text: "Customized coasters for restaurants, cafés, hotels, offices and promotional campaigns." },
      { title: "Mobile Accessories", text: "Branded mobile accessories designed for practical everyday use and promotional gifting." },
      { title: "Business Card Cases", text: "Premium business card holders designed to complement professional corporate branding." },
    ],
  },
  {
    slug: "apparel-wearables",
    categorySlug: "branded-apparel",
    title: "Apparel & Wearables",
    intro: "Turn your team and customers into brand ambassadors with customised apparel and wearable promotional products.",
    blurbs: [
      { title: "T-Shirts", text: "Custom printed T-shirts for businesses, events, teams, restaurants, campaigns and promotional activities." },
      { title: "Polo Shirts", text: "Professional branded polo shirts ideal for employees, hospitality teams, retail staff, corporate events and uniforms." },
      { title: "Caps", text: "Promote your brand with customized caps suitable for employees, events, sports teams and promotional campaigns." },
      { title: "Badges", text: "Customized badges for employees, events, exhibitions, conferences, organizations and promotional campaigns." },
      { title: "Lanyards", text: "Branded lanyards are ideal for employee ID cards, visitor badges, exhibitions, conferences and corporate events." },
      { title: "Safety Products", text: "Customized safety and identification products for workplaces, events, construction environments and corporate operations." },
    ],
  },
  {
    slug: "corporate-event-branding",
    categorySlug: "signage-displays",
    title: "Corporate & Event Branding",
    intro:
      "Build a complete branded environment for your company, event or exhibition. From exhibition displays and promotional bags to trophies and corporate gifts, we provide integrated branding solutions.",
    blurbs: [
      { title: "Photobooks", text: "Preserve important memories, events, projects and corporate milestones with premium professionally printed photobooks." },
      { title: "Trophy Awards & Mementos", text: "Recognize achievements with customized trophies, awards and commemorative products designed for corporate events, schools, competitions and special occasions." },
      { title: "Promotional Bags", text: "Turn everyday bags into mobile advertising with customized branded bags.", items: ["Paper Bags", "Non-Woven Bags", "Cotton Bags", "Drawstring Bags", "Promotional Gift Bags"] },
      { title: "Exhibition & Events", text: "Create a complete branded presence for exhibitions, conferences, product launches and corporate events.", items: ["Exhibition Booth Branding", "Backdrops", "Roll-Up Displays", "Pop-Up Displays", "Promotional Counters", "Promotional Tables", "Acrylic Displays", "ID Cards", "Lanyards", "Event Signage", "Directional Signage", "Promotional Materials"] },
    ],
  },
  {
    slug: "signage-branding",
    categorySlug: "signage-displays",
    title: "Signage & Branding",
    intro: "Make your business easy to find and impossible to overlook with professionally produced signage and branding solutions.",
    blurbs: [
      { title: "Signage Solutions", items: ["Shop Signage", "LED Sign Boards", "3D Letter Signage", "Acrylic Signage", "Stainless Steel Signage", "Reception Signs", "Office Signs", "Door Signs", "Parking Signs", "Directional Signs", "Wall Branding", "Glass Branding", "Window Graphics", "Vehicle Branding", "Outdoor Signage", "Indoor Signage", "Illuminated Signs", "Menu Boards", "A-Frame Signs"] },
    ],
  },
  {
    slug: "restaurants-cafes",
    title: "Restaurants & Cafés",
    intro: "Complete restaurant and café branding solutions designed to create a consistent and professional customer experience.",
    blurbs: [
      { title: "Restaurant Branding", items: ["Restaurant Menus", "Table Menus", "Table Mats", "Takeaway Menus", "Food Packaging", "Pizza Boxes", "Burger Boxes", "Meal Boxes", "Paper Cups", "Stickers & Labels", "Business Cards", "Flyers", "Posters", "Outdoor Signage", "Window Graphics", "Wall Graphics", "Promotional Materials"] },
    ],
  },
  {
    slug: "custom-printing",
    title: "Custom Printing",
    intro: "Have something specific in mind? We provide custom printing solutions tailored to your required size, material, quantity, finish and application.",
    blurbs: [
      { title: "Custom Solutions", items: ["Custom Sizes", "Custom Materials", "Custom Shapes", "Custom Packaging", "Custom Branding", "Custom Signage", "Custom Promotional Products", "Custom Corporate Gifts", "Custom Event Products"] },
    ],
  },
  {
    slug: "corporate-gifts",
    title: "Corporate Gifts",
    intro: "Strengthen business relationships with professionally branded corporate gifts designed for clients, employees, partners and special occasions.",
    blurbs: [
      { title: "Gift Range", items: ["Gift Sets", "Executive Gift Sets", "Diaries", "Pens", "Mugs", "Tumblers", "Bottles", "Power Banks", "USB Drives", "Keychains", "Card Holders", "Business Card Holders", "Bags", "Promotional Accessories"] },
    ],
  },
  {
    slug: "event-printing",
    title: "Event Printing",
    intro: "From private celebrations to large corporate events, we provide customized printing and branding solutions for every occasion.",
    blurbs: [
      { title: "Event Range", items: ["Invitations", "Event Backdrops", "Banners", "Posters", "Welcome Boards", "Table Numbers", "Menus", "Table Mats", "Name Badges", "ID Cards", "Lanyards", "Event Signage", "Photo Booth Backdrops", "Promotional Giveaways", "Certificates", "Awards & Trophies"] },
    ],
  },
  {
    slug: "photo-products",
    title: "Photo Products",
    intro: "Turn your favorite photographs and creative artwork into premium physical products designed for personal, corporate and special occasions.",
    blurbs: [
      { title: "Photo Range", items: ["Photobooks", "Hardcover Photobooks", "Photo Albums", "Canvas Prints", "Framed Canvas", "Wall Art", "Personalized Photo Gifts"] },
    ],
  },
  {
    slug: "design-services",
    title: "Design Services",
    intro: "Our graphic design team can help with branding, artwork preparation, print-ready files, promotional designs and other creative requirements.",
    blurbs: [
      { title: "What we design", items: ["Logo Design", "Brand Identity", "Branding", "Social Media Design", "Packaging Design", "Menu Design", "Motion Graphics", "Video Editing", "Print-Ready Artwork"] },
    ],
  },
];

export const getCollection = (slug: string) => collections.find((c) => c.slug === slug);
export const collectionsForCategory = (categorySlug: string) => collections.filter((c) => c.categorySlug === categorySlug);
