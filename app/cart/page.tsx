"use client";

import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import Reveal from "@/components/Reveal";

export default function CartPage() {
  const { items, removeItem, updateQuantity, subtotal } = useCart();

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-content px-6 py-24 text-center"
      >
        <h1 className="font-display text-3xl font-semibold text-navy">Your cart is empty</h1>
        <p className="mt-2 text-navy/60">Add a product to start building your order.</p>
        <Link
          href="/categories/business-stationery"
          className="focus-ring mt-6 inline-block rounded-pill bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-deep"
        >
          Browse products
        </Link>
      </motion.div>
    );
  }

  return (
    <div className="mx-auto max-w-content px-6 py-14">
      <Reveal>
        <h1 className="font-display text-3xl font-semibold text-navy">Your cart</h1>
      </Reveal>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-4">
          <AnimatePresence initial={false}>
            {items.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -20, transition: { duration: 0.2 } }}
                transition={{ duration: 0.35 }}
                className="flex items-center justify-between gap-4 rounded-2xl border border-line bg-white p-5"
              >
                <div>
                  <p className="font-display font-semibold text-navy">{item.name}</p>
                  {item.optionsLabel && <p className="mt-0.5 text-xs text-navy/50">{item.optionsLabel}</p>}
                  <p className="mt-1 text-sm text-navy/60">SAR {item.unitPrice.toLocaleString()} each</p>
                </div>
                <div className="flex items-center gap-3">
                  <input
                    type="number"
                    min={1}
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, Number(e.target.value) || 1)}
                    className="focus-ring w-20 rounded-pill border border-line px-3 py-1.5 text-center text-sm"
                  />
                  <button
                    onClick={() => removeItem(item.id)}
                    className="focus-ring text-sm text-navy/40 transition-colors hover:text-red-500"
                    aria-label={`Remove ${item.name}`}
                  >
                    Remove
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        <Reveal delay={0.1} className="h-fit rounded-3xl border border-line bg-white p-6">
          <div className="flex items-center justify-between text-sm text-navy/60">
            <span>Subtotal</span>
            <span>SAR {subtotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
          </div>
          <p className="mt-2 text-xs text-navy/40">
            Final pricing is confirmed after checkout, since some jobs need artwork review.
          </p>
          <Link
            href="/checkout"
            className="focus-ring mt-5 block rounded-pill bg-cyan py-3.5 text-center text-sm font-semibold text-white transition-colors hover:bg-cyan-deep"
          >
            Proceed to checkout
          </Link>
        </Reveal>
      </div>
    </div>
  );
}
