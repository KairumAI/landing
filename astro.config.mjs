// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: process.env.SITE_URL || undefined,
  image: { service: { entrypoint: "astro/assets/services/noop" } },
  build: { inlineStylesheets: "always" },
});
