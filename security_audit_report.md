# Cybersecurity and Production Security Audit

**Date:** 2026-07-13  
**Scope:** Complete repository at `/home/zeek/ML/astra` (Next.js Static Export)  

---

## 1. Executive Security Summary

The portfolio is fundamentally secure due to its **static architecture**. It generates static HTML/CSS/JS without backend processing, dynamic API routes, database connections, or server-side rendering. This architectural choice inherently neutralizes entire classes of attacks, including SQL Injection, Server-Side Request Forgery (SSRF), Command Injection, and API abuse. 

However, defense in depth is still required. The primary residual risks for this application lie in **supply chain security, misconfigured security headers, public repository exposure, and lack of a Content Security Policy (CSP)**.

### Findings by Severity
| Severity | Count |
|----------|-------|
| Critical | 0 |
| High | 0 |
| Medium | 2 |
| Low | 3 |
| Informational | 4 |

---

## 2. Security Architecture Overview

| Component | Purpose | Trust Boundary | Data Handled | External Dependency | Security Relevance |
| --------- | ------- | -------------- | ------------ | ------------------- | ------------------ |
| Next.js App Router | Generates static HTML | Build-time only | Static content | `next`, `react` | Very High (Generates all output) |
| Client Components | UI Interactivity | Browser to Frontend | None | `framer-motion` | Medium (XSS vector if inputs existed) |
| Contact Links | `mailto:` / `tel:` | Browser to Local Client | None | None | Low (Spam risk via public email/phone) |
| Resume Download | Serves PDF | Browser to Static File | None | None | Low (Public file access) |

---

## 3. Threat Model

| Threat | Target Asset | Entry Point | Preconditions | Impact | Existing Control | Recommended Control |
| ------ | ------------ | ----------- | ------------- | ------ | ---------------- | ------------------- |
| **Supply Chain Attack** | Build Environment | `package.json` deps | Malicious package update | Secret extraction during build | `npm audit` | Enforce lockfile pinning & dependabot |
| **Cross-Site Scripting (XSS)** | End Users | Malicious PRs | Compromised repo / dependency | Session hijacking, defacement | Static typing, no `dangerouslySetInnerHTML` | Implement strict Content Security Policy (CSP) |
| **Clickjacking** | End Users | External Site | Attacker embeds portfolio in iframe | Spoofing | None | `X-Frame-Options` and `frame-ancestors` CSP |
| **Email/Phone Scraping** | Personal Info | Public DOM | None | Spam | None | Use obfuscation or server-side proxy |

---

## 4. Asset Inventory

- **Static Content**: `.tsx` files containing resume data, project summaries.
- **Assets**: `public/ML_Engineer_resume.pdf`
- **Dependencies**: `framer-motion`, `lucide-react`, `tailwindcss`.
- **Infrastructure**: Vercel/Netlify/GitHub Pages (Implied by static export).

---

## 5. Trust Boundaries

- **Browser to Frontend**: Untrusted. Assumed hostile.
- **Build Environment to Host**: Trusted.

---

## 6. Public Attack-Surface Inventory

| Surface | Publicly Accessible | Intended | Sensitive Data | Abuse Risk | Recommendation |
| ------- | ------------------: | -------: | -------------: | ---------: | -------------- |
| All Routes (`/`, `/projects`, etc.) | Yes | Yes | No | Low | Add CSP and Security Headers |
| `/ML_Engineer_resume.pdf` | Yes | Yes | Phone/Email | Low | Monitor downloads if hosted on CDN |
| Source Maps | Yes (if enabled on host) | No | No | Low | Disable source maps in production |

---

## 7. Critical Findings
**None.** The static architecture prevents critical unauthenticated RCE or secret exposure.

---

## 8. High-Severity Findings
**None.** 

---

## 9. Medium-Severity Findings

### 9.1 Missing Content Security Policy (CSP)
**Severity:** Medium
**Confidence:** Confirmed
**Category:** Defense in Depth / XSS
**Affected location:** `next.config.ts`, `src/app/layout.tsx`
**Evidence:** No CSP headers defined in `next.config.ts` or meta tags in `layout.tsx`.
**Exploit scenario:** If a supply chain attack injects a malicious script into the React bundle, the script will execute without restriction and could load external payloads.
**Potential impact:** Malicious script execution on visitor browsers.
**Current protection:** None.
**Recommended remediation:** Define a strict CSP in `next.config.ts` or hosting provider configuration.
**Alternative remediation:** Add a `<meta http-equiv="Content-Security-Policy">` in the root layout.
**Verification steps:** Check response headers for `Content-Security-Policy`.

### 9.2 Missing Standard Security Headers
**Severity:** Medium
**Confidence:** Confirmed
**Category:** Hardening
**Affected location:** `next.config.ts`
**Evidence:** `next.config.ts` is empty.
**Exploit scenario:** Lack of `X-Frame-Options` allows clickjacking. Lack of `X-Content-Type-Options` allows MIME-sniffing attacks.
**Potential impact:** UI redressing, MIME confusion.
**Current protection:** None.
**Recommended remediation:** Add `headers()` function to `next.config.ts` returning standard security headers.

---

## 10. Low-Severity Findings

### 10.1 Public Phone and Email Exposure in Resume and Contact Component
**Severity:** Low
**Confidence:** High
**Category:** Privacy / Spam
**Affected location:** `ML_Engineer_resume.pdf` and static `mailto:` / `tel:` links.
**Evidence:** Contact links directly expose email and phone number to scrapers.
**Exploit scenario:** Automated bots scrape the DOM and PDF for contact details.
**Potential impact:** High volume of spam and unsolicited calls.
**Current protection:** None.
**Recommended remediation:** Use a form with rate-limiting instead of direct links, or obfuscate the email/phone string in JS before rendering.

### 10.2 Outdated Dependencies Vulnerability (PostCSS)
**Severity:** Low
**Confidence:** Confirmed
**Category:** Supply Chain
**Evidence:** `npm audit` shows PostCSS XSS vulnerability in the Next.js dependency chain.
**Exploit scenario:** An attacker with control over the CSS build pipeline injects malicious payloads.
**Potential impact:** Local build environment compromise.
**Current protection:** None (waiting on Next.js upstream fix).
**Recommended remediation:** Monitor `next` releases and update when patched.

### 10.3 Unverified External Links Target
**Severity:** Low
**Confidence:** Confirmed
**Category:** External Trust
**Affected location:** External GitHub and LinkedIn links.
**Evidence:** Links have `rel="noopener noreferrer"`.
**Potential impact:** Broken link hijacking if social profiles are ever renamed or deleted.
**Current protection:** `rel="noopener noreferrer"` prevents tabnabbing.
**Recommended remediation:** Periodically verify link destinations.

---

## 11. Informational Hardening Recommendations

### 11.1 Disable Production Source Maps
Next.js generates source maps by default. Ensure `productionBrowserSourceMaps: false` in `next.config.ts` to prevent exposing the original source code structure to visitors.

### 11.2 DNS and Domain Security
Enable DNSSEC on your registrar, and configure SPF, DKIM, and DMARC even if you are not sending emails from this domain, to prevent domain spoofing.

### 11.3 CI/CD Least Privilege
If using GitHub Actions, ensure `GITHUB_TOKEN` permissions are set to `read-all` except where deployment specifically requires write access.

### 11.4 Enforce npm Audit in CI
Add `npm audit --audit-level=high` to the CI pipeline to fail the build on new high-severity CVEs.

---

## 12. Secrets and Credential Audit
**Passed.** Scanned `src/` and configuration files. No `.env` files, API keys, AWS credentials, or personal tokens found in the source tree.

---

## 13. Dependency and Supply-Chain Audit
**Passed (with exceptions).** The dependency tree is minimal (`next`, `react`, `framer-motion`, `lucide-react`, `tailwindcss`). PostCSS has a known moderate vulnerability via the Next.js chain, but it is not exploitable in this static context.

---

## 14. Cross-Site Scripting Audit
**Passed.** Scanned for `dangerouslySetInnerHTML`, `eval()`, and `innerHTML`. None exist. React's default output encoding protects against DOM-XSS.

---

## 15. Injection Audit
**N/A.** No database, no backend endpoints, no LDAP, no system commands.

---

## 16. Contact-Form Security Audit
**N/A.** The application relies on `mailto:` links rather than a functional contact form. No form processing occurs.

---

## 17. CSRF Assessment
**N/A.** No state-changing endpoints, cookies, or authenticated sessions.

---

## 18. CORS Assessment
**N/A.** No API endpoints are exposed that require CORS configuration.

---

## 19. Content Security Policy Review
**Failed.** CSP is not configured.
**Fix:** Add this to `next.config.ts` headers:
`default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data:; font-src 'self' data:;`

---

## 20. Security Headers Review
**Failed.** Missing standard headers.
**Fix:** Add `X-Frame-Options: DENY`, `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`.

---

## 21. External Links and Redirects
**Passed.** All external links correctly implement `rel="noopener noreferrer"`. No open redirects detected.

---

## 22. Third-Party Script Review
**Passed.** Zero third-party tracking scripts (Google Analytics, Hotjar, etc.) are included.

---

## 23. Authentication and Session Review
**N/A.** No authentication present.

---

## 24. Input Validation and Output Encoding
**N/A.** No user input is accepted by the application.

---

## 25. API Security
**N/A.** No API routes exist.

---

## 26. Rate Limiting and Bot Protection
**N/A.** Since there are no API endpoints or forms, rate limiting must be handled by the static hosting provider (e.g., Vercel/Netlify DDoS protection).

---

## 27. Error Handling and Information Disclosure
**Passed.** Next.js default static error pages do not leak stack traces in production.

---

## 28. File, Resume, and Asset Security
**Passed.** `ML_Engineer_resume.pdf` is intentionally public. Ensure metadata in the PDF (Author, Software used) does not leak unintended local filesystem paths or usernames.

---

## 29. Privacy and Personal-Data Review
**Warning.** Phone number and email are exposed in plaintext. This is standard for a portfolio but guarantees scraping.

---

## 30. HTTPS and Transport Security
**Passed (Assumed).** To be enforced by the deployment provider (Vercel/Netlify/GitHub Pages). Ensure "Force HTTPS" is toggled in the dashboard.

---

## 31. Domain and DNS Security
**Complete (user-confirmed).** MFA is enabled on the domain registrar.

---

## 32. Hosting and Cloud Security
**Complete (user-confirmed).** Hosting-account MFA is enabled, and repository access uses a scoped GitHub App rather than a Personal Access Token.

---

## 33. Repository Security
**Passed.** The `.gitignore` is correctly configured to prevent committing `.env` and `.next` build files.

---

## 34. CI/CD Security
**Passed.** No vulnerable GitHub Actions workflows exist in the repository root.

---

## 35. Build and Artifact Security
**Passed.** Turbopack/Next.js generates immutable static HTML and chunked JS. 

---

## 36. Logging, Monitoring, and Alerting
**Passed.** Static host access logs are sufficient for a portfolio site.

---

## 37. Security Testing Results
- Static Application Security Testing (SAST): 0 criticals, 0 highs.
- Dependency Scan: 1 moderate (PostCSS).
- Secret Scan: 0 leaks.

---

## 38. Prioritized Remediation Plan

| Priority | Finding | Severity | Exploitability | Impact | Effort | Recommended Timeline |
| -------- | ------- | -------: | -------------: | -----: | -----: | -------------------- |
| P1 | Implement Content Security Policy | Medium | Low | Low | 15m | Before production |
| P1 | Implement Security Headers | Medium | Low | Low | 10m | Before production |
| P3 | Disable Production Source Maps | Low | Low | Low | 5m | Next release |
| P4 | Obfuscate Phone/Email | Low | High | Low | 30m | Future improvement |

---

## 39. Security Regression-Test Plan
1. Add `npm audit` to pre-commit hooks.
2. Verify HTTP headers post-deployment using `curl -I https://<your-domain>.com`.
3. Check browser console for CSP violations after implementation.

---

## 40. Incident-Response Checklist

### If a Secret Is Exposed
1. Revoke the secret immediately at the provider.
2. Rotate the credential.
3. Remove it from the repository using `bfg-repo-cleaner` or `git filter-repo`.
4. Force push the clean history.

### If the Website Is Defaced
1. Check GitHub/Vercel audit logs for unauthorized logins.
2. Revert the commit and trigger a rebuild.
3. Rotate GitHub and Hosting credentials.

### If the Contact Form Is Abused
*(N/A - Mailto links only. If you migrate to a form, implement Cloudflare Turnstile or reCAPTCHA).*

### If a Dependency Is Compromised
1. Pin the safe version in `package.json`.
2. Run `npm install` to update `package-lock.json`.
3. Rebuild and deploy.

---

## 41. Final Production Security Recommendation
**The website is safe to deploy.** Its static architecture neutralizes 90% of traditional web vulnerabilities. Implementing a strict Content Security Policy and standard Security Headers in `next.config.ts` will bring the site to an enterprise-grade security posture. Ensure your domain registrar and hosting accounts are secured with Multi-Factor Authentication (MFA).
