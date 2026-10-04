import { $, icons } from "./dom";
import { ambientTimeline, completeHero, heroTimeline } from "./hero";
import {
  getNetworkTimeline,
  getSceneIndex,
  setupJourneyScroll,
} from "./journey";
import {
  faqControllers,
  motion,
  motionCyclers,
  reducedQuery,
  setMotionSync,
} from "./state";

let renderedGlobalPaused: boolean | undefined;
let renderedHeroPaused: boolean | undefined;

function renderMotionButtons(): void {
  const paused = motion.globalPaused || motion.reduced;
  document.body.classList.toggle("motion-paused", paused);
  if (paused !== renderedGlobalPaused) {
    const button = $("#motion-toggle");
    button.setAttribute("aria-pressed", String(paused));
    button.setAttribute(
      "aria-label",
      paused ? "Activar animaciones" : "Pausar todas las animaciones",
    );
    button.innerHTML = `<i data-icon="${paused ? "Play" : "Pause"}"></i><span>${paused ? "Activar movimiento" : "Pausar movimiento"}</span>`;
    icons(button);
    renderedGlobalPaused = paused;
  }
  const pausedHero = paused || motion.heroPaused;
  if (pausedHero !== renderedHeroPaused) {
    const button = $("#hero-pause");
    button.setAttribute(
      "aria-label",
      pausedHero ? "Reanudar demostración" : "Pausar demostración",
    );
    button.innerHTML = `<i data-icon="${pausedHero ? "Play" : "Pause"}"></i><span>${pausedHero ? "Reanudar" : "Pausar"}</span>`;
    icons(button);
    renderedHeroPaused = pausedHero;
  }
}

function sync(): void {
  const stop = motion.globalPaused || document.hidden || motion.reduced;
  heroTimeline.paused(stop || motion.heroPaused || !motion.heroVisible);
  ambientTimeline.paused(stop || !motion.heroVisible);
  getNetworkTimeline()?.paused(
    stop || !motion.journeyVisible || getSceneIndex() !== 1,
  );
  motionCyclers.forEach((cycle) => cycle.sync());
  if (stop) faqControllers.forEach((controller) => controller.finish());
  renderMotionButtons();
}

export function initMotion(): void {
  setMotionSync(sync);
  document.body.dataset.motion = motion.reduced ? "reduced" : "full";
  $("#hero-pause").addEventListener("click", () => {
    if (motion.globalPaused || motion.reduced) {
      motion.globalPaused = false;
      motion.reduced = false;
      document.body.dataset.motion = "full";
      motion.heroPaused = false;
      heroTimeline.restart();
      setupJourneyScroll();
    } else motion.heroPaused = !motion.heroPaused;
    sync();
  });
  $("#hero-replay").addEventListener("click", () => {
    motion.heroPaused = false;
    if (motion.reduced || motion.globalPaused) {
      completeHero();
      return;
    }
    heroTimeline.restart();
    sync();
  });
  $("#motion-toggle").addEventListener("click", () => {
    if (motion.reduced) {
      motion.reduced = false;
      motion.globalPaused = false;
      document.body.dataset.motion = "full";
      heroTimeline.restart();
      setupJourneyScroll();
    } else motion.globalPaused = !motion.globalPaused;
    sync();
  });
  document.addEventListener("visibilitychange", sync);
  new IntersectionObserver(
    (entries) => {
      motion.heroVisible = entries[0].isIntersecting;
      sync();
    },
    { threshold: 0.15 },
  ).observe($("#inicio"));
  new IntersectionObserver(
    (entries) => {
      motion.journeyVisible = entries[0].isIntersecting;
      sync();
    },
    { threshold: 0.1 },
  ).observe($("#recorrido"));
  reducedQuery.addEventListener("change", (event) => {
    motion.reduced = event.matches;
    motion.globalPaused = motion.reduced;
    document.body.dataset.motion = motion.reduced ? "reduced" : "full";
    if (motion.reduced) completeHero();
    else heroTimeline.restart();
    setupJourneyScroll();
    sync();
  });
  if (motion.reduced) completeHero();
  sync();
}
