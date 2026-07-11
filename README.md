# Rahul Singh - ML Portfolio

A recruiter-focused portfolio for Rahul Singh, a Machine Learning Engineer based in Pune, India. The site presents production ML experience, applied AI/RAG work, recommendation systems projects, a full resume page, and direct recruiter contact paths.

Repository: <https://github.com/rahul2-byte/astra>

## Purpose

This portfolio is designed to help recruiters and hiring managers quickly understand:

- Rahul's target roles: Machine Learning Engineer, Applied ML Engineer, AI Engineer, Data Scientist, and LLM Engineer.
- Production experience: 4+ years working with noisy telemetry, fuel analytics, alerting, sensor processing, and production constraints.
- Project depth: detailed case-study pages for production ML systems, FIN-AI, and a movie recommendation system.
- Recruiter actions: view projects, review experience, download the resume, or contact Rahul directly.

The site avoids exaggerated claims and keeps employer-specific production work intentionally high-level.

## Portfolio Sections

### Home

The homepage is a concise recruiter landing page. It introduces Rahul's positioning, highlights key proof metrics, and links to the most important actions:

- View Projects
- View Experience
- View Resume
- Contact Rahul

The hero emphasizes production ML, applied AI, and recommender systems without duplicating content from the rest of the site.

### Experience

The experience page presents a narrative timeline across:

- Machine Learning Engineer work at Intangles.
- FIN-AI as an applied AI and RAG project.
- Movie Recommendation System as a recommender systems project.

Each entry explains context, role, stack, decisions, learnings, and outcomes.

### Projects

The projects page uses a featured-plus-supporting layout:

- Production ML Systems at Intangles
- FIN-AI
- Movie Recommendation System

Each project links to a case-study page with structured research-note style sections, metrics, architecture notes, evidence tables, comparison visuals, and technology context.

### Resume

The resume page mirrors the PDF resume content in a clean web format. It includes a download CTA for the PDF resume stored in `public/ML_Engineer_resume.pdf`.

### Contact

The contact page provides direct contact cards for email, phone, LinkedIn, GitHub, and resume download.

## Tech Stack

- Framework: Next.js App Router
- Language: TypeScript
- UI: React
- Styling: Tailwind CSS and global design utilities
- Icons: lucide-react
- Animation: framer-motion
- Testing: Vitest, Testing Library, jsdom
- Linting: ESLint with Next.js config

## Design System

The portfolio uses a warm editorial visual system:

- Warm off-white background: `#f7f3ea`
- Dotted radial-grid page texture
- Serif display typography through `--font-display`
- Glass-style content panels through `.glass-panel`
- Consistent buttons through `.btn-primary` and `.btn-secondary`
- Shared content width through `.section-shell`
- Recruiter-friendly labels through `.section-label` and `.status-badge`

The goal is to feel polished and human while staying simple enough for a professional ML portfolio.

## Project Structure

```text
src/
  app/
    contact/       Contact page
    experience/    Experience timeline page
    projects/      Projects index and case-study routes
    resume/        Web resume page
    writing/       Placeholder writing page
    globals.css    Global styles and design utilities
    layout.tsx     Root layout
    page.tsx       Homepage entry
  components/
    case-study/    Reusable case-study visualization components
    __tests__/     Component and page tests
    footer.tsx     Site footer
    header.tsx     Site navigation
    home-sections.tsx
    project-card.tsx
  content/
    case-studies.ts
    projects.ts
    resume.ts
    site.ts
    skills.ts
public/
  ML_Engineer_resume.pdf
docs/
  superpowers/     Design specs and implementation plans from development
```

## Getting Started

### Prerequisites

- Node.js compatible with Next.js 16
- npm

### Install Dependencies

```bash
npm install
```

### Run Locally

```bash
npm run dev
```

Open <http://localhost:3000> in a browser.

### Build Production Output

```bash
npm run build
```

### Start Production Server

```bash
npm run start
```

## Quality Checks

Run the full verification suite before committing changes:

```bash
npm test -- --run
npm run lint
npm run build
```

Current test coverage focuses on:

- Homepage recruiter positioning and CTAs.
- Core pages such as Experience, Resume, and Contact.
- Projects index content and case-study links.
- Case-study visualization components.
- Visual-system guardrails such as dotted background, glass panels, lucide icons, and package metadata.

## Content Editing Guide

Most portfolio content is centralized in `src/content`:

- Update contact, role, headline, navigation, and proof metrics in `src/content/site.ts`.
- Update homepage project cards in `src/content/projects.ts`.
- Update detailed case studies in `src/content/case-studies.ts`.
- Update the web resume in `src/content/resume.ts`.
- Update skill groupings in `src/content/skills.ts`.

When adding project claims, keep evidence clear. Production employer work should stay high-level and should not expose confidential implementation details.

## Resume Assets

The public resume download path used by the site is:

```text
/ML_Engineer_resume.pdf
```

The PDF lives at:

```text
public/ML_Engineer_resume.pdf
```

If the resume is updated, replace the PDF and check that the Resume and Contact pages still link correctly.

## Deployment Notes

The app is a standard Next.js project and can be deployed to Vercel or any platform that supports Next.js.

Recommended Vercel settings:

- Install command: `npm install`
- Build command: `npm run build`
- Output: Next.js default
- Node version: use the platform default compatible with Next.js 16, or configure a supported modern Node.js version.

## Git Workflow

Useful commands:

```bash
git status
git add .
git commit -m "feat: describe the change"
git push origin main
```

Before pushing, run:

```bash
npm test -- --run && npm run lint && npm run build
```

## Contact

- GitHub: <https://github.com/rahul2-byte>
- LinkedIn: <https://www.linkedin.com/in/-rahul-singh22/>
- Email: <rahulchand4299@gmail.com>
- Phone: +91 9027537314

## License

This is a personal portfolio project. Content, resume material, and personal branding belong to Rahul Singh.
