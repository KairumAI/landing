import { expect, test } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

for (const width of [1440, 390]) {
  for (const state of ["checking", "captcha-error"]) {
    test(`${width}/${state}: completing verification keeps the page and scroll position stable`, async ({
      page,
    }) => {
      await page.setViewportSize({ width, height: 1000 });
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.route("https://submit-form.com/**", (route) => route.abort());
      await page.route("https://challenges.cloudflare.com/**", (route) =>
        route.fulfill({
          contentType: "application/javascript",
          body: `window.turnstile = { render(container, options) {
        window.finishLayoutVerification = () => options.callback('layout-test-token');
        window.failLayoutVerification = options['error-callback'];
        return 'layout-widget';
      }, reset() {} };`,
        }),
      );
      await page.goto("/");
      await expect(page.locator("[data-contact-form]")).toHaveAttribute(
        "data-configured",
        "true",
      );
      await page.evaluate(() =>
        window.scrollTo(0, document.documentElement.scrollHeight),
      );
      await expect
        .poll(() =>
          page.evaluate(
            () =>
              typeof (
                window as unknown as { finishLayoutVerification?: () => void }
              ).finishLayoutVerification,
          ),
        )
        .toBe("function");
      const status = page.locator("[data-contact-status]");
      if (state === "captcha-error") {
        await page.evaluate(() => {
          (
            window as unknown as { failLayoutVerification: () => void }
          ).failLayoutVerification();
          window.scrollTo(0, document.documentElement.scrollHeight);
        });
      }
      await expect(status).toHaveAttribute("data-state", state);
      const before = await page.evaluate(() => ({
        scroll: window.scrollY,
        height: document.documentElement.scrollHeight,
      }));
      await page.evaluate(async () => {
        (
          window as unknown as { finishLayoutVerification: () => void }
        ).finishLayoutVerification();
        await new Promise<void>((resolve) =>
          requestAnimationFrame(() => requestAnimationFrame(() => resolve())),
        );
      });
      await expect(status).toHaveAttribute("data-state", "ready");
      await expect(page.locator("[data-contact-submit]")).toBeEnabled();
      const after = await page.evaluate(() => ({
        scroll: window.scrollY,
        height: document.documentElement.scrollHeight,
      }));
      expect(
        Math.abs(after.height - before.height),
        JSON.stringify({ before, after }),
      ).toBeLessThanOrEqual(1);
      expect(
        Math.abs(after.scroll - before.scroll),
        JSON.stringify({ before, after }),
      ).toBeLessThanOrEqual(1);
      expect(
        await status.evaluate(
          (element) => getComputedStyle(element).backgroundColor,
        ),
      ).toBe("rgba(0, 0, 0, 0)");
      const folder = process.env.CONTACT_LAYOUT_SCREENSHOTS;
      if (folder) {
        await mkdir(folder, { recursive: true });
        await writeFile(
          join(folder, `contact-layout-${width}-${state}.json`),
          JSON.stringify({ before, after }, null, 2),
        );
        // Capture from scroll0 so the sticky header stays outside this crop.
        await page.evaluate(() => window.scrollTo(0, 0));
        const bounds = await page.locator("#contacto").boundingBox();
        await page.screenshot({
          path: join(folder, `contact-ready-${width}-${state}.png`),
          fullPage: true,
          clip: bounds!,
        });
      }
    });
  }
}
