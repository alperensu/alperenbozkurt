"use client";

import { useRef, type CSSProperties, type MouseEvent, type ReactNode } from "react";

interface FlashlightCardProps {
  children: ReactNode;
  className?: string;
}

export default function FlashlightCard({
  children,
  className = "",
}: FlashlightCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const frameRef = useRef<number | null>(null);
  const pointerRef = useRef({ x: 0, y: 0 });

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    pointerRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };

    if (frameRef.current) return;

    frameRef.current = requestAnimationFrame(() => {
      frameRef.current = null;
      if (!cardRef.current) return;

      cardRef.current.style.setProperty("--spotlight-x", `${pointerRef.current.x}px`);
      cardRef.current.style.setProperty("--spotlight-y", `${pointerRef.current.y}px`);
    });
  };

  const style = {
    "--spotlight-x": "50%",
    "--spotlight-y": "50%",
  } as CSSProperties;

  return (
    <div
      ref={cardRef}
      className={`flashlight-card relative overflow-hidden rounded-2xl ${className}`}
      onMouseMove={handleMouseMove}
      style={style}
    >
      <div className="flashlight-card__glow absolute inset-0 pointer-events-none rounded-2xl" />
      <div className="flashlight-card__border absolute inset-0 pointer-events-none rounded-2xl" />
      <div className="relative z-10">{children}</div>
    </div>
  );
}
