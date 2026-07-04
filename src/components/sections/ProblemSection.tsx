import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GradientSerif } from "@/components/shared/GradientSerif";
import { cn } from "@/lib/utils";
import { MousePointerClick, UserPlus, Database, Handshake, Repeat, Sparkles, AlertTriangle } from "lucide-react";
import type { LucideIcon } from "lucide-react";

interface Stage {
  label: string;
  icon: LucideIcon;
  issue: string;
}

const STAGES: Stage[] = [
  { label: "Traffic", icon: MousePointerClick, issue: "You pay for clicks that vanish — no capture, no follow-up." },
  { label: "Leads", icon: UserPlus, issue: "Leads land in inboxes and spreadsheets, then go cold." },
  { label: "CRM", icon: Database, issue: "No single source of truth. Deals fall through the cracks." },
  { label: "Sales", icon: Handshake, issue: "Slow, manual follow-up loses the deal to whoever replied first." },
  { label: "Retention", icon: Repeat, issue: "One-time buyers never return. You rebuy the same customer." },
];

export function ProblemSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-120px" });
  const [repaired, setRepaired] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);

  // auto-repair a beat after the broken system is revealed
  useEffect(() => {
    if (!inView) return;
    const t = setTimeout(() => setRepaired(true), 2200);
    return () => clearTimeout(t);
  }, [inView]);

  return (
    <section id="problem" className="relative z-10 px-4 py-28 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="The Problem"
          title={
            <>
              A broken journey leaks <GradientSerif>revenue</GradientSerif> at every step.
            </>
          }
          description="Most businesses don't have a marketing problem — they have a disconnected system. Marksy repairs the whole chain."
        />

        <div ref={ref} className="relative mt-14">
          {/* status pill */}
          <div className="mb-8 flex justify-center">
            <motion.button
              type="button"
              onClick={() => setRepaired((v) => !v)}
              className={cn(
                "inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors duration-500",
                repaired ? "bg-amber-500/10 text-amber-700" : "bg-rose-500/10 text-rose-600",
              )}
              data-cursor="hover"
            >
              {repaired ? <Sparkles className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
              {repaired ? "System repaired — revenue flows end to end" : "System broken — hover a stage to see the leak"}
            </motion.button>
          </div>

          {/* journey */}
          <div className="glass rounded-glass p-8 shadow-float sm:p-12">
            <div className="flex flex-col items-stretch gap-4 sm:flex-row sm:items-center sm:justify-between sm:gap-2">
              {STAGES.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={s.label} className="flex flex-1 items-center gap-4 sm:flex-col sm:gap-3">
                    {/* node */}
                    <motion.div
                      onMouseEnter={() => setHovered(i)}
                      onMouseLeave={() => setHovered(null)}
                      className="relative"
                      data-cursor="hover"
                    >
                      <motion.div
                        animate={{
                          boxShadow: repaired
                            ? "0 0 28px -4px rgba(199,134,40,0.5)"
                            : "0 0 26px -4px rgba(225,29,72,0.45)",
                        }}
                        transition={{ duration: 0.8 }}
                        className={cn(
                          "flex h-16 w-16 items-center justify-center rounded-2xl transition-colors duration-700",
                          repaired
                            ? "bg-gradient-to-br from-amber-400 to-amber-700 text-cream"
                            : "bg-white text-rose-500 ring-1 ring-rose-300/60",
                        )}
                      >
                        <Icon className="h-6 w-6" />
                      </motion.div>

                      {/* issue tooltip (only meaningful while broken) */}
                      {hovered === i && !repaired && (
                        <motion.div
                          initial={{ opacity: 0, y: 8, scale: 0.95 }}
                          animate={{ opacity: 1, y: 0, scale: 1 }}
                          className="glass-strong absolute left-1/2 top-20 z-20 w-52 -translate-x-1/2 rounded-2xl p-3 text-center text-xs text-ink shadow-float"
                        >
                          <span className="font-semibold text-rose-600">Leak: </span>
                          {s.issue}
                        </motion.div>
                      )}

                      <div className="mt-2 text-center text-sm font-semibold text-ink sm:mt-3">{s.label}</div>
                    </motion.div>

                    {/* connector */}
                    {i < STAGES.length - 1 && (
                      <div className="relative hidden h-0.5 flex-1 sm:block">
                        <div className="absolute inset-0 rounded-full bg-black/5" />
                        <motion.div
                          className="absolute inset-y-0 left-0 rounded-full"
                          initial={false}
                          animate={{
                            width: repaired ? "100%" : "38%",
                            backgroundColor: repaired ? "#C78628" : "#e11d48",
                          }}
                          transition={{ duration: 0.9, delay: repaired ? i * 0.12 : 0, ease: [0.22, 1, 0.36, 1] }}
                        />
                        {!repaired && (
                          <span className="absolute right-0 top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-rose-400 animate-pulse-dot" />
                        )}
                        {repaired && (
                          <motion.span
                            className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-amber-300 shadow-glow-sm"
                            animate={{ left: ["0%", "100%"] }}
                            transition={{ duration: 1.6, repeat: Infinity, ease: "linear", delay: i * 0.2 }}
                          />
                        )}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <p className="mx-auto mt-8 max-w-xl text-center text-sm text-muted">
            {repaired
              ? "One connected system: every click captured, every lead nurtured, every customer retained."
              : "Each break is money walking out the door. Marksy welds the chain into one revenue engine."}
          </p>
        </div>
      </div>
    </section>
  );
}
