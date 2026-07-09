# Minimal Contact Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make each contact card fully clickable and remove all `Best for` notes plus the hero subtitle.

**Architecture:** Modify `src/app/contact/page.tsx` so each card is a single `<a>` that wraps the Lucide icon and channel title. Drop the `Best for` data and hero subtitle from the component and tests.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS utilities, Vitest, Testing Library, `lucide-react`.

---

## File Structure

- Modify `src/app/contact/page.tsx`: render minimal cards, no subtitle, no `Best for` notes.
- Modify `src/components/__tests__/core-pages.test.tsx`: drop `Best for` assertions, expect the four contact titles to be accessible link names.

### Task 1: Update Tests for Minimal Contact Page

**Files:**
- Modify: `src/components/__tests__/core-pages.test.tsx`

- [ ] **Step 1: Replace the contact page assertions**

Inside `renders Rahul's final contact links and resume URL`, replace the four `Best for` assertions with:

```tsx
expect(screen.queryByText(/best for:/i)).not.toBeInTheDocument();
expect(screen.queryByText(/for recruiter outreach, ml roles, ai\/rag opportunities/i)).not.toBeInTheDocument();
```

After the phone link assertion, add:

```tsx
expect(screen.getByRole("link", { name: /^email$/i })).toHaveAttribute(
  "href",
  "mailto:rahulchand4299@gmail.com",
);
expect(screen.getByRole("link", { name: /^linkedin$/i })).toHaveAttribute(
  "href",
  "https://www.linkedin.com/in/-rahul-singh22/",
);
expect(screen.getByRole("link", { name: /^github$/i })).toHaveAttribute(
  "href",
  "https://github.com/rahul2-byte",
);
expect(screen.getByRole("link", { name: /^phone$/i })).toHaveAttribute(
  "href",
  "tel:+919027537314",
);
```

- [ ] **Step 2: Run the targeted test to verify it fails**

Run: `npm test -- --run src/components/__tests__/core-pages.test.tsx`

Expected: FAIL because the page still renders the `Best for` notes and the subtitle, and the cards are not title-only links.

### Task 2: Implement the Minimal Contact Page

**Files:**
- Modify: `src/app/contact/page.tsx`

- [ ] **Step 1: Replace the page component**

Replace the contents of `src/app/contact/page.tsx` with:

```tsx
import { Code2 as Github, Link as Linkedin, Mail, Phone } from "lucide-react";
import { site } from "@/content/site";

const contactMethods = [
  { title: "Email", href: `mailto:${site.email}`, Icon: Mail },
  { title: "LinkedIn", href: site.linkedin, Icon: Linkedin },
  { title: "GitHub", href: site.github, Icon: Github },
  { title: "Phone", href: site.phoneHref, Icon: Phone },
];

export default function ContactPage() {
  return (
    <main className="section-shell py-20 md:py-24">
      <section className="mx-auto max-w-5xl text-center">
        <p className="section-label">Contact</p>
        <h1 className="font-display mt-4 text-5xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl">
          Get in Touch
        </h1>
      </section>

      <section className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-2 xl:grid-cols-4">
        {contactMethods.map(({ title, href, Icon }) => (
          <a
            key={title}
            className="glass-panel flex min-h-56 flex-col items-center justify-center gap-3 p-7 text-center transition hover:-translate-y-1 hover:shadow-[0_26px_80px_rgba(15,23,42,0.12)]"
            href={href}
          >
            <Icon className="h-10 w-10 text-slate-950" strokeWidth={1.7} />
            <span className="text-2xl font-bold tracking-tight text-slate-950">{title}</span>
          </a>
        ))}
      </section>

      <div className="mt-12 flex justify-center">
        <a
          className="btn-primary bg-[#0b66d8] text-base hover:bg-[#0958ba]"
          download="Rahul-Singh-ML-Engineer-Resume.pdf"
          href={site.resume}
        >
          Download Technical Resume
        </a>
      </div>
    </main>
  );
}
```

- [ ] **Step 2: Run the targeted test to verify it passes**

Run: `npm test -- --run src/components/__tests__/core-pages.test.tsx`

Expected: PASS.

### Task 3: Full Verification

**Files:**
- No source edits expected.

- [ ] **Step 1: Run all tests**

Run: `npm test -- --run`

Expected: all test files pass.

- [ ] **Step 2: Run lint**

Run: `npm run lint`

Expected: exits with no errors.

- [ ] **Step 3: Run production build**

Run: `npm run build`

Expected: Next.js build completes successfully and lists the static routes.
