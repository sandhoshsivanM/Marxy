import { motion } from "framer-motion";
import { useMagnetic } from "@/hooks/useMagnetic";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  href?: string;
  variant?: "primary" | "ghost";
  className?: string;
  icon?: React.ReactNode;
}

export function MagneticButton({
  children,
  onClick,
  href,
  variant = "primary",
  className,
  icon,
}: MagneticButtonProps) {
  const { ref, x, y, onMouseMove, onMouseLeave } = useMagnetic(0.35);

  const base =
    "group relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[0.95rem] font-medium tracking-tight transition-colors duration-300 select-none";

  const styles =
    variant === "primary"
      ? "text-cream shadow-glow"
      : "glass text-ink hover:text-amber-600";

  const content = (
    <>
      {variant === "primary" && (
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-400 via-amber-500 to-amber-700" />
      )}
      {variant === "primary" && (
        <span className="absolute inset-0 rounded-full bg-gradient-to-br from-amber-300/60 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      )}
      <span className="relative z-10 flex items-center gap-2">
        {children}
        {icon}
      </span>
    </>
  );

  const MotionTag = href ? motion.a : motion.button;

  return (
    <MotionTag
      // @ts-expect-error ref typing across a/button union
      ref={ref}
      href={href}
      onClick={onClick}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ x, y }}
      whileTap={{ scale: 0.96 }}
      className={cn(base, styles, className)}
    >
      {content}
    </MotionTag>
  );
}
