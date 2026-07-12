import Link from "next/link";
import { ArrowUpRight, Mail } from "lucide-react";
import { site } from "@/content/site";

const footerLinks = [
  { label: "Experience", href: "/experience" },
  { label: "Projects", href: "/projects" },
  { label: "Resume", href: "/resume" },
  { label: "Contact", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="site-footer border-t soft-divider bg-[var(--surface-elevated)]">
      <div className="section-shell py-10">
        <div className="grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <Link className="font-display text-xl font-semibold tracking-[-0.04em]" href="/">{site.name}</Link>
            <p className="font-technical mt-2 text-xs text-[var(--muted)]">
              Machine Learning Engineer · Production ML & Applied AI
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 sm:gap-12">
            <nav aria-label="Footer navigation" className="grid gap-3 font-technical text-xs">
              {footerLinks.map((item) => <Link key={item.href} className="text-link" href={item.href}>{item.label}</Link>)}
            </nav>
            <div className="grid gap-3 font-technical text-xs">
              <a className="text-link" href={site.github} target="_blank" rel="noreferrer">
                GitHub <ArrowUpRight className="link-arrow h-3.5 w-3.5" aria-hidden />
              </a>
              <a className="text-link" href={site.linkedin} target="_blank" rel="noreferrer">
                LinkedIn <ArrowUpRight className="link-arrow h-3.5 w-3.5" aria-hidden />
              </a>
              <a className="text-link" href={`mailto:${site.email}`}>
                Email <Mail className="h-3.5 w-3.5" aria-hidden />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-9 flex flex-col gap-3 border-t soft-divider pt-5 text-xs text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {site.name}. Built as Rahul Singh&apos;s ML portfolio.</p>
          <a className="text-link" href={site.resume} download="Rahul-Singh-ML-Engineer-Resume.pdf">Download Resume</a>
        </div>
      </div>
    </footer>
  );
}
