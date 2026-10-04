import { $, $$, setHighlightedText } from "./dom";
import { curve, ease, Loop, segment, setAlpha } from "./anim";
import { t } from "./i18n";
import { highlightBrand } from "../i18n/locales";

const status = $("#hero-status");
const query = $("#hero-query");
const answer = $("#hero-answer");
const caret = $(".typing-caret");
const response = $(".hero-response");
const sources = $(".hero-sources");
const result = $(".hero-result");
const report = $(".hero-report");
const providers = $$(".floating-provider");

// Status shown from each start time (seconds) until the next one.
const stages = [
  [10.2, t.heroStatuses.ready],
  [7.1, t.heroStatuses.sources],
  [2.4, t.heroStatuses.reading],
  [0, t.heroStatuses.preparing],
] as const;

function typeInto(element: HTMLElement, content: string, progress: number) {
  const text = content.slice(0, Math.floor(content.length * progress));
  if (element.textContent !== text)
    setHighlightedText(element, text, highlightBrand);
}

function rise(element: HTMLElement, progress: number, distance: number) {
  setAlpha(element, progress);
  element.style.translate = `0 ${distance * (1 - progress)}px`;
}

function render(time: number) {
  const [, label] = stages.find(([start]) => time >= start)!;
  if (status.textContent !== label) status.textContent = label;
  typeInto(query, t.heroQuery, segment(time, 0.15, 1.9, curve.linear));
  providers.forEach((provider, index) =>
    rise(provider, segment(time, 0.8 + index * 0.25, 0.6, curve.cubicOut), 16),
  );
  setAlpha(caret, 1 - segment(time, 2.4, 0.15));
  setAlpha(response, 0.25 + 0.75 * segment(time, 2.5, 0.4));
  typeInto(answer, t.heroAnswer, segment(time, 2.6, 4.3, curve.linear));
  rise(sources, segment(time, 7.2, 0.65, curve.cubicOut), 9);
  rise(result, segment(time, 8.6, 0.65, curve.cubicOut), 10);
  const landed = segment(time, 9.2, 0.9, curve.quartOut);
  setAlpha(report, landed);
  report.style.transform = `translate(${25 * (1 - landed)}px, ${10 * (1 - landed)}px) rotate(${3 - 4.3 * landed}deg)`;
}

export const heroTimeline = new Loop(14, 2, render);

export const ambientTimeline = $(".hero-atmosphere").animate(
  [{ transform: "none" }, { transform: "translate(3%, -2%) scale(1.045)" }],
  {
    duration: 13000,
    iterations: Infinity,
    direction: "alternate",
    easing: ease.sineInOut,
  },
);
ambientTimeline.pause();
