# Portfolio reference design audit

## Scope and method

I reviewed nine portfolio sites, stayed on those domains, and followed no outbound links. I visually checked **55 retained screenshots**: the original 48 plus seven captures of tedawf.com. The new captures cover Home and Projects at 1440px and 390px, plus Blog, Contact, and one article at 1440px. The images and capture notes are in [`reference-screenshots/`](reference-screenshots/).

The assessment uses the UI/UX lenses for hierarchy, layout, typography, color, interaction detail, writing, and accessibility. It is a visual review, not a keyboard or screen-reader audit. “Tier” measures usefulness as a redesign reference, not absolute site quality.

## Direct reference — Ted Awf

**Design style:** White canvas, dark Inter body text, a Calistoga display face, compact lowercase text navigation, and a centered content column capped at about 704px. The home page starts with a small portrait beside a short first-person introduction, then a rounded work-history panel. Projects use 12px-radius outlined cards, fixed-height screenshots, compact descriptions, technology chips, and dark source buttons. The Blog and Contact pages use the same type and restrained borders; the article switches to a narrower reading column with plain section headings.

**Chrome DevTools review:** Captured Home and Projects as full-page screenshots at 1440px and 390px, plus Blog, Contact, and a long-form article at 1440px. Inspected DOM headings, computed type/color tokens, navigation, image bounds, and card geometry. At desktop, the project grid is two columns with cards about 344×417px; at 390px it becomes one column. At mobile the portrait precedes the title, the navigation stays inline, and cards retain their spacing. Screenshots are in [`reference-screenshots/tedawf/`](reference-screenshots/tedawf/).

**Strengths:** Friendly identity without a large brand lockup, readable content hierarchy, generous but controlled whitespace, and clear card boundaries. The same visual language works for profile, projects, archive, contact, and long-form writing.

**Risks:** The floating support widget obscures content in the reviewed screenshots; the archive and contact features are outside this portfolio's requested scope. The project-card image treatment depends on actual screenshots, which are not available for Rahul's projects, so it should not be fabricated.

**Use for this redesign:** Borrow the typography, compact nav, profile-first hero, subtle borders, rounded panels, and project-card rhythm. Keep only `/` and `/projects`, preserve the complete evidence-led project write-ups, use Rahul's portrait, and omit the chat widget, blog, education tab, and contact page.

## Tier 1 — Best sources for the redesign

### 1. Tania Rascia — warm editorial structure

**Design style:** A warm cream paper-like canvas, nearly black text, berry/pink links, fine beige rules, and soft bordered chips/cards. A compact left rail anchors the site with a wordmark, personal blurb, four primary destinations, and quiet social links. Friendly small illustrations and emoji-like category marks make the site feel maintained by a person. Rounded sans-serif typography keeps the large archive approachable rather than corporate.

The home page layers a short first-person introduction and career timeline with latest posts, shelves, series, and a small project grid. The About page deliberately expands into contact, “now,” tools, publications, and personal interests. Blog discovery comes from years, topics, shelves, and series; the article template adds a table of contents, code, tables, and highlighted examples.

**Screenshot-by-screenshot review:**
- [Home](reference-screenshots/taniarascia/001-home.jpg): Intro and timeline lead; lower sections expose latest writing, curated shelves, series, and projects. Strong model for a human home page, though this is much longer than the requested concise homepage.
- [About](reference-screenshots/taniarascia/002-me.jpg): Portrait and personal copy begin the page; contact, current activities, tools, publications, books, podcasts, talks, and miscellaneous lists make the profile unusually complete. Borrow the specificity, not the page length.
- [Projects](reference-screenshots/taniarascia/003-projects.jpg): Route returned HTTP 200 but rendered blank. It is evidence of an unavailable page at capture time, not a design reference.
- [Blog](reference-screenshots/taniarascia/004-blog.jpg): A year-grouped archive with dates, icons, and topic labels. Dense, but its repeated row pattern is easy to scan.
- [Topics](reference-screenshots/taniarascia/005-topics.jpg): Alphabetical topic groups and post counts turn a large archive into a browsable index; light chip borders provide structure without heavy cards.
- [Article](reference-screenshots/taniarascia/006-apache-echarts-react.jpg): Narrow reading column, sticky-feeling side navigation/contents, code blocks, tables, and section headings show how technical detail can remain readable.

**Strengths:** Personal voice; clear separation between profile, projects, and writing; durable archive navigation; long-form content is structured rather than flattened into one text wall.

**Risks:** The archive and About page are much larger than this portfolio needs. Preserve readable line length and contrast, and make any persistent rail collapse cleanly on mobile.

**Use for this redesign:** Primary reference for content architecture, plainspoken writing, warm restraint, and evidence-led project articles.

### 2. Brittany Chiang — wayfinding and portfolio scanability

**Design style:** Deep navy background, cool gray body text, pale headings, muted teal links and pill tags. A fixed left identity/navigation rail balances a long right content column. Experience is chronological, projects use compact media-plus-description rows, and writing uses small thumbnails with dates. The archive switches to a ruled table with year, project, work mode, stack, and link columns.

**Screenshot-by-screenshot review:**
- [Home](reference-screenshots/brittanychiang/001-home-live.png): A concise identity block, section navigation, experience chronology, project list, and writing feed form one coherent portfolio page.
- [Project archive](reference-screenshots/brittanychiang/002-archive.jpg): Dense but systematic table rows make a large body of work comparable without repeating oversized cards.
- [About section](reference-screenshots/brittanychiang/003-about-section.png): First-person bio explains the work focus and adds personal details; body copy is readable at desktop size.
- [Experience section](reference-screenshots/brittanychiang/004-experience-section.png): Dates sit in a separate column from role, employer, description, and skill tags, making career progression quick to scan.
- [Projects section](reference-screenshots/brittanychiang/005-projects-section.png): Small previews lead each project row; concise descriptions and stack labels carry the detail.
- [Writing section](reference-screenshots/brittanychiang/006-writing-section.png): Thumbnail, date, and title form a repeatable editorial list.

**Strengths:** Strong persistent wayfinding, chronology, compact metadata, and distinct destinations for projects and writing.

**Risks:** The dark-navy/teal-pill look is common among developer portfolios and would feel too close to a conventional template if copied wholesale. The 740px section captures show horizontal overflow, so the fixed-rail/two-column desktop layout needs a deliberate responsive transformation. Small muted copy and tags also deserve a contrast check.

**Use for this redesign:** Borrow the information hierarchy, nav clarity, role/date metadata, and an optional compact project archive, not the exact dark theme.

## Tier 2 — Strong selective influences

### 3. Bradley Ziffer — art-directed case studies

**Design style:** Editorial white space, black serif display typography with occasional italic emphasis, small sans-serif metadata, thin separators, and highly composed project imagery. The homepage is a collage of project tiles, a recent-work timeline, and personal visual experiments. Case-study pages use a large lead visual, title, year and disciplines, then alternate screenshots, explanatory text, diagrams, metrics, and process sections.

**Screenshot-by-screenshot review:**
- [Home](reference-screenshots/bradleyziffer/001-home.jpg): A short design statement leads into asymmetrical project images; an experience table and personal visual section add range without a conventional card grid.
- [Amazon](reference-screenshots/bradleyziffer/002-Amazon.jpg): Long-form case study organized around questions and phases, with quantified outcomes, annotated UI, diagrams, and process evidence.
- [Amazon AI](reference-screenshots/bradleyziffer/003-Amazon-AI.jpg): Alternating product images and text, side metadata, metrics, and diagrams turn a complex system into a visual narrative.
- [Acorns](reference-screenshots/bradleyziffer/004-Acorns.jpg): Green product palette and a varied gallery of app screens, brand work, and mockups give the case study a distinct identity.
- [Acorns alternate route](reference-screenshots/bradleyziffer/005-Acorns-hidden.jpg): Near-duplicate Acorns presentation with substantially the same title and image set; it adds little to the portfolio architecture.
- [pgLang](reference-screenshots/bradleyziffer/006-pgLang.jpg): A restrained lead banner gives way to vivid red/blue art, publication imagery, and a concise role/year/disciplines summary.

**Strengths:** Best reference for project-specific art direction, visual evidence, and metadata that explains the author's role. Pages feel authored rather than generated from one reusable card.

**Risks:** The approach depends on strong original imagery and careful art direction. Copying its image density without equivalent evidence would make this engineer's portfolio feel decorative or misleading; duplicate project routes should not be emulated.

**Use for this redesign:** Borrow the case-study rhythm and role/context/evidence labels. Keep visuals tied to actual diagrams, outputs, or screenshots from the work.

### 4. Tom Weightman — quiet editorial personality

**Design style:** Bright white canvas, centered wordmark and tiny horizontal navigation, narrow text measure, modest black headings, light gray body copy, and almost no container decoration. Biography, notes, articles, photography, and London galleries are separate destinations. Photography supplies most of the color and emotional texture.

**Screenshot-by-screenshot review:**
- [Home](reference-screenshots/tomweightman/001-home.jpg): Short career summary and selected work are separated by thin rules and unusually large blank intervals.
- [About](reference-screenshots/tomweightman/002-about-me.jpg): Company and product images give the biography a visual résumé feel; testimonials, skills, and awards continue below.
- [Blog](reference-screenshots/tomweightman/003-blog.jpg): Minimal title/date list; the content itself is the focus, not a card interface.
- [Article](reference-screenshots/tomweightman/004-blog-2025-6-7-everything-doesnt-need-fixing.jpg): Clear article title/date, calm single-column text, restrained subheads, and simple previous/next navigation.
- [Photography](reference-screenshots/tomweightman/005-photography.jpg): Uneven image sizes create a quiet gallery rhythm; large landscape images alternate with smaller triptychs.
- [Lone Figures](reference-screenshots/tomweightman/006-lone-figures.jpg): A disciplined two-column photographic grid lets the images define the page.
- [Notes](reference-screenshots/tomweightman/007-notes.jpg): Chronological writing list with generous separation and no promotional treatment.

**Strengths:** Human tone, restraint, and a natural boundary between professional work and personal interests. The photo pages have a recognizable visual rhythm.

**Risks:** Text and labels are very small/light in places, and the home/about pages leave large stretches of unused space. The restraint works only if legibility and content density are tuned for the target viewport.

**Use for this redesign:** Borrow the personal voice and separation of work from interests; keep text darker/larger and control whitespace.

### 5. Anthony Fu (antfu.me) — content-first open-source profile

**Design style:** White/light canvas with a subtle dotted pattern, small hand-drawn mark, compact top navigation of text and icons, dark gray text, and understated links. A single centered reading column carries a concise bio and inline links to work. Section pages favor lists and light structure over cards; projects are grouped under faint oversized category labels. A light/dark toggle is part of the navigation.

**Screenshot-by-screenshot review:**
- [Home](reference-screenshots/antfu/001-home.jpg): Direct first-person introduction, project logos/links, open-source roles, personal interests, social links, and sponsor calls-to-action. Rich but link-heavy.
- [Posts](reference-screenshots/antfu/002-posts.jpg): Year watermarks organize a long archive; subtle type and pale dates keep it quiet but reduce contrast.
- [Projects](reference-screenshots/antfu/003-projects.jpg): Large pale ecosystem headings group many small project links into a directory rather than a portfolio grid.
- [Talks](reference-screenshots/antfu/004-talks.jpg): Talk titles, venues, dates, and watch/slides/PDF actions form a practical index.
- [Photos](reference-screenshots/antfu/005-photos.jpg): Dense four-column image mosaic turns photography into a visual destination.
- [Demos](reference-screenshots/antfu/006-demos.jpg): Screenshot-led cards combine a project image, short explanation, date, and relevant source/project links.
- [Use](reference-screenshots/antfu/007-use.jpg): Hardware, streaming, gaming, and development tools are presented as nested categorized lists; faded/struck-through older items preserve history but are low contrast.

**Strengths:** Minimal overhead, straightforward navigation, genuine personal copy, and a useful division among projects, talks, writing, photos, and tools.

**Risks:** Many destinations compete in the top bar; the Projects directory is less prominent than a dedicated curated index; muted text and pale year labels need contrast care.

**Use for this redesign:** Borrow the concise introduction and matter-of-fact voice. Curate fewer destinations and give the three personal projects stronger visual priority.

## Tier 3 — Useful patterns, not full design references

### 6. Tim Gesemann — compact skills and project proof

**Design style:** Near-white and pale warm-gray sections, black widely letter-spaced headings, centered micro-introduction, colorful technology marks, and a vertical sequence of white project cards. The cards use generous internal space and short descriptions; technology tags are very faint. A graph-paper texture fills a large gap before the contact section.

**Screenshot-by-screenshot review:**
- [Home](reference-screenshots/tim-gesemann/001-home-live.png): The full one-page flow shows intro, skills, projects, grid-textured spacer, contact form, and legal footer. The initial cookie prompt was dismissed with “Not today” before this clean capture.
- [Skills](reference-screenshots/tim-gesemann/002-skills.png): Oversized technology logos act as a visual skills index; the group is quick to scan but says little about proficiency.
- [Projects](reference-screenshots/tim-gesemann/003-projects.png): Project cards use strong names and compact plain-language descriptions; muted stacks recede too far.
- [More projects](reference-screenshots/tim-gesemann/004-project-details.png): Multiple entries repeat the same spacious card pattern, making the full list long without much change in hierarchy.
- [Contact](reference-screenshots/tim-gesemann/005-contact.png): Clear form grouping, but the letter-spaced copy and placeholder-led fields are less readable than the project headings.

**Strengths:** Skills and projects appear early, and the contact route is obvious.

**Risks:** Faint supporting labels, repeated oversized cards, a very tall empty grid area, and an initial consent prompt that obscures the intro. The consent prompt was a state of the visited site, not included in the final clean screenshots.

**Use for this redesign:** Borrow short project descriptions and clear contact access. Do not reproduce the empty spacer or use logos as the only evidence of skills.

### 7. CodeWonders — dark grid and glitch identity

**Design style:** Deep teal-to-violet gradient, fine grid overlay, a small star-like mark, large tracked uppercase display text with a chromatic/glitch edge, and oversized ghost lettering behind content. Geometric sans-serif text and top navigation frame a personal profile. About uses a vertical timeline; Projects and Articles become long lists/cards; Contact is a dark form page.

**Screenshot-by-screenshot review:**
- [Home](reference-screenshots/codewonders/001-home.jpg): Large name and two personal paragraphs sit on a quiet grid/gradient; bold inline links and social icons point to the next destinations.
- [About](reference-screenshots/codewonders/002-about.jpg): Engineering, Product, and Design sections use a vertical timeline with right-aligned destination links; the same oversized background lettering continues behind long copy.
- [Projects](reference-screenshots/codewonders/003-projects-live.png): The 725px capture stacks a very long project directory with thumbnails and compact labels; useful breadth, but the repeated dark blocks and tiny text make scanning tiring.
- [Contact](reference-screenshots/codewonders/004-contact-live.png): Large “Contact” title and simple form create a clear destination; a fixed social strip crosses the form fields at this captured width, obscuring controls.
- [Articles](reference-screenshots/codewonders/005-articles-live.png): Category filters and image-led post cards provide a clear content archive, but the list is very long and several cards have large dark/empty image areas.

**Strengths:** Distinctive authored identity, clear destination labels, and content categories that map cleanly to a portfolio.

**Risks:** Display effects and background lettering compete with copy; small text and wide letter spacing hurt reading comfort. The fixed social strip over the contact form is the clearest responsive/accessibility concern in the selected screenshots.

**Use for this redesign:** If a signature motif is desired, use one subtle texture or mark. Avoid glitch text, giant background words, low-contrast body copy, and fixed overlays above controls.

### 8. Sawad — bold Framer-template architecture

**Design style:** Black background, huge condensed all-caps headings with the second word ghosted in dark gray, a persistent white profile card with red portrait/orange route motif, and a floating pill-shaped icon nav. Sections are organized into Home, Tools, Projects, Experience, and Thoughts. Framer/template promotions remain fixed around the page edges.

**Screenshot-by-screenshot review:**
- [Home](reference-screenshots/sawad/001-home.jpg): The identity card and small icon nav occupy one corner while most of the page remains empty; template badges and a tutorial button stay visible.
- [Tools](reference-screenshots/sawad/002-tools.jpg): The same sparse shell persists, with little content visible in the capture; the template controls dominate the viewport.
- [Projects](reference-screenshots/sawad/003-projects.jpg): Oversized “Recent Projects” heading, persistent profile card, and vertically stacked thumbnail/title rows create a clear project destination.
- [Experience](reference-screenshots/sawad/004-experience.jpg): “12 Years of Experience” anchors employer/role summaries; the fixed profile card and template badges remain alongside the content.
- [Thoughts](reference-screenshots/sawad/005-blog.jpg): Large “Design Thoughts” heading and repeated title/summary/date/read-time blocks establish a writing archive.
- [Article](reference-screenshots/sawad/006-blog-how-to-create-an-effective-design-portfolio.jpg): Feature image and oversized title lead into a conventional long article, still sharing the fixed profile/template shell.

**Strengths:** Separate portfolio destinations, clear page labels, and a strong headline scale. Project and experience lists are easy to locate.

**Risks:** Large dead areas on Home/Tools, repeated fixed profile chrome, and visible “Use Template,” “More Templates,” and “Made in Framer” controls make the design feel unfinished and not personally authored. The dark-on-dark heading echo also weakens secondary text.

**Use for this redesign:** Borrow only the simple destination structure and selective large section headings. Avoid template chrome, persistent profile-card dominance, and empty space used as decoration.

## Recommended synthesis

Use **Ted Awf's profile-first layout and restrained cards** as the primary visual reference, paired with **Tania Rascia's plainspoken content structure**, **Brittany Chiang's wayfinding**, and **Bradley Ziffer's evidence-led case-study pacing**.

Keep the homepage to Rahul's introduction and Intangles experience; keep all three personal project write-ups together on `/projects`. Use a white canvas, dark sans-serif body text, a bold serif display face, compact navigation, real portrait photography, and softly outlined panels. Keep evidence and limitations visible. Do not invent project screenshots or copy the reference site's chat widget, education tab, blog, or extra routes. Preserve visible focus, readable contrast, mobile reflow, and truthful claims.

This file documents screenshots and design recommendations, not implementation details. The redesign was subsequently implemented on the local `portfolio-redesign` branch; no push or deployment has been run.
