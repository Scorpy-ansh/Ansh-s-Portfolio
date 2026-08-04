"use client";

import React from "react";
import researchData from "../data/research.json";
import { HelpCircle } from "lucide-react";

export default function Research() {
  return (
    <section id="research" className="py-20 border-b border-border-dim bg-black">
      <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Research Interests Grid */}
        <div className="lg:col-span-5 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-white tracking-tight uppercase">
              Research Domains
            </h2>
            <p className="text-xs font-mono text-text-muted uppercase tracking-widest">
              Fields of active inquiry and computational research
            </p>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            {researchData.interests.map((interest) => (
              <div
                key={interest}
                className="p-3 border border-border-dim hover:border-white rounded-lg bg-bg-card transition-colors flex items-center justify-between group"
              >
                <span className="text-xs font-mono text-text-secondary group-hover:text-white transition-colors">
                  {interest}
                </span>
                <HelpCircle size={10} className="text-text-muted group-hover:text-white transition-colors" />
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Publications Timeline/Cards */}
        <div className="lg:col-span-7 space-y-6">
          <div className="space-y-2">
            <h2 className="text-2xl font-extrabold text-white tracking-tight uppercase flex items-center gap-2">
              Publications
            </h2>
            <p className="text-xs font-mono text-text-muted uppercase tracking-widest">
              Scientific papers published in workshops, conferences, and journals
            </p>
          </div>

          <div className="pt-2">
            <div className="border border-border-dim rounded-xl p-8 bg-bg-card">
              <p className="text-sm font-mono text-text-muted uppercase tracking-widest">
                Coming soon
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
