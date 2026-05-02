"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Profile from "@/components/Profile";
import Solutions from "@/components/Solutions";
import Projects from "@/components/Projects";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";

// Dynamic imports for heavy client components (no SSR)
const PremiumWebGLBackground = dynamic(
  () => import("@/components/PremiumWebGLBackground"),
  { ssr: false }
);
const ClipIntro = dynamic(() => import("@/components/ClipIntro"), {
  ssr: false,
});

export default function Home() {
  return (
    <SmoothScroll>
      <div className="relative isolate min-h-screen">
        {/* Clip-path intro overlay */}
        <ClipIntro />

        {/* Premium WebGL background */}
        <PremiumWebGLBackground />

        {/* Floating navbar */}
        <Navbar />

        {/* Main content */}
        <main className="relative z-10">
          <Hero />
          <Profile />
          <Solutions />
          <Projects />
          <Marquee />
        </main>

        <Footer />
      </div>
    </SmoothScroll>
  );
}
