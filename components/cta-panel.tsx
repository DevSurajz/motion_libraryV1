"use client";
import Link from "next/link";
import { useEffect, useRef } from "react";

const VERT = `attribute vec2 aPos;varying vec2 vUv;void main(){vUv=aPos*.5+.5;gl_Position=vec4(aPos,0.,1.);}`;

const FRAG = `
precision highp float;
varying vec2 vUv;
uniform vec2 uRes, uMouse, uVel;
uniform float uTime, uHover;
uniform vec4 uRipples[10];

float hash12(vec2 p){
  vec3 p3 = fract(vec3(p.xyx) * .1031);
  p3 += dot(p3, p3.yzx + 33.33);
  return fract((p3.x + p3.y) * p3.z);
}

float noise(vec2 p){
  vec2 i = floor(p), f = fract(p);
  f = f * f * (3. - 2. * f);
  return mix(
    mix(hash12(i), hash12(i + vec2(1., 0.)), f.x),
    mix(hash12(i + vec2(0., 1.)), hash12(i + vec2(1., 1.)), f.x),
    f.y
  );
}

void main(){
  vec2 uv = vUv;
  float aspect = uRes.x / max(uRes.y, 1.);
  vec2 p = vec2((uv.x - .5) * aspect, uv.y - .5);
  vec2 m = vec2((uMouse.x - .5) * aspect, uMouse.y - .5);

  vec2 disp = vec2(0.);
  float caustic = 0.;
  for(int i = 0; i < 10; i++){
    vec4 rp = uRipples[i];
    float age = uTime - rp.z;
    if(age > 0. && age < 3.2 && rp.w > .001){
      vec2 rPos = vec2((rp.x - .5) * aspect, rp.y - .5);
      vec2 dlt = p - rPos;
      float dist = length(dlt) + .0001;
      float ring = dist - age * .42;
      float env = exp(-dist * 4.2) * exp(-age * 1.4) * smoothstep(.34, 0., abs(ring));
      float w = sin(ring * 52. - age * 10.5);
      disp += (dlt / dist) * w * env * rp.w * .048;
      caustic += cos(ring * 52. - age * 10.5) * env * rp.w * .17;
    }
  }

  vec2 dm = p - m;
  float mDist = length(dm);
  float hZone = exp(-mDist * mDist * 4.) * uHover;
  float w1 = sin(p.x * 13. + p.y * 9. - uTime * 2.5) * cos(p.y * 11. - p.x * 7. + uTime * 2.);
  float w2 = sin(mDist * 28. - uTime * 5.5) * hZone;
  disp += vec2(
    w1 * (.0025 + .014 * uHover) + w2 * .018 + uVel.x * hZone * .045,
    w1 * (.002 + .012 * uHover) - w2 * .018 + uVel.y * hZone * .045
  );

  vec2 wuv = uv + disp;
  float center = .355 + wuv.y * .32 + .007 * sin(wuv.y * 4.5 + uTime * .45);
  float d = wuv.x - center + (noise(wuv * vec2(7., 5.) + uTime * .22) - .5) * (.01 + .02 * uHover);

  float rightEdge = smoothstep(.062, -.012, d);
  float leftSlope = smoothstep(-.235, .005, d);
  float mainBeam = rightEdge * pow(leftSlope, 1.35);
  float crest = exp(-pow((d + .004) / .035, 2.)) * smoothstep(.055, -.005, d);
  float fold2 = exp(-pow((d + .135) / .058, 2.)) * .34;
  float valley = 1. - .28 * exp(-pow((d + .072) / .028, 2.));
  float endsBoost = .78 + .32 * pow(abs(wuv.y - .48) * 1.95, 1.25);

  float beam = (mainBeam * .72 + crest * .42 + fold2) * valley * endsBoost;
  beam += caustic * smoothstep(-.28, .08, d) * smoothstep(.14, -.02, d);
  beam = clamp(beam, 0., 1.);

  float g1 = hash12(gl_FragCoord.xy + fract(uTime * .73) * 100.);
  float g2 = hash12(gl_FragCoord.xy * .5 + 17.3);
  float grain = (g1 * .7 + g2 * .3) - .5;
  float grainMask = pow(beam, .48) * (1.15 - .35 * beam);
  float lum = beam + grain * grainMask * .25;

  float vig = smoothstep(0., .14, uv.x) * smoothstep(1., .82, uv.x);
  lum = clamp(lum * vig, 0., 1.);
  gl_FragColor = vec4(vec3(lum) * vec3(.97, .98, 1.), 1.);
}
`;

export function CtaPanel() {
  const boxRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current, box = boxRef.current;
    if (!canvas || !box) return;
    const gl = canvas.getContext("webgl", { antialias: false, alpha: false, powerPreference: "low-power" });
    if (!gl) return;

    const compile = (type: number, src: string) => {
      const sh = gl.createShader(type);
      if (!sh) return null;
      gl.shaderSource(sh, src);
      gl.compileShader(sh);
      return gl.getShaderParameter(sh, gl.COMPILE_STATUS) ? sh : null;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT), fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;
    const prog = gl.createProgram()!;
    gl.attachShader(prog, vs); gl.attachShader(prog, fs); gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(prog, "uRes");
    const uTime = gl.getUniformLocation(prog, "uTime");
    const uMouse = gl.getUniformLocation(prog, "uMouse");
    const uVel = gl.getUniformLocation(prog, "uVel");
    const uHover = gl.getUniformLocation(prog, "uHover");
    const uRipples = gl.getUniformLocation(prog, "uRipples[0]");

    const ripples = new Float32Array(40);
    let rIdx = 0, lastT = 0, mx = 0.5, my = 0.5, smx = 0.5, smy = 0.5, vx = 0, vy = 0, tHover = 0, cHover = 0, vis = true, raf = 0;
    const t0 = performance.now();

    const resize = () => {
      const r = box.getBoundingClientRect(), dpr = Math.min(window.devicePixelRatio || 1, 1.75);
      const w = Math.max(1, Math.floor(r.width * dpr)), h = Math.max(1, Math.floor(r.height * dpr));
      if (canvas.width !== w || canvas.height !== h) { canvas.width = w; canvas.height = h; gl.viewport(0, 0, w, h); }
    };
    resize();
    const ro = new ResizeObserver(resize); ro.observe(box);
    const io = new IntersectionObserver(([e]) => { vis = e.isIntersecting; }, { rootMargin: "100px" }); io.observe(box);

    const push = (x: number, y: number, t: number, s: number) => {
      const b = rIdx * 4;
      ripples[b] = x; ripples[b + 1] = y; ripples[b + 2] = t; ripples[b + 3] = s;
      rIdx = (rIdx + 1) % 10;
    };

    const onMove = (e: PointerEvent) => {
      const r = box.getBoundingClientRect();
      const nx = (e.clientX - r.left) / Math.max(r.width, 1), ny = 1 - (e.clientY - r.top) / Math.max(r.height, 1);
      const dx = nx - mx, dy = ny - my;
      mx = nx; my = ny; vx += dx * 0.65; vy += dy * 0.65; tHover = 1;
      const t = (performance.now() - t0) / 1000, spd = Math.hypot(dx, dy);
      if (t - lastT > 0.04 && spd > 0.003) { push(nx, ny, t, Math.min(1.3, 0.45 + spd * 14)); lastT = t; }
    };
    const onEnter = (e: PointerEvent) => {
      const r = box.getBoundingClientRect();
      mx = smx = (e.clientX - r.left) / Math.max(r.width, 1);
      my = smy = 1 - (e.clientY - r.top) / Math.max(r.height, 1);
      tHover = 1;
      const t = (performance.now() - t0) / 1000;
      push(mx, my, t, 0.9); lastT = t;
    };
    const onLeave = () => { tHover = 0; };

    box.addEventListener("pointermove", onMove);
    box.addEventListener("pointerenter", onEnter);
    box.addEventListener("pointerleave", onLeave);

    const loop = () => {
      if (vis) {
        const t = (performance.now() - t0) / 1000;
        smx += (mx - smx) * 0.12; smy += (my - smy) * 0.12;
        vx *= 0.88; vy *= 0.88; cHover += (tHover - cHover) * 0.08;
        gl.uniform2f(uRes, canvas.width, canvas.height);
        gl.uniform1f(uTime, t);
        gl.uniform2f(uMouse, smx, smy);
        gl.uniform2f(uVel, vx, vy);
        gl.uniform1f(uHover, cHover);
        gl.uniform4fv(uRipples, ripples);
        gl.drawArrays(gl.TRIANGLES, 0, 6);
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      box.removeEventListener("pointermove", onMove);
      box.removeEventListener("pointerenter", onEnter);
      box.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  return (
    <section className="ctp-s">
      <div className="wrap">
        <div ref={boxRef} className="ctp">
          <div className="ctp-beam" aria-hidden="true" />
          <canvas ref={canvasRef} className="ctp-canvas" aria-hidden="true" />
          <div className="ctp-in">
            <h2>Every layer, <em>in one place</em></h2>
            <p>The fastest growing library empowering AI design workflows.</p>
            <div className="ctp-b">
              <Link href="/pricing" className="ctp-gl">See plans</Link>
              <Link href="/library" className="ctp-gl">Explore Library</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
