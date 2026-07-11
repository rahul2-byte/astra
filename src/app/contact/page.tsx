import { ArrowUpRight, Code2 as Github, Download, Link as Linkedin, Mail, Phone } from "lucide-react";
import { site } from "@/content/site";

const contactMethods = [
  { title: "Email", href: `mailto:${site.email}`, label: site.email, Icon: Mail, external: false },
  { title: "LinkedIn", href: site.linkedin, label: "linkedin.com/in/-rahul-singh22", Icon: Linkedin, external: true },
  { title: "GitHub", href: site.github, label: "github.com/rahul2-byte", Icon: Github, external: true },
  { title: "Phone", href: site.phoneHref, label: site.phone, Icon: Phone, external: false },
];

export default function ContactPage() {
  return (
    <main className="section-shell py-16 md:py-24">
      <section className="technical-grid relative mx-auto max-w-5xl overflow-hidden border-y soft-divider py-14 text-center">
        <div className="signal-glow animate-signal pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2" />
        <div className="relative">
          <p className="section-label">Contact</p>
          <h1 className="font-display mt-5 text-5xl font-semibold leading-tight tracking-[-0.055em] md:text-6xl">Get in Touch</h1>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[var(--muted)]">For ML, Applied AI, Data Science, and LLM engineering opportunities.</p>
        </div>
      </section>

      <section className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-2 xl:grid-cols-4">
        {contactMethods.map(({ title, href, label, Icon, external }, index) => (
          <a
            key={title}
            aria-label={`${title} ${label}`}
            className="surface-card-interactive group flex min-h-56 flex-col justify-between p-6"
            href={href}
            target={external ? "_blank" : undefined}
            rel={external ? "noreferrer" : undefined}
          >
            <div className="flex items-start justify-between">
              <span className="grid h-12 w-12 place-items-center bg-[var(--primary)]"><Icon className="h-5 w-5" strokeWidth={1.7} /></span>
              <span className="font-technical text-xs text-[var(--muted)]">0{index + 1}</span>
            </div>
            <div className="mt-8">
              <span className="flex items-center gap-2 text-xl font-semibold tracking-[-0.03em]">{title}{external ? <ArrowUpRight className="link-arrow h-4 w-4" /> : null}</span>
              <span className="mt-2 block break-all text-sm leading-6 text-[var(--muted)]">{label}</span>
            </div>
          </a>
        ))}
      </section>

      <div className="mt-12 flex justify-center">
        <a className="btn-primary" download="Rahul-Singh-ML-Engineer-Resume.pdf" href={site.resume}>
          <Download className="h-4 w-4" />Download Technical Resume
        </a>
      </div>
    </main>
  );
}
