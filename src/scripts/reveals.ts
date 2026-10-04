import { $, $$ } from "./dom";
import { animateFrom, ease, invisible, playInView } from "./anim";
import { motion } from "./state";

export function initReveals(): void {
  if (!motion.reduced) {
    const slow = { duration: 1, easing: ease.quartOut };
    $$(".reveal").forEach((element) =>
      playInView(
        element,
        0.89,
        animateFrom(
          element,
          { ...invisible, translate: "0 28px" },
          { duration: 0.85, easing: ease.quartOut },
        ),
      ),
    );
    animateFrom(
      $$(".hero-copy h1,.hero-copy>p,.hero-copy .actions,.hero-proof"),
      { ...invisible, translate: "0 22px" },
      { duration: 0.9, stagger: 0.13, easing: ease.quartOut },
    );
    animateFrom(
      $(".hero-visual"),
      { ...invisible, translate: "0 28px" },
      { ...slow, delay: 0.35 },
    );
    playInView(
      $(".answer-section"),
      0.7,
      animateFrom(
        $(".answer-stack"),
        { rotate: "3deg", translate: "0 30px" },
        slow,
      ),
    );
    const reportStage = $(".report-stage");
    playInView(reportStage, 0.85, [
      // The paper settles on its CSS tilt of 1deg.
      ...animateFrom(
        $(".report-paper"),
        { rotate: "-6deg", translate: "0 45px" },
        slow,
      ),
      // The sheets behind slide in flat from the right, then take their CSS tilt.
      ...$$(".paper-back").flatMap((sheet, index) =>
        animateFrom(
          sheet,
          {
            transform: `translate(22px, ${new DOMMatrix(getComputedStyle(sheet).transform).f}px)`,
          },
          { ...slow, delay: index * 0.15 },
        ),
      ),
    ]);
  }
  const ribbon = $(".question-ribbon");
  const questions = $$("span", ribbon);
  let ribbonIndex = 0;
  setInterval(() => {
    if (motion.globalPaused || motion.reduced || document.hidden) return;
    const { top, bottom } = ribbon.getBoundingClientRect();
    if (bottom < 0 || top > innerHeight) return;
    questions.forEach((span, index) =>
      span.classList.toggle("active", index === ribbonIndex),
    );
    ribbonIndex = (ribbonIndex + 1) % questions.length;
  }, 2200);
}
