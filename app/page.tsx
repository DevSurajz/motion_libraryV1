import Link from "next/link";
import { CATEGORIES, LIBRARY, TOOLS, TOOL_KINDS } from "@/lib/data";
import { ArtCanvas, Card, Carousel, Reveal } from "@/components/visuals";
import { Faq } from "@/components/faq";
import { HowItWorks } from "@/components/how-it-works";
import { Features } from "@/components/features";
import { CtaPanel } from "@/components/cta-panel";
import { ShineButton } from "@/components/chrome";
import { Spotlight } from "@/components/chrome";
import { HeroLazy } from "@/components/hero-lazy";

export default function Home() {
  return (
    <>
      <Spotlight as="section" className="hero">
        <div className="hbg" />
        <HeroLazy />
        <div className="wrap">
          <span className="pill glass" style={{ fontSize: 13, color: "var(--t2)" }}>Trusted by 1,000+ creators</span>
          <h1><span className="ln"><span>Cinematic sites, <em>made easy</em></span></span></h1>
          <p className="sub">Copy a prompt, paste it into your AI, and launch a site that doesn’t look AI-made.</p>
          <div className="btns"><ShineButton href="/pricing">Get unlimited access</ShineButton></div>
        </div>
      </Spotlight>

      {CATEGORIES.map(([title, tag]) => (
        <section key={tag} className="sec" style={{ paddingBottom: 0 }}>
          <Reveal className="wrap hd">
            <div>
              {tag == "Templates" && (<><span className="pill glass" style={{ marginBottom: 16, fontSize: 13, color: "var(--t2)" }}>New templates arrive weekly</span><br /></>)}
              <h2>{title}</h2>
            </div>
            <Link href="/library">All {tag} →</Link>
          </Reveal>
          <Reveal>
            <Carousel>{LIBRARY.filter((l) => l.tag == tag).map((i) => <Card key={i.slug} item={i} />)}</Carousel>
          </Reveal>
        </section>
      ))}

      <section className="sec" id="tools">
        <div className="wrap">
          <Reveal className="hd"><h2>AI design <em>tools</em></h2><p className="sub">Live generators for the details that make a site feel handmade.</p></Reveal>
          <Reveal className="bento">
            {TOOLS.map(([n, g], i) => (
              <Link key={n} className="card" href="/library">
                <div style={{ display: "contents" }}><ArtCanvas s={i * 5 + 1} k={TOOL_KINDS[i]} animate w={i ? 320 : 640} h={i ? 200 : 420} /></div>
                {i % 4 == 1 && <span className="nb">NEW</span>}
                <div className="cm"><b>{n}</b><span className="tag">{g}</span></div>
              </Link>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="sec" id="how" style={{ paddingTop: 40 }}>
        <div className="wrap"><HowItWorks /></div>
      </section>

      <Features />

      <section className="sec" id="faq">
        <div className="wrap">
          <Reveal><Faq /></Reveal>
        </div>
      </section>

      <CtaPanel />
    </>
  );
}
