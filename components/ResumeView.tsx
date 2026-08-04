"use client";

import React from "react";
import { Download, Mail, MapPin, Briefcase, GraduationCap, Award, BookOpen } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import profileData from "../data/profile.json";
import educationData from "../data/education.json";
import experienceData from "../data/experience.json";
import skillsData from "../data/skills.json";
import researchData from "../data/research.json";

export default function ResumeView() {
  const handleDownload = () => {
    // Generate simple text-based CV representation or alert download is ready
    const resumeText = `
${profileData.name.toUpperCase()}
${profileData.title}
Location: ${profileData.location} | Email: ${profileData.email}
GitHub: ${profileData.githubUrl} | LinkedIn: ${profileData.linkedinUrl}

=========================================
EDUCATION
=========================================
${educationData
  .map(
    (edu) => `
${edu.university}
${edu.degree}
CGPA: ${edu.cgpa} | Duration: ${edu.duration}
Relevant Courses: ${edu.coursework.join(", ")}`
  )
  .join("\n")}

=========================================
EXPERIENCE
=========================================
${experienceData
  .map(
    (exp) => `
${exp.company} - ${exp.role} (${exp.duration})
${exp.description}
Achievements:
${exp.achievements.map((a) => `- ${a}`).join("\n")}
Tech Stack: ${exp.tech.join(", ")}`
  )
  .join("\n")}

=========================================
TECHNICAL SKILLS
=========================================
${skillsData.map((s) => `${s.category}: ${s.skills.join(", ")}`).join("\n")}

=========================================
PUBLICATIONS & RESEARCH
=========================================
Publications:
${researchData.publications.map((pub) => `- ${pub.title} (${pub.conference}) - DOI: ${pub.doi}`).join("\n")}
INTERESTS:
${researchData.interests.join(", ")}
`;

    // Download CV as proof-blank txt file fallback representation
    const blob = new Blob([resumeText], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = `${profileData.name.replace(/\s+/g, "_")}_Resume.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="w-full space-y-6">
      {/* Interactive LaTeX-style Paper Container */}
      <div className="w-full bg-[#fafafa] text-[#111111] p-6 md:p-12 rounded-xl shadow-lg border border-[#e5e5e5] font-serif max-w-4xl mx-auto overflow-x-auto selection:bg-[#111111] selection:text-[#fafafa]">
        <div className="min-w-[600px] space-y-6 text-left">
          
          {/* Header block */}
          <div className="text-center border-b border-[#cccccc] pb-6 space-y-2">
            <h2 className="text-3xl font-extrabold tracking-tight text-black">{profileData.name}</h2>
            <p className="text-sm font-sans uppercase tracking-widest text-[#555555] font-semibold">
              {profileData.title}
            </p>
            <div className="flex justify-center flex-wrap gap-4 text-xs font-sans text-[#666666] pt-1">
              <span className="flex items-center gap-1">
                <MapPin size={12} /> {profileData.location}
              </span>
              <span className="flex items-center gap-1">
                <Mail size={12} /> {profileData.email}
              </span>
              <a href={profileData.githubUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                <GithubIcon size={12} /> GitHub
              </a>
              <a href={profileData.linkedinUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1 hover:underline">
                <LinkedinIcon size={12} /> LinkedIn
              </a>
            </div>
          </div>

          {/* Education Row */}
          <div>
            <h3 className="text-sm font-sans font-bold uppercase tracking-wider text-black border-b border-[#dddddd] pb-1 mb-3 flex items-center gap-2">
              <GraduationCap size={16} /> Education
            </h3>
            <div className="space-y-4">
              {educationData.map((edu, idx) => (
                <div key={idx} className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <h4 className="text-sm font-bold text-black">{edu.university}</h4>
                    <p className="text-xs italic text-[#444444]">{edu.degree}</p>
                    <p className="text-xs font-sans text-[#555555]">
                      <span className="font-semibold text-black">Relevant Coursework:</span>{" "}
                      {edu.coursework.join(", ")}
                    </p>
                  </div>
                  <div className="text-right text-xs font-sans text-stone-600 shrink-0">
                    <p className="font-semibold">{edu.duration}</p>
                    <p className="bg-[#eeeeee] px-1.5 py-0.5 rounded text-black font-semibold mt-1">GPA: {edu.cgpa}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Row */}
          <div>
            <h3 className="text-sm font-sans font-bold uppercase tracking-wider text-black border-b border-[#dddddd] pb-1 mb-3 flex items-center gap-2">
              <Briefcase size={16} /> Professional Experience
            </h3>
            <div className="space-y-4">
              {experienceData.map((exp, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="flex justify-between items-start gap-4">
                    <div>
                      <h4 className="text-sm font-bold text-black">
                        {exp.company} <span className="font-normal text-[#555555]">| {exp.role}</span>
                      </h4>
                    </div>
                    <div className="text-right text-xs font-sans text-stone-600 shrink-0 font-semibold">
                      {exp.duration}
                    </div>
                  </div>
                  <p className="text-xs text-[#333333] leading-relaxed">{exp.description}</p>
                  <ul className="list-disc pl-5 text-xs text-[#444444] space-y-1">
                    {exp.achievements.map((ach, aIdx) => (
                      <li key={aIdx}>{ach}</li>
                    ))}
                  </ul>
                  <p className="text-[11px] font-sans text-[#555555] pt-0.5">
                    <span className="font-semibold text-black">Technologies utilized:</span> {exp.tech.join(", ")}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Publications & Research */}
          <div>
            <h3 className="text-sm font-sans font-bold uppercase tracking-wider text-black border-b border-[#dddddd] pb-1 mb-3 flex items-center gap-2">
              <BookOpen size={16} /> Selected Scientific Publications
            </h3>
            <div className="space-y-3">
              {researchData.publications.map((pub, idx) => (
                <div key={idx} className="text-xs">
                  <p className="text-black font-semibold">
                    &ldquo;{pub.title}&rdquo;
                  </p>
                  <p className="text-[#555555]">
                    {pub.conference} &bull; <span className="font-mono text-[10px]">{pub.doi}</span>
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Technical Skills Row */}
          <div>
            <h3 className="text-sm font-sans font-bold uppercase tracking-wider text-black border-b border-[#dddddd] pb-1 mb-3 flex items-center gap-2">
              <Award size={16} /> Technical Expertise
            </h3>
            <div className="grid grid-cols-1 gap-2 text-xs">
              {skillsData.map((cat, idx) => (
                <div key={idx} className="flex gap-2">
                  <span className="font-bold text-black w-[150px] shrink-0 font-sans">{cat.category}:</span>
                  <span className="text-[#333333]">{cat.skills.join(", ")}</span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
      <p className="text-[10px] font-mono text-center text-text-muted">
        Mockup formatted using LaTeX page parameters. Text selection remains active for copy-paste.
      </p>
    </div>
  );
}
