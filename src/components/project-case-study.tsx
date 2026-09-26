import Image from "next/image";
import type { Project } from "@/content/projects";
import { EvidenceTableScroll } from "@/components/evidence-table-scroll";

export function ProjectCaseStudy({ project }: { project: Project }) {
  const titleId = `${project.slug}-title`;
  const workflowId = `${project.slug}-workflow-title`;
  const evidenceId = `${project.slug}-evidence-title`;
  const evidenceHintId = `${project.slug}-evidence-scroll-hint`;

  return (
    <article id={project.slug} className="project-page" aria-labelledby={titleId}>
      <header className="project-heading">
        <p className="project-category">{project.category}</p>
        <h2 id={titleId}>{project.title}</h2>
        <p className="project-deck">{project.summary}</p>
        <div className="project-meta"><span>{project.role}</span><span>Independent project</span></div>
        <ul className="tag-list project-tools" aria-label={`${project.title} tools`}>
          {project.tools.map((tool) => <li key={tool}>{tool}</li>)}
        </ul>
        <div className="project-actions">
          <a className="text-link text-link-primary" href={project.repository} target="_blank" rel="noopener noreferrer">Source code <span aria-hidden="true">↗</span></a>
          {project.liveDemo ? <a className="text-link" href={project.liveDemo} target="_blank" rel="noopener noreferrer">Live demo <span aria-hidden="true">↗</span></a> : null}
          <a className="text-link" href={project.evidenceLink} target="_blank" rel="noopener noreferrer">{project.evidenceLabel} <span aria-hidden="true">↗</span></a>
        </div>
      </header>

      <CaseSection id={`${project.slug}-context`} title="Why I built it">
        <p>{project.problem}</p>
      </CaseSection>

      <CaseSection id={`${project.slug}-build`} title="What I built">
        {project.approach.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
      </CaseSection>

      <section className="case-content" aria-labelledby={workflowId}>
        <div className="case-copy">
          <h3 id={workflowId}>How it works</h3>
          <ol className="workflow-list">
            {project.workflow.map((step) => <li key={step.title}><strong>{step.title}</strong><span>{step.detail}</span></li>)}
          </ol>
        </div>
      </section>

      {project.evidence ? (
        <section className="case-content" aria-labelledby={evidenceId}>
          <div className="case-copy">
            <h3 id={evidenceId}>Results</h3>
            {project.resultFigure ? (
              <figure className="project-figure">
                <Image
                  src={project.resultFigure.src}
                  alt={project.resultFigure.alt}
                  width={project.resultFigure.width}
                  height={project.resultFigure.height}
                  sizes="(max-width: 48rem) calc(100vw - 4rem), 41rem"
                />
                <figcaption>{project.resultFigure.caption}</figcaption>
              </figure>
            ) : null}
            <p id={evidenceHintId} className="table-hint">Scroll horizontally to see every column.</p>
            <EvidenceTableScroll title={project.title} hintId={evidenceHintId}>
              <table className="evidence-table">
                <caption className="sr-only">{project.evidence.caption}</caption>
                <thead><tr>{project.evidence.headings.map((heading) => <th key={heading} scope="col">{heading}</th>)}</tr></thead>
                <tbody>{project.evidence.rows.map((row) => <tr key={row[0]}>{row.map((cell, index) => index === 0 ? <th key={index} scope="row">{cell}</th> : <td key={index}>{cell}</td>)}</tr>)}</tbody>
              </table>
            </EvidenceTableScroll>
            <p className="evidence-note">{project.evidence.caption}</p>
            <p className="caveat">{project.evidence.note}</p>
          </div>
        </section>
      ) : (
        <CaseSection id={`${project.slug}-evidence`} title="What the repo shows">
          <p>There is no published evaluation of financial-answer accuracy or investment performance. The repository shows how the workflow works, not whether its conclusions are right.</p>
        </CaseSection>
      )}

      <CaseSection id={`${project.slug}-scope`} title="Limits">
        <p>{project.limitation}</p>
      </CaseSection>
    </article>
  );
}

function CaseSection({ id, title, children }: { id: string; title: string; children: React.ReactNode }) {
  return (
    <section className="case-content" aria-labelledby={`${id}-title`}>
      <div className="case-copy"><h3 id={`${id}-title`}>{title}</h3>{children}</div>
    </section>
  );
}
