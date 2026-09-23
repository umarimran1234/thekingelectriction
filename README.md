# The King's Electric — Website

Next.js (App Router, TypeScript) website for **The King's Electric, LLC** — Arlington, TX.

Pages: Home · Residential · Commercial · The Team · Careers · Contact · 404 (+ `sitemap.xml`, `robots.txt`).
All pages are statically prerendered.

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # serve the production build
npm run lint     # type-check
```

## Project structure

```
app/                 routes (page.tsx per page), layout, global styles, sitemap, robots
  globals.css        design system: colors, type, components, responsive rules
components/          Header, Footer, CtaBand, PageHero, ServiceGrid, Icon,
                     LeadForm (contact + careers forms), CountUp, RevealObserver
lib/site.ts          business info — phone, address, hours, nav (used everywhere)
lib/team.ts          team roster
public/              logo, icon sprite, OG image, team photos
```

## Team photos

Add square JPGs to `public/team/<slug>.jpg` (slugs are in `lib/team.ts`) and set
`photo: true` on that member. Until then a branded initials avatar is shown.

## Contact & careers forms

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_FORM_ENDPOINT` (e.g. a Formspree
URL) so submissions reach your inbox. Until it's set, the forms ask visitors to call.

## Deploy

Push to GitHub and import the repo on [Vercel](https://vercel.com/new) — no configuration
needed. Add the env vars from `.env.example` in the Vercel project settings.
