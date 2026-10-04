import { $ } from "./dom";
import { motion, motionCyclers } from "./state";
import { selectProvider, selectSource, setPattern } from "./panels";

function createMotionCycle(
  sectionSelector: string,
  controlsSelector: string,
  advance: () => void,
  duration: number,
) {
  const section = $(sectionSelector);
  const controls = $(controlsSelector);
  let visible = false;
  let manual = false;
  let hoveringControls = false;
  let timer: number | undefined;
  function sync() {
    window.clearTimeout(timer);
    const canPlay =
      visible &&
      !manual &&
      !hoveringControls &&
      !motion.globalPaused &&
      !motion.reduced &&
      !document.hidden &&
      !controls.contains(document.activeElement);
    if (canPlay)
      timer = window.setTimeout(() => {
        advance();
        sync();
      }, duration);
  }
  new IntersectionObserver(
    (entries) => {
      visible =
        entries[0].isIntersecting && entries[0].intersectionRatio >= 0.4;
      sync();
    },
    { threshold: [0, 0.4] },
  ).observe(section);
  controls.addEventListener("click", () => {
    manual = true;
    sync();
  });
  controls.addEventListener("pointerenter", () => {
    hoveringControls = true;
    sync();
  });
  controls.addEventListener("pointerleave", () => {
    hoveringControls = false;
    sync();
  });
  controls.addEventListener("focusin", sync);
  controls.addEventListener("focusout", () => queueMicrotask(sync));
  motionCyclers.push({ sync });
}
createMotionCycle(
  "#plataforma",
  ".provider-switch",
  () => {
    selectProvider(
      (Number($(".answer-stack").dataset.selectedProvider) + 1) % 3,
      true,
    );
  },
  6000,
);
createMotionCycle(
  ".patterns-section",
  ".pattern-controls",
  () => {
    const sequence = ["explorar", "comparar", "elegir"];
    setPattern(
      sequence[
        (sequence.indexOf($(".patterns-section").dataset.intent ?? "explorar") +
          1) %
          3
      ],
    );
  },
  7500,
);
createMotionCycle(
  "#fuentes",
  ".source-tabs",
  () => {
    selectSource(
      (Number($(".source-workspace").dataset.selectedSource) + 1) % 2,
    );
  },
  6500,
);
