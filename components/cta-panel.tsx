import Link from "next/link";
import { ShineButton, Spotlight } from "./chrome";

export function CtaPanel() {
  return (
    <section className="ctp-s">
      <div className="wrap">
        <Spotlight className="ctp">
          <div className="ctp-beam" />
          <div className="ctp-in">
            <h2>Make something <em>unforgettable</em></h2>
            <p>The fastest growing library of cinematic prompts for AI design workflows.</p>
            <div className="ctp-b">
              <ShineButton href="/pricing">See plans</ShineButton>
              <Link href="/library" className="ctp-o">Explore Library</Link>
            </div>
          </div>
        </Spotlight>
      </div>
    </section>
  );
}
