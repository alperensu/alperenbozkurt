"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import tr from "@/locales/tr";
import en from "@/locales/en";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { locale, toggleLocale } = useLanguage();
  const t = locale === "tr" ? tr : en;

  const links = [
    { label: t.nav.home, href: "#hero" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.solutions, href: "#solutions" },
    { label: t.nav.sectors, href: "#sectors" },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <motion.nav
      initial={{ y: -28, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, delay: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed left-1/2 top-3 z-50 flex w-[min(96vw,980px)] -translate-x-1/2 items-center justify-between rounded-full border px-2 py-2 transition-all duration-500 ${
        scrolled
          ? "border-white/15 bg-black/78 shadow-2xl shadow-black/45 backdrop-blur-2xl"
          : "border-white/10 bg-black/42 backdrop-blur-xl"
      }`}
    >
      <button
        onClick={() => scrollTo("#hero")}
        className="flex h-10 items-center gap-2 rounded-full bg-[#e9ff00] px-3 text-xs font-black uppercase text-black transition-transform hover:scale-[1.02] md:px-4"
        aria-label="Alperen Bozkurt"
      >
        <span className="grid h-6 w-6 place-items-center rounded-full bg-black text-[10px] text-[#e9ff00]">
          AB
        </span>
        <span className="hidden sm:inline">Alperen</span>
      </button>

      <div className="hidden items-center gap-1 md:flex">
        {links.map((link) => (
          <button
            key={link.href}
            onClick={() => scrollTo(link.href)}
            className="rounded-full px-4 py-2 text-xs font-black uppercase tracking-[0.12em] text-white/62 transition-colors hover:bg-white/10 hover:text-white"
          >
            {link.label}
          </button>
        ))}
      </div>

      <div className="flex items-center gap-1">
        <button
          onClick={toggleLocale}
          className="grid h-10 w-10 place-items-center rounded-full border border-white/12 text-xs font-black text-white/70 transition-colors hover:border-[#e9ff00]/50 hover:text-[#e9ff00]"
          aria-label="Toggle language"
        >
          {locale === "tr" ? "EN" : "TR"}
        </button>
        <a
          href="mailto:alperenbozkurt.iletisim@gmail.com"
          className="rounded-full bg-white px-4 py-3 text-xs font-black uppercase tracking-[0.08em] text-black transition-colors hover:bg-[#e9ff00]"
        >
          {t.nav.cta}
        </a>
      </div>
    </motion.nav>
  );
}
