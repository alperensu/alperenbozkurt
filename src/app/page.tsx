"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Solutions from "@/components/Solutions";
import Projects from "@/components/Projects";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

// Dynamic imports for heavy client components (no SSR)
const CyberBackground = dynamic(
  () => import("@/components/CyberBackground"),
  { ssr: false }
);
const ClipIntro = dynamic(() => import("@/components/ClipIntro"), {
  ssr: false,
});

export default function Home() {
  return (
    <SmoothScroll>
      {/* Clip-path intro overlay */}
      <ClipIntro />

      {/* Cyber Node Network background */}
      <CyberBackground />

      {/* Floating navbar */}
      <Navbar />

      {/* Main content */}
      <main className="relative z-10">
        <Hero />
        <Solutions />
        <Projects />
        <Marquee />
      </main>

      <Footer />
    </SmoothScroll>
  );
}
