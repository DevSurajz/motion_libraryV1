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

export function LayersIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M12 3.2 2.8 8.1 12 13l9.2-4.9L12 3.2Z" fill="#f4f4f2" />
      <path d="M12 15.2 4.9 11.4 2.8 12.5 12 17.4l9.2-4.9-2.1-1.1-7.1 3.8Z" fill="rgba(255,255,255,.56)" />
      <path d="M12 19.4 4.9 15.6 2.8 16.7 12 21.6l9.2-4.9-2.1-1.1-7.1 3.8Z" fill="rgba(255,255,255,.28)" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg className="srch-ic" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}

function ExtIcon() {
  return (
    <svg className="ext-ic" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M6.5 3.5H4.2A1.7 1.7 0 0 0 2.5 5.2v6.6c0 .94.76 1.7 1.7 1.7h6.6c.94 0 1.7-.76 1.7-1.7V9.5" />
      <path d="M9.5 2.5h4v4" />
      <path d="M13.5 2.5 7.8 8.2" />
    </svg>
  );
}

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
        <Link className="lg" href="/" aria-label="Lumen home">
          <LayersIcon />
          <span className="lg-tx">lumen</span>
        </Link>
        <div className="nc">
          <button className="sb glass" onClick={openPalette} aria-label="Search the library">
            <SearchIcon />
            <span>⌘K</span>
          </button>
          <div className="ls glass">
            {LINKS.map(([h, l]) => (
              <Link key={h} href={h}>{l}{l == "Tools" && <span className="nw">NEW</span>}</Link>
            ))}
          </div>
          <div className="ls glass">
            <Link href="/#tools">Prompts<span className="nw">NEW</span></Link>
          </div>
        </div>
        <button className="sb glass msb" onClick={openPalette} aria-label="Search the library">
          <SearchIcon />
          <span>Search the library</span>
        </button>
        <Button asChild variant="metal" size="sm" className="dsi"><Link href="/signin">Sign in</Link></Button>
        <button id="bg" aria-label="Menu" aria-expanded={open} onClick={() => setOpen((o) => !o)}>
          {open ? (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          ) : (
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </nav>
      <div id="mm" className={open ? "o" : ""} onClick={(e) => e.target === e.currentTarget && setOpen(false)}>
        <div className="mp">
          {LINKS.map(([h, l]) => (
            <Link key={h} href={h} onClick={() => setOpen(false)}>
              {l}{l == "Tools" && <span className="nw2">New</span>}{l == "Library" && <span className="chev">›</span>}
            </Link>
          ))}
          <div className="mcards">
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
  return (
    <button className="ask glass" onClick={openPalette}>
      <i><LayersIcon /></i>
      <span>Ask AI for guides</span>
    </button>
  );
}

function SocIcon({ kind }: { kind: "ig" | "fb" | "pin" | "x" | "in" | "mail" | "copy" }) {
  switch (kind) {
    case "ig":
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "fb":
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 1 0 11.56 9.88v-6.99H11v-2.89h2.56V9.8c0-2.53 1.5-3.93 3.8-3.93 1.1 0 2.25.2 2.25.2v2.47h-1.27c-1.25 0-1.64.78-1.64 1.57v1.89h2.79l-.45 2.89h-2.34v6.99A10 10 0 0 0 12 2Z" />
        </svg>
      );
    case "pin":
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M12 2a10 10 0 0 0-3.64 19.31c-.09-.79-.17-2.01.03-2.87.19-.78 1.22-5.17 1.22-5.17s-.31-.62-.31-1.54c0-1.45.84-2.53 1.88-2.53.89 0 1.32.67 1.32 1.47 0 .9-.57 2.24-.87 3.48-.25 1.04.52 1.89 1.54 1.89 1.85 0 3.27-1.95 3.27-4.76 0-2.49-1.79-4.23-4.35-4.23-2.96 0-4.7 2.22-4.7 4.52 0 .9.34 1.86.78 2.38.08.1.1.19.07.3-.08.33-.26 1.04-.29 1.19-.05.19-.15.23-.35.14-1.3-.6-2.11-2.5-2.11-4.03 0-3.28 2.38-6.29 6.87-6.29 3.61 0 6.41 2.57 6.41 6.01 0 3.58-2.26 6.47-5.4 6.47-1.05 0-2.05-.55-2.39-1.2l-.65 2.48c-.23.9-.87 2.03-1.3 2.72A10 10 0 1 0 12 2Z" />
        </svg>
      );
    case "x":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M18.24 2.25h3.31l-7.23 8.26 8.5 11.24h-6.66l-5.21-6.82-5.97 6.82H1.67l7.73-8.84L1.25 2.25h6.83l4.71 6.23 5.45-6.23Zm-1.16 17.52h1.83L7.08 4.13H5.12l11.96 15.64Z" />
        </svg>
      );
    case "in":
      return (
        <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77Z" />
        </svg>
      );
    case "mail":
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="5" width="18" height="14" rx="3" />
          <path d="m4 7 8 6 8-6" />
        </svg>
      );
    case "copy":
      return (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <circle cx="12" cy="12" r="9" />
          <path d="M14.5 9.5a3.5 3.5 0 1 0 0 5" />
        </svg>
      );
  }
}

const SOC: { kind: "ig" | "fb" | "pin" | "x" | "in"; label: string; href: string }[] = [
  { kind: "ig", label: "lumen.us", href: "#" },
  { kind: "ig", label: "lumen.eu", href: "#" },
  { kind: "fb", label: "Facebook", href: "#" },
  { kind: "pin", label: "Pinterest", href: "#" },
  { kind: "x", label: "Lumen on X", href: "#" },
  { kind: "in", label: "Lumen on LinkedIn", href: "#" },
];
const PRODUCT = [["/library", "Templates"], ["/library", "3D Scenes"], ["/library", "Sections"], ["/library", "Backgrounds"], ["/library", "Gradients"], ["/#tools", "Tools"], ["/docs", "Docs"], ["/pricing", "Pricing"]];
const COMPANY = [["/legal/about", "About"], ["/legal/affiliate", "Affiliate"], ["/contact", "Contact us"], ["/legal/privacy", "Privacy Policy"], ["/legal/terms", "Terms of Use"], ["/legal/cookies", "Cookie Policy"], ["/legal/affiliate-terms", "Affiliate Terms"], ["/legal/cookie-preferences", "Cookie preferences"]];
const CONTACTS: { kind: "mail" | "copy"; label: string; href: string; ext?: boolean }[] = [
  { kind: "mail", label: "team@lumen.studio", href: "mailto:team@lumen.studio" },
  { kind: "mail", label: "hello@lumen.studio", href: "mailto:hello@lumen.studio" },
  { kind: "copy", label: "lumen.agency", href: "#", ext: true },
];

export function Footer() {
  return (
    <footer>
      <div className="fp">
        <div className="fp-top">
          <div className="fp-brand">
            <Link href="/" className="fp-lg"><LayersIcon /> <b>lumen</b></Link>
            <p className="fp-tag">Build cinematic websites in minutes with Lumen.</p>
            <div className="fp-hr" />
            <b className="fp-nh">Fresh prompts, every Friday.</b>
            <p className="fp-ns">Join the Lumen digest — new prompts and AI design news, once a week.</p>
            <form className="fp-f" onSubmit={(e) => { e.preventDefault(); (e.currentTarget as HTMLFormElement).reset(); }}>
              <span aria-hidden="true"><SocIcon kind="mail" /></span><input type="email" required placeholder="you@email.com" aria-label="Email" /><button>Subscribe</button>
            </form>
            <small>By subscribing, you agree to receive our weekly email digest.</small>
          </div>
          <div className="fp-cols">
            <div className="fp-col-links"><div className="eb">Product</div>{PRODUCT.map(([h, l]) => <Link key={l} href={h}>{l}</Link>)}</div>
            <div className="fp-col-links">
              <div className="eb">Company</div>
              {COMPANY.map(([h, l]) =>
                l === "Cookie preferences" ? (
                  <Link
                    key={l}
                    href={h}
                    onClick={(e) => {
                      e.preventDefault();
                      window.dispatchEvent(new Event("lumen:open-cookies"));
                    }}
                  >
                    {l}
                  </Link>
                ) : (
                  <Link key={l} href={h}>{l}</Link>
                )
              )}
            </div>
            <div className="fp-col-pills">
              <div className="eb">Social</div>
              <div className="fp-pills">
                {SOC.map((s) => (
                  <a key={s.label} href={s.href} className="fp-ic">
                    <i><SocIcon kind={s.kind} /></i>
                    <b>{s.label}</b>
                    <span><ExtIcon /></span>
                  </a>
                ))}
              </div>
            </div>
            <div className="fp-col-pills">
              <div className="eb">Contact</div>
              <div className="fp-pills fp-pills-col">
                {CONTACTS.map((c) => (
                  <a key={c.label} href={c.href} className="fp-ic">
                    <i><SocIcon kind={c.kind} /></i>
                    <b>{c.label}</b>
                    {c.ext && <span><ExtIcon /></span>}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="fp-cp">© 2026 lumen · lumen.agency</div>
        <div className="big" aria-hidden="true">{"lumen".split("").map((c, i) => <span key={i} data-c={c} style={{ animationDelay: i * 0.35 + "s" }}>{c}</span>)}</div>
      </div>
    </footer>
  );
}

export function CookieBanner() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [prefs, setPrefs] = useState(false);
  const [analytics, setAnalytics] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem("lumen-cookie-consent");
    if (!saved || pathname === "/legal/cookie-preferences") {
      setVisible(true);
    }
    const open = () => {
      setPrefs(false);
      setVisible(true);
    };
    window.addEventListener("lumen:open-cookies", open);
    return () => window.removeEventListener("lumen:open-cookies", open);
  }, [pathname]);

  const decide = (val: "accepted" | "rejected" | "custom") => {
    localStorage.setItem("lumen-cookie-consent", val);
    setVisible(false);
    setPrefs(false);
  };

  if (!visible) return null;

  return (
    <aside className="ck-card" role="dialog" aria-label="Cookie consent">
      <div className="ck-hd">
        <span className="ck-ic" aria-hidden="true">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#fdba8c" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
            <path d="M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5" />
            <circle cx="8.5" cy="8.5" r="1" fill="#fdba8c" stroke="none" />
            <circle cx="15" cy="14" r="1" fill="#fdba8c" stroke="none" />
            <circle cx="10" cy="15.5" r="1" fill="#fdba8c" stroke="none" />
            <circle cx="13.5" cy="10.5" r="0.8" fill="#fdba8c" stroke="none" />
          </svg>
        </span>
        <strong>This website uses cookies</strong>
      </div>
      <p className="ck-p">
        We use cookies to keep the site working.<br />
        See our <Link href="/legal/cookies">cookie policy</Link>.
      </p>
      {prefs && (
        <div className="ck-prefs">
          <label className="ck-row">
            <span>Essential cookies <small>(Required)</small></span>
            <input type="checkbox" checked disabled />
          </label>
          <label className="ck-row">
            <span>Analytics &amp; performance</span>
            <input type="checkbox" checked={analytics} onChange={(e) => setAnalytics(e.target.checked)} />
          </label>
        </div>
      )}
      <div className="ck-act">
        <button type="button" className="ck-acc" onClick={() => decide("accepted")}>
          Accept all
        </button>
        <button type="button" className="ck-rej" onClick={() => decide("rejected")}>
          Reject all
        </button>
      </div>
      <button
        type="button"
        className="ck-mg"
        onClick={() => (prefs ? decide("custom") : setPrefs(true))}
      >
        {prefs ? "Save preferences" : "Manage preferences"}
      </button>
    </aside>
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
