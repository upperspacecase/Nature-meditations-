# Nature Meditations

A private, mobile-first card deck that recreates the draw ritual from physical
decks of nature meditation cards. The whole screen is the deck: **tap the deck
and the cards fan out** across the page; **tap one** and it zooms in and flips
to reveal the meditation; **tap it again** and it flips back and collapses into
the deck. No buttons, no chrome.

Cards are grouped by **category** ("card type") — each has its own illustrated
back and a matching title colour. Each meditation auto-sizes to fit the card
exactly (it never scrolls), with a bold lowercase title and an airy, lower-
weighted body.

Built with Next.js (App Router) + TypeScript. Fully static, no backend, no
accounts — all card text, the font, and the artwork ship in the bundle, so it
works on flaky travel wifi and offline once loaded.

## Run it locally

```bash
npm install
npm run dev      # http://localhost:3000
```

```bash
npm run build && npm start   # production build
```

## Adding a card

All cards live in [`data/meditations.ts`](data/meditations.ts) as a typed
array. **Adding a card = appending one object.** No code changes anywhere else.

```ts
{
  id: "wisdom-in-the-soil",     // stable, unique slug
  title: "wisdom in the soil",  // the meditation title
  category: "messages from the earth",
  body: "There is wisdom in the soil...",  // the full meditation
}
```

The `category` ties a card to its back artwork and title colour (below).

## Card types (back artwork + title colour)

Each category is a "card type" with its own illustrated back and a matching
title colour, both registered in [`components/Deck.tsx`](components/Deck.tsx):

```ts
const BACK_ART = {
  "messages from the earth": "/back-messages-from-the-earth.webp",
  "walking thoughts":        "/back-walking-thoughts.webp",
  "nature meditations":      "/back-nature-meditations.webp",
};
const ACCENT = {
  "messages from the earth": "#c0301a", // red, from the canyon art
  "walking thoughts":        "#2f7d4f", // green, from the hills art
  "nature meditations":      "#9f4777", // plum, from the lake art
  "strengthening affirmations": "#b3782f", // ochre (no art yet → leaf back)
};
```

To add art for a new type: drop a portrait image in `public/` (it can carry a
wide matte — it gets trimmed to the artwork and framed by an even 5px white
border), point `BACK_ART["your category"]` at it, and set a matching `ACCENT`
colour. Any category without art falls back to a leaf emblem.

Artwork is stored as WebP (~210–260 KB each) so it loads fast and caches well
for offline use.

## Deploy to Vercel

Zero config. Push this repo to GitHub and import it into Vercel, or:

```bash
npx vercel
```

It builds and deploys as a static personal app — no environment variables, no
database.

## Offline / add-to-homescreen

The app registers a service worker ([`public/sw.js`](public/sw.js)) and ships a
web manifest, so once you've opened it online you can:

- **Add it to your home screen** (iOS Safari: Share → Add to Home Screen) and
  launch it full-screen like a native app.
- **Use it offline** — all card text is cached, so the ritual works with no
  signal.

The service worker only activates in production builds.

## Project layout

```
app/
  layout.tsx        # metadata, manifest, service-worker registration
  page.tsx          # renders the deck
  globals.css       # palette + base styles
  fonts.ts          # bundled Poppins (next/font/local — no runtime fetch)
  fonts/            # the Poppins .woff2 files
components/
  Deck.tsx          # fan-out deck, flip, auto-fit text, back art (client component)
  Deck.module.css   # card styling, 3D flip, deck stack
data/
  meditations.ts    # ← your cards live here
public/
  manifest.webmanifest, sw.js, icon.svg, icon-*.png
scripts/
  generate-icons.mjs  # one-off: rasterize PNG icons from icon.svg
```

## Regenerating icons

The PNG app icons are generated from `public/icon.svg`. If you change the
artwork, regenerate them with Playwright:

```bash
npm install --no-save playwright
node scripts/generate-icons.mjs
```
