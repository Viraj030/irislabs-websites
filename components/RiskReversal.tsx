import { Reveal } from "./Reveal";
import { GoldButton } from "./GoldButton";

export function RiskReversal({ index = "05" }: { index?: string }) {
  return (
    <div className="grid grid-cols-1 items-center gap-7 border-b-2 border-line bg-gold px-6 py-12 md:grid-cols-[1fr_auto] md:gap-15 md:px-15 md:py-19">
      <Reveal>
        <div className="eyebrow mb-4 text-[#5c4610] md:mb-5">
          {index} / FIXED SCOPE, FIRST ENGAGEMENT
        </div>
        <div className="max-w-[22ch] font-display text-[24px] font-bold leading-[1.2] tracking-[-0.015em] text-void md:text-[44px] md:leading-[1.08] md:tracking-[-0.03em]">
          One defined deliverable. One price. Agreed before we start.
        </div>
      </Reveal>
      <Reveal>
        <GoldButton href="/contact" variant="invert" size="lg" fullWidth className="md:w-auto">
          BOOK A DISCOVERY CALL
        </GoldButton>
      </Reveal>
    </div>
  );
}
