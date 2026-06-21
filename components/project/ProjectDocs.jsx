"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const SCREENSHOTS_LABEL = { id: 'Screenshots', en: 'Screenshots' };
const VIEWS_LABEL = { id: 'tampilan', en: 'views' };
const CLOSE_LABEL = { id: 'ESC untuk tutup', en: 'ESC to close' };

const LABELS = {
  "home.png": "Dashboard",
  "risiko.png": "Manajemen Risiko",
  "plan.png": "Proyeksi Harian",
  "jurnal.png": "Jurnal Transaksi",
  "filter.png": "Filter & Analisa",
  "mingguan.png": "Performa Mingguan",
  "bulanan.png": "Kalender Trading",
  "news.png": "Berita Forex",
};

function isMobileProject(src) {
  return ["tradevision", "lulusai"].some(p => src.includes(p));
}

function getAspectRatio(src) {
  // Screenshots dari journalyze (desktop) → 16/9
  // Screenshots dari tradevision/lulusai (mobile) → 9/16
  const filename = src.split("/").pop();
  const mobileProjects = ["tradevision", "lulusai"];
  const isMobile = mobileProjects.some(p => src.includes(p));
  return isMobile ? "9/16" : "16/9";
}

function getLabel(src) {
  const filename = src.split("/").pop();
  return LABELS[filename] ?? filename.replace(".png", "").replace(".jpg", "");
}

export default function ProjectDocs({ project }) {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const gridRef = useRef(null);
  const [lightbox, setLightbox] = useState(null);
  const { lang } = useLanguage();

  const accent = project.coverColor ?? "#7F77DD";
  const screenshots = project.screenshots ?? [];

  useEffect(() => {
    if (!screenshots.length) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 24 },
        {
          opacity: 1, y: 0, duration: 0.7, ease: "power3.out",
          scrollTrigger: { trigger: headerRef.current, start: "top 88%", toggleActions: "play none none none" },
        }
      );
      if (gridRef.current) {
        gsap.fromTo(gridRef.current.children,
          { opacity: 0, y: 32, scale: 0.97 },
          {
            opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.08, ease: "power3.out",
            scrollTrigger: { trigger: gridRef.current, start: "top 88%", toggleActions: "play none none none" },
          }
        );
      }
    }, sectionRef);
    return () => ctx.revert();
  }, [screenshots.length]);

  // Tutup lightbox dengan ESC
  useEffect(() => {
    const handler = (e) => { if (e.key === "Escape") setLightbox(null); };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  if (!screenshots.length) return null;

  return (
    <section ref={sectionRef} className="relative py-16 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-16" />

      {/* Header */}
      <div ref={headerRef} className="flex items-center gap-3 mb-10">
        <div className="w-6 h-px" style={{ background: accent }} />
        <span
          className="text-xs font-semibold uppercase tracking-widest"
          style={{ color: accent, fontFamily: "var(--font-mono)" }}
        >
          {SCREENSHOTS_LABEL[lang] ?? SCREENSHOTS_LABEL.id}
        </span>
        <span className="text-xs text-white/20 ml-auto" style={{ fontFamily: "var(--font-mono)" }}>
          {screenshots.length} {VIEWS_LABEL[lang] ?? VIEWS_LABEL.id}
        </span>
      </div>

      {/* Grid */}
      <div ref={gridRef} className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {screenshots.map((src, i) => (
          <div
            key={i}
            onClick={() => setLightbox(src)}
            className={`relative rounded-xl overflow-hidden cursor-zoom-in group transition-all duration-300 hover:-translate-y-0.5 ${
              isMobileProject(src)
                ? 'bg-transparent'
                : 'border border-white/8 bg-[#0d0d0d] hover:border-white/20'
            }`}
          >
            <Image
              src={src}
              alt={getLabel(src)}
              width={600}
              height={400}
              className="w-full h-auto object-contain transition-transform duration-500 group-hover:scale-[1.02]"
              sizes="(max-width: 640px) 50vw, 33vw"
            />
            {/* Label overlay */}
            <div className="absolute bottom-0 left-0 right-0 px-3 py-2 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs font-medium text-white/70" style={{ fontFamily: "var(--font-mono)" }}>
                {getLabel(src)}
              </span>
            </div>
            {/* Index badge */}
            <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <span className="text-xs px-1.5 py-0.5 rounded bg-black/60 backdrop-blur-sm border border-white/10 text-white/40" style={{ fontFamily: "var(--font-mono)" }}>
                {String(i + 1).padStart(2, "0")}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setLightbox(null)}
        >
          <div className="relative w-full max-w-5xl" style={{ aspectRatio: "16/9" }}>
            <Image
              src={lightbox}
              alt={getLabel(lightbox)}
              fill
              className="object-contain rounded-xl"
              sizes="100vw"
            />
          </div>
          <button
            className="absolute top-5 right-5 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white/60 hover:text-white transition-all"
            onClick={() => setLightbox(null)}
          >
            ✕
          </button>
          <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
            <span className="text-xs text-white/40 px-3 py-1.5 rounded-full bg-white/5 border border-white/10" style={{ fontFamily: "var(--font-mono)" }}>
              {getLabel(lightbox)} · {CLOSE_LABEL[lang] ?? CLOSE_LABEL.id}
            </span>
          </div>
        </div>
      )}
    </section>
  );
}