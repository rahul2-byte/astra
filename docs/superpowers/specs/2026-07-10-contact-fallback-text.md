# Contact Page With Fallback Text Design

## Goal

Show the plain contact destination next to the channel name so visitors can read it even if the link fails.

## Approved Direction

- Keep each contact card as a single clickable `<a>`.
- Inside each card, render the Lucide icon, the channel title, and a short fallback line with the destination.
- Fallback text inside the card:
  - `Email` -> `rahulchand4299@gmail.com`
  - `LinkedIn` -> `linkedin.com/in/-rahul-singh22`
  - `GitHub` -> `github.com/rahul2-byte`
  - `Phone` -> `+91 9027537314`
- Keep the centered hero and the `Download Technical Resume` CTA.

## Constraints

- All card text lives inside the same `<a>` element.
- Destination text uses muted slate so the title remains primary.
- Use `lucide-react` icons only.
- Preserve data from `src/content/site.ts`.

## Testing

- Update tests so each card's accessible link name covers both the channel title and the destination text.
- Run tests, lint, and production build before completion.
