"use client";

import AnimatedElement from "./AnimatedElement";
import ScrollTextReveal from "./ScrollTextReveal";
import { useLanguage } from "@/context/LanguageContext";
import tr from "@/locales/tr";
import en from "@/locales/en";

const sectorIcons = [
  "simple-icons:shopify",
  "simple-icons:square",
  "simple-icons:googlecalendar",
  "simple-icons:salesforce",
  "simple-icons:udemy",
  "simple-icons:dhl",
  "simple-icons:docusign",
  "simple-icons:stripe",
];

const sectorColors = [
  "#f97316", "#a855f7", "#10b981", "#f59e0b",
  "#ec4899", "#f97316", "#06b6d4", "#6366f1",
];

export default function Marquee() {
  const { locale } = useLanguage();
  const t = locale === "tr" ? tr : en;

  const sectors = t.marquee.items.map((item, i) => ({
    ...item,
    icon: sectorIcons[i],
    color: sectorColors[i],
  }));

  const duplicatedSectors = [...sectors, ...sectors];

  return (
    <section id="sectors" className="section-shell">
      <div className="section-inner">
        {/* Section Header */}
        <div className="text-center mb-16">
          <AnimatedElement direction="up">
            <span className="eyebrow mb-6">
              {t.marquee.badge}
            </span>
          </AnimatedElement>

          <ScrollTextReveal
            className="text-balance mb-6 block text-4xl font-black text-white md:text-5xl lg:text-6xl"
            delay={0.1}
            staggerDelay={0.05}
          >
            {`${t.marquee.heading1} ${t.marquee.heading2}`}
          </ScrollTextReveal>

          <AnimatedElement direction="up" delay={0.3}>
            <p className="mx-auto max-w-2xl text-base leading-8 text-white/[0.55] md:text-lg">
              {t.marquee.subtitle}
            </p>
          </AnimatedElement>
        </div>

        {/* Marquee */}
        <AnimatedElement direction="up" delay={0.2}>
          <div className="relative overflow-hidden marquee-mask marquee-container py-4">
            <div className="flex animate-marquee w-max gap-5">
              {duplicatedSectors.map((sector, index) => (
                <div
                  key={`${sector.title}-${index}`}
                  className="group w-72 shrink-0 rounded-lg p-6 transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1.5"
                  style={{
                    background: "linear-gradient(145deg, rgba(255,255,255,0.07), rgba(255,255,255,0.025))",
                    border: "1px solid rgba(255, 255, 255, 0.1)",
                  }}
                >
                  <div
                    className="mb-4 flex h-12 w-12 items-center justify-center rounded-md transition-transform duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110"
                    style={{
                      background: `${sector.color}15`,
                      border: `1px solid ${sector.color}25`,
                    }}
                  >
                    <iconify-icon
                      icon={sector.icon}
                      width="24"
                      height="24"
                      style={{ color: sector.color }}
                    />
                  </div>
                  <h3 className="mb-2 text-lg font-black text-white">
                    {sector.title}
                  </h3>
                  <p className="text-sm leading-7 text-white/[0.52]">
                    {sector.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </AnimatedElement>
      </div>
    </section>
  );
}
