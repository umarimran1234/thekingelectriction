# The King's Electric — Website

A fast, responsive static website for **The King's Electric, LLC** (Arlington, TX).

Pages: Home · Residential · Commercial · The Team · Careers · Contact · 404

## Editing

The HTML pages in the repo root are **generated**. Edit the sources in `src/`, then rebuild:

```bash
node build.mjs
```

- `src/site.json` — business name, phone, address, hours, social links (used everywhere)
- `src/partials/` — shared `<head>`, header/nav, call-to-action band, footer
- `src/pages/` — content for each page
- `assets/css/styles.css` — design system (colors, type, components)
- `assets/js/main.js` — mobile menu, animations, forms

## Team photos

Add square JPG photos to `assets/img/team/` using these names; until a photo exists, a branded initials avatar is shown:

`michael-king.jpg`, `bruno-borges.jpg`, `austin-luger.jpg`, `miranda-mccall.jpg`, `jamon-duson.jpg`, `kieran-goodnight.jpg`, `colton-mount.jpg`, `will-parr.jpg`, `maddox-matthews.jpg`, `logan-bistrup.jpg`, `connor-baird.jpg`, `jude-marlin.jpg`

## Contact & careers forms

Set `FORM_ENDPOINT` (e.g. a Formspree URL) or `FALLBACK_EMAIL` at the top of `assets/js/main.js` so submissions reach you. Until then, the forms ask visitors to call.

## Preview locally

```bash
python3 -m http.server 8080   # then open http://localhost:8080
```

Deploys as-is to GitHub Pages, Netlify, Vercel or any static host.
