import type { Metadata } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { Analytics } from "@vercel/analytics/next";
import { ScrollProgress } from "@/components/ScrollProgress";
import { CursorReticleLoader } from "@/components/CursorReticleLoader";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { EyeTransition } from "@/components/EyeTransition";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

const SITE_URL = "https://irislabs.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "IrisLabs — AI Automation, RAG & Agent Build Studio",
    template: "%s — IrisLabs",
  },
  description:
    "IrisLabs builds AI automations, RAG systems and agents for businesses — and designs and ships the product around them. Fixed scope, from $2,500 / ₹1,50,000.",
  openGraph: {
    title: "IrisLabs — AI Automation, RAG & Agent Build Studio",
    description:
      "AI automations, RAG systems and agents for businesses that have outgrown manual process. Fixed scope, defined deliverable.",
    url: SITE_URL,
    siteName: "IrisLabs",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "IrisLabs — AI Automation, RAG & Agent Build Studio",
    description:
      "AI automations, RAG systems and agents for businesses that have outgrown manual process.",
  },
  robots: { index: true, follow: true },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${SITE_URL}/#org`,
      name: "IrisLabs",
      url: SITE_URL,
      email: "hello@irislabs.dev",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Mumbai",
        addressCountry: "IN",
      },
    },
    {
      "@type": "Service",
      serviceType: "AI Automation & Agent Development",
      provider: { "@id": `${SITE_URL}/#org` },
      areaServed: ["US", "IN"],
      description:
        "AI automations, RAG systems, AI agent setups and SAAS development, plus ecommerce and web design and development.",
      offers: {
        "@type": "Offer",
        priceCurrency: "USD",
        price: "2500",
        description: "AI automation build, fixed scope, starting price.",
      },
    },
  ],
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${archivo.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="min-h-full bg-void">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <EyeTransition>
          <ScrollProgress />
          <CursorReticleLoader />
          <Header />
          <main>{children}</main>
          <Footer />
        </EyeTransition>
        <Analytics />
      </body>
    </html>
  );
}
