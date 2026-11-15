import type { Metadata } from "next";

export const metadata: Metadata = { title: "Docs", description: "Get started with Lumen: pick a prompt, paste it, tune it and ship." };

export default function DocsPage() {
  return (
    <section className="wrap pg">
      <p className="eb">Docs</p>
      <h1 className="pg-h" style={{ marginBottom: 30 }}>Getting <em>started</em></h1>
      <div className="doc">
        <h3>1. Pick a prompt</h3><p>Browse the library or press ⌘K to search everything.</p>
        <h3>2. Paste it</h3><p>Use Claude, ChatGPT, Cursor, Lovable, v0 or Bolt. Name your stack in the first line.</p>
        <h3>3. Tune and ship</h3><p>Edit the colour, type and motion variables in the prompt, then publish.</p>
      </div>
    </section>
  );
}
