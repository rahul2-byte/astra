import Link from "next/link";
import { ArrowUpRight, Code2 as Github, Link as Linkedin, Mail } from "lucide-react";
import { contactRoleGroups } from "@/content/home";
import { site } from "@/content/site";

export function ContactCta() {
  return (
    <section className="bg-[var(--foreground)] py-20 text-[var(--background)] md:py-24" aria-labelledby="contact-cta-title">
      <div className="section-shell grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-end">
        <div>
          <p className="font-technical text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-[var(--primary)]">Contact</p>
          <h2 id="contact-cta-title" className="font-display mt-5 max-w-4xl text-4xl font-semibold leading-[1.05] tracking-[-0.055em] md:text-6xl">
            Open to production ML and applied AI opportunities.
          </h2>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-white/65">
            I&apos;m interested in Machine Learning, Applied AI, Generative AI, LLM, RAG, NLP, and Data
            Science roles where reliable engineering matters.
          </p>
          <ul className="mt-7 flex flex-wrap gap-2" aria-label="Target opportunity areas">
            {contactRoleGroups.map((role) => (
              <li key={role} className="border border-white/20 px-3 py-2 font-technical text-[0.68rem] text-white/75">{role}</li>
            ))}
          </ul>
        </div>

        <div className="border border-white/20 p-6">
          <Link className="btn-primary w-full border-[var(--primary)] bg-[var(--primary)] text-[var(--foreground)] hover:bg-[var(--background)]" href="/contact">
            Contact Me <ArrowUpRight className="link-arrow h-4 w-4" aria-hidden />
          </Link>
          <div className="mt-6 grid gap-4 border-t border-white/15 pt-6 font-technical text-xs">
            <a className="inline-flex items-center gap-2 text-white/75 hover:text-white" href={`mailto:${site.email}`}>
              <Mail className="h-4 w-4" aria-hidden /> {site.email}
            </a>
            <a className="inline-flex items-center gap-2 text-white/75 hover:text-white" href={site.linkedin} target="_blank" rel="noreferrer">
              <Linkedin className="h-4 w-4" aria-hidden /> LinkedIn <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
            <a className="inline-flex items-center gap-2 text-white/75 hover:text-white" href={site.github} target="_blank" rel="noreferrer">
              <Github className="h-4 w-4" aria-hidden /> GitHub <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
