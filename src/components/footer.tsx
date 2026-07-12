import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { CurrentYear } from "@/components/current-year";
import { navItems, site } from "@/content/site";

export function Footer() {
  const footerLinks = navItems.filter((item) => item.href !== "/");

  return (
    <footer className="site-footer border-t soft-divider bg-[var(--surface-elevated)]">
      <div className="section-shell py-10">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <Link className="font-display text-xl font-semibold tracking-[-0.04em]" href="/">{site.name}</Link>
            <p className="font-technical mt-2 text-xs text-[var(--muted)]">
              Machine Learning Engineer · Applied AI · LLM/RAG Systems
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-12">
            <nav aria-label="Footer navigation" className="grid gap-3 font-technical text-xs">
              {footerLinks.map((item) => <Link key={item.href} className="text-link" href={item.href}>{item.label}</Link>)}
            </nav>
            <div className="grid gap-3 font-technical text-xs">
              <a className="text-link" href={site.github} target="_blank" rel="noopener noreferrer">
                GitHub <ArrowUpRight className="link-arrow h-3.5 w-3.5" aria-hidden />
              </a>
              <a className="text-link" href={site.linkedin} target="_blank" rel="noopener noreferrer">
                LinkedIn <ArrowUpRight className="link-arrow h-3.5 w-3.5" aria-hidden />
              </a>
              <a className="text-link" href={`mailto:${site.email}`}>
                Email <Mail className="h-3.5 w-3.5" aria-hidden />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-9 flex flex-col gap-3 border-t soft-divider pt-5 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© <CurrentYear /> {site.name}. Recruiter-focused ML portfolio.</p>
          <a className="text-link" href={site.resume} download="Rahul-Singh-ML-Engineer-Resume.pdf">Download Resume</a>
        </div>
      </div>
    </footer>
  );
}
