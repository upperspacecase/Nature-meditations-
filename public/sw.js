/*
 * Offline service worker for Nature Meditations.
 *
 * Designed to be impossible to "brick": navigations are network-first and ALWAYS
 * resolve to a real Response (fresh page → cached page → built-in offline page),
 * so the browser can never show a "Can't open this page" error because of us.
 * Bump CACHE_VERSION to roll out a new worker and purge old caches.
 */
const CACHE_VERSION = "v3";
const CACHE = `nature-meditations-${CACHE_VERSION}`;

const SHELL = [
  "/",
  "/manifest.webmanifest",
  "/icon.svg",
  "/back-messages-from-the-earth.webp",
  "/back-walking-thoughts.webp",
  "/back-nature-meditations.webp",
  "/back-strengthening-affirmations.webp",
];

const OFFLINE_PAGE = `<!doctype html><html lang="en"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Nature Meditations</title>
<style>html,body{height:100%;margin:0}body{display:flex;align-items:center;justify-content:center;
background:#e7e1d5;color:#2b3047;font-family:ui-sans-serif,system-ui,sans-serif;text-align:center;padding:2rem}
p{max-width:22rem;line-height:1.5}</style></head>
<body><p>You're offline right now. Reconnect and the meditations will be here waiting.</p></body></html>`;

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) =>
      // Add each item independently so one failure can't abort the precache.
      Promise.all(SHELL.map((url) => cache.add(url).catch(() => {})))
    )
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  let url;
  try {
    url = new URL(request.url);
  } catch {
    return;
  }
  if (url.origin !== self.location.origin) return; // leave cross-origin alone

  // Navigations: network-first, always resolving to a real Response.
  if (request.mode === "navigate") {
    event.respondWith(
      (async () => {
        try {
          const fresh = await fetch(request);
          caches.open(CACHE).then((c) => c.put("/", fresh.clone())).catch(() => {});
          return fresh;
        } catch {
          const cached = await caches.match("/");
          return (
            cached ||
            new Response(OFFLINE_PAGE, {
              status: 200,
              headers: { "Content-Type": "text/html; charset=utf-8" },
            })
          );
        }
      })()
    );
    return;
  }

  // Other same-origin GETs: cache-first, then network (and cache it).
  event.respondWith(
    (async () => {
      const cached = await caches.match(request);
      if (cached) return cached;
      try {
        const res = await fetch(request);
        if (res && res.status === 200 && res.type === "basic") {
          caches.open(CACHE).then((c) => c.put(request, res.clone())).catch(() => {});
        }
        return res;
      } catch {
        return cached || Response.error();
      }
    })()
  );
});
