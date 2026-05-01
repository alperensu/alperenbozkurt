"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import tr from "@/locales/tr";
import en from "@/locales/en";
import VisitorCounter from "./VisitorCounter";

const socialLinks = [
  { icon: "simple-icons:github", href: "https://github.com/alperensu", label: "GitHub" },
  { icon: "simple-icons:linkedin", href: "https://www.linkedin.com/in/alperen-bozkurt-b6135b403/", label: "LinkedIn" },
  { icon: "simple-icons:x", href: "https://x.com/alperenbozkurtx", label: "X" },
  { icon: "simple-icons:instagram", href: "https://www.instagram.com/alperenbzkrt_/", label: "Instagram" },
];

export default function Footer() {
  const { locale } = useLanguage();
  const t = locale === "tr" ? tr : en;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <footer className="relative py-16 px-6 md:px-16 lg:px-24 border-t border-white/10">
      <div className="max-w-7xl mx-auto" ref={ref}>
        <motion.div
          initial={{ y: 40, opacity: 0, filter: "blur(6px)" }}
          animate={isInView ? { y: 0, opacity: 1, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            {/* Brand */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-linear-to-br from-orange-500/20 to-amber-500/20 border border-white/10 flex items-center justify-center">
                  <span className="text-sm font-bold bg-linear-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                    AB
                  </span>
                </div>
                <div>
                  <p className="text-base font-semibold text-white">
                    Alperen Bozkurt
                  </p>
                  <p className="text-sm text-white/40">
                    {t.footer.tagline}
                  </p>
                </div>
              </div>
            </div>

            {/* Social Links — staggered */}
            <div className="flex items-center gap-3">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: 0.2 + index * 0.1,
                    ease: [0.4, 0, 0.2, 1],
                  }}
                  className="w-11 h-11 rounded-xl flex items-center justify-center bg-white/10 border border-white/10 text-white/40 hover:text-white hover:bg-white/15 hover:border-orange-500/30 hover:-translate-y-1 transition-all duration-500"
                  aria-label={link.label}
                >
                  <iconify-icon icon={link.icon} width="18" height="18" />
                </motion.a>
              ))}
            </div>

            {/* Copyright + Visitor Counter */}
            <div className="flex flex-col items-center md:items-end gap-3">
              <VisitorCounter />
              <p className="text-sm text-white/30">
                © {new Date().getFullYear()} Alperen Bozkurt. {t.footer.copyright}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
