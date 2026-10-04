import { $, $$, gsap, ScrollTrigger } from "./dom";
import { stageCaptions } from "../data/journey";
import { motion, syncMotion } from "./state";

let networkTimeline: gsap.core.Timeline | null = null;
let sceneIndex = -1;
let journeyTrigger: ScrollTrigger | null = null;

export const getNetworkTimeline = () => networkTimeline;
export const getSceneIndex = () => sceneIndex;

function clearSceneAnimation() {
  if (networkTimeline) {
    networkTimeline.kill();
    networkTimeline = null;
  }
  $$(".scene").forEach((scene) =>
    gsap.killTweensOf([scene, ...scene.querySelectorAll("*")]),
  );
}
function showScene(index: number, animate = true) {
  if (index === sceneIndex) return;
  clearSceneAnimation();
  sceneIndex = index;
  $$(".scene").forEach((scene, i) => {
    scene.hidden = i !== index;
    scene.inert = i !== index;
  });
  const scene = $(`[data-scene="${index}"]`);
  $(".journey-canvas").dataset.stageActive = String(index);
  $$(".journey-nav button").forEach((button) =>
    button.setAttribute(
      "aria-pressed",
      String(Number(button.dataset.stage) === index),
    ),
  );
  $("#journey-caption").textContent = stageCaptions[index];
  if (animate && !motion.reduced && !motion.globalPaused) {
    gsap.fromTo(
      scene,
      { autoAlpha: 0, y: 14 },
      { autoAlpha: 1, y: 0, duration: 0.48, ease: "power2.out" },
    );
  } else gsap.set(scene, { autoAlpha: 1, y: 0 });
  if (index === 1) {
    drawNetwork();
  } else if (!motion.reduced && !motion.globalPaused && animate) {
    const targets =
      index === 0
        ? $$(".large-question,.query-options>span", scene)
        : index === 2
          ? $$(".mini-answer", scene)
          : index === 3
            ? $$(
                ".evidence-response,.evidence-bridge,.evidence-document",
                scene,
              )
            : $$(".report-orbit>span,.journey-report", scene);
    gsap.fromTo(
      targets,
      { autoAlpha: 0, y: 18 },
      { autoAlpha: 1, y: 0, stagger: 0.12, duration: 0.65, ease: "power3.out" },
    );
  } else {
    gsap.set(scene.querySelectorAll("*"), {
      clearProps: "opacity,visibility,transform",
    });
  }
}
function drawNetwork() {
  if (sceneIndex !== 1) return;
  if (networkTimeline) networkTimeline.kill();
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
  const paths = pairs.map(([from, to]) => {
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
    const base = document.createElementNS("http://www.w3.org/2000/svg", "path");
    base.setAttribute("d", d);
    base.classList.add("path-base");
    svg.append(base);
    const active = base.cloneNode() as SVGPathElement;
    active.classList.remove("path-base");
    active.classList.add("path-active");
    svg.append(active);
    const length = active.getTotalLength();
    active.style.strokeDasharray = String(length);
    active.style.strokeDashoffset = String(length);
    const packet = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "circle",
    );
    packet.setAttribute("r", "4.5");
    packet.classList.add("path-packet");
    svg.append(packet);
    return { active, packet, length, to, progress: { value: 0 } };
  });
  networkTimeline = gsap.timeline({
    repeat: -1,
    repeatDelay: 1.3,
    paused: true,
  });
  networkTimeline
    .set(".network-provider", { opacity: 0.4, borderColor: "#e4e4df" }, 0)
    .set(".network-provider>i", { opacity: 0 }, 0);
  for (const [index, path] of paths.entries()) {
    const start = index === 0 ? 0.2 : 1 + (index - 1) * 0.35;
    networkTimeline
      .set(path.packet, { autoAlpha: 1 }, start)
      .fromTo(
        path.progress,
        { value: 0 },
        {
          value: 1,
          duration: 0.9,
          ease: "power1.inOut",
          onUpdate: () => {
            const point = path.active.getPointAtLength(
              path.progress.value * path.length,
            );
            path.packet.setAttribute("cx", String(point.x));
            path.packet.setAttribute("cy", String(point.y));
            path.active.style.strokeDashoffset = String(
              path.length * (1 - path.progress.value),
            );
          },
        },
        start,
      )
      .to(path.packet, { autoAlpha: 0, duration: 0.15 }, start + 0.9);
    if (index > 0) {
      networkTimeline
        .to(
          `[data-node="${path.to}"]`,
          { opacity: 1, borderColor: "#d6a700", duration: 0.35 },
          start + 0.55,
        )
        .to(
          `[data-node="${path.to}"]>i`,
          { opacity: 1, duration: 0.2 },
          start + 0.7,
        );
    }
  }
  networkTimeline.to({}, { duration: 1.7 }, 2.7);
  if (motion.reduced || motion.globalPaused) {
    networkTimeline.progress(1, true).pause();
    paths.forEach((path) => {
      path.active.style.strokeDashoffset = "0";
      path.packet.style.opacity = "0";
    });
    gsap.set(".network-provider", { opacity: 1 });
    gsap.set(".network-provider>i", { opacity: 1 });
  } else syncMotion();
}
export function setupJourneyScroll() {
  if (journeyTrigger) {
    journeyTrigger.kill();
    journeyTrigger = null;
  }
  if (innerWidth > 850 && !motion.reduced) {
    journeyTrigger = ScrollTrigger.create({
      trigger: "#recorrido",
      start: "top top+=78",
      end: "bottom bottom",
      onUpdate: (self) => {
        showScene(Math.min(4, Math.floor(self.progress * 5)));
        gsap.set(".journey-progress>span", {
          scaleX: 0.04 + self.progress * 0.96,
        });
      },
    });
  } else {
    $("#recorrido").style.height = "";
    gsap.set(".journey-progress>span", { scaleX: (sceneIndex + 1) / 5 });
  }
}

export function initJourney() {
  $$(".journey-nav button").forEach((button) =>
    button.addEventListener("click", () => {
      const index = Number(button.dataset.stage);
      if (journeyTrigger) {
        const point =
          journeyTrigger.start +
          (journeyTrigger.end - journeyTrigger.start) *
            (index === 4 ? 0.96 : (index + 0.25) / 5);
        window.scrollTo({
          top: point,
          behavior: motion.reduced ? "instant" : "smooth",
        });
      } else {
        showScene(index);
        gsap.to(".journey-progress>span", {
          scaleX: (index + 1) / 5,
          duration: motion.reduced ? 0 : 0.3,
        });
      }
    }),
  );
  let resizeTimer: number | undefined;
  window.addEventListener("resize", () => {
    window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(() => {
      setupJourneyScroll();
      if (sceneIndex === 1) drawNetwork();
      ScrollTrigger.refresh();
    }, 180);
  });
  showScene(0, false);
  setupJourneyScroll();
}
