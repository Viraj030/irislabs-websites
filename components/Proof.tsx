"use client";

import { useRef } from "react";
import { TransitionLink } from "./TransitionLink";
import { PROOF } from "@/lib/data";
import { Reveal } from "./Reveal";
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
  const sectionRefs = useRef<Record<string, HTMLElement | null>>({});

  const categories = PROOF.map((cat) => ({
    tag: cat.tag,
    id: cat.tag.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    projects: perCategory ? cat.projects.slice(0, perCategory) : cat.projects,
  }));

  function scrollTo(id: string) {
    const el = sectionRefs.current[id];
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <div className="border-b-2 border-line px-6 py-16 md:px-15 md:py-24">
      {/* Header row */}
      <Reveal className="mb-9 flex flex-col gap-6 md:mb-10 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionLabel index={index} label="PROOF" className="mb-6" />
          <Heading className="font-display text-[26px] font-semibold leading-[1.1] tracking-[-0.02em] text-hi md:text-[44px] md:leading-[1.05]">
            Range beyond AI
          </Heading>
        </div>
      </Reveal>

      {/* Tech-stack filter pills — only shown on the full work page (lead) */}
      {lead && (
        <Reveal className="mb-12 flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => scrollTo(cat.id)}
              className="group flex items-center gap-1.5 border border-line px-4 py-2 font-mono text-[10px] tracking-[0.14em] text-low transition-colors duration-150 hover:border-gold-dim hover:text-gold"
            >
              <span
                className="h-[5px] w-[5px] rounded-full bg-gold-dim transition-colors duration-150 group-hover:bg-gold"
                aria-hidden="true"
              />
              {cat.tag}
            </button>
          ))}
        </Reveal>
      )}

      {/* ── Home teaser: flat row of cards ── */}
      {perCategory ? (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {categories.flatMap((cat) =>
            cat.projects.map((p) => (
              <ProofTile
                key={p.domain}
                url={p.url}
                domain={p.domain}
                image={"image" in p ? (p.image as string) : undefined}
              />
            ))
          )}
        </div>
      ) : (
        /* ── Full /work page: categories with labels ── */
        <div className="flex flex-col gap-16">
          {categories.map((cat) => (
            <section
              key={cat.tag}
              id={cat.id}
              ref={(el) => { sectionRefs.current[cat.id] = el; }}
            >
              <div className="mb-5 border-b border-line pb-2.5 font-mono text-[10px] tracking-[0.16em] text-gold">
                {cat.tag}
              </div>
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {cat.projects.map((p) => (
                  <ProofTile
                    key={p.domain}
                    url={p.url}
                    domain={p.domain}
                    image={"image" in p ? (p.image as string) : undefined}
                  />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

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

