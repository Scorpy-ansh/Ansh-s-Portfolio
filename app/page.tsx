import React from "react";
import AnimatedBackground from "../components/AnimatedBackground";
import Navbar from "../sections/Navbar";
import Hero from "../sections/Hero";
import About from "../sections/About";
import ExEd from "../sections/ExEd";
import Skills from "../sections/Skills";
import ProjectsSection from "../sections/ProjectsSection";
import Research from "../sections/Research";
import CertsAndAchievements from "../sections/CertsAndAchievements";
import Contact from "../sections/Contact";
import Footer from "../sections/Footer";
import ResumeModalWrapper from "../components/ResumeModalWrapper";

export default function Home() {
  return (
    <div
      className="min-h-screen flex flex-col relative"
      style={{ backgroundColor: "var(--bg)", color: "var(--text)" }}
      suppressHydrationWarning
    >
      {/* Fixed animated dark background */}
      <AnimatedBackground />

      <Navbar />

      {/* Main Structural Framework */}
      <main className="flex-1 w-full flex flex-col">
        {/* Hero Section containing Physics Node animation canvas */}
        <Hero />

        {/* Section Profile About text and grid info */}
        <About />

        {/* Dynamic Project grid layout with filters */}
        <ProjectsSection />

        {/* Core Timeline metrics for Experience & Education */}
        <ExEd />

        {/* Category skills rounded tag labels */}
        <Skills />

        {/* Academic publications list and active domains */}
        <Research />

        {/* Multi-column Certifications and Achievements */}
        <CertsAndAchievements />

        {/* Contact credentials form card */}
        <Contact />
      </main>

      {/* Footer copyright and back actions */}
      <Footer />

      {/* Resume Modal */}
      <ResumeModalWrapper />
    </div>
  );
}
