"use client";

import { useEffect, useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useLanguage } from "@/context/LanguageContext";
import tr from "@/locales/tr";
import en from "@/locales/en";

// GoatCounter site code — sitenin kendi goatcounter.com hesabındaki code
const GOATCOUNTER_SITE = "alperenbozkurt";

interface CounterData {
  total: number;
  today: number;
}

function useCountUp(target: number, duration: number = 1800, active: boolean = true) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active || target === 0) return;
    let start = 0;
    const startTime = performance.now();

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const current = Math.round(eased * target);
      setCount(current);
      if (progress < 1) requestAnimationFrame(tick);
    };

    requestAnimationFrame(tick);
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
        // GoatCounter public totals endpoint
        const res = await fetch(
          `https://${GOATCOUNTER_SITE}.goatcounter.com/api/v0/stats/total`,
          { signal: controller.signal }
        );

        if (res.ok) {
          const json = await res.json();
          // total pageviews ve bugünkü ziyaretleri al
          const total: number = json?.total ?? 0;
          const today: number = json?.today ?? 0;
          setData({ total, today });
        } else {
          // API erişimi yoksa localStorage'daki simüle değeri kullan
          throw new Error("API unavailable");
        }
      } catch {
        // Fallback: localStorage ile kümülatif local sayaç
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
      transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1], delay: 0.3 }}
      className="flex flex-col items-center md:items-end gap-2"
    >
      <div className="flex items-center gap-2 mb-1">
        {/* Canlı yeşil nokta */}
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
        </span>
        <span className="text-xs font-medium text-white/40 tracking-widest uppercase">
          {t.footer.visitorCounter.label}
        </span>
      </div>

      <div className="flex items-center gap-4">
        {/* Toplam */}
        <div className="flex flex-col items-center gap-0.5">
          <div className="relative">
            {loading ? (
              <div className="w-16 h-6 bg-white/10 rounded animate-pulse" />
            ) : (
              <span className="text-2xl font-bold tabular-nums bg-gradient-to-r from-orange-400 to-amber-400 bg-clip-text text-transparent">
                {totalCount.toLocaleString()}
              </span>
            )}
          </div>
          <span className="text-[10px] text-white/30 uppercase tracking-wider">
            {t.footer.visitorCounter.total}
          </span>
        </div>

        <div className="w-px h-8 bg-white/10" />

        {/* Bugün */}
        <div className="flex flex-col items-center gap-0.5">
          <div className="relative">
            {loading ? (
              <div className="w-10 h-6 bg-white/10 rounded animate-pulse" />
            ) : (
              <span className="text-2xl font-bold tabular-nums text-white/80">
                {todayCount.toLocaleString()}
              </span>
            )}
          </div>
          <span className="text-[10px] text-white/30 uppercase tracking-wider">
            {t.footer.visitorCounter.today}
          </span>
        </div>
      </div>

      {/* GoatCounter link */}
      <a
        href={`https://${GOATCOUNTER_SITE}.goatcounter.com`}
        target="_blank"
        rel="noopener noreferrer"
        className="text-[10px] text-white/20 hover:text-orange-400/60 transition-colors duration-300 mt-0.5"
      >
        goatcounter analytics ↗
      </a>
    </motion.div>
  );
}
