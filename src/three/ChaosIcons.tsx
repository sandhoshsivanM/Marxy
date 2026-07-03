import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html, Line } from "@react-three/drei";
import * as THREE from "three";
import { getState, useAppStore } from "@/lib/store";
import { integrations } from "@/lib/data/integrations";

const MOUTH = new THREE.Vector3(-8.2, 0, 0);

/**
 * Scene 1–3: scattered marketing icons drift together, golden attraction
 * lines appear, then everything is pulled into the funnel mouth.
 */
export function ChaosIcons() {
  const group = useRef<THREE.Group>(null);

  const icons = useMemo(
    () =>
      integrations.slice(0, 14).map((it) => {
        const a = Math.random() * Math.PI * 2;
        const r = 3.2 + Math.random() * 3.4;
        return {
          ...it,
          home: new THREE.Vector3(
            -8 + Math.cos(a) * r + (Math.random() - 0.5) * 3,
            Math.sin(a) * r * 0.7,
            (Math.random() - 0.5) * 4,
          ),
          phase: Math.random() * Math.PI * 2,
          ref: { pos: new THREE.Vector3() },
        };
      }),
    [],
  );

  const refs = useRef(icons.map(() => ({ el: null as THREE.Group | null })));

  // mount only during the attraction beats (drei <Html> ignores parent .visible,
  // so we conditionally render rather than toggle visibility)
  const scene = useAppStore((s) => s.scene);
  const active = scene >= 1 && scene <= 2;

  useFrame(() => {
    const { storyProgress, reducedMotion } = getState();
    if (!group.current) return;

    const intake = THREE.MathUtils.smoothstep(storyProgress, 0.12, 0.46); // pull-in factor
    const t = performance.now() * 0.001;

    icons.forEach((ic, i) => {
      const el = refs.current[i].el;
      if (!el) return;
      const drift = reducedMotion ? 0 : 1;
      const home = ic.home;
      const hx = home.x + Math.sin(t * 0.6 + ic.phase) * 0.5 * drift;
      const hy = home.y + Math.cos(t * 0.5 + ic.phase) * 0.5 * drift;
      const hz = home.z + Math.sin(t * 0.4 + ic.phase) * 0.4 * drift;
      el.position.set(
        THREE.MathUtils.lerp(hx, MOUTH.x, intake),
        THREE.MathUtils.lerp(hy, MOUTH.y, intake),
        THREE.MathUtils.lerp(hz, MOUTH.z, intake),
      );
      ic.ref.pos.copy(el.position);
    });
  });

  if (!active) return null;

  return (
    <group ref={group}>
      {icons.map((ic, i) => (
        <AttractionLine key={`l-${ic.name}`} target={ic.ref.pos} />
      ))}
      {icons.map((ic, i) => {
        const Icon = ic.icon;
        return (
          <group key={ic.name} ref={(el) => (refs.current[i].el = el)}>
            <Html center distanceFactor={11} pointerEvents="none" style={{ pointerEvents: "none" }}>
              <div
                className="flex h-11 w-11 select-none items-center justify-center rounded-2xl border border-white/60 bg-white/85 shadow-float backdrop-blur-sm"
                style={{ color: ic.hue }}
              >
                <Icon size={20} />
              </div>
            </Html>
          </group>
        );
      })}
    </group>
  );
}

/** A golden line from an icon toward the funnel mouth, brightening on approach. */
function AttractionLine({ target }: { target: THREE.Vector3 }) {
  const ref = useRef<any>(null);
  useFrame(() => {
    const { storyProgress } = getState();
    if (!ref.current) return;
    const show = storyProgress > 0.1 && storyProgress < 0.48;
    ref.current.visible = show;
    const mat = ref.current.material as THREE.Material & { opacity: number };
    if (mat) mat.opacity = show ? 0.25 : 0;
    // update the moving endpoint
    if (ref.current.geometry) {
      ref.current.geometry.setPositions([target.x, target.y, target.z, MOUTH.x, MOUTH.y, MOUTH.z]);
    }
  });
  return (
    <Line
      ref={ref}
      points={[
        [0, 0, 0],
        [MOUTH.x, MOUTH.y, MOUTH.z],
      ]}
      color="#E4B85F"
      lineWidth={1}
      transparent
      opacity={0}
    />
  );
}
