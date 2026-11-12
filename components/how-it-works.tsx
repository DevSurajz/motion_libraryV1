"use client";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { ArtCanvas, Ring, Terminal } from "./visuals";

const STEPS: { icon: string; title: string; text: ReactNode; extra?: ReactNode; vis: ReactNode }[] = [
  {
    icon: "⌕", title: "Find it",
    text: <>One search across every <b>template, scene, gradient</b> and section.</>,
    vis: <div className="srch"><div>glass hero with slow orbit</div><div>Glass Halo <span className="tag">3D Scene</span></div><div>Halcyon <span className="tag">Template</span></div><div>Pearl Mist <span className="tag">Gradient</span></div></div>,
  },
  {
    icon: "⚙", title: "Make it yours",
    text: <>Tune scenes and gradients <b>live</b> with sliders, then copy the updated prompt.</>,
    vis: <div className="hw-tune"><ArtCanvas s={11} k={0} animate w={560} h={240} style={{ width: "100%", borderRadius: 14 }} /><div className="sl"><i /><i /><i /></div></div>,
  },
  {
    icon: "⇪", title: "Ship it",
    text: <>Paste one prompt into Claude Code or Cursor. It’s <b>live, fast</b> and <b>SEO-ready</b>.</>,
    extra: <><small>PageSpeed, median across our templates</small><div className="hw-chips"><span>Mobile 98</span><span>Desktop 100</span><span>SEO 100</span></div><Link href="/docs" className="hw-rd">Read the docs →</Link></>,
    vis: <div className="rings"><Ring v={98} l="Mobile" /><Ring v={100} l="Desktop" /><Ring v={100} l="SEO" /></div>,
  },
  {
    icon: "✦", title: "Or let your agent do it all",
    text: <>Connect Lumen over <b>MCP</b>. One sentence in, finished site out.</>,
    vis: <Terminal />,
  },
];

export function HowItWorks() {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  useEffect(() => {
    const io = new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && setActive(Number((e.target as HTMLElement).dataset.i))), { rootMargin: "-45% 0px -45% 0px" });
    refs.current.forEach((r) => r && io.observe(r));
    return () => io.disconnect();
  }, []);
  const go = (i: number) => refs.current[i]?.scrollIntoView({ behavior: "smooth", block: "center" });
  return (
    <div className="hw">
      <div className="hw-l">
        <span className="pill glass hw-pill">◈ How it works</span>
        <h2 className="hw-h">One prompt from idea to interface</h2>
        <p className="hw-s">Everything you need to build a cinematic website with AI</p>
        <ol className="hw-list" style={{ ["--p" as string]: (active + 1) / STEPS.length }}>
          {STEPS.map((s, i) => (
            <li key={s.title} className={i === active ? "on" : ""}>
              <button onClick={() => go(i)}><i>{s.icon}</i><b>{s.title}</b></button>
              <div className="hw-b"><div><p>{s.text}</p>{s.extra}</div></div>
              <div className="hw-mv">{s.vis}</div>
            </li>
          ))}
        </ol>
      </div>
      <div className="hw-r">
        {STEPS.map((s, i) => (
          <div key={s.title} data-i={i} ref={(el) => { refs.current[i] = el; }} className={"hw-v " + (i === active ? "on" : "")}>{s.vis}</div>
        ))}
      </div>
    </div>
  );
}
