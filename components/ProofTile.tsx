"use client";

import { useEffect, useRef, useState } from "react";

export function ProofTile({
  url,
  domain,
  image,
}: {
  url: string;
  domain: string;
  image?: string;
}) {
  const cardRef = useRef<HTMLAnchorElement>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const raf = useRef<number | null>(null);

  // Magnetic cursor that follows the mouse inside the card
  useEffect(() => {
    const card = cardRef.current;
    const cursor = cursorRef.current;
    if (!card || !cursor) return;

    function onMove(e: MouseEvent) {
      if (!card || !cursor) return;
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      if (raf.current) cancelAnimationFrame(raf.current);
      raf.current = requestAnimationFrame(() => {
        cursor.style.transform = `translate(${x}px, ${y}px)`;
      });
    }

    card.addEventListener("mousemove", onMove);
    return () => {
      card.removeEventListener("mousemove", onMove);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <a
      ref={cardRef}
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${domain} in a new tab`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="group relative block"
      style={{ cursor: "none" }}
    >
      {/* Custom crosshair cursor */}
      <div
        ref={cursorRef}
        aria-hidden="true"
        className="pointer-events-none absolute left-0 top-0 z-20 -translate-x-1/2 -translate-y-1/2 transition-opacity duration-200"
        style={{ opacity: hovered ? 1 : 0 }}
      >
        {/* Outer ring with crosshair ticks */}
        <div className="relative flex h-[88px] w-[88px] items-center justify-center">
          {/* Tick marks at N/S/E/W */}
          <span className="absolute left-1/2 top-0 h-[10px] w-[1px] -translate-x-1/2 bg-gold" />
          <span className="absolute bottom-0 left-1/2 h-[10px] w-[1px] -translate-x-1/2 bg-gold" />
          <span className="absolute left-0 top-1/2 h-[1px] w-[10px] -translate-y-1/2 bg-gold" />
          <span className="absolute right-0 top-1/2 h-[1px] w-[10px] -translate-y-1/2 bg-gold" />

          {/* Inner circle */}
          <div
            className="flex h-[68px] w-[68px] items-center justify-center rounded-full border border-gold bg-void/90 backdrop-blur-sm"
            style={{ boxShadow: "0 0 18px var(--color-gold-glow), inset 0 0 12px rgba(232,180,55,0.06)" }}
          >
            <span className="font-mono text-[8px] font-semibold tracking-[0.18em] text-gold">
              EXPLORE&nbsp;↗
            </span>
          </div>
        </div>
      </div>

      {/* macOS-style laptop screen frame */}
      <div className="relative w-full overflow-hidden rounded-lg border border-white/10 bg-inset shadow-[0_8px_32px_rgba(0,0,0,0.5),0_0_0_1px_rgba(255,255,255,0.06)] transition-all duration-300 group-hover:shadow-[0_12px_40px_rgba(0,0,0,0.6),0_0_0_1px_rgba(232,180,55,0.15)]">
        {/* Titlebar */}
        <div
          className="flex flex-none items-center gap-2 px-3 py-[9px]"
          style={{ background: "linear-gradient(180deg, #2a2a2e 0%, #1e1e22 100%)" }}
        >
          {/* Traffic-light dots */}
          <span className="h-[11px] w-[11px] rounded-full" style={{ background: "#FF5F57", boxShadow: "0 0 0 0.5px rgba(0,0,0,0.3)" }} />
          <span className="h-[11px] w-[11px] rounded-full" style={{ background: "#FEBC2E", boxShadow: "0 0 0 0.5px rgba(0,0,0,0.3)" }} />
          <span className="h-[11px] w-[11px] rounded-full" style={{ background: "#28C840", boxShadow: "0 0 0 0.5px rgba(0,0,0,0.3)" }} />

          {/* Address bar */}
          <div className="ml-2 flex flex-1 items-center gap-1.5 rounded-md bg-black/30 px-2.5 py-1">
            {/* Lock icon */}
            <svg width="8" height="9" viewBox="0 0 8 9" fill="none" className="flex-none opacity-50">
              <rect x="1" y="4" width="6" height="5" rx="0.8" stroke="#a5a29b" strokeWidth="0.8"/>
              <path d="M2.5 4V2.5a1.5 1.5 0 013 0V4" stroke="#a5a29b" strokeWidth="0.8"/>
            </svg>
            <span className="truncate font-mono text-[9px] tracking-[0.02em] text-[#6b6862] md:text-[10px]">
              {domain}
            </span>
          </div>
        </div>

        {/* Screen content */}
        {image ? (
          <div className="overflow-hidden">
            <img
              src={image}
              alt={`${domain} preview`}
              className="block w-full object-cover object-top transition-transform duration-500 ease-out group-hover:scale-[1.03]"
              loading="lazy"
            />
          </div>
        ) : (
          <div
            className="flex items-center justify-center bg-raise font-mono text-[11px] text-low"
            style={{ aspectRatio: "16 / 10" }}
          >
            {domain}
          </div>
        )}

        {/* Subtle gold overlay on hover */}
        <div
          className="pointer-events-none absolute inset-0 transition-opacity duration-300"
          style={{
            background: "linear-gradient(135deg, var(--color-gold-glow) 0%, transparent 60%)",
            opacity: hovered ? 0.15 : 0,
          }}
        />
      </div>

      {/* Domain label */}
      <div className="mt-2 font-mono text-[12px] text-low transition-colors duration-150 group-hover:text-gold md:text-[13px]">
        {domain}
      </div>
    </a>
  );
}
