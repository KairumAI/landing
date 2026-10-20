import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { readFileSync } from "node:fs";
import { pages, localizedPath, pageLocales } from "../../src/lib/routes";
import { editorialMedia } from "../../src/lib/editorial-media";
import { localeMeta, locales } from "../../src/i18n/locales";

const bookingUrl = "https://calendly.com/brunodecruz/30min";
const titles = {
  es: "KAIRUM — Visibilidad de marca en IA",
  en: "KAIRUM — AI Brand Visibility",
  "pt-br": "KAIRUM — Visibilidade de marca em IA",
};
const navNames = { es: "Productos", en: "Products", "pt-br": "Produtos" };
const languageNames = { es: "Idioma", en: "Language", "pt-br": "Idioma" };
const seoOrigin = "https://kairum.com.ar";
const turnstileScript =
  "https://challenges.cloudflare.com/turnstile/v0/api.js?render=explicit";

test.beforeEach(async ({ page }) => {
  await page.route("https://submit-form.com/**", (route) => route.abort());
  await page.route(
    (url) => url.href === turnstileScript,
    (route) =>
      route.fulfill({
        contentType: "application/javascript",
        body: `window.turnstile = {
        render(_container, options) { options.callback('synthetic-turnstile-token'); return 'offline-widget'; },
        reset() {}
      };`,
      }),
  );
});

for (const locale of locales) {
  test(`${locale}: Home loads local assets, keeps R05 and reflows without errors`, async ({
    page,
    baseURL,
  }) => {
    test.slow();
    const errors: string[] = [],
      external: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("response", (response) => {
      if (response.status() >= 400)
        errors.push(`${response.status()} ${response.url()}`);
    });
    page.on("request", (request) => {
      if (
        new URL(request.url()).origin !== new URL(baseURL!).origin &&
        request.url() !== turnstileScript
      )
        external.push(request.url());
    });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const response = await page.goto(localizedPath("/", locale));
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(titles[locale]);
    await expect(page.locator("html")).toHaveAttribute(
      "lang",
      localeMeta[locale].htmlLang,
    );
    await expect(page.locator("body")).toHaveAttribute(
      "data-motion",
      "reduced",
    );
    await expect(page.locator("main>section")).toHaveCount(9);
    await expect(page.locator("main h1")).toHaveCount(1);
    await expect(page.locator(".model-ecosystem img")).toHaveCount(5);
    await expect(page.locator('section[id^="product-"]')).toHaveCount(4);
    await expect(page.locator("[data-home-depth]")).toHaveCount(0);
    await expect(
      page.locator("#hero-pause,#motion-toggle,[data-story-select]"),
    ).toHaveCount(0);
    for (const section of await page.locator("main>section").all())
      await section.scrollIntoViewIfNeeded();
    await expect
      .poll(() =>
        page
          .locator("img")
          .evaluateAll((images) =>
            images.every(
              (image) =>
                image instanceof HTMLImageElement &&
                image.complete &&
                image.naturalWidth > 0,
            ),
          ),
      )
      .toBe(true);
    for (const width of [
      320, 390, 650, 651, 768, 960, 961, 1024, 1200, 1201, 1360, 1361, 1440,
    ]) {
      await page.setViewportSize({ width, height: 1000 });
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
    }
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(audit.violations).toEqual([]);
    expect(errors).toEqual([]);
    expect(external).toEqual([]);
  });

  test(`${locale}: all marketing and editorial pages have equivalent metadata, real destinations and working scripts`, async ({
    page,
    request,
  }) => {
    test.slow();
    const errors: string[] = [],
      links = new Set<string>(),
      descriptions = new Set<string>();
    page.on("pageerror", (error) => errors.push(error.message));
    await page.emulateMedia({ reducedMotion: "reduce" });
    const availablePages = pages.filter((entry) =>
      pageLocales(entry.id).includes(locale),
    );
    for (const entry of availablePages) {
      const path = localizedPath(entry.path, locale);
      const response = await page.goto(path);
      expect(response?.status(), path).toBe(200);
      await expect(page.locator("html")).toHaveAttribute(
        "lang",
        localeMeta[locale].htmlLang,
      );
      await expect(page.locator("body")).toHaveAttribute("data-page", entry.id);
      await expect(page.locator("body")).toHaveAttribute(
        "data-enhanced",
        "true",
      );
      await expect(page.locator("main h1")).toHaveCount(1);
      const description = await page
        .locator('meta[name="description"]')
        .getAttribute("content");
      expect(description!.length).toBeGreaterThan(40);
      descriptions.add(description!);
      if (entry.indexable) {
        await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
          "href",
          `${seoOrigin}${path}`,
        );
        const alternates = await page
          .locator("link[hreflang]")
          .evaluateAll((links) =>
            links.map((link) => [
              link.getAttribute("hreflang"),
              link.getAttribute("href"),
            ]),
          );
        expect(alternates).toEqual([
          ...pageLocales(entry.id).map((code) => [
            localeMeta[code].hreflang,
            `${seoOrigin}${localizedPath(entry.path, code)}`,
          ]),
          ["x-default", `${seoOrigin}${entry.path}`],
        ]);
      } else {
        await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
          "content",
          "noindex, follow",
        );
        await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
      }
      await expect(page.locator('meta[property="og:url"]')).toHaveAttribute(
        "content",
        `${seoOrigin}${path}`,
      );
      await expect(page.locator('meta[property="og:image"]')).toHaveAttribute(
        "content",
        `${seoOrigin}${editorialMedia(entry.id)?.social ?? localeMeta[locale].ogImage}`,
      );
      await expect(page.locator('meta[name="twitter:image"]')).toHaveAttribute(
        "content",
        (await page
          .locator('meta[property="og:image"]')
          .getAttribute("content"))!,
      );
      await expect(page.locator('meta[name="twitter:title"]')).toHaveAttribute(
        "content",
        await page.title(),
      );
      const language = page.getByRole("navigation", {
        name: languageNames[locale],
        exact: true,
      });
      for (const code of pageLocales(entry.id)) {
        await expect(
          language.getByRole("link", {
            name: localeMeta[code].name,
            exact: true,
          }),
        ).toHaveAttribute("href", localizedPath(entry.path, code));
      }
      for (const width of [320, 1440]) {
        await page.setViewportSize({ width, height: 1000 });
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth),
          path,
        ).toBeLessThanOrEqual(width);
      }
      const pageLinks = await page
        .locator("a[href]")
        .evaluateAll((links) =>
          links.map((link) => link.getAttribute("href")!),
        );
      for (const href of pageLinks)
        if (href.startsWith("/") && !href.startsWith("/kairum/"))
          links.add(href.split("#")[0]);
      const data = JSON.parse(
        (await page
          .locator('script[type="application/ld+json"]')
          .textContent())!,
      );
      expect(
        data["@graph"].some(
          (item: { "@type": string }) => item["@type"] === "FAQPage",
        ),
      ).toBe(
        [
          "report",
          "analytics",
          "agents",
          "prompt-intelligence",
          "traffic",
          "consulting",
        ].includes(entry.id),
      );
    }
    expect(descriptions.size).toBe(availablePages.length);
    for (const path of links)
      expect((await request.get(path)).status(), path).toBe(200);
    expect(errors).toEqual([]);
  });

  test(`${locale}: desktop product menu uses keyboard, closes with Escape and reaches a product`, async ({
    page,
  }) => {
    await page.goto(localizedPath("/", locale));
    const menu = page.locator(".site-nav>.nav-menu").first();
    const summary = menu.locator("summary");
    await expect(summary).toContainText(navNames[locale]);
    await summary.focus();
    await summary.press("Enter");
    await expect(menu).toHaveAttribute("open", "");
    await expect(menu.locator(".menu-products a[href]")).toHaveCount(7);
    await summary.press("ArrowDown");
    await expect(menu.locator(".nav-popover a").first()).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(menu).not.toHaveAttribute("open");
    await expect(summary).toBeFocused();
    await summary.press("Enter");
    await menu
      .locator(".menu-products")
      .getByRole("link", { name: /Analytics/ })
      .click();
    await expect(page).toHaveURL(
      new RegExp(`${localizedPath("/productos/analytics/", locale)}$`),
    );
    await expect(
      page.locator('[data-analytics-preview="product"]'),
    ).toHaveCount(1);
  });
}

test("language selector preserves the product and section; dynamic menu labels are translated", async ({
  page,
}) => {
  await page.goto("/productos/traffic/#capacidades");
  await page
    .getByRole("navigation", { name: "Idioma", exact: true })
    .getByRole("link", { name: "Português", exact: true })
    .click();
  await expect(page).toHaveURL(/\/pt-br\/productos\/traffic\/#capacidades$/);
  await expect(page.locator("html")).toHaveAttribute("lang", "pt-BR");
  await expect(page.locator("main h1")).toContainText("site");
  await page.setViewportSize({ width: 320, height: 1000 });
  const button = page.locator(".menu-toggle");
  await expect(button).toHaveAccessibleName("Abrir menu");
  await button.click();
  await expect(button).toHaveAccessibleName("Fechar menu");
  await page.keyboard.press("Escape");
  await expect(button).toHaveAccessibleName("Abrir menu");
  await expect(button).toBeFocused();
});

test("compact menus remain reversible and link to real pages", async ({
  page,
}) => {
  await page.goto("/");
  for (const name of ["Soluciones", "Recursos", "Empresa"]) {
    const menu = page
      .locator(".site-nav .nav-menu")
      .filter({ has: page.locator("summary").filter({ hasText: name }) });
    const summary = menu.locator("summary");
    await summary.focus();
    await summary.press("Enter");
    await expect(menu).toHaveAttribute("open", "");
    await expect(menu.locator(".nav-popover")).toBeVisible();
    expect(
      await menu
        .locator(".nav-popover")
        .evaluate((element) => element.getBoundingClientRect().right),
    ).toBeLessThanOrEqual(1440);
    await page.keyboard.press("Escape");
    await expect(menu).not.toHaveAttribute("open");
    await expect(summary).toBeFocused();
  }
});

test("product openers preserve approved scenes and Analytics uses the illustrative comparison", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  const scenes = {
    "prompt-intelligence": "prompts",
    traffic: "traffic",
  };
  for (const [product, scene] of Object.entries(scenes)) {
    await page.goto(`/productos/${product}/`);
    await expect(page.locator(`[data-home-scene="${scene}"]`)).toHaveCount(1);
    await expect(page.locator("[data-home-depth]")).toHaveCount(0);
    await expect(page.locator("main")).not.toContainText(
      /Prendo|Norte|Planificado/,
    );
  }
  await page.goto("/productos/agents/");
  await expect(page.locator('[data-agents-preview="product"]')).toBeVisible();
  await expect(page.locator(".agent-workflow")).toHaveCount(0);
  await page.goto("/productos/analytics/");
  await expect(
    page.locator('[data-analytics-preview="product"]'),
  ).toBeVisible();
  await expect(
    page.locator(
      ".analytics-sidebar,.analytics-plinth,canvas[data-study-chart]",
    ),
  ).toHaveCount(0);
});

test("product FAQ works with keyboard and reacts to reduced motion", async ({
  page,
}) => {
  await page.goto("/productos/traffic/#preguntas");
  const faq = page.locator(".faq-list details").first(),
    summary = faq.locator("summary");
  await summary.press("Enter");
  await expect(faq).toHaveAttribute("open", "");
  await expect(faq.locator(".faq-answer")).toBeVisible();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("body")).toHaveAttribute("data-motion", "reduced");
  await summary.press("Enter");
  await expect(faq).not.toHaveAttribute("open");
  await expect(summary).toBeFocused();
});

test("ambient motion continues after entry and reduced preference settles all scenes", async ({
  page,
}) => {
  await page.goto("/");
  const scene = page.locator('[data-home-scene="answer"]');
  await expect(scene).toHaveAttribute("data-animation", "complete", {
    timeout: 12000,
  });
  await expect(scene).toHaveAttribute("data-ambient", "playing");
  const object = scene.locator("[data-home-drift]").first();
  await expect
    .poll(() =>
      object.evaluate((element) => getComputedStyle(element).animationName),
    )
    .not.toBe("none");
  const first = await object.evaluate(
    (element) => getComputedStyle(element).translate,
  );
  // A real observation interval is needed to verify continuing motion after the entrance.
  await page.waitForTimeout(1200);
  expect(
    await object.evaluate((element) => getComputedStyle(element).translate),
  ).not.toBe(first);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(scene).toHaveAttribute("data-ambient", "reduced");
  await expect
    .poll(() =>
      object.evaluate((element) => getComputedStyle(element).animationName),
    )
    .toBe("none");
  await expect(page.locator("[data-brand-rotator]")).toHaveAttribute(
    "data-rotation",
    "reduced",
  );
});

for (const locale of locales) {
  test(`${locale}: the Home Analytics sample stays readable with full motion and loads menu masks`, async ({
    page,
  }) => {
    const failures: string[] = [];
    page.on("pageerror", (error) => failures.push(error.message));
    page.on("response", (response) => {
      if (response.status() >= 400)
        failures.push(`${response.status()} ${response.url()}`);
    });
    page.on("console", (message) => {
      if (message.text().includes("could not initialize"))
        failures.push(message.text());
    });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto(localizedPath("/", locale));
    const menu = page.locator(".nav-menu").filter({
      has: page.locator("summary").filter({ hasText: navNames[locale] }),
    });
    await menu.locator("summary").press("Enter");
    for (const icon of await menu.locator("[data-icon]").all()) {
      const name = await icon.getAttribute("data-icon");
      expect(
        (await page.request.get(`/kairum/assets/icons/${name}.svg`)).status(),
      ).toBe(200);
      expect(
        await icon.evaluate((element) => getComputedStyle(element).maskImage),
      ).toContain(`${name}.svg`);
    }
    await menu.locator("summary").press("Escape");
    const scene = page.locator('[data-analytics-preview="home"]');
    await scene.scrollIntoViewIfNeeded();
    await expect(scene).toBeVisible();
    await expect(
      scene.locator(
        ".analytics-sidebar,.analytics-plinth,canvas[data-study-chart]",
      ),
    ).toHaveCount(0);
    await expect(scene.locator(".as-story-section")).toHaveCount(1);
    await expect(scene).toHaveAttribute("data-chart-ready", "true");
    await expect(scene.locator("canvas")).toHaveCount(1);
    expect((await scene.innerText()).length).toBeGreaterThan(120);
    expect(failures).toEqual([]);
  });
}

test("product anchors prefer their own section and preserve keyboard focus", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/productos/report/#como-funciona");
  const section = page.locator("#como-funciona");
  await expect(section).toBeInViewport();
  await expect
    .poll(() =>
      section.evaluate((element) => element.getBoundingClientRect().top),
    )
    .toBeLessThan(180);
  await page
    .locator(".product-subnav")
    .getByRole("link", { name: "FAQ", exact: true })
    .click();
  await expect(page.locator("#preguntas")).toBeFocused();
  await page
    .locator(".product-subnav")
    .getByRole("link", { name: "Cómo funciona", exact: true })
    .click();
  await expect(section).toBeFocused();
  await expect(page).toHaveURL(/#como-funciona$/);
  await page.reload();
  await expect(section).toBeInViewport();
  await expect
    .poll(() =>
      section.evaluate((element) => element.getBoundingClientRect().top),
    )
    .toBeLessThan(180);
});

test("NoJS keeps content, native product FAQ and booking links at 320px", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
    viewport: { width: 320, height: 1000 },
  });
  const page = await context.newPage();
  await page.goto("/");
  await expect(page.locator("main>section")).toHaveCount(9);
  await expect(page.locator(".prompt-research-plan li")).toHaveCount(3);
  await expect(page.locator(".traffic-observation-note")).toContainText(
    "no demuestra",
  );
  await expect(page.locator('[data-analytics-preview="home"]')).toBeVisible();
  await expect(page.locator('[data-analytics-preview="home"]')).toContainText(
    "Tu marca",
  );
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(320);
  for (const link of await page.locator("a[data-book]").all()) {
    await expect(link).toHaveAttribute("href", bookingUrl);
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
  }
  await page.goto("/productos/traffic/");
  const faq = page.locator(".faq-list details").first();
  await faq.locator("summary").click();
  await expect(faq.locator(".faq-answer")).toBeVisible();
  await expect(page.locator("body")).not.toHaveAttribute("data-enhanced");
  await context.close();
});

test("sitemap covers the indexable published locales and robots/llms describe current content", async ({
  request,
}) => {
  const sitemap = await request.get("/sitemap.xml");
  expect(sitemap.status()).toBe(200);
  const xml = await sitemap.text();
  expect(xml.match(/<loc>/g)).toHaveLength(61);
  for (const page of pages)
    for (const locale of locales) {
      const url = `${seoOrigin}${localizedPath(page.path, locale)}`;
      expect(xml.includes(`<loc>${url}</loc>`)).toBe(
        page.indexable && pageLocales(page.id).includes(locale),
      );
    }
  expect(xml).not.toContain("404");
  expect(xml).not.toContain("<lastmod>");
  const robots = await (await request.get("/robots.txt")).text();
  expect(robots).toContain(`Sitemap: ${seoOrigin}/sitemap.xml`);
  expect(robots).toContain("Allow: /");
  const index = await (await request.get("/llms.txt")).text();
  expect(index).toContain("/en/productos/analytics/");
  expect(index).toContain("/pt-br/productos/traffic/");
  for (const locale of locales) {
    const full = await (
      await request.get(`${localeMeta[locale].path}llms-full.txt`)
    ).text();
    expect(full).toContain("Prompt Intelligence");
    expect(full).toContain("Brand Hub");
    expect(full).not.toContain("Norte");
  }
});

test("JSON-LD FAQ answers match the visible product copy, without ratings or offers", async ({
  page,
}) => {
  for (const locale of locales) {
    await page.goto(localizedPath("/productos/traffic/", locale));
    const data = JSON.parse(
      (await page.locator('script[type="application/ld+json"]').textContent())!,
    );
    const faq = data["@graph"].find(
      (item: { "@type": string }) => item["@type"] === "FAQPage",
    );
    const questions = await page.locator(".faq-list summary").allTextContents();
    const answers = await page.locator(".faq-answer").allTextContents();
    expect(faq.mainEntity.map((item: { name: string }) => item.name)).toEqual(
      questions.map((text) => text.trim()),
    );
    expect(
      faq.mainEntity.map(
        (item: { acceptedAnswer: { text: string } }) =>
          item.acceptedAnswer.text,
      ),
    ).toEqual(answers.map((text) => text.trim()));
    expect(JSON.stringify(data)).not.toMatch(
      /aggregateRating|reviewCount|priceCurrency/,
    );
  }
});

test("self-only CSP permits the actual bundle and local tabs with no policy violations", async ({
  browser,
  baseURL,
}) => {
  const csp = readFileSync("public/_headers", "utf8")
    .split("\n")
    .find((line) => line.includes("Content-Security-Policy:"))!
    .split("Content-Security-Policy:")[1]
    .trim();
  const context = await browser.newContext({ baseURL });
  const violations: string[] = [],
    errors: string[] = [];
  await context.route("**/*", async (route) => {
    const response = await route.fetch();
    await route.fulfill({
      response,
      headers: { ...response.headers(), "content-security-policy": csp },
    });
  });
  const page = await context.newPage();
  page.on("console", (message) => {
    if (
      message.type() === "error" &&
      message.text().includes("Content Security Policy")
    )
      violations.push(message.text());
  });
  page.on("pageerror", (error) => errors.push(error.message));
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/productos/analytics/");
  await expect(page.locator("body")).toHaveAttribute("data-enhanced", "true");
  await page
    .locator('[data-analytics-preview="product"]')
    .scrollIntoViewIfNeeded();
  await page.locator("#analytics-preview-product-sources-tab").click();
  await page
    .locator('[data-analytics-preview="product"] [data-tab]')
    .last()
    .click();
  await expect(
    page.locator(
      '[data-analytics-preview="product"] > [data-tab-panel]:visible',
    ),
  ).toHaveCount(1);
  expect(violations).toEqual([]);
  expect(errors).toEqual([]);
  await context.close();
});

for (const locale of locales) {
  test(`${locale}: custom 404 file has its translated recovery link and noindex`, async ({
    page,
  }) => {
    await page.goto(`${localeMeta[locale].path}404.html`);
    await expect(page.locator("html")).toHaveAttribute(
      "lang",
      localeMeta[locale].htmlLang,
    );
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      "noindex, follow",
    );
    await expect(page.locator('link[rel="canonical"]')).toHaveCount(0);
    await expect(page.locator("main nav a")).toHaveAttribute(
      "href",
      localeMeta[locale].path,
    );
  });
}
test("unknown URL returns 404 instead of a marketing page", async ({
  page,
}) => {
  const response = await page.goto("/pagina-inexistente");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { name: "No encontramos esta página." }),
  ).toBeVisible();
});
