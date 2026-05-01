"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
        className="fixed inset-0 z-100 flex items-center justify-center bg-black"
        initial={{ clipPath: "circle(100% at 50% 50%)", opacity: 1 }}
        animate={{ clipPath: "circle(0% at 50% 50%)", opacity: 0.6 }}
        transition={{
          clipPath: {
            duration: 1.2,
            delay: 0.6,
            ease: [0.4, 0, 0.2, 1],
          },
          opacity: {
            duration: 0.8,
            delay: 1.0,
            ease: [0.4, 0, 0.2, 1],
          },
        }}
        onAnimationComplete={() => setDone(true)}
      >
        {/* Intro content */}
        <motion.div
          className="text-center"
          initial={{ scale: 1, filter: "blur(0px)", opacity: 1 }}
          animate={{ scale: 0.9, filter: "blur(6px)", opacity: 0 }}
          transition={{ duration: 1.0, delay: 0.4, ease: [0.4, 0, 0.2, 1] }}
        >
          <motion.div
            initial={{ y: 30, filter: "blur(8px)", opacity: 0 }}
            animate={{ y: 0, filter: "blur(0px)", opacity: 1 }}
            transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
            className="flex flex-col items-center gap-4"
          >
            <div className="w-16 h-16 rounded-2xl bg-linear-to-br from-vibrant-orange to-sunset-amber flex items-center justify-center text-2xl font-bold text-white">
              AB
            </div>
            <h2 className="text-2xl md:text-3xl font-light tracking-[0.3em] text-white/80 uppercase">
              Alperen Bozkurt
            </h2>
            <div className="h-px w-32 bg-linear-to-r from-transparent via-vibrant-orange to-transparent" />
            <p className="text-sm tracking-[0.2em] text-white/40 uppercase">
              {t.clip.tagline}
            </p>
          </motion.div>
        </motion.div>

        {/* Animated ring */}
        <motion.div
          className="absolute w-64 h-64 rounded-full border border-white/10"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 2.5, opacity: 0 }}
          transition={{
            duration: 1.5,
            delay: 0.2,
            ease: [0.4, 0, 0.2, 1],
          }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
