import { gsap, ScrollTrigger, icons } from "./dom";
import "./panels";
import "./faq";
import "./report";
import "./nav";
import "./cycles";
import { initJourney } from "./journey";
import { initMotion } from "./motion";
import { initReveals } from "./reveals";

gsap.registerPlugin(ScrollTrigger);
icons();
initJourney();
initReveals();
initMotion();
window.addEventListener("load", () => ScrollTrigger.refresh());
document.fonts.ready.then(() => ScrollTrigger.refresh());
