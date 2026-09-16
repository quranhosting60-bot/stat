"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useLang } from "@/lib/i18n";

interface Slide {
  title: string;
  titleAr: string;
  subtitle: string;
  subtitleAr: string;
  href: string;
  bg: string;
}

const slides: Slide[] = [
  {
    title: "New: Signage & Displays is here",
    titleAr: "جديد: قسم اللافتات وواجهات العرض",
    subtitle: "Acrylic signs, light boxes and standees for retail spaces.",
    subtitleAr: "لافتات أكريليك وصناديق إضاءة وستاندات للمساحات التجارية.",
    href: "/categories/signage-displays",
    bg: "from-navy to-cyan-deep",
  },
  {
    title: "100+ products now live",
    titleAr: "أكثر من ١٠٠ منتج متاح الآن",
    subtitle: "Seven categories, one place to order everything you print.",
    subtitleAr: "سبع فئات، مكان واحد لطلب كل ما تحتاج طباعته.",
    href: "/branches",
    bg: "from-cyan-deep to-navy",
  },
  {
    title: "Bulk pricing on packaging",
    titleAr: "أسعار الجملة على التغليف",
    subtitle: "Custom boxes, mailers and labels — quoted per volume.",
    subtitleAr: "صناديق ومغلفات وملصقات مخصصة — أسعار حسب الكمية.",
    href: "/categories/packaging-labels",
    bg: "from-navy-deep to-navy",
  },
];

export default function PromoSlider() {
  const [index, setIndex] = useState(0);
  const { lang } = useLang();

  useEffect(() => {
    const id = setInterval(() => setIndex((i) => (i + 1) % slides.length), 5000);
    return () => clearInterval(id);
  }, []);

  const slide = slides[index];

  return (
    <section className="mx-auto max-w-content px-6 pt-8">
      <div className="relative h-40 overflow-hidden rounded-3xl sm:h-48">
        <AnimatePresence mode="wait">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -24 }}
            transition={{ duration: 0.4 }}
            className={`absolute inset-0 flex items-center bg-gradient-to-r ${slide.bg} px-8 sm:px-12`}
          >
            <div>
              <h3 className="font-display text-xl font-semibold text-white sm:text-2xl">
                {lang === "ar" ? slide.titleAr : slide.title}
              </h3>
              <p className="mt-2 max-w-md text-sm text-white/75">
                {lang === "ar" ? slide.subtitleAr : slide.subtitle}
              </p>
              <Link
                href={slide.href}
                className="focus-ring mt-4 inline-block rounded-pill bg-white px-5 py-2 text-sm font-semibold text-navy transition-transform hover:scale-105"
              >
                {lang === "ar" ? "اكتشف المزيد" : "Explore"}
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
          {slides.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              aria-label={`Slide ${i + 1}`}
              className={`h-1.5 rounded-pill transition-all ${i === index ? "w-6 bg-white" : "w-1.5 bg-white/40"}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
