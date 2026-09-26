# Rahul Singh: Machine Learning Engineer

A personal portfolio for Rahul Singh, a Machine Learning Engineer at Intangles in Pune, India. The homepage presents his professional profile and employment experience; the Projects page lists his independent work, with a separate detailed case-study page for each project.

## Pages

- `/` — Introduction, Intangles experience, résumé, and contact links.
- `/projects` — overview of FIN-AI, LoRA Reproduction, and Movie Recommendation System.
- `/projects/[slug]` — individual implementation, evidence, and limitations for each project.
- `/resume_updated_fin_ai.pdf` — approved résumé PDF.

Older experience, project, and résumé URLs redirect to their current destinations. Contact and writing URLs also redirect to their current destinations.

## Development

```sh
npm install
npm run dev
```

Run checks with:

```sh
npm test -- --run
npm run lint
npx tsc --noEmit
npm run build
```

With the site running, check its routes, project pages, résumé, redirects, and sitemap with:

```sh
node scripts/check-site-routes.mjs http://localhost:3000
```

## Stack

Next.js App Router, React, TypeScript, semantic HTML, and global CSS. Tests use Vitest, Testing Library, and jsdom. No component library, animation dependency, or remote font is used.

## Contact

- GitHub: <https://github.com/rahul2-byte>
- LinkedIn: <https://www.linkedin.com/in/-rahul-singh22/>
- Email: <rahulchand4299@gmail.com>
- Phone: +91 9027537314
