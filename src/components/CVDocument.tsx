"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import tr from "@/locales/tr";
import en from "@/locales/en";

export default function CVDocument() {
  const { locale } = useLanguage();
  const t = locale === "tr" ? tr : en;

  return (
    <div className="bg-white text-slate-900 p-12 max-w-[210mm] mx-auto min-h-[297mm] shadow-2xl print:shadow-none print:p-0 font-sans leading-normal">
      {/* Header */}
      <header className="border-b-4 border-slate-900 pb-6 mb-8 flex justify-between items-end">
        <div>
          <h1 className="text-5xl font-black uppercase tracking-tighter mb-1">
            {t.hero.h1_1}{t.hero.h1_2}
          </h1>
          <p className="text-xl font-bold text-slate-800 uppercase tracking-widest">
            {t.hero.badge}
          </p>
        </div>
        <div className="text-right text-xs space-y-1 font-bold text-slate-600 uppercase tracking-wider">
          <p>alperenbozkurt.iletisim@gmail.com</p>
          <p>github.com/alperensu</p>
          <p>Denizli, Türkiye</p>
        </div>
      </header>

      <div className="space-y-10">
        {/* Profile / Summary */}
        <section>
          <h2 className="text-lg font-black uppercase border-b-2 border-slate-900 mb-3 pb-1 tracking-widest">
            {t.profile.title}
          </h2>
          <p className="text-[13px] leading-relaxed text-slate-800 font-medium">
            {t.profile.bio}
          </p>
        </section>

        <div className="grid grid-cols-3 gap-12">
          {/* Main Column */}
          <div className="col-span-2 space-y-10">
            {/* Experience */}
            <section>
              <h2 className="text-lg font-black uppercase border-b-2 border-slate-900 mb-4 pb-1 tracking-widest">
                {t.profile.experienceTitle}
              </h2>
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-base">TechStudio</h3>
                    <span className="text-[10px] text-slate-500 font-black uppercase">{t.profile.techStudio.duration}</span>
                  </div>
                  <p className="text-xs font-bold text-slate-600 mb-2 uppercase tracking-wide">{t.profile.techStudio.role}</p>
                  <p className="text-[13px] text-slate-800 leading-relaxed">
                    {t.profile.techStudio.desc}
                  </p>
                </div>
              </div>
            </section>

            {/* Projects */}
            <section>
              <h2 className="text-lg font-black uppercase border-b-2 border-slate-900 mb-4 pb-1 tracking-widest">
                {t.projects.heading1} {t.projects.heading2}
              </h2>
              <div className="space-y-6">
                {t.projects.items.map((project, idx) => (
                  <div key={idx}>
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-bold text-base">{project.title}</h3>
                      <span className="text-[10px] text-slate-600 uppercase font-black tracking-tighter bg-slate-100 px-2 py-0.5 rounded">{project.category}</span>
                    </div>
                    <p className="text-[13px] text-slate-800 leading-relaxed italic mb-2">
                      {project.description}
                    </p>
                    <p className="text-[11px] text-slate-600">
                      <span className="font-bold uppercase tracking-tighter mr-2">{t.projects.labels.techStack}:</span>
                      {project.techInfo}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sidebar */}
          <div className="col-span-1 space-y-10">
            {/* Skills */}
            <section>
              <h2 className="text-lg font-black uppercase border-b-2 border-slate-900 mb-4 pb-1 tracking-widest">
                {t.profile.skillsTitle}
              </h2>
              <div className="space-y-5">
                <div>
                  <h4 className="text-[10px] font-black text-slate-900 uppercase mb-2 tracking-widest">Core Technologies</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {t.profile.skills.languages.split(", ").map(s => (
                      <span key={s} className="text-[10px] px-2 py-1 bg-slate-900 text-white font-bold uppercase tracking-tighter">{s}</span>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-slate-900 uppercase mb-2 tracking-widest">Specializations</h4>
                  <p className="text-[11px] text-slate-800 font-medium leading-tight">{t.profile.skills.ai}</p>
                </div>
                <div>
                  <h4 className="text-[10px] font-black text-slate-900 uppercase mb-2 tracking-widest">Creative Tools</h4>
                  <p className="text-[11px] text-slate-800 font-medium leading-tight">{t.profile.skills.multimedia}</p>
                </div>
              </div>
            </section>

            {/* Education */}
            <section>
              <h2 className="text-lg font-black uppercase border-b-2 border-slate-900 mb-4 pb-1 tracking-widest">
                {t.profile.educationTitle}
              </h2>
              <div className="space-y-6">
                <div>
                  <h3 className="font-bold text-sm leading-tight">{t.profile.pamukkale.school}</h3>
                  <p className="text-[11px] text-slate-700 font-medium">{t.profile.pamukkale.major}</p>
                  <p className="text-[10px] text-slate-500 font-black mt-1 uppercase tracking-tighter">{t.profile.pamukkale.status}</p>
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight">{t.profile.orhan.school}</h3>
                  <p className="text-[11px] text-slate-700 font-medium">{t.profile.orhan.major}</p>
                  <p className="text-[10px] text-slate-500 font-black mt-1 uppercase tracking-tighter">{t.profile.orhan.status}</p>
                </div>
              </div>
            </section>

            {/* Languages */}
            <section>
              <h2 className="text-lg font-black uppercase border-b-2 border-slate-900 mb-4 pb-1 tracking-widest">
                {locale === "tr" ? "Diller" : "Languages"}
              </h2>
              <div className="space-y-2">
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-tight">
                  <span>Türkçe</span>
                  <span className="text-slate-500">{locale === "tr" ? "Anadil" : "Native"}</span>
                </div>
                <div className="flex justify-between text-[11px] font-bold uppercase tracking-tight">
                  <span>English</span>
                  <span className="text-slate-500">{locale === "tr" ? "İleri Seviye" : "Advanced"}</span>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
