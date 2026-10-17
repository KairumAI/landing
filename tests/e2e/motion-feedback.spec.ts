import { expect, test, type Page, type TestInfo } from "@playwright/test";
import { writeFile } from "node:fs/promises";

type Frame = {
  time: number;
  x: number;
  y: number;
  width: number;
  height: number;
};

async function recordMeasurements(
  testInfo: TestInfo,
  name: string,
  data: unknown,
) {
  const path = testInfo.outputPath(`${name}.json`);
  await writeFile(path, JSON.stringify(data, null, 2));
  await testInfo.attach(name, { path, contentType: "application/json" });
}

async function sampleFrames(page: Page, selector: string, duration: number) {
  return page.locator(selector).evaluate(
    (element, duration) =>
      new Promise<Frame[]>((resolve) => {
        const frames: Frame[] = [];
        const started = performance.now();
        const sample = () => {
          const bounds = element.getBoundingClientRect();
          frames.push({
            time: performance.now() - started,
            x: bounds.x,
            y: bounds.y,
            width: bounds.width,
            height: bounds.height,
          });
          if (performance.now() - started < duration)
            requestAnimationFrame(sample);
          else resolve(frames);
        };
        requestAnimationFrame(sample);
      }),
    duration,
  );
}

function largestLateStep(frames: Frame[]) {
  expect(frames.length).toBeGreaterThan(2);
  return Math.max(
    ...frames.slice(1).map((frame, index) => {
      if (frame.time < 500) return 0;
      const before = frames[index];
      return Math.max(
        Math.abs(frame.x - before.x),
        Math.abs(frame.y - before.y),
        Math.abs(frame.width - before.width),
        Math.abs(frame.height - before.height),
      );
    }),
  );
}

function displacement(frames: Frame[]) {
  expect(frames.length).toBeGreaterThan(2);
  const first = frames[0];
  return Math.max(
    ...frames.map((frame) =>
      Math.max(
        Math.abs(frame.x - first.x),
        Math.abs(frame.y - first.y),
        Math.abs(frame.width - first.width),
        Math.abs(frame.height - first.height),
      ),
    ),
  );
}

for (const kind of ["answer", "archive", "agents"]) {
  test(`${kind}: leaving the pointer restores the authored pose without a last-frame jump`, async ({
    page,
  }, testInfo) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto("/");
    const selector = `[data-home-scene="${kind}"]`;
    const objectSelector = `${selector} ${
      {
        answer: ".answer-glass",
        archive: ".archive-stage",
        agents: ".agent-workflow",
      }[kind]
    }`;
    const scene = page.locator(selector);
    await scene.scrollIntoViewIfNeeded();
    await expect(scene).toHaveAttribute("data-animation", "complete", {
      timeout: 12000,
    });
    await expect(scene).toHaveAttribute("data-ambient", "playing");
    const bounds = (await scene.boundingBox())!;
    await page.mouse.move(
      bounds.x + bounds.width * 0.9,
      bounds.y + bounds.height * 0.35,
    );
    // Allow the 600 ms response to reach the requested perspective first.
    await sampleFrames(page, objectSelector, 850);
    await page.mouse.move(8, 8);
    const frames = await sampleFrames(page, objectSelector, 1000);
    const maxLateStep = largestLateStep(frames);
    await recordMeasurements(testInfo, `${kind}-return-frames`, {
      maxLateStep,
      frames,
    });
    // At the end of a 700 ms return, perspective is almost settled. Ambient
    // drift is only 7 px over 3 s, so a >2 px single-frame step is a reset.
    expect(maxLateStep).toBeLessThan(2);
  });
}

test("a real hyperlink navigation never hides already painted product content again", async ({
  page,
}, testInfo) => {
  await page.addInitScript(() => {
    const samples: { time: number; opacity: number }[] = [];
    Object.assign(window, { __revealFrames: samples });
    const started = performance.now();
    const sample = () => {
      const target = document.querySelector(".product-hero-copy[data-reveal]");
      if (target)
        samples.push({
          time: performance.now() - started,
          opacity: Number(getComputedStyle(target).opacity),
        });
      if (performance.now() - started < 3000) requestAnimationFrame(sample);
    };
    requestAnimationFrame(sample);
  });
  await page.goto("/");
  // A cold module response makes the browser paint the static destination
  // before enhancement, as on hyperlink navigation with an uncached bundle.
  await page.route("**/_astro/*.js", async (route) => {
    await new Promise((resolve) => setTimeout(resolve, 250));
    await route.continue();
  });
  await page
    .locator('.home-prompts a[href="/productos/prompt-intelligence/"]')
    .click();
  await expect(page).toHaveURL(/\/productos\/prompt-intelligence\/$/);
  await expect(page.locator("body")).toHaveAttribute("data-enhanced", "true");
  await sampleFrames(page, ".product-hero-copy", 1800);
  const frames = await page.evaluate(
    () =>
      (
        window as unknown as {
          __revealFrames: { time: number; opacity: number }[];
        }
      ).__revealFrames,
  );
  const firstPaint = frames.findIndex((frame) => frame.opacity > 0.95);
  await recordMeasurements(testInfo, "hyperlink-reveal-frames", {
    firstPaint,
    hiddenAfterFirstPaint: frames
      .slice(firstPaint)
      .filter((frame) => frame.opacity < 0.9).length,
    frames,
  });
  expect(firstPaint).toBeGreaterThanOrEqual(0);
  expect(
    frames.slice(firstPaint).filter((frame) => frame.opacity < 0.9),
  ).toHaveLength(0);
});

test("pointer motion pauses with the document and reduced motion or page restoration never replays the entrance", async ({
  page,
}) => {
  await page.goto("/");
  const scene = page.locator('[data-home-scene="answer"]');
  const object = scene.locator(".answer-glass");
  await expect(scene).toHaveAttribute("data-animation", "complete", {
    timeout: 12000,
  });
  const authoredPose = await object.evaluate(
    (element) => getComputedStyle(element).transform,
  );
  const bounds = (await scene.boundingBox())!;
  await page.mouse.move(
    bounds.x + bounds.width * 0.9,
    bounds.y + bounds.height * 0.35,
  );
  await sampleFrames(page, ".answer-glass", 800);
  // Exercise the real visibility handler with the document's hidden boundary.
  // A pointerleave may arrive while the tab is already hidden.
  await page.evaluate(() => {
    Object.defineProperty(document, "hidden", {
      configurable: true,
      value: true,
    });
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(scene).toHaveAttribute("data-ambient", "paused");
  await scene.dispatchEvent("pointerleave");
  expect(
    displacement(await sampleFrames(page, ".answer-glass", 350)),
  ).toBeLessThan(0.1);
  await page.evaluate(() => {
    delete (document as unknown as { hidden?: boolean }).hidden;
    document.dispatchEvent(new Event("visibilitychange"));
  });
  await expect(scene).toHaveAttribute("data-ambient", "playing");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(scene).toHaveAttribute("data-ambient", "reduced");
  expect(
    await object.evaluate((element) => getComputedStyle(element).transform),
  ).toBe(authoredPose);
  expect(
    displacement(await sampleFrames(page, ".answer-glass", 250)),
  ).toBeLessThan(0.1);
  await page.emulateMedia({ reducedMotion: "no-preference" });
  await expect(scene).toHaveAttribute("data-animation", "complete");
  await expect(scene).toHaveAttribute("data-ambient", "playing");
  await page.locator("#product-agents").scrollIntoViewIfNeeded();
  await expect(scene).toHaveAttribute("data-ambient", "paused");
  expect(
    displacement(await sampleFrames(page, ".answer-glass", 250)),
  ).toBeLessThan(0.1);
  await scene.scrollIntoViewIfNeeded();
  await expect(scene).toHaveAttribute("data-ambient", "playing");
  // Simulate the persisted page boundary without relying on the browser's
  // optional BFCache eligibility in automated sessions.
  await page.evaluate(() => {
    window.dispatchEvent(
      new PageTransitionEvent("pagehide", { persisted: true }),
    );
    window.dispatchEvent(
      new PageTransitionEvent("pageshow", { persisted: true }),
    );
  });
  await expect(scene).toHaveAttribute("data-animation", "complete");
  await expect(scene).toHaveAttribute("data-scene-progress", "1");
  await expect(scene).toHaveAttribute("data-ambient", "playing");
});
