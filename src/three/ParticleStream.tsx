import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { getState, useAppStore } from "@/lib/store";

const COUNT = 3200;
const X_START = -8.5;
const X_END = 7.2;

/** Radial soft-glow sprite generated on-canvas (no network asset). */
function makeSprite() {
  const size = 64;
  const c = document.createElement("canvas");
  c.width = c.height = size;
  const ctx = c.getContext("2d")!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, "rgba(255,244,214,1)");
  g.addColorStop(0.3, "rgba(240,190,64,0.9)");
  g.addColorStop(0.7, "rgba(199,134,40,0.25)");
  g.addColorStop(1, "rgba(199,134,40,0)");
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const tex = new THREE.CanvasTexture(c);
  tex.needsUpdate = true;
  return tex;
}

/**
 * Golden particles that flow along +X through the funnel centres.
 * Speed, density and glow ramp toward the final stage where they converge
 * into a tight beam; crossing the revenue crystal ticks the dashboard.
 */
export function ParticleStream() {
  const points = useRef<THREE.Points>(null);
  const sprite = useMemo(makeSprite, []);
  const lastPulse = useRef(0);
  const pulseRevenue = useAppStore((s) => s.pulseRevenue);

  const { positions, sizes, speeds, radii, angles } = useMemo(() => {
    const positions = new Float32Array(COUNT * 3);
    const sizes = new Float32Array(COUNT);
    const speeds = new Float32Array(COUNT);
    const radii = new Float32Array(COUNT);
    const angles = new Float32Array(COUNT);
    for (let i = 0; i < COUNT; i++) {
      const x = X_START + Math.random() * (X_END - X_START);
      const a = Math.random() * Math.PI * 2;
      const r = Math.random() * radiusAt(x);
      positions[i * 3] = x;
      positions[i * 3 + 1] = Math.sin(a) * r;
      positions[i * 3 + 2] = Math.cos(a) * r;
      sizes[i] = 0.05 + Math.random() * 0.12;
      speeds[i] = 0.9 + Math.random() * 0.8;
      radii[i] = r / Math.max(0.001, radiusAt(x));
      angles[i] = a;
    }
    return { positions, sizes, speeds, radii, angles };
  }, []);

  useFrame((_, delta) => {
    const pts = points.current;
    if (!pts) return;
    const { reducedMotion, storyProgress } = getState();
    const dt = Math.min(0.05, delta) * (reducedMotion ? 0.25 : 1);
    const pos = pts.geometry.attributes.position.array as Float32Array;

    let crossed = 0;
    for (let i = 0; i < COUNT; i++) {
      let x = pos[i * 3];
      // speed increases as particles progress (funnel converges → faster)
      const prog = (x - X_START) / (X_END - X_START);
      const speed = speeds[i] * (1.4 + prog * 4.5);
      x += speed * dt;

      if (x > X_END) {
        x = X_START + Math.random() * 0.6;
        crossed++;
      }

      const maxR = radiusAt(x);
      const a = angles[i] + dt * 0.6;
      angles[i] = a;
      // converge to a beam past the last cylinder
      const beam = x > 3.4 ? THREE.MathUtils.clamp((x - 3.4) / 3.2, 0, 1) : 0;
      const r = radii[i] * maxR * (1 - beam * 0.92);

      pos[i * 3] = x;
      pos[i * 3 + 1] = Math.sin(a) * r;
      pos[i * 3 + 2] = Math.cos(a) * r;
    }
    pts.geometry.attributes.position.needsUpdate = true;

    // brighten with story progress; extra glow when inside/at revenue
    const m = pts.material as THREE.PointsMaterial;
    m.opacity = 0.65 + storyProgress * 0.3;

    // tick revenue on beam impact (throttled)
    const now = performance.now();
    if (crossed > 0 && now - lastPulse.current > 260 && !reducedMotion) {
      lastPulse.current = now;
      pulseRevenue(120 + Math.round(Math.random() * 680));
    }
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} count={COUNT} />
        <bufferAttribute attach="attributes-size" args={[sizes, 1]} count={COUNT} />
      </bufferGeometry>
      <pointsMaterial
        map={sprite}
        size={0.16}
        sizeAttenuation
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        color="#F4C24A"
        opacity={0.8}
      />
    </points>
  );
}

/** Funnel inner radius profile along X (matches the cylinder stages). */
function radiusAt(x: number) {
  if (x < -6) return 1.5;
  if (x < -3) return THREE.MathUtils.lerp(1.5, 1.2, (x + 6) / 3);
  if (x < 0) return THREE.MathUtils.lerp(1.2, 0.9, (x + 3) / 3);
  if (x < 3) return THREE.MathUtils.lerp(0.9, 0.62, x / 3);
  return Math.max(0.08, THREE.MathUtils.lerp(0.62, 0.12, (x - 3) / 4));
}
