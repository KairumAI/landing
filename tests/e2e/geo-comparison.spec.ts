import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const path = "/blog/kairum-vs-fardo-cleexs-tribu-geo/";
const origins = [
  "https://www.heyfardo.com/",
  "https://cleexs.net/",
  "https://tribugeo.com/",
];

for (const prefix of ["", "/en", "/pt-br"]) {
  test(`${prefix || "es"}: comparison is discoverable, sourced and linked to localized products`, async ({
    page,
    request,
  }) => {
    await page.goto(`${prefix}${path}`);
    await expect(page.locator("main h1")).toHaveText(
      /KAIRUM vs\. Fardo, Cleexs/,
    );
    await expect(page.locator(".editorial-reading tbody tr")).toHaveCount(4);
    await expect(page.locator("time")).toHaveAttribute(
      "datetime",
      "2026-10-22",
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://kairum.com.ar${prefix}${path}`,
    );
    await expect(page.locator('link[rel="alternate"][hreflang]')).toHaveCount(
      4,
    );
    const graph = JSON.parse(
      (await page.locator('script[type="application/ld+json"]').textContent())!,
    )["@graph"];
    const article = graph.find(
      (node: { "@type": string }) => node["@type"] === "BlogPosting",
    );
    expect(article.dateModified).toBe("2026-10-22");
    for (const origin of origins) {
      expect(
        article.citation.some((url: string) => url.startsWith(origin)),
      ).toBe(true);
      await expect(
        page.locator(`#fuentes a[href^="${origin}"]`).first(),
      ).toBeVisible();
    }
    for (const product of ["report", "analytics", "consulting"]) {
      const link = page
        .locator(`.editorial-reading a[href="${prefix}/productos/${product}/"]`)
        .first();
      await expect(link).toBeVisible();
      expect(
        (await request.get((await link.getAttribute("href"))!)).status(),
      ).toBe(200);
    }
    for (const hub of ["/blog/", "/recursos/"]) {
      await page.goto(`${prefix}${hub}`);
      await expect(
        page.locator(`.editorial-card a[href="${prefix}${path}"]`),
      ).toHaveCount(1);
    }
    expect(await (await request.get("/sitemap.xml")).text()).toContain(
      `<loc>https://kairum.com.ar${prefix}${path}</loc>`,
    );
    expect(await (await request.get("/llms.txt")).text()).toContain(
      `https://kairum.com.ar${prefix}${path}`,
    );
  });
}

test("comparison stays usable on mobile without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
  });
  const page = await context.newPage();
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto(path);
    await expect(page.locator("main h1")).toBeVisible();
    await expect(page.locator(".editorial-reading table")).toBeVisible();
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
    if (process.env.CAPTURE_SEO_EVIDENCE === "1") {
      await page.screenshot({
        path: `docs/evidence/2026-10-22-seo-comparison/article-${width}.png`,
        fullPage: true,
      });
    }
  }
  await page.locator('a[data-language-link][lang="en"]').focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(`/en${path}`);
  await context.close();
});

test("comparison has no accessibility blockers or runtime errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto(path);
  await page.setViewportSize({ width: 320, height: 1000 });
  const audit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(audit.violations).toEqual([]);
  expect(errors).toEqual([]);
});

test("product metadata describes search intent and preserves planned availability", async ({
  page,
}) => {
  for (const prefix of ["", "/en", "/pt-br"]) {
    for (const product of ["prompt-intelligence", "traffic", "consulting"]) {
      await page.goto(`${prefix}/productos/${product}/`);
      const title = await page.title();
      expect(title).toMatch(/KAIRUM/);
      expect(title.length).toBeGreaterThan(30);
      const description = await page
        .locator('meta[name="description"]')
        .getAttribute("content");
      expect(description!.length).toBeGreaterThan(80);
      if (product !== "consulting")
        expect(description).toMatch(/planificad|planned|planejad/);
      if (product === "consulting") expect(title).toMatch(/GEO.*AEO/);
    }
  }
});
