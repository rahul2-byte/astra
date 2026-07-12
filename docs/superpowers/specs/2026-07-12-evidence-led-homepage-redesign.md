# Evidence-Led Homepage Redesign

## Objective

Redesign Rahul Singh's homepage into a self-contained recruiter profile that communicates identity, experience level, strongest capabilities, measurable production impact, featured work, current experience, resume access, and contact options without requiring another page visit.

The redesign is homepage-focused. It preserves the existing Signal Grid theme, App Router structure, routes, shared design tokens, supported content, project case studies, resume PDF, accessible mobile navigation, and reduced-motion behavior.

## Existing Strengths to Preserve

- Warm-white, yellow, and charcoal Signal Grid visual system.
- Space Grotesk and IBM Plex Mono typography.
- Accessible sticky header and mobile navigation.
- Existing proof metrics supported by resume content.
- Three real featured case studies with valid detail routes.
- Reusable buttons, links, cards, stack pills, technical grid, focus treatment, and reduced-motion rules.
- Existing maximum content width and responsive spacing conventions.

## Problems to Resolve

- Rahul's name does not appear prominently in the hero content.
- The hero has four similarly prominent actions and no clear conversion priority.
- No professional portrait asset exists.
- Recruiter snapshot duplicates roles and technology information already present nearby.
- The homepage lacks a complete current-role preview, resume callout, and final contact conversion section.
- Skill grouping emphasizes learning status rather than senior production positioning.
- Project evidence copy exposes internal asset/repository TODO language.
- Experience copy uses third-person narration.
- Earlier learning projects weaken the production-focused homepage narrative.
- Footer lacks LinkedIn, email, professional label, and resume access.

## Information Architecture

The homepage will use this order:

1. Existing header with compact desktop resume action.
2. Hero with Rahul's name, positioning, supported summary, selected skills, portrait placeholder, and three prioritized actions.
3. Four supported proof metrics integrated with the hero transition.
4. Professional snapshot explaining production experience and applied-AI direction.
5. Four core-expertise areas.
6. Three featured project case studies.
7. Intangles experience preview.
8. Resume callout with separate page and PDF actions.
9. Recruiter-focused contact call to action.
10. Expanded professional footer.

Earlier learning projects will be removed from the homepage. Their source data will remain unchanged because this task does not redesign the Projects page or delete historical content.

## Hero Content

### Eyebrow

`Rahul Singh · Machine Learning Engineer · Pune, India`

### Headline

`I build reliable machine learning and AI systems for noisy, real-world data.`

### Supporting Copy

`Machine Learning Engineer with 4+ years of production experience building fuel analytics, telemetry detection, and data-quality systems.`

`My work spans production ML, RAG and AI agents, recommendation systems, and backend model delivery—with measurable improvements in alert quality and operational workload.`

### Selected Skills

- Production ML
- Python & SQL
- Telemetry & Time Series
- Event & Anomaly Detection
- RAG & AI Agents
- FastAPI
- Docker & AWS
- FAISS & LightGBM

### Actions

- Primary: `View Case Studies` → `/projects`
- Secondary: `Download Resume` → `/ML_Engineer_resume.pdf`
- Text action: `Contact Me` → `/contact`

### Portrait Placeholder

No professional portrait exists in `public/`. The implementation will render an honest, accessible placeholder rather than a fake image path.

The placeholder will include:

- Visible label: `Professional portrait`
- Visible specification: `4:5 crop · 1200 × 1500 recommended`
- Accessible description explaining that Rahul's professional portrait will appear there.
- Stable `4 / 5` aspect ratio across breakpoints.
- Neutral card treatment consistent with Signal Grid.

When a real portrait is supplied, it should be a chest-up professional photograph with a neutral background, natural lighting, no embedded text, and a minimum size of `1200 × 1500` pixels.

## Proof Metrics

- `4+ years` — Production ML experience
- `95%` — Alert accuracy maintained
- `15%` — False-positive reduction
- `30+ hrs/week` — Operational time reclaimed

Metrics will remain qualified through surrounding production context and will not be animated as simulated counters.

## Professional Snapshot

### Heading

`Production experience first. Applied AI depth next.`

### Copy

`I work where machine learning meets imperfect production data. At Intangles, I have built and improved systems for fuel-event detection, telemetry loss, sensor smoothing, and analytics reliability.`

`Alongside production work, I build retrieval, agent, recommendation, and ML-serving projects that demonstrate practical applied-AI system design.`

The section will include a compact target-role summary using roles already supported by the site and user-provided brief. It will not repeat every role in the hero.

## Core Expertise

### Production Machine Learning

`Detection systems, evaluation, error analysis, false-positive reduction, and reliable operation on noisy data.`

Supported capabilities: model development, feature engineering, evaluation, error analysis, production monitoring, and noisy real-world data.

### Telemetry & Time-Series Analytics

`OBD signals, fuel analytics, missing-data detection, event detection, DBSCAN, LOESS, and SMA smoothing.`

### RAG, LLMs & AI Agents

`Retrieval pipelines, embeddings, vector databases, LangGraph orchestration, observability, and local inference.`

### ML APIs & Deployment

`FastAPI services, Docker workflows, AWS serverless deployment, vector retrieval, ranking, and model integration.`

Each expertise item will explain capability and value. It will not be rendered as an unstructured tag cloud.

## Featured Projects

### Section Heading

`Case studies grounded in engineering decisions.`

### Production ML Systems at Intangles

- Problem: Noisy OBD telemetry, sensor instability, missing signals, and operationally sensitive fuel alerts.
- Contribution: Extended DBSCAN + LOESS detection, built sub-threshold and data-loss detection, applied SMA smoothing, and improved analytics code.
- Evidence: `95% alert accuracy maintained · 15% false-positive reduction`
- Route: `/projects/production-ml-systems`

### FIN-AI

- Problem: Financial research workflows need grounded retrieval, explicit orchestration, and inspectable outputs.
- Contribution: Designed FastAPI boundaries, LangGraph agent flow, pgvector retrieval, local inference, and Opik tracing.
- Evidence: `Multi-agent RAG · Local inference · Traceable workflow`
- Route: `/projects/fin-ai`

### Movie Recommendation System

- Problem: Personalized recommendations require efficient retrieval, ranking quality, and practical model delivery.
- Contribution: Built FAISS candidate retrieval, LightGBM ranking, runtime features, FastAPI serving, and AWS deployment boundaries.
- Evidence: `Two-stage retrieval + ranking · Serverless delivery`
- Route: `/projects/movie-recommendation-system`

Project cards will show problem, contribution, evidence, selected stack, and a descriptive `View Case Study` link. Internal missing-asset notes will not appear on the homepage.

A final `View All Projects` action will link to `/projects`.

## Experience Preview

### Heading

`Production ML at Intangles`

### Metadata

`Machine Learning Engineer · April 2022–Present · Pune, India`

### Summary

`Building and improving fuel analytics systems across OBD telemetry, event detection, sensor-data quality, and operational support workflows.`

### Achievements

- Maintained approximately 95% alert accuracy.
- Reduced false positives by approximately 15%.
- Reduced support queries from approximately six to two per day.

Action: `View Full Experience` → `/experience`

The homepage will not reproduce the complete resume experience list.

## Resume Callout

### Heading

`Need the complete technical profile?`

### Copy

`Review my production experience, technical skills, applied-AI projects, measurable outcomes, and education in one place.`

### Actions

- `View Resume` → `/resume`
- `Download PDF` → `/ML_Engineer_resume.pdf`

These destinations remain separate and explicit.

## Contact Call to Action

### Heading

`Open to production ML and applied AI opportunities.`

### Copy

`I'm interested in Machine Learning, Applied AI, Generative AI, LLM, RAG, NLP, and Data Science roles where reliable engineering matters.`

### Actions

- Primary: `Contact Me` → `/contact`
- Email → existing `mailto:` destination
- LinkedIn → existing external profile
- GitHub → existing external profile

No generic collaboration language or unsupported availability claim will be added.

## Header and Footer

### Header

- Preserve all existing main navigation links and accessible mobile menu behavior.
- Add one compact desktop `Download Resume` action.
- Do not add an About link because no About route exists.
- Keep Home, Experience, Projects, Resume, and Contact labels unchanged.

### Footer

- Preserve the copyright sentence.
- Add Rahul's professional label.
- Include compact links to Experience, Projects, Resume, Contact, GitHub, LinkedIn, and email.
- Avoid repeating the complete header navigation layout.

## Visual Design

- Preserve existing theme tokens and typography.
- Use fewer isolated cards and more section-level rhythm.
- Keep yellow limited to emphasis, action states, metrics, markers, and small surfaces.
- Use a balanced copy/portrait desktop hero and copy-first mobile sequence.
- Use square or moderately rounded geometry consistent with the existing design system.
- Retain technical grid details without increasing background motion.
- Limit decorative animation to existing signal drift and interaction micro-transitions.

## Component Architecture

Create focused homepage components under `src/components/home/`:

- `home-hero.tsx` — identity, copy, skills, actions, portrait placeholder, and proof metrics.
- `professional-snapshot.tsx` — professional summary and role positioning.
- `expertise-grid.tsx` — four typed expertise items.
- `featured-projects.tsx` — three evidence-led project previews.
- `experience-preview.tsx` — current role and supported achievements.
- `resume-callout.tsx` — resume page/PDF actions.
- `contact-cta.tsx` — final conversion section.
- `portrait-placeholder.tsx` — stable accessible missing-asset state.

`src/components/home-sections.tsx` will become a simple composition root. Homepage-specific copy and typed data will move to `src/content/home.ts` to keep presentation separate from content.

Existing `StackPill`, buttons, links, theme classes, Header, and Footer will be reused. `ProjectCard` will not be globally changed if homepage-specific project requirements would complicate its existing generic interface.

## Responsive Behavior

### Desktop

- Two-column hero with copy dominant and portrait frame secondary.
- Four-column proof strip.
- Four expertise columns where space permits.
- Featured projects use one emphasized card plus two supporting cards or a balanced three-card grid.

### Tablet

- Two-column hero with reduced type scale and compact portrait.
- Metrics and expertise use two columns.
- Project content avoids dense three-column text.

### Mobile

- Hero copy first, portrait placeholder second.
- Primary and secondary actions become full-width touch targets.
- Text action remains clearly visible below buttons.
- Skills wrap without horizontal scrolling.
- Proof, expertise, projects, experience, resume, and contact content stack.
- Avoid viewport-height hero constraints and excessive empty space.

## Accessibility and Performance

- Preserve semantic landmarks and logical heading hierarchy.
- Keep one homepage `h1`.
- Use lists for skills, metrics, achievements, and project evidence where appropriate.
- Keep all controls keyboard accessible with existing focus treatment.
- Use descriptive case-study and external-link labels.
- Preserve the accessible mobile menu test and reduced-motion CSS.
- Do not add a new animation or image dependency.
- Do not mark homepage sections as client components unless a real interaction requires it.
- The portrait placeholder will reserve stable space and cause no layout shift.

## SEO and Metadata

- Add homepage-specific Metadata in `src/app/page.tsx`.
- Page title: `Rahul Singh — Machine Learning Engineer | Production ML & Applied AI`
- Meta description: `Machine Learning Engineer with 4+ years of production experience building telemetry analytics, detection systems, RAG workflows, recommendation systems, and ML APIs.`
- Use the same supported copy for Open Graph title and description.
- Do not add a canonical URL because the deployed production domain is not present in the repository.
- Do not add a social preview image because no suitable asset exists.

## Testing and Verification

- Update homepage content tests before implementation to require the new identity, hierarchy, CTAs, expertise, experience, resume, contact, and placeholder content.
- Add tests for the new homepage content data and explicit destinations.
- Preserve existing header, visual-system, recruiter-page, and case-study tests.
- Run targeted homepage tests, then the full Vitest suite, ESLint, and production Next.js build.
- Verify all homepage internal routes and the resume PDF return successful responses.
- Inspect at mobile, tablet, and desktop widths if a browser runtime is available.

## Non-Goals

- No redesign of Experience, Projects, Resume, Contact, Writing, or case-study page layouts.
- No new route or About page.
- No fabricated portrait, metrics, repositories, demos, testimonials, or project results.
- No new dependencies.
- No contact form, CMS, analytics, or backend changes.
- No broad theme replacement.

## Acceptance Criteria

- A recruiter can find Rahul's name, role, experience level, strongest capabilities, production evidence, projects, current role, resume access, and contact action from the homepage.
- Hero actions have a clear primary/secondary/text hierarchy.
- The missing portrait is represented honestly with a stable accessible placeholder.
- All claims remain traceable to existing content or the approved brief.
- Homepage project previews contain no internal TODO language.
- All existing routes and external destinations remain valid.
- Mobile layout, keyboard access, focus visibility, reduced motion, tests, lint, and build remain functional.
