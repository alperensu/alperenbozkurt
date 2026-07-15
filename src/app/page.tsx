"use client";

import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Profile from "@/components/Profile";
import Solutions from "@/components/Solutions";
import Projects from "@/components/Projects";
import Marquee from "@/components/Marquee";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import dynamic from "next/dynamic";

const ClipIntro = dynamic(() => import("@/components/ClipIntro"), { ssr: false });

export default function Home() {
  return (
    <SmoothScroll>
      <div className="portfolio-shell relative isolate min-h-screen overflow-hidden">
        <ClipIntro />
        <Navbar />
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
