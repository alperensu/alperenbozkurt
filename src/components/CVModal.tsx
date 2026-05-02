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
  const [previewScale, setPreviewScale] = useState(1);

  useEffect(() => {
    if (!isOpen) return;

    const updateScale = () => {
      const a4WidthPx = 210 * (96 / 25.4);
      const a4HeightPx = 297 * (96 / 25.4);
      const availableWidth = window.innerWidth - 32;
      const availableHeight = window.innerHeight - 32;
      setPreviewScale(Math.min(availableWidth / a4WidthPx, availableHeight / a4HeightPx, 1));
    };

    updateScale();
    window.addEventListener("resize", updateScale);
    return () => window.removeEventListener("resize", updateScale);
  }, [isOpen]);

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
                position: static !important;
                top: auto !important;
                left: auto !important;
                width: auto !important;
                min-height: auto !important;
                visibility: visible !important;
                height: auto !important;
                overflow: visible !important;
                background: white !important;
              }
              body > :not(#cv-portal-root) {
                visibility: hidden !important;
                display: none !important;
              }
              #cv-portal-root,
              #cv-portal-root *,
              #cv-printable-area,
              #cv-printable-area * {
                visibility: visible !important;
                -webkit-print-color-adjust: exact !important;
                print-color-adjust: exact !important;
              }
              #cv-printable-area {
                position: static !important;
                left: 0 !important;
                top: 0 !important;
                transform: none !important;
                width: 100% !important;
                min-height: auto !important;
                margin: 0 !important;
                padding: 0 !important;
                box-shadow: none !important;
                border-radius: 0 !important;
                overflow: visible !important;
              }
              #cv-portal-root {
                position: static !important;
                display: block !important;
                padding: 0 !important;
                background: transparent !important;
                backdrop-filter: none !important;
                overflow: visible !important;
              }
              .cv-modal-overlay {
                position: static !important;
                display: block !important;
                width: auto !important;
                height: auto !important;
                padding: 0 !important;
                background: transparent !important;
                backdrop-filter: none !important;
                overflow: visible !important;
              }
              .cv-document {
                width: 100% !important;
                min-height: 297mm !important;
                padding: 12mm !important;
                box-shadow: none !important;
              }
              .no-print {
                display: none !important;
              }
              .cv-preview-shell {
                width: auto !important;
                height: auto !important;
              }
            }
            .cv-modal-overlay {
              position: fixed !important;
              inset: 0 !important;
              z-index: 999999 !important;
              background: rgba(0, 0, 0, 0.95) !important;
              backdrop-filter: blur(16px) !important;
              overflow: hidden !important;
              display: flex !important;
              align-items: center !important;
              justify-content: center !important;
              padding: 16px !important;
            }
          `}</style>

          <div id="cv-portal-root" className="cv-modal-overlay" onClick={onClose}>
            {/* Toolbar */}
            <div className="no-print absolute right-4 top-4 z-[1000000] flex gap-3" onClick={(e) => e.stopPropagation()}>
              <button
                onClick={handlePrint}
                className="flex items-center gap-2 px-4 py-3 md:px-6 md:py-3 bg-orange-500 hover:bg-orange-400 text-white text-xs md:text-sm font-bold rounded-xl shadow-2xl transition-all active:scale-95"
              >
                <iconify-icon icon="mdi:printer" width="20" height="20" />
                PRINT / SAVE AS PDF
              </button>
              <button
                onClick={onClose}
                className="w-11 h-11 flex items-center justify-center rounded-xl bg-white/10 hover:bg-white/20 text-white border border-white/20 transition-all"
              >
                <iconify-icon icon="mdi:close" width="26" height="26" />
              </button>
            </div>

            {/* Document Container */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="cv-preview-shell relative"
              style={{
                width: `${210 * (96 / 25.4) * previewScale}px`,
                height: `${297 * (96 / 25.4) * previewScale}px`,
              }}
            >
              <div
                id="cv-printable-area"
                className="relative w-[210mm] bg-white shadow-[0_0_100px_rgba(0,0,0,0.5)] rounded-lg overflow-hidden origin-top-left"
                style={{ transform: `scale(${previewScale})` }}
              >
                <div>
                  <CVDocument />
                </div>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(modalContent, document.body);
}
