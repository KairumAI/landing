export const reducedQuery = matchMedia("(prefers-reduced-motion: reduce)");

export const motion = {
  reduced: reducedQuery.matches,
  globalPaused: reducedQuery.matches,
  heroPaused: false,
  heroVisible: true,
  journeyVisible: false,
};

export const motionCyclers: { sync: () => void }[] = [];
export const faqControllers: { finish: () => void }[] = [];

let update: () => void = () => {};
export function setMotionSync(sync: () => void): void {
  update = sync;
}
export function syncMotion(): void {
  update();
}
