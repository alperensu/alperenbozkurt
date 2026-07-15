"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import tr from "@/locales/tr";
import en from "@/locales/en";
import { getAssetPath } from "@/utils/paths";

export default function Marquee() {
  const { locale } = useLanguage();
  const t = locale === "tr" ? tr : en;
  const items = t.marquee.items;

  return (
    <section id="sectors" className="cinematic-section bg-slate-50 text-slate-950">
      <div className="section-inner">
        <div className="mb-12 grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="kicker text-sky-700">{t.marquee.badge}</p>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
              className="display-relaxed mt-5 text-[clamp(3rem,8vw,7.25rem)] font-black"
            >
              {t.marquee.heading1} <span className="text-slate-950/32">{t.marquee.heading2}</span>
            </motion.h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-black/62 md:ml-auto">
            {t.marquee.subtitle}
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-90px" }}
          transition={{ duration: 0.82, ease: [0.16, 1, 0.3, 1] }}
          className="relative mb-5 overflow-hidden rounded-[2rem] bg-slate-950"
        >
          <Image
            src={getAssetPath("/editorial/alperen-services-campaign-v1.png")}
            alt="Digital service campaign backdrop"
            width={1920}
            height={920}
            quality={100}
            sizes="100vw"
            className="h-[360px] w-full object-cover opacity-74 saturate-[0.68] hue-rotate-[155deg] md:h-[560px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950/86 to-transparent" />
          <div className="absolute bottom-6 left-6 max-w-4xl text-white md:bottom-10 md:left-10">
            <p className="kicker text-sky-200">Campaign systems</p>
            <h3 className="display-safe mt-3 text-[clamp(2.4rem,7vw,6.8rem)] font-black">
              Build once. Adapt fast.
            </h3>
          </div>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="min-h-56 rounded-[1.35rem] border border-sky-900/10 bg-white p-5 shadow-sm transition-all hover:-translate-y-1 hover:border-sky-400/35 hover:shadow-[0_18px_48px_rgba(14,165,233,0.12)]"
            >
              <span className="text-sm font-black text-sky-700/55">0{index + 1}</span>
              <h3 className="display-relaxed mt-10 text-3xl font-black">{item.title}</h3>
              <p className="mt-4 text-sm leading-6 text-black/58">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
