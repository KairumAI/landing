import { analyticsStoryCopy } from "../../i18n/analytics-story";
import type { Locale } from "../../i18n/locales";
import { analyticsStoryData as data } from "../../lib/analytics-story-data";
import { escapeHtml as e } from "../../lib/escape";

export function renderAnalyticsPreview(
  locale: Locale,
  mode: "home" | "product",
): string {
  const c = analyticsStoryCopy[locale];
  const prefix = `analytics-preview-${mode}`;
  const keys = ["comparison", "alternatives", "sources"] as const;
  const glyphs = ["Eye", "Quotes", "Globe"];
  const sectionHeading = "h2";
  const toolbarHeading = mode === "home" ? "h3" : "h4";
  const rankingHeading = mode === "home" ? "h4" : "h5";
  const icon = (name: string) =>
    `<i data-icon="${name}" aria-hidden="true" style="--icon:url('/kairum/assets/icons/${name}.svg')"></i>`;
  const brand = (index: number) =>
    index === 0
      ? c.brand
      : `${c.competitor} ${String.fromCharCode(64 + index)}`;
  const percent = (value: number) =>
    new Intl.NumberFormat(locale, {
      maximumFractionDigits: 1,
      style: "percent",
    }).format(value / 100);
  const badge = (index: number) =>
    `<span class="as-brand-symbol ${index === 0 ? "as-brand-own" : ""}" aria-hidden="true">${icon(index === 0 ? "Stack" : "Circle")}</span>`;
  const scope = `<p class="as-disclosure">${e(c.disclosure)}</p>`;
  const viewLink = (key: (typeof keys)[number]) =>
    mode === "home"
      ? `/productos/analytics/#analytics-preview-product-${key}`
      : `#${prefix}-${key}`;
  const sidebar = (active: number) =>
    `<aside class="as-sidebar"><div class="as-brand">${badge(0)}<strong>${e(c.brand)}</strong></div><nav aria-label="${e(c.navigation)}">${keys.map((key, i) => `<a href="${viewLink(key)}" ${active === i ? `class="as-view-selected"${mode === "product" ? ' aria-current="location"' : ""}` : ""}>${icon(glyphs[i])}<span>${e(c.views[i])}</span></a>`).join("")}</nav></aside>`;
  const toolbar = (active: number) =>
    `<header class="as-toolbar"><${toolbarHeading}>${e(c.views[active])}</${toolbarHeading}>${active === 0 ? `<fieldset class="as-periods"><legend class="sr-only">${e(c.readings)}</legend>${[7, 14].map((period, i) => `<label><input type="radio" name="${prefix}-period" value="${period}" ${i === 0 ? "checked" : ""} data-as-period><span>${e(c.periods[i])}</span></label>`).join("")}</fieldset>` : `<p>${e(active === 1 ? c.sentimentSample : c.sourcesSample)}</p>`}</header>`;
  const frame = (active: number, content: string) =>
    `<div class="as-workspace"><div class="as-window-bar"><span aria-hidden="true">${icon("Circle")}${icon("Circle")}${icon("Circle")}</span>${scope}</div><div class="as-workspace-layout">${sidebar(active)}<div class="as-main">${toolbar(active)}${content}</div></div></div>`;
  const dataRows = data.series[0]
    .map(
      (_value, index) =>
        `<tr><th scope="row">${e(c.reading)} ${index + 1}</th>${data.series.map((series) => `<td>${percent(series[index])}</td>`).join("")}</tr>`,
    )
    .join("");
  const presence = frame(
    0,
    `<div class="as-presence-grid"><figure class="as-trend"><figcaption><span>${e(c.visibility)}</span><strong>${percent(38)}</strong></figcaption><div class="as-chart-wrap" hidden><canvas data-as-chart role="img" aria-label="${e(c.chart)}" aria-describedby="${prefix}-chart-sample"></canvas></div><details class="as-chart-data" open><summary>${e(c.data)}</summary><div class="as-table-scroll"><table><thead><tr><th scope="col">${e(c.reading)}</th>${[0, 1, 2].map((i) => `<th scope="col">${e(brand(i))}</th>`).join("")}</tr></thead><tbody>${dataRows}</tbody></table></div></details><div class="as-chart-legend">${[0, 1, 2].map((i) => `<span class="as-legend-series as-series-${i}">${icon("Circle")}${e(brand(i))}</span>`).join("")}</div><label class="as-compare"><input type="checkbox" data-as-compare checked>${e(c.comparison)}</label></figure><div class="as-ranking"><${rankingHeading}>${e(c.ranking)}</${rankingHeading}><ol>${data.ranking.map((value, i) => `<li>${badge(i)}<span>${e(brand(i))}</span><strong>${percent(value)}</strong></li>`).join("")}</ol><p>${e(c.overlap)}</p></div></div><p class="as-reading-note" id="${prefix}-chart-sample">${e(c.closing)} ${e(c.sample)}</p>`,
  );
  // Home is a single product sample. The complete story lives on its own page.
  if (mode === "home")
    return `<div class="analytics-preview analytics-story" data-analytics-preview="home" data-analytics-story data-locale="${locale}" data-chart-label="${e(c.reading)}" role="group" aria-label="${e(c.preview)}"><section class="as-story-section" id="${prefix}-comparison" aria-label="${e(c.views[0])}">${presence}</section></div>`;
  const sentiments = frame(
    1,
    `<div class="as-panel-intro"><h5>${e(c.sentimentTitle)}</h5><div class="as-tone-legend">${c.tones.map((tone, i) => `<span class="as-tone-${i}">${icon("Circle")}${e(tone)}</span>`).join("")}</div></div><div class="as-narrative-head" aria-hidden="true"><span>${e(c.topic)}</span><span>${e(c.mentions)}</span><span>${e(c.tone)}</span></div><ul class="as-narratives">${c.topics
      .map((topic, index) => {
        const counts = data.sentiment[index];
        const total = counts.reduce<number>((sum, value) => sum + value, 0);
        const label = counts
          .map((value, i) => `${c.tones[i]} ${percent((value / total) * 100)}`)
          .join(", ");
        return `<li><details ><summary><span class="as-topic-name">${icon("CaretRight")}${e(topic.name)}</span><span class="as-mention-count"><span class="as-mobile-label">${e(c.mentions)}: </span>${total}</span><span class="as-distribution" role="img" aria-label="${e(label)}">${counts.map((value, i) => `<span class="as-tone-${i}" style="flex:${value}" title="${e(`${c.tones[i]}: ${value}`)}"></span>`).join("")}</span></summary><div class="as-narrative-detail"><blockquote><span>${e(c.response)}</span><p>${e(topic.response)}</p></blockquote><div><strong>${e(c.interpretation)}</strong><p>${e(topic.interpretation)}</p><a href="#${prefix}-sources">${e(c.source)} ${icon("ArrowRight")}</a></div></div></details></li>`;
      })
      .join(
        "",
      )}</ul><div class="as-sentiment-trend"><h5>${e(c.sentimentTrend)}</h5><p>${e(c.sentimentTrendContext)}</p><div class="as-chart-wrap" hidden><canvas data-as-sentiment-chart role="img" aria-label="${e(c.sentimentTrendContext)}"></canvas></div><details class="as-sentiment-data" open><summary>${e(c.data)}</summary><table><thead><tr><th scope="col">${e(c.reading)}</th><th scope="col">${e(c.tones[0])}</th></tr></thead><tbody>${data.sentimentTrend.map((value, i) => `<tr><th scope="row">${e(c.reading)} ${i + 8}</th><td>${percent(value)}</td></tr>`).join("")}</tbody></table></details></div>`,
  );
  const kinds = [
    c.own,
    c.editorial,
    c.comparisonKind,
    c.community,
    c.editorial,
    `${c.competitor} A`,
  ];
  const sourceTable = (pages = false) =>
    `<div class="as-table-scroll"><table class="as-source-table"><thead><tr><th scope="col">${e(pages ? c.page : c.domain)}</th>${pages ? "" : `<th scope="col" class="as-source-kind">${e(c.kind)}</th>`}<th scope="col">${e(c.citations)}</th><th scope="col">${e(c.share)}</th></tr></thead><tbody>${(pages
      ? c.pages
      : c.sources
    )
      .map((source, i) => {
        const count = pages ? data.pageCitations[i] : data.citations[i];
        const share = pages ? (count / 32) * 100 : count;
        const path = "path" in source ? source.path : source.domain;
        return `<tr><td><details><summary>${icon("CaretRight")}<code>${e(path)}</code></summary><p>${e(source.description)}</p></details></td>${pages ? "" : `<td class="as-source-kind"><span ${i === 0 ? 'class="as-own-label"' : ""}>${e(kinds[i])}</span></td>`}<td>${count}</td><td><div class="as-share"><meter value="${share}" min="0" max="100" aria-label="${e(`${path}: ${c.share}`)}">${percent(share)}</meter><span>${percent(share)}</span></div></td></tr>`;
      })
      .join("")}</tbody></table></div>`;
  const sources = frame(
    2,
    `<div class="as-source-tabs" data-tabs><div class="tab-list as-source-tab-list" data-tab-list aria-label="${e(c.sourcesTitle)}">${c.sourceViews.map((view, i) => `<a id="${prefix}-source-${i}-tab" href="#${prefix}-source-${i}" data-tab="${prefix}-source-${i}">${e(view)}</a>`).join("")}</div>${[false, true].map((pages, i) => `<div id="${prefix}-source-${i}" data-tab-panel><div class="as-panel-intro"><h5>${e(pages ? c.sourceViews[1] : c.sourcesTitle)}</h5>${pages ? `<p>${e(c.pageSample)}</p>` : ""}</div>${sourceTable(pages)}</div>`).join("")}</div>`,
  );
  return `<div class="analytics-preview analytics-story" data-analytics-preview="${mode}" data-analytics-story data-locale="${locale}" data-chart-label="${e(c.reading)}" role="group" aria-label="${e(c.navigation)}"><nav class="as-story-index" aria-label="${e(c.navigation)}">${keys.map((key, i) => `<a href="#${prefix}-${key}">${icon(glyphs[i])}${e(c.views[i])}</a>`).join("")}</nav>${[presence, sentiments, sources].map((content, i) => `<section class="as-story-section" id="${prefix}-${keys[i]}" aria-labelledby="${prefix}-${keys[i]}-heading"><div class="as-story-heading"><span>${icon(glyphs[i])}${e(c.views[i])}</span><${sectionHeading} id="${prefix}-${keys[i]}-heading">${e(c.headings[i])}</${sectionHeading}><p>${e(c.descriptions[i])}</p></div>${content}</section>`).join("")}<p class="as-story-scope">${e(c.scope)}</p></div>`;
}
