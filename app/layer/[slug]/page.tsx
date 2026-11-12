import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LIBRARY, promptFor } from "@/lib/data";
import { ArtCanvas } from "@/components/visuals";
import { LayerTabs } from "./layer-tabs";

export const generateStaticParams = () => LIBRARY.map((l) => ({ slug: l.slug }));

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const i = LIBRARY.find((l) => l.slug == slug);
  return i ? { title: i.name, description: `${i.name} — a copy-paste ${i.tag.toLowerCase()} prompt for your AI.` } : { title: "Not found" };
}

export default async function LayerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const i = LIBRARY.find((l) => l.slug == slug);
  if (!i) notFound();
  return (
    <section className="wrap pg">
      <Link className="eb" href="/library">← Library</Link>
      <div className="dt">
        <div><ArtCanvas s={i.s} k={i.k} animate w={960} h={600} /></div>
        <div>
          <span className="tag">{i.tag}</span>
          <h1 style={{ margin: "12px 0" }}>{i.name}</h1>
          <p className="sub">A copy-paste prompt for your AI. ♡ {i.n} saves.</p>
          <LayerTabs prompt={promptFor(i)} />
        </div>
      </div>
    </section>
  );
}
