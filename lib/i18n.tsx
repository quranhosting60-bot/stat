"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";

export type Lang = "en" | "ar";

const STRINGS: Record<Lang, Record<string, string>> = {
  en: {
    nav_stationery: "Stationery",
    nav_marketing: "Marketing",
    nav_largeFormat: "Large Format",
    nav_signage: "Signage",
    nav_about: "About",
    nav_contact: "Contact",
    nav_blog: "Blog",
    nav_events: "Events",
    nav_branches: "Branches",
    nav_vendor: "Become a Vendor",
    nav_getQuote: "Get a quote",
    nav_allCategories: "All categories",
    cart_title: "Your cart",
    cart_empty: "Your cart is empty",
    cart_subtotal: "Subtotal",
    cart_checkout: "Proceed to checkout",
    product_from: "From",
    product_view: "View",
    product_addToCart: "Add to cart",
    footer_rights: "All rights reserved.",
    hero_cta: "Get a quote",
    offer_banner: "Monday & Tuesday special — 10% off selected categories",
  },
  ar: {
    nav_stationery: "القرطاسية",
    nav_marketing: "التسويق",
    nav_largeFormat: "الطباعة الكبيرة",
    nav_signage: "اللافتات",
    nav_about: "من نحن",
    nav_contact: "اتصل بنا",
    nav_blog: "المدونة",
    nav_events: "الفعاليات",
    nav_branches: "الفروع",
    nav_vendor: "كن مورداً",
    nav_getQuote: "اطلب عرض سعر",
    nav_allCategories: "كل الفئات",
    cart_title: "سلة التسوق",
    cart_empty: "سلتك فارغة",
    cart_subtotal: "المجموع الفرعي",
    cart_checkout: "إتمام الطلب",
    product_from: "يبدأ من",
    product_view: "عرض",
    product_addToCart: "أضف إلى السلة",
    footer_rights: "جميع الحقوق محفوظة.",
    hero_cta: "اطلب عرض سعر",
    offer_banner: "عرض الإثنين والثلاثاء — خصم ١٠٪ على فئات مختارة",
  },
};

interface LangContextValue {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string) => string;
  dir: "ltr" | "rtl";
}

const LangContext = createContext<LangContextValue | null>(null);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");

  useEffect(() => {
    const saved = typeof window !== "undefined" ? window.localStorage.getItem("sp-lang") : null;
    if (saved === "ar" || saved === "en") setLangState(saved);
  }, []);

  useEffect(() => {
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = lang;
  }, [lang]);

  function setLang(l: Lang) {
    setLangState(l);
    window.localStorage.setItem("sp-lang", l);
  }

  function t(key: string) {
    return STRINGS[lang][key] ?? STRINGS.en[key] ?? key;
  }

  return (
    <LangContext.Provider value={{ lang, setLang, t, dir: lang === "ar" ? "rtl" : "ltr" }}>
      {children}
    </LangContext.Provider>
  );
}

export function useLang() {
  const ctx = useContext(LangContext);
  if (!ctx) throw new Error("useLang must be used within LanguageProvider");
  return ctx;
}

// Helpers to pick the localized field from a data object with an "xxxAr" sibling field
export function localize<T extends Record<string, any>>(
  obj: T,
  field: keyof T & string,
  lang: Lang
): string {
  if (lang === "ar") {
    const arField = `${field}Ar` as keyof T;
    if (obj[arField]) return obj[arField] as unknown as string;
  }
  return obj[field] as unknown as string;
}
