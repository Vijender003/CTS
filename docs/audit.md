# CTS Website — Audit & Rebuild Plan

Source of truth: `./DESCRIPTION.txt` (Cleanomatics Tech Solutions — premium rebuild brief).
Legacy app preserved untouched in `./legacy/` (index.html, styles.css, script.js).

## 1. Legacy inventory

| File | Size | Contents |
|---|---|---|
| `legacy/index.html` | 433 lines / ~36KB | Single-page site: preloader, nav + mobile menu, hero, ticker, manifesto, work (4 projects + filters), canvas field, services→proof, process, lab, studio, insights, contact form, footer |
| `legacy/styles.css` | 495 lines / ~39KB | One global stylesheet: CSS tokens, grain, cursor, nav, hero, work, field, services, process, lab, studio, insights, contact, footer, 3 breakpoints, reduced-motion |
| `legacy/script.js` | 352 lines / ~20KB | Vanilla JS: preloader, clocks, nav state, mobile menu, custom cursor + magnetic, IO reveals, hero parallax, work filters, service→proof switcher, canvas particle field, scramble, form state machine |
| Assets | none | No images, no icons lib, no fonts self-hosted (Google Fonts: Syne / Inter / JetBrains Mono) |
| Deps / build | none | Zero dependencies, no bundler, no router, no CMS, no analytics, no SEO meta beyond title/description |

## 2. What to preserve (behavior & flows)

- Single-scroll narrative with anchored sections; transparent→solid sticky nav; full-screen mobile menu.
- Discipline + domain filtering on work/case lists (fast, animated, accessible `aria-pressed`, empty state + reset).
- Service → proof linkage (select capability → show evidence).
- Multi-state forms (default / error / loading / success / disabled) with inline validation.
- Scroll reveals, magnetic buttons, counters, marquee, canvas field reacting to cursor/scroll/velocity.
- Reduced-motion support, skip link, focus-visible, semantic landmarks.

## 3. What NOT to preserve (corrective findings)

1. **Brand/content mismatch (critical).** The legacy demo was built while `DESCRIPTION.txt` was empty and
   invented a fictional "creative studio" (VYBE, Toolverse, Nexora, Highrises). The brief forbids invented
   clients/stats/claims — all demo content is **dropped** and replaced with real CTS content only.
2. **Monolith stylesheet.** 495-line global CSS → replaced by design tokens + colocated CSS Modules.
3. **No routing.** Single page → multi-route app (Home, About, Services + detail template, Case Studies +
   detail template, Insights + article template, Careers, Contact wizard, 404).
4. **No build/perf pipeline.** → Vite build, route-level code splitting, lazy visuals.
5. **No SEO layer.** → per-route meta/OG/Twitter/JSON-LD, robots, sitemap, schema (Org/Service/FAQ/Article).
6. **Scattered animation code.** → centralized `src/animations/` + hooks (`useReveal`, `useCounter`).
7. **Missing conversion systems.** → 5-step consultation wizard, ROI calculator (estimates labelled),
   Zoey assistant (rule-based), WhatsApp float. WhatsApp number was **not supplied** in the brief:
   single `WHATSAPP_NUMBER` constant in `src/data/content.js`, clearly marked for replacement.

## 4. Rebuild decisions (stack rationale)

- **React 18 + Vite (JS, not TS):** existing logic is plain JS; JS keeps the migration stable. No Next.js/Astro:
  brief recommends them for CMS, but no CMS credentials exist — architecture is CMS-ready (all content in
  `src/data/`) so collections can be swapped to Sanity/Contentful/Strapi later without touching components.
- **Styling: CSS variables + CSS Modules.** Tailwind was considered and rejected: the brief demands a bespoke
  navy/gold editorial system (Playfair Display + Inter) with art-directed asymmetric layouts; utility soup
  would fight that system. Tokens live in `src/styles/tokens.css`.
- **GSAP + ScrollTrigger + @gsap/react** for choreography; **Lenis** for smooth scroll (disabled on
  reduced-motion / touch); **lucide-react** for icons (no emoji). No Three.js (brief: avoid purposeless 3D;
  ecosystem visualization is SVG/canvas-2D), no Framer Motion (GSAP covers all needs), no Swiper (no carousel
  required), no Lottie, no global state lib (local state + URL state suffice).
- **HashRouter** (not BrowserRouter): the deliverable is previewed from static file hosting without rewrite
  rules; hash routing guarantees every route resolves. Swap to BrowserRouter + server rewrites for production.

## 5. Information architecture

Routes: `/` Home (15-section flow) · `/about` · `/services` · `/services/:slug` (8 detail pages from template) ·
`/case-studies` · `/case-studies/:slug` (12 studies from template) · `/insights` · `/insights/:slug` (8 articles) ·
`/careers` · `/contact` (5-step wizard) · `*` 404.

Home flow (§06): Hero → Trust → Problem → Solution Ecosystem → Services → Zoho Ecosystem → Results →
**ROI estimator** (added; required by §19, placed after Results as interactive proof) → Featured Cases →
Process (5-step, horizontal on desktop) → Company Story → Industries (interactive) → Insights → FAQ → Final CTA → Footer.

## 6. Phase tracker (per §37)

- [x] 01 Foundation + design system
- [ ] 02 Global navigation + footer
- [ ] 03 Homepage
- [ ] 04 Services
- [ ] 05 Case studies
- [ ] 06 About + Careers
- [ ] 07 Insights
- [ ] 08 Contact + conversion
- [ ] 09 Animations + interaction
- [ ] 10 SEO + a11y + performance
- [ ] 11 Final QA
