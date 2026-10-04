import { notFound } from "next/navigation";
import Link from "next/link";
import { collections, getCollection } from "@/data/collections";
import CollectionBlurbs from "@/components/CollectionBlurbs";
import Reveal from "@/components/Reveal";

// Collections that belong to a category are shown on that category's page; the rest live here.
const standalone = collections.filter((c) => !c.categorySlug);

export function generateStaticParams() {
  return standalone.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const c = getCollection(params.slug);
  if (!c) return {};
  return { title: `${c.title} — Smart Printing`, description: c.intro };
}

export default function CollectionPage({ params }: { params: { slug: string } }) {
  const collection = standalone.find((c) => c.slug === params.slug);
  if (!collection) notFound();

  return (
    <div className="mx-auto max-w-content px-6 py-14">
      <nav className="text-sm text-navy/50">
        <Link href="/" className="focus-ring hover:text-navy">Home</Link>
        <span className="mx-2">/</span>
        <span className="text-navy">{collection.title}</span>
      </nav>

      <Reveal className="mt-6 rounded-3xl bg-navy p-8 text-white sm:p-12">
        <h1 className="font-display text-3xl font-semibold sm:text-4xl">{collection.title}</h1>
        <p className="mt-4 max-w-2xl text-white/75">{collection.intro}</p>
        <Link
          href={`/quote?item=${encodeURIComponent(collection.title)}`}
          className="focus-ring mt-6 inline-block rounded-pill bg-cyan px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-cyan-deep"
        >
          Request a quote
        </Link>
      </Reveal>

      <div className="mt-12">
        <CollectionBlurbs blurbs={collection.blurbs} />
      </div>

      <Reveal className="mt-16">
        <Link href="/products" className="focus-ring text-sm font-semibold text-cyan-deep hover:text-navy">
          Browse all products →
        </Link>
      </Reveal>
    </div>
  );
}
