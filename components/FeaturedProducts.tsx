import Link from "next/link";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

const featuredSlugs = [
  "premium-business-cards",
  "roll-up-banners",
  "ceramic-mugs",
  "custom-mailer-boxes",
];

export default function FeaturedProducts() {
  const featured = featuredSlugs
    .map((slug) => products.find((p) => p.slug === slug))
    .filter(Boolean) as typeof products;

  return (
    <section className="mx-auto max-w-content px-6 py-20">
      <Reveal className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-semibold text-navy sm:text-4xl">
            Most reordered
          </h2>
          <p className="mt-2 max-w-lg text-navy/60">
            The products businesses come back for every quarter.
          </p>
        </div>
        <Link
          href="/categories/business-stationery"
          className="focus-ring text-sm font-medium text-cyan-deep hover:text-navy"
        >
          View all products
        </Link>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {featured.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.07}>
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
