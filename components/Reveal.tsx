"use client";

import {
  Children,
  cloneElement,
  createContext,
  createElement,
  isValidElement,
  useContext,
  type ReactElement,
  type ReactNode,
} from "react";
import { useInViewOnce } from "@/lib/useInViewOnce";

const EASE = "var(--ease-entrance)";

function revealStyle(inView: boolean, delaySeconds = 0): React.CSSProperties {
  return {
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(12px)",
    transition: `opacity 560ms ${EASE} ${delaySeconds}s, transform 560ms ${EASE} ${delaySeconds}s`,
  };
}

type Tag = "div" | "span" | "h1" | "h2";

/** Standalone fade-rise, triggered once when it enters the viewport. */
export function Reveal({
  children,
  className,
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: Tag;
}) {
  const { ref, inView } = useInViewOnce<HTMLElement>(0.15);
  return createElement(
    as,
    { ref, className, style: revealStyle(inView) },
    children
  );
}

const RevealContext = createContext<{ inView: boolean } | null>(null);

/** Wraps a set of RevealItem children and staggers their entrance. */
export function RevealGroup({
  children,
  className,
  stagger = 0.04,
}: {
  children: ReactNode;
  className?: string;
  stagger?: number;
}) {
  const { ref, inView } = useInViewOnce<HTMLDivElement>(0.15);

  return (
    <div ref={ref} className={className}>
      <RevealContext.Provider value={{ inView }}>
        {Children.map(children, (child, i) =>
          isValidElement(child)
            ? cloneElement(child as ReactElement<{ delay?: number }>, {
                delay: i * stagger,
              })
            : child
        )}
      </RevealContext.Provider>
    </div>
  );
}

export function RevealItem({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const ctx = useContext(RevealContext);
  const inView = ctx?.inView ?? true;

  return (
    <div className={className} style={revealStyle(inView, delay)}>
      {children}
    </div>
  );
}
