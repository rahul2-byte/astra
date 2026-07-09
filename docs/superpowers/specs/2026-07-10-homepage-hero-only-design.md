# Homepage Hero-Only Refinement Design

## Goal

Refine only the homepage hero section so it feels consistent with the updated Projects and Experience pages while leaving every section below the hero unchanged.

## Approved Direction

- Use the `Recruiter Landing` direction selected by the user, scoped only to the hero.
- Preserve existing site patterns: `section-shell`, `font-display`, `glass-panel`, `section-label`, `status-badge`, `btn-primary`, `btn-secondary`, warm off-white background, blue accents, lucide icons, and rounded white subpanels.
- Do not edit sections below the first hero section in `src/components/home-sections.tsx`.

## Hero Changes

- Keep the existing headline and summary from `site.headline` and `site.summary`.
- Replace the current hero layout with a more polished recruiter landing hero:
  - left side: label, headline, summary, status badge, primary/secondary CTAs,
  - right side: stronger `Quick Facts` glass card with location, target roles, core stack, and contact/social links,
  - small proof/route strip inside the hero for `Production ML`, `Applied AI/RAG`, and `Recommendations`.
- Use CTAs to important pages: `/projects`, `/experience`, `/resume`, `/contact`.
- Keep mobile-first stacking and desktop two-column layout.

## Testing

- Existing homepage test must continue to pass:
  - headline,
  - proof metrics below hero,
  - featured work names,
  - resume/contact links.
- Add or adjust assertions only if needed for new hero CTAs.

## Constraints

- Do not update any homepage section below the hero.
- Do not add new global CSS.
- Do not invent new content or claims.
