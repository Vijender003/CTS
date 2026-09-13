import { useEffect, useRef } from "react";
import { useReducedMotion } from "../../hooks/useReveal";
import styles from "./Cursor.module.css";

/* Refined custom cursor — desktop/fine-pointer only, states via [data-cursor]. */
export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (reduced) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    const dot = dotRef.current, ring = ringRef.current, label = labelRef.current;
    let mx = -100, my = -100, rx = -100, ry = -100, raf = 0;
    const move = (e) => { mx = e.clientX; my = e.clientY; };
    const over = (e) => {
      const t = e.target.closest("[data-cursor], a, button");
      if (!t) { ring.classList.remove(styles.on); return; }
      ring.classList.add(styles.on);
      label.textContent = t.getAttribute("data-cursor") || (t.tagName === "A" ? "GO" : "•••");
    };
    const loop = () => {
      rx += (mx - rx) * 0.2; ry += (my - ry) * 0.2;
      dot.style.transform = `translate(${mx}px, ${my}px)`;
      ring.style.transform = `translate(${rx}px, ${ry}px)`;
      raf = requestAnimationFrame(loop);
    };
    document.addEventListener("mousemove", move, { passive: true });
    document.addEventListener("mouseover", over, { passive: true });
    raf = requestAnimationFrame(loop);
    document.documentElement.classList.add(styles.native);
    return () => {
      document.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", over);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove(styles.native);
    };
  }, [reduced]);

  if (reduced) return null;
  return (
    <div className={styles.wrap} aria-hidden="true">
      <div ref={dotRef} className={styles.dot} />
      <div ref={ringRef} className={styles.ring}><span ref={labelRef} className={styles.label} /></div>
    </div>
  );
}
