# Security Notes

This portfolio is a static Next.js application. It has no API routes, authentication, database access, or server-side form processing. Most risk is therefore in build-time supply chain issues and deployment misconfiguration rather than runtime backend exploits.

## Repository defaults

- `productionBrowserSourceMaps` is disabled in `next.config.ts`
- Standard security headers are set in `next.config.ts`
- `robots.txt` and `sitemap.xml` are generated from App Router metadata routes
- External links use `rel="noopener noreferrer"`

## Deployment checklist

Before marking a deployment production-ready:

1. Set `NEXT_PUBLIC_SITE_URL` to the final canonical HTTPS origin.
2. Verify the deployed site returns these headers:
   - `Content-Security-Policy`
   - `X-Frame-Options: DENY`
   - `X-Content-Type-Options: nosniff`
   - `Referrer-Policy: strict-origin-when-cross-origin`
   - `Permissions-Policy`
   - `Strict-Transport-Security`
3. Confirm the site is served only over HTTPS.
4. Confirm `robots.txt` and `sitemap.xml` resolve on the production domain.
5. Keep the hosting account protected with MFA.
6. Keep the domain registrar protected with MFA.
7. Review external contact/profile links after username or domain changes.

## Verification commands

Local repo checks:

```bash
npx tsc --noEmit
npm test -- --run
npm run lint
npm run build
```

Post-deploy checks:

```bash
curl -I https://your-domain.example
curl -I https://your-domain.example/robots.txt
curl -I https://your-domain.example/sitemap.xml
```

Browser checks:

- Open DevTools and confirm there are no CSP violations in the console.
- Confirm resume download and external profile links still work.

## Deferred tradeoffs

The site intentionally exposes direct email and phone contact details. This increases scraping risk, but keeps recruiter access friction low. If spam becomes a real problem, replace direct contact links with a form or obfuscation layer.
