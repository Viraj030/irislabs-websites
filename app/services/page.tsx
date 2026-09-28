import type { Metadata } from "next";
import { ServiceIndex } from "@/components/ServiceIndex";
import { Process } from "@/components/Process";
import { CTABand } from "@/components/CTABand";

export const metadata: Metadata = {
  title: "Services",
  description:
    "AI automations, RAG systems, agent setups and SAAS development, plus ecommerce and web builds — with starting prices in USD and INR.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <>
      <ServiceIndex index="01" lead />
      <Process index="02" />
      <CTABand title="Which layer is costing you most?" />
    </>
  );
}
