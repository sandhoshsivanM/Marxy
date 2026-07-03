import { useEffect } from "react";
import Lenis from "lenis";
import { useAppStore } from "@/lib/store";

/**
 * Installs Lenis smooth scroll, drives the global RAF loop, and publishes
 * pointer position to the store for the 3D camera parallax.
 * The per-section story progress is measured separately in ScrollStory.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: !reduced,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    });

    let raf = 0;
    const loop = (time: number) => {
      lenis.raf(time);
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    // Expose for anchor-link handling.
    (window as unknown as { __lenis?: Lenis }).__lenis = lenis;

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      delete (window as unknown as { __lenis?: Lenis }).__lenis;
    };
  }, []);

  // Global pointer → store (normalised -1..1).
  useEffect(() => {
    const setPointer = useAppStore.getState().setPointer;
    let frame = 0;
    const onMove = (e: PointerEvent) => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        setPointer(
          (e.clientX / window.innerWidth) * 2 - 1,
          (e.clientY / window.innerHeight) * 2 - 1,
        );
        frame = 0;
      });
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return <>{children}</>;
}

/** Scroll to an anchor honouring Lenis. */
export function scrollToAnchor(href: string) {
  const lenis = (window as unknown as { __lenis?: Lenis }).__lenis;
  const el = document.querySelector(href);
  if (el && lenis) {
    lenis.scrollTo(el as HTMLElement, { offset: -80, duration: 1.4 });
  } else if (el) {
    (el as HTMLElement).scrollIntoView({ behavior: "smooth" });
  }
}
