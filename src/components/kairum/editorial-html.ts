import { escapeHtml as e } from "../../lib/escape";
import { editorialMedia } from "../../lib/editorial-media";
import {
  editorialCopy,
  editorialEntries,
  editorialLocales,
  reviewedDate,
  type EditorialPageId,
  type EditorialPage,
  type Section,
} from "../../i18n/editorial";
import type { Locale } from "../../i18n/locales";
import { translator } from "../../i18n/marketing";
import { createMarketingRenderer } from "./marketing-html";

export const editorialPath = (id: EditorialPageId) =>
  editorialEntries.find((entry) => entry.id === id)!.path;
export function readingMinutes(page: EditorialPage) {
  // Count readable text, excluding keys, URLs and structural identifiers.
  const text = [
    page.summary,
    page.bodyHtml?.replace(/<[^>]*>/g, " ") ?? "",
    ...(page.takeaways ?? []),
    ...page.sections.flatMap((s) => [
      s.title,
      ...s.paragraphs,
      ...(s.items ?? []),
      ...(s.table ? [...s.table.columns, ...s.table.rows.flat()] : []),
      ...(s.example ? [s.example.label, s.example.text] : []),
      ...(s.figure
        ? [
            s.figure.title,
            s.figure.caption,
            ...s.figure.steps.flatMap((step) => [
              step.label,
              step.detail,
              step.value ?? "",
            ]),
          ]
        : []),
    ]),
  ].join(" ");
  return Math.max(1, Math.ceil(text.trim().split(/\s+/u).length / 200));
}
const arrow =
  '<i data-icon="ArrowUpRight" aria-hidden="true" style="--icon:url(/kairum/assets/icons/ArrowUpRight.svg)"></i>';
const lines = "<span></span><span></span><span></span>";
export function renderEditorialPage(id: EditorialPageId, locale: Locale) {
  const copy = editorialCopy(locale),
    ui = copy.ui,
    page = copy.pages[id];
  const renderer = createMarketingRenderer(translator(locale));
  const a = (label: string, href: string, className = "text-link") =>
    `<a class="${className}" href="${e(href)}">${e(label)}${arrow}</a>`;
  const image = (
    key: EditorialPageId,
    placement: "card" | "feature" | "cover",
  ) => {
    const media = editorialMedia(key);
    if (!media) return "";
    const sizes =
      placement === "card"
        ? "(max-width: 800px) 90vw, 30vw"
        : placement === "feature"
          ? "(max-width: 800px) 90vw, 50vw"
          : "90vw";
    return `<img src="${media.large}" ${media.small !== media.large ? `srcset="${media.small} 640w, ${media.large} 1280w" sizes="${sizes}"` : ""} width="${media.width}" height="${media.height}" alt="${placement === "cover" ? e(copy.pages[key].cover?.alt ?? "") : ""}" loading="${placement === "card" ? "lazy" : "eager"}" decoding="async"${placement === "cover" ? ' fetchpriority="high"' : ""}>`;
  };
  const card = (key: EditorialPageId, index: number) => {
    const item = copy.pages[key];
    const art = editorialMedia(key)
      ? image(key, "card")
      : `<span class="editorial-card-number">0${index + 1}</span><div class="editorial-paper">${lines}<b>${arrow}</b></div>`;
    return `<article class="editorial-card"><a href="${editorialPath(key)}"><div class="editorial-card-art${editorialMedia(key) ? " editorial-card-image" : ""}" aria-hidden="true">${art}</div><div class="editorial-card-copy"><span class="eyebrow">${e(item.category)}</span><h3>${e(item.title)}</h3><p>${e(item.description)}</p><span class="editorial-card-foot"><span>${readingMinutes(item)} ${e(ui.minutes)}</span><span>${e(ui.read)} ${arrow}</span></span></div></a></article>`;
  };
  const articleIds: EditorialPageId[] = [
    "adobe-shopping",
    "mentions-citations-visits",
    "choosing-questions",
    "interpreting-results",
  ];
  const cards = (ids: EditorialPageId[]) =>
    `<div class="editorial-card-grid">${ids
      .filter((key) => editorialLocales(key).includes(locale))
      .map(card)
      .join("")}</div>`;
  const breadcrumbs = (current?: string) =>
    `<nav class="editorial-breadcrumbs" aria-label="${e(ui.back)}">${a(ui.resources, "/recursos/", "")}${current ? `<span aria-hidden="true">/</span><span>${e(current)}</span>` : ""}</nav>`;
  const cta = `<section class="editorial-cta wrap"><div><span class="eyebrow">${e(ui.nextStep)}</span><h2>${e(ui.ctaTitle)}</h2><p>${e(ui.ctaText)}</p></div>${a(ui.ctaAction, "/productos/report/", "button ink")}</section>`;
  const policy = `<aside class="editorial-policy"><strong>${e(ui.editorialNote)}</strong><p>${e(ui.editorialPolicy)}</p>${a(ui.methodology, "/metodologia/")}</aside>`;
  const featured = `<a class="editorial-feature" href="${editorialPath("visibility-guide")}"><div class="editorial-feature-copy"><span class="eyebrow">${e(ui.featured)} / ${e(ui.guide)}</span><h2>${e(copy.pages["visibility-guide"].title)}</h2><p>${e(copy.pages["visibility-guide"].description)}</p><span class="text-link">${e(ui.guideAction)}${arrow}</span></div><div class="editorial-feature-art" aria-hidden="true">${image("visibility-guide", "feature")}</div></a>`;
  const explainer = (figure: NonNullable<Section["figure"]>) =>
    `<figure class="editorial-explainer"><h3>${e(figure.title)}</h3><div class="editorial-explainer-grid" style="--steps:${figure.steps.length}">${figure.steps.map((step) => `<div class="editorial-explainer-step">${step.value ? `<span class="editorial-explainer-value">${e(step.value)}</span>` : ""}<strong>${e(step.label)}</strong><p>${e(step.detail)}</p></div>`).join("")}</div><figcaption>${e(figure.caption)}</figcaption></figure>`;
  let body: string;
  if (id === "resources" || id === "blog") {
    const isHub = id === "resources";
    body = `<section class="wrap editorial-hero${isHub ? "" : " editorial-blog-hero"}">${breadcrumbs(isHub ? undefined : ui.blog)}<span class="eyebrow">KAIRUM / ${e(isHub ? ui.resources : ui.blog)}</span><h1>${e(isHub ? ui.heroTitle : ui.blogTitle).replaceAll("\n", "<br>")}</h1><p class="editorial-intro">${e(isHub ? ui.heroIntro : ui.blogIntro)}</p><div class="editorial-shortcuts">${a(isHub ? ui.browseBlog : ui.guide, isHub ? "/blog/" : editorialPath("visibility-guide"))}${a(ui.glossary, "/glosario/")}${a(ui.methodology, "/metodologia/")}</div></section><section class="wrap editorial-feature-section" aria-label="${e(ui.featured)}">${featured}</section><section class="wrap editorial-library"><div class="editorial-section-heading"><div><span class="eyebrow">${e(ui.blog)}</span><h2>${e(ui.articles)}</h2></div>${isHub ? a(ui.browseBlog, "/blog/") : ""}</div>${cards(articleIds)}</section>${isHub ? `<section class="wrap editorial-reference-grid"><a class="editorial-reference" href="/glosario/"><span class="eyebrow">01 / ${e(ui.glossary)}</span><h2>${e(ui.glossaryDescription)}</h2>${arrow}</a><a class="editorial-reference" href="/metodologia/"><span class="eyebrow">02 / ${e(ui.methodology)}</span><h2>${e(copy.pages.methodology.summary)}</h2>${arrow}</a></section><section class="wrap editorial-reports"><div><span class="eyebrow">${e(ui.reports)}</span><h2>${e(ui.reportsAction)}</h2><p>${e(ui.reportsNote)}</p></div>${a(ui.reportsAction, "/informes/", "button secondary")}</section>` : ""}${cta}`;
  } else {
    const section = (block: Section) =>
      `<section id="${e(block.id)}" class="editorial-section" tabindex="-1"><h2>${e(block.title)}</h2>${block.paragraphs.map((p) => `<p>${e(p)}</p>`).join("")}${block.items ? `<ul>${block.items.map((item) => `<li>${e(item)}</li>`).join("")}</ul>` : ""}${block.table ? `<div class="editorial-table-wrap"><table><caption class="sr-only">${e(block.title)}</caption><thead><tr>${block.table.columns.map((c) => `<th scope="col">${e(c)}</th>`).join("")}</tr></thead><tbody>${block.table.rows.map((row) => `<tr>${row.map((cell, i) => `<${i === 0 ? 'th scope="row"' : "td"}>${e(cell)}</${i === 0 ? "th" : "td"}>`).join("")}</tr>`).join("")}</tbody></table></div>` : ""}${block.example ? `<aside class="editorial-example"><strong>${e(block.example.label)}</strong><p>${e(block.example.text)}</p></aside>` : ""}${block.figure ? explainer(block.figure) : ""}${block.references ? `<div class="editorial-inline-sources"><span>${e(ui.reference)}</span>${block.references.map((source) => a(source.title, source.url)).join("")}</div>` : ""}</section>`;
    const cover =
      page.cover && editorialMedia(id)
        ? `<figure class="wrap editorial-cover${page.bodyHtml ? " editorial-approved-cover" : ""}">${image(id, "cover")}${page.cover.caption ? `<figcaption>${e(page.cover.caption)}</figcaption>` : ""}</figure>`
        : "";
    const takeaways = page.takeaways
      ? `<aside class="editorial-takeaways" aria-labelledby="reading-takeaways"><h2 id="reading-takeaways">${e(ui.takeaways)}</h2><ul>${page.takeaways.map((item) => `<li>${e(item)}</li>`).join("")}</ul></aside>`
      : "";
    body = `<header class="wrap editorial-article-hero">${breadcrumbs(page.category)}<span class="eyebrow">${e(page.category)}</span><h1>${e(page.title)}</h1><p class="editorial-intro">${e(page.summary)}</p><div class="editorial-byline"><a href="/metodologia/">${e(ui.author)}</a><span>${e(ui.reviewed)} <time datetime="${page.reviewedDate ?? reviewedDate}">${e(page.reviewedLabel ?? ui.date)}</time></span><span>${readingMinutes(page)} ${e(ui.minutes)}</span></div></header>${cover}<div class="wrap editorial-reading-layout"><aside class="editorial-toc"><nav aria-label="${e(ui.onThisPage)}"><strong>${e(ui.onThisPage)}</strong><ol>${page.sections.map((block) => `<li><a href="#${e(block.id)}">${e(block.title)}</a></li>`).join("")}${page.bodyHtml ? "" : `<li><a href="#fuentes">${e(ui.sources)}</a></li>`}</ol></nav></aside><article class="editorial-reading">${page.bodyHtml ?? `${takeaways}${page.sections.map(section).join("")}<section class="editorial-section editorial-sources" id="fuentes" tabindex="-1"><h2>${e(ui.sources)}</h2><ul>${page.sources.map((source) => `<li><a href="${e(source.url)}" rel="noopener noreferrer">${e(source.title)}${arrow}</a></li>`).join("")}</ul></section>${policy}<a class="text-link" href="/productos/${page.product}/">${e(page.product === "report" ? ui.ctaAction : page.product === "analytics" ? "Analytics" : "Prompt Intelligence")}${arrow}</a>`}</article></div><section class="wrap editorial-library editorial-related"><div class="editorial-section-heading"><h2>${e(ui.related)}</h2>${a(ui.back, "/recursos/")}</div>${cards(page.related)}</section>${cta}`;
  }
  return `${renderer.marketingHeader()}<main id="contenido" class="editorial-page" tabindex="-1">${body}</main>${renderer.marketingFooter()}`;
}
