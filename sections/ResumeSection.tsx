"use client";

import React from "react";
import ResumeView from "../components/ResumeView";
import { FileText } from "lucide-react";

export default function ResumeSection() {
  return (
    <section id="resume" className="py-20 border-b border-border-dim bg-black">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        
        {/* Section Heading */}
        <div className="flex items-center gap-3">
          <div className="p-2 border border-border-dim rounded-lg text-white bg-bg-card">
            <FileText size={18} />
          </div>
          <div className="select-none text-left">
            <h2 className="text-2xl font-extrabold text-white tracking-tight uppercase">
              Curriculum Vitae
            </h2>
            <p className="text-xs font-mono text-text-muted mt-1 uppercase tracking-widest">
              Review qualifications, courses, and engineering history
            </p>
          </div>
        </div>

        {/* Dynamic Mockup & Action Area */}
        <div className="w-full">
          <ResumeView />
        </div>

      </div>
    </section>
  );
}
