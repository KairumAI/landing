import { defineConfig, devices } from "@playwright/test";

const port = Number(process.env.PORT ?? 4322);

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  use: {
    ...devices["Desktop Chrome"],
    // The GitHub runner ships Google Chrome; using it skips the Playwright browser download.
    channel: process.env.CI ? "chrome" : undefined,
    launchOptions: {
      executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
    },
    baseURL: `http://127.0.0.1:${port}`,
    viewport: { width: 1440, height: 1000 },
    trace: "retain-on-failure",
    screenshot: "only-on-failure",
  },
  webServer: {
    // --ignore-lock keeps Astro in the foreground even when it detects an AI agent.
    command: `bun run build && bun run preview --port ${port} --ignore-lock`,
    url: `http://127.0.0.1:${port}`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
});
