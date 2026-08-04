"use client";

import React, { useState } from "react";
import { useScrollActive } from "../hooks/useScrollActive";
import { Menu, X, Sun, Moon } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../components/Icons";
import { useTheme } from "../context/ThemeContext";
import { useResume } from "../context/ResumeContext";
import profileData from "../data/profile.json";

export default function Navbar() {
  const isScrolled = useScrollActive(20);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const { openModal } = useResume();

  const navLinks = [
    { name: "About", href: "#about" },
    { name: "Projects", href: "#projects" },
    { name: "Skills", href: "#skills" },
    {
      name: "Resume",
      action: () => {
        openModal();
        window.open("/resume", "_blank", "noopener,noreferrer,width=900,height=700");
      },
    },
    { name: "Contact", href: "#contact" },
  ];

  return (
    <header
      className="sticky top-0 z-50 w-full transition-all duration-300"
      style={{
        borderBottom: `1px solid ${isScrolled ? "var(--border)" : "transparent"}`,
        backgroundColor: isScrolled ? "var(--bg)" : "transparent",
        padding: isScrolled ? "12px 0" : "20px 0",
      }}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">

        {/* Name/logo */}
        <a
          href="#"
          className="text-sm font-extrabold tracking-widest uppercase transition-colors"
          style={{ color: "var(--text)" }}
        >
          {profileData.name}
        </a>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8 font-sans">
          {navLinks.map((link) => {
            if (link.action) {
              return (
                <button
                  key={link.name}
                  onClick={link.action}
                  className="text-xs font-mono uppercase tracking-wider transition-colors bg-transparent border-none p-0 cursor-pointer"
                  style={{ color: "var(--text-secondary)" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
                >
                  {link.name}
                </button>
              );
            }
            return (
              <a
                key={link.name}
                href={link.href}
                className="text-xs font-mono uppercase tracking-wider transition-colors"
                style={{ color: "var(--text-secondary)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
              >
                {link.name}
              </a>
            );
          })}

          <div style={{ width: 1, height: 12, backgroundColor: "var(--border)" }} />

          {/* Social icons */}
          <div className="flex items-center gap-4">
            <a
              href={profileData.githubUrl}
              target="_blank"
              rel="noreferrer"
              title="GitHub"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              <GithubIcon size={16} />
            </a>
            <a
              href={profileData.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              title="LinkedIn"
              style={{ color: "var(--text-secondary)" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--text-secondary)")}
            >
              <LinkedinIcon size={16} />
            </a>
          </div>

          <div style={{ width: 1, height: 12, backgroundColor: "var(--border)" }} />

          {/* Theme toggle */}
          <button
            onClick={toggle}
            title={theme === "dark" ? "Switch to light mode" : "Switch to dark mode"}
            className="p-1.5 rounded-md transition-colors"
            style={{
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.borderColor = "var(--text)";
              el.style.color = "var(--text)";
            }}
            onMouseLeave={(e) => {
              const el = e.currentTarget as HTMLButtonElement;
              el.style.borderColor = "var(--border)";
              el.style.color = "var(--text-secondary)";
            }}
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
        </nav>

        {/* Mobile: theme toggle + burger */}
        <div className="md:hidden flex items-center gap-3">
          <button
            onClick={toggle}
            title="Toggle theme"
            className="p-1.5 rounded-md"
            style={{ border: "1px solid var(--border)", color: "var(--text-secondary)" }}
          >
            {theme === "dark" ? <Sun size={14} /> : <Moon size={14} />}
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ color: "var(--text-secondary)" }}
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div
          className="md:hidden px-6 py-6 space-y-6 flex flex-col font-sans"
          style={{ borderBottom: "1px solid var(--border)", backgroundColor: "var(--bg)" }}
        >
          <nav className="flex flex-col gap-4">
            {navLinks.map((link) => {
              if (link.action) {
                return (
                  <button
                    key={link.name}
                    onClick={() => {
                      setMobileMenuOpen(false);
                      link.action();
                    }}
                    className="text-sm font-mono uppercase tracking-wider transition-colors bg-transparent border-none p-0 cursor-pointer text-left"
                    style={{ color: "var(--text-secondary)" }}
                  >
                    {link.name}
                  </button>
                );
              }
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="text-sm font-mono uppercase tracking-wider transition-colors"
                  style={{ color: "var(--text-secondary)" }}
                >
                  {link.name}
                </a>
              );
            })}
          </nav>
          <div style={{ height: 1, backgroundColor: "var(--border)" }} />
          <div className="flex gap-6">
            <a
              href={profileData.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs font-mono transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              <GithubIcon size={16} /> GitHub
            </a>
            <a
              href={profileData.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs font-mono transition-colors"
              style={{ color: "var(--text-secondary)" }}
            >
              <LinkedinIcon size={16} /> LinkedIn
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
