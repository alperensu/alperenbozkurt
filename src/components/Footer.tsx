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
    <footer className="bg-slate-950 px-4 py-8 text-white sm:px-6 md:px-10 lg:px-14">
      <div ref={ref} className="blue-panel rounded-[2rem] border border-white/10 p-5 md:p-8">
        <motion.div
          initial={{ y: 36, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="kicker text-sky-200">{t.footer.tagline}</p>
          <h2 className="display-safe mt-6 text-[clamp(3.6rem,12vw,12rem)] font-black">
            <motion.span
              className="block"
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.72, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
            >
              Let&apos;s build
            </motion.span>
            <motion.span
              className="block text-sky-200"
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.72, delay: 0.18, ease: [0.16, 1, 0.3, 1] }}
            >
              the system.
            </motion.span>
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
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0, y: 16 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.25 + index * 0.06, ease: [0.16, 1, 0.3, 1] }}
                  className="grid h-11 w-11 place-items-center rounded-full border border-white/12 text-white/52 transition-colors hover:border-sky-300 hover:text-sky-200"
                  aria-label={link.label}
                >
                  <iconify-icon icon={link.icon} width="18" height="18" />
                </motion.a>
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
