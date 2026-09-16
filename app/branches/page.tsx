import Reveal from "@/components/Reveal";
import { branches } from "@/data/branches";

export const metadata = { title: "Our Branches — Smart Printing" };

export default function BranchesPage() {
  return (
    <div className="mx-auto max-w-content px-6 py-14">
      <Reveal>
        <p className="text-sm font-medium text-cyan-deep">Branches</p>
        <h1 className="mt-2 font-display text-4xl font-semibold text-navy sm:text-5xl">
          Eight cities, one standard
        </h1>
        <p className="mt-4 max-w-lg text-navy/60">
          Walk in, drop off artwork, or pick up a finished order — every branch runs the same
          turnaround times as Riyadh.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {branches.map((branch, i) => (
          <Reveal key={branch.city} delay={i * 0.06}>
            <div className="relative h-full rounded-3xl border border-line bg-white p-6">
              {branch.isMain && (
                <span className="absolute right-5 top-5 rounded-pill bg-navy px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wide text-white">
                  Head Office
                </span>
              )}
              <h2 className="font-display text-lg font-semibold text-navy">{branch.city}</h2>
              <p className="mt-2 text-sm text-navy/60">{branch.address}</p>
              <p className="mt-3 text-sm text-navy/70">{branch.phone}</p>
              <p className="mt-1 text-xs text-navy/40">{branch.hours}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
