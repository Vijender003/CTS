import { useRef } from "react";
import { useReducedMotion } from "../../hooks/useReveal";

/* Subtle magnetic pull on fine pointers. Strength ~0.18 keeps it premium, not playful. */
export default function Magnetic({ children, strength = 0.18, className = "" }) {
  const ref = useRef(null);
  const reduced = useReducedMotion();
  const fine = typeof window !== "undefined" && window.matchMedia("(hover: hover) and (pointer: fine)").matches;

  const move = (e) => {
    if (reduced || !fine || !ref.current) return;
    const r = ref.current.getBoundingClientRect();
    const x = e.clientX - r.left - r.width / 2;
    const y = e.clientY - r.top - r.height / 2;
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
  };
  const leave = () => { if (ref.current) ref.current.style.transform = ""; };

  return (
    <span
      ref={ref} className={className} onMouseMove={move} onMouseLeave={leave}
      style={{ display: "inline-block", transition: "transform .3s cubic-bezier(.16,1,.3,1)", willChange: "transform" }}
    >
      {children}
    </span>
  );
}
