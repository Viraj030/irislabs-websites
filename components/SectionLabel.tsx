"use client";

import { useInViewOnce } from "@/lib/useInViewOnce";

/** Section eyebrow drawn as a drawing-sheet callout: register tick, index,
 *  label, then a hairline that draws out across the remaining measure. */
export function SectionLabel({
  index,
  label,
  tone = "gold",
  className = "",
}: {
  index: string;
  label: string;
  /** "dark" inverts for use on the gold band. */
  tone?: "gold" | "muted" | "dark";
  className?: string;
}) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.4);

  const color =
    tone === "dark"
      ? "#5c4610"
      : tone === "muted"
        ? "var(--color-low)"
        : "var(--color-gold)";
  const ruleColor =
    tone === "dark" ? "rgba(92,70,16,0.45)" : "var(--color-line)";

  return (
    <div ref={ref} className={`flex items-center gap-3 ${className}`}>
      <span
        className="block h-[5px] w-[5px] flex-none"
        style={{ background: color }}
        aria-hidden="true"
      />
      <span className="eyebrow flex-none" style={{ color }}>
        {index} / {label}
      </span>
      <span
        className={`h-px min-w-6 flex-1 ${inView ? "rule-draw" : ""}`}
        style={{ background: ruleColor, transform: inView ? undefined : "scaleX(0)" }}
        aria-hidden="true"
      />
    </div>
  );
}
