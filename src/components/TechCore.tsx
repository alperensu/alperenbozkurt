"use client";

export default function TechCore() {
  return (
    <div className="relative w-80 h-80 md:w-[420px] md:h-[420px] animate-float">
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full bg-linear-to-br from-orange-500/10 to-amber-500/10 blur-3xl" />

      {/* Ring 1 — Outer */}
      <div className="absolute inset-4 rounded-full border border-white/10 animate-spin-slow">
        {/* Orbital dots */}
        <div
          className="absolute w-2.5 h-2.5 rounded-full bg-orange-400 shadow-lg shadow-orange-400/50"
          style={{ top: "0%", left: "50%", transform: "translate(-50%, -50%)" }}
        />
        <div
          className="absolute w-1.5 h-1.5 rounded-full bg-amber-400 shadow-lg shadow-amber-400/50"
          style={{
            bottom: "10%",
            right: "5%",
            transform: "translate(50%, 50%)",
          }}
        />
      </div>

      {/* Ring 2 — Middle */}
      <div className="absolute inset-16 rounded-full border border-orange-500/ animate-spin-reverse">
        <div
          className="absolute w-2 h-2 rounded-full bg-orange-300 shadow-lg shadow-orange-300/60"
          style={{
            top: "50%",
            right: "0%",
            transform: "translate(50%, -50%)",
          }}
        />
        <div
          className="absolute w-1.5 h-1.5 rounded-full bg-purple-400 shadow-lg shadow-purple-400/50"
          style={{
            bottom: "0%",
            left: "50%",
            transform: "translate(-50%, 50%)",
          }}
        />
      </div>

      {/* Ring 3 — Inner */}
      <div className="absolute inset-28 md:inset-32 rounded-full border border-amber-500/ animate-spin-slow" style={{ animationDuration: "12s" }}>
        <div
          className="absolute w-1.5 h-1.5 rounded-full bg-white shadow-lg shadow-white/50"
          style={{
            top: "0%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      </div>

      {/* Center core */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="relative w-20 h-20 md:w-24 md:h-24">
          {/* Core glow */}
          <div className="absolute inset-0 rounded-full bg-linear-to-br from-orange-400 to-amber-600 animate-pulse-glow blur-xl" />
          {/* Core shape */}
          <div className="absolute inset-2 rounded-full bg-linear-to-br from-orange-400/80 to-amber-500/80 backdrop-blur-sm border border-white/20 flex items-center justify-center">
            <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-white/20 backdrop-blur-md" />
          </div>
        </div>
      </div>

      {/* Decorative arcs */}
      <svg
        className="absolute inset-0 w-full h-full animate-spin-slow"
        style={{ animationDuration: "30s" }}
        viewBox="0 0 400 400"
        fill="none"
      >
        <path
          d="M200 30 A170 170 0 0 1 370 200"
          stroke="url(#arc-gradient)"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.3"
        />
        <defs>
          <linearGradient id="arc-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#00d4ff" stopOpacity="0" />
            <stop offset="50%" stopColor="#00d4ff" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#6366f1" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>

      <svg
        className="absolute inset-0 w-full h-full animate-spin-reverse"
        style={{ animationDuration: "25s" }}
        viewBox="0 0 400 400"
        fill="none"
      >
        <path
          d="M30 200 A170 170 0 0 1 200 370"
          stroke="url(#arc-gradient-2)"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.2"
        />
        <defs>
          <linearGradient
            id="arc-gradient-2"
            x1="0%"
            y1="0%"
            x2="100%"
            y2="0%"
          >
            <stop offset="0%" stopColor="#6366f1" stopOpacity="0" />
            <stop offset="50%" stopColor="#6366f1" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#00d4ff" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}
