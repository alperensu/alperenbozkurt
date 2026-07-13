"use client";

import { useRef, useState } from "react";
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
          animate={isInView ? { y: 0, opacity: 1 } : { y: 18, opacity: 0 }}
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

  const metrics =
    locale === "tr"
      ? [
          { value: "5+", label: "ürün projesi" },
          { value: "AI", label: "entegrasyon odağı" },
          { value: "Full", label: "stack üretim" },
        ]
      : [
          { value: "5+", label: "product builds" },
          { value: "AI", label: "integration focus" },
          { value: "Full", label: "stack delivery" },
        ];

  const commandLines = ["init portfolio.v2", "sync AI systems", "deploy premium interface"];

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden px-6 pb-20 pt-28 md:px-16 lg:px-24"
    >
      <div className="absolute inset-x-6 top-28 h-px bg-linear-to-r from-transparent via-white/20 to-transparent md:inset-x-16 lg:inset-x-24" />

      <div className="section-inner relative grid min-h-[calc(100vh-7rem)] items-center gap-12 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="flex w-72 max-w-[calc(100vw-3rem)] -translate-x-14 justify-self-center flex-col gap-8 text-center sm:w-[calc(100vw-3rem)] sm:translate-x-0 lg:w-auto lg:justify-self-auto lg:text-left">
          <AnimatedElement delay={0.7} direction="up">
            <span className="eyebrow mx-auto lg:mx-0">
              <span className="hidden sm:inline">{t.hero.badge}</span>
              <span className="sm:hidden">Full-Stack & GEO</span>
            </span>
          </AnimatedElement>

          <h1 className="text-balance text-4xl font-black leading-[0.98] text-white sm:text-6xl md:text-7xl lg:text-8xl">
            {locale === "tr" ? (
              <>
                <span className="block">
                  <WordReveal delay={0.9} className="text-white">
                    Yapay zeka
                  </WordReveal>
                </span>
                <span className="block">
                  <WordReveal delay={1.0} className="text-white">
                    çağında
                  </WordReveal>
                </span>
                <span className="block">
                  <WordReveal
                    delay={1.1}
                    gradient="bg-linear-to-r from-cyan-300 via-white to-orange-300 bg-clip-text text-transparent"
                  >
                    çalışan yazılım
                  </WordReveal>
                </span>
              </>
            ) : (
              <>
                <span className="block">
                  <WordReveal delay={0.9} className="text-white">
                    Building software
                  </WordReveal>
                </span>
                <span className="block">
                  <WordReveal
                    delay={1.1}
                    gradient="bg-linear-to-r from-cyan-300 via-white to-orange-300 bg-clip-text text-transparent"
                  >
                    for the AI era
                  </WordReveal>
                </span>
              </>
            )}
          </h1>

          <AnimatedElement delay={1.25} direction="up">
            <p className="text-pretty mx-auto max-w-2xl text-base leading-8 text-white/[0.58] md:text-lg lg:mx-0">
              {t.hero.subtitle}
            </p>
          </AnimatedElement>

          <AnimatedElement direction="up" delay={1.35}>
            <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <button
                onClick={() => scrollTo("#projects")}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-lg bg-white px-6 py-4 text-sm font-black text-slate-950 shadow-[0_22px_70px_rgba(88,215,255,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-100 sm:w-auto"
              >
                <iconify-icon icon="mdi:rocket-launch-outline" width="20" height="20" />
                {t.hero.btnProjects}
              </button>
              <button
                onClick={() => setIsCVOpen(true)}
                className="group inline-flex w-full items-center justify-center gap-3 rounded-lg border border-white/[0.12] bg-white/[0.06] px-6 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:border-orange-300/[0.35] hover:bg-white/10 sm:w-auto"
              >
                <iconify-icon
                  icon="mdi:file-document-outline"
                  width="20"
                  height="20"
                  className="transition-colors group-hover:text-orange-300"
                />
                {locale === "tr" ? "CV Görüntüle" : "View CV"}
              </button>
            </div>
          </AnimatedElement>

          <AnimatedElement direction="up" delay={1.5}>
            <div className="grid grid-cols-1 overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] backdrop-blur-md sm:grid-cols-3">
              {metrics.map((metric) => (
                <div key={metric.label} className="border-b border-white/10 px-4 py-4 text-left last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0">
                  <p className="text-2xl font-black text-white md:text-3xl">{metric.value}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-[0.12em] text-white/[0.38]">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedElement>
        </div>

        <AnimatedElement delay={1.15} direction="right" className="relative w-72 max-w-[calc(100vw-3rem)] -translate-x-14 min-w-0 justify-self-center sm:w-[calc(100vw-3rem)] sm:translate-x-0 lg:w-full lg:justify-self-auto">
          <div className="premium-panel relative overflow-hidden rounded-lg p-4 md:p-5">
            <div className="absolute inset-0 hairline-grid opacity-35" />
            <div className="relative flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-amber-300/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-300/80" />
              </div>
              <span className="font-mono text-[11px] font-bold uppercase tracking-[0.18em] text-cyan-200/60">
                alperen.core
              </span>
            </div>

            <div className="relative grid min-w-0 gap-4 py-5 md:grid-cols-[minmax(0,1fr)_0.82fr] md:items-center">
              <div className="min-w-0 rounded-lg border border-white/10 bg-black/28 p-4 font-mono">
                {commandLines.map((line, index) => (
                  <div key={line} className="flex items-center gap-3 border-b border-white/[0.07] py-3 last:border-b-0">
                    <span className="text-cyan-300/70">0{index + 1}</span>
                    <span className="min-w-0 break-words text-white/[0.78]">$ {line}</span>
                  </div>
                ))}
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: "12%" }}
                    animate={{ width: "86%" }}
                    transition={{ duration: 1.8, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full bg-linear-to-r from-cyan-300 via-white to-orange-300"
                  />
                </div>
              </div>

              <TechCore />
            </div>

            <div className="relative grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
              {["Next.js", "AI", "Data"].map((item) => (
                <div key={item} className="rounded-md border border-white/10 bg-white/[0.035] px-3 py-2 text-center">
                  <span className="text-xs font-black uppercase tracking-[0.12em] text-white/[0.58]">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedElement>
      </div>

      <CVModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />

      <AnimatedElement
        delay={1.8}
        direction="up"
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex flex-col items-center gap-2 text-white/30">
          <span className="text-xs uppercase tracking-widest">{t.hero.scroll}</span>
          <div className="flex h-8 w-5 items-start justify-center rounded-full border border-white/20 p-1">
            <div className="h-2 w-1 rounded-full bg-white/40 animate-scroll-pulse" />
          </div>
        </div>
      </AnimatedElement>
    </section>
  );
}
