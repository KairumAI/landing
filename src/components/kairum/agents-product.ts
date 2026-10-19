import { agentsProductCopy } from "../../i18n/agents-product";
import type { Locale } from "../../i18n/locales";
import { escapeHtml as e } from "../../lib/escape";

const icon = (name: string) =>
  `<i data-icon="${name}" aria-hidden="true" style="--icon:url('/kairum/assets/icons/${name}.svg')"></i>`;
const flowKeys = ["create", "improve", "faq"] as const;
const flowIcons = ["NotePencil", "Sparkle", "Quotes"];
const stepIcons = ["NotePencil", "Stack", "FileText", "CheckCircle"];
const sourcePaths = [
  "/metodologia/",
  "/recursos/como-medir-visibilidad-ia/",
  "/blog/menciones-citas-visitas/",
];

export function renderAgentsPreview(locale: Locale): string {
  const c = agentsProductCopy[locale];
  return `<div class="agp-preview" data-agents-preview="product" data-tabs role="group" aria-label="${e(c.preview)}">
    <div class="agp-workspace">
      <header class="agp-window-bar"><span>${icon("Sparkle")}${e(c.workspace)}</span><span>${e(c.process)}</span></header>
      <div class="agp-workspace-body">
        <div class="agp-sidebar"><p>${e(c.paths)}</p><div class="agp-flow-tabs" data-tab-list aria-label="${e(c.paths)}">${c.flows.map((flow, i) => `<a id="agents-${flowKeys[i]}-tab" href="#agents-${flowKeys[i]}" data-tab="agents-${flowKeys[i]}">${icon(flowIcons[i])}<span>${e(flow.name)}</span>${icon("CaretRight")}</a>`).join("")}</div><a class="agp-context-link" href="#agents-contexto">${icon("Stack")}${e(c.context.label)}</a></div>
        <div class="agp-flow-panels">${c.flows
          .map((flow, i) => {
            const values = [flow.brief, flow.source, flow.output, c.pending];
            return `<section id="agents-${flowKeys[i]}" data-tab-panel class="agp-flow-panel"><div class="agp-panel-heading"><h2>${e(flow.title)}</h2><span class="agp-status">${icon("NotePencil")}${e(c.pending)}</span></div><div class="agp-flow-layout"><div class="agp-canvas"><p class="agp-ui-label">${e(c.process)}</p><ol class="agp-nodes">${c.stepNames.map((name, j) => `<li><details><summary>${icon(stepIcons[j])}<span><strong>${e(name)}</strong><small>${e(values[j])}</small></span>${icon("CaretDown")}</summary><p>${e(c.stepDetails[j])}</p></details></li>`).join("")}</ol></div><div class="agp-output"><div class="agp-output-label">${icon("FileText")}${e(c.draft)}</div><article class="agp-document"><span class="agp-document-brand">${e(c.workspace)}</span><h3>${e(flow.documentTitle)}</h3><p>${e(flow.lead)}</p><h4>${e(flow.heading)}</h4><p>${e(flow.body)}</p><a href="${sourcePaths[i === 2 ? 2 : 0]}">${icon("Link")}${e(c.context.sourceNames[i === 2 ? 2 : 0])}</a></article></div></div></section>`;
          })
          .join("")}</div>
      </div>
    </div><p class="agp-disclosure">${e(c.disclosure)}</p>
  </div>`;
}

export function renderAgentsBenefits(locale: Locale): string {
  const c = agentsProductCopy[locale];
  return `<section class="agp-benefits wrap" id="capacidades" data-agents-editorial><h2>${e(c.benefitsTitle)}</h2><div class="agp-benefit-grid">${c.benefits.map((item, i) => `<article>${icon(["MagnifyingGlass", "Stack", "NotePencil", "CheckCircle"][i])}<h3>${e(item.title)}</h3><p>${e(item.text)}</p></article>`).join("")}</div></section>`;
}

export function renderAgentsChapters(locale: Locale): string {
  const c = agentsProductCopy[locale];
  const heading = (index: number) =>
    `<div class="agp-chapter-heading"><span><span aria-hidden="true">0${index + 1}</span>${e(c.chapterLabels[index])}</span><div><h2>${e(c.chapters[index].title)}</h2><p>${e(c.chapters[index].text)}</p></div></div>`;
  const context = c.context;
  const review = c.review;
  return `<div class="agp-chapters" data-agents-editorial>
    <section class="agp-chapter wrap" id="como-funciona">${heading(0)}<div class="agp-template-grid">${c.templates.map((item, i) => `<article>${icon(flowIcons[i])}<h3>${e(item.title)}</h3><p>${e(item.text)}</p><a href="#agents-${flowKeys[i]}">${e(c.explore)}${icon("ArrowUpRight")}</a></article>`).join("")}</div></section>
    <section class="agp-chapter agp-context-section" id="agents-contexto"><div class="wrap">${heading(1)}<div class="agp-context-workspace"><div class="agp-context-profile"><div class="agp-context-heading">${icon("Stack")}<div><span>${e(context.label)}</span><h3>${e(context.title)}</h3></div></div><dl>${[
      [context.voice, context.voiceText],
      [context.facts, context.factsText],
      [context.boundaries, context.boundariesText],
    ]
      .map(
        ([title, text]) => `<div><dt>${e(title)}</dt><dd>${e(text)}</dd></div>`,
      )
      .join(
        "",
      )}</dl></div><div class="agp-sources"><h3>${e(context.sources)}</h3>${context.sourceNames.map((name, i) => `<a href="${sourcePaths[i]}">${icon("FileText")}<span><strong>${e(name)}</strong><small>${e(context.sourceDescriptions[i])}</small></span>${icon("ArrowUpRight")}</a>`).join("")}<div class="agp-context-reference">${icon("Link")}<p>${e(c.stepDetails[1])}</p></div></div></div></div></section>
    <section class="agp-chapter wrap" id="agents-revision">${heading(2)}<div class="agp-editor" data-tabs><header class="agp-editor-bar"><span>${icon("FileText")}${e(review.title)}</span><span class="agp-status">${e(c.pending)}</span></header><div class="agp-editor-body"><div class="agp-editor-main"><div class="agp-editor-tabs" data-tab-list aria-label="${e(review.title)}">${[review.proposed, review.original].map((label, i) => `<a id="agents-review-${i}-tab" data-tab="agents-review-${i}" href="#agents-review-${i}">${e(label)}</a>`).join("")}</div>${[review.after, review.before].map((text, i) => `<div id="agents-review-${i}" data-tab-panel class="agp-version"><span class="agp-ui-label">${e(i === 0 ? review.proposed : review.original)}</span><h3>${e(c.flows[1].documentTitle)}</h3><p>${e(text)}</p>${i === 0 ? `<a class="agp-editor-source" href="/productos/analytics/">${icon("Link")}${e(c.flows[1].title)}</a>` : ""}</div>`).join("")}<details class="agp-diff"><summary>${icon("NotePencil")}${e(review.changes)}${icon("CaretDown")}</summary><div><p>${e(review.changesText)}</p><p class="agp-diff-before"><span>${e(review.original)}</span><del>${e(review.before)}</del></p><p class="agp-diff-after"><span>${e(review.proposed)}</span><ins>${e(review.after)}</ins></p></div></details><p class="agp-editor-footnote">${e(review.footnote)}</p></div><aside class="agp-review"><h3>${e(review.criteria)}</h3>${review.checks.map((item, i) => `<details${i === 0 ? " open" : ""}><summary>${icon("CheckCircle")}<span>${e(item.title)}</span>${icon("CaretDown")}</summary><p>${e(item.text)}</p></details>`).join("")}</aside></div></div><div class="agp-delivery"><h3>${e(review.scopeTitle)}</h3><p>${e(review.scopeText)}</p></div></section>
  </div>`;
}
