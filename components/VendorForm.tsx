"use client";

import { useState } from "react";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

export default function VendorForm() {
  const [form, setForm] = useState({
    companyName: "",
    contactName: "",
    phone: "",
    category: "",
    details: "",
  });

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const message = [
      "New vendor application — Smart Printing website",
      "",
      `Company: ${form.companyName}`,
      `Contact person: ${form.contactName}`,
      `Phone: ${form.phone}`,
      `Product category: ${form.category || "Not specified"}`,
      "",
      `Details: ${form.details}`,
    ].join("\n");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 rounded-3xl border border-line bg-white p-7">
      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy" htmlFor="v-company">Company name</label>
        <input
          id="v-company"
          required
          value={form.companyName}
          onChange={(e) => setForm((f) => ({ ...f, companyName: e.target.value }))}
          className="focus-ring w-full rounded-2xl border border-line px-4 py-3 text-sm"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy" htmlFor="v-contact">Contact person</label>
        <input
          id="v-contact"
          required
          value={form.contactName}
          onChange={(e) => setForm((f) => ({ ...f, contactName: e.target.value }))}
          className="focus-ring w-full rounded-2xl border border-line px-4 py-3 text-sm"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy" htmlFor="v-phone">Phone number</label>
        <input
          id="v-phone"
          required
          value={form.phone}
          onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
          className="focus-ring w-full rounded-2xl border border-line px-4 py-3 text-sm"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy" htmlFor="v-category">
          What do you supply or produce?
        </label>
        <input
          id="v-category"
          value={form.category}
          onChange={(e) => setForm((f) => ({ ...f, category: e.target.value }))}
          placeholder="e.g. Paper stock, packaging materials, embroidery..."
          className="focus-ring w-full rounded-2xl border border-line px-4 py-3 text-sm"
        />
      </div>
      <div>
        <label className="mb-1.5 block text-sm font-medium text-navy" htmlFor="v-details">Tell us about your business</label>
        <textarea
          id="v-details"
          rows={4}
          value={form.details}
          onChange={(e) => setForm((f) => ({ ...f, details: e.target.value }))}
          placeholder="Years in business, capacity, sample clients..."
          className="focus-ring w-full rounded-2xl border border-line px-4 py-3 text-sm"
        />
      </div>
      <button
        type="submit"
        className="focus-ring w-full rounded-pill bg-cyan py-3.5 text-sm font-semibold text-white transition-colors hover:bg-cyan-deep"
      >
        Submit application on WhatsApp
      </button>
    </form>
  );
}
