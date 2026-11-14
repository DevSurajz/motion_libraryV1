import Link from "next/link";
import { ShineButton, Spotlight } from "./chrome";
import { Button } from "./ui/button";

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
              <Button asChild variant="metal"><Link href="/library">Explore Library</Link></Button>
            </div>
          </div>
        </Spotlight>
      </div>
    </section>
  );
}
