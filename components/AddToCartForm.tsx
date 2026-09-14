"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/data/products";
import { useCart } from "@/lib/cart-context";

export default function AddToCartForm({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const [selections, setSelections] = useState<Record<string, string>>(() =>
    Object.fromEntries(product.options.map((opt) => [opt.name, opt.choices[0].label]))
  );
  const [quantity, setQuantity] = useState(product.minQty);
  const [added, setAdded] = useState(false);

  const unitPrice = useMemo(() => {
    let price = product.basePrice;
    for (const opt of product.options) {
      const choice = opt.choices.find((c) => c.label === selections[opt.name]);
      if (choice) price += choice.priceModifier;
    }
    return price;
  }, [product, selections]);

  const lineTotal = unitPrice * quantity;
  const optionsLabel = product.options.map((opt) => selections[opt.name]).join(", ");

  function handleAdd() {
    addItem({
      id: `${product.slug}::${optionsLabel}`,
      productSlug: product.slug,
      name: product.name,
      unitPrice,
      quantity,
      optionsLabel,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  return (
    <div className="rounded-3xl border border-line bg-white p-6">
      {product.options.map((opt) => (
        <div key={opt.name} className="mb-5">
          <p className="mb-2 text-sm font-medium text-navy">{opt.name}</p>
          <div className="flex flex-wrap gap-2">
            {opt.choices.map((choice) => {
              const active = selections[opt.name] === choice.label;
              return (
                <button
                  key={choice.label}
                  type="button"
                  onClick={() => setSelections((s) => ({ ...s, [opt.name]: choice.label }))}
                  className={`focus-ring rounded-pill border px-4 py-2 text-sm transition-colors ${
                    active
                      ? "border-navy bg-navy text-white"
                      : "border-line bg-white text-navy/70 hover:bg-mist"
                  }`}
                >
                  {choice.label}
                  {choice.priceModifier !== 0 && (
                    <span className="ml-1 text-xs opacity-70">
                      ({choice.priceModifier > 0 ? "+" : ""}
                      {choice.priceModifier})
                    </span>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      <div className="mb-6">
        <p className="mb-2 text-sm font-medium text-navy">Quantity</p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setQuantity((q) => Math.max(product.minQty, q - product.minQty))}
            className="focus-ring flex h-10 w-10 items-center justify-center rounded-pill border border-line text-navy hover:bg-mist"
            aria-label="Decrease quantity"
          >
            −
          </button>
          <input
            type="number"
            min={product.minQty}
            step={product.minQty}
            value={quantity}
            onChange={(e) => setQuantity(Math.max(product.minQty, Number(e.target.value) || product.minQty))}
            className="focus-ring w-24 rounded-pill border border-line px-4 py-2 text-center text-sm"
          />
          <button
            type="button"
            onClick={() => setQuantity((q) => q + product.minQty)}
            className="focus-ring flex h-10 w-10 items-center justify-center rounded-pill border border-line text-navy hover:bg-mist"
            aria-label="Increase quantity"
          >
            +
          </button>
          <span className="text-xs text-navy/50">min {product.minQty}</span>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-line pt-5">
        <div>
          <p className="text-xs text-navy/50">Estimated total</p>
          <p className="font-display text-2xl font-semibold text-navy">
            SAR {lineTotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={handleAdd}
            className="focus-ring rounded-pill bg-cyan px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-cyan-deep"
          >
            {added ? "Added ✓" : "Add to cart"}
          </button>
        </div>
      </div>
      {added && (
        <button
          onClick={() => router.push("/cart")}
          className="focus-ring mt-3 w-full text-center text-sm font-medium text-cyan-deep hover:text-navy"
        >
          View cart →
        </button>
      )}
    </div>
  );
}
