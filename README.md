# Smart Printing — Website

Next.js 14 (TypeScript + Tailwind CSS + Framer Motion) website for Smart Printing,
styled after the Symmetra reference design (rounded pill navigation, numbered
process steps, asymmetric bento product grid, circular arrow corner badges) using
your brand colours (cyan `#17ABDD` + navy `#0B2A40`) instead of Symmetra's orange.

## Running it locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

## Building for production

```bash
npm run build
npm start
```

Deploy easily to [Vercel](https://vercel.com) (just import the project — zero config
needed), or run `npm run build && npm start` on any Node.js host.

## 3 things you must change before launch

1. **WhatsApp number** — open `lib/whatsapp.ts` and replace `WHATSAPP_NUMBER` with
   your real business number (country code + digits only, no `+` or spaces, e.g.
   `966501234567`). This number receives every checkout and contact-form
   submission.
2. **Products & prices** — open `data/products.ts` and `data/categories.ts`. There
   is no database; every product, price, option and description is a plain object
   in these two files. Edit, add, or remove entries directly.
3. **Contact details** — update the phone/email/address shown in
   `components/Footer.tsx` and `app/contact/page.tsx`.

## Project structure

```
app/                  Pages (App Router)
  page.tsx            Homepage
  categories/[slug]/  Category listing pages (6 categories)
  products/[slug]/    Product detail pages (24 products)
  cart/               Cart page
  checkout/           Checkout → sends order to WhatsApp
  about/, contact/, terms/, privacy/
components/           Reusable UI (Nav, Footer, cards, forms, icons)
data/                 categories.ts and products.ts — all static content
lib/
  cart-context.tsx    Cart state, persisted to localStorage
  whatsapp.ts         Builds the WhatsApp order-message links
public/images/logo.png
```

## How ordering works (no database, no payment gateway)

Products, prices and options are hardcoded in `data/products.ts`. A visitor adds
items to a cart (kept in their browser's localStorage), then submits the checkout
form. That opens WhatsApp with the full order — items, options, quantities,
estimated total, and the customer's name/phone/city — pre-filled as a message to
your business number. You confirm final pricing and take payment directly with the
customer from there. There is no online payment processing and no order database;
if you outgrow this later, the next step is usually a proper backend with an admin
panel and payment gateway.

## Design notes

- **Colours**: cyan `#17ABDD` / navy `#0B2A40` pulled from your logo, plus a light
  paper background and a soft cyan-tinted `mist` section colour.
- **Type**: Space Grotesk (headlines) + Inter (body), both self-hosted via npm
  packages (`@fontsource/*`) so there's no external font request at runtime.
- **Icons**: all product/category icons are original SVGs (business card stack,
  banner, box, mug, polo shirt, etc.) drawn in your brand colours — no stock
  photography, so there's nothing to replace for copyright reasons. If you'd
  rather use real product photos later, swap `CategoryIcon` usages for
  `next/image` once you have photography.
