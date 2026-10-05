import { enhanceNavigation } from "./navigation.js";
import { enhanceHomeScenes } from "./home-motion.js";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const one = <T extends Element = HTMLElement>(
  selector: string,
  root: ParentNode = document,
) => root.querySelector<T>(selector);
const all = <T extends Element = HTMLElement>(
  selector: string,
  root: ParentNode = document,
) => [...root.querySelectorAll<T>(selector)];
function icons(root: ParentNode = document) {
  all("[data-icon]", root).forEach((element) =>
    element.style.setProperty(
      "--icon",
      `url("/kairum/assets/icons/${element.dataset.icon}.svg")`,
    ),
  );
}
icons();
document.body.dataset.enhanced = "true";
const forcedReduced =
  new URLSearchParams(location.search).get("motion") === "reduce";
const reduced = matchMedia("(prefers-reduced-motion: reduce)");
const motionAllowed = () => !forcedReduced && !reduced.matches;
const motionListeners: (() => void)[] = [];
function syncMotion() {
  const stopped = !motionAllowed();
  document.body.dataset.motion = stopped ? "reduced" : "full";
  document.documentElement.classList.toggle("motion-stopped", stopped);
  motionListeners.forEach((listener) => listener());
}
reduced.addEventListener("change", syncMotion);
syncMotion();

// Native anchors/details remain usable without JS. Enhancement adds the tab contract.
const panelSelectors = new Map<string, () => void>();
all("[data-tabs]").forEach((group) => {
  const list = one("[data-tab-list]", group)!;
  const tabs = all<HTMLAnchorElement>("[data-tab]", list);
  const panels = tabs.map((tab) => document.getElementById(tab.dataset.tab!)!);
  list.setAttribute("role", "tablist");
  function select(index: number, focus = false) {
    tabs.forEach((tab, i) => {
      tab.setAttribute("aria-selected", String(i === index));
      tab.tabIndex = i === index ? 0 : -1;
      panels[i].hidden = i !== index;
    });
    if (focus) tabs[index].focus();
    if (motionAllowed() && typeof gsap !== "undefined") {
      gsap.fromTo(
        panels[index],
        { opacity: 0.3, y: 6 },
        {
          opacity: 1,
          y: 0,
          duration: 0.25,
          clearProps: "opacity,transform",
          overwrite: true,
        },
      );
    }
  }
  tabs.forEach((tab, index) => {
    const panel = panels[index];
    tab.setAttribute("role", "tab");
    tab.setAttribute("aria-controls", panel.id);
    panel.setAttribute("role", "tabpanel");
    panel.setAttribute("aria-labelledby", tab.id);
    panel.tabIndex = 0;
    panelSelectors.set(panel.id, () => select(index));
    tab.addEventListener("click", (event) => {
      if (event.ctrlKey || event.metaKey || event.altKey || event.shiftKey)
        return;
      event.preventDefault();
      select(index);
    });
    tab.addEventListener("keydown", (event) => {
      const next =
        event.key === "ArrowLeft"
          ? (index + tabs.length - 1) % tabs.length
          : event.key === "ArrowRight"
            ? (index + 1) % tabs.length
            : event.key === "Home"
              ? 0
              : event.key === "End"
                ? tabs.length - 1
                : -1;
      if (next >= 0) {
        event.preventDefault();
        select(next, true);
      }
      if (event.key === " ") {
        event.preventDefault();
        select(index);
      }
    });
  });
  // Avoid entrance tweens on inactive nested tabs during bootstrap.
  tabs.forEach((tab, i) => {
    tab.setAttribute("aria-selected", String(i === 0));
    tab.tabIndex = i === 0 ? 0 : -1;
    panels[i].hidden = i !== 0;
  });
});

enhanceNavigation(motionAllowed, motionListeners, icons);
enhanceHomeScenes(motionAllowed, motionListeners);

const legacyHashes: Record<string, string> = {
  "product-prompts": "product-prompt-intelligence",
  "product-report": "como-empezar",
  consultoria: "como-empezar",
  "como-funciona": "evidencia",
  equipos: "como-empezar",
  "team-marketing": "plataforma",
  "team-content": "plataforma",
  "team-agencies": "como-empezar",
};
function revealHash(focus = false) {
  let id = "";
  try {
    id = decodeURIComponent(location.hash.slice(1));
  } catch {
    return;
  }
  const target =
    document.getElementById(id) ?? document.getElementById(legacyHashes[id]);
  if (!target) return;
  // Reveal every containing tab, outside to inside, before scrolling.
  const ancestors: HTMLElement[] = [];
  for (let item: HTMLElement | null = target; item; item = item.parentElement)
    if (item.hasAttribute("data-tab-panel")) ancestors.unshift(item);
  ancestors.forEach((panel) => panelSelectors.get(panel.id)?.());
  if (focus) {
    target.setAttribute("tabindex", "-1");
    target.focus({ preventScroll: true });
  }
  requestAnimationFrame(() =>
    target.scrollIntoView({
      block: "start",
      behavior: focus && motionAllowed() ? "smooth" : "instant",
    }),
  );
}
window.addEventListener("hashchange", () => revealHash(true));
window.addEventListener("popstate", () => revealHash(true));
const initialHash = location.hash;
let initialHashPending = Boolean(initialHash);
for (const event of ["wheel", "touchmove", "keydown"])
  window.addEventListener(
    event,
    () => {
      initialHashPending = false;
    },
    { once: true, passive: true },
  );
if (location.hash) revealHash();

// One automatic, finite sequence per scene. Content exists before enhancement.
const choreographies = all("[data-choreo]").map((root) => {
  let timeline: ReturnType<typeof gsap.timeline> | null = null;
  let inView = false;
  let complete = false;
  let depth:
    | ReturnType<typeof import("./context-depth.js").createContextDepth>
    | undefined;
  let loadingDepth = false;
  const phase = { progress: 0 };
  const canvas = one<HTMLCanvasElement>("[data-context-depth]", root);
  const actors = all(
    "[data-query],[data-answer],[data-mention],[data-source],.map-object,.shared-context,[data-context-source],.context-connection,[data-context-finding],.story-card",
    root,
  );
  function settle() {
    timeline?.kill();
    timeline = null;
    complete = true;
    if (typeof gsap !== "undefined") gsap.set(actors, { clearProps: "all" });
    phase.progress = 1;
    depth?.dispose();
    depth = undefined;
    root.dataset.animation = "complete";
  }
  async function loadDepth() {
    if (
      !canvas ||
      loadingDepth ||
      depth ||
      innerWidth < 961 ||
      !motionAllowed()
    )
      return;
    loadingDepth = true;
    try {
      const depthModule = await import("./context-depth.js");
      if (!inView || !motionAllowed()) return;
      depth = depthModule.createContextDepth(canvas);
      depth.render(complete ? 1 : phase.progress);
      root.dataset.depth = "ready";
    } catch {
      root.dataset.depth = "fallback";
    } finally {
      loadingDepth = false;
    }
  }
  function start() {
    if (complete || typeof gsap === "undefined") return;
    root.dataset.animation = "playing";
    timeline = gsap.timeline({
      paused: true,
      onComplete: () => {
        complete = true;
        root.dataset.animation = "complete";
      },
    });
    const move = (selector: string, vars: gsap.TweenVars, at: number) => {
      const targets = all(selector, root);
      if (!targets.length) return;
      const { duration = 0.7, stagger, ...initial } = vars;
      // Prepare future actors before playing, so they enter in story order.
      gsap.set(targets, initial);
      const final: gsap.TweenVars = {};
      for (const key of Object.keys(initial))
        final[key] = key === "opacity" || key.startsWith("scale") ? 1 : 0;
      timeline!.to(
        targets,
        {
          ...final,
          duration,
          stagger,
          ease: "power2.out",
          clearProps: "opacity,transform",
        },
        at,
      );
    };
    if (root.dataset.choreo === "answer") {
      move("[data-query]", { y: 8, opacity: 0.4 }, 0);
      move("[data-answer]", { y: 8, opacity: 0, duration: 1 }, 0.6);
      move("[data-mention]", { scaleX: 0.82, opacity: 0, duration: 0.8 }, 1.45);
      move("[data-source]", { x: 16, opacity: 0, duration: 1 }, 2.35);
      timeline.to({}, { duration: 0.65 });
    } else if (root.dataset.choreo === "platform") {
      move(".map-object", { y: 8, opacity: 0.3, stagger: 0.1 }, 0);
      move(".shared-context", { scaleX: 0.88, opacity: 0.4 }, 0.7);
    } else if (root.dataset.choreo === "evidence") {
      move("[data-context-source]", { y: 10, opacity: 0.35 }, 0);
      move(".context-connection", { scaleY: 0, duration: 0.5 }, 0.4);
      move("[data-context-finding]", { y: 14, opacity: 0.25 }, 0.9);
      timeline.to(
        phase,
        {
          progress: 1,
          duration: 1.6,
          ease: "power2.out",
          onUpdate: () => depth?.render(phase.progress),
        },
        0,
      );
    } else {
      move(".story-card", { y: 14, opacity: 0.3, stagger: 0.3 }, 0);
    }
    timeline.play();
  }
  function sync() {
    if (forcedReduced || reduced.matches) return settle();
    if (inView && !document.hidden) {
      void loadDepth();
      if (!timeline && !complete) start();
      else if (!complete) {
        timeline?.resume();
        root.dataset.animation = "playing";
      }
    } else {
      timeline?.pause();
      depth?.dispose();
      depth = undefined;
      if (!complete) root.dataset.animation = "paused";
    }
  }
  if ("IntersectionObserver" in window) {
    const threshold = root.dataset.choreo === "answer" ? 0.12 : 0.55;
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        inView = entry.isIntersecting && entry.intersectionRatio >= threshold;
        sync();
      },
      { threshold },
    );
    observer.observe(root);
    window.addEventListener("pagehide", () => {
      observer.disconnect();
      depth?.dispose();
    });
  } else settle();
  motionListeners.push(sync);
  return { sync };
});
document.addEventListener("visibilitychange", () =>
  choreographies.forEach((scene) => scene.sync()),
);

// Reversible native disclosures; pausing settles their current intent immediately.
all<HTMLDetailsElement>(".faq-list details, .diff-details").forEach(
  (details) => {
    const summary = one("summary", details)!;
    const answer = one(".faq-answer", details);
    if (!answer) return;
    let wanted = details.open;
    let animation: Animation | null = null;
    const finish = () => {
      animation?.cancel();
      animation = null;
      details.open = wanted;
      answer.style.removeProperty("overflow");
    };
    summary.addEventListener("click", (event) => {
      event.preventDefault();
      const height = details.open ? answer.getBoundingClientRect().height : 0;
      wanted = !wanted;
      animation?.cancel();
      if (!motionAllowed()) return finish();
      details.open = true;
      answer.style.overflow = "hidden";
      animation = answer.animate(
        [
          { height: `${height}px` },
          { height: wanted ? `${answer.scrollHeight}px` : "0px" },
        ],
        { duration: 280, easing: "cubic-bezier(.22,1,.36,1)" },
      );
      animation.onfinish = finish;
    });
    details.addEventListener("toggle", () => {
      if (!animation) wanted = details.open;
    });
    motionListeners.push(() => {
      if (!motionAllowed()) finish();
    });
    window.addEventListener("resize", finish);
  },
);

// Progressive choreography: content is visible before JS and after interruption.
let sceneContext: ReturnType<typeof gsap.context> | undefined;
function setupScenes() {
  sceneContext?.revert();
  if (
    !motionAllowed() ||
    typeof gsap === "undefined" ||
    typeof ScrollTrigger === "undefined"
  )
    return;
  gsap.registerPlugin(ScrollTrigger);
  sceneContext = gsap.context(() => {
    all('[data-reveal]:not([data-revealed="true"])').forEach((element) => {
      gsap.from(element, {
        y: 8,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out",
        immediateRender: false,
        scrollTrigger: { trigger: element, start: "top 92%", once: true },
        onComplete: () => {
          element.dataset.revealed = "true";
          element.style.removeProperty("opacity");
          element.style.removeProperty("transform");
        },
      });
    });
    const background = one(".context-art");
    if (background && innerWidth > 650)
      gsap.fromTo(
        background,
        { y: 16 },
        {
          y: -16,
          ease: "none",
          scrollTrigger: {
            trigger: ".context-section",
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        },
      );
    all(".resource-cover>img").forEach((element) =>
      gsap.from(element, {
        scale: 1.055,
        duration: 1,
        immediateRender: false,
        ease: "power2.out",
        scrollTrigger: { trigger: element, start: "top 95%", once: true },
        clearProps: "transform",
      }),
    );
  });
}
motionListeners.push(setupScenes);
motionListeners.push(() => {
  if (!motionAllowed() && typeof gsap !== "undefined") {
    const elements = all(
      "[data-tab-panel], [data-story-title]:not(button), [data-story-detail]:not(button), [data-story-card]",
    );
    if (elements.length) {
      gsap.killTweensOf(elements);
      gsap.set(elements, { clearProps: "opacity,transform" });
    }
  }
});
syncMotion();
// A reload can restore the previous scroll position after modules execute.
// Resolve the initial anchor once fonts and the page have both settled.
const pageReady = new Promise<void>((resolve) => {
  if (document.readyState === "complete") resolve();
  else window.addEventListener("load", () => resolve(), { once: true });
});
void Promise.all([document.fonts.ready, pageReady]).then(() => {
  if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
  if (initialHashPending && location.hash === initialHash) revealHash();
  initialHashPending = false;
});
