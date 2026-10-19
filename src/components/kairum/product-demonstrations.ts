import { productIdentityCopy } from "../../i18n/product-identity";
import type { Locale } from "../../i18n/locales";
import { escapeHtml as e } from "../../lib/escape";

const icon = (name: string) =>
  `<i data-icon="${name}" aria-hidden="true" style="--icon:url('/kairum/assets/icons/${name}.svg')"></i>`;

export function renderPromptDemonstration(
  locale: Locale,
  mode: "home" | "product",
) {
  const c = productIdentityCopy[locale].prompt;
  const prefix = `prompt-${mode}`;
  return `<div class="cinematic-scene scene-prompts product-demonstration" data-home-scene="prompts" data-functional-scene data-prompt-demonstration data-tabs role="group" aria-label="${e(c.title)}">
    <div class="pd-workspace" data-home-object>
      <div class="pd-window-bar">${icon("MagnifyingGlass")}<strong>${e(c.name)}</strong><span>${e(c.title)}</span></div>
      <div class="pd-prompt-layout"><div class="pd-prompt-art" aria-hidden="true"><img src="/kairum/assets/home-prompt-discovery.png" width="1536" height="1024" alt="" loading="lazy"></div>
        <div class="pd-prompt-reading"><div class="pd-intents" data-tab-list aria-label="${e(c.navigation)}">${c.intents.map((intent) => `<a id="${prefix}-${intent.key}-tab" href="#${prefix}-${intent.key}" data-tab="${prefix}-${intent.key}">${e(intent.label)}</a>`).join("")}</div>
          ${c.intents.map((intent) => `<section class="pd-question" id="${prefix}-${intent.key}" data-tab-panel><span class="pd-label">${e(c.question)}</span><h3 data-functional-step>${e(intent.question)}</h3><dl><div class="pd-intent-result" data-functional-step><dt>${e(c.intent)}</dt><dd>${icon("ArrowRight")}<strong>${e(intent.label)}</strong></dd></div><div class="pd-reading-result" data-functional-step><dt>${e(c.reading)}</dt><dd>${e(intent.reading)}</dd></div></dl></section>`).join("")}
        </div>
      </div>
    </div>
  </div>`;
}

export function renderTrafficDemonstration(locale: Locale) {
  const c = productIdentityCopy[locale].traffic;
  return `<div class="cinematic-scene scene-traffic product-demonstration" data-home-scene="traffic" data-functional-scene data-traffic-demonstration role="group" aria-label="${e(c.title)}"><div class="pd-workspace" data-home-object>
    <div class="pd-window-bar">${icon("CursorClick")}<strong>${e(c.name)}</strong><span>${e(c.title)}</span></div>
    <div class="pd-traffic-routes">${(["people", "crawlers"] as const)
      .map((key) => {
        const route = c[key];
        const symbols =
          key === "people"
            ? ["Quotes", "CursorClick", "Globe"]
            : ["MagnifyingGlass", "FileText", "Stack"];
        return `<details class="pd-traffic-route" data-traffic-route="${key}" open><summary><span>${icon(key === "people" ? "CursorClick" : "Globe")}<span>${e(route.label)}<strong>${e(route.title)}</strong></span></span>${icon("CaretRight")}</summary><ol>${route.steps.map((step, index) => `<li data-functional-step><span class="pd-node-symbol">${icon(symbols[index])}</span><span class="pd-node-label">${e(step)}</span></li>`).join("")}</ol><p class="pd-route-source">${icon("FileText")}${e(route.source)}</p></details>`;
      })
      .join("")}</div><p class="pd-traffic-note">${e(c.distinction)}</p>
  </div></div>`;
}
