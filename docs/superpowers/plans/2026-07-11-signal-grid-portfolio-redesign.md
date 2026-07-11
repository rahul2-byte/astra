# Signal Grid Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Deliver a production-ready yellow, warm-white, and charcoal redesign across Rahul Singh's nine-page portfolio without changing its factual content, routes, metrics, or recruiter journey.

**Architecture:** Keep the existing App Router and content modules, centralize the new visual language in semantic CSS tokens and reusable utility classes, and upgrade existing page/component markup surgically. Limit client-side code to the accessible mobile navigation and existing Framer Motion case-study visualizations.

**Tech Stack:** Next.js 16.2.10 App Router, React 19.2.4, TypeScript 5, Tailwind CSS 4, CSS custom properties, `next/font`, Framer Motion 11, Lucide React, Vitest, Testing Library.

## Global Constraints

- Preserve all nine routes and all existing factual content, metrics, links, and downloadable resume behavior.
- Use only the approved warm-white, yellow, charcoal, and supporting neutral token system.
- Do not invent articles, project repositories, demos, achievements, certifications, or metrics.
- Respect `prefers-reduced-motion`, keyboard navigation, visible focus, readable contrast, and mobile-first layout.
- Read and follow the bundled Next.js 16 documentation for fonts, links, layouts, and client-component boundaries.
- Do not create commits unless the user explicitly requests them.

---

### Task 1: Lock the Visual Contract

**Files:**
- Modify: `src/components/__tests__/visual-system.test.ts`
- Modify: `src/components/__tests__/core-pages.test.tsx`
- Create: `src/components/__tests__/header.test.tsx`

**Interfaces:**
- Consumes: Existing rendered pages, filesystem-readable source files, `Header` component.
- Produces: Failing tests that require semantic Signal Grid tokens, no legacy accent colors, external indicators, intentional writing empty state, and accessible mobile navigation.

- [ ] **Step 1: Replace the old visual-system expectations**

Require the approved token names and typography while rejecting legacy colors:

```ts
expect(globals).toContain("--primary: #ffd43b");
expect(globals).toContain("--cta-background: #171711");
expect(globals).toContain("--font-mono");
expect(globals).toContain("prefers-reduced-motion");
expect(globals).toContain("@media print");
expect(allApplicationSource).not.toMatch(/#4f7fb8|#2f5ea4|bg-blue-|bg-emerald-/i);
```

- [ ] **Step 2: Add recruiter-page interaction expectations**

Extend `core-pages.test.tsx` with explicit empty-state and external-link assertions:

```tsx
expect(screen.getByText(/writing queue/i)).toBeInTheDocument();
expect(screen.getByRole("link", { name: /explore projects/i })).toHaveAttribute("href", "/projects");
expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute("target", "_blank");
expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute("rel", "noreferrer");
```

- [ ] **Step 3: Add mobile header behavior coverage**

Create `header.test.tsx` using `fireEvent`:

```tsx
import { fireEvent, render, screen } from "@testing-library/react";
import { Header } from "@/components/header";

it("opens and closes the mobile navigation", () => {
  render(<Header />);
  const trigger = screen.getByRole("button", { name: /open navigation/i });
  expect(trigger).toHaveAttribute("aria-expanded", "false");
  fireEvent.click(trigger);
  expect(screen.getByRole("button", { name: /close navigation/i })).toHaveAttribute("aria-expanded", "true");
  expect(screen.getByRole("navigation", { name: /mobile navigation/i })).toBeInTheDocument();
});
```

- [ ] **Step 4: Run the tests and confirm RED**

Run: `npm test -- src/components/__tests__/visual-system.test.ts src/components/__tests__/core-pages.test.tsx src/components/__tests__/header.test.tsx`

Expected: FAIL because the new tokens, mobile menu, external attributes, and writing empty state do not exist yet.

---

### Task 2: Build Global Theme and Shell

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: Approved token table and Next.js 16 `next/font` guidance.
- Produces: `--font-display`, `--font-body`, `--font-mono`, semantic color variables, shared surface/button/link/pill utilities, reduced-motion rules, and print behavior used by every page.

- [ ] **Step 1: Configure optimized fonts in the root layout**

Use CSS variables so all server components can consume the fonts:

```tsx
import { IBM_Plex_Mono, Space_Grotesk } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-space-grotesk",
});

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-ibm-plex-mono",
  weight: ["400", "500", "600"],
});
```

Apply both variables to `<html>`, remove inline background styles from `<body>`, and retain `Header`, page content, and `Footer` order.

- [ ] **Step 2: Replace legacy globals with semantic tokens**

Define the exact approved values:

```css
:root {
  --background: #fffdf5;
  --foreground: #171711;
  --muted: #68665e;
  --primary: #ffd43b;
  --primary-hover: #f2bc19;
  --primary-soft: #fff2b2;
  --border: #dedacd;
  --card: #fffef9;
  --surface-elevated: #f6f2e5;
  --cta-background: #171711;
  --cta-text: #fffdf5;
  --focus-ring: #b77a00;
  --grid-line: rgba(23, 23, 17, 0.065);
  --section-divider: #e7e2d4;
  --font-display: var(--font-space-grotesk);
  --font-body: var(--font-space-grotesk);
  --font-mono: var(--font-ibm-plex-mono);
}
```

- [ ] **Step 3: Define reusable visual primitives**

Create shared classes for `.technical-grid`, `.signal-glow`, `.surface-card`, `.surface-card-interactive`, `.status-badge`, `.stack-pill`, `.btn-primary`, `.btn-secondary`, `.text-link`, `.section-label`, `.section-shell`, and `.soft-divider`. Buttons must use `:focus-visible`, arrow transforms through child `.link-arrow`, and no hardcoded page colors.

- [ ] **Step 4: Add motion and print safeguards**

```css
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    scroll-behavior: auto !important;
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
}

@media print {
  .site-header, .site-footer, .no-print { display: none !important; }
  body { background: #fff !important; color: #000 !important; }
  .surface-card { box-shadow: none !important; break-inside: avoid; }
}
```

- [ ] **Step 5: Run the visual contract test**

Run: `npm test -- src/components/__tests__/visual-system.test.ts`

Expected: Still FAIL only on remaining component/page legacy colors; global token and motion assertions pass.

---

### Task 3: Upgrade Shared Navigation and Cards

**Files:**
- Modify: `src/components/header.tsx`
- Modify: `src/components/footer.tsx`
- Modify: `src/components/project-card.tsx`
- Modify: `src/components/case-study/stack-pill.tsx`

**Interfaces:**
- Consumes: `navItems`, `site`, and global `.btn-*`, `.text-link`, `.surface-card*`, `.stack-pill` utilities.
- Produces: Accessible responsive header, consistent footer external link, and reusable premium project/stack components.

- [ ] **Step 1: Convert Header into the mobile-navigation client boundary**

Add `"use client"`, local `open` state, and accessible controls:

```tsx
const [open, setOpen] = useState(false);

<button
  type="button"
  aria-expanded={open}
  aria-controls="mobile-navigation"
  aria-label={open ? "Close navigation" : "Open navigation"}
  onClick={() => setOpen((value) => !value)}
>
  {open ? <X /> : <Menu />}
</button>
```

Render the desktop navigation at `md` widths and a labeled `aria-label="Mobile navigation"` panel below it when open. Close the panel when any mobile route link is selected.

- [ ] **Step 2: Upgrade footer semantics and external links**

Add `site-footer`, use `.text-link`, and render GitHub with `target="_blank"`, `rel="noreferrer"`, and an `ArrowUpRight` icon. Preserve the exact copyright copy.

- [ ] **Step 3: Upgrade ProjectCard hierarchy**

Use `.surface-card-interactive`, a mono case-study label, `StackPill`, evidence divider, and a `.text-link` CTA with `ArrowUpRight`. Preserve `project.title`, `summary`, first six stack values, evidence, and `href`.

- [ ] **Step 4: Centralize StackPill styling**

Replace its inline Tailwind palette with:

```tsx
<span className="stack-pill">{children}</span>
```

- [ ] **Step 5: Verify header and shared component tests GREEN**

Run: `npm test -- src/components/__tests__/header.test.tsx src/components/__tests__/case-study-components.test.tsx src/components/__tests__/home-content.test.tsx`

Expected: PASS.

---

### Task 4: Redesign Home, Experience, and Projects

**Files:**
- Modify: `src/components/home-sections.tsx`
- Modify: `src/app/experience/page.tsx`
- Modify: `src/app/projects/page.tsx`

**Interfaces:**
- Consumes: Existing content arrays, upgraded `ProjectCard`, `StackPill`, semantic global utilities.
- Produces: Signal Grid home hero, premium timeline, and featured/supporting project index without content changes.

- [ ] **Step 1: Recompose the home hero**

Keep the existing two-column information architecture but add `.technical-grid`, `.signal-glow`, a compact hero index marker, stronger headline sizing, consistent buttons with `.link-arrow`, structured mini capability cards, and an opaque recruiter dossier. External GitHub and LinkedIn links receive `target="_blank"`, `rel="noreferrer"`, and `ArrowUpRight`.

- [ ] **Step 2: Restyle home proof and content sections**

Convert proof metrics to a charcoal band with yellow numeric markers, use alternating `.section-tone` surfaces, apply `.surface-card*` consistently, and retain all experience, featured project, skill, and earlier-work content.

- [ ] **Step 3: Rebuild experience timeline visuals**

Use a responsive grid where each entry has a mono sequence marker (`01`, `02`, `03`), a yellow timeline node, semantic period/category metadata, three structured detail panels, a soft-yellow outcome block, and `.text-link` case-study CTA. Keep the existing `entries` data unchanged.

- [ ] **Step 4: Upgrade the projects index**

Preserve its `1.15fr / 0.85fr` desktop composition, add featured sequence framing, metric preview accents, consistent feature bullets, upgraded stack pills, and animated arrows. Do not add GitHub or demo links.

- [ ] **Step 5: Run recruiter-page tests**

Run: `npm test -- src/components/__tests__/home-content.test.tsx src/components/__tests__/core-pages.test.tsx src/components/__tests__/case-studies.test.tsx`

Expected: Core content assertions pass; writing-specific expectations remain failing until Task 6.

---

### Task 5: Redesign Case Study System

**Files:**
- Modify: `src/components/case-study/case-study-page.tsx`
- Modify: `src/components/case-study/metric-tile.tsx`
- Modify: `src/components/case-study/architecture-flow.tsx`
- Modify: `src/components/case-study/comparison-bars.tsx`
- Modify: `src/components/case-study/trend-line.tsx`
- Modify: `src/components/case-study/evidence-table.tsx`

**Interfaces:**
- Consumes: Existing `CaseStudy` objects and current public component props.
- Produces: Restyled technical evidence system with unchanged component signatures and unchanged project data.

- [ ] **Step 1: Upgrade the case-study page frame**

Create a `.technical-grid` header panel with category, title, role, period, summary, and stack; retain the same problem/approach, architecture, results/evidence, and learnings order. Use section numbers and strong dividers without adding text claims.

- [ ] **Step 2: Restyle metric tiles without changing behavior**

Keep `useReducedMotion`, `whileInView`, and sparkline calculation. Replace blue SVG stroke with `var(--primary-hover)`, use `.surface-card`, a yellow icon tile, mono source label, and stronger value hierarchy.

- [ ] **Step 3: Restyle architecture flow**

Keep the node and connector generation logic. Replace glass panels and blue connectors with card surfaces, amber node indices, charcoal icons, yellow connector arrows, and a mobile horizontal-scroll containment strategy.

- [ ] **Step 4: Restyle results charts**

For `ComparisonBars`, use neutral gray for before and `var(--primary-hover)` for after; keep the same numerical widths and reduced-motion behavior. For `TrendLine`, use neutral grid lines, yellow fill/stroke, charcoal points, and unchanged axes/data calculations.

- [ ] **Step 5: Improve EvidenceTable readability**

Use elevated header cells, semantic borders, neutral alternating rows, minimum table width, and an overflow container with an accessible `tabIndex={0}` and descriptive label for keyboard users.

- [ ] **Step 6: Run component and page tests GREEN**

Run: `npm test -- src/components/__tests__/case-study-components.test.tsx src/components/__tests__/case-studies.test.tsx`

Expected: PASS with all metrics, nodes, chart points, table headings, and project content preserved.

---

### Task 6: Polish Resume, Contact, and Writing

**Files:**
- Modify: `src/app/resume/page.tsx`
- Modify: `src/app/contact/page.tsx`
- Modify: `src/app/writing/page.tsx`
- Delete: `public/resume.pdf`

**Interfaces:**
- Consumes: Existing resume content modules, `site` contact fields, global utilities.
- Produces: Print-friendly resume, consistent contact actions, honest writing empty state, and one canonical deployed resume PDF.

- [ ] **Step 1: Upgrade resume readability**

Keep all content maps unchanged. Rework the header into a structured identity/contact grid, add external attributes and indicators for LinkedIn/GitHub, use `.btn-primary` for the download, convert sections to restrained bordered blocks, and apply mono metadata labels. Avoid reveal animation and interactive card lift.

- [ ] **Step 2: Upgrade contact cards and CTA**

Keep the exact four contact methods. Add a short factual supporting sentence, distinguish external methods using `ArrowUpRight`, add `target="_blank" rel="noreferrer"` only to LinkedIn/GitHub, and remove the hardcoded blue CTA classes so the resume link uses `.btn-primary`.

- [ ] **Step 3: Build the intentional writing empty state**

Render the existing title and coming-soon sentence plus a clearly labeled `Writing queue` containing only category labels: `Production ML`, `RAG systems`, and `Recommenders`. Add `Explore projects` and `Contact Rahul` links; do not add article-like titles, dates, or summaries.

- [ ] **Step 4: Remove only the unused public duplicate**

Verify first:

Run: `rg -n '/resume\.pdf|resume\.pdf' src public README.md`

Expected: No application reference to `public/resume.pdf`.

Then delete `public/resume.pdf`, retaining `public/ML_Engineer_resume.pdf` and the existing `site.resume` value.

- [ ] **Step 5: Run recruiter utility-page tests GREEN**

Run: `npm test -- src/components/__tests__/core-pages.test.tsx src/components/__tests__/visual-system.test.ts`

Expected: PASS.

---

### Task 7: Verify Production Quality

**Files:**
- Review: `src/**/*.{tsx,css,ts}`
- Review: `public/ML_Engineer_resume.pdf`

**Interfaces:**
- Consumes: Completed redesign.
- Produces: Evidence that tests, lint, build, route preservation, and legacy-color cleanup pass.

- [ ] **Step 1: Scan for visual regressions and forbidden leftovers**

Run: `rg -n '#4f7fb8|#2f5ea4|bg-blue-|bg-emerald-|glass-panel|rgba\(79,\s*127,\s*184' src`

Expected: No matches.

- [ ] **Step 2: Run the full test suite**

Run: `npm test -- --run`

Expected: All Vitest suites pass with zero failures.

- [ ] **Step 3: Run lint**

Run: `npm run lint`

Expected: ESLint exits with code 0 and no errors.

- [ ] **Step 4: Run the production build**

Run: `npm run build`

Expected: Next.js production compilation succeeds and all nine routes are generated without TypeScript or rendering errors.

- [ ] **Step 5: Perform route-level browser review**

Run: `npm run dev`

Inspect `/`, `/experience`, `/projects`, `/resume`, `/contact`, `/writing`, and all three `/projects/*` routes at approximately `390px`, `768px`, and `1440px` widths. Verify no horizontal page overflow, mobile menu operation, external indicators, focus visibility, reduced-motion behavior, table/architecture overflow containment, resume print preview, and consistent theme usage.

- [ ] **Step 6: Review the final diff**

Run: `git diff --check && git status --short && git diff --stat`

Expected: No whitespace errors; only the scoped design, tests, specification, plan, and duplicate-PDF cleanup appear.
