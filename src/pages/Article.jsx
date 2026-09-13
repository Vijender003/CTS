import { useEffect } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { INSIGHTS } from "../data/content";
import { useSeo } from "../hooks/useSeo";
import { track, EVENTS } from "../lib/analytics";
import PageHero from "../components/layout/PageHero";
import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";
import FinalCta from "../sections/FinalCta";
import styles from "./Article.module.css";

export default function Article() {
  const { slug } = useParams();
  const a = INSIGHTS.find((x) => x.slug === slug);
  useSeo(a ? { title: a.title, description: a.excerpt, path: `/insights/${a.slug}` } : { title: "Insight" });

  useEffect(() => {
    if (!a) return;
    track(EVENTS.BLOG_READ, { slug: a.slug });
    const el = document.createElement("script");
    el.type = "application/ld+json"; el.id = "article-schema";
    el.textContent = JSON.stringify({ "@context": "https://schema.org", "@type": "Article", headline: a.title, description: a.excerpt, author: { "@type": "Organization", name: "Cleanomatics Tech Solutions" } });
    document.head.appendChild(el);
    return () => document.getElementById("article-schema")?.remove();
  }, [a]);

  if (!a) return <Navigate to="/insights" replace />;
  const related = INSIGHTS.filter((x) => x.slug !== a.slug && x.category === a.category).slice(0, 2);

  return (
    <main>
      <PageHero kicker={a.category} title={a.title} lede={a.excerpt} />
      <article className={`section ${styles.article}`}><div className={`container ${styles.narrow}`}>
        {a.body.map((p, i) => <Reveal key={i}><p>{p}</p></Reveal>)}
        <Reveal><div className={styles.ctaBox}>
          <p>Want this thinking applied to your business?</p>
          <Button to="/contact">Book a Free Consultation</Button>
        </div></Reveal>
        <Reveal><Link to="/insights" className={styles.back}><ArrowLeft size={15} aria-hidden="true" />All insights</Link></Reveal>
        {related.length > 0 && (
          <div className={styles.related}>
            <h2 className="display">Keep reading</h2>
            {related.map((r) => (
              <Link key={r.slug} to={`/insights/${r.slug}`} className={styles.rRow}>
                <span>{r.category}</span><strong>{r.title}</strong><ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            ))}
          </div>
        )}
      </div></article>
      <FinalCta />
    </main>
  );
}
