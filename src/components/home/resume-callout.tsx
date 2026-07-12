import Link from "next/link";
import { ArrowUpRight, Download, FileCheck2 } from "lucide-react";
import { site } from "@/content/site";

export function ResumeCallout() {
  return (
    <section className="section-shell py-20 md:py-24" aria-labelledby="resume-callout-title">
      <div className="grid gap-7 border-y soft-divider py-10 lg:grid-cols-[auto_1fr_auto] lg:items-center">
        <span className="grid h-14 w-14 place-items-center border border-[var(--foreground)] bg-[var(--primary)]">
          <FileCheck2 className="h-6 w-6" strokeWidth={1.5} aria-hidden />
        </span>
        <div>
          <p className="section-label">Resume</p>
          <h2 id="resume-callout-title" className="font-display mt-4 text-3xl font-semibold tracking-[-0.045em] md:text-4xl">
            Need the complete technical profile?
          </h2>
          <p className="mt-4 max-w-3xl leading-7 text-[var(--muted)]">
            Review my production experience, technical skills, applied-AI projects, measurable outcomes,
            and education in one place.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row lg:flex-col xl:flex-row">
          <Link className="btn-primary" href="/resume">
            View Resume <ArrowUpRight className="link-arrow h-4 w-4" aria-hidden />
          </Link>
          <a className="btn-secondary" href={site.resume} download="Rahul-Singh-ML-Engineer-Resume.pdf">
            <Download className="h-4 w-4" aria-hidden /> Download PDF
          </a>
        </div>
      </div>
    </section>
  );
}
