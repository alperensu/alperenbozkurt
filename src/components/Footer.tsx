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
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <footer className="bg-black px-4 py-8 text-white sm:px-6 md:px-10 lg:px-14">
      <div ref={ref} className="rounded-[2rem] border border-white/10 bg-[#0b0b0b] p-5 md:p-8">
        <motion.div
          initial={{ y: 36, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="kicker text-[#e9ff00]">{t.footer.tagline}</p>
          <h2 className="mt-6 text-[clamp(4rem,15vw,15rem)] font-black uppercase leading-[0.74]">
            Let&apos;s build
            <span className="block text-[#e9ff00]">the system.</span>
          </h2>

          <div className="mt-10 grid gap-8 border-t border-white/10 pt-6 md:grid-cols-[1fr_auto_1fr] md:items-end">
            <div>
              <p className="text-lg font-black">Alperen Bozkurt</p>
              <p className="mt-2 max-w-sm text-sm leading-6 text-white/45">
                {locale === "tr"
                  ? "AI, web ve ürün arayüzleri için hızlı, net ve yüksek etkili sistemler."
                  : "Fast, focused, high-impact systems for AI, web, and product interfaces."}
              </p>
            </div>

            <div className="flex items-center gap-2">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/12 text-white/52 transition-colors hover:border-[#e9ff00] hover:text-[#e9ff00]"
                  aria-label={link.label}
                >
                  <iconify-icon icon={link.icon} width="18" height="18" />
                </a>
              ))}
            </div>

            <div className="md:text-right">
              <VisitorCounter />
              <p className="mt-3 text-sm text-white/32">
                © {new Date().getFullYear()} Alperen Bozkurt. {t.footer.copyright}
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}
