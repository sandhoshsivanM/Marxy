import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { GradientSerif } from "@/components/shared/GradientSerif";
import { AITerminal } from "./AITerminal";
import { cn } from "@/lib/utils";
import { Sparkles, ArrowRight } from "lucide-react";

const INDUSTRIES = [
  "Restaurant",
  "Healthcare",
  "Construction",
  "Real Estate",
  "Education",
  "SaaS",
  "Ecommerce",
  "Personal Brand",
  "Local Business",
  "Other",
];

const REVENUE_BANDS = ["< $10K/mo", "$10K–50K/mo", "$50K–250K/mo", "$250K–1M/mo", "$1M+/mo"];
const BUDGETS = ["< $2K/mo", "$2K–5K/mo", "$5K–15K/mo", "$15K+/mo"];

interface FormState {
  name: string;
  business: string;
  website: string;
  revenue: string;
  industry: string;
  challenge: string;
  goal: string;
  budget: string;
  message: string;
}

const EMPTY: FormState = {
  name: "",
  business: "",
  website: "",
  revenue: "",
  industry: "",
  challenge: "",
  goal: "",
  budget: "",
  message: "",
};

export function Contact() {
  const [form, setForm] = useState<FormState>(EMPTY);
  const [submitted, setSubmitted] = useState(false);

  const set = (k: keyof FormState) => (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const fieldCls =
    "w-full rounded-2xl border border-black/[0.06] bg-white/50 px-4 py-3 text-sm text-ink outline-none transition-all placeholder:text-muted/70 focus:border-amber-400/60 focus:bg-white/80 focus:ring-2 focus:ring-amber-400/20";
  const labelCls = "mb-1.5 block text-xs font-medium uppercase tracking-wide text-muted";

  return (
    <section id="contact" className="relative z-10 px-4 py-28 sm:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="Start Your System"
          title={
            <>
              Let's engineer your <GradientSerif>Revenue Operating System.</GradientSerif>
            </>
          }
          description="Tell us about your business. Our AI runs an instant analysis, then a strategist maps your custom growth model."
        />

        <div className="mt-14 grid grid-cols-1 gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          {/* form / terminal */}
          <div className="glass-strong rounded-glass p-7 shadow-float-lg sm:p-9">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.form
                  key="form"
                  onSubmit={onSubmit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 gap-4 sm:grid-cols-2"
                >
                  <div className="sm:col-span-1">
                    <label className={labelCls}>Name</label>
                    <input required value={form.name} onChange={set("name")} placeholder="Jordan Rivera" className={fieldCls} />
                  </div>
                  <div className="sm:col-span-1">
                    <label className={labelCls}>Business</label>
                    <input required value={form.business} onChange={set("business")} placeholder="Rivera & Co." className={fieldCls} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Website</label>
                    <input value={form.website} onChange={set("website")} placeholder="riveraco.com" className={fieldCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Monthly Revenue</label>
                    <select value={form.revenue} onChange={set("revenue")} className={cn(fieldCls, "appearance-none")}>
                      <option value="">Select…</option>
                      {REVENUE_BANDS.map((r) => (
                        <option key={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Industry</label>
                    <select value={form.industry} onChange={set("industry")} className={cn(fieldCls, "appearance-none")}>
                      <option value="">Select…</option>
                      {INDUSTRIES.map((r) => (
                        <option key={r}>{r}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={labelCls}>Biggest Challenge</label>
                    <input value={form.challenge} onChange={set("challenge")} placeholder="Inconsistent leads" className={fieldCls} />
                  </div>
                  <div>
                    <label className={labelCls}>Primary Goal</label>
                    <input value={form.goal} onChange={set("goal")} placeholder="Predictable revenue" className={fieldCls} />
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Monthly Budget</label>
                    <div className="flex flex-wrap gap-2">
                      {BUDGETS.map((b) => (
                        <button
                          type="button"
                          key={b}
                          onClick={() => setForm((f) => ({ ...f, budget: b }))}
                          className={cn(
                            "rounded-full px-4 py-2 text-xs font-medium transition-colors",
                            form.budget === b
                              ? "bg-gradient-to-br from-amber-400 to-amber-700 text-cream"
                              : "bg-white/60 text-muted hover:text-ink",
                          )}
                        >
                          {b}
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="sm:col-span-2">
                    <label className={labelCls}>Message</label>
                    <textarea
                      value={form.message}
                      onChange={set("message")}
                      rows={3}
                      placeholder="Anything else we should know…"
                      className={cn(fieldCls, "resize-none")}
                    />
                  </div>
                  <div className="sm:col-span-2">
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                      className="group flex w-full items-center justify-center gap-2 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700 px-6 py-4 font-medium text-cream shadow-glow transition-shadow hover:shadow-glow"
                      data-cursor="hover"
                    >
                      <Sparkles className="h-4 w-4" />
                      Analyze My Business
                      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </motion.button>
                    <p className="mt-3 text-center text-xs text-muted">
                      No spam. Your data stays private. Analysis is instant.
                    </p>
                  </div>
                </motion.form>
              ) : (
                <motion.div key="terminal" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <AITerminal businessName={form.business || undefined} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* side rail */}
          <div className="flex flex-col gap-6">
            <div className="glass rounded-glass p-7 shadow-float">
              <div className="text-lg font-semibold text-ink">What happens next</div>
              <ol className="mt-5 space-y-5">
                {[
                  { t: "Instant AI analysis", d: "Our AI scans your site, SEO, ads and funnel in seconds." },
                  { t: "Custom growth model", d: "A strategist builds your revenue forecast and roadmap." },
                  { t: "Strategy call", d: "We walk you through the system — no obligation." },
                ].map((s, i) => (
                  <li key={s.t} className="flex gap-4">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-amber-400 to-amber-700 text-xs font-bold text-cream">
                      {i + 1}
                    </span>
                    <div>
                      <div className="text-sm font-semibold text-ink">{s.t}</div>
                      <div className="text-sm text-muted">{s.d}</div>
                    </div>
                  </li>
                ))}
              </ol>
            </div>

            <div className="glass rounded-glass p-7 shadow-float">
              <div className="grid grid-cols-2 gap-5">
                {[
                  { v: "150+", l: "Businesses scaled" },
                  { v: "$5M+", l: "Revenue generated" },
                  { v: "98%", l: "Client retention" },
                  { v: "24/7", l: "AI systems live" },
                ].map((s) => (
                  <div key={s.l}>
                    <div className="text-2xl font-bold text-ink">{s.v}</div>
                    <div className="text-xs text-muted">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
