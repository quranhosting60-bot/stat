import Link from "next/link";
import Reveal from "./Reveal";

export default function CtaBand() {
  return (
    <section className="mx-auto max-w-content px-6 pb-20">
      <Reveal className="halftone relative overflow-hidden rounded-3xl bg-navy px-8 py-14 text-center sm:px-16">
        <div className="halftone absolute inset-0 opacity-[0.06]" />
        <div className="relative">
          <h2 className="mx-auto max-w-xl font-display text-3xl font-semibold text-white sm:text-4xl">
            Have a print job ready to go?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-white/70">
            Send the spec on WhatsApp or fill out the quote form — we'll reply the same
            working day.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/contact"
              className="focus-ring rounded-pill bg-cyan px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-cyan-deep"
            >
              Request a quote
            </Link>
            <Link
              href="/categories/business-stationery"
              className="focus-ring rounded-pill border border-white/25 px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-white/10"
            >
              Browse products
            </Link>
          </div>
        </div>
      </Reveal>
    </section>
  );
}
