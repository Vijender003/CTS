import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "../../hooks/useReveal";

/* Animated number counter — fires once when visible. */
export default function Counter({ value, suffix = "", duration = 1600, className = "" }) {
  const ref = useRef(null);
  const [n, setN] = useState(0);
  const reduced = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduced) { setN(value); return; }
    let raf = 0; let started = false;
    const run = () => {
      const t0 = performance.now();
      const step = (t) => {
        const p = Math.min(1, (t - t0) / duration);
        setN(Math.round(value * (1 - Math.pow(1 - p, 4))));
        if (p < 1) raf = requestAnimationFrame(step);
      };
      raf = requestAnimationFrame(step);
    };
    const io = new IntersectionObserver((es) => es.forEach((en) => {
      if (en.isIntersecting && !started) { started = true; run(); io.disconnect(); }
    }), { threshold: 0.4 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(raf); };
  }, [value, duration, reduced]);

  return <span ref={ref} className={className}>{n}{suffix}</span>;
}
