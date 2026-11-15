import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LEGAL, legalBySlug } from "@/lib/legal";

export const dynamicParams = false;
export const generateStaticParams = () => LEGAL.map((p) => ({ slug: p.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = legalBySlug((await params).slug);
  return p ? { title: p.title, description: p.intro } : { title: "Not found" };
}

export default async function LegalPage({ params }: { params: Promise<{ slug: string }> }) {
  const p = legalBySlug((await params).slug);
  if (!p) notFound();
  return (
    <section className="wrap pg">
      <p className="eb">{p.eyebrow}</p>
      <h1 className="pg-h" style={{ marginBottom: 16 }}>{p.title}</h1>
      <p className="sub" style={{ marginBottom: 30 }}>{p.intro}</p>
      <div className="doc">
        {p.sections.map(([h, t]) => (<div key={h}><h3>{h}</h3><p>{t}</p></div>))}
      </div>
    </section>
  );
}
