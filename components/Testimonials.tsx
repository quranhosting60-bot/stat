import Reveal from "./Reveal";

const quotes = [
  {
    quote:
      "We reorder business cards and letterheads every quarter and the colours match every single time. That consistency is worth more than a lower price.",
    name: "Faisal Al-Otaibi",
    role: "Operations Manager, Nakhla Logistics",
  },
  {
    quote:
      "Needed a mesh banner for a building wrap with four days' notice. They confirmed the artwork same day and had it installed on time.",
    name: "Reem Al-Harbi",
    role: "Marketing Lead, Waha Retail Group",
  },
  {
    quote:
      "Ordering is simple — pick the product, confirm on WhatsApp, done. No back-and-forth over email for a job this small.",
    name: "Yousef Al-Qahtani",
    role: "Founder, Qahtani Coffee Roasters",
  },
];

export default function Testimonials() {
  return (
    <section className="bg-mist py-20">
      <div className="mx-auto max-w-content px-6">
        <Reveal>
          <h2 className="font-display text-3xl font-semibold text-navy sm:text-4xl">
            What clients say after the second order
          </h2>
        </Reveal>
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {quotes.map((q, i) => (
            <Reveal key={q.name} delay={i * 0.08}>
              <figure className="h-full rounded-3xl border border-line bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(11,42,64,0.08)]">
                <blockquote className="text-[0.95rem] leading-relaxed text-navy/80">
                  “{q.quote}”
                </blockquote>
                <figcaption className="mt-6">
                  <p className="font-display text-sm font-semibold text-navy">{q.name}</p>
                  <p className="text-xs text-navy/50">{q.role}</p>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
