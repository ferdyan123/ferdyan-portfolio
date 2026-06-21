"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

function CheckIcon({ color }) {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17l-5-5" />
    </svg>
  );
}

const LABELS = {
  id: { overview: 'Overview', details: 'Detail', category: 'Kategori', year: 'Tahun', role: 'Peran', duration: 'Durasi', status: 'Status', live: 'Live' },
  en: { overview: 'Overview', details: 'Details', category: 'Category', year: 'Year', role: 'Role', duration: 'Duration', status: 'Status', live: 'Live' },
}

export default function ProjectOverview({ project }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const { lang } = useLanguage();
  const L = LABELS[lang] ?? LABELS.id;

  const accent = project.coverColor ?? "#7F77DD";
  const overview = lang === 'en' && project.overview_en ? project.overview_en : project.overview;
  const highlights = lang === 'en' && project.highlights_en ? project.highlights_en : project.highlights;

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

        {/* Kiri: Overview text + highlights */}
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-6 h-px" style={{ background: accent }} />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: accent, fontFamily: "var(--font-mono)" }}
            >
              {L.overview}
            </span>
          </div>

          <p className="text-base text-white/60 leading-relaxed whitespace-pre-line mb-8">
            {overview}
          </p>

          {/* Highlights */}
          {highlights && highlights.length > 0 && (
            <div className="flex flex-col gap-3">
              {highlights.map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div
                    className="flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center mt-0.5"
                    style={{ background: `${accent}18`, border: `1px solid ${accent}30` }}
                  >
                    <CheckIcon color={accent} />
                  </div>
                  <p className="text-sm text-white/55 leading-relaxed">{item}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Kanan: Project details */}
        <div>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-6 h-px" style={{ background: accent }} />
            <span
              className="text-xs font-semibold uppercase tracking-widest"
              style={{ color: accent, fontFamily: "var(--font-mono)" }}
            >
              {L.details}
            </span>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Category */}
            <div className="rounded-xl border border-white/8 bg-[#111111] p-5">
              <p className="text-xs text-white/30 mb-1.5" style={{ fontFamily: "var(--font-mono)" }}>{L.category}</p>
              <p className="text-sm font-semibold text-white">{project.category}</p>
            </div>

            {/* Year */}
            <div className="rounded-xl border border-white/8 bg-[#111111] p-5">
              <p className="text-xs text-white/30 mb-1.5" style={{ fontFamily: "var(--font-mono)" }}>{L.year}</p>
              <p className="text-sm font-semibold text-white">{project.year}</p>
            </div>

            {/* Role */}
            {project.role && (
              <div className="rounded-xl border border-white/8 bg-[#111111] p-5">
                <p className="text-xs text-white/30 mb-1.5" style={{ fontFamily: "var(--font-mono)" }}>{L.role}</p>
                <p className="text-sm font-semibold text-white">{project.role}</p>
              </div>
            )}

            {/* Duration */}
            {project.duration && (
              <div className="rounded-xl border border-white/8 bg-[#111111] p-5">
                <p className="text-xs text-white/30 mb-1.5" style={{ fontFamily: "var(--font-mono)" }}>{L.duration}</p>
                <p className="text-sm font-semibold text-white">{project.duration}</p>
              </div>
            )}

            {/* Status */}
            <div
              className="rounded-xl border bg-[#111111] p-5 col-span-2"
              style={{ borderColor: `${accent}20` }}
            >
              <p className="text-xs text-white/30 mb-1.5" style={{ fontFamily: "var(--font-mono)" }}>{L.status}</p>
              <div className="flex items-center gap-2">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{ background: accent }}
                />
                <p className="text-sm font-semibold text-white">{L.live}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}