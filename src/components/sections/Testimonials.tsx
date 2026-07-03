"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Quote,
  Linkedin,
  Globe,
  ArrowLeft,
  ArrowRight,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GradientSerif } from "@/components/shared/GradientSerif";
import { testimonials, type Testimonial } from "@/lib/data/testimonials";

const AUTOPLAY_MS = 6000;

const trustCompanies = [
  "Bella Nonna",
  "Meridian Dental",
  "Northgate Realty",
  "Lumen Skincare",
  "Cobalt SaaS",
  "Okafor Construction",
];

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined" || !window.matchMedia) return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function mod(n: number, m: number): number {
  return ((n % m) + m) % m;
}

interface MedallionProps {
  initials: string;
  accent: string;
  size?: "sm" | "lg";
  className?: string;
}

function Medallion({ initials, accent, size = "lg", className }: MedallionProps) {
  return (
    <span
      className={cn(
        "relative inline-flex flex-none items-center justify-center rounded-full font-semibold text-white shadow-glow-sm ring-1 ring-white/40",
        size === "lg" ? "h-14 w-14 text-base" : "h-11 w-11 text-sm",
        className,
      )}
      style={{
        background: `radial-gradient(120% 120% at 30% 20%, ${accent}FF 0%, ${accent}CC 55%, ${accent}99 100%)`,
      }}
      aria-hidden="true"
    >
      {initials}
    </span>
  );
}

interface LinkRowProps {
  icon: typeof Linkedin;
  label: string;
  href: string;
}

function LinkRow({ icon: Icon, label, href }: LinkRowProps) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-amber-700"
    >
      <span className="inline-flex h-7 w-7 items-center justify-center rounded-full glass text-muted transition-colors group-hover:text-amber-700">
        <Icon className="h-3.5 w-3.5" />
      </span>
      <span className="truncate">{label}</span>
    </a>
  );
}

interface PeekCardProps {
  testimonial: Testimonial;
  side: "left" | "right";
}

function PeekCard({ testimonial, side }: PeekCardProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none absolute top-1/2 hidden w-64 -translate-y-1/2 rounded-glass glass p-6 opacity-40 shadow-float xl:block",
        side === "left"
          ? "-left-24 -rotate-2"
          : "-right-24 rotate-2",
      )}
    >
      <Quote
        className="mb-3 h-5 w-5 text-amber"
        style={{ color: testimonial.accent }}
      />
      <p className="line-clamp-4 font-serif text-lg italic leading-snug text-ink/70">
        {testimonial.quote}
      </p>
      <div className="mt-4 flex items-center gap-3">
        <Medallion
          initials={testimonial.initials}
          accent={testimonial.accent}
          size="sm"
        />
        <span className="text-sm font-medium text-ink/60">
          {testimonial.name}
        </span>
      </div>
    </div>
  );
}

export function Testimonials() {
  const [active, setActive] = useState(0);
  const [direction, setDirection] = useState(1);
  const [hovering, setHovering] = useState(false);

  const count = testimonials.length;

  const goTo = useCallback(
    (index: number, dir: number) => {
      setDirection(dir);
      setActive(mod(index, count));
    },
    [count],
  );

  const next = useCallback(() => {
    setDirection(1);
    setActive((prev) => mod(prev + 1, count));
  }, [count]);

  const prev = useCallback(() => {
    setDirection(-1);
    setActive((prev) => mod(prev - 1, count));
  }, [count]);

  useEffect(() => {
    if (hovering || prefersReducedMotion()) return;
    const id = window.setInterval(() => {
      setDirection(1);
      setActive((prev) => mod(prev + 1, count));
    }, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [hovering, count]);

  const current = testimonials[active];
  const prevTestimonial = testimonials[mod(active - 1, count)];
  const nextTestimonial = testimonials[mod(active + 1, count)];

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
      scale: 0.96,
    }),
  };

  return (
    <section
      id="testimonials"
      className="relative z-10 px-4 py-28 sm:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <SectionHeading
            eyebrow="Trusted By Operators"
            title={
              <>
                Founders who stopped guessing and started{" "}
                <GradientSerif>scaling.</GradientSerif>
              </>
            }
            description="Real operators, real numbers. Here's what changed after they let the system do the guessing."
            align="center"
          />

          {/* Carousel */}
          <div
            className="relative mt-16"
            onMouseEnter={() => setHovering(true)}
            onMouseLeave={() => setHovering(false)}
          >
            {/* Peek cards for depth */}
            <PeekCard testimonial={prevTestimonial} side="left" />
            <PeekCard testimonial={nextTestimonial} side="right" />

            <div className="relative mx-auto max-w-3xl">
              <div className="relative overflow-hidden rounded-glass">
                <AnimatePresence
                  mode="wait"
                  custom={direction}
                  initial={false}
                >
                  <motion.article
                    key={current.id}
                    custom={direction}
                    variants={slideVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      duration: 0.5,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="glass-strong rounded-glass p-10 shadow-float-lg sm:p-14"
                  >
                    <Quote
                      className="h-12 w-12 opacity-70"
                      style={{ color: current.accent }}
                      aria-hidden="true"
                    />

                    <blockquote className="mt-6">
                      <p className="font-serif text-2xl italic leading-snug text-ink sm:text-3xl">
                        &ldquo;{current.quote}&rdquo;
                      </p>
                    </blockquote>

                    <hr className="hairline my-8" />

                    <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                      {/* Author */}
                      <div className="flex items-center gap-4">
                        <Medallion
                          initials={current.initials}
                          accent={current.accent}
                        />
                        <div className="min-w-0">
                          <div className="font-semibold text-ink">
                            {current.name}
                          </div>
                          <div className="text-sm text-muted">
                            {current.role} &middot; {current.company}
                          </div>
                        </div>
                      </div>

                      {/* Impact + links */}
                      <div className="flex flex-col items-start gap-3 sm:items-end">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-50 px-3.5 py-1.5 text-sm font-semibold text-amber-700 shadow-glow-sm">
                          <Star
                            className="h-3.5 w-3.5 fill-amber-700 text-amber-700"
                            aria-hidden="true"
                          />
                          {current.impact}
                        </span>
                        <div className="flex flex-wrap items-center gap-4">
                          <LinkRow
                            icon={Linkedin}
                            label={current.linkedin.replace(
                              /^https?:\/\//,
                              "",
                            )}
                            href={`https://${current.linkedin.replace(
                              /^https?:\/\//,
                              "",
                            )}`}
                          />
                          <LinkRow
                            icon={Globe}
                            label={current.website.replace(
                              /^https?:\/\//,
                              "",
                            )}
                            href={`https://${current.website.replace(
                              /^https?:\/\//,
                              "",
                            )}`}
                          />
                        </div>
                      </div>
                    </div>
                  </motion.article>
                </AnimatePresence>
              </div>

              {/* Controls */}
              <div className="mt-10 flex items-center justify-center gap-6">
                <button
                  type="button"
                  onClick={prev}
                  aria-label="Previous testimonial"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full glass text-ink shadow-float transition-all hover:text-amber-700 hover:shadow-glow"
                >
                  <ArrowLeft className="h-4 w-4" />
                </button>

                <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial navigation">
                  {testimonials.map((t, i) => (
                    <button
                      key={t.id}
                      type="button"
                      role="tab"
                      aria-selected={i === active}
                      aria-label={`Go to testimonial ${i + 1}`}
                      onClick={() => goTo(i, i > active ? 1 : -1)}
                      className={cn(
                        "h-2 rounded-full transition-all duration-300",
                        i === active
                          ? "w-7 bg-amber shadow-glow-sm"
                          : "w-2 bg-ink/15 hover:bg-ink/30",
                      )}
                    />
                  ))}
                </div>

                <button
                  type="button"
                  onClick={next}
                  aria-label="Next testimonial"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full glass text-ink shadow-float transition-all hover:text-amber-700 hover:shadow-glow"
                >
                  <ArrowRight className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>

          {/* Trust strip */}
          <div className="mt-20">
            <p className="text-center text-xs font-medium uppercase tracking-[0.2em] text-muted/70">
              Powering growth for
            </p>
            <div className="mt-6 flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
              {trustCompanies.map((name) => (
                <span
                  key={name}
                  className="font-serif text-lg italic text-ink/30 transition-colors hover:text-ink/50"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
