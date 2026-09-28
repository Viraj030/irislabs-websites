"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { usePathname, useRouter } from "next/navigation";
import { useReducedMotion } from "@/lib/useReducedMotion";

/** Four beats of the motion graphic.
 *  open → scan → close → the screen itself parts like a lid. */
const OPEN_MS = 300;
const SCAN_MS = 260;
const CLOSE_MS = 200;
const REVEAL_MS = 340;
/** Never hold the curtain longer than this waiting on a route. */
const ROUTE_WAIT_CAP_MS = 900;

type Phase = "idle" | "opening" | "scanning" | "closing" | "revealing";

const NavigateContext = createContext<(href: string) => void>(() => {});

export function useEyeTransition() {
  return useContext(NavigateContext);
}

export function EyeTransition({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const reduced = useReducedMotion();

  // The intro plays on first paint; the curtain is in the SSR markup so there
  // is no flash of un-curtained content.
  const [phase, setPhase] = useState<Phase>("opening");
  const [target, setTarget] = useState<string | null>(null);

  // opening → scanning
  useEffect(() => {
    if (phase !== "opening") return;
    const t = setTimeout(() => setPhase("scanning"), OPEN_MS);
    return () => clearTimeout(t);
  }, [phase]);

  // scanning → closing. While navigating, the scan loops here until the new
  // route has actually rendered, so the swap never shows through.
  useEffect(() => {
    if (phase !== "scanning") return;
    const routeReady = target === null || pathname === target;
    const t = setTimeout(
      () => setPhase("closing"),
      routeReady ? SCAN_MS : ROUTE_WAIT_CAP_MS
    );
    return () => clearTimeout(t);
  }, [phase, pathname, target]);

  // closing → revealing
  useEffect(() => {
    if (phase !== "closing") return;
    const t = setTimeout(() => setPhase("revealing"), CLOSE_MS);
    return () => clearTimeout(t);
  }, [phase]);

  // revealing → idle (curtain unmounts)
  useEffect(() => {
    if (phase !== "revealing") return;
    const t = setTimeout(() => {
      setPhase("idle");
      setTarget(null);
    }, REVEAL_MS);
    return () => clearTimeout(t);
  }, [phase]);

  const navigate = useCallback(
    (href: string) => {
      if (href === pathname) return;
      if (reduced) {
        router.push(href);
        return;
      }
      setTarget(href);
      setPhase("opening");
      // Routing starts immediately and resolves under the curtain — the
      // animation masks the swap rather than delaying it.
      router.push(href);
    },
    [pathname, reduced, router]
  );

  return (
    <NavigateContext.Provider value={navigate}>
      {children}
      {phase !== "idle" && <EyeCurtain phase={phase} />}
    </NavigateContext.Provider>
  );
}

function EyeCurtain({ phase }: { phase: Phase }) {
  return (
    <div className="eye-curtain" data-phase={phase} aria-hidden="true">
      {/* The two lids. They part on the final beat to reveal the page. */}
      <div className="eye-curtain__lid eye-curtain__lid--top" />
      <div className="eye-curtain__lid eye-curtain__lid--bottom" />

      <div className="eye-curtain__eye">
        <svg viewBox="0 0 168 120" fill="none" className="w-full">
          <defs>
            <clipPath id="curtain-lens">
              <path d="M22 60 L54 44 L104 44 L124 58 L104 72 L54 72 Z" />
            </clipPath>
            <pattern
              id="curtain-lines"
              width="6"
              height="2.4"
              patternUnits="userSpaceOnUse"
            >
              <rect width="6" height="0.7" fill="var(--color-gold)" />
            </pattern>
          </defs>

          {/* Brow and lashes fade in once the lid is open. */}
          <g
            className="eye-curtain__marks"
            stroke="var(--color-gold)"
            strokeWidth="2.4"
            strokeLinejoin="miter"
            fill="none"
          >
            <path d="M44 34 L104 20 L112 28" />
            <path d="M56 72 L48 100" />
            <path d="M104 72 L112 86 L134 90" />
          </g>

          {/* Everything that opens and shuts lives in this group. */}
          <g className="eye-curtain__lens">
            <g clipPath="url(#curtain-lens)">
              <rect
                width="168"
                height="120"
                fill="url(#curtain-lines)"
                opacity="0.4"
              />
              {/* Scan bar, clipped to the lens so it reads as scanning inside the eye. */}
              <rect
                className="eye-curtain__scanbar"
                x="0"
                y="56"
                width="168"
                height="3"
                fill="var(--color-gold)"
              />
            </g>
            <path
              d="M22 60 L54 44 L104 44 L124 58 L104 72 L54 72 Z"
              stroke="var(--color-gold)"
              strokeWidth="2.4"
              strokeLinejoin="miter"
              fill="none"
            />
          </g>

          {/* Iris pops in after the lid opens, tracks the scan, shrinks on close. */}
          <g className="eye-curtain__iris">
            <circle cx="74" cy="58" r="13" fill="var(--color-void)" />
            <circle
              cx="74"
              cy="58"
              r="13"
              fill="none"
              stroke="var(--color-gold-dim)"
              strokeWidth="1"
            />
            <circle cx="74" cy="58" r="5.5" fill="var(--color-gold)" />
          </g>
        </svg>
      </div>
    </div>
  );
}
