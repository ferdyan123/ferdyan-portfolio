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

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state — semua hidden
      gsap.set([backRef.current, contentRef.current.children, mockupRef.current], {
        opacity: 0,
        y: 30,
      });

      // Fungsi reveal — dipanggil setelah curtain selesai turun
      const reveal = () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

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
          }, "-=0.4")
      }

      // Listen event dari PageTransition — curtain sudah selesai turun
      window.addEventListener("page-transition-complete", reveal)

      // Fallback: kalau event tidak fired dalam 600ms (misal direct load), tetap reveal
      const fallback = setTimeout(reveal, 600)

      return () => {
        window.removeEventListener("page-transition-complete", reveal)
        clearTimeout(fallback)
      }
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const btnPrimary = "inline-flex items-center gap-2 px-5 py-2.5 bg-[#7F77DD] hover:bg-[#6d66cc] text-white font-semibold text-sm rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(127,119,221,0.4)]";
  const btnSecondary = "inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 hover:border-[#7F77DD]/50 text-white/70 hover:text-white font-semibold text-sm rounded-xl transition-all duration-300 hover:-translate-y-0.5";

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
        <div className="flex items-center gap-3 mb-4" style={{ opacity: 0 }}>
          <div className="w-6 h-px bg-[#7F77DD]" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[#7F77DD]" style={{ fontFamily: "var(--font-mono)" }}>
            {project.category} · {project.year}
          </span>
        </div>

        <h1
          className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight mb-6"
          style={{ opacity: 0 }}
        >
          {project.title}
        </h1>

        <p className="text-lg text-white/50 max-w-2xl leading-relaxed mb-10" style={{ opacity: 0 }}>
          {project.shortDesc}
        </p>

        <div className="flex items-center gap-4" style={{ opacity: 0 }}>
          {project.liveUrl && project.liveUrl !== '#' && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={btnPrimary}>
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

      {/* Mockup / hero image */}
      <div
        ref={mockupRef}
        style={{ opacity: 0 }}
        className="mt-14 rounded-2xl border border-white/8 overflow-hidden bg-[#0d0d0d] h-64 md:h-96 flex items-center justify-center relative"
      >
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 80% at 30% 40%, rgba(127,119,221,0.12) 0%, transparent 70%), repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(255,255,255,0.015) 20px, rgba(255,255,255,0.015) 21px)",
          }}
        />
        <span className="text-9xl font-black tracking-tighter opacity-5 text-white select-none" style={{ fontFamily: "var(--font-mono)" }}>
          {project.title.slice(0, 2).toUpperCase()}
        </span>
      </div>
    </section>
  );
}