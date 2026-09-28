const PUPIL_PATH = "M22 60 L54 44 L104 44 L124 58 L104 72 L54 72 Z";
const BROW_PATH = "M44 34 L104 20 L112 28";
const LOWER_LASH_PATH = "M56 72 L48 100";
const OUTER_LASH_PATH = "M104 72 L112 86 L134 90";

export function LogoMark({
  size = 40,
  stroke = "var(--color-gold)",
  strokeWidth = 4,
}: {
  size?: number;
  stroke?: string;
  strokeWidth?: number;
}) {
  const height = Math.round((size * 120) / 168);
  return (
    <svg
      width={size}
      height={height}
      viewBox="0 0 168 120"
      fill="none"
      aria-hidden="true"
      style={{ flexShrink: 0 }}
    >
      <g stroke={stroke} strokeWidth={strokeWidth} strokeLinejoin="miter">
        <path d={PUPIL_PATH} />
        <path d={BROW_PATH} />
        <path d={LOWER_LASH_PATH} />
        <path d={OUTER_LASH_PATH} />
      </g>
      <circle cx="74" cy="58" r="8" fill="none" stroke={stroke} strokeWidth={strokeWidth} />
    </svg>
  );
}

export function Wordmark({ size = 20, dim = false }: { size?: number; dim?: boolean }) {
  return (
    <span
      className="font-display tracking-[0.2em]"
      style={{ fontSize: size, color: dim ? "var(--color-mid)" : "var(--color-hi)" }}
    >
      <span className="font-bold">IRIS</span>
      <span className="font-normal" style={{ color: "var(--color-mid)" }}>
        LABS
      </span>
    </span>
  );
}

export function Lockup({
  markSize = 40,
  wordSize = 20,
  dim = false,
}: {
  markSize?: number;
  wordSize?: number;
  dim?: boolean;
}) {
  return (
    <div className="flex items-center gap-3" style={{ opacity: dim ? 0.8 : 1 }}>
      <LogoMark size={markSize} stroke={dim ? "var(--color-mid)" : "var(--color-gold)"} strokeWidth={dim ? 4.6 : 3.4} />
      <Wordmark size={wordSize} dim={dim} />
    </div>
  );
}
