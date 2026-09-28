import type { Metadata } from "next";
import { Booking } from "@/components/Booking";
import { FAQ } from "@/components/FAQ";

export const metadata: Metadata = {
  title: "Book a call",
  description:
    "Book a discovery call with IrisLabs. Fixed-scope first engagement from $2,500 / ₹1,50,000. Mumbai, India — working with clients across the US and India.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <>
      <Booking index="01" lead />
      <FAQ index="02" />
    </>
  );
}
