/*
 * Self-retiring service worker.
 *
 * A previous version cached the app for offline use, but a stuck/odd worker can
 * cause "Can't open this page" on some phones. This worker exists only to undo
 * that: it clears all caches and unregisters itself, so the app is always served
 * straight from the network (which is reliable). It has NO fetch handler, so it
 * never intercepts or blocks a request.
 *
 * Devices that still hold the old worker pick this up via the browser's normal
 * update check and clean themselves up automatically.
 */
self.addEventListener("install", () => {
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    (async () => {
      try {
        const keys = await caches.keys();
        await Promise.all(keys.map((k) => caches.delete(k)));
      } catch {
        /* ignore */
      }
      try {
        await self.registration.unregister();
      } catch {
        /* ignore */
      }
      await self.clients.claim();
    })()
  );
});
