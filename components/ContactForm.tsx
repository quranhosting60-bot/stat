"use client";

import { useState } from "react";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

export default function ContactForm() {
  const [form, setForm] = useState({ name: "", phone: "", category: "", details: "" });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const message = [
      "New quote request — Smart Printing website",
      "",
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Interested in: ${form.category || "Not specified"}`,
      "",
      `Details: ${form.details}`,
    ].join("\n");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-line bg-white p-7">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy" htmlFor="c-name">Full name</label>
        <input
          id="c-name"
          required
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          className="focus-ring w-full rounded-2xl border border-line px-4 py-3 text-sm"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy" htmlFor="c-phone">Phone number</label>
        <input
          id="c-phone"
          required
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          className="focus-ring w-full rounded-2xl border border-line px-4 py-3 text-sm"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy" htmlFor="c-category">What do you need printed?</label>
        <input
          id="c-category"
          value={form.category}
          onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
          placeholder="e.g. Roll-up banners, business cards..."
          className="focus-ring w-full rounded-2xl border border-line px-4 py-3 text-sm"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy" htmlFor="c-details">Details</label>
        <textarea
          id="c-details"
          rows={4}
          value={form.details}
          onChange={(e) => setForm((f) => ({ ...f, details: e.target.value }))}
          placeholder="Quantity, sizes, deadline..."
          className="focus-ring w-full rounded-2xl border border-line px-4 py-3 text-sm"
        />
      </div>
      <button
        type="submit"
        className="focus-ring w-full rounded-pill bg-cyan py-3.5 text-sm font-semibold text-white hover:bg-cyan-deep"
      >
        Send on WhatsApp
      </button>
    </form>
  );
}
