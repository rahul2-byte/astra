import { experience } from "@/content/experience";
import { projects } from "@/content/projects";
import { site, techStack } from "@/content/site";

export function HomePage() {
  return (
    <main id="main-content" className="shell home-main">
      <section id="about" className="hero" aria-labelledby="home-title">
        <div className="hero-copy">
          <h1 id="home-title">Hi, I’m Rahul.</h1>
          <p className="hero-role">Machine learning engineer at Intangles</p>
          <p className="hero-intro">
            I work with noisy vehicle telemetry at Intangles. Away from work, I build projects in financial research, recommendations, and language models.
          </p>
          <div className="hero-actions">
            <a className="resume-link" href={site.resume} download="Rahul-Singh-Resume.pdf">Download résumé</a>
            <nav className="social-links" aria-label="Social links">
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a>
              <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a>
            </nav>
          </div>
          <address className="contact-links" aria-label="Contact Rahul">
            <a href={`mailto:${site.email}`}><span aria-hidden="true">✉︎</span><span><small>Email</small>{site.email}</span></a>
            <a href={site.phoneHref}><span aria-hidden="true">☎︎</span><span><small>Phone</small>{site.phone}</span></a>
          </address>
        </div>
      </section>

      <section id="experience" className="experience-section" aria-label="Experience at Intangles">
        <h2 id="experience-title" className="section-title">Experience</h2>
        <article className="experience-card" aria-label="Machine Learning Engineer at Intangles">
          <div className="experience-mark" aria-hidden="true">I</div>
          <div className="experience-content">
            <header className="experience-heading">
              <div>
                <h3>Intangles</h3>
                <p>Machine Learning Engineer</p>
              </div>
              <time dateTime="2022-04">{experience.dates}</time>
            </header>
            <ul className="experience-workstreams">
              {experience.workstreams.map(({ title, detail }) => (
                <li key={title}>
                  <h4>{title}</h4>
                  <p>{detail}</p>
                </li>
              ))}
            </ul>
          </div>
        </article>
      </section>

      <section className="technology-section" aria-labelledby="technology-title">
        <h2 id="technology-title" className="section-title">Technologies I work with</h2>
        <ul className="tech-list">
          {techStack.map((technology) => <li key={technology}>{technology}</li>)}
        </ul>
      </section>

      <section className="personal-projects" aria-labelledby="projects-title">
        <h2 id="projects-title" className="section-title">Personal projects</h2>
        <div className="home-project-list">
          {projects.map((project) => (
            <a className="home-project" key={project.slug} href={`/projects#${project.slug}`}>
              <span className="home-project-number">{project.number}</span>
              <span className="home-project-copy"><strong>{project.title}</strong><span>{project.summary}</span></span>
              <span className="home-project-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
        <a className="all-projects-link" href="/projects">View all project write-ups <span aria-hidden="true">↗</span></a>
      </section>
    </main>
  );
}
