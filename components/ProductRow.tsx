import { Product } from "@/data/products";
import ProductCard from "./ProductCard";
import Reveal from "./Reveal";

export default function ProductRow({
  title,
  products,
}: {
  title: string;
  products: Product[];
}) {
  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-content px-6 py-12">
      <Reveal>
        <h2 className="font-display text-2xl font-semibold text-navy sm:text-3xl">{title}</h2>
      </Reveal>
      <div className="mt-6 -mx-6 flex snap-x gap-4 overflow-x-auto px-6 pb-2">
        {products.map((p, i) => (
          <Reveal key={p.slug} delay={i * 0.05} className="w-[220px] flex-shrink-0 snap-start sm:w-[260px]">
            <ProductCard product={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
