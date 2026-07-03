import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Check, Loader2, TerminalSquare } from "lucide-react";
import { AI_TERMINAL_STEPS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface Line {
  text: string;
  done: boolean;
}

export function AITerminal({ businessName }: { businessName?: string }) {
  const [lines, setLines] = useState<Line[]>([]);
  const [typed, setTyped] = useState("");
  const [complete, setComplete] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const steps = businessName
    ? [`Analyzing ${businessName}…`, ...AI_TERMINAL_STEPS.slice(1)]
    : AI_TERMINAL_STEPS;

  useEffect(() => {
    let cancelled = false;
    let stepIndex = 0;

    const runStep = () => {
      if (cancelled || stepIndex >= steps.length) {
        if (!cancelled) {
          setComplete(true);
        }
        return;
      }
      const full = steps[stepIndex];
      let char = 0;
      setTyped("");

      const typeChar = () => {
        if (cancelled) return;
        char++;
        setTyped(full.slice(0, char));
        if (char < full.length) {
          window.setTimeout(typeChar, 18 + Math.random() * 26);
        } else {
          // brief "processing" pause, then commit line
          window.setTimeout(() => {
            if (cancelled) return;
            setLines((prev) => [...prev, { text: full, done: true }]);
            setTyped("");
            stepIndex++;
            window.setTimeout(runStep, 180);
          }, 260 + Math.random() * 260);
        }
      };
      typeChar();
    };

    const start = window.setTimeout(runStep, 300);
    return () => {
      cancelled = true;
      window.clearTimeout(start);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [lines, typed]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="overflow-hidden rounded-glass shadow-float-lg"
      style={{ background: "rgba(24,20,17,0.92)", backdropFilter: "blur(20px)" }}
    >
      {/* title bar */}
      <div className="flex items-center gap-2 border-b border-white/10 px-5 py-3">
        <span className="flex gap-1.5">
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </span>
        <span className="ml-2 flex items-center gap-2 text-xs font-medium text-amber-200/80">
          <TerminalSquare className="h-3.5 w-3.5" />
          marksy-ai · business-analysis
        </span>
      </div>

      {/* body */}
      <div ref={scrollRef} className="no-scrollbar h-72 overflow-y-auto px-5 py-4 font-mono text-sm">
        {lines.map((l, i) => (
          <div key={i} className="flex items-start gap-2 py-0.5 text-amber-50/90">
            <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-emerald-400" />
            <span>{l.text}</span>
          </div>
        ))}

        {!complete && typed && (
          <div className="flex items-start gap-2 py-0.5 text-amber-100">
            <Loader2 className="mt-0.5 h-3.5 w-3.5 shrink-0 animate-spin text-amber-400" />
            <span>
              {typed}
              <span className="ml-0.5 inline-block h-4 w-2 translate-y-0.5 animate-pulse bg-amber-300" />
            </span>
          </div>
        )}

        {complete && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 flex items-center gap-2 rounded-xl bg-emerald-400/10 px-3 py-2 text-emerald-300"
          >
            <Check className="h-4 w-4" />
            <span className="font-semibold">Complete ✓ — Your Revenue OS blueprint is ready.</span>
          </motion.div>
        )}

        {complete && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-3 text-xs text-amber-200/60"
          >
            A strategist will reach out within 24 hours with your custom growth model.
          </motion.p>
        )}
      </div>

      {/* footer status */}
      <div className="flex items-center justify-between border-t border-white/10 px-5 py-2.5 text-[0.7rem] text-amber-200/60">
        <span className={cn("flex items-center gap-1.5", complete ? "text-emerald-300" : "text-amber-300")}>
          <span className={cn("h-1.5 w-1.5 rounded-full", complete ? "bg-emerald-400" : "animate-pulse-dot bg-amber-400")} />
          {complete ? "Analysis complete" : "Analyzing…"}
        </span>
        <span>{lines.length}/{steps.length} steps</span>
      </div>
    </motion.div>
  );
}
