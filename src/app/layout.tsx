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
  title: "Alperen Bozkurt | Next-Gen Dijital Stratejist",
  description:
    "İşletmeleri Yapay Zeka Çağına Hazırlayan Dijital Çözüm Ortağı. Kurumsal web geliştirme, AI destekli dijital strateji ve e-ticaret çözümleri.",
  keywords: [
    "dijital strateji",
    "yapay zeka",
    "web geliştirme",
    "e-ticaret",
    "AI",
    "Next.js",
  ],
  authors: [{ name: "Alperen Bozkurt" }],
  openGraph: {
    title: "Alperen Bozkurt | Next-Gen Dijital Stratejist",
    description:
      "İşletmeleri Yapay Zeka Çağına Hazırlayan Dijital Çözüm Ortağı",
    type: "website",
  },
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
      </head>
      <body className="min-h-screen bg-black text-slate-200 font-sans">
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  );
}
