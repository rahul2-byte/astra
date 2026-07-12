import type { Metadata } from "next";
import {
  ArrowUpRight,
  Code2 as Github,
  Download,
  Link as Linkedin,
  Mail,
  Phone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import Link from "next/link";
import { site } from "@/content/site";
import { StackPill } from "@/components/case-study/stack-pill";
import {
  resumeEducation,
  resumeExperience,
  resumeHeader,
  resumeProjects,
  resumeSkillGroups,
  resumeSummary,
} from "@/content/resume";

const contactIcons: Record<typeof resumeHeader.contacts[number]["kind"], LucideIcon> = {
  phone: Phone,
  email: Mail,
  linkedin: Linkedin,
  github: Github,
};

export const metadata: Metadata = {
  title: "Resume",
  description: "Web resume for Rahul Singh covering production ML experience, technical skills, projects, and education.",
  openGraph: {
    title: "Resume | Rahul Singh",
    description: "Resume and technical profile for Rahul Singh, Machine Learning Engineer.",
  },
};

export default function ResumePage() {
  return (
    <main className="section-shell max-w-4xl py-16 md:py-24">
      <header className="surface-card technical-grid relative overflow-hidden p-7 md:p-10">
        <div className="absolute inset-x-0 top-0 h-1.5 bg-[var(--primary)]" />
        <div className="grid gap-7 md:grid-cols-[1fr_auto] md:items-start">
          <div>
            <p className="section-label">Resume</p>
            <h1 className="font-display mt-4 text-4xl font-semibold tracking-[-0.055em] md:text-6xl">{resumeHeader.name}</h1>
            <p className="mt-3 text-base font-medium md:text-lg">{resumeHeader.role}</p>
            <p className="font-technical mt-2 text-xs text-[var(--muted)]">{resumeHeader.location}</p>
          </div>
          <a className="btn-primary no-print" download="Rahul-Singh-ML-Engineer-Resume.pdf" href={site.resume}>
            <Download className="h-4 w-4" strokeWidth={1.7} />Download PDF
          </a>
        </div>
        <ul className="mt-7 grid gap-3 border-t soft-divider pt-6 text-sm sm:grid-cols-2">
          {resumeHeader.contacts.map((contact) => {
            const Icon = contactIcons[contact.kind];
            const external = contact.kind === "linkedin" || contact.kind === "github";
            return (
              <li key={contact.href} className="inline-flex min-w-0 items-center gap-2">
                <Icon className="h-4 w-4 shrink-0" strokeWidth={1.7} aria-hidden />
                <a
                  aria-label={`${contact.kind} ${contact.label}`}
                  className="text-link min-w-0 break-all"
                  href={contact.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                >
                  {contact.label}
                  {external ? <ArrowUpRight className="link-arrow h-3.5 w-3.5 shrink-0" aria-hidden /> : null}
                </a>
              </li>
            );
          })}
        </ul>
      </header>

      <section className="mt-14">
        <h2 className="font-display text-2xl font-semibold tracking-[-0.04em] md:text-3xl">
          Professional Summary
        </h2>
        <p className="mt-4 border-l-4 border-l-[var(--primary)] pl-5 text-base leading-8 text-[var(--muted)] md:text-lg">{resumeSummary}</p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold tracking-[-0.04em] md:text-3xl">
          Skills
        </h2>
        <div className="mt-5 grid gap-5 md:auto-rows-fr md:grid-cols-2">
          {resumeSkillGroups.map((group) => (
            <article key={group.title} className="surface-card flex h-full flex-col p-6">
              <h3 className="text-lg font-semibold tracking-[-0.025em]">{group.title}</h3>
              <div className="mt-3 flex flex-1 flex-wrap gap-2 content-start">
                {group.items.map((item) => <StackPill key={item}>{item}</StackPill>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold tracking-[-0.04em] md:text-3xl">
          Professional Experience
        </h2>
        <div className="mt-5 space-y-6">
          {resumeExperience.map((entry) => (
            <article key={entry.company} className="surface-card p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold tracking-[-0.025em]">{entry.role}</h3>
                <p className="font-technical text-xs text-[var(--muted)]">{entry.period}</p>
              </div>
              <p className="mt-1 text-sm font-medium text-[var(--muted)]">
                {entry.company}, {entry.location}
              </p>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-base leading-7 text-[var(--muted)] marker:text-[var(--primary-hover)]">
                {entry.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold tracking-[-0.04em] md:text-3xl">
          Personal Projects
        </h2>
        <div className="mt-5 space-y-6">
          {resumeProjects.map((project) => (
            <article key={project.title} className="surface-card p-6">
              <Link className="text-link text-base" href={project.href}>
                <span>{project.title}</span>
                <ArrowUpRight className="link-arrow h-4 w-4" strokeWidth={1.7} aria-hidden />
              </Link>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-base leading-7 text-[var(--muted)] marker:text-[var(--primary-hover)]">
                {project.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((item) => <StackPill key={item}>{item}</StackPill>)}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-semibold tracking-[-0.04em] md:text-3xl">
          Education
        </h2>
        <div className="mt-5 space-y-6">
          {resumeEducation.map((entry) => (
            <article key={entry.institution} className="surface-card p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold tracking-[-0.025em]">{entry.degree}</h3>
                <p className="font-technical text-xs text-[var(--muted)]">{entry.period}</p>
              </div>
              <p className="mt-2 text-sm font-medium text-[var(--muted)]">
                {entry.institution}, {entry.location}
              </p>
              <p className="mt-2 text-sm text-[var(--muted)]">{entry.score}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
