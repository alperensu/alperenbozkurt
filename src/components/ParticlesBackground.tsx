"use client";

import { useEffect, useState, useCallback } from "react";
import Particles, { initParticlesEngine } from "@tsparticles/react";
import { loadSlim } from "@tsparticles/slim";
import type { ISourceOptions } from "@tsparticles/engine";

export default function ParticlesBackground() {
  const [init, setInit] = useState(false);
  const [offsetY, setOffsetY] = useState(0);

  useEffect(() => {
    initParticlesEngine(async (engine) => {
      await loadSlim(engine);
    }).then(() => {
      setInit(true);
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setOffsetY(window.scrollY * 0.15);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const options: ISourceOptions = {
    fullScreen: false,
    fpsLimit: 60,
    background: {
      color: { value: "transparent" },
    },
    particles: {
      color: { value: ["#ffffff", "#00d4ff", "#6366f1"] },
      number: {
        value: 120,
        density: { enable: true },
      },
      opacity: {
        value: { min: 0.15, max: 0.7 },
        animation: {
          enable: true,
          speed: 0.8,
          sync: false,
        },
      },
      size: {
        value: { min: 0.5, max: 2.5 },
        animation: {
          enable: true,
          speed: 1,
          sync: false,
        },
      },
      move: {
        enable: true,
        speed: { min: 0.1, max: 0.4 },
        direction: "none" as const,
        random: true,
        straight: false,
        outModes: { default: "out" as const },
      },
      links: {
        enable: false,
      },
    },
    detectRetina: true,
  };

  if (!init) return null;

  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ transform: `translateY(-${offsetY}px)` }}
    >
      <Particles id="space-particles" options={options} className="w-full h-full" />
      {/* Deep space gradient overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 20% 50%, rgba(99, 102, 241, 0.06) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(0, 212, 255, 0.04) 0%, transparent 50%)",
        }}
      />
    </div>
  );
}
