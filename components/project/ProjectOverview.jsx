"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ProjectOverview({ project }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current.children,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative py-16 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-16" />

      <div ref={contentRef} className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20">
        {/* Overview text */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-[#7F77DD]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#7F77DD]" style={{ fontFamily: "var(--font-mono)" }}>
              Overview
            </span>
          </div>
          <p className="text-base text-white/60 leading-relaxed whitespace-pre-line">
            {project.overview}
          </p>
        </div>

        {/* Project meta */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px bg-[#7F77DD]" />
            <span className="text-xs font-semibold uppercase tracking-widest text-[#7F77DD]" style={{ fontFamily: "var(--font-mono)" }}>
              Details
            </span>
          </div>

          <div className="grid grid-cols-2 gap-5">
            <div className="rounded-xl border border-white/8 bg-[#111111] p-5">
              <p className="text-xs text-white/30 mb-1" style={{ fontFamily: "var(--font-mono)" }}>Category</p>
              <p className="text-sm font-semibold text-white">{project.category}</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-[#111111] p-5">
              <p className="text-xs text-white/30 mb-1" style={{ fontFamily: "var(--font-mono)" }}>Year</p>
              <p className="text-sm font-semibold text-white">{project.year}</p>
            </div>
            <div className="rounded-xl border border-white/8 bg-[#111111] p-5 col-span-2">
              <p className="text-xs text-white/30 mb-1" style={{ fontFamily: "var(--font-mono)" }}>Status</p>
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <p className="text-sm font-semibold text-white">Live</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}