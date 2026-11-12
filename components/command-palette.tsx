"use client";
import { Command } from "cmdk";
import * as Dialog from "@radix-ui/react-dialog";
import { useRouter } from "next/navigation";
import { LIBRARY } from "@/lib/data";

export function CommandPalette({ open, onOpenChange }: { open: boolean; onOpenChange: (o: boolean) => void }) {
  const router = useRouter();
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay id="pal">
          <Dialog.Content aria-describedby={undefined} onClick={(e) => e.stopPropagation()}>
            <Dialog.Title className="sr-only">Search prompts</Dialog.Title>
            <Command label="Search every prompt">
              <Command.Input placeholder="Search every prompt…" autoFocus />
              <Command.List>
                <Command.Empty>No prompts found.</Command.Empty>
                {LIBRARY.map((l) => (
                  <Command.Item
                    key={l.slug}
                    value={`${l.name} ${l.tag}`}
                    onSelect={() => { onOpenChange(false); router.push(`/layer/${l.slug}`); }}
                  >
                    {l.name}
                    <span className="tag">{l.tag}</span>
                  </Command.Item>
                ))}
              </Command.List>
            </Command>
          </Dialog.Content>
        </Dialog.Overlay>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
