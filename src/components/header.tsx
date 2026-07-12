"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { navItems, site } from "@/content/site";

export function Header() {
  const [open, setOpen] = useState(false);
  const [menuPresent, setMenuPresent] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLElement>(null);
  const wasOpen = useRef(false);
  const pathname = usePathname();

  function openMenu() {
    setMenuPresent(true);
    setOpen(true);
  }

  function closeMenu() {
    setOpen(false);
  }

  function toggleMenu() {
    if (open) {
      closeMenu();
      return;
    }

    openMenu();
  }

  useEffect(() => {
    if (open) {
      wasOpen.current = true;
      const previousOverflow = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      menuRef.current?.querySelector<HTMLAnchorElement>("a")?.focus();

      const closeOnEscape = (event: KeyboardEvent) => {
        if (event.key === "Escape") closeMenu();
      };

      window.addEventListener("keydown", closeOnEscape);
      return () => {
        window.removeEventListener("keydown", closeOnEscape);
        document.body.style.overflow = previousOverflow;
      };
    }

    if (wasOpen.current) {
      triggerRef.current?.focus();
      wasOpen.current = false;
    }
  }, [open]);

  useEffect(() => {
    if (open || !menuPresent) return;

    const timeout = window.setTimeout(() => setMenuPresent(false), 160);
    return () => window.clearTimeout(timeout);
  }, [menuPresent, open]);

  useEffect(() => {
    if (!window.matchMedia) return;

    const desktopQuery = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => {
      if (desktopQuery.matches) closeMenu();
    };

    desktopQuery.addEventListener("change", closeOnDesktop);
    return () => desktopQuery.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <header className="site-header sticky top-0 z-50 border-b soft-divider bg-[color:color-mix(in_srgb,var(--background)_92%,transparent)] backdrop-blur-xl">
      <nav className="section-shell flex min-h-18 items-center justify-between gap-6" aria-label="Main navigation">
        <Link className="group inline-flex items-center gap-3" href="/" onClick={closeMenu}>
          <span className="grid h-9 w-9 place-items-center border border-[var(--foreground)] bg-[var(--primary)] font-technical text-xs font-semibold">RS</span>
          <span className="font-display text-lg font-semibold tracking-[-0.04em]">{site.name}</span>
        </Link>
        <div className="hidden items-center gap-6 md:flex">
          {navItems.map((item) => {
            const isCurrent = pathname === item.href;
            return (
              <Link
                key={item.href}
                aria-current={isCurrent ? "page" : undefined}
                className="nav-link py-2 font-technical text-xs font-medium"
                href={item.href}
              >
                {item.label}
              </Link>
            );
          })}
        </div>
        <a
          className="btn-primary hidden lg:inline-flex"
          href={site.resume}
          download="Rahul-Singh-ML-Engineer-Resume.pdf"
        >
          Download Resume
        </a>
        <button
          ref={triggerRef}
          type="button"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          aria-label={open ? "Close navigation" : "Open navigation"}
          className="grid h-11 w-11 place-items-center border border-[var(--foreground)] bg-[var(--card)] md:hidden"
          onClick={toggleMenu}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>
      {menuPresent ? (
        <nav
          ref={menuRef}
          id="mobile-navigation"
          aria-hidden={!open}
          aria-label="Mobile navigation"
          className="motion-mobile-menu section-shell border-t soft-divider bg-[var(--background)] py-4 md:hidden"
          data-state={open ? "open" : "closed"}
          inert={!open || undefined}
        >
          <div className="grid divide-y divide-[var(--section-divider)]">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                aria-current={pathname === item.href ? "page" : undefined}
                className="flex items-center justify-between py-4 font-technical text-sm"
                href={item.href}
                onClick={closeMenu}
              >
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
