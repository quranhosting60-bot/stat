"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { categories } from "@/data/categories";

const floaters = [
  { slug: categories[0].slug, x: "4%", y: "6%", size: 128, delay: 0 },
  { slug: categories[2].slug, x: "52%", y: "0%", size: 96, delay: 0.08 },
  { slug: categories[4].slug, x: "68%", y: "42%", size: 116, delay: 0.16 },
  { slug: categories[1].slug, x: "8%", y: "56%", size: 100, delay: 0.24 },
] as const;

export default function Hero() {
  return (
    <section className="mx-auto max-w-content px-6 pb-16 pt-14 sm:pt-20">
      <div className="grid items-center gap-14 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-pill border border-line bg-white px-4 py-1.5 text-sm text-navy/70"
          >
            <span className="h-1.5 w-1.5 rounded-pill bg-cyan" />
            Printing partner for Saudi businesses
          </motion.p>

          <h1 className="mt-6 font-display text-[2.6rem] font-semibold leading-[1.08] text-navy sm:text-6xl">
            {["Printing you", "can plan a", "launch around."].map((line, i) => (
              <span key={line} className="block overflow-hidden">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.6, delay: 0.15 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="mt-6 max-w-md text-base text-navy/70 sm:text-lg"
          >
            Business cards to vehicle wraps, one shop handles the full spec sheet —
            clear pricing, real turnaround times, no surprises at pickup.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <Link
              href="/contact"
              className="focus-ring rounded-pill bg-cyan px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-cyan-deep"
            >
              Request a quote
            </Link>
            <Link
              href="/categories/business-stationery"
              className="focus-ring rounded-pill border border-navy/15 px-6 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-mist"
            >
              Browse categories
            </Link>
          </motion.div>
        </div>

        <div className="relative hidden aspect-square lg:block">
          {floaters.map((f) => (
            <motion.div
              key={f.slug}
              initial={{ opacity: 0, scale: 0.85, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 + f.delay, ease: [0.22, 1, 0.36, 1] }}
              className="absolute overflow-hidden rounded-3xl border border-line bg-white shadow-[0_16px_40px_rgba(11,42,64,0.1)]"
              style={{ left: f.x, top: f.y, width: f.size, height: f.size }}
            >
              <Image
                src={categories.find((c) => c.slug === f.slug)!.photo}
                alt=""
                fill
                sizes="150px"
                className="object-cover"
              />
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute bottom-0 right-0 flex h-40 w-40 flex-col items-center justify-center rounded-pill bg-navy text-white"
          >
            <span className="font-display text-3xl font-semibold">6</span>
            <span className="mt-1 px-4 text-center text-xs leading-tight text-white/70">
              print categories, one supplier
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
