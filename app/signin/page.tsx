import type { Metadata } from "next";
import { SignInCard } from "./signin-card";
import { Spotlight } from "@/components/chrome";

export const metadata: Metadata = { title: "Sign in — Lumen", description: "Sign in or create your Lumen account to unlock every cinematic prompt." };

export default function SignInPage() {
  return (
    <main className="auth">
      <Spotlight className="auth-l">
        <div className="orb o1" /><div className="orb o2" /><div className="orb o3" />
        <div className="auth-q">
          <span className="pill glass" style={{ fontSize: 13, color: "var(--t2)" }}>✦ Lumen</span>
          <blockquote>“Design is not just what it looks like. <em>Design is how it makes you feel.</em>”</blockquote>
          <p>Join 1,000+ creators shipping cinematic sites that don’t look AI-made.</p>
        </div>
      </Spotlight>
      <div className="auth-r"><SignInCard /></div>
    </main>
  );
}
