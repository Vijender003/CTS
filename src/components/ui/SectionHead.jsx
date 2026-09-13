import { useReveal } from "../../hooks/useReveal";
import styles from "./SectionHead.module.css";

export default function SectionHead({ kicker, title, lede, dark = false, align = "split" }) {
  const ref = useReveal();
  return (
    <div ref={ref} className={`rv ${styles.head} ${styles[align]} ${dark ? "on-dark" : ""}`}>
      <div>
        <div className={styles.meta}>
          {kicker && <p className="kicker">{kicker}</p>}
          <span className={styles.index} aria-hidden="true" />
        </div>
        {title && <h2 className={`display sec-title`}>{title}</h2>}
      </div>
      {lede && <p className={`lede ${styles.lede}`}>{lede}</p>}
    </div>
  );
}
