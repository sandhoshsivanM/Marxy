import { Suspense, lazy, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAppStore } from "@/lib/store";
import { clamp, smoothstep } from "@/lib/utils";
import { Hero } from "./Hero";

const Scene = lazy(() => import("@/three/Scene").then((m) => ({ default: m.Scene })));

const SCENES = [
  { title: "Marketing Chaos", body: "Every channel screaming. Nothing connected. Spend with no system." },
  { title: "Attraction", body: "Signals align. The system starts pulling demand together." },
  { title: "Into the Funnel", body: "Scattered attention becomes structured, trackable pipeline." },
  { title: "Inside the Machine", body: "We fly you into the engine that turns interest into intent." },
  { title: "The Operating System", body: "CRM · AI · Automation · Analytics — working as one." },
  { title: "Convergence", body: "Thousands of journeys focus into a single revenue beam." },
  { title: "Revenue", body: "Predictable. Compounding. Measurable. $18.42M and counting." },
];

export function Experience() {
  const rootRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLDivElement>(null);
  const setStoryProgress = useAppStore((s) => s.setStoryProgress);

  useEffect(() => {
    const el = rootRef.current;
    if (!el) return;
    let frame = 0;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const p = clamp(-rect.top / Math.max(1, total));
      setStoryProgress(p);
      // fade the 3D canvas out as the story completes so the DOM sections take over
      if (canvasRef.current) {
        const fade = 1 - smoothstep((p - 0.9) / 0.1);
        canvasRef.current.style.opacity = String(fade);
        canvasRef.current.style.visibility = fade < 0.01 ? "hidden" : "visible";
      }
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [setStoryProgress]);

  return (
    <section ref={rootRef} id="experience" className="relative">
      {/* persistent 3D canvas — sits above the 2D background, below DOM content */}
      <div
        ref={canvasRef}
        className="pointer-events-none fixed inset-0"
        style={{ zIndex: -5 }}
        aria-hidden
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </div>

      {/* Scene 0 — hero overlay */}
      <Hero />

      {/* Scroll-story track: tall spacer giving scroll distance + sticky captions */}
      <div className="relative h-[400vh]">
        <div className="sticky top-0 flex h-screen items-end justify-center overflow-hidden pb-16">
          <StoryCaption />
          <SceneProgress />
        </div>
      </div>
    </section>
  );
}

function StoryCaption() {
  const scene = useAppStore((s) => s.scene);
  const data = SCENES[scene] ?? SCENES[0];
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={scene}
        initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        exit={{ opacity: 0, y: -24, filter: "blur(6px)" }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="glass mx-auto max-w-lg rounded-glass px-8 py-7 text-center shadow-float"
      >
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-amber-700">
          Scene {String(scene + 1).padStart(2, "0")} / 07
        </span>
        <h3 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{data.title}</h3>
        <p className="mt-3 text-pretty text-muted">{data.body}</p>
      </motion.div>
    </AnimatePresence>
  );
}

function SceneProgress() {
  const scene = useAppStore((s) => s.scene);
  return (
    <div className="absolute right-6 top-1/2 hidden -translate-y-1/2 flex-col gap-2.5 md:flex">
      {SCENES.map((_, i) => (
        <div
          key={i}
          className="h-6 w-1 rounded-full transition-all duration-500"
          style={{
            background: i === scene ? "#C78628" : "rgba(31,27,25,0.12)",
            transform: i === scene ? "scaleY(1.4)" : "scaleY(1)",
          }}
        />
      ))}
    </div>
  );
}
