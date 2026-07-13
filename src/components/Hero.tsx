"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import AnimatedElement from "./AnimatedElement";
import CVModal from "./CVModal";
import { useLanguage } from "@/context/LanguageContext";
import tr from "@/locales/tr";
import en from "@/locales/en";

export default function Hero() {
  const [isCVOpen, setIsCVOpen] = useState(false);
  const { locale } = useLanguage();
  const t = locale === "tr" ? tr : en;

  const metrics =
    locale === "tr"
      ? [
          { value: "5+", label: "projeler" },
          { value: "AI", label: "AI odaklı" },
          { value: "Full", label: "full-stack" },
        ]
      : [
          { value: "5+", label: "projects" },
          { value: "AI", label: "AI focused" },
          { value: "Full", label: "full-stack" },
        ];

  const commandLines = ["init portfolio.v2", "sync AI systems", "deploy interface"];

  const scrollTo = (id: string) => {
    const el = document.querySelector(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      className="relative isolate min-h-screen overflow-hidden px-4 pb-14 pt-24 sm:px-6 md:px-16 md:pb-20 md:pt-28 lg:px-24"
    >
      <div className="absolute inset-x-4 top-24 h-px bg-linear-to-r from-transparent via-white/20 to-transparent sm:inset-x-6 md:inset-x-16 md:top-28 lg:inset-x-24" />

      <div className="relative mx-auto grid w-full max-w-7xl gap-8 lg:min-h-[calc(100vh-7rem)] lg:grid-cols-[1.02fr_0.98fr] lg:items-center">
        <div className="w-full max-w-[22rem] justify-self-start text-left sm:mx-auto sm:max-w-2xl sm:justify-self-center sm:text-center lg:mx-0 lg:justify-self-auto lg:text-left">
          <AnimatedElement delay={0.55} direction="up">
            <span className="eyebrow mr-auto sm:mx-auto lg:mx-0">
              <span className="hidden sm:inline">{t.hero.badge}</span>
              <span className="sm:hidden">Full-Stack & GEO</span>
            </span>
          </AnimatedElement>

          <motion.h1
            initial={{ y: 24, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.72, delay: 0.75, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-[20rem] text-[2.85rem] font-black leading-[0.94] text-white sm:mx-auto sm:max-w-none sm:text-6xl md:text-7xl lg:mx-0 lg:text-8xl"
          >
            {locale === "tr" ? (
              <>
                <span className="block">Yapay zeka</span>
                <span className="block">çağında</span>
                <span className="block bg-linear-to-r from-cyan-300 via-white to-orange-300 bg-clip-text text-transparent sm:hidden">
                  çalışan
                </span>
                <span className="block bg-linear-to-r from-cyan-300 via-white to-orange-300 bg-clip-text text-transparent sm:hidden">
                  yazılım
                </span>
                <span className="hidden bg-linear-to-r from-cyan-300 via-white to-orange-300 bg-clip-text text-transparent sm:block">
                  çalışan yazılım
                </span>
              </>
            ) : (
              <>
                <span className="block">Building</span>
                <span className="block">software</span>
                <span className="block bg-linear-to-r from-cyan-300 via-white to-orange-300 bg-clip-text text-transparent">
                  for AI
                </span>
              </>
            )}
          </motion.h1>

          <AnimatedElement delay={0.95} direction="up">
            <p className="mt-6 max-w-[21rem] text-pretty text-[0.96rem] leading-7 text-white/[0.64] sm:mx-auto sm:max-w-xl sm:text-base md:text-lg md:leading-8 lg:mx-0">
              {t.hero.subtitle}
            </p>
          </AnimatedElement>

          <AnimatedElement direction="up" delay={1.05}>
            <div className="mt-7 grid max-w-[20rem] gap-3 sm:flex sm:max-w-none sm:flex-wrap sm:justify-center lg:justify-start">
              <button
                onClick={() => scrollTo("#projects")}
                className="group inline-flex min-h-13 w-full items-center justify-center gap-3 rounded-lg bg-white px-5 py-4 text-sm font-black text-slate-950 shadow-[0_22px_70px_rgba(88,215,255,0.18)] transition-all duration-300 hover:-translate-y-1 hover:bg-cyan-100 sm:w-auto"
              >
                <iconify-icon icon="mdi:rocket-launch-outline" width="20" height="20" />
                {t.hero.btnProjects}
              </button>
              <button
                onClick={() => setIsCVOpen(true)}
                className="group inline-flex min-h-13 w-full items-center justify-center gap-3 rounded-lg border border-white/[0.12] bg-white/[0.06] px-5 py-4 text-sm font-bold text-white transition-all duration-300 hover:-translate-y-1 hover:border-orange-300/[0.35] hover:bg-white/10 sm:w-auto"
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

          <AnimatedElement direction="up" delay={1.15}>
            <div className="mt-4 grid max-w-[20rem] grid-cols-3 overflow-hidden rounded-lg border border-white/10 bg-white/[0.035] backdrop-blur-md sm:mt-6 sm:max-w-none">
              {metrics.map((metric) => (
                <div key={metric.label} className="border-r border-white/10 px-2.5 py-3 text-center last:border-r-0 sm:px-4 sm:py-4">
                  <p className="text-2xl font-black text-white md:text-3xl">{metric.value}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase leading-4 tracking-[0.08em] text-white/[0.44] sm:text-xs">
                    {metric.label}
                  </p>
                </div>
              ))}
            </div>
          </AnimatedElement>
        </div>

        <AnimatedElement delay={0.9} direction="right" className="relative w-full max-w-[20rem] min-w-0 justify-self-start sm:mx-auto sm:max-w-xl sm:justify-self-center lg:mx-0 lg:max-w-[36rem] lg:justify-self-auto">
          <div className="premium-panel relative overflow-hidden rounded-lg p-3 sm:p-4 md:p-5">
            <div className="absolute inset-0 hairline-grid opacity-35" />
            <div className="relative flex items-center justify-between border-b border-white/10 pb-4">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-red-400/80" />
                <span className="h-3 w-3 rounded-full bg-amber-300/80" />
                <span className="h-3 w-3 rounded-full bg-emerald-300/80" />
              </div>
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.16em] text-cyan-200/60 sm:text-[11px]">
                alperen.core
              </span>
            </div>

            <div className="relative grid min-w-0 gap-4 py-4">
              <div className="min-w-0 rounded-lg border border-white/10 bg-black/28 p-3 font-mono sm:p-4">
                {commandLines.map((line, index) => (
                  <div key={line} className="flex items-start gap-3 border-b border-white/[0.07] py-3 last:border-b-0">
                    <span className="text-cyan-300/70">0{index + 1}</span>
                    <span className="min-w-0 break-words text-sm leading-6 text-white/[0.78] sm:text-base">
                      $ {line}
                    </span>
                  </div>
                ))}
                <div className="mt-4 h-2 overflow-hidden rounded-full bg-white/10">
                  <motion.div
                    initial={{ width: "12%" }}
                    animate={{ width: "86%" }}
                    transition={{ duration: 1.8, delay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                    className="h-full rounded-full bg-linear-to-r from-cyan-300 via-white to-orange-300"
                  />
                </div>
              </div>
            </div>

            <div className="relative grid grid-cols-3 gap-2 border-t border-white/10 pt-4">
              {["Next.js", "AI", "Data"].map((item) => (
                <div key={item} className="rounded-md border border-white/10 bg-white/[0.035] px-2 py-2 text-center sm:px-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.1em] text-white/[0.58] sm:text-xs">
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </AnimatedElement>
      </div>

      <CVModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
    </section>
  );
}
