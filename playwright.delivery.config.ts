import { defineConfig } from "@playwright/test";

export default defineConfig({
  testDir: "./tests/delivery",
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
});
