# Anime

A small Vite-based demo that shows a simple staged animation using SVG assets and minimal JavaScript. The app loads three SVGs (`base.svg`, `star.svg`, `text.svg`) and runs a short timeline-style animation on page load. Controls are provided to loop, restart, and scrub frames.

---

## Table of contents

- Project overview
- Prerequisites
- Quick start (run locally)
- Project structure
- How the animation works
- Customization
- Troubleshooting
- License

---

## Project overview

This repository contains a tiny front-end animation demo built with Vite. It demonstrates:

- Loading local SVG assets via ES module imports
- A simple timeline (frames) controlled in JavaScript
- Class-driven CSS transitions and animations

The app is intentionally minimal and uses no bundler-specific APIs beyond Vite's default behavior for static assets.

## Prerequisites

- Node.js (recommended: use LTS) — tested with Node 24.x
- pnpm (recommended) or npm/yarn (instructions below). If you don't have `pnpm`, you can install it with npm:

```bash
npm install -g pnpm
```

Optional but recommended:
- nvm (Node Version Manager) to manage Node versions: https://github.com/nvm-sh/nvm

## Quick start (run locally)

1. Clone the repository (if you haven't already):

```bash
git clone https://github.com/sivadhanush/Anime.git
cd Anime
```

2. Install dependencies with pnpm:

```bash
pnpm install
```

If you prefer npm or yarn, use `npm install` or `yarn` instead. The project only depends on `vite` as a devDependency.

3. Run the dev server:

```bash
pnpm run dev
```

This will start Vite and print a local URL (usually `http://localhost:5173`). Open that URL in a browser to view the animation.

4. Build for production:

```bash
pnpm run build
```

5. Preview the production build locally:

```bash
pnpm run preview
```

---

## Project structure

```
/ (repo root)
├─ index.html          # app container that loads /src/main.js
├─ package.json        # scripts and deps
├─ public/             # static assets (SVGs)
│  ├─ base.svg
│  ├─ star.svg
│  └─ text.svg
├─ src/
│  ├─ main.js          # app logic: loads svgs, sets up timeline controls
│  └─ style.css        # styling and animation classes
└─ README.md
```

Notes:
- SVGs are imported in `src/main.js` via bare imports like `import baseSvg from "/base.svg";` — this resolves to `public/base.svg` with Vite.
- The JavaScript sets up a small frame-based timeline (0..3) and toggles CSS classes to transition between stages.

## How the animation works

Key points from `src/main.js` and `src/style.css`:

- On `window.load`, `playAnimation()` runs which steps through frames with timeouts.
- `setFrame(n)` adds/removes CSS classes to `.star`, `.base-fill`, `.grouped-elements`, `.text`, and `.animation-container`.
- CSS handles transitions/animation using classes like `.animate-star`, `.fill-animate`, `.move-up`, `.reveal`, and `.fade-out`.
- Controls allow looping (reloads the page), restarting, and scrubbing via a range input.

## Customization

- Change timing and easing in `src/main.js` (timeouts inside `playAnimation`) or in `src/style.css` (transition durations and keyframes).
- To reveal the `base` SVG from bottom to top while fading in, edit the `.base` CSS (already configured in the project):

```css
.base {
	transform: translateY(24px);
	opacity: 0;
	animation: reveal 800ms cubic-bezier(.2,.9,.2,1) forwards;
}
```

You can add `animation-delay` to stagger multiple elements.

## Troubleshooting

- If `pnpm run dev` fails with a Node version error, ensure you have a compatible Node version installed. Use `node --version` to check. If needed, install an LTS version using `nvm`:

```bash
nvm install --lts
nvm use --lts
```

- If assets don't load (404s), ensure `public/` contains `base.svg`, `star.svg`, and `text.svg` and that the imports in `src/main.js` use the correct paths (`/base.svg`).

- If you see stale output in the browser, restart the dev server and clear the browser cache or use an incognito window.