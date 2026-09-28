import { TransitionLink } from "./TransitionLink";
import { PILLARS } from "@/lib/data";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { SectionLabel } from "./SectionLabel";

const ICONS: Record<string, React.ReactNode> = {
  "AI & Software": (
    <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <rect x="4" y="4" width="16" height="16" />
      <path d="M9 9h6v6H9z" />
      <path d="M12 1v3M12 20v3M1 12h3M20 12h3" />
    </svg>
  ),
  Ecommerce: (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <path d="M3 6h18l-2 12H5z" />
      <path d="M8 6V3h8v3" />
      <path d="M9 11v4M15 11v4" />
    </svg>
  ),
  "Design & Web": (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
      <rect x="3" y="4" width="18" height="14" />
      <path d="M3 9h18M9 18v3M15 18v3M7 21h10" />
    </svg>
  ),
};

export function Pillars({
  index = "03",
  lead = false,
}: {
  index?: string;
  /** Renders the section title as the page's h1 when this leads a page. */
  lead?: boolean;
}) {
  const Heading = lead ? "h1" : "h2";
  return (
    <div id="capabilities" className="border-b-2 border-line px-6 py-16 md:px-15 md:py-24">
      <Reveal className="mb-9 flex flex-col gap-6 md:mb-11 md:flex-row md:items-end md:justify-between">
        <div className="md:max-w-[620px] md:flex-1">
          <SectionLabel index={index} label="CAPABILITIES" className="mb-6" />
          <Heading className="font-display text-[30px] font-semibold leading-[1.05] tracking-[-0.02em] text-hi md:text-[52px]">
            Three pillars, ten services
          </Heading>
        </div>
        <p className="font-mono text-[12px] leading-[1.7] text-low md:max-w-[260px]">
          AI leads. The rest is still here, still indexed, still built by the
          same people.
        </p>
      </Reveal>

      {/* Desktop grid */}
      <RevealGroup className="hidden gap-6 md:grid md:grid-cols-[1.4fr_1fr_1fr]" stagger={0.06}>
        {PILLARS.map((pillar) => (
          <RevealItem key={pillar.name}>
            <PillarCard pillar={pillar} />
          </RevealItem>
        ))}
      </RevealGroup>

      {/* Mobile swipe */}
      <div className="flex gap-3.5 overflow-x-auto pb-2 [scroll-snap-type:x_mandatory] md:hidden">
        {PILLARS.map((pillar) => (
          <div key={pillar.name} className="flex-none w-[82%] [scroll-snap-align:start]">
            <PillarCard pillar={pillar} />
          </div>
        ))}
      </div>
      <div className="mt-2.5 font-mono text-[11px] text-low md:hidden">
        Swipe for more →
      </div>

      <Reveal className="mt-8 md:mt-10">
        <TransitionLink
          href="/services"
          className="font-mono text-[12px] tracking-[0.08em] text-gold transition-colors hover:text-gold-light"
        >
          ALL SERVICES &amp; PRICING →
        </TransitionLink>
      </Reveal>
    </div>
  );
}

function PillarCard({ pillar }: { pillar: (typeof PILLARS)[number] }) {
  const lead = pillar.lead;
  return (
    <div
      className={`tech-corners tech-corners-hover group relative h-full overflow-hidden rounded-[2px] border p-7 transition-[border-color,transform] duration-150 ease-[var(--ease-state)] hover:-translate-y-px ${
        lead
          ? "border-gold-dim bg-inset hover:border-gold"
          : "border-line bg-raise hover:border-gold-dim"
      }`}
      style={
        lead ? undefined : ({ "--tick-color": "var(--color-line)" } as React.CSSProperties)
      }
    >
      {lead && (
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(circle at 88% 8%, var(--color-gold-glow), transparent 55%)",
          }}
        />
      )}
      <div className="relative mb-14 flex items-start justify-between">
        <span
          className={`font-mono text-[10px] font-medium tracking-[0.18em] ${
            lead ? "text-gold" : "text-low"
          }`}
        >
          {lead ? "01 / LEAD OFFER" : pillar.tag}
        </span>
        <span className={lead ? "text-gold" : "text-mid"}>{ICONS[pillar.name]}</span>
      </div>
      <div
        className={`relative mb-5 font-display font-semibold leading-[1.1] tracking-[-0.02em] text-hi ${
          lead ? "text-[28px] md:text-[32px]" : "text-[24px] md:text-[26px]"
        }`}
      >
        {pillar.name}
      </div>
      <div className="relative flex flex-col border-t border-line">
        {pillar.services.map((service) => (
          <span
            key={service}
            className={`border-b border-line py-2.5 text-[14px] last:border-b-0 ${
              lead ? "text-hi" : "text-mid"
            }`}
          >
            {service}
          </span>
        ))}
      </div>
    </div>
  );
}
