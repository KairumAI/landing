import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import {
  audienceCopy,
  type AudiencePageId,
} from "../../src/i18n/audience-pages";
import { contactCopy } from "../../src/i18n/contact";
import { locales } from "../../src/i18n/locales";

const destinations: Record<AudiencePageId, string> = {
  marcas: "/soluciones/marcas/",
  agencias: "/soluciones/agencias/",
  nosotros: "/nosotros/",
};

test.beforeEach(async ({ page }) => {
  await page.route("https://submit-form.com/**", (route) => route.abort());
  await page.route("https://challenges.cloudflare.com/**", (route) =>
    route.abort(),
  );
});

for (const locale of locales) {
  for (const [id, path] of Object.entries(destinations) as [
    AudiencePageId,
    string,
  ][]) {
    test(`${locale}/${id}: distinct content, one contact form and readable mobile layout`, async ({
      page,
    }) => {
      const errors: string[] = [];
      page.on("pageerror", (error) => errors.push(error.message));
      await page.emulateMedia({ reducedMotion: "reduce" });
      const prefix = locale === "es" ? "" : `/${locale}`;
      await page.goto(`${prefix}${path}`);
      const copy = audienceCopy(locale);
      const audience = page.locator(`[data-audience-page="${id}"]`);
      await expect(audience).toBeVisible();
      await expect(page.getByRole("heading", { level: 1 })).toHaveCount(1);
      for (const line of copy.heroes[id].title.split("\n"))
        await expect(audience.locator("h1")).toContainText(line);
      await expect(
        audience.locator(".info-context, .related-grid"),
      ).toHaveCount(0);
      await expect(page.locator("[data-contact-form]")).toHaveCount(1);
      await expect(
        audience.locator(".closing-section [data-contact-form]"),
      ).toHaveCount(1);
      await expect(
        audience.locator(".closing-inner > .button"),
      ).toHaveAttribute("href", /calendly\.com/);
      await expect(
        audience.getByLabel(contactCopy[locale].name, { exact: true }),
      ).toHaveAttribute("required", "");
      expect(
        await audience
          .locator(".closing-section")
          .evaluate((element) => getComputedStyle(element).backgroundColor),
      ).toBe("rgb(255, 196, 0)");

      if (id === "marcas") {
        await expect(audience.locator("[data-audience-answer]")).toBeVisible();
        await expect(
          audience.locator("[data-audience-answer] figcaption"),
        ).toHaveText(copy.brands.example.label);
        await expect(audience.locator(".audience-answer-note")).toContainText(
          copy.brands.example.annotation,
        );
        await expect(
          audience.locator(".audience-product-links > a"),
        ).toHaveCount(3);
        for (const product of ["report", "analytics", "agents"])
          await expect(
            audience.locator(
              `.audience-product-links > a[href="${prefix}/productos/${product}/"]`,
            ),
          ).toHaveCount(1);
      } else if (id === "agencias") {
        await expect(
          audience.locator("[data-audience-deliverable]"),
        ).toBeVisible();
        await expect(
          audience.locator("[data-audience-deliverable] figcaption"),
        ).toHaveText(copy.agencies.example.label);
        await expect(
          audience.locator("[data-audience-workflow] ol > li"),
        ).toHaveCount(4);
        await expect(
          audience.locator("[data-audience-roles] .audience-role"),
        ).toHaveCount(2);
      } else {
        await expect(
          audience.locator("[data-audience-manifesto]"),
        ).toBeVisible();
        await expect(
          audience.locator("[data-audience-method] ol > li"),
        ).toHaveCount(3);
        await expect(
          audience.locator(
            "[data-audience-answer], [data-audience-deliverable], .audience-product-links",
          ),
        ).toHaveCount(0);
      }
      for (const width of [1440, 320]) {
        await page.setViewportSize({ width, height: 1000 });
        expect(
          await page.evaluate(() => document.documentElement.scrollWidth),
        ).toBeLessThanOrEqual(width);
        const booking = audience
          .locator(".audience-hero .button, .audience-about-hero .button")
          .first();
        if (await booking.count()) {
          await booking.focus();
          await expect(booking).toBeFocused();
          expect(
            await booking.evaluate((element) =>
              parseFloat(getComputedStyle(element).outlineWidth),
            ),
          ).toBeGreaterThanOrEqual(3);
        }
        const folder = process.env.AUDIENCE_SCREENSHOTS;
        if (folder) {
          await mkdir(folder, { recursive: true });
          await page.screenshot({
            path: join(folder, `${locale}-${id}-${width}.png`),
            fullPage: true,
          });
        }
      }
      expect(errors).toEqual([]);
    });
  }
}

for (const [id, path] of Object.entries(destinations)) {
  test(`${id}: audience content is accessible without animations or external services`, async ({
    page,
  }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(path);
    const result = await new AxeBuilder({ page })
      .include(`[data-audience-page="${id}"]`)
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(result.violations).toEqual([]);
  });
}
