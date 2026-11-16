// Mobile smoke test: run against a running site.
//   BASE_URL=http://localhost:3000 node tests/mobile-check.mjs
// Checks each phone/tablet size for: page loads, no sideways scrolling,
// menu opens, WhatsApp button visible, form inputs won't zoom on iPhone,
// and every section URL returns 200 and scrolls to its section.
import { createRequire } from "node:module";
const { chromium, devices } = createRequire(import.meta.url)("playwright"); // npm i -D playwright

const BASE = process.env.BASE_URL || "http://localhost:3000";
const OUT = process.env.SHOT_DIR || "";
const sizes = [
  ["iPhone SE", devices["iPhone SE"]],
  ["iPhone 14", devices["iPhone 14"]],
  ["Pixel 7", devices["Pixel 7"]],
  ["Galaxy S9+", devices["Galaxy S9+"]],
  ["iPad Mini", devices["iPad Mini"]],
  ["Small 320px", { viewport: { width: 320, height: 640 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }],
];
const routes = ["services", "roadmap", "projects", "pricing", "faq", "contact"];
let fails = 0;
const check = (ok, msg) => { console.log(`${ok ? "PASS" : "FAIL"}  ${msg}`); if (!ok) fails++; };

const browser = await chromium.launch();
for (const [name, dev] of sizes) {
  const ctx = await browser.newContext(dev);
  const page = await ctx.newPage();
  const errors = [];
  page.on("pageerror", (e) => errors.push(e.message));
  const res = await page.goto(BASE + "/", { waitUntil: "networkidle" });
  check(res.status() === 200, `${name}: home loads (${res.status()})`);
  // Scroll through the page so every lazy/reveal section renders.
  await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 250) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); } window.scrollTo(0, 0); });
  await page.waitForTimeout(1500); // let slide-in animations finish
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - window.innerWidth);
  check(overflow <= 0, `${name}: no sideways scroll (extra ${overflow}px)`);
  const wide = await page.evaluate(() => [...document.querySelectorAll("body *")].filter(e => { const r = e.getBoundingClientRect(); return r.width && r.right > innerWidth + 1 && getComputedStyle(e).position !== "fixed" && !e.closest("[class*=overflow-hidden],[class*=marquee]"); }).slice(0, 3).map(e => e.tagName + "." + (e.className?.baseVal ?? e.className).toString().slice(0, 40)));
  check(wide.length === 0, `${name}: nothing pokes out of the screen ${wide.join(", ")}`);
  const smallFont = await page.evaluate(() => [...document.querySelectorAll("input, textarea, select")].filter(e => parseFloat(getComputedStyle(e).fontSize) < 16).map(e => e.name));
  check(smallFont.length === 0, `${name}: form fields are 16px+ so iPhone won't zoom (${smallFont.join(",") || "ok"})`);
  const waOnScreen = await page.evaluate(() => [...document.querySelectorAll('a[href*="wa.me"]')].some(a => { const r = a.getBoundingClientRect(); return r.width > 0 && r.top >= 0 && r.bottom <= innerHeight; }));
  check(waOnScreen, `${name}: WhatsApp button visible on first screen`);
  const vw = dev.viewport.width;
  if (vw < 768) {
    await page.getByRole("button", { name: "Menu" }).click();
    const links = await page.locator("nav a, header a").filter({ hasText: /Services|Pricing|FAQ|Contact/ }).count();
    check(links > 0, `${name}: mobile menu opens and shows links`);
  }
  check(errors.length === 0, `${name}: no JavaScript errors ${errors.join(" | ")}`);
  if (OUT) await page.screenshot({ path: `${OUT}/${name.replace(/\W+/g, "-")}.png`, fullPage: false });
  await ctx.close();
}
// Section URLs (once, on a phone)
const ctx = await browser.newContext(devices["Pixel 7"]);
const page = await ctx.newPage();
for (const r of routes) {
  const res = await page.goto(`${BASE}/${r}`, { waitUntil: "networkidle" });
  await page.waitForTimeout(1200);
  const y = await page.evaluate(() => scrollY);
  check(res.status() === 200 && y > 100, `/${r}: loads (${res.status()}) and scrolls to section (y=${Math.round(y)})`);
}
const nf = await page.goto(`${BASE}/does-not-exist`);
check(nf.status() === 404, `unknown URL gives 404 (${nf.status()})`);
await browser.close();
console.log(fails ? `\n${fails} check(s) failed` : "\nAll mobile checks passed");
process.exit(fails ? 1 : 0);
