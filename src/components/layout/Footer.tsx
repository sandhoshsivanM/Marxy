import { BRAND, NAV_LINKS } from "@/lib/constants";
import { GradientSerif } from "@/components/shared/GradientSerif";
import { scrollToAnchor } from "@/components/layout/SmoothScroll";

export function Footer() {
  return (
    <footer className="relative z-10 px-4 pb-10 pt-24">
      <div className="mx-auto max-w-6xl">
        <div className="glass rounded-glass p-10 md:p-14">
          <div className="flex flex-col gap-12 md:flex-row md:items-start md:justify-between">
            <div className="max-w-sm">
              <div className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-700 text-base font-bold text-cream">
                  M
                </span>
                <span className="text-lg font-semibold">{BRAND.name}</span>
              </div>
              <p className="mt-5 text-lg leading-snug text-ink">
                We don't run campaigns. We engineer <GradientSerif>Revenue Operating Systems</GradientSerif>.
              </p>
              <p className="mt-4 text-sm text-muted">
                AI-powered growth systems that generate leads, automate sales, and create
                predictable monthly revenue.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                  Navigate
                </h4>
                <ul className="mt-4 space-y-3">
                  {NAV_LINKS.map((l) => (
                    <li key={l.href}>
                      <button
                        onClick={() => scrollToAnchor(l.href)}
                        className="text-sm text-ink/80 transition-colors hover:text-amber-700"
                      >
                        {l.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                  Company
                </h4>
                <ul className="mt-4 space-y-3 text-sm text-ink/80">
                  <li>About</li>
                  <li>Careers</li>
                  <li>Playbook</li>
                  <li>Contact</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted">
                  Connect
                </h4>
                <ul className="mt-4 space-y-3 text-sm text-ink/80">
                  <li>LinkedIn</li>
                  <li>Instagram</li>
                  <li>YouTube</li>
                  <li>hello@marksys.co</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-black/5 pt-6 text-xs text-muted sm:flex-row">
            <span>© {new Date().getFullYear()} {BRAND.name} — {BRAND.tagline}. All rights reserved.</span>
            <span className="flex items-center gap-4">
              <span>Privacy</span>
              <span>Terms</span>
              <span className="text-amber-700">Built as a Revenue OS</span>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
