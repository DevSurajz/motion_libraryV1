"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { motion, useInView } from "framer-motion";
import { drawArt } from "@/lib/art";
import type { Item } from "@/lib/data";

/** Canvas thumbnail that draws once when visible and animates only while on screen. */
export function ArtCanvas({ s, k, animate = false, w = 320, h = 200, style }: { s: number; k: number; animate?: boolean; w?: number; h?: number; style?: CSSProperties }) {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const c = ref.current!;
    const rm = matchMedia("(prefers-reduced-motion:reduce)").matches;
    let drawn = false, visible = false, id = 0;
    const loop = (t: number) => { if (visible) drawArt(c, s, k, t / 1e3); id = requestAnimationFrame(loop); };
    const io = new IntersectionObserver(([e]) => {
      visible = e.isIntersecting && animate && !rm;
      if (e.isIntersecting && !drawn) { drawArt(c, s, k, 0); drawn = true; }
    }, { rootMargin: "120px" });
    io.observe(c);
    if (animate) id = requestAnimationFrame(loop);
    return () => { io.disconnect(); cancelAnimationFrame(id); };
  }, [s, k, animate]);
  return <canvas ref={ref} width={w} height={h} style={style} />;
}

export function Reveal({ children, className, style }: { children: ReactNode; className?: string; style?: CSSProperties }) {
  return (
    <motion.div className={className} style={style} initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.15 }} transition={{ duration: 1, ease: [0.2, 0.8, 0.2, 1] }}>
      {children}
    </motion.div>
  );
}

export function Card({ item }: { item: Item }) {
  return (
    <Link className="card" href={`/layer/${item.slug}`} draggable={false}>
      <div className="thumb">
        <ArtCanvas s={item.s} k={item.k} />
        {item.nw && <span className="nb">New</span>}
        <span className="cp glass">Copy prompt</span>
        <span className="ic" aria-hidden="true">✦</span>
      </div>
      <div className="cm"><b>{item.name}</b><span className="l">♡ {item.n}</span></div>
    </Link>
  );
}

export function Ring({ v, l, force }: { v: number; l: string; force?: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  return (
    <div ref={ref} className={`ring ${inView || force ? "in" : ""}`}>
      <svg viewBox="0 0 80 80"><circle className="bg" cx="40" cy="40" r="34" /><circle className="fg" cx="40" cy="40" r="34" style={{ ["--v" as string]: v }} /></svg>
      <b>{v}</b><i>{l}</i>
    </div>
  );
}

/** Drag-to-scroll horizontal carousel. */
export function Carousel({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const onDown = (e: React.PointerEvent) => {
    const c = ref.current!; const x = e.clientX, s = c.scrollLeft; let moved = false;
    const mv = (ev: PointerEvent) => { moved = true; c.scrollLeft = s - (ev.clientX - x); c.style.scrollSnapType = "none"; };
    const up = () => {
      removeEventListener("pointermove", mv); removeEventListener("pointerup", up); c.style.scrollSnapType = "";
      if (moved) addEventListener("click", (ev) => ev.preventDefault(), { capture: true, once: true });
    };
    addEventListener("pointermove", mv); addEventListener("pointerup", up);
  };
  return <div ref={ref} className="car" style={{ maxWidth: 1328, margin: "auto" }} onPointerDown={onDown} data-lenis-prevent-wheel="false">{children}</div>;
}

const TERM = ['$ lumen agent "moody portfolio for a ceramicist"', "› searching library… Komorebi, Halcyon", "› composing hero · gallery · contact", "› Lighthouse 98 / 100 / 100", "✓ site ready — deploying"];
export function Terminal() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const [li, setLi] = useState(0);
  const [ci, setCi] = useState(0);
  useEffect(() => {
    if (!inView || li >= TERM.length) return;
    if (matchMedia("(prefers-reduced-motion:reduce)").matches) { setLi(TERM.length); return; }
    const done = ci >= TERM[li].length;
    const t = setTimeout(() => (done ? (setLi(li + 1), setCi(0)) : setCi(ci + 1)), done ? 450 : 28);
    return () => clearTimeout(t);
  }, [inView, li, ci]);
  return (
    <div className="term" ref={ref}>
      {TERM.slice(0, li).map((l, i) => <div key={i}>{i ? l : <b>{l}</b>}</div>)}
      {li < TERM.length && inView && <div>{li ? TERM[li].slice(0, ci) : <b>{TERM[0].slice(0, ci)}</b>}▍</div>}
    </div>
  );
}
