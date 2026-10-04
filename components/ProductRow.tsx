"use client";

import { Product } from "@/data/products";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

export default function ProductRow({
  title,
  products,
  reverse = false,
}: {
  title: string;
  products: Product[];
  /** Scroll right instead of left, so stacked rows drift in opposite directions. */
  reverse?: boolean;
}) {
  if (products.length === 0) return null;

  // Duplicate the list so the CSS marquee can loop seamlessly from -50%.
  const looped = [...products, ...products];
  const duration = Math.max(products.length * 10, 60); // slow, easy-to-read drift

  return (
    <section className="mx-auto max-w-content px-6 py-12">
      <Reveal>
        <h2 className="font-display text-2xl font-semibold text-navy sm:text-3xl">{title}</h2>
      </Reveal>
      <Reveal delay={0.08} className="mt-6 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_24px,black_calc(100%-24px),transparent)]">
        <div
          className={`marquee-row flex w-max gap-4 ${reverse ? "marquee-reverse" : ""}`}
          style={{ animationDuration: `${duration}s` }}
        >
          {looped.map((p, i) => (
            <div key={`${p.slug}-${i}`} className="h-[360px] w-[220px] flex-shrink-0 sm:w-[260px]">
              <ProductCard product={p} />
            </div>
          ))}
        </div>
      </Reveal>
    </section>
  );
}
