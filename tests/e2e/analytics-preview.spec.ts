import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { localizedPath } from "../../src/lib/routes";
import { analyticsStoryCopy } from "../../src/i18n/analytics-story";

for (const locale of ["es", "en", "pt-br"] as const) {
  test(`${locale}: all three Analytics scenes remain readable and interactive`, async ({
    page,
  }) => {
    const copy = analyticsStoryCopy[locale];
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`${localizedPath("/", locale)}#product-analytics`);
    const story = page.locator('[data-analytics-preview="home"]');
    await expect(story.locator(".as-story-section")).toHaveCount(3);
    await expect(story.locator(".as-disclosure")).toHaveCount(3);
    for (const heading of copy.headings)
      await expect(
        story.getByRole("heading", { name: heading, exact: true }),
      ).toBeVisible();
    await expect(story).toHaveAttribute("data-chart-ready", "true");
    await story
      .getByRole("radio", { name: copy.periods[1], exact: true })
      .check();
    await expect(
      story.locator(".as-chart-data tbody tr:not([hidden])"),
    ).toHaveCount(14);
    await story
      .getByRole("radio", { name: copy.periods[0], exact: true })
      .check();
    await expect(
      story.locator(".as-chart-data tbody tr:not([hidden])"),
    ).toHaveCount(7);
    await story.getByRole("checkbox", { name: copy.comparison }).uncheck();
    await expect(story.locator(".as-series-1")).toBeHidden();
    await story.getByRole("checkbox", { name: copy.comparison }).check();
    await expect(story.locator(".as-series-1")).toBeVisible();
    const narrative = story.locator(".as-narratives details").nth(1);
    await narrative.locator("summary").click();
    await expect(narrative).toHaveAttribute("open", "");
    await expect(narrative).toContainText(copy.topics[1].response);
    const sources = story.locator(".as-source-tabs");
    await sources
      .getByRole("tab", { name: copy.sourceViews[1], exact: true })
      .click();
    await expect(
      sources.locator("[data-tab-panel]:visible tbody tr"),
    ).toHaveCount(3);
    await expect(sources).toContainText(copy.pageSample);
    await sources
      .getByRole("tab", { name: copy.sourceViews[0], exact: true })
      .click();
    await expect(
      sources.locator("[data-tab-panel]:visible tbody tr"),
    ).toHaveCount(6);
    await sources.locator("[data-tab-panel]:visible summary").first().click();
    await expect(
      sources.locator("[data-tab-panel]:visible details[open]"),
    ).toContainText(copy.sources[0].description);
    await expect(story.locator('a[href*=".example"]')).toHaveCount(0);
    for (const width of [1440, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
        `${locale} / ${width}`,
      ).toBeLessThanOrEqual(width);
      for (const panel of await story.locator(".as-workspace").all()) {
        const box = (await panel.boundingBox())!;
        expect(box.x).toBeGreaterThanOrEqual(0);
        expect(box.x + box.width).toBeLessThanOrEqual(width);
      }
      for (const summary of await story
        .locator(".as-chart-data > summary, .as-sentiment-data > summary")
        .all()) {
        expect((await summary.boundingBox())!.height).toBeGreaterThanOrEqual(
          44,
        );
      }
    }
    const audit = await new AxeBuilder({ page })
      .include("[data-analytics-story]")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(audit.violations).toEqual([]);
    expect(errors).toEqual([]);
  });

  test(`${locale}: the product shares the light scenes, source deep links and keyboard tabs`, async ({
    page,
  }) => {
    const copy = analyticsStoryCopy[locale];
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(
      `${localizedPath("/productos/analytics/", locale)}#analytics-preview-product-source-1`,
    );
    const story = page.locator('[data-analytics-preview="product"]');
    await expect(story.locator(".as-story-section")).toHaveCount(3);
    const ownPages = story.getByRole("tab", {
      name: copy.sourceViews[1],
      exact: true,
    });
    await expect(ownPages).toHaveAttribute("aria-selected", "true");
    await expect(
      story.locator("#analytics-preview-product-source-1"),
    ).toBeVisible();
    await ownPages.focus();
    await ownPages.press("ArrowLeft");
    const domains = story.getByRole("tab", {
      name: copy.sourceViews[0],
      exact: true,
    });
    await expect(domains).toBeFocused();
    await expect(domains).toHaveAttribute("aria-selected", "true");
    await domains.press("End");
    await expect(ownPages).toBeFocused();
    const background = await page
      .locator(".product-hero")
      .evaluate((el) => getComputedStyle(el).backgroundColor);
    expect(background).toBe("rgb(250, 250, 247)");
    await page.setViewportSize({ width: 320, height: 1000 });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(320);
    const audit = await new AxeBuilder({ page })
      .include("[data-analytics-story]")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(audit.violations).toEqual([]);
  });
}

test("without JavaScript all scenes, source views and underlying observations stay reachable", async ({
  browser,
  baseURL,
}) => {
  const context = await browser.newContext({
    baseURL,
    javaScriptEnabled: false,
    reducedMotion: "reduce",
    viewport: { width: 320, height: 1000 },
  });
  const page = await context.newPage();
  await page.goto("/productos/analytics/#analytics-preview-product-sources");
  const story = page.locator("[data-analytics-story]");
  await expect(story.locator(".as-story-section")).toHaveCount(3);
  await expect(story.locator(".as-chart-data tbody tr")).toHaveCount(14);
  await expect(story.locator(".as-chart-data")).toHaveAttribute("open", "");
  for (const panel of await story
    .locator(".as-source-tabs [data-tab-panel]")
    .all()) {
    await expect(panel).toBeVisible();
  }
  await expect(story.locator("[data-as-period]").first()).toBeHidden();
  const detail = story.locator(".as-source-table details").first();
  await detail.locator("summary").press("Enter");
  await expect(detail).toHaveAttribute("open", "");
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(320);
  await context.close();
});
