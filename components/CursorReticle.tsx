"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

function subscribe() {
  return () => {};
}

function getPointerFineSnapshot() {
  return window.matchMedia("(pointer: fine)").matches;
}

function getServerSnapshot() {
  return false;
}

export function CursorReticle() {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useSyncExternalStore(subscribe, getPointerFineSnapshot, getServerSnapshot);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!enabled || reduced) return;
    const el = ref.current;
    if (!el) return;

    function onMove(e: PointerEvent) {
      if (!el) return;
      const hot = document.elementFromPoint(e.clientX, e.clientY);
      const interactive = hot?.closest("button, a, input, select, textarea");
      el.style.opacity = "1";
      el.style.transform = `translate(-50%, -50%) translate(${e.clientX}px, ${e.clientY}px) scale(${interactive ? 1.5 : 1})`;
    }
    function onLeave() {
      if (el) el.style.opacity = "0";
    }

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, [enabled, reduced]);

  if (!enabled || reduced) return null;

  return (
    <div
      ref={ref}
      className="pointer-events-none fixed left-0 top-0 z-[60] h-[22px] w-[22px] opacity-0 transition-[transform,opacity] duration-100 ease-[var(--ease-state)]"
      aria-hidden="true"
    >
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" stroke="var(--color-gold)" strokeWidth="1">
        <path d="M11 0v6M11 16v6M0 11h6M16 11h6" />
        <rect x="6.5" y="6.5" width="9" height="9" />
      </svg>
    </div>
  );
}
