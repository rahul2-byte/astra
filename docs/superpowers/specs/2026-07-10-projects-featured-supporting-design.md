# Projects Featured + Supporting Cards Design

## Goal

Refine `/projects` so it feels consistent with the rest of the portfolio while clearly communicating project value, technical depth, role, features, tools, and case-study links.

## Existing Design Patterns To Preserve

- `section-shell py-20` page shell with max width `1280px`.
- `section-label` uppercase blue labels.
- Large `font-display` serif page headings.
- Warm off-white background with radial glow accents.
- `glass-panel` cards, subtle borders, rounded corners, and hover lift.
- White/transparent nested subpanels for metrics or highlights.
- `StackPill`-style technology badges.
- Lucide icons with `strokeWidth={1.7}` and blue accent color.
- Text CTAs with `ArrowUpRight` icons and `#2f5ea4` blue.
- Responsive grids that collapse cleanly on mobile.

## Approved Direction

Use a **Featured + Supporting Cards** layout:

1. **Hero**
   - Label: `Projects`
   - Heading: `Selected case studies`
   - Paragraph explaining the projects as focused ML, applied AI, recommender, and production analytics work.
   - Small metric strip with `3 focused studies`, `Production + projects`, and `ML / RAG / Recommenders`.

2. **Featured card**
   - Large card for `Production ML Systems — Fuel event telemetry`.
   - Larger visual weight because it is the strongest real professional experience.
   - Must show:
     - category,
     - title,
     - summary,
     - problem/purpose,
     - Rahul's role/contribution,
     - key features/modules,
     - stack chips,
     - strongest metrics (`95%`, `15%`, `30+ hrs/week`),
     - CTA: `Open case study` to `/projects/production-ml-systems`.

3. **Supporting cards**
   - Two cards for `FIN-AI` and `Movie Recommendation System`.
   - Each card must show:
     - category,
     - title,
     - short description,
     - problem/purpose,
     - role/contribution,
     - 3 key features,
     - stack chips,
     - one preview metric,
     - CTA: `Open case study` to the internal details page.

## Content Rules

- Use `caseStudies` as the source of truth.
- Do not show GitHub/live/demo placeholder buttons.
- Show only internal case-study/detail links because no real repo or live URLs are currently available.
- Do not invent metrics beyond the existing placeholder/source-labeled case-study metrics.
- Keep text concise enough for cards; detail pages carry the deep research-note content.

## Implementation Notes

- Update only `src/app/projects/page.tsx` and tests unless a tiny helper is clearly needed.
- Keep this page as a server component.
- Avoid new CSS; use existing Tailwind classes and globals.
- Use local helper functions/arrays inside `page.tsx` only if needed.

## Testing

- Update `src/components/__tests__/case-studies.test.tsx` to assert:
  - heading `Selected case studies`,
  - `Production ML Systems` featured content,
  - purpose/problem text appears,
  - role/contribution text appears,
  - `FIN-AI` and `Movie Recommendation System` supporting cards appear,
  - exactly 3 `Open case study` links,
  - no `GitHub` or `Live demo` placeholder links.
- Run `npm test -- --run`, `npm run lint`, and `npm run build`.

## Constraints

- Preserve the current portfolio visual identity.
- Do not introduce a totally new UI style.
- Do not add external links unless real URLs exist.
- Keep the page responsive and readable on mobile, tablet, and desktop.
