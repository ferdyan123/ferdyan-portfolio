"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TECH_COLORS = {
  "HTML/CSS":   "bg-orange-500/10 text-orange-400 border-orange-500/20",
  "JavaScript": "bg-yellow-500/10 text-yellow-400 border-yellow-500/20",
  "Supabase":   "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  "Chart.js":   "bg-blue-500/10 text-blue-400 border-blue-500/20",
  "PWA":        "bg-purple-500/10 text-purple-400 border-purple-500/20",
  "Next.js":    "bg-white/10 text-white/70 border-white/10",
  "React":      "bg-cyan-500/10 text-cyan-400 border-cyan-500/20",
  "Tailwind CSS": "bg-sky-500/10 text-sky-400 border-sky-500/20",
  "Google Sheets API": "bg-green-500/10 text-green-400 border-green-500/20",
};

export default function ProjectTech({ project }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 24, scale: 0.95 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 88%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  if (!project.tech || !project.tech.length) return null;

  return (
    <section ref={sectionRef} className="relative py-16 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-16" />

      <div className="flex items-center gap-3 mb-8">
        <div className="w-6 h-px bg-[#7F77DD]" />
        <span className="text-xs font-semibold uppercase tracking-widest text-[#7F77DD]" style={{ fontFamily: "var(--font-mono)" }}>
          Tech Stack
        </span>
      </div>

      <div ref={contentRef} className="flex flex-wrap gap-3">
        {project.tech.map((tag) => {
          const colorClass = TECH_COLORS[tag] ?? "bg-white/5 text-white/50 border-white/10";
          return (
            <div key={tag} className={`flex items-center gap-2 px-4 py-2.5 rounded-xl border text-sm font-medium ${colorClass}`}>
              <span className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
              {tag}
            </div>
          );
        })}
      </div>
    </section>
  );
}