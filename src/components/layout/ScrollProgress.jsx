import { useEffect, useRef } from "react";

/* Thin gold scroll-progress bar under the nav. GPU-cheap transform scaleX. */
export default function ScrollProgress() {
  const ref = useRef(null);
  useEffect(() => {
    let raf = 0;
    const fn = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const h = document.documentElement;
        const p = h.scrollTop / (h.scrollHeight - h.clientHeight || 1);
        if (ref.current) ref.current.style.transform = `scaleX(${p})`;
      });
    };
    window.addEventListener("scroll", fn, { passive: true });
    fn();
    return () => { window.removeEventListener("scroll", fn); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div aria-hidden="true" style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 130, height: 2 }}>
      <div ref={ref} style={{ height: "100%", background: "var(--color-accent)", transform: "scaleX(0)", transformOrigin: "left" }} />
    </div>
  );
}
