"use client";

import { useState } from "react";
import { FAQ_GROUPS } from "@/lib/data";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function FAQ({ index = "09" }: { index?: string }) {
  const [open, setOpen] = useState<string | null>(null);

  return (
    <div className="border-b-2 border-line px-6 py-16 md:px-15 md:py-24">
      <SectionLabel index={index} label="FAQ" className="mb-6" />
      <Reveal
        as="h2"
        className="mb-9 font-display text-[26px] font-semibold leading-[1.1] tracking-[-0.02em] text-hi md:mb-11 md:text-[44px] md:leading-[1.05]"
      >
        Before you book
      </Reveal>

      <RevealGroup className="flex flex-col gap-7 md:grid md:grid-cols-3 md:gap-8" stagger={0.06}>
        {FAQ_GROUPS.map((group) => (
          <RevealItem key={group.tag}>
            <div className="mb-3.5 font-mono text-[10px] tracking-[0.16em] text-low">
              {group.tag}
            </div>
            <div className="border-t border-line">
              {group.items.map((item) => {
                const id = `${group.tag}-${item.q}`;
                const isOpen = open === id;
                return (
                  <div
                    key={id}
                    className="group border-b border-line transition-colors duration-150"
                    style={{
                      borderBottomColor: isOpen
                        ? "var(--color-gold-dim)"
                        : undefined,
                    }}
                  >
                    <button
                      onClick={() => setOpen(isOpen ? null : id)}
                      className="flex w-full cursor-pointer items-start justify-between gap-3.5 py-4 text-left text-hi transition-colors duration-150 hover:text-gold"
                      aria-expanded={isOpen}
                    >
                      <span className="font-display text-[14px] font-medium leading-[1.35] md:text-[15px]">
                        {item.q}
                      </span>
                      <span
                        className="mt-0.5 flex-none font-mono text-[18px] leading-none text-gold transition-transform duration-200 ease-[var(--ease-state)] md:text-[20px]"
                        style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                      >
                        +
                      </span>
                    </button>
                    {/* grid-rows 0fr→1fr animates height without measuring it. */}
                    <div
                      className="grid transition-[grid-template-rows,opacity] duration-200 ease-[var(--ease-state)]"
                      style={{
                        gridTemplateRows: isOpen ? "1fr" : "0fr",
                        opacity: isOpen ? 1 : 0,
                      }}
                    >
                      <div className="overflow-hidden">
                        <div className="border-l border-gold-dim pb-4 pl-3.5 text-[13px] leading-[1.6] text-mid md:pb-4.5 md:leading-[1.65]">
                          {item.a}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
