import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { MeshTransmissionMaterial, Html, Float } from "@react-three/drei";
import * as THREE from "three";
import { getState, useAppStore } from "@/lib/store";
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

function GlassCylinder({
  stage,
  label,
  value,
  i,
  showLabel,
}: {
  stage: Stage;
  label: string;
  value: string;
  i: number;
  showLabel: boolean;
}) {
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
          samples={4}
          resolution={128}
          transmission={1}
          roughness={0.1}
          thickness={0.45}
          ior={1.35}
          chromaticAberration={0.025}
          anisotropy={0.15}
          distortion={0.08}
          distortionScale={0.2}
          temporalDistortion={0.02}
          color="#FFFFFF"
          attenuationColor="#F3DDB0"
          attenuationDistance={6}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* soft rim ring at each mouth for the "rounded edge" read */}
      <mesh position={[stage.length / 2, 0, 0]} rotation={[0, Math.PI / 2, 0]}>
        <torusGeometry args={[stage.radius, 0.03, 16, 64]} />
        <meshStandardMaterial color="#C78628" emissive="#E4B85F" emissiveIntensity={0.5} metalness={0.6} roughness={0.3} />
      </mesh>

      {/* floating stage label — mounted only when the scene calls for it (Html ignores parent .visible) */}
      {showLabel && (
        <Html
          center
          position={[0, stage.radius + 0.55, 0]}
          distanceFactor={9}
          pointerEvents="none"
          style={{ pointerEvents: "none" }}
        >
          <div className="select-none whitespace-nowrap rounded-full border border-white/60 bg-white/70 px-3 py-1.5 text-center shadow-float backdrop-blur-md">
            <div className="text-[0.5rem] font-semibold uppercase tracking-[0.18em] text-amber-800">{label}</div>
            <div className="text-sm font-bold text-ink">{value}</div>
          </div>
        </Html>
      )}
    </group>
  );
}

export function Funnel() {
  const group = useRef<THREE.Group>(null);
  const scene = useAppStore((s) => s.scene);
  const showStageLabels = scene >= 1 && scene <= 5;
  const showTunnel = scene >= 3 && scene <= 5;

  useFrame(() => {
    const { pointer, reducedMotion } = getState();
    if (!group.current) return;
    const target = reducedMotion ? 0 : pointer.x * 0.05;
    group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, target, 0.05);
  });

  return (
    <group ref={group}>
      {STAGES.map((s, i) => (
        <Float
          key={i}
          speed={1.2}
          rotationIntensity={0.12}
          floatIntensity={0.35}
          floatingRange={[-0.05, 0.05]}
        >
          <GlassCylinder
            stage={s}
            label={FUNNEL_STAGES[i].label}
            value={FUNNEL_STAGES[i].value}
            i={i}
            showLabel={showStageLabels}
          />
        </Float>
      ))}

      <RevenueCrystal position={[6, 0, 0]} />

      {showTunnel && <TunnelLabels />}
    </group>
  );
}

function TunnelLabels() {
  const positions: [number, number, number][] = [
    [-4, 0.2, 0.3],
    [-1.5, -0.2, 0.2],
    [1, 0.15, 0.25],
    [3.5, -0.1, 0.2],
  ];

  return (
    <group>
      {TUNNEL_LABELS.map((l, i) => (
        <Html key={l} center position={positions[i]} distanceFactor={7} pointerEvents="none" style={{ pointerEvents: "none" }}>
          <div className="select-none whitespace-nowrap rounded-xl border border-amber-400/40 bg-white/50 px-3 py-1.5 text-xs font-semibold text-amber-800 backdrop-blur-md shadow-glow-sm">
            {l}
          </div>
        </Html>
      ))}
    </group>
  );
}
