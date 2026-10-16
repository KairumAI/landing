import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
const directory = process.argv[2];
if (!directory) throw new Error("Pass an evidence directory");
const origin = process.env.EDITORIAL_PREVIEW_URL ?? "http://127.0.0.1:4391";
await mkdir(directory, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
});
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
const cases = [
  ["resources", "/recursos/"],
  ["blog", "/blog/"],
  ["guide", "/recursos/como-medir-visibilidad-ia/"],
  ["article", "/blog/menciones-citas-visitas/"],
  ["glossary", "/glosario/"],
  ["methodology", "/metodologia/"],
  ["agencies", "/soluciones/agencias/"],
  ["analytics", "/productos/analytics/"],
  ["report", "/productos/report/"],
] as const;
const observations = [];
for (const [name, path] of cases) {
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    const response = await page.goto(`${origin}${path}`);
    await page.evaluate(() => document.fonts.ready);
    observations.push({
      path,
      width,
      status: response?.status(),
      scrollWidth: await page.evaluate(
        () => document.documentElement.scrollWidth,
      ),
    });
    if (
      ["resources", "blog", "guide", "article", "agencies"].includes(name) &&
      [1440, 768, 390, 320].includes(width)
    ) {
      await page.screenshot({
        path: join(directory, `${name}-${width}.png`),
        fullPage: false,
      });
    }
  }
}
await page.setViewportSize({ width: 1440, height: 1000 });
await page.goto(`${origin}/recursos/`);
await page.screenshot({
  path: join(directory, "resources-full-1440.png"),
  fullPage: true,
});
await page.goto(`${origin}/recursos/como-medir-visibilidad-ia/`);
await page.locator(".editorial-reading").scrollIntoViewIfNeeded();
await page.screenshot({ path: join(directory, "guide-reading-1440.png") });
await page.goto(`${origin}/soluciones/agencias/`);
await page.locator("[data-editorial-commercial]").scrollIntoViewIfNeeded();
await page.screenshot({ path: join(directory, "agencies-scope-1440.png") });
await page.setViewportSize({ width: 320, height: 1000 });
await page.goto(`${origin}/blog/menciones-citas-visitas/`);
await page.locator(".editorial-table-wrap").screenshot({
  path: join(directory, "article-table-320.png"),
});
await writeFile(
  join(directory, "viewports.json"),
  JSON.stringify(observations, null, 2) + "\n",
);
await browser.close();
console.log(
  `${observations.length} route/viewport observations; screenshots in ${directory}`,
);
