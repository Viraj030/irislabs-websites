import { ABOUT } from "@/lib/data";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function AboutIntro({ index = "01" }: { index?: string }) {
  return (
    <div className="border-b border-line px-6 pt-16 pb-14 md:px-15 md:pt-24 md:pb-18">
      <SectionLabel index={index} label="ABOUT" className="mb-8 md:mb-12" />

      {/* Editorial split: statement left, argument right. */}
      <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-10">
        <Reveal className="md:col-span-7">
          <h1 className="font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.03em] text-hi md:text-[52px] md:leading-[1.02]">
            {ABOUT.headline}
          </h1>
        </Reveal>

        <div className="flex flex-col gap-5 md:col-span-5 md:pt-2">
          <Reveal className="border-l border-gold-dim pl-5 text-[15px] leading-[1.6] text-hi md:text-[16px]">
            {ABOUT.subhead}
          </Reveal>
          {ABOUT.body.map((para) => (
            <Reveal
              key={para.slice(0, 24)}
              className="max-w-[62ch] text-[14px] leading-[1.7] text-mid md:text-[15px]"
            >
              {para}
            </Reveal>
          ))}
        </div>
      </div>

      {/* Stat strip — hairline cells, mono figures. */}
      <RevealGroup
        className="mt-14 grid grid-cols-1 border-t border-line sm:grid-cols-3 md:mt-20"
        stagger={0.06}
      >
        {ABOUT.stats.map((stat) => (
          <RevealItem
            key={stat.figure}
            className="border-b border-line py-6 sm:border-b-0 sm:border-r sm:px-7 sm:py-7 sm:first:pl-0 sm:last:border-r-0"
          >
            <div className="mb-2 font-mono text-[26px] font-medium leading-none tracking-[-0.02em] text-gold md:text-[32px]">
              {stat.figure}
            </div>
            <div className="font-mono text-[10px] leading-[1.6] tracking-[0.12em] text-low md:text-[11px]">
              {stat.label.toUpperCase()}
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
