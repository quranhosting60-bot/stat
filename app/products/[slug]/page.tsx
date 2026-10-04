import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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
    <div className="mx-auto max-w-content px-6 py-14">
      <nav className="text-sm text-navy/50">
        <Link href="/" className="focus-ring hover:text-navy">Home</Link>
        <span className="mx-2">/</span>
        <Link href={`/categories/${category.slug}`} className="focus-ring hover:text-navy">
          {category.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-navy">{product.name}</span>
      </nav>

      <div
        className={`mt-6 grid gap-10 lg:grid-cols-2 ${
          luxe
            ? "rounded-[2rem] border border-[#c9a45c]/30 bg-gradient-to-br from-[#07121a] via-[#0c2030] to-[#143049] p-6 shadow-[0_30px_70px_rgba(7,18,26,0.35)] sm:p-10"
            : ""
        }`}
      >
        <Reveal>
          <div
            className={`foil-frame relative aspect-square overflow-hidden rounded-3xl bg-mist ${
              luxe ? "border-2 border-[#c9a45c]/70 shadow-[0_0_0_6px_rgba(201,164,92,0.12)]" : "border border-line"
            }`}
          >
            <Image
              src={product.photo ?? category.photo}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
              priority
            />
            {luxe && <span className="foil-sheen" aria-hidden />}
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {product.specs.map((spec, i) => (
              <Reveal key={spec.label} delay={0.1 + i * 0.06} y={10}>
                <div
                  className={`rounded-2xl border p-4 ${
                    luxe ? "border-[#c9a45c]/25 bg-white/5" : "border-line bg-white"
                  }`}
                >
                  <p className={`text-xs ${luxe ? "text-white/50" : "text-navy/50"}`}>{spec.label}</p>
                  <p className={`mt-1 text-sm font-medium ${luxe ? "text-white" : "text-navy"}`}>{spec.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          {luxe ? (
            <p className="inline-flex items-center gap-2 rounded-pill border border-[#c9a45c]/50 bg-[#c9a45c]/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#e9cf93]">
              <span aria-hidden>★</span> Premium collection
            </p>
          ) : (
            <p className="text-sm font-medium text-cyan-deep">{category.name}</p>
          )}
          <h1
            className={`mt-2 font-display text-3xl font-semibold sm:text-4xl ${
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
