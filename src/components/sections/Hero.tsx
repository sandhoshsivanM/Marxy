import { motion } from "framer-motion";
import {
  Star,
  ArrowUpRight,
  Play,
  TrendingUp,
  Activity,
  MousePointerClick,
  UserRoundCheck,
  CalendarCheck,
  Zap,
  type LucideIcon,
} from "lucide-react";
import { GradientSerif } from "@/components/shared/GradientSerif";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { AnimatedNumber } from "@/components/shared/AnimatedNumber";
import { SparkLine } from "@/components/shared/SparkLine";
import { LiveBadge } from "@/components/shared/LiveBadge";
import { TRUST_STATS } from "@/lib/constants";
import { scrollToAnchor } from "@/components/layout/SmoothScroll";

const ease = [0.22, 1, 0.36, 1] as const;

const REVENUE_SPARK = [28, 34, 30, 40, 46, 43, 52, 58, 54, 66, 72, 80, 90];

export function Hero() {
  return (
    <section className="relative flex min-h-screen items-center px-4 pb-20 pt-28 sm:pt-32">
      <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
        {/* Left — copy */}
        <div className="relative z-10 max-w-xl">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-2 text-xs font-medium text-amber-700"
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
            <MagneticButton
              variant="ghost"
              onClick={() => scrollToAnchor("#operating-system")}
              icon={<Play className="h-4 w-4" />}
            >
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
                  <span className="text-sm font-semibold tabular-nums text-ink">{s.value}</span>
                  <span className="text-xs text-muted">{s.label}</span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right — Revenue OS dashboard card */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, ease, delay: 0.4 }}
          className="relative mx-auto w-full max-w-[460px] lg:mx-0 lg:ml-auto"
        >
          <RevenueOSCard />
        </motion.div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Revenue OS dashboard card                                           */
/* ------------------------------------------------------------------ */

function RevenueOSCard() {
  return (
    <div className="glass-strong rounded-[28px] p-5 shadow-float-lg sm:p-6">
      {/* header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-700 text-cream shadow-glow-sm">
            <Activity className="h-5 w-5" />
          </span>
          <div>
            <div className="text-base font-semibold leading-tight text-ink">Revenue OS</div>
            <div className="text-xs text-muted">Live · Marksy Engine</div>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/12 px-3 py-1 text-xs font-semibold text-emerald-700">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px] shadow-emerald-400" />
          Live
        </span>
      </div>

      {/* revenue hero tile + ROAS / CPA */}
      <div className="mt-5 grid grid-cols-[1.5fr_1fr] gap-3">
        <div className="rounded-2xl bg-gradient-to-br from-amber-100/80 to-amber-50/40 p-4 ring-1 ring-amber-200/50">
          <div className="text-xs text-muted">Revenue Generated</div>
          <div className="mt-1 text-[2rem] font-bold leading-none tracking-tight tabular-nums text-ink">
            <AnimatedNumber value={5.24} prefix="$" suffix="M" decimals={2} />
          </div>
          <div className="mt-2 flex items-center gap-1 text-xs font-semibold text-emerald-600">
            <TrendingUp className="h-3 w-3" /> 34% vs last month
          </div>
          <SparkLine
            data={REVENUE_SPARK}
            fill={false}
            width={220}
            height={42}
            className="mt-3 h-10 w-full"
          />
        </div>

        <div className="flex flex-col gap-3">
          <MiniStat label="ROAS" value={4.8} suffix="x" decimals={1} />
          <MiniStat label="CPA" value={18} prefix="$" />
        </div>
      </div>

      {/* four metric tiles */}
      <div className="mt-3 grid grid-cols-4 gap-2.5">
        <MetricTile icon={MousePointerClick} value={6.2} suffix="%" decimals={1} label="CTR" />
        <MetricTile icon={UserRoundCheck} value={3821} label="Conversions" />
        <MetricTile icon={CalendarCheck} value={342} label="Meetings" />
        <MetricTile icon={Zap} value={12.8} suffix="K" decimals={1} label="AI Tasks" />
      </div>

      {/* pipeline */}
      <div className="mt-3 rounded-2xl bg-white/70 p-4 ring-1 ring-ink/5">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted">Pipeline this quarter</span>
          <span className="text-sm font-bold tabular-nums text-ink">
            <AnimatedNumber value={1.82} prefix="$" suffix="M" decimals={2} />
          </span>
        </div>
        <div className="mt-3 flex items-end gap-1.5">
          {Array.from({ length: 12 }).map((_, i) => (
            <motion.span
              key={i}
              initial={{ scaleY: 0 }}
              whileInView={{ scaleY: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.6 + i * 0.04, ease }}
              style={{ transformOrigin: "bottom" }}
              className="h-7 flex-1 rounded-md bg-gradient-to-b from-amber-400 to-amber-600"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function MiniStat({
  label,
  value,
  prefix,
  suffix,
  decimals,
}: {
  label: string;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
}) {
  return (
    <div className="flex flex-1 flex-col justify-center rounded-2xl bg-white/70 px-4 py-3 ring-1 ring-ink/5">
      <div className="text-xs text-muted">{label}</div>
      <div className="mt-0.5 text-2xl font-bold tracking-tight tabular-nums text-ink">
        <AnimatedNumber value={value} prefix={prefix} suffix={suffix} decimals={decimals ?? 0} />
      </div>
    </div>
  );
}

function MetricTile({
  icon: Icon,
  value,
  prefix,
  suffix,
  decimals,
  label,
}: {
  icon: LucideIcon;
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  label: string;
}) {
  return (
    <div className="rounded-xl bg-white/70 p-3 ring-1 ring-ink/5">
      <Icon className="h-4 w-4 text-amber-600" />
      <div className="mt-2 text-lg font-bold leading-none tracking-tight tabular-nums text-ink">
        <AnimatedNumber value={value} prefix={prefix} suffix={suffix} decimals={decimals ?? 0} />
      </div>
      <div className="mt-1 text-[0.68rem] leading-tight text-muted">{label}</div>
    </div>
  );
}
