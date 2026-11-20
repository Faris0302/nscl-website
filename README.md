# NSCL website — GSAP + Three.js + ScrollTrigger rebuild

React 19 · TypeScript · Vite 6 · Tailwind CSS v4 · GSAP 3.15 (ScrollTrigger, SplitText) · Three.js r187

```
npm install
npm run dev      # http://localhost:3000
npm run lint     # type check
npm run build    # dist/ for Vercel (vercel.json rewrites all routes to index.html)
```

## Status: all 13 pages rebuilt
Home · About Us · Our Leadership · Our Journey · Our Collaborations · Sustainability · Health & Safety · DRI Technology · Products · Projects · Q-Engineering · Careers · Contact Us — same URLs and menu anchors as the current site.

## Before going live
- Forms use the same services as the current site: contact → Formspree (`forms.contact`), careers with CV upload → SplitForms (`forms.careers`), both in `src/data/site.ts`. Send one test of each from the deployed site.
- Job openings are in `src/data/jobs.ts`; edit or empty that list to match real vacancies.
- Content carried over from the current site should be confirmed by NSCL: leadership names/titles, ISO certifications, QES workshop figures.

## Where things are
- `src/three/FurnaceScene.ts` — the Three.js MIDREX plant (shaft furnace, reformer, duct, pellets heating as they sink, rising reducing gas). Camera follows a list of shots blended by a 0–1 progress value.
- `src/components/Furnace.tsx` — lazy-loads Three.js only on pages that use it. Falls back to a photo without WebGL; renders a still frame with reduced motion; pauses when off-screen.
- `src/components/Motion.tsx` — `usePageMotion` wires data attributes: `data-split` (SplitText line reveal), `data-reveal` (batched fade-up), `data-count` (count-up), `data-parallax` (image drift).
- `src/pages/Home.tsx` — pinned 3D hero, scroll-scrubbed ticker, pinned horizontal photo tour with lightbox.
- `src/pages/DriTechnology.tsx` — pinned 4-stage 3D process walk-through, results table with count-ups.
- `src/index.css` — Tailwind theme with the NSCL palette (sky-light, blue-green, deep-space, amber-flame, princeton).
- `src/data/site.ts` — menu, contact details, map links, form endpoints, group companies. `src/data/leaders.ts` and `src/data/company.ts` — leadership bios, journey, partners, values. Photos in `src/assets/img/` (compressed WebP).
- `src/components/Calculators.tsx` — steel, plate rolling and beam weight calculators (Q-Engineering page).
- Pages other than Home load on demand (`React.lazy`); anchor links wait for the page and its pinned sections before scrolling.
