import { useState } from "react";
import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GradientSerif } from "@/components/shared/GradientSerif";
import { industries } from "@/lib/data/industries";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function WhoWeHelp() {
  const [active, setActive] = useState<number | null>(null);

  return (
    <section id="who-we-help" className="relative z-10 px-4 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Who We Help"
          title={
            <>
              Built for businesses ready to <GradientSerif>scale.</GradientSerif>
            </>
          }
          description="The Revenue OS adapts to your industry — same engine, tuned to how your customers actually buy."
        />

        <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-3">
          {industries.map((ind, i) => {
            const Icon = ind.icon;
            const isActive = active === i;
            return (
              <motion.button
                key={ind.name}
                type="button"
                onMouseEnter={() => setActive(i)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(i)}
                onBlur={() => setActive(null)}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.6, delay: i * 0.05, ease }}
                whileHover={{ y: -6 }}
                className={cn(
                  "group relative flex flex-col items-start gap-4 overflow-hidden rounded-glass p-6 text-left transition-shadow duration-300 sm:p-7",
                  isActive ? "glass-strong shadow-float-lg" : "glass shadow-float",
                )}
                data-cursor="hover"
              >
                {/* amber wash on hover */}
                <motion.span
                  aria-hidden
                  className="absolute inset-0 -z-0 bg-gradient-to-br from-amber-100/60 to-transparent"
                  initial={false}
                  animate={{ opacity: isActive ? 1 : 0 }}
                  transition={{ duration: 0.4 }}
                />
                <span
                  className={cn(
                    "relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl transition-all duration-300",
                    isActive
                      ? "bg-gradient-to-br from-amber-400 to-amber-700 text-cream shadow-glow-sm"
                      : "bg-amber-500/10 text-amber-700",
                  )}
                >
                  <Icon className="h-5 w-5" />
                </span>
                <div className="relative z-10">
                  <div className="text-lg font-semibold tracking-tight text-ink">{ind.name}</div>
                  <div className="mt-0.5 text-sm text-muted">{ind.blurb}</div>
                </div>
                <div
                  className={cn(
                    "relative z-10 mt-auto flex items-center gap-1.5 text-xs font-semibold transition-colors",
                    isActive ? "text-amber-700" : "text-muted",
                  )}
                >
                  <span className="h-1 w-1 rounded-full bg-amber-500" />
                  {ind.stat}
                </div>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
