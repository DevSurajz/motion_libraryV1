"use client";
import Link from "next/link";
import { useState } from "react";
import { Spotlight } from "@/components/chrome";
import { useUi } from "@/components/providers";

export function SignInCard() {
  const [mode, setMode] = useState<"in" | "up">("up");
  const [show, setShow] = useState(false);
  const ui = useUi();
  const up = mode === "up";
  return (
    <Spotlight className="acard">
      <div className="alg">✦ <b>lumen</b></div>
      <h1>{up ? <>Create <em>account</em></> : <>Welcome <em>back</em></>}</h1>
      <p className="asub">{up ? "Start shipping cinematic sites today." : "Sign in to your Lumen account."}</p>
      <button className="abtn ghost" type="button"><b className="g">G</b> Continue with Google</button>
      <div className="aor"><span>or with email</span></div>
      <form onSubmit={(e) => { e.preventDefault(); ui.toast(up ? "Account created" : "Signed in"); }}>
        {up && <label>Full name<input required placeholder="Your name" /></label>}
        <label>Email address<input required type="email" placeholder="you@email.com" /></label>
        <label><span className="lrow">Password{!up && <a href="#">Forgot password?</a>}</span>
          <span className="pw"><input required type={show ? "text" : "password"} placeholder="Your password" minLength={6} />
            <button type="button" onClick={() => setShow((s) => !s)} aria-label="Toggle password">{show ? "◡" : "◉"}</button></span>
        </label>
        <button className="abtn" type="submit">{up ? "Sign up" : "Sign in"}</button>
      </form>
      <p className="asw">{up ? "Already have an account? " : "New to Lumen? "}
        <button type="button" onClick={() => setMode(up ? "in" : "up")}>{up ? "Sign in" : "Create one"}</button></p>
      <p className="atos">By continuing you agree to our <Link href="/docs">Terms</Link>.</p>
    </Spotlight>
  );
}
