import type { Metadata } from "next";
import { Instrument_Serif } from "next/font/google";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { EtheralShadowBg } from "@/components/ui/etheral-shadow-bg";
import { LoadingScreen } from "@/components/LoadingScreen";
import { SpotlightCursor } from "@/components/ui/spotlight-cursor";
import {
  getOrganizationSchema,
  getServicesSchema,
  getFAQSchema,
  getReviewSchema,
  getWebPageSchema,
} from "@/lib/structured-data";
import { WhatsAppWidget } from "@/components/WhatsAppWidget";
import "./globals.css";

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://genosai.tech"),
  title: {
    default:
      "GenosAI | #1 AI Automation Agency | Custom AI Systems for Business",
    template: "%s | GenosAI",
  },
  description:
    "GenosAI is a global AI automation agency that builds custom AI chatbots, voice AI agents, workflow automation, and intelligent business systems. Trusted by 23+ clients across 5 countries with 50+ projects delivered and 98% client retention.",
  keywords: [
    "AI automation agency",
    "custom AI solutions",
    "AI chatbot development",
    "voice AI agents",
    "workflow automation",
    "business process automation",
    "AI systems for business",
    "AI lead qualification",
    "AI cold calling",
    "AI outreach automation",
    "enterprise AI solutions",
    "GenosAI",
    "AI agency",
    "best AI automation company",
  ],
  authors: [{ name: "GenosAI", url: "https://genosai.tech" }],
  creator: "GenosAI",
  publisher: "GenosAI",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "https://genosai.tech",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://genosai.tech",
    siteName: "GenosAI",
    title:
      "GenosAI | #1 AI Automation Agency | Custom AI Systems for Business",
    description:
      "We build custom AI chatbots, voice AI agents, workflow automation, and intelligent business systems. 50+ projects delivered across 5 countries with 98% client retention.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "GenosAI | AI Automation Agency",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@AiGenos81577",
    creator: "@AiGenos81577",
    title: "GenosAI | #1 AI Automation Agency",
    description:
      "Custom AI chatbots, voice AI, workflow automation & intelligent systems for businesses worldwide.",
    images: ["/og-image.png"],
  },
};

const jsonLdScripts = [
  getOrganizationSchema(),
  ...getServicesSchema(),
  getFAQSchema(),
  getReviewSchema(),
  getWebPageSchema(),
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Satoshi font from CDN (not available on Google Fonts) */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700,800&display=swap"
          rel="stylesheet"
        />
        {/* JSON-LD Structured Data for SEO & GEO */}
        {jsonLdScripts.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body
        className={`${instrumentSerif.variable} font-body bg-bg-dark text-text-on-dark overflow-x-hidden antialiased`}
      >
        <LoadingScreen />
        <EtheralShadowBg />
        <SpotlightCursor
          config={{
            radius: 150,
            brightness: 5.0,
            color: "#ffffff",
            smoothing: 0.12,
          }}
        />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
        <WhatsAppWidget />
      </body>
    </html>
  );
}
