import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { RoundedBox, Html } from "@react-three/drei";
import * as THREE from "three";
import { useAppStore, getState, BASE_REVENUE } from "@/lib/store";
import { formatCompact } from "@/lib/utils";

/** Glowing golden crystal card at the funnel's final stage. */
export function RevenueCrystal({ position = [6, 0, 0] as [number, number, number] }) {
  const group = useRef<THREE.Group>(null);
  const mat = useRef<THREE.MeshStandardMaterial>(null);
  const light = useRef<THREE.PointLight>(null);
  const revenue = useAppStore((s) => s.revenue);

  useFrame((_, delta) => {
    const { reducedMotion, storyProgress } = getState();
    const t = performance.now() * 0.001;
    if (group.current && !reducedMotion) {
      group.current.rotation.y = Math.sin(t * 0.4) * 0.15;
      group.current.position.y = position[1] + Math.sin(t * 0.8) * 0.08;
    }
    // glow intensifies as the story approaches the revenue reveal
    const reveal = THREE.MathUtils.smoothstep(storyProgress, 0.6, 1);
    const pulse = 0.6 + Math.sin(t * 2.2) * 0.15 + reveal * 1.6;
    if (mat.current) mat.current.emissiveIntensity = THREE.MathUtils.damp(mat.current.emissiveIntensity, pulse, 4, delta);
    if (light.current) light.current.intensity = THREE.MathUtils.damp(light.current.intensity, 4 + reveal * 10, 4, delta);
  });

  return (
    <group ref={group} position={position}>
      <pointLight ref={light} color="#F6C048" intensity={4} distance={14} />
      <RoundedBox args={[1.6, 2.1, 0.5]} radius={0.16} smoothness={6} rotation={[0, 0, 0]}>
        <meshStandardMaterial
          ref={mat}
          color="#C78628"
          emissive="#F2B23A"
          emissiveIntensity={1.2}
          metalness={0.9}
          roughness={0.18}
        />
      </RoundedBox>

      <Html
        center
        transform
        distanceFactor={6}
        position={[0, 0, 0.3]}
        pointerEvents="none"
        style={{ pointerEvents: "none" }}
      >
        <div
          style={{ width: 190 }}
          className="select-none rounded-2xl border border-white/40 bg-white/25 px-4 py-4 text-center backdrop-blur-md"
        >
          <div className="text-[0.55rem] font-semibold uppercase tracking-[0.22em] text-amber-900/80">
            Revenue Generated
          </div>
          <div className="mt-1 text-2xl font-bold text-amber-950">
            ${formatCompact(revenue)}
          </div>
          <div className="mt-1 text-[0.55rem] font-medium text-amber-900/70">
            +${Math.round(revenue - BASE_REVENUE).toLocaleString()} this session
          </div>
        </div>
      </Html>
    </group>
  );
}
