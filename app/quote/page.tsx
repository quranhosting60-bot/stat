"use client";

import { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Reveal from "@/components/Reveal";
import { WHATSAPP_NUMBER } from "@/lib/whatsapp";

function QuoteFormInner() {
  const params = useSearchParams();
  const item = params.get("item") ?? "";
  const [form, setForm] = useState({ name: "", phone: "", details: "", link: "" });
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const message = [
      "Quote request — Smart Printing website",
      "",
      `Item: ${item || "Not specified"}`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      `Details: ${form.details}`,
      form.link ? `Artwork / reference link: ${form.link}` : "",
    ]
      .filter((l) => l !== "")
      .join("\n");
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, "_blank");
    setSent(true);
  }

  return (
    <div className="mx-auto max-w-[560px] px-6 py-14">
      <Reveal>
        <p className="text-sm font-medium text-cyan-deep">Request a quote</p>
        <h1 className="mt-2 font-display text-3xl font-semibold text-navy sm:text-4xl">
          {item || "Tell us what you need"}
        </h1>
        <p className="mt-3 text-navy/60">
          This item isn't in our online catalogue yet — send a few details and we'll quote it
          for you directly on WhatsApp, usually the same working day.
        </p>
      </Reveal>

      {sent ? (
        <Reveal delay={0.1} className="mt-8 rounded-3xl border border-line bg-mist p-8 text-center">
          <p className="font-display text-lg font-semibold text-navy">Opened in WhatsApp</p>
          <p className="mt-2 text-sm text-navy/60">
            If it didn't open automatically, message us directly at +966 55 074 6600.
          </p>
        </Reveal>
      ) : (
        <Reveal delay={0.1}>
          <form onSubmit={handleSubmit} className="mt-8 space-y-5 rounded-3xl border border-line bg-white p-7">
            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy" htmlFor="q-name">Your name</label>
              <input
                id="q-name"
                required
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                className="focus-ring w-full rounded-2xl border border-line px-4 py-3 text-sm"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy" htmlFor="q-phone">Phone number</label>
              <input
                id="q-phone"
                required
                value={form.phone}
                onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                className="focus-ring w-full rounded-2xl border border-line px-4 py-3 text-sm"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy" htmlFor="q-details">
                What do you need? (quantity, size, deadline)
              </label>
              <textarea
                id="q-details"
                rows={4}
                value={form.details}
                onChange={(e) => setForm((f) => ({ ...f, details: e.target.value }))}
                className="focus-ring w-full rounded-2xl border border-line px-4 py-3 text-sm"
              />
            </div>
            <div>
              <label className="mb-1.5 block text-sm font-medium text-navy" htmlFor="q-link">
                Artwork or reference link <span className="text-xs font-normal text-navy/40">(optional)</span>
              </label>
              <input
                id="q-link"
                type="url"
                placeholder="Google Drive, Dropbox, WeTransfer…"
                value={form.link}
                onChange={(e) => setForm((f) => ({ ...f, link: e.target.value }))}
                className="focus-ring w-full rounded-2xl border border-line px-4 py-3 text-sm"
              />
              <p className="mt-1.5 text-xs text-navy/40">Files up to 1GB can be sent on WhatsApp after you submit.</p>
            </div>
            <button
              type="submit"
              className="focus-ring w-full rounded-pill bg-cyan py-3.5 text-sm font-semibold text-white transition-colors hover:bg-cyan-deep"
            >
              Send request on WhatsApp
            </button>
          </form>
        </Reveal>
      )}
    </div>
  );
}

export default function QuotePage() {
  return (
    <Suspense fallback={null}>
      <QuoteFormInner />
    </Suspense>
  );
}
