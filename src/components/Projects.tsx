"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import AnimatedElement from "./AnimatedElement";
import ScrollTextReveal from "./ScrollTextReveal";
import { useLanguage } from "@/context/LanguageContext";
import tr from "@/locales/tr";
import en from "@/locales/en";
import { getAssetPath } from "@/utils/paths";

/* ──────────────────────────────────────────
   STATIC (non-translated) project data
   ────────────────────────────────────────── */

const projectMeta = [
  {
    id: 1,
    status: "IN DEVELOPMENT",
    statusColor: "#f59e0b",
    dateRange: "2025 – Güncel / Present",
    techStack: ["FastAPI", "React 19", "LightGBM", "Gemini AI"],
    accentColor: "#f97316",
    link: null,
    icon: "mdi:chart-areaspline",
    images: {
      main: getAssetPath("/projects/borsa/borsa_main_new.png"),
      side: getAssetPath("/projects/borsa/borsa_mobile.png"),
      hasPhoneMockup: true,
    },
  },
  {
    id: 2,
    status: "IN DEVELOPMENT",
    statusColor: "#f59e0b",
    dateRange: "2025 – Güncel / Present",
    techStack: ["React 19", "Node.js", "MySQL", "Redis", "Socket.io", "Gemini AI"],
    accentColor: "#ef4444",
    link: null,
    icon: "mdi:school-outline",
    images: {
      main: getAssetPath("/projects/vibekoc/vibekoc_desktop.png"),
      side: getAssetPath("/projects/vibekoc/vibekoc_mobile.png"),
      hasPhoneMockup: true,
    },
  },
  {
    id: 3,
    status: "COMPETITION PROJECT",
    statusColor: "#8b5cf6",
    dateRange: "2025 – 2026",
    techStack: ["Python", "OpenCV", "ArduPilot", "ROS", "YOLOv8"],
    accentColor: "#3b82f6",
    link: null,
    icon: "mdi:quadcopter",
    images: {
      main: getAssetPath("/projects/umay/umay_main.png"),
      side: getAssetPath("/projects/umay/umay_side_v2.png"),
      hasPhoneMockup: false,
    },
  },
];

const freelanceScripts = [
  { name_tr: "Yazılım Satış Scripti", name_en: "Software Sales Script", icon: "mdi:cart-outline" },
  { name_tr: "QR Menü Scripti", name_en: "QR Menu Script", icon: "mdi:qrcode-scan" },
  { name_tr: "Ajans Scripti", name_en: "Agency Script", icon: "mdi:briefcase-outline" },
  { name_tr: "Dişçi Scripti", name_en: "Dental Clinic Script", icon: "mdi:tooth-outline" },
  { name_tr: "Avukat Scripti", name_en: "Law Firm Script", icon: "mdi:scale-balance" },
  { name_tr: "Emlak Scripti", name_en: "Real Estate Script", icon: "mdi:home-city-outline" },
  { name_tr: "Kuaför Scripti", name_en: "Hair Salon Script", icon: "mdi:content-cut" },
  { name_tr: "Teknik Servis Scripti", name_en: "Tech Service Script", icon: "mdi:wrench-outline" },
  { name_tr: "Kurs Scripti", name_en: "Course Platform Script", icon: "mdi:school-outline" },
  { name_tr: "Klinik Scripti", name_en: "Clinic Script", icon: "mdi:hospital-building" },
  { name_tr: "Kasap Scripti", name_en: "Butcher Script", icon: "mdi:food-steak" },
  { name_tr: "Halı Saha Scripti", name_en: "Sports Field Script", icon: "mdi:soccer" },
  { name_tr: "İnşaat Scripti", name_en: "Construction Script", icon: "mdi:crane" },
  { name_tr: "Nakliye Scripti", name_en: "Logistics Script", icon: "mdi:truck-fast-outline" },
];

/* ──────────────────────────────────────────
   PHONE MOCKUP
   ────────────────────────────────────────── */

type SelectedImage = {
  src: string;
  isPhoneMockup?: boolean;
};

function PhoneMockup({
  src,
  alt,
  isPreview = false,
}: {
  src: string;
  alt: string;
  isPreview?: boolean;
}) {
  return (
    <div
      className={`relative mx-auto aspect-[720/1280] ${isPreview ? "w-[min(78vw,260px)] md:w-full transition-transform duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.035]" : "h-[min(84vh,820px)] max-w-[min(86vw,462px)]"}`}
    >
      <div className="absolute -inset-3 rounded-[3.25rem] bg-linear-to-br from-white/20 via-white/5 to-black/50 blur-sm opacity-70" />
      <div className="relative h-full w-full rounded-[3rem] bg-linear-to-br from-zinc-700 via-zinc-950 to-black p-[7px] shadow-[0_28px_90px_rgba(0,0,0,0.62)] ring-1 ring-white/25">
        <div className="absolute -left-1 top-[18%] h-14 w-1 rounded-l-full bg-zinc-600/90" />
        <div className="absolute -left-1 top-[27%] h-20 w-1 rounded-l-full bg-zinc-600/90" />
        <div className="absolute -right-1 top-[23%] h-24 w-1 rounded-r-full bg-zinc-700" />
        <div className="relative h-full w-full overflow-hidden rounded-[2.6rem] bg-black ring-1 ring-black">
          <Image
            src={src}
            alt={alt}
            fill
            quality={100}
            className="object-cover object-top"
            sizes={isPreview ? "(max-width: 768px) 78vw, 300px" : "min(86vw, 462px)"}
          />
          <div className="absolute left-1/2 top-3 z-10 h-8 w-32 -translate-x-1/2 rounded-full bg-black shadow-[inset_0_1px_1px_rgba(255,255,255,0.16),0_1px_8px_rgba(0,0,0,0.45)] ring-1 ring-white/10">
            <span className="absolute right-3 top-1/2 h-2.5 w-2.5 -translate-y-1/2 rounded-full bg-zinc-800 ring-1 ring-zinc-600" />
          </div>
          <div className="pointer-events-none absolute inset-0 rounded-[2.6rem] bg-linear-to-br from-white/16 via-transparent to-black/22" />
          <div className="pointer-events-none absolute inset-x-8 bottom-2 h-1 rounded-full bg-white/30" />
        </div>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────
   SINGLE PROJECT SECTION
   ────────────────────────────────────────── */

function ProjectSection({
  meta,
  text,
  index,
  isLast,
  onImageClick,
  t,
}: {
  meta: typeof projectMeta[0];
  text: typeof tr.projects.items[0];
  index: number;
  isLast: boolean;
  onImageClick: (image: SelectedImage) => void;
  t: typeof tr | typeof en;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const isUmay = meta.id === 3;
  const hasPhoneMockup = meta.images.hasPhoneMockup;

  return (
    <AnimatedElement direction="up" delay={index * 0.18}>
      <div className="relative">
        {/* ── Main card ── */}
        <div
          className="relative rounded-2xl overflow-hidden"
          style={{
            background: "rgba(255, 255, 255, 0.02)",
            border: "1px solid rgba(255, 255, 255, 0.05)",
          }}
        >
          <div className="flex flex-col md:flex-row">
            {/* ── Left sidebar meta ── */}
            <div className="w-full md:w-52 lg:w-64 shrink-0 p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/10">
              <div className="flex flex-row md:flex-col gap-4 md:gap-6">
                <div>
                  <p
                    className="text-xs font-bold tracking-[0.15em] uppercase mb-1.5"
                    style={{ color: meta.accentColor }}
                  >
                    {text.category}
                  </p>
                  <p className="text-xs text-white/25">{meta.dateRange}</p>
                </div>

                <div className="hidden md:block">
                  <div className="flex flex-wrap gap-1.5">
                    {meta.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-0.5 rounded text-[10px] text-white/30 border border-white/10 bg-white/10"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {meta.link && (
                  <a
                    href={meta.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 mt-auto hover:opacity-80 transition-opacity"
                    style={{ color: meta.accentColor }}
                  >
                    {t.projects.labels.demo}
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M7 17L17 7" />
                      <path d="M7 7h10v10" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* ── Right main content ── */}
            <div className="flex-1 p-6 md:p-8">
              {/* Header row */}
              <div className="flex items-start justify-between mb-5">
                <div className="flex items-center gap-3 flex-wrap">
                  <h3 className="text-2xl md:text-3xl font-bold text-white">
                    {text.title}
                  </h3>
                  <span
                    className="px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-wider whitespace-nowrap"
                    style={{
                      background: `${meta.statusColor}20`,
                      color: meta.statusColor,
                      border: `1px solid ${meta.statusColor}30`,
                    }}
                  >
                    {meta.status}
                  </span>
                </div>

                {/* Project icon */}
                <div
                  className="hidden md:flex w-10 h-10 rounded-lg items-center justify-center shrink-0"
                  style={{
                    background: `${meta.accentColor}08`,
                    border: `1px solid ${meta.accentColor}15`,
                  }}
                >
                  <iconify-icon
                    icon={meta.icon}
                    width="20"
                    height="20"
                    style={{ color: `${meta.accentColor}80` }}
                  />
                </div>
              </div>

              {/* Description */}
              <p className="text-base text-white/40 leading-relaxed mb-8 max-w-3xl">
                {text.description}
              </p>

              {/* Tech stack (mobile) */}
              <div className="flex flex-wrap gap-1.5 mb-6 md:hidden">
                {meta.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 rounded text-[10px] text-white/30 border border-white/10 bg-white/10"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              {/* ── 3-column detail grid ── */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-white/10">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2.5" style={{ color: `${meta.accentColor}90` }}>
                    {t.projects.labels.techStack}
                  </p>
                  <p className="text-sm text-white/35 leading-relaxed">{text.techInfo}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2.5" style={{ color: `${meta.accentColor}90` }}>
                    {t.projects.labels.role}
                  </p>
                  <p className="text-sm text-white/35 leading-relaxed">{text.role}</p>
                </div>
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] mb-2.5" style={{ color: `${meta.accentColor}90` }}>
                    {t.projects.labels.result}
                  </p>
                  <p className="text-sm text-white/35 leading-relaxed">{text.result}</p>
                </div>
              </div>

              {/* ── UMAY Confidentiality Banner ── */}
              {isUmay && (
                <div className="mt-8 mb-4 px-4 py-3 rounded-lg bg-orange-500/10 border border-orange-500/20 flex items-start gap-3">
                  <iconify-icon icon="mdi:shield-alert-outline" style={{ color: "#fb923c", marginTop: "2px" }} width="20" height="20" />
                  <p className="text-xs md:text-sm text-orange-200/80 leading-relaxed">
                    <strong className="text-orange-400 font-bold uppercase tracking-wider text-[10px] block mb-0.5">
                      {t.projects.confidentialTitle}
                    </strong>
                    {t.projects.confidentialBanner}
                  </p>
                </div>
              )}

              {/* ── Project Images ── */}
              {meta.images && (
                <div className="mt-8 flex flex-col md:flex-row gap-4">
                  <div
                    className={`relative ${isUmay ? "flex-1 aspect-video" : meta.id === 2 ? "flex-[2.3] aspect-[1920/980]" : "flex-[2.2] aspect-video"} rounded-xl overflow-hidden border border-white/10 bg-black/50 group cursor-pointer`}
                    onClick={() => meta.images?.main && onImageClick({ src: meta.images.main })}
                  >
                    <Image
                      src={meta.images.main}
                      alt={`${text.title} main screen`}
                      fill
                      quality={100}
                      className={isUmay ? "object-cover object-center transition-transform duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.02]" : "object-cover object-top transition-transform duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.02]"}
                      sizes="(max-width: 768px) 100vw, 100vw"
                    />
                  </div>
                  <div
                    className={`relative ${isUmay ? "flex-1 aspect-video rounded-xl overflow-hidden border border-white/10 bg-black/50 group cursor-pointer" : hasPhoneMockup ? "w-full md:w-[260px] lg:w-[300px] shrink-0 self-center cursor-pointer flex items-center justify-center py-2" : "flex-1 hidden md:flex items-center justify-center cursor-pointer"}`}
                    onClick={() => meta.images?.side && onImageClick({ src: meta.images.side, isPhoneMockup: hasPhoneMockup })}
                  >
                    {isUmay ? (
                      <Image
                        src={meta.images.side}
                        alt={`${text.title} alternate angle`}
                        fill
                        quality={100}
                        className="object-cover object-center transition-transform duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] group-hover:scale-[1.02]"
                        sizes="(max-width: 768px) 100vw, 100vw"
                      />
                    ) : hasPhoneMockup ? (
                      <PhoneMockup
                        src={meta.images.side}
                        alt={`${text.title} mobile mockup`}
                        isPreview
                      />
                    ) : (
                      <div className="relative w-full h-full">
                        <Image
                          src={meta.images.side}
                          alt={`${text.title} mobile mockup`}
                          fill
                          quality={100}
                          className="object-contain transition-transform duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] hover:scale-[1.03]"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* ── Expandable Details Button ── */}
              {text.expandedContent && text.expandedContent.length > 0 && (
                <div className="mt-8">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="group flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-white/50 hover:text-white transition-colors"
                  >
                    <span>{isOpen ? t.projects.hideDetails : t.projects.showDetails}</span>
                    <motion.div
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                      className="w-5 h-5 rounded-full bg-white/5 flex items-center justify-center border border-white/10 group-hover:border-white/30"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </motion.div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ gridTemplateRows: "0fr", opacity: 0 }}
                        animate={{ gridTemplateRows: "1fr", opacity: 1 }}
                        exit={{ gridTemplateRows: "0fr", opacity: 0 }}
                        transition={{ duration: 0.46, ease: [0.16, 1, 0.3, 1] }}
                        className="grid overflow-hidden"
                      >
                        <div className="min-h-0 overflow-hidden">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-6 pt-6 border-t border-white/5">
                            {text.expandedContent.map((item, idx) => (
                              <div key={idx} className="p-4 rounded-xl bg-white/10 border border-white/10">
                                <div className="flex items-center gap-2 mb-2">
                                  <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: meta.accentColor }} />
                                  <h4 className="text-sm font-bold text-white/90">{item.title}</h4>
                                </div>
                                <p className="text-xs text-white/40 leading-relaxed pl-3.5">
                                  {item.desc}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Vertical dotted timeline separator ── */}
        {!isLast && (
          <div className="flex justify-center py-2">
            <div
              className="w-px h-12"
              style={{
                backgroundImage: `repeating-linear-gradient(to bottom, rgba(255,255,255,0.1) 0px, rgba(255,255,255,0.1) 4px, transparent 4px, transparent 10px)`,
              }}
            />
          </div>
        )}
      </div>
    </AnimatedElement>
  );
}

/* ──────────────────────────────────────────
   MAIN PROJECTS COMPONENT
   ────────────────────────────────────────── */

export default function Projects() {
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);
  const { locale } = useLanguage();
  const t = locale === "tr" ? tr : en;

  return (
    <>
      <section id="projects" className="relative py-32 px-6 md:px-16 lg:px-24">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="mb-20">
            <div className="flex items-start justify-between">
              <div>
                <ScrollTextReveal
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight block"
                  staggerDelay={0.06}
                >
                  {`${t.projects.heading1} ${t.projects.heading2}`}
                </ScrollTextReveal>
              </div>
              <AnimatedElement direction="right" delay={0.3}>
                <div className="hidden md:flex items-center gap-2 mt-3">
                  <div className="w-2 h-2 rounded-full bg-orange-400" />
                  <span className="text-xs font-bold uppercase tracking-[0.15em] text-white/40">
                    {t.projects.badge}
                  </span>
                </div>
              </AnimatedElement>
            </div>
          </div>

          {/* Project sections stacked vertically */}
          <div className="flex flex-col">
            {projectMeta.map((meta, index) => (
              <ProjectSection
                key={meta.id}
                meta={meta}
                text={t.projects.items[index]}
                index={index}
                isLast={index === projectMeta.length - 1}
                onImageClick={setSelectedImage}
                t={t}
              />
            ))}
          </div>

          {/* ── Freelance Scripts Archive Section ── */}
          <div className="mt-32 pt-20 border-t border-white/10 relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-px bg-linear-to-r from-transparent via-orange-500/50 to-transparent" />

            <AnimatedElement direction="up" className="text-center mb-16">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                {t.projects.freelanceTitle}
              </h3>
              <p className="text-base text-white/40 max-w-2xl mx-auto leading-relaxed">
                {t.projects.freelanceDesc}
              </p>
            </AnimatedElement>

            <div className="flex flex-wrap justify-center gap-3 md:gap-4 max-w-5xl mx-auto">
              {freelanceScripts.map((script, idx) => (
                <AnimatedElement
                  key={script.name_tr}
                  direction="up"
                  delay={idx * 0.05}
                >
                  <div className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/10 border border-white/10 hover:bg-white/15 transition-all cursor-default group">
                    <iconify-icon
                      icon={script.icon}
                      width="18"
                      height="18"
                      className="text-orange-500/60 group-hover:text-orange-400 transition-colors"
                    />
                    <span className="text-sm font-medium text-white/60 group-hover:text-white/90 transition-colors">
                      {locale === "tr" ? script.name_tr : script.name_en}
                    </span>
                  </div>
                </AnimatedElement>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Fullscreen Lightbox Modal ── */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-md p-4 md:p-12 cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className={`relative w-full max-h-[90vh] cursor-default ${selectedImage.isPhoneMockup ? "flex h-full items-center justify-center" : "h-full max-w-7xl"}`}
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage.src}
                alt="Enlarged Project Visual"
                fill
                quality={100}
                unoptimized
                className={selectedImage.isPhoneMockup ? "hidden" : "object-contain"}
                sizes="100vw"
                priority
              />
              {selectedImage.isPhoneMockup && (
                <PhoneMockup
                  src={selectedImage.src}
                  alt="Enlarged mobile project mockup"
                />
              )}
              {selectedImage.src.includes("umay") && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-5 py-2.5 rounded-xl bg-black/80 backdrop-blur-md border border-orange-500/30 text-center max-w-[90vw] shadow-2xl">
                  <p className="text-xs md:text-sm text-orange-200/90">
                    <strong className="text-orange-400">{t.projects.confidentialTitle}:</strong>{" "}
                    {t.projects.confidentialModal}
                  </p>
                </div>
              )}
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-4 -right-4 w-12 h-12 rounded-full bg-black/50 hover:bg-black/80 border border-white/20 flex items-center justify-center text-white transition-colors backdrop-blur-md cursor-pointer"
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
