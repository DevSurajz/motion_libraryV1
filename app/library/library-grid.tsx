"use client";
import { useState } from "react";
import { CATEGORIES, LIBRARY } from "@/lib/data";
import { Card } from "@/components/visuals";

export function LibraryGrid() {
  const [f, setF] = useState("All");
  const [q, setQ] = useState("");
  const r = LIBRARY.filter((l) => (f == "All" || l.tag == f) && l.name.toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <div className="bar">
        <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search prompts…" aria-label="Search prompts" />
        <div className="chips">
          {["All", ...CATEGORIES.map((c) => c[1])].map((t) => (
            <button key={t} className={`chip ${f == t ? "on" : ""}`} onClick={() => setF(t)}>{t}</button>
          ))}
        </div>
      </div>
      <div className="grid">
        {r.length ? r.map((i) => <Card key={i.slug} item={i} />) : <p className="sub">No prompts match. Try a different word or category.</p>}
      </div>
    </>
  );
}
