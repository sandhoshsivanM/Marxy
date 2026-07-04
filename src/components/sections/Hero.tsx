import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, ArrowUpRight, Play, TrendingUp, DollarSign, BarChart3 } from "lucide-react";
import { GradientSerif } from "@/components/shared/GradientSerif";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { AnimatedNumber } from "@/components/shared/AnimatedNumber";
import { SparkLine } from "@/components/shared/SparkLine";
import { LiveBadge } from "@/components/shared/LiveBadge";
import { TRUST_STATS } from "@/lib/constants";
import { scrollToAnchor } from "@/components/layout/SmoothScroll";
import {
  trafficSources,
  funnelStages,
  funnelMetrics,
  funnelRevenue,
  type FunnelStage,
} from "@/lib/data/funnel";
import { FunnelParticles } from "./FunnelParticles";

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const [assembled, setAssembled] = useState(false);
  useEffect(() => {
    const t = window.setTimeout(() => setAssembled(true), 1300);
    return () => window.clearTimeout(t);
  }, []);

  return (
    <section className="relative px-4 pb-20 pt-28 sm:pt-32">
      <div className="mx-auto max-w-6xl">
        {/* ---------- headline ---------- */}
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-amber-700"
          >
            <LiveBadge label="AI REVENUE OS" />
            <span className="text-muted">Now onboarding Q3 partners</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.85, ease, delay: 0.05 }}
            className="text-balance text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-[3.6rem]"
          >
            Watch How We Turn Traffic Into{" "}
            <GradientSerif className="pr-1">Revenue.</GradientSerif>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
            className="mt-5 max-w-xl text-lg leading-relaxed text-muted"
          >
            Live data from your Revenue OS — real leads, qualified, booked and closed by one
            connected system instead of scattered tools.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-4"
          >
            <MagneticButton onClick={() => scrollToAnchor("#contact")} icon={<ArrowUpRight className="h-4 w-4" />}>
              Book Strategy Call
            </MagneticButton>
            <MagneticButton
              variant="ghost"
              onClick={() => scrollToAnchor("#operating-system")}
              icon={<Play className="h-4 w-4" />}
            >
              Watch Growth System
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.35 }}
            className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-3"
          >
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
              ))}
            </div>
            {TRUST_STATS.map((s) => (
              <div key={s.label} className="flex items-baseline gap-1.5">
                <span className="text-sm font-semibold tabular-nums text-ink">{s.value}</span>
                <span className="text-xs text-muted">{s.label}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* ---------- funnel visual ---------- */}
        <div className="relative mt-16">
          <div className="hidden lg:block">
            <FunnelParticles active={assembled} />
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-[minmax(180px,205px)_minmax(0,1fr)_minmax(196px,220px)] lg:items-center">
            <TrafficSourcesPanel />
            <StagesRow />
            <RevenueCard />
          </div>
        </div>

        {/* ---------- metrics bar ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease }}
          className="glass mt-4 rounded-glass p-4 sm:p-5"
        >
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {funnelMetrics.map((m) => {
              const Icon = m.icon;
              return (
                <div key={m.key} className="flex items-center gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                    <Icon className="h-5 w-5" />
                  </span>
                  <div className="min-w-0">
                    <div className="text-lg font-bold tracking-tight text-ink">
                      <AnimatedNumber value={m.value} prefix={m.prefix} suffix={m.suffix} decimals={m.decimals ?? 0} />
                    </div>
                    <div className="text-[0.7rem] leading-tight text-muted">{m.label}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </motion.div>

        {/* ---------- CTA ---------- */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease, delay: 0.05 }}
          className="glass mt-4 flex flex-col gap-4 rounded-glass p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6"
        >
          <div className="flex items-start gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-700 text-cream shadow-glow-sm">
              <BarChart3 className="h-5 w-5" />
            </span>
            <div>
              <div className="font-semibold text-ink">This is the power of having a system.</div>
              <div className="mt-0.5 text-sm text-muted">
                We don't just run ads. We build revenue engines that predict, automate and scale.
              </div>
            </div>
          </div>
          <MagneticButton
            onClick={() => scrollToAnchor("#contact")}
            icon={<ArrowUpRight className="h-4 w-4" />}
            className="shrink-0"
          >
            Book Free Strategy Call
          </MagneticButton>
        </motion.div>

        <div className="mt-2.5 text-center text-xs italic text-amber-700/80 sm:text-right">
          Live data updates every few seconds
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Traffic sources panel                                               */
/* ------------------------------------------------------------------ */

function TrafficSourcesPanel() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.7, ease, delay: 0.4 }}
      className="glass relative z-10 rounded-glass p-5"
    >
      <div className="text-sm font-semibold text-ink">Traffic Sources</div>
      <div className="mt-4 flex flex-col gap-3.5">
        {trafficSources.map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease, delay: 0.55 + i * 0.08 }}
              className="flex items-center gap-3"
            >
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/70 ring-1 ring-ink/5">
                <Icon className="h-4 w-4" style={{ color: s.hue }} />
              </span>
              <div className="min-w-0">
                <div className="truncate text-xs text-muted">{s.name}</div>
                <div className="text-base font-bold leading-tight tracking-tight text-ink">
                  <AnimatedNumber value={s.visitors} />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Funnel stages                                                       */
/* ------------------------------------------------------------------ */

function StagesRow() {
  return (
    <div className="relative z-10 grid grid-cols-2 gap-3 sm:grid-cols-4 lg:flex lg:items-center lg:gap-3">
      {funnelStages.map((stage, i) => (
        <Stage key={stage.key} stage={stage} index={i} />
      ))}
    </div>
  );
}

function Stage({ stage, index }: { stage: FunnelStage; index: number }) {
  const Icon = stage.icon;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.94 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.55, delay: 0.55 + index * 0.13, ease }}
      className="relative flex-1"
    >
      <div
        className="relative overflow-hidden rounded-[24px] px-4 py-5 text-center ring-1 ring-white/60"
        style={{
          background: `linear-gradient(180deg, rgba(${stage.tint},0.20), rgba(255,255,255,0.55))`,
          boxShadow: "inset 0 1px 0 rgba(255,255,255,.85), 0 22px 46px -28px rgba(31,27,25,.35)",
        }}
      >
        {/* elliptical top highlight — reads as a glass cylinder rim */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-4 top-1.5 h-5 rounded-[50%]"
          style={{ background: "radial-gradient(closest-side, rgba(255,255,255,.85), rgba(255,255,255,0))" }}
        />
        <span
          className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl text-white shadow-sm"
          style={{ background: `rgb(${stage.tint})` }}
        >
          <Icon className="h-5 w-5" />
        </span>
        <div className="mt-3 text-xs font-medium leading-tight text-muted">{stage.label}</div>
        <div className="mt-1 text-2xl font-bold tracking-tight text-ink">
          <AnimatedNumber value={stage.value} />
        </div>
        <div className="mt-1 flex items-center justify-center gap-1 text-xs font-semibold text-emerald-600">
          <TrendingUp className="h-3 w-3" /> {stage.delta}
        </div>
        <div className="my-3 h-px bg-ink/[0.08]" />
        <div className="text-[0.6rem] uppercase tracking-wide text-muted">Conversion</div>
        <div className="text-sm font-semibold tabular-nums text-ink">{stage.conversion}</div>
      </div>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Revenue card                                                        */
/* ------------------------------------------------------------------ */

function RevenueCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20, scale: 0.96 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.7, ease, delay: 1.05 }}
      className="relative z-10 overflow-hidden rounded-glass p-5 shadow-glow ring-1 ring-amber-300/60"
      style={{ background: "linear-gradient(160deg, #F4D588, #E4B05A 52%, #C78628)" }}
    >
      <div className="flex items-center justify-between">
        <span className="text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-amber-950/80">
          {funnelRevenue.label}
        </span>
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/35 text-amber-950">
          <DollarSign className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-3 text-[2.4rem] font-bold leading-none tracking-tight text-amber-950">
        <AnimatedNumber
          value={funnelRevenue.value}
          prefix={funnelRevenue.prefix}
          suffix={funnelRevenue.suffix}
          decimals={funnelRevenue.decimals}
        />
      </div>
      <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-800">
        <TrendingUp className="h-3.5 w-3.5" /> {funnelRevenue.delta}
      </div>
      <SparkLine
        data={funnelRevenue.spark}
        color="#7F521A"
        fill={false}
        width={220}
        height={48}
        className="mt-3 h-12 w-full"
      />
    </motion.div>
  );
}
