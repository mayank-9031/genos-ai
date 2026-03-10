import type { Metadata } from "next"
import { Instrument_Serif } from "next/font/google"
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider"
import { EtheralShadowBg } from "@/components/ui/etheral-shadow-bg"
import { LoadingScreen } from "@/components/LoadingScreen"
import "./globals.css"

const instrumentSerif = Instrument_Serif({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
})

export const metadata: Metadata = {
  title: "GenosAI",
  description: "AI Automation Agency — We Build AI Systems That Run Your Business.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <head>
        {/* Satoshi font from CDN (not available on Google Fonts) */}
        <link
          href="https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600,700,800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${instrumentSerif.variable} font-body bg-bg-dark text-text-on-dark overflow-x-hidden antialiased`}
        style={{ fontFamily: "'Satoshi', var(--font-sans, system-ui, sans-serif)" }}
      >
        <LoadingScreen />
        <EtheralShadowBg />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  )
}
