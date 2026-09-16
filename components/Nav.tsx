"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { categories } from "@/data/categories";
import { useLang, localize } from "@/lib/i18n";

const secondaryLinks = [
  { href: "/blog", key: "nav_blog" },
  { href: "/events", key: "nav_events" },
  { href: "/branches", key: "nav_branches" },
  { href: "/vendors", key: "nav_vendor" },
  { href: "/about", key: "nav_about" },
  { href: "/contact", key: "nav_contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { lang, setLang, t } = useLang();

  return (
    <header className="sticky top-4 z-50 mx-auto flex max-w-content items-center justify-between px-4">
      <nav className="relative flex w-full items-center justify-between gap-4 rounded-pill border border-line bg-white/90 px-4 py-2.5 shadow-[0_2px_20px_rgba(11,42,64,0.08)] backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2 pl-1">
          <Image src="/images/logo.png" alt="Smart Printing" width={36} height={36} className="h-9 w-9 object-contain" />
          <span className="hidden font-display text-base font-semibold text-navy sm:block">
            Smart Printing
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          <li
            className="relative"
            onMouseEnter={() => setMegaOpen(true)}
            onMouseLeave={() => setMegaOpen(false)}
          >
            <button
              className={`focus-ring flex items-center gap-1 rounded-pill px-4 py-2 text-sm font-medium transition-colors ${
                megaOpen ? "bg-mist text-navy" : "text-navy/80 hover:bg-mist"
              }`}
              aria-expanded={megaOpen}
            >
              {t("nav_allCategories")}
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <AnimatePresence>
              {megaOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.18 }}
                  className="absolute left-1/2 top-full z-50 mt-3 w-[640px] -translate-x-1/2 rounded-3xl border border-line bg-white p-4 shadow-[0_24px_48px_rgba(11,42,64,0.16)]"
                >
                  <div className="grid grid-cols-2 gap-1.5">
                    {categories.map((c) => (
                      <Link
                        key={c.slug}
                        href={`/categories/${c.slug}`}
                        className="focus-ring flex items-start gap-3 rounded-2xl p-3 transition-colors hover:bg-mist"
                      >
                        <div className="relative mt-0.5 h-10 w-10 flex-shrink-0 overflow-hidden rounded-xl bg-mist">
                          <Image src={c.photo} alt="" fill sizes="40px" className="object-cover" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate font-display text-sm font-semibold text-navy">
                            {localize(c, "name", lang)}
                          </p>
                          <p className="truncate text-xs text-navy/50">{localize(c, "tagline", lang)}</p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </li>
          {secondaryLinks.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`focus-ring rounded-pill px-4 py-2 text-sm font-medium transition-colors ${
                    active ? "bg-navy text-white" : "text-navy/80 hover:bg-mist"
                  }`}
                >
                  {t(link.key)}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setLang(lang === "en" ? "ar" : "en")}
            className="focus-ring hidden rounded-pill border border-line px-3 py-2 text-xs font-semibold text-navy/70 transition-colors hover:bg-mist sm:block"
            aria-label="Toggle language"
          >
            {lang === "en" ? "العربية" : "English"}
          </button>
          <Link
            href="/cart"
            className="focus-ring relative rounded-pill p-2.5 text-navy hover:bg-mist"
            aria-label={`Cart, ${totalItems} items`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 3h2l2.4 12.2a2 2 0 002 1.8h8.2a2 2 0 002-1.6L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9" cy="20" r="1.4" />
              <circle cx="18" cy="20" r="1.4" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-[18px] items-center justify-center rounded-pill bg-cyan px-1 text-[10px] font-semibold text-white">
                {totalItems}
              </span>
            )}
          </Link>
          <Link
            href="/contact"
            className="focus-ring hidden rounded-pill bg-navy px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-deep sm:block"
          >
            {t("nav_getQuote")}
          </Link>
          <button
            className="focus-ring rounded-pill p-2.5 text-navy hover:bg-mist lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="absolute left-4 right-4 top-16 z-40 max-h-[70vh] overflow-y-auto rounded-3xl border border-line bg-white p-3 shadow-xl lg:hidden">
          <p className="px-4 pb-1 pt-2 text-xs font-semibold uppercase tracking-wide text-navy/40">
            {t("nav_allCategories")}
          </p>
          <ul className="flex flex-col gap-1">
            {categories.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/categories/${c.slug}`}
                  onClick={() => setOpen(false)}
                  className="focus-ring block rounded-2xl px-4 py-2.5 text-sm font-medium text-navy hover:bg-mist"
                >
                  {localize(c, "name", lang)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="my-2 border-t border-line" />
          <ul className="flex flex-col gap-1">
            {secondaryLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="focus-ring block rounded-2xl px-4 py-3 text-sm font-medium text-navy hover:bg-mist"
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
            <li>
              <button
                onClick={() => setLang(lang === "en" ? "ar" : "en")}
                className="focus-ring block w-full rounded-2xl px-4 py-3 text-left text-sm font-medium text-navy hover:bg-mist"
              >
                {lang === "en" ? "العربية" : "English"}
              </button>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
