import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Locator } from "@playwright/test";

const bookingUrl = "https://calendly.com/brunodecruz/30min";

async function heightSamples(answer: Locator) {
  return answer.evaluate(
    (element) =>
      new Promise<number[]>((resolve) => {
        const heights: number[] = [];
        const start = performance.now();
        function sample() {
          heights.push(element.getBoundingClientRect().height);
          if (performance.now() - start < 500) requestAnimationFrame(sample);
          else resolve(heights);
        }
        requestAnimationFrame(sample);
      }),
  );
}

const locales = [
  { path: "/", lang: "es-AR", title: "KAIRUM · Visibilidad de marca en IA" },
  { path: "/en/", lang: "en", title: "KAIRUM · AI Brand Visibility" },
  {
    path: "/pt-br/",
    lang: "pt-BR",
    title: "KAIRUM · Visibilidade de marca em IA",
  },
];

for (const locale of locales) {
  test(`${locale.path} loads all local resources and fits desktop/mobile`, async ({
    page,
    baseURL,
  }) => {
    const errors: string[] = [];
    const external: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("response", (response) => {
      if (response.status() >= 400)
        errors.push(`${response.status()} ${response.url()}`);
    });
    page.on("request", (request) => {
      if (new URL(request.url()).origin !== new URL(baseURL!).origin)
        external.push(request.url());
    });
    await page.emulateMedia({ reducedMotion: "reduce" });
    const response = await page.goto(locale.path);
    expect(response?.status()).toBe(200);
    await expect(page).toHaveTitle(locale.title);
    await expect(page.locator("html")).toHaveAttribute("lang", locale.lang);
    await expect(page.locator('link[rel="canonical"]')).toHaveAttribute(
      "href",
      `https://kairum.com.ar${locale.path}`,
    );
    // Every page lists every language plus x-default, so search engines can pair them.
    const alternates = await page
      .locator('link[rel="alternate"][hreflang]')
      .evaluateAll((links) =>
        links.map((link) => [
          link.getAttribute("hreflang"),
          link.getAttribute("href"),
        ]),
      );
    expect(alternates).toEqual([
      ["es", "https://kairum.com.ar/"],
      ["en", "https://kairum.com.ar/en/"],
      ["pt-BR", "https://kairum.com.ar/pt-br/"],
      ["x-default", "https://kairum.com.ar/"],
    ]);
    await expect(page.locator("main > section")).toHaveCount(10);
    await expect(page.locator(".brand-lockup")).toHaveCount(4);
    await expect(page.locator("body")).toHaveAttribute(
      "data-motion",
      "reduced",
    );
    await page.evaluate(() => document.fonts.ready);
    // The footer logo is lazy: bring it into view before checking every image.
    await page.locator("footer").scrollIntoViewIfNeeded();
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
      360, 390, 600, 601, 620, 768, 850, 851, 900, 1024, 1100, 1280, 1440,
    ]) {
      await page.setViewportSize({ width, height: 1000 });
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
      const nav = page.locator(".nav");
      expect(
        await nav.evaluate(
          (element) => element.scrollWidth <= element.clientWidth,
        ),
      ).toBe(true);
    }
    const audit = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(audit.violations).toEqual([]);
    expect(errors).toEqual([]);
    expect(external).toEqual([]);
  });
}

test("language switcher opens a translated page whose scripts use its own strings", async ({
  page,
}) => {
  await page.goto("/");
  await page
    .getByRole("navigation", { name: "Idioma" })
    .getByRole("link", { name: "Português" })
    .click();
  await expect(page).toHaveURL(/\/pt-br\/$/);
  await expect(
    page
      .getByRole("navigation", { name: "Idioma" })
      .getByRole("link", { name: "Português" }),
  ).toHaveAttribute("aria-current", "page");
  await page.locator("#motion-toggle").click();
  await expect(page.locator("#motion-toggle")).toHaveAccessibleName(
    "Ativar animações",
  );
  await expect(page.locator("#hero-pause")).toHaveAccessibleName(
    "Retomar demonstração",
  );
});

test("all three booking links navigate to the supplied Calendly without JavaScript", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
  });
  // Verify navigation without requesting availability or scheduling a meeting.
  await context.route(`${bookingUrl}**`, (route) =>
    route.fulfill({
      contentType: "text/html",
      body: "<title>Booking destination</title>",
    }),
  );
  const page = await context.newPage();
  await page.goto("/");
  const links = page.getByRole("link", { name: "Hablemos", exact: true });
  await expect(links).toHaveCount(3);
  for (const link of await links.all()) {
    await expect(link).toHaveAttribute("href", bookingUrl);
    await expect(link).toHaveAttribute("rel", "noopener noreferrer");
    const popupPromise = context.waitForEvent("page");
    await link.click();
    const popup = await popupPromise;
    await expect(popup).toHaveURL(bookingUrl);
    await popup.close();
  }
  const faq = page.locator(".faq-list details").first();
  await faq.locator("summary").click();
  await expect(faq.locator("p")).toBeVisible();
  await faq.locator("summary").click();
  await expect(faq.locator("p")).toBeHidden();
  await context.close();
});

test("FAQ animates both directions and handles rapid keyboard reversals", async ({
  page,
}) => {
  await page.goto("/#preguntas");
  const faq = page.locator(".faq-list details").first();
  const summary = faq.locator("summary");
  const answer = faq.locator(".faq-answer");
  await summary.scrollIntoViewIfNeeded();
  await summary.press("Enter");
  const opening = await heightSamples(answer);
  const openHeight = opening.at(-1)!;
  expect(opening.some((height) => height > 0 && height < openHeight - 1)).toBe(
    true,
  );
  await expect(faq).toHaveAttribute("open", "");
  await summary.press("Space");
  const closing = await heightSamples(answer);
  expect(closing.some((height) => height > 0 && height < openHeight - 1)).toBe(
    true,
  );
  await expect(faq).not.toHaveAttribute("open");
  await summary.press("Enter");
  await summary.press("Enter");
  await expect(faq).not.toHaveAttribute("open");
  await expect(summary).toBeFocused();
  expect(await answer.evaluate((element) => element.style.height)).toBe("");
});

test("hero animation progresses and its pause control holds the current state", async ({
  page,
}) => {
  await page.goto("/");
  const query = page.locator("#hero-query");
  await page.locator("#hero-replay").click();
  await expect
    .poll(async () => (await query.textContent())!.length)
    .toBeGreaterThan(4);
  await page.locator("#hero-pause").click();
  const pausedText = await query.textContent();
  // A fixed observation window is necessary to prove the animation stays paused.
  await page.waitForTimeout(350);
  await expect(query).toHaveText(pausedText!);
  await page.locator("#hero-pause").click();
  await expect
    .poll(async () => (await query.textContent())!.length)
    .toBeGreaterThan(pausedText!.length);
  await page.locator("#motion-toggle").click();
  await expect(page.locator("#motion-toggle")).toHaveAttribute(
    "aria-pressed",
    "true",
  );
});

test("mobile selectors, journey, report dialog and navigation remain usable", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  await page.locator(".menu-toggle").click();
  await expect(page.locator("#mobile-nav")).toBeVisible();
  await page.locator('#mobile-nav a[href="#equipos"]').click();
  await expect(page.locator("#mobile-nav")).toBeHidden();
  for (const key of ["contenido", "agencias", "marca"]) {
    await page.locator(`[data-audience="${key}"]`).click();
    await expect(page.locator("#audience-panel")).toHaveAttribute(
      "data-selected-audience",
      key,
    );
    await expect(
      page.locator('[data-audience][aria-pressed="true"]'),
    ).toHaveCount(1);
  }
  for (let stage = 0; stage < 5; stage++) {
    await page.locator(`[data-stage="${stage}"]`).click();
    await expect(page.locator(".journey-canvas")).toHaveAttribute(
      "data-stage-active",
      String(stage),
    );
  }
  await page.locator('[data-stage="1"]').click();
  await expect(page.locator(".path-active")).toHaveCount(4);
  await page.locator('[data-provider="2"]').click();
  await expect(page.locator("#stack-provider")).toHaveText("Claude API");
  await page.locator('.pattern-controls [data-intent="elegir"]').click();
  await expect(page.locator("#pattern-question")).toContainText(
    "antes de elegir",
  );
  await page.locator('[data-source="1"]').click();
  await expect(page.locator("#source-url")).toContainText("sector.example");
  await page.locator('[data-module="fuentes"]').click();
  await page.locator('[data-module="menciones"]').click();
  await expect(page.locator('[data-module="prioridades"]')).toBeDisabled();
  await page.locator("#read-report").click();
  await expect(page.locator("#report-dialog")).toBeVisible();
  await expect(page.locator("#expanded-report .report-module")).toHaveCount(1);
  await page.locator(".report-evidence summary").click();
  await expect(page.locator(".report-review")).toContainText(
    "quedan sin confirmar",
  );
  const audit = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
    .analyze();
  expect(audit.violations).toEqual([]);
  await page.keyboard.press("Escape");
  await expect(page.locator("#read-report")).toBeFocused();
  expect(await page.evaluate(() => document.documentElement.scrollWidth)).toBe(
    390,
  );
});

test("reduced motion makes FAQ immediate and reacts to preference changes", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#preguntas");
  await expect(page.locator("body")).toHaveAttribute("data-motion", "reduced");
  const faq = page.locator(".faq-list details").first();
  await faq.locator("summary").click();
  await expect(faq).toHaveAttribute("open", "");
  await expect(faq).not.toHaveAttribute("data-faq-animating");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(page.locator("body")).toHaveAttribute("data-motion", "full");
  await faq.locator("summary").press("Enter");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(faq).not.toHaveAttribute("open");
  await expect(faq).not.toHaveAttribute("data-faq-animating");
});

test("unknown page returns the KAIRUM 404 layout", async ({ page }) => {
  const response = await page.goto("/pagina-inexistente");
  expect(response?.status()).toBe(404);
  await expect(page).toHaveTitle("Página no encontrada · KAIRUM");
  await expect(
    page.getByRole("heading", { name: "No encontramos esta página." }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Volver al inicio", exact: true }),
  ).toHaveAttribute("href", "/");
});
