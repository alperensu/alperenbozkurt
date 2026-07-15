"use client";

import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useLanguage } from "@/context/LanguageContext";
import tr from "@/locales/tr";
import en from "@/locales/en";
import { getAssetPath } from "@/utils/paths";

export default function Profile() {
  const { locale } = useLanguage();
  const t = locale === "tr" ? tr : en;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const yA = useTransform(scrollYProgress, [0, 1], ["7%", "-7%"]);
  const yB = useTransform(scrollYProgress, [0, 1], ["-4%", "8%"]);

  return (
    <section id="profile" ref={ref} className="cinematic-section bg-slate-50 text-slate-950">
      <div className="section-inner">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="kicker text-sky-700">{t.profile.badge}</p>
            <motion.h2
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
              className="display-relaxed mt-6 max-w-3xl text-[clamp(2.75rem,7vw,7.25rem)] font-black"
            >
              {t.profile.title}
            </motion.h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-black/68 md:text-xl md:leading-9">
              {t.profile.bio}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {[t.profile.skills.languages, t.profile.skills.ai, t.profile.skills.multimedia].map((skill, index) => (
                <span
                  key={index}
                  className="max-w-full rounded-full border border-sky-900/12 bg-white px-4 py-2 text-xs font-black uppercase text-slate-700 shadow-sm"
                >
                  {skill.split(",").slice(0, 3).join(" / ")}
                </span>
              ))}
            </div>
          </div>

          <div className="blue-panel relative min-h-[780px] overflow-hidden rounded-[2rem] p-3 md:min-h-[900px]">
            <motion.div style={{ y: yA }} className="absolute left-3 top-3 h-[48%] w-[62%] overflow-hidden rounded-[1.5rem]">
              <Image
                src={getAssetPath("/editorial/alperen-story-collage-v1.png")}
                alt="AI engineering editorial collage"
                fill
                quality={100}
                sizes="(max-width: 1024px) 70vw, 45vw"
                className="object-cover saturate-[0.72] hue-rotate-[155deg]"
              />
            </motion.div>

            <motion.div style={{ y: yB }} className="absolute bottom-20 right-3 h-[43%] w-[58%] overflow-hidden rounded-[1.5rem] border border-white/10">
              <Image
                src={getAssetPath("/projects/vibekoc/vibekoc_desktop.png")}
                alt="VibeKoc project interface"
                fill
                quality={100}
                sizes="(max-width: 1024px) 70vw, 42vw"
                className="object-cover object-top saturate-[0.82]"
              />
            </motion.div>

            <div className="absolute bottom-3 left-3 w-[50%] rounded-[1.5rem] bg-sky-200 p-5 text-slate-950 shadow-[0_0_60px_rgba(56,189,248,0.25)]">
              <p className="text-sm font-black uppercase">Alperen Systems</p>
              <p className="display-relaxed mt-8 text-4xl font-black md:text-6xl">AI / WEB / DATA</p>
            </div>

            <div className="animate-blue-pulse absolute right-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-black uppercase text-slate-950">
              01
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
