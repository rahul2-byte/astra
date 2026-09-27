import type { Metadata } from "next";
import Link from "next/link";
import { siGithub } from "simple-icons";
import { projects } from "@/content/projects";
import { BrandIcon } from "@/components/brand-icon";

export const metadata: Metadata = {
  title: "Projects",
  description: "Independent projects in financial research, model fine-tuning, and recommendations, with implementation details, available evaluation, and limitations.",
};

export default function ProjectsPage() {
  return (
    <main id="main-content" className="shell projects-page">
      <header className="page-intro">
        <p className="eyebrow">Selected work</p>
        <h1>Projects</h1>
        <p>Projects in financial research, model fine-tuning, and recommendation systems. Each write-up covers the implementation, available evidence, and known limitations.</p>
      </header>
      <ol className="project-index" aria-label="All projects">
        {projects.map((project) => (
          <li key={project.slug}>
            <span className="project-number">{project.number}</span>
            <div className="project-index-copy">
              <p className="project-category">{project.category}</p>
              <h2><Link href={`/projects/${project.slug}`}>{project.title}</Link></h2>
              <p>{project.summary}</p>
              <ul className="skill-list" aria-label={`${project.title} technologies`}>
                {project.tools.slice(0, 5).map((tool) => <li key={tool}>{tool}</li>)}
              </ul>
            </div>
            <div className="project-index-actions">
              <Link className="project-link" href={`/projects/${project.slug}`} aria-label={`Read ${project.title} case study`}>
                Read case study <span aria-hidden="true">↗</span>
              </Link>
              <a
                className="project-link"
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
    </main>
  );
}
