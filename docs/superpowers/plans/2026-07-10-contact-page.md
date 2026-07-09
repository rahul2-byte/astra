# Contact Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Update the contact page to a centered glass-panel contact grid inspired by the reference image while preserving Rahul's four contact methods.

**Architecture:** Modify the existing server component at `src/app/contact/page.tsx` only. Keep contact data sourced from `src/content/site.ts`, use `lucide-react`, and verify through the existing core page test suite.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind CSS utilities, Vitest, Testing Library, `lucide-react`.

---

## File Structure

- Modify `src/app/contact/page.tsx`: render centered hero, four glass cards, and resume CTA.
- Modify `src/components/__tests__/core-pages.test.tsx`: assert the new heading, best-for card content, phone card, and resume CTA.

### Task 1: Contact Page Test Coverage

**Files:**
- Modify: `src/components/__tests__/core-pages.test.tsx`

- [ ] **Step 1: Write the failing test updates**

Replace the contact assertion in `renders resume, contact, and writing utility pages` with:

```tsx
render(<ContactPage />);
expect(screen.getByRole("heading", { name: /get in touch/i })).toBeInTheDocument();
```

Add these assertions inside `renders Rahul's final contact links and resume URL`, after the phone link assertion:

```tsx
expect(screen.getByText(/best for: recruiter outreach and direct role conversations/i)).toBeInTheDocument();
expect(screen.getByText(/best for: professional networking and career updates/i)).toBeInTheDocument();
expect(screen.getByText(/best for: viewing project code and implementation samples/i)).toBeInTheDocument();
expect(screen.getByText(/best for: time-sensitive recruiter coordination/i)).toBeInTheDocument();
expect(screen.getByRole("link", { name: /download technical resume/i })).toHaveAttribute(
  "href",
  "/ML_Engineer_resume.pdf",
);
```

- [ ] **Step 2: Run the targeted test to verify it fails**

Run: `npm test -- --run src/components/__tests__/core-pages.test.tsx`

Expected: FAIL because the page still renders `Contact` instead of `Get in Touch`, and the card notes/resume CTA are missing.

### Task 2: Contact Page Implementation

**Files:**
- Modify: `src/app/contact/page.tsx`

- [ ] **Step 1: Implement the contact card grid**

Use this component structure in `src/app/contact/page.tsx`:

```tsx
import { Code2 as Github, Link as Linkedin, Mail, Phone } from "lucide-react";
import { site } from "@/content/site";

const contactMethods = [
  {
    title: "Email",
    href: `mailto:${site.email}`,
    label: site.email,
    note: "Best for: recruiter outreach and direct role conversations.",
    Icon: Mail,
  },
  {
    title: "LinkedIn",
    href: site.linkedin,
    label: "linkedin.com/in/-rahul-singh22",
    note: "Best for: professional networking and career updates.",
    Icon: Linkedin,
  },
  {
    title: "GitHub",
    href: site.github,
    label: "github.com/rahul2-byte",
    note: "Best for: viewing project code and implementation samples.",
    Icon: Github,
  },
  {
    title: "Phone",
    href: site.phoneHref,
    label: site.phone,
    note: "Best for: time-sensitive recruiter coordination.",
    Icon: Phone,
  },
];

export default function ContactPage() {
  return (
    <main className="section-shell py-20 md:py-24">
      <section className="mx-auto max-w-5xl text-center">
        <p className="section-label">Contact</p>
        <h1 className="font-display mt-4 text-5xl font-bold leading-tight tracking-tight text-slate-900 md:text-6xl">
          Get in Touch
        </h1>
        <p className="mx-auto mt-5 max-w-3xl text-lg leading-8 text-slate-800 md:text-xl">
          For recruiter outreach, ML roles, AI/RAG opportunities, and technical interviews, use the direct links below.
        </p>
      </section>

      <section className="mx-auto mt-12 grid max-w-6xl gap-5 md:grid-cols-2 xl:grid-cols-4">
        {contactMethods.map(({ title, href, label, note, Icon }) => (
          <article key={title} className="glass-panel flex min-h-56 flex-col p-7 text-left">
            <div className="flex items-center gap-3 text-slate-950">
              <Icon className="h-7 w-7" strokeWidth={1.7} />
              <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
            </div>
            <a className="mt-7 text-[#2f5ea4] underline underline-offset-4 hover:text-slate-950" href={href}>
              {label}
            </a>
            <p className="mt-7 text-base leading-7 text-slate-800">{note}</p>
          </article>
        ))}
      </section>

      <div className="mt-12 flex justify-center">
        <a className="btn-primary bg-[#0b66d8] text-base hover:bg-[#0958ba]" download="Rahul-Singh-ML-Engineer-Resume.pdf" href={site.resume}>
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
