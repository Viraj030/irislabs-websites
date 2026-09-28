import type { ReactNode } from "react";
import { TransitionLink } from "./TransitionLink";

type Variant = "solid" | "wipe" | "invert" | "ghost";
type Size = "sm" | "md" | "lg";

const sizeClasses: Record<Size, string> = {
  sm: "px-4.5 py-2.5 text-[11px]",
  md: "px-6.5 py-4 text-[12px]",
  lg: "px-7 py-[17px] text-[13px]",
};

const variantClasses: Record<Variant, string> = {
  solid:
    "bg-gold text-void border border-gold hover:bg-gold-light hover:shadow-[0_0_0_4px_var(--color-gold-glow)]",
  wipe: "border border-gold-dim text-gold btn-wipe",
  invert:
    "bg-void text-gold border border-void hover:bg-inset hover:text-gold-light",
  ghost: "border border-line text-hi hover:border-gold-dim hover:text-gold",
};

export function GoldButton({
  children,
  href,
  onClick,
  type = "button",
  variant = "solid",
  size = "md",
  className = "",
  fullWidth = false,
}: {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  type?: "button" | "submit";
  variant?: Variant;
  size?: Size;
  className?: string;
  fullWidth?: boolean;
}) {
  const classes = `font-mono font-medium tracking-[0.08em] rounded-[2px] cursor-pointer transition-[background-color,color,box-shadow] duration-150 ease-[var(--ease-state)] inline-block text-center ${sizeClasses[size]} ${variantClasses[variant]} ${fullWidth ? "w-full" : ""} ${className}`;

  if (href) {
    // Internal routes play the eye transition on the way to the new page.
    if (href.startsWith("/")) {
      return (
        <TransitionLink href={href} className={classes}>
          {children}
        </TransitionLink>
      );
    }
    return (
      <a href={href} className={classes}>
        {children}
      </a>
    );
  }
  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
