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
      <div className="hero-viewport section-shell relative grid gap-8 py-10 lg:grid-cols-[1.2fr_0.58fr] lg:items-center lg:py-10 xl:py-12">
        <div className="hero-enter">
          <p className="section-label">Rahul Singh · Machine Learning Engineer · Pune, India</p>
          <h1 className="font-display mt-5 max-w-5xl text-4xl font-semibold leading-[0.98] tracking-[-0.065em] sm:text-5xl lg:text-[clamp(3.5rem,4.4vw,4.5rem)]">
            I build reliable machine learning systems for noisy, real-world data.
          </h1>
          <div className="mt-5 max-w-3xl space-y-2 text-base leading-7 text-[var(--muted)] sm:text-lg">
            <p>
              Machine Learning Engineer with 4+ years of production experience building fuel analytics,
              telemetry detection, and data-quality systems.
            </p>
            <p>
              My work combines production ML with applied AI, retrieval workflows, and recommendation
              systems, with a focus on clear system design, measurable outcomes, and dependable engineering.
            </p>
          </div>

          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Selected technical skills">
            {heroSkills.map((skill) => (
              <li key={skill}><StackPill>{skill}</StackPill></li>
            ))}
          </ul>

          <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
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

        <div className="hero-enter hero-enter-delay lg:max-w-[26rem] lg:justify-self-end">
          <PortraitPlaceholder />
        </div>
      </div>

      <div className="bg-[var(--foreground)] text-[var(--background)]">
        <dl className="section-shell grid sm:grid-cols-2 lg:grid-cols-4">
          {homeMetrics.map((metric, index) => (
            <div
              key={metric.label}
              className={`metric-strip-item flex min-h-28 flex-col items-center justify-center px-6 py-6 text-center ${index > 0 ? "border-t border-white/15 sm:border-l sm:border-t-0" : ""}`}
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
