import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

/**
 * Soft glowing accent that trails the pointer. The native cursor stays visible
 * (more approachable / less disorienting); this only adds a premium glow that
 * reacts on interactive elements.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);

  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.5 });
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.5 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const move = (e: PointerEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
      const target = e.target as HTMLElement;
      setHovering(!!target.closest("a, button, [data-cursor='hover']"));
    };
    window.addEventListener("pointermove", move, { passive: true });
    return () => window.removeEventListener("pointermove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed left-0 top-0 z-[100] -translate-x-1/2 -translate-y-1/2 rounded-full mix-blend-multiply"
      style={{ x: ringX, y: ringY }}
      animate={{
        width: hovering ? 46 : 26,
        height: hovering ? 46 : 26,
        opacity: hovering ? 0.55 : 0.3,
        backgroundColor: hovering ? "rgba(199,134,40,0.14)" : "rgba(199,134,40,0.05)",
        boxShadow: hovering
          ? "0 0 26px 3px rgba(199,134,40,0.3)"
          : "0 0 16px 2px rgba(199,134,40,0.14)",
      }}
      transition={{ type: "spring", stiffness: 300, damping: 24 }}
    />
  );
}
