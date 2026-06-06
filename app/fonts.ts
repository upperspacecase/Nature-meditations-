import localFont from "next/font/local";

/**
 * Poppins (latin subset) bundled locally so the app has no runtime font fetch —
 * it stays fully offline-capable on flaky travel wifi. Geometric sans chosen to
 * match the physical deck's lettering.
 */
export const poppins = localFont({
  src: [
    { path: "./fonts/Poppins-400.woff2", weight: "400", style: "normal" },
    { path: "./fonts/Poppins-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/Poppins-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/Poppins-700.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-poppins",
});
