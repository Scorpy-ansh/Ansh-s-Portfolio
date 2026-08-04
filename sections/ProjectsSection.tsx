"use client";

import React, { useState, useEffect, useMemo, useCallback } from "react";
import ProjectCard, { ProjectData } from "../components/ProjectCard";
import projectsData from "../data/projects.json";
import {
  Search,
  Filter,
  ChevronDown,
  Star,
  GitFork,
  ExternalLink,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { GithubIcon } from "../components/Icons";

/* ── GitHub repo shape ── */
interface GithubRepo {
  id: number;
  name: string;
  full_name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  topics: string[];
  updated_at: string;
  fork: boolean;
  private: boolean;
}

const GITHUB_USER = "Scorpy-ansh";

/* Language → subtle badge color */
const LANG_COLOR: Record<string, string> = {
  Python: "#3572A5",
  JavaScript: "#f1e05a",
  TypeScript: "#3178c6",
  HTML: "#e34c26",
  CSS: "#563d7c",
  Jupyter: "#DA5B0B",
  Shell: "#89e051",
  Java: "#b07219",
  C: "#555555",
};

function RepoCard({ repo }: { repo: GithubRepo }) {
  const [ago, setAgo] = useState<string>("");
  const dot = LANG_COLOR[repo.language ?? ""] ?? "#8a8a8a";

  useEffect(() => {
    const now = Date.now();
    const d = Math.floor(
      (now - new Date(repo.updated_at).getTime()) / 86400000
    );
    if (d === 0) setAgo("today");
    else if (d === 1) setAgo("yesterday");
    else if (d < 30) setAgo(`${d}d ago`);
    else if (d < 365) setAgo(`${Math.floor(d / 30)}mo ago`);
    else setAgo(`${Math.floor(d / 365)}y ago`);
  }, [repo.updated_at]);

  return (
    <div
      className="group rounded-xl p-5 flex flex-col gap-3 transition-all duration-200"
      style={{
        border: "1px solid var(--border)",
        backgroundColor: "var(--bg-card)",
      }}
      onMouseEnter={(e) =>
        ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--text)")
      }
      onMouseLeave={(e) =>
        ((e.currentTarget as HTMLDivElement).style.borderColor = "var(--border)")
      }
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
      <GithubIcon size={14} style={{ color: "var(--text-muted)", flexShrink: 0 }} />
          <h3
            className="text-sm font-bold font-mono truncate"
            style={{ color: "var(--text)" }}
          >
            {repo.name}
          </h3>
        </div>
        <a
          href={repo.html_url}
          target="_blank"
          rel="noreferrer"
          className="shrink-0 transition-colors"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--text)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--text-muted)")
          }
          title="Open on GitHub"
        >
          <ExternalLink size={13} />
        </a>
      </div>

      {/* Description */}
      <p
        className="text-xs leading-relaxed line-clamp-2 flex-1"
        style={{ color: "var(--text-secondary)" }}
      >
        {repo.description ?? "No description provided."}
      </p>

      {/* Topics */}
      {repo.topics.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {repo.topics.slice(0, 4).map((t) => (
            <span
              key={t}
              className="text-[9px] font-mono px-1.5 py-0.5 rounded"
              style={{
                border: "1px solid var(--border)",
                color: "var(--text-muted)",
                backgroundColor: "var(--bg-secondary)",
              }}
            >
              {t}
            </span>
          ))}
        </div>
      )}

      {/* Footer meta */}
      <div
        className="flex items-center gap-4 text-[10px] font-mono pt-1"
        style={{ borderTop: "1px solid var(--border)", paddingTop: 8, color: "var(--text-muted)" }}
      >
        {repo.language && (
          <span className="flex items-center gap-1">
            <span
              className="w-2 h-2 rounded-full inline-block"
              style={{ backgroundColor: dot }}
            />
            {repo.language}
          </span>
        )}
        <span className="flex items-center gap-1">
          <Star size={10} /> {repo.stargazers_count}
        </span>
        <span className="flex items-center gap-1">
          <GitFork size={10} /> {repo.forks_count}
        </span>
        <span className="ml-auto">{ago}</span>
      </div>
    </div>
  );
}

export default function ProjectsSection() {
  /* ── core projects state ── */
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");

  /* ── github state ── */
  const [showGithub, setShowGithub] = useState(false);
  const [githubRepos, setGithubRepos] = useState<GithubRepo[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [fetched, setFetched] = useState(false);

  const projects = projectsData as unknown as ProjectData[];

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    tags.add("All");
    projects.forEach((proj) => proj.tags.forEach((t) => tags.add(t)));
    return Array.from(tags);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesSearch =
        project.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.problemStatement.toLowerCase().includes(searchQuery.toLowerCase()) ||
        project.tags.some((t) =>
          t.toLowerCase().includes(searchQuery.toLowerCase())
        );
      const matchesTag =
        selectedTag === "All" || project.tags.includes(selectedTag);
      return matchesSearch && matchesTag;
    });
  }, [projects, searchQuery, selectedTag]);

  /* ── fetch github repos ── */
  const fetchGithub = useCallback(async () => {
    if (fetched) {
      setShowGithub((v) => !v);
      return;
    }
    setShowGithub(true);
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=updated&type=owner`,
        { headers: { Accept: "application/vnd.github+json" } }
      );
      if (!res.ok) throw new Error(`GitHub API error: ${res.status}`);
      const data: GithubRepo[] = await res.json();
      // filter out forks and private
      setGithubRepos(
        data.filter((r) => !r.fork && !r.private).sort(
          (a, b) =>
            new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        )
      );
      setFetched(true);
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "Failed to load repositories");
    } finally {
      setLoading(false);
    }
  }, [fetched]);

  return (
    <section
      id="projects"
      className="py-20 border-b"
      style={{ borderColor: "var(--border)" }}
    >
      <div className="max-w-6xl mx-auto px-6 space-y-12">

        {/* ── Section header ── */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div className="select-none text-left">
            <h2
              className="text-3xl font-extrabold tracking-tight uppercase"
              style={{ color: "var(--text)" }}
            >
              Core Engineering Projects
            </h2>
            <p
              className="text-xs font-mono mt-2 uppercase tracking-widest"
              style={{ color: "var(--text-muted)" }}
            >
              Production systems, model training workflows, and deployment cases
            </p>
          </div>
        </div>

        {/* ── Filter toolbar ── */}
        <div
          className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center border-t border-b py-4"
          style={{ borderColor: "var(--border)" }}
        >
          {/* Search */}
          <div className="relative w-full md:max-w-sm">
            <Search
              className="absolute left-3.5 top-1/2 -translate-y-1/2"
              size={14}
              style={{ color: "var(--text-muted)" }}
            />
            <input
              type="text"
              placeholder="Search projects…"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg pl-10 pr-4 py-2 text-xs font-mono outline-none transition-all"
              style={{
                backgroundColor: "var(--bg-secondary)",
                border: "1px solid var(--border)",
                color: "var(--text)",
              }}
              onFocus={(e) =>
                (e.currentTarget.style.borderColor = "var(--text)")
              }
              onBlur={(e) =>
                (e.currentTarget.style.borderColor = "var(--border)")
              }
            />
          </div>

          {/* Tag pills */}
          <div className="flex flex-wrap gap-2 items-center max-w-full overflow-x-auto pb-1 md:pb-0">
            <span
              className="text-[10px] font-mono uppercase flex items-center gap-1.5 mr-2 shrink-0"
              style={{ color: "var(--text-muted)" }}
            >
              <Filter size={10} /> Filter:
            </span>
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setSelectedTag(tag)}
                className="px-3 py-1 text-xs font-mono rounded-full border transition-all shrink-0"
                style={
                  selectedTag === tag
                    ? {
                        backgroundColor: "var(--text)",
                        color: "var(--bg)",
                        borderColor: "var(--text)",
                        fontWeight: 600,
                      }
                    : {
                        backgroundColor: "transparent",
                        color: "var(--text-secondary)",
                        borderColor: "var(--border)",
                      }
                }
                onMouseEnter={(e) => {
                  if (selectedTag !== tag) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "var(--text)";
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "var(--text)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (selectedTag !== tag) {
                    (e.currentTarget as HTMLButtonElement).style.borderColor =
                      "var(--border)";
                    (e.currentTarget as HTMLButtonElement).style.color =
                      "var(--text-secondary)";
                  }
                }}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* ── Core project cards ── */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-8">
            {filteredProjects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div
            className="text-center py-20 border border-dashed rounded-xl"
            style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}
          >
            <p className="text-sm font-mono" style={{ color: "var(--text-muted)" }}>
              No projects matching those filters.
            </p>
            <button
              onClick={() => { setSearchQuery(""); setSelectedTag("All"); }}
              className="mt-4 px-4 py-2 font-mono text-xs rounded-lg uppercase tracking-wider transition-colors"
              style={{ border: "1px solid var(--text)", color: "var(--text)" }}
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* ══════════════════════════════════════════════════════ */}
        {/* ── SHOW MORE — GitHub repos ── */}
        {/* ══════════════════════════════════════════════════════ */}
        <div className="pt-4">
          <button
            onClick={fetchGithub}
            disabled={loading}
            className="flex items-center gap-2 mx-auto px-6 py-3 rounded-lg font-mono text-xs uppercase tracking-wider transition-all"
            style={{
              border: "1px solid var(--border)",
              color: "var(--text-secondary)",
              backgroundColor: "transparent",
            }}
            onMouseEnter={(e) => {
              const b = e.currentTarget as HTMLButtonElement;
              b.style.borderColor = "var(--text)";
              b.style.color = "var(--text)";
            }}
            onMouseLeave={(e) => {
              const b = e.currentTarget as HTMLButtonElement;
              b.style.borderColor = "var(--border)";
              b.style.color = "var(--text-secondary)";
            }}
          >
            {loading ? (
              <Loader2 size={14} className="animate-spin" />
            ) : (
            <GithubIcon size={14} />
            )}
            {loading
              ? "Fetching from GitHub…"
              : showGithub
              ? "Collapse GitHub Repos"
              : "Show More — All GitHub Repositories"}
            {!loading && (
              <ChevronDown
                size={14}
                style={{
                  transform: showGithub ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s",
                }}
              />
            )}
          </button>
        </div>

        {/* GitHub repos grid */}
        {showGithub && (
          <div className="space-y-6">
            {/* Sub-header */}
            <div
              className="flex items-center justify-between border-t pt-6"
              style={{ borderColor: "var(--border)" }}
            >
              <div>
                <h3
                  className="text-lg font-extrabold uppercase tracking-tight"
                  style={{ color: "var(--text)" }}
                >
                  GitHub Repositories
                </h3>
                <p
                  className="text-[10px] font-mono mt-0.5 uppercase tracking-widest"
                  style={{ color: "var(--text-muted)" }}
                >
                  @{GITHUB_USER} · live data from GitHub API
                </p>
              </div>
              {fetched && !loading && (
                <span
                  className="text-[10px] font-mono px-2 py-1 rounded"
                  style={{ border: "1px solid var(--border)", color: "var(--text-muted)" }}
                >
                  {githubRepos.length} repos
                </span>
              )}
            </div>

            {/* Error state */}
            {error && (
              <div
                className="flex items-center gap-3 p-4 rounded-xl border"
                style={{ borderColor: "var(--border)", backgroundColor: "var(--bg-card)" }}
              >
                <AlertCircle size={16} style={{ color: "var(--text-muted)" }} />
                <p className="text-xs font-mono" style={{ color: "var(--text-secondary)" }}>
                  {error} — Check your internet connection or try again later.
                </p>
              </div>
            )}

            {/* Loading skeleton */}
            {loading && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    key={i}
                    className="rounded-xl p-5 h-40 animate-pulse"
                    style={{ backgroundColor: "var(--bg-card)", border: "1px solid var(--border)" }}
                  />
                ))}
              </div>
            )}

            {/* Repo cards */}
            {!loading && !error && githubRepos.length > 0 && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {githubRepos.map((repo) => (
                  <RepoCard key={repo.id} repo={repo} />
                ))}
              </div>
            )}

            {!loading && !error && githubRepos.length === 0 && fetched && (
              <p className="text-xs font-mono text-center py-8" style={{ color: "var(--text-muted)" }}>
                No public repositories found.
              </p>
            )}
          </div>
        )}

      </div>
    </section>
  );
}
