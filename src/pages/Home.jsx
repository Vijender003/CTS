import { useSeo } from "../hooks/useSeo";
import Hero from "../sections/Hero";
import Trust from "../sections/Trust";
import Problem from "../sections/Problem";
import Ecosystem from "../sections/Ecosystem";
import ServicesHome from "../sections/ServicesHome";
import ZohoEco from "../sections/ZohoEco";
import Results from "../sections/Results";
import Roi from "../sections/Roi";
import CasesHome from "../sections/CasesHome";
import Process from "../sections/Process";
import Story from "../sections/Story";
import Industries from "../sections/Industries";
import InsightsHome from "../sections/InsightsHome";
import Faq from "../sections/Faq";
import FinalCta from "../sections/FinalCta";
import Marquee from "../components/ui/Marquee";

export default function Home() {
  useSeo({
    title: null,
    description: "CTS (Cleanomatics Tech Solutions) — Authorized Zoho Partner helping ambitious businesses build connected revenue systems through Zoho, automation, technology and performance marketing.",
    path: "/",
  });
  return (
    <main>
      <Hero />
      <Marquee tone="blue" items={["Authorized Zoho Partner", "Top 10% Zoho Growth Partner", "Partner of the Year 2023", "Partner of the Year 2024", "UC Berkeley SkyDeck"]} />
      <Trust />
      <Problem />
      <Ecosystem />
      <ServicesHome />
      <ZohoEco />
      <Results />
      <Roi />
      <CasesHome />
      <Process />
      <Story />
      <Industries />
      <InsightsHome />
      <Faq />
      <Marquee tone="ink" items={["Zoho CRM", "Marketing Automation", "Revenue Systems", "Fractional CMO", "Web Engineering", "AI Agents"]} />
      <FinalCta />
    </main>
  );
}
