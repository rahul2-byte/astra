import Link from "next/link";
import { ArrowUpRight, Download } from "lucide-react";
import { heroSkills, homeMetrics } from "@/content/home";
import { site } from "@/content/site";
import { StackPill } from "@/components/case-study/stack-pill";
import { PortraitPlaceholder } from "@/components/home/portrait-placeholder";

export function HomeHero() {
  return (
    <section className="technical-grid relative border-b soft-divider">
      <div className="signal-glow animate-signal pointer-events-none absolute -right-24 top-10 h-[28rem] w-[28rem]" />
      <div className="section-shell relative grid gap-12 py-14 lg:grid-cols-[1.2fr_0.58fr] lg:items-center lg:py-20">
        <div className="hero-enter">
          <p className="section-label">Rahul Singh · Machine Learning Engineer · Pune, India</p>
          <h1 className="font-display mt-7 max-w-5xl text-5xl font-semibold leading-[0.98] tracking-[-0.065em] sm:text-6xl lg:text-[5rem]">
            I build reliable machine learning and AI systems for noisy, real-world data.
          </h1>
          <div className="mt-7 max-w-3xl space-y-3 text-lg leading-8 text-[var(--muted)] md:text-xl">
            <p>
              Machine Learning Engineer with 4+ years of production experience building fuel analytics,
              telemetry detection, and data-quality systems.
            </p>
            <p>
              My work spans production ML, RAG and AI agents, recommendation systems, and backend model
              delivery—with measurable improvements in alert quality and operational workload.
            </p>
          </div>

          <ul className="mt-7 flex flex-wrap gap-2" aria-label="Selected technical skills">
            {heroSkills.map((skill) => (
              <li key={skill}><StackPill>{skill}</StackPill></li>
            ))}
          </ul>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <Link className="btn-primary" href="/projects">
              View Case Studies <ArrowUpRight className="link-arrow h-4 w-4" aria-hidden />
            </Link>
            <a
              className="btn-secondary"
              href={site.resume}
              download="Rahul-Singh-ML-Engineer-Resume.pdf"
            >
              <Download className="h-4 w-4" aria-hidden /> Download Resume
            </a>
            <Link className="text-link min-h-11 justify-center px-2 sm:justify-start" href="/contact">
              Contact Me <ArrowUpRight className="link-arrow h-4 w-4" aria-hidden />
            </Link>
          </div>
        </div>

        <div className="hero-enter hero-enter-delay">
          <PortraitPlaceholder />
        </div>
      </div>

      <div className="bg-[var(--foreground)] text-[var(--background)]">
        <dl className="section-shell grid sm:grid-cols-2 lg:grid-cols-4">
          {homeMetrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`min-h-28 py-6 ${index > 0 ? "border-t border-white/15 sm:border-l sm:border-t-0" : ""} ${index % 2 === 0 ? "sm:pr-6" : "sm:px-6"}`}
            >
              <dt className="font-technical text-[0.65rem] uppercase tracking-wider text-white/60">{metric.label}</dt>
              <dd className="metric-value mt-3 text-2xl font-semibold text-[var(--primary)]">{metric.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
