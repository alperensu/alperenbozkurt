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
      document.documentElement.style.overflow = "hidden";
      document.body.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const handlePrint = () => {
    window.print();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Print-specific Styles */}
          <style jsx global>{`
            @media print {
              /* Hide everything by default */
              body * {
                visibility: hidden !important;
                overflow: visible !important;
              }
              /* Show only the CV area */
              #cv-print-section, #cv-print-section * {
                visibility: visible !important;
              }
              #cv-print-section {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 100% !important;
                margin: 0 !important;
                padding: 0 !important;
                background: white !important;
              }
              /* Remove extra pages/margins */
              @page {
                margin: 0;
                size: auto;
              }
              /* Hide modal UI during print */
              .no-print {
                display: none !important;
              }
            }
          `}</style>

          <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-start overflow-y-auto bg-black/95 backdrop-blur-xl py-8 md:py-16">
            {/* Backdrop Close Handler */}
            <div className="fixed inset-0 -z-10" onClick={onClose} />

            {/* Toolbar - Floating or Sticky */}
            <div className="w-full max-w-5xl px-4 mb-6 flex justify-end gap-3 no-print">
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-6 py-3 bg-orange-500 hover:bg-orange-400 text-white text-sm font-bold rounded-xl shadow-lg transition-all active:scale-95"
              >
                <iconify-icon icon="mdi:printer" />
                Print / Save PDF
              </button>
              <button
                onClick={onClose}
                className="w-12 h-12 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white transition-all active:scale-95 border border-white/10"
              >
                <iconify-icon icon="mdi:close" width="28" height="28" />
              </button>
            </div>

            {/* CV Document Wrapper */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 30 }}
              id="cv-print-section"
              className="relative w-full max-w-5xl bg-white shadow-2xl rounded-sm md:rounded-lg overflow-hidden"
            >
              {/* Internal horizontal scroll for mobile if document is min-w-800 */}
              <div className="overflow-x-auto overflow-y-visible">
                <div className="min-w-[800px] mx-auto">
                  <CVDocument />
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}
