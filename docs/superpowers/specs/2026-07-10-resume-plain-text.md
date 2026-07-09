# Resume Page Plain Text Design

## Goal

Replace the PDF viewer with a plain-text resume page so the full content is readable directly on the site, with a single PDF download link at the top.

## Approved Direction

- Render the resume as plain text sections in a long scrollable page.
- Sections:
  - Header: name, role line, location, contact list.
  - Professional summary.
  - Core skills grouped by category.
  - Production ML experience at Intangles (high-level).
  - Featured project highlights: FIN-AI, Movie Recommendation System, Production ML Systems.
  - Education.
- Top-of-page action bar with only one button: `Download PDF` linking to `/ML_Engineer_resume.pdf` with `download="Rahul-Singh-ML-Engineer-Resume.pdf"`.
- No iframe PDF viewer, no `Open in new tab`, no `Copy share link`.

## Constraints

- Source data from existing content modules (`src/content/site.ts`, `src/content/skills.ts`, `src/content/projects.ts`) plus a new resume content module.
- Keep `section-shell`, `glass-panel`, `font-display`, and `section-label` styling.
- Drop `src/components/resume-share-button.tsx` if it has no remaining users.

## Testing

- Update tests to verify all major resume sections render as text.
- Verify only `Download PDF` button is present, and it targets `/ML_Engineer_resume.pdf`.
- Run tests, lint, and production build before completion.
