"use client";

import { useRef } from "react";
import { motion, useInView, type Variant } from "framer-motion";

interface AnimatedElementProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  className?: string;
  once?: boolean;
}

export default function AnimatedElement({
  children,
  delay = 0,
  duration = 0.9,
  direction = "up",
  className = "",
  once = true,
}: AnimatedElementProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  const directionMap: Record<string, { x?: number; y?: number }> = {
    up: { y: 60 },
    down: { y: -60 },
    left: { x: 60 },
    right: { x: -60 },
    none: {},
  };

  const offset = directionMap[direction] || {};

  const hidden: Variant = {
    ...offset,
    opacity: 0,
    filter: "blur(6px)",
  };

  const visible: Variant = {
    x: 0,
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
  };

  return (
    <motion.div
      ref={ref}
      initial={hidden}
      animate={isInView ? visible : hidden}
      transition={{
        duration,
        delay,
        ease: [0.4, 0, 0.2, 1] as const,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
