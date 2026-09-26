# Rahul Singh: Machine Learning Engineer

A personal portfolio for Rahul Singh, a Machine Learning Engineer at Intangles in Pune, India. The site has two main pages: a homepage with employment experience, and a Projects page with three independent project write-ups.

## Pages

- `/` — Introduction, Intangles experience, résumé, and contact links.
- `/projects` — FIN-AI, LoRA Reproduction, and Movie Recommendation System, with methods, results, and limitations.
- `/resume.pdf` — Approved résumé PDF.

Older experience and project URLs redirect to the matching section on `/` or `/projects`. Contact and writing URLs also redirect to their current destinations.

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

With the site running, check its two pages and legacy redirects with:

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
