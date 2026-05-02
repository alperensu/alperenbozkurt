"use client";

import { useEffect, useRef } from "react";

// ── Tema renkleri (globals.css ile eşleşen) ─────────────────────────
// --deep-navy:      #0a1128
// --vibrant-orange: #f97316  →  r=249 g=115 b=22
// --sunset-amber:   #f59e0b  →  r=245 g=158 b=11

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  phase: number;
  pulseSpeed: number;
}

export default function VantaBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let particles: Particle[] = [];
    let mouse = { x: -9999, y: -9999 };
    let time = 0;

    // ── Sabitler ─────────────────────────────────────────────────────
    const NUM_PARTICLES = 80;      // nokta sayısı
    const MAX_DIST = 160;          // bağlantı mesafesi
    const MOUSE_RADIUS = 200;      // mouse çekim alanı
    const SPEED = 0.45;            // hareket hızı

    // Renk bileşenleri (tema)
    const NODE_R = 249, NODE_G = 115, NODE_B = 22;   // orange
    const LINE_R = 249, LINE_G = 115, LINE_B = 22;   // orange çizgiler
    const MOUSE_R = 245, MOUSE_G = 158, MOUSE_B = 11; // amber mouse hattı

    // ── Canvas boyutlandırma ─────────────────────────────────────────
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    // ── Parçacık oluşturma ───────────────────────────────────────────
    const init = () => {
      particles = [];
      for (let i = 0; i < NUM_PARTICLES; i++) {
        const r = Math.random() * 2 + 1;
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * SPEED,
          vy: (Math.random() - 0.5) * SPEED,
          radius: r,
          baseRadius: r,
          phase: Math.random() * Math.PI * 2,
          pulseSpeed: 0.8 + Math.random() * 1.2,
        });
      }
    };

    // ── Mouse takibi ─────────────────────────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const onMouseLeave = () => {
      mouse.x = -9999;
      mouse.y = -9999;
    };
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      mouse.x = t.clientX;
      mouse.y = t.clientY;
    };

    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseleave", onMouseLeave);
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    window.addEventListener("touchend", onMouseLeave);

    resize();

    // ── Ana render döngüsü ───────────────────────────────────────────
    const render = () => {
      time += 0.012;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Arka plan gradient (deep navy)
      const bg = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bg.addColorStop(0, "#0a1128");
      bg.addColorStop(0.5, "#0d1530");
      bg.addColorStop(1, "#0a1128");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // ── Parçacık güncelle ────────────────────────────────────────
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // Hareket
        p.x += p.vx;
        p.y += p.vy;

        // Sınır yansıma
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Nabız efekti
        p.radius =
          p.baseRadius + Math.sin(time * p.pulseSpeed + p.phase) * 0.6;

        // Mouse ile çekim (gentle repulsion / attraction)
        const dxM = p.x - mouse.x;
        const dyM = p.y - mouse.y;
        const distM = Math.sqrt(dxM * dxM + dyM * dyM);
        if (distM < MOUSE_RADIUS) {
          const force = (1 - distM / MOUSE_RADIUS) * 0.012;
          p.vx -= dxM * force;
          p.vy -= dyM * force;
          // Hız sınırla
          const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
          if (speed > SPEED * 3) {
            p.vx = (p.vx / speed) * SPEED * 3;
            p.vy = (p.vy / speed) * SPEED * 3;
          }
        }

        // ── Parçacık arası çizgiler ────────────────────────────────
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * 0.22;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(${LINE_R},${LINE_G},${LINE_B},${alpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }

        // ── Mouse bağlantı çizgisi ────────────────────────────────
        if (distM < MOUSE_RADIUS) {
          const alpha = (1 - distM / MOUSE_RADIUS) * 0.35;
          ctx.beginPath();
          ctx.moveTo(p.x, p.y);
          ctx.lineTo(mouse.x, mouse.y);
          ctx.strokeStyle = `rgba(${MOUSE_R},${MOUSE_G},${MOUSE_B},${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }

        // ── Nokta ─────────────────────────────────────────────────
        const r = Math.max(p.radius, 0.5);

        // Glow halkası
        const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, r * 4);
        grd.addColorStop(0, `rgba(${NODE_R},${NODE_G},${NODE_B},0.25)`);
        grd.addColorStop(1, `rgba(${NODE_R},${NODE_G},${NODE_B},0)`);
        ctx.beginPath();
        ctx.arc(p.x, p.y, r * 4, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Çekirdek nokta
        ctx.beginPath();
        ctx.arc(p.x, p.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${NODE_R},${NODE_G},${NODE_B},0.85)`;
        ctx.fill();
      }

      raf = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onMouseLeave);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
      />

      {/* Kenar fade overlay'leri */}
      {/* Üst — navbar altı yumuşatma */}
      <div
        className="absolute inset-x-0 top-0 h-28 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, #0a1128 0%, transparent 100%)",
          zIndex: 1,
        }}
      />
      {/* Alt — footer geçiş yumuşatma */}
      <div
        className="absolute inset-x-0 bottom-0 h-40 pointer-events-none"
        style={{
          background: "linear-gradient(to top, #0a1128 0%, transparent 100%)",
          zIndex: 1,
        }}
      />
      {/* Hafif radyal vignette */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at center, transparent 30%, rgba(10,17,40,0.55) 100%)",
          zIndex: 1,
        }}
      />
    </div>
  );
}
