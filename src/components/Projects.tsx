"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import tr from "@/locales/tr";
import en from "@/locales/en";
import { getAssetPath } from "@/utils/paths";

const projectVisuals = [
  {
    src: "/projects/borsa/borsa_main_new.png",
    side: "/projects/borsa/borsa_mobile.png",
    accent: "#e9ff00",
    stack: ["LightGBM", "React", "BIST"],
  },
  {
    src: "/projects/vibekoc/vibekoc_desktop.png",
    side: "/projects/vibekoc/vibekoc_mobile.png",
    accent: "#58d7ff",
    stack: ["Node.js", "AI Coach", "Socket.io"],
  },
  {
    src: "/projects/umay/umay_main.png",
    side: "/projects/umay/umay_side_v2.png",
    accent: "#ff6b2c",
    stack: ["YOLO", "OpenCV", "UAV"],
  },
  {
    src: "/editorial/alperen-story-collage-v1.png",
    side: null,
    accent: "#e9ff00",
    stack: ["FastAPI", "AST", "CLI"],
  },
  {
    src: "/projects/flowy/flowy_desktop.png",
    side: "/projects/flowy/flowy_mobile.png",
    accent: "#14b8a6",
    stack: ["Next.js", "Electron", "Music"],
  },
  {
    src: "/editorial/alperen-services-campaign-v1.png",
    side: null,
    accent: "#f97316",
    stack: ["Whisper", "FFmpeg", "Claude"],
  },
];

export default function Projects() {
  const [selected, setSelected] = useState<string | null>(null);
  const { locale } = useLanguage();
  const t = locale === "tr" ? tr : en;

  useEffect(() => {
    document.body.style.overflow = selected ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [selected]);

  return (
    <>
      <section id="projects" className="cinematic-section bg-black text-white">
        <div className="section-inner">
          <div className="mb-12">
            <p className="kicker text-[#e9ff00]">{t.projects.badge}</p>
            <h2 className="mt-5 text-[clamp(4rem,13vw,12rem)] font-black uppercase leading-[0.76]">
              {t.projects.heading1}
              <span className="block text-white/28">{t.projects.heading2}</span>
            </h2>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            {t.projects.items.map((project, index) => {
              const visual = projectVisuals[index];
              const mainSrc = getAssetPath(visual.src);

              return (
                <motion.article
                  key={project.title}
                  initial={{ opacity: 0, y: 34 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.72, ease: [0.16, 1, 0.3, 1] }}
                  className={`group relative overflow-hidden rounded-[2rem] bg-[#111] ${index === 0 || index === 3 ? "md:col-span-2" : ""}`}
                >
                  <button
                    onClick={() => setSelected(mainSrc)}
                    className="relative block aspect-[16/11] w-full overflow-hidden text-left md:aspect-[16/8]"
                  >
                    <Image
                      src={mainSrc}
                      alt={`${project.title} visual`}
                      fill
                      quality={100}
                      sizes={index === 0 || index === 3 ? "100vw" : "(max-width: 768px) 100vw, 50vw"}
                      className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.035]"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />
                    <span
                      className="absolute left-4 top-4 rounded-full px-3 py-1.5 text-xs font-black uppercase text-black"
                      style={{ backgroundColor: visual.accent }}
                    >
                      {project.category}
                    </span>
                  </button>

                  <div className="relative p-5 md:p-7">
                    <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                      <div>
                        <h3 className="text-3xl font-black uppercase md:text-5xl">{project.title}</h3>
                        <p className="mt-4 max-w-3xl text-base leading-7 text-white/60">
                          {project.description}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-wrap gap-2 md:max-w-56 md:justify-end">
                        {visual.stack.map((tech) => (
                          <span key={tech} className="rounded-full border border-white/12 px-3 py-1.5 text-xs font-bold text-white/56">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="mt-7 grid gap-3 border-t border-white/10 pt-5 md:grid-cols-3">
                      <p className="text-sm leading-6 text-white/45">
                        <span className="block text-xs font-black uppercase text-white/80">{t.projects.labels.techStack}</span>
                        {project.techInfo}
                      </p>
                      <p className="text-sm leading-6 text-white/45">
                        <span className="block text-xs font-black uppercase text-white/80">{t.projects.labels.role}</span>
                        {project.role}
                      </p>
                      <p className="text-sm leading-6 text-white/45">
                        <span className="block text-xs font-black uppercase text-white/80">{t.projects.labels.result}</span>
                        {project.result}
                      </p>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      <AnimatePresence>
        {selected && (
          <motion.button
            type="button"
            onClick={() => setSelected(null)}
            className="fixed inset-0 z-[120] grid cursor-zoom-out place-items-center bg-black/92 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <span className="absolute right-5 top-5 rounded-full bg-white px-4 py-2 text-xs font-black uppercase text-black">
              Close
            </span>
            <span className="relative h-[84vh] w-[92vw]">
              <Image
                src={selected}
                alt="Expanded project visual"
                fill
                quality={100}
                sizes="92vw"
                className="object-contain"
                unoptimized
              />
            </span>
          </motion.button>
        )}
      </AnimatePresence>
    </>
  );
}
