// @ts-check
import { defineConfig } from "astro/config";

export default defineConfig({
  site: "https://kairum.com.ar",
  i18n: {
    locales: ["es", "en", "pt-br"],
    defaultLocale: "es",
    routing: { prefixDefaultLocale: false },
  },
  image: { service: { entrypoint: "astro/assets/services/noop" } },
  // "preserve" emits en/404.html (not en/404/index.html) so Cloudflare Pages finds each locale's 404.
  build: { inlineStylesheets: "never", format: "preserve" },
});
