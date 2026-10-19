import {
  editorialCopy,
  editorialEntries,
  reviewedDate,
} from "../i18n/editorial";
import { seo } from "../i18n/marketing/seo";
import { translator } from "../i18n/marketing";
import { localeMeta, locales, type Locale } from "../i18n/locales";
import { createProducts } from "../components/kairum/products";
import { pages, localizedPath, type PageId } from "./routes";
import { editorialMedia } from "./editorial-media";
import { agentsProductCopy } from "../i18n/agents-product";

export function metadata(id: PageId, locale: Locale, site: URL) {
  const baseTranslate = translator(locale);
  const t: typeof baseTranslate = (key) =>
    baseTranslate(key).replace(/(?<!AI )\bReport\b/g, "AI Report");
  const s = seo[locale];
  const page = pages.find((page) => page.id === id)!;
  const product = createProducts(t).products.find(
    (product) => product.id === id,
  );
  const info = {
    marcas: {
      title: t("para_marcas"),
      description: t("un_punto_de_partida_para_entender_como_aparece_tu_marca"),
    },
    agencias: {
      title: t("para_agencias"),
      description: t(
        "preguntas_claras_evidencia_a_mano_y_un_alcance_de_trabajo",
      ),
    },
    nosotros: {
      title: t("nosotros"),
      description: t(
        "construimos_una_forma_de_entender_la_presencia_de_las_marcas",
      ),
    },
    contacto: {
      title: t("contacto"),
      description: t(
        "contanos_que_esta_buscando_entender_tu_equipo_el_primer_paso",
      ),
    },
    acceso: {
      title: t("acceso_a_kairum"),
      description: t(
        "conversemos_sobre_tu_equipo_tus_preguntas_y_el_espacio_de",
      ),
    },
  };
  const entry = editorialEntries.find((entry) => entry.id === id);
  const editorial = entry ? editorialCopy(locale).pages[entry.id] : undefined;
  const media = editorialMedia(id);
  const socialImage = media?.social ?? localeMeta[locale].ogImage;
  const commercial =
    id === "agents"
      ? {
          title: agentsProductCopy[locale].metaTitle,
          description: agentsProductCopy[locale].description,
        }
      : id === "report" || id === "analytics" || id === "agencias"
        ? editorialCopy(locale).commercial[id]
        : undefined;
  const title = editorial
    ? editorial.title.includes("| KAIRUM")
      ? editorial.title
      : `${editorial.title} | KAIRUM`
    : commercial
      ? commercial.title
      : id === "home"
        ? s.homeTitle
        : id === "catalog"
          ? s.catalogTitle
          : product
            ? `${product.name} — KAIRUM`
            : `${info[id as keyof typeof info].title} — KAIRUM`;
  const description =
    editorial?.description ??
    commercial?.description ??
    (id === "home"
      ? s.homeDescription
      : id === "catalog"
        ? s.catalogDescription
        : product
          ? product.description
          : info[id as keyof typeof info].description);
  const home = new URL("/", site).href,
    url = new URL(localizedPath(page.path, locale), site).href;
  const graph: Record<string, unknown>[] = [
    {
      "@type": "Organization",
      "@id": `${home}#organization`,
      name: "KAIRUM",
      url: home,
      logo: new URL("/apple-touch-icon.png", site).href,
    },
    {
      "@type": "WebSite",
      "@id": `${home}#website`,
      name: "KAIRUM",
      url: home,
      inLanguage: locales.map((locale) => localeMeta[locale].htmlLang),
      publisher: { "@id": `${home}#organization` },
    },
    {
      "@type":
        id === "catalog" || id === "resources" || id === "blog"
          ? "CollectionPage"
          : "WebPage",
      "@id": `${url}#webpage`,
      name: title,
      description,
      url,
      inLanguage: localeMeta[locale].htmlLang,
      isPartOf: { "@id": `${home}#website` },
      about: { "@id": `${home}#organization` },
      primaryImageOfPage: new URL(socialImage, site).href,
    },
  ];
  const isArticle = entry?.kind === "article" || entry?.kind === "guide";
  if (isArticle && editorial)
    graph.push({
      "@type": entry!.kind === "article" ? "BlogPosting" : "Article",
      "@id": `${url}#article`,
      mainEntityOfPage: { "@id": `${url}#webpage` },
      headline: editorial.title,
      description: editorial.description,
      author: {
        "@type": "Organization",
        "@id": `${home}#organization`,
        name: "KAIRUM",
        url: new URL(localizedPath("/metodologia/", locale), site).href,
      },
      publisher: { "@id": `${home}#organization` },
      dateModified: reviewedDate,
      inLanguage: localeMeta[locale].htmlLang,
      citation: editorial.sources.map((source) => source.url),
      image: new URL(socialImage, site).href,
    });
  if (id !== "home")
    graph.push({
      "@type": "BreadcrumbList",
      "@id": `${url}#breadcrumbs`,
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: s.breadcrumbsHome,
          item: new URL(localizedPath("/", locale), site).href,
        },
        ...(entry && id !== "resources"
          ? [
              {
                "@type": "ListItem",
                position: 2,
                name: editorialCopy(locale).ui.resources,
                item: new URL(localizedPath("/recursos/", locale), site).href,
              },
            ]
          : product
            ? [
                {
                  "@type": "ListItem",
                  position: 2,
                  name: t("productos"),
                  item: new URL(localizedPath("/productos/", locale), site)
                    .href,
                },
              ]
            : []),
        {
          "@type": "ListItem",
          position: product || (entry && id !== "resources") ? 3 : 2,
          name: product?.name ?? title.replace(/(?: —| \|) KAIRUM$/, ""),
          item: url,
        },
      ],
    });
  // Only product pages render these actual questions and answers. Home has no FAQ schema.
  if (product)
    graph.push({
      "@type": "FAQPage",
      "@id": `${url}#preguntas`,
      inLanguage: localeMeta[locale].htmlLang,
      mainEntity: product.faqs.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text:
            id === "agents" && item.question === t("los_agentes_publican_solos")
              ? agentsProductCopy[locale].publicationAnswer
              : item.answer,
        },
      })),
    });
  return {
    title,
    description,
    isArticle,
    socialImage,
    socialWidth: media?.socialWidth ?? 1200,
    socialHeight: media?.socialHeight ?? 630,
    socialAlt: editorial?.cover?.alt ?? "KAIRUM",
    noindex: !page.indexable,
    structuredData: { "@context": "https://schema.org", "@graph": graph },
  };
}
