"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import tr from "@/locales/tr";
import en from "@/locales/en";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { locale, toggleLocale } = useLanguage();
  const t = locale === "tr" ? tr : en;

  const navLinks = [
    { label: t.nav.home, href: "#hero" },
    { label: t.nav.solutions, href: "#solutions" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.sectors, href: "#sectors" },
  ];

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (ticking) return;

      ticking = true;
      requestAnimationFrame(() => {
        ticking = false;
        setScrolled((current) => {
          const next = window.scrollY > 50;
          return current === next ? current : next;
        });
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (href: string) => {
    const el = document.querySelector(href);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <motion.nav
      initial={{ y: -42, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.72, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed left-1/2 top-4 z-50 flex max-w-[95vw] -translate-x-1/2 items-center gap-0.5 rounded-lg px-1.5 py-1.5 transition-all duration-700 ease-in-out md:gap-1 md:px-2 md:py-2 ${
        scrolled
          ? "border border-white/[0.18] bg-[#090f20]/[0.78] shadow-2xl shadow-black/60 backdrop-blur-2xl"
          : "border border-white/10 bg-[#090f20]/[0.54] backdrop-blur-xl"
      }`}
    >
      <a
        href="#hero"
        onClick={(e) => {
          e.preventDefault();
          scrollTo("#hero");
        }}
        className="mr-2 flex h-10 w-10 items-center justify-center rounded-md border border-white/10 bg-white/[0.06] transition-all duration-500 hover:border-cyan-300/30 hover:bg-white/10"
      >
        <span className="bg-linear-to-r from-cyan-200 via-white to-orange-300 bg-clip-text text-sm font-black text-transparent">
          AB
        </span>
      </a>

      <div className="hidden md:flex items-center gap-0.5">
        {navLinks.map((link, index) => (
          <motion.button
            key={link.href}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.5,
              delay: 1.4 + index * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            onClick={() => scrollTo(link.href)}
            className="rounded-md px-4 py-2 text-sm font-semibold text-white/[0.55] transition-all duration-500 hover:bg-white/[0.08] hover:text-white"
          >
            {link.label}
          </motion.button>
        ))}
      </div>

      {/* Simplified Mobile Links - Only most important */}
      <div className="flex md:hidden items-center gap-0.5">
        <motion.button
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
          onClick={() => scrollTo("#projects")}
          className="rounded-md px-3 py-2 text-xs font-semibold text-white/60 transition-all hover:text-white"
        >
          {t.nav.projects}
        </motion.button>
      </div>

      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
        onClick={toggleLocale}
        className="ml-1 rounded-md border border-white/10 px-3 py-2 text-xs font-black text-white/50 transition-all duration-500 hover:border-cyan-300/[0.35] hover:bg-cyan-300/10 hover:text-white"
        aria-label="Toggle language"
      >
        {locale === "tr" ? "EN" : "TR"}
      </motion.button>

      <motion.a
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
        href="mailto:alperenbozkurt.iletisim@gmail.com"
        className="ml-1 whitespace-nowrap rounded-md bg-white px-3 py-2 text-xs font-black text-slate-950 transition-all duration-500 hover:bg-cyan-100 hover:shadow-lg hover:shadow-cyan-500/[0.15] md:ml-2 md:px-5 md:text-sm"
      >
        {t.nav.cta}
      </motion.a>
    </motion.nav>
  );
}
