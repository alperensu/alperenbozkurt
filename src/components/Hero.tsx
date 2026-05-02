"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import AnimatedElement from "./AnimatedElement";
import TechCore from "./TechCore";
import CVModal from "./CVModal";
import { useLanguage } from "@/context/LanguageContext";
import tr from "@/locales/tr";
import en from "@/locales/en";

function WordReveal({
  children,
  delay = 0,
  className = "",
  gradient,
}: {
  children: string;
  delay?: number;
  className?: string;
  gradient?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const words = children.split(" ").filter(Boolean);

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          initial={{ y: 18, opacity: 0 }}
          animate={
            isInView
              ? { y: 0, opacity: 1 }
              : { y: 18, opacity: 0 }
          }
          transition={{
            duration: 0.52,
            delay: delay + i * 0.05,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`motion-smooth inline-block mr-[0.3em] ${gradient || ""}`}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

export default function Hero() {
  const [isCVOpen, setIsCVOpen] = useState(false);
  const { locale } = useLanguage();
  const t = locale === "tr" ? tr : en;

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-6 md:px-16 lg:px-24 pt-24 pb-16"
    >
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row items-center gap-12 lg:gap-8">
        {/* Left — Text */}
        <div className="flex-1 flex flex-col gap-8 text-center lg:text-left">
          <AnimatedElement delay={1.4} direction="up">
            <span className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/10 text-base text-orange-300 font-medium backdrop-blur-sm w-fit mx-auto lg:mx-0">
              <span className="text-lg">🚀</span>
              {t.hero.badge}
            </span>
          </AnimatedElement>

          <div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[1.08] tracking-tight">
              <WordReveal delay={1.6} className="text-white">
                {t.hero.h1_1}
              </WordReveal>
              <WordReveal
                delay={1.8}
                gradient="bg-linear-to-r from-orange-400 via-amber-400 to-orange-300 bg-clip-text text-transparent"
              >
                {t.hero.h1_2}
              </WordReveal>
              <WordReveal delay={2.0} className="text-white">
                {t.hero.h1_3}
              </WordReveal>
              <WordReveal
                delay={2.2}
                gradient="bg-linear-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent"
              >
                {t.hero.h1_4}
              </WordReveal>
            </h1>
          </div>

          <AnimatedElement delay={2.4} direction="up">
            <p className="text-lg md:text-xl lg:text-2xl text-white/50 max-w-2xl leading-relaxed mx-auto lg:mx-0">
              {t.hero.subtitle}
            </p>
          </AnimatedElement>

          {/* CTA Buttons */}
          <AnimatedElement direction="up" delay={0.8}>
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start">
              <button
                onClick={() => scrollTo("#projects")}
                className="px-8 py-4 bg-linear-to-r from-orange-500 to-amber-500 rounded-2xl font-bold text-white shadow-lg shadow-orange-500/25 hover:scale-105 transition-all duration-300"
              >
                {t.hero.btnProjects}
              </button>
              <button
                onClick={() => setIsCVOpen(true)}
                className="px-8 py-4 bg-white/5 border border-white/10 rounded-2xl font-bold text-white hover:bg-white/10 transition-all duration-300 flex items-center gap-2 group"
              >
                <iconify-icon icon="mdi:file-document-outline" className="text-xl group-hover:text-orange-400 transition-colors" />
                {locale === "tr" ? "CV Görüntüle" : "View CV"}
              </button>
            </div>
          </AnimatedElement>
        </div>

        {/* Right — Terminal Widget */}
        <AnimatedElement
          delay={1.8}
          direction="right"
          className="w-full lg:w-1/2 flex justify-center"
        >
          <TechCore />
        </AnimatedElement>
      </div>

      <CVModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />

      {/* Scroll indicator */}
      <AnimatedElement
        delay={3.0}
        direction="up"
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-white/30">
          <span className="text-xs tracking-widest uppercase">{t.hero.scroll}</span>
          <div className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1">
            <div className="w-1 h-2 rounded-full bg-white/40 animate-scroll-pulse" />
          </div>
        </div>
      </AnimatedElement>
    </section>
  );
}
