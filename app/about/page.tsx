import type { Metadata } from "next";
import { AboutIntro } from "@/components/AboutIntro";
import { Layers } from "@/components/Layers";
import { Approach } from "@/components/Approach";
import { Founders } from "@/components/Founders";
import { CTABand } from "@/components/CTABand";

export const metadata: Metadata = {
  title: "About",
  description:
    "IrisLabs is a Mumbai-based product studio run by Sharva Patil and Viraj Asolkar. We build the surface, the machine behind it, and the signal that proves it works.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <>
      <AboutIntro index="01" />
      <Layers index="02" />
      <Approach index="03" />
      <Founders index="04" />
      <CTABand title="Talk to the people who'll build it." />
    </>
  );
}
