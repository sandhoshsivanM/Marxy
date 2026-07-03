import { cn } from "@/lib/utils";

/** Renders a phrase in Instrument Serif italic with a gold gradient clip. */
export function GradientSerif({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <span className={cn("font-serif italic text-gradient-gold", className)}>{children}</span>
  );
}
