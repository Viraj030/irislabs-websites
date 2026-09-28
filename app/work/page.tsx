import type { Metadata } from "next";
import { Proof } from "@/components/Proof";
import { CTABand } from "@/components/CTABand";

export const metadata: Metadata = {
  title: "Work",
  description:
    "Live client projects built by IrisLabs, grouped by stack — ecommerce, React/Next.js, PHP and backend work.",
  alternates: { canonical: "/work" },
};

export default function WorkPage() {
  return (
    <>
      <Proof index="01" lead />
      <CTABand title="Want something like this built?" />
    </>
  );
}
