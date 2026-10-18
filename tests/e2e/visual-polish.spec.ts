import { expect, test, type Locator } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import { isAbsolute, join } from "node:path";
import { audienceCopy } from "../../src/i18n/audience-pages";
import { locales } from "../../src/i18n/locales";
import { localizedPath } from "../../src/lib/routes";

async function capture(target: Locator, name: string) {
  const folder = process.env.VISUAL_POLISH_SCREENSHOTS;
  if (!folder) return;
  if (!isAbsolute(folder))
    throw new Error("VISUAL_POLISH_SCREENSHOTS must be an absolute path");
  await mkdir(folder, { recursive: true });
  await target.screenshot({ path: join(folder, `${name}.png`) });
}

async function expectIconInsets(card: Locator) {
  const insets = await card.evaluate(async (element) => {
    await Promise.all(
      element
        .getAnimations({ subtree: true })
        .map((animation) => animation.finished.catch(() => undefined)),
    );
    const outer = element.getBoundingClientRect();
    return [...element.querySelectorAll(":scope > i")].flatMap((icon) => {
      const bounds = icon.getBoundingClientRect();
      const style = getComputedStyle(icon);
      if (
        !bounds.width ||
        !bounds.height ||
        style.visibility === "hidden" ||
        Number(style.opacity) === 0
      )
        return [];
      return [
        {
          name: icon.getAttribute("data-icon"),
          left: bounds.left - outer.left,
          right: outer.right - bounds.right,
        },
      ];
    });
  });
  expect(insets.length).toBeGreaterThan(0);
  for (const icon of insets)
    expect(
      Math.min(icon.left, icon.right),
      JSON.stringify(icon),
    ).toBeGreaterThanOrEqual(12);
}

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.route("https://submit-form.com/**", (route) => route.abort());
  await page.route("https://challenges.cloudflare.com/**", (route) =>
    route.abort(),
  );
});

for (const locale of locales) {
  test(`${locale}: native heading selection preserves descenders and its exact colors`, async ({
    page,
  }) => {
    await page.goto(localizedPath("/nosotros/", locale));
    await page.evaluate(() => document.fonts.ready.then(() => undefined));
    const heading = page.locator(".audience-about-hero h1");
    for (const width of [1440, 320]) {
      await page.setViewportSize({ width, height: 1000 });
      await heading.scrollIntoViewIfNeeded();
      const geometry = await heading.evaluate((element) => {
        const lines: { top: number; bottom: number }[] = [];
        const walker = document.createTreeWalker(element, NodeFilter.SHOW_TEXT);
        let node: Node | null;
        while ((node = walker.nextNode())) {
          if (!node.textContent?.trim()) continue;
          const range = document.createRange();
          range.selectNodeContents(node);
          for (const rect of range.getClientRects()) {
            if (!rect.width || !rect.height) continue;
            const line = lines.find(
              (item) => Math.abs(item.top - rect.top) < 0.5,
            );
            if (line) line.bottom = Math.max(line.bottom, rect.bottom);
            else lines.push({ top: rect.top, bottom: rect.bottom });
          }
        }
        const selected = document.createRange();
        selected.setStartAfter(element.querySelector("br")!);
        selected.setEnd(element, element.childNodes.length);
        const selection = window.getSelection()!;
        selection.removeAllRanges();
        selection.addRange(selected);
        const colors = [element, ...element.querySelectorAll("mark")].map(
          (target) => {
            const style = getComputedStyle(target, "::selection");
            return { background: style.backgroundColor, color: style.color };
          },
        );
        return {
          lines: lines.sort((a, b) => a.top - b.top),
          text: selection.toString(),
          colors,
        };
      });
      expect(geometry.text.trim()).toBe(
        audienceCopy(locale).heroes.nosotros.title.split("\n")[1],
      );
      expect(geometry.lines.length).toBeGreaterThanOrEqual(2);
      for (let index = 1; index < geometry.lines.length; index++) {
        const gap =
          geometry.lines[index].top - geometry.lines[index - 1].bottom;
        expect(
          gap,
          `${locale}/${width}: ${JSON.stringify(geometry.lines)}`,
        ).toBeGreaterThanOrEqual(0);
      }
      for (const colors of geometry.colors)
        expect(colors).toEqual({
          background: "rgb(255, 245, 201)",
          color: "rgb(24, 24, 24)",
        });
      await capture(
        page.locator(".audience-about-hero"),
        `${locale}-selection-${width}`,
      );
    }
  });
}

for (const width of [1440, 320]) {
  test(`${width}: product menu icons stay inset on hover and keyboard focus`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/nosotros/");
    await expect(page.locator("body")).toHaveAttribute("data-enhanced", "true");
    const menu = page.locator(".site-nav > .nav-menu").first();
    const summary = menu.locator("summary");
    const toggle = page.locator(".menu-toggle");
    const open = async () => {
      if (width <= 960) await toggle.click();
      else {
        // Escape keeps focus on the summary; leave the closed menu before
        // testing a fresh pointer entry rather than hovering the same hit area.
        await page.mouse.move(0, 400);
        await summary.hover();
      }
      await expect(menu).toHaveAttribute("data-nav-state", "open");
    };
    await open();
    const cards = menu.locator(".menu-products .menu-grid > a");
    await expect(cards).toHaveCount(6);
    for (const card of await cards.all()) {
      await card.hover();
      expect(await card.evaluate((element) => element.matches(":hover"))).toBe(
        true,
      );
      await expectIconInsets(card);
    }
    await cards.first().hover();
    await capture(menu.locator(".menu-products"), `products-hover-${width}`);
    await page.keyboard.press("Escape");
    await expect(menu).toHaveAttribute("data-nav-state", "closed");
    await expect(width <= 960 ? toggle : summary).toBeFocused();
    await open();
    await summary.focus();
    await summary.press("Tab");
    for (const card of await cards.all()) {
      await card.focus();
      await expect(card).toBeFocused();
      expect(
        await card.evaluate((element) => element.matches(":focus-visible")),
      ).toBe(true);
      await expectIconInsets(card);
    }
    await cards.first().focus();
    await capture(menu.locator(".menu-products"), `products-focus-${width}`);
    await page.keyboard.press("Escape");
    await expect(menu).toHaveAttribute("data-nav-state", "closed");
    await expect(width <= 960 ? toggle : summary).toBeFocused();
    await open();
    await cards.filter({ hasText: "Analytics" }).click();
    await expect(page).toHaveURL(/\/productos\/analytics\/$/);
    await expect(
      page.locator('[data-analytics-preview="product"]'),
    ).toBeVisible();
    expect(
      await page
        .locator("main")
        .evaluate((element) => (element as HTMLElement).inert),
    ).toBe(false);
  });
}

for (const width of [1440, 768, 390, 320]) {
  test(`${width}: service artwork masks its actual 3:2 bitmap and fits the mobile card`, async ({
    page,
  }) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    const cards = page.locator(".cinema-start-option");
    await expect(cards).toHaveCount(2);
    for (const [index, card] of (await cards.all()).entries()) {
      const art = card.locator(".service-card-art");
      await art.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          art.evaluate(
            (image: HTMLImageElement) =>
              image.complete && image.naturalWidth > 0,
          ),
        )
        .toBe(true);
      const rendered = await art.evaluate((image: HTMLImageElement) => {
        const bounds = image.getBoundingClientRect();
        const card = image
          .closest(".cinema-start-option")!
          .getBoundingClientRect();
        const style = getComputedStyle(image);
        return {
          ratio: bounds.width / bounds.height,
          naturalRatio: image.naturalWidth / image.naturalHeight,
          insets: [
            bounds.left - card.left,
            card.right - bounds.right,
            bounds.top - card.top,
            card.bottom - bounds.bottom,
          ],
          mask: style.maskImage,
          composite: style.maskComposite,
        };
      });
      expect(rendered.naturalRatio).toBeCloseTo(1.5, 3);
      expect(rendered.ratio).toBeCloseTo(1.5, 2);
      expect(rendered.mask.match(/linear-gradient/g)).toHaveLength(2);
      expect(
        rendered.mask.match(/transparent|rgba\(0, 0, 0, 0\)/g),
      ).toHaveLength(4);
      expect(rendered.composite).toContain("intersect");
      if (width <= 650)
        expect(
          Math.min(...rendered.insets),
          JSON.stringify(rendered),
        ).toBeGreaterThanOrEqual(0);
      await capture(card, `service-${index}-${width}`);
    }
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth),
    ).toBeLessThanOrEqual(width);
  });
}
