"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { useHasHover } from "@/lib/useHasHover";

const PREVIEW_WIDTH = 1280;
const PREVIEW_HEIGHT = 800;
const CHAR_MS = 12;
const LINE_GAP_MS = 90;

type Phase = "idle" | "booting" | "preview";

function bootLines(domain: string) {
  return [`$ curl -sI ${domain}`, "→ handshake ok", "→ rendering preview..."];
}

export function ProofTile({
  url,
  domain,
  image,
}: {
  url: string;
  domain: string;
  image?: string;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [typed, setTyped] = useState<string[]>([]);
  const [typingIndex, setTypingIndex] = useState(0);
  const reduced = useReducedMotion();
  const hasHover = useHasHover();
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const autoStarted = useRef(false);

  const clearTimers = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
  }, []);

  const openSite = useCallback(() => {
    window.open(url, "_blank", "noopener,noreferrer");
  }, [url]);

  const startBoot = useCallback(() => {
    clearTimers();
    if (reduced) {
      setPhase("preview");
      return;
    }
    const lines = bootLines(domain);
    setTyped(lines.map(() => ""));
    setTypingIndex(0);
    setPhase("booting");

    let li = 0;
    const nextLine = () => {
      if (li >= lines.length) {
        timers.current.push(setTimeout(() => setPhase("preview"), 150));
        return;
      }
      setTypingIndex(li);
      const line = lines[li];
      let ci = 0;
      const typeChar = () => {
        ci++;
        const idx = li;
        setTyped((prev) => {
          const next = [...prev];
          next[idx] = line.slice(0, ci);
          return next;
        });
        if (ci < line.length) {
          timers.current.push(setTimeout(typeChar, CHAR_MS));
        } else {
          li++;
          timers.current.push(setTimeout(nextLine, LINE_GAP_MS));
        }
      };
      typeChar();
    };
    nextLine();
  }, [clearTimers, reduced, domain]);

  const reset = useCallback(() => {
    clearTimers();
    setPhase("idle");
    setTyped([]);
  }, [clearTimers]);

  // Width, for scaling the fixed-size iframe down to fit the tile.
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const ro = new ResizeObserver((entries) => {
      const w = entries[0]?.contentRect.width;
      if (w) setWidth(w);
    });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Touch devices have no hover — auto-play the boot + preview once, on scroll into view.
  useEffect(() => {
    if (hasHover) return;
    const el = containerRef.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !autoStarted.current) {
            autoStarted.current = true;
            startBoot();
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [hasHover, startBoot]);

  useEffect(() => () => clearTimers(), [clearTimers]);

  const scale = width ? width / PREVIEW_WIDTH : 0.2;

  return (
    <div
      ref={containerRef}
      role="link"
      tabIndex={0}
      aria-label={`Open ${domain} in a new tab`}
      onClick={openSite}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openSite();
        }
      }}
      onMouseEnter={hasHover ? startBoot : undefined}
      onMouseLeave={hasHover ? reset : undefined}
      onFocus={startBoot}
      onBlur={reset}
      className="group block cursor-pointer"
    >
      <div
        className="relative w-full overflow-hidden rounded-[2px] border border-line bg-inset transition-colors duration-150 group-hover:border-gold-dim"
        style={{ aspectRatio: `${PREVIEW_WIDTH} / ${PREVIEW_HEIGHT}` }}
      >
        {phase === "idle" && <div className="hatch h-full w-full" />}

        {phase === "booting" && (
          <div className="flex h-full flex-col justify-center gap-2 bg-void px-4 font-mono text-[12px] leading-[1.7] text-signal md:text-[14px]">
            {typed.map((t, i) => (
              <div key={i} className="truncate">
                {t}
                {i === typingIndex && <span className="animate-blink">▋</span>}
              </div>
            ))}
          </div>
        )}

        {phase === "preview" && (
          <div className="flex h-full w-full flex-col bg-void">
            {/* Mock browser chrome: keeps the tile looking intentional */}
            <div className="flex flex-none items-center gap-1.5 border-b border-line bg-raise px-3 py-2">
              <span className="h-[7px] w-[7px] rounded-full bg-line" />
              <span className="h-[7px] w-[7px] rounded-full bg-line" />
              <span className="h-[7px] w-[7px] rounded-full bg-line" />
              <span className="ml-1.5 truncate font-mono text-[10px] tracking-[0.04em] text-low md:text-[11px]">
                {domain}
              </span>
            </div>
            <div className="relative flex-1 overflow-hidden">
              {image ? (
                /* High-res snapshot preview image: bypasses CSP & X-Frame-Options framing blocks */
                <img
                  src={image}
                  alt={`${domain} preview`}
                  className="h-full w-full object-cover object-top"
                  loading="lazy"
                />
              ) : (
                <iframe
                  src={url}
                  loading="lazy"
                  tabIndex={-1}
                  title={`${domain} preview`}
                  referrerPolicy="no-referrer"
                  sandbox="allow-scripts allow-same-origin"
                  style={{
                    width: PREVIEW_WIDTH,
                    height: PREVIEW_HEIGHT,
                    transform: `scale(${scale})`,
                    transformOrigin: "top left",
                    border: 0,
                    pointerEvents: "none",
                  }}
                />
              )}
              {/* Real clicks land here, not on the cross-origin iframe/image */}
              <div className="absolute inset-0" />
            </div>
          </div>
        )}
      </div>
      <div className="mt-2 font-mono text-[12px] text-low transition-colors duration-150 group-hover:text-gold md:text-[13px]">
        {domain}
      </div>
    </div>
  );
}
