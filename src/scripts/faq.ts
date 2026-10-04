import { $, $$, gsap, ScrollTrigger } from "./dom";
import { motion, faqControllers } from "./state";

$$<HTMLDetailsElement>(".faq-list details").forEach((details) => {
  const summary = $("summary", details);
  const answer = $(".faq-answer", details);
  const content = $("p", answer);
  let expanded = details.open;
  let transition: gsap.core.Timeline | null = null;

  function finish() {
    if (!transition) return;
    transition.kill();
    transition = null;
    details.open = expanded;
    delete details.dataset.faqAnimating;
    gsap.set(answer, { clearProps: "height" });
    gsap.set(content, { clearProps: "opacity,transform" });
    ScrollTrigger.refresh();
  }

  summary.addEventListener("click", (event) => {
    event.preventDefault();
    const startHeight = details.open
      ? answer.getBoundingClientRect().height
      : 0;
    const wasClosed = !details.open;
    expanded = !expanded;
    transition?.kill();
    transition = null;
    details.dataset.faqExpanded = String(expanded);

    if (motion.reduced || motion.globalPaused || document.hidden) {
      details.open = expanded;
      delete details.dataset.faqAnimating;
      gsap.set(answer, { clearProps: "height" });
      gsap.set(content, { clearProps: "opacity,transform" });
      ScrollTrigger.refresh();
      return;
    }

    // Keep native details open until the closing animation has finished.
    details.open = true;
    details.dataset.faqAnimating = expanded ? "opening" : "closing";
    gsap.set(answer, { height: startHeight });
    if (wasClosed) gsap.set(content, { opacity: 0, y: 7 });
    transition = gsap.timeline({ onComplete: finish });
    transition
      .to(
        answer,
        {
          height: expanded ? content.offsetHeight : 0,
          duration: expanded ? 0.36 : 0.3,
          ease: "power2.inOut",
        },
        0,
      )
      .to(
        content,
        {
          opacity: expanded ? 1 : 0,
          y: expanded ? 0 : -4,
          duration: expanded ? 0.28 : 0.2,
          ease: "power2.out",
        },
        expanded ? 0.06 : 0,
      );
  });

  details.addEventListener("toggle", () => {
    if (transition) return;
    expanded = details.open;
    details.dataset.faqExpanded = String(expanded);
  });
  faqControllers.push({ finish });
});
window.addEventListener("resize", () => {
  faqControllers.forEach((controller) => controller.finish());
});
