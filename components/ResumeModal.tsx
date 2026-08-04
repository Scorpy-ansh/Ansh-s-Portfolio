"use client";

import React, { useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Download, X } from "lucide-react";
import profileData from "../data/profile.json";

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResumeModal({ isOpen, onClose }: ResumeModalProps) {
  // Close on Escape key
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, handleKeyDown]);

  const resumeUrl = "/resume";

  const handleDownload = () => {
    const a = document.createElement("a");
    a.href = resumeUrl;
    a.download = "Anshuman Resume.pdf";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  const handleOpenInNewWindow = () => {
    window.open(resumeUrl, "_blank", "noopener,noreferrer,width=900,height=700");
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-sm"
          />

          {/* Modal Panel */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, y: 40, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.97 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[101] flex items-center justify-center p-4 md:p-8 pointer-events-none"
          >
            <div
              className="pointer-events-auto relative w-full max-w-3xl max-h-[90vh] flex flex-col bg-black border border-[#2a2a2a] rounded-2xl shadow-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header Bar */}
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#2a2a2a] shrink-0 bg-[#111111]">
                <div>
                  <p className="text-[10px] font-mono text-[#8a8a8a] uppercase tracking-widest">Curriculum Vitae</p>
                  <h2 className="text-sm font-extrabold text-white tracking-tight">{profileData.name}</h2>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    onClick={handleOpenInNewWindow}
                    className="flex items-center gap-2 px-4 py-2 bg-[#1a1a1a] text-white hover:bg-[#2a2a2a] border border-[#3a3a3a] rounded-lg text-[10px] font-mono uppercase tracking-wider font-bold transition-colors"
                  >
                    <ArrowUpRight size={12} /> Open in New Window
                  </button>
                  <button
                    onClick={handleDownload}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-black hover:bg-[#e0e0e0] rounded-lg text-[10px] font-mono uppercase tracking-wider font-bold transition-colors"
                  >
                    <Download size={12} /> Download
                  </button>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-lg border border-[#2a2a2a] text-[#8a8a8a] hover:text-white hover:border-white transition-colors"
                    aria-label="Close resume"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>

              <div className="flex-1 bg-black">
                <iframe
                  title="Resume"
                  src={resumeUrl}
                  className="w-full h-full"
                />
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
