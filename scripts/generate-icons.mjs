/**
 * Rasterizes PNG app icons from the source SVG using Playwright.
 * Run with: node scripts/generate-icons.mjs
 * (One-off tooling; not part of the build.)
 */
import { chromium } from "playwright";
import { readFileSync, writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const svg = readFileSync(join(root, "public", "icon.svg"), "utf8");

// Maskable icon: full-bleed background with the leaf inside the ~80% safe zone.
const maskableSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="512" height="512" viewBox="0 0 512 512">
  <defs>
    <radialGradient id="g1" cx="0.3" cy="0.25" r="0.8">
      <stop offset="0" stop-color="#9b8aa6"/>
      <stop offset="1" stop-color="#9b8aa6" stop-opacity="0"/>
    </radialGradient>
  </defs>
  <rect width="512" height="512" fill="#f4efe6"/>
  <ellipse cx="180" cy="170" rx="200" ry="200" fill="url(#g1)" opacity="0.55"/>
  <ellipse cx="350" cy="360" rx="190" ry="190" fill="#8a9a7b" opacity="0.3"/>
  <g transform="translate(256 256) scale(0.82)">
    <path d="M0 -96 C 62 -64, 62 64, 0 96 C -62 64, -62 -64, 0 -96 Z" fill="#8a9a7b"/>
    <path d="M0 -86 L 0 86" stroke="#4a2230" stroke-opacity="0.4" stroke-width="6" stroke-linecap="round"/>
    <path d="M0 -40 L 36 -64 M0 0 L 44 -22 M0 40 L 36 18" stroke="#4a2230" stroke-opacity="0.3" stroke-width="5" stroke-linecap="round" fill="none"/>
    <path d="M0 -40 L -36 -64 M0 0 L -44 -22 M0 40 L -36 18" stroke="#4a2230" stroke-opacity="0.3" stroke-width="5" stroke-linecap="round" fill="none"/>
  </g>
</svg>`;

const targets = [
  { source: svg, size: 192, out: "icon-192.png" },
  { source: svg, size: 512, out: "icon-512.png" },
  { source: svg, size: 180, out: "apple-touch-icon.png" },
  { source: maskableSvg, size: 512, out: "icon-maskable-512.png" },
];

const browser = await chromium.launch();
const page = await browser.newPage();

for (const { source, size, out } of targets) {
  const dataUrl = "data:image/svg+xml;base64," + Buffer.from(source).toString("base64");
  await page.setViewportSize({ width: size, height: size });
  await page.setContent(
    `<!doctype html><html><body style="margin:0;padding:0">
       <img src="${dataUrl}" width="${size}" height="${size}" style="display:block"/>
     </body></html>`
  );
  await page.waitForLoadState("networkidle");
  const buf = await page.screenshot({
    clip: { x: 0, y: 0, width: size, height: size },
    omitBackground: false,
  });
  writeFileSync(join(root, "public", out), buf);
  console.log(`wrote public/${out} (${size}x${size})`);
}

await browser.close();
