"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink, ChevronDown, ChevronUp, Cpu, Database, LineChart, Layers, GitMerge } from "lucide-react";
import { GithubIcon } from "./Icons";

interface EvaluationMetrics {
  [key: string]: string;
}

interface TrainingParams {
  epochs: string;
  batchSize: string;
  optimizer: string;
  loss: string;
}

interface CaseStudy {
  overview: string;
  workflow: string[];
  dataset: string;
  model: string;
  training: TrainingParams;
  evaluation: string;
  accuracy: string;
  deployment: string;
  futureImprovements: string;
}

export interface ProjectData {
  id: string;
  name: string;
  period: string;
  tags: string[];
  problemStatement: string;
  solution: string;
  architecture: string;
  features: string[];
  challenges: string;
  results: string;
  metrics: EvaluationMetrics;
  githubUrl: string;
  liveUrl: string;
  caseStudy: CaseStudy;
}

interface ProjectCardProps {
  project: ProjectData;
}

export default function ProjectCard({ project }: ProjectCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpand = () => setIsExpanded(!isExpanded);

  return (
    <div
      className={`border rounded-xl bg-bg-card transition-all duration-300 ${
        isExpanded ? "border-white" : "border-border-dim hover:border-white"
      } overflow-hidden`}
    >
      <div className="p-6 md:p-8">
        {/* Main Card Header */}
        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
          <div>
            <span className="text-xs font-mono text-text-muted uppercase tracking-wider">{project.period}</span>
            <h3 className="text-2xl font-extrabold text-white mt-1 tracking-tight">{project.name}</h3>
          </div>
          
          <div className="flex gap-3">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 border border-border-dim hover:border-white rounded-lg text-text-secondary hover:text-white transition-colors"
                title="View GitHub Repository"
              >
                <GithubIcon size={18} />
              </a>
            )}

            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer"
                className="p-2 border border-border-dim hover:border-white rounded-lg text-text-secondary hover:text-white transition-colors"
                title="View Live Demo"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-2.5 py-1 text-xs border border-border-dim bg-black text-text-secondary rounded-full font-mono font-normal"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Core Description Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6">
          <div>
            <h4 className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">Problem Statement</h4>
            <p className="text-sm font-normal text-text-secondary leading-relaxed">{project.problemStatement}</p>
          </div>
          <div>
            <h4 className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">Technical Solution</h4>
            <p className="text-sm font-normal text-text-secondary leading-relaxed">{project.solution}</p>
          </div>
        </div>

        {/* High-level metrics block */}
        <div className="border-t border-b border-border-dim py-4 mb-6 grid grid-cols-3 gap-4 bg-black/40 px-4 rounded-xl">
          {Object.entries(project.metrics).map(([key, val]) => (
            <div key={key} className="text-center md:text-left">
              <span className="block text-[10px] font-mono text-text-muted uppercase tracking-wider">{key}</span>
              <span className="text-base md:text-xl font-extrabold text-white">{val}</span>
            </div>
          ))}
        </div>

        {/* Challenge & Results */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6">
          <div>
            <h4 className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">Core Engineering Challenge</h4>
            <p className="text-sm font-normal text-text-secondary leading-relaxed">{project.challenges}</p>
          </div>
          <div>
            <h4 className="text-xs font-mono text-text-muted uppercase tracking-wider mb-2">Business/Research Results</h4>
            <p className="text-sm font-normal text-text-secondary leading-relaxed">{project.results}</p>
          </div>
        </div>

        {/* Toggle Button */}
        <div className="flex justify-center mt-4">
          <button
            onClick={toggleExpand}
            className="flex items-center gap-2 px-5 py-2.5 border border-border-dim hover:border-white rounded-lg text-xs font-mono text-white transition-all bg-black uppercase tracking-wider hover:bg-bg-hover"
          >
            {isExpanded ? (
              <>
                Hide Case Study <ChevronUp size={14} />
              </>
            ) : (
              <>
                Read Case Study <ChevronDown size={14} />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Case Study Details Section (Animated Expand) */}
      <AnimatePresence initial={false}>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden border-t border-border-dim bg-[#0c0c0c]"
          >
            <div className="p-6 md:p-8 space-y-8 text-text-secondary divide-y divide-border-dim">
              
              {/* Overview & Architecture Diagram */}
              <div className="space-y-6 pt-2">
                <div>
                  <h4 className="text-xs font-mono text-white uppercase tracking-widest mb-3 flex items-center gap-2">
                    <Layers size={14} className="text-text-muted" /> Project Case Overview
                  </h4>
                  <p className="text-sm leading-relaxed">{project.caseStudy.overview}</p>
                </div>

                <div className="border border-border-dim rounded-xl p-6 bg-black">
                  <h4 className="text-xs font-mono text-text-muted uppercase tracking-widest mb-4 text-center">
                    Data Pipeline & Architecture Diagram
                  </h4>
                  
                  {/* Dynamic architecture diagram flowchart rendered in Tailwind and DOM */}
                  <div className="flex flex-col md:flex-row items-center justify-center gap-2 font-mono text-[11px] py-4">
                    {project.caseStudy.workflow.map((step, idx) => (
                      <React.Fragment key={idx}>
                        <div className="flex flex-col items-center justify-center p-3 border border-border-dim rounded-lg bg-bg-card max-w-[200px] text-center text-white font-semibold">
                          <span className="text-[9px] text-text-muted uppercase mb-1">Step 0{idx + 1}</span>
                          {step}
                        </div>
                        {idx < project.caseStudy.workflow.length - 1 && (
                          <div className="text-text-muted font-bold text-lg rotate-90 md:rotate-0 my-1 md:my-0">
                            →
                          </div>
                        )}
                      </React.Fragment>
                    ))}
                  </div>
                </div>
              </div>

              {/* Data & Model Configuration */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-8">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-mono text-white uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Database size={14} className="text-text-muted" /> Dataset Reference
                    </h4>
                    <p className="text-sm leading-relaxed">{project.caseStudy.dataset}</p>
                  </div>
                  <div>
                    <h4 className="text-xs font-mono text-white uppercase tracking-widest mb-2 flex items-center gap-2">
                      <Cpu size={14} className="text-text-muted" /> Model Architecture
                    </h4>
                    <p className="text-sm leading-relaxed">{project.caseStudy.model}</p>
                  </div>
                </div>

                <div className="border border-border-dim rounded-xl p-4 md:p-6 bg-black max-w-full">
                  <h4 className="text-xs font-mono text-white uppercase tracking-widest mb-4 flex items-center gap-2">
                    <GitMerge size={14} className="text-text-muted" /> Hyperparameter Config
                  </h4>
                  <div className="space-y-3 font-mono text-xs">
                    <div className="flex justify-between border-b border-border-dim pb-1.5">
                      <span className="text-text-muted">Training Epochs</span>
                      <span className="text-white">{project.caseStudy.training.epochs}</span>
                    </div>
                    <div className="flex justify-between border-b border-border-dim pb-1.5">
                      <span className="text-text-muted">Minibatch Size</span>
                      <span className="text-white">{project.caseStudy.training.batchSize}</span>
                    </div>
                    <div className="flex justify-between border-b border-border-dim pb-1.5">
                      <span className="text-text-muted">Optimization Node</span>
                      <span className="text-white">{project.caseStudy.training.optimizer}</span>
                    </div>
                    <div className="flex justify-between pb-0.5">
                      <span className="text-text-muted">Loss Formulation</span>
                      <span className="text-white text-right max-w-[200px] break-words">{project.caseStudy.training.loss}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Evaluation, Accuracy & Deployment */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
                <div>
                  <h4 className="text-xs font-mono text-white uppercase tracking-widest mb-2 flex items-center gap-2">
                    <LineChart size={14} className="text-text-muted" /> Evaluation Protocol
                  </h4>
                  <p className="text-sm leading-relaxed">{project.caseStudy.evaluation}</p>
                </div>
                <div>
                  <h4 className="text-xs font-mono text-white uppercase tracking-widest mb-2">Empirical Accuracy</h4>
                  <p className="text-sm leading-relaxed">{project.caseStudy.accuracy}</p>
                </div>
                <div>
                  <h4 className="text-xs font-mono text-white uppercase tracking-widest mb-2">Production Deployment</h4>
                  <p className="text-sm leading-relaxed font-mono text-white text-[12px] bg-black p-3.5 border border-border-dim rounded-lg">{project.caseStudy.deployment}</p>
                </div>
              </div>

              {/* Future Iterations */}
              <div className="pt-8">
                <h4 className="text-xs font-mono text-white uppercase tracking-widest mb-2">Planned Future Improvements</h4>
                <p className="text-sm leading-relaxed">{project.caseStudy.futureImprovements}</p>
              </div>

            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
