"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import tr from "@/locales/tr";
import en from "@/locales/en";

const GOATCOUNTER_SITE = "alperenbozkurt";

interface CounterData {
  total: number;
  today: number;
}

function useCountUp(target: number, duration: number = 1800, active: boolean = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active || target === 0) return;
    const startTime = performance.now();
    let frameId = 0;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setCount(Math.round(eased * target));
      if (progress < 1) frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [target, duration, active]);

  return count;
}

export default function VisitorCounter() {
  const { locale } = useLanguage();
  const t = locale === "tr" ? tr : en;
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-20px" });

  const [data, setData] = useState<CounterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchStats() {
      try {
        const res = await fetch(
          `https://${GOATCOUNTER_SITE}.goatcounter.com/api/v0/stats/total`,
          { signal: controller.signal }
        );

        if (res.ok) {
          const json = await res.json();
          const total: number = json?.total ?? 0;
          const today: number = json?.today ?? 0;
          setData({ total, today });
        } else {
          throw new Error("API unavailable");
        }
      } catch {
        try {
          const stored = localStorage.getItem("vc_count");
          const current = stored ? parseInt(stored, 10) : 0;
          const newCount = current + 1;
          localStorage.setItem("vc_count", String(newCount));
          setData({ total: newCount, today: 1 });
        } catch {
          setError(true);
        }
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
    return () => controller.abort();
  }, []);

  const totalCount = useCountUp(data?.total ?? 0, 1800, isInView && !loading);
  const todayCount = useCountUp(data?.today ?? 0, 1200, isInView && !loading);

  if (error) return null;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
      className="flex flex-col items-center gap-2 md:items-end"
    >
      <div className="mb-1 flex items-center gap-2">
        <span className="relative flex h-2.5 w-2.5">
          <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-sky-300 opacity-75" />
          <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-sky-400" />
        </span>
        <span className="text-xs font-medium uppercase tracking-widest text-white/40">
          {t.footer.visitorCounter.label}
        </span>
      </div>

      <div className="flex items-center gap-4">
        <div className="flex flex-col items-center gap-0.5">
          <div className="relative">
            {loading ? (
              <div className="h-6 w-16 animate-pulse rounded-md bg-white/10" />
            ) : (
              <span className="bg-linear-to-r from-sky-200 via-white to-blue-300 bg-clip-text text-2xl font-black tabular-nums text-transparent">
                {totalCount.toLocaleString()}
              </span>
            )}
          </div>
          <span className="text-[10px] uppercase tracking-wider text-white/30">
            {t.footer.visitorCounter.total}
          </span>
        </div>

        <div className="h-8 w-px bg-white/10" />

        <div className="flex flex-col items-center gap-0.5">
          <div className="relative">
            {loading ? (
              <div className="h-6 w-10 animate-pulse rounded-md bg-white/10" />
            ) : (
              <span className="text-2xl font-black tabular-nums text-white/80">
                {todayCount.toLocaleString()}
              </span>
            )}
          </div>
          <span className="text-[10px] uppercase tracking-wider text-white/30">
            {t.footer.visitorCounter.today}
          </span>
        </div>
      </div>

      <a
        href={`https://${GOATCOUNTER_SITE}.goatcounter.com`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-0.5 text-[10px] text-white/20 transition-colors duration-300 hover:text-sky-200/70"
      >
        goatcounter analytics ↗
      </a>
    </motion.div>
  );
}
