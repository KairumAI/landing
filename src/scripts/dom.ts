import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export { gsap, ScrollTrigger };

export function $<T extends Element = HTMLElement>(
  selector: string,
  root: ParentNode = document,
): T {
  const element = root.querySelector<T>(selector);
  if (!element) throw new Error(`Missing landing element: ${selector}`);
  return element;
}

export const $$ = <T extends Element = HTMLElement>(
  selector: string,
  root: ParentNode = document,
): T[] => [...root.querySelectorAll<T>(selector)];

const htmlEntities: Record<string, string> = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
  '"': "&quot;",
  "'": "&#39;",
};

export const escapeHtml = (value: string): string =>
  value.replace(/[&<>"']/g, (char) => htmlEntities[char]);

const iconSvg = import.meta.glob<string>("../assets/icons/*.svg", {
  query: "?raw",
  import: "default",
  eager: true,
});

export function icon(name: string): string {
  const svg = iconSvg[`../assets/icons/${name}.svg`];
  if (!svg) throw new Error(`Unknown icon: ${name}`);
  return svg;
}

export function icons(root: ParentNode = document): void {
  $$<HTMLElement>("[data-icon]", root).forEach((element) => {
    const name = element.dataset.icon;
    if (name && !element.firstElementChild) element.innerHTML = icon(name);
    element.setAttribute("aria-hidden", "true");
  });
}
