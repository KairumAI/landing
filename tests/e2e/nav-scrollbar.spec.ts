import { expect, test } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.route("https://challenges.cloudflare.com/**", (route) =>
    route.abort(),
  );
  await page.route("https://submit-form.com/**", (route) => route.abort());
});

for (const viewport of [
  { width: 1440, height: 1000 },
  { width: 2244, height: 1290 },
]) {
  test(`${viewport.width}: opening Products keeps its animation without transient scroll overflow`, async ({
    page,
  }, testInfo) => {
    await page.setViewportSize(viewport);
    await page.goto("/soluciones/marcas/");
    await expect(page.locator("body")).toHaveAttribute("data-enhanced", "true");
    await page.evaluate(() => document.fonts.ready.then(() => undefined));
    const menu = page
      .locator(".nav-menu")
      .filter({ has: page.locator("#menu-products") });
    const panel = menu.locator("#menu-products");
    const samples = panel.evaluate(
      (element) =>
        new Promise<
          {
            state: string;
            overflow: number;
            opacity: number;
            animated: boolean;
          }[]
        >((resolve) => {
          const frames: {
            state: string;
            overflow: number;
            opacity: number;
            animated: boolean;
          }[] = [];
          const start = performance.now();
          const sample = () => {
            const state =
              element.parentElement!.getAttribute("data-nav-state") ?? "";
            if (state === "opening" || state === "open")
              frames.push({
                state,
                overflow: element.scrollHeight - element.clientHeight,
                opacity: Number(getComputedStyle(element).opacity),
                animated: element
                  .getAnimations()
                  .some((animation) => animation.playState === "running"),
              });
            if (performance.now() - start < 650) requestAnimationFrame(sample);
            else resolve(frames);
          };
          requestAnimationFrame(sample);
        }),
    );
    await menu.locator("summary").click();
    const frames = await samples;
    await writeFile(
      testInfo.outputPath("opening-frames.json"),
      JSON.stringify(frames, null, 2),
    );
    expect(
      frames.filter((frame) => frame.state === "opening").length,
    ).toBeGreaterThan(1);
    expect(
      frames.some(
        (frame) => frame.animated && frame.opacity > 0 && frame.opacity < 1,
      ),
    ).toBe(true);
    expect(frames.at(-1)?.state).toBe("open");
    expect(frames.at(-1)?.overflow).toBe(0);
    const folder = process.env.NAV_SCROLL_SCREENSHOTS;
    if (folder) {
      await mkdir(folder, { recursive: true });
      await page.screenshot({
        path: join(folder, `products-${viewport.width}.png`),
      });
    }
    expect(
      Math.max(...frames.map((frame) => frame.overflow)),
      JSON.stringify(frames),
    ).toBe(0);
    await page.keyboard.press("Escape");
    await expect(menu).toHaveAttribute("data-nav-state", "closed");
    await expect(menu.locator("summary")).toBeFocused();
  });
}

for (const viewport of [
  { width: 1440, height: 400 },
  { width: 320, height: 640 },
]) {
  test(`${viewport.width}x${viewport.height}: genuinely overflowing navigation remains scrollable`, async ({
    page,
  }) => {
    await page.setViewportSize(viewport);
    await page.goto("/soluciones/marcas/");
    await expect(page.locator("body")).toHaveAttribute("data-enhanced", "true");
    const menu = page
      .locator(".nav-menu")
      .filter({ has: page.locator("#menu-products") });
    if (viewport.width <= 960) await page.locator(".menu-toggle").click();
    else await menu.locator("summary").press("Enter");
    await expect(menu).toHaveAttribute("data-nav-state", "open");
    const scroller =
      viewport.width <= 960
        ? page.locator("#site-nav")
        : menu.locator("#menu-products");
    expect(
      await scroller.evaluate(
        (element) => element.scrollHeight - element.clientHeight,
      ),
    ).toBeGreaterThan(0);
    const consulting = menu.locator('a[href="/productos/consulting/"]');
    await consulting.scrollIntoViewIfNeeded();
    expect(
      await scroller.evaluate((element) => element.scrollTop),
    ).toBeGreaterThan(0);
    await consulting.click();
    await expect(page).toHaveURL(/\/productos\/consulting\/$/);
  });
}
