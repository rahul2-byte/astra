import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { site } from "@/content/site";

export function Footer() {
  return (
    <footer className="site-footer border-t soft-divider bg-[var(--surface-elevated)]">
      <div className="section-shell flex flex-col gap-6 py-10 text-sm text-[var(--muted)] md:flex-row md:items-center md:justify-between">
        <p>© {new Date().getFullYear()} {site.name}. Built as Rahul Singh&apos;s ML portfolio.</p>
        <div className="flex flex-wrap gap-5 font-technical text-xs text-[var(--foreground)]">
          <Link className="text-link" href="/writing">Writing</Link>
          <a className="text-link" href={site.github} target="_blank" rel="noreferrer">
            GitHub <ArrowUpRight className="link-arrow h-3.5 w-3.5" aria-hidden />
          </a>
          <Link className="text-link" href="/contact">Contact</Link>
        </div>
      </div>
    </footer>
  );
}
