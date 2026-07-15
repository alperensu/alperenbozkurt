"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import tr from "@/locales/tr";
import en from "@/locales/en";

export default function ClipIntro() {
  const [done, setDone] = useState(false);
  const { locale } = useLanguage();
  const t = locale === "tr" ? tr : en;

  if (done) return null;

  return (
    <AnimatePresence>
      <motion.div
        key="clip-intro"
        className="fixed inset-0 z-[150] flex flex-col justify-between overflow-hidden bg-[#020617] p-5 text-white md:p-8"
        initial={{ y: 0 }}
        animate={{ y: "-100%" }}
        transition={{ duration: 0.95, delay: 1.25, ease: [0.76, 0, 0.24, 1] }}
        onAnimationComplete={() => setDone(true)}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(56,189,248,0.32),transparent_32rem)]" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-sky-300/40" />
        <div className="flex items-center justify-between text-xs font-black uppercase">
          <span className="relative z-10">Load Alperen</span>
          <span className="relative z-10 text-sky-200">Portfolio / 2026</span>
        </div>

        <div className="relative z-10">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-5 h-2 rounded-full bg-linear-to-r from-sky-500 via-white to-sky-300 shadow-[0_0_38px_rgba(56,189,248,0.55)]"
          />
          <motion.h2
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.65, ease: [0.16, 1, 0.3, 1] }}
            className="display-safe text-[clamp(4rem,18vw,18rem)] font-black uppercase text-sky-100"
          >
            AB
          </motion.h2>
          <p className="mt-3 text-sm font-black uppercase tracking-[0.2em] text-sky-100/58">{t.clip.tagline}</p>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
