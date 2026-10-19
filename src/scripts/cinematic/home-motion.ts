import { gsap } from "gsap";
import { enhanceStudyCharts } from "./home-charts.js";

export function enhanceHomeScenes(
  motionAllowed: () => boolean,
  listeners: (() => void)[],
) {
  enhanceStudyCharts(motionAllowed, listeners);
  enhanceBrandRotator(motionAllowed, listeners);
  enhanceShowcases(motionAllowed, listeners);
  document
    .querySelectorAll<HTMLElement>("[data-home-scene]")
    .forEach((root) => {
      const kind = root.dataset.homeScene!;
      const objects = [
        ...root.querySelectorAll<HTMLElement>("[data-home-enter]"),
      ];
      const sceneObjects = [
        ...root.querySelectorAll<HTMLElement>("[data-home-object]"),
      ];
      const object = sceneObjects[0];
      const canvas = root.querySelector<HTMLCanvasElement>("[data-home-depth]");
      let inView = false,
        complete = false,
        loading = false,
        dead = false;
      let timeline: ReturnType<typeof gsap.timeline> | null = null;
      let ambientTween: ReturnType<typeof gsap.to> | null = null;
      let pointerTween: ReturnType<typeof gsap.to> | null = null;
      const pointerBases = new Map<HTMLElement, string>();
      const pointer = { x: 0, y: 0 };
      const ambient = { value: 0 };
      let lastRender = 0;
      let depth:
        | ReturnType<typeof import("./home-depth.js").createHomeDepth>
        | undefined;
      const phase = { value: 0 };
      function clearPointer() {
        pointerTween?.kill();
        pointerTween = null;
        for (const target of pointerBases.keys())
          target.style.removeProperty("transform");
        pointerBases.clear();
        pointer.x = pointer.y = 0;
      }
      async function loadDepth() {
        if (
          dead ||
          !canvas ||
          depth ||
          loading ||
          innerWidth < 651 ||
          !motionAllowed()
        )
          return;
        loading = true;
        try {
          const depthModule = await import("./home-depth.js");
          if (!inView || dead || !motionAllowed()) return;
          depth = depthModule.createHomeDepth(canvas, kind);
          depth.render(phase.value, ambient.value);
          root.dataset.depth = "ready";
        } catch {
          root.dataset.depth = "fallback";
        } finally {
          loading = false;
        }
      }
      function settle() {
        timeline?.kill();
        timeline = null;
        clearPointer();
        ambientTween?.kill();
        ambientTween = null;
        complete = true;
        phase.value = 1;
        if (typeof gsap !== "undefined")
          gsap.set([...new Set([...objects, ...sceneObjects])], {
            clearProps: "opacity,transform",
          });
        depth?.dispose();
        depth = undefined;
        root.dataset.animation = "complete";
        root.dataset.sceneProgress = "1";
        root.dataset.ambient = motionAllowed() ? "paused" : "reduced";
      }
      function syncAmbient() {
        if (!complete) {
          root.dataset.ambient = "waiting";
          return;
        }
        if (dead || !inView || document.hidden || !motionAllowed()) {
          ambientTween?.pause();
          root.dataset.ambient = motionAllowed() ? "paused" : "reduced";
          return;
        }
        root.dataset.ambient = "playing";
        // Native CSS object motion needs only the lifecycle state, not a WebGL clock.
        if (typeof gsap === "undefined" || !canvas) return;
        if (!ambientTween)
          ambientTween = gsap.to(ambient, {
            value: 1,
            duration: 8,
            repeat: -1,
            ease: "none",
            onUpdate: () => {
              root.dataset.ambientPhase = ambient.value.toFixed(3);
              const now = performance.now();
              if (now - lastRender >= 33) {
                lastRender = now;
                depth?.render(1, ambient.value);
              }
            },
          });
        else ambientTween.resume();
      }
      function start() {
        if (complete || typeof gsap === "undefined") return;
        root.dataset.animation = "playing";
        timeline = gsap.timeline({
          onComplete: () => {
            complete = true;
            root.dataset.animation = "complete";
            root.dataset.sceneProgress = "1";
            syncAmbient();
          },
        });
        if (kind === "agents") {
          timeline.fromTo(
            objects.slice(0, 2),
            { opacity: 0.25, y: 28, rotationY: -8 },
            {
              opacity: 1,
              y: 0,
              rotationY: 0,
              duration: 1,
              stagger: 0.2,
              clearProps: "opacity,transform",
            },
            0,
          );
          timeline.fromTo(
            objects[2],
            { opacity: 0.25, y: 32, rotationY: -12 },
            {
              opacity: 1,
              y: 0,
              rotationY: 0,
              duration: 1.1,
              clearProps: "opacity,transform",
            },
            1.1,
          );
          timeline.fromTo(
            objects[3],
            { opacity: 0.25, y: 28, rotationY: -8 },
            {
              opacity: 1,
              y: 0,
              rotationY: 0,
              duration: 1.1,
              clearProps: "opacity,transform",
            },
            2.25,
          );
          timeline.fromTo(
            root.querySelectorAll(".workflow-arrow"),
            { opacity: 0.2, x: -8 },
            {
              opacity: 1,
              x: 0,
              duration: 0.7,
              stagger: 1.3,
              clearProps: "opacity,transform",
            },
            0.85,
          );
        } else if (kind === "answer") {
          // End at each card's authored CSS perspective before clearing styles.
          timeline.from(
            objects,
            {
              opacity: 0.2,
              y: 28,
              rotationY: 0,
              duration: 1.2,
              stagger: 0.5,
              ease: "power3.out",
              clearProps: "opacity,transform",
            },
            0,
          );
        } else if (objects.length) {
          timeline.fromTo(
            objects,
            {
              opacity: 0.2,
              y: 35,
              rotationY: kind === "prompts" ? -12 : 0,
            },
            {
              opacity: 1,
              y: 0,
              rotationY: 0,
              duration: 1.2,
              stagger: kind === "archive" ? 0.18 : 0.5,
              ease: "power3.out",
              clearProps: "opacity,transform",
            },
            0,
          );
        }
        if (object)
          timeline.from(
            object,
            {
              y: kind === "analytics" ? 30 : 22,
              rotationX: 5,
              duration: 2.1,
              ease: "power3.out",
              clearProps: "transform",
            },
            0,
          );
        timeline.to(
          phase,
          {
            value: 1,
            duration: kind === "answer" ? 4.3 : 3.6,
            ease: "none",
            onUpdate: () => {
              depth?.render(phase.value);
              root.dataset.sceneProgress = phase.value.toFixed(3);
            },
          },
          0,
        );
      }
      function sync() {
        if (!motionAllowed() || typeof gsap === "undefined") return settle();
        if (inView && !document.hidden) {
          void loadDepth();
          pointerTween?.resume();
          if (!timeline && !complete) start();
          else if (!complete) {
            timeline?.resume();
            root.dataset.animation = "playing";
          }
        } else {
          timeline?.pause();
          pointerTween?.pause();
          depth?.dispose();
          depth = undefined;
          if (!complete) root.dataset.animation = "paused";
        }
        syncAmbient();
      }
      const observer =
        typeof IntersectionObserver !== "undefined"
          ? new IntersectionObserver(
              (entries) => {
                inView =
                  entries[0].isIntersecting &&
                  entries[0].intersectionRatio >= 0.12;
                sync();
              },
              { threshold: 0.12 },
            )
          : undefined;
      if (observer) observer.observe(root);
      else settle();
      listeners.push(sync);
      document.addEventListener("visibilitychange", sync);
      window.addEventListener("pagehide", () => {
        dead = true;
        observer?.disconnect();
        settle();
      });
      window.addEventListener("pageshow", (event) => {
        if (!event.persisted) return;
        dead = false;
        observer?.observe(root);
        sync();
      });
      // Real perspective follows the pointer after the finite narrative; never required.
      if (object && kind !== "analytics") {
        function tilt(x: number, y: number, returning = false) {
          // CSS owns the authored pose and ambient translate. Tweening the DOM
          // transform through CSSPlugin would absorb that live translate into
          // GSAP's cache, then snap when clearProps restores the CSS animation.
          if (pointerBases.size === 0) {
            for (const target of sceneObjects) {
              const transform = getComputedStyle(target).transform;
              pointerBases.set(target, transform === "none" ? "" : transform);
            }
          }
          pointerTween?.kill();
          pointerTween = gsap.to(pointer, {
            x,
            y,
            duration: returning ? 0.7 : 0.6,
            onUpdate: () => {
              for (const [target, base] of pointerBases)
                target.style.transform = `${base} rotateY(${pointer.y}deg) rotateX(${pointer.x}deg)`;
            },
            onComplete: returning ? clearPointer : undefined,
          });
          // A leave event can arrive after visibility/viewport already paused us.
          if (dead || !inView || document.hidden) pointerTween.pause();
        }
        root.addEventListener("pointermove", (event) => {
          if (
            !complete ||
            dead ||
            typeof gsap === "undefined" ||
            !motionAllowed() ||
            !inView ||
            document.hidden ||
            innerWidth < 961 ||
            event.pointerType === "touch"
          )
            return;
          const r = root.getBoundingClientRect();
          tilt(
            -((event.clientY - r.top) / r.height - 0.5) * 3,
            ((event.clientX - r.left) / r.width - 0.5) * 7,
          );
        });
        root.addEventListener("pointerleave", () => {
          if (pointerBases.size > 0 && motionAllowed()) tilt(0, 0, true);
        });
        listeners.push(() => {
          if (!motionAllowed()) clearPointer();
        });
        window.addEventListener("resize", clearPointer);
      }
    });
}

function enhanceBrandRotator(
  motionAllowed: () => boolean,
  listeners: (() => void)[],
) {
  const candidate = document.querySelector<HTMLElement>("[data-brand-rotator]");
  if (
    !candidate ||
    typeof gsap === "undefined" ||
    typeof IntersectionObserver === "undefined"
  )
    return;
  const rotor = candidate;
  const frames = [...rotor.querySelectorAll<HTMLElement>("[data-brand-frame]")];
  const logos = [
    ...document.querySelectorAll<HTMLImageElement>(".model-ecosystem img"),
  ];
  let visible = false,
    away = false;
  const timeline = gsap.timeline({ repeat: -1, paused: true });
  frames.forEach((frame, index) => {
    const nextIndex = (index + 1) % frames.length,
      next = frames[nextIndex],
      at = 2.2 + index * 2.8;
    timeline
      .to(
        frame,
        { opacity: 0, y: -14, duration: 0.6, ease: "power2.inOut" },
        at,
      )
      .fromTo(
        next,
        { opacity: 0, y: 14 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: "power2.inOut",
          immediateRender: false,
        },
        at,
      )
      .call(
        () => {
          rotor.dataset.activeBrand = next.dataset.brandFrame;
          logos.forEach(
            (logo, logoIndex) =>
              (logo.dataset.active = String(logoIndex === nextIndex)),
          );
        },
        [],
        at + 0.3,
      );
  });
  function sync() {
    if (!motionAllowed()) {
      timeline.pause(0);
      gsap.set(frames, { clearProps: "opacity,transform" });
      logos.forEach((logo) => delete logo.dataset.active);
      rotor.dataset.rotation = "reduced";
      rotor.dataset.activeBrand = frames[0]?.dataset.brandFrame;
    } else if (visible && !document.hidden && !away) {
      timeline.resume();
      rotor.dataset.rotation = "playing";
    } else {
      timeline.pause();
      rotor.dataset.rotation = "paused";
    }
  }
  const observer = new IntersectionObserver(
    (entries) => {
      visible =
        entries[0].isIntersecting && entries[0].intersectionRatio >= 0.12;
      sync();
    },
    { threshold: 0.12 },
  );
  observer.observe(rotor);
  listeners.push(sync);
  document.addEventListener("visibilitychange", sync);
  window.addEventListener("pagehide", () => {
    away = true;
    timeline.pause();
    rotor.dataset.rotation = "paused";
  });
  window.addEventListener("pageshow", (event) => {
    if (event.persisted) {
      away = false;
      sync();
    }
  });
  sync();
}

function enhanceShowcases(
  motionAllowed: () => boolean,
  listeners: (() => void)[],
) {
  if (typeof IntersectionObserver === "undefined") return;
  document
    .querySelectorAll<HTMLElement>("[data-home-showcase]")
    .forEach((root) => {
      let visible = false,
        away = false;
      const observer = new IntersectionObserver(
        (entries) => {
          visible =
            entries[0].isIntersecting && entries[0].intersectionRatio >= 0.12;
          sync();
        },
        { threshold: 0.12 },
      );
      function sync() {
        root.dataset.ambient = !motionAllowed()
          ? "reduced"
          : visible && !document.hidden && !away
            ? "playing"
            : "paused";
      }
      observer.observe(root);
      listeners.push(sync);
      document.addEventListener("visibilitychange", sync);
      window.addEventListener("pagehide", () => {
        away = true;
        sync();
      });
      window.addEventListener("pageshow", (event) => {
        if (event.persisted) {
          away = false;
          sync();
        }
      });
      sync();
    });
}
