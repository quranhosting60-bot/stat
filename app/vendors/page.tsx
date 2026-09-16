import Reveal from "@/components/Reveal";
import VendorForm from "@/components/VendorForm";

export const metadata = { title: "Become a Vendor — Smart Printing" };

const benefits = [
  {
    title: "Steady order flow",
    description: "Get matched with print jobs that fit your equipment and capacity.",
  },
  {
    title: "Fast payment terms",
    description: "Standard 15-day payment cycle once a job is delivered and confirmed.",
  },
  {
    title: "No listing fees",
    description: "Applying and getting listed as a vendor costs nothing upfront.",
  },
];

export default function VendorsPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-14">
      <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr]">
        <Reveal>
          <p className="text-sm font-medium text-cyan-deep">Vendor Marketplace</p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-navy">
            Become a Smart Printing vendor
          </h1>
          <p className="mt-4 max-w-md text-navy/70">
            We work with a network of specialist printers, material suppliers and finishing
            shops across Saudi Arabia to cover jobs beyond our own floor. If that's you, tell
            us what you do.
          </p>

          <div className="mt-8 space-y-4">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={0.1 + i * 0.08}>
                <div className="flex gap-3 rounded-2xl border border-line bg-white p-4">
                  <div className="mt-0.5 flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-pill bg-cyan/10 text-sm font-semibold text-cyan-deep">
                    {i + 1}
                  </div>
                  <div>
                    <p className="font-display text-sm font-semibold text-navy">{b.title}</p>
                    <p className="mt-0.5 text-sm text-navy/60">{b.description}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <VendorForm />
        </Reveal>
      </div>
    </div>
  );
}
