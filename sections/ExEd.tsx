"use client";

import React from "react";
import experienceData from "../data/experience.json";
import educationData from "../data/education.json";
import { Briefcase, GraduationCap } from "lucide-react";

export default function ExEd() {
  return (
    <section id="experience" className="py-20 border-b border-border-dim bg-black">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Experience Timeline Column */}
        <div className="lg:col-span-6 space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 border border-border-dim rounded-lg text-white bg-bg-card">
              <Briefcase size={18} />
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight uppercase">
              Experience
            </h2>
          </div>

          <div className="relative border-l border-border-dim ml-4 pl-6 space-y-10">
            {experienceData.map((exp, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline node dot */}
                <div className="absolute -left-[31px] top-1.5 w-3 h-3 bg-black border border-border-dim rounded-full transition-colors group-hover:border-white" />
                
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div>
                      <h3 className="text-base font-extrabold text-white">{exp.role}</h3>
                      <p className="text-sm font-mono text-text-secondary">{exp.company}</p>
                    </div>
                    <span className="text-xs font-mono text-text-muted bg-bg-card border border-border-dim px-2.5 py-1 rounded-md">
                      {exp.duration}
                    </span>
                  </div>

                  <p className="text-xs text-text-secondary leading-relaxed">
                    {exp.description}
                  </p>

                  <ul className="list-disc pl-4 text-xs text-text-muted space-y-1 leading-relaxed">
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx}>{ach}</li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-1.5">
                    {exp.tech.map((t) => (
                      <span
                        key={t}
                        className="text-[10px] font-mono border border-border-dim px-2 py-0.5 rounded bg-black text-text-secondary"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education Timeline Column */}
        <div className="lg:col-span-6 space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 border border-border-dim rounded-lg text-white bg-bg-card">
              <GraduationCap size={18} />
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight uppercase">
              Education
            </h2>
          </div>

          <div className="relative border-l border-border-dim ml-4 pl-6 space-y-10">
            {educationData.map((edu, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline node dot */}
                <div className="absolute -left-[31px] top-1.5 w-3 h-3 bg-black border border-border-dim rounded-full transition-colors group-hover:border-white" />

                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div>
                      <h3 className="text-base font-extrabold text-white">{edu.university}</h3>
                      <p className="text-sm font-mono text-text-secondary">{edu.degree}</p>
                    </div>
                    <span className="text-xs font-mono text-text-muted bg-bg-card border border-border-dim px-2.5 py-1 rounded-md">
                      {edu.duration}
                    </span>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono text-text-muted uppercase">Cumulative GPA:</span>
                    <span className="text-xs font-mono font-bold text-white bg-[#1a1a1a] px-1.5 py-0.5 rounded">
                      {edu.cgpa}
                    </span>
                  </div>

                  <div>
                    <span className="block text-[10px] font-mono text-text-muted uppercase mb-1">
                      Curriculum Highlights
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {edu.coursework.map((course) => (
                        <span
                          key={course}
                          className="text-[10px] font-mono border border-border-dim px-2 py-0.5 rounded bg-black text-text-secondary"
                        >
                          {course.split(":")[0]}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
