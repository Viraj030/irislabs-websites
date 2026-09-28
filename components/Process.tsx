"use client";

import { STEPS } from "@/lib/data";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { SectionLabel } from "./SectionLabel";
import { Terminal } from "./Terminal";
import { useInViewOnce } from "@/lib/useInViewOnce";

export function Process({
  index = "04",
  lead = false,
}: {
  index?: string;
  lead?: boolean;
}) {
  const Heading = lead ? "h1" : "h2";
  return (
    <div
      id="process"
      className="bg-grid border-b-2 border-line px-6 py-16 md:px-15 md:py-24"
    >
      <Reveal className="mb-10 md:mb-14">
        <SectionLabel index={index} label="HOW WE WORK" className="mb-6 md:max-w-[560px]" />
        <Heading className="mb-4 font-display text-[30px] font-semibold leading-[1.05] tracking-[-0.02em] text-hi md:text-[52px]">
          Four steps, named deliverables
        </Heading>
        <p className="max-w-[58ch] text-[15px] leading-[1.65] text-mid md:text-[17px]">
          No case studies yet, so here is the process instead. Nothing on
          this page claims a result that did not happen.
        </p>
      </Reveal>

      <RevealGroup
        className="mb-10 flex flex-col border-t border-line md:mb-12 md:grid md:grid-cols-4 md:gap-0 md:border-t-0"
        stagger={0.06}
      >
        {STEPS.map((step) => (
          <RevealItem key={step.n} className="border-b border-line py-6 md:border-b-0 md:pr-7">
            <div className="mb-5 hidden items-center gap-0 md:flex">
              <span className="h-[11px] w-[11px] flex-none bg-gold" />
              <DrawLine />
            </div>
            <div className="mb-2.5 font-mono text-[32px] font-bold leading-none text-gold md:mb-4 md:text-[48px]">
              {step.n}
            </div>
            <div className="mb-2 font-display text-[17px] font-semibold leading-[1.25] text-hi md:mb-2.5 md:text-[19px]">
              {step.title}
            </div>
            <div className="mb-3 text-[13px] leading-[1.6] text-mid md:mb-3.5 md:leading-[1.65]">
              {step.body}
            </div>
            <div className="inline-flex items-center gap-2 border-l border-gold-dim bg-inset px-2.5 py-2 font-mono text-[11px] text-gold">
              → {step.deliverable}
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal>
        <Terminal />
      </Reveal>
    </div>
  );
}

function DrawLine() {
  const { ref, inView } = useInViewOnce<HTMLSpanElement>(0.4);
  return (
    <span
      ref={ref}
      className="h-px flex-1 origin-left bg-gold-dim"
      style={{
        transform: inView ? "scaleX(1)" : "scaleX(0)",
        transition: "transform 600ms var(--ease-entrance)",
      }}
    />
  );
}
