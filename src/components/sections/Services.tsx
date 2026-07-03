"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Check, ArrowRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GradientSerif } from "@/components/shared/GradientSerif";
import { services, type Service } from "@/lib/data/services";

interface FieldBlockProps {
  label: string;
  children: React.ReactNode;
  accent?: boolean;
}

function FieldBlock({ label, children, accent = false }: FieldBlockProps) {
  return (
    <div className="space-y-2">
      <span
        className={cn(
          "text-[0.68rem] font-medium uppercase tracking-[0.18em]",
          accent ? "text-amber-700" : "text-muted"
        )}
      >
        {label}
      </span>
      <p
        className={cn(
          "text-sm leading-relaxed sm:text-[0.95rem]",
          accent ? "text-ink" : "text-muted"
        )}
      >
        {children}
      </p>
    </div>
  );
}

interface ServiceRowProps {
  service: Service;
  isOpen: boolean;
  onToggle: () => void;
  delay: number;
}

function ServiceRow({ service, isOpen, onToggle, delay }: ServiceRowProps) {
  const Icon = service.icon;
  const panelId = `service-panel-${service.id}`;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      <motion.div
        whileHover={isOpen ? undefined : { y: -2 }}
        transition={{ type: "spring", stiffness: 300, damping: 24 }}
        className={cn(
          "group glass rounded-glass overflow-hidden transition-shadow duration-300",
          isOpen
            ? "shadow-float-lg glass-strong"
            : "shadow-float hover:shadow-float-lg"
        )}
      >
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={panelId}
          className="flex w-full items-center gap-4 px-5 py-5 text-left sm:gap-6 sm:px-8 sm:py-7"
        >
          <span className="w-8 shrink-0 font-serif text-lg tabular-nums text-muted/70 sm:text-xl">
            {service.index}
          </span>

          <span
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-amber-400 to-amber-700 text-white transition-shadow duration-300 sm:h-12 sm:w-12",
              isOpen
                ? "shadow-glow"
                : "shadow-glow-sm group-hover:shadow-glow"
            )}
          >
            <Icon className="h-5 w-5" strokeWidth={2} />
          </span>

          <span className="flex min-w-0 flex-1 flex-col">
            <span className="truncate text-base font-bold text-ink sm:text-lg">
              {service.title}
            </span>
            <span className="mt-0.5 hidden truncate text-sm text-muted sm:block">
              {service.tagline}
            </span>
          </span>

          <span
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors duration-300",
              isOpen
                ? "bg-amber-600 text-white"
                : "bg-accent/40 text-amber-700 group-hover:bg-accent/70"
            )}
            aria-hidden="true"
          >
            {isOpen ? (
              <Minus className="h-4 w-4" strokeWidth={2.5} />
            ) : (
              <Plus className="h-4 w-4" strokeWidth={2.5} />
            )}
          </span>
        </button>

        <AnimatePresence initial={false}>
          {isOpen && (
            <motion.div
              id={panelId}
              key="content"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
            >
              <div className="px-5 pb-7 sm:px-8">
                <div className="hairline mb-6 h-px w-full" />

                <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
                  <FieldBlock label="Problem">{service.problem}</FieldBlock>
                  <FieldBlock label="Solution">{service.solution}</FieldBlock>
                  <FieldBlock label="Outcome" accent>
                    {service.outcome}
                  </FieldBlock>

                  <div className="space-y-2">
                    <span className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted">
                      Timeline
                    </span>
                    <div>
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3.5 py-1.5 text-sm font-medium text-amber-700">
                        <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.5} />
                        {service.timeline}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-7 space-y-3">
                  <span className="text-[0.68rem] font-medium uppercase tracking-[0.18em] text-muted">
                    Deliverables
                  </span>
                  <ul className="flex flex-wrap gap-2.5">
                    {service.deliverables.map((item) => (
                      <li
                        key={item}
                        className="glass inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-sm text-ink"
                      >
                        <span className="flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-700 text-white">
                          <Check className="h-2.5 w-2.5" strokeWidth={3} />
                        </span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}

export function Services() {
  const [openId, setOpenId] = useState<string | null>(services[0]?.id ?? null);

  return (
    <section id="services" className="relative z-10 px-4 py-28 sm:py-36">
      <div className="mx-auto max-w-5xl">
        <SectionHeading
          eyebrow="The Operating System"
          title={
            <>
              Eleven services. One <GradientSerif>revenue engine.</GradientSerif>
            </>
          }
          description="Each service is a modular component that installs cleanly into the next — problem, solution, and outcome mapped end to end. Run them standalone or let them compound as one system."
          align="center"
        />

        <div className="mt-14 flex flex-col gap-4 sm:mt-16">
          {services.map((service, i) => (
            <ServiceRow
              key={service.id}
              service={service}
              isOpen={openId === service.id}
              onToggle={() =>
                setOpenId((prev) => (prev === service.id ? null : service.id))
              }
              delay={Math.min(i * 0.05, 0.35)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
