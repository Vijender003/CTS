# CTS — Senior Review & Rebuild Verification (Round 2)

Premise correction: the application was **already** a production React + Vite app
(`src/`, code-split routes, GSAP + Lenis + lucide-react). Only `legacy/` is HTML/CSS.
This round therefore audited the live React app section-by-section and closed gaps —
no blind HTML→JSX conversion was performed or needed.

## Stack compliance
| Required | Status |
|---|---|
| React + Vite | ✅ 18 + Vite 6, route-level `lazy()` splitting, vendor/motion chunks |
| Tailwind CSS | ✅ **adopted this round** — v4 via `@tailwindcss/vite`, `@theme` palette tokens (`bg-primary`, `text-ink`, `bg-mist/ice/lavender`, `text-coral`, `font-display`…); utilities own layout/state patterns (loaders, empty states, button rows), CSS Modules keep art-directed sections |
| GSAP + ScrollTrigger | ✅ centralized `src/animations/motion.js`, `useGSAP` with context revert on every effect |
| Lenis | ✅ RAF-via-gsap-ticker, ScrollTrigger sync, off on reduced-motion |
| Three.js / R3F | ❌ deliberately omitted — no section materially benefits; SVG/canvas-2D-grade visuals already ship at zero bundle cost |
| Framer Motion / Swiper / Lottie / state lib | ❌ omitted with rationale (GSAP covers motion, no carousels, no global state need) |

## Client-level findings → resolutions
1. **No route feedback** — navigation swaps felt instant/cheap. → Fast GSAP fade/rise page
   transition in `App.jsx` (0.55s, `overwrite:auto`, props cleared, skipped on reduced-motion).
2. **Weak mobile conversion** — nav CTA hides ≤560px, fabs sit low. → `StickyCta` mobile bar
   (appears after hero, suppressed on `/contact` + open menu); fabs lift above it.
3. **Silent talent-form failure** — invalid submit just returned. → Inline errors + `aria-invalid` + focus management.
4. **Flat hero scroll** — entrance only. → Scrubbed ScrollTrigger parallax on the ecosystem visual (cleanup-safe, motion-gated).
5. **Thin social metadata** — og/twitter titles never updated per route. → `useSeo` now sets them.
6. **Dead CSS** — `Cases.module .empty` orphaned after Tailwind empty state. → Removed.
7. **Hardcoded white text on deep-blue selections** (`.chip.on`, accordion icon). → `dark-text` token.

## Preserved invariants (re-verified)
Palette tokens = single source of truth; zero banned hues in `src/`; one `h1` per route;
filters/empty/reset, wizard draft-persistence, Zoey lead capture, FAQ/Org/Service/Article
schemas, sitemap/robots, skip link (hash-safe), focus-visible, `overflow-x: clip`,
`prefers-reduced-motion` coverage (Lenis, reveals, counters, marquee, transitions, parallax).
Zero `console.*` in `src/`. No emojis in UI (Lucide only). Content unchanged from
DESCRIPTION.txt — no invented clients, stats, or testimonials.
