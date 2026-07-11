# Signal Grid Portfolio Redesign

## Objective

Upgrade Rahul Singh's existing nine-page portfolio into a premium, light, yellow-accented AI/ML product website while preserving its routes, factual content, recruiter journey, project evidence, and downloadable resume.

## Visual Direction

The approved direction is **Signal Grid**: a sharp editorial-technical system inspired by Mistral AI's visual confidence without copying its layouts. The site will combine warm-white space, charcoal typography, amber signal elements, precise grid details, restrained shadows, and compact technical metadata.

The redesign must feel calm, modern, technical, credible, and recruiter-friendly. It must not resemble a dark hacker theme, a generic portfolio template, a playful startup landing page, or a heavily animated showcase.

## Theme Tokens

All visual colors will be centralized in `src/app/globals.css` and exposed through semantic CSS variables and Tailwind-compatible theme values.

| Token | Value | Purpose |
| --- | --- | --- |
| `--background` | `#fffdf5` | Main warm-white canvas |
| `--foreground` | `#171711` | Primary text and strong controls |
| `--muted` | `#68665e` | Supporting copy and metadata |
| `--primary` | `#ffd43b` | Main yellow brand signal |
| `--primary-hover` | `#f2bc19` | Yellow interaction state |
| `--primary-soft` | `#fff2b2` | Badges, highlights, and selected surfaces |
| `--border` | `#dedacd` | Default card and control borders |
| `--card` | `#fffef9` | Standard surface |
| `--surface-elevated` | `#f6f2e5` | Secondary and elevated sections |
| `--cta-background` | `#171711` | High-contrast primary CTA |
| `--cta-text` | `#fffdf5` | Primary CTA text |
| `--focus-ring` | `#b77a00` | Accessible keyboard focus |
| `--grid-line` | `rgba(23, 23, 17, 0.065)` | Technical background grid |
| `--section-divider` | `#e7e2d4` | Section separation |

Yellow will be used for emphasis, markers, badges, metric accents, and interaction energy. Large text will not use yellow where contrast would be insufficient. Blue and green visual accents will be removed.

## Typography

- Use Space Grotesk through `next/font` for headings and readable body copy.
- Use IBM Plex Mono through `next/font` for navigation, section labels, badges, stack pills, metric labels, and technical metadata.
- Headings use tighter tracking, strong but controlled weight, and editorial line lengths.
- Body copy retains generous line height and readable widths.
- Typography remains self-hosted by Next.js at build output and avoids browser-time font requests.

## Layout System

- Preserve the existing `1280px` maximum content width.
- Introduce consistent page, section, card, and compact-content spacing scales.
- Prefer squared or moderately rounded geometry rather than pill-heavy or overly soft cards.
- Use alternating warm-white and elevated surfaces to create section rhythm without excessive gradients.
- Add a subtle technical grid and restrained amber radial signal in hero regions.
- Preserve semantic heading order and existing content hierarchy.
- Use mobile-first breakpoints and eliminate horizontal overflow in navigation, charts, tables, architecture flows, and contact details.

## Shared Components

### Header and Navigation

- Retain the sticky header and all existing primary links.
- Add an accessible mobile menu with a labeled button, keyboard support, clear focus styles, and a compact panel.
- Replace the blue hover border with a yellow animated underline and charcoal active-feeling state.
- Style the Rahul Singh wordmark as a technical identity rather than a generic bold text link.

### Footer

- Preserve the copyright sentence and existing links.
- Add a clearer grid-based layout and external-link indicator for GitHub.
- Use consistent link underline motion and focus treatment.

### Buttons and Links

- Primary CTA: charcoal background, warm-white text, yellow hover signal, subtle directional arrow movement.
- Secondary CTA: card-colored surface, charcoal border/text, yellow-tinted hover state.
- Unify all resume download actions with the same button system.
- Add visible external-link indicators to GitHub and LinkedIn links without changing their destinations.

### Cards and Surfaces

- Replace glassmorphism with opaque warm surfaces, precise borders, a small top-edge signal, and controlled shadow depth.
- Use subtle lift and border-color changes on interactive cards only.
- Avoid hover movement on dense resume content where it harms reading stability.

### Badges, Pills, and Labels

- Use mono typography, compact spacing, thin charcoal borders, and selective soft-yellow fill.
- Keep status badges visually distinct from technology pills.
- Maintain readable wrapping at narrow widths.

### Case Study Components

- Metric tiles gain stronger numeric hierarchy and yellow signal details.
- Architecture nodes use consistent geometry, responsive flow connectors, and clear captions.
- Charts use charcoal, yellow, and neutral values only.
- Evidence tables gain sticky-feeling header contrast, zebra-neutral rows, improved spacing, and mobile overflow containment.
- Source labels remain visible and factual.

## Motion Strategy

- Use CSS transitions for buttons, links, cards, badges, and arrows.
- Use a small reusable client-side reveal component for section and timeline entrance effects.
- Keep transitions generally between `160ms` and `500ms` with restrained easing.
- Animate opacity and transforms only; avoid layout-changing properties.
- Add a subtle hero glow/grid drift that does not compete with content.
- Disable nonessential transitions and transforms under `prefers-reduced-motion: reduce`.
- Do not add heavy 3D, parallax, springy motion, or continuous decorative objects.

## Page Changes

### Home

- Strengthen the two-column hero with a more deliberate headline lockup, compact technical badge row, premium CTA grouping, and amber grid signal.
- Redesign the recruiter snapshot as a structured technical dossier with clearer location, target-role, stack, and contact groupings.
- Convert proof metrics into a high-contrast horizontal signal band that stacks cleanly on mobile.
- Improve section rhythm and visual differentiation for experience anchor, featured work, skills, and earlier work.
- Preserve all existing labels, metrics, links, and project summaries.

### Experience

- Add a clearer vertical line, numbered yellow markers, stronger period/category metadata, and responsive marker alignment.
- Restyle Built, Problems solved, and Decisions and learnings as structured subpanels.
- Add restrained reveal behavior per timeline entry.
- Preserve every experience statement, outcome, stack item, and case-study destination.

### Projects

- Preserve the featured-left/supporting-right hierarchy.
- Add stronger case-study numbering, metric emphasis, card separators, stack treatment, and arrow interactions.
- Keep missing GitHub and demo links absent.
- Preserve all project summaries, features, metrics, and routes.

### Case Studies

- Introduce a structured project header with role/period metadata and yellow framing detail.
- Improve metric tiles, problem/approach comparison, architecture flow, result charts, evidence tables, and final learning panel.
- Retain the same data objects and factual values for all three projects.

### Resume

- Increase reading clarity through a calm single-column editorial layout with stronger section rules and compact metadata.
- Improve header contact organization, download CTA consistency, skill grouping, experience blocks, project blocks, and education presentation.
- Minimize animation and add print styles that remove navigation, footer, decorative backgrounds, shadows, and interaction-only elements.
- Preserve every resume statement and contact detail.

### Contact

- Add a concise supporting line using existing intent rather than inventing claims.
- Redesign contact methods as consistent action cards with external indicators where appropriate.
- Unify the download button with the global primary CTA.
- Preserve email, LinkedIn, GitHub, phone, and resume URLs.

### Writing

- Keep the page explicitly empty and honest.
- Add a polished coming-soon panel, future category labels for Production ML, RAG systems, and Recommenders, and navigation back to Projects and Contact.
- Do not create article titles, publication dates, summaries, or fake links.

## Asset and Consistency Cleanup

- Keep `public/ML_Engineer_resume.pdf` as the canonical resume target.
- Remove unused `public/resume.pdf` after verifying there are no references.
- Leave the root-level PDF untouched unless repository evidence shows it is an accidental tracked duplicate outside the deployed public asset path.
- Remove hardcoded blue and green styling from application components.
- Do not alter content source files unless a small structural addition is required to render existing information consistently.

## Accessibility and Performance

- Maintain semantic landmarks, headings, lists, tables, and accessible link names.
- Provide visible `:focus-visible` treatment with sufficient contrast.
- Ensure the mobile menu is operable by keyboard and exposes expanded state.
- Preserve target sizes appropriate for touch interaction.
- Keep animation transform/opacity based and avoid unnecessary client components.
- Use `next/font` according to the bundled Next.js 16 guidance.
- Keep internal navigation on `next/link` and retain normal anchors for downloads, phone, email, and external destinations.

## Verification

- Update visual-system tests before production styling changes so the old blue/glass system fails and the new tokens/semantics are required.
- Add focused component tests for mobile navigation behavior and external-link indicators.
- Preserve existing content and case-study tests.
- Run targeted Vitest suites during implementation, followed by the complete test suite, ESLint, and a production Next.js build.
- Inspect all nine routes at mobile and desktop widths for overflow, hierarchy, navigation, focus visibility, and reduced-motion behavior.

## Non-Goals

- No route changes or sitemap expansion.
- No factual content rewrite.
- No invented metrics, achievements, certifications, testimonials, repositories, demos, or writing posts.
- No dark mode.
- No CMS, contact form, analytics, or new backend functionality.
- No unrelated refactoring.

## Acceptance Criteria

- All nine routes render with a consistent warm-white, yellow, and charcoal design system.
- Existing recruiter actions, project evidence, content, and external destinations remain intact.
- Mobile navigation is accessible and functional.
- Contact and resume CTAs use the shared button system.
- External destinations are visually indicated.
- The writing page is intentional but clearly unpublished.
- Reduced-motion and print treatments are present.
- Automated tests, lint, and production build pass.
