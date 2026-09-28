import { TransitionLink } from "./TransitionLink";
import { Lockup } from "./Logo";
import { NAV_LINKS } from "@/lib/data";

export function Footer() {
  return (
    <footer className="bg-grid border-t border-line px-6 py-12 md:px-15 md:py-14">
      <div className="flex flex-col gap-10 md:flex-row md:justify-between md:gap-15">
        <div className="flex flex-col gap-4">
          <Lockup markSize={32} wordSize={16} dim />
          <p className="max-w-[34ch] font-mono text-[10px] leading-[1.7] text-low md:text-[11px]">
            AI automations, RAG systems and agents — and the product built
            around them.
          </p>
        </div>

        <div className="flex gap-12 md:gap-16">
          <div className="flex flex-col gap-3">
            <div className="font-mono text-[10px] tracking-[0.16em] text-gold">
              SITE
            </div>
            <TransitionLink
              href="/"
              className="font-mono text-[11px] text-mid transition-colors hover:text-gold"
            >
              Home
            </TransitionLink>
            {NAV_LINKS.map((link) => (
              <TransitionLink
                key={link.href}
                href={link.href}
                className="font-mono text-[11px] text-mid transition-colors hover:text-gold"
              >
                {link.label}
              </TransitionLink>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            <div className="font-mono text-[10px] tracking-[0.16em] text-gold">
              CONTACT
            </div>
            <TransitionLink
              href="/contact"
              className="font-mono text-[11px] text-mid transition-colors hover:text-gold"
            >
              Book a call
            </TransitionLink>
            <a
              href="mailto:hello@irislabs.dev"
              className="font-mono text-[11px] text-mid transition-colors hover:text-gold"
            >
              hello@irislabs.dev
            </a>
            <span className="font-mono text-[11px] text-low">Mumbai, India</span>
          </div>
        </div>
      </div>

      {/* Oversized wordmark, clipped by the page edge — the studio signature. */}
      <div
        aria-hidden="true"
        className="pointer-events-none mt-14 select-none overflow-hidden md:mt-20"
      >
        <div className="flex items-baseline whitespace-nowrap font-display text-[17vw] font-bold leading-[0.8] tracking-[-0.045em] md:text-[15vw]">
          <span className="text-line">IRIS</span>
          <span
            className="text-transparent"
            style={{ WebkitTextStroke: "1px var(--color-line)" }}
          >
            LABS
          </span>
        </div>
      </div>

      <div className="mt-8 flex flex-col gap-2 border-t border-line pt-6 font-mono text-[10px] text-low md:flex-row md:items-center md:justify-between">
        <span>© 2026 IrisLabs</span>
        <span className="tracking-[0.14em]">
          BUILT IN MUMBAI · SHIPPING WORLDWIDE
        </span>
      </div>
    </footer>
  );
}
