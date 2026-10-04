"use client";

import { useMemo, useState, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Product, ProductOption } from "@/data/products";
import { useCart } from "@/lib/cart-context";

const ALLOWED_TYPES = [".pdf", ".ai", ".eps", ".jpg", ".jpeg", ".png", ".psd", ".tif", ".tiff", ".svg", ".cdr", ".indd", ".zip"];
const MAX_UPLOAD_MB = 1024; // 1GB

const keyOf = (o: ProductOption) => `${o.section ?? ""}::${o.name}`;
const modeOf = (o: ProductOption) => o.display ?? (o.choices.length > 6 ? "select" : "buttons");

function initialSelections(product: Product) {
  return Object.fromEntries(
    product.options.map((o) => [keyOf(o), modeOf(o) === "multi" ? "" : o.defaultChoice ?? o.choices[0].label])
  ) as Record<string, string>;
}

function isVisible(opt: ProductOption, product: Product, sel: Record<string, string>, depth = 0): boolean {
  if (!opt.showIf || depth > 4) return true;
  const ref =
    product.options.find((o) => o.name === opt.showIf!.option && (o.section ?? "") === (opt.section ?? "")) ??
    product.options.find((o) => o.name === opt.showIf!.option);
  if (!ref) return true;
  if (!isVisible(ref, product, sel, depth + 1)) return false;
  const v = sel[keyOf(ref)];
  if (opt.showIf.equals !== undefined) return v === opt.showIf.equals;
  if (opt.showIf.notEquals !== undefined) return v !== opt.showIf.notEquals;
  return true;
}

function packSize(unit: string) {
  const m = unit.match(/^per (\d+)\b/);
  return m ? Number(m[1]) : 1;
}

export default function AddToCartForm({ product }: { product: Product }) {
  const router = useRouter();
  const { addItem } = useCart();
  const luxe = !!product.luxe;

  const [selections, setSelections] = useState<Record<string, string>>(() => initialSelections(product));
  const step = product.qtyStep ?? product.minQty;
  const maxQty = product.maxQty ?? Infinity;
  const [quantity, setQuantity] = useState(product.minQty);
  const [added, setAdded] = useState(false);
  const [artworkFile, setArtworkFile] = useState<File | null>(null);
  const [artworkError, setArtworkError] = useState<string | null>(null);
  const [artworkLink, setArtworkLink] = useState("");
  const [memo, setMemo] = useState("");
  const [customWidth, setCustomWidth] = useState("");
  const [customHeight, setCustomHeight] = useState("");

  const linkInvalid = artworkLink.trim() !== "" && !/^https?:\/\/\S+\.\S+/i.test(artworkLink.trim());

  // Theme tokens — gold-on-dark for premium-range products.
  const t = luxe
    ? {
        card: "rounded-3xl border border-[#c9a45c]/35 bg-[#0a1822]/80 p-6 text-white backdrop-blur",
        label: "text-white",
        heading: "text-[#e9cf93]",
        pill: "border-white/15 bg-transparent text-white/70 hover:bg-white/10",
        pillOn: "border-[#c9a45c] bg-[#c9a45c] text-[#0a1822]",
        field: "border-white/15 bg-white/5 text-white placeholder:text-white/35",
        muted: "text-white/50",
        divider: "border-white/10",
        cta: "bg-[#c9a45c] text-[#0a1822] hover:bg-[#e0bd7a]",
        chip: "bg-white/10 text-white/80",
        dash: "border-white/20 bg-white/5 text-white/60 hover:bg-white/10",
        browse: "border-white/20 bg-transparent text-white",
        total: "text-white",
      }
    : {
        card: "rounded-3xl border border-line bg-white p-6",
        label: "text-navy",
        heading: "text-cyan-deep",
        pill: "border-line bg-white text-navy/70 hover:bg-mist",
        pillOn: "border-navy bg-navy text-white",
        field: "border-line bg-white text-navy",
        muted: "text-navy/50",
        divider: "border-line",
        cta: "bg-cyan text-white hover:bg-cyan-deep",
        chip: "bg-mist text-navy/70",
        dash: "border-line bg-mist/50 text-navy/60 hover:bg-mist",
        browse: "border-line bg-white text-navy",
        total: "text-navy",
      };

  function setValue(opt: ProductOption, value: string) {
    setSelections((s) => ({ ...s, [keyOf(opt)]: value }));
  }
  function toggleMulti(opt: ProductOption, label: string) {
    const current = selections[keyOf(opt)] ? selections[keyOf(opt)].split("|") : [];
    const next = current.includes(label) ? current.filter((c) => c !== label) : [...current, label];
    setValue(opt, opt.choices.map((c) => c.label).filter((l) => next.includes(l)).join("|"));
  }

  function handleFileChange(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    setArtworkError(null);
    if (!file) {
      setArtworkFile(null);
      return;
    }
    const ext = "." + (file.name.split(".").pop()?.toLowerCase() ?? "");
    if (!ALLOWED_TYPES.includes(ext)) {
      setArtworkError(`Unsupported file type. Use: ${ALLOWED_TYPES.join(", ")}`);
      setArtworkFile(null);
      return;
    }
    if (file.size > MAX_UPLOAD_MB * 1024 * 1024) {
      setArtworkError("File is too large. Max 1GB — please share a download link instead.");
      setArtworkFile(null);
      return;
    }
    setArtworkFile(file);
  }

  const visible = product.options.filter((o) => isVisible(o, product, selections));

  const unitPrice = useMemo(() => {
    let price = product.basePrice;
    for (const opt of product.options) {
      if (!isVisible(opt, product, selections)) continue;
      const picked = selections[keyOf(opt)];
      if (!picked) continue;
      for (const label of picked.split("|")) {
        const choice = opt.choices.find((c) => c.label === label);
        if (choice) price += choice.priceModifier;
      }
    }
    return Math.max(price, 0);
  }, [product, selections]);

  const pack = packSize(product.unit);
  const perPiece = unitPrice / pack;
  const lineTotal = perPiece * quantity;

  const parts: string[] = [];
  for (const opt of visible) {
    const picked = selections[keyOf(opt)];
    if (!picked) continue;
    const value = picked.split("|").join(", ");
    if (/^(none|no )/i.test(value)) continue;
    parts.push(`${opt.section ? opt.section.replace(/ \(Part \d\)/, "") + " – " : ""}${opt.name}: ${value}`);
  }
  if (product.customSizeInput && customWidth && customHeight) parts.push(`Custom size: ${customWidth}×${customHeight}cm`);
  if (memo.trim()) parts.push(`Memo: ${memo.trim()}`);
  const optionsLabel = parts.join("; ");

  function clampQty(n: number) {
    const whole = Math.floor(Number.isFinite(n) ? n : product.minQty);
    return Math.min(maxQty, Math.max(product.minQty, whole));
  }

  function handleAdd() {
    if (linkInvalid) return;
    addItem({
      id: `${product.slug}::${optionsLabel}`,
      productSlug: product.slug,
      name: product.name,
      unitPrice: perPiece,
      quantity,
      optionsLabel,
      artworkFileName: artworkFile?.name,
      artworkLink: artworkLink.trim() || undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 1800);
  }

  let lastSection: string | undefined = undefined;

  return (
    <div className={t.card}>
      {visible.map((opt, idx) => {
        const mode = modeOf(opt);
        const k = keyOf(opt);
        const showHeading = (opt.section ?? "") !== (lastSection ?? "") && opt.section;
        lastSection = opt.section;
        const value = selections[k];
        const sheetN = opt.sheetsDivisor ? Math.round(Number(value) / opt.sheetsDivisor) : null;
        return (
          <div key={k}>
            {showHeading && (
              <p className={`mb-3 ${idx > 0 ? "mt-6" : ""} border-b pb-1.5 text-xs font-semibold uppercase tracking-wide ${t.heading} ${t.divider}`}>
                {opt.section}
              </p>
            )}
            <div className="mb-5">
              <p className={`mb-2 text-sm font-medium ${t.label}`}>
                {opt.name}
                {opt.hint && <span className={`ml-2 text-xs font-normal ${t.muted}`}>{opt.hint}</span>}
              </p>

              {mode === "select" ? (
                <div className="flex items-center gap-2">
                  <select
                    value={value}
                    onChange={(e) => setValue(opt, e.target.value)}
                    className={`focus-ring w-full rounded-2xl border px-4 py-2.5 text-sm ${t.field}`}
                  >
                    {opt.choices.map((c) => (
                      <option key={c.label} value={c.label} className="text-navy">
                        {c.label}
                        {c.priceModifier !== 0 ? ` (${c.priceModifier > 0 ? "+" : ""}${c.priceModifier})` : ""}
                      </option>
                    ))}
                  </select>
                  {sheetN !== null && (
                    <span className={`flex-shrink-0 rounded-xl px-3 py-2.5 text-xs font-medium ${t.chip}`}>
                      = {sheetN} sheets
                    </span>
                  )}
                </div>
              ) : (
                <div className="flex flex-wrap gap-2">
                  {opt.choices.map((choice) => {
                    const active =
                      mode === "multi" ? value.split("|").includes(choice.label) : value === choice.label;
                    return (
                      <button
                        key={choice.label}
                        type="button"
                        aria-pressed={active}
                        onClick={() => (mode === "multi" ? toggleMulti(opt, choice.label) : setValue(opt, choice.label))}
                        className={`focus-ring rounded-pill border px-4 py-2 text-sm transition-colors ${
                          active ? t.pillOn : t.pill
                        }`}
                      >
                        {mode === "multi" && <span className="mr-1.5">{active ? "☑" : "☐"}</span>}
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
              )}
            </div>
          </div>
        );
      })}

      {product.customSizeInput && (
        <div className="mb-5">
          <p className={`mb-2 text-sm font-medium ${t.label}`}>Custom Size (cm)</p>
          <div className="flex items-center gap-3">
            <input
              type="number"
              min={1}
              placeholder="Width"
              value={customWidth}
              onChange={(e) => setCustomWidth(e.target.value)}
              className={`focus-ring w-full rounded-2xl border px-4 py-2.5 text-sm ${t.field}`}
            />
            <span className={t.muted}>×</span>
            <input
              type="number"
              min={1}
              placeholder="Height"
              value={customHeight}
              onChange={(e) => setCustomHeight(e.target.value)}
              className={`focus-ring w-full rounded-2xl border px-4 py-2.5 text-sm ${t.field}`}
            />
          </div>
          <p className={`mt-1.5 text-xs ${t.muted}`}>
            Enter the exact size you need — pricing shown is a starting estimate and will be confirmed based on
            final dimensions.
          </p>
        </div>
      )}

      <div className="mb-6">
        <p className={`mb-2 text-sm font-medium ${t.label}`}>
          Artwork <span className={`text-xs font-normal ${t.muted}`}>(optional)</span>
        </p>
        <label
          className={`focus-ring flex cursor-pointer items-center justify-between gap-3 rounded-2xl border border-dashed px-4 py-3 text-sm transition-colors ${t.dash}`}
        >
          <span className="truncate">
            {artworkFile ? artworkFile.name : "Attach a file — PDF, AI, EPS, PSD, JPG, PNG, ZIP… (max 1GB)"}
          </span>
          <span className={`flex-shrink-0 rounded-pill border px-3 py-1 text-xs font-medium ${t.browse}`}>Browse</span>
          <input type="file" accept={ALLOWED_TYPES.join(",")} onChange={handleFileChange} className="sr-only" />
        </label>
        {artworkError && <p className="mt-1.5 text-xs text-red-400">{artworkError}</p>}

        <div className={`my-2 text-center text-xs ${t.muted}`}>or</div>
        <input
          type="url"
          inputMode="url"
          value={artworkLink}
          onChange={(e) => setArtworkLink(e.target.value)}
          placeholder="Paste a download link (Google Drive, Dropbox, WeTransfer…)"
          aria-label="Artwork link"
          className={`focus-ring w-full rounded-2xl border px-4 py-2.5 text-sm ${t.field}`}
        />
        {linkInvalid && <p className="mt-1.5 text-xs text-red-400">Please enter a full link starting with https://</p>}
        <p className={`mt-1.5 text-xs ${t.muted}`}>
          For best print quality, use CMYK colour mode at 300 DPI. We&apos;ll ask you to also attach the file in
          WhatsApp when confirming your order.
        </p>
      </div>

      <div className="mb-6">
        <p className={`mb-2 text-sm font-medium ${t.label}`}>
          Product memo <span className={`text-xs font-normal ${t.muted}`}>(shows on your invoice for reference)</span>
        </p>
        <textarea
          rows={2}
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          maxLength={200}
          className={`focus-ring w-full rounded-2xl border px-4 py-2.5 text-sm ${t.field}`}
        />
      </div>

      <div className="mb-6">
        <p className={`mb-2 text-sm font-medium ${t.label}`}>Quantity</p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setQuantity((q) => clampQty(q - step))}
            className={`focus-ring flex h-10 w-10 items-center justify-center rounded-pill border ${t.pill}`}
            aria-label="Decrease quantity"
          >
            −
          </button>
          <input
            type="number"
            min={product.minQty}
            max={Number.isFinite(maxQty) ? maxQty : undefined}
            step={1}
            value={quantity}
            onChange={(e) => setQuantity(clampQty(Number(e.target.value)))}
            className={`focus-ring w-24 rounded-pill border px-4 py-2 text-center text-sm ${t.field}`}
          />
          <button
            type="button"
            onClick={() => setQuantity((q) => clampQty(q + step))}
            className={`focus-ring flex h-10 w-10 items-center justify-center rounded-pill border ${t.pill}`}
            aria-label="Increase quantity"
          >
            +
          </button>
          <span className={`text-xs ${t.muted}`}>
            min {product.minQty}
            {Number.isFinite(maxQty) ? ` · max ${maxQty.toLocaleString()}` : ""}
          </span>
        </div>
      </div>

      <div className={`flex items-center justify-between border-t pt-5 ${t.divider}`}>
        <div>
          <p className={`text-xs ${t.muted}`}>Estimated total</p>
          <p className={`font-display text-2xl font-semibold ${t.total}`}>
            SAR {lineTotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}
          </p>
        </div>
        <button
          onClick={handleAdd}
          disabled={linkInvalid}
          className={`focus-ring rounded-pill px-6 py-3 text-sm font-semibold transition-colors disabled:opacity-50 ${t.cta}`}
        >
          {added ? "Added ✓" : "Add to cart"}
        </button>
      </div>
      {added && (
        <button
          onClick={() => router.push("/cart")}
          className={`focus-ring mt-3 w-full text-center text-sm font-medium ${luxe ? "text-[#e9cf93]" : "text-cyan-deep hover:text-navy"}`}
        >
          View cart →
        </button>
      )}
    </div>
  );
}
