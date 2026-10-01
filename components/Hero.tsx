"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const trustPoints = ["7 product categories", "90+ products", "Delivery across Saudi Arabia"];

export default function Hero() {
  return (
    <section className="mx-auto max-w-content px-6 pb-16 pt-14 sm:pt-20">
      <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]">
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

          <h1 className="mt-6 font-display text-[2.75rem] font-semibold leading-[1.08] tracking-tight text-navy sm:text-[3.4rem]">
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
            className="mt-6 max-w-md text-base leading-relaxed text-navy/70 sm:text-lg"
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
              className="focus-ring rounded-pill bg-cyan px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(23,171,221,0.3)] transition-all hover:-translate-y-0.5 hover:bg-cyan-deep hover:shadow-[0_14px_28px_rgba(23,171,221,0.38)]"
            >
              Request a quote
            </Link>
            <Link
              href="/products"
              className="focus-ring rounded-pill border border-navy/15 px-6 py-3.5 text-sm font-semibold text-navy transition-colors hover:bg-mist"
            >
              Browse all products
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="mt-9 flex flex-wrap items-center gap-x-6 gap-y-2 border-t border-line pt-6"
          >
            {trustPoints.map((point) => (
              <div key={point} className="flex items-center gap-2 text-sm text-navy/60">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#17ABDD" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {point}
              </div>
            ))}
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 16 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] border border-line bg-white shadow-[0_30px_60px_rgba(11,42,64,0.16)]">
            <Image
              src="/images/products/standee-cutouts.webp"
              alt="Smart Printing branded standees and displays"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
              priority
            />
          </div>
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="absolute -bottom-6 -left-6 flex h-28 w-28 flex-col items-center justify-center rounded-pill border-4 border-[#f6f9fb] bg-navy text-white shadow-[0_16px_32px_rgba(11,42,64,0.25)] sm:h-32 sm:w-32"
          >
            <span className="font-display text-2xl font-semibold sm:text-3xl">7</span>
            <span className="mt-0.5 px-3 text-center text-[10px] leading-tight text-white/70 sm:text-xs">
              print categories
            </span>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
