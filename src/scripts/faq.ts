import { $, $$ } from "./dom";
import { ease } from "./anim";
import { motion, faqControllers } from "./state";

$$<HTMLDetailsElement>(".faq-list details").forEach((details) => {
  const summary = $("summary", details);
  const answer = $(".faq-answer", details);
  const content = $("p", answer);
  let expanded = details.open;
  let transition: Animation[] = [];

  function stop() {
    transition.forEach((animation) => animation.cancel());
    transition = [];
  }

  function finish() {
    if (!transition.length) return;
    stop();
    details.open = expanded;
    delete details.dataset.faqAnimating;
  }

  summary.addEventListener("click", (event) => {
    event.preventDefault();
    const startHeight = details.open
      ? answer.getBoundingClientRect().height
      : 0;
    const wasClosed = !details.open;
    // Reversals continue from where the running transition left the text.
    const { opacity, translate } = getComputedStyle(content);
    expanded = !expanded;
    stop();
    details.dataset.faqExpanded = String(expanded);

    if (motion.reduced || motion.globalPaused || document.hidden) {
      details.open = expanded;
      delete details.dataset.faqAnimating;
      return;
    }

    // Keep native details open until the closing animation has finished.
    details.open = true;
    details.dataset.faqAnimating = expanded ? "opening" : "closing";
    const height = answer.animate(
      [
        { height: `${startHeight}px` },
        { height: `${expanded ? content.offsetHeight : 0}px` },
      ],
      {
        duration: expanded ? 360 : 300,
        easing: ease.cubicInOut,
        fill: "forwards",
      },
    );
    const text = content.animate(
      [
        wasClosed ? { opacity: 0, translate: "0 7px" } : { opacity, translate },
        { opacity: expanded ? 1 : 0, translate: `0 ${expanded ? 0 : -4}px` },
      ],
      {
        duration: expanded ? 280 : 200,
        delay: expanded ? 60 : 0,
        easing: ease.cubicOut,
        fill: "both",
      },
    );
    transition = [height, text];
    height.onfinish = finish;
  });

  details.addEventListener("toggle", () => {
    if (transition.length) return;
    expanded = details.open;
    details.dataset.faqExpanded = String(expanded);
  });
  faqControllers.push({ finish });
});
window.addEventListener("resize", () => {
  faqControllers.forEach((controller) => controller.finish());
});
