import { locales, type Locale } from "../i18n/locales";
import { translator } from "../i18n/marketing";
import { createProducts, type ProductId } from "../components/kairum/products";
import { createMarketingRenderer } from "../components/kairum/marketing-html";

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
export type PageId = "home" | "catalog" | ProductId | (typeof infoIds)[number];
export const pages: readonly {
  id: PageId;
  path: string;
  indexable: boolean;
}[] = [
  { id: "home", path: "/", indexable: true },
  { id: "catalog", path: "/productos/", indexable: true },
  ...productIds.map((id) => ({
    id,
    path: `/productos/${id}/`,
    indexable: true,
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
  return locales.map((locale) => ({
    locale,
    path: localizedPath(page.path, locale),
  }));
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
export function pageContent(id: PageId, locale: Locale) {
  const t = translator(locale);
  const renderer = createMarketingRenderer(t);
  const { products } = createProducts(t);
  const product = products.find((product) => product.id === id);
  let html: string;
  if (id === "home") html = renderer.marketingHomePage();
  else if (id === "catalog") html = renderer.marketingCatalogPage();
  else if (product) html = renderer.marketingProductPage(product);
  else html = renderer.marketingInfoPage(id as (typeof infoIds)[number]);
  return { html: localizeLinks(html, locale), product };
}
