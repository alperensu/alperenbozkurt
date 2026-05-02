"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import tr from "@/locales/tr";
import en from "@/locales/en";

export default function CVDocument() {
  const { locale } = useLanguage();
  const t = locale === "tr" ? tr : en;

  return (
    <div className="bg-white text-slate-900 p-8 md:p-12 max-w-[210mm] mx-auto min-h-[297mm] shadow-2xl print:shadow-none print:p-0 font-sans">
      {/* Header */}
      <header className="border-b-2 border-slate-900 pb-8 mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-4xl font-bold uppercase tracking-tighter mb-2">
            {t.hero.h1_1}{t.hero.h1_2}
          </h1>
          <p className="text-xl font-medium text-slate-600 uppercase tracking-wide">
            {t.hero.badge}
          </p>
        </div>
        <div className="text-right text-sm space-y-1 text-slate-500">
          <p>alperenbozkurt.iletisim@gmail.com</p>
          <p>github.com/alperensu</p>
          <p>Denizli, Türkiye</p>
        </div>
      </header>

      <div className="grid grid-cols-3 gap-12">
        {/* Main Column */}
        <div className="col-span-2 space-y-10">
          {/* Profile / Summary */}
          <section>
            <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-4 pb-1">
              {t.profile.title}
            </h2>
            <p className="text-sm leading-relaxed text-slate-700">
              {t.profile.bio}
            </p>
          </section>

          {/* Experience */}
          <section>
            <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-4 pb-1">
              {t.profile.experienceTitle}
            </h2>
            <div className="space-y-6">
              <div>
                <div className="flex justify-between items-baseline mb-1">
                  <h3 className="font-bold text-base">TechStudio</h3>
                  <span className="text-xs text-slate-500 font-medium">{t.profile.techStudio.duration}</span>
                </div>
                <p className="text-sm font-semibold text-slate-600 mb-2">{t.profile.techStudio.role}</p>
                <p className="text-sm text-slate-700 leading-relaxed">
                  {t.profile.techStudio.desc}
                </p>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section>
            <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-4 pb-1">
              {t.projects.heading1} {t.projects.heading2}
            </h2>
            <div className="space-y-6">
              {t.projects.items.map((project, idx) => (
                <div key={idx}>
                  <div className="flex justify-between items-baseline mb-1">
                    <h3 className="font-bold text-base">{project.title}</h3>
                    <span className="text-xs text-slate-500 uppercase font-bold tracking-tighter">{project.category}</span>
                  </div>
                  <p className="text-sm text-slate-700 leading-relaxed italic mb-1">
                    {project.description}
                  </p>
                  <p className="text-xs text-slate-500">
                    <strong>{t.projects.labels.techStack}:</strong> {project.techInfo}
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
            <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-4 pb-1">
              {t.profile.skillsTitle}
            </h2>
            <div className="space-y-4">
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Languages & Tech</h4>
                <div className="flex flex-wrap gap-1.5">
                  {t.profile.skills.languages.split(", ").map(s => (
                    <span key={s} className="text-[10px] px-2 py-0.5 bg-slate-100 rounded font-medium">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">AI & GEO</h4>
                <p className="text-xs text-slate-700">{t.profile.skills.ai}</p>
              </div>
              <div>
                <h4 className="text-xs font-bold text-slate-400 uppercase mb-2">Creative Suite</h4>
                <p className="text-xs text-slate-700">{t.profile.skills.multimedia}</p>
              </div>
            </div>
          </section>

          {/* Education */}
          <section>
            <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-4 pb-1">
              {t.profile.educationTitle}
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-sm">{t.profile.pamukkale.school}</h3>
                <p className="text-xs text-slate-600">{t.profile.pamukkale.major}</p>
                <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">{t.profile.pamukkale.status}</p>
              </div>
              <div>
                <h3 className="font-bold text-sm">{t.profile.orhan.school}</h3>
                <p className="text-xs text-slate-600">{t.profile.orhan.major}</p>
                <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">{t.profile.orhan.status}</p>
              </div>
            </div>
          </section>

          {/* Languages */}
          <section>
            <h2 className="text-lg font-bold uppercase border-b border-slate-300 mb-4 pb-1">
              {locale === "tr" ? "Diller" : "Languages"}
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-medium">Türkçe</span>
                <span className="text-slate-500">{locale === "tr" ? "Anadil" : "Native"}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="font-medium">English</span>
                <span className="text-slate-500">{locale === "tr" ? "İleri Seviye" : "Advanced"}</span>
              </div>
            </div>
          </section>
        </div>
      </div>

      <footer className="mt-12 pt-8 border-t border-slate-200 text-center text-[10px] text-slate-400 uppercase tracking-widest print:hidden">
        Generated automatically from alperenbozkurt.com
      </footer>
    </div>
  );
}
