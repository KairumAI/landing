import { $ } from "./dom";
import { t } from "./i18n";
import { ambientTimeline, heroTimeline } from "./hero";
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

const motionToggle = $("#motion-toggle");
const heroPause = $("#hero-pause");

function renderMotionButtons(): void {
  const paused = motion.globalPaused || motion.reduced;
  document.body.classList.toggle("motion-paused", paused);
  motionToggle.dataset.state = paused ? "paused" : "playing";
  motionToggle.setAttribute("aria-pressed", String(paused));
  motionToggle.setAttribute(
    "aria-label",
    paused ? t.motion.resumeLabel : t.motion.pauseLabel,
  );
  $("span", motionToggle).textContent = paused
    ? t.motion.resume
    : t.motion.pause;
  const pausedHero = paused || motion.heroPaused;
  heroPause.dataset.state = pausedHero ? "paused" : "playing";
  heroPause.setAttribute(
    "aria-label",
    pausedHero ? t.motion.demoResumeLabel : t.motion.demoPauseLabel,
  );
  $("span", heroPause).textContent = pausedHero
    ? t.motion.demoResume
    : t.motion.demoPause;
}

function sync(): void {
  const stop = motion.globalPaused || document.hidden || motion.reduced;
  heroTimeline.paused(stop || motion.heroPaused || !motion.heroVisible);
  if (stop || !motion.heroVisible) ambientTimeline.pause();
  else ambientTimeline.play();
  getNetworkTimeline()?.paused(
    stop || !motion.journeyVisible || getSceneIndex() !== 1,
  );
  motionCyclers.forEach((cycle) => cycle.sync());
  if (stop) faqControllers.forEach((controller) => controller.finish());
  renderMotionButtons();
}

function enableMotion(): void {
  motion.reduced = false;
  motion.globalPaused = false;
  document.body.dataset.motion = "full";
  heroTimeline.restart();
  setupJourneyScroll();
}

export function initMotion(): void {
  setMotionSync(sync);
  document.body.dataset.motion = motion.reduced ? "reduced" : "full";
  heroPause.addEventListener("click", () => {
    if (motion.globalPaused || motion.reduced) {
      motion.heroPaused = false;
      enableMotion();
    } else motion.heroPaused = !motion.heroPaused;
    sync();
  });
  $("#hero-replay").addEventListener("click", () => {
    motion.heroPaused = false;
    if (motion.reduced || motion.globalPaused) {
      heroTimeline.complete();
      return;
    }
    heroTimeline.restart();
    sync();
  });
  motionToggle.addEventListener("click", () => {
    if (motion.reduced) enableMotion();
    else motion.globalPaused = !motion.globalPaused;
    sync();
  });
  document.addEventListener("visibilitychange", sync);
  new IntersectionObserver(
    ([entry]) => {
      motion.heroVisible = entry.isIntersecting;
      sync();
    },
    { threshold: 0.15 },
  ).observe($("#inicio"));
  new IntersectionObserver(
    ([entry]) => {
      motion.journeyVisible = entry.isIntersecting;
      sync();
    },
    { threshold: 0.1 },
  ).observe($("#recorrido"));
  reducedQuery.addEventListener("change", (event) => {
    motion.reduced = event.matches;
    motion.globalPaused = motion.reduced;
    document.body.dataset.motion = motion.reduced ? "reduced" : "full";
    if (motion.reduced) heroTimeline.complete();
    else heroTimeline.restart();
    setupJourneyScroll();
    sync();
  });
  if (motion.reduced) heroTimeline.complete();
  sync();
}
