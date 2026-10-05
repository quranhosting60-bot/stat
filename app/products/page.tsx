"use client";

import { useState } from "react";
import Reveal from "@/components/Reveal";
import ProductCard from "@/components/ProductCard";
import { products } from "@/data/products";
import { categories } from "@/data/categories";
import { useLang, localize } from "@/lib/i18n";

export default function AllProductsPage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const { lang } = useLang();

  const filtered = activeCategory ? products.filter((p) => p.category === activeCategory) : products;

  return (
    <div className="mx-auto max-w-content px-6 py-14">
      <Reveal>
        <p className="text-sm font-medium text-cyan-deep">Catalogue</p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-navy sm:text-5xl">All products</h1>
        <p className="mt-3 text-navy/60">{products.length} products across {categories.length} categories.</p>
      </Reveal>

      <Reveal delay={0.08} className="mt-8 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory(null)}
          className={`focus-ring rounded-pill px-4 py-2 text-sm font-medium transition-colors ${
            activeCategory === null ? "bg-navy text-white" : "border border-line bg-white text-navy/70 hover:bg-mist"
          }`}
        >
          All
        </button>
        {categories.map((c) => (
          <button
            key={c.slug}
            onClick={() => setActiveCategory(c.slug)}
            className={`focus-ring rounded-pill px-4 py-2 text-sm font-medium transition-colors ${
              activeCategory === c.slug ? "bg-navy text-white" : "border border-line bg-white text-navy/70 hover:bg-mist"
            }`}
          >
            {localize(c, "name", lang)}
          </button>
        ))}
      </Reveal>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:gap-5 lg:grid-cols-4">
        {filtered.map((p, i) => (
          <Reveal key={p.slug} delay={Math.min(i * 0.03, 0.4)}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </div>
  );
}
