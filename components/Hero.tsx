"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const trustPoints = ["7 product categories", "100+ products", "Delivery across Saudi Arabia"];

/**
 * Hero with a full-bleed background video.
 * Drop the client's clip at public/videos/hero.mp4 (and optionally hero.webm).
 * Until it loads — or if it is missing — a slowly zooming photo is shown instead.
 */
export default function Hero() {
  const [videoReady, setVideoReady] = useState(false);

  return (
    <section className="relative isolate -mt-[78px] overflow-hidden rounded-b-[2.5rem] bg-navy-deep">
      <div className="absolute inset-0 -z-10">
        <div className="hero-kenburns absolute inset-0">
          <Image
            src="/images/products/standee-cutouts.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
            priority
          />
        </div>
        <video
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 motion-reduce:hidden ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
          onLoadedData={() => setVideoReady(true)}
        >
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-r from-navy-deep/95 via-navy-deep/75 to-navy-deep/25" />
        <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-navy-deep/80 to-transparent" />
      </div>

      <div className="mx-auto max-w-content px-5 pb-14 pt-32 sm:px-6 sm:pb-28 sm:pt-48">
        <div className="max-w-2xl">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 rounded-pill border border-white/20 bg-white/10 px-4 py-1.5 text-sm text-white/85 backdrop-blur"
          >
            <span className="h-1.5 w-1.5 rounded-pill bg-cyan" />
            Printing partner for Saudi businesses
          </motion.p>

          <h1 className="mt-5 font-display text-[2.1rem] font-semibold leading-[1.1] tracking-tight text-white sm:text-[3.8rem]">
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
            className="mt-4 max-w-md text-sm sm:mt-6 sm:text-base leading-relaxed text-white/80 sm:text-lg"
          >
            Business cards to vehicle wraps, one shop handles the full spec sheet — clear pricing, real turnaround
            times, no surprises at pickup.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="mt-6 flex flex-wrap items-center gap-3 sm:mt-8"
          >
            <Link
              href="/contact"
              className="focus-ring rounded-pill bg-cyan px-6 py-3.5 text-sm font-semibold text-white shadow-[0_10px_24px_rgba(23,171,221,0.35)] transition-all hover:-translate-y-0.5 hover:bg-cyan-deep"
            >
              Request a quote
            </Link>
            <Link
              href="/products"
              className="focus-ring rounded-pill border border-white/30 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Browse all products
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.75 }}
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-white/15 pt-6"
          >
            {trustPoints.map((point) => (
              <div key={point} className="flex items-center gap-2 text-sm text-white/75">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#17ABDD" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {point}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
