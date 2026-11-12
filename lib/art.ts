// Procedural 2D canvas thumbnails, ported 1:1 from the original page.
export function drawArt(c: HTMLCanvasElement, s: number, k: number, t: number) {
  const x = c.getContext("2d");
  if (!x) return;
  const w = c.width, h = c.height, H = (s * 47) % 360, S = Math.sin;
  x.globalCompositeOperation = "source-over";
  x.fillStyle = "#060606";
  x.fillRect(0, 0, w, h);
  x.globalCompositeOperation = "lighter";
  const blob = (n: number, a: number) => {
    for (let i = 0; i < n; i++) {
      const px = w * (0.5 + 0.38 * S(t * 0.6 + i * 1.9 + s)), py = h * (0.5 + 0.38 * S(t * 0.5 + i * 2.7));
      const g = x.createRadialGradient(px, py, 0, px, py, w * 0.5);
      g.addColorStop(0, `hsla(${H + i * 55},85%,60%,${a})`);
      g.addColorStop(1, "transparent");
      x.fillStyle = g;
      x.fillRect(0, 0, w, h);
    }
  };
  if (k == 0) blob(4, 0.75);
  if (k == 1) {
    blob(2, 0.45);
    x.globalCompositeOperation = "source-over";
    const cy = h * 0.5 + S(t) * h * 0.03, r = h * 0.3;
    const g = x.createRadialGradient(w / 2 - r * 0.3, cy - r * 0.35, r * 0.05, w / 2, cy, r);
    g.addColorStop(0, "rgba(255,255,255,.95)");
    g.addColorStop(0.35, `hsla(${H},80%,70%,.4)`);
    g.addColorStop(1, `hsla(${H + 80},90%,40%,.2)`);
    x.fillStyle = g;
    x.beginPath(); x.arc(w / 2, cy, r, 0, 7); x.fill();
    x.strokeStyle = "rgba(255,255,255,.3)"; x.stroke();
  }
  if (k == 2) {
    x.lineWidth = 1.2;
    for (let i = 0; i < 16; i++) {
      x.beginPath();
      for (let j = 0; j <= 40; j++) {
        const X = (j / 40) * w, Y = h * (0.3 + i * 0.035) + S(j * 0.22 + i * 0.4 + t) * h * 0.06;
        if (j) x.lineTo(X, Y); else x.moveTo(X, Y);
      }
      x.strokeStyle = `hsla(${H + i * 6},80%,65%,${0.15 + i * 0.04})`;
      x.stroke();
    }
  }
  if (k == 3) {
    blob(1, 0.5);
    for (let n = 0; n < 900; n++) {
      const a = (n >> 1) * 0.12 + (n & 1) * 3.14 + t * 0.15, r = (n / 900) * w * 0.42;
      x.fillStyle = `hsla(${H + n / 9},90%,${60 + n / 25}%,${1 - n / 1000})`;
      x.fillRect(w / 2 + Math.cos(a) * r, h / 2 + Math.sin(a) * r * 0.55, w / 200 + 0.8, w / 200 + 0.8);
    }
  }
  if (k == 4) {
    const g = x.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, "rgba(20,10,50,.9)"); g.addColorStop(1, "rgba(60,15,60,.4)");
    x.fillStyle = g; x.fillRect(0, 0, w, h);
    for (let p = 0; p < 9; p++) {
      x.save(); x.translate(w / 2, h * 0.65); x.rotate((p / 9) * 6.28 + S(t * 0.3) * 0.15);
      x.beginPath(); x.ellipse(0, -h * 0.2, h * 0.07, h * 0.2, 0, 0, 7);
      x.fillStyle = `hsla(${300 + p * 8},80%,70%,.3)`; x.fill(); x.restore();
    }
  }
}
