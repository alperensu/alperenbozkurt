import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { LanguageProvider } from "@/context/LanguageContext";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Alperen Bozkurt | Full-Stack Developer & GEO Strategist",
  description:
    "Expert in AI-powered modern software development, GEO (Generative Engine Optimization), and high-end digital strategies. Transforming businesses for the AI era with technical excellence and creative vision.",
  keywords: [
    "Alperen Bozkurt",
    "GEO Strategist",
    "Generative Engine Optimization",
    "AI-powered development",
    "Full-Stack Developer",
    "Next.js Expert",
    "Digital Strategy",
    "Creative Web Design",
    "Video Editing Expert",
    "Yapay Zeka Stratejisti",
  ],
  authors: [{ name: "Alperen Bozkurt" }],
  viewport: "width=device-width, initial-scale=1",
  robots: "index, follow",
  openGraph: {
    title: "Alperen Bozkurt | Full-Stack Developer & GEO Strategist",
    description: "Transforming businesses for the AI era with technical excellence and creative vision.",
    url: "https://alperensu.github.io/alperenbozkurt/",
    siteName: "Alperen Bozkurt Portfolio",
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alperen Bozkurt | Full-Stack Developer & GEO Strategist",
    description: "Expert in AI-powered modern software development and GEO.",
  }
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Alperen Bozkurt",
  "url": "https://alperensu.github.io/alperenbozkurt/",
  "jobTitle": "Full-Stack Developer & GEO Strategist",
  "description": "Specializing in AI-powered software development and Generative Engine Optimization.",
  "sameAs": [
    "https://github.com/alperensu",
    "https://www.linkedin.com/in/alperen-bozkurt-b6135b403/",
    "https://x.com/alperenbozkurtx"
  ]
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="tr" className={`${inter.variable} antialiased`}>
      <head>
        <Script
          src="https://code.iconify.design/iconify-icon/2.3.0/iconify-icon.min.js"
          strategy="afterInteractive"
        />
        {/* GoatCounter analytics — ziyaretci takibi */}
        <Script
          data-goatcounter="https://alperenbozkurt.goatcounter.com/count"
          src="//gc.zgo.at/count.js"
          strategy="afterInteractive"
        />
        {/* JSON-LD Structured Data for GEO/SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen bg-black text-slate-200 font-sans">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
