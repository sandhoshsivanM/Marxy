import { useEffect, useRef } from "react";

/**
 * 2D gold particle stream for the funnel hero (no WebGL).
 * Particles spread wide at the traffic-source feed (left) and converge into a
 * tight revenue beam (right). Starts flowing only once `active` is true.
 */

const COUNT = 280;

function makeSprite() {
  const size = 48;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,244,214,1)");
  g.addColorStop(0.3, "rgba(240,190,64,0.9)");
  g.addColorStop(0.7, "rgba(199,134,40,0.22)");
  g.addColorStop(1, "rgba(199,134,40,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  return c;
}

interface P {
  t: number;
  lane: number;
  sp: number;
  sz: number;
  ph: number;
}

export function FunnelParticles({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const activeRef = useRef(active);
  activeRef.current = active;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce =
      typeof window.matchMedia === "function" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const sprite = makeSprite();
    let W = 0;
    let H = 0;
    const dpr = Math.min(2, window.devicePixelRatio || 1);

    const resize = () => {
      W = canvas.clientWidth;
      H = canvas.clientHeight;
      canvas.width = Math.max(1, Math.floor(W * dpr));
      canvas.height = Math.max(1, Math.floor(H * dpr));
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const parts: P[] = Array.from({ length: COUNT }, () => ({
      t: Math.random(),
      lane: Math.random() * 2 - 1,
      sp: 0.04 + Math.random() * 0.05,
      sz: 4 + Math.random() * 6,
      ph: Math.random() * Math.PI * 2,
    }));

    let raf = 0;
    let last = performance.now();

    const frame = (now: number) => {
      raf = requestAnimationFrame(frame);
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const on = activeRef.current && !reduce;

      ctx.clearRect(0, 0, W, H);
      ctx.globalCompositeOperation = "lighter";
      const cy = H * 0.5;

      for (const p of parts) {
        if (on) {
          p.t += p.sp * dt * (1.1 + p.t * 3.2);
          if (p.t > 1) p.t -= 1 + Math.random() * 0.03;
          if (p.t < 0) p.t = 0;
        }
        const t = p.t < 0 ? 0 : p.t > 1 ? 1 : p.t;
        const x = t * W;
        // wide at the mouth → converging beam at revenue
        const spread = H * 0.42 * (1 - t * 0.92);
        const wobble = on ? Math.sin(now * 0.001 + p.ph) * 6 * (1 - t) : 0;
        const y = cy + p.lane * spread + wobble;
        const fadeIn = Math.sin(Math.min(1, t * 3) * (Math.PI / 2));
        const a = reduce ? 0.32 : 0.3 + 0.5 * fadeIn;
        const s = p.sz * (1 - t * 0.35);
        ctx.globalAlpha = a;
        ctx.drawImage(sprite, x - s / 2, y - s / 2, s, s);
      }
      ctx.globalAlpha = 1;
    };
    raf = requestAnimationFrame(frame);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden
    />
  );
}
