import { Fragment, useCallback, useEffect, useRef, useState } from "react";
import { motion, useInView, type Variants } from "framer-motion";
import { ArrowLeft, ArrowRight, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GradientSerif } from "@/components/shared/GradientSerif";
import { AnimatedNumber } from "@/components/shared/AnimatedNumber";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { growthStages, type GrowthStage } from "@/lib/data/growthSystem";

const ease = [0.22, 1, 0.36, 1] as const;

/* Reveal choreography: modules + connectors draw themselves left → right. */
const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, scale: 0.92, y: 16 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.5, ease } },
};

/* ------------------------------------------------------------------ */
/* Section                                                             */
/* ------------------------------------------------------------------ */

export function GrowthSystem() {
  const reduced = useReducedMotion();
  const trackRef = useRef<HTMLDivElement>(null);

  const railRef = useRef<HTMLDivElement>(null);
  const inView = useInView(railRef, { once: true, margin: "-80px" });

  const [assembled, setAssembled] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState(0);

  /* Particles only flow once the whole system has drawn itself. */
  useEffect(() => {
    if (reduced) {
      setAssembled(true);
      return;
    }
    if (!inView) return;
    const t = window.setTimeout(() => setAssembled(true), 2100);
    return () => window.clearTimeout(t);
  }, [inView, reduced]);

  const moduleEls = useCallback(
    () =>
      trackRef.current
        ? Array.from(
            trackRef.current.querySelectorAll<HTMLElement>("[data-module]"),
          )
        : [],
    [],
  );

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setProgress(max > 0 ? el.scrollLeft / max : 0);

    const center = el.scrollLeft + el.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    moduleEls().forEach((m, i) => {
      const c = m.offsetLeft + m.offsetWidth / 2;
      const d = Math.abs(c - center);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
  }, [moduleEls]);

  const goToIndex = useCallback(
    (index: number) => {
      const el = trackRef.current;
      const mods = moduleEls();
      const target = mods[Math.max(0, Math.min(mods.length - 1, index))];
      if (!el || !target) return;
      const left = target.offsetLeft + target.offsetWidth / 2 - el.clientWidth / 2;
      el.scrollTo({ left, behavior: reduced ? "auto" : "smooth" });
    },
    [moduleEls, reduced],
  );

  /* Trackpad / mouse-wheel vertical intent → horizontal scrub.
     Releases at the edges so the page keeps scrolling — never traps the user. */
  useEffect(() => {
    const el = trackRef.current;
    if (!el || reduced) return;

    const onWheel = (e: WheelEvent) => {
      if (el.scrollWidth <= el.clientWidth + 2) return;
      if (Math.abs(e.deltaY) <= Math.abs(e.deltaX)) return; // already horizontal
      const max = el.scrollWidth - el.clientWidth;
      const atStart = el.scrollLeft <= 0;
      const atEnd = el.scrollLeft >= max - 1;
      if ((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd)) return;
      el.scrollLeft += e.deltaY;
      e.preventDefault();
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [reduced]);

  /* Click-and-drag to scrub (desktop). Touch drag is native. */
  const drag = useRef({ down: false, moved: false, startX: 0, startLeft: 0 });
  const onPointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== "mouse") return;
    const el = trackRef.current;
    if (!el) return;
    drag.current = {
      down: true,
      moved: false,
      startX: e.clientX,
      startLeft: el.scrollLeft,
    };
  };
  const onPointerMove = (e: React.PointerEvent) => {
    const el = trackRef.current;
    if (!el || !drag.current.down) return;
    const dx = e.clientX - drag.current.startX;
    if (Math.abs(dx) > 4) {
      drag.current.moved = true;
      el.setPointerCapture?.(e.pointerId);
    }
    if (drag.current.moved) el.scrollLeft = drag.current.startLeft - dx;
  };
  const endDrag = () => {
    drag.current.down = false;
  };

  return (
    <section id="operating-system" className="relative z-10 px-4 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="How Our Growth System Works"
          title={
            <>
              Every interaction, one <GradientSerif>revenue engine.</GradientSerif>
            </>
          }
          description="Marksy doesn't generate traffic. It organizes, automates, and converts the traffic you already have — eight connected modules that hand each other a clean signal, from first click to closed revenue."
        />

        {/* Controls */}
        <div className="mt-14 flex items-center justify-between gap-4">
          <p className="hidden text-sm text-muted sm:block">
            Drag, scroll, or step through the system
            <span className="text-amber-600"> →</span>
          </p>
          <div className="flex items-center gap-2">
            <NavButton
              label="Previous stage"
              onClick={() => goToIndex(active - 1)}
              disabled={active <= 0}
            >
              <ArrowLeft className="h-4 w-4" />
            </NavButton>
            <span className="w-16 text-center text-sm tabular-nums text-muted">
              <span className="font-semibold text-ink">{growthStages[active]?.num}</span>
              <span className="text-muted"> / 08</span>
            </span>
            <NavButton
              label="Next stage"
              onClick={() => goToIndex(active + 1)}
              disabled={active >= growthStages.length - 1}
            >
              <ArrowRight className="h-4 w-4" />
            </NavButton>
          </div>
        </div>

        {/* Pipeline track */}
        <motion.div
          ref={railRef}
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-80px" }}
        >
          <div
            ref={trackRef}
            onScroll={onScroll}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={endDrag}
            onPointerLeave={endDrag}
            className={cn(
              "no-scrollbar mt-6 flex snap-x snap-proximity items-stretch gap-0 overflow-x-auto",
              "cursor-grab pb-2 active:cursor-grabbing",
              "[scrollbar-width:none]",
            )}
            style={{ scrollPaddingInline: "1rem" }}
          >
            {/* leading spacer so the first module can center */}
            <div aria-hidden className="w-2 shrink-0 sm:w-8" />

            {growthStages.map((stage, i) => (
              <Fragment key={stage.id}>
                <ModuleCard
                  stage={stage}
                  isHovered={hovered === i}
                  onHoverStart={() => setHovered(i)}
                  onHoverEnd={() => setHovered((h) => (h === i ? null : h))}
                />
                {i < growthStages.length - 1 && (
                  <Connector
                    active={hovered === i || hovered === i + 1}
                    assembled={assembled}
                    reduced={reduced}
                  />
                )}
              </Fragment>
            ))}

            {/* trailing spacer so the last module can center */}
            <div aria-hidden className="w-2 shrink-0 sm:w-8" />
          </div>
        </motion.div>

        {/* Progress rail + stage dots */}
        <div className="mt-6 flex items-center gap-4">
          <div className="relative h-1 flex-1 overflow-hidden rounded-full bg-ink/5">
            <div
              className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-amber-300 to-amber-600 shadow-glow-sm"
              style={{ width: `${Math.max(6, progress * 100)}%` }}
            />
          </div>
          <div className="hidden items-center gap-1.5 sm:flex">
            {growthStages.map((s, i) => (
              <button
                key={s.id}
                aria-label={`Go to ${s.label}`}
                onClick={() => goToIndex(i)}
                className={cn(
                  "h-1.5 rounded-full transition-all duration-300",
                  i === active ? "w-5 bg-amber-500" : "w-1.5 bg-ink/15 hover:bg-amber-300",
                )}
                data-cursor="hover"
              />
            ))}
          </div>
        </div>

        {/* Closing message */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease }}
          className="mx-auto mt-20 max-w-3xl text-balance text-center text-2xl font-medium leading-snug tracking-tight text-ink sm:text-3xl"
        >
          Traffic is not your problem. Disconnected systems are. Marksy transforms every
          customer interaction into{" "}
          <GradientSerif>one unified revenue engine.</GradientSerif>
        </motion.p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/* Nav button                                                          */
/* ------------------------------------------------------------------ */

function NavButton({
  children,
  label,
  onClick,
  disabled,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      data-cursor="hover"
      className={cn(
        "glass flex h-10 w-10 items-center justify-center rounded-full text-ink transition",
        "hover:text-amber-600 hover:shadow-glow-sm",
        disabled && "pointer-events-none opacity-35",
      )}
    >
      {children}
    </button>
  );
}

/* ------------------------------------------------------------------ */
/* Connector — thin gold line + flowing particles                      */
/* ------------------------------------------------------------------ */

function Connector({
  active,
  assembled,
  reduced,
}: {
  active: boolean;
  assembled: boolean;
  reduced: boolean;
}) {
  return (
    <motion.div
      variants={item}
      aria-hidden
      className="relative flex w-14 shrink-0 items-center sm:w-20"
    >
      {/* the line */}
      <div
        className={cn(
          "h-px w-full rounded-full bg-gradient-to-r transition-all duration-300",
          active
            ? "from-amber-400/50 via-amber-500 to-amber-400/50 shadow-glow-sm"
            : "from-amber-300/25 via-amber-500/55 to-amber-300/25",
        )}
      />
      {/* endpoint node on the right */}
      <span
        className={cn(
          "absolute right-0 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full transition-colors duration-300",
          active ? "bg-amber-500" : "bg-amber-400/70",
        )}
      />

      {/* flowing particles — only after the system has assembled */}
      {assembled &&
        !reduced &&
        [0, 1].map((k) => (
          <motion.span
            key={k}
            className="absolute top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-amber-400 shadow-glow-sm"
            animate={{ left: ["0%", "15%", "85%", "100%"], opacity: [0, 1, 1, 0] }}
            transition={{
              duration: active ? 1.1 : 2.6,
              repeat: Infinity,
              ease: "linear",
              delay: k * (active ? 0.55 : 1.3),
              times: [0, 0.15, 0.85, 1],
            }}
          />
        ))}
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/* Module card                                                         */
/* ------------------------------------------------------------------ */

function ModuleCard({
  stage,
  isHovered,
  onHoverStart,
  onHoverEnd,
}: {
  stage: GrowthStage;
  isHovered: boolean;
  onHoverStart: () => void;
  onHoverEnd: () => void;
}) {
  const Icon = stage.icon;
  return (
    <motion.article
      data-module
      variants={item}
      onHoverStart={onHoverStart}
      onHoverEnd={onHoverEnd}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 24 }}
      className={cn(
        "relative flex w-[280px] shrink-0 snap-center flex-col rounded-glass p-6 sm:w-[320px]",
        "transition-[background,box-shadow] duration-300",
        stage.bright
          ? "border border-amber-300/60 bg-gradient-to-br from-amber-50/90 to-white/70 shadow-glow"
          : isHovered
            ? "glass-strong shadow-float-lg"
            : "glass shadow-float",
      )}
    >
      {/* header */}
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-2xl text-cream transition-transform duration-300",
            "bg-gradient-to-br from-amber-400 to-amber-700 shadow-glow-sm",
            isHovered && "-translate-y-0.5",
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
        <span className="font-serif text-2xl italic leading-none text-amber-300">
          {stage.num}
        </span>
      </div>

      <h3 className="mt-4 text-lg font-semibold tracking-tight text-ink">{stage.label}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-muted">{stage.description}</p>

      <div className="my-4 h-px w-full bg-ink/5" />

      <div className="flex-1">
        <StageBody stage={stage} />
      </div>
    </motion.article>
  );
}

/* ------------------------------------------------------------------ */
/* Per-variant module bodies                                           */
/* ------------------------------------------------------------------ */

function StageBody({ stage }: { stage: GrowthStage }) {
  switch (stage.variant) {
    case "sources":
      return <SourcesBody stage={stage} />;
    case "flow":
      return <FlowBody stage={stage} />;
    case "qualify":
      return <QualifyBody stage={stage} />;
    case "automation":
      return <AutomationBody stage={stage} />;
    case "metrics":
      return <MetricsBody stage={stage} />;
    case "revenue":
      return <RevenueBody stage={stage} />;
    case "list":
    default:
      return <ListBody stage={stage} />;
  }
}

function Metric({
  value,
  prefix,
  suffix,
  decimals,
  separator,
  className,
}: {
  value: number;
  prefix?: string;
  suffix?: string;
  decimals?: number;
  separator?: boolean;
  className?: string;
}) {
  return (
    <AnimatedNumber
      value={value}
      prefix={prefix}
      suffix={suffix}
      decimals={decimals ?? 0}
      separator={separator ?? true}
      className={className}
    />
  );
}

function SourcesBody({ stage }: { stage: GrowthStage }) {
  return (
    <div>
      <div className="grid grid-cols-5 gap-2">
        {stage.sources?.map((s) => {
          const SIcon = s.icon;
          return (
            <div
              key={s.name}
              title={s.name}
              className="flex aspect-square items-center justify-center rounded-xl bg-white/70 shadow-sm ring-1 ring-ink/5"
            >
              <SIcon className="h-4 w-4" style={{ color: s.hue }} />
            </div>
          );
        })}
      </div>
      <p className="mt-3 text-xs text-muted">
        Ten scattered channels — merged into one clean input.
      </p>
    </div>
  );
}

function FlowBody({ stage }: { stage: GrowthStage }) {
  return (
    <div>
      <div className="space-y-1.5">
        {stage.items?.map((it, i) => {
          const IIcon = it.icon;
          return (
            <Fragment key={it.label}>
              <div className="flex items-center gap-2.5 rounded-xl bg-white/60 px-3 py-2 ring-1 ring-ink/5">
                {IIcon && <IIcon className="h-4 w-4 text-amber-600" />}
                <span className="text-sm font-medium text-ink">{it.label}</span>
              </div>
              {i < (stage.items?.length ?? 0) - 1 && (
                <ChevronDown className="mx-auto h-3 w-3 text-amber-400" />
              )}
            </Fragment>
          );
        })}
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {stage.metrics?.map((m) => (
          <div
            key={m.label}
            className="rounded-xl bg-amber-50/80 px-3 py-2 ring-1 ring-amber-200/60"
          >
            <div className="text-base font-semibold text-ink">
              <Metric value={m.value} prefix={m.prefix} suffix={m.suffix} decimals={m.decimals} />
            </div>
            <div className="text-[0.68rem] uppercase tracking-wide text-muted">{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function QualifyBody({ stage }: { stage: GrowthStage }) {
  const dots = Array.from({ length: 10 });
  return (
    <div>
      {/* gray particles fade, gold particles continue */}
      <div className="flex items-center gap-1.5">
        {dots.map((_, i) => {
          const keep = i % 3 === 0; // ~a third qualify
          return (
            <motion.span
              key={i}
              className={cn(
                "h-2 w-2 rounded-full",
                keep ? "bg-amber-500 shadow-glow-sm" : "bg-ink/25",
              )}
              animate={
                keep
                  ? { opacity: [0.5, 1, 0.5], scale: [0.9, 1, 0.9] }
                  : { opacity: [0.4, 0, 0.4] }
              }
              transition={{
                duration: 2.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.12,
              }}
            />
          );
        })}
      </div>

      <ul className="mt-4 space-y-1.5">
        {stage.items?.map((it) => (
          <li key={it.label} className="flex items-start gap-2 text-sm text-ink">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-amber-500" />
            {it.label}
          </li>
        ))}
      </ul>

      {stage.metrics?.[0] && (
        <div className="mt-4 rounded-xl bg-amber-50/80 px-3 py-2 ring-1 ring-amber-200/60">
          <span className="text-lg font-semibold text-ink">
            <Metric
              value={stage.metrics[0].value}
              suffix={stage.metrics[0].suffix}
              decimals={stage.metrics[0].decimals}
            />
          </span>
          <span className="ml-2 text-xs uppercase tracking-wide text-muted">
            {stage.metrics[0].label}
          </span>
        </div>
      )}
    </div>
  );
}

function ListBody({ stage }: { stage: GrowthStage }) {
  return (
    <ul className="space-y-2">
      {stage.items?.map((it) => {
        const IIcon = it.icon;
        return (
          <li
            key={it.label}
            className="flex items-center gap-2.5 rounded-xl bg-white/60 px-3 py-2 ring-1 ring-ink/5"
          >
            {IIcon && (
              <span className="flex h-6 w-6 items-center justify-center rounded-lg bg-amber-100 text-amber-700">
                <IIcon className="h-3.5 w-3.5" />
              </span>
            )}
            <span className="text-sm font-medium text-ink">{it.label}</span>
          </li>
        );
      })}
    </ul>
  );
}

function AutomationBody({ stage }: { stage: GrowthStage }) {
  return (
    <div className="relative pl-4">
      {/* trunk */}
      <span className="absolute left-1 top-2 bottom-2 w-px bg-gradient-to-b from-amber-300/40 via-amber-500/60 to-amber-300/40" />
      <ul className="space-y-2">
        {stage.items?.map((it, i) => {
          const IIcon = it.icon;
          return (
            <li key={it.label} className="relative flex items-center gap-2.5">
              {/* branch */}
              <span className="absolute -left-3 top-1/2 h-px w-3 -translate-y-1/2 bg-amber-400/50" />
              <motion.span
                className="absolute -left-3 top-1/2 h-1 w-1 -translate-y-1/2 rounded-full bg-amber-500 shadow-glow-sm"
                animate={{ x: [0, 12], opacity: [0, 1, 0] }}
                transition={{
                  duration: 1.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: i * 0.35,
                }}
              />
              <span className="flex items-center gap-2.5 rounded-xl bg-white/60 px-3 py-1.5 ring-1 ring-ink/5">
                {IIcon && <IIcon className="h-3.5 w-3.5 text-amber-600" />}
                <span className="text-sm font-medium text-ink">{it.label}</span>
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function MetricsBody({ stage }: { stage: GrowthStage }) {
  return (
    <div className="space-y-2">
      {stage.metrics?.map((m, i) => {
        const IIcon = stage.items?.[i]?.icon;
        return (
          <div
            key={m.label}
            className="flex items-center justify-between rounded-xl bg-white/60 px-3 py-2.5 ring-1 ring-ink/5"
          >
            <span className="flex items-center gap-2 text-sm text-muted">
              {IIcon && <IIcon className="h-4 w-4 text-amber-600" />}
              {m.label}
            </span>
            <span className="text-base font-semibold text-ink">
              <Metric value={m.value} prefix={m.prefix} suffix={m.suffix} decimals={m.decimals} />
            </span>
          </div>
        );
      })}
    </div>
  );
}

function RevenueBody({ stage }: { stage: GrowthStage }) {
  const hero = stage.metrics?.[0];
  const supporting = stage.metrics?.slice(1) ?? [];
  return (
    <div>
      {hero && (
        <div className="rounded-2xl bg-gradient-to-br from-amber-100/80 to-white/60 px-4 py-4 text-center ring-1 ring-amber-300/60">
          <div className="text-[0.68rem] uppercase tracking-[0.18em] text-amber-700">
            {hero.label}
          </div>
          <div className="mt-1 text-4xl font-semibold tracking-tight">
            <Metric
              value={hero.value}
              prefix={hero.prefix}
              suffix={hero.suffix}
              decimals={hero.decimals}
              separator={hero.separator}
              className="text-gradient-gold"
            />
          </div>
        </div>
      )}
      <div className="mt-3 grid grid-cols-2 gap-2">
        {supporting.map((m) => (
          <div
            key={m.label}
            className="rounded-xl bg-white/70 px-3 py-2 text-center ring-1 ring-ink/5"
          >
            <div className="text-base font-semibold text-ink">
              <Metric
                value={m.value}
                prefix={m.prefix}
                suffix={m.suffix}
                decimals={m.decimals}
                separator={m.separator}
              />
            </div>
            <div className="text-[0.62rem] uppercase tracking-wide text-muted">{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
