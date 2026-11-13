"use client";

import React, { useState, useEffect } from "react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import { Mail, Phone, MapPin, GraduationCap, Cpu } from "lucide-react";
import profileData from "../data/profile.json";
import educationData from "../data/education.json";

const TYPING_LINES = [
  "> Anshuman Pattanayak",
  "> AI / ML Engineer",
  `> Centurion University — CGPA ${educationData[0].cgpa.split(" /")[0]}`,
  "> Odisha, India",
  "> anshumanp1006@gmail.com",
];

const TOP_SKILLS = ["Python", "TensorFlow", "Scikit-Learn", "XGBoost", "SHAP", "NumPy", "SQL"];

export default function PixelAboutCard() {
  const [lineIdx, setLineIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [currentLine, setCurrentLine] = useState("");
  const [done, setDone] = useState(false);
  const [tick, setTick] = useState(0);

  // Typewriter effect
  useEffect(() => {
    if (done) return;

    const line = TYPING_LINES[lineIdx];
    if (charIdx < line.length) {
      const t = setTimeout(() => {
        setCurrentLine((p) => p + line[charIdx]);
        setCharIdx((p) => p + 1);
      }, 38);
      return () => clearTimeout(t);
    } else {
      const t = setTimeout(() => {
        setDisplayed((p) => [...p, currentLine]);
        setCurrentLine("");
        setCharIdx(0);
        if (lineIdx + 1 < TYPING_LINES.length) {
          setLineIdx((p) => p + 1);
        } else {
          setDone(true);
        }
      }, 300);
      return () => clearTimeout(t);
    }
  }, [lineIdx, charIdx, currentLine, done]);

  // Epoch counter animation
  useEffect(() => {
    const id = setInterval(() => setTick((p) => (p + 1) % 9999), 120);
    return () => clearInterval(id);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto lg:max-w-none">
      {/* Outer glow border */}
      <div
        className="relative rounded-2xl overflow-hidden"
        style={{
          border: "1px solid var(--border)",
          backgroundColor: "var(--bg-card)",
          boxShadow: "0 0 0 1px var(--border), inset 0 1px 0 rgba(255,255,255,0.04)",
        }}
      >
        {/* Scanline overlay */}
        <div className="scanline-overlay" aria-hidden />

        {/* ── HEADER BAR ── */}
        <div
          className="flex items-center justify-between px-4 py-2.5"
          style={{ borderBottom: "1px solid var(--border)", backgroundColor: "var(--bg-secondary)" }}
        >
          <div className="flex items-center gap-2">
            {/* Traffic dots */}
            <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f56] opacity-80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e] opacity-80" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27c93f] opacity-80" />
          </div>
          <span
            className="text-[10px] font-mono"
            style={{ color: "var(--text-muted)" }}
          >
            ANSHUMAN.exe — PROFILE
          </span>
          <span
            className="text-[9px] font-mono"
            style={{ color: "var(--text-muted)" }}
          >
            {String(tick).padStart(4, "0")}
          </span>
        </div>

        {/* ── TERMINAL BODY ── */}
        <div className="p-5 space-y-4">

          {/* Typing output */}
          <div className="space-y-1 min-h-[110px]">
            {displayed.map((line, i) => (
              <p
                key={i}
                className="text-xs font-mono"
                style={{
                  color: i === 0 ? "var(--text)" : "var(--text-secondary)",
                  fontWeight: i === 0 ? 700 : 400,
                }}
              >
                {line}
              </p>
            ))}
            {!done && (
              <p className="text-xs font-mono" style={{ color: "var(--text)" }}>
                {currentLine}
                <span className="cursor-blink inline-block w-[7px] h-3 ml-0.5 align-middle" style={{ backgroundColor: "var(--text)" }} />
              </p>
            )}
            {done && (
              <p className="text-xs font-mono" style={{ color: "var(--text)" }}>
                <span className="cursor-blink inline-block w-[7px] h-3 align-middle" style={{ backgroundColor: "var(--text)" }} />
              </p>
            )}
          </div>

          {/* Divider */}
          <div style={{ height: "1px", backgroundColor: "var(--border)" }} />

          {/* Quick stats grid */}
          <div className="grid grid-cols-2 gap-2.5">
            {[
              { icon: <GraduationCap size={11} />, label: "Degree", value: "B.Tech CSE" },
              { icon: <Cpu size={11} />, label: "CGPA", value: educationData[0].cgpa },
              { icon: <MapPin size={11} />, label: "Location", value: "Odisha, India" },
              { icon: <Phone size={11} />, label: "Phone", value: "+91 7735186824" },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-lg px-3 py-2"
                style={{ backgroundColor: "var(--bg-hover)", border: "1px solid var(--border)" }}
              >
                <div className="flex items-center gap-1 mb-0.5" style={{ color: "var(--text-muted)" }}>
                  {stat.icon}
                  <span className="text-[8px] font-mono uppercase tracking-widest">{stat.label}</span>
                </div>
                <p className="text-[11px] font-mono font-bold" style={{ color: "var(--text)" }}>
                  {stat.value}
                </p>
              </div>
            ))}
          </div>

          {/* Divider */}
          <div style={{ height: "1px", backgroundColor: "var(--border)" }} />

          {/* Skill pills */}
          <div>
            <p className="text-[9px] font-mono uppercase tracking-widest mb-2" style={{ color: "var(--text-muted)" }}>
              Core Stack
            </p>
            <div className="flex flex-wrap gap-1.5">
              {TOP_SKILLS.map((skill) => (
                <span
                  key={skill}
                  className="text-[9px] font-mono px-2 py-0.5 rounded"
                  style={{
                    border: "1px solid var(--border)",
                    color: "var(--text-secondary)",
                    backgroundColor: "var(--bg-secondary)",
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          {/* Divider */}
          <div style={{ height: "1px", backgroundColor: "var(--border)" }} />

          {/* Social links */}
          <div className="flex gap-4">
            <a
              href={profileData.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-[10px] font-mono transition-colors"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              <GithubIcon size={12} /> GitHub
            </a>
            <a
              href={profileData.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-1.5 text-[10px] font-mono transition-colors"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              <LinkedinIcon size={12} /> LinkedIn
            </a>
            <a
              href={`mailto:${profileData.email}`}
              className="flex items-center gap-1.5 text-[10px] font-mono transition-colors"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-muted)")}
            >
              <Mail size={12} /> Email
            </a>
          </div>
        </div>

        {/* Bottom status bar */}
        <div
          className="flex items-center justify-between px-4 py-1.5"
          style={{ borderTop: "1px solid var(--border)", backgroundColor: "var(--bg-secondary)" }}
        >
          <span className="text-[8px] font-mono" style={{ color: "var(--text-muted)" }}>
            SYS.INFO // OK
          </span>
          <span className="text-[8px] font-mono" style={{ color: "var(--text-muted)" }}>
            READY
          </span>
        </div>
      </div>
    </div>
  );
}
