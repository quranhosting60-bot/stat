import { products, Product } from "@/data/products";
import { categories, Category } from "@/data/categories";

export interface ChatReply {
  text: string;
  products?: Product[];
  quickReplies?: string[];
}

const GREETING_WORDS = ["hi", "hello", "hey", "salam", "assalam", "asalam", "marhaba", "yo"];
const PRICE_WORDS = ["price", "cost", "how much", "rate", "quote", "pricing", "sar", "cheap", "budget"];
const TURNAROUND_WORDS = ["turnaround", "how long", "delivery time", "fast", "quick", "when will", "days"];
const DELIVERY_WORDS = ["deliver", "delivery", "ship", "shipping", "riyadh", "city", "outside"];
const CUSTOM_WORDS = ["custom", "bespoke", "not listed", "special", "different", "unique"];
const ORDER_WORDS = ["order", "buy", "checkout", "cart", "how do i order", "purchase"];
const CONTACT_WORDS = ["contact", "whatsapp", "phone", "call", "email", "human", "agent", "talk to someone"];

function normalize(s: string) {
  return s.toLowerCase().replace(/[^\w\s]/g, " ").replace(/\s+/g, " ").trim();
}

function includesAny(text: string, words: string[]) {
  return words.some((w) => text.includes(w));
}

function scoreProduct(p: Product, tokens: string[]) {
  const haystack = normalize(
    `${p.name} ${p.shortDescription} ${p.description} ${p.category} ${p.specs.map((s) => s.value).join(" ")}`
  );
  let score = 0;
  for (const t of tokens) {
    if (t.length < 3) continue;
    if (haystack.includes(t)) score += 1;
    // light stemming: singular/plural match
    if (t.endsWith("s") && haystack.includes(t.slice(0, -1))) score += 0.5;
  }
  return score;
}

function scoreCategory(c: Category, tokens: string[]) {
  const haystack = normalize(`${c.name} ${c.tagline} ${c.description} ${c.slug.replace(/-/g, " ")}`);
  let score = 0;
  for (const t of tokens) {
    if (t.length < 3) continue;
    if (haystack.includes(t)) score += 1;
  }
  return score;
}

function pickRecommendations(base: Product, count = 3): Product[] {
  const sameCategory = products.filter((p) => p.category === base.category && p.slug !== base.slug);
  return sameCategory.slice(0, count);
}

export function getChatReply(rawMessage: string): ChatReply {
  const message = normalize(rawMessage);
  const tokens = message.split(" ").filter(Boolean);

  if (!message) {
    return {
      text: "Ask me about a product, a category, pricing, or turnaround time — I can also suggest what fits your job.",
      quickReplies: ["Business cards", "Banners", "Packaging", "Turnaround time"],
    };
  }

  if (GREETING_WORDS.some((w) => tokens.includes(w))) {
    return {
      text:
        "Hi! I'm the Smart Printing assistant. Tell me what you need printed — business cards, banners, packaging, apparel, promo gifts — and I'll pull up the right products and pricing.",
      quickReplies: ["Business cards", "Banners", "Mugs", "Custom boxes"],
    };
  }

  // score categories and products against the message first, so a specific
  // product/category name always wins over a generic keyword like "ship"
  const catScores = categories
    .map((c) => ({ c, score: scoreCategory(c, tokens) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  const prodScores = products
    .map((p) => ({ p, score: scoreProduct(p, tokens) }))
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score);

  const asksPrice = includesAny(message, PRICE_WORDS);
  const asksTurnaround = includesAny(message, TURNAROUND_WORDS);

  // Strong single-product match
  if (prodScores.length > 0 && prodScores[0].score >= 1.5) {
    const best = prodScores[0].p;
    const recs = pickRecommendations(best);
    let text = `${best.name} — ${best.shortDescription} Starting from SAR ${best.basePrice.toLocaleString()} ${best.unit}, minimum order ${best.minQty}.`;
    if (asksTurnaround) {
      const cat = categories.find((c) => c.slug === best.category)!;
      text += ` Typical turnaround for this category is ${cat.turnaround}.`;
    }
    if (recs.length) {
      text += ` A few others tend to get ordered alongside it:`;
    }
    return { text, products: recs.length ? recs : [best] };
  }

  // Category match (e.g. "banners", "packaging", "apparel")
  if (catScores.length > 0) {
    const best = catScores[0].c;
    const catProducts = products.filter((p) => p.category === best.slug).slice(0, 3);
    let text = `${best.name}: ${best.description} Typical turnaround is ${best.turnaround}.`;
    if (asksPrice && catProducts.length) {
      const cheapest = [...catProducts].sort((a, b) => a.basePrice - b.basePrice)[0];
      text += ` Prices in this range start around SAR ${cheapest.basePrice.toLocaleString()} ${cheapest.unit}.`;
    }
    text += ` Here's what's available:`;
    return { text, products: catProducts };
  }

  if (includesAny(message, CONTACT_WORDS)) {
    return {
      text:
        "You can reach the team directly on WhatsApp using the green button in the corner, or through the Contact page — they usually reply the same working day.",
      quickReplies: ["Turnaround time", "How do I order"],
    };
  }

  if (includesAny(message, ORDER_WORDS)) {
    return {
      text:
        "Ordering is simple: open a product, choose your options and quantity, add it to the cart, then check out. Checkout sends the full order to WhatsApp so we can confirm final pricing before anything is printed — no online payment needed.",
      quickReplies: ["Business cards", "Banners", "Turnaround time"],
    };
  }

  if (includesAny(message, CUSTOM_WORDS)) {
    return {
      text:
        "If it's not listed as a product, send a description or reference image on WhatsApp — most custom print or packaging jobs get quoted within a day.",
      quickReplies: ["Contact", "Packaging", "Banners"],
    };
  }

  if (includesAny(message, DELIVERY_WORDS)) {
    return {
      text:
        "Delivery covers all of Saudi Arabia through courier partners — exact timing depends on the city and gets confirmed with your quote. Pickup from the Riyadh branch is also available.",
      quickReplies: ["Turnaround time", "How do I order"],
    };
  }

  // Weak product match fallback
  if (prodScores.length > 0) {
    const best = prodScores[0].p;
    const recs = pickRecommendations(best, 2);
    return {
      text: `Closest match I found is ${best.name} — ${best.shortDescription} From SAR ${best.basePrice.toLocaleString()} ${best.unit}.`,
      products: [best, ...recs],
    };
  }

  if (asksPrice) {
    return {
      text:
        "Pricing depends on the product, finish and quantity — every product page shows a starting price, and the cart gives you a live subtotal before checkout. What are you looking to print?",
      quickReplies: ["Business cards", "Banners", "Packaging", "Apparel"],
    };
  }

  if (asksTurnaround) {
    return {
      text:
        "Turnaround varies by category: stationery 2–3 days, marketing print 2–4 days, large format 3–5 days, packaging & labels 4–6 days, promo gifts 3–5 days, apparel 5–7 days.",
      quickReplies: ["Business cards", "Banners", "Packaging"],
    };
  }

  return {
    text:
      "I couldn't find an exact match for that. Try naming a product or category — business cards, banners, mugs, packaging, apparel — or ask about pricing, turnaround, or ordering.",
    quickReplies: ["Business cards", "Banners", "Packaging", "Apparel"],
  };
}
