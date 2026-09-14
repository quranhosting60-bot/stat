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

      <div className="mt-6 grid gap-10 lg:grid-cols-2">
        <Reveal>
          <div className="relative aspect-square overflow-hidden rounded-3xl border border-line bg-mist">
            <Image
              src={product.photo ?? category.photo}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="object-cover transition-transform duration-500 hover:scale-105"
              priority
            />
          </div>
          <div className="mt-6 grid grid-cols-3 gap-3">
            {product.specs.map((spec, i) => (
              <Reveal key={spec.label} delay={0.1 + i * 0.06} y={10}>
                <div className="rounded-2xl border border-line bg-white p-4">
                  <p className="text-xs text-navy/50">{spec.label}</p>
                  <p className="mt-1 text-sm font-medium text-navy">{spec.value}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <p className="text-sm font-medium text-cyan-deep">{category.name}</p>
          <h1 className="mt-2 font-display text-3xl font-semibold text-navy sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-3 text-navy/60">{product.description}</p>
          <p className="mt-4 font-display text-xl font-semibold text-navy">
            From SAR {product.basePrice.toLocaleString()}{" "}
            <span className="text-sm font-normal text-navy/50">{product.unit}</span>
          </p>

          <div className="mt-6">
            <AddToCartForm product={product} />
          </div>
        </Reveal>
      </div>
    </div>
  );
}
