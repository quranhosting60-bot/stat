"use client";

import { products } from "@/data/products";
import { useLang } from "@/lib/i18n";
import PromoSlider from "./PromoSlider";
import OfferBanner from "./OfferBanner";
import ProductRow from "./ProductRow";

export default function HomeMerchandising() {
  const { lang } = useLang();

  const mostSearched = products.filter((p) => p.mostSearched).slice(0, 10);
  const newArrivals = products.filter((p) => p.newArrival).slice(0, 10);
  const premium = products.filter((p) => p.premium).slice(0, 10);

  return (
    <>
      <PromoSlider />
      <OfferBanner />
      <ProductRow title={lang === "ar" ? "الأكثر بحثاً" : "Most Searched"} products={mostSearched} />
      <ProductRow title={lang === "ar" ? "وصل حديثاً" : "New Arrivals"} products={newArrivals} />
      <ProductRow title={lang === "ar" ? "منتجات مميزة" : "Premium Products"} products={premium} />
    </>
  );
}
