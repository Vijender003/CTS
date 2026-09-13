import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;
export function ensureGsap() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

export const EASE = "expo.out";

/* Hero entrance choreography: backdrop → nav → eyebrow → headline → lede → CTAs → visual. */
export function heroEnter(scope) {
  const { gsap } = ensureGsap();
  const ctx = gsap.context(() => {
    const tl = gsap.timeline({ defaults: { ease: EASE } });
    tl.fromTo("[data-hero='backdrop']", { opacity: 0 }, { opacity: 1, duration: 1.1 }, 0)
      .fromTo("[data-hero='eyebrow']", { y: 26, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.15)
      .fromTo("[data-hero='line'] > span", { yPercent: 108 }, { yPercent: 0, duration: 1.15, stagger: 0.12 }, 0.25)
      .fromTo("[data-hero='lede']", { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9 }, 0.7)
      .fromTo("[data-hero='cta']", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1 }, 0.85)
      .fromTo("[data-hero='visual']", { y: 60, opacity: 0, scale: 0.97 }, { y: 0, opacity: 1, scale: 1, duration: 1.3 }, 0.6)
      .fromTo("[data-hero='meta']", { opacity: 0 }, { opacity: 1, duration: 0.8, stagger: 0.08 }, 1.0);
    return tl;
  }, scope);
  return () => ctx.revert();
}

/* Masked line reveal for section headings. */
export function lineReveal(targets, trigger) {
  const { gsap } = ensureGsap();
  const ctx = gsap.context(() => {
    gsap.fromTo(
      targets,
      { yPercent: 110 },
      {
        yPercent: 0, duration: 1.05, ease: EASE, stagger: 0.1,
        scrollTrigger: { trigger, start: "top 82%", once: true },
      }
    );
  });
  return () => ctx.revert();
}
