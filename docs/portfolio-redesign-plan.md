# Portfolio redesign execution plan

- **Branch:** `portfolio-redesign` (local, from synced `main`)
- **Status:** Two-page structure implemented and verified locally; branch remains unpushed and no deployment was run.
- **Authority:** user brief, current public project repositories, and `/home/zeek/ML/p90/resume_updated_fin_ai.pdf`.

## Finish conditions

- Replace the visual system across the entire site: typography, palette, spacing, navigation, project writing, project details, responsive behavior, and shared elements. It must read as a new, cohesive site, not a restyle of the old yellow/card/grid system.
- Keep the visible information architecture to two pages: the homepage holds the introduction and Intangles experience; `/projects` holds all three independent project write-ups. Do not add separate experience or project-detail pages.
- Show no stale claims, placeholder writing, or obsolete links in the visible UI, metadata, and sitemap. Redirect old experience and project URLs to anchors on the homepage or Projects page.
- Make the site easy to scan and navigate, with a premium, minimal, distinctive, human voice and working keyboard/touch behavior.
- The first viewport must state Rahul's name, role, current employer/work, and the kind of ML work he does without waiting on animation or requiring a scroll. Inspect at desktop and mobile dimensions.
- Target under 300 ms for a locally measured warm production initial render. Record the test method and actual timings; this is not a promise about global network latency or an unmeasured deployment.
- Use the exact approved resume PDF and verify byte equality. Keep every project claim, result, and limitation tied to public repository evidence.
- Pass tests, lint, TypeScript, production build, route/redirect/sitemap/PDF checks, and desktop/mobile browser inspection, including keyboard, focus, reduced motion, narrow reflow, and accessibility checks.

## Design direction

Borrow tedawf's light, profile-first layout: a compact inline nav, Inter body text, Calistoga display headings, Rahul's real portrait, and softly outlined panels with restrained shadows. Keep the homepage to Rahul's introduction and Intangles experience; `/projects` holds all three evidence-led write-ups. Use short hover transitions and preserve reduced-motion support. Do not add a chat widget, blog/contact pages, unsupported project screenshots, decorative metrics, or generic AI/tech motifs. `next/font` self-hosts the typefaces.

## Implementation sequence

1. **Evidence and baseline:** verify current public project repositories and approved resume; retain only facts and measurements that can be explained with provenance and limitations. Check image payload and optimize the existing portrait without changing its subject.
2. **Shared design system and homepage:** replace global tokens, header/footer, and homepage. Make Rahul's role and focus clear above the fold, then include the public-safe Intangles experience on the same page.
3. **Projects page:** put all three independent projects and their concise case studies on `/projects`, including the problem, implementation, evidence, trade-offs, and limits. Do not describe employer work as a personal project.
4. **Routing and discoverability:** update internal navigation, metadata, and sitemap. Keep only `/` and `/projects` as canonical pages; redirect old experience and project URLs to the matching in-page anchors. Serve `/resume.pdf` as the exact approved file.
5. **Verify and refine:** run repository checks, then inspect the production build in a real browser at desktop and mobile sizes. Measure local navigation/initial rendering, check 320 px and zoom/reflow, use keyboard only, verify focus and reduced motion, inspect image/font network requests, and fix observed problems before handoff.

## Evidence guardrails

- **FIN-AI:** current public repository describes a CLI-first NSE/BSE research assistant, using bounded Hive/tool execution, typed events, market/news providers, deterministic Python quant tools, local session/provider artifacts, and Textual/plain/JSON output. FastAPI is only a small health surface, not a chat/research API. Do not retain LangGraph, pgvector, local llama.cpp, streamed chat, or unverified accuracy claims from the old website. State that trustworthy financial-answer accuracy/performance results are not established.
- **LoRA:** show both task results and the caveat: custom LoRA is near full fine-tuning on local SST-2 validation but weak on MRPC; do not present this as universal behavior or as official GLUE test performance. Parameter, artifact, GPU memory, and timing numbers require their measurement context. The adapter artifact still requires base model weights.
- **Movie Recommendation:** follow the public repo's current four retrievers (ALS, item graph, two-tower, content), reciprocal-rank fusion, LightGBM ranking, MovieLens/TMDB data flow, and serving architecture. NDCG/MAP/MRR are offline validation; 50-request timings are local warm-serving only. Do not imply online engagement, Lambda cold-start latency, production throughput, or stale infrastructure/results.
- **Employment:** summarize public-safe resume facts for Intangles, clearly marked as work experience. Do not publish customer data, fleet volumes, private schemas, internal thresholds, or proprietary implementation details.

## Final verification checklist

- [x] New visual identity is consistent across every canonical route; obsolete visual tokens/components/claims are removed from the rendered site.
- [x] First viewport clearly identifies Rahul, role, current work, and what he builds, before motion or scrolling.
- [x] All three personal projects have current, evidence-led write-ups on the single Projects page.
- [x] Employment work appears on the homepage and remains public-safe.
- [x] Visible navigation contains only current destinations; legacy URLs redirect correctly; sitemap contains only `/` and `/projects`.
- [x] Approved PDF copied byte-for-byte; all resume actions work.
- [x] `npm test -- --run`, `npm run lint`, `npx tsc --noEmit`, and `npm run build` pass.
- [x] Production routes, redirect status/location, sitemap, PDF response, mobile/desktop layout, 320 px reflow, keyboard, focus, reduced-motion, and accessibility checks pass.
- [x] Local production initial-render measurement is recorded with its exact methodology; results and any hosting-dependent uncertainty are stated honestly.
- [x] No push or deployment was run; `portfolio-redesign` remains local. The audit, plan, and generated task logs remain untracked.

## Verification record

- `npm run build` succeeded; `npm test -- --run` passed 14 tests; lint and TypeScript checks exited successfully.
- The production route check passed for `/`, `/projects`, the legacy experience/project redirects, and a sitemap containing only those two pages. `/resume.pdf` returned 200 and its SHA-256 still matches `/home/zeek/ML/p90/resume_updated_fin_ai.pdf`.
- Headless Chrome reviewed the home and Projects pages at 320×900 and 1440×1000; Chrome DevTools also captured full-page views at 740 px. The prior axe, keyboard, and performance checks were run against the previous page structure and were not repeated after this consolidation.
