import { createHash } from "node:crypto";
import { expect, test } from "@playwright/test";

const path = "/blog/compras-desde-ia-adobe/";
const title =
  "Tu próximo cliente puede llegar desde una IA. ¿Tu marca está preparada?";
const sha256 = (value: string | Buffer) =>
  createHash("sha256").update(value).digest("hex");

test("the Adobe article preserves the approved editorial text, links, date and original PNG bytes", async ({
  page,
  request,
}) => {
  await page.goto("/blog/");
  await page
    .getByRole("link")
    .filter({ has: page.getByRole("heading", { name: title, exact: true }) })
    .click();
  await expect(page).toHaveURL(path);
  const text = [
    await page.locator(".editorial-article-hero h1").textContent(),
    await page
      .locator(".editorial-article-hero .editorial-intro")
      .textContent(),
    ...(await page
      .locator(
        "article.editorial-reading h2, article.editorial-reading h3, article.editorial-reading p, article.editorial-reading li",
      )
      .allTextContents()),
  ]
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  // SHA-256 of the approved Markdown's visible editorial text, in reading order.
  expect(sha256(text)).toBe(
    "9617c3eb4f515becf51e47d5a000293bc9bd99f5fae1d86e23f881179de0eafe",
  );
  await expect(page.locator("article.editorial-reading ol li")).toHaveCount(4);
  await expect(page.locator(".editorial-byline time")).toHaveAttribute(
    "datetime",
    "2026-10-20",
  );
  await expect(page.locator("main")).not.toContainText(
    /BORRADOR PARA REVISIÓN|ADAPTACIÓN LINKEDIN|Brief editorial|pendientes de producción/,
  );
  for (const [name, hash] of [
    [
      "KAIRUM-blog-compras-IA-portada.png",
      "9560c28327883a9acc42bac372f563e38d692c1241a12d867462040fb7f06008",
    ],
    [
      "KAIRUM-Adobe-conversion-relativa-grafico.png",
      "f4bc0783b394cc7b8d756a1b5b2fcb6bf10a390940ad94ef63f2c72e85d765e9",
    ],
  ]) {
    const img = page.locator(`main img[src="/editorial/${name}"]`);
    await img.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        img.evaluate(
          (element: HTMLImageElement) =>
            element.complete && element.naturalWidth > 0,
        ),
      )
      .toBe(true);
    await expect(img).toHaveAttribute("alt", /.+/);
    const response = await request.get(`/editorial/${name}`);
    expect(response.status()).toBe(200);
    expect(sha256(await response.body())).toBe(hash);
  }
  const links = await page
    .locator("article.editorial-reading a")
    .evaluateAll((links) => links.map((link) => link.getAttribute("href")));
  expect(links).toEqual([
    "https://business.adobe.com/blog/us-consumers-are-embracing-llms-to-make-travel-plans",
    "https://developers.google.com/search/docs/appearance/ai-features?hl=es",
    "https://calendly.com/brunodecruz/30min",
    "https://business.adobe.com/assets/pdfs/resources/sdk/ai-traffic-trends-report-august-2026/ai-traffic-trends-report-2026-08-19.pdf",
  ]);
});

test("only the approved Spanish edition is published and advertised", async ({
  page,
  request,
}) => {
  await page.goto(path);
  await expect(page.locator("link[rel=canonical]")).toHaveAttribute(
    "href",
    `https://kairum.com.ar${path}`,
  );
  await expect(page.locator("[data-language-link]")).toHaveCount(1);
  await expect(page.locator("link[hreflang]")).toHaveCount(2);
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(
    sitemap.match(new RegExp(`<loc>https://kairum.com.ar${path}</loc>`, "g")),
  ).toHaveLength(1);
  expect(await (await request.get("/llms.txt")).text()).toContain(
    `https://kairum.com.ar${path}`,
  );
  for (const locale of ["en", "pt-br"]) {
    expect((await request.get(`/${locale}${path}`)).status()).toBe(404);
    expect(await (await request.get(`/${locale}/blog/`)).text()).not.toContain(
      path,
    );
    expect(
      await (await request.get(`/${locale}/llms-full.txt`)).text(),
    ).not.toContain(title);
  }
});

test("the approved article remains readable without JavaScript and its contents links reach the sources", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
    viewport: { width: 320, height: 900 },
  });
  const page = await context.newPage();
  await page.goto(path);
  await page.locator('.editorial-toc a[href="#fuentes"]').focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(`${path}#fuentes`);
  await expect(page.locator("#fuentes")).toBeVisible();
  await expect(page.locator("#fuentes")).toContainText(
    "El 60% es una diferencia relativa entre tasas",
  );
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(320);
  await context.close();
});
