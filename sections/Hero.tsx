"use client";

import React, { useState } from "react";
import PixelAboutCard from "../components/PixelAboutCard";
import ResumeModal from "../components/ResumeModal";
import { Mail, MapPin, GraduationCap, ArrowRight, FileText } from "lucide-react";
import profileData from "../data/profile.json";

export default function Hero() {
  const [resumeOpen, setResumeOpen] = useState(false);

  return (
    <>
      <section
        className="relative w-full py-12 md:py-24 border-b"
        style={{ borderColor: "var(--border)" }}
      >
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">

          {/* ── LEFT: Text + CTA ── */}
          <div className="lg:col-span-7 space-y-8 text-left">
            <div className="space-y-4">
              <span
                className="text-xs font-mono tracking-[0.25em] uppercase block"
                style={{ color: "var(--text-muted)" }}
              >
                Portfolio Architect
              </span>
              <h1
                className="text-4xl md:text-6xl font-extrabold tracking-tight leading-[1.05]"
                style={{ color: "var(--text)" }}
              >
                {profileData.name}
              </h1>
              <p
                className="text-lg md:text-xl font-semibold tracking-tight"
                style={{ color: "var(--text)" }}
              >
                {profileData.title}
              </p>
              <p
                className="text-sm md:text-base font-normal leading-relaxed max-w-xl"
                style={{ color: "var(--text-secondary)" }}
              >
                {profileData.subtitle}
              </p>
            </div>

            {/* Metadata tags */}
            <div
              className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono border-t pt-6 max-w-lg"
              style={{ borderColor: "var(--border)", color: "var(--text-muted)" }}
            >
              <div className="flex items-center gap-2">
                <MapPin size={14} style={{ color: "var(--text-secondary)" }} />
                <span>{profileData.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail size={14} style={{ color: "var(--text-secondary)" }} />
                <a
                  href={`mailto:${profileData.email}`}
                  className="hover:underline transition-colors truncate"
                  style={{ color: "var(--text-muted)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
                >
                  {profileData.email}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap size={14} style={{ color: "var(--text-secondary)" }} />
                <span>{profileData.university}</span>
              </div>
              <div className="flex items-center gap-2">
                <GraduationCap size={14} style={{ color: "var(--text-secondary)" }} />
                <span>{profileData.expectedGraduation}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-wrap gap-4 pt-4">
              <a
                href="#projects"
                className="flex items-center gap-2 px-5 py-3 font-mono text-xs uppercase tracking-wider rounded-lg transition-colors font-semibold"
                style={{ backgroundColor: "var(--text)", color: "var(--bg)" }}
                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
              >
                View Projects <ArrowRight size={14} />
              </a>
              <button
                onClick={() => setResumeOpen(true)}
                className="flex items-center gap-2 px-5 py-3 font-mono text-xs uppercase tracking-wider rounded-lg transition-colors"
                style={{
                  border: "1px solid var(--border)",
                  color: "var(--text)",
                  backgroundColor: "transparent",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--text)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
                }}
              >
                <FileText size={14} /> Explore Resume
              </button>
            </div>
          </div>

          {/* ── RIGHT: Pixel About Card ── */}
          <div className="lg:col-span-5 w-full">
            <PixelAboutCard />
          </div>

        </div>
      </section>

      <ResumeModal isOpen={resumeOpen} onClose={() => setResumeOpen(false)} />
    </>
  );
}
