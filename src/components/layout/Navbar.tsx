import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { BRAND, NAV_LINKS } from "@/lib/constants";
import { scrollToAnchor } from "@/components/layout/SmoothScroll";
import { MagneticButton } from "@/components/shared/MagneticButton";
import { cn } from "@/lib/utils";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const go = (href: string) => {
    setOpen(false);
    scrollToAnchor(href);
  };

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className={cn(
          "flex w-full max-w-6xl items-center justify-between rounded-full px-3 py-2 transition-all duration-500",
          scrolled ? "glass-strong shadow-float" : "bg-transparent",
        )}
      >
        <button onClick={() => go("#top")} className="flex items-center gap-2 pl-3 pr-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-gradient-to-br from-amber-400 to-amber-700 text-sm font-bold text-cream shadow-glow-sm">
            M
          </span>
          <span className="text-[1.05rem] font-semibold tracking-tight">
            {BRAND.name}
            <span className="ml-1.5 hidden text-xs font-normal text-muted sm:inline">
              {BRAND.tagline}
            </span>
          </span>
        </button>

        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <button
              key={l.href}
              onClick={() => go(l.href)}
              className="rounded-full px-4 py-2 text-sm text-muted transition-colors hover:bg-black/[0.03] hover:text-ink"
            >
              {l.label}
            </button>
          ))}
        </div>

        <div className="hidden md:block">
          <MagneticButton onClick={() => go("#contact")} className="px-5 py-2.5 text-sm">
            Book Strategy Call
          </MagneticButton>
        </div>

        <button
          className="glass flex h-10 w-10 items-center justify-center rounded-full md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            className="glass-strong absolute inset-x-4 top-20 rounded-3xl p-4 shadow-float md:hidden"
          >
            <div className="flex flex-col gap-1">
              {NAV_LINKS.map((l) => (
                <button
                  key={l.href}
                  onClick={() => go(l.href)}
                  className="rounded-2xl px-4 py-3 text-left text-base text-ink hover:bg-black/[0.03]"
                >
                  {l.label}
                </button>
              ))}
              <button
                onClick={() => go("#contact")}
                className="mt-2 rounded-2xl bg-gradient-to-br from-amber-400 to-amber-700 px-4 py-3 text-center font-medium text-cream"
              >
                Book Strategy Call
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
