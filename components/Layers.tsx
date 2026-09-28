import { LAYERS } from "@/lib/data";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

/** Three bars showing where this layer sits in the stack — the active one gold. */
function StackGlyph({ active }: { active: number }) {
  return (
    <div className="flex w-14 flex-col gap-1.5" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          className="h-[3px] w-full transition-colors duration-150"
          style={{
            background: i === active ? "var(--color-gold)" : "var(--color-line)",
          }}
        />
      ))}
    </div>
  );
}

export function Layers({ index = "02" }: { index?: string }) {
  return (
    <div className="bg-grid border-b border-line px-6 py-16 md:px-15 md:py-24">
      <Reveal className="mb-10 md:mb-14">
        <SectionLabel index={index} label="HOW WE BUILD" className="mb-6 md:max-w-[560px]" />
        <h2 className="mb-4 max-w-[18ch] font-display text-[28px] font-semibold leading-[1.08] tracking-[-0.02em] text-hi md:text-[44px]">
          We build all three layers, in order.
        </h2>
        <p className="max-w-[58ch] text-[14px] leading-[1.7] text-mid md:text-[16px]">
          Most studios take one layer and hand you the seams. The layers only
          compound when the same team wires them together.
        </p>
      </Reveal>

      <RevealGroup className="flex flex-col border-t border-line" stagger={0.07}>
        {LAYERS.map((layer, i) => (
          <RevealItem key={layer.name}>
            <div className="group grid grid-cols-1 gap-4 border-b border-line py-8 transition-colors duration-150 hover:bg-raise md:grid-cols-[56px_1fr_1.15fr] md:items-start md:gap-10 md:py-10">
              <div className="flex items-center gap-4 md:flex-col md:items-start md:gap-5">
                <span className="font-mono text-[11px] tracking-[0.16em] text-gold">
                  {layer.n}
                </span>
                <StackGlyph active={i} />
              </div>

              <div>
                <div className="mb-1.5 font-display text-[24px] font-semibold leading-[1.1] tracking-[-0.02em] text-hi md:text-[30px]">
                  {layer.name}
                </div>
                <div className="font-mono text-[11px] leading-[1.6] text-gold-dim md:text-[12px]">
                  {layer.lede}
                </div>
              </div>

              <p className="max-w-[58ch] text-[14px] leading-[1.7] text-mid md:text-[15px]">
                {layer.body}
              </p>
            </div>
          </RevealItem>
        ))}
      </RevealGroup>
    </div>
  );
}
