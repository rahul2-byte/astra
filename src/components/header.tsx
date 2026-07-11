"use client";

import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { navItems, site } from "@/content/site";

export function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="site-header sticky top-0 z-50 border-b soft-divider bg-[color:color-mix(in_srgb,var(--background)_92%,transparent)] backdrop-blur-xl">
      <nav className="section-shell flex min-h-18 items-center justify-between gap-6" aria-label="Main navigation">
        <Link className="group inline-flex items-center gap-3" href="/" onClick={() => setOpen(false)}>
          <span className="grid h-9 w-9 place-items-center border border-[var(--foreground)] bg-[var(--primary)] font-technical text-xs font-semibold">RS</span>
          <span className="font-display text-lg font-semibold tracking-[-0.04em]">{site.name}</span>
        </Link>
        <div className="hidden items-center gap-7 md:flex">
          {navItems.map((item) => (
            <Link key={item.href} className="group relative py-2 font-technical text-xs font-medium" href={item.href}>
              {item.label}
              <span className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-[var(--primary-hover)] transition-transform group-hover:scale-x-100" />
            </Link>
          ))}
        </div>
        <button
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          className="grid h-11 w-11 place-items-center border border-[var(--foreground)] bg-[var(--card)] md:hidden"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {open ? (
        <nav id="mobile-navigation" aria-label="Mobile navigation" className="section-shell border-t soft-divider bg-[var(--background)] py-4 md:hidden">
          <div className="grid divide-y divide-[var(--section-divider)]">
            {navItems.map((item, index) => (
              <Link key={item.href} className="flex items-center justify-between py-4 font-technical text-sm" href={item.href} onClick={() => setOpen(false)}>
                <span>{item.label}</span>
                <span className="text-[var(--muted)]">0{index + 1}</span>
              </Link>
            ))}
          </div>
        </nav>
      ) : null}
    </header>
  );
}
