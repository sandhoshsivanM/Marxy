import { useEffect, useState } from "react";
import { cn, clamp } from "@/lib/utils";
import { scrollToAnchor } from "@/components/layout/SmoothScroll";

/** Sections tracked by the rail — id matches each section's DOM id. */
const SECTIONS = [
  { id: "top", label: "Home" },
  { id: "dashboard", label: "Dashboard" },
  { id: "who-we-help", label: "Who We Help" },
  { id: "problem", label: "The Problem" },
  { id: "how-we-work", label: "Process" },
  { id: "services", label: "Services" },
  { id: "operating-system", label: "Growth System" },
  { id: "results", label: "Results" },
  { id: "testimonials", label: "Reviews" },
  { id: "contact", label: "Contact" },
] as const;

/**
 * Fixed left-side section rail + top scroll-progress bar.
 * Tracks scroll position (Lenis updates the real window scroll), highlights the
 * active section, reveals its label on hover, and scrolls on click.
 */
export function ProgressRail() {
  const [progress, setProgress] = useState(0);
  const [active, setActive] = useState<string>(SECTIONS[0].id);

  useEffect(() => {
    let frame = 0;

    const measure = () => {
      frame = 0;
      const scrollTop = window.scrollY;
      const docH = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docH > 0 ? clamp(scrollTop / docH) : 0);

      const mark = scrollTop + window.innerHeight * 0.35;
      let current = SECTIONS[0].id as string;
      for (const s of SECTIONS) {
        const el = document.getElementById(s.id);
        if (el && el.offsetTop <= mark) current = s.id;
      }
      setActive(current);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  const activeIndex = Math.max(
    0,
    SECTIONS.findIndex((s) => s.id === active),
  );
  const activeLabel = SECTIONS[activeIndex].label;

  return (
    <>
      {/* mobile-only current-section indicator (rail is hidden below lg) */}
      <div
        className="pointer-events-none fixed bottom-4 left-1/2 z-50 -translate-x-1/2 lg:hidden"
        aria-hidden
      >
        <div className="glass flex items-center gap-2 rounded-full px-3.5 py-1.5 text-xs shadow-glow-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-gradient-to-br from-amber-400 to-amber-600 shadow-glow-sm" />
          <span className="font-semibold text-ink transition-opacity duration-300">
            {activeLabel}
          </span>
          <span className="tabular-nums text-muted/80">
            {activeIndex + 1} / {SECTIONS.length}
          </span>
        </div>
      </div>

      {/* top scroll-progress bar */}
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[3px]" aria-hidden>
        <div
          className="h-full rounded-r-full bg-gradient-to-r from-amber-400 to-amber-600 shadow-glow-sm transition-[width] duration-150 ease-out"
          style={{ width: `${progress * 100}%` }}
        />
      </div>

      {/* left section rail */}
      <nav
        aria-label="Sections"
        className="fixed left-4 top-1/2 z-50 hidden -translate-y-1/2 flex-col gap-1 lg:flex"
      >
        {SECTIONS.map((s) => {
          const on = active === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => scrollToAnchor(`#${s.id}`)}
              className="group relative flex items-center gap-2.5 py-1"
              aria-label={s.label}
              aria-current={on ? "true" : undefined}
              data-cursor="hover"
            >
              <span className="grid h-3 w-3 place-items-center">
                <span
                  className={cn(
                    "rounded-full transition-all duration-300",
                    on
                      ? "h-3 w-3 bg-gradient-to-br from-amber-400 to-amber-600 shadow-glow-sm"
                      : "h-[7px] w-[7px] bg-ink/20 group-hover:bg-amber-300",
                  )}
                />
              </span>
              <span
                className={cn(
                  "pointer-events-none whitespace-nowrap rounded-full glass px-2.5 py-1 text-[11px] font-semibold text-ink shadow-glow-sm transition-all duration-300",
                  on
                    ? "translate-x-0 opacity-100"
                    : "-translate-x-1 opacity-0 group-hover:translate-x-0 group-hover:opacity-100",
                )}
              >
                {s.label}
              </span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
