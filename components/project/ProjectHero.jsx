"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";

function ArrowLeftIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M19 12H5M5 12l7 7M5 12l7-7" />
    </svg>
  );
}

export default function ProjectHero({ project }) {
  const heroRef = useRef(null);
  const contentRef = useRef(null);
  const mockupRef = useRef(null);
  const backRef = useRef(null);

  const accent = project.coverColor ?? "#7F77DD";

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([backRef.current, contentRef.current.children, mockupRef.current], {
        opacity: 0,
        y: 30,
      });

      const reveal = () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.to(backRef.current, { opacity: 1, y: 0, duration: 0.5 })
          .to(contentRef.current.children, {
            opacity: 1,
            y: 0,
            duration: 0.7,
            stagger: 0.08,
          }, "-=0.3")
          .to(mockupRef.current, {
            opacity: 1,
            y: 0,
            duration: 0.6,
          }, "-=0.4");
      };

      window.addEventListener("page-transition-complete", reveal);
      const fallback = setTimeout(reveal, 600);

      return () => {
        window.removeEventListener("page-transition-complete", reveal);
        clearTimeout(fallback);
      };
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const btnPrimary = "inline-flex items-center gap-2 px-5 py-2.5 text-white font-semibold text-sm rounded-xl transition-all duration-300 hover:-translate-y-0.5";
  const btnSecondary = "inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 hover:border-white/30 text-white/70 hover:text-white font-semibold text-sm rounded-xl transition-all duration-300 hover:-translate-y-0.5";

  return (
    <section ref={heroRef} className="relative pt-32 pb-16 px-6 md:px-10 max-w-7xl mx-auto">

      {/* Back link */}
      <div ref={backRef} style={{ opacity: 0 }}>
        <Link href="/#works" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors duration-200 mb-12 group">
          <span className="group-hover:-translate-x-1 transition-transform duration-200">
            <ArrowLeftIcon />
          </span>
          Back to Works
        </Link>
      </div>

      {/* Main content */}
      <div ref={contentRef}>
        {/* Category + year badge */}
        <div className="flex items-center gap-3 mb-4" style={{ opacity: 0 }}>
          <div className="w-6 h-px" style={{ background: accent }} />
          <span
            className="text-xs font-semibold uppercase tracking-widest"
            style={{ color: accent, fontFamily: "var(--font-mono)" }}
          >
            {project.category} · {project.year}
          </span>
        </div>

        {/* Title */}
        <h1
          className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight mb-6"
          style={{ opacity: 0 }}
        >
          {project.title}
        </h1>

        {/* Short desc */}
        <p className="text-lg text-white/50 max-w-2xl leading-relaxed mb-10" style={{ opacity: 0 }}>
          {project.shortDesc}
        </p>

        {/* CTA buttons */}
        <div className="flex items-center gap-4" style={{ opacity: 0 }}>
          {project.liveUrl && project.liveUrl !== '#' && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={btnPrimary}
              style={{
                background: accent,
                boxShadow: `0 0 0 0 ${accent}40`,
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 24px ${accent}60`}
              onMouseLeave={e => e.currentTarget.style.boxShadow = `0 0 0 0 ${accent}40`}
            >
              Live Site →
            </a>
          )}
          {project.githubUrl && (
            <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className={btnSecondary}>
              GitHub →
            </a>
          )}
        </div>
      </div>

      {/* Hero cover mockup */}
      <div
        ref={mockupRef}
        style={{ opacity: 0 }}
        className="mt-14 rounded-2xl border border-white/8 overflow-hidden bg-[#0d0d0d] h-64 md:h-[420px] flex items-center justify-center relative"
      >
        {/* Dynamic gradient dari coverColor project */}
        <div
          className="absolute inset-0"
          style={{
            background: `radial-gradient(ellipse 70% 70% at 30% 40%, ${accent}22 0%, transparent 65%), radial-gradient(ellipse 40% 40% at 80% 70%, ${accent}10 0%, transparent 60%), repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(255,255,255,0.015) 20px, rgba(255,255,255,0.015) 21px)`,
          }}
        />

        {/* Glow accent di sudut */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] blur-[80px] rounded-full pointer-events-none"
          style={{ background: `${accent}18` }}
        />

        {/* Monogram besar */}
        <span
          className="relative text-[120px] md:text-[160px] font-black tracking-tighter select-none pointer-events-none"
          style={{
            fontFamily: "var(--font-mono)",
            color: accent,
            opacity: 0.08,
            lineHeight: 1,
          }}
        >
          {project.title.slice(0, 2).toUpperCase()}
        </span>

        {/* Year badge pojok kanan atas */}
        <div className="absolute top-5 right-5">
          <span
            className="text-xs px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm border border-white/8 text-white/40"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            {project.year}
          </span>
        </div>

        {/* Category badge pojok kiri bawah */}
        <div className="absolute bottom-5 left-5">
          <span
            className="text-xs px-3 py-1.5 rounded-lg border font-medium"
            style={{
              background: `${accent}15`,
              borderColor: `${accent}30`,
              color: accent,
              fontFamily: "var(--font-mono)",
            }}
          >
            {project.category}
          </span>
        </div>
      </div>
    </section>
  );
}