"use client";

import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import CVDocument from "./CVDocument";

interface CVModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CVModal({ isOpen, onClose }: CVModalProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflowY = "scroll"; // Keep scrollbar space
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0") * -1);
      }
    }
    return () => {
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
    };
  }, [isOpen]);

  if (!mounted) return null;

  const handlePrint = () => {
    window.print();
  };

  const modalContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Global Print & Scroll Styles */}
          <style jsx global>{`
            @media print {
              @page {
                size: A4;
                margin: 0;
              }
              body, html {
                visibility: hidden !important;
                height: auto !important;
                overflow: visible !important;
              }
              #cv-portal-root * {
                visibility: hidden !important;
              }
              #cv-printable-area, #cv-printable-area * {
                visibility: visible !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              #cv-printable-area {
                position: absolute !important;
                left: 0 !important;
                top: 0 !important;
                width: 210mm !important;
                min-height: 297mm !important;
                margin: 0 !important;
                padding: 0 !important;
                box-shadow: none !important;
                border-radius: 0 !important;
                overflow: visible !important;
              }
              .no-print {
                display: none !important;
              }
            }
            .cv-modal-overlay {
              position: fixed !important;
              inset: 0 !important;
              z-index: 999999 !important;
              background: rgba(0, 0, 0, 0.95) !important;
              backdrop-filter: blur(16px) !important;
              overflow-y: auto !important;
              display: flex !important;
              flex-direction: column !important;
              align-items: center !important;
              padding: 40px 20px !important;
            }
          `}</style>

          <div id="cv-portal-root" className="cv-modal-overlay no-print" onClick={onClose}>
            {/* Toolbar */}
            <div className="w-full max-w-5xl flex justify-end gap-4 mb-8 sticky top-0 z-[1000000]" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={handlePrint}
                className="flex items-center gap-3 px-8 py-4 bg-orange-500 hover:bg-orange-400 text-white font-bold rounded-2xl shadow-2xl transition-all active:scale-95"
              >
                <iconify-icon icon="mdi:printer" width="24" height="24" />
                PRINT / SAVE AS PDF
              </button>
              <button
                onClick={onClose}
                className="w-14 h-14 flex items-center justify-center rounded-2xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
              >
                <iconify-icon icon="mdi:close" width="32" height="32" />
              </button>
            </div>

            {/* Document Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              onClick={(e) => e.stopPropagation()}
              id="cv-printable-area"
              className="relative w-[210mm] max-w-[calc(100vw-40px)] bg-white shadow-[0_0_100px_rgba(0,0,0,0.5)] rounded-lg overflow-hidden"
            >
              <div className="overflow-x-auto">
                <CVDocument />
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
