import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GradientSerif } from "@/components/shared/GradientSerif";
import { LiveBadge } from "@/components/shared/LiveBadge";
import { AnimatedNumber } from "@/components/shared/AnimatedNumber";
import { SparkLine } from "@/components/shared/SparkLine";
import { metrics, revenueSeries, revenueMonths } from "@/lib/data/dashboard";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";

const ease = [0.22, 1, 0.36, 1] as const;

export function LiveDashboard() {
  return (
    <section id="dashboard" className="relative z-10 px-4 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Live Revenue OS"
          title={
            <>
              Your business, on a single <GradientSerif>operating system.</GradientSerif>
            </>
          }
          description="Every channel, lead and dollar in one live dashboard leadership actually trusts — updating in real time as the system works."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Big revenue panel */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.7, ease }}
            className="glass-strong relative overflow-hidden rounded-glass p-8 shadow-float-lg"
          >
            <div className="flex items-start justify-between">
              <div>
                <div className="text-sm font-medium text-muted">Total Revenue · 2026</div>
                <div className="mt-1 flex items-end gap-3">
                  <span className="text-5xl font-bold tracking-tight text-ink">
                    <AnimatedNumber value={18.42} decimals={2} prefix="$" suffix="M" />
                  </span>
                  <span className="mb-2 flex items-center gap-1 text-sm font-semibold text-emerald-600">
                    <ArrowUpRight className="h-4 w-4" /> +12.4%
                  </span>
                </div>
              </div>
              <LiveBadge />
            </div>

            {/* animated bar chart */}
            <div className="mt-10 flex h-52 items-end gap-2 sm:gap-3">
              {revenueSeries.map((h, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-2">
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    whileInView={{ height: `${h}%`, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: i * 0.05, ease }}
                    className={cn(
                      "w-full rounded-t-lg bg-gradient-to-t",
                      i === revenueSeries.length - 1
                        ? "from-amber-500 to-amber-300 shadow-glow-sm"
                        : "from-amber-500/25 to-amber-500/60",
                    )}
                  />
                  <span className="text-[0.6rem] text-muted">{revenueMonths[i]}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Highlight stack */}
          <div className="grid grid-cols-2 gap-6">
            {metrics.slice(0, 4).map((m, i) => (
              <MetricCard key={m.key} m={m} i={i} big />
            ))}
          </div>
        </div>

        {/* metric grid */}
        <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {metrics.slice(4).map((m, i) => (
            <MetricCard key={m.key} m={m} i={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function MetricCard({ m, i, big }: { m: (typeof metrics)[number]; i: number; big?: boolean }) {
  const Icon = m.icon;
  const positive = m.positive;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.6, delay: i * 0.04, ease }}
      whileHover={{ y: -4 }}
      className={cn("glass rounded-3xl p-5 shadow-float", big && "p-5")}
    >
      <div className="flex items-center justify-between">
        <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-amber-500/10 text-amber-700">
          <Icon className="h-4 w-4" />
        </span>
        <span
          className={cn(
            "flex items-center gap-0.5 text-[0.7rem] font-semibold",
            positive ? "text-emerald-600" : "text-rose-500",
          )}
        >
          {positive ? <ArrowUpRight className="h-3 w-3" /> : <ArrowDownRight className="h-3 w-3" />}
          {m.delta}
        </span>
      </div>
      <div className="mt-3 text-xl font-bold tracking-tight text-ink">
        {m.target !== undefined ? (
          <AnimatedNumber
            value={m.target}
            decimals={m.decimals ?? 0}
            prefix={m.prefix ?? ""}
            suffix={m.suffix ?? ""}
          />
        ) : (
          m.value
        )}
      </div>
      <div className="text-xs text-muted">{m.label}</div>
      <div className="mt-3 -mb-1">
        <SparkLine data={m.spark} color="#C78628" height={34} width={140} className="w-full" />
      </div>
    </motion.div>
  );
}
