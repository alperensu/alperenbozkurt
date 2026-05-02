"use client";

import { useLanguage } from "@/context/LanguageContext";
import tr from "@/locales/tr";
import en from "@/locales/en";
import AnimatedElement from "./AnimatedElement";

export default function Profile() {
  const { locale } = useLanguage();
  const t = locale === "tr" ? tr : en;

  return (
    <section id="profile" className="relative py-32 px-6 md:px-16 lg:px-24 bg-white/2">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-start">
          {/* Left Side - Bio & Intro */}
          <div className="flex-1">
            <AnimatedElement direction="up">
              <span className="inline-block px-5 py-2 rounded-full bg-orange-500/10 border border-orange-500/20 text-sm text-orange-400 font-bold tracking-wider uppercase mb-6">
                {t.profile.badge}
              </span>
            </AnimatedElement>
            
            <AnimatedElement direction="up" delay={0.2}>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 leading-tight">
                {t.profile.title}
              </h2>
            </AnimatedElement>

            <AnimatedElement direction="up" delay={0.4}>
              <p className="text-xl text-white/50 leading-relaxed mb-12">
                {t.profile.bio}
              </p>
            </AnimatedElement>

            {/* Tech Stack Pills */}
            <AnimatedElement direction="up" delay={0.6}>
              <div className="flex flex-wrap gap-3">
                {t.profile.skills.languages.split(', ').map((skill) => (
                  <span 
                    key={skill} 
                    className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-sm font-medium text-white/70 hover:bg-white/10 hover:border-orange-500/30 transition-all duration-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </AnimatedElement>
          </div>

          {/* Right Side - Experience & Education Cards */}
          <div className="w-full lg:w-[450px] space-y-6">
            {/* Experience Card */}
            <AnimatedElement direction="right" delay={0.3}>
              <div className="p-8 rounded-3xl bg-linear-to-br from-white/10 to-white/2 border border-white/10 backdrop-blur-md relative overflow-hidden group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                  </svg>
                </div>
                <h3 className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-6">{t.profile.experienceTitle}</h3>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">TechStudio</h4>
                  <p className="text-sm text-white/40 mb-3">{t.profile.techStudio.role} • {t.profile.techStudio.duration}</p>
                  <p className="text-sm text-white/60 leading-relaxed">{t.profile.techStudio.desc}</p>
                </div>
              </div>
            </AnimatedElement>

            {/* Education Cards */}
            <AnimatedElement direction="right" delay={0.5}>
              <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md">
                <h3 className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-6">{t.profile.educationTitle}</h3>
                <div className="space-y-6">
                  <div>
                    <h4 className="text-base font-bold text-white">{t.profile.pamukkale.school}</h4>
                    <p className="text-sm text-white/40">{t.profile.pamukkale.major}</p>
                    <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold bg-green-500/10 text-green-400 border border-green-500/20">
                      {t.profile.pamukkale.status}
                    </span>
                  </div>
                  <div className="pt-6 border-t border-white/5">
                    <h4 className="text-base font-bold text-white">{t.profile.orhan.school}</h4>
                    <p className="text-sm text-white/40">{t.profile.orhan.major}</p>
                    <span className="inline-block mt-2 px-2 py-0.5 rounded text-[10px] font-bold bg-white/10 text-white/40 border border-white/10">
                      {t.profile.orhan.status}
                    </span>
                  </div>
                </div>
              </div>
            </AnimatedElement>

            {/* Skills & Tools Card */}
            <AnimatedElement direction="right" delay={0.7}>
              <div className="p-8 rounded-3xl bg-orange-500/5 border border-orange-500/10 backdrop-blur-md">
                <h3 className="text-xs font-bold uppercase tracking-widest text-orange-400 mb-6">{t.profile.skillsTitle}</h3>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-white/30 uppercase tracking-tighter">AI Focus</p>
                      <p className="text-sm text-white/80">{t.profile.skills.ai}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-cyan-500/20 flex items-center justify-center shrink-0">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M15 10l5 5-5 5" />
                        <path d="M4 4v7a4 4 0 0 0 4 4h12" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-white/30 uppercase tracking-tighter">Creative Suite</p>
                      <p className="text-sm text-white/80">{t.profile.skills.multimedia}</p>
                    </div>
                  </div>
                  <div className="pt-4 mt-2 border-t border-white/5">
                    <div className="flex gap-4 opacity-40">
                      <iconify-icon icon="simple-icons:adobepremierepro" width="18" height="18" />
                      <iconify-icon icon="simple-icons:adobeaftereffects" width="18" height="18" />
                      <iconify-icon icon="simple-icons:adobephotoshop" width="18" height="18" />
                      <iconify-icon icon="simple-icons:adobeillustrator" width="18" height="18" />
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedElement>
          </div>
        </div>
      </div>
    </section>
  );
}
