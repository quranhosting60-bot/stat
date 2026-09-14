"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { useCart } from "@/lib/cart-context";

const links = [
  { href: "/categories/business-stationery", label: "Stationery" },
  { href: "/categories/marketing-print", label: "Marketing" },
  { href: "/categories/large-format", label: "Large Format" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const { totalItems } = useCart();

  return (
    <header className="sticky top-4 z-50 mx-auto flex max-w-content items-center justify-between px-4">
      <nav className="flex w-full items-center justify-between gap-4 rounded-pill border border-line bg-white/90 px-4 py-2.5 shadow-[0_2px_20px_rgba(11,42,64,0.08)] backdrop-blur-md">
        <Link href="/" className="flex items-center gap-2 pl-1">
          <Image src="/images/logo.png" alt="Smart Printing" width={36} height={36} className="h-9 w-9 object-contain" />
          <span className="hidden font-display text-base font-semibold text-navy sm:block">
            Smart Printing
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {links.map((link) => {
            const active = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`focus-ring rounded-pill px-4 py-2 text-sm font-medium transition-colors ${
                    active ? "bg-navy text-white" : "text-navy/80 hover:bg-mist"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-2">
          <Link
            href="/cart"
            className="focus-ring relative rounded-pill p-2.5 text-navy hover:bg-mist"
            aria-label={`Cart, ${totalItems} items`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              <path d="M3 3h2l2.4 12.2a2 2 0 002 1.8h8.2a2 2 0 002-1.6L21 8H6" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="9" cy="20" r="1.4" />
              <circle cx="18" cy="20" r="1.4" />
            </svg>
            {totalItems > 0 && (
              <span className="absolute -right-0.5 -top-0.5 flex h-4.5 min-w-[18px] items-center justify-center rounded-pill bg-cyan px-1 text-[10px] font-semibold text-white">
                {totalItems}
              </span>
            )}
          </Link>
          <Link
            href="/contact"
            className="focus-ring hidden rounded-pill bg-navy px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-navy-deep sm:block"
          >
            Get a quote
          </Link>
          <button
            className="focus-ring rounded-pill p-2.5 text-navy hover:bg-mist lg:hidden"
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" strokeLinecap="round" />
              ) : (
                <path d="M4 7h16M4 12h16M4 17h16" strokeLinecap="round" />
              )}
            </svg>
          </button>
        </div>
      </nav>

      {open && (
        <div className="absolute left-4 right-4 top-16 z-40 rounded-3xl border border-line bg-white p-3 shadow-xl lg:hidden">
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="focus-ring block rounded-2xl px-4 py-3 text-sm font-medium text-navy hover:bg-mist"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}
