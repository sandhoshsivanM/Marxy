import { motion } from "framer-motion";
import { Star, ArrowUpRight, Play, TrendingUp } from "lucide-react";
import { GradientSerif } from "@/components/shared/GradientSerif";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { LiveBadge } from "@/components/shared/LiveBadge";
import { TRUST_STATS } from "@/lib/constants";
import { useAppStore, BASE_REVENUE } from "@/lib/store";
import { formatCompact } from "@/lib/utils";
import { scrollToAnchor } from "@/components/layout/SmoothScroll";

const ease = [0.22, 1, 0.36, 1] as const;

function HeroRevenue() {
  const revenue = useAppStore((s) => s.revenue);
  return (
    <span className="tabular-nums">${formatCompact(revenue)}</span>
  );
}

export function Hero() {
  return (
    <div className="relative flex min-h-screen items-center px-4 pt-28 sm:pt-32">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        {/* Left — copy */}
        <div className="relative z-10 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-amber-800"
          >
            <LiveBadge label="AI REVENUE OS" />
            <span className="text-muted">Now onboarding Q3 partners</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease, delay: 0.05 }}
            className="text-balance text-5xl font-semibold leading-[1.02] tracking-tight sm:text-6xl md:text-[4.4rem]"
          >
            Stop Guessing.
            <br />
            Start Building a{" "}
            <GradientSerif className="pr-1">Revenue Operating System.</GradientSerif>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.15 }}
            className="mt-6 max-w-lg text-lg leading-relaxed text-muted"
          >
            We engineer AI-powered growth systems that generate leads, automate sales, and create
            predictable monthly revenue.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.25 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <MagneticButton onClick={() => scrollToAnchor("#contact")} icon={<ArrowUpRight className="h-4 w-4" />}>
              Book Strategy Call
            </MagneticButton>
            <MagneticButton variant="ghost" onClick={() => scrollToAnchor("#operating-system")} icon={<Play className="h-4 w-4" />}>
              Watch Growth System
            </MagneticButton>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease, delay: 0.35 }}
            className="mt-10 flex flex-col gap-4 border-t border-black/5 pt-6 sm:flex-row sm:items-center sm:gap-8"
          >
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-amber-500 text-amber-500" />
              ))}
            </div>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              {TRUST_STATS.map((s) => (
                <div key={s.label} className="flex items-baseline gap-1.5">
                  <span className="text-sm font-semibold text-ink">{s.value}</span>
                  <span className="text-xs text-muted">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right — floating live dashboard beside the funnel (funnel renders in the 3D canvas behind) */}
        <div className="relative hidden h-[70vh] lg:block">
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 1, ease, delay: 0.5 }}
            className="glass-strong absolute right-0 top-6 w-64 rounded-3xl p-5 shadow-float-lg"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-muted">Live Revenue</span>
              <LiveBadge />
            </div>
            <div className="mt-2 flex items-end gap-2">
              <span className="text-3xl font-bold tracking-tight text-ink">
                <HeroRevenue />
              </span>
              <span className="mb-1 flex items-center gap-0.5 text-xs font-semibold text-emerald-600">
                <TrendingUp className="h-3 w-3" /> +12.4%
              </span>
            </div>
            <div className="mt-4 flex h-14 items-end gap-1">
              {[30, 44, 38, 56, 50, 68, 62, 80, 74, 92].map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.8, delay: 0.7 + i * 0.05, ease }}
                  className="flex-1 rounded-full bg-gradient-to-t from-amber-500/40 to-amber-500"
                />
              ))}
            </div>
            <div className="mt-4 grid grid-cols-2 gap-3 border-t border-black/5 pt-3 text-center">
              <div>
                <div className="text-sm font-bold text-ink">3.24X</div>
                <div className="text-[0.65rem] text-muted">ROAS</div>
              </div>
              <div>
                <div className="text-sm font-bold text-ink">$41.20</div>
                <div className="text-[0.65rem] text-muted">CPA</div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease, delay: 0.7 }}
            className="glass absolute bottom-10 left-0 w-52 rounded-3xl p-4 shadow-float"
          >
            <div className="text-xs font-medium text-muted">Booked Calls · today</div>
            <div className="mt-1 text-2xl font-bold text-ink tabular-nums">128</div>
            <div className="mt-2 text-[0.7rem] text-amber-700">AI qualified · zero manual work</div>
          </motion.div>
        </div>
      </div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-muted"
      >
        <span className="text-[0.65rem] uppercase tracking-[0.24em]">Scroll to build</span>
        <div className="flex h-9 w-5 justify-center rounded-full border border-black/10 pt-1.5">
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-amber-500"
            animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.6, repeat: Infinity }}
          />
        </div>
      </motion.div>
    </div>
  );
}
