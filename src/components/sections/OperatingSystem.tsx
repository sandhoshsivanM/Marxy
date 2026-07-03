import { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GradientSerif } from "@/components/shared/GradientSerif";
import { osNodes, osEdges, type OsNode } from "@/lib/data/roadmap";

/* ------------------------------------------------------------------ */
/* Layout constants                                                    */
/* ------------------------------------------------------------------ */

const VIEW_W = 1000;
const VIEW_H = 460;

// inner padding so chips never touch the SVG edge
const PAD_X_MIN = 60;
const PAD_X_MAX = 940;
const PAD_Y_MIN = 60;
const PAD_Y_MAX = 400;

const CHIP_W = 128;
const CHIP_H = 46;

type Point = { x: number; y: number };

/** Map a node's normalized (0..1) position to padded SVG coordinates. */
function toSvg(node: OsNode): Point {
  return {
    x: PAD_X_MIN + node.x * (PAD_X_MAX - PAD_X_MIN),
    y: PAD_Y_MIN + node.y * (PAD_Y_MAX - PAD_Y_MIN),
  };
}

/** Build a smooth cubic bezier between two points with a gentle horizontal ease. */
function edgePath(from: Point, to: Point): string {
  const dx = to.x - from.x;
  // control points bend horizontally so lines flow like a circuit board
  const c1x = from.x + dx * 0.45;
  const c2x = to.x - dx * 0.45;
  return `M ${from.x} ${from.y} C ${c1x} ${from.y}, ${c2x} ${to.y}, ${to.x} ${to.y}`;
}

/* ------------------------------------------------------------------ */
/* Component                                                           */
/* ------------------------------------------------------------------ */

export function OperatingSystem() {
  const nodeMap = useMemo(() => {
    const map = new Map<string, OsNode>();
    for (const n of osNodes) map.set(n.id, n);
    return map;
  }, []);

  const points = useMemo(() => {
    const map = new Map<string, Point>();
    for (const n of osNodes) map.set(n.id, toSvg(n));
    return map;
  }, []);

  const edges = useMemo(() => {
    return osEdges
      .map(([from, to], i) => {
        const a = points.get(from);
        const b = points.get(to);
        if (!a || !b) return null;
        return {
          id: `edge-${from}-${to}`,
          from,
          to,
          d: edgePath(a, b),
          // vary particle timing per edge for an organic, alive feel
          dur: 2.6 + (i % 4) * 0.42,
          begin1: (i * 0.31).toFixed(2),
          begin2: (i * 0.31 + 1.4).toFixed(2),
        };
      })
      .filter((e): e is NonNullable<typeof e> => e !== null);
  }, [points]);

  const firstId = osNodes[0]?.id;
  const lastId = osNodes[osNodes.length - 1]?.id;

  const legend = [
    "Signal never leaks",
    "AI routes every lead",
    "Everything measured to revenue",
  ];

  return (
    <section
      id="operating-system"
      className="relative z-10 px-4 py-28 sm:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="How It Connects"
          title={
            <>
              One connected <GradientSerif>Operating System.</GradientSerif>
            </>
          }
          description="Every module hands the next a clean signal — traffic becomes a lead, a lead becomes a conversation, a conversation becomes revenue. Nothing leaks between the cracks."
        />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="glass rounded-glass shadow-float mt-14 p-4 sm:p-8"
        >
          <svg
            viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
            className="h-auto w-full"
            role="img"
            aria-label="Marksy's Operating System module graph: traffic flows through landing page, CRM, AI, email, WhatsApp, sales and analytics into revenue."
          >
            <defs>
              {/* amber gradient for the Revenue node */}
              <linearGradient id="os-amber" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#E4B85F" />
                <stop offset="55%" stopColor="#C78628" />
                <stop offset="100%" stopColor="#8f5f1c" />
              </linearGradient>

              {/* faint gradient stroke for edges */}
              <linearGradient id="os-edge" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#C78628" stopOpacity="0.15" />
                <stop offset="50%" stopColor="#C78628" stopOpacity="0.35" />
                <stop offset="100%" stopColor="#C78628" stopOpacity="0.15" />
              </linearGradient>

              {/* soft glow for particles */}
              <filter id="os-glow" x="-120%" y="-120%" width="340%" height="340%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>

              {/* soft drop shadow for chips */}
              <filter
                id="os-chip-shadow"
                x="-40%"
                y="-40%"
                width="180%"
                height="180%"
              >
                <feDropShadow
                  dx="0"
                  dy="6"
                  stdDeviation="10"
                  floodColor="#C78628"
                  floodOpacity="0.16"
                />
              </filter>

              {/* stronger glow for the Revenue chip */}
              <filter
                id="os-revenue-glow"
                x="-60%"
                y="-60%"
                width="220%"
                height="220%"
              >
                <feDropShadow
                  dx="0"
                  dy="4"
                  stdDeviation="14"
                  floodColor="#C78628"
                  floodOpacity="0.45"
                />
              </filter>
            </defs>

            {/* ---------------------------------------------------------- */}
            {/* 1. EDGES (behind everything)                                */}
            {/* ---------------------------------------------------------- */}
            <g fill="none" strokeLinecap="round">
              {edges.map((edge) => (
                <motion.path
                  key={edge.id}
                  id={edge.id}
                  d={edge.d}
                  stroke="url(#os-edge)"
                  strokeWidth={2}
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 1.3,
                    ease: "easeInOut",
                    delay: 0.2,
                  }}
                />
              ))}
            </g>

            {/* ---------------------------------------------------------- */}
            {/* 2. GOLDEN PARTICLES (SMIL, continuous, zero JS)             */}
            {/* ---------------------------------------------------------- */}
            <g filter="url(#os-glow)">
              {edges.map((edge) => (
                <g key={`p-${edge.id}`} fill="#E4B85F">
                  <circle r={3.4} opacity={0.95}>
                    <animateMotion
                      dur={`${edge.dur}s`}
                      begin={`${edge.begin1}s`}
                      repeatCount="indefinite"
                      rotate="auto"
                      keyPoints="0;1"
                      keyTimes="0;1"
                      calcMode="linear"
                    >
                      <mpath href={`#${edge.id}`} />
                    </animateMotion>
                    <animate
                      attributeName="opacity"
                      values="0;1;1;0"
                      keyTimes="0;0.12;0.85;1"
                      dur={`${edge.dur}s`}
                      begin={`${edge.begin1}s`}
                      repeatCount="indefinite"
                    />
                  </circle>

                  <circle r={2.4} opacity={0.75}>
                    <animateMotion
                      dur={`${edge.dur}s`}
                      begin={`${edge.begin2}s`}
                      repeatCount="indefinite"
                      rotate="auto"
                      keyPoints="0;1"
                      keyTimes="0;1"
                      calcMode="linear"
                    >
                      <mpath href={`#${edge.id}`} />
                    </animateMotion>
                    <animate
                      attributeName="opacity"
                      values="0;0.85;0.85;0"
                      keyTimes="0;0.12;0.85;1"
                      dur={`${edge.dur}s`}
                      begin={`${edge.begin2}s`}
                      repeatCount="indefinite"
                    />
                  </circle>
                </g>
              ))}
            </g>

            {/* ---------------------------------------------------------- */}
            {/* 3. NODES (above the lines so edges tuck behind chips)       */}
            {/* ---------------------------------------------------------- */}
            {osNodes.map((node, i) => {
              const p = points.get(node.id);
              if (!p) return null;

              const isRevenue = node.id === lastId;
              const isTraffic = node.id === firstId;

              const x = p.x - CHIP_W / 2;
              const y = p.y - CHIP_H / 2;

              return (
                <motion.g
                  key={node.id}
                  initial={{ opacity: 0, scale: 0.85 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{
                    duration: 0.5,
                    delay: 0.35 + i * 0.06,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ transformBox: "fill-box", transformOrigin: "center" }}
                >
                  {/* gentle idle float */}
                  <motion.g
                    animate={{ y: [0, i % 2 === 0 ? -4 : 4, 0] }}
                    transition={{
                      duration: 5 + (i % 3),
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: i * 0.18,
                    }}
                    style={{ transformBox: "fill-box" }}
                  >
                    <rect
                      x={x}
                      y={y}
                      width={CHIP_W}
                      height={CHIP_H}
                      rx={CHIP_H / 2}
                      ry={CHIP_H / 2}
                      fill={isRevenue ? "url(#os-amber)" : "rgba(255,255,255,0.9)"}
                      stroke={isRevenue ? "#8f5f1c" : "#C78628"}
                      strokeOpacity={isRevenue ? 0.9 : isTraffic ? 0.55 : 0.28}
                      strokeWidth={isTraffic || isRevenue ? 1.5 : 1}
                      filter={
                        isRevenue ? "url(#os-revenue-glow)" : "url(#os-chip-shadow)"
                      }
                    />

                    {/* subtle top highlight for glassy chips */}
                    {!isRevenue && (
                      <rect
                        x={x + 3}
                        y={y + 3}
                        width={CHIP_W - 6}
                        height={CHIP_H / 2 - 3}
                        rx={CHIP_H / 2 - 4}
                        ry={CHIP_H / 2 - 4}
                        fill="#ffffff"
                        opacity={0.35}
                      />
                    )}

                    <text
                      x={p.x}
                      y={p.y}
                      textAnchor="middle"
                      dominantBaseline="central"
                      fontSize={15}
                      fontWeight={isRevenue ? 700 : 600}
                      fill={isRevenue ? "#ffffff" : "#1F1B19"}
                      style={{ fontFamily: "inherit", letterSpacing: "0.01em" }}
                    >
                      {node.label}
                    </text>
                  </motion.g>
                </motion.g>
              );
            })}
          </svg>
        </motion.div>

        {/* Legend row */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 flex flex-wrap items-center justify-center gap-3"
        >
          {legend.map((item) => (
            <div
              key={item}
              className={cn(
                "glass hairline rounded-full px-4 py-2",
                "flex items-center gap-2 text-sm text-ink/80 shadow-glow-sm"
              )}
            >
              <span
                aria-hidden
                className="h-2 w-2 rounded-full bg-amber shadow-glow-sm"
              />
              <span className="font-medium">{item}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
