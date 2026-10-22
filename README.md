# Jio Creative Labs — Reimagined

An unofficial recruitment-assessment website concept. This is not an official Jio website or a representation of commissioned client work.

## Run

Use Node.js 20.19+ or 22.12+ and npm.

```powershell
cd E:\jiotech\jcl-website-reimagined
npm install --cache .npm-cache
npm run dev
```

Open the Local URL printed by Vite. It selects another port when 5173 is occupied.

```powershell
npm run build
npm run preview
```

The production output is `dist/`. All source files, dependencies, npm cache, build outputs, and QA files are within this folder. The sibling `jcl-flow` project was not modified.

## Design

“Creativity without limits”: oversized Space Grotesk typography, deep near-black, electric lime, warm editorial pauses, and selective pink/cyan/violet. An original CSS ribbon sculpture gives the hero depth without WebGL. Four original typographic compositions make the portfolio independent of stock photography or externally hosted media. Fonts are bundled locally through Fontsource.

The reference was inspected in a rendered browser on 22 October 2026: https://www.jiocreativelabs.com/. Its creative/disruptive/innovation messaging, core services, advertising categories, navigation, contact and careers destinations inform this reinterpretation. No awards, client endorsements, metrics or campaign claims have been invented.

## Stack and organization

React 19, TypeScript, Vite, Tailwind CSS 4, Motion for React, Lucide React. `src/main.tsx` contains typed service/project data, reusable brand/artwork/reveal components and page interactions. `src/CustomCursor.tsx` handles the pointer overlay without React rerenders on movement. `src/styles.css` provides the responsive visual and motion system. `public/favicon.svg` is an original concept favicon, not an official logo asset.

## Completed sections and interactions

- Sticky header, active-section indicators, scroll progress, normal smooth anchor navigation and mobile overlay navigation.
- Staggered hero reveal, desktop pointer parallax and selectable keyword color changes.
- Editorial studio introduction.
- Explore joins the eight service descriptions with four original concept projects. Four desktop capability selectors and five category filters share one selection state; choosing either updates the featured concept and service detail. The All view shows all four projects.
- On smaller screens, one horizontal category selector sits above the active capability description and featured artwork.
- The concept gallery uses one large featured artwork and an asymmetric supporting gallery for the All view. Project dialogs support Escape/backdrop/button dismissal and native focus restoration.
- Mainline, digital and brand-strategy advertising capabilities.
- Idea Machine: three moods × three media, all nine combinations functional and labeled as a visual experiment.
- Three illustrative editorial notes; official Instagram and LinkedIn links in the footer.
- Contact and careers CTAs using destinations verified from the official website.
- Footer navigation and assessment-only disclosure.
- Reduced-motion support in Motion and CSS, visible focus styles, skip link, mobile-menu focus cycling and Escape dismissal.
- Fine-pointer custom cursor: cycling idle color and orbit, link arrow, Explore marker, artwork VIEW state, and quick click compression. Select contact CTAs move slightly toward the pointer; artwork layers respond gently to pointer position and breathe at idle. The overlay is non-interactive, restores native cursor over dialogs and form controls, and is disabled on touch or reduced-motion devices.

## Validation

- Dependency installation succeeded; npm reported zero vulnerabilities at installation.
- `npm run build` passed TypeScript and Vite production compilation.
- `npm run dev` served the page successfully in the browser.
- Browser checks: Explore navigation anchor, capability-to-gallery and filter-to-capability synchronization, all four concept categories, project modal opening/Escape dismissal, all nine Idea Machine combinations, mobile menu open/anchor navigation/close, and mobile project dialog.
- Responsive iframe checks at 1440, 1024, 768, 390 and 375 pixels: no horizontal document overflow at any width. Mobile Explore and tablet concept layouts visually inspected. The scrollbar consumes 15 pixels of the iframe's inner width on the test host.
- No console warnings or errors captured during interaction checks.
- Cursor browser checks: link, Explore, contact CTA, and artwork states; capability accent, magnetic displacement, artwork parallax variables, modal opening/Escape close, pointer-events passthrough and console. Touch and OS reduced-motion were verified by CSS/media-query logic; physical device and OS emulation were unavailable in this browser session.
- `qa/responsive.html` is a development-only viewport harness; it is not included in the production entry build.

## Limitations and deferred functionality

No backend, authentication, analytics, contact submission or external AI service. Contact and careers open official external destinations; their continued availability is outside this project. No live social feed, real client case studies or testimonials are reproduced; editorial notes and portfolio entries are clearly marked illustrative/concept. No video or WebGL is needed. No public deployment was performed. Responsive testing used a desktop browser iframe, not physical devices; reduced-motion support was code-checked, not OS-setting tested.

Jio and Jio Creative Labs names belong to their respective owners. The reimagined visual treatments and proposed copy are assessment material only.
