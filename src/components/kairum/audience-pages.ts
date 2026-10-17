import { audienceCopy, type AudiencePageId } from "../../i18n/audience-pages";
import { bookingUrl, type Locale } from "../../i18n/locales";
import { translator } from "../../i18n/marketing";
import { escapeHtml as e } from "../../lib/escape";
import { createProducts } from "./products";

export type { AudiencePageId } from "../../i18n/audience-pages";

const icon = (name: string) =>
  `<i data-icon="${e(name)}" aria-hidden="true" style="--icon:url('/kairum/assets/icons/${encodeURIComponent(name)}.svg')"></i>`;
const label = (text: string) => `<span class="eyebrow">${e(text)}</span>`;
const lines = (text: string) => text.split("\n").map(e).join("<br>");

/** The caller supplies the shared closing, including its single contact slot. */
export function renderAudienceBody(
  id: AudiencePageId,
  locale: Locale,
  closingHtml: string,
): string {
  const copy = audienceCopy(locale);
  const hero = copy.heroes[id];
  const book = `<a class="button primary" href="${e(bookingUrl)}" data-book target="_blank" rel="noopener noreferrer">${e(copy.book)}${icon("ArrowUpRight")}</a>`;
  const heroCopy = `<div class="audience-hero-copy">${label(hero.eyebrow)}<h1 id="audience-title">${lines(hero.title)}</h1><p>${e(hero.intro)}</p>${book}</div>`;
  let body: string;

  if (id === "marcas") {
    const { example, reading, products: productCopy } = copy.brands;
    const { findProduct, productPath } = createProducts(translator(locale));
    const answer = `<figure class="audience-answer" data-audience-answer aria-describedby="audience-example-note"><figcaption>${e(example.label)}</figcaption><div class="audience-answer-paper"><div class="audience-question">${icon("NotePencil")}<p>${e(example.question)}</p></div><div class="audience-answer-copy">${icon("Sparkle")}<div><blockquote><p><mark>${e(example.answer)}</mark></p></blockquote><div class="audience-answer-lines" aria-hidden="true"><span></span><span></span><span></span></div></div></div><div class="audience-answer-source">${icon("FileText")}<div><span>${e(example.sourcePath)}</span><p>${e(example.source)}</p></div></div></div><p class="audience-answer-note">${icon("Eye")}<span>${e(example.annotation)}</span></p><p id="audience-example-note" class="audience-example-note">${e(example.note)}</p></figure>`;
    body = `<section class="audience-hero"><div class="wrap audience-hero-grid">${heroCopy}${answer}</div></section>
      <section class="audience-section wrap" aria-labelledby="audience-reading-title"><div class="audience-section-heading">${label(reading.eyebrow)}<h2 id="audience-reading-title">${e(reading.title)}</h2><p>${e(reading.intro)}</p></div><ol class="audience-reading-steps">${reading.items.map((item, index) => `<li><span class="audience-step-number" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span><h3>${e(item.title)}</h3><p>${e(item.text)}</p></li>`).join("")}</ol></section>
      <section class="audience-product-section"><div class="wrap"><div class="audience-section-heading">${label(productCopy.eyebrow)}<h2>${e(productCopy.title)}</h2><p>${e(productCopy.intro)}</p></div><div class="audience-product-links">${(
        ["report", "analytics", "agents"] as const
      )
        .map((productId) => {
          const product = findProduct(productId);
          return `<a href="${productPath(productId)}">${icon(product.icon)}<span><strong>${e(productId === "report" ? copy.brands.reportName : product.name)} ${icon("ArrowRight")}</strong><small>${e(product.status)}</small><p>${e(product.short)}</p></span></a>`;
        })
        .join("")}</div></div></section>`;
  } else if (id === "agencias") {
    const { example, workflow, roles } = copy.agencies;
    const documentIcons = ["MagnifyingGlass", "FileText", "CheckCircle"];
    const deliverable = `<figure class="audience-deliverable" data-audience-deliverable><figcaption>${e(example.label)}</figcaption><span class="audience-document-brand">${e(example.brand)}</span><div class="audience-deliverable-paper"><h2>${lines(example.title)}</h2><div class="audience-document-items">${example.items.map((item, index) => `<div>${icon(documentIcons[index]!)}<div><h3>${e(item.title)}</h3><p${index === 1 ? ' class="audience-document-highlight"' : ""}>${e(item.text)}</p></div></div>`).join("")}</div><p class="audience-example-note">${e(example.note)}</p></div></figure>`;
    const partnerIcons = [
      ["MagnifyingGlass", "FileText", "Eye"],
      ["CheckCircle", "Stack", "NotePencil", "ArrowRight"],
    ];
    body = `<section class="audience-hero"><div class="wrap audience-hero-grid">${heroCopy}${deliverable}</div></section>
      <section class="audience-workflow" data-audience-workflow aria-labelledby="audience-workflow-title"><div class="wrap"><div class="audience-split-heading"><div>${label(workflow.eyebrow)}<h2 id="audience-workflow-title">${e(workflow.title)}</h2></div><p>${e(workflow.intro)}</p></div><ol>${workflow.items.map((item, index) => `<li><span class="audience-flow-number" aria-hidden="true">${index + 1}</span><h3>${e(item.title)}</h3><p>${e(item.text)}</p></li>`).join("")}</ol></div></section>
      <section class="audience-section wrap" data-audience-roles aria-labelledby="audience-roles-title"><div class="audience-split-heading"><div>${label(roles.eyebrow)}<h2 id="audience-roles-title">${e(roles.title)}</h2></div><p>${e(roles.intro)}</p></div><div class="audience-roles-grid">${roles.partners.map((partner, partnerIndex) => `<article class="audience-role"><h3>${e(partner.title)}</h3><p>${e(partner.intro)}</p><ul>${partner.items.map((item, itemIndex) => `<li><span class="audience-role-icon">${icon(partnerIcons[partnerIndex]![itemIndex]!)}</span><div><h4>${e(item.title)}</h4><p>${e(item.text)}</p></div></li>`).join("")}</ul></article>`).join("")}</div><a class="text-link audience-guide-link" href="/recursos/como-medir-visibilidad-ia/">${e(copy.guideAction)}${icon("ArrowUpRight")}</a></section>`;
  } else {
    const { convictionLabel, conviction, why, method, highlight } = copy.about;
    const headline = lines(hero.title).replace(
      e(highlight),
      `<mark>${e(highlight)}</mark>`,
    );
    body = `<section class="audience-about-hero" data-audience-manifesto><div class="wrap">${label(hero.eyebrow)}<h1 id="audience-title">${headline}</h1><p class="audience-about-intro">${e(hero.intro)}</p><div class="audience-conviction">${label(convictionLabel)}<p>${e(conviction)}</p></div></div></section>
      <section class="audience-section wrap audience-why" aria-labelledby="audience-why-title"><div>${label(why.eyebrow)}<h2 id="audience-why-title">${e(why.title)}</h2><p>${e(why.intro)}</p></div><ul>${why.items.map((item) => `<li><h3>${e(item.title)}</h3><p>${e(item.text)}</p></li>`).join("")}</ul></section>
      <section class="audience-method" data-audience-method aria-labelledby="audience-method-title"><div class="wrap">${label(method.eyebrow)}<h2 id="audience-method-title">${e(method.title)}</h2><ol>${method.items.map((item, index) => `<li><span class="audience-step-number" aria-hidden="true">${String(index + 1).padStart(2, "0")}</span><h3>${e(item.title)}</h3><p>${e(item.text)}</p></li>`).join("")}</ol></div></section>`;
  }

  return `<div class="audience-page audience-${id}" data-audience-page="${id}">${body}${closingHtml}</div>`;
}
