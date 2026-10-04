"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { megaMenuTabs } from "@/lib/megamenu";
import { thumbOf } from "@/lib/images";
import { collections } from "@/data/collections";

const standaloneCollections = new Set(collections.filter((c) => !c.categorySlug).map((c) => c.slug));
function viewAllHref(tab: { slug: string; categorySlug?: string }) {
  if (tab.categorySlug) return `/categories/${tab.categorySlug}`;
  if (standaloneCollections.has(tab.slug)) return `/collections/${tab.slug}`;
  return null;
}
import { useLang } from "@/lib/i18n";

const secondaryLinks = [
  { href: "/blog", key: "nav_blog" },
  { href: "/vendors", key: "nav_vendor" },
  { href: "/about", key: "nav_about" },
  { href: "/contact", key: "nav_contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const [megaOpen, setMegaOpen] = useState(false);
  const [activeTab, setActiveTab] = useState(megaMenuTabs[0].slug);
  const pathname = usePathname();
  const { totalItems } = useCart();
  const { lang, setLang, t } = useLang();
  const [mobileTab, setMobileTab] = useState<string | null>(null);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const megaRef = useRef<HTMLLIElement>(null);

  // close everything on navigation
  useEffect(() => {
    setOpen(false);
    setMegaOpen(false);
  }, [pathname]);

  // lock page scroll while the mobile menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Esc + click-outside close the desktop mega menu
  useEffect(() => {
    if (!megaOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMegaOpen(false);
    const onClick = (e: MouseEvent) => {
      if (megaRef.current && !megaRef.current.contains(e.target as Node)) setMegaOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("mousedown", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("mousedown", onClick);
    };
  }, [megaOpen]);

  const currentTab = megaMenuTabs.find((tab) => tab.slug === activeTab) ?? megaMenuTabs[0];

  function openMega() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    setMegaOpen(true);
  }
  function scheduleCloseMega() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setMegaOpen(false), 180);
  }

  return (
    <header className="sticky top-4 z-50 mx-auto flex max-w-content items-center justify-between px-4">
      <nav className="relative z-50 flex w-full items-center justify-between gap-4 rounded-pill border border-line bg-white/90 px-4 py-2.5 shadow-[0_2px_20px_rgba(11,42,64,0.08)] backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2 pl-1">
          <Image src="/images/logo.png" alt="Smart Printing" width={36} height={36} className="h-9 w-9 object-contain" />
          <span className="hidden font-display text-base font-semibold text-navy sm:block">
            Smart Printing
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          <li ref={megaRef} onMouseEnter={openMega} onMouseLeave={scheduleCloseMega}>
            <button
              onClick={() => setMegaOpen((o) => !o)}
              className={`focus-ring flex items-center gap-1 rounded-pill px-4 py-2 text-sm font-medium transition-colors ${
                megaOpen ? "bg-mist text-navy" : "text-navy/80 hover:bg-mist"
              }`}
              aria-expanded={megaOpen}
              aria-haspopup="true"
            >
              {t("nav_allCategories")}
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className={`transition-transform ${megaOpen ? "rotate-180" : ""}`}
              >
                <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <AnimatePresence>
              {megaOpen && (
                // pt-3 (not margin) keeps the hover path from button to panel unbroken
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-x-0 top-full z-50 pt-3"
                >
                  <div className="grid h-[min(520px,calc(100dvh-8rem))] grid-cols-[250px_1fr] overflow-hidden rounded-3xl border border-line bg-white shadow-[0_24px_48px_rgba(11,42,64,0.16)]">
                    {/* left rail: one category per row, never stacked/overlapping */}
                    <div className="scrollbar-none overflow-y-auto border-r border-line bg-mist/40 p-2" role="tablist" aria-orientation="vertical">
                      {megaMenuTabs.map((tab) => {
                        const active = activeTab === tab.slug;
                        return (
                          <button
                            key={tab.slug}
                            role="tab"
                            aria-selected={active}
                            onMouseEnter={() => setActiveTab(tab.slug)}
                            onFocus={() => setActiveTab(tab.slug)}
                            onClick={() => setActiveTab(tab.slug)}
                            className={`focus-ring flex w-full items-center gap-3 rounded-2xl px-2.5 py-2 text-left text-[13px] font-medium transition-colors ${
                              active ? "bg-white text-navy shadow-sm" : "text-navy/70 hover:bg-white/70"
                            }`}
                          >
                            <span className="relative h-8 w-8 flex-shrink-0 overflow-hidden rounded-xl bg-mist">
                              <Image src={thumbOf(tab.image)} alt="" fill sizes="32px" className="object-cover" />
                            </span>
                            <span className="flex-1 leading-tight">{tab.label}</span>
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              className={active ? "text-cyan-deep" : "text-navy/25"}
                            >
                              <path d="M9 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </button>
                        );
                      })}
                    </div>

                    {/* right: sections for the active category */}
                    <div className="flex min-w-0 flex-col" role="tabpanel" key={currentTab.slug}>
                      <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4">
                        <h3 className="font-display text-lg font-semibold text-navy">{currentTab.label}</h3>
                        <div className="flex items-center gap-3">
                          {viewAllHref(currentTab) && (
                            <Link
                              href={viewAllHref(currentTab)!}
                              className="focus-ring rounded-pill bg-navy px-4 py-2 text-xs font-semibold text-white transition-colors hover:bg-navy-deep"
                            >
                              View all {currentTab.label}
                            </Link>
                          )}
                          <Link href="/products" className="focus-ring text-xs font-semibold text-cyan-deep hover:text-navy">
                            See all products
                          </Link>
                        </div>
                      </div>
                      <div className="flex-1 overflow-y-auto px-6 py-5">
                        <div className="columns-2 gap-x-8 xl:columns-3">
                          {currentTab.sections.map((section) => (
                            <div key={section.heading} className="mb-5 break-inside-avoid">
                              <p className="mb-2 border-b border-line pb-1.5 text-sm font-semibold text-navy">
                                {section.heading}
                              </p>
                              <ul className="space-y-1.5">
                                {section.items.map((item) => (
                                  <li key={item.label}>
                                    <Link
                                      href={item.href}
                                      className={`focus-ring text-[13px] transition-colors hover:text-cyan-deep ${
                                        item.isQuote ? "text-navy/50" : "text-navy/75"
                                      }`}
                                    >
                                      {item.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
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
        <div className="fixed inset-0 z-40 overflow-y-auto overscroll-contain bg-paper px-4 pb-10 pt-24 lg:hidden">
          <p className="px-2 pb-2 text-sm font-semibold text-navy/50">{t("nav_allCategories")}</p>
          <ul className="overflow-hidden rounded-3xl border border-line bg-white">
            {megaMenuTabs.map((tab, i) => {
              const expanded = mobileTab === tab.slug;
              return (
                <li key={tab.slug} className={i > 0 ? "border-t border-line" : ""}>
                  <button
                    onClick={() => setMobileTab(expanded ? null : tab.slug)}
                    aria-expanded={expanded}
                    className="focus-ring flex w-full items-center gap-3 px-3 py-3 text-left"
                  >
                    <span className="relative h-11 w-11 flex-shrink-0 overflow-hidden rounded-2xl bg-mist">
                      <Image src={thumbOf(tab.image)} alt="" fill sizes="44px" className="object-cover" />
                    </span>
                    <span className="flex-1 text-[15px] font-medium leading-tight text-navy">{tab.label}</span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      className={`text-navy/40 transition-transform ${expanded ? "rotate-180" : ""}`}
                    >
                      <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                  {expanded && (
                    <div className="space-y-4 bg-mist/40 px-4 pb-4 pt-3">
                      {viewAllHref(tab) && (
                        <Link
                          href={viewAllHref(tab)!}
                          className="focus-ring block rounded-pill bg-navy px-4 py-2.5 text-center text-sm font-semibold text-white"
                        >
                          View all {tab.label}
                        </Link>
                      )}
                      {tab.sections.map((section) => (
                        <div key={section.heading}>
                          <p className="mb-1.5 text-sm font-semibold text-navy">{section.heading}</p>
                          <ul className="grid grid-cols-2 gap-x-3">
                            {section.items.map((item) => (
                              <li key={item.label}>
                                <Link
                                  href={item.href}
                                  className={`focus-ring block py-1.5 text-[13px] leading-snug ${
                                    item.isQuote ? "text-navy/50" : "text-navy/80"
                                  }`}
                                >
                                  {item.label}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  )}
                </li>
              );
            })}
          </ul>

          <ul className="mt-4 grid grid-cols-2 gap-2">
            {secondaryLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="focus-ring block rounded-2xl border border-line bg-white px-4 py-3 text-sm font-medium text-navy"
                >
                  {t(link.key)}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              onClick={() => setLang(lang === "en" ? "ar" : "en")}
              className="focus-ring rounded-2xl border border-line bg-white px-4 py-3 text-sm font-medium text-navy"
            >
              {lang === "en" ? "العربية" : "English"}
            </button>
            <Link
              href="/contact"
              className="focus-ring rounded-2xl bg-cyan px-4 py-3 text-center text-sm font-semibold text-white"
            >
              {t("nav_getQuote")}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
