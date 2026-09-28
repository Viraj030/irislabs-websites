"use client";

import { useEffect, useState } from "react";
import { useInViewOnce } from "@/lib/useInViewOnce";
import { useReducedMotion } from "@/lib/useReducedMotion";

const GLYPHS = "▚▞█▓▒░/\\|<>[]{}=+*#@$%&0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DURATION = 600;

/** Scrambles glyphs into the final headline text once, on scroll into view. */
export function DecodeText({
  text,
  as: Tag = "span",
  className,
}: {
  text: string;
  as?: "span" | "h1" | "h2";
  className?: string;
}) {
  const { ref, inView } = useInViewOnce<HTMLElement>(0.3);
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? text : "");

  useEffect(() => {
    if (!inView || reduced) return;
    let raf = 0;
    const start = performance.now();
    const chars = text.split("");
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / DURATION);
      const settled = Math.floor(p * chars.length);
      let out = "";
      for (let i = 0; i < chars.length; i++) {
        if (i < settled || chars[i] === " ") out += chars[i];
        else out += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
      }
      setDisplay(out);
      if (p < 1) raf = requestAnimationFrame(tick);
      else setDisplay(text);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, text]);

  return (
    // @ts-expect-error -- dynamic ref tag
    <Tag ref={ref} className={className} aria-label={text}>
      {display || " "}
    </Tag>
  );
}
