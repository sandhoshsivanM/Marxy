import { useFrame, useThree } from "@react-three/fiber";
import { useRef } from "react";
import * as THREE from "three";
import { getState } from "@/lib/store";
import { lerp } from "@/lib/utils";

/** Per-scene camera keyframes: [posX,posY,posZ, targetX,targetY,targetZ].
 *  Comfortable viewing distances throughout — a gentle push-in for the
 *  "inside" beats rather than pushing the camera through the glass. */
const KEYFRAMES: number[][] = [
  [1.2, 0.4, 13.6, 0.5, 0.0, 0], // 0 chaos — near-front; group is offset right for the hero split
  [3.2, 1.3, 11.0, 0.4, 0.0, 0], // 1 attraction
  [-3.4, 1.0, 9.6, -1.4, 0.0, 0], // 2 icons enter / gentle orbit
  [-5.4, 0.5, 6.0, 1.4, 0.0, 0], // 3 approach the funnel mouth
  [-3.2, 0.25, 4.6, 3.0, 0.0, 0], // 4 peer down the tunnel
  [1.6, 0.6, 6.2, 6.0, 0.1, 0], // 5 tunnel labels → approach revenue
  [6.2, 1.2, 10.2, 6.0, 0.2, 0], // 6 exit → revenue reveal
];

const tmpPos = new THREE.Vector3();
const tmpTarget = new THREE.Vector3();
const curTarget = new THREE.Vector3(0.5, 0.0, 0);

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

    // very gentle continuous orbit + soft pointer parallax (kept subtle to avoid queasiness)
    const t = performance.now() * 0.00015;
    const orbit = reducedMotion ? 0 : Math.sin(t) * 0.22 * (1 - storyProgress * 0.7);
    const px = reducedMotion ? 0 : pointer.x * 0.32;
    const py = reducedMotion ? 0 : -pointer.y * 0.2;

    tmpPos.x += orbit + px;
    tmpPos.y += py + (reducedMotion ? 0 : Math.sin(t * 1.4) * 0.06);

    // smooth, frame-rate-independent damping (a touch softer than before)
    const damp = initialized.current ? 1 - Math.pow(0.006, delta) : 1;
    camera.position.lerp(tmpPos, damp);
    curTarget.lerp(tmpTarget, damp);
    camera.lookAt(curTarget);
    initialized.current = true;
  });

  return null;
}
