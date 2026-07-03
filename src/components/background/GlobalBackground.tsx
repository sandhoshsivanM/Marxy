import { useMemo, type CSSProperties } from "react";
import { integrations } from "@/lib/data/integrations";

/**
 * Four-layer living background behind all UI. All motion is pure CSS
 * (transform/opacity) so it runs on the compositor and never competes with
 * the 3D render loop for the main thread — keeping scroll perfectly smooth.
 *  1. cream gradient wash
 *  2. huge blurred amber blobs (slow drift)
 *  3. tiny glowing particles (twinkle)
 *  4. drifting marketing-ecosystem brand icons (recognisable, subtle)
 */
export function GlobalBackground() {
  const particles = useMemo(
    () =>
      Array.from({ length: 22 }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: 1.5 + Math.random() * 2.5,
        delay: -Math.random() * 12,
        duration: 9 + Math.random() * 10,
      })),
    [],
  );

  const drifters = useMemo(
    () =>
      integrations.map((it, i) => {
        const rng = (n: number) => (Math.random() - 0.5) * n;
        return {
          ...it,
          i,
          left: 4 + Math.random() * 92,
          top: 6 + Math.random() * 86,
          duration: 46 + Math.random() * 34,
          delay: -Math.random() * 40,
          size: 30 + Math.random() * 16,
          vars: {
            "--x1": `${rng(24)}vw`,
            "--y1": `${rng(20)}vh`,
            "--r1": `${rng(30)}deg`,
            "--x2": `${rng(30)}vw`,
            "--y2": `${rng(26)}vh`,
            "--r2": `${rng(40)}deg`,
            "--x3": `${rng(20)}vw`,
            "--y3": `${rng(22)}vh`,
            "--r3": `${rng(24)}deg`,
          } as CSSProperties,
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
            "radial-gradient(125% 90% at 12% 0%, #FFFDF8 0%, #FDFBF7 42%, #FAF4E9 100%)",
        }}
      />

      {/* Layer 2 — huge blurred amber blobs */}
      <div
        className="absolute -left-[12%] -top-[10%] h-[46vw] w-[46vw] rounded-full will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(214,159,60,0.22), transparent 62%)",
          filter: "blur(70px)",
          animation: "bg-blob 36s ease-in-out infinite",
        }}
      />
      <div
        className="absolute -right-[14%] top-[26%] h-[52vw] w-[52vw] rounded-full will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(246,230,197,0.5), transparent 60%)",
          filter: "blur(80px)",
          animation: "bg-blob 46s ease-in-out infinite reverse",
        }}
      />
      <div
        className="absolute -bottom-[16%] left-[28%] h-[40vw] w-[40vw] rounded-full will-change-transform"
        style={{
          background: "radial-gradient(circle, rgba(199,134,40,0.16), transparent 64%)",
          filter: "blur(72px)",
          animation: "bg-blob 54s ease-in-out infinite",
        }}
      />

      {/* Layer 3 — glowing particles */}
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute rounded-full will-change-transform"
          style={{
            left: `${p.left}%`,
            top: `${p.top}%`,
            width: p.size,
            height: p.size,
            background: "#D69F3C",
            boxShadow: "0 0 8px 1px rgba(214,159,60,0.55)",
            opacity: 0,
            animation: `bg-twinkle ${p.duration}s ease-in-out ${p.delay}s infinite`,
          }}
        />
      ))}

      {/* Layer 4 — drifting marketing brand icons */}
      {drifters.map((d) => {
        const Icon = d.icon;
        return (
          <div
            key={d.name}
            className="absolute will-change-transform"
            style={{
              left: `${d.left}%`,
              top: `${d.top}%`,
              color: d.hue,
              opacity: 0.1,
              filter: "blur(0.5px)",
              animation: `bg-drift ${d.duration}s ease-in-out ${d.delay}s infinite`,
              ...d.vars,
            }}
          >
            <Icon size={d.size} />
          </div>
        );
      })}

      {/* subtle vignette */}
      <div
        className="absolute inset-0"
        style={{ background: "radial-gradient(120% 100% at 50% 38%, transparent 62%, rgba(31,27,25,0.045) 100%)" }}
      />
    </div>
  );
}
