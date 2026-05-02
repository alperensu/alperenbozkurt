"use client";

import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CVDocument from "./CVDocument";

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CVModal({ isOpen, onClose }: CVModalProps) {
  // Prevent scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 overflow-y-auto">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/90 backdrop-blur-md"
          />

          {/* Modal Container */}
          <div className="relative min-h-screen flex items-center justify-center p-4 md:p-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-5xl bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
              {/* Toolbar */}
              <div className="flex items-center justify-between p-4 border-b border-white/10 bg-zinc-900/50 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-4">
                  <h3 className="text-white font-bold hidden sm:block">Curriculum Vitae</h3>
                  <button
                    onClick={handlePrint}
                    className="flex items-center gap-2 px-4 py-2 bg-orange-500 hover:bg-orange-400 text-white text-xs font-bold rounded-full transition-all"
                  >
                    <iconify-icon icon="mdi:printer" />
                    Print / Save PDF
                  </button>
                </div>
                <button
                  onClick={onClose}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-white transition-all"
                >
                  <iconify-icon icon="mdi:close" width="24" height="24" />
                </button>
              </div>

              {/* CV Content Area */}
              <div className="bg-[#f8f9fa] overflow-auto max-h-[80vh] md:max-h-[85vh] p-4 md:p-12 scrollbar-thin scrollbar-thumb-zinc-400">
                <div className="min-w-[800px] mx-auto">
                   <CVDocument />
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      )}
    </AnimatePresence>
  );
}
