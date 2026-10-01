"use client";

import { useState } from "react";
import Reveal from "./Reveal";

const faqs = [
  {
    q: "How do I get an exact price for my order?",
    a: "Choose a product, select the options and quantity you need, then add it to cart. Checkout sends the full spec straight to us on WhatsApp and we confirm final pricing before anything is printed.",
  },
  {
    q: "Can you match my existing brand colours?",
    a: "Yes — send your logo and any brand guideline (Pantone or CMYK values) and we'll match them across every product, from business cards to vehicle wraps.",
  },
  {
    q: "Do you deliver outside Riyadh?",
    a: "We deliver across Saudi Arabia through courier partners. Delivery time depends on the city and is confirmed with your quote.",
  },
  {
    q: "What if I need something that isn't listed?",
    a: "Message us on WhatsApp with a description or reference image. Most custom print and packaging jobs can be quoted within a day.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mx-auto max-w-content px-6 py-20">
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
