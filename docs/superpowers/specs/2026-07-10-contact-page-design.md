# Contact Page Design

## Goal

Update the contact page to follow the provided reference image's centered contact focus while preserving the portfolio's existing glass-panel visual system.

## Approved Direction

Use the Option B layout selected by the user: keep the current site's warm dotted background, serif display heading, and glass surface language instead of copying the reference exactly.

## Page Structure

- Centered hero section with the heading `Get in Touch`.
- Subtitle focused on recruiter outreach, ML roles, AI/RAG opportunities, and technical interviews.
- Four responsive contact cards: Email, LinkedIn, GitHub, and Phone.
- Each card includes a Lucide icon, title, direct link, and short `Best for` note.
- Centered `Download Technical Resume` CTA below the card grid.

## Responsive Behavior

- Mobile: cards stack in one column.
- Medium screens: cards use a two-column grid.
- Wide screens: cards use a four-column grid when space allows.

## Constraints

- Keep the shared header, footer, global background, and existing site utilities.
- Do not restore the removed custom icon component.
- Use `lucide-react` icons only.
- Preserve Rahul's real contact details from `src/content/site.ts`.

## Testing

- Update existing page tests to assert the new `Get in Touch` heading, four contact methods, and resume CTA.
- Run tests, lint, and production build before completion.
