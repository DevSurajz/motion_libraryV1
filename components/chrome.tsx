"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { useUi } from "./providers";
import { Button } from "./ui/button";

export function Intro() {
  return (
    <motion.div id="intro" style={{ animation: "none" }} initial={{ opacity: 1 }} animate={{ opacity: 0, transitionEnd: { visibility: "hidden" } }} transition={{ delay: 1.1, duration: 1 }}>
      <motion.span style={{ animation: "none" }} initial={{ opacity: 0, letterSpacing: "0.3em" }} animate={{ opacity: 1, letterSpacing: "0em" }} transition={{ duration: 1 }}>
        lumen
      </motion.span>
    </motion.div>
  );
}

const LINKS = [["/library", "Library"], ["/#tools", "Tools"], ["/pricing", "Pricing"], ["/docs", "Docs"], ["/contact", "Contact"]] as const;

export function Nav() {
  const { openPalette } = useUi();
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  useEffect(() => setOpen(false), [pathname]);
  const [sc, setSc] = useState(false);
  useEffect(() => { const f = () => setSc(window.scrollY > 24); f(); window.addEventListener("scroll", f, { passive: true }); return () => window.removeEventListener("scroll", f); }, []);
  return (
    <>
      <div className={"nblur" + (sc ? " on" : "")} aria-hidden />
      <nav className={sc ? "sc" : ""}>
        <Link className="lg" href="/"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" aria-hidden><path d="M12 3 3 8l9 5 9-5-9-5Z" fill="currentColor" /><path d="m3 12.5 9 5 9-5" /><path d="m3 16.5 9 5 9-5" /></svg>lumen</Link>
        <div className="nc">
          <button className="sb glass" onClick={openPalette} aria-label="Search the library">⌕ <span>⌘K</span></button>
          <div className="ls glass">
            {LINKS.map(([h, l]) => (
              <Link key={h} href={h}>{l}{l == "Tools" && <span className="nw">NEW</span>}</Link>
            ))}
          </div>
          <div className="ls glass">
            <Link href="/docs">✦ MCP</Link>
            <Link href="/#tools">Prompts<span className="nw">NEW</span></Link>
          </div>
        </div>
        <button className="sb glass msb" onClick={openPalette} aria-label="Search designs">⌕ <span>Search designs</span></button>
        <Button asChild variant="metal" size="sm" className="dsi"><Link href="/signin">Sign in</Link></Button>
        <button id="bg" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>{open ? "✕" : "☰"}</button>
      </nav>
      <div id="mm" className={open ? "o" : ""} onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
        <div className="mp">
          {LINKS.map(([h, l]) => (
            <Link key={h} href={h} onClick={() => setOpen(false)}>
              {l}{l == "Tools" && <span className="nw2">New</span>}{l == "Library" && <span className="chev">›</span>}
            </Link>
          ))}
          <div className="mcards">
            <Link href="/docs" className="mcard"><i>✦</i><b>MCP</b><small>The library inside your AI agent</small></Link>
            <Link href="/how-it-works" className="mcard"><i>◇</i><b>How it works</b><small>Idea to interface in one prompt</small></Link>
            <Link href="/library" className="mcard"><span className="nw2 tr">New</span><i>◈</i><b>Prompts</b><small>Copy-ready cinematic layers</small></Link>
          </div>
          <div className="mdiv" />
          <Link className="msi" href="/signin" onClick={() => setOpen(false)}>Sign in</Link>
        </div>
      </div>
    </>
  );
}

export function AskButton() {
  const { openPalette } = useUi();
  return <button className="ask glass" onClick={openPalette}><i>✦</i>Ask AI for guides</button>;
}

const SOC = [["◎", "Instagram"], ["f", "Facebook"], ["P", "Pinterest"], ["𝕏", "Lumen on X"], ["in", "LinkedIn"]];
const PRODUCT = [["/library", "Templates"], ["/library", "3D Scenes"], ["/library", "Sections"], ["/library", "Backgrounds"], ["/library", "Gradients"], ["/#tools", "Tools"], ["/docs", "Docs"], ["/docs", "MCP"], ["/pricing", "Pricing"]];
const COMPANY = [["/legal/about", "About"], ["/legal/affiliate", "Affiliate"], ["/contact", "Contact us"], ["/legal/privacy", "Privacy Policy"], ["/legal/terms", "Terms of Use"], ["/legal/cookies", "Cookie Policy"], ["/legal/affiliate-terms", "Affiliate Terms"], ["/legal/cookie-preferences", "Cookie preferences"]];
const MAILS = ["hello@lumen.studio", "press@lumen.studio", "partners@lumen.studio"];

export function Footer() {
  return (
    <footer>
      <div className="fp">
        <div className="fp-top">
          <div className="fp-brand">
            <Link href="/" className="fp-lg">✦ <b>lumen</b></Link>
            <p className="fp-tag">Build cinematic websites in minutes with Lumen.</p>
            <div className="fp-hr" />
            <b className="fp-nh">Fresh prompts, every Friday.</b>
            <p className="fp-ns">Join the Lumen digest — new prompts and AI design news, once a week.</p>
            <form className="fp-f" onSubmit={(e) => { e.preventDefault(); (e.currentTarget as HTMLFormElement).reset(); }}>
              <span aria-hidden="true">✉</span><input type="email" required placeholder="you@email.com" aria-label="Email" /><button>Subscribe</button>
            </form>
            <small>By subscribing, you agree to receive our weekly email digest.</small>
          </div>
          <div className="fp-cols">
            <div><div className="eb">Product</div>{PRODUCT.map(([h, l]) => <Link key={l} href={h}>{l}</Link>)}</div>
            <div><div className="eb">Company</div>{COMPANY.map(([h, l]) => <Link key={l} href={h}>{l}</Link>)}</div>
            <div><div className="eb">Social</div>{SOC.map(([i, l]) => <a key={l} href="#" className="fp-ic"><i>{i}</i>{l}<span>↗</span></a>)}</div>
            <div><div className="eb">Contact</div>{MAILS.map((m) => <a key={m} href={`mailto:${m}`} className="fp-ic"><i>✉</i>{m}</a>)}</div>
          </div>
        </div>
        <div className="fp-cp">© 2026 Lumen. All prompts are yours to ship.</div>
        <div className="big" aria-hidden="true">{"lumen".split("").map((c, i) => <span key={i} data-c={c} style={{ animationDelay: i * 0.35 + "s" }}>{c}</span>)}</div>
      </div>
    </footer>
  );
}

export function Cursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!matchMedia("(hover:hover)").matches) return;
    let x = 0, y = 0, rx = 0, ry = 0, id = 0;
    const mv = (e: PointerEvent) => {
      x = e.clientX; y = e.clientY;
      if (dot.current) dot.current.style.transform = `translate(${x}px,${y}px)`;
      const t = e.target as Element;
      const c = t.closest?.(".card") as HTMLElement | null;
      ring.current?.classList.toggle("h", !c && !!t.closest?.("a,button,summary,input,[role=button]"));
      if (c) { const b = c.getBoundingClientRect(); c.style.setProperty("--x", x - b.left + "px"); c.style.setProperty("--y", y - b.top + "px"); }
    };
    const f = () => { rx += (x - rx) * 0.16; ry += (y - ry) * 0.16; if (ring.current) ring.current.style.transform = `translate(${rx}px,${ry}px)`; id = requestAnimationFrame(f); };
    addEventListener("pointermove", mv); id = requestAnimationFrame(f);
    return () => { removeEventListener("pointermove", mv); cancelAnimationFrame(id); };
  }, []);
  return (<><div id="cd" ref={dot}><i /></div><div id="cr" ref={ring}><i /></div></>);
}

const STARS = [[18, 30, 0], [42, 70, 1.2], [64, 22, 2.1], [80, 64, 0.6], [30, 80, 1.8], [90, 34, 2.7], [54, 50, 3.3]];
export function ShineButton({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link className="shine" href={href}>
      <span className="sh-in">
        {STARS.map(([x, y, d], i) => <i key={i} className="star" style={{ left: x + "%", top: y + "%", animationDelay: d + "s" }} />)}
        <span className="sh-t">{children}</span>
        <span className="sh-o"><b className="sp" /><b className="sp s2" /><b className="sp s3" /></span>
      </span>
    </Link>
  );
}

export function Spotlight({ children, className, as: Tag = "div" }: { children: React.ReactNode; className?: string; as?: "div" | "section" }) {
  const ref = useRef<HTMLElement>(null);
  const mv = (e: React.PointerEvent) => {
    const el = ref.current; if (!el) return;
    const b = el.getBoundingClientRect();
    const x = e.clientX - b.left, y = e.clientY - b.top;
    el.style.setProperty("--mx", x + "px"); el.style.setProperty("--my", y + "px");
    el.style.setProperty("--rx", ((y / b.height - 0.5) * -6).toFixed(2) + "deg");
    el.style.setProperty("--ry", ((x / b.width - 0.5) * 6).toFixed(2) + "deg");
  };
  const lv = () => { ref.current?.style.setProperty("--rx", "0deg"); ref.current?.style.setProperty("--ry", "0deg"); };
  return <Tag ref={ref as never} className={"spot " + (className ?? "")} onPointerMove={mv} onPointerLeave={lv}>{children}</Tag>;
}
