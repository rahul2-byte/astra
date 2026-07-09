import {
  ArrowUpRight,
  Code2 as Github,
  Download,
  Link as Linkedin,
  Mail,
  Phone,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { site } from "@/content/site";
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

export default function ResumePage() {
  return (
    <main className="section-shell max-w-3xl py-16 text-slate-950 md:py-24">
      <header className="glass-panel p-7 md:p-9">
        <p className="section-label">Resume</p>
        <h1 className="font-display mt-3 text-4xl font-bold tracking-tight text-slate-950 md:text-5xl">
          {resumeHeader.name}
        </h1>
        <p className="mt-2 text-base font-medium text-slate-700 md:text-lg">{resumeHeader.role}</p>
        <p className="mt-1 text-sm text-slate-600">{resumeHeader.location}</p>
        <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-slate-700">
          {resumeHeader.contacts.map((contact) => {
            const Icon = contactIcons[contact.kind];
            return (
              <li key={contact.href} className="inline-flex items-center gap-1.5">
                <Icon className="h-4 w-4 text-slate-700" strokeWidth={1.7} aria-hidden />
                <a
                  aria-label={`${contact.kind} ${contact.label}`}
                  className="text-[#2f5ea4] underline underline-offset-4 hover:text-slate-950"
                  href={contact.href}
                >
                  {contact.label}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="mt-6 flex">
          <a
            className="btn-primary text-sm"
            download="Rahul-Singh-ML-Engineer-Resume.pdf"
            href={site.resume}
          >
            <Download className="h-5 w-5" strokeWidth={1.7} />
            Download PDF
          </a>
        </div>
      </header>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
          Professional Summary
        </h2>
        <p className="mt-4 text-base leading-8 text-slate-700 md:text-lg">{resumeSummary}</p>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
          Skills
        </h2>
        <div className="mt-5 grid gap-5 md:grid-cols-2">
          {resumeSkillGroups.map((group) => (
            <article key={group.title} className="glass-panel p-6">
              <h3 className="text-lg font-semibold text-slate-950">{group.title}</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-sm border border-slate-300/80 bg-white/30 px-3 py-1 text-sm text-slate-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
          Professional Experience
        </h2>
        <div className="mt-5 space-y-6">
          {resumeExperience.map((entry) => (
            <article key={entry.company} className="glass-panel p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold text-slate-950">{entry.role}</h3>
                <p className="text-sm font-medium text-slate-600">{entry.period}</p>
              </div>
              <p className="mt-1 text-sm font-medium text-slate-700">
                {entry.company}, {entry.location}
              </p>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-base leading-7 text-slate-700 marker:text-slate-500">
                {entry.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
          Personal Projects
        </h2>
        <div className="mt-5 space-y-6">
          {resumeProjects.map((project) => (
            <article key={project.title} className="glass-panel p-6">
              <a
                className="inline-flex items-baseline gap-1.5 text-lg font-semibold text-slate-950 underline-offset-4 hover:underline"
                href={project.href}
              >
                <span>{project.title}</span>
                <ArrowUpRight className="h-4 w-4 text-slate-700" strokeWidth={1.7} aria-hidden />
              </a>
              <ul className="mt-4 list-disc space-y-3 pl-5 text-base leading-7 text-slate-700 marker:text-slate-500">
                {project.bullets.map((bullet) => (
                  <li key={bullet}>{bullet}</li>
                ))}
              </ul>
              <div className="mt-4 flex flex-wrap gap-2">
                {project.stack.map((item) => (
                  <span
                    key={item}
                    className="rounded-sm border border-slate-300/80 bg-white/30 px-3 py-1 text-sm text-slate-700"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="mt-12">
        <h2 className="font-display text-2xl font-bold tracking-tight text-slate-950 md:text-3xl">
          Education
        </h2>
        <div className="mt-5 space-y-6">
          {resumeEducation.map((entry) => (
            <article key={entry.institution} className="glass-panel p-6">
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <h3 className="text-lg font-semibold text-slate-950">{entry.degree}</h3>
                <p className="text-sm font-medium text-slate-600">{entry.period}</p>
              </div>
              <p className="mt-2 text-sm font-medium text-slate-700">
                {entry.institution}, {entry.location}
              </p>
              <p className="mt-2 text-sm text-slate-700">{entry.score}</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
