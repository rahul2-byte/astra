# Experience Timeline Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace `/experience` with a polished timeline narrative covering Intangles, FIN-AI, and Movie Recommendation System.

**Architecture:** Keep implementation in `src/app/experience/page.tsx` using local typed arrays for metrics and entries. Update `src/components/__tests__/core-pages.test.tsx` to assert the new heading, entries, metrics, and project links. No new reusable components are needed.

**Tech Stack:** Next.js App Router, React, TypeScript, Tailwind classes, lucide-react, vitest + Testing Library.

---

### Task 1: Experience Timeline Page

**Files:**
- Modify: `src/components/__tests__/core-pages.test.tsx`
- Modify: `src/app/experience/page.tsx`

- [ ] **Step 1: Write the failing test**

Replace the first test in `src/components/__tests__/core-pages.test.tsx` with assertions for the new Experience page:

```tsx
it("renders the detailed timeline experience page", () => {
  render(<ExperiencePage />);
  expect(
    screen.getByRole("heading", { name: /production ml, applied ai, and recommendation systems/i }),
  ).toBeInTheDocument();
  expect(screen.getByText(/machine learning engineer · intangles/i)).toBeInTheDocument();
  expect(screen.getByText(/dbscan \+ loess fuel event detection/i)).toBeInTheDocument();
  expect(screen.getByText(/sub-threshold fuel event detection/i)).toBeInTheDocument();
  expect(screen.getByText(/fin-ai · multi-agent financial intelligence/i)).toBeInTheDocument();
  expect(screen.getByText(/langgraph orchestrator/i)).toBeInTheDocument();
  expect(screen.getByText(/movie recommendation system/i)).toBeInTheDocument();
  expect(screen.getByText(/faiss candidate retrieval/i)).toBeInTheDocument();
  expect(screen.getByText(/95% alert accuracy/i)).toBeInTheDocument();
  expect(screen.getByText(/15% false-positive reduction/i)).toBeInTheDocument();
  expect(screen.getByText(/30\+ hrs\/week reclaimed/i)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /open production ml case study/i })).toHaveAttribute(
    "href",
    "/projects/production-ml-systems",
  );
  expect(screen.getByRole("link", { name: /open fin-ai case study/i })).toHaveAttribute("href", "/projects/fin-ai");
  expect(screen.getByRole("link", { name: /open movie recommendation case study/i })).toHaveAttribute(
    "href",
    "/projects/movie-recommendation-system",
  );
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test -- --run src/components/__tests__/core-pages.test.tsx`
Expected: FAIL because the current page still has the old heading and generic content.

- [ ] **Step 3: Implement page**

Rewrite `src/app/experience/page.tsx` with typed arrays for hero metrics and three timeline entries. Each entry must include context, role, built modules, tools, problems solved, decisions, learnings, outcome, and case-study link.

- [ ] **Step 4: Verify**

Run: `npm test -- --run src/components/__tests__/core-pages.test.tsx`, then `npm test -- --run`, `npm run lint`, and `npm run build`.

---

## Self-Review

- Spec coverage: hero metrics, timeline, Intangles, FIN-AI, Movie Recommendation, links, and tests are covered.
- Placeholder scan: no placeholders.
- Scope: one page plus one test file.
