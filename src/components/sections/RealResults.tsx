import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, MapPin, TrendingUp, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GradientSerif } from "@/components/shared/GradientSerif";
import { caseStudies, type CaseStudy } from "@/lib/data/caseStudies";

/** Chart geometry — SVG viewBox is 0 0 300 120. */
const CHART_W = 300;
const CHART_H = 120;
const PAD_TOP = 8;
const PLOT_H = 100;

interface ChartPoint {
  x: number;
  y: number;
}

/** Map the 12 normalised (0..100) values into SVG coordinates. */
function toPoints(chart: number[]): ChartPoint[] {
  const n = chart.length;
  return chart.map((v, i) => ({
    x: n > 1 ? (i / (n - 1)) * CHART_W : 0,
    y: CHART_H - (v / 100) * PLOT_H - PAD_TOP,
  }));
}

/** Build a smooth cubic-bezier path through the points (Catmull-Rom → Bézier). */
function smoothPath(points: ChartPoint[]): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x},${points[0].y}`;

  let d = `M ${points[0].x},${points[0].y}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i === 0 ? 0 : i - 1];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2 < points.length ? i + 2 : i + 1];

    const cp1x = p1.x + (p2.x - p0.x) / 6;
    const cp1y = p1.y + (p2.y - p0.y) / 6;
    const cp2x = p2.x - (p3.x - p1.x) / 6;
    const cp2y = p2.y - (p3.y - p1.y) / 6;

    d += ` C ${cp1x},${cp1y} ${cp2x},${cp2y} ${p2.x},${p2.y}`;
  }
  return d;
}

interface GrowthChartProps {
  study: CaseStudy;
}

function GrowthChart({ study }: GrowthChartProps) {
  const points = toPoints(study.chart);
  const linePath = smoothPath(points);
  const areaPath = `${linePath} L ${CHART_W},${CHART_H} L 0,${CHART_H} Z`;
  const last = points[points.length - 1];
  const fillId = `results-fill-${study.id}`;
  const glowId = `results-glow-${study.id}`;

  return (
    <svg
      viewBox={`0 0 ${CHART_W} ${CHART_H}`}
      className="h-28 w-full"
      preserveAspectRatio="none"
      role="img"
      aria-label={`Growth trend for ${study.company}`}
    >
      <defs>
        <linearGradient id={fillId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={study.accent} stopOpacity={0.22} />
          <stop offset="100%" stopColor={study.accent} stopOpacity={0} />
        </linearGradient>
        <filter id={glowId} x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* subtle grid baseline */}
      {[0.33, 0.66, 1].map((f) => (
        <line
          key={f}
          x1={0}
          x2={CHART_W}
          y1={PAD_TOP + PLOT_H * f}
          y2={PAD_TOP + PLOT_H * f}
          stroke="currentColor"
          strokeWidth={1}
          className="text-ink/5"
        />
      ))}

      {/* soft gradient area fill */}
      <motion.path
        d={areaPath}
        fill={`url(#${fillId})`}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, delay: 0.3 }}
      />

      {/* animated stroke */}
      <motion.path
        d={linePath}
        fill="none"
        stroke={study.accent}
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={{ pathLength: 0 }}
        whileInView={{ pathLength: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      />

      {/* glowing end dot */}
      {last && (
        <motion.g
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 1.5 }}
        >
          <circle cx={last.x} cy={last.y} r={5.5} fill={study.accent} opacity={0.25} />
          <circle
            cx={last.x}
            cy={last.y}
            r={3}
            fill={study.accent}
            filter={`url(#${glowId})`}
          />
        </motion.g>
      )}
    </svg>
  );
}

interface CaseStudyCardProps {
  study: CaseStudy;
  index: number;
}

function CaseStudyCard({ study, index }: CaseStudyCardProps) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const pairs = study.before.map((b, i) => ({ before: b, after: study.after[i] }));

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "group flex flex-col gap-6 glass rounded-glass p-7 shadow-float sm:p-9",
        "transition-all duration-500 hover:-translate-y-1.5 hover:shadow-float-lg",
      )}
    >
      {/* header: industry + location + company */}
      <header className="flex flex-col gap-3">
        <div className="flex items-center gap-3 text-xs font-medium uppercase tracking-[0.16em] text-muted">
          <span className="inline-flex items-center gap-1.5">
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{ backgroundColor: study.accent }}
            />
            {study.industry}
          </span>
          <span className="inline-flex items-center gap-1 text-muted/80">
            <MapPin className="h-3 w-3" aria-hidden />
            {study.location}
          </span>
        </div>
        <h3 className="text-xl font-semibold tracking-tight text-ink">{study.company}</h3>
      </header>

      {/* headline metric + chart */}
      <div className="flex items-end justify-between gap-4">
        <div className="flex flex-col">
          <span
            className="text-4xl font-bold tracking-tight sm:text-5xl"
            style={{ color: study.accent }}
          >
            {study.headlineMetric}
          </span>
          <span className="mt-1 text-sm text-muted">{study.headlineLabel}</span>
        </div>
        <span
          className="inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold"
          style={{
            backgroundColor: `${study.accent}14`,
            color: study.accent,
          }}
        >
          <TrendingUp className="h-3.5 w-3.5" aria-hidden />
          Growth
        </span>
      </div>

      <GrowthChart study={study} />

      {/* summary */}
      <p className="text-pretty text-sm leading-relaxed text-muted">{study.summary}</p>

      {/* services chips */}
      <ul className="flex flex-wrap gap-2">
        {study.services.map((service) => (
          <li
            key={service}
            className="rounded-full bg-amber-50 px-3 py-1 text-xs font-medium text-amber-700"
          >
            {service}
          </li>
        ))}
      </ul>

      {/* before → after */}
      <div className="flex flex-col gap-2 rounded-2xl glass-strong p-4">
        {pairs.map(({ before, after }) => (
          <div
            key={before.label}
            className="grid grid-cols-[1fr_auto_auto] items-center gap-3 text-sm"
          >
            <span className="truncate text-xs uppercase tracking-wide text-muted/80">
              {before.label}
            </span>
            <span className="text-sm text-muted line-through decoration-muted/40">
              {before.value}
            </span>
            <span className="flex items-center gap-2 justify-self-end">
              <ArrowRight className="h-3.5 w-3.5 text-muted/60" aria-hidden />
              <span className="font-semibold text-ink" style={{ color: study.accent }}>
                {after.value}
              </span>
            </span>
          </div>
        ))}
      </div>

      {/* timeline pill */}
      <footer className="flex items-center justify-between">
        <span className="inline-flex items-center gap-1.5 rounded-full glass px-3 py-1.5 text-xs font-medium text-ink">
          <span className="h-1 w-1 rounded-full bg-amber" />
          {study.timeline}
        </span>
        <span className="inline-flex items-center gap-1 text-xs font-medium text-muted transition-colors group-hover:text-amber">
          Read the story
          <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
        </span>
      </footer>
    </motion.article>
  );
}

export function RealResults() {
  return (
    <section id="results" className="relative z-10 px-4 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Real Results"
          title={
            <>
              Systems that produce <GradientSerif>revenue.</GradientSerif>
            </>
          }
          description="Real engagements, real numbers. These are a handful of the businesses we've helped turn traffic into predictable, compounding revenue."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-8">
          {caseStudies.map((study, index) => (
            <CaseStudyCard key={study.id} study={study} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}
