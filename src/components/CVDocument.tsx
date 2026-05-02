"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import tr from "@/locales/tr";
import en from "@/locales/en";

export default function CVDocument() {
  const { locale } = useLanguage();
  const t = locale === "tr" ? tr : en;

  return (
    <div className="w-[210mm] min-h-[297mm] bg-white text-black p-8 md:p-12 mx-auto shadow-2xl print:shadow-none print:m-0 font-serif leading-tight">
      {/* Centered Header (Stanford Style) */}
      <header className="text-center mb-8 border-b border-black pb-4">
        <h1 className="text-3xl font-bold mb-1 tracking-tight">
          {t.hero.h1_1}{t.hero.h1_2}
        </h1>
        <div className="text-[11px] space-x-2 font-medium">
          <span>Denizli, Türkiye</span>
          <span>•</span>
          <span>alperenbozkurt.iletisim@gmail.com</span>
          <span>•</span>
          <span>github.com/alperensu</span>
        </div>
      </header>

      <div className="space-y-6">
        {/* EDUCATION */}
        <section>
          <h2 className="text-xs font-bold border-b border-black mb-2 tracking-widest uppercase italic">Education</h2>
          <div className="space-y-4">
            <div className="relative">
              <div className="flex justify-between font-bold text-[13px]">
                <h3>{t.profile.pamukkale.school}</h3>
                <span>{t.profile.pamukkale.status}</span>
              </div>
              <div className="flex justify-between text-[12px] italic">
                <p>{t.profile.pamukkale.major}</p>
              </div>
            </div>
            <div className="relative">
              <div className="flex justify-between font-bold text-[13px]">
                <h3>{t.profile.orhan.school}</h3>
                <span>{t.profile.orhan.status}</span>
              </div>
              <div className="flex justify-between text-[12px] italic">
                <p>{t.profile.orhan.major}</p>
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE */}
        <section>
          <h2 className="text-xs font-bold border-b border-black mb-2 tracking-widest uppercase italic">Experience</h2>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between font-bold text-[13px]">
                <h3>TechStudio</h3>
                <span>{t.profile.techStudio.duration}</span>
              </div>
              <div className="flex justify-between text-[12px] italic mb-1">
                <p>{t.profile.techStudio.role}</p>
              </div>
              <ul className="list-disc list-outside ml-4 text-[12px] space-y-1">
                {t.profile.techStudio.desc.split(". ").map((bullet, i) => (
                  <li key={i}>{bullet}{bullet.endsWith('.') ? '' : '.'}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* PROJECTS */}
        <section>
          <h2 className="text-xs font-bold border-b border-black mb-2 tracking-widest uppercase italic">Selected Projects</h2>
          <div className="space-y-4">
            {t.projects.items.map((project, idx) => (
              <div key={idx}>
                <div className="flex justify-between font-bold text-[13px]">
                  <h3>{project.title}</h3>
                  <span className="font-normal italic text-[11px]">{project.category}</span>
                </div>
                <p className="text-[12px] italic mb-1">{project.description}</p>
                <p className="text-[11px]">
                  <span className="font-bold">Technologies:</span> {project.techInfo}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* SKILLS & INTERESTS */}
        <section>
          <h2 className="text-xs font-bold border-b border-black mb-2 tracking-widest uppercase italic">Skills & Interests</h2>
          <div className="space-y-1 text-[12px]">
            <p><span className="font-bold">Technical Skills:</span> {t.profile.skills.languages}</p>
            <p><span className="font-bold">Specializations:</span> {t.profile.skills.ai}</p>
            <p><span className="font-bold">Design & Media:</span> {t.profile.skills.multimedia}</p>
            <p>
              <span className="font-bold">Languages:</span> {locale === "tr" ? "Türkçe (Anadil), İngilizce (İleri Seviye)" : "Turkish (Native), English (Advanced)"}
            </p>
            <p>
              <span className="font-bold">Interests:</span> {locale === "tr" ? "Fitness ve Vücut Geliştirme, Dijital İçerik Üretimi, Oyun Teknolojileri" : "Fitness & Bodybuilding, Digital Content Creation, Gaming Technologies"}
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
