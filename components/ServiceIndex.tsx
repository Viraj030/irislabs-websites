import { PILLARS } from "@/lib/data";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { SectionLabel } from "./SectionLabel";
import { TransitionLink } from "./TransitionLink";
import { Terminal } from "./Terminal";

/** Full services index: every service under its pillar, with a terminal that
 *  types out what an engagement in that pillar actually covers. */
export function ServiceIndex({
  index = "01",
  lead = false,
}: {
  index?: string;
  lead?: boolean;
}) {
  const Heading = lead ? "h1" : "h2";

  return (
    <div id="capabilities" className="border-b-2 border-line px-6 py-16 md:px-15 md:py-24">
      <Reveal className="mb-10 md:mb-14">
        <SectionLabel index={index} label="SERVICES" className="mb-6 md:max-w-[560px]" />
        <Heading className="mb-4 font-display text-[30px] font-semibold leading-[1.05] tracking-[-0.02em] text-hi md:text-[52px]">
          Three pillars, ten services
        </Heading>
        <p className="max-w-[56ch] text-[14px] leading-[1.65] text-mid md:text-[16px]">
          AI leads. The rest is still here, still indexed, still built by the
          same two people.
        </p>
      </Reveal>

      <RevealGroup className="flex flex-col" stagger={0.06}>
        {PILLARS.map((pillar) => (
          <RevealItem key={pillar.name}>
            {/* Each column opens with a label on the same line, so the pillar
                name, the first service and the terminal panel all start together. */}
            <div
              className={`grid grid-cols-1 gap-8 border-t py-9 md:py-12 lg:grid-cols-[200px_1fr_380px] lg:gap-10 ${
                pillar.lead ? "border-t-gold-dim" : "border-t-line"
              }`}
            >
              <div>
                <div className="mb-3 flex h-[15px] items-center font-mono text-[10px] tracking-[0.18em] text-gold">
                  {pillar.lead ? "01 / LEAD OFFER" : pillar.tag}
                </div>
                <div className="font-display text-[24px] font-semibold leading-[1.15] tracking-[-0.02em] text-hi md:text-[28px]">
                  {pillar.name}
                </div>
              </div>

              <div>
                <div className="mb-3 flex h-[15px] items-center font-mono text-[10px] tracking-[0.18em] text-low">
                  SERVICES
                </div>
                <ul className="flex max-w-[420px] flex-col border-t border-line">
                  {pillar.services.map((service) => (
                    <li
                      key={service}
                      className="flex items-baseline gap-3 border-b border-line py-2.5 text-[14px] leading-[1.5] text-hi md:text-[15px]"
                    >
                      <span className="flex-none font-mono text-[11px] text-gold-dim">
                        —
                      </span>
                      {service}
                    </li>
                  ))}
                </ul>
              </div>

              <Terminal
                script={pillar.scope}
                title={`SCOPE — ${pillar.name.toUpperCase()}`}
                minHeight={386}
                dense
              />
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      <Reveal className="mt-8 flex flex-col gap-3 border-t border-line pt-6 md:flex-row md:items-center md:justify-between">
        <p className="max-w-[62ch] font-mono text-[11px] leading-[1.7] text-low">
          Scope is agreed in writing before any invoice. Nothing starts on a
          feature list alone.
        </p>
        <TransitionLink
          href="/pricing"
          className="flex-none font-mono text-[12px] tracking-[0.08em] text-gold transition-colors hover:text-gold-light"
        >
          SEE STARTING PRICES →
        </TransitionLink>
      </Reveal>
    </div>
  );
}
