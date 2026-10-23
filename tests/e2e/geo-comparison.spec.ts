import { createHash } from "node:crypto";
import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const path = "/blog/kairum-vs-fardo-cleexs-tribu-geo/";
const title =
  "KAIRUM vs. Fardo, Cleexs y Tribu GEO: de la pregunta a la acción";
const sha256 = (value: string | Buffer) =>
  createHash("sha256").update(value).digest("hex");
const assets = [
  [
    "KAIRUM-matriz-valor-v3.png",
    "06f34adc5fc9bc80b4e5d5d4577451a56ee566f77ca8ba589dd6d68dc420347d",
  ],
  [
    "KAIRUM-matriz-valor-movil-v3.png",
    "6e51d7065f4d0a895ea75389489c721a89bfee8d52301ecd1b2abe0f6ea2e36b",
  ],
  [
    "KAIRUM-pregunta-a-accion-v3.png",
    "d85579668f7c926c0c65104fefe2c1945bb3d874ffbe48bcd6b936333ca13389",
  ],
  [
    "KAIRUM-pregunta-a-accion-movil-v3.png",
    "9fc7dbbf28c83f0a31da1a0cd573b944f5256757a815fa9364e83cd42a88d169",
  ],
];

test("comparison preserves the approved V4 text, six short paragraphs and original V3 graphics", async ({
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
        "article.editorial-reading h2, article.editorial-reading p, article.editorial-reading th, article.editorial-reading td, article.editorial-reading li",
      )
      .allTextContents()),
  ]
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
  // Fingerprint derived from the approved Markdown before implementation.
  expect(sha256(text)).toBe(
    "6c3e59d141cae14dcbb875e4d9d9fec5ee83e811755e35534e9b07ea77f05a17",
  );
  await expect(page.locator("#como-lo-resolvemos-en-kairum > p")).toHaveCount(
    6,
  );
  await expect(
    page.locator("#compara-capacidades-no-solo-checks + section"),
  ).toHaveAttribute("id", "como-lo-resolvemos-en-kairum");
  await expect(page.locator("article.editorial-reading h3")).toHaveCount(0);
  await expect(page.locator("main")).not.toContainText(
    /Nota editorial interna|Sentinel_|Borrador privado|No integrado ni publicado/,
  );
  await expect(page.locator(".editorial-byline time")).toHaveAttribute(
    "datetime",
    "2026-10-23",
  );
  await expect(page.locator("article.editorial-reading ol li")).toHaveCount(5);
  for (const [name, hash] of assets) {
    const response = await request.get(`/editorial/${name}`);
    expect(response.status()).toBe(200);
    expect(sha256(await response.body())).toBe(hash);
  }
  for (const img of await page
    .locator(".editorial-comparison-figure img")
    .all()) {
    await img.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        img.evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
      )
      .toBe(true);
    await expect(img).toHaveAttribute("alt", /.+/);
  }
  const links = await page
    .locator("article.editorial-reading a")
    .evaluateAll((links) =>
      links
        .map((link) => link.getAttribute("href"))
        .filter((href) => !href?.startsWith("/editorial/")),
    );
  expect(links).toEqual([
    "https://www.heyfardo.com/en/planes",
    "https://cleexs.net/",
    "https://cleexs.net/articulos/guia-pro-visibilidad-en-motores-de-ia-para-pymes/",
    "https://tribugeo.com/servicios/posicionamiento-en-chatgpt/",
    "https://tribugeo.com/servicios/agentes-ia/",
    "https://kairum.com.ar/productos/report/",
    "https://kairum.com.ar/productos/consulting/",
    "https://www.heyfardo.com/en/planes",
    "https://chromewebstore.google.com/detail/fardo-be-the-answer/edgjbdfgllebaldjejnhjmmagniekgpm",
    "https://cleexs.net/",
    "https://cleexs.net/articulos/guia-pro-visibilidad-en-motores-de-ia-para-pymes/",
    "https://tribugeo.com/servicios/posicionamiento-en-chatgpt/",
    "https://tribugeo.com/servicios/agentes-ia/",
  ]);
  for (const product of ["report", "consulting"])
    expect((await request.get(`/productos/${product}/`)).status()).toBe(200);
});

test("only the approved Spanish comparison is indexable and discoverable", async ({
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
  await expect(
    page.locator('meta[name="robots"][content*="noindex"]'),
  ).toHaveCount(0);
  const graph = JSON.parse(
    (await page.locator('script[type="application/ld+json"]').textContent())!,
  )["@graph"];
  const article = graph.find(
    (node: { "@type": string }) => node["@type"] === "BlogPosting",
  );
  expect(article.headline).toBe(title);
  expect(article.dateModified).toBe("2026-10-23");
  expect(article.citation).toHaveLength(6);
  for (const reader of ["/recursos/", "/llms.txt", "/llms-full.txt"])
    expect(await (await request.get(reader)).text()).toContain(path);
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
    expect(sitemap).not.toContain(`https://kairum.com.ar/${locale}${path}`);
  }
});

test("responsive figures, the accessible table and contents navigation work without JavaScript", async ({
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
    const matrix = page.locator(".editorial-comparison-figure img").first();
    await matrix.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        matrix.evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
      )
      .toBe(true);
    expect(
      await matrix.evaluate((img: HTMLImageElement) => img.currentSrc),
    ).toContain(
      width <= 1100
        ? "KAIRUM-matriz-valor-movil-v3.png"
        : "KAIRUM-matriz-valor-v3.png",
    );
    await page.locator(".editorial-comparison-table summary").click();
    await expect(
      page.locator(".editorial-comparison-table table"),
    ).toBeVisible();
    await expect(page.locator("thead th[scope=col]")).toHaveCount(5);
    await expect(page.locator("tbody th[scope=row]")).toHaveCount(6);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
  }
  await page.locator('.editorial-toc a[href="#fuentes"]').focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(`${path}#fuentes`);
  await expect(page.locator("#fuentes")).toContainText(
    "no se realizó una auditoría técnica independiente",
  );
  await context.close();
});

test("comparison has no accessibility blockers or runtime errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 320, height: 1000 });
  await page.goto(path);
  await page.locator(".editorial-comparison-table summary").click();
  const audit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(audit.violations).toEqual([]);
  expect(errors).toEqual([]);
});
