import { TransitionLink } from "./TransitionLink";
import { PROOF } from "@/lib/data";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { SectionLabel } from "./SectionLabel";
import { ProofTile } from "./ProofTile";

export function Proof({
  index = "05",
  lead = false,
  /** Caps projects shown per category — used for the home-page teaser. */
  perCategory,
  showAllLink = false,
}: {
  index?: string;
  lead?: boolean;
  perCategory?: number;
  showAllLink?: boolean;
}) {
  const Heading = lead ? "h1" : "h2";
  const categories = PROOF.map((cat) => ({
    tag: cat.tag,
    projects: perCategory ? cat.projects.slice(0, perCategory) : cat.projects,
  }));

  return (
    <div className="border-b-2 border-line px-6 py-16 md:px-15 md:py-24">
      <Reveal className="mb-9 flex flex-col gap-6 md:mb-11 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionLabel index={index} label="PROOF" className="mb-6" />
          <Heading className="font-display text-[26px] font-semibold leading-[1.1] tracking-[-0.02em] text-hi md:text-[44px] md:leading-[1.05]">
            Range beyond AI
          </Heading>
        </div>
        <p className="font-mono text-[12px] leading-[1.7] text-low md:max-w-[280px]">
          No case studies with metrics yet — these are live projects, grouped
          by stack.
        </p>
      </Reveal>

      <RevealGroup
        className="grid grid-cols-1 gap-10 md:grid-cols-2 md:gap-x-10 md:gap-y-14"
        stagger={0.05}
      >
        {categories.map((cat) => (
          <RevealItem key={cat.tag}>
            <div className="mb-4 border-b border-line pb-2.5 font-mono text-[10px] tracking-[0.16em] text-gold">
              {cat.tag}
            </div>
            <div className="flex flex-col gap-8">
              {cat.projects.map((p) => (
                <ProofTile
                  key={p.domain}
                  url={p.url}
                  domain={p.domain}
                  image={"image" in p ? (p.image as string) : undefined}
                />
              ))}
            </div>
          </RevealItem>
        ))}
      </RevealGroup>

      {showAllLink && (
        <Reveal className="mt-10 md:mt-12">
          <TransitionLink
            href="/work"
            className="font-mono text-[12px] tracking-[0.08em] text-gold transition-colors hover:text-gold-light"
          >
            SEE ALL WORK →
          </TransitionLink>
        </Reveal>
      )}
    </div>
  );
}
