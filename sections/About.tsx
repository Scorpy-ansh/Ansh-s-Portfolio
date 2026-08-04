"use client";

import React from "react";
import profileData from "../data/profile.json";

export default function About() {
  return (
    <section id="about" className="layout-section py-20 border-b border-border-dim bg-black">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        
        {/* Left Column - Section Heading */}
        <div className="lg:col-span-4 select-none">
          <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase">
            About Me
          </h2>
          <div className="w-12 h-[2px] bg-white mt-4 hidden lg:block" />
        </div>

        {/* Right Column - Descriptive bio and metadata stats */}
        <div className="lg:col-span-8 space-y-8">
          <p className="text-base text-text-secondary leading-relaxed font-normal">
            {profileData.aboutParagraph}
          </p>

          {/* Stats Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-border-dim">
            <div className="space-y-1">
              <span className="block text-xs font-mono text-text-muted uppercase tracking-wider">
                Experience Duration
              </span>
              <span className="text-sm text-white font-semibold block">
                {profileData.yearsCoding}
              </span>
            </div>

            <div className="space-y-1">
              <span className="block text-xs font-mono text-text-muted uppercase tracking-wider">
                Languages Spoken
              </span>
              <span className="text-sm text-white font-semibold block">
                {profileData.languages}
              </span>
            </div>

            <div className="space-y-1">
              <span className="block text-xs font-mono text-text-muted uppercase tracking-wider">
                Primary Interests
              </span>
              <span className="text-sm text-white font-semibold block">
                {profileData.interests}
              </span>
            </div>

            <div className="space-y-1">
              <span className="block text-xs font-mono text-text-muted uppercase tracking-wider">
                Active Research Focus
              </span>
              <span className="text-sm text-white font-semibold block">
                {profileData.currentFocus}
              </span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
