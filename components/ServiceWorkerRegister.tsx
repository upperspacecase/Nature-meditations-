"use client";

import { useEffect } from "react";

/**
 * Registers the service worker so the app works offline once visited — handy on
 * flaky travel wifi and for add-to-homescreen. No-op in dev or unsupported
 * browsers.
 */
export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (process.env.NODE_ENV !== "production") return;
    if (!("serviceWorker" in navigator)) return;

    const register = () => {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => {
          // Pull any newer worker immediately, so a stale/broken cache can't
          // linger across deploys.
          reg.update().catch(() => {});
        })
        .catch(() => {
          /* offline support is a progressive enhancement; ignore failures */
        });
    };

    window.addEventListener("load", register);
    return () => window.removeEventListener("load", register);
  }, []);

  return null;
}
