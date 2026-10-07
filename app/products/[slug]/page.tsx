import { notFound } from "next/navigation";
import Link from "next/link";
import ProductGallery from "@/components/ProductGallery";
import { products, getProduct } from "@/data/products";
import { getCategory } from "@/data/categories";
import AddToCartForm from "@/components/AddToCartForm";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) return {};
  return {
    title: `${product.name} — Smart Printing`,
    description: product.shortDescription,
  };
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();
  const category = getCategory(product.category)!;
  const luxe = !!product.luxe;

  return (
    <div className="mx-auto max-w-content px-4 py-6 sm:px-6 sm:py-14">
      <nav className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-navy/50 sm:text-sm">
        <Link href="/" className="focus-ring hover:text-navy">Home</Link>
        <span>/</span>
        <Link href={`/categories/${category.slug}`} className="focus-ring hover:text-navy">
          {category.name}
        </Link>
        <span>/</span>
        <span className="text-navy">{product.name}</span>
      </nav>

      <div
        className={`mt-4 grid grid-cols-1 gap-6 sm:mt-6 lg:grid-cols-2 lg:gap-10 ${
          luxe
            ? "rounded-3xl border border-[#c9a45c]/30 bg-gradient-to-br from-[#07121a] via-[#0c2030] to-[#143049] p-3 shadow-[0_30px_70px_rgba(7,18,26,0.35)] sm:rounded-[2rem] sm:p-10"
            : ""
        }`}
      >
        <Reveal className="min-w-0">
          <ProductGallery
            images={[product.photo ?? category.photo, ...(product.gallery ?? [])]}
            alt={product.name}
            luxe={luxe}
          />
          <div className="mt-4 grid grid-cols-2 gap-2 sm:mt-6 sm:grid-cols-3 sm:gap-3">
            {product.specs.map((spec, i) => (
              <Reveal key={spec.label} delay={0.1 + i * 0.06} y={10}>
                <div
                  className={`h-full min-w-0 rounded-2xl border p-3 sm:p-4 ${
                    luxe ? "border-[#c9a45c]/25 bg-white/5" : "border-line bg-white"
                  }`}
                >
                  <p className={`text-xs ${luxe ? "text-white/50" : "text-navy/50"}`}>{spec.label}</p>
                  <p className={`mt-1 break-words text-sm font-medium ${luxe ? "text-white" : "text-navy"}`}>{spec.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1} className="min-w-0">
          {luxe ? (
            <p className="inline-flex items-center gap-2 rounded-pill border border-[#c9a45c]/50 bg-[#c9a45c]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#e9cf93]">
              <span aria-hidden>★</span> Premium collection
            </p>
          ) : (
            <p className="text-sm font-medium text-cyan-deep">{category.name}</p>
          )}
          <h1
            className={`mt-2 break-words font-display text-2xl font-semibold sm:text-4xl ${
              luxe ? "foil-text" : "text-navy"
            }`}
          >
            {product.name}
          </h1>
          <p className={`mt-3 ${luxe ? "text-white/70" : "text-navy/60"}`}>{product.description}</p>
          <p className={`mt-4 font-display text-xl font-semibold ${luxe ? "text-white" : "text-navy"}`}>
            From SAR {product.basePrice.toLocaleString()}{" "}
            <span className={`text-sm font-normal ${luxe ? "text-white/50" : "text-navy/50"}`}>{product.unit}</span>
          </p>

          <div className="mt-6">
            <AddToCartForm product={product} />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
