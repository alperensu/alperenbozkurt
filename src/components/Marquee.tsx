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
    <section id="sectors" className="cinematic-section bg-[#f4f1e8] text-black">
      <div className="section-inner">
        <div className="mb-12 grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="kicker text-black/52">{t.marquee.badge}</p>
            <h2 className="mt-5 text-[clamp(3.5rem,10vw,9rem)] font-black uppercase leading-[0.78]">
              {t.marquee.heading1} <span className="text-black/28">{t.marquee.heading2}</span>
            </h2>
          </div>
          <p className="max-w-2xl text-lg leading-8 text-black/62 md:ml-auto">
            {t.marquee.subtitle}
          </p>
        </div>

        <div className="relative mb-5 overflow-hidden rounded-[2rem] bg-black">
          <Image
            src={getAssetPath("/editorial/alperen-services-campaign-v1.png")}
            alt="Digital service campaign backdrop"
            width={1920}
            height={920}
            quality={100}
            sizes="100vw"
            className="h-[360px] w-full object-cover opacity-78 md:h-[560px]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/82 to-transparent" />
          <div className="absolute bottom-6 left-6 max-w-4xl text-white md:bottom-10 md:left-10">
            <p className="kicker text-[#e9ff00]">Campaign systems</p>
            <h3 className="mt-3 text-[clamp(2.6rem,8vw,8rem)] font-black uppercase leading-[0.78]">
              Build once. Adapt fast.
            </h3>
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: index * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="min-h-56 rounded-[1.35rem] border border-black/10 bg-white p-5"
            >
              <span className="text-sm font-black text-black/35">0{index + 1}</span>
              <h3 className="mt-10 text-3xl font-black uppercase leading-none">{item.title}</h3>
              <p className="mt-4 text-sm leading-6 text-black/58">{item.description}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
