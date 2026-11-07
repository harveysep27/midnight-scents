# MDNGHT Scents website

A lightweight, responsive two-page brand website for MDNGHT Scents. The canonical Vite site is in `mdnght-site/`; it contains the homepage, About Us page, shared stylesheet and JavaScript, and the seven original product photographs in `public/images/`.

## Ordering

`mdnght-site/main.js` preserves the existing Facebook Messenger destination (`61587501380475`). Product prices and sizes remain unlisted until confirmed; the site shows “Price on request” instead of inventing details.

## Run locally

From this directory, run `npm install`, then `npm run dev`. The root package serves the canonical `mdnght-site/` app. You can also run the app from `mdnght-site/` using its own package scripts.

## Deploy to Cloudflare Pages

Recommended when this directory is the Pages project root: use `npm run build` and set the output directory to `dist`.

If Cloudflare Pages is configured with `mdnght-site/` as its project root, use `npm run build` there and set the output directory to `dist`.

The repository-level duplicate HTML/CSS/JS files are legacy copies and are not the canonical Pages build input. The root package intentionally builds `mdnght-site/` so both build-root layouts serve the same source and product assets.
