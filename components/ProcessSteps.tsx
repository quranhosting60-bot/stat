import Reveal from "./Reveal";

const steps = [
  {
    number: "01",
    title: "Choose Your Product",
    description: "Select the printing or branding product that fits your requirements.",
  },
  {
    number: "02",
    title: "Share Your Artwork",
    description: "Upload your design, paste a download link, or send your artwork to our team for processing.",
  },
  {
    number: "03",
    title: "Confirm Your Order",
    description: "Review your specifications, quantity, material and finishing options before production.",
  },
  {
    number: "04",
    title: "We Print & Deliver",
    description:
      "Our production team handles your order with professional quality control before collection or delivery.",
  },
];

export default function ProcessSteps() {
  return (
    <section className="mx-auto max-w-content px-4 py-10 sm:px-6 sm:py-20">
      <Reveal>
        <h2 className="font-display text-3xl font-semibold text-navy sm:text-4xl">
          Simple. Fast. Professional.
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
