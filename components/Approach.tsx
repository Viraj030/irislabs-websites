import { APPROACH } from "@/lib/data";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

export function Approach({ index = "03" }: { index?: string }) {
  return (
    <div className="border-b border-line px-6 py-16 md:px-15 md:py-24">
      <Reveal className="mb-10 flex flex-col gap-6 md:mb-14 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionLabel index={index} label="PRINCIPLES" className="mb-6" />
          <h2 className="max-w-[16ch] font-display text-[28px] font-semibold leading-[1.08] tracking-[-0.02em] text-hi md:text-[44px]">
            How we run an engagement
          </h2>
        </div>
        <p className="font-mono text-[11px] leading-[1.7] text-low md:max-w-[280px] md:text-[12px]">
          We take a small number of clients at a time and price on outcomes
          rather than hours.
        </p>
      </Reveal>

      <RevealGroup
        className="grid grid-cols-1 border-t border-line md:grid-cols-2"
        stagger={0.05}
      >
        {APPROACH.map((item, i) => (
          <RevealItem
            key={item.title}
            className={`border-b border-line py-7 md:py-9 ${
              i % 2 === 0 ? "md:pr-12" : "md:border-l md:pl-12"
            }`}
          >
            <div className="mb-3 font-mono text-[11px] tracking-[0.16em] text-gold-dim">
              {String(i + 1).padStart(2, "0")}
            </div>
            <div className="mb-2.5 font-display text-[17px] font-semibold leading-[1.25] text-hi md:text-[19px]">
              {item.title}
            </div>
            <p className="max-w-[52ch] text-[14px] leading-[1.7] text-mid md:text-[15px]">
              {item.body}
            </p>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
