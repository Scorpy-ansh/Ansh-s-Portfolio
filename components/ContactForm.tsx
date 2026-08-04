"use client";

import React, { useState } from "react";
import { Mail, MapPin, Send, Check, Loader2, AlertCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons";
import profileData from "../data/profile.json";

interface FormErrors {
  name?: string;
  email?: string;
  message?: string;
}

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    honeypot: "", // hidden spam prevention field
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const [serverMessage, setServerMessage] = useState<string | null>(null);

  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    const nameTrimmed = formData.name.trim();
    const emailTrimmed = formData.email.trim();
    const messageTrimmed = formData.message.trim();

    if (!nameTrimmed) {
      newErrors.name = "Full Name is required.";
    } else if (nameTrimmed.length < 2) {
      newErrors.name = "Name must be at least 2 characters.";
    }

    if (!emailTrimmed) {
      newErrors.email = "Email Address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailTrimmed)) {
      newErrors.email = "Please enter a valid email address.";
    }

    if (!messageTrimmed) {
      newErrors.message = "Message is required.";
    } else if (messageTrimmed.length < 5) {
      newErrors.message = "Message must be at least 5 characters.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setServerMessage(null);

    if (!validate()) {
      return;
    }

    setStatus("sending");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Failed to transmit message.");
      }

      setStatus("success");
      setServerMessage(result.message || "Transmission Encrypted & Sent");
      setFormData({ name: "", email: "", message: "", honeypot: "" });
      setErrors({});

      setTimeout(() => {
        setStatus("idle");
        setServerMessage(null);
      }, 5000);
    } catch (err: unknown) {
      setStatus("error");
      const errMsg = err instanceof Error ? err.message : "An error occurred while sending.";
      setServerMessage(errMsg);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 font-sans">
      {/* Contact Details Column */}
      <div className="lg:col-span-5 space-y-8">
        <div>
          <h3 className="text-xl font-extrabold text-white mb-3">Get in touch</h3>
          <p className="text-sm font-normal text-text-secondary leading-relaxed">
            Interested in collaborating on AI, machine learning, or full-stack development? I'm actively seeking internships, research opportunities, and challenging projects where I can build impactful solutions.
          </p>
        </div>

        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="p-2.5 border border-border-dim rounded-lg text-text-muted bg-bg-card">
              <Mail size={16} />
            </div>
            <div>
              <span className="block text-[10px] font-mono text-text-muted uppercase">Email Address</span>
              <a href={`mailto:${profileData.email}`} className="text-sm text-white hover:underline">
                {profileData.email}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <div className="p-2.5 border border-border-dim rounded-lg text-text-muted bg-bg-card">
              <MapPin size={16} />
            </div>
            <div>
              <span className="block text-[10px] font-mono text-text-muted uppercase">Location</span>
              <span className="text-sm text-white">{profileData.location}</span>
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border-dim space-y-4">
          <h4 className="text-xs font-mono text-text-muted uppercase">Network Profiles</h4>
          <div className="flex gap-4">
            <a
              href={profileData.githubUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs font-mono text-text-secondary hover:text-white transition-colors"
            >
              <GithubIcon size={14} /> GitHub
            </a>
            <a
              href={profileData.linkedinUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 text-xs font-mono text-text-secondary hover:text-white transition-colors"
            >
              <LinkedinIcon size={14} /> LinkedIn
            </a>
          </div>
        </div>
      </div>

      {/* Form Submission Column */}
      <form onSubmit={handleSubmit} className="lg:col-span-7 space-y-6" noValidate>
        {/* Hidden Honeypot field for bot trap */}
        <div style={{ display: "none" }} aria-hidden="true">
          <label htmlFor="form-honeypot">Leave this blank</label>
          <input
            id="form-honeypot"
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={formData.honeypot}
            onChange={(e) => setFormData({ ...formData, honeypot: e.target.value })}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="form-name" className="block text-xs font-mono text-text-secondary uppercase mb-2">
              Full Name <span className="text-red-400">*</span>
            </label>
            <input
              id="form-name"
              type="text"
              required
              disabled={status === "sending"}
              autoComplete="name"
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              value={formData.name}
              onChange={(e) => {
                setFormData({ ...formData, name: e.target.value });
                if (errors.name) setErrors({ ...errors, name: undefined });
              }}
              placeholder="e.g. John Doe"
              className={`w-full bg-black border ${
                errors.name ? "border-red-500" : "border-border-dim focus:border-white"
              } rounded-lg p-3 text-sm text-white font-sans placeholder:text-text-muted outline-none transition-all disabled:opacity-50`}
            />
            {errors.name && (
              <p id="name-error" className="text-xs font-mono text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle size={10} /> {errors.name}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="form-email" className="block text-xs font-mono text-text-secondary uppercase mb-2">
              Email Address <span className="text-red-400">*</span>
            </label>
            <input
              id="form-email"
              type="email"
              required
              disabled={status === "sending"}
              autoComplete="email"
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              value={formData.email}
              onChange={(e) => {
                setFormData({ ...formData, email: e.target.value });
                if (errors.email) setErrors({ ...errors, email: undefined });
              }}
              placeholder="e.g. john@university.edu"
              className={`w-full bg-black border ${
                errors.email ? "border-red-500" : "border-border-dim focus:border-white"
              } rounded-lg p-3 text-sm text-white font-sans placeholder:text-text-muted outline-none transition-all disabled:opacity-50`}
            />
            {errors.email && (
              <p id="email-error" className="text-xs font-mono text-red-400 mt-1 flex items-center gap-1">
                <AlertCircle size={10} /> {errors.email}
              </p>
            )}
          </div>
        </div>

        <div>
          <label htmlFor="form-message" className="block text-xs font-mono text-text-secondary uppercase mb-2">
            Message details <span className="text-red-400">*</span>
          </label>
          <textarea
            id="form-message"
            rows={5}
            required
            disabled={status === "sending"}
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={errors.message ? "message-error" : undefined}
            value={formData.message}
            onChange={(e) => {
              setFormData({ ...formData, message: e.target.value });
              if (errors.message) setErrors({ ...errors, message: undefined });
            }}
            placeholder="Type your message details here..."
            className={`w-full bg-black border ${
              errors.message ? "border-red-500" : "border-border-dim focus:border-white"
            } rounded-lg p-3 text-sm text-white font-sans placeholder:text-text-muted outline-none resize-none transition-all disabled:opacity-50`}
          />
          {errors.message && (
            <p id="message-error" className="text-xs font-mono text-red-400 mt-1 flex items-center gap-1">
              <AlertCircle size={10} /> {errors.message}
            </p>
          )}
        </div>

        {/* Server status alert message */}
        {serverMessage && (
          <div
            className={`p-3 rounded-lg border text-xs font-mono flex items-center gap-2 ${
              status === "success"
                ? "bg-emerald-950/40 border-emerald-500/50 text-emerald-300"
                : "bg-red-950/40 border-red-500/50 text-red-300"
            }`}
          >
            {status === "success" ? <Check size={14} /> : <AlertCircle size={14} />}
            <span>{serverMessage}</span>
          </div>
        )}

        <button
          type="submit"
          disabled={status === "sending"}
          className={`w-full flex items-center justify-center gap-2 p-3 rounded-lg border text-xs font-mono uppercase tracking-wider transition-all duration-300 ${
            status === "success"
              ? "bg-white text-black border-white"
              : status === "sending"
              ? "bg-bg-hover text-text-muted border-border-dim cursor-not-allowed"
              : "bg-black text-white border-white hover:bg-white hover:text-black cursor-pointer"
          }`}
        >
          {status === "idle" && (
            <>
              Transmit Message <Send size={12} />
            </>
          )}
          {status === "sending" && (
            <>
              Transmitting... <Loader2 size={12} className="animate-spin" />
            </>
          )}
          {status === "success" && (
            <>
              Transmission Encrypted & Sent <Check size={12} />
            </>
          )}
          {status === "error" && (
            <>
              Retry Transmission <Send size={12} />
            </>
          )}
        </button>
      </form>
    </div>
  );
}
