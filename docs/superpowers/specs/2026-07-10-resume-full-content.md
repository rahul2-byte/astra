# Resume Page Full Content Design

## Goal

Replace the placeholder resume content with the exact text from the existing resume PDF so the page reads like a real resume, with icons on every link.

## Approved Direction

- Mirror the resume text exactly into `src/content/resume.ts`.
- Page structure:
  - Header card with name, role line, location, single contact row with icon-prefixed links (phone, email, LinkedIn, GitHub), and a `Download PDF` button.
  - `Professional Summary` section with the full paragraph.
  - `Skills` section grouped by the resume's categories with chip lists.
  - `Professional Experience` entry: role and date range on one line, company and location on the next, full bullet list.
  - `Personal Projects` entries: title with `ArrowUpRight` icon linking to internal case studies, full bullet lists, and stack chips.
  - `Education` entry: degree, date range, institution, location, percentage.
- Use Lucide icons (`Phone`, `Mail`, `Linkedin` aliased from `Link`, `Github` aliased from `Code2`, `Download`, `ArrowUpRight`).
- Keep `glass-panel` styling and only the `Download PDF` action button.

## Constraints

- Use real resume content from the user-provided text.
- Skill groups become: `Programming`, `Machine Learning`, `LLM/RAG`, `Backend & Cloud`, `MLOps & Observability`, `Visualization`.
- Project links: FIN-AI -> `/projects/fin-ai`, Movie Recommendation -> `/projects/movie-recommendation-system`.

## Testing

- Update tests to assert new skill groups, Intangles bullets, FIN-AI and Movie Recommendation bullets, and education details.
- Run tests, lint, and production build before completion.
