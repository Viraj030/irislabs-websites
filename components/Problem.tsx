import { Reveal } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

/** The one-line qualifier, staged as a drawing-sheet plate: register marks at
 *  the corners, dimension ticks down the sides, statement centred in the field. */
export function Problem({ index = "02" }: { index?: string }) {
  return (
    <div className="relative overflow-hidden border-b border-line px-6 py-20 md:px-15 md:py-28">
      {/* Oversized index, cropped by the section edge. */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute -right-4 -top-10 select-none font-mono text-[160px] font-bold leading-none text-line opacity-40 md:-right-6 md:-top-16 md:text-[280px]"
      >
        {index}
      </span>

      <SectionLabel
        index={index}
        label="THE COST OF WAITING"
        tone="muted"
        className="relative mb-14 md:mb-20"
      />

      <div className="relative mx-auto max-w-[900px]">
        {/* Dimension ticks, drawing-sheet style. */}
        <div
          aria-hidden="true"
          className="absolute -left-3 top-0 hidden h-full w-px bg-line md:block"
        >
          <span className="absolute left-0 top-0 h-px w-2.5 bg-gold-dim" />
          <span className="absolute bottom-0 left-0 h-px w-2.5 bg-gold-dim" />
        </div>
        <div
          aria-hidden="true"
          className="absolute -right-3 top-0 hidden h-full w-px bg-line md:block"
        >
          <span className="absolute right-0 top-0 h-px w-2.5 bg-gold-dim" />
          <span className="absolute bottom-0 right-0 h-px w-2.5 bg-gold-dim" />
        </div>

        <Reveal className="text-center font-display text-[28px] font-medium leading-[1.28] tracking-[-0.02em] text-hi md:text-[52px] md:leading-[1.16]">
          <span>Every manual process you keep is </span>
          <span className="relative whitespace-nowrap text-gold">
            a salary you pay twice
            <span
              aria-hidden="true"
              className="absolute -bottom-1.5 left-0 h-px w-full bg-gold-dim md:-bottom-2"
            />
          </span>
          <span>.</span>
        </Reveal>
      </div>

      <Reveal className="relative mt-12 flex justify-center md:mt-16">
        <span className="font-mono text-[10px] tracking-[0.18em] text-low md:text-[11px]">
          ↓ WHAT WE BUILD INSTEAD
        </span>
      </Reveal>
    </div>
  );
}
