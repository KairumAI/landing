import { expect, test } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { join } from "node:path";
import { audienceCopy } from "../../src/i18n/audience-pages";
import { locales } from "../../src/i18n/locales";

for (const locale of locales) {
  test(`${locale}: about shows only the three approved teammates, in slide order`, async ({
    page,
  }) => {
    await page.route("https://challenges.cloudflare.com/**", (route) =>
      route.abort(),
    );
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`${locale === "es" ? "" : `/${locale}`}/nosotros/`);
    const team = page.locator("[data-audience-team]");
    await expect(team).toBeVisible();
    await expect(team.getByRole("heading", { level: 2 })).toHaveText(
      audienceCopy(locale).about.team.title,
    );
    const members = team.locator("li");
    await expect(members).toHaveCount(3);
    await expect(members.locator("h3")).toHaveText([
      "Bruno De Cruz",
      "Joaquín Cadeiras",
      "Joaquín Alderete",
    ]);
    for (const [index, expected] of [
      ["Data Scientist", "Mercado Libre"],
      ["Founder", "Alveo"],
      ["Lead Engineer", "ViewX"],
    ].entries()) {
      const member = members.nth(index);
      await expect(member).toContainText(expected[0]!);
      await expect(member).toContainText(expected[1]!);
      const image = member.getByRole("img");
      await expect(image).toHaveAttribute(
        "alt",
        await member.locator("h3").innerText(),
      );
      await expect(image).toBeVisible();
      expect(
        await image.evaluate(
          (element: HTMLImageElement) => element.naturalWidth,
        ),
      ).toBeGreaterThan(0);
    }
    await expect(page.locator("main")).not.toContainText(/Santiago|Barron/);
    for (const width of [1440, 768, 390, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      const bounds = await members.evaluateAll((elements) =>
        elements.map((element) => {
          const rect = element.getBoundingClientRect();
          return { x: rect.x, y: rect.y, right: rect.right };
        }),
      );
      for (const rect of bounds) {
        expect(rect.x).toBeGreaterThanOrEqual(0);
        expect(rect.right).toBeLessThanOrEqual(width);
      }
      if (width > 650)
        expect(new Set(bounds.map((rect) => rect.y)).size).toBe(1);
      else expect(new Set(bounds.map((rect) => rect.y)).size).toBe(3);
      const folder = process.env.ABOUT_TEAM_SCREENSHOTS;
      if (folder) {
        await mkdir(folder, { recursive: true });
        await page.evaluate(() => window.scrollTo(0, 0));
        const clip = await team.boundingBox();
        await page.screenshot({
          path: join(folder, `${locale}-team-${width}.png`),
          fullPage: true,
          clip: clip!,
        });
      }
    }
    await expect(page.locator("[data-contact-form]")).toHaveCount(1);
  });
}
