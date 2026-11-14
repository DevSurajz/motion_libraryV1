import type { Metadata } from "next";
import Link from "next/link";
import { TIERS } from "@/lib/data";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = { title: "Pricing", description: "Simple, honest pricing for Lumen: Free, Pro and Studio plans." };

export default function PricingPage() {
  return (
    <section className="wrap pg">
      <p className="eb">Pricing</p>
      <h1 style={{ fontSize: "clamp(48px,8vw,100px)", marginTop: 12 }}>Simple, <em>honest</em> pricing</h1>
      <div className="pr">
        {TIERS.map(([n, p, s, f], i) => (
          <div key={n} className={`tier glass ${i == 1 ? "hl" : ""}`}>
            <span className="tag">{n}</span>
            <div className="p">{p}</div>
            <span className="sub">{s}</span>
            <Button asChild variant={i == 1 ? "white" : "default"}><Link href="/contact">{i ? "Get " + n : "Start free"}</Link></Button>
            <ul>{f.map((x) => <li key={x}>{x}</li>)}</ul>
          </div>
        ))}
      </div>
    </section>
  );
}
