"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

const codeLines = [
  "// Vibe Coding Methodology: Enabled",
  "// Tools: Cursor + Windsurf integration",
  "",
  "import { AI_Agent } from '@vibe-coding/core';",
  "import { EmbeddedSystem } from '@tech-studio/low-level';",
  "",
  "const developer = new AI_Agent({",
  "  focus: 'optimization',",
  "  stack: ['React', 'Node.js', 'C#', 'Python'],",
  "  approach: 'solution-oriented',",
  "});",
  "",
  "async function solveComplexProblem(issue: Problem) {",
  "  console.log('[AI] Analyzing system architecture...');",
  "  const optimizedSolution = await developer.refactor(issue);",
  "  return optimizedSolution.deploy();",
  "}",
  "",
  "// Status: System Optimized. TechStudio Bridge Active.",
];

export default function TerminalWidget() {
  const [displayedText, setDisplayedText] = useState<string>("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let currentText = "";
    const fullText = codeLines.join("\n");
    let currentIndex = 0;
    let timeoutId: ReturnType<typeof setTimeout>;

    const typeChar = () => {
      if (currentIndex < fullText.length) {
        const chunkSize = currentIndex % 9 === 0 ? 2 : 1;
        currentText += fullText.slice(currentIndex, currentIndex + chunkSize);
        setDisplayedText(currentText);
        currentIndex += chunkSize;
        
        // Randomize typing speed for realism
        const delay = Math.random() * 24 + 14;
        timeoutId = setTimeout(typeChar, delay);
      } else {
        setIsTyping(false);
      }
    };

    timeoutId = setTimeout(typeChar, 1000);
    return () => clearTimeout(timeoutId);
  }, []);

  const displayedLines = displayedText.split("\n");

  return (
    <div className="relative w-full max-w-lg mx-auto md:w-[450px]">
      {/* Glow behind terminal */}
      <div className="absolute -inset-1 rounded-xl bg-linear-to-br from-orange-500/30 to-amber-500/20 blur-xl animate-pulse" />
      
      {/* Terminal Window */}
      <motion.div 
        className="relative rounded-xl border border-white/10 bg-[#0a0a0a]/90 backdrop-blur-xl shadow-2xl overflow-hidden"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {/* Title Bar */}
        <div className="flex items-center px-4 py-3 bg-white/5 border-b border-white/10">
          <div className="flex gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="mx-auto flex items-center gap-2 text-xs font-medium text-white/40">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4 17l6-6-6-6M12 19h8" />
            </svg>
            core_engine.ts
          </div>
        </div>

        {/* Code Content */}
        <div className="p-5 font-mono text-sm leading-relaxed overflow-hidden h-[280px]">
          <div className="text-white/80 whitespace-pre">
            {displayedLines.map((line, index) => {
              // Simple regex-based syntax highlighting for the typed text
              let highlightedLine = line;
              if (line.startsWith('//')) {
                return <div key={index} className="text-white/30 italic">{line}</div>;
              }
              
              // Keywords (using inline styles for Tailwind v4 compatibility)
              highlightedLine = highlightedLine.replace(/\b(import|from|const|new|async|function|return|await)\b/g, '<span style="color:#fb923c">$1</span>');
              // Strings
              highlightedLine = highlightedLine.replace(/('.*?')/g, '<span style="color:#34d399">$1</span>');
              // Types/Classes
              highlightedLine = highlightedLine.replace(/\b(AI_Agent|EmbeddedSystem|Problem)\b/g, '<span style="color:#fcd34d">$1</span>');
              // Numbers
              highlightedLine = highlightedLine.replace(/\b(\d+(\.\d+)?)\b/g, '<span style="color:#60a5fa">$1</span>');

              return (
                <div key={index} className="min-h-[1.5em]">
                  <span dangerouslySetInnerHTML={{ __html: highlightedLine }} />
                  {index === displayedLines.length - 1 && isTyping && (
                    <motion.span 
                      animate={{ opacity: [1, 0] }} 
                      transition={{ repeat: Infinity, duration: 0.8 }}
                      className="inline-block w-2 h-4 bg-orange-400 align-middle ml-1"
                    />
                  )}
                </div>
              );
            })}
            {!isTyping && (
              <motion.span 
                animate={{ opacity: [1, 0] }} 
                transition={{ repeat: Infinity, duration: 0.8 }}
                className="inline-block w-2 h-4 bg-orange-400 align-middle ml-1 mt-1"
              />
            )}
          </div>
        </div>
      </motion.div>

      {/* Floating badges */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 1.5 }}
        className="absolute -left-6 bottom-12 px-4 py-2 rounded-lg bg-black/80 backdrop-blur-md border border-white/10 flex items-center gap-2 shadow-xl"
      >
        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
        <span className="text-xs font-bold text-white/70">SYS.ONLINE</span>
      </motion.div>
      
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 2 }}
        className="absolute -right-8 top-16 px-4 py-2 rounded-lg bg-black/80 backdrop-blur-md border border-orange-500/20 flex items-center gap-2 shadow-xl"
      >
        <span className="text-xs font-bold text-orange-400">0ms LATENCY</span>
      </motion.div>
    </div>
  );
}
