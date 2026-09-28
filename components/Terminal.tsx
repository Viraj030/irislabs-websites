"use client";

import { useEffect, useRef, useState } from "react";
import { useInViewOnce } from "@/lib/useInViewOnce";
import { TERMINAL_LINES } from "@/lib/data";
import { useReducedMotion } from "@/lib/useReducedMotion";

type Line = { text: string; color: string; cursor?: boolean };
export type TerminalScriptLine = { t: string; c: string; d: number };

export function Terminal({
  script = TERMINAL_LINES,
  title = "IRISLABS — ENGAGEMENT.SH",
  minHeight = 290,
  dense = false,
}: {
  script?: readonly TerminalScriptLine[];
  title?: string;
  minHeight?: number;
  /** Smaller type on mobile, so narrow columns don't wrap mid-line. */
  dense?: boolean;
}) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.25);
  const reduced = useReducedMotion();
  const [lines, setLines] = useState<Line[]>([]);
  const started = useRef(false);

  useEffect(() => {
    if (!inView || reduced || started.current) return;
    started.current = true;

    const timers: ReturnType<typeof setTimeout>[] = [];
    let li = 0;

    function nextLine() {
      if (li >= script.length) {
        setLines((prev) => [...prev, { text: "$ ", color: "var(--color-gold)", cursor: true }]);
        return;
      }
      const line = script[li++];
      if (!line.d) {
        setLines((prev) => [...prev, { text: line.t, color: line.c }]);
        timers.push(setTimeout(nextLine, 120));
        return;
      }
      setLines((prev) => [...prev, { text: "", color: line.c }]);
      const lineIndex = li - 1;
      let ci = 0;
      function type() {
        ci++;
        setLines((prev) => {
          const next = [...prev];
          next[lineIndex] = { text: line.t.slice(0, ci), color: line.c };
          return next;
        });
        if (ci < line.t.length) timers.push(setTimeout(type, line.d));
        else timers.push(setTimeout(nextLine, 90));
      }
      type();
    }
    nextLine();

    return () => timers.forEach(clearTimeout);
  }, [inView, reduced, script]);

  const staticLines: Line[] = [
    ...script.map((l) => ({ text: l.t, color: l.c })),
    { text: "$ ", color: "var(--color-gold)", cursor: true },
  ];
  const displayLines = reduced ? (inView ? staticLines : []) : lines;

  return (
    <div
      ref={ref}
      className="overflow-hidden rounded-[2px] border border-line bg-void"
    >
      <div className="flex items-center gap-2.5 border-b border-line bg-raise px-4 py-3">
        <span
          className="block h-[7px] w-[7px]"
          style={{ background: "var(--color-signal)", boxShadow: "0 0 8px var(--color-signal)" }}
        />
        <span className="font-mono text-[10px] tracking-[0.16em] text-low">
          {title}
        </span>
      </div>
      <div
        className={`px-5 py-5 font-mono leading-[1.9] whitespace-pre-wrap md:px-5 md:py-5 md:text-[13px] ${
          dense ? "text-[10.5px]" : "text-[12px]"
        }`}
        style={{ minHeight }}
      >
        {displayLines.map((line, i) => (
          <div key={i} style={{ color: line.color, minHeight: "1.9em" }}>
            {line.text}
            {line.cursor && <span className="animate-blink">█</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
