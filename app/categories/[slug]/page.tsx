import { notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { categories, getCategory } from "@/data/categories";
import { getProductsByCategory } from "@/data/products";
import ProductCard from "@/components/ProductCard";
import Reveal from "@/components/Reveal";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const category = getCategory(params.slug);
  if (!category) return {};
  return {
    title: `${category.name} — Smart Printing`,
    description: category.description,
  };
}

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const category = getCategory(params.slug);
  if (!category) notFound();

  const productList = getProductsByCategory(category.slug);
  const others = categories.filter((c) => c.slug !== category.slug);

  return (
    <div className="mx-auto max-w-content px-6 py-14">
      <nav className="text-sm text-navy/50">
        <Link href="/" className="focus-ring hover:text-navy">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-navy">{category.name}</span>
      </nav>

      <Reveal className="mt-6 overflow-hidden rounded-3xl border border-line bg-white">
        <div className="relative h-56 sm:h-72">
          <Image src={category.photo} alt={category.name} fill sizes="100vw" className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/80 via-navy/10 to-transparent" />
          <div className="absolute bottom-0 left-0 p-6 sm:p-8">
            <p className="text-sm font-medium text-cyan-soft">{category.tagline}</p>
            <h1 className="mt-2 font-display text-3xl font-semibold text-white sm:text-4xl">
              {category.name}
            </h1>
          </div>
        </div>
        <div className="p-6 sm:p-8">
          <p className="max-w-xl text-navy/60">{category.description}</p>
          <p className="mt-4 text-sm text-navy/50">
            Typical turnaround: <span className="font-medium text-navy">{category.turnaround}</span>
          </p>
        </div>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {productList.map((product, i) => (
          <Reveal key={product.slug} delay={i * 0.05}>
            <ProductCard product={product} />
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16">
        <h2 className="font-display text-xl font-semibold text-navy">Other categories</h2>
        <div className="mt-4 flex flex-wrap gap-2">
          {others.map((c) => (
            <Link
              key={c.slug}
              href={`/categories/${c.slug}`}
              className="focus-ring rounded-pill border border-line bg-white px-4 py-2 text-sm text-navy/70 transition-colors hover:bg-mist"
            >
              {c.name}
            </Link>
          ))}
        </div>
      </Reveal>
    </div>
  );
}
