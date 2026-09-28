import Link from "next/link";
import { siGithub } from "simple-icons";
import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { site } from "@/content/site";
import { technologyGroups } from "@/content/technologies";
import { BrandIcon, DownloadIcon, LinkedInIcon, MailIcon, PhoneIcon } from "@/components/brand-icon";

export function HomePage() {
  return (
    <main id="main-content" className="shell home-main">
      <section id="about" className="hero" aria-labelledby="home-title">
        <div className="hero-copy">
          <h1 id="home-title">Hi, I’m Rahul.</h1>
          <p className="hero-role">Applied AI / Machine Learning Engineer at Intangles</p>
          <p className="hero-intro">
            I have 4+ years of experience building production vehicle-telemetry models and an internal RAG recommender. My projects include a financial research agent with bounded tool execution, evidence checks, and replayable evaluation.
          </p>
          <div className="hero-actions">
            <a className="resume-link" href={site.resume} download="Rahul-Singh-Resume.pdf">
              <DownloadIcon className="icon" />
              Download resume
            </a>
            <nav className="social-links" aria-label="Social links">
              <a href={site.github} target="_blank" rel="noopener noreferrer">
                <BrandIcon className="icon" icon={siGithub} />
                GitHub
              </a>
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">
                <LinkedInIcon className="icon" />
                LinkedIn
              </a>
            </nav>
          </div>
          <address className="contact-links" aria-label="Contact Rahul">
            <a href={`mailto:${site.email}`}>
              <MailIcon className="contact-icon" />
              <span className="contact-copy"><small>Email</small><span>{site.email}</span></span>
            </a>
            <a href={site.phoneHref}>
              <PhoneIcon className="contact-icon" />
              <span className="contact-copy"><small>Phone</small><span>{site.phone}</span></span>
            </a>
          </address>
        </div>
      </section>

      <section id="experience" className="experience-section" aria-labelledby="experience-title">
        <h2 id="experience-title" className="section-title">Experience</h2>
        <article className="experience-card" aria-label="Machine Learning Engineer at Intangles">
          <div className="experience-mark" aria-hidden="true">I</div>
          <div className="experience-content">
            <header className="experience-heading">
              <div>
                <h3>Intangles</h3>
                <p>Machine Learning Engineer · Pune, India</p>
              </div>
              <time dateTime="2022-04">{experience.dates}</time>
            </header>
            <ul className="experience-outcomes" aria-label="Fuel Analytics scale">
              {experience.outcomes.map(({ value, label }) => (
                <li key={value}>
                  <strong>{value}</strong>
                  <span>{label}</span>
                </li>
              ))}
            </ul>
            <ul className="experience-workstreams">
              {experience.workstreams.map(({ title, points }) => (
                <li key={title}>
                  <h4>{title}</h4>
                  <ul className="experience-points">
                    {points.map((point) => <li key={point}>{point}</li>)}
                  </ul>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      <section className="technology-section" aria-labelledby="technology-title">
        <h2 id="technology-title" className="section-title">Skills &amp; tools</h2>
        <ul className="technology-groups">
          {technologyGroups.map(({ title, items }) => (
            <li className="technology-group" key={title}>
              <h3>{title}</h3>
              <p className="technology-copy">{items.map(({ name }) => name).join(" · ")}</p>
            </li>
          ))}
        </ul>
      </section>

      <section className="personal-projects" aria-labelledby="projects-title">
        <h2 id="projects-title" className="section-title">Independent projects</h2>
        <ol className="home-project-list" aria-label="Selected projects">
          {projects.map((project) => (
            <li className="home-project" key={project.slug}>
              <span className="home-project-number">{project.number}</span>
              <div className="home-project-copy">
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
              </div>
              <div className="home-project-actions">
                <Link className="home-project-case-study" href={`/projects/${project.slug}`} aria-label={`Read ${project.title} case study`}>
                  Case study <span aria-hidden="true">↗</span>
                </Link>
                <a
                  className="home-project-source"
                  href={project.repository}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`View ${project.title} repository on GitHub`}
                >
                  <BrandIcon className="icon" icon={siGithub} />
                  GitHub
                </a>
              </div>
            </li>
          ))}
        </ol>
        <Link className="all-projects-link" href="/projects">Browse all projects <span aria-hidden="true">↗</span></Link>
      </section>

      <section className="education-section" aria-labelledby="education-title">
        <h2 id="education-title" className="section-title">Education</h2>
        <article className="education-entry">
          <div>
            <h3>Government Polytechnic Kashipur</h3>
            <p>Diploma in Computer Science and Engineering · Uttarakhand, India</p>
          </div>
          <time dateTime="2018-07">Jul 2018 – Sep 2021</time>
        </article>
      </section>
    </main>
  );
}
