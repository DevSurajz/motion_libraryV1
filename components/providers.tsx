"use client";
import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import { CommandPalette } from "./command-palette";

type Ctx = { toast: (m: string) => void; openPalette: () => void };
const UiContext = createContext<Ctx>({ toast: () => {}, openPalette: () => {} });
export const useUi = () => useContext(UiContext);

export function Providers({ children }: { children: ReactNode }) {
  const [msg, setMsg] = useState("");
  const [shown, setShown] = useState(false);
  const [pal, setPal] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);
  const lenis = useRef<Lenis | null>(null);
  const pathname = usePathname();

  const toast = useCallback((m: string) => {
    setMsg(m); setShown(true);
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setShown(false), 2200);
  }, []);

  // Lenis smooth scrolling
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion:reduce)").matches) return;
    const l = new Lenis({ lerp: 0.12, smoothWheel: true, syncTouch: false, prevent: (n) => !!(n as HTMLElement).closest?.("[data-lenis-prevent],[cmdk-list],[role=dialog]") });
    lenis.current = l;
    let id = 0;
    const f = (t: number) => { l.raf(t); id = requestAnimationFrame(f); };
    id = requestAnimationFrame(f);
    return () => { cancelAnimationFrame(id); l.destroy(); lenis.current = null; };
  }, []);

  useEffect(() => {
    const el = location.hash ? document.querySelector(location.hash) as HTMLElement | null : null;
    if (el) lenis.current ? lenis.current.scrollTo(el, { offset: -90 }) : el.scrollIntoView();
    else lenis.current ? lenis.current.scrollTo(0, { immediate: true }) : scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => { pal ? lenis.current?.stop() : lenis.current?.start(); }, [pal]);

  // ⌘K
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() == "k") { e.preventDefault(); setPal((o) => !o); }
    };
    addEventListener("keydown", k);
    return () => removeEventListener("keydown", k);
  }, []);

  return (
    <UiContext.Provider value={{ toast, openPalette: () => setPal(true) }}>
      {children}
      <CommandPalette open={pal} onOpenChange={setPal} />
      <div id="toast" className={`glass ${shown ? "s" : ""}`} role="status">{msg}</div>
    </UiContext.Provider>
  );
}
