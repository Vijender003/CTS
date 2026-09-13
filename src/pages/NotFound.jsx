import { useSeo } from "../hooks/useSeo";
import PageHero from "../components/layout/PageHero";
import Button from "../components/ui/Button";

export default function NotFound() {
  useSeo({ title: "Page not found" });
  return (
    <main>
      <PageHero kicker="404" title={<>This page went <em>off-system.</em></>} lede="The link may be old or mistyped. The revenue ecosystem, however, is right here." />
      <section className="section"><div className="container flex flex-wrap gap-3.5">
        <Button to="/">Back home</Button>
        <Button to="/contact" variant="ghost">Talk to CTS</Button>
      </div></section>
    </main>
  );
}
