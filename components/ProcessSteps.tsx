import Reveal from "./Reveal";

const steps = [
  {
    number: "01",
    title: "Tell us what you need",
    description:
      "Pick a product, set the options and quantity, or send us a spec on WhatsApp if it's something custom.",
  },
  {
    number: "02",
    title: "We send a fixed quote",
    description:
      "Pricing and turnaround confirmed before anything goes to print — no changes once you approve it.",
  },
  {
    number: "03",
    title: "You approve the artwork",
    description:
      "We send a proof for sign-off. Nothing runs on press until you've said yes to exactly what you'll get.",
  },
  {
    number: "04",
    title: "Delivered or ready for pickup",
    description:
      "Collect from our Riyadh branch or have it delivered — tracked, and packed for transport.",
  },
];

export default function ProcessSteps() {
  return (
    <section className="mx-auto max-w-content px-6 py-20">
      <Reveal>
        <h2 className="font-display text-3xl font-semibold text-navy sm:text-4xl">
          From spec sheet to delivery
        </h2>
      </Reveal>
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {steps.map((step, i) => (
          <Reveal key={step.number} delay={i * 0.08}>
            <div className="relative h-full rounded-3xl border border-line bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(11,42,64,0.1)]">
              <span className="font-display text-sm font-semibold text-cyan">{step.number}</span>
              <h3 className="mt-4 font-display text-lg font-semibold text-navy">{step.title}</h3>
              <p className="mt-2 text-sm text-navy/60">{step.description}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
