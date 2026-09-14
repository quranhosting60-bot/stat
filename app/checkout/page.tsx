"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useCart } from "@/lib/cart-context";
import { buildWhatsAppOrderLink } from "@/lib/whatsapp";
import Reveal from "@/components/Reveal";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const router = useRouter();
  const [form, setForm] = useState({ name: "", phone: "", city: "", notes: "" });

  if (items.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="mx-auto max-w-content px-6 py-24 text-center"
      >
        <h1 className="font-display text-3xl font-semibold text-navy">Nothing to check out</h1>
        <p className="mt-2 text-navy/60">Your cart is empty right now.</p>
        <Link
          href="/categories/business-stationery"
          className="focus-ring mt-6 inline-block rounded-pill bg-navy px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-navy-deep"
        >
          Browse products
        </Link>
      </motion.div>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const link = buildWhatsAppOrderLink({
      customerName: form.name,
      phone: form.phone,
      city: form.city,
      notes: form.notes,
      lines: items.map((i) => ({
        name: i.name,
        quantity: i.quantity,
        options: i.optionsLabel,
        lineTotal: i.unitPrice * i.quantity,
      })),
      total: subtotal,
    });
    window.open(link, "_blank");
    clearCart();
    router.push("/");
  }

  return (
    <div className="mx-auto max-w-content px-6 py-14">
      <Reveal>
        <h1 className="font-display text-3xl font-semibold text-navy">Checkout</h1>
        <p className="mt-2 max-w-lg text-navy/60">
          We don't process payment online — submitting this form opens WhatsApp with your
          full order pre-filled, so we can confirm final pricing and payment with you directly.
        </p>
      </Reveal>

      <div className="mt-8 grid gap-10 lg:grid-cols-[1fr_1fr]">
        <Reveal delay={0.08}>
          <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-line bg-white p-6">
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy" htmlFor="name">Full name</label>
            <input
              id="name"
              required
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              className="focus-ring w-full rounded-2xl border border-line px-4 py-3 text-sm"
              placeholder="Your name"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy" htmlFor="phone">Phone number</label>
            <input
              id="phone"
              required
              value={form.phone}
              onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
              className="focus-ring w-full rounded-2xl border border-line px-4 py-3 text-sm"
              placeholder="05xxxxxxxx"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy" htmlFor="city">City</label>
            <input
              id="city"
              required
              value={form.city}
              onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
              className="focus-ring w-full rounded-2xl border border-line px-4 py-3 text-sm"
              placeholder="Riyadh"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-sm font-medium text-navy" htmlFor="notes">Notes (optional)</label>
            <textarea
              id="notes"
              value={form.notes}
              onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
              rows={3}
              className="focus-ring w-full rounded-2xl border border-line px-4 py-3 text-sm"
              placeholder="Artwork file link, deadline, delivery preference..."
            />
          </div>
          <button
            type="submit"
            className="focus-ring w-full rounded-pill bg-cyan py-3.5 text-sm font-semibold text-white transition-colors hover:bg-cyan-deep"
          >
            Send order on WhatsApp
          </button>
        </form>
        </Reveal>

        <Reveal delay={0.16} className="h-fit rounded-3xl border border-line bg-white p-6">
          <h2 className="font-display text-lg font-semibold text-navy">Order summary</h2>
          <div className="mt-4 space-y-3">
            {items.map((item) => (
              <div key={item.id} className="flex items-start justify-between text-sm">
                <div>
                  <p className="font-medium text-navy">{item.name} × {item.quantity}</p>
                  {item.optionsLabel && <p className="text-xs text-navy/50">{item.optionsLabel}</p>}
                </div>
                <span className="text-navy/70">
                  SAR {(item.unitPrice * item.quantity).toLocaleString(undefined, { maximumFractionDigits: 2 })}
                </span>
              </div>
            ))}
          </div>
          <div className="mt-5 flex items-center justify-between border-t border-line pt-4 font-display font-semibold text-navy">
            <span>Estimated total</span>
            <span>SAR {subtotal.toLocaleString(undefined, { maximumFractionDigits: 2 })}</span>
          </div>
        </Reveal>
      </div>
    </div>
  );
}
