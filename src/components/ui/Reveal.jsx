import { useReveal } from "../../hooks/useReveal";

/* Scroll-reveal wrapper. delay: 0|1|2|3 → staggered children. as: element type. */
export default function Reveal({ children, delay = 0, as: Tag = "div", className = "", ...rest }) {
  const ref = useReveal();
  return (
    <Tag ref={ref} className={`rv${delay ? ` rv-d${delay}` : ""} ${className}`.trim()} {...rest}>
      {children}
    </Tag>
  );
}
