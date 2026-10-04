import { $, $$ } from "./dom";
import { animateFrom, ease, invisible } from "./anim";
import { motion } from "./state";

const moduleButtons = $$<HTMLButtonElement>("[data-module]");
const modules = $$("#report-modules [data-report-module]");
const selected = new Set(modules.map((module) => module.dataset.reportModule));

function renderReport() {
  modules.forEach((module) => {
    module.hidden = !selected.has(module.dataset.reportModule);
  });
  moduleButtons.forEach((button) => {
    const isSelected = selected.has(button.dataset.module);
    button.setAttribute("aria-pressed", String(isSelected));
    // At least one module stays in the report.
    button.disabled = isSelected && selected.size === 1;
  });
  if (motion.reduced || motion.globalPaused) return;
  animateFrom(
    modules.filter((module) => !module.hidden),
    { ...invisible, translate: "0 10px" },
    { duration: 0.45, stagger: 0.07, easing: ease.cubicOut },
  );
  // The paper settles on its CSS tilt of 1deg.
  animateFrom(
    $(".report-paper"),
    { rotate: "-1.6deg" },
    { duration: 0.55, easing: ease.cubicOut },
  );
}

moduleButtons.forEach((button) =>
  button.addEventListener("click", () => {
    const key = button.dataset.module;
    if (selected.has(key)) {
      if (selected.size > 1) selected.delete(key);
    } else selected.add(key);
    renderReport();
  }),
);

$("#read-report").addEventListener("click", () => {
  $("#expanded-report").replaceChildren(
    ...modules
      .filter((module) => !module.hidden)
      .map((module) => module.cloneNode(true)),
  );
  $<HTMLDialogElement>("#report-dialog").showModal();
});
$$("[data-close-dialog]").forEach((button) =>
  button.addEventListener("click", () => button.closest("dialog")?.close()),
);
$$<HTMLDialogElement>("dialog").forEach((dialog) =>
  dialog.addEventListener("click", (event) => {
    if (event.target !== dialog) return;
    const rect = dialog.getBoundingClientRect();
    if (
      event.clientX < rect.left ||
      event.clientX > rect.right ||
      event.clientY < rect.top ||
      event.clientY > rect.bottom
    )
      dialog.close();
  }),
);
