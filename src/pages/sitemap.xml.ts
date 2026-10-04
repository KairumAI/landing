import type { APIRoute } from "astro";
import { locales, localeMeta } from "../i18n/locales";

// The three home pages are public; 404 pages are excluded.
export const GET: APIRoute = ({ site }) => {
  const alternateLinks = locales.map((locale) => {
    const { hreflang, path } = localeMeta[locale];
    return `    <xhtml:link rel="alternate" hreflang="${hreflang}" href="${new URL(path, site)}" />`;
  });
  alternateLinks.push(
    `    <xhtml:link rel="alternate" hreflang="x-default" href="${new URL("/", site)}" />`,
  );
  const urls = locales.map(
    (locale) => `  <url>
    <loc>${new URL(localeMeta[locale].path, site)}</loc>
${alternateLinks.join("\n")}
  </url>`,
  );
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">
${urls.join("\n")}
</urlset>
`,
    { headers: { "Content-Type": "application/xml; charset=utf-8" } },
  );
};
