import { $, $$, gsap } from "./dom";
import { motion } from "./state";

export function initReveals(): void {
  if (!motion.reduced) {
    $$(".reveal").forEach((element) =>
      gsap.from(element, {
        autoAlpha: 0,
        y: 28,
        duration: 0.85,
        ease: "power3.out",
        scrollTrigger: { trigger: element, start: "top 89%", once: true },
      }),
    );
    gsap.from(".hero-copy h1,.hero-copy>p,.hero-copy .actions,.hero-proof", {
      autoAlpha: 0,
      y: 22,
      stagger: 0.13,
      duration: 0.9,
      ease: "power3.out",
    });
    gsap.from(".hero-visual", {
      autoAlpha: 0,
      y: 28,
      duration: 1,
      ease: "power3.out",
      delay: 0.35,
    });
    gsap.from(".answer-stack", {
      rotate: 3,
      y: 30,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".answer-section",
        start: "top 70%",
        once: true,
      },
    });
    gsap.from(".report-paper", {
      y: 45,
      rotate: -5,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".report-stage", start: "top 85%", once: true },
    });
    gsap.from(".paper-back", {
      x: 22,
      rotate: 0,
      stagger: 0.15,
      duration: 1,
      ease: "power3.out",
      scrollTrigger: { trigger: ".report-stage", start: "top 85%", once: true },
    });
  }
  let ribbonIndex = 0;
  setInterval(() => {
    if (motion.globalPaused || motion.reduced || document.hidden) return;
    const ribbon = $(".question-ribbon").getBoundingClientRect();
    if (ribbon.bottom < 0 || ribbon.top > innerHeight) return;
    $$(".question-ribbon span").forEach((span, index) =>
      span.classList.toggle("active", index === ribbonIndex),
    );
    ribbonIndex = (ribbonIndex + 1) % 4;
  }, 2200);
}
