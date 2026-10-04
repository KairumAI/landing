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

/** Replaces the element's content with text, wrapping the first `highlight` in a <mark>. */
export function setHighlightedText(
  element: Element,
  text: string,
  highlight: string,
): void {
  const index = text.indexOf(highlight);
  if (index === -1) {
    element.textContent = text;
    return;
  }
  const mark = document.createElement("mark");
  mark.textContent = highlight;
  element.replaceChildren(
    text.slice(0, index),
    mark,
    text.slice(index + highlight.length),
  );
}
