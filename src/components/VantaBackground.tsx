"use client";

import { useEffect, useRef } from "react";

// Tema renk paleti (globals.css ile uyumlu)
// --vibrant-orange: #f97316  => 0xf97316
// --deep-navy:     #0a1128  => 0x0a1128
// --sunset-amber:  #f59e0b  => 0xf59e0b

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    VANTA: any;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    THREE: any;
  }
}

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    // Zaten yüklüyse direkt geç
    if (document.querySelector(`script[src="${src}"]`)) {
      resolve();
      return;
    }
    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.onload = () => resolve();
    script.onerror = () => reject(new Error(`Script yüklenemedi: ${src}`));
    document.head.appendChild(script);
  });
}

export default function VantaBackground() {
  const containerRef = useRef<HTMLDivElement>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const vantaRef = useRef<any>(null);

  useEffect(() => {
    let cancelled = false;

    async function init() {
      try {
        // Three.js r134 — Vanta'nın desteklediği versiyon
        await loadScript(
          "https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        );
        // Vanta NET efekti
        await loadScript(
          "https://cdn.jsdelivr.net/npm/vanta@0.5.24/dist/vanta.net.min.js"
        );

        if (cancelled || !containerRef.current || !window.VANTA) return;

        vantaRef.current = window.VANTA.NET({
          el: containerRef.current,
          THREE: window.THREE,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.0,
          minWidth: 200.0,
          scale: 1.0,
          scaleMobile: 0.75,

          // ── Tema renkleri ──────────────────────────────
          // Arkaplan — deep navy (#0a1128)
          backgroundColor: 0x0a1128,
          // Çizgi / bağlantı rengi — vibrant orange (#f97316) — düşük yoğunluk
          color: 0xf97316,
          // Nokta rengi — sunset amber (#f59e0b)
          points: 0xf59e0b,

          // ── Yoğunluk & görünüm ────────────────────────
          // Nokta sayısı (daha az = daha elegant)
          numPoints: 14,
          // Bağlantı mesafesi (daha uzak = seyrek ağ)
          maxDistance: 22.0,
          // Animasyon hızı (daha yavaş = daha premium)
          spacing: 18.0,
          showDots: true,
        });
      } catch (err) {
        console.warn("Vanta NET yüklenemedi:", err);
      }
    }

    init();

    return () => {
      cancelled = true;
      if (vantaRef.current) {
        vantaRef.current.destroy();
        vantaRef.current = null;
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-0"
      style={{
        // Gradient overlay: üstten aşağıya doğru deep navy → şeffaf → deep navy
        // Vanta kendi arkaplanını çizer, bu overlay sadece üst/alt kenar yumuşatma için
      }}
    >
      {/* Üst fade — navbar altı için */}
      <div
        className="absolute inset-x-0 top-0 h-32 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to bottom, #0a1128 0%, transparent 100%)",
        }}
      />
      {/* Alt fade — footer geçişi için */}
      <div
        className="absolute inset-x-0 bottom-0 h-48 pointer-events-none z-10"
        style={{
          background:
            "linear-gradient(to top, #0a1128 0%, transparent 100%)",
        }}
      />
      {/* Hafif radyal vignette */}
      <div
        className="absolute inset-0 pointer-events-none z-10"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 40%, rgba(10,17,40,0.6) 100%)",
        }}
      />
    </div>
  );
}
