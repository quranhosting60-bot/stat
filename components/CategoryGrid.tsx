import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";
import CornerBadge from "./CornerBadge";
import Reveal from "./Reveal";

const spans = [
  "lg:col-span-2 lg:row-span-2",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-1",
  "lg:col-span-2",
  "lg:col-span-1",
];

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-content px-6 py-20">
      <Reveal className="mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-3xl font-semibold text-navy sm:text-4xl">
            Six ways to put your name on something
          </h2>
          <p className="mt-2 max-w-lg text-navy/60">
            Pick a category to see products, specs and pricing — every job is quoted
            before it goes to press.
          </p>
        </div>
      </Reveal>

      <div className="grid auto-rows-[190px] grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {categories.map((cat, i) => {
          const isLarge = i === 0;
          return (
            <Reveal key={cat.slug} delay={i * 0.06} className={spans[i]}>
              <Link
                href={`/categories/${cat.slug}`}
                className="group focus-ring relative flex h-full flex-col justify-end overflow-hidden rounded-3xl border border-line transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(11,42,64,0.12)]"
              >
                <Image
                  src={cat.photo}
                  alt={cat.name}
                  fill
                  sizes="(min-width: 1024px) 50vw, 100vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/20 to-transparent" />
                <CornerBadge />
                <div className="relative p-6">
                  <h3 className={`font-display font-semibold text-white ${isLarge ? "text-2xl" : "text-lg"}`}>
                    {cat.name}
                  </h3>
                  <p className={`mt-1 text-white/75 ${isLarge ? "max-w-sm text-sm" : "text-xs"}`}>
                    {cat.tagline}
                  </p>
                </div>
              </Link>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
