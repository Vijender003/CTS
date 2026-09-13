import styles from "./Marquee.module.css";

export default function Marquee({ items, className = "", tone = "paper" }) {
  const seq = (prefix) => items.map((t, i) => (
    <span key={`${prefix}-${i}`} className={styles.item}><i aria-hidden="true">✦</i>{t}</span>
  ));
  return (
    <div className={`${styles.marquee} ${styles[tone] || ""} ${className}`} aria-hidden="true">
      <div className={styles.track}>{seq("a")}{seq("b")}</div>
    </div>
  );
}
