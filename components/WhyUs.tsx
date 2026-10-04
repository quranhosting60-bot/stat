import Reveal from "./Reveal";

const reasons = [
  { title: "Quality Printing", text: "Professional printing technology and quality materials deliver sharp, vibrant and consistent results." },
  { title: "Complete Branding Solutions", text: "From business cards and packaging to signage and large-format printing — complete branding under one roof." },
  { title: "Custom Solutions", text: "Every business is different. Customised sizes, materials, finishes and production based on your requirements." },
  { title: "Professional Finishing", text: "Lamination, cutting, folding, punching and other post-press services to lift your printed materials." },
  { title: "Large-Format Production", text: "From small business materials to large-scale banners, wall graphics and signage." },
  { title: "Business & Corporate Printing", text: "Professional stationery, marketing materials, promotional products, packaging and corporate branding." },
];

export default function WhyUs() {
  return (
    <section className="mx-auto max-w-content px-6 py-20">
      <Reveal>
        <h2 className="font-display text-3xl font-semibold text-navy sm:text-4xl">Why choose us</h2>
      </Reveal>
      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {reasons.map((r, i) => (
          <Reveal key={r.title} delay={i * 0.06}>
            <div className="h-full rounded-3xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(11,42,64,0.1)]">
              <span className="flex h-9 w-9 items-center justify-center rounded-pill bg-cyan/10 text-cyan-deep">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
              <h3 className="mt-4 font-display text-lg font-semibold text-navy">{r.title}</h3>
              <p className="mt-2 text-sm text-navy/60">{r.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
