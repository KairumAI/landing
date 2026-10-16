import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";
const directory = process.argv[2];
if (!directory) throw new Error("Pass an evidence directory");
const origin = process.env.EDITORIAL_PREVIEW_URL ?? "http://127.0.0.1:4391";
const qualityRevision = process.env.EDITORIAL_QUALITY_REVISION === "1";
const extension = qualityRevision ? "jpg" : "png";
await mkdir(directory, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
});
const page = await browser.newPage({
  viewport: { width: 1440, height: 1000 },
  reducedMotion: "reduce",
});
// Screenshots must include decoded lazy images, including offscreen cards in
// full-page captures. Reading an image's pixels does not wait for its download.
const readyImages = async (all = false) => {
  if (all) {
    for (const img of await page.locator("main img").all())
      await img.scrollIntoViewIfNeeded();
  }
  await page.waitForFunction(() =>
    [...document.querySelectorAll<HTMLImageElement>("main img")].every(
      (img) => {
        const box = img.getBoundingClientRect();
        return (
          box.top >= innerHeight ||
          box.bottom <= 0 ||
          (img.complete && img.naturalWidth > 0)
        );
      },
    ),
  );
  if (all) {
    await page.waitForFunction(() =>
      [...document.querySelectorAll<HTMLImageElement>("main img")].every(
        (img) => img.complete && img.naturalWidth > 0,
      ),
    );
    await page.evaluate(() => window.scrollTo(0, 0));
  }
  await page.evaluate(async () => {
    const visible = [
      ...document.querySelectorAll<HTMLImageElement>("main img"),
    ].filter((img) => {
      const box = img.getBoundingClientRect();
      return box.top < innerHeight && box.bottom > 0;
    });
    await Promise.all(visible.map((img) => img.decode()));
    await new Promise<void>((resolve) =>
      requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
    );
  });
};
const cases = [
  ["resources", "/recursos/"],
  ["blog", "/blog/"],
  ["guide", "/recursos/como-medir-visibilidad-ia/"],
  ["article", "/blog/menciones-citas-visitas/"],
  ["questions", "/blog/como-elegir-preguntas/"],
  ["results", "/blog/como-interpretar-resultados/"],
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
    await readyImages();
    observations.push({
      path,
      width,
      status: response?.status(),
      scrollWidth: await page.evaluate(
        () => document.documentElement.scrollWidth,
      ),
    });
    if (
      [
        "resources",
        "blog",
        "guide",
        "article",
        "questions",
        "results",
        "agencies",
      ].includes(name) &&
      [1440, 768, 390, 320].includes(width)
    ) {
      await page.screenshot({
        path: join(directory, `${name}-${width}.${extension}`),
        ...(qualityRevision ? { quality: 80 } : {}),
        fullPage: false,
      });
    }
  }
}
await page.setViewportSize({ width: 1440, height: 1000 });
await page.goto(`${origin}/recursos/`);
await readyImages(true);
await page.screenshot({
  path: join(directory, `resources-full-1440.${extension}`),
  ...(qualityRevision ? { quality: 80 } : {}),
  fullPage: true,
});
await page.goto(`${origin}/recursos/como-medir-visibilidad-ia/`);
await page.locator(".editorial-reading").scrollIntoViewIfNeeded();
await page.screenshot({
  path: join(directory, `guide-reading-1440.${extension}`),
  ...(qualityRevision ? { quality: 80 } : {}),
});
await page.goto(`${origin}/soluciones/agencias/`);
await page.locator("[data-editorial-commercial]").scrollIntoViewIfNeeded();
await page.screenshot({
  path: join(directory, `agencies-scope-1440.${extension}`),
  ...(qualityRevision ? { quality: 80 } : {}),
});
await page.setViewportSize({ width: 320, height: 1000 });
await page.goto(`${origin}/blog/menciones-citas-visitas/`);
await page.locator(".editorial-table-wrap").screenshot({
  path: join(directory, `article-table-320.${extension}`),
  ...(qualityRevision ? { quality: 80 } : {}),
});
if (qualityRevision) {
  for (const [name, path] of cases.filter(([name]) =>
    ["blog", "guide", "article", "questions", "results"].includes(name),
  )) {
    await page.setViewportSize({ width: 1440, height: 1000 });
    await page.goto(`${origin}${path}`);
    await page
      .locator(name === "blog" ? ".editorial-library" : ".editorial-explainer")
      .scrollIntoViewIfNeeded();
    await readyImages();
    await page.screenshot({
      path: join(directory, `${name}-detail-1440.jpg`),
      quality: 80,
    });
    if (name !== "blog") {
      await page.setViewportSize({ width: 320, height: 1000 });
      await page.locator(".editorial-explainer").screenshot({
        path: join(directory, `${name}-figure-320.jpg`),
        quality: 80,
      });
    }
  }
  for (const locale of ["en", "pt-br"]) {
    await page.setViewportSize({ width: 390, height: 1000 });
    await page.goto(`${origin}/${locale}/blog/como-interpretar-resultados/`);
    await page.locator(".editorial-explainer").scrollIntoViewIfNeeded();
    await page.screenshot({
      path: join(directory, `${locale}-figure-390.jpg`),
      quality: 80,
    });
  }
  await page.setViewportSize({ width: 1440, height: 1000 });
  await page.goto(`${origin}/blog/`);
  await page.locator(".editorial-card a").first().focus();
  await readyImages();
  await page.screenshot({
    path: join(directory, "blog-keyboard-focus-1440.jpg"),
    quality: 80,
  });
}
await writeFile(
  join(directory, "viewports.json"),
  JSON.stringify(observations, null, 2) + "\n",
);
await browser.close();
console.log(
  `${observations.length} route/viewport observations; screenshots in ${directory}`,
);
