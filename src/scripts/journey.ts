import { $, $$ } from "./dom";
import {
  animateFrom,
  cancelAnimations,
  curve,
  ease,
  invisible,
  Loop,
  segment,
  setAlpha,
} from "./anim";
import { t } from "./i18n";
import { motion, syncMotion } from "./state";

const section = $("#recorrido");
const canvas = $(".journey-canvas");
const scenes = $$(".scene");
const progressBar = $(".journey-progress>span");
const svgNamespace = "http://www.w3.org/2000/svg";
// The sticky stage sits under the 78 px header.
const headerOffset = 78;

let networkTimeline: Loop | null = null;
let sceneIndex = -1;
let scrollDriven = false;
let scrollProgress = 0;
let scrollFrame = 0;

export const getNetworkTimeline = () => networkTimeline;
export const getSceneIndex = () => sceneIndex;

function clearSceneAnimation() {
  networkTimeline?.pause();
  networkTimeline = null;
  scenes.forEach(cancelAnimations);
}

function showScene(index: number, animate = true) {
  if (index === sceneIndex) return;
  clearSceneAnimation();
  sceneIndex = index;
  scenes.forEach((scene, i) => {
    scene.hidden = i !== index;
    scene.inert = i !== index;
  });
  const scene = scenes[index];
  canvas.dataset.stageActive = String(index);
  $$(".journey-nav button").forEach((button) =>
    button.setAttribute(
      "aria-pressed",
      String(Number(button.dataset.stage) === index),
    ),
  );
  $("#journey-caption").textContent = t.stageCaptions[index];
  const moving = animate && !motion.reduced && !motion.globalPaused;
  if (moving)
    animateFrom(
      scene,
      { ...invisible, translate: "0 14px" },
      { duration: 0.48, easing: ease.cubicOut },
    );
  if (index === 1) drawNetwork();
  else if (moving)
    animateFrom(
      $$(
        [
          ".large-question,.query-options>span",
          "",
          ".mini-answer",
          ".evidence-response,.evidence-bridge,.evidence-document",
          ".report-orbit>span,.journey-report",
        ][index],
        scene,
      ),
      { ...invisible, translate: "0 18px" },
      { duration: 0.65, stagger: 0.12, easing: ease.quartOut },
    );
}

function drawNetwork() {
  if (sceneIndex !== 1) return;
  networkTimeline?.pause();
  const svg = $(".network-connections");
  const box = svg.getBoundingClientRect();
  if (!box.width || !box.height) return;
  svg.setAttribute("viewBox", `0 0 ${box.width} ${box.height}`);
  svg.replaceChildren();
  const mobile = matchMedia("(max-width:600px)").matches;
  function node(name: string) {
    const r = $(`[data-node="${name}"]`).getBoundingClientRect();
    return { x: r.x - box.x, y: r.y - box.y, w: r.width, h: r.height };
  }
  const pairs = [
    ["query", "hub"],
    ["hub", "openai"],
    ["hub", "gemini"],
    ["hub", "claude"],
  ];
  const paths = pairs.map(([from, to], index) => {
    const a = node(from),
      b = node(to);
    const start = mobile
      ? { x: a.x + a.w / 2, y: a.y + a.h }
      : { x: a.x + a.w, y: a.y + a.h / 2 };
    const end = mobile
      ? { x: b.x + b.w / 2, y: b.y }
      : { x: b.x, y: b.y + b.h / 2 };
    const mid = mobile ? (start.y + end.y) / 2 : (start.x + end.x) / 2;
    const d = mobile
      ? `M ${start.x} ${start.y} C ${start.x} ${mid}, ${end.x} ${mid}, ${end.x} ${end.y}`
      : `M ${start.x} ${start.y} C ${mid} ${start.y}, ${mid} ${end.y}, ${end.x} ${end.y}`;
    const base = document.createElementNS(svgNamespace, "path");
    base.setAttribute("d", d);
    base.classList.add("path-base");
    const active = base.cloneNode() as SVGPathElement;
    active.classList.replace("path-base", "path-active");
    const packet = document.createElementNS(svgNamespace, "circle");
    packet.setAttribute("r", "4.5");
    packet.classList.add("path-packet");
    svg.append(base, active, packet);
    const length = active.getTotalLength();
    active.style.strokeDasharray = String(length);
    const target = index > 0 ? $(`[data-node="${to}"]`) : null;
    return {
      active,
      packet,
      length,
      target,
      check: target && $(":scope>i", target),
      start: index === 0 ? 0.2 : 1 + (index - 1) * 0.35,
    };
  });
  networkTimeline = new Loop(4.4, 1.3, (time) => {
    for (const path of paths) {
      const travel = segment(time, path.start, 0.9, curve.quadInOut);
      const point = path.active.getPointAtLength(travel * path.length);
      path.packet.setAttribute("cx", String(point.x));
      path.packet.setAttribute("cy", String(point.y));
      path.packet.style.opacity = String(
        time < path.start ? 0 : 1 - segment(time, path.start + 0.9, 0.15),
      );
      path.active.style.strokeDashoffset = String(path.length * (1 - travel));
      if (!path.target || !path.check) continue;
      const lit = segment(time, path.start + 0.55, 0.35);
      path.target.style.opacity = String(0.4 + 0.6 * lit);
      // Border goes from #e4e4df to #d6a700.
      path.target.style.borderColor = `rgb(${228 - 14 * lit} ${228 - 61 * lit} ${223 - 223 * lit})`;
      setAlpha(path.check, segment(time, path.start + 0.7, 0.2));
    }
  });
  if (motion.reduced || motion.globalPaused) networkTimeline.complete();
  else syncMotion();
}

function journeyRange() {
  const rect = section.getBoundingClientRect();
  const start = rect.top + scrollY - headerOffset;
  return { start, end: rect.bottom + scrollY - innerHeight };
}

function updateFromScroll() {
  scrollFrame = 0;
  if (!scrollDriven) return;
  const { start, end } = journeyRange();
  const progress = Math.min(1, Math.max(0, (scrollY - start) / (end - start)));
  if (progress === scrollProgress) return;
  scrollProgress = progress;
  showScene(Math.min(4, Math.floor(progress * 5)));
  progressBar.style.transform = `scaleX(${0.04 + progress * 0.96})`;
}

export function setupJourneyScroll() {
  scrollDriven = innerWidth > 850 && !motion.reduced;
  if (scrollDriven) updateFromScroll();
  else progressBar.style.transform = `scaleX(${(sceneIndex + 1) / 5})`;
}

export function initJourney() {
  $$(".journey-nav button").forEach((button) =>
    button.addEventListener("click", () => {
      const index = Number(button.dataset.stage);
      if (scrollDriven) {
        const { start, end } = journeyRange();
        window.scrollTo({
          top:
            start + (end - start) * (index === 4 ? 0.96 : (index + 0.25) / 5),
          behavior: motion.reduced ? "instant" : "smooth",
        });
      } else {
        showScene(index);
        const from = getComputedStyle(progressBar).transform;
        progressBar.style.transform = `scaleX(${(index + 1) / 5})`;
        if (!motion.reduced)
          progressBar.animate([{ transform: from }, {}], {
            duration: 300,
            easing: ease.quadOut,
          });
      }
    }),
  );
  window.addEventListener(
    "scroll",
    () => {
      scrollFrame ||= requestAnimationFrame(updateFromScroll);
    },
    { passive: true },
  );
  let resizeTimer: number | undefined;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      setupJourneyScroll();
      drawNetwork();
    }, 180);
  });
  showScene(0, false);
  setupJourneyScroll();
}
