import Image from "next/image";
import { categories } from "@/data/categories";
import Reveal from "@/components/Reveal";

export const metadata = { title: "About — Smart Printing" };

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-14">
      <Reveal className="max-w-2xl">
        <p className="text-sm font-medium text-cyan-deep">About us</p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-navy sm:text-5xl">
          A print shop built around one habit: saying yes with a real timeline.
        </h1>
        <p className="mt-5 text-navy/70">
          Smart Printing started as a single-machine business card shop in Riyadh and
          grew into a full commercial printer by keeping one promise — every quote comes
          with a date attached, and we hit it. Today we run six product lines from one
          floor: stationery, marketing print, large format, packaging, promotional goods
          and branded apparel, so a growing business can order everything from one place
          instead of managing five vendors.
        </p>
      </Reveal>

      <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, i) => (
          <Reveal key={cat.slug} delay={i * 0.06}>
            <div className="overflow-hidden rounded-3xl border border-line bg-white transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_16px_36px_rgba(11,42,64,0.1)]">
              <div className="relative h-36">
                <Image src={cat.photo} alt={cat.name} fill sizes="(min-width: 1024px) 33vw, 100vw" className="object-cover" />
              </div>
              <div className="p-6">
                <h3 className="font-display font-semibold text-navy">{cat.name}</h3>
                <p className="mt-1.5 text-sm text-navy/60">{cat.description}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <Reveal className="mt-16 rounded-3xl border border-line bg-mist p-8 sm:p-12">
        <h2 className="font-display text-2xl font-semibold text-navy">How we work</h2>
        <ul className="mt-5 space-y-3 text-navy/70">
          <li>— Every job gets a fixed quote before it goes to press, no changes after approval.</li>
          <li>— Artwork proofs are sent for sign-off; nothing prints without your yes.</li>
          <li>— Standard jobs ship in 2–7 working days depending on the product.</li>
          <li>— Reorders are stored under your account name for exact colour matching.</li>
        </ul>
      </Reveal>
    </div>
  );
}
