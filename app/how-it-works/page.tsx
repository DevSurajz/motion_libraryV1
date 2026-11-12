import type { Metadata } from "next";
import { HowItWorks } from "@/components/how-it-works";
import { CtaPanel } from "@/components/cta-panel";

export const metadata: Metadata = {
  title: "How it works",
  description: "Find a prompt, make it yours, ship it — or let your agent do it all over MCP.",
};

export default function Page() {
  return (
    <>
      <section className="sec" style={{ paddingTop: 140 }}><div className="wrap"><HowItWorks /></div></section>
      <CtaPanel />
    </>
  );
}
