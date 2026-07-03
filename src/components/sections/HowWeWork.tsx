import { motion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GradientSerif } from "@/components/shared/GradientSerif";
import { roadmap } from "@/lib/data/roadmap";
import { cn } from "@/lib/utils";

const ease = [0.22, 1, 0.36, 1] as const;

export function HowWeWork() {
  return (
    <section id="how-we-work" className="relative z-10 px-4 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="How We Work"
          title={
            <>
              A proven path from chaos to <GradientSerif>scale.</GradientSerif>
            </>
          }
          description="Seven stages. Golden particles of momentum travel the whole way — from first audit to compounding growth."
        />

        <div className="relative mt-20">
          {/* the track line */}
          <div className="absolute left-0 right-0 top-[2.75rem] hidden h-0.5 lg:block">
            <div className="h-full w-full rounded-full bg-gradient-to-r from-amber-200 via-amber-400 to-amber-600 opacity-40" />
            {/* travelling particles */}
            {[0, 1, 2].map((k) => (
              <motion.span
                key={k}
                className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full bg-amber-400 shadow-glow-sm"
                animate={{ left: ["0%", "100%"] }}
                transition={{ duration: 5, repeat: Infinity, ease: "linear", delay: k * 1.6 }}
              />
            ))}
          </div>

          <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:grid-cols-7 lg:gap-3">
            {roadmap.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.id}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.55, delay: i * 0.08, ease }}
                  className="group flex flex-col items-center text-center"
                >
                  <div className="relative">
                    <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[0.6rem] font-semibold uppercase tracking-widest text-muted">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <motion.span
                      whileHover={{ scale: 1.08, y: -4 }}
                      className={cn(
                        "relative z-10 mt-2 flex h-[4.4rem] w-[4.4rem] items-center justify-center rounded-3xl bg-gradient-to-br from-amber-400 to-amber-700 text-cream shadow-glow-sm ring-4 ring-cream transition-shadow duration-300 group-hover:shadow-glow",
                      )}
                      data-cursor="hover"
                    >
                      <Icon className="h-6 w-6" />
                    </motion.span>
                  </div>
                  <div className="mt-4 text-sm font-semibold text-ink">{step.label}</div>
                  <div className="mt-1 text-xs leading-snug text-muted">{step.detail}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
