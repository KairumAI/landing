import { createHash } from "node:crypto";
import { expect, test } from "@playwright/test";

const path = "/blog/chatgpt-ads-argentina/";
const title =
  "ChatGPT Ads llegó a Argentina: cómo preparar tu marca para esta etapa del marketing";
const linkedin =
  "https://www.linkedin.com/feed/update/urn:li:share:7519082123975139328/?actorCompanyId=145284611";
const sha256 = (value: string | Buffer) =>
  createHash("sha256").update(value).digest("hex");

test("ChatGPT Ads retains the approved visible article, cover bytes and reciprocal link", async ({
  page,
  request,
}) => {
  await page.goto("/blog/");
  await expect(
    page.locator(
      '.editorial-card-image img[src$="chatgpt-ads-argentina-portada.png"]',
    ),
  ).toHaveCSS("object-fit", "contain");
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
        "article.editorial-reading h2, article.editorial-reading h3, article.editorial-reading p",
      )
      .allTextContents()),
  ]
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  // Fixed fingerprint of the approved source and preview, before incorporation.
  expect(sha256(text)).toBe(
    "5df5f672271f4016c659f1af864b07de911905a0cac80df025d2c112b9e77b60",
  );
  await expect(page.locator("main")).not.toContainText(
    /Estado:|Bajada:|Metadata editorial|Notas de implementación|Slug propuesto|Fuentes originales|borrador para revisión/,
  );
  await expect(page.locator(".editorial-byline time")).toHaveAttribute(
    "datetime",
    "2026-10-22",
  );
  const cover = page.locator(".editorial-cover img");
  await expect(cover).toHaveAttribute("alt", /ChatGPT Ads/);
  await expect
    .poll(() =>
      cover.evaluate(
        (img: HTMLImageElement) =>
          img.complete &&
          img.naturalWidth === 1600 &&
          img.naturalHeight === 900,
      ),
    )
    .toBe(true);
  const response = await request.get(
    "/editorial/chatgpt-ads-argentina-portada.png",
  );
  expect(response.status()).toBe(200);
  expect(sha256(await response.body())).toBe(
    "ff5cab5af454ff22ac2d6cdfe4fb187403719cdb2066a777e77de82e77b72220",
  );
  expect(
    await page
      .locator("article.editorial-reading a")
      .evaluateAll((links) => links.map((link) => link.getAttribute("href"))),
  ).toEqual([
    "https://openai.com/index/chatgpt-ads-expands-26-new-countries/",
    "https://openai.com/index/chatgpt-ads-expands-26-new-countries/",
    "https://help.openai.com/en/articles/20001245-ads-manager-availability",
    "https://help.openai.com/en/articles/20001245-ads-manager-availability",
    "https://kairum.com.ar/",
    linkedin,
  ]);
  await expect(page.locator("article.editorial-reading p").last()).toHaveText(
    "También abrimos la conversación en LinkedIn: ¿qué necesita preparar tu marca antes de probar este canal?",
  );
});

test("the approved Spanish article is indexable, discoverable and has its own canonical metadata", async ({
  page,
  request,
}) => {
  await page.goto(path);
  await expect(page).toHaveTitle(
    "ChatGPT Ads en Argentina: cómo preparar tu marca | Kairum",
  );
  await expect(page.locator("link[rel=canonical]")).toHaveAttribute(
    "href",
    `https://kairum.com.ar${path}`,
  );
  await expect(page.locator('meta[name="description"]')).toHaveAttribute(
    "content",
    "ChatGPT Ads llegó a Argentina. Qué está confirmado y cómo preparar una estrategia que combine publicidad y visibilidad orgánica en inteligencia artificial.",
  );
  await expect(
    page.locator('meta[name="robots"][content*="noindex"]'),
  ).toHaveCount(0);
  await expect(page.locator("[data-language-link]")).toHaveCount(1);
  const graph = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent())!,
  )["@graph"];
  const article = graph.find(
    (node: { "@type": string }) => node["@type"] === "BlogPosting",
  );
  expect(article.headline).toBe(title);
  expect(article.citation).toEqual([
    "https://openai.com/index/chatgpt-ads-expands-26-new-countries/",
    "https://help.openai.com/en/articles/20001245-ads-manager-availability",
  ]);
  expect(article.image).toBe(
    "https://kairum.com.ar/editorial/chatgpt-ads-argentina-portada.png",
  );
  expect(article.dateModified).toBe("2026-10-22");
  for (const reader of ["/recursos/", "/llms.txt", "/llms-full.txt"]) {
    const target =
      reader === "/recursos/" ? path : `https://kairum.com.ar${path}`;
    expect(await (await request.get(reader)).text()).toContain(target);
  }
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(
    sitemap.match(new RegExp(`<loc>https://kairum.com.ar${path}</loc>`, "g")),
  ).toHaveLength(1);
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

test("the article and its contents navigation stay readable without JavaScript on mobile", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
    viewport: { width: 390, height: 1000 },
  });
  const page = await context.newPage();
  await page.goto(path);
  await page
    .locator('.editorial-toc a[href="#cinco-decisiones-antes-de-empezar"]')
    .focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(`${path}#cinco-decisiones-antes-de-empezar`);
  await expect(
    page.locator("#cinco-decisiones-antes-de-empezar"),
  ).toContainText("5. Separá observaciones de conclusiones");
  await expect(
    page.locator(`article.editorial-reading a[href="${linkedin}"]`),
  ).toHaveCount(1);
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(390);
  await context.close();
});
