"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import CVModal from "./CVModal";
import { useLanguage } from "@/context/LanguageContext";
import tr from "@/locales/tr";
import en from "@/locales/en";
import { getAssetPath } from "@/utils/paths";

export default function Hero() {
  const [isCVOpen, setIsCVOpen] = useState(false);
  const { locale } = useLanguage();
  const t = locale === "tr" ? tr : en;

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" className="relative min-h-[112svh] overflow-hidden bg-black">
      <div className="absolute inset-0">
        <Image
          src={getAssetPath("/editorial/alperen-hero-lab-v1.png")}
          alt="Cinematic AI developer workstation"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-center opacity-78"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.28)_50%,rgba(0,0,0,0.72)_100%)]" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-black via-black/72 to-transparent" />
      </div>

      <div className="relative z-10 flex min-h-screen flex-col justify-end px-4 pb-10 pt-28 sm:px-6 md:px-10 lg:px-14">
        <div className="mb-8 flex items-end justify-between gap-5">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <p className="mb-5 text-xs font-black uppercase tracking-[0.32em] text-[#e9ff00]">
              {t.hero.badge}
            </p>
            <p className="max-w-xl text-pretty text-base leading-7 text-white/72 md:text-xl md:leading-8">
              {t.hero.subtitle}
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
            className="hidden min-w-64 rounded-[1.35rem] border border-white/15 bg-black/42 p-4 backdrop-blur-xl md:block"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/45">
              Next system
            </p>
            <p className="mt-2 text-2xl font-black text-white">VibeFlow</p>
            <button
              onClick={() => scrollTo("#projects")}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#e9ff00] px-4 py-2 text-xs font-black uppercase text-black"
            >
              {t.hero.btnProjects}
              <span aria-hidden>↗</span>
            </button>
          </motion.div>
        </div>

        <motion.h1
          initial={{ opacity: 0, y: 44 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.95, delay: 0.62, ease: [0.16, 1, 0.3, 1] }}
          className="hero-title pointer-events-none text-[18vw] font-black uppercase leading-[0.74] tracking-normal text-white"
        >
          <span className="block">{t.hero.h1_1}</span>
          <span className="block text-[#e9ff00]">{t.hero.h1_2}</span>
        </motion.h1>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <button
              onClick={() => scrollTo("#projects")}
              className="rounded-full bg-white px-5 py-3 text-sm font-black uppercase text-black transition-colors hover:bg-[#e9ff00]"
            >
              {t.hero.btnProjects}
            </button>
            <button
              onClick={() => setIsCVOpen(true)}
              className="rounded-full border border-white/18 px-5 py-3 text-sm font-black uppercase text-white transition-colors hover:border-[#e9ff00] hover:text-[#e9ff00]"
            >
              CV
            </button>
          </div>
          <p className="text-xs font-black uppercase tracking-[0.24em] text-white/42">
            {t.hero.scroll} / 2026
          </p>
        </div>
      </div>

      <CVModal isOpen={isCVOpen} onClose={() => setIsCVOpen(false)} />
    </section>
  );
}
