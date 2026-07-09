# Minimal Contact Page Design

## Goal

Make the contact page minimal and fully clickable so the entire card is the link, with no descriptive text under each method.

## Approved Direction

- Centered `Contact` section label and `Get in Touch` heading only.
- Four contact cards in the same responsive grid.
- Each card is a single `<a>` containing the Lucide icon and the channel title (`Email`, `LinkedIn`, `GitHub`, `Phone`).
- No `Best for` notes, no visible labels/handles, no descriptive subtitle under the hero.
- Centered `Download Technical Resume` CTA below the cards.

## Constraints

- Preserve existing site background, header, footer, and `glass-panel` system.
- Use `lucide-react` icons only.
- Preserve all four contact destinations from `src/content/site.ts`.

## Testing

- Update tests to drop all `Best for` assertions.
- Verify each card is a link covering its icon and title.
- Run tests, lint, and production build before completion.
