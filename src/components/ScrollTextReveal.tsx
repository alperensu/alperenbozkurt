"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface ScrollTextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  once?: boolean;
  staggerDelay?: number;
}

export default function ScrollTextReveal({
  children,
  className = "",
  delay = 0,
  as: Tag = "span",
  once = true,
  staggerDelay = 0.04,
}: ScrollTextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once, margin: "-60px" });

  const words = children.split(" ");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay,
        delayChildren: delay,
      },
    },
  };

  const wordVariants = {
    hidden: {
      y: 18,
      opacity: 0,
    },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.52,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      variants={containerVariants}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      className="inline"
    >
      <Tag className={className}>
        {words.map((word, index) => (
          <motion.span
            key={`${word}-${index}`}
            variants={wordVariants}
            className="motion-smooth inline-block mr-[0.3em]"
          >
            {word}
          </motion.span>
        ))}
      </Tag>
    </motion.div>
  );
}
