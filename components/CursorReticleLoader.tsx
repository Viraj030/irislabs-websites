"use client";

import dynamic from "next/dynamic";

const CursorReticle = dynamic(
  () => import("./CursorReticle").then((m) => m.CursorReticle),
  { ssr: false }
);

export function CursorReticleLoader() {
  return <CursorReticle />;
}
