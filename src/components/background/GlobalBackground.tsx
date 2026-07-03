import { useMemo } from "react";
import { motion } from "framer-motion";
import { integrations } from "@/lib/data/integrations";

/**
 * Four-layer living background that sits behind all UI:
 *  1. cream gradient wash
 *  2. huge blurred amber blobs (slow drift)
 *  3. tiny glowing particles
 *  4. drifting marketing-ecosystem icons (8% opacity, 2px blur, non-repeating paths)
 */
export function GlobalBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 40 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1 + Math.random() * 2.5,
        delay: Math.random() * 6,
        duration: 6 + Math.random() * 8,
      })),
    [],
  );

  const drifters = useMemo(
    () =>
      integrations.map((it, i) => {
        const startX = Math.random() * 100;
        const startY = Math.random() * 100;
        return {
          ...it,
          i,
          startX,
          startY,
          // three non-repeating waypoints
          dx1: (Math.random() - 0.5) * 40,
          dy1: (Math.random() - 0.5) * 40,
          dx2: (Math.random() - 0.5) * 44,
          dy2: (Math.random() - 0.5) * 44,
          rot: (Math.random() - 0.5) * 60,
          duration: 34 + Math.random() * 30,
          delay: Math.random() * 8,
          scale: 0.7 + Math.random() * 0.8,
        };
      }),
    [],
  );

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* Layer 1 — cream gradient */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(120% 90% at 15% 5%, #FFFDF8 0%, #FDFBF7 40%, #FBF6EC 100%)",
        }}
      />

      {/* Layer 2 — huge blurred amber blobs */}
      <motion.div
        className="absolute -left-[10%] top-[-8%] h-[46vw] w-[46vw] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(214,159,60,0.28), transparent 62%)", filter: "blur(60px)" }}
        animate={{ x: [0, 60, -20, 0], y: [0, 40, 80, 0], scale: [1, 1.1, 0.95, 1] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute right-[-12%] top-[24%] h-[52vw] w-[52vw] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(246,230,197,0.55), transparent 60%)", filter: "blur(70px)" }}
        animate={{ x: [0, -50, 30, 0], y: [0, 60, -30, 0], scale: [1, 1.08, 1, 1] }}
        transition={{ duration: 40, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-[-14%] left-[30%] h-[40vw] w-[40vw] rounded-full"
        style={{ background: "radial-gradient(circle, rgba(199,134,40,0.2), transparent 64%)", filter: "blur(66px)" }}
        animate={{ x: [0, 40, -40, 0], y: [0, -30, 20, 0], scale: [1, 1.12, 0.96, 1] }}
        transition={{ duration: 46, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Layer 3 — glowing particles */}
      {particles.map((p) => (
        <motion.span
          key={p.id}
          className="absolute rounded-full bg-amber-400"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            boxShadow: "0 0 8px 1px rgba(214,159,60,0.6)",
          }}
          animate={{ y: [0, -30, 0], opacity: [0, 0.8, 0] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }}
        />
      ))}

      {/* Layer 4 — drifting marketing icons */}
      {drifters.map((d) => (
        <motion.div
          key={d.name}
          className="absolute flex h-11 w-11 items-center justify-center rounded-2xl text-[0.6rem] font-bold"
          style={{
            left: `${d.startX}%`,
            top: `${d.startY}%`,
            color: d.hue,
            border: `1px solid ${d.hue}22`,
            background: "rgba(255,255,255,0.5)",
            filter: "blur(2px)",
            opacity: 0.08,
          }}
          animate={{
            x: [0, `${d.dx1}vw`, `${d.dx2}vw`, 0],
            y: [0, `${d.dy1}vh`, `${d.dy2}vh`, 0],
            rotate: [0, d.rot, -d.rot, 0],
            scale: [d.scale, d.scale * 1.1, d.scale * 0.95, d.scale],
          }}
          transition={{ duration: d.duration, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
        >
          {d.short}
        </motion.div>
      ))}

      {/* subtle grain / vignette */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 100% at 50% 40%, transparent 60%, rgba(31,27,25,0.05) 100%)" }}
      />
    </div>
  );
}
