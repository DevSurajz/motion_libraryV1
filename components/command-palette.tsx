"use client";
import { useEffect, useState } from "react";
import { Command } from "cmdk";
import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { LIBRARY } from "@/lib/data";

const FEELINGS = ["glass", "chrome", "aurora", "particles", "liquid"] as const;

const FEELING_MAP: Record<string, string> = {
  glass: "glass chrome prism halo mirror clear",
  chrome: "chrome liquid metal silver obsidian",
  aurora: "aurora gradient neon dusk sunset veil",
  particles: "particles starfield echo nebula dither",
  liquid: "liquid tide wave silk water",
};

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const router = useRouter();
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!open) setQ("");
  }, [open]);

  const hasQuery = q.trim().length > 0;

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay id="pal" onClick={() => onOpenChange(false)}>
          <Dialog.Content aria-describedby={undefined} onClick={(e) => e.stopPropagation()}>
            <Dialog.Title className="sr-only">Search prompts</Dialog.Title>
            <Command label="Search the library, docs, MCP and more">
              <div className="pal-top">
                <svg className="pal-sic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <circle cx="11" cy="11" r="7" />
                  <path d="m20 20-3.5-3.5" />
                </svg>
                <Command.Input
                  value={q}
                  onValueChange={setQ}
                  placeholder="Search the library, docs, MCP and more..."
                  autoFocus
                />
                <button type="button" className="pal-esc" onClick={() => onOpenChange(false)}>
                  Esc
                </button>
              </div>

              {!hasQuery ? (
                <div className="pal-feel">
                  <div className="pal-fic" aria-hidden="true">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                      <circle cx="10.5" cy="10.5" r="6" stroke="#f4f4f2" strokeWidth="1.8" />
                      <path d="M8.5 12V10.2M10.5 12V8.8M12.5 12V9.6" stroke="rgba(255,255,255,.55)" strokeWidth="1.5" strokeLinecap="round" />
                      <path d="m15.2 15.2 4.3 4.3" stroke="#fdba8c" strokeWidth="2.2" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h4>Search by feeling, not by industry.</h4>
                  <div className="pal-tags">
                    {FEELINGS.map((f) => (
                      <button
                        key={f}
                        type="button"
                        className="pal-tag"
                        onClick={() => setQ(f)}
                      >
                        {f}
                      </button>
                    ))}
                  </div>
                </div>
              ) : (
                <Command.List>
                  <Command.Empty>No prompts found.</Command.Empty>
                  {LIBRARY.map((l, idx) => {
                    const extra = FEELINGS[idx % FEELINGS.length] + " " + (FEELING_MAP[FEELINGS[idx % FEELINGS.length]] ?? "");
                    return (
                      <Command.Item
                        key={l.slug}
                        value={`${l.name} ${l.tag} ${extra}`}
                        onSelect={() => {
                          onOpenChange(false);
                          router.push(`/layer/${l.slug}`);
                        }}
                      >
                        <span>{l.name}</span>
                        <span className="tag">{l.tag}</span>
                      </Command.Item>
                    );
                  })}
                </Command.List>
              )}
            </Command>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
