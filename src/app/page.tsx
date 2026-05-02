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
const Scene3D = dynamic(
  () => import("@/components/Scene3D"),
  { ssr: false }
);
const ClipIntro = dynamic(() => import("@/components/ClipIntro"), {
  ssr: false,
});

export default function Home() {
  return (
    <SmoothScroll>
      <div className="portfolio-shell relative isolate min-h-screen">
        {/* Clip-path intro overlay */}
        <ClipIntro />

        {/* Premium 3D Background */}
        <Scene3D />

        {/* Floating navbar */}
        <Navbar />

        {/* Main content */}
        <main className="site-content relative z-20">
          <Hero />
          <Profile />
          <Solutions />
          <Projects />
          <Marquee />
        </main>

        <div className="site-content relative z-20">
          <Footer />
        </div>
      </div>
    </SmoothScroll>
  );
}
