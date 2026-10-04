import { $, $$, gsap, icons, escapeHtml } from "./dom";
import { motion } from "./state";
import { providerExamples } from "../data/providers";
import { patterns, stateLabels, type PatternState } from "../data/patterns";
import { sources } from "../data/sources";
import { audienceReadings } from "../data/audiences";

export function selectProvider(
  index: number,
  animate = true,
  automatic = false,
) {
  const example = providerExamples[index];
  $(".answer-stack").setAttribute("aria-live", automatic ? "off" : "polite");
  $<HTMLImageElement>("#stack-logo").src = `/assets/${example.logo}.svg`;
  $("#stack-provider").textContent = example.name;
  $("#stack-answer").innerHTML = escapeHtml(example.answer).replace(
    "Norte",
    "<mark>Norte</mark>",
  );
  $("#stack-insight").textContent = example.insight;
  $$(".provider-switch button").forEach((button) =>
    button.setAttribute(
      "aria-pressed",
      String(Number(button.dataset.provider) === index),
    ),
  );
  $(".answer-stack").dataset.selectedProvider = String(index);
  if (animate && !motion.reduced && !motion.globalPaused) {
    gsap.fromTo(
      ".answer-card",
      { y: 16, rotate: -1.5, autoAlpha: 0.3 },
      { y: 0, rotate: 0, autoAlpha: 1, duration: 0.6, ease: "power3.out" },
    );
    gsap.fromTo(
      ".answer-card mark",
      { backgroundColor: "#ffffff" },
      { backgroundColor: "#fff0b5", duration: 0.8, delay: 0.25 },
    );
  }
}
$$("[data-provider]").forEach((button) =>
  button.addEventListener("click", () =>
    selectProvider(Number(button.dataset.provider)),
  ),
);
selectProvider(0, false);

export function setPattern(intent: string | undefined, animate = true) {
  if (!intent || !(intent in patterns)) return;
  const pattern = patterns[intent as keyof typeof patterns];
  $("#pattern-question").textContent = pattern.question;
  $("#pattern-insight").textContent = pattern.insight;
  $("#matrix-body").innerHTML = pattern.rows
    .map(
      (row) =>
        `<tr><td>${row[0]}</td>${(row.slice(1) as PatternState[])
          .map(
            (state) =>
              `<td><span class="matrix-state ${state}"><i data-icon="${state === "ausente" ? "Minus" : state === "comparacion" ? "Stack" : "Check"}"></i>${stateLabels[state]}</span></td>`,
          )
          .join("")}</tr>`,
    )
    .join("");
  icons($("#matrix-body"));
  $$(".pattern-controls button").forEach((button) =>
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.intent === intent),
    ),
  );
  $(".patterns-section").dataset.intent = intent;
  if (animate && !motion.reduced && !motion.globalPaused) {
    gsap.fromTo(
      ".matrix-state",
      { autoAlpha: 0, y: 8 },
      {
        autoAlpha: 1,
        y: 0,
        stagger: 0.035,
        duration: 0.35,
        ease: "power2.out",
      },
    );
    gsap.fromTo(
      ".pattern-reading h3,.pattern-reading>p",
      { autoAlpha: 0.2, y: 10 },
      { autoAlpha: 1, y: 0, stagger: 0.07, duration: 0.4 },
    );
  }
}
$$(".pattern-controls button").forEach((button) =>
  button.addEventListener("click", () => setPattern(button.dataset.intent)),
);
setPattern("explorar", false);

export function selectSource(index: number, animate = true) {
  const source = sources[index];
  $("#source-url").textContent = source.url;
  $("#source-title").textContent = source.title;
  $("#source-excerpt").innerHTML = source.excerpt;
  $("#source-review").textContent = source.review;
  $("#source-highlight").textContent = source.highlight;
  $("#source-prefix").textContent = source.prefix;
  $$("[data-source]").forEach((button) =>
    button.setAttribute(
      "aria-pressed",
      String(Number(button.dataset.source) === index),
    ),
  );
  $(".source-workspace").dataset.selectedSource = String(index);
  if (animate && !motion.reduced && !motion.globalPaused) {
    gsap.fromTo(
      ".source-document",
      { autoAlpha: 0.3, y: 12 },
      { autoAlpha: 1, y: 0, duration: 0.5, ease: "power2.out" },
    );
    gsap.fromTo(
      ".source-document mark",
      { backgroundColor: "#ffffff" },
      { backgroundColor: "#fff0b5", duration: 0.9, delay: 0.2 },
    );
  }
}
$$("[data-source]").forEach((button) =>
  button.addEventListener("click", () =>
    selectSource(Number(button.dataset.source)),
  ),
);
selectSource(0, false);

function selectAudience(key: string | undefined) {
  if (!key || !(key in audienceReadings)) return;
  const reading = audienceReadings[key as keyof typeof audienceReadings];
  if (!reading || $("#audience-panel").dataset.selectedAudience === key) return;
  $("#audience-lens").textContent = reading.lens;
  $("#audience-question").textContent = reading.question;
  $("#audience-reading").textContent = reading.reading;
  $("#audience-action").textContent = reading.action;
  $("#audience-panel").dataset.selectedAudience = key;
  $$("[data-audience]").forEach((button) =>
    button.setAttribute(
      "aria-pressed",
      String(button.dataset.audience === key),
    ),
  );
  gsap.killTweensOf(".audience-panel-copy");
  if (!motion.reduced && !motion.globalPaused) {
    gsap.fromTo(
      ".audience-panel-copy",
      { autoAlpha: 0.25, y: 12 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.45,
        ease: "power2.out",
      },
    );
  } else {
    gsap.set(".audience-panel-copy", { autoAlpha: 1, y: 0 });
  }
}
$$("[data-audience]").forEach((button) =>
  button.addEventListener("click", () =>
    selectAudience(button.dataset.audience),
  ),
);
