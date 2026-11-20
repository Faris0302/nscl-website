# NSCL website (GSAP rebuild) — project notes

Corporate site for National Steel Complex Limited (NSCL), Port Bin Qasim, Karachi. This folder is
**NSCL Final Draft-GBNet**, the chosen final design (the "Plain" variant without the network
background was dropped). All refinements happen here.

## Stack
- React 19 + TypeScript, Vite 6, Tailwind CSS v4 (`@tailwindcss/vite`, tokens in `@theme` in `src/index.css`)
- GSAP 3.15 (ScrollTrigger, SplitText, Flip, `@gsap/react` `useGSAP`) via `src/lib/gsap.ts`
- Three.js (lazy-loaded) for the DRI 3D scene, react-router-dom 7
- `npm run dev` (port 3000), `npm run build`, `npm run lint` (tsc --noEmit)
- `SINGLE=1 npx vite build` makes a one-file build with HashRouter (`__HASH_ROUTER__`), used for previews

## Design system
- Palette tokens (100 = darkest, 900 = lightest): `sky-light`, `blue-green`, `deep-space` (page ground #01131c),
  `amber-flame` (#ffb703), `princeton` (orange #fb8500). Extra orange-red used in the hero: #e8401c
- Fonts: Barlow Condensed (display, uppercase), Inter (body), IBM Plex Mono (labels: `mono-label`, `eyebrow`)
- Base page colours are deliberately **outside** `@layer base` in `index.css` so host wrappers can't override them
- Images: WebP in `src/assets/img`, loaded through `img[...]` from `src/lib/img.ts`; keep files small (~1100 px)

## Page motion (`src/components/Motion.tsx` → `usePageMotion`)
- Attributes: `data-split`, `data-reveal`, `data-count` (+ `data-decimals`, `data-suffix`, `data-group`), `data-parallax`
- Refreshes ScrollTrigger after mount, on load and whenever the page height changes; end-of-page fallback reveals anything left hidden
- Use `gsap.fromTo` with explicit end values for reveals (a plain `from()` read a half-faded style and left partner cards invisible)
- Don't put Tailwind's blanket `transition` on elements GSAP fades; use e.g. `transition-[translate,border-color]`

## Key features
- **Home:** drone video hero (`src/assets/video/hero.mp4`, phone version `hero-mobile.mp4`, captions cropped out);
  heading "Forging the future of steel" uses the heat sequence: each word flares white-hot then cools to
  yellow #ffc637 → amber #ffb703 → orange-amber #ff9e2f → orange #fb8500 → orange-red #e8401c ("steel", filled)
- **Dual node network** (`NetworkBackground.tsx`): fixed canvas behind every page with two networks that never link
  to each other: gold #E9B85A → bronze #8A5A26, and mustard #E1AD01 → rust #B7410E (fewer points, slower).
  No mouse interaction. Solid section bands are slightly see-through (`/70`) so it shows through; the canvas is
  clipped at the footer's top edge (no network behind the footer)
- **Footer:** NSCL watermark (princeton, 17%) sits bottom-left under the brand + quick-links columns
- **DRI Technology:** pinned 5-step scroll story driving `src/three/FurnaceScene.ts`, a MIDREX plant with hot transport
  (charge hopper, seal leg, reduction furnace, bustle ring, top gas duct + scrubber, reformer, PDC, EAF feed bin,
  bypass to quench tank, EAF feed leg, EAF, ladle, slag car, charge bucket). Camera shots are in `processShots`
- **Leadership:** AECL-style expanding portrait gallery (hover widens a panel, colour + short bio), biography dialog with
  auto-hiding scrollbar (`.scroll-fade`). Board row (Chairman, CEO) centred and slightly larger; Core team in rows of four.
  Data in `src/data/leaders.ts` (CFO is "Owais Habib")
- **Our Journey:** 7 phases in `src/data/company.ts`, gallery + lightbox; Phase 02 uses the three plant illustrations
- **Our Collaborations:** 12 partner logos on white panels (layout A), area-balanced sizing in `OurCollaboration.tsx`
- Chatbot (scripted, no AI service), site search, back-to-top; forms: Formspree (contact), SplitForms (careers) in `src/data/site.ts`

## Pending review (leave as is until told)
- Phase 02 dates (2006–2008) overlap Phase 01 (2007)
- Project 03 (Forward Integration) text on the Projects page

## Working preferences
- Show a preview before adding new features to the site
- Don't build a zip after every change; ask first
- Zip naming: "NSCL Final Draft-GBNet NN" (next after 02 is 03); exclude `node_modules` and `dist`
