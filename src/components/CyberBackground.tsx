"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  baseRadius: number;
  phase: number;
}

export default function CyberBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let nodes: Node[] = [];
    const numNodes = 70;
    const maxDistance = 150;
    let scrollY = 0;
    let mouse = { x: -1000, y: -1000 };

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initNodes();
    };

    const initNodes = () => {
      nodes = [];
      for (let i = 0; i < numNodes; i++) {
        const r = Math.random() * 1.5 + 0.5;
        nodes.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: r,
          baseRadius: r,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };
    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener("resize", resizeCanvas);
    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("scroll", handleScroll, { passive: true });
    resizeCanvas();

    let time = 0;
    const render = () => {
      time += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const parallaxOffset = scrollY * 0.08;

      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        node.x += node.vx;
        node.y += node.vy;

        // Subtle size pulsing
        node.radius = node.baseRadius + Math.sin(time * 2 + node.phase) * 0.3;

        if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
        if (node.y < 0 || node.y > canvas.height) node.vy *= -1;

        const drawY = node.y - parallaxOffset * (node.baseRadius / 2);

        ctx.beginPath();
        ctx.arc(node.x, drawY, Math.max(node.radius, 0.3), 0, Math.PI * 2);
        ctx.fillStyle = "rgba(249, 115, 22, 0.35)";
        ctx.fill();

        for (let j = i + 1; j < nodes.length; j++) {
          const node2 = nodes[j];
          const drawY2 = node2.y - parallaxOffset * (node2.baseRadius / 2);
          const dx = node.x - node2.x;
          const dy = drawY - drawY2;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < maxDistance) {
            ctx.beginPath();
            ctx.moveTo(node.x, drawY);
            ctx.lineTo(node2.x, drawY2);
            const opacity = (1 - dist / maxDistance) * 0.12;
            ctx.strokeStyle = `rgba(249, 115, 22, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.stroke();
          }
        }

        const dxMouse = node.x - mouse.x;
        const dyMouse = drawY - mouse.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);

        if (distMouse < maxDistance * 1.5) {
          ctx.beginPath();
          ctx.moveTo(node.x, drawY);
          ctx.lineTo(mouse.x, mouse.y);
          const opacity = (1 - distMouse / (maxDistance * 1.5)) * 0.18;
          ctx.strokeStyle = `rgba(56, 189, 248, ${opacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
          node.x -= dxMouse * 0.003;
          node.y -= dyMouse * 0.003;
        }
      }
      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-0 pointer-events-none bg-black">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-orange-900/10 via-black to-black" />
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full opacity-80" />
    </div>
  );
}
