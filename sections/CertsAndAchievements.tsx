import React from "react";
import { readdir } from "node:fs/promises";
import path from "node:path";
import { ArrowUpRight, ShieldCheck } from "lucide-react";

type CertificationFile = {
  fileName: string;
  title: string;
  href: string;
};

async function getCertificationFiles(): Promise<CertificationFile[]> {
  const dirPath = path.join(process.cwd(), "certifications");

  const files = await readdir(dirPath).catch(() => []);
  const allowedExt = new Set([".pdf", ".png", ".jpg", ".jpeg", ".webp"]);

  return files
    .filter((file) => allowedExt.has(path.extname(file).toLowerCase()))
    .sort((a, b) => a.localeCompare(b))
    .map((fileName) => ({
      fileName,
      title: path.basename(fileName, path.extname(fileName)),
      href: `/certifications/${encodeURIComponent(fileName)}`,
    }));
}

export default async function CertsAndAchievements() {
  const certifications = await getCertificationFiles();

  return (
    <section className="py-20 border-b border-border-dim bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="p-2 border border-border-dim rounded-lg text-white bg-bg-card">
              <ShieldCheck size={18} />
            </div>
            <h2 className="text-2xl font-extrabold text-white tracking-tight uppercase">
              Certifications
            </h2>
          </div>

          <div className="relative border-l border-border-dim ml-4 pl-6 space-y-8">
            {certifications.length === 0 ? (
              <p className="text-xs font-mono text-text-muted uppercase tracking-widest">
                Coming soon
              </p>
            ) : (
              certifications.map((cert) => (
                <div key={cert.fileName} className="relative group">
                  <div className="absolute -left-[31px] top-1.5 w-3 h-3 bg-black border border-border-dim rounded-full transition-colors group-hover:border-white" />

                  <div className="space-y-1.5">
                    <h3 className="text-sm font-extrabold text-white leading-snug">
                      {cert.title}
                    </h3>

                    <a
                      href={cert.href}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-1 text-[10px] font-mono text-text-muted hover:text-white transition-colors pt-1"
                    >
                      View Certificate <ArrowUpRight size={10} />
                    </a>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
