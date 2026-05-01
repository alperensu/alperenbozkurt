"use client";

import { useRef, useState, type MouseEvent, type ReactNode } from "react";

interface FlashlightCardProps {
  children: ReactNode;
  className?: string;
}

export default function FlashlightCard({
  children,
  className = "",
}: FlashlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      ref={cardRef}
      className={`relative overflow-hidden rounded-2xl transition-all duration-600 ease-[cubic-bezier(0.4,0,0.2,1)] ${className}`}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        background: "rgba(255, 255, 255, 0.04)",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(255, 255, 255, 0.08)",
        transform: isHovered ? "translateY(-4px)" : "translateY(0px)",
        boxShadow: isHovered
          ? "0 20px 60px rgba(0, 0, 0, 0.3), 0 0 40px rgba(249, 115, 22, 0.06)"
          : "0 0 0 rgba(0, 0, 0, 0)",
      }}
    >
      {/* Flashlight glow on background */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-600 rounded-2xl"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(249, 115, 22, 0.1), transparent 40%)`,
        }}
      />

      {/* Flashlight glow on border */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-600 rounded-2xl"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(400px circle at ${mousePos.x}px ${mousePos.y}px, rgba(249, 115, 22, 0.25), transparent 40%)`,
          mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          maskComposite: "exclude",
          WebkitMask:
            "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
          WebkitMaskComposite: "xor",
          padding: "1px",
        }}
      />

      {/* Content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
