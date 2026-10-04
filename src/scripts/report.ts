import { $, $$, gsap, icons } from "./dom";
import { modules } from "../data/report";
import { motion } from "./state";

type ModuleKey = keyof typeof modules;
const selectedModules = new Set(Object.keys(modules) as ModuleKey[]);
function reportMarkup() {
  return [...selectedModules]
    .map((key) => {
      const reportModule = modules[key];
      return `<section class="report-module" data-report-module="${key}"><i data-icon="${reportModule.icon}"></i><div><h4>${reportModule.title}</h4><p>${reportModule.copy}</p></div></section>`;
    })
    .join("");
}
function renderReport(animate = true) {
  $("#report-modules").innerHTML = reportMarkup();
  icons($("#report-modules"));
  $$<HTMLButtonElement>("[data-module]").forEach((button) => {
    const selected = selectedModules.has(button.dataset.module as ModuleKey);
    button.setAttribute("aria-pressed", String(selected));
    button.disabled = selected && selectedModules.size === 1;
  });
  $(".report-stage").dataset.moduleCount = String(selectedModules.size);
  if (animate && !motion.reduced && !motion.globalPaused) {
    gsap.fromTo(
      ".report-module",
      { autoAlpha: 0, y: 10 },
      { autoAlpha: 1, y: 0, stagger: 0.07, duration: 0.45, ease: "power2.out" },
    );
    gsap.fromTo(
      ".report-paper",
      { rotate: -0.6 },
      { rotate: 1, duration: 0.55, ease: "power2.out" },
    );
  }
}
$$<HTMLButtonElement>("[data-module]").forEach((button) =>
  button.addEventListener("click", () => {
    const value = button.dataset.module;
    if (!value || !Object.prototype.hasOwnProperty.call(modules, value)) return;
    const key = value as ModuleKey;
    if (selectedModules.has(key)) {
      if (selectedModules.size > 1) selectedModules.delete(key);
    } else selectedModules.add(key);
    renderReport();
  }),
);
renderReport(false);
$("#read-report").addEventListener("click", () => {
  $("#expanded-report").innerHTML = reportMarkup();
  icons($("#expanded-report"));
  $<HTMLDialogElement>("#report-dialog").showModal();
});
$$("[data-close-dialog]").forEach((button) =>
  button.addEventListener("click", () => button.closest("dialog")?.close()),
);
$$<HTMLDialogElement>("dialog").forEach((dialog) => {
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (
        event.clientX < rect.left ||
        event.clientX > rect.right ||
        event.clientY < rect.top ||
        event.clientY > rect.bottom
      )
        dialog.close();
    }
  });
  dialog.addEventListener("close", () => (document.body.style.overflow = ""));
  new MutationObserver(
    () =>
      (document.body.style.overflow = $$("dialog[open]").length
        ? "hidden"
        : ""),
  ).observe(dialog, { attributes: true, attributeFilter: ["open"] });
});
