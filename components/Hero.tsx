"use client";

import { useRef } from "react";
import { Reveal } from "./Reveal";
import { DecodeText } from "./DecodeText";
import { GoldButton } from "./GoldButton";
import { useReducedMotion } from "@/lib/useReducedMotion";

export function Hero() {
  const stageRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const eyeRef = useRef<HTMLDivElement>(null);
  const irisRef = useRef<SVGCircleElement>(null);
  const reduced = useReducedMotion();

  function handlePointerMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduced || e.pointerType !== "mouse") return;
    const stage = stageRef.current;
    if (!stage) return;
    const r = stage.getBoundingClientRect();
    const nx = ((e.clientX - r.left) / r.width - 0.5) * 2;
    const ny = (Math.min(e.clientY - r.top, 700) / 700 - 0.5) * 2;
    if (glowRef.current) {
      glowRef.current.style.transform = `translate3d(${(nx * -14).toFixed(2)}px, ${(ny * -10).toFixed(2)}px, 0)`;
    }
    if (eyeRef.current) {
      eyeRef.current.style.transform = `translate3d(${(nx * -20).toFixed(2)}px, ${(ny * -14).toFixed(2)}px, 0)`;
    }
    if (irisRef.current) {
      irisRef.current.setAttribute(
        "transform",
        `translate(${(nx * 3.2).toFixed(2)}, ${(ny * 2.2).toFixed(2)})`
      );
    }
  }

  return (
    <div
      id="top"
      ref={stageRef}
      onPointerMove={handlePointerMove}
      className="relative overflow-hidden border-b-2 border-line"
    >
      {/* Background glow */}
      <div
        ref={glowRef}
        className="pointer-events-none absolute -left-[10%] -top-[20%] h-[140%] w-[70%] transition-transform duration-300 ease-out"
        style={{
          background:
            "radial-gradient(circle at 40% 40%, var(--color-gold-glow), transparent 60%)",
        }}
      />
      <div className="bg-grid pointer-events-none absolute inset-0 opacity-70" />

      {/* ── Responsive layout: stack on mobile, side-by-side on lg ── */}
      <div className="relative flex flex-col lg:flex-row lg:min-h-[580px]">

        {/* Text content — full width on mobile, 45% on desktop */}
        <div className="flex flex-col justify-center px-6 pt-16 pb-10 sm:px-10 md:px-15 md:pt-20 md:pb-12 lg:w-[45%] lg:flex-none lg:py-[130px]">
          <Reveal className="mb-5 flex items-center gap-3">
            <span className="eyebrow text-gold">01 / AI BUILD STUDIO — MUMBAI</span>
            <span
              className="block h-[7px] w-[7px] flex-none"
              style={{ background: "var(--color-signal)", boxShadow: "0 0 8px var(--color-signal)" }}
            />
          </Reveal>
          <Reveal>
            <DecodeText
              as="h1"
              text="We build the automation, then the product around it."
              className="mb-6 font-display text-[34px] font-bold leading-[1.06] tracking-[-0.025em] text-hi sm:text-[44px] md:text-[52px] lg:text-[60px] lg:leading-[1.04] lg:tracking-[-0.035em]"
            />
          </Reveal>
          <Reveal className="mb-8 max-w-[46ch] text-[15px] leading-[1.65] text-mid md:text-[17px] lg:text-[18px]">
            AI automations, RAG systems and agents for businesses that have
            outgrown manual process. Design and engineering in one studio, so
            the thing you buy actually ships.
          </Reveal>
          <Reveal className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <GoldButton href="/contact" size="lg">
              BOOK A DISCOVERY CALL
            </GoldButton>
            <span className="font-mono text-[11px] leading-[1.6] text-low">
              Fixed scope. Defined deliverable.
              <br />
              From $2,500 / ₹1,50,000.
            </span>
          </Reveal>
        </div>

        {/* Eye graphic — below text on mobile/tablet, right column on lg */}
        <div
          ref={eyeRef}
          className="animate-drift pointer-events-none flex w-full items-center justify-center px-8 pb-14 pt-4 md:px-16 md:pb-16 lg:w-[55%] lg:flex-none lg:px-10 lg:py-0"
          style={{ transition: "transform 0.3s ease-out" }}
        >
          <div className="w-full max-w-[340px] md:max-w-[420px] lg:max-w-none">
            <HeroEye irisRef={irisRef} />
          </div>
        </div>
      </div>
    </div>
  );
}

function HeroEye({ irisRef }: { irisRef: React.RefObject<SVGCircleElement | null> }) {
  return (
    <svg
      viewBox="0 0 168 120"
      fill="none"
      preserveAspectRatio="xMidYMid meet"
      className="w-full"
      aria-hidden="true"
    >
      <defs>
        <clipPath id="hero-scanlines">
          <path d="M44 32 L106 18 L114 28 L50 44 Z" />
          <path d="M22 60 L54 44 L104 44 L124 58 L104 72 L54 72 Z" />
          <path d="M58 72 L48 102 L64 102 L64 72 Z" />
          <path d="M100 68 L110 84 L136 88 L142 76 L132 78 L128 82 L112 78 L106 66 Z" />
        </clipPath>
        <pattern id="hero-coarse" width="8" height="2.4" patternUnits="userSpaceOnUse">
          <rect width="8" height="0.6" fill="var(--color-gold)" />
        </pattern>
        <pattern id="hero-fine" width="8" height="1.2" patternUnits="userSpaceOnUse">
          <rect width="8" height="0.45" fill="var(--color-gold)" />
        </pattern>
      </defs>
      <g stroke="var(--color-line)" strokeWidth="0.4">
        <path d="M14 60 L52 38 L108 38 L132 58 L108 78 L52 78 Z" />
        <path d="M6 60 L50 32 L112 32 L140 58 L112 84 L50 84 Z" />
      </g>
      <g clipPath="url(#hero-scanlines)">
        <rect width="168" height="120" fill="url(#hero-coarse)" opacity="0.5" />
        <rect y="42" width="168" height="34" fill="url(#hero-fine)" opacity="0.85" />
      </g>
      <g stroke="var(--color-gold-dim)" strokeWidth="0.5" fill="none">
        <path d="M22 60 L54 44 L104 44 L124 58 L104 72 L54 72 Z" />
        <path d="M44 32 L106 18 L114 28 L50 44 Z" />
      </g>
      <circle cx="74" cy="58" r="13" fill="var(--color-void)" opacity="0.92" />
      <circle cx="74" cy="58" r="13" fill="none" stroke="var(--color-gold)" strokeWidth="0.7" />
      <circle
        ref={irisRef}
        className="animate-iris-pulse"
        cx="74"
        cy="58"
        r="5"
        fill="var(--color-gold)"
      />
    </svg>
  );
}
