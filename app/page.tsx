import { Hero } from "@/components/Hero";
import { Problem } from "@/components/Problem";
import { Pillars } from "@/components/Pillars";
import { Proof } from "@/components/Proof";
import { RiskReversal } from "@/components/RiskReversal";

export default function Home() {
  return (
    <>
      <Hero />
      <Problem index="02" />
      <Pillars index="03" />
      <Proof index="04" perCategory={1} showAllLink />
      <RiskReversal index="05" />
    </>
  );
}
