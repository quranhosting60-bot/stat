"use client";

import { useMemo, useState, ChangeEvent } from "react";
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
  const [artworkFile, setArtworkFile] = useState<File | null>(null);
  const [artworkError, setArtworkError] = useState<string | null>(null);
  const [customWidth, setCustomWidth] = useState("");
  const [customHeight, setCustomHeight] = useState("");

  const ALLOWED_TYPES = [".pdf", ".ai", ".eps", ".jpg", ".jpeg", ".png", ".psd"];
  const MAX_SIZE_MB = product.maxUploadMB ?? 25;

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setArtworkError(null);
    if (!file) {
      setArtworkFile(null);
      return;
    }
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (!ALLOWED_TYPES.includes(ext)) {
      setArtworkError(`Unsupported file type. Use: ${ALLOWED_TYPES.join(", ")}`);
      setArtworkFile(null);
      return;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      const label = MAX_SIZE_MB >= 1024 ? `${MAX_SIZE_MB / 1024}GB` : `${MAX_SIZE_MB}MB`;
      setArtworkError(`File is too large. Max ${label}.`);
      setArtworkFile(null);
      return;
    }
    setArtworkFile(file);
  }

  const unitPrice = useMemo(() => {
    let price = product.basePrice;
    for (const opt of product.options) {
      const choice = opt.choices.find((c) => c.label === selections[opt.name]);
      if (choice) price += choice.priceModifier;
    }
    return price;
  }, [product, selections]);

  const lineTotal = unitPrice * quantity;
  const optionsParts = product.options.map((opt) => selections[opt.name]);
  if (product.customSizeInput && customWidth && customHeight) {
    optionsParts.push(`${customWidth}×${customHeight}cm`);
  }
  const optionsLabel = optionsParts.join(", ");

  function handleAdd() {
    addItem({
      id: `${product.slug}::${optionsLabel}`,
      productSlug: product.slug,
      name: product.name,
      unitPrice,
      quantity,
      optionsLabel,
      artworkFileName: artworkFile?.name,
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

      {product.customSizeInput && (
        <div className="mb-5">
          <p className="mb-2 text-sm font-medium text-navy">Custom Size (cm)</p>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min={1}
              placeholder="Width"
              value={customWidth}
              onChange={(e) => setCustomWidth(e.target.value)}
              className="focus-ring w-full rounded-2xl border border-line px-4 py-2.5 text-sm"
            />
            <span className="text-navy/40">×</span>
            <input
              type="number"
              min={1}
              placeholder="Height"
              value={customHeight}
              onChange={(e) => setCustomHeight(e.target.value)}
              className="focus-ring w-full rounded-2xl border border-line px-4 py-2.5 text-sm"
            />
          </div>
          <p className="mt-1.5 text-xs text-navy/40">
            Enter the exact size you need — pricing shown is a starting estimate and will be
            confirmed based on final dimensions.
          </p>
        </div>
      )}

      <div className="mb-6">
        <p className="mb-2 text-sm font-medium text-navy">Artwork (optional)</p>
        <label className="focus-ring flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-dashed border-line bg-mist/50 px-4 py-3 text-sm text-navy/60 transition-colors hover:bg-mist">
          <span className="truncate">
            {artworkFile ? artworkFile.name : `Upload PDF, AI, EPS, JPG, PNG or PSD (max ${MAX_SIZE_MB >= 1024 ? `${MAX_SIZE_MB / 1024}GB` : `${MAX_SIZE_MB}MB`})`}
          </span>
          <span className="flex-shrink-0 rounded-pill border border-line bg-white px-3 py-1 text-xs font-medium text-navy">
            Browse
          </span>
          <input
            type="file"
            accept=".pdf,.ai,.eps,.jpg,.jpeg,.png,.psd"
            onChange={handleFileChange}
            className="sr-only"
          />
        </label>
        {artworkError && <p className="mt-1.5 text-xs text-red-500">{artworkError}</p>}
        <p className="mt-1.5 text-xs text-navy/40">
          For best print quality, use CMYK colour mode at 300 DPI. We'll ask you to also attach
          the file in WhatsApp when confirming your order.
        </p>
      </div>

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
