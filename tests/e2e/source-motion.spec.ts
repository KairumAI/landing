import { expect, test, type Page, type TestInfo } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";
import { join } from "node:path";

type Frame = {
  time: number;
  progress: number;
  ambient: string;
  x: number;
  y: number;
  width: number;
  height: number;
};
const sceneSelector = '.scene-answer[data-home-scene="answer"]';
const sourceSelector = `${sceneSelector} > .glass-source`;

function largestStep(frames: Frame[]) {
  expect(frames.length).toBeGreaterThan(2);
  return Math.max(
    ...frames.slice(1).map((frame, index) => {
      const previous = frames[index];
      return Math.max(
        ...(["x", "y", "width", "height"] as const).map((key) =>
          Math.abs(frame[key] - previous[key]),
        ),
      );
    }),
  );
}

async function evidence(
  page: Page,
  info: TestInfo,
  name: string,
  frames: Frame[],
) {
  await info.attach(name, {
    body: JSON.stringify(frames),
    contentType: "application/json",
  });
  const folder = process.env.SOURCE_MOTION_SCREENSHOTS;
  if (!folder) return;
  await mkdir(folder, { recursive: true });
  await writeFile(
    join(folder, `${name}.json`),
    JSON.stringify(frames, null, 2),
  );
  await page
    .locator(sceneSelector)
    .screenshot({ path: join(folder, `${name}.png`) });
}

test.beforeEach(async ({ page }) => {
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await page.route("https://challenges.cloudflare.com/**", (route) =>
    route.abort(),
  );
  await page.route("https://submit-form.com/**", (route) => route.abort());
  await page.addInitScript(() => {
    const frames: Frame[] = [];
    Object.assign(window, { __sourceFrames: frames });
    const started = performance.now();
    const sample = () => {
      const scene = document.querySelector<HTMLElement>(
        '.scene-answer[data-home-scene="answer"]',
      );
      const source = scene?.querySelector<HTMLElement>(
        ":scope > .glass-source",
      );
      if (scene && source) {
        const bounds = source.getBoundingClientRect();
        frames.push({
          time: performance.now(),
          progress: Number(scene.dataset.sceneProgress ?? 0),
          ambient: scene.dataset.ambient ?? "",
          x: bounds.x + scrollX,
          y: bounds.y + scrollY,
          width: bounds.width,
          height: bounds.height,
        });
      }
      if (performance.now() - started < 15000) requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  });
});

async function frames(page: Page) {
  return page.evaluate(
    () => (window as unknown as { __sourceFrames: Frame[] }).__sourceFrames,
  );
}

for (const width of [1440, 390]) {
  test(`${width}: source entrance and ambient handoff preserve a continuous pose`, async ({
    page,
  }, info) => {
    await page.setViewportSize({ width, height: 1000 });
    await page.goto("/");
    const scene = page.locator(sceneSelector);
    await scene.scrollIntoViewIfNeeded();
    await expect(scene).toHaveAttribute("data-animation", "complete", {
      timeout: 12000,
    });
    await expect(scene).toHaveAttribute("data-ambient", "playing");
    const sampled = await frames(page);
    await evidence(page, info, `source-entrance-${width}`, sampled);
    // Sample after easing is almost settled; source cleanup is near .51, ambient at 1.
    expect
      .soft(
        largestStep(
          sampled.filter(
            (frame) => frame.progress >= 0.45 && frame.progress < 0.95,
          ),
        ),
        "late entrance reset",
      )
      .toBeLessThan(2);
    expect
      .soft(
        largestStep(sampled.filter((frame) => frame.progress >= 0.95)),
        "ambient handoff reset",
      )
      .toBeLessThan(2);
  });
}

test("the source card responds to the pointer and returns without a last-frame reset", async ({
  page,
}, info) => {
  await page.goto("/");
  const scene = page.locator(sceneSelector);
  const source = page.locator(sourceSelector);
  await scene.scrollIntoViewIfNeeded();
  await expect(scene).toHaveAttribute("data-animation", "complete", {
    timeout: 12000,
  });
  const authored = await source.evaluate(
    (element) => getComputedStyle(element).transform,
  );
  const bounds = (await source.boundingBox())!;
  await page.mouse.move(
    bounds.x + bounds.width * 0.85,
    bounds.y + bounds.height * 0.35,
  );
  await expect
    .poll(() =>
      source.evaluate((element) => getComputedStyle(element).transform),
    )
    .not.toBe(authored);
  await page.waitForTimeout(800);
  await page.mouse.move(8, 8);
  const start = await page.evaluate(() => performance.now());
  await expect
    .poll(() =>
      source.evaluate((element) => getComputedStyle(element).transform),
    )
    .toBe(authored);
  const returned = (await frames(page)).filter(
    (frame) => frame.time > start + 500,
  );
  await evidence(page, info, "source-pointer-return", returned);
  expect(largestStep(returned)).toBeLessThan(2);
});

test("reduced motion leaves the source stable and pointer independent", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/");
  const source = page.locator(sourceSelector);
  await expect(page.locator(sceneSelector)).toHaveAttribute(
    "data-ambient",
    "reduced",
  );
  const authored = await source.evaluate(
    (element) => getComputedStyle(element).transform,
  );
  await source.hover();
  await page.waitForTimeout(250);
  expect(
    await source.evaluate((element) => getComputedStyle(element).transform),
  ).toBe(authored);
  expect(largestStep((await frames(page)).slice(-8))).toBeLessThan(0.1);
});
