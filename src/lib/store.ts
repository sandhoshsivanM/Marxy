import { create } from "zustand";

/**
 * Shared store that bridges the DOM scroll world and the R3F 3D world.
 * The scroll driver writes here every frame; 3D components read it inside useFrame.
 */
interface AppState {
  /** Normalized progress (0..1) through the pinned 3D scroll-story region. */
  storyProgress: number;
  /** Active scene index 0..6 within the 7-scene story. */
  scene: number;
  /** Normalized pointer position, -1..1 on each axis, relative to viewport center. */
  pointer: { x: number; y: number };
  /** Live revenue figure driven by particle-beam impacts. */
  revenue: number;
  /** True once the 3D scene has finished its first meaningful render. */
  sceneReady: boolean;
  /** Global reduced-motion preference. */
  reducedMotion: boolean;

  setStoryProgress: (p: number) => void;
  setScene: (s: number) => void;
  setPointer: (x: number, y: number) => void;
  pulseRevenue: (amount: number) => void;
  setSceneReady: (v: boolean) => void;
  setReducedMotion: (v: boolean) => void;
}

export const TOTAL_SCENES = 7;
export const BASE_REVENUE = 18_420_000;

export const useAppStore = create<AppState>((set) => ({
  storyProgress: 0,
  scene: 0,
  pointer: { x: 0, y: 0 },
  revenue: BASE_REVENUE,
  sceneReady: false,
  reducedMotion: false,

  setStoryProgress: (p) =>
    set(() => {
      const scene = Math.min(TOTAL_SCENES - 1, Math.floor(p * TOTAL_SCENES));
      return { storyProgress: p, scene };
    }),
  setScene: (scene) => set({ scene }),
  setPointer: (x, y) => set({ pointer: { x, y } }),
  pulseRevenue: (amount) => set((s) => ({ revenue: s.revenue + amount })),
  setSceneReady: (sceneReady) => set({ sceneReady }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),
}));

/** Non-reactive getter for use inside animation frames (avoids re-renders). */
export const getState = useAppStore.getState;
