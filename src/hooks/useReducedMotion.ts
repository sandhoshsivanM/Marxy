import { useEffect, useState } from "react";
import { useAppStore } from "@/lib/store";

export function useReducedMotion() {
  const [reduced, setReduced] = useState(false);
  const setStore = useAppStore((s) => s.setReducedMotion);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => {
      setReduced(mq.matches);
      setStore(mq.matches);
    };
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [setStore]);

  return reduced;
}
