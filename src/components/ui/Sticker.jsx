import { useId } from "react";
import { Link } from "react-router-dom";
import { ArrowDownRight } from "lucide-react";
import styles from "./Sticker.module.css";

export default function Sticker({
  text = "BOOK A FREE CONSULTATION • CTS • EST. 2026 • ",
  to = "/contact",
  label = "Book a free consultation",
  className = "",
}) {
  const id = useId();
  return (
    <Link to={to} className={`${styles.sticker} ${className}`} aria-label={label} data-cursor="GO">
      <svg viewBox="0 0 120 120" className={styles.spin} aria-hidden="true">
        <defs>
          <path id={id} d="M60,60 m-45,0 a45,45 0 1,1 90,0 a45,45 0 1,1 -90,0" fill="none" />
        </defs>
        <text className={styles.stext}>
          <textPath href={`#${id}`}>{text}</textPath>
        </text>
      </svg>
      <span className={styles.core}>
        <ArrowDownRight size={30} strokeWidth={2.5} aria-hidden="true" />
      </span>
    </Link>
  );
}
