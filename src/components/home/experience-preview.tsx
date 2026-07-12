import Link from "next/link";
import { ArrowUpRight, Building2, Check } from "lucide-react";
import { experienceHighlights } from "@/content/home";
import { StackPill } from "@/components/case-study/stack-pill";

const domains = ["OBD telemetry", "Fuel analytics", "Event detection", "Sensor-data quality"];

export function ExperiencePreview() {
  return (
    <section className="section-tone py-20 md:py-28" aria-labelledby="experience-preview-title">
      <div className="section-shell">
        <div className="surface-card overflow-hidden">
          <div className="grid lg:grid-cols-[0.72fr_1.28fr]">
            <div className="border-b border-[var(--border)] p-7 md:p-9 lg:border-b-0 lg:border-r">
              <div className="flex items-start justify-between gap-4">
                <span className="grid h-12 w-12 place-items-center bg-[var(--primary)]">
                  <Building2 className="h-5 w-5" strokeWidth={1.6} aria-hidden />
                </span>
                <span className="font-technical text-xs text-[var(--muted)]">April 2022–Present</span>
              </div>
              <p className="section-label mt-9">Experience preview</p>
              <h2 id="experience-preview-title" className="font-display mt-5 text-4xl font-semibold tracking-[-0.05em]">
                Production ML at Intangles
              </h2>
              <p className="font-technical mt-5 text-xs leading-6 text-[var(--muted)]">
                Machine Learning Engineer · April 2022–Present · Pune, India
              </p>
            </div>

            <div className="p-7 md:p-9">
              <p className="text-lg leading-8 text-[var(--muted)]">
                Building and improving fuel analytics systems across OBD telemetry, event detection,
                sensor-data quality, and operational support workflows.
              </p>
              <ul className="mt-7 grid gap-3 md:auto-rows-fr md:grid-cols-3">
                {experienceHighlights.map((highlight) => (
                  <li key={highlight} className="flex h-full flex-col border border-[var(--border)] bg-[var(--card)] p-4 text-sm leading-6">
                    <Check className="mb-4 h-5 w-5 text-[var(--primary-hover)]" strokeWidth={2} aria-hidden />
                    <span className="flex-1">{highlight}</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-6 flex flex-wrap gap-2" aria-label="Experience domains">
                {domains.map((domain) => <li key={domain}><StackPill>{domain}</StackPill></li>)}
              </ul>
              <Link className="text-link mt-7" href="/experience">
                View Full Experience <ArrowUpRight className="link-arrow h-4 w-4" aria-hidden />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
