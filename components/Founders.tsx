import Image from "next/image";
import { FOUNDERS } from "@/lib/data";
import { Reveal, RevealGroup, RevealItem } from "./Reveal";
import { SectionLabel } from "./SectionLabel";
import { Terminal } from "./Terminal";

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("");
}

function LinkedInIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <rect x="3" y="3" width="18" height="18" rx="1" />
      <path d="M7.5 10v7M7.5 7.2v.1M11.5 17v-4.2c0-1.5 1-2.3 2.2-2.3 1.2 0 1.8.8 1.8 2.3V17" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4">
      <path d="M9 19c-4 1.5-4-2-6-2m12 4v-3.2c0-.9.3-1.5.7-1.8-2.5-.3-5.2-1.3-5.2-5.6 0-1.2.4-2.2 1.1-3-.1-.3-.5-1.5.1-3.1 0 0 .9-.3 3 1.1a10 10 0 0 1 5.4 0c2.1-1.4 3-1.1 3-1.1.6 1.6.2 2.8.1 3.1.7.8 1.1 1.8 1.1 3 0 4.3-2.7 5.3-5.2 5.6.4.3.8 1 .8 2V19" />
    </svg>
  );
}

export function Founders({ index = "04" }: { index?: string }) {
  return (
    <div id="team" className="border-b-2 border-line px-6 py-16 md:px-15 md:py-24">
      <Reveal className="mb-12 flex flex-col gap-6 md:mb-16 md:flex-row md:items-end md:justify-between">
        <div>
          <SectionLabel index={index} label="THE TEAM" className="mb-6" />
          <h2 className="max-w-[16ch] font-display text-[28px] font-semibold leading-[1.08] tracking-[-0.02em] text-hi md:text-[44px]">
            Two people. Both of them build.
          </h2>
        </div>
        <p className="font-mono text-[11px] leading-[1.7] text-low md:max-w-[280px] md:text-[12px]">
          No account layer between you and the people writing the code.
        </p>
      </Reveal>

      <div className="flex flex-col">
        {FOUNDERS.map((person, i) => (
          <FounderRow key={person.name} person={person} n={i + 1} />
        ))}
      </div>
    </div>
  );
}

function FounderRow({
  person,
  n,
}: {
  person: (typeof FOUNDERS)[number];
  n: number;
}) {
  return (
    <div className="border-t border-line py-10 first:border-t-gold-dim md:py-14">
      {/* Identity row */}
      <Reveal className="mb-8 flex flex-col gap-5 md:mb-10 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-5">
          <div className="relative h-16 w-16 flex-none overflow-hidden rounded-full border border-gold-dim bg-inset md:h-[72px] md:w-[72px]">
            {person.photo ? (
              <Image
                src={person.photo}
                alt={person.name}
                fill
                sizes="72px"
                className="object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center font-mono text-[20px] font-medium tracking-[0.08em] text-gold">
                {initials(person.name)}
              </div>
            )}
          </div>
          <div>
            <div className="mb-1.5 font-mono text-[10px] tracking-[0.18em] text-gold-dim">
              {String(n).padStart(2, "0")}
            </div>
            <div className="font-display text-[24px] font-semibold leading-none tracking-[-0.02em] text-hi md:text-[30px]">
              {person.name}
            </div>
            <div className="mt-2 font-mono text-[10px] tracking-[0.12em] text-gold md:text-[11px]">
              {person.role.toUpperCase()}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${person.name} on LinkedIn`}
            className="flex items-center gap-1.5 border border-line px-3 py-2 text-mid transition-colors duration-150 hover:border-gold-dim hover:text-gold"
          >
            <LinkedInIcon />
            <span className="font-mono text-[10px] tracking-[0.08em]">LINKEDIN</span>
          </a>
          {person.github && (
            <a
              href={person.github}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${person.name} on GitHub`}
              className="flex items-center gap-1.5 border border-line px-3 py-2 text-mid transition-colors duration-150 hover:border-gold-dim hover:text-gold"
            >
              <GitHubIcon />
              <span className="font-mono text-[10px] tracking-[0.08em]">GITHUB</span>
            </a>
          )}
        </div>
      </Reveal>

      <Reveal className="mb-9 max-w-[68ch] text-[15px] leading-[1.7] text-mid md:mb-11 md:text-[17px]">
        {person.bio}
      </Reveal>

      {/* Experience gets real typography; the terminal carries the profile summary. */}
      <div className="grid grid-cols-1 gap-9 md:grid-cols-[1.05fr_1fr] md:gap-12">
        <div>
          <div className="mb-4 border-b border-line pb-2.5 font-mono text-[10px] tracking-[0.18em] text-low">
            EXPERIENCE
          </div>
          <RevealGroup className="flex flex-col" stagger={0.04}>
            {person.experience.map((role) => (
              <RevealItem
                key={`${role.period}-${role.org}`}
                className="grid grid-cols-[92px_1fr] gap-4 border-b border-line py-3.5 md:grid-cols-[112px_1fr] md:gap-6"
              >
                <span className="font-mono text-[10px] leading-[1.6] text-gold-dim md:text-[11px]">
                  {role.period}
                </span>
                <span>
                  <span className="block text-[14px] leading-[1.4] text-hi md:text-[15px]">
                    {role.role}
                  </span>
                  <span className="mt-0.5 block font-mono text-[10px] leading-[1.5] text-low md:text-[11px]">
                    {role.org}
                  </span>
                </span>
              </RevealItem>
            ))}
          </RevealGroup>

          {person.projects.length > 0 && (
            <div className="mt-7">
              <div className="mb-3.5 font-mono text-[10px] tracking-[0.18em] text-low">
                SELECTED PROJECTS
              </div>
              <div className="flex flex-col gap-2">
                {person.projects.map((project) => (
                  <a
                    key={project.url}
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-mono text-[11px] leading-[1.6] text-mid transition-colors duration-150 hover:text-gold"
                  >
                    <span className="text-gold-dim">→</span> {project.label}
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>

        <Reveal>
          <Terminal
            script={person.terminal}
            title={`${person.name.split(" ")[0].toUpperCase()} — PROFILE.SH`}
            minHeight={290}
            dense
          />
        </Reveal>
      </div>
    </div>
  );
}
