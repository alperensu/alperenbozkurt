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
    <section id="sectors" className="relative py-32 px-6 md:px-16 lg:px-24">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <AnimatedElement direction="up">
            <span className="inline-block px-5 py-2 rounded-full bg-white/10 border border-white/10 text-base text-orange-300 font-medium mb-6">
              {t.marquee.badge}
            </span>
          </AnimatedElement>

          <ScrollTextReveal
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 block"
            delay={0.1}
            staggerDelay={0.05}
          >
            {`${t.marquee.heading1} ${t.marquee.heading2}`}
          </ScrollTextReveal>

          <AnimatedElement direction="up" delay={0.3}>
            <p className="text-lg md:text-xl text-white/40 max-w-2xl mx-auto">
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
                  className="shrink-0 w-72 rounded-2xl p-6 transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] hover:-translate-y-1.5 group"
                  style={{
                    background: "rgba(255, 255, 255, 0.04)",
                    backdropFilter: "blur(20px)",
                    WebkitBackdropFilter: "blur(20px)",
                    border: "1px solid rgba(255, 255, 255, 0.08)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-transform duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-110"
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
                  <h3 className="text-lg font-bold text-white mb-2">
                    {sector.title}
                  </h3>
                  <p className="text-sm text-white/40 leading-relaxed">
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
