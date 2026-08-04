"use client";

import React from "react";
import ContactForm from "../components/ContactForm";
import { Mail } from "lucide-react";

export default function Contact() {
  return (
    <section id="contact" className="py-20 border-b border-border-dim bg-black">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        
        {/* Section Heading */}
        <div className="flex items-center gap-3">
          <div className="p-2 border border-border-dim rounded-lg text-white bg-bg-card">
            <Mail size={18} />
          </div>
          <div className="select-none text-left">
            <h2 className="text-2xl font-extrabold text-white tracking-tight uppercase">
              Get in Touch
            </h2>
            <p className="text-xs font-mono text-text-muted mt-1 uppercase tracking-widest">
              Initiate communication, request detailed records, or schedule a technical chat
            </p>
          </div>
        </div>

        {/* Contact Form Element */}
        <div className="w-full">
          <ContactForm />
        </div>

      </div>
    </section>
  );
}
