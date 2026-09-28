"use client";

import { useState } from "react";
import { PRICING, type Currency } from "@/lib/data";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function Pricing({
  index = "07",
  lead = false,
}: {
  index?: string;
  lead?: boolean;
}) {
  const [currency, setCurrency] = useState<Currency>("USD");
  const Heading = lead ? "h1" : "h2";

  return (
    <div id="pricing" className="border-b-2 border-line px-6 py-16 md:px-15 md:py-24">
      <Reveal className="mb-9 flex flex-col gap-6 md:mb-11 md:flex-row md:items-center md:justify-between">
        <div className="md:flex-1">
          <SectionLabel index={index} label="PRICING" className="mb-6 md:max-w-[420px]" />
          <Heading className="font-display text-[26px] font-semibold leading-[1.1] tracking-[-0.02em] text-hi md:text-[44px] md:leading-[1.05]">
            Starting from
          </Heading>
        </div>
        <div className="flex overflow-hidden rounded-[2px] border border-line self-start">
          <button
            onClick={() => setCurrency("USD")}
            className="font-mono text-[11px] font-medium tracking-[0.1em] px-4.5 py-2.5 cursor-pointer transition-colors duration-150"
            style={{
              background: currency === "USD" ? "var(--color-gold)" : "transparent",
              color: currency === "USD" ? "var(--color-void)" : "var(--color-mid)",
            }}
          >
            USD
          </button>
          <button
            onClick={() => setCurrency("INR")}
            className="border-l border-line font-mono text-[11px] font-medium tracking-[0.1em] px-4.5 py-2.5 cursor-pointer transition-colors duration-150"
            style={{
              background: currency === "INR" ? "var(--color-gold)" : "transparent",
              color: currency === "INR" ? "var(--color-void)" : "var(--color-mid)",
            }}
          >
            INR
          </button>
        </div>
      </Reveal>

      <RevealGroup
        className="flex flex-col gap-4 md:grid md:grid-cols-[1.4fr_1fr_1fr] md:gap-6"
        stagger={0.06}
      >
        {PRICING.map((pillar) => (
          <RevealItem
            key={pillar.name}
            className="tech-corners tech-corners-hover rounded-[2px] border border-line p-5 transition-colors duration-150 hover:border-gold-dim md:p-6.5"
          >
            <div className="mb-4 font-mono text-[10px] tracking-[0.16em] text-gold md:mb-5">
              {pillar.tag} / {pillar.name.toUpperCase()}
            </div>
            <div className="border-t border-line">
              {pillar.rows.map((row) => (
                <div
                  key={row.name}
                  className="flex items-baseline justify-between border-b border-line py-3 last:border-b-0 md:py-3.5"
                >
                  <span className="text-[14px] text-hi md:text-[15px]">{row.name}</span>
                  <span className="flex flex-none items-baseline gap-2">
                    <span className="font-mono text-[10px] text-low">from</span>
                    <span className="font-mono text-[15px] font-medium text-gold md:text-[16px]">
                      {currency === "USD" ? row.usd : row.inr}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
