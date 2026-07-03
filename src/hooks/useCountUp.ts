import { useEffect, useRef, useState } from "react";

interface Options {
  duration?: number;
  decimals?: number;
  start?: number;
  /** begin counting only when true */
  active?: boolean;
}

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));

/** Animated count-up that respects reduced motion and only fires when active. */
export function useCountUp(target: number, { duration = 1800, decimals = 0, start = 0, active = true }: Options = {}) {
  const [value, setValue] = useState(start);
  const raf = useRef<number>();
  const done = useRef(false);

  useEffect(() => {
    if (!active || done.current) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      setValue(target);
      done.current = true;
      return;
    }

    const t0 = performance.now();
    const tick = (now: number) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = easeOutExpo(p);
      setValue(start + (target - start) * eased);
      if (p < 1) {
        raf.current = requestAnimationFrame(tick);
      } else {
        done.current = true;
      }
    };
    raf.current = requestAnimationFrame(tick);
    return () => {
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, [target, duration, start, active]);

  return decimals > 0 ? Number(value.toFixed(decimals)) : Math.round(value);
}
