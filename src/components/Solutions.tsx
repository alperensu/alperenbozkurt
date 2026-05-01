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

export default function Solutions() {
  const { locale } = useLanguage();
  const t = locale === "tr" ? tr : en;

  return (
    <section id="solutions" className="relative py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-20">
          <AnimatedElement direction="up">
            <span className="inline-block px-5 py-2 rounded-full bg-white/10 border border-white/10 text-base text-orange-300 font-medium mb-6">
              {t.solutions.badge}
            </span>
          </AnimatedElement>

          <ScrollTextReveal
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight block"
            delay={0.1}
            staggerDelay={0.05}
          >
            {`${t.solutions.heading1} ${t.solutions.heading2}`}
          </ScrollTextReveal>

          <AnimatedElement direction="up" delay={0.3}>
            <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto">
              {t.solutions.subtitle}
            </p>
          </AnimatedElement>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {t.solutions.items.map((solution, index) => (
            <AnimatedElement
              key={solution.title}
              delay={index * 0.15}
              direction="up"
              className=""
            >
              <FlashlightCard className="h-full">
                <div className="p-7 md:p-8 flex flex-col gap-5 h-full">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-linear-to-br from-orange-500/10 to-amber-500/10 border border-white/10 flex items-center justify-center transition-transform duration-500 hover:scale-110">
                    <iconify-icon
                      icon={solutionIcons[index]}
                      width="28"
                      height="28"
                      style={{ color: "#f97316" }}
                    />
                  </div>

                  <div>
                    <h3 className="text-xl md:text-2xl font-bold text-white mb-3">
                      {solution.title}
                    </h3>
                    <p className="text-base md:text-lg text-white/40 leading-relaxed">
                      {solution.description}
                    </p>
                  </div>

                  {/* Decorative line */}
                  <div className="mt-auto pt-4">
                    <div className="h-px w-full bg-linear-to-r from-orange-500/20 via-amber-500/20 to-transparent" />
                  </div>
                </div>
              </FlashlightCard>
            </AnimatedElement>
          ))}
        </div>
      </div>
    </section>
  );
}
