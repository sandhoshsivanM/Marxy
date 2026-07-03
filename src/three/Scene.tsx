import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer, AdaptiveDpr, Preload } from "@react-three/drei";
import * as THREE from "three";
import { getState } from "@/lib/store";
import { smoothstep, lerp } from "@/lib/utils";
import { EffectComposer, Bloom, SMAA, Vignette } from "@react-three/postprocessing";
import { CameraRig } from "./CameraRig";
import { Funnel } from "./Funnel";
import { ParticleStream } from "./ParticleStream";
import { ChaosIcons } from "./ChaosIcons";
import { useAppStore } from "@/lib/store";

/** Warm studio lighting rig built from Lightformers (no external HDRI needed). */
function StudioEnvironment() {
  return (
    <>
      <ambientLight intensity={0.5} />
      {/* soft warm key */}
      <directionalLight position={[6, 8, 6]} intensity={1.6} color="#FFE8C0" />
      {/* cool rim from behind */}
      <directionalLight position={[-8, 4, -6]} intensity={0.8} color="#FFF3E0" />
      <Environment resolution={256}>
        <group rotation={[0, 0, 0]}>
          <Lightformer form="rect" intensity={3} color="#FFF6E6" position={[0, 5, -6]} scale={[12, 6, 1]} />
          <Lightformer form="rect" intensity={2} color="#F6D9A8" position={[-6, 2, 4]} scale={[6, 8, 1]} rotation={[0, Math.PI / 3, 0]} />
          <Lightformer form="ring" intensity={2.5} color="#FFD98A" position={[8, 3, 2]} scale={5} />
          <Lightformer form="circle" intensity={1.4} color="#ffffff" position={[0, -4, 4]} scale={8} />
        </group>
      </Environment>
    </>
  );
}

/** Holds the funnel + particles + chaos icons and composes them for each beat:
 *  smaller and pushed to the right during the hero so the copy stays clean,
 *  easing to centred as the story begins. */
function ExperienceGroup() {
  const group = useRef<THREE.Group>(null);
  useFrame((_, delta) => {
    const { storyProgress } = getState();
    if (!group.current) return;
    const hero = 1 - smoothstep(storyProgress / 0.16); // 1 during hero → 0 once story starts
    const targetX = lerp(0, 5.6, hero);
    const targetScale = lerp(1, 0.66, hero);
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, targetX, 8, delta);
    const s = THREE.MathUtils.damp(group.current.scale.x, targetScale, 8, delta);
    group.current.scale.setScalar(s);
  });
  return (
    <group ref={group}>
      <Funnel />
      <ParticleStream />
      <ChaosIcons />
    </group>
  );
}

export function Scene() {
  const setSceneReady = useAppStore((s) => s.setSceneReady);
  useEffect(() => {
    const id = requestAnimationFrame(() => setSceneReady(true));
    return () => cancelAnimationFrame(id);
  }, [setSceneReady]);

  return (
    <Canvas
      camera={{ position: [1.2, 0.4, 13.6], fov: 42, near: 0.1, far: 100 }}
      dpr={[1, 1.6]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Suspense fallback={null}>
        <StudioEnvironment />
        <CameraRig />
        <ExperienceGroup />
        <EffectComposer multisampling={0} enableNormalPass={false}>
          <Bloom
            intensity={0.85}
            luminanceThreshold={0.62}
            luminanceSmoothing={0.35}
            mipmapBlur
            radius={0.6}
          />
          <SMAA />
          <Vignette eskil={false} offset={0.28} darkness={0.5} />
        </EffectComposer>
        <AdaptiveDpr pixelated={false} />
        <Preload all />
      </Suspense>
    </Canvas>
  );
}
