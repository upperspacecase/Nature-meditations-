"use client";

import { useEffect } from "react";

/**
 * Offline support is temporarily disabled because a stuck service worker could
 * leave some phones unable to open the app. Rather than register a worker, this
 * actively unregisters any existing one and clears its caches, so the app is
 * always served fresh from the network. (The /sw.js file is now a self-retiring
 * worker that does the same thing for devices that can't load the page.)
 */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker
      .getRegistrations?.()
      .then((regs) => regs.forEach((r) => r.unregister().catch(() => {})))
      .catch(() => {});

    if (typeof caches !== "undefined" && caches.keys) {
      caches
        .keys()
        .then((keys) => keys.forEach((k) => caches.delete(k)))
        .catch(() => {});
    }
  }, []);

  return null;
}
