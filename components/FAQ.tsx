"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const faqs = [
  {
    q: "How can I place an order?",
    a: "Choose the product you need and contact our team with your required specifications, quantity and artwork. Our team will guide you through the next steps.",
  },
  {
    q: "Can you print custom sizes?",
    a: "Yes. We can produce many products in custom sizes depending on the material and production requirements.",
  },
  {
    q: "Do you provide design services?",
    a: "Yes. Our graphic design team can help with branding, artwork preparation, print-ready files, promotional designs and other creative requirements.",
  },
  {
    q: "Can you deliver my order?",
    a: "Delivery options depend on your location, order size and product requirements. Contact our team to confirm available delivery options.",
  },
  {
    q: "Can I order bulk quantities?",
    a: "Yes. We handle both small and large-volume orders for businesses, events, restaurants, exhibitions and organisations.",
  },
  {
    q: "Do you provide branding services?",
    a: "Yes. We provide complete branding solutions including logo design, stationery, packaging, signage, promotional materials and large-format branding.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-content px-4 py-10 sm:px-6 sm:py-20">
      <Reveal>
        <h2 className="font-display text-3xl font-semibold text-navy sm:text-4xl">
          Questions before you order
        </h2>
      </Reveal>
      <div className="mt-10 divide-y divide-line border-y border-line">
        {faqs.map((item, i) => {
          const open = openIndex === i;
          return (
            <Reveal key={item.q} delay={i * 0.06} y={10}>
              <button
                onClick={() => setOpenIndex(open ? null : i)}
                className="focus-ring flex w-full items-center justify-between gap-4 py-5 text-left"
                aria-expanded={open}
              >
                <span className="font-display text-base font-medium text-navy sm:text-lg">
                  {item.q}
                </span>
                <span
                  className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-pill border border-navy/15 text-navy transition-transform duration-300 ${
                    open ? "rotate-45" : ""
                  }`}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                  </svg>
                </span>
              </button>
              <div
                className={`grid transition-all duration-300 ease-out ${
                  open ? "grid-rows-[1fr] pb-5 opacity-100" : "grid-rows-[0fr] opacity-0"
                }`}
                style={{ display: "grid" }}
              >
                <div className="overflow-hidden">
                  <p className="max-w-2xl text-sm leading-relaxed text-navy/60">{item.a}</p>
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}
