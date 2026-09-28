"use client";

import { useEffect, useRef, useState } from "react";
import { useInViewOnce } from "@/lib/useInViewOnce";
import { useReducedMotion } from "@/lib/useReducedMotion";

const GLYPHS = "▚▞█▓▒░/\\|<>[]{}=+*#@$%&0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const DURATION = 1600; // ms — slow, dramatic decode
const START_DELAY = 250; // ms — let Reveal fade-in settle first

/** Scrambles glyphs into the final headline text once, on scroll into view. */
export function DecodeText({
  text,
  as: Tag = "span",
  className,
  style,
}: {
  text: string;
  as?: "span" | "h1" | "h2";
  className?: string;
  style?: React.CSSProperties;
}) {
  // threshold=0 → fires as soon as any pixel enters the viewport
  const { ref, inView } = useInViewOnce<HTMLElement>(0);
  const reduced = useReducedMotion();
  const [display, setDisplay] = useState(reduced ? text : "");
  const started = useRef(false);

  useEffect(() => {
    if (!inView || reduced || started.current) return;
    started.current = true;

    let cleanup: (() => void) | undefined;

    const startTimer = setTimeout(() => {
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
        if (p < 1) {
          raf = requestAnimationFrame(tick);
        } else {
          setDisplay(text);
        }
      };
      raf = requestAnimationFrame(tick);
      cleanup = () => cancelAnimationFrame(raf);
    }, START_DELAY);

    return () => {
      clearTimeout(startTimer);
      cleanup?.();
    };
  }, [inView, reduced, text]);

  // Hard fallback: if animation never fired after 2.5s (e.g. IO missed), show text
  useEffect(() => {
    const t = setTimeout(() => {
      if (!started.current) {
        started.current = true;
        setDisplay(text);
      }
    }, 2500);
    return () => clearTimeout(t);
  }, [text]);

  return (
    // @ts-expect-error -- dynamic ref tag
    <Tag ref={ref} className={className} style={style} aria-label={text}>
      {/* Invisible placeholder keeps layout stable before animation starts */}
      {display || <span aria-hidden="true" style={{ opacity: 0 }}>{text}</span>}
    </Tag>
  );
}
