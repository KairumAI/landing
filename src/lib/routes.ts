import {
  editorialEntries,
  editorialLocales,
  type EditorialPageId,
} from "../i18n/editorial";
import { renderEditorialPage } from "../components/kairum/editorial-html";
import { integrateEditorialContent } from "./editorial-integration";
import { locales, type Locale } from "../i18n/locales";
import { translator } from "../i18n/marketing";
import { createProducts, type ProductId } from "../components/kairum/products";
import { createMarketingRenderer } from "../components/kairum/marketing-html";
import type { ContactSlots } from "../components/kairum/contact-form";

export const productIds = [
  "report",
  "analytics",
  "agents",
  "prompt-intelligence",
  "traffic",
  "consulting",
] as const;
export const infoIds = [
  "marcas",
  "agencias",
  "nosotros",
  "contacto",
  "acceso",
] as const;
export type MarketingPageId =
  "home" | "catalog" | ProductId | (typeof infoIds)[number];
export type PageId = MarketingPageId | EditorialPageId;
export const pages: readonly {
  id: PageId;
  path: string;
  indexable: boolean;
  locales?: readonly Locale[];
}[] = [
  { id: "home", path: "/", indexable: true },
  { id: "catalog", path: "/productos/", indexable: true },
  ...productIds.map((id) => ({
    id,
    path: `/productos/${id}/`,
    indexable: true,
  })),
  ...editorialEntries.map(({ id, path }) => ({
    id,
    path,
    indexable: true,
    locales: editorialLocales(id),
  })),
  ...infoIds.map((id) => ({
    id,
    path: `/${id === "marcas" || id === "agencias" ? "soluciones/" : ""}${id}/`,
    indexable: id !== "acceso",
  })),
];
export function localizedPath(path: string, locale: Locale): string {
  return locale === "es" ? path : `/${locale}${path}`;
}
export function equivalentPaths(id: PageId) {
  const page = pages.find((page) => page.id === id)!;
  return pageLocales(id).map((locale) => ({
    locale,
    path: localizedPath(page.path, locale),
  }));
}
export function pageLocales(id: PageId): readonly Locale[] {
  return pages.find((page) => page.id === id)!.locales ?? locales;
}
export function localizeLinks(html: string, locale: Locale): string {
  return html.replace(/href="(\/[^"]*)"/g, (original, path: string) => {
    if (path.startsWith("/informes/"))
      return `href="https://kairum.com.ar${path}"`;
    if (path.startsWith("/kairum/") || path.startsWith("/assets/"))
      return original;
    return `href="${localizedPath(path, locale)}"`;
  });
}
function marketingPageContent(
  id: MarketingPageId,
  locale: Locale,
  contact?: ContactSlots,
) {
  const t = translator(locale);
  const renderer = createMarketingRenderer(t, contact);
  const { products } = createProducts(t);
  const product = products.find((product) => product.id === id);
  let html: string;
  if (id === "home") html = renderer.marketingHomePage();
  else if (id === "catalog") html = renderer.marketingCatalogPage();
  else if (product) html = renderer.marketingProductPage(product);
  else html = renderer.marketingInfoPage(id as (typeof infoIds)[number]);
  return { html: localizeLinks(html, locale), product };
}

export function baselinePageContent(id: MarketingPageId, locale: Locale) {
  return marketingPageContent(id, locale);
}

export function pageContent(
  id: PageId,
  locale: Locale,
  contact?: ContactSlots,
) {
  const editorial = editorialEntries.find((entry) => entry.id === id);
  const html = editorial
    ? localizeLinks(renderEditorialPage(editorial.id, locale), locale)
    : marketingPageContent(id as MarketingPageId, locale, contact).html;
  return { html: integrateEditorialContent(html, id, locale, contact) };
}
