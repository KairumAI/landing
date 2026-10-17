import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { localizedPath } from "../../src/lib/routes";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";

async function capture(
  preview: import("@playwright/test").Locator,
  name: string,
) {
  const folder = process.env.ANALYTICS_SCREENSHOTS;
  if (!folder) return;
  await mkdir(folder, { recursive: true });
  const page = preview.page();
  const viewport = page.viewportSize()!;
  const box = (await preview.boundingBox())!;
  // Keep the full panel below the sticky product nav in evidence captures.
  const height = Math.max(viewport.height, Math.ceil(box.height) + 240);
  await page.setViewportSize({ ...viewport, height });
  await preview.evaluate((element) =>
    element.scrollIntoView({ block: "center" }),
  );
  await preview.screenshot({ path: join(folder, `${name}.png`) });
  await page.setViewportSize(viewport);
}

const examples = {
  es: {
    question: "¿Qué software sirve para coordinar un equipo de diseño?",
    disclosure: "Ejemplo ilustrativo",
    tabs: ["Comparación", "Alternativas", "Fuentes"],
    brand: "Tu marca",
    quote: "Briefs, comentarios y revisiones por proyecto en un solo lugar.",
  },
  en: {
    question: "What software helps coordinate a design team?",
    disclosure: "Illustrative example",
    tabs: ["Comparison", "Alternatives", "Sources"],
    brand: "Your brand",
    quote: "Briefs, comments and reviews for each project in one place.",
  },
  "pt-br": {
    question: "Qual software ajuda a coordenar uma equipe de design?",
    disclosure: "Exemplo ilustrativo",
    tabs: ["Comparação", "Alternativas", "Fontes"],
    brand: "Sua marca",
    quote: "Briefs, comentários e revisões por projeto em um só lugar.",
  },
} as const;

for (const locale of ["es", "en", "pt-br"] as const) {
  test(`${locale}: Home and product share a readable example and product tabs show distinct evidence`, async ({
    page,
  }) => {
    const copy = examples[locale];
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(localizedPath("/", locale));
    const home = page.locator('[data-analytics-preview="home"]');
    await expect(home.locator(".analytics-preview-question")).toHaveText(
      copy.question,
    );
    await expect(home).toContainText(copy.disclosure);
    await expect(home.locator("[data-analytics-reading]")).toHaveCount(2);
    await expect(home.locator("[data-tabs]")).toHaveCount(0);
    await expect(page.locator("#product-analytics canvas")).toHaveCount(0);
    await expect(home.locator(".analytics-preview-change")).toBeVisible();
    await capture(home, `${locale}-home-1440`);
    await page.setViewportSize({ width: 320, height: 1000 });
    await capture(home, `${locale}-home-320`);
    await page.setViewportSize({ width: 1440, height: 1000 });

    await page.goto(localizedPath("/productos/analytics/", locale));
    const product = page.locator('[data-analytics-preview="product"]');
    await expect(product.getByRole("tab")).toHaveCount(3);
    await expect(
      product.getByRole("tab", { name: copy.tabs[0], exact: true }),
    ).toHaveAttribute("aria-selected", "true");
    await expect(
      product.locator(".analytics-preview-question").first(),
    ).toHaveText(copy.question);
    await expect(
      product.locator("[data-tab-panel]:visible [data-analytics-reading]"),
    ).toHaveCount(2);
    await expect(
      product.locator(".analytics-preview-conditions").first(),
    ).toContainText(
      /condiciones de consulta|query conditions|condições de consulta/,
    );
    await expect(product.locator(".analytics-preview-scope")).toBeVisible();
    await capture(product, `${locale}-comparison-1440`);

    await product.getByRole("tab", { name: copy.tabs[1], exact: true }).click();
    const alternatives = product.locator(
      "#analytics-preview-product-alternatives",
    );
    await expect(alternatives).toBeVisible();
    await expect(alternatives.locator("li")).toHaveCount(3);
    await expect(alternatives).toContainText(copy.brand);
    await expect(alternatives.locator("dt")).toHaveCount(6);
    await expect(
      product.locator("#analytics-preview-product-comparison"),
    ).toBeHidden();
    await capture(product, `${locale}-alternatives-1440`);

    await product.getByRole("tab", { name: copy.tabs[2], exact: true }).click();
    const sources = product.locator("#analytics-preview-product-sources");
    await expect(sources).toBeVisible();
    await expect(sources.locator("blockquote")).toHaveText(copy.quote);
    await expect(sources.locator("code")).toContainText(".example/");
    await expect(sources.locator('a[href*=".example"]')).toHaveCount(0);
    await expect(sources.locator("dt")).toHaveCount(2);
    await expect(alternatives).toBeHidden();
    await capture(product, `${locale}-sources-1440`);

    for (const width of [320, 390, 768, 1440]) {
      await page.setViewportSize({ width, height: 1000 });
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
        `${locale} at ${width}px`,
      ).toBeLessThanOrEqual(width);
      const bounds = (await product.boundingBox())!;
      expect(bounds.x).toBeGreaterThanOrEqual(0);
      expect(bounds.x + bounds.width).toBeLessThanOrEqual(width);
      if (width === 320) {
        for (const [index, name] of copy.tabs.entries()) {
          await product.getByRole("tab", { name, exact: true }).click();
          await expect(product.locator("[data-tab-panel]:visible")).toHaveCount(
            1,
          );
          await capture(
            product,
            `${locale}-${["comparison", "alternatives", "sources"][index]}-320`,
          );
        }
      }
    }
    const audit = await new AxeBuilder({ page })
      .include('[data-analytics-preview="product"]')
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(audit.violations).toEqual([]);
    expect(errors).toEqual([]);
  });
}

test("product tabs support keyboard selection, roving focus and a direct source fragment", async ({
  page,
}) => {
  await page.goto("/productos/analytics/");
  const preview = page.locator('[data-analytics-preview="product"]');
  const comparison = preview.getByRole("tab", {
    name: "Comparación",
    exact: true,
  });
  const alternatives = preview.getByRole("tab", {
    name: "Alternativas",
    exact: true,
  });
  const sources = preview.getByRole("tab", { name: "Fuentes", exact: true });
  await comparison.focus();
  await comparison.press("ArrowRight");
  await expect(alternatives).toBeFocused();
  await expect(alternatives).toHaveAttribute("aria-selected", "true");
  await alternatives.press("ArrowRight");
  await expect(sources).toBeFocused();
  await sources.press("ArrowRight");
  await expect(comparison).toBeFocused();
  await comparison.press("ArrowLeft");
  await expect(sources).toBeFocused();
  await sources.press("Home");
  await expect(comparison).toBeFocused();
  await comparison.press("End");
  await expect(sources).toBeFocused();
  await expect(sources).toHaveAttribute("tabindex", "0");
  await expect(comparison).toHaveAttribute("tabindex", "-1");
  await page.keyboard.press("Tab");
  await expect(
    preview.locator("#analytics-preview-product-sources"),
  ).toBeFocused();
  await comparison.focus();
  await comparison.press("Enter");
  await expect(comparison).toHaveAttribute("aria-selected", "true");
  await sources.focus();
  await sources.press(" ");
  await expect(sources).toHaveAttribute("aria-selected", "true");

  await page.goto("/productos/analytics/#analytics-preview-product-sources");
  await expect(sources).toHaveAttribute("aria-selected", "true");
  await expect(
    preview.locator("#analytics-preview-product-sources"),
  ).toBeVisible();
  await page.reload();
  await expect(sources).toHaveAttribute("aria-selected", "true");
  const audit = await new AxeBuilder({ page })
    .include('[data-analytics-preview="product"]')
    .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
    .analyze();
  expect(audit.violations).toEqual([]);
});

test("without JavaScript the product keeps all evidence reachable through native anchors at 320px", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    baseURL,
    viewport: { width: 320, height: 1000 },
  });
  const page = await context.newPage();
  await page.goto("/productos/analytics/");
  const preview = page.locator('[data-analytics-preview="product"]');
  await expect(preview.locator("[data-tab-panel]:visible")).toHaveCount(3);
  await preview.getByRole("link", { name: "Fuentes", exact: true }).click();
  await expect(page).toHaveURL(/#analytics-preview-product-sources$/);
  await expect(preview.locator("blockquote")).toContainText(
    "revisiones por proyecto",
  );
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(320);
  await context.close();
});

test("an active source tab stays painted through another click and delayed font/load readiness", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  let releaseFont!: () => void;
  const fontGate = new Promise<void>((resolve) => {
    releaseFont = resolve;
  });
  await page.route("**/kairum/assets/inter.woff2", async (route) => {
    await fontGate;
    await route.continue();
  });
  try {
    await page.goto("/productos/analytics/#analytics-preview-product-sources", {
      waitUntil: "domcontentloaded",
    });
    const preview = page.locator('[data-analytics-preview="product"]');
    const sources = preview.getByRole("tab", { name: "Fuentes", exact: true });
    const panel = preview.locator("#analytics-preview-product-sources");
    await expect(sources).toHaveAttribute("aria-selected", "true");
    await expect(panel).toHaveCSS("opacity", "1");
    await expect(panel).toHaveCSS("transform", "none");
    const url = page.url();
    await page.evaluate(() => {
      const element = document.getElementById(
        "analytics-preview-product-sources",
      )!;
      const recording = {
        running: true,
        frames: [] as { opacity: number; transform: string }[],
      };
      Object.assign(window, { __activeTabRecording: recording });
      const sample = () => {
        const style = getComputedStyle(element);
        recording.frames.push({
          opacity: Number(style.opacity),
          transform: style.transform,
        });
        if (recording.running) requestAnimationFrame(sample);
      };
      sample();
    });
    await sources.click();
    // Releasing the real font also lets the original page load and fonts.ready
    // promises settle. Their anchor restoration must not replay a visible tab.
    releaseFont();
    await page.waitForLoadState("load");
    await page.evaluate(() => document.fonts.ready.then(() => undefined));
    const frames = await page.evaluate(
      () =>
        new Promise<{ opacity: number; transform: string }[]>((resolve) => {
          const recording = (
            window as unknown as {
              __activeTabRecording: {
                running: boolean;
                frames: { opacity: number; transform: string }[];
              };
            }
          ).__activeTabRecording;
          requestAnimationFrame(() =>
            requestAnimationFrame(() => {
              recording.running = false;
              resolve(recording.frames);
            }),
          );
        }),
    );
    expect(frames.length).toBeGreaterThan(2);
    expect(
      frames.filter(
        (frame) => frame.opacity < 0.99 || frame.transform !== "none",
      ),
    ).toEqual([]);
    await expect(panel).toBeVisible();
    expect(page.url()).toBe(url);
  } finally {
    releaseFont();
  }
});

test("a manual tab change survives late font and page readiness after a source deep link", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  let releaseFont!: () => void;
  const fontGate = new Promise<void>((resolve) => {
    releaseFont = resolve;
  });
  await page.route("**/kairum/assets/inter.woff2", async (route) => {
    await fontGate;
    await route.continue();
  });
  try {
    await page.goto("/productos/analytics/#analytics-preview-product-sources", {
      waitUntil: "domcontentloaded",
    });
    const preview = page.locator('[data-analytics-preview="product"]');
    const sources = preview.getByRole("tab", { name: "Fuentes", exact: true });
    const comparison = preview.getByRole("tab", {
      name: "Comparación",
      exact: true,
    });
    await expect(sources).toHaveAttribute("aria-selected", "true");
    await comparison.click();
    await expect(comparison).toHaveAttribute("aria-selected", "true");
    await expect(
      preview.locator("#analytics-preview-product-comparison"),
    ).toBeVisible();

    releaseFont();
    await page.waitForLoadState("load");
    await page.evaluate(() => document.fonts.ready.then(() => undefined));
    await expect(comparison).toHaveAttribute("aria-selected", "true");
    await expect(sources).toHaveAttribute("aria-selected", "false");
    await expect(
      preview.locator("#analytics-preview-product-comparison"),
    ).toBeVisible();
  } finally {
    releaseFont();
  }
});
