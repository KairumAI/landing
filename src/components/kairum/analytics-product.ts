import { analyticsProductCopy } from "../../i18n/analytics-product";
import type { Locale } from "../../i18n/locales";
import { escapeHtml as e } from "../../lib/escape";

export function renderAnalyticsBenefits(locale: Locale): string {
  const c = analyticsProductCopy[locale];
  const icons = [
    "Eye",
    "Quotes",
    "Globe",
    "Stack",
    "MagnifyingGlass",
    "FileText",
  ];
  return `<section class="ap-benefits wrap" id="capacidades" data-analytics-editorial><div class="ap-section-heading"><h2>${e(c.benefitsTitle)}</h2><p>${e(c.benefitsIntro)}</p></div><div class="ap-benefit-grid">${c.benefits.map((item, i) => `<article><i data-icon="${icons[i]}" aria-hidden="true" style="--icon:url('/kairum/assets/icons/${icons[i]}.svg')"></i><h3>${e(item.title)}</h3><p>${e(item.text)}</p></article>`).join("")}</div></section>`;
}

export function renderAnalyticsWorkflow(locale: Locale): string {
  const c = analyticsProductCopy[locale];
  return `<section class="ap-workflow" id="como-funciona" data-analytics-editorial><div class="wrap ap-workflow-layout"><div class="ap-section-heading"><h2>${e(c.workflowTitle)}</h2><p>${e(c.workflowIntro)}</p></div><div class="ap-workflow-steps">${c.workflow.map((item) => `<article><h3>${e(item.title)}</h3><p>${e(item.text)}</p></article>`).join("")}</div></div></section>`;
}
