import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

const paths = [
  "/recursos/",
  "/blog/",
  "/recursos/como-medir-visibilidad-ia/",
  "/blog/menciones-citas-visitas/",
  "/blog/como-elegir-preguntas/",
  "/blog/como-interpretar-resultados/",
  "/glosario/",
  "/metodologia/",
];

test("keyboard focus stays visible outside the clipped illustration cards", async ({
  page,
}) => {
  await page.goto("/blog/");
  for (const width of [1440, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    const card = page.locator(".editorial-card").first();
    await card.locator("a").focus();
    await expect(card.locator("a")).toBeFocused();
    const indicator = await card.evaluate((element) => {
      const style = getComputedStyle(element);
      return {
        style: style.outlineStyle,
        width: parseFloat(style.outlineWidth),
      };
    });
    expect(indicator.style).not.toBe("none");
    expect(indicator.width).toBeGreaterThanOrEqual(3);
  }
});

test("illustrated readings deliver responsive local covers, useful figures and matching social previews in every language", async ({
  page,
  request,
}) => {
  await page.goto("/blog/");
  const illustrations = page.locator(".editorial-card-image img");
  await expect(illustrations).toHaveCount(3);
  for (const illustration of await illustrations.all()) {
    await illustration.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        illustration.evaluate(
          (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
        ),
      )
      .toBe(true);
  }
  for (const prefix of ["", "/en", "/pt-br"]) {
    for (const path of paths.slice(2, 6)) {
      await page.goto(`${prefix}${path}`);
      const cover = page.locator(".editorial-cover img");
      await expect(cover).toBeVisible();
      await expect(cover).toHaveAttribute("alt", /.+/);
      await expect(cover).toHaveAttribute("srcset", /640w.*1280w/);
      await expect
        .poll(() =>
          cover.evaluate(
            (img: HTMLImageElement) => img.complete && img.naturalWidth > 0,
          ),
        )
        .toBe(true);
      const image = await page
        .locator('meta[property="og:image"]')
        .getAttribute("content");
      expect(image).toMatch(/\/editorial\/.*-social\.jpg$/);
      expect((await request.get(new URL(image!).pathname)).status()).toBe(200);
      const graph = JSON.parse(
        (await page
          .locator('script[type="application/ld+json"]')
          .textContent())!,
      )["@graph"];
      expect(
        graph.find((node: { "@type": string }) =>
          ["Article", "BlogPosting"].includes(node["@type"]),
        ).image,
      ).toBe(image);
      await expect(page.locator(".editorial-takeaways li")).toHaveCount(3);
      await expect(
        page.locator(".editorial-explainer figcaption"),
      ).toBeVisible();
      await expect(page.locator(".editorial-cover figcaption")).toContainText(
        /KAIRUM/,
      );
    }
  }
});

for (const prefix of ["", "/en", "/pt-br"]) {
  test(`${prefix || "es"}: editorial destinations are indexable and expose sources and language equivalents`, async ({
    request,
  }) => {
    for (const path of paths) {
      const response = await request.get(`${prefix}${path}`);
      expect(response.status(), path).toBe(200);
      const html = await response.text();
      expect(html).toContain(
        `rel="canonical" href="https://kairum.com.ar${prefix}${path}"`,
      );
      expect(html).toContain(`hreflang="x-default"`);
      expect(html).not.toContain('name="robots" content="noindex');
      expect(html.match(/<h1\b/g)).toHaveLength(1);
      if (path.startsWith("/blog/") && path !== "/blog/") {
        const json = html.match(
          /<script[^>]*type="application\/ld\+json"[^>]*>(.*?)<\/script>/s,
        )![1];
        const graph = JSON.parse(json)["@graph"];
        const article = graph.find(
          (node: { "@type": string }) => node["@type"] === "BlogPosting",
        );
        expect(article.author.name).toBe("KAIRUM");
        expect(article.headline.length).toBeGreaterThan(20);
        expect(article.citation.length).toBeGreaterThan(0);
        expect(html).toContain('id="fuentes"');
        expect(html).toContain(article.citation[0]);
      }
    }
  });
}

test("Home resources lead to the real hub, blog and guide, with reversible keyboard navigation", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const menu = page
    .locator(".nav-menu")
    .filter({ has: page.locator('[aria-controls="menu-resources"]') });
  await menu.locator("summary").focus();
  await page.keyboard.press("Enter");
  await menu.getByRole("link", { name: /Blog/ }).click();
  await expect(page).toHaveURL(/\/blog\/$/);
  await expect(
    page
      .locator("main article a[href='/blog/menciones-citas-visitas/']")
      .first(),
  ).toBeVisible();
  await page.goto("/");
  await page.locator("#recursos .home-section-heading a").click();
  await expect(page).toHaveURL(/\/recursos\/$/);
  await page
    .locator('main a[href="/recursos/como-medir-visibilidad-ia/"]')
    .first()
    .click();
  await expect(page.locator("main h1")).toContainText("visibilidad");
  await expect(
    page.locator("main a[href='/productos/report/']").first(),
  ).toBeVisible();
});

test("NoJS articles keep sources readable and support keyboard language switching", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
    viewport: { width: 320, height: 900 },
  });
  const page = await context.newPage();
  await page.goto("/blog/menciones-citas-visitas/#fuentes");
  await expect(page.locator("#fuentes")).toBeVisible();
  await expect(page.locator("main .editorial-reading")).toBeVisible();
  // Native focus and activation exercise the keyboard path without racing the
  // browser's initial smooth scroll to #fuentes with Playwright's auto-scroll.
  await page.locator('a[data-language-link][lang="en"]').focus();
  await page.keyboard.press("Enter");
  await expect(page).toHaveURL(/\/en\/blog\/menciones-citas-visitas\/$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "en");
  await expect(page.locator("main .editorial-reading")).toBeVisible();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(320);
  await context.close();
});

test("new editorial pages reflow, have no accessibility blockers and report no script errors", async ({
  page,
}) => {
  test.slow();
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  for (const path of [
    "/recursos/",
    "/blog/",
    "/recursos/como-medir-visibilidad-ia/",
    "/blog/menciones-citas-visitas/",
    "/glosario/",
    "/metodologia/",
    "/soluciones/agencias/",
  ]) {
    await page.goto(path);
    for (const width of [1440, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
        `${path} at ${width}`,
      ).toBeLessThanOrEqual(width);
    }
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(audit.violations, path).toEqual([]);
  }
  expect(errors).toEqual([]);
});

test("commercial pages explain their scope, identify AI Report and link to the guide", async ({
  page,
}) => {
  for (const path of [
    "/productos/report/",
    "/productos/analytics/",
    "/soluciones/agencias/",
  ]) {
    await page.goto(path);
    await expect(
      page.locator(
        path === "/soluciones/agencias/"
          ? '[data-audience-page="agencias"]'
          : "main [data-editorial-commercial]",
      ),
    ).toBeVisible();
    await expect(
      page
        .locator('main a[href="/recursos/como-medir-visibilidad-ia/"]')
        .first(),
    ).toBeVisible();
    await expect(page).toHaveTitle(/(?:visibilidad|GEO y AEO)/);
  }
  await page.goto("/productos/report/");
  await expect(page.locator(".product-subnav")).toContainText("AI Report");
});

test("new pages are discoverable in sitemap and text readers, with no unfinished legal routes", async ({
  request,
}) => {
  const sitemap = await (await request.get("/sitemap.xml")).text();
  expect(sitemap.match(/<loc>/g)).toHaveLength(60);
  const llms = await (await request.get("/llms.txt")).text();
  for (const path of paths) {
    expect(sitemap).toContain(`<loc>https://kairum.com.ar${path}</loc>`);
    expect(llms).toContain(`https://kairum.com.ar${path}`);
  }
  for (const path of ["/privacidad/", "/terminos/"])
    expect((await request.get(path)).status()).toBe(404);
  expect((await request.get("/blog/articulo-inexistente/")).status()).toBe(404);
});
