# Wedding Site

Single‑page React app built with Vite and Tailwind. Theme and content follow `plan/plan_1.md` (Maui/Tropical).

## What we accomplished today

- Repo structure
	- Migrated the app to the repository root (`/Wedding`), removed the nested `github/` app for simplicity.
	- Vite + React + Tailwind configured with custom theme (cornsilk, tropical green, plum purple) and fonts (Playfair Display, Montserrat).

- App architecture
	- Switched to a single‑page, section/anchor layout (no router) per the plan.
	- Components: Navbar, WelcomeBanner (+Countdown), OurStory, EventDetails, Activities, PhotoGallery, ParallaxDivider, Footer.
	- Smooth, themed sections with accessible headings and buttons.

- Images: end‑to‑end pipeline
	- Added `scripts/optimize-images.mjs` (Node + sharp + macOS `sips` fallback for HEIC/HEIF).
	- Converts files in `pics/` → `public/gallery/` into WebP + JPEG at 480/768/1200/1800 widths, strips EXIF, respects rotation, avoids upscaling.
	- Generates `public/gallery/index.json` manifest used by the app.
	- Wired the hero to `sandeaigo` and the parallax divider to `LA` optimized outputs.

- Gallery UX
	- Dynamic gallery reads `/gallery/index.json` and renders responsive `<picture>` elements.
	- Updated layout to a responsive masonry (CSS columns) so photos keep their natural aspect ratios.
	- Lightbox opens the largest available rendition; keyboard/ESC close supported.

## Scripts

```bash
npm run dev       # Start local dev server
npm run build     # Production build
npm run preview   # Preview the production build
npm run images:optimize        # Process all images in pics/ → public/gallery
npm run images:optimize:sample # Process a few images (fast sample)
```

Notes:
- On macOS, HEIC/HEIF are converted to JPEG via `sips` before resizing. Other formats are handled directly by `sharp`.
- The gallery reads `public/gallery/index.json`. If you add new images to `pics/`, re‑run the optimize script.

## Project structure (high‑level)

- `index.html` – HTML shell with fonts
- `src/` – React components and app entry
	- `components/` – all sections and UI pieces
	- `App.jsx` – single‑page layout wiring sections together
- `public/gallery/` – optimized images + `index.json` (generated)
- `pics/` – source photos (raw HEIC/JPEG/PNG)
- `scripts/optimize-images.mjs` – optimization pipeline
- `tailwind.config.cjs`, `postcss.config.cjs`, `vite.config.js` – build config
- `plan/` – planning documents

## Deployment notes (GitHub Pages + custom domain)

- The workflow in `.github/workflows/deploy-pages.yml` builds and publishes `dist/`.
- `vite.config.js` sets `base: '/'` for a custom domain.
- Custom domain is configured via `public/CNAME` (katyandsteveswedding.com).
- In GitHub repo settings → Pages, set Source = GitHub Actions and add the custom domain.

## Next ideas (optional)

- Captions and tags (hover overlay + filter controls)
- Justified rows layout alternative (Flickr‑style) or virtualized masonry for very large sets
- Keyboard/gesture nav in the lightbox with preloading of next/prev images
- SEO/meta defaults and social preview image
- CI deploy (Vercel/Netlify) and a small pre‑deploy step to ensure images are optimized

## Changelog (today)

- Created image optimizer and processed all photos; generated gallery manifest
- Hooked `sandeaigo` as hero and `LA` as parallax background
- Converted gallery to masonry layout with responsive images and lightbox
- Cleaned up and documented repository root setup
