"use client";

import { useEffect, useRef, useState } from "react";
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
  const videoRef = useRef<HTMLVideoElement>(null);

  // The clip is small and often finishes loading BEFORE React attaches its
  // onLoadedData handler, so that event can be missed and the video would stay
  // hidden forever. Check the current state on mount, listen for several events,
  // and start playback explicitly (autoplay needs muted set on the element).
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    const ready = () => setVideoReady(true);
    v.muted = true;
    v.defaultMuted = true;
    if (v.readyState >= 2) ready();
    v.addEventListener("loadeddata", ready);
    v.addEventListener("canplay", ready);
    v.addEventListener("playing", ready);
    v.play().catch(() => {
      /* blocked (e.g. iOS Low Power Mode): the banner picture stays visible */
    });
    return () => {
      v.removeEventListener("loadeddata", ready);
      v.removeEventListener("canplay", ready);
      v.removeEventListener("playing", ready);
    };
  }, []);

  return (
    <section className="relative isolate -mt-[78px] overflow-hidden rounded-b-[2.5rem] bg-navy-deep">
      <div className="absolute inset-0 -z-10">
        <div className="hero-kenburns absolute inset-0">
          <Image
            src="/images/hero-banner.webp"
            alt=""
            fill
            sizes="100vw"
            className="object-cover object-[72%_center] sm:object-center"
            priority
          />
        </div>
        <video
          ref={videoRef}
          poster="/images/hero-banner.webp"
          className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-1000 ${
            videoReady ? "opacity-100" : "opacity-0"
          }`}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        >
          <source src="/videos/hero.webm" type="video/webm" />
          <source src="/videos/hero.mp4" type="video/mp4" />
        </video>
        {/* the banner already has a dark left side for the text; phones get an extra veil for readability */}
        <div className="absolute inset-0 bg-navy-deep/60 sm:bg-gradient-to-r sm:from-navy-deep/50 sm:via-navy-deep/10 sm:to-transparent" />
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
