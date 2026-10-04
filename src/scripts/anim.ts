// Minimal animation helpers on top of the Web Animations API.
// Durations are in seconds to keep the approved timings readable.

/** CSS curves for the easings the approved motion was designed with. */
export const ease = {
  quadOut: "cubic-bezier(0.5, 1, 0.89, 1)",
  cubicOut: "cubic-bezier(0.33, 1, 0.68, 1)",
  quartOut: "cubic-bezier(0.25, 1, 0.5, 1)",
  cubicInOut: "cubic-bezier(0.65, 0, 0.35, 1)",
  sineInOut: "cubic-bezier(0.37, 0, 0.63, 1)",
} as const;

/** The same curves as functions, for frame-by-frame rendering. */
export const curve = {
  linear: (p: number) => p,
  quadOut: (p: number) => 1 - (1 - p) ** 2,
  quadInOut: (p: number) => (p < 0.5 ? 2 * p * p : 1 - 2 * (1 - p) ** 2),
  cubicOut: (p: number) => 1 - (1 - p) ** 3,
  quartOut: (p: number) => 1 - (1 - p) ** 4,
} as const;

export const invisible = { opacity: 0, visibility: "hidden" } as const;

interface FromOptions {
  duration: number;
  easing?: string;
  delay?: number;
  stagger?: number;
}

/** Animates each target from `from` to its current styles. */
export function animateFrom(
  targets: Element | Iterable<Element>,
  from: Keyframe,
  { duration, easing = ease.quadOut, delay = 0, stagger = 0 }: FromOptions,
): Animation[] {
  const elements = targets instanceof Element ? [targets] : [...targets];
  return elements.map((element, index) =>
    element.animate([{ ...from, offset: 0 }], {
      duration: duration * 1000,
      delay: (delay + index * stagger) * 1000,
      easing,
      fill: "backwards",
    }),
  );
}

export function cancelAnimations(element: Element): void {
  element.getAnimations({ subtree: true }).forEach((animation) => {
    animation.cancel();
  });
}

/** Holds animations at their first frame until `trigger` reaches `start` (0-1) of the viewport. */
export function playInView(
  trigger: Element,
  start: number,
  animations: Animation[],
): void {
  animations.forEach((animation) => animation.pause());
  const observer = new IntersectionObserver(
    ([entry]) => {
      if (!entry.isIntersecting && entry.boundingClientRect.top > 0) return;
      observer.disconnect();
      animations.forEach((animation) => animation.play());
    },
    { rootMargin: `0px 0px ${-(1 - start) * 100}% 0px` },
  );
  observer.observe(trigger);
}

/** Eased progress of a segment that starts at `start` and lasts `duration`. */
export function segment(
  time: number,
  start: number,
  duration: number,
  easing: (p: number) => number = curve.quadOut,
): number {
  return easing(Math.min(1, Math.max(0, (time - start) / duration)));
}

export function setAlpha(element: HTMLElement, opacity: number): void {
  element.style.opacity = String(opacity);
  element.style.visibility = opacity === 0 ? "hidden" : "";
}

/**
 * A repeating timeline rendered frame by frame. `render` receives the time
 * within the cycle and must be a pure function of it; the end state holds
 * during `repeatDelay`.
 */
export class Loop {
  #time = 0;
  #rendered = -1;
  #frame = 0;
  #last = 0;

  constructor(
    readonly duration: number,
    readonly repeatDelay: number,
    readonly render: (time: number) => void,
  ) {
    this.#draw();
  }

  play(): void {
    if (this.#frame) return;
    this.#last = performance.now();
    this.#frame = requestAnimationFrame(this.#tick);
  }

  pause(): void {
    cancelAnimationFrame(this.#frame);
    this.#frame = 0;
  }

  paused(value: boolean): void {
    if (value) this.pause();
    else this.play();
  }

  restart(): void {
    this.#time = 0;
    this.#draw();
    this.play();
  }

  complete(): void {
    this.pause();
    this.#time = this.duration;
    this.#draw();
  }

  #draw(): void {
    const time = Math.min(this.#time, this.duration);
    if (time === this.#rendered) return;
    this.#rendered = time;
    this.render(time);
  }

  #tick = (now: number): void => {
    // A frame timestamp can precede the play() call; long frames (background
    // tabs, jank) advance at most 100 ms.
    this.#time += Math.min(Math.max(now - this.#last, 0), 100) / 1000;
    this.#last = now;
    this.#time %= this.duration + this.repeatDelay;
    this.#draw();
    this.#frame = requestAnimationFrame(this.#tick);
  };
}
