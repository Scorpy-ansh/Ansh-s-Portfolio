"use client";

import React from "react";
import { ArrowUp } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "../components/Icons";
import profileData from "../data/profile.json";

export default function Footer() {
  const scrollToTop = (e: React.MouseEvent) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-border-dim bg-black py-8 pr-1">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-6 font-sans">
        
        {/* Left copyright and credits */}
        <div className="flex flex-col items-center sm:items-start gap-1 select-none">
          <p className="text-xs text-text-muted">
            &copy; {currentYear} {profileData.name}. All rights reserved.
          </p>
          <p className="text-[10px] font-mono text-text-muted">
            Built using Next.js &bull; Inter Font Face &bull; Monochrome Design
          </p>
        </div>

        {/* Right side controls */}
        <div className="flex items-center gap-6">
          
          {/* Social Icons list */}
          <div className="flex items-center gap-4">
            <a
              href={profileData.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="text-text-muted hover:text-white transition-colors"
              title="GitHub Profile"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href={profileData.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="text-text-muted hover:text-white transition-colors"
              title="LinkedIn Profile"
            >
              <LinkedinIcon size={16} />
            </a>
          </div>


          <span className="w-[1px] h-3 bg-border-dim hidden sm:block" />

          {/* Return Top Button */}
          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-1.5 border border-border-dim hover:border-white rounded-md text-[10px] font-mono uppercase text-text-secondary hover:text-white transition-colors"
            title="Scroll to top of page"
          >
            Top <ArrowUp size={10} />
          </button>
        </div>

      </div>
    </footer>
  );
}
