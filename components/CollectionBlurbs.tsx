import Link from "next/link";
import { megaMenuTabs } from "@/lib/megamenu";
import type { Blurb } from "@/data/collections";
import Reveal from "./Reveal";

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");

// Menu label -> product link, so chips jump straight to a product when one exists.
const productByLabel = new Map<string, string>();
for (const tab of megaMenuTabs)
  for (const section of tab.sections)
    for (const item of section.items) if (!item.isQuote && !productByLabel.has(norm(item.label))) productByLabel.set(norm(item.label), item.href);

function hrefFor(label: string) {
  return productByLabel.get(norm(label)) ?? `/quote?item=${encodeURIComponent(label)}`;
}

export default function CollectionBlurbs({ blurbs, heading }: { blurbs: Blurb[]; heading?: string }) {
  return (
    <section>
      {heading && <h2 className="font-display text-xl font-semibold text-navy">{heading}</h2>}
      <div className={`mt-5 grid gap-4 ${blurbs.length > 1 ? "sm:grid-cols-2 lg:grid-cols-3" : ""}`}>
        {blurbs.map((b, i) => (
          <Reveal key={b.title} delay={Math.min(i * 0.04, 0.3)}>
            <div className="h-full rounded-3xl border border-line bg-white p-5">
              <Link href={hrefFor(b.title)} className="focus-ring font-display text-base font-semibold text-navy hover:text-cyan-deep">
                {b.title}
              </Link>
              {b.text && <p className="mt-2 text-sm text-navy/60">{b.text}</p>}
              {b.items && (
                <ul className="mt-3 flex flex-wrap gap-1.5">
                  {b.items.map((item) => (
                    <li key={item}>
                      <Link
                        href={hrefFor(item)}
                        className="focus-ring inline-block rounded-pill border border-line bg-mist/60 px-3 py-1 text-xs text-navy/70 transition-colors hover:border-cyan hover:text-cyan-deep"
                      >
                        {item}
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
