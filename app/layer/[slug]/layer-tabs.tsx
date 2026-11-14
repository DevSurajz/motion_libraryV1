"use client";
import * as Tabs from "@radix-ui/react-tabs";
import { Button, buttonVariants } from "@/components/ui/button";
import { Ring } from "@/components/visuals";
import { useUi } from "@/components/providers";

export function LayerTabs({ prompt }: { prompt: string }) {
  const { toast } = useUi();
  const copy = async () => {
    try { await navigator.clipboard.writeText(prompt); toast("Prompt copied"); }
    catch { toast("Select the prompt text and copy it manually"); }
  };
  return (
    <Tabs.Root defaultValue="prompt">
      <Tabs.List className="tabs" aria-label="Prompt details">
        {["Prompt", "Preview", "Performance"].map((t) => (
          <Tabs.Trigger key={t} value={t.toLowerCase()} className={buttonVariants({ variant: "chip", size: "chip" })}>{t}</Tabs.Trigger>
        ))}
      </Tabs.List>
      <Tabs.Content value="prompt"><div className="pre" style={{ whiteSpace: "pre-wrap" }}>{prompt}</div><Button variant="white" onClick={copy}>Copy prompt</Button></Tabs.Content>
      <Tabs.Content value="preview"><div className="pre">The preview on the left is generated live from this prompt’s palette and motion.</div></Tabs.Content>
      <Tabs.Content value="performance"><div className="rings"><Ring v={98} l="Mobile" force /><Ring v={100} l="Desktop" force /><Ring v={100} l="SEO" force /></div></Tabs.Content>
    </Tabs.Root>
  );
}
