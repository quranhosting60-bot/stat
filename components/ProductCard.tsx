"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/data/products";
import { categories } from "@/data/categories";
import CornerBadge from "./CornerBadge";
import { useLang, localize } from "@/lib/i18n";

export default function ProductCard({ product }: { product: Product }) {
  const category = categories.find((c) => c.slug === product.category)!;
  const photo = product.photo ?? category.photo;
  const { lang } = useLang();

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group focus-ring relative flex flex-col overflow-hidden rounded-3xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_20px_44px_rgba(11,42,64,0.12)]"
    >
      <div className="relative h-44 overflow-hidden bg-mist">
        <CornerBadge />
        {(product.newArrival || product.premium) && (
          <span className="absolute left-3 top-3 z-10 rounded-pill bg-navy/90 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
            {product.newArrival ? (lang === "ar" ? "جديد" : "New") : lang === "ar" ? "مميز" : "Premium"}
          </span>
        )}
        <Image
          src={photo}
          alt={product.name}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium uppercase tracking-wide text-cyan-deep">
          {localize(category, "name", lang)}
        </p>
        <h3 className="mt-1.5 font-display text-base font-semibold text-navy">
          {localize(product, "name", lang)}
        </h3>
        <p className="mt-1.5 flex-1 text-sm text-navy/60">{localize(product, "shortDescription", lang)}</p>
        <div className="mt-4 flex items-baseline justify-between border-t border-line pt-4">
          <span className="font-display text-lg font-semibold text-navy">
            SAR {product.basePrice.toLocaleString()}
          </span>
          <span className="text-xs text-navy/50">{product.unit}</span>
        </div>
      </div>
    </Link>
  );
}
