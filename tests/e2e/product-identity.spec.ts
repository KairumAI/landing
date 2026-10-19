import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page, type Locator } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { localizedPath } from "../../src/lib/routes";

async function capture(page: Page, name: string, target?: Locator) {
  const folder = process.env.IDENTITY_SCREENSHOTS;
  if (!folder) return;
  await mkdir(folder, { recursive: true });
  const path = join(folder, `${name}.png`);
  await page.evaluate(() => window.scrollTo(0, 0));
  if (target)
    await page.screenshot({
      path,
      fullPage: true,
      clip: (await target.boundingBox())!,
    });
  else await page.screenshot({ path });
}

test.beforeEach(async ({ page }) => {
  await page.route("https://challenges.cloudflare.com/**", (route) =>
    route.abort(),
  );
  await page.emulateMedia({ reducedMotion: "reduce" });
});

test("product and Home icon resources are available as SVGs", async ({
  page,
  request,
}) => {
  const resources = new Set<string>();
  for (const path of [
    "/",
    "/productos/analytics/",
    "/productos/agents/",
    "/productos/prompt-intelligence/",
    "/productos/traffic/",
  ]) {
    await page.goto(path);
    const names = await page
      .locator("[data-icon]")
      .evaluateAll((icons) =>
        icons.map((icon) => icon.getAttribute("data-icon")!),
      );
    for (const name of names) resources.add(`/kairum/assets/icons/${name}.svg`);
  }
  expect(resources.size).toBeGreaterThan(10);
  for (const resource of resources) {
    const response = await request.get(resource);
    expect(response.status(), resource).toBe(200);
    expect(response.headers()["content-type"], resource).toContain(
      "image/svg+xml",
    );
  }
});

for (const locale of ["es", "en", "pt-br"] as const) {
  test(`${locale}: prompt intent selection changes the question and supports keyboard and deep links`, async ({
    page,
  }) => {
    await page.goto(localizedPath("/productos/prompt-intelligence/", locale));
    const scene = page.locator("[data-prompt-demonstration]");
    const tabs = scene.getByRole("tab");
    await expect(tabs).toHaveCount(3);
    const initialQuestion = await scene
      .locator('[role="tabpanel"]:visible h3')
      .innerText();
    await tabs.first().focus();
    await tabs.first().press("ArrowRight");
    await expect(tabs.nth(1)).toBeFocused();
    await expect(tabs.nth(1)).toHaveAttribute("aria-selected", "true");
    await expect(scene.locator('[role="tabpanel"]:visible')).toHaveCount(1);
    await expect(scene.locator('[role="tabpanel"]:visible h3')).not.toHaveText(
      initialQuestion,
    );
    await tabs.nth(1).press("End");
    await expect(tabs.last()).toHaveAttribute("aria-selected", "true");
    await expect(tabs.last()).toBeFocused();
    await page.goto(
      `${localizedPath("/productos/prompt-intelligence/", locale)}#prompt-product-choose`,
    );
    await expect(page.locator("#prompt-product-choose")).toBeVisible();
    await expect(scene.getByRole("tab").last()).toHaveAttribute(
      "aria-selected",
      "true",
    );
  });

  test(`${locale}: traffic keeps visitor and crawler routes distinct and native disclosure works`, async ({
    page,
  }) => {
    await page.goto(localizedPath("/productos/traffic/", locale));
    const people = page.locator('[data-traffic-route="people"]');
    const crawlers = page.locator('[data-traffic-route="crawlers"]');
    await expect(people).toHaveAttribute("open", "");
    await expect(crawlers).toHaveAttribute("open", "");
    await expect(people.locator("li")).toHaveCount(3);
    await expect(crawlers.locator("li")).toHaveCount(3);
    const visitorSource = await people.locator(".pd-route-source").innerText();
    await expect(crawlers.locator(".pd-route-source")).not.toHaveText(
      visitorSource,
    );
    await people.locator("summary").press("Enter");
    await expect(people).not.toHaveAttribute("open");
    await expect(crawlers).toHaveAttribute("open", "");
    await people.locator("summary").press("Enter");
    await expect(people).toHaveAttribute("open", "");
  });
}

test("product demonstrations remain readable and accessible at all supported widths", async ({
  page,
}) => {
  for (const product of ["prompt-intelligence", "traffic"]) {
    await page.goto(`/productos/${product}/`);
    for (const width of [1440, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
      const demo = page.locator(".product-demonstration");
      const box = await demo.boundingBox();
      expect(box).not.toBeNull();
      expect(box!.x).toBeGreaterThanOrEqual(0);
      expect(box!.x + box!.width).toBeLessThanOrEqual(width);
      const audit = await new AxeBuilder({ page })
        .include(".product-demonstration")
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      expect(audit.violations).toEqual([]);
      await capture(page, `${product}-opening-${width}`);
      await capture(page, `${product}-demo-${width}`, demo);
    }
  }
});

test("questions and traffic routes retain native navigation without JavaScript", async ({
  browser,
}) => {
  const context = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 320, height: 844 },
  });
  const page = await context.newPage();
  await page.goto("/productos/prompt-intelligence/");
  const scene = page.locator("[data-prompt-demonstration]");
  await expect(scene.locator("[data-tab-panel]:visible")).toHaveCount(3);
  await scene.locator("[data-tab]").last().click();
  await expect(page).toHaveURL(/#prompt-product-choose$/);
  await expect(page.locator("#prompt-product-choose")).toBeInViewport();
  expect(
    await page.evaluate(() => document.documentElement.scrollWidth),
  ).toBeLessThanOrEqual(320);
  await page.goto("/productos/traffic/");
  const people = page.locator('[data-traffic-route="people"]');
  await people.locator("summary").press("Enter");
  await expect(people).not.toHaveAttribute("open");
  await context.close();
});

test("reducing motion during a functional entrance leaves every reading visible", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.goto("/productos/traffic/#explorar");
  const scene = page.locator("[data-functional-scene]");
  await expect(scene).toHaveAttribute("data-animation", "playing");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(scene).toHaveAttribute("data-animation", "complete");
  const steps = await scene
    .locator("[data-functional-step]")
    .evaluateAll((elements) =>
      elements.map((element) => ({
        opacity: getComputedStyle(element).opacity,
        transform: getComputedStyle(element).transform,
      })),
    );
  expect(steps).toHaveLength(6);
  for (const step of steps)
    expect(step).toEqual({ opacity: "1", transform: "none" });
});

test("Analytics and Agents openings expose their demos with consistent commercial actions", async ({
  page,
}) => {
  const actionColors: string[] = [];
  for (const product of ["analytics", "agents"]) {
    await page.goto(`/productos/${product}/`);
    const demo = page.locator(
      product === "analytics"
        ? "[data-analytics-preview]"
        : "[data-agents-preview]",
    );
    actionColors.push(
      await page
        .locator(".product-hero-copy .button")
        .first()
        .evaluate((element) => getComputedStyle(element).backgroundColor),
    );
    for (const width of [1440, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      await page.evaluate(() => window.scrollTo(0, 0));
      const bounds = (await demo.boundingBox())!;
      if (width === 1440) expect(bounds.y).toBeLessThan(800);
      expect(bounds.x).toBeGreaterThanOrEqual(0);
      expect(bounds.x + bounds.width).toBeLessThanOrEqual(width);
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
      if (product === "analytics")
        await expect(demo).toHaveAttribute("data-chart-ready", "true");
      await capture(page, `${product}-opening-${width}`);
      await capture(page, `${product}-demo-${width}`, demo);
    }
  }
  expect(actionColors[0]).toEqual(actionColors[1]);
});

test("Home and catalog retain one sample per product with distinct visible accents", async ({
  page,
}) => {
  await page.goto("/");
  const modules = ["prompt-intelligence", "analytics", "agents", "traffic"];
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    const colors: string[] = [];
    for (const product of modules) {
      const section = page.locator(`#product-${product}`);
      const demo = section.locator(
        product === "analytics"
          ? "[data-analytics-preview]"
          : product === "agents"
            ? ".agent-workflow"
            : ".product-demonstration",
      );
      await expect(demo).toHaveCount(1);
      await section.scrollIntoViewIfNeeded();
      if (product === "analytics")
        await expect(demo).toHaveAttribute("data-chart-ready", "true");
      colors.push(
        await section
          .locator(".eyebrow")
          .first()
          .evaluate((element) => getComputedStyle(element).color),
      );
      await expect(
        section.locator(`a[href="/productos/${product}/"]`).first(),
      ).toBeVisible();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
      await capture(page, `home-${product}-${width}`, section);
    }
    expect(new Set(colors).size).toBe(4);
  }
  await page.goto("/productos/");
  await expect(page.locator(".catalog-grid .product-card")).toHaveCount(6);
  const iconColors = await Promise.all(
    modules.map((product) =>
      page
        .locator(
          `.product-card[href="/productos/${product}/"] .product-card-top > i`,
        )
        .first()
        .evaluate((element) => getComputedStyle(element).color),
    ),
  );
  expect(new Set(iconColors).size).toBe(4);
  for (const width of [1440, 768, 390, 320]) {
    await page.setViewportSize({ width, height: 1000 });
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
    await capture(page, `catalog-${width}`, page.locator(".catalog-hero"));
  }
});
