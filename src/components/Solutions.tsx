"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import tr from "@/locales/tr";
import en from "@/locales/en";
import { getAssetPath } from "@/utils/paths";

export default function Solutions() {
  const { locale } = useLanguage();
  const t = locale === "tr" ? tr : en;

  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="solutions" className="cinematic-section bg-black text-white">
      <div className="section-inner">
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="kicker text-sky-200">{t.solutions.badge}</p>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
              className="display-relaxed mt-5 max-w-5xl text-[clamp(2.85rem,8vw,7rem)] font-black"
            >
              {t.solutions.heading1} <span className="text-sky-200">{t.solutions.heading2}</span>
            </motion.h2>
          </div>
          <p className="max-w-xl text-lg leading-8 text-white/62">{t.solutions.subtitle}</p>
        </div>

        <div className="grid gap-3 lg:grid-cols-2">
          <motion.button
            whileHover={{ scale: 0.992 }}
            onClick={() => scrollTo("#projects")}
            className="group blue-panel relative min-h-[560px] overflow-hidden rounded-[2rem] p-6 text-left text-white md:p-8"
          >
            <div className="absolute inset-0 opacity-30 transition-transform duration-700 group-hover:scale-105">
              <Image
                src={getAssetPath("/editorial/alperen-services-campaign-v1.png")}
                alt="Digital service campaign visual"
                fill
                quality={100}
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover saturate-[0.65] hue-rotate-[155deg]"
              />
            </div>
            <div className="relative flex h-full flex-col justify-between">
              <span className="rounded-full bg-white px-4 py-2 text-xs font-black uppercase text-slate-950">
                {t.projects.badge}
              </span>
              <div>
                <h3 className="display-safe text-[clamp(3.1rem,8vw,7rem)] font-black">
                  Projects
                </h3>
                <p className="mt-5 max-w-md text-lg font-bold text-white/66">
                  {t.projects.heading1} {t.projects.heading2}
                </p>
              </div>
            </div>
          </motion.button>

          <motion.div
            whileHover={{ scale: 0.992 }}
            className="relative min-h-[560px] overflow-hidden rounded-[2rem] bg-slate-50 p-6 text-slate-950 md:p-8"
          >
            <div className="relative z-10 flex h-full flex-col justify-between">
              <span className="w-fit rounded-full bg-slate-950 px-4 py-2 text-xs font-black uppercase text-white">
                Services
              </span>
              <div className="grid gap-3">
                {t.solutions.items.slice(0, 4).map((item, index) => (
                  <div key={item.title} className="border-t border-black/12 pt-4">
                    <div className="flex items-start justify-between gap-5">
                      <h3 className="display-relaxed text-2xl font-black md:text-4xl">{item.title}</h3>
                      <span className="text-sm font-black text-black/40">0{index + 1}</span>
                    </div>
                    <p className="mt-2 max-w-xl text-sm leading-6 text-black/58 md:text-base">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
