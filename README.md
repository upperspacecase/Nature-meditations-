# Nature Meditations

A private, mobile-first card deck that recreates the daily-draw ritual from a
physical deck of nature meditation cards. Open the app, tap **draw**, read the
meditation. That's it.

Built with Next.js (App Router) + TypeScript. Fully static, no backend, no
accounts — all card text ships in the bundle, so it works on flaky travel wifi
and offline once loaded.

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
  title: "wisdom in the soil",  // shown on the card back
  category: "messages from the earth",
  body: "There is wisdom in the soil...",  // the full meditation
  // image: "/cards/wisdom-in-the-soil.jpg", // optional, see below
}
```

Drawing is pure random across the whole deck — every draw is independent and
repeats are allowed, just like shuffling and cutting a physical deck.

## Adding card photos (later)

The front of each card is a calm gradient placeholder by default. To show a real
photo instead:

1. Drop the image in `public/cards/` (e.g. `public/cards/wisdom-in-the-soil.jpg`).
2. Add an `image` field to that card pointing at it
   (e.g. `image: "/cards/wisdom-in-the-soil.jpg"`).

The gradient stays as the fallback for any card without a photo.

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
components/
  Deck.tsx          # the draw + flip ritual (client component)
  Deck.module.css   # card styling and 3D flip
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
