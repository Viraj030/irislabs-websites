import { Reveal } from "./Reveal";
import { GoldButton } from "./GoldButton";

/** Quiet closing CTA for inner pages — the gold RiskReversal band stays reserved
 *  for the home and pricing pages, so gold never competes with itself. */
export function CTABand({
  title = "Start with a scope call.",
}: {
  title?: string;
}) {
  return (
    <div className="border-b border-line px-6 py-14 md:px-15 md:py-18">
      <Reveal className="flex flex-col items-start gap-7 md:flex-row md:items-center md:justify-between md:gap-15">
        <div>
          <div className="eyebrow mb-4 text-gold">NEXT STEP</div>
          <div className="max-w-[20ch] font-display text-[24px] font-semibold leading-[1.15] tracking-[-0.02em] text-hi md:text-[36px]">
            {title}
          </div>
        </div>
        <div className="flex flex-col items-start gap-4">
          <GoldButton href="/contact" size="lg">
            BOOK A DISCOVERY CALL
          </GoldButton>
          <span className="font-mono text-[11px] leading-[1.6] text-low">
            Fixed scope. Defined deliverable.
            <br />
            From $2,500 / ₹1,50,000.
          </span>
        </div>
      </Reveal>
    </div>
  );
}
