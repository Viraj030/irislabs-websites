import type { Metadata } from "next";
import { Pricing } from "@/components/Pricing";
import { RiskReversal } from "@/components/RiskReversal";

export const metadata: Metadata = {
  title: "Pricing",
  description:
    "Starting prices for AI automation, RAG systems, agent setups, SAAS, ecommerce and web builds — in USD and INR. Fixed scope, agreed before invoice.",
  alternates: { canonical: "/pricing" },
};

export default function PricingPage() {
  return (
    <>
      <Pricing index="01" lead />
      <RiskReversal index="02" />
    </>
  );
}
