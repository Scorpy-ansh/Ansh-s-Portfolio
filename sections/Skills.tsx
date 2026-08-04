"use client";

import React from "react";
import skillsData from "../data/skills.json";

export default function Skills() {
  return (
    <section id="skills" className="py-20 border-b border-border-dim bg-black">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        
        {/* Section Heading */}
        <div className="select-none text-left">
          <h2 className="text-3xl font-extrabold text-white tracking-tight uppercase">
            Technical Expertise
          </h2>
          <p className="text-xs font-mono text-text-muted mt-2 uppercase tracking-widest">
            Core capabilities, frameworks, and engineering languages
          </p>
        </div>

        {/* Skills Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillsData.map((categoryGroup, idx) => (
            <div
              key={idx}
              className="border border-border-dim rounded-xl p-6 bg-bg-card transition-colors duration-300 hover:border-white flex flex-col justify-between"
            >
              <div className="space-y-4">
                <h3 className="text-xs font-mono text-white uppercase tracking-wider border-b border-border-dim pb-2.5">
                  {categoryGroup.category}
                </h3>
                
                <div className="flex flex-wrap gap-2 pt-1">
                  {categoryGroup.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1.5 text-xs font-mono border border-border-dim hover:border-white bg-[#0e0e0e] text-text-secondary hover:text-white rounded-full transition-colors select-none"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              {/* Small graphic accent representing Vercel design */}
              <div className="flex justify-end pt-6">
                <span className="text-[8px] font-mono text-text-muted">
                  SYS.MOD_{idx + 1}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
