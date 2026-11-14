"use client";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

const FRAG = `precision mediump float;uniform vec2 r,m;uniform float t;void main(){vec2 q=(gl_FragCoord.xy*2.-r)/r.y,p=q-(m-.5)*.4;for(int i=1;i<5;i++){float f=float(i);p+=.4/f*sin(p.yx*f*1.5+t*.35+f*1.7);}float d=length(q*vec2(.8,1.)-vec2(0.,.05)),n=.5+.5*sin(p.x*1.3+p.y*.9+t*.2);float k=.5+.5*sin(p.x*2.6+p.y*1.9+t*.25)*cos(p.y*1.4-p.x*.8);float s=smoothstep(.2,.9,k);vec3 col=vec3(.015)+vec3(.8,.79,.77)*s*s;col*=.25+.75*smoothstep(-1.3,1.3,q.x*.8+q.y*.3+(m.x-.5)*1.2);col+=vec3(0.,.04,.1)*s*(.5+.5*sin(p.x*1.5+t*.3));col*=smoothstep(2.8,.5,length(q*vec2(.45,1.)));gl_FragColor=vec4(col,1.);}`;
const VERT = `void main(){gl_Position=vec4(position.xy,0.,1.);}`;

function Plane({ reduced }: { reduced: boolean }) {
  const { gl } = useThree();
  const mouse = useRef({ x: 0.5, y: 0.5, sx: 0.5, sy: 0.5 });
  const uniforms = useMemo(() => ({ r: { value: new THREE.Vector2() }, m: { value: new THREE.Vector2(0.5, 0.5) }, t: { value: reduced ? 4 : 0 } }), [reduced]);
  useEffect(() => {
    const mv = (e: PointerEvent) => { mouse.current.x = e.clientX / innerWidth; mouse.current.y = 1 - e.clientY / innerHeight; };
    addEventListener("pointermove", mv);
    return () => removeEventListener("pointermove", mv);
  }, []);
  useFrame((state) => {
    const m = mouse.current;
    m.sx += (m.x - m.sx) * 0.05; m.sy += (m.y - m.sy) * 0.05;
    gl.getDrawingBufferSize(uniforms.r.value);
    uniforms.m.value.set(m.sx, m.sy);
    if (!reduced) uniforms.t.value = state.clock.elapsedTime;
  });
  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial vertexShader={VERT} fragmentShader={FRAG} uniforms={uniforms} depthTest={false} />
    </mesh>
  );
}

export default function HeroShader() {
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => setReduced(matchMedia("(prefers-reduced-motion:reduce)").matches), []);
  return (
    <div id="gl" style={{ opacity: ready ? 1 : 0 }}>
      <Canvas dpr={0.6} gl={{ antialias: false, powerPreference: "low-power" }} frameloop={reduced ? "demand" : "always"} onCreated={() => setReady(true)}>
        <Plane reduced={reduced} />
      </Canvas>
    </div>
  );
}
