import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { getState } from "@/lib/store";
import { lerp } from "@/lib/utils";

/** Per-scene camera keyframes: [posX,posY,posZ, targetX,targetY,targetZ]. */
const KEYFRAMES: number[][] = [
  [4.6, 1.2, 11.5, 1.4, 0.1, 0], // 0 chaos — hero framing (funnel right-of-text)
  [3.0, 1.7, 9.5, 0.2, 0.1, 0], // 1 attraction
  [-4.2, 1.4, 7.8, -2.0, 0.0, 0], // 2 icons enter / orbit
  [-6.6, 0.3, 2.4, 2.5, 0.0, 0], // 3 fly inside
  [-1.2, 0.05, 1.5, 4.0, 0.0, 0], // 4 inside tunnel
  [2.6, 0.5, 3.4, 6.0, 0.2, 0], // 5 tunnel labels → approach revenue
  [6.6, 1.5, 9.5, 6.0, 0.3, 0], // 6 exit → revenue reveal
];

const tmpPos = new THREE.Vector3();
const tmpTarget = new THREE.Vector3();
const curTarget = new THREE.Vector3(1.4, 0.1, 0);

function sample(p: number, out: THREE.Vector3, offset: number) {
  const n = KEYFRAMES.length - 1;
  const scaled = Math.max(0, Math.min(1, p)) * n;
  const i = Math.min(n - 1, Math.floor(scaled));
  const f = scaled - i;
  // smootherstep
  const t = f * f * f * (f * (f * 6 - 15) + 10);
  const a = KEYFRAMES[i];
  const b = KEYFRAMES[i + 1];
  out.set(
    lerp(a[offset], b[offset], t),
    lerp(a[offset + 1], b[offset + 1], t),
    lerp(a[offset + 2], b[offset + 2], t),
  );
}

export function CameraRig() {
  const { camera } = useThree();
  const initialized = useRef(false);

  useFrame((_, delta) => {
    const { storyProgress, pointer, reducedMotion } = getState();

    sample(storyProgress, tmpPos, 0);
    sample(storyProgress, tmpTarget, 3);

    // gentle continuous orbit + pointer parallax
    const t = performance.now() * 0.0002;
    const orbit = reducedMotion ? 0 : Math.sin(t) * 0.5 * (1 - storyProgress * 0.6);
    const px = reducedMotion ? 0 : pointer.x * 0.8;
    const py = reducedMotion ? 0 : -pointer.y * 0.5;

    tmpPos.x += orbit + px;
    tmpPos.y += py + (reducedMotion ? 0 : Math.sin(t * 1.7) * 0.15);

    const damp = initialized.current ? 1 - Math.pow(0.0015, delta) : 1;
    camera.position.lerp(tmpPos, damp);
    curTarget.lerp(tmpTarget, damp);
    camera.lookAt(curTarget);
    initialized.current = true;
  });

  return null;
}
