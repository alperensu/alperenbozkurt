"use client";

import { useLanguage } from "@/context/LanguageContext";
import tr from "@/locales/tr";
import en from "@/locales/en";
import AnimatedElement from "./AnimatedElement";

const capabilityIcons = [
  "mdi:brain",
  "mdi:chart-timeline-variant-shimmer",
  "mdi:movie-open-play-outline",
];

export default function Profile() {
  const { locale } = useLanguage();
  const t = locale === "tr" ? tr : en;

  const skillGroups = [
    { label: "Stack", value: t.profile.skills.languages },
    { label: "AI", value: t.profile.skills.ai },
    { label: "Media", value: t.profile.skills.multimedia },
  ];

  return (
    <section id="profile" className="section-shell">
      <div className="section-inner">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div className="lg:sticky lg:top-28">
            <AnimatedElement direction="up">
              <span className="eyebrow">{t.profile.badge}</span>
            </AnimatedElement>

            <AnimatedElement direction="up" delay={0.15}>
              <h2 className="text-balance mt-7 text-4xl font-black leading-tight text-white md:text-5xl">
                {t.profile.title}
              </h2>
            </AnimatedElement>

            <AnimatedElement direction="up" delay={0.25}>
              <p className="text-pretty mt-6 text-base leading-8 text-white/[0.58] md:text-lg">
                {t.profile.bio}
              </p>
            </AnimatedElement>
          </div>

          <div className="grid gap-4">
            <AnimatedElement direction="up" delay={0.2}>
              <div className="premium-panel overflow-hidden rounded-lg">
                <div className="grid md:grid-cols-3">
                  {skillGroups.map((group, index) => (
                    <div
                      key={group.label}
                      className="border-b border-white/10 p-6 md:border-b-0 md:border-r md:last:border-r-0"
                    >
                      <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-md border border-white/10 bg-white/[0.055] text-cyan-200">
                        <iconify-icon icon={capabilityIcons[index]} width="22" height="22" />
                      </div>
                      <h3 className="text-xs font-black uppercase tracking-[0.16em] text-orange-200/70">
                        {group.label}
                      </h3>
                      <p className="mt-3 text-sm leading-7 text-white/[0.58]">{group.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedElement>

            <div className="grid gap-4 md:grid-cols-[1fr_0.86fr]">
              <AnimatedElement direction="up" delay={0.3}>
                <div className="premium-panel h-full rounded-lg p-6">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-cyan-200/70">
                    {t.profile.experienceTitle}
                  </p>
                  <div className="mt-6 border-l border-white/10 pl-5">
                    <div className="relative">
                      <span className="absolute -left-[1.72rem] top-1 h-3 w-3 rounded-full bg-cyan-300 shadow-[0_0_24px_rgba(88,215,255,0.7)]" />
                      <h3 className="text-xl font-black text-white">TechStudio</h3>
                      <p className="mt-1 text-sm text-white/40">
                        {t.profile.techStudio.role} / {t.profile.techStudio.duration}
                      </p>
                      <p className="mt-5 text-sm leading-7 text-white/[0.6]">
                        {t.profile.techStudio.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </AnimatedElement>

              <AnimatedElement direction="up" delay={0.4}>
                <div className="premium-panel h-full rounded-lg p-6">
                  <p className="text-xs font-black uppercase tracking-[0.16em] text-orange-200/70">
                    {t.profile.educationTitle}
                  </p>
                  <div className="mt-6 space-y-6">
                    <div>
                      <h3 className="font-black text-white">{t.profile.pamukkale.school}</h3>
                      <p className="mt-1 text-sm text-white/[0.42]">{t.profile.pamukkale.major}</p>
                      <span className="mt-3 inline-flex rounded-md border border-emerald-300/20 bg-emerald-300/10 px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-emerald-200">
                        {t.profile.pamukkale.status}
                      </span>
                    </div>
                    <div className="border-t border-white/10 pt-6">
                      <h3 className="font-black text-white">{t.profile.orhan.school}</h3>
                      <p className="mt-1 text-sm text-white/[0.42]">{t.profile.orhan.major}</p>
                      <span className="mt-3 inline-flex rounded-md border border-white/10 bg-white/[0.055] px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.12em] text-white/[0.45]">
                        {t.profile.orhan.status}
                      </span>
                    </div>
                  </div>
                </div>
              </AnimatedElement>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
