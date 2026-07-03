import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Html, Float } from "@react-three/drei";
import * as THREE from "three";
import { getState } from "@/lib/store";
import { FUNNEL_STAGES, TUNNEL_LABELS } from "@/lib/constants";
import { RevenueCrystal } from "./RevenueCrystal";

interface Stage {
  x: number;
  radius: number;
  length: number;
}

// four interlocking glass cylinders, decreasing radius (the funnel)
const STAGES: Stage[] = [
  { x: -6, radius: 1.75, length: 2.6 },
  { x: -3, radius: 1.4, length: 2.6 },
  { x: 0, radius: 1.08, length: 2.6 },
  { x: 3, radius: 0.8, length: 2.6 },
];

function GlassCylinder({ stage, label, value, i }: { stage: Stage; label: string; value: string; i: number }) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const { reducedMotion } = getState();
    if (mesh.current && !reducedMotion) {
      const t = performance.now() * 0.001;
      mesh.current.rotation.x = Math.PI / 2 + Math.sin(t * 0.5 + i) * 0.04;
    }
  });

  return (
    <group position={[stage.x, 0, 0]}>
      {/* cylinder axis along X (rotate the Y-axis cylinder onto X) */}
      <mesh ref={mesh} rotation={[Math.PI / 2, 0, Math.PI / 2]}>
        <cylinderGeometry args={[stage.radius, stage.radius, stage.length, 64, 1, true]} />
        <MeshTransmissionMaterial
          transmissionSampler
          samples={6}
          resolution={256}
          transmission={1}
          roughness={0.14}
          thickness={0.8}
          ior={1.42}
          chromaticAberration={0.05}
          anisotropy={0.25}
          distortion={0.22}
          distortionScale={0.3}
          temporalDistortion={0.08}
          color="#FFF7E8"
          attenuationColor="#E8B75F"
          attenuationDistance={2.4}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* soft rim ring at each mouth for the "rounded edge" read */}
      <mesh position={[stage.length / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[stage.radius, 0.03, 16, 64]} />
        <meshStandardMaterial color="#C78628" emissive="#E4B85F" emissiveIntensity={0.5} metalness={0.6} roughness={0.3} />
      </mesh>

      {/* floating stage label */}
      <Html
        center
        position={[0, stage.radius + 0.55, 0]}
        distanceFactor={9}
        pointerEvents="none"
        style={{ pointerEvents: "none" }}
      >
        <div className="select-none whitespace-nowrap rounded-full border border-white/50 bg-white/35 px-3 py-1.5 text-center backdrop-blur-md">
          <div className="text-[0.5rem] font-semibold uppercase tracking-[0.18em] text-amber-800">
            {label}
          </div>
          <div className="text-sm font-bold text-ink">{value}</div>
        </div>
      </Html>
    </group>
  );
}

export function Funnel() {
  const group = useRef<THREE.Group>(null);

  useFrame(() => {
    const { pointer, reducedMotion, storyProgress } = getState();
    if (!group.current) return;
    const target = reducedMotion ? 0 : pointer.x * 0.05;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, target, 0.05);
    // labels fade as we plunge inside the tunnel (scenes 3–5)
    group.current.visible = true;
    void storyProgress;
  });

  return (
    <group ref={group}>
      {STAGES.map((s, i) => (
        <Float
          key={i}
          speed={1.2}
          rotationIntensity={0.15}
          floatIntensity={0.4}
          floatingRange={[-0.06, 0.06]}
        >
          <GlassCylinder stage={s} label={FUNNEL_STAGES[i].label} value={FUNNEL_STAGES[i].value} i={i} />
        </Float>
      ))}

      <RevenueCrystal position={[6, 0, 0]} />

      {/* labels that surface inside the tunnel (scene 5) */}
      <TunnelLabels />
    </group>
  );
}

function TunnelLabels() {
  const group = useRef<THREE.Group>(null);
  useFrame(() => {
    const { storyProgress } = getState();
    if (!group.current) return;
    // visible only mid-story (inside tunnel)
    const vis = storyProgress > 0.42 && storyProgress < 0.78;
    group.current.visible = vis;
  });

  const positions: [number, number, number][] = [
    [-4, 0.2, 0.3],
    [-1.5, -0.2, 0.2],
    [1, 0.15, 0.25],
    [3.5, -0.1, 0.2],
  ];

  return (
    <group ref={group}>
      {TUNNEL_LABELS.map((l, i) => (
        <Html key={l} center position={positions[i]} distanceFactor={7} pointerEvents="none" style={{ pointerEvents: "none" }}>
          <div className="select-none whitespace-nowrap rounded-xl border border-amber-400/40 bg-white/40 px-3 py-1.5 text-xs font-semibold text-amber-800 backdrop-blur-md shadow-glow-sm">
            {l}
          </div>
        </Html>
      ))}
    </group>
  );
}
