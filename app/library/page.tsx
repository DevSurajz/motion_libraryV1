import type { Metadata } from "next";
import { LibraryGrid } from "./library-grid";

export const metadata: Metadata = { title: "Library", description: "Browse every cinematic AI prompt: templates, 3D scenes, gradients, sections and backgrounds." };

export default function LibraryPage() {
  return (
    <section className="wrap pg">
      <p className="eb">Library</p>
      <h1 className="pg-h">Every <em>prompt</em></h1>
      <LibraryGrid />
    </section>
  );
}
