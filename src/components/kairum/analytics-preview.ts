import {
  analyticsPreviewCopy,
  type AnalyticsPreviewTab,
} from "../../i18n/analytics-preview";
import type { Locale } from "../../i18n/locales";
import { escapeHtml as e } from "../../lib/escape";

export function renderAnalyticsPreview(
  locale: Locale,
  mode: "home" | "product",
): string {
  const copy = analyticsPreviewCopy[locale];
  const id = `analytics-preview-${mode}`;
  const readingHeading = mode === "home" ? "h4" : "h3";
  const comparison = `${mode === "product" ? `<h2 class="analytics-preview-title">${e(copy.comparisonTitle)}</h2>` : ""}
    <${mode === "home" ? "h3" : "p"} class="analytics-preview-question">${e(copy.question)}</${mode === "home" ? "h3" : "p"}>
    <p class="analytics-preview-conditions">${e(copy.conditions)}</p>
    <div class="analytics-preview-readings">${copy.readings.map((reading, index) => `<article class="analytics-preview-reading" data-analytics-reading="${index === 0 ? "initial" : "new"}"><${readingHeading}>${e(reading.label)}</${readingHeading}><p>${e(reading.text)}</p></article>`).join("")}</div>
    <div class="analytics-preview-change"><strong>${e(copy.changeLabel)}</strong><p>${e(copy.change)}</p></div>`;
  const alternatives = `<h2 class="analytics-preview-title">${e(copy.alternatives.title)}</h2>
    <p class="analytics-preview-intro">${e(copy.alternatives.intro)}</p>
    <ul class="analytics-preview-alternatives">${copy.alternatives.items.map((item) => `<li><h3>${e(item.brand)}</h3><dl><div><dt>${e(copy.alternatives.presenceLabel)}</dt><dd>${e(item.presence)}</dd></div><div><dt>${e(copy.alternatives.supportLabel)}</dt><dd>${e(item.support)}</dd></div></dl></li>`).join("")}</ul>`;
  const sources = `<h2 class="analytics-preview-title">${e(copy.source.title)}</h2>
    <p class="analytics-preview-intro">${e(copy.source.intro)}</p>
    <figure class="analytics-preview-source"><figcaption><strong>${e(copy.source.page)}</strong><code>${e(copy.source.url)}</code></figcaption><blockquote><p>${e(copy.source.quote)}</p></blockquote></figure>
    <dl class="analytics-preview-source-notes"><div><dt>${e(copy.source.supportsLabel)}</dt><dd>${e(copy.source.supports)}</dd></div><div><dt>${e(copy.source.limitsLabel)}</dt><dd>${e(copy.source.limits)}</dd></div></dl>`;
  const panels: readonly [AnalyticsPreviewTab, string][] = [
    ["comparison", comparison],
    ["alternatives", alternatives],
    ["sources", sources],
  ];

  // Native anchors expose all panels without JavaScript. app.ts adds the tab
  // roles, selected state, roving focus and hidden panels after enhancement.
  const content =
    mode === "home"
      ? `<div class="analytics-preview-body">${comparison}</div>`
      : `<div class="analytics-preview-tabs" data-tabs><div class="tab-list analytics-preview-tab-list" data-tab-list aria-label="${e(copy.tabsLabel)}">${panels.map(([key]) => `<a id="${id}-${key}-tab" href="#${id}-${key}" data-tab="${id}-${key}">${e(copy.tabs[key])}</a>`).join("")}</div>${panels.map(([key, panel]) => `<div class="analytics-preview-body" id="${id}-${key}" data-tab-panel>${panel}</div>`).join("")}</div><p class="analytics-preview-scope">${e(copy.scope)}</p>`;

  return `<div class="analytics-preview" data-analytics-preview="${mode}" role="group" aria-labelledby="${id}-label"><div class="analytics-preview-header"><strong id="${id}-label">${e(copy.name)}</strong><span>${e(copy.disclosure)}</span></div>${content}</div>`;
}
