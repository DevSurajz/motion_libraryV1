import Link from "next/link";
import { Reveal } from "./visuals";

const SEO = ["sitemap.xml", "robots.txt", "canonical", "meta description", "robots meta", "Open Graph", "Twitter card", "JSON-LD", "web manifest", "favicons + touch icon", "lang attribute", "semantic HTML"];
const AIS = ["React", "Vue", "Svelte", "Astro", "Nuxt", "HTML", "WordPress", "Shopify", "Lovable", "Manus"];

function Ring({ v, size = 76 }: { v: number; size?: number }) {
  const r = size / 2 - 4, c = 2 * Math.PI * r;
  return (
    <div className="fr" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} className="fr-bg" />
        <circle cx={size / 2} cy={size / 2} r={r} className="fr-fg" strokeDasharray={c} strokeDashoffset={c * (1 - v / 100)} />
      </svg>
      <b>{v}</b>
    </div>
  );
}

function F({ icon, title, text, children, badge }: { icon: string; title: string; text: React.ReactNode; children?: React.ReactNode; badge?: string }) {
  return (
    <div className="fb">
      <div className="fb-l">
        <span className="fb-i">{icon}</span>
        {badge && <span className="fb-bd">✦ {badge}</span>}
        <div><h3>{title}</h3><p>{text}</p></div>
      </div>
      {children && <div className="fb-r">{children}</div>}
    </div>
  );
}

export function Features() {
  return (
    <section className="sec" id="features">
      <div className="wrap">
        <Reveal><span className="pill glass" style={{ fontSize: 12, color: "var(--t2)" }}>Before you ask</span>
          <h2 className="fh">Fast, findable, <em>and yours to rebuild</em></h2></Reveal>
        <Reveal className="fg">
          <F icon="◔" title="Optimized for performance" text="Google PageSpeed Insights · mobile on a Moto G Power, Slow 4G">
            <div className="fr2"><div><Ring v={98} /><small>Mobile median</small></div><div><Ring v={100} /><small>Desktop median</small></div></div>
            <div className="fst">{[[98, "Mobile"], [100, "Desktop"], [100, "Accessibility"], [100, "Best practices"]].map(([n, l]) => <div key={l}><b>{n}</b><small>{l}</small></div>)}</div>
          </F>
          <F icon="⌕" title="100 SEO, out of the box" text={<>PageSpeed SEO 100 on <strong>every template</strong>, mobile and desktop.</>}>
            <Ring v={100} size={64} />
            <div className="fchips">{SEO.map((s) => <span key={s}>✓ {s}</span>)}</div>
          </F>
          <F icon="▯" title="Designed for every screen" text={<>Every template has <strong>its own laptop, tablet and mobile layout.</strong></>}>
            <div className="fdev"><div className="fd-l"><i /></div><div className="fd-p"><i /></div></div>
          </F>
          <F icon="</>" badge="Full Stack" title="Source code with AI orchestration" text={<>A real Next.js project, with the rules and docs your coding agent reads <strong>before it touches anything.</strong></>}>
            <div className="ftree">
              <div>▢ lumen/</div><div className="t1">▢ .claude/<em>agent harness</em></div><div className="t2">▤ settings.json<em>3 hooks</em></div>
              <div className="t2">▢ skills/<em>16 skills</em></div><div className="t3">▢ optimize-load/</div><div className="t3 fade">▢ optimize-performance/</div>
              <footer>Built on our starter<br /><span>15+ skills · 10+ commands · 4 subagents · 50+ docs notes</span></footer>
            </div>
          </F>
          <F icon="◈" title="Ships as Next.js. Rebuilds wherever your AI writes code." text="">
            <div className="fsrc"><small>Source</small><span className="on">Next.js</span><small>Rebuild with your AI</small>
              <div className="fchips">{AIS.map((a) => <span key={a}>{a}</span>)}<span className="dash">+ anything</span></div></div>
          </F>
          <F icon="▦" title="Check the numbers yourself" text={<>Open any template: its <strong>Performance</strong> tab shows how smoothly it scrolls, its <strong>SEO</strong> tab the full PageSpeed reports.</>}>
            <Link href="/library" className="ctp-o" style={{ alignSelf: "start" }}>Browse templates</Link>
          </F>
        </Reveal>
      </div>
    </section>
  );
}
