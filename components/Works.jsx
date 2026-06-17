"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { projects } from "@/data/projects";
import { usePageTransition } from "@/lib/usePageTransition";

gsap.registerPlugin(ScrollTrigger);

const TECH_COLORS = {
  "HTML/CSS":   "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "JavaScript": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "JS":         "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "Supabase":   "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Chart.js":   "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "PWA":        "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Next.js":    "bg-white/10 text-white/70 border-white/10",
  "React":      "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  "Tailwind CSS": "bg-sky-500/10 text-sky-400 border-sky-500/20",
  "GSAP":       "bg-green-500/10 text-green-400 border-green-500/20",
  "AI API":     "bg-violet-500/10 text-violet-400 border-violet-500/20",
  "Google Sheets API": "bg-green-500/10 text-green-400 border-green-500/20",
};

const TYPE_LABEL = {
  "Web App":        { color: "text-[#7F77DD]", dot: "bg-[#7F77DD]" },
  "Landing Page":   { color: "text-emerald-400", dot: "bg-emerald-400" },
  "Company Profile":{ color: "text-orange-400", dot: "bg-orange-400" },
  "Web Business":   { color: "text-yellow-400", dot: "bg-yellow-400" },
};

function ArrowIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 17L17 7M17 7H7M17 7v10" />
    </svg>
  );
}

function ProjectCard({ project, index, onNavigate }) {
  const typeStyle = TYPE_LABEL[project.category] ?? TYPE_LABEL["Web App"];

  return (
    <article
      onClick={() => onNavigate(`/projects/${project.slug}`)}
      className="relative rounded-2xl border border-white/8 bg-[#111111] overflow-hidden transition-all duration-500 hover:border-[#7F77DD]/40 hover:bg-[#131318] hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(127,119,221,0.08)] will-change-transform cursor-pointer group flex flex-col h-full"
    >
      {/* Thumbnail */}
      <div className="relative h-52 sm:h-60 overflow-hidden bg-[#0d0d0d] flex-shrink-0">
        {project.mockup ? (
          /* Mockup image — full cover */
          <>
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse 80% 80% at 50% 50%, ${project.coverColor ?? '#7F77DD'}15 0%, transparent 70%)`,
              }}
            />
            <Image
              src={project.mockup}
              alt={`${project.title} mockup`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            />
            {/* Gradasi gelap bawah biar nyambung ke body card */}
            <div
              className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
              style={{ background: "linear-gradient(to top, #111111 0%, transparent 100%)" }}
            />
          </>
        ) : (
          /* Placeholder gradient */
          <>
            <div
              className="absolute inset-0 transition-transform duration-700 group-hover:scale-105"
              style={{
                background: `radial-gradient(ellipse 80% 80% at 30% 40%, rgba(127,119,221,0.12) 0%, transparent 70%), repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(255,255,255,0.015) 20px, rgba(255,255,255,0.015) 21px)`,
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center select-none pointer-events-none">
              <span className="text-7xl font-black tracking-tighter opacity-5 text-white" style={{ fontFamily: "var(--font-mono)" }}>
                {project.title.slice(0, 2).toUpperCase()}
              </span>
            </div>
          </>
        )}
        <div className="absolute top-4 right-4">
          <span className="text-xs px-2 py-1 rounded-md bg-black/60 backdrop-blur-sm border border-white/8 text-white/50" style={{ fontFamily: "var(--font-mono)" }}>
            {project.year}
          </span>
        </div>
        <div className="absolute inset-0 bg-[#7F77DD]/0 group-hover:bg-[#7F77DD]/5 flex items-center justify-center transition-all duration-500">
          <div className="w-12 h-12 rounded-full bg-[#7F77DD] flex items-center justify-center opacity-0 group-hover:opacity-100 scale-50 group-hover:scale-100 transition-all duration-400 shadow-[0_0_24px_rgba(127,119,221,0.5)]">
            <ArrowIcon />
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full ${typeStyle.dot}`} />
            <span className={`text-xs font-medium ${typeStyle.color}`}>{project.category}</span>
          </div>
          <span className="text-xs text-white/20 tabular-nums" style={{ fontFamily: "var(--font-mono)" }}>
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>
        <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#7F77DD] transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-sm text-white/50 leading-relaxed mb-5 line-clamp-2 flex-grow">
          {project.shortDesc}
        </p>

        {/* Tech tags — selalu di bawah */}
        <div className="flex flex-wrap gap-1.5 mt-auto">
          {project.tech.slice(0, 5).map((tag) => {
            const colorClass = TECH_COLORS[tag] ?? "bg-white/5 text-white/40 border-white/10";
            return (
              <span key={tag} className={`text-[10px] font-medium px-2 py-0.5 rounded-md border ${colorClass}`} style={{ fontFamily: "var(--font-mono)" }}>
                {tag}
              </span>
            );
          })}
          {project.tech.length > 5 && (
            <span className="text-[10px] font-medium px-2 py-0.5 rounded-md border bg-white/5 text-white/30 border-white/10" style={{ fontFamily: "var(--font-mono)" }}>
              +{project.tech.length - 5}
            </span>
          )}
        </div>
      </div>

      <div className="h-px mx-6 bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:via-[#7F77DD]/40 transition-all duration-500" />
      <div className="h-4 flex-shrink-0" />
    </article>
  );
}

export default function Works() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const cardsRef = useRef([]);
  const { navigateTo } = usePageTransition();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 32 },
        { opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none none" }
        }
      );
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 48, scale: 0.97 },
          { opacity: 1, y: 0, scale: 1, duration: 0.75, delay: i * 0.1, ease: "power3.out",
            scrollTrigger: { trigger: card, start: "top 88%", toggleActions: "play none none none" }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="works" ref={sectionRef} className="relative py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto">

      {/* Header */}
      <div ref={headerRef} className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-px bg-[#7F77DD]" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[#7F77DD]" style={{ fontFamily: "var(--font-mono)" }}>
            Selected Works
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
            Project Pilihan{" "}
            <span className="relative">
              Gue
              <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-[#7F77DD] to-transparent opacity-60" />
            </span>
          </h2>
          <p className="text-sm text-white/35 max-w-xs leading-relaxed">
            Project pilihan yang gue bangun untuk membantu bisnis tampil lebih profesional di dunia digital.
          </p>
        </div>
      </div>

      {/* Grid — items-stretch biar semua card tingginya sama */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
        {projects.map((project, index) => (
          <div key={project.slug} ref={(el) => (cardsRef.current[index] = el)} className="flex">
            <ProjectCard project={project} index={index} onNavigate={navigateTo} />
          </div>
        ))}
      </div>

      {/* Placeholder cards */}
      {projects.length < 6 && (
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: Math.min(3, 6 - projects.length) }).map((_, i) => (
            <div key={`placeholder-${i}`} className="rounded-2xl border border-dashed border-white/6 h-[340px] flex flex-col items-center justify-center gap-3 text-white/15 select-none">
              <div className="w-8 h-8 rounded-full border border-white/10 flex items-center justify-center">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 5v14M5 12h14" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-xs" style={{ fontFamily: "var(--font-mono)" }}>Coming Soon</span>
            </div>
          ))}
        </div>
      )}
    </section>
  );
}