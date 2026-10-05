import type { APIRoute } from "astro";
import { locales, localeMeta } from "../i18n/locales";
import { pages, localizedPath } from "../lib/routes";

// Include equivalent public pages; exclude access and 404, with no invented lastmod.
export const GET: APIRoute = ({ site }) => {
  const urls = pages
    .filter((page) => page.indexable)
    .flatMap((page) => {
      const alternateLinks = locales.map(
        (locale) =>
          `    <xhtml:link rel="alternate" hreflang="${localeMeta[locale].hreflang}" href="${new URL(localizedPath(page.path, locale), site)}" />`,
      );
      alternateLinks.push(
        `    <xhtml:link rel="alternate" hreflang="x-default" href="${new URL(page.path, site)}" />`,
      );
      return locales.map(
        (locale) => `  <url>
    <loc>${new URL(localizedPath(page.path, locale), site)}</loc>
${alternateLinks.join("\n")}
  </url>`,
      );
    });
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};
