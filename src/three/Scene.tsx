import { Suspense, useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { Environment, Lightformer, AdaptiveDpr, Preload } from "@react-three/drei";
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

export function Scene() {
  const setSceneReady = useAppStore((s) => s.setSceneReady);
  useEffect(() => {
    const id = requestAnimationFrame(() => setSceneReady(true));
    return () => cancelAnimationFrame(id);
  }, [setSceneReady]);

  return (
    <Canvas
      camera={{ position: [4.6, 1.2, 11.5], fov: 42, near: 0.1, far: 100 }}
      dpr={[1, 2]}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
      style={{ position: "absolute", inset: 0 }}
    >
      <Suspense fallback={null}>
        <StudioEnvironment />
        <CameraRig />
        <group scale={1}>
          <Funnel />
          <ParticleStream />
          <ChaosIcons />
        </group>
        <EffectComposer multisampling={0} enableNormalPass={false}>
          <Bloom
            intensity={1.15}
            luminanceThreshold={0.55}
            luminanceSmoothing={0.3}
            mipmapBlur
            radius={0.7}
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
