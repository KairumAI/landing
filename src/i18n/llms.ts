import { bookingUrl, localeMeta, locales, type Locale } from "./locales";
import { seo } from "./marketing/seo";
import { pages, pageContent, localizedPath } from "../lib/routes";
import { metadata } from "../lib/metadata";

const url = (path: string, site: URL) => new URL(path, site).href;
export function renderLlmsIndex(site: URL): string {
  const t = seo.es;
  const links = pages
    .filter((page) => page.indexable)
    .flatMap((page) =>
      locales.map((locale) => {
        const meta = metadata(page.id, locale, site);
        return `- [${meta.title} (${localeMeta[locale].name})](${url(localizedPath(page.path, locale), site)}): ${meta.description}`;
      }),
    );
  return `# KAIRUM

> ${t.homeDescription}

## ${t.pages}

${links.join("\n")}

## ${t.fullText}

${locales.map((locale) => `- [${localeMeta[locale].name}](${url(`${localeMeta[locale].path}llms-full.txt`, site)})`).join("\n")}

## ${t.contact}

- [${t.contact}](${bookingUrl})
`;
}
function plainText(html: string): string {
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)?.[1] ?? html;
  return main
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/g, "")
    .replace(
      /<\/?(?:section|article|div|p|h[1-6]|li|figcaption|br)\b[^>]*>/g,
      "\n",
    )
    .replace(/<[^>]*>/g, " ")
    .replace(
      /&(?:amp|lt|gt|quot|#39);/g,
      (entity) =>
        ({
          "&amp;": "&",
          "&lt;": "<",
          "&gt;": ">",
          "&quot;": '"',
          "&#39;": "'",
        })[entity]!,
    )
    .replace(/[ \t]+/g, " ")
    .replace(/ *\n */g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}
export function renderLlmsFull(locale: Locale, site: URL): string {
  const sections = pages
    .filter((page) => page.indexable)
    .map((page) => {
      const meta = metadata(page.id, locale, site);
      return `## ${meta.title}\n\n${url(localizedPath(page.path, locale), site)}\n\n${plainText(pageContent(page.id, locale).html)}`;
    });
  return `# ${seo[locale].homeTitle}\n\n> ${seo[locale].homeDescription}\n\n${sections.join("\n\n")}\n`;
}
export const textHeaders = { "Content-Type": "text/plain; charset=utf-8" };
