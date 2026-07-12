# Evidence-Led Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Turn the existing homepage into a complete evidence-led recruiter profile while preserving the Signal Grid theme, supported content, routes, and server-first architecture.

**Architecture:** Move homepage-specific copy and typed data into `src/content/home.ts`, split the large homepage JSX into focused server components under `src/components/home/`, and retain `src/components/home-sections.tsx` as the composition root. Reuse existing global design utilities and `StackPill`; make only scoped Header/Footer additions required for resume and contact conversion.

**Tech Stack:** Next.js 16.2.10 App Router, React 19.2.4 Server Components, TypeScript 5, Tailwind CSS 4, CSS custom properties, Lucide React, Vitest, Testing Library.

## Global Constraints

- Preserve the existing Signal Grid theme and all current routes.
- Use only claims supported by current source content, resume data, or the approved brief.
- Do not add a fake portrait path, unsupported metric, About route, project repository, demo, testimonial, or social-preview asset.
- Add no dependency and no unnecessary client component.
- Keep the portrait placeholder accessible, stable, and clearly labeled.
- Preserve keyboard navigation, focus visibility, reduced motion, and mobile menu behavior.
- Do not redesign unrelated page layouts.
- Do not commit changes unless the user explicitly requests a commit.

---

### Task 1: Lock Homepage Content Contract

**Files:**
- Modify: `src/components/__tests__/home-content.test.tsx`
- Modify: `src/components/__tests__/visual-system.test.ts`
- Modify: `src/components/__tests__/header.test.tsx`

**Interfaces:**
- Consumes: Current `Home`, `Header`, source-readable `home-sections.tsx`, and shared visual system.
- Produces: Failing tests requiring the approved identity, hierarchy, routes, portrait placeholder, component split, and header resume action.

- [ ] **Step 1: Replace the old homepage positioning assertion**

Require the approved `h1`, name, supported summary, and primary action:

```tsx
expect(screen.getByText(/rahul singh · machine learning engineer · pune, india/i)).toBeInTheDocument();
expect(screen.getByRole("heading", {
  level: 1,
  name: /i build reliable machine learning and ai systems for noisy, real-world data/i,
})).toBeInTheDocument();
expect(screen.getByText(/4\+ years of production experience building fuel analytics/i)).toBeInTheDocument();
expect(screen.getByRole("link", { name: /view case studies/i })).toHaveAttribute("href", "/projects");
```

- [ ] **Step 2: Add complete homepage hierarchy assertions**

Require each recruiter section and destination:

```tsx
expect(screen.getByRole("heading", { name: /production experience first\. applied ai depth next/i })).toBeInTheDocument();
expect(screen.getByRole("heading", { name: /core expertise/i })).toBeInTheDocument();
expect(screen.getByRole("heading", { name: /case studies grounded in engineering decisions/i })).toBeInTheDocument();
expect(screen.getByRole("heading", { name: /production ml at intangles/i })).toBeInTheDocument();
expect(screen.getByRole("heading", { name: /need the complete technical profile/i })).toBeInTheDocument();
expect(screen.getByRole("heading", { name: /open to production ml and applied ai opportunities/i })).toBeInTheDocument();
expect(screen.getByRole("link", { name: /view full experience/i })).toHaveAttribute("href", "/experience");
expect(screen.getByRole("link", { name: /view resume/i })).toHaveAttribute("href", "/resume");
expect(screen.getAllByRole("link", { name: /download resume|download pdf/i }).some((link) => link.getAttribute("href") === "/ML_Engineer_resume.pdf")).toBe(true);
expect(screen.getByRole("link", { name: /^contact me$/i })).toHaveAttribute("href", "/contact");
```

- [ ] **Step 3: Add portrait and evidence assertions**

```tsx
expect(screen.getByRole("img", { name: /professional portrait placeholder for rahul singh/i })).toBeInTheDocument();
expect(screen.getByText(/4:5 crop · 1200 × 1500 recommended/i)).toBeInTheDocument();
expect(screen.getAllByText(/95%/i).length).toBeGreaterThan(0);
expect(screen.getAllByText(/15%/i).length).toBeGreaterThan(0);
expect(screen.getByText(/support queries from approximately six to two per day/i)).toBeInTheDocument();
expect(screen.queryByText(/add final repository/i)).not.toBeInTheDocument();
expect(screen.queryByText(/earlier work \/ learning projects/i)).not.toBeInTheDocument();
```

- [ ] **Step 4: Update visual architecture assertions**

Require the composition root imports and remove assumptions that icons live directly in it:

```ts
expect(home).toContain("@/components/home/home-hero");
expect(home).toContain("@/components/home/featured-projects");
expect(home).toContain("@/components/home/contact-cta");
expect(home).not.toContain("from \"lucide-react\"");
```

- [ ] **Step 5: Add desktop resume action coverage**

Extend the header test:

```tsx
expect(screen.getByRole("link", { name: /download resume/i })).toHaveAttribute(
  "href",
  "/ML_Engineer_resume.pdf",
);
```

- [ ] **Step 6: Run targeted tests and confirm RED**

Run: `npm test -- --run src/components/__tests__/home-content.test.tsx src/components/__tests__/visual-system.test.ts src/components/__tests__/header.test.tsx`

Expected: FAIL because the new homepage content, component split, placeholder, and header action do not exist.

---

### Task 2: Create Typed Homepage Content

**Files:**
- Create: `src/content/home.ts`

**Interfaces:**
- Consumes: Supported facts from `src/content/site.ts`, `src/content/projects.ts`, and `src/content/resume.ts`.
- Produces: Typed `heroSkills`, `homeMetrics`, `expertiseAreas`, `homeProjects`, `experienceHighlights`, and `contactRoleGroups` arrays for homepage server components.

- [ ] **Step 1: Define exact homepage types**

```ts
export type HomeMetric = { value: string; label: string };
export type ExpertiseArea = {
  title: string;
  description: string;
  capabilities: string[];
  iconName: "Gauge" | "Activity" | "Network" | "ServerCog";
};
export type HomeProject = {
  title: string;
  category: string;
  problem: string;
  contribution: string;
  evidence: string;
  stack: string[];
  href: string;
};
```

- [ ] **Step 2: Add approved hero and metric data**

```ts
export const heroSkills = [
  "Production ML",
  "Python & SQL",
  "Telemetry & Time Series",
  "Event & Anomaly Detection",
  "RAG & AI Agents",
  "FastAPI",
  "Docker & AWS",
  "FAISS & LightGBM",
];

export const homeMetrics: HomeMetric[] = [
  { value: "4+ years", label: "Production ML experience" },
  { value: "95%", label: "Alert accuracy maintained" },
  { value: "15%", label: "False-positive reduction" },
  { value: "30+ hrs/week", label: "Operational time reclaimed" },
];
```

- [ ] **Step 3: Add the four approved expertise areas**

Populate exact descriptions and supported capabilities from the specification for Production Machine Learning, Telemetry & Time-Series Analytics, RAG/LLMs/AI Agents, and ML APIs/Deployment.

- [ ] **Step 4: Add the three evidence-led project previews**

Use the exact problem, contribution, evidence, selected stack, and route text from the specification. Do not import or expose `Project.evidence` because it contains internal missing-asset language for two projects.

- [ ] **Step 5: Add supported experience highlights and role groups**

```ts
export const experienceHighlights = [
  "Maintained approximately 95% alert accuracy.",
  "Reduced false positives by approximately 15%.",
  "Reduced support queries from approximately six to two per day.",
];

export const contactRoleGroups = [
  "Machine Learning",
  "Applied AI",
  "Generative AI",
  "LLM & RAG",
  "NLP",
  "Data Science",
];
```

---

### Task 3: Build Hero and Profile Sections

**Files:**
- Create: `src/components/home/portrait-placeholder.tsx`
- Create: `src/components/home/home-hero.tsx`
- Create: `src/components/home/professional-snapshot.tsx`
- Create: `src/components/home/expertise-grid.tsx`

**Interfaces:**
- Consumes: `heroSkills`, `homeMetrics`, `expertiseAreas`, `site`, `StackPill`, and global design utilities.
- Produces: Server-rendered hero, stable portrait placeholder, proof metrics, professional snapshot, and core expertise sections.

- [ ] **Step 1: Build the accessible portrait placeholder**

Use a semantic role because there is no image asset:

```tsx
export function PortraitPlaceholder() {
  return (
    <div
      className="portrait-placeholder ..."
      role="img"
      aria-label="Professional portrait placeholder for Rahul Singh"
    >
      <span>Professional portrait</span>
      <span>4:5 crop · 1200 × 1500 recommended</span>
    </div>
  );
}
```

Reserve `aspect-[4/5]`, use Signal Grid geometry, and avoid fake `img` or `Image` paths.

- [ ] **Step 2: Build the copy-first HomeHero**

Render the exact approved eyebrow, one `h1`, two supporting paragraphs, selected skill list, primary `/projects` action, PDF download action with `download`, `/contact` text action, portrait placeholder, and the four metrics. Use `ArrowUpRight`, `Download`, and `Mail` only in this component.

- [ ] **Step 3: Build ProfessionalSnapshot**

Render the approved heading and two paragraphs in first person. Add a compact target-role panel without duplicating the entire `site.targetRoles` string in the hero.

- [ ] **Step 4: Build ExpertiseGrid**

Map `expertiseAreas` through a strict Lucide icon map:

```tsx
const iconMap: Record<ExpertiseArea["iconName"], LucideIcon> = {
  Gauge,
  Activity,
  Network,
  ServerCog,
};
```

Render one `h2` for `Core expertise`, four `article` elements, descriptions, and concise capability lists.

- [ ] **Step 5: Run homepage tests**

Run: `npm test -- --run src/components/__tests__/home-content.test.tsx`

Expected: Still FAIL on project, experience, resume, and contact sections; hero/profile assertions pass.

---

### Task 4: Build Evidence and Conversion Sections

**Files:**
- Create: `src/components/home/featured-projects.tsx`
- Create: `src/components/home/experience-preview.tsx`
- Create: `src/components/home/resume-callout.tsx`
- Create: `src/components/home/contact-cta.tsx`

**Interfaces:**
- Consumes: `homeProjects`, `experienceHighlights`, `contactRoleGroups`, `site`, `StackPill`, and global design utilities.
- Produces: Complete project, current-role, resume, and contact recruiter journey.

- [ ] **Step 1: Build FeaturedProjects**

Render the approved heading and three typed project cards. Each card must include visible `Problem`, `Contribution`, `Evidence`, selected stack pills, and a descriptive link to the existing detail route. Add `View All Projects` → `/projects` after the grid.

- [ ] **Step 2: Build ExperiencePreview**

Render `Production ML at Intangles`, exact role/period/location metadata, approved summary, `experienceHighlights`, selected domain pills, and `View Full Experience` → `/experience`.

- [ ] **Step 3: Build ResumeCallout**

Render the approved heading/copy with two explicit actions: `View Resume` → `/resume` and `Download PDF` → `/ML_Engineer_resume.pdf` with a download filename.

- [ ] **Step 4: Build ContactCta**

Render the approved heading/copy, contact role groups, primary `Contact Me` → `/contact`, email, LinkedIn, and GitHub. External links use `target="_blank" rel="noreferrer"` with visible external indicators.

- [ ] **Step 5: Run homepage test GREEN**

Run: `npm test -- --run src/components/__tests__/home-content.test.tsx`

Expected: PASS.

---

### Task 5: Compose Homepage and Scoped Shared Changes

**Files:**
- Modify: `src/components/home-sections.tsx`
- Modify: `src/components/header.tsx`
- Modify: `src/components/footer.tsx`
- Modify: `src/app/globals.css`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes: All new homepage section components, `site`, and Next.js static Metadata API.
- Produces: Final homepage composition, compact desktop resume action, expanded footer, portrait-specific styling, and homepage metadata.

- [ ] **Step 1: Reduce HomeSections to composition**

```tsx
export function HomeSections() {
  return (
    <main className="overflow-hidden">
      <HomeHero />
      <ProfessionalSnapshot />
      <ExpertiseGrid />
      <FeaturedProjects />
      <ExperiencePreview />
      <ResumeCallout />
      <ContactCta />
    </main>
  );
}
```

- [ ] **Step 2: Add compact header resume action**

Keep current desktop navigation and mobile menu unchanged. Add a desktop-only download link after navigation:

```tsx
<a className="btn-primary hidden lg:inline-flex" href={site.resume} download="Rahul-Singh-ML-Engineer-Resume.pdf">
  Download Resume
</a>
```

At medium desktop widths, retain the existing navigation without crowding; show the action from `lg` upward only.

- [ ] **Step 3: Expand footer content**

Add the label `Machine Learning Engineer · Production ML & Applied AI`, compact internal links to Experience, Projects, Resume, and Contact, plus external GitHub, LinkedIn, and email. Preserve the exact copyright sentence.

- [ ] **Step 4: Add portrait and section micro-styles**

Add `.portrait-placeholder` styles using `var(--card)`, `var(--border)`, `var(--primary)`, and `.technical-grid`-compatible patterns. Add a non-looping `.hero-enter` opacity/translate animation and stagger delay utilities only if they are disabled by the existing reduced-motion media query. Do not add JavaScript animation.

- [ ] **Step 5: Add homepage metadata**

```tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Rahul Singh — Machine Learning Engineer | Production ML & Applied AI",
  description: "Machine Learning Engineer with 4+ years of production experience building telemetry analytics, detection systems, RAG workflows, recommendation systems, and ML APIs.",
  openGraph: {
    title: "Rahul Singh — Machine Learning Engineer | Production ML & Applied AI",
    description: "Machine Learning Engineer with 4+ years of production experience building telemetry analytics, detection systems, RAG workflows, recommendation systems, and ML APIs.",
  },
};
```

Do not add canonical or image metadata without real production-domain/image assets.

- [ ] **Step 6: Run targeted shared tests**

Run: `npm test -- --run src/components/__tests__/home-content.test.tsx src/components/__tests__/visual-system.test.ts src/components/__tests__/header.test.tsx`

Expected: PASS.

---

### Task 6: Verify Production Quality

**Files:**
- Review: `src/app/page.tsx`
- Review: `src/components/home-sections.tsx`
- Review: `src/components/home/*.tsx`
- Review: `src/content/home.ts`
- Review: `src/components/header.tsx`
- Review: `src/components/footer.tsx`
- Review: `src/app/globals.css`

**Interfaces:**
- Consumes: Completed homepage redesign.
- Produces: Evidence for content, type safety, route integrity, accessibility basics, lint, build, and responsive review.

- [ ] **Step 1: Verify no unsupported or stale homepage content**

Run: `rg -n 'add final repository|add final|Earlier work|Currently strengthening|passionate|innovative|cutting-edge' src/components/home* src/components/home src/content/home.ts`

Expected: No matches.

- [ ] **Step 2: Run the complete test suite**

Run: `npm test -- --run`

Expected: All Vitest suites pass with zero failures.

- [ ] **Step 3: Run lint**

Run: `npm run lint`

Expected: ESLint exits with code 0 and no errors.

- [ ] **Step 4: Run the production build**

Run: `npm run build`

Expected: Next.js compiles, TypeScript passes, and all routes are statically generated.

- [ ] **Step 5: Verify homepage routes and assets**

Start the production server on an available port and request `/`, `/projects`, `/experience`, `/resume`, `/contact`, and `/ML_Engineer_resume.pdf`.

Expected: Every request returns HTTP 200.

- [ ] **Step 6: Review responsive behavior**

If a browser runtime is available, inspect approximately `390px`, `768px`, and `1440px`. Verify copy-first mobile hero, stable portrait ratio, full-width mobile actions, wrapping skills, no horizontal overflow, readable projects, visible focus, and compact desktop header.

If no browser runtime exists, record responsive visual inspection as the remaining limitation rather than claiming it was performed.

- [ ] **Step 7: Review final diff**

Run: `git diff --check && git status --short && git diff --stat`

Expected: No whitespace errors and only the approved homepage, scoped shared components, tests, specification, and plan appear.
