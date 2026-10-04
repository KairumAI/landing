import { $, escapeHtml, gsap } from "./dom";
import { heroQueryText, heroAnswerText } from "../data/hero";

const queryState = { progress: 0 };
const answerState = { progress: 0 };
function typeInto(
  element: HTMLElement,
  content: string,
  progress: number,
  highlight = false,
) {
  const count = Math.min(content.length, Math.floor(content.length * progress));
  if (element.dataset.typedCount === String(count)) return;
  element.dataset.typedCount = String(count);
  const text = escapeHtml(content.slice(0, count));
  element.innerHTML = highlight
    ? text.replace("Norte", "<mark>Norte</mark>")
    : text;
}
function heroStatus(stage: string, label: string) {
  $("#inicio").dataset.demoState = stage;
  $("#hero-status").textContent = label;
}
export const heroTimeline = gsap.timeline({
  paused: true,
  repeat: -1,
  repeatDelay: 2,
  onRepeat: () => heroStatus("question", "Preparando consulta"),
});
heroTimeline
  .set(".floating-provider", { autoAlpha: 0, y: 16 }, 0)
  .set(".hero-sources", { autoAlpha: 0, y: 9 }, 0)
  .set(".hero-result", { autoAlpha: 0, y: 10 }, 0)
  .set(".hero-report", { autoAlpha: 0, x: 25, y: 10, rotate: 3 }, 0)
  .set(".hero-response", { autoAlpha: 0.25 }, 0)
  .set(".typing-caret", { autoAlpha: 1 }, 0)
  .call(() => heroStatus("question", "Preparando consulta"), [], 0)
  .fromTo(
    queryState,
    { progress: 0 },
    {
      progress: 1,
      duration: 1.9,
      ease: "none",
      onUpdate: () =>
        typeInto($("#hero-query"), heroQueryText, queryState.progress),
    },
    0.15,
  )
  .to(
    ".floating-provider",
    { autoAlpha: 1, y: 0, stagger: 0.25, duration: 0.6, ease: "power2.out" },
    0.8,
  )
  .call(() => heroStatus("response", "Leyendo respuestas"), [], 2.4)
  .to(".typing-caret", { autoAlpha: 0, duration: 0.15 }, 2.4)
  .to(".hero-response", { autoAlpha: 1, duration: 0.4 }, 2.5)
  .fromTo(
    answerState,
    { progress: 0 },
    {
      progress: 1,
      duration: 4.3,
      ease: "none",
      onUpdate: () =>
        typeInto($("#hero-answer"), heroAnswerText, answerState.progress, true),
    },
    2.6,
  )
  .call(() => heroStatus("sources", "Siguiendo las fuentes"), [], 7.1)
  .to(
    ".hero-sources",
    { autoAlpha: 1, y: 0, duration: 0.65, ease: "power2.out" },
    7.2,
  )
  .to(
    ".hero-result",
    { autoAlpha: 1, y: 0, duration: 0.65, ease: "power2.out" },
    8.6,
  )
  .to(
    ".hero-report",
    {
      autoAlpha: 1,
      x: 0,
      y: 0,
      rotate: -1.3,
      duration: 0.9,
      ease: "power3.out",
    },
    9.2,
  )
  .call(() => heroStatus("complete", "Análisis listo"), [], 10.2)
  .to({}, { duration: 3.8 }, 10.2);
export const ambientTimeline = gsap.to(".hero-atmosphere", {
  xPercent: 3,
  yPercent: -2,
  scale: 1.045,
  duration: 13,
  repeat: -1,
  yoyo: true,
  ease: "sine.inOut",
  paused: true,
});

export function completeHero() {
  heroTimeline.progress(1, true).pause();
  typeInto($("#hero-query"), heroQueryText, 1);
  typeInto($("#hero-answer"), heroAnswerText, 1, true);
  gsap.set(
    [
      ".floating-provider",
      ".hero-response",
      ".hero-sources",
      ".hero-result",
      ".hero-report",
    ],
    { autoAlpha: 1, x: 0, y: 0 },
  );
  gsap.set(".typing-caret", { autoAlpha: 0 });
  heroStatus("complete", "Análisis listo");
}
