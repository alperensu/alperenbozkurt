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
    <footer className="relative border-t border-white/10 px-6 py-16 md:px-16 lg:px-24">
      <div className="section-inner" ref={ref}>
        <motion.div
          initial={{ y: 28, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
          className="motion-smooth"
        >
          <div className="premium-panel flex flex-col items-center justify-between gap-8 rounded-lg p-6 md:flex-row md:p-8">
            {/* Brand */}
            <div className="flex flex-col items-center md:items-start gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/[0.055]">
                  <span className="bg-linear-to-r from-cyan-200 via-white to-orange-300 bg-clip-text text-sm font-black text-transparent">
                    AB
                  </span>
                </div>
                <div>
                  <p className="text-base font-black text-white">
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
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className="flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-white/[0.055] text-white/40 transition-all duration-500 hover:-translate-y-1 hover:border-cyan-300/30 hover:bg-white/[0.1] hover:text-white"
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
