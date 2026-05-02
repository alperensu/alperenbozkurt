"use client";

import { useEffect, useRef } from "react";

interface Segment {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
}

interface Strike {
  segments: Segment[];
  opacity: number;
  life: number;
  maxLife: number;
}

export default function LightningBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    const strikes: Strike[] = [];
    let lastStrikeTime = 0;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", resizeCanvas);
    resizeCanvas();

    // Organik dallanan şimşek algoritması
    const generateLightning = (
      x: number,
      y: number,
      targetY: number,
      isBranch = false
    ): Segment[] => {
      const segments: Segment[] = [];
      let currentX = x;
      let currentY = y;
      const maxBranchLength = isBranch ? window.innerHeight * 0.4 : window.innerHeight;
      let length = 0;

      while (currentY < targetY && length < maxBranchLength) {
        // Aşağı ve hafif sağa/sola sapma
        const stepY = Math.random() * 20 + 10;
        const stepX = (Math.random() - 0.5) * 50;

        const nextX = currentX + stepX;
        const nextY = currentY + stepY;

        segments.push({ x1: currentX, y1: currentY, x2: nextX, y2: nextY });

        // Ana koldan dallanma ihtimali (%10)
        if (!isBranch && Math.random() < 0.1) {
          const branchSegments = generateLightning(nextX, nextY, targetY, true);
          segments.push(...branchSegments);
        }

        currentX = nextX;
        currentY = nextY;
        length += stepY;
      }
      return segments;
    };

    const triggerStrike = () => {
      const startX = Math.random() * canvas.width;
      const startY = 0;
      const targetY = canvas.height + 100;
      
      const newSegments = generateLightning(startX, startY, targetY);
      strikes.push({
        segments: newSegments,
        opacity: 1,
        life: 0,
        maxLife: Math.random() * 15 + 15 // 15-30 frame arası yaşar
      });
    };

    const render = (time: number) => {
      // Önceki kareyi temizle
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Rastgele zamanlama ile yeni şimşek (Her 3 ila 8 saniyede bir)
      if (time - lastStrikeTime > Math.random() * 5000 + 3000) {
        triggerStrike();
        lastStrikeTime = time;
      }

      for (let i = strikes.length - 1; i >= 0; i--) {
        const strike = strikes[i];
        
        // Titreme (Flicker) efekti: İlk anlarda parlaklık gidip gelir
        let drawOpacity = strike.opacity;
        if (strike.life < strike.maxLife * 0.3) {
           drawOpacity = Math.random() > 0.3 ? 1 : 0.2;
        }

        ctx.beginPath();
        for (const seg of strike.segments) {
          ctx.moveTo(seg.x1, seg.y1);
          ctx.lineTo(seg.x2, seg.y2);
        }

        // Beyaz/Açık mavi çekirdek
        ctx.strokeStyle = `rgba(255, 255, 255, ${drawOpacity})`;
        ctx.lineWidth = 2;
        
        // Mavi Parlama (Lacivert temanın üstünde elektrik mavisi glow)
        ctx.shadowColor = "#00d4ff"; 
        ctx.shadowBlur = 15;
        
        ctx.stroke();

        // Daha yoğun parlama için ikinci çizim
        ctx.lineWidth = 1;
        ctx.shadowBlur = 30;
        ctx.stroke();
        
        ctx.shadowBlur = 0; // Sıfırla

        strike.life++;
        // Ömrünün ikinci yarısında giderek sönükleşir
        if (strike.life > strike.maxLife * 0.5) {
            strike.opacity -= 0.05;
        }

        // Tamamen söndüyse diziden çıkar
        if (strike.opacity <= 0) {
          strikes.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.7 }}
    />
  );
}
