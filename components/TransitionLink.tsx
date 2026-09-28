"use client";

import Link from "next/link";
import type { MouseEvent, ReactNode } from "react";
import { useEyeTransition } from "./EyeTransition";

/** Internal link that plays the Eye of Horus transition before the route swap.
 *  Modified clicks (new tab, middle click) fall through to normal behaviour. */
export function TransitionLink({
  href,
  children,
  className,
  onClick,
  "aria-label": ariaLabel,
  "aria-current": ariaCurrent,
}: {
  href: string;
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  "aria-label"?: string;
  "aria-current"?: "page" | undefined;
}) {
  const navigate = useEyeTransition();

  function handleClick(e: MouseEvent<HTMLAnchorElement>) {
    if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0) return;
    e.preventDefault();
    onClick?.();
    navigate(href);
  }

  return (
    <Link
      href={href}
      className={className}
      onClick={handleClick}
      aria-label={ariaLabel}
      aria-current={ariaCurrent}
    >
      {children}
    </Link>
  );
}
