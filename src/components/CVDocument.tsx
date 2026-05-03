"use client";

import React from "react";
import { useLanguage } from "@/context/LanguageContext";
import tr from "@/locales/tr";
import en from "@/locales/en";

/* ──────────────────────────────────────────
   Static CV data (non-project sections)
   ────────────────────────────────────────── */
const cvStatic = {
  tr: {
    title: "Full-Stack Developer | Yapay Zeka & Veri Odaklı Ürünler",
    location: "Denizli, Türkiye",
    email: "alperenbozkurt.iletisim@gmail.com",
    github: "github.com/alperensu",
    summaryTitle: "Profesyonel Özet",
    summary:
      "AI destekli web uygulamalari, veri odakli dashboardlar ve gelistirici araclari ureten full-stack developer'ım. React/Next.js, Node.js, Python, FastAPI ve modern AI entegrasyonlariyla urun fikirlerini kullanilabilir, olceklenebilir ve performansli sistemlere donustururum. Teknik mimari, kullanici deneyimi ve otomasyon arasinda guclu bag kurarak ucundan sonuna urun gelistirme sorumlulugu alirim.",
    sections: {
      experience: "Experience",
      projects: "Selected Projects",
      education: "Education",
      skills: "Technical Skills",
      languages: "Languages",
    },
    experience: {
      company: "TechStudio",
      role: "Stajyer (Gömülü Sistemler)",
      period: "Eyl 2023 - May 2024",
      bullets: [
        "MicroPython kullanarak gömülü sistemler üzerine çalışmalar ve prototipleme süreçleri yürüttüm.",
        "Kurumsal web sitesinin geliştirilmesi ve içerik yönetimi süreçlerinde aktif görev aldım.",
        "LinkedIn ve diğer sosyal medya kanalları için kurumsal içerik üretimi ve hesap yönetimi süreçlerini üstlendim.",
      ],
    },
    education: [
      ["Pamukkale Üniversitesi", "Bilgisayar Programcılığı", "Beklenen 2026"],
      ["Orhan Abalıoğlu MTAL", "Yazılım Geliştirme", "Mezun"],
    ],
    skills: [
      ["Frontend", "React 19, Next.js, TypeScript, Tailwind CSS, Framer Motion"],
      ["Backend", "Node.js, Python, FastAPI, REST APIs, MySQL, PostgreSQL, Redis"],
      ["AI & Veri", "OpenAI, Gemini, LightGBM, Scikit-learn, Pandas, prompt engineering"],
      ["Araçlar", "Git, GitHub, CI/CD, API entegrasyonu, performans optimizasyonu"],
    ],
    languages: "Türkçe: Anadil | İngilizce: İleri Seviye",
  },
  en: {
    title: "Full-Stack Developer | AI & Data-Driven Products",
    location: "Denizli, Turkey",
    email: "alperenbozkurt.iletisim@gmail.com",
    github: "github.com/alperensu",
    summaryTitle: "Professional Summary",
    summary:
      "I am a full-stack developer building AI-powered web applications, data-driven dashboards, and developer tools. I turn product ideas into usable, scalable, and performant systems with React/Next.js, Node.js, Python, FastAPI, and modern AI integrations. I take strong ownership across technical architecture, user experience, automation, and end-to-end delivery.",
    sections: {
      experience: "Experience",
      projects: "Selected Projects",
      education: "Education",
      skills: "Technical Skills",
      languages: "Languages",
    },
    experience: {
      company: "TechStudio",
      role: "Embedded Systems Intern",
      period: "Sept 2023 - May 2024",
      bullets: [
        "Conducted studies and prototyping on embedded systems using MicroPython.",
        "Played an active role in the development and maintenance of the corporate website.",
        "Managed corporate LinkedIn and social media accounts, producing digital content.",
      ],
    },
    education: [
      ["Pamukkale University", "Computer Programming", "Expected 2026"],
      ["Orhan Abalioglu MTAL", "Software Development", "Graduate"],
    ],
    skills: [
      ["Frontend", "React 19, Next.js, TypeScript, Tailwind CSS, Framer Motion"],
      ["Backend", "Node.js, Python, FastAPI, REST APIs, MySQL, PostgreSQL, Redis"],
      ["AI & Data", "OpenAI, Gemini, LightGBM, Scikit-learn, Pandas, prompt engineering"],
      ["Tools", "Git, GitHub, deployment workflows, API integration, performance optimization"],
    ],
    languages: "Turkish: Native | English: Advanced",
  },
} as const;

/* ──────────────────────────────────────────
   Helper: derive CV projects from locale
   ────────────────────────────────────────── */
function deriveProjects(localeData: typeof tr | typeof en) {
  return localeData.projects.items.map((item) => ({
    name: item.title,
    type: item.category,
    impact: item.description,
    tech: item.techInfo,
  }));
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-2 border-b border-neutral-900 pb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-neutral-900">
      {children}
    </h2>
  );
}

export default function CVDocument() {
  const { locale } = useLanguage();
  const cv = locale === "tr" ? cvStatic.tr : cvStatic.en;
  const localeData = locale === "tr" ? tr : en;
  const projects = deriveProjects(localeData);

  return (
    <div 
      className="cv-document w-[210mm] min-h-[297mm] bg-white px-[13mm] py-[12mm] mx-auto shadow-2xl print:shadow-none print:m-0 font-sans text-neutral-950"
      lang={locale === "tr" ? "tr" : "en"}
    >
      <header className="mb-4 border-b-2 border-neutral-950 pb-3">
        <div className="flex items-end justify-between gap-5">
          <div className="min-w-0">
            <h1 className="text-[26px] font-black leading-none tracking-tight">
              Alperen Bozkurt
            </h1>
            <p className="mt-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-neutral-700">
              {cv.title}
            </p>
          </div>
          <div className="shrink-0 text-right text-[10px] leading-snug text-neutral-700">
            <p>{cv.location}</p>
            <p>{cv.email}</p>
            <p>{cv.github}</p>
          </div>
        </div>
      </header>

      <main className="space-y-4 text-[10.5px] leading-[1.34]">
        <section>
          <SectionTitle>{cv.summaryTitle}</SectionTitle>
          <p className="text-[11px] leading-[1.38] text-neutral-800">{cv.summary}</p>
        </section>

        <section>
          <SectionTitle>{cv.sections.experience}</SectionTitle>
          <div className="flex justify-between gap-4">
            <div>
              <h3 className="text-[12px] font-bold">{cv.experience.company}</h3>
              <p className="text-[10.5px] font-medium italic text-neutral-700">
                {cv.experience.role}
              </p>
            </div>
            <span className="shrink-0 text-[10px] font-semibold text-neutral-700">
              {cv.experience.period}
            </span>
          </div>
          <ul className="mt-1.5 list-disc space-y-0.5 pl-4 text-neutral-800">
            {cv.experience.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </section>

        <section>
          <SectionTitle>{cv.sections.projects}</SectionTitle>
          <div className="grid grid-cols-1 gap-2.5">
            {projects.map((project) => (
              <div key={project.name} className="break-inside-avoid">
                <div className="flex justify-between gap-4">
                  <h3 className="min-w-0 text-[12px] font-bold">{project.name}</h3>
                  <span className="max-w-[44%] shrink-0 text-right text-[9.5px] font-semibold uppercase tracking-[0.08em] text-neutral-600">
                    {project.type}
                  </span>
                </div>
                <p className="mt-0.5 text-neutral-800">{project.impact}</p>
                <p className="mt-0.5 text-[9.8px] text-neutral-700">
                  <span className="font-bold text-neutral-900">Stack:</span> {project.tech}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section>
          <SectionTitle>{cv.sections.skills}</SectionTitle>
          <div className="grid grid-cols-2 gap-x-6 gap-y-1.5">
            {cv.skills.map(([label, value]) => (
              <p key={label} className="break-words">
                <span className="font-bold">{label}:</span> {value}
              </p>
            ))}
          </div>
        </section>

        <section className="grid grid-cols-[1fr_0.8fr] gap-8">
          <div>
            <SectionTitle>{cv.sections.education}</SectionTitle>
            <div className="space-y-1.5">
              {cv.education.map(([school, major, status]) => (
                <div key={school} className="flex justify-between gap-4">
                  <div className="min-w-0">
                    <h3 className="font-bold">{school}</h3>
                    <p className="italic text-neutral-700">{major}</p>
                  </div>
                  <span className="shrink-0 text-right text-[9.5px] font-semibold text-neutral-600">
                    {status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <SectionTitle>{cv.sections.languages}</SectionTitle>
            <p className="text-neutral-800">{cv.languages}</p>
          </div>
        </section>
      </main>
    </div>
  );
}
