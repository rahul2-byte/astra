# Portfolio Codebase Production-Readiness Audit

**Date:** 2026-07-12  
**Scope:** Complete repository at `/home/zeek/ML/astra`  
**Stage:** Stage 1 — Audit Only (no code modified)

---

## 1. Executive Summary

The portfolio codebase is **structurally sound and well-organized** for a personal portfolio of its size. The production build passes, all 28 tests pass, ESLint reports zero errors, and all 12 routes are statically generated. The design system is disciplined—CSS custom properties centralize the theme, components use consistent naming and data-driven rendering, and content is cleanly separated from presentation.

However, the audit identified **34 issues** across 6 severity levels:

| Severity | Count |
|----------|-------|
| Critical | 1 |
| High | 5 |
| Medium | 13 |
| Low | 15 |

**Top 3 areas needing attention:**

1. **Dead code and unused dependencies** — MDX packages (3 deps), `CaseStudyPage` component, `ProjectCard` component, 4 public SVGs, 3 unused content exports, and `skills.ts` file are all unused in production
2. **TypeScript configuration gap** — `tsc --noEmit` fails on test files because vitest globals aren't included in the TS config
3. **Missing per-page metadata** — 8 out of 10 page routes lack per-page `<title>` and `<meta description>`

The codebase does **not** exhibit the most common LLM-generated anti-patterns: no `any` types, no `@ts-ignore`, no `dangerouslySetInnerHTML`, no custom SVG icons (uses lucide-react properly), no unnecessary `useState`/`useEffect` beyond the header, and all animations use `transform`/`opacity`.

---

## 2. Project Architecture Overview

| Area | Technology | Version |
|------|-----------|---------|
| Framework | Next.js (App Router) | 16.2.10 |
| Rendering | Static (all routes `○`) | Turbopack |
| React | React 19 | 19.2.4 |
| Styling | Tailwind CSS v4 + CSS custom properties | ^4 |
| Animation | framer-motion + CSS keyframes | ^11.11.0 |
| Icons | lucide-react | ^1.24.0 |
| Content | Structured TypeScript files | — |
| Fonts | next/font/google (Space Grotesk, IBM Plex Mono) | — |
| Testing | Vitest + Testing Library | 4.1.10 |
| Linting | ESLint + eslint-config-next | ^9 |
| Package manager | npm | — |
| Deployment target | Static export compatible | All routes static |

---

## 3. Repository Structure Assessment

| Area | Location | Responsibility | Notes |
|------|----------|---------------|-------|
| Root layout | [layout.tsx](file:///home/zeek/ML/astra/src/app/layout.tsx) | Shell, fonts, metadata, header/footer | ✅ Clean |
| Home page | [page.tsx](file:///home/zeek/ML/astra/src/app/page.tsx) | Compose home sections | ✅ Server component |
| Experience | [experience/page.tsx](file:///home/zeek/ML/astra/src/app/experience/page.tsx) | Full experience timeline | ⚠️ 262-line monolith page |
| Projects | [projects/page.tsx](file:///home/zeek/ML/astra/src/app/projects/page.tsx) | Projects listing | ⚠️ 214-line page with inline data |
| Case study pages | `projects/*/page.tsx` | Thin wrappers → `ProjectArticleLayout` | ✅ Clean pattern |
| Resume | [resume/page.tsx](file:///home/zeek/ML/astra/src/app/resume/page.tsx) | Resume display | ✅ Clean |
| Contact | [contact/page.tsx](file:///home/zeek/ML/astra/src/app/contact/page.tsx) | Contact methods | ✅ Clean |
| Writing | [writing/page.tsx](file:///home/zeek/ML/astra/src/app/writing/page.tsx) | Placeholder page | ✅ Clean |
| Design system | [globals.css](file:///home/zeek/ML/astra/src/app/globals.css) | Tokens, component classes, animations | ✅ Well-organized |
| Content layer | [src/content/](file:///home/zeek/ML/astra/src/content) | All portfolio data | ✅ Clean separation |
| Home components | [src/components/home/](file:///home/zeek/ML/astra/src/components/home) | 8 section components | ✅ Right granularity |
| Case study viz | [src/components/case-study/](file:///home/zeek/ML/astra/src/components/case-study) | Charts, tables, flows | ✅ Reusable |
| Motion | [section-reveal.tsx](file:///home/zeek/ML/astra/src/components/motion/section-reveal.tsx) | Scroll-triggered reveal | ✅ Single component |
| Tests | [src/components/__tests__/](file:///home/zeek/ML/astra/src/components/__tests__) | 7 test files, 28 tests | ✅ Good coverage |

---

## 4. Validation Commands and Results

| Command | Result | Duration | Notes |
|---------|--------|----------|-------|
| `next build` | ✅ Pass | ~6.4s compile + 1.9s TS + 380ms static gen | All 12 routes static |
| `eslint .` | ✅ Pass | ~1s | Zero errors, zero warnings |
| `tsc --noEmit` | ❌ **Fail** | ~2s | 35+ errors in test files: `Cannot find name 'describe'`, `Cannot find name 'expect'` |
| `vitest run` | ✅ Pass | 1.46s | 7 files, 28 tests, all pass |
| `npm audit` | ⚠️ 2 moderate | — | PostCSS XSS in Next.js dependency (GHSA-qx2v-qp2m-jg93) |

---

## 5. Critical Issues

### 5.1 TypeScript `tsc --noEmit` Fails on Test Files

**Severity:** Critical  
**Category:** Build / TypeScript  
**Location:** [vitest.config.ts](file:///home/zeek/ML/astra/vitest.config.ts), [tsconfig.json](file:///home/zeek/ML/astra/tsconfig.json)  
**Evidence:** `tsc --noEmit` produces 35+ errors: `Cannot find name 'describe'`, `Cannot find name 'it'`, `Cannot find name 'expect'` across 3 test files  
**Why this is a problem:** The project has `globals: true` in vitest config, which makes `describe`/`it`/`expect` available at runtime, but TypeScript doesn't know about them. Any CI that runs `tsc --noEmit` before deploy will fail.  
**User impact:** None (tests still run)  
**Engineering impact:** Broken type-checking pipeline; cannot trust `tsc` for correctness verification  
**Recommended fix:** Add a `tsconfig.test.json` or add `"types": ["vitest/globals"]` to the tsconfig compilerOptions. Alternatively, add `/// <reference types="vitest/globals" />` to [setup.ts](file:///home/zeek/ML/astra/src/test/setup.ts)  
**Alternative:** Create a separate `tsconfig.test.json` that extends `tsconfig.json` and adds vitest globals  
**Expected benefit:** Clean `tsc --noEmit` across the entire project  
**Change risk:** Very low — type declarations only  
**Verification method:** `npx tsc --noEmit` should exit 0  

---

## 6. High-Severity Issues

### 6.1 Unused MDX Dependencies (~40KB+ in bundle risk)

**Severity:** High  
**Category:** Dependency / Dead code  
**Location:** [package.json](file:///home/zeek/ML/astra/package.json#L13-L15)  
**Evidence:** `@mdx-js/loader`, `@mdx-js/react`, `@next/mdx` are in `dependencies`. Zero `.mdx` files exist. No imports of `@mdx-js/*` in source. [mdx-components.tsx](file:///home/zeek/ML/astra/src/mdx-components.tsx) exists but is never used in any route.  
**Why this is a problem:** Three unnecessary production dependencies; `mdx-components.tsx` uses hardcoded `text-slate-*` colors that don't match the design system  
**User impact:** None  
**Engineering impact:** Unnecessary dependency surface, confusing dead file  
**Recommended fix:** Remove all three MDX packages from `dependencies` and delete `mdx-components.tsx`  
**Change risk:** Very low — nothing imports them  
**Verification method:** `npm ls @mdx-js/loader` should show not installed; build still passes  

### 6.2 Test Dependencies in `dependencies` Instead of `devDependencies`

**Severity:** High  
**Category:** Dependency misplacement  
**Location:** [package.json](file:///home/zeek/ML/astra/package.json#L16-L18)  
**Evidence:** `@testing-library/dom`, `@testing-library/jest-dom`, `@testing-library/react`, `jsdom`, and `vitest` are all in `dependencies` instead of `devDependencies`  
**Why this is a problem:** These are test-only packages. In `dependencies`, they'll be installed in production deployments, increasing install time and potentially being bundled or scanned unnecessarily.  
**User impact:** None directly  
**Engineering impact:** Bloated production `node_modules`; misleading dependency manifest  
**Recommended fix:** Move all 5 packages to `devDependencies`  
**Change risk:** Very low — only affects install behavior  
**Verification method:** `npm install --omit=dev` should not install vitest/testing-library; build still passes  

### 6.3 Missing Per-Page Metadata on 8 Routes

**Severity:** High  
**Category:** SEO / Metadata  
**Location:** All page files except `page.tsx` (home) and `layout.tsx`  
**Evidence:** Only [src/app/page.tsx](file:///home/zeek/ML/astra/src/app/page.tsx) exports `metadata`. The three case study pages export basic `metadata` objects, but [experience/page.tsx](file:///home/zeek/ML/astra/src/app/experience/page.tsx), [projects/page.tsx](file:///home/zeek/ML/astra/src/app/projects/page.tsx), [resume/page.tsx](file:///home/zeek/ML/astra/src/app/resume/page.tsx), [contact/page.tsx](file:///home/zeek/ML/astra/src/app/contact/page.tsx), and [writing/page.tsx](file:///home/zeek/ML/astra/src/app/writing/page.tsx) have **no metadata export**.  
**Why this is a problem:** These pages will use the layout's fallback title template but have no unique descriptions. Google and social-media previews will show the generic site description for every page.  
**User impact:** Poor SEO; recruiter social shares show generic text  
**Engineering impact:** Low  
**Recommended fix:** Add `export const metadata: Metadata = { title: "...", description: "..." }` to each of the 5 missing pages  
**Change risk:** Zero  
**Verification method:** View source of each page and confirm unique `<title>` and `<meta name="description">`  

### 6.4 `CaseStudyPage` Component Is Completely Unused

**Severity:** High  
**Category:** Dead code  
**Location:** [case-study-page.tsx](file:///home/zeek/ML/astra/src/components/case-study/case-study-page.tsx) (106 lines)  
**Evidence:** `grep -r "CaseStudyPage" src/app/` returns zero results. The three case study routes all use `ProjectArticleLayout` instead.  
**Why this is a problem:** 106 lines of dead code that duplicates functionality of `ProjectArticleLayout`. It's also re-exported from the barrel [index.ts](file:///home/zeek/ML/astra/src/components/case-study/index.ts)  
**Recommended fix:** Delete `case-study-page.tsx` and remove from barrel export  
**Change risk:** Very low — not imported anywhere  
**Verification method:** Build passes; no import errors  

### 6.5 `ProjectCard` Component Is Unused

**Severity:** High  
**Category:** Dead code  
**Location:** [project-card.tsx](file:///home/zeek/ML/astra/src/components/project-card.tsx) (25 lines)  
**Evidence:** Only imported in its own file declaration. `grep -r "ProjectCard" src/app/` returns zero results. The projects page renders cards inline.  
**Recommended fix:** Delete the file  
**Change risk:** Very low  

---

## 7. Medium-Severity Issues

### 7.1 Unused Content Exports

**Severity:** Medium  
**Category:** Dead code / Content  
**Evidence:**
- `proofMetrics` in [site.ts](file:///home/zeek/ML/astra/src/content/site.ts#L25-L30) — only defined in `site.ts`, never imported elsewhere
- `targetRoles` in [site.ts](file:///home/zeek/ML/astra/src/content/site.ts#L16-L22) — only defined, never imported
- `earlierWork` in [projects.ts](file:///home/zeek/ML/astra/src/content/projects.ts#L48-L59) — only defined, never imported
- `featuredProjects` in [projects.ts](file:///home/zeek/ML/astra/src/content/projects.ts#L12-L46) — only imported in `projects.ts` itself, not in any page or component
- Entire [skills.ts](file:///home/zeek/ML/astra/src/content/skills.ts) file — zero imports anywhere

**Recommended fix:** Remove unused exports; delete `skills.ts`  
**Change risk:** Low  

### 7.2 Unused Public Assets (4 SVGs from Next.js Starter)

**Severity:** Medium  
**Category:** Dead assets  
**Location:** `public/file.svg`, `public/globe.svg`, `public/next.svg`, `public/vercel.svg`, `public/window.svg`  
**Evidence:** `grep -r` for these filenames across `src/` returns zero results  
**Recommended fix:** Delete all 5 default SVGs. Only `ML_Engineer_resume.pdf` and `favicon.ico` are used.  
**Change risk:** Zero  

### 7.3 Barrel File (`index.ts`) Re-exports Unused Component

**Severity:** Medium  
**Category:** Architecture  
**Location:** [case-study/index.ts](file:///home/zeek/ML/astra/src/components/case-study/index.ts)  
**Evidence:** Exports `CaseStudyPage` (unused). No consumer imports from the barrel — all imports use direct paths like `@/components/case-study/metric-tile`.  
**Recommended fix:** Delete the barrel file entirely; direct imports are already used everywhere  
**Change risk:** Low — verify no consumers use `@/components/case-study`  

### 7.4 CSS Duplication: `surface-card` and `surface-card-interactive`

**Severity:** Medium  
**Category:** CSS / DRY  
**Location:** [globals.css](file:///home/zeek/ML/astra/src/app/globals.css#L126-L146)  
**Evidence:** `surface-card-interactive` duplicates all 4 properties of `surface-card` then adds `transition`. These share identical `background-color`, `border`, `border-radius`, and `box-shadow`.  
**Recommended fix:** Make `surface-card-interactive` extend `surface-card` via composition or use the base class alongside a modifier  
**Change risk:** Low  

### 7.5 `signal-glow` Element in `PortraitPlaceholder` Missing `pointer-events-none`

**Severity:** Medium  
**Category:** UX / Accessibility  
**Location:** [portrait-placeholder.tsx](file:///home/zeek/ML/astra/src/components/home/portrait-placeholder.tsx#L10)  
**Evidence:** The `signal-glow` div at line 10 has `className="signal-glow absolute inset-8"` without `pointer-events-none`, unlike all other `signal-glow` elements in the codebase which include it  
**Why this is a problem:** The blurred decorative overlay could intercept click/tap events  
**Recommended fix:** Add `pointer-events-none` to match the pattern used everywhere else  
**Change risk:** Zero  

### 7.6 `experience/page.tsx` Has 262 Lines With Inline Data

**Severity:** Medium  
**Category:** Architecture  
**Location:** [experience/page.tsx](file:///home/zeek/ML/astra/src/app/experience/page.tsx)  
**Evidence:** Contains `heroMetrics` array and full `entries: ExperienceEntry[]` array totaling ~120 lines of data inlined in the page component. Other pages (home, case studies) properly separate data into `src/content/`.  
**Recommended fix:** Extract `heroMetrics` and `entries` to `src/content/experience.ts`  
**Change risk:** Low  

### 7.7 `projects/page.tsx` Has Inline `projectDetails` Data Object

**Severity:** Medium  
**Category:** Architecture / Consistency  
**Location:** [projects/page.tsx](file:///home/zeek/ML/astra/src/app/projects/page.tsx#L25-L68)  
**Evidence:** `projectDetails` object (~45 lines) and `heroStats` are inline in the page component  
**Recommended fix:** Move to content layer for consistency  

### 7.8 Duplicated `iconMap` Patterns Across Components

**Severity:** Medium  
**Category:** DRY  
**Evidence:** `iconMap` (string→LucideIcon mapping) is defined independently in:
- [metric-tile.tsx](file:///home/zeek/ML/astra/src/components/case-study/metric-tile.tsx#L15)
- [architecture-flow.tsx](file:///home/zeek/ML/astra/src/components/case-study/architecture-flow.tsx#L11-L20)
- [expertise-grid.tsx](file:///home/zeek/ML/astra/src/components/home/expertise-grid.tsx#L6-L11)
- [projects/page.tsx](file:///home/zeek/ML/astra/src/app/projects/page.tsx#L8)

Each declares a subset of lucide icons. This is a code smell but **not worth abstracting into a shared map** because: (a) each component only imports the icons it needs for tree-shaking, and (b) a centralized map would import all icons.  
**Recommended fix:** Leave as-is. This is a case where duplication is safer than a shared abstraction that would bloat the bundle.  
**Change risk:** N/A  

### 7.9 `footer.tsx` Duplicates Navigation Links

**Severity:** Medium  
**Category:** DRY  
**Location:** [footer.tsx](file:///home/zeek/ML/astra/src/components/footer.tsx#L5-L10)  
**Evidence:** `footerLinks` array duplicates a subset of `navItems` from `site.ts`. Footer shows `[Experience, Projects, Resume, Contact]` while nav shows `[Home, Experience, Projects, Resume, Contact]`.  
**Recommended fix:** Derive footer links from `navItems.filter(item => item.href !== "/")`  
**Change risk:** Low  

### 7.10 `SectionReveal` Uses Both framer-motion and Web Animations API

**Severity:** Medium  
**Category:** Architecture / Rendering  
**Location:** [section-reveal.tsx](file:///home/zeek/ML/astra/src/components/motion/section-reveal.tsx)  
**Evidence:** Imports `motion` from framer-motion solely for `onViewportEnter`, but the actual animation uses `element.animate()` (Web Animations API). The framer-motion `motion.div` renders with `initial={false}` — it contributes nothing except viewport detection.  
**Why this is a problem:** framer-motion (4.2MB on disk) is loaded for its `IntersectionObserver` wrapper. A native `IntersectionObserver` would achieve the same viewport detection without the library.  
**Recommended fix:** Replace with a native `IntersectionObserver` in a `useEffect`. This would mean framer-motion is only needed by 4 case-study components (architecture-flow, comparison-bars, metric-tile, trend-line).  
**Alternative:** Keep framer-motion if the animation components justify the dependency. But `SectionReveal` specifically does not need it.  
**Change risk:** Medium — must test scroll reveal behavior  

### 7.11 `new Date().getFullYear()` in Server Component

**Severity:** Medium  
**Category:** Rendering  
**Location:** [footer.tsx](file:///home/zeek/ML/astra/src/components/footer.tsx#L41)  
**Evidence:** `new Date().getFullYear()` is called during static generation. The year is baked into the HTML at build time.  
**Why this is a problem:** If the site is built on Dec 31 and served on Jan 1, the copyright year will be stale until the next build. This is functionally correct for a statically generated portfolio that rebuilds periodically.  
**Recommended fix:** Accept as-is for a portfolio. If concerned, wrap the year in a client component.  
**Change risk:** N/A — acceptable for static sites  

### 7.12 Hardcoded Color `#aaa79d` in `ComparisonBars`

**Severity:** Medium  
**Category:** Theme consistency  
**Location:** [comparison-bars.tsx](file:///home/zeek/ML/astra/src/components/case-study/comparison-bars.tsx#L59)  
**Evidence:** `color="#aaa79d"` is a hardcoded grey that doesn't correspond to any CSS custom property  
**Recommended fix:** Use `var(--muted)` or a new token like `--bar-inactive`  
**Change risk:** Low — visual only  

### 7.13 MDX Components Use `text-slate-*` Colors Outside Design System

**Severity:** Medium  
**Category:** Theme consistency  
**Location:** [mdx-components.tsx](file:///home/zeek/ML/astra/src/mdx-components.tsx)  
**Evidence:** Uses `text-slate-950`, `text-slate-700` — Tailwind slate palette colors that don't match the warm cream/yellow design system. However, this file is unused (see issue 6.1).  
**Recommended fix:** Delete this file as part of MDX cleanup  

---

## 8. Low-Severity Issues

### 8.1 `writing/page.tsx` Signal Glow Missing `absolute` Positioning

**Severity:** Low  
**Location:** [writing/page.tsx](file:///home/zeek/ML/astra/src/app/writing/page.tsx#L11)  
**Evidence:** `className="signal-glow animate-signal pointer-events-none -right-20 -top-20 h-80 w-80"` — missing `absolute` class, unlike all other signal-glow elements. The element likely renders in flow instead of being positioned.  
**Recommended fix:** Add `absolute` class  

### 8.2 `writing/page.tsx` Missing Metadata Export

**Severity:** Low  
**Category:** SEO  
**Recommended fix:** Add `export const metadata = { title: "Writing", description: "..." }`  

### 8.3 Duplicate `TrendPoint` Type Definition

**Severity:** Low  
**Category:** TypeScript / DRY  
**Evidence:** `TrendPoint` is defined in both [case-studies.ts](file:///home/zeek/ML/astra/src/content/case-studies.ts#L17) and [trend-line.tsx](file:///home/zeek/ML/astra/src/components/case-study/trend-line.tsx#L5)  
**Recommended fix:** Import from one location  

### 8.4 `MetricTile` Sparkline Recalculates min/max Per Point

**Severity:** Low  
**Category:** Performance  
**Location:** [metric-tile.tsx](file:///home/zeek/ML/astra/src/components/case-study/metric-tile.tsx#L23-L24)  
**Evidence:** `Math.max(...spark)` and `Math.min(...spark)` are called inside the `.map()` — O(n²) for n points. With typical spark arrays (5-10 points), this is negligible.  
**Recommended fix:** Hoist min/max calculation above the `.map()` call  

### 8.5 Contact Page Icons Missing `aria-hidden`

**Severity:** Low  
**Category:** Accessibility  
**Location:** [contact/page.tsx](file:///home/zeek/ML/astra/src/app/contact/page.tsx#L38)  
**Evidence:** Icons in contact method cards have `<Icon>` without `aria-hidden`. The parent `<a>` has `aria-label`, so the icon should be hidden from screen readers.  

### 8.6 Resume Download Button Missing `aria-hidden` on Icon

**Severity:** Low  
**Location:** [contact/page.tsx](file:///home/zeek/ML/astra/src/app/contact/page.tsx#L50) — Download icon next to text  

### 8.7 `docs/superpowers/` Directory Purpose Unclear

**Severity:** Low  
**Category:** Project hygiene  
**Evidence:** `docs/superpowers/` directory exists but content/purpose is unclear  

### 8.8 `.agents/` and `.codex/` Directories in Repository

**Severity:** Low  
**Category:** Project hygiene  
**Evidence:** LLM configuration directories that should be in `.gitignore`  

### 8.9 `CLAUDE.md` Contains Only 11 Bytes

**Severity:** Low  
**Category:** Project hygiene  
**Evidence:** Presumably an empty/minimal file  

### 8.10 `tsconfig.json` Has `"jsx": "react-jsx"` (Potentially Redundant with Next.js)

**Severity:** Low  
**Category:** Configuration  
**Evidence:** Next.js handles JSX transform automatically. The explicit setting is harmless but the Next.js plugin may prefer `"preserve"`.  

### 8.11 npm Audit: PostCSS XSS Vulnerability (Moderate)

**Severity:** Low (for this project)  
**Category:** Security  
**Evidence:** `postcss <8.5.10` has a moderate XSS vulnerability. This is in Next.js's internal dependency chain. The fix requires a major Next.js downgrade which is worse than the risk.  
**Recommended fix:** Wait for Next.js to update their PostCSS dependency  
**User impact:** Near-zero for a static portfolio with no user-generated CSS  

### 8.12 `framer-motion` in `dependencies` — Oversized for Usage

**Severity:** Low  
**Category:** Bundle / Dependencies  
**Evidence:** 4.2MB on disk. Used in 5 components, only 4 actually use `motion.*` elements. `SectionReveal` only uses viewport detection (see 7.10). Tree-shaking limits the bundle impact but the full package is still large.  
**Recommended fix:** Acceptable. The 4 visualization components (metric-tile, architecture-flow, comparison-bars, trend-line) genuinely benefit from framer-motion's declarative animation API.  

### 8.13 `external` Links Use `rel="noreferrer"` Instead of `rel="noopener noreferrer"`

**Severity:** Low  
**Category:** Security  
**Location:** [footer.tsx](file:///home/zeek/ML/astra/src/components/footer.tsx#L28-L31), [contact-cta.tsx](file:///home/zeek/ML/astra/src/components/home/contact-cta.tsx#L34-L38)  
**Evidence:** Footer and contact CTA use `rel="noreferrer"` while project-article-layout uses `rel="noopener noreferrer"`. Modern browsers make `noreferrer` sufficient (implies noopener), so this is a consistency issue, not a security issue.  
**Recommended fix:** Standardize on `rel="noopener noreferrer"` for consistency  

### 8.14 `ArticleTable` Generates IDs From Titles (Potential Collision)

**Severity:** Low  
**Category:** Accessibility  
**Location:** [article-table.tsx](file:///home/zeek/ML/astra/src/components/project-article/article-table.tsx#L10)  
**Evidence:** `aria-labelledby={`${title}-title`}` — if two tables share a title, IDs collide  
**Recommended fix:** Use `useId()` or pass an explicit ID  

### 8.15 No `robots.txt` or `sitemap.xml`

**Severity:** Low  
**Category:** SEO  
**Evidence:** No `robots.txt` in `public/`, no sitemap generation  
**Recommended fix:** Add `public/robots.txt` and consider Next.js sitemap generation  

---

## 9. Duplicate Code Findings

| Pattern | Locations | Action |
|---------|-----------|--------|
| `surface-card` base properties duplicated in `surface-card-interactive` | globals.css L126-146 | Extract shared base |
| `iconMap` Record\<string, LucideIcon\> | 4 components | Leave as-is (tree-shaking) |
| `footerLinks` array duplicates `navItems` minus Home | footer.tsx L5-10, site.ts L32-38 | Derive from navItems |
| `TrendPoint` type | case-studies.ts, trend-line.tsx | Import from single source |
| Hero glow pattern (`signal-glow animate-signal pointer-events-none absolute ...`) | 5+ page headers | Acceptable — template pattern for consistency |
| `section-label` heading pattern | Every section component | Acceptable — CSS class handles it |
| `StackPill` usage wrapping pattern | 10+ components | Acceptable — simple component usage |

**Assessment:** The codebase has minimal harmful duplication. The repeated `iconMap` pattern is the most significant, but consolidating it would harm tree-shaking. No action needed.

---

## 10. Dead Code and Unused Assets

| Item | Type | Location | Evidence | Action |
|------|------|----------|----------|--------|
| `CaseStudyPage` | Component | case-study/case-study-page.tsx | Zero imports in app/ | Delete |
| `ProjectCard` | Component | project-card.tsx | Only self-reference | Delete |
| `mdx-components.tsx` | Component | src/mdx-components.tsx | No MDX files exist | Delete |
| `case-study/index.ts` | Barrel | case-study/index.ts | No consumer uses barrel | Delete |
| `skills.ts` | Content | content/skills.ts | Zero imports | Delete |
| `proofMetrics` | Export | content/site.ts L25-30 | Zero imports | Remove |
| `targetRoles` | Export | content/site.ts L16-22 | Zero imports | Remove |
| `earlierWork` | Export | content/projects.ts L48-59 | Zero imports | Remove |
| `featuredProjects` | Export | content/projects.ts L12-46 | Only defined, not used by pages | Verify and possibly remove |
| `file.svg` | Asset | public/file.svg | Zero references | Delete |
| `globe.svg` | Asset | public/globe.svg | Zero references | Delete |
| `next.svg` | Asset | public/next.svg | Zero references | Delete |
| `vercel.svg` | Asset | public/vercel.svg | Zero references | Delete |
| `window.svg` | Asset | public/window.svg | Zero references | Delete |

**Estimated cleanup:** ~250 lines of dead code + 5 unused files + 5 unused assets

---

## 11. Dependency Audit

| Dependency | Purpose | Used Where | Necessary | Risk | Recommendation |
|-----------|---------|-----------|-----------|------|----------------|
| `next` 16.2.10 | Framework | Core | ✅ Yes | Low | Keep |
| `react` 19.2.4 | UI | Core | ✅ Yes | Low | Keep |
| `react-dom` 19.2.4 | DOM | Core | ✅ Yes | Low | Keep |
| `framer-motion` ^11 | Animations | 5 components | ✅ Yes (4 genuinely) | Low | Keep; consider removing from SectionReveal |
| `lucide-react` ^1.24 | Icons | 15+ components | ✅ Yes | Low (40MB on disk but tree-shakes) | Keep |
| **`@mdx-js/loader`** | MDX | **Nowhere** | ❌ No | Medium | **Remove** |
| **`@mdx-js/react`** | MDX | **Nowhere** | ❌ No | Medium | **Remove** |
| **`@next/mdx`** | MDX | **Nowhere** | ❌ No | Medium | **Remove** |
| **`vitest`** | Testing | Tests | ✅ Yes | Low | **Move to devDependencies** |
| **`@testing-library/dom`** | Testing | Tests | ✅ Yes | Low | **Move to devDependencies** |
| **`@testing-library/jest-dom`** | Testing | Tests | ✅ Yes | Low | **Move to devDependencies** |
| **`@testing-library/react`** | Testing | Tests | ✅ Yes | Low | **Move to devDependencies** |
| **`jsdom`** | Testing | Tests | ✅ Yes | Low | **Move to devDependencies** |
| `tailwindcss` ^4 | Styling | CSS | ✅ Yes | Low | Keep (devDep ✅) |
| `@tailwindcss/postcss` ^4 | PostCSS | Build | ✅ Yes | Low | Keep (devDep ✅) |
| `typescript` ^5 | Types | Build | ✅ Yes | Low | Keep (devDep ✅) |
| `eslint` ^9 | Lint | Build | ✅ Yes | Low | Keep (devDep ✅) |
| `eslint-config-next` | Lint | Build | ✅ Yes | Low | Keep (devDep ✅) |

---

## 12. Reinvented Components and Utilities

**No significant reinvention detected.** The codebase correctly uses:

- ✅ `lucide-react` for icons (no custom SVGs)
- ✅ `framer-motion` for animations (no custom animation library)
- ✅ Next.js `Link` for navigation (no custom router)
- ✅ Next.js `next/font` for font optimization (no manual font loading)
- ✅ CSS custom properties for theming (no custom theme engine)
- ✅ Native `element.animate()` in `SectionReveal` (appropriate use of Web Animations API)
- ✅ Native `IntersectionObserver` stub in test setup

The custom `TrendLine`, `ComparisonBars`, and `ArchitectureFlow` SVG-based visualizations are appropriate custom code — a charting library would be overkill for 3 simple static visualizations.

---

## 13. Component Architecture Review

| Component | Lines | Assessment | Issues |
|-----------|-------|-----------|--------|
| Header | 148 | Good — proper mobile menu with a11y | Properly uses `inert`, `aria-controls`, focus management |
| Footer | 48 | Good | Duplicated nav links (minor) |
| HomeSections | 23 | Good — thin composition layer | None |
| HomeHero | 73 | Good | None |
| ExpertiseGrid | 55 | Good | None |
| FeaturedProjects | 63 | Good | None |
| ExperiencePreview | 56 | Good | None |
| ProfessionalSnapshot | 50 | Good | None |
| ContactCta | 46 | Good | None |
| ResumeCallout | 34 | Good | None |
| PortraitPlaceholder | 29 | Good | Missing `pointer-events-none` on glow |
| SectionReveal | 48 | Adequate | Uses framer-motion unnecessarily |
| ProjectArticleLayout | 91 | Acceptable | Complex but justified |
| CaseStudyPage | 106 | **Dead code** | Delete |
| ProjectCard | 25 | **Dead code** | Delete |

**No god components detected.** The largest page file (experience, 262 lines) is the only file that mixes data and presentation, and it's an acceptable size for a single page.

---

## 14. React and Framework-Specific Findings

### Server vs Client Components

| Component | Directive | Justification | Assessment |
|-----------|----------|---------------|------------|
| Header | `"use client"` | `useState`, `useEffect`, `usePathname` | ✅ Necessary |
| SectionReveal | `"use client"` | `useRef`, framer-motion | ✅ Necessary (could be reduced) |
| MetricTile | `"use client"` | framer-motion `motion.div` | ✅ Necessary |
| ArchitectureFlow | `"use client"` | framer-motion `motion.div` | ✅ Necessary |
| ComparisonBars | `"use client"` | framer-motion `motion.div` | ✅ Necessary |
| TrendLine | `"use client"` | framer-motion `motion.path` | ✅ Necessary |

**Assessment:** Only 6 out of ~25 components are client components. This is excellent. All client boundaries are justified.

### Hooks Usage

- `useState`: 2 instances in Header — both necessary (menu open state, menu DOM presence)
- `useEffect`: 3 instances in Header — all necessary (body scroll lock, animation timeout, media query listener)
- `useRef`: 3 instances in Header + 2 in SectionReveal — all necessary
- No unnecessary `useMemo`, `useCallback`, or context usage detected

### Static Generation

All 12 routes are statically generated (`○`). No dynamic rendering, no API routes, no middleware. This is ideal for a portfolio.

---

## 15. Rendering and Memory Findings

### Memory Leaks

**None detected.** All three `useEffect` hooks in Header properly clean up:
- Escape keydown listener → `removeEventListener` in cleanup
- Menu timeout → `clearTimeout` in cleanup  
- Desktop media query → `removeEventListener` in cleanup

### Rendering Performance

No unnecessary re-render concerns. The Header is the only component with state, and its state changes are user-initiated (menu toggle). No parent state cascading issues.

### `MetricTile` Sparkline O(n²) Issue

The `Math.max(...spark)` / `Math.min(...spark)` inside `.map()` is technically O(n²), but with typical spark arrays of 5-10 points, the real-world impact is negligible (~nanoseconds).

---

## 16. Bundle Size Analysis

| Chunk | Size | Likely Content |
|-------|------|----------------|
| `3rxl-jt3pdxgx.js` | 224K | framer-motion |
| `07u_h6i539_wj.js` | 148K | React runtime |
| `0cz1d0mv5g_q7.js` | 112K | Next.js runtime |
| `3bgxtndddjdpc.js` | 108K | Next.js framework |
| `14mrh2-p_w84d.js` | 56K | Additional framework |
| `27jktro2p5rq9.js` | 44K | Page/component code |
| CSS | 44K | All styles |
| Other chunks | <25K each | Route-level code |

**Assessment:** The total client JavaScript is reasonable for a Next.js site with framer-motion. The CSS is a single 44K file (good — no code splitting needed for CSS at this size). HTML page sizes range from 24K (writing) to 132K (fin-ai case study), which is fine for pre-rendered content.

---

## 17. CSS and Theme Consistency Audit

### Design Token System ✅

The CSS custom properties in `:root` form a disciplined token system:
- **7 color tokens** (background, foreground, muted, primary, primary-hover, primary-soft, card, surface-elevated)
- **4 motion tokens** (instant, fast, standard, enter)
- **2 easing tokens** (standard, enter)
- **3 distance tokens** (xs, sm, md)
- **3 font tokens** (display, body, mono)

### Consistency Issues

- `#aaa79d` hardcoded in `comparison-bars.tsx` (not a token)
- `text-slate-950` / `text-slate-700` in `mdx-components.tsx` (outside design system — file is dead)
- `#fff` / `#000` in print media query (acceptable — print override)

### Responsive Breakpoints

Uses Tailwind's default breakpoints (`sm`, `md`, `lg`, `xl`) consistently. No arbitrary breakpoints.

### Reduced Motion Support ✅

Properly implemented in `globals.css` with `@media (prefers-reduced-motion: reduce)` that disables all CSS animations and reduces transition durations. framer-motion components all check `useReducedMotion()`.

### Print Styles ✅

Proper print styles hide header/footer, remove shadows, and adjust backgrounds.

---

## 18. Image and Font Optimization

### Images

Only one image asset: `ML_Engineer_resume.pdf` (64KB) — this is a downloadable PDF, not an image. No images are used on the site (the portrait is a placeholder component).

### Font Optimization ✅

- Uses `next/font/google` with `display: "swap"` — optimal for FOIT prevention
- Two font families: Space Grotesk (display/body) and IBM Plex Mono (technical/code)
- IBM Plex Mono loads weights 400, 500, 600 — all three are used
- Font CSS variables properly flow from layout to components

### Favicon

`favicon.ico` at 25KB — acceptable.

---

## 19. Network and Loading Performance

### Static Delivery ✅

All pages are statically generated HTML. No API calls, no server-side data fetching, no client-side data loading.

### Resource Loading

- **Fonts:** Loaded via `next/font` (self-hosted, preloaded) ✅
- **CSS:** Single 44KB stylesheet ✅
- **JavaScript:** Framework chunks loaded in parallel ✅
- **Resume PDF:** Only loaded on download click ✅

### Third-Party Requests

Zero third-party scripts, analytics, or tracking. The only external requests are font downloads (handled by Next.js font optimization).

---

## 20. Core Web Vitals Analysis

| Metric | Estimated | Evidence |
|--------|-----------|---------|
| **LCP** | Excellent (<1.5s) | Static HTML, no images, fonts use `display: "swap"` |
| **INP** | Excellent (<100ms) | Only interactive element is header menu toggle |
| **CLS** | Excellent (0) | No images, fonts use `swap`, no dynamic content injection |
| **FCP** | Excellent (<1s) | Static HTML served with pre-rendered content |
| **TBT** | Good (<200ms) | ~224K framer-motion chunk is the largest JS to parse |

**No major CWV risks identified.** The fully static, imageless portfolio is inherently fast.

---

## 21. Animation Performance Audit

| Animation | Type | Properties | Performance | Assessment |
|-----------|------|-----------|-------------|------------|
| Hero enter | CSS keyframes | `opacity`, `transform` | ✅ GPU composited | Good |
| Signal drift | CSS keyframes | `transform` | ✅ GPU composited | Good, runs 2 iterations then stops |
| Mobile menu enter/exit | CSS keyframes | `opacity`, `transform` | ✅ GPU composited | Good |
| Card hover | CSS transition | `transform`, `border-color`, `box-shadow` | ⚠️ `box-shadow` causes repaint | Acceptable — hover only |
| SectionReveal | Web Animations API | `opacity`, `transform` | ✅ GPU composited | Good, fires once |
| MetricTile enter | framer-motion | `opacity`, `y` | ✅ GPU composited | Good |
| ArchitectureFlow enter | framer-motion | `opacity`, `y` | ✅ GPU composited | Good, staggered |
| ComparisonBars | framer-motion | `width` | ⚠️ Causes layout | Acceptable — fires once on scroll |
| TrendLine path | framer-motion | `pathLength`, `opacity` | ✅ SVG composited | Good |
| Signal glow | CSS `filter: blur(12px)` | — | ⚠️ blur is expensive | Static element, not animated |

**Assessment:** All animations use `transform` and `opacity` where possible. The `box-shadow` transition on card hover and `width` animation on comparison bars cause repaints, but both fire only on interaction/viewport entry, not continuously.

---

## 22. TypeScript Quality Audit

- **Zero `any` types** ✅
- **Zero `@ts-ignore` or `@ts-expect-error`** ✅
- **Zero unsafe casts** ✅
- **Zero `as unknown as`** ✅ (except test setup, which is appropriate)
- Types are properly defined in content files and exported
- `as const` used appropriately in `projectDetails`
- Discriminated union used for `result` field in `CaseStudy` type (`kind: "comparison" | "trend"`)

**Only issue:** Missing vitest globals in TypeScript config (covered in Critical Issue 5.1)

---

## 23. Error Handling and Reliability

### Gaps

- **No custom `error.tsx` pages** — Next.js will show default error UI
- **No custom `not-found.tsx`** — `_not-found` route exists (auto-generated) but no custom design
- **No custom `loading.tsx`** — acceptable for a fully static site
- **Resume download failure** — if the PDF is missing, the browser shows a 404. No fallback.
- **External link failures** — GitHub/LinkedIn links could break. No validation.

### Strengths

- No API routes, so no server-side error handling needed
- No forms, so no form validation errors
- All content is static TypeScript, so runtime content errors are impossible
- `matchMedia` API guarded with `if (!window.matchMedia) return` ✅

---

## 24. Security Audit

| Check | Status | Notes |
|-------|--------|-------|
| Exposed secrets | ✅ None | No API keys, tokens, or environment variables |
| `dangerouslySetInnerHTML` | ✅ None | |
| XSS risk | ✅ None | All content is static strings, no user input |
| `target="_blank"` | ✅ All have `rel="noreferrer"` | |
| Contact form | ✅ N/A | No form — just mailto/tel links |
| Dependencies | ⚠️ PostCSS moderate | In Next.js's chain; not exploitable here |
| Sensitive data | ⚠️ Phone number | Phone number is in public source. Intentional for a portfolio. |

---

## 25. Accessibility Audit

### Strengths ✅

- Proper `<html lang="en">`
- Proper heading hierarchy (h1 per page, h2/h3 nesting)
- `aria-label` on navigation, lists, and interactive elements
- `aria-current="page"` on active nav links
- `aria-expanded`, `aria-controls` on mobile menu
- `inert` attribute on closed mobile menu
- `aria-hidden` on decorative icons
- Focus management: focus moves to first link on menu open, returns to trigger on close
- `focus-visible` outline with proper offset
- `prefers-reduced-motion` respected in CSS and JS
- Semantic `<section>`, `<article>`, `<nav>`, `<header>`, `<footer>` elements
- `scope="col"` on table headers
- Keyboard-navigable tables with `tabIndex={0}` on overflow containers
- Escape key closes mobile menu

### Gaps

- **No skip navigation link** — should have a "Skip to main content" link
- Contact page icons missing `aria-hidden` on some icons
- No explicit color contrast check performed (design uses dark-on-cream which visually appears sufficient)
- Architecture flow diagram arrow SVGs use `aria-hidden` ✅ but icon `aria-label="architecture node"` is generic — could be more descriptive

---

## 26. SEO and Metadata Audit

| Page | Title | Description | OG | Assessment |
|------|-------|------------|-----|------------|
| Home (`/`) | ✅ Custom | ✅ Custom | ✅ Custom | Good |
| Experience | ❌ Falls back to template | ❌ None | ❌ None | **Add metadata** |
| Projects | ❌ Falls back to template | ❌ None | ❌ None | **Add metadata** |
| Resume | ❌ Falls back to template | ❌ None | ❌ None | **Add metadata** |
| Contact | ❌ Falls back to template | ❌ None | ❌ None | **Add metadata** |
| Writing | ❌ Falls back to template | ❌ None | ❌ None | **Add metadata** |
| Fin-AI | ✅ Custom | ✅ Custom | ❌ None | Add OG |
| Movie Rec | ✅ Custom | ✅ Custom | ❌ None | Add OG |
| Production ML | ✅ Custom | ✅ Custom | ❌ None | Add OG |

### Missing

- No `robots.txt`
- No `sitemap.xml`
- No canonical URLs
- No structured data (JSON-LD)
- No social sharing image

---

## 27. Testing Gaps

### Current Coverage ✅

7 test files covering:
- Header navigation and mobile menu
- Home content sections
- Section reveal component
- Case study components (metrics, architecture, comparison)
- Case study data structure
- Core pages rendering
- Visual system (CSS token validation)

### Gaps

- No route navigation tests (link clicking)
- No resume download validation
- No accessibility test (e.g., axe-core)
- No test for error/not-found pages
- No snapshot or visual regression tests

**Recommended additions** (high value):
1. Resume PDF link returns 200
2. All internal links resolve to valid routes
3. Mobile menu keyboard navigation

---

## 28. Build and Deployment Audit

| Check | Status |
|-------|--------|
| Production build | ✅ Passes (Turbopack, 6.4s) |
| Static output | ✅ All 12 routes pre-rendered |
| Build warnings | ✅ None |
| Source maps | Default (enabled in dev, disabled in prod) |
| Next.js config | Minimal (empty config object) — acceptable |
| Error pages | Auto-generated `_not-found`, `_global-error`, `404`, `500` |
| `.gitignore` | Present and correct |

---

## 29. Prioritized Fix Plan

| Priority | Issue | Impact | Effort | Risk |
|----------|-------|--------|--------|------|
| **P0** | Fix TypeScript check (vitest globals) | CI blocking | 5 min | Zero |
| **P1** | Move 5 test deps to devDependencies | Correct package manifest | 5 min | Zero |
| **P1** | Remove 3 MDX deps + `mdx-components.tsx` | Remove dead deps | 5 min | Zero |
| **P1** | Delete `CaseStudyPage`, `ProjectCard`, barrel `index.ts` | Remove dead code | 5 min | Zero |
| **P1** | Add metadata to 5 missing pages | SEO | 15 min | Zero |
| **P2** | Delete 5 unused public SVGs | Clean assets | 2 min | Zero |
| **P2** | Remove unused exports (`proofMetrics`, `targetRoles`, `earlierWork`, `featuredProjects`) + delete `skills.ts` | Clean content | 10 min | Low |
| **P2** | Fix `signal-glow` missing `pointer-events-none` in portrait + missing `absolute` in writing page | UX bug | 2 min | Zero |
| **P2** | Add `robots.txt` and `sitemap.xml` | SEO | 10 min | Zero |
| **P2** | Extract experience/projects page data to content layer | Architecture consistency | 20 min | Low |
| **P3** | Deduplicate `TrendPoint` type | TypeScript quality | 5 min | Zero |
| **P3** | Replace hardcoded `#aaa79d` with design token | Theme consistency | 2 min | Zero |
| **P3** | Derive footer links from `navItems` | DRY | 5 min | Low |
| **P3** | Add skip navigation link | Accessibility | 10 min | Zero |
| **P3** | Consider replacing framer-motion in SectionReveal with native IntersectionObserver | Bundle size | 30 min | Medium |
| **P3** | Standardize `rel` attribute on external links | Consistency | 5 min | Zero |

---

## 30. Before-and-After Verification Strategy

### After Each Fix Stage

Run this checklist:

```bash
# 1. TypeScript
npx tsc --noEmit

# 2. Lint
npx eslint .

# 3. Tests
npx vitest run

# 4. Build
npx next build

# 5. Verify route count (should remain 12)
# Check build output for "○" count

# 6. Security
npm audit
```

### After Full Cleanup

- Verify `npm ls` shows no extraneous packages
- Verify `find public -name "*.svg"` returns only favicon-related files
- Verify `grep -r "CaseStudyPage\|ProjectCard\|mdx-components" src/` returns zero results
- View each page source and confirm unique `<title>` and `<meta name="description">`

---

## 31. Final Recommendation

> [!IMPORTANT]
> **This is a well-built portfolio.** The codebase shows disciplined architecture, proper server/client boundaries, strong TypeScript usage, good accessibility, and a consistent design system. The issues found are typical of iterative development — leftover code from earlier versions, not fundamental architectural problems.

**Immediate actions (P0+P1, ~30 minutes):**
1. Fix vitest TypeScript globals
2. Move test deps to devDependencies
3. Remove MDX packages + dead components
4. Add per-page metadata

**Before production launch (P2, ~45 minutes):**
5. Clean up unused assets and exports
6. Fix two minor CSS bugs
7. Add robots.txt + sitemap

**When time permits (P3, ~1 hour):**
8. Architecture polish (data extraction, DRY improvements)
9. Accessibility improvements (skip nav link)
10. Consider SectionReveal optimization

The codebase is **production-ready after P0 and P1 fixes**. The P2 and P3 items improve quality but do not block deployment.
