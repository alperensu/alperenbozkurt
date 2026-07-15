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
    <section id="profile" ref={ref} className="cinematic-section bg-[#f4f1e8] text-black">
      <div className="section-inner">
        <div className="grid gap-10 lg:grid-cols-[0.82fr_1.18fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <p className="kicker text-black/55">{t.profile.badge}</p>
            <h2 className="mt-6 max-w-3xl text-[clamp(3rem,8vw,8.5rem)] font-black uppercase leading-[0.82]">
              {t.profile.title}
            </h2>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-black/68 md:text-xl md:leading-9">
              {t.profile.bio}
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              {[t.profile.skills.languages, t.profile.skills.ai, t.profile.skills.multimedia].map((skill, index) => (
                <span
                  key={index}
                  className="max-w-full rounded-full border border-black/12 px-4 py-2 text-xs font-black uppercase text-black/58"
                >
                  {skill.split(",").slice(0, 3).join(" / ")}
                </span>
              ))}
            </div>
          </div>

          <div className="relative min-h-[780px] overflow-hidden rounded-[2rem] bg-black p-3 md:min-h-[900px]">
            <motion.div style={{ y: yA }} className="absolute left-3 top-3 h-[48%] w-[62%] overflow-hidden rounded-[1.5rem]">
              <Image
                src={getAssetPath("/editorial/alperen-story-collage-v1.png")}
                alt="AI engineering editorial collage"
                fill
                quality={100}
                sizes="(max-width: 1024px) 70vw, 45vw"
                className="object-cover"
              />
            </motion.div>

            <motion.div style={{ y: yB }} className="absolute bottom-20 right-3 h-[43%] w-[58%] overflow-hidden rounded-[1.5rem] border border-white/10">
              <Image
                src={getAssetPath("/projects/vibekoc/vibekoc_desktop.png")}
                alt="VibeKoc project interface"
                fill
                quality={100}
                sizes="(max-width: 1024px) 70vw, 42vw"
                className="object-cover object-top"
              />
            </motion.div>

            <div className="absolute bottom-3 left-3 w-[50%] rounded-[1.5rem] bg-[#e9ff00] p-5 text-black">
              <p className="text-sm font-black uppercase">Alperen Systems</p>
              <p className="mt-8 text-4xl font-black leading-none md:text-6xl">AI / WEB / DATA</p>
            </div>

            <div className="absolute right-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-black uppercase text-black">
              01
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
