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
      className={`fixed top-4 left-1/2 -translate-x-1/2 z-50 flex items-center gap-0.5 md:gap-1 px-1.5 md:px-2 py-1.5 md:py-2 rounded-full transition-all duration-700 ease-[cubic-bezier(0.4,0,0.2,1)] max-w-[95vw] whitespace-nowrap ${
        scrolled
          ? "bg-white/10 backdrop-blur-2xl border border-white/20 shadow-2xl shadow-black/60"
          : "bg-white/5 backdrop-blur-xl border border-white/10"
      }`}
    >
      {/* Logo */}
      <a
        href="#hero"
        onClick={(e) => {
          e.preventDefault();
          scrollTo("#hero");
        }}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-linear-to-br from-vibrant-orange/20 to-sunset-amber/20 border border-white/10 mr-2 hover:border-vibrant-orange/30 transition-all duration-500"
      >
        <span className="text-sm font-bold bg-linear-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
          AB
        </span>
      </a>

      {/* Nav Links - Hidden on mobile, shown on md+ */}
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
            className="px-4 py-2 text-sm font-medium text-white/60 hover:text-white rounded-full hover:bg-white/10 transition-all duration-500"
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
          className="px-3 py-2 text-xs font-medium text-white/60 hover:text-white rounded-full transition-all"
        >
          {t.nav.projects}
        </motion.button>
      </div>

      {/* Language Toggle */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.8, ease: [0.16, 1, 0.3, 1] }}
        onClick={toggleLocale}
        className="px-3 py-1.5 text-xs font-bold rounded-full border border-white/10 text-white/50 hover:text-white hover:border-orange-500/40 hover:bg-orange-500/10 transition-all duration-500 ml-1"
        aria-label="Toggle language"
      >
        {locale === "tr" ? "EN" : "TR"}
      </motion.button>

      {/* CTA */}
      <motion.a
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1.9, ease: [0.16, 1, 0.3, 1] }}
        href="mailto:alperenbozkurt.iletisim@gmail.com"
        className="ml-1 md:ml-2 px-3 md:px-5 py-2 text-xs md:text-sm font-semibold rounded-full bg-linear-to-r from-orange-500 to-amber-500 text-white hover:from-orange-400 hover:to-amber-400 transition-all duration-500 hover:shadow-lg hover:shadow-orange-500/25 whitespace-nowrap"
      >
        {t.nav.cta}
      </motion.a>
    </motion.nav>
  );
}
