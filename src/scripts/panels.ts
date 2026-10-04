import { $, $$, setHighlightedText } from "./dom";
import { animateFrom, cancelAnimations, ease, invisible } from "./anim";
import { motion } from "./state";
import { t } from "./i18n";
import { highlightBrand } from "../i18n/locales";
const { providerExamples, patterns, sources, audienceReadings } = t;

function markPressed(
  buttons: HTMLElement[],
  isSelected: (button: HTMLElement) => boolean,
) {
  buttons.forEach((button) =>
    button.setAttribute("aria-pressed", String(isSelected(button))),
  );
}

const answerStack = $(".answer-stack");
export function selectProvider(index: number, automatic = false) {
  const example = providerExamples[index];
  answerStack.setAttribute("aria-live", automatic ? "off" : "polite");
  $<HTMLImageElement>("#stack-logo").src = `/assets/${example.logo}.svg`;
  $("#stack-provider").textContent = example.name;
  setHighlightedText($("#stack-answer"), example.answer, highlightBrand);
  $("#stack-insight").textContent = example.insight;
  markPressed(
    $$(".provider-switch button"),
    (button) => Number(button.dataset.provider) === index,
  );
  answerStack.dataset.selectedProvider = String(index);
  if (motion.reduced || motion.globalPaused) return;
  animateFrom(
    $(".answer-card"),
    { opacity: 0.3, translate: "0 16px", rotate: "-1.5deg" },
    { duration: 0.6, easing: ease.quartOut },
  );
  animateFrom(
    $(".answer-card mark"),
    { backgroundColor: "#ffffff" },
    { duration: 0.8, delay: 0.25 },
  );
}
$$("[data-provider]").forEach((button) =>
  button.addEventListener("click", () =>
    selectProvider(Number(button.dataset.provider)),
  ),
);

const patternsSection = $(".patterns-section");
export function setPattern(intent: string | undefined) {
  if (!intent || !(intent in patterns)) return;
  const pattern = patterns[intent as keyof typeof patterns];
  $("#pattern-question").textContent = pattern.question;
  $("#pattern-insight").textContent = pattern.insight;
  $$("[data-intent-rows]").forEach((rows) => {
    rows.hidden = rows.dataset.intentRows !== intent;
  });
  markPressed(
    $$(".pattern-controls button"),
    (button) => button.dataset.intent === intent,
  );
  patternsSection.dataset.intent = intent;
  if (motion.reduced || motion.globalPaused) return;
  animateFrom(
    $$(`[data-intent-rows="${intent}"] .matrix-state`),
    { ...invisible, translate: "0 8px" },
    { duration: 0.35, stagger: 0.035, easing: ease.cubicOut },
  );
  animateFrom(
    $$(".pattern-reading h3,.pattern-reading>p"),
    { opacity: 0.2, translate: "0 10px" },
    { duration: 0.4, stagger: 0.07 },
  );
}
$$(".pattern-controls button").forEach((button) =>
  button.addEventListener("click", () => setPattern(button.dataset.intent)),
);

const sourceWorkspace = $(".source-workspace");
export function selectSource(index: number) {
  const source = sources[index];
  const [before, highlighted, after] = source.excerpt;
  const mark = document.createElement("mark");
  mark.textContent = highlighted;
  $("#source-url").textContent = source.url;
  $("#source-title").textContent = source.title;
  $("#source-excerpt").replaceChildren(before, mark, after);
  $("#source-review").textContent = source.review;
  $("#source-highlight").textContent = source.highlight;
  $("#source-prefix").textContent = source.prefix;
  markPressed(
    $$("[data-source]"),
    (button) => Number(button.dataset.source) === index,
  );
  sourceWorkspace.dataset.selectedSource = String(index);
  if (motion.reduced || motion.globalPaused) return;
  animateFrom(
    $(".source-document"),
    { opacity: 0.3, translate: "0 12px" },
    { duration: 0.5, easing: ease.cubicOut },
  );
  animateFrom(
    mark,
    { backgroundColor: "#ffffff" },
    { duration: 0.9, delay: 0.2 },
  );
}
$$("[data-source]").forEach((button) =>
  button.addEventListener("click", () =>
    selectSource(Number(button.dataset.source)),
  ),
);

const audiencePanel = $("#audience-panel");
function selectAudience(key: string | undefined) {
  if (!key || !(key in audienceReadings)) return;
  if (audiencePanel.dataset.selectedAudience === key) return;
  const reading = audienceReadings[key as keyof typeof audienceReadings];
  $("#audience-lens").textContent = reading.lens;
  $("#audience-question").textContent = reading.question;
  $("#audience-reading").textContent = reading.reading;
  $("#audience-action").textContent = reading.action;
  audiencePanel.dataset.selectedAudience = key;
  markPressed(
    $$("[data-audience]"),
    (button) => button.dataset.audience === key,
  );
  const copy = $(".audience-panel-copy");
  cancelAnimations(copy);
  if (motion.reduced || motion.globalPaused) return;
  animateFrom(
    copy,
    { opacity: 0.25, translate: "0 12px" },
    { duration: 0.45, easing: ease.cubicOut },
  );
}
$$("[data-audience]").forEach((button) =>
  button.addEventListener("click", () =>
    selectAudience(button.dataset.audience),
  ),
);
