import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { agentsProductCopy } from "../../src/i18n/agents-product";
import { localizedPath } from "../../src/lib/routes";

for (const locale of ["es", "en", "pt-br"] as const) {
  const c = agentsProductCopy[locale];
  test(`${locale}: Agents explains each content path and reflows its full workspace`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(localizedPath("/productos/agents/", locale));
    await expect(page).toHaveTitle(c.metaTitle);
    await expect(page.locator("main h1")).toHaveText(c.title);
    const preview = page.locator("[data-agents-preview]");
    await expect(preview).toHaveAccessibleName(c.preview);
    await expect(preview.locator(".agp-disclosure")).toHaveCount(1);
    await expect(page.locator(".agp-benefit-grid article")).toHaveCount(4);
    await expect(page.locator(".agp-chapter")).toHaveCount(3);
    for (const width of [1440, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      for (const flow of c.flows) {
        const tab = preview.getByRole("tab", { name: flow.name, exact: true });
        await tab.click();
        await expect(tab).toHaveAttribute("aria-selected", "true");
        const panel = preview.locator(".agp-flow-panel:visible");
        await expect(preview.locator(".agp-flow-panel:visible")).toHaveCount(1);
        await expect(panel).toContainText(flow.brief);
        await expect(
          panel.getByRole("heading", { name: flow.documentTitle, exact: true }),
        ).toBeVisible();
        const step = panel.locator(".agp-nodes details").nth(1);
        await step.locator("summary").press("Enter");
        await expect(step).toHaveAttribute("open", "");
        await expect(step).toContainText(c.stepDetails[1]);
        await step.locator("summary").press("Enter");
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth),
          `${locale}/${width}/${flow.name}`,
        ).toBeLessThanOrEqual(width);
        for (const summary of await panel.locator("summary").all())
          expect((await summary.boundingBox())!.height).toBeGreaterThanOrEqual(
            44,
          );
        const box = (await preview.boundingBox())!;
        expect(box.x).toBeGreaterThanOrEqual(0);
        expect(box.x + box.width).toBeLessThanOrEqual(width);
      }
    }
    const audit = await new AxeBuilder({ page })
      .include("main")
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(audit.violations).toEqual([]);
    expect(errors).toEqual([]);
    expect(
      await page
        .locator(".product-hero")
        .evaluate((el) => getComputedStyle(el).backgroundColor),
    ).toBe("rgb(255, 253, 245)");
  });

  test(`${locale}: Agents preserves deep links, keyboard review and source destinations`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(
      `${localizedPath("/productos/agents/", locale)}#agents-improve`,
    );
    const preview = page.locator("[data-agents-preview]");
    const improve = preview.getByRole("tab", {
      name: c.flows[1].name,
      exact: true,
    });
    await expect(improve).toHaveAttribute("aria-selected", "true");
    await improve.focus();
    await improve.press("End");
    const faq = preview.getByRole("tab", {
      name: c.flows[2].name,
      exact: true,
    });
    await expect(faq).toBeFocused();
    await expect(faq).toHaveAttribute("aria-selected", "true");
    await faq.press("Home");
    await expect(
      preview.getByRole("tab", { name: c.flows[0].name, exact: true }),
    ).toBeFocused();
    await page.locator(".agp-template-grid a").nth(2).click();
    await expect(faq).toHaveAttribute("aria-selected", "true");
    await expect(page.locator("#agents-faq")).toBeInViewport();
    const editor = page.locator(".agp-editor");
    const original = editor.getByRole("tab", {
      name: c.review.original,
      exact: true,
    });
    await original.click();
    await expect(editor.locator(".agp-version:visible")).toHaveText(
      new RegExp(c.review.before.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")),
    );
    await original.press("ArrowLeft");
    await expect(
      editor.getByRole("tab", { name: c.review.proposed, exact: true }),
    ).toBeFocused();
    await expect(editor.locator(".agp-version:visible")).toContainText(
      c.review.after,
    );
    const diff = editor.locator(".agp-diff");
    await diff.locator("summary").press("Enter");
    await expect(diff.locator("del")).toHaveText(c.review.before);
    await expect(diff.locator("ins")).toHaveText(c.review.after);
    await expect(diff).toContainText(c.review.changesText);
    const criteria = editor.locator(".agp-review details").nth(2);
    await criteria.locator("summary").press("Enter");
    await expect(criteria).toContainText(c.review.checks[2].text);
    for (const [i, path] of [
      "/metodologia/",
      "/recursos/como-medir-visibilidad-ia/",
      "/blog/menciones-citas-visitas/",
    ].entries()) {
      const link = page.locator(".agp-sources > a").nth(i);
      await expect(link).toHaveAttribute("href", localizedPath(path, locale));
      expect((await page.request.get(localizedPath(path, locale))).ok()).toBe(
        true,
      );
    }
    const faqAnswer = page.locator(".faq-list details").first();
    await faqAnswer.locator("summary").press("Enter");
    await expect(faqAnswer).toContainText(c.publicationAnswer);
    const schema = await page
      .locator('script[type="application/ld+json"]')
      .textContent();
    expect(schema).toContain(c.publicationAnswer);
    expect(await page.locator("main").innerText()).not.toMatch(
      /condicional segura|conditional writ|escrita condicional/,
    );
    await page.goto(
      `${localizedPath("/productos/agents/", locale)}#agents-review-1`,
    );
    await page.reload();
    await expect(page.locator("#agents-review-1")).toBeVisible();
    await expect(page.locator("#agents-review-1-tab")).toHaveAttribute(
      "aria-selected",
      "true",
    );
    await expect(page.locator("body")).toHaveAttribute(
      "data-motion",
      "reduced",
    );
  });
}

test("Home retains a single compact Agents sample leading to the full product", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/#product-agents");
  const section = page.locator("#product-agents");
  await expect(section.locator('[data-home-scene="agents"]')).toHaveCount(1);
  await expect(section.locator(".agent-paper")).toHaveCount(4);
  await expect(section.locator("[data-agents-preview]")).toHaveCount(0);
  await section.locator('a[href="/productos/agents/"]').click();
  await expect(page.locator("[data-agents-preview]")).toBeVisible();
});

test("Agents keeps all content paths, source links and review details usable without JavaScript", async ({
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
  for (const locale of ["es", "en", "pt-br"] as const) {
    const c = agentsProductCopy[locale];
    await page.goto(localizedPath("/productos/agents/", locale));
    for (const panel of await page.locator(".agp-flow-panel").all())
      await expect(panel).toBeVisible();
    await expect(page.locator(".agp-version")).toHaveCount(2);
    for (const panel of await page.locator(".agp-version").all())
      await expect(panel).toBeVisible();
    const diff = page.locator(".agp-diff");
    await diff.locator("summary").press("Enter");
    await expect(diff.locator("ins")).toHaveText(c.review.after);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(320);
    await expect(page.locator(".agp-flow-tabs a").nth(2)).toHaveAttribute(
      "href",
      "#agents-faq",
    );
  }
  await context.close();
});
