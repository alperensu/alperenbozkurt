"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import CVModal from "./CVModal";
import { useLanguage } from "@/context/LanguageContext";
import tr from "@/locales/tr";
import en from "@/locales/en";
import { getAssetPath } from "@/utils/paths";

export default function Hero() {
  const [isCVOpen, setIsCVOpen] = useState(false);
  const ref = useRef<HTMLElement>(null);
  const { locale } = useLanguage();
  const t = locale === "tr" ? tr : en;
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "7%"]);

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="hero" ref={ref} className="relative min-h-[112svh] overflow-hidden bg-slate-950">
      <motion.div className="absolute inset-0" style={{ scale: imageScale, y: imageY }}>
        <Image
          src={getAssetPath("/editorial/alperen-hero-lab-v1.png")}
          alt="Cinematic AI developer workstation"
          fill
          priority
          quality={100}
          sizes="100vw"
          className="object-cover object-center opacity-72 saturate-[0.72] hue-rotate-[155deg]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.86)_0%,rgba(2,6,23,0.35)_50%,rgba(2,6,23,0.82)_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_68%_36%,rgba(56,189,248,0.18),transparent_28rem)]" />
        <div className="absolute inset-x-0 bottom-0 h-2/5 bg-gradient-to-t from-slate-950 via-slate-950/74 to-transparent" />
      </motion.div>

      <div className="relative z-10 flex min-h-screen flex-col justify-end px-4 pb-10 pt-28 sm:px-6 md:px-10 lg:px-14">
        <div className="mb-8 flex items-end justify-between gap-5">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.75, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
            className="max-w-2xl"
          >
            <p className="mb-5 text-xs font-black uppercase tracking-[0.32em] text-sky-200">
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
            className="scan-line hidden min-w-64 overflow-hidden rounded-[1.35rem] border border-sky-200/18 bg-slate-950/52 p-4 shadow-[0_0_55px_rgba(56,189,248,0.13)] backdrop-blur-xl md:block"
          >
            <p className="text-[10px] font-black uppercase tracking-[0.24em] text-white/45">
              Next system
            </p>
            <p className="mt-2 text-2xl font-black text-white">VibeFlow</p>
            <button
              onClick={() => scrollTo("#projects")}
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-sky-300 px-4 py-2 text-xs font-black uppercase text-slate-950 transition-all hover:-translate-y-0.5 hover:bg-white hover:shadow-[0_0_28px_rgba(56,189,248,0.45)]"
            >
              {t.hero.btnProjects}
              <span aria-hidden>↗</span>
            </button>
          </motion.div>
        </div>

        <motion.h1 className="hero-title pointer-events-none text-[17vw] font-black tracking-normal text-white">
          {[t.hero.h1_1, t.hero.h1_2].map((line, index) => (
            <motion.span
              key={line}
              initial={{ opacity: 0, y: 58, clipPath: "inset(0 0 100% 0)" }}
              animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
              transition={{ duration: 0.95, delay: 0.58 + index * 0.16, ease: [0.16, 1, 0.3, 1] }}
              className={`block ${index === 1 ? "text-sky-200" : ""}`}
            >
              {line}
            </motion.span>
          ))}
        </motion.h1>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-3">
            <button
              onClick={() => scrollTo("#projects")}
              className="rounded-full bg-white px-5 py-3 text-sm font-black uppercase text-slate-950 transition-all hover:-translate-y-0.5 hover:bg-sky-200 hover:shadow-[0_0_30px_rgba(56,189,248,0.35)]"
            >
              {t.hero.btnProjects}
            </button>
            <button
              onClick={() => setIsCVOpen(true)}
              className="rounded-full border border-white/18 px-5 py-3 text-sm font-black uppercase text-white transition-all hover:-translate-y-0.5 hover:border-sky-300 hover:text-sky-200"
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
