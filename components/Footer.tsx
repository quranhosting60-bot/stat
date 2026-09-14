import Link from "next/link";
import Image from "next/image";
import { categories } from "@/data/categories";

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line bg-navy text-white">
      <div className="mx-auto max-w-content px-6 py-16">
        <div className="grid gap-12 md:grid-cols-[1.3fr_1fr_1fr_1fr]">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Image src="/images/logo.png" alt="Smart Printing" width={40} height={40} className="h-10 w-10 object-contain" />
              <span className="font-display text-lg font-semibold">Smart Printing</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm text-white/70">
              A print shop for people who plan ahead — business stationery, marketing
              materials, large format and branded goods, made to spec.
            </p>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white/50">
              Categories
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
              {categories.slice(0, 4).map((c) => (
                <li key={c.slug}>
                  <Link href={`/categories/${c.slug}`} className="focus-ring hover:text-cyan-soft">
                    {c.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white/50">
              Company
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
              <li><Link href="/about" className="focus-ring hover:text-cyan-soft">About</Link></li>
              <li><Link href="/contact" className="focus-ring hover:text-cyan-soft">Contact</Link></li>
              <li><Link href="/terms" className="focus-ring hover:text-cyan-soft">Terms</Link></li>
              <li><Link href="/privacy" className="focus-ring hover:text-cyan-soft">Privacy</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-white/50">
              Get in touch
            </h3>
            <ul className="mt-4 space-y-2.5 text-sm text-white/80">
              <li>Riyadh, Saudi Arabia</li>
              <li>+966 50 000 0000</li>
              <li>hello@smartprinting.sa</li>
              <li>Sun–Thu, 9am–6pm</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <p>© {new Date().getFullYear()} Smart Printing. All rights reserved.</p>
          <p>Designed and built for Smart Printing, Riyadh.</p>
        </div>
      </div>
    </footer>
  );
}
