"use client";

import AnimatedElement from "./AnimatedElement";
import ScrollTextReveal from "./ScrollTextReveal";
import FlashlightCard from "./FlashlightCard";
import { useLanguage } from "@/context/LanguageContext";
import tr from "@/locales/tr";
import en from "@/locales/en";

const solutionIcons = [
  "mdi:web",
  "mdi:robot-outline",
  "mdi:video-vintage",
  "simple-icons:nextdotjs",
  "mdi:cog-transfer-outline",
  "mdi:view-dashboard-outline",
];

const accents = ["#58d7ff", "#ff6b2c", "#8b5cf6", "#f6c65b", "#22c55e", "#14b8a6"];

export default function Solutions() {
  const { locale } = useLanguage();
  const t = locale === "tr" ? tr : en;

  return (
    <section id="solutions" className="section-shell">
      <div className="section-inner">
        <div className="mb-14 grid gap-6 lg:grid-cols-[0.95fr_1fr] lg:items-end">
          <div>
            <AnimatedElement direction="up">
              <span className="eyebrow">{t.solutions.badge}</span>
            </AnimatedElement>

            <ScrollTextReveal
              className="text-balance mt-7 block text-4xl font-black leading-tight text-white md:text-5xl lg:text-6xl"
              delay={0.1}
              staggerDelay={0.05}
            >
              {`${t.solutions.heading1} ${t.solutions.heading2}`}
            </ScrollTextReveal>
          </div>

          <AnimatedElement direction="up" delay={0.25}>
            <p className="text-pretty max-w-2xl text-base leading-8 text-white/[0.55] md:text-lg lg:ml-auto">
              {t.solutions.subtitle}
            </p>
          </AnimatedElement>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-6">
          {t.solutions.items.map((solution, index) => {
            const isFeature = index < 2;
            return (
              <AnimatedElement
                key={solution.title}
                delay={index * 0.1}
                direction="up"
                className={isFeature ? "md:col-span-3" : "md:col-span-2"}
              >
                <FlashlightCard className="h-full">
                  <div className={`flex h-full flex-col p-6 ${isFeature ? "min-h-[280px] md:p-8" : "min-h-[230px]"}`}>
                    <div className="flex items-start justify-between gap-4">
                      <div
                        className="flex h-12 w-12 items-center justify-center rounded-md border"
                        style={{
                          background: `${accents[index]}18`,
                          borderColor: `${accents[index]}35`,
                          color: accents[index],
                        }}
                      >
                        <iconify-icon icon={solutionIcons[index]} width="25" height="25" />
                      </div>
                      <span className="font-mono text-xs font-black text-white/20">0{index + 1}</span>
                    </div>

                    <div className="mt-auto pt-10">
                      <h3 className={`${isFeature ? "text-2xl md:text-3xl" : "text-xl"} text-balance font-black text-white`}>
                        {solution.title}
                      </h3>
                      <p className="mt-4 text-pretty text-sm leading-7 text-white/[0.52] md:text-base">
                        {solution.description}
                      </p>
                    </div>

                    <div className="mt-6 h-px w-full bg-linear-to-r from-white/0 via-white/[0.14] to-white/0" />
                  </div>
                </FlashlightCard>
              </AnimatedElement>
            );
          })}
        </div>
      </div>
    </section>
  );
}
