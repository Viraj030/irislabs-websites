"use client";

import { usePathname } from "next/navigation";
import { TransitionLink } from "./TransitionLink";
import { useEffect, useState } from "react";
import { Lockup } from "./Logo";
import { NAV_LINKS } from "@/lib/data";
import { GoldButton } from "./GoldButton";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Lock body scroll while the mobile menu is open.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  function isActive(href: string) {
    return pathname === href || pathname.startsWith(`${href}/`);
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-void/90 backdrop-blur">
      <div className="flex items-center justify-between px-6 py-4 md:px-15 md:py-5">
        <TransitionLink href="/" aria-label="IrisLabs home">
          <Lockup markSize={36} wordSize={17} />
        </TransitionLink>

        <nav className="hidden items-center gap-9 md:flex">
          {NAV_LINKS.map((link) => (
            <TransitionLink
              key={link.href}
              href={link.href}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`eyebrow transition-colors ${
                isActive(link.href) ? "text-gold" : "text-mid hover:text-hi"
              }`}
            >
              {link.label.toUpperCase()}
            </TransitionLink>
          ))}
          <GoldButton href="/contact" size="sm">
            BOOK A CALL
          </GoldButton>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          className="flex h-9 w-9 cursor-pointer items-center justify-center border border-line text-hi transition-colors hover:border-gold-dim hover:text-gold md:hidden"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.3">
            {open ? (
              <path d="M3 3l10 10M13 3L3 13" />
            ) : (
              <path d="M1 4h14M1 8h14M1 12h14" />
            )}
          </svg>
        </button>
      </div>

      {open && (
        <nav className="border-t border-line bg-void md:hidden">
          {NAV_LINKS.map((link) => (
            <TransitionLink
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              aria-current={isActive(link.href) ? "page" : undefined}
              className={`block border-b border-line px-6 py-4 font-mono text-[12px] tracking-[0.16em] transition-colors ${
                isActive(link.href) ? "text-gold" : "text-mid"
              }`}
            >
              {link.label.toUpperCase()}
            </TransitionLink>
          ))}
          <div className="px-6 py-5" onClick={() => setOpen(false)}>
            <GoldButton href="/contact" size="md" fullWidth>
              BOOK A CALL
            </GoldButton>
          </div>
        </nav>
      )}
    </header>
  );
}
