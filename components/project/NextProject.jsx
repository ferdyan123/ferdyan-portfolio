"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function NextProject({ project }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
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

  return (
    <section ref={sectionRef} className="relative py-16 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-16" />

      <div className="flex items-center gap-3 mb-8">
        <div className="w-6 h-px bg-[#7F77DD]" />
        <span className="text-xs font-semibold uppercase tracking-widest text-[#7F77DD]" style={{ fontFamily: "var(--font-mono)" }}>
          Next Project
        </span>
      </div>

      <Link href={`/projects/${project.slug}`} className="block group">
        <div
          ref={contentRef}
          className="relative rounded-2xl border border-white/8 bg-[#111111] overflow-hidden px-8 py-12 md:px-14 hover:border-[#7F77DD]/40 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_40px_rgba(127,119,221,0.08)]"
        >
          {/* Background */}
          <div
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
            style={{
              background: "radial-gradient(ellipse 60% 60% at 50% 0%, rgba(127,119,221,0.06) 0%, transparent 70%)",
            }}
          />

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <p className="text-xs text-white/30 mb-2" style={{ fontFamily: "var(--font-mono)" }}>
                {project.category} · {project.year}
              </p>
              <h3 className="text-3xl md:text-4xl font-black text-white group-hover:text-[#7F77DD] transition-colors duration-300">
                {project.title}
              </h3>
              <p className="text-sm text-white/40 mt-2 max-w-md leading-relaxed">
                {project.shortDesc}
              </p>
            </div>

            <div className="flex-shrink-0">
              <div className="w-14 h-14 rounded-full border border-white/10 group-hover:border-[#7F77DD]/50 group-hover:bg-[#7F77DD] flex items-center justify-center transition-all duration-300">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-white/40 group-hover:text-white transition-colors duration-300">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </section>
  );
}