import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";
import CornerBadge from "./CornerBadge";
import Reveal from "./Reveal";

// 7 categories on a 4-column grid: one 2x2 hero tile, four small tiles, two wide tiles — no gaps.
const spans = [
  "col-span-2 lg:row-span-2",
  "col-span-1",
  "col-span-1",
  "col-span-1",
  "col-span-1",
  "col-span-1 lg:col-span-2",
  "col-span-1 lg:col-span-2",
];

export default function CategoryGrid() {
  return (
    <section className="mx-auto max-w-content px-4 py-10 sm:px-6 sm:py-20">
      <Reveal className="mb-6 flex sm:mb-10 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-semibold text-navy sm:text-4xl">
            Seven ways to put your name on something
          </h2>
          <p className="mt-2 max-w-lg text-navy/60">
            Pick a category to see products, specs and pricing — every job is quoted
            before it goes to press.
          </p>
        </div>
      </Reveal>

      <div className="grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[190px] sm:gap-4 lg:grid-cols-4">
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
                <div className="absolute inset-0 bg-gradient-to-t from-navy/85 via-navy/30 to-navy/5" />
                <CornerBadge />
                <div className="relative p-3.5 sm:p-6">
                  <h3 className={`font-display font-semibold text-white ${isLarge ? "text-xl sm:text-2xl" : "text-sm sm:text-lg"}`}>
                    {cat.name}
                  </h3>
                  <p className={`mt-1 text-white/75 ${isLarge ? "max-w-sm text-xs sm:text-sm" : "hidden text-xs sm:block"}`}>
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
