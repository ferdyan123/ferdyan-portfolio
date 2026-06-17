"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
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
  const hasMockup = !!project.mockup;

  useEffect(() => {
    const ctx = gsap.context(() => {
      const targets = hasMockup
        ? [backRef.current, mockupRef.current]
        : [backRef.current, ...(contentRef.current ? Array.from(contentRef.current.children) : []), mockupRef.current];

      gsap.set(targets.filter(Boolean), { opacity: 0, y: 30 });

      const reveal = () => {
        const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
        tl.to(backRef.current, { opacity: 1, y: 0, duration: 0.5 });
        if (!hasMockup && contentRef.current) {
          tl.to(Array.from(contentRef.current.children), {
            opacity: 1, y: 0, duration: 0.7, stagger: 0.08,
          }, "-=0.3");
        }
        tl.to(mockupRef.current, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4");
      };

      window.addEventListener("page-transition-complete", reveal);
      const fallback = setTimeout(reveal, 600);

      return () => {
        window.removeEventListener("page-transition-complete", reveal);
        clearTimeout(fallback);
      };
    }, heroRef);

    return () => ctx.revert();
  }, [hasMockup]);

  const btnPrimary = "inline-flex items-center gap-2 px-5 py-2.5 text-white font-semibold text-sm rounded-xl transition-all duration-300 hover:-translate-y-0.5";
  const btnSecondary = "inline-flex items-center gap-2 px-5 py-2.5 border border-white/10 hover:border-white/30 text-white/70 hover:text-white font-semibold text-sm rounded-xl transition-all duration-300 hover:-translate-y-0.5";

  return (
    <section ref={heroRef} className={`relative ${hasMockup ? 'pt-0' : 'pt-32 pb-16 px-6 md:px-10 max-w-7xl mx-auto'}`}>

      {/* Back link — hanya tampil kalau TIDAK ada mockup, atau overlay di atas mockup */}
      {hasMockup ? (
        <div ref={backRef} style={{ opacity: 0 }} className="absolute top-20 left-6 z-20">
          <Link href="/#works" className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white transition-colors duration-200 group backdrop-blur-sm bg-black/30 px-3 py-1.5 rounded-full border border-white/10">
            <span className="group-hover:-translate-x-1 transition-transform duration-200">
              <ArrowLeftIcon />
            </span>
            Back
          </Link>
        </div>
      ) : (
        <div ref={backRef} style={{ opacity: 0 }}>
          <Link href="/#works" className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white transition-colors duration-200 mb-12 group">
            <span className="group-hover:-translate-x-1 transition-transform duration-200">
              <ArrowLeftIcon />
            </span>
            Back to Works
          </Link>
        </div>
      )}

      {/* Main content — hanya tampil kalau TIDAK ada mockup */}
      {!hasMockup && (
        <div ref={contentRef}>
          <div className="flex items-center gap-3 mb-4" style={{ opacity: 0 }}>
            <div className="w-6 h-px" style={{ background: accent }} />
            <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: accent, fontFamily: "var(--font-mono)" }}>
              {project.category} · {project.year}
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-tight tracking-tight mb-6" style={{ opacity: 0 }}>
            {project.title}
          </h1>
          <p className="text-lg text-white/50 max-w-2xl leading-relaxed mb-10" style={{ opacity: 0 }}>
            {project.shortDesc}
          </p>
          <div className="flex items-center gap-4" style={{ opacity: 0 }}>
            {project.liveUrl && project.liveUrl !== '#' && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className={btnPrimary}
                style={{ background: accent }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = `0 0 24px ${accent}60`}
                onMouseLeave={e => e.currentTarget.style.boxShadow = `none`}
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
      )}

      {/* Hero cover — mockup atau placeholder */}
      <div ref={hasMockup ? mockupRef : mockupRef} style={{ opacity: 0 }} className={hasMockup ? '' : 'mt-14 px-6 md:px-10 max-w-7xl mx-auto rounded-2xl overflow-hidden relative'}>
        {hasMockup ? (
          /* MOCKUP MODE — fullscreen background seperti referensi */
          <div className="relative w-full h-[60vh] md:h-[85vh] overflow-hidden rounded-2xl bg-[#0a0a0a]">
            {/* Mockup sebagai background fullscreen */}
            <Image
              src={project.mockup}
              alt={`${project.title} mockup`}
              fill
              className="object-cover object-top"
              sizes="100vw"
              priority
            />

            {/* Gradasi gelap dari bawah — biar judul bisa dibaca */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(to top, #0a0a0a 0%, #0a0a0a40 40%, transparent 70%)`,
              }}
            />

            {/* Gradasi dari kiri */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(to right, #0a0a0a 0%, transparent 50%)`,
              }}
            />

            {/* Konten di atas mockup */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-6 h-px" style={{ background: accent }} />
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: accent, fontFamily: "var(--font-mono)" }}>
                  {project.category} · {project.year}
                </span>
              </div>
              <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight mb-4">
                {project.title}
              </h2>
              <p className="text-base text-white/50 max-w-xl leading-relaxed">
                {project.shortDesc}
              </p>
            </div>

            {/* Year badge pojok kanan bawah */}
            <div className="absolute bottom-5 right-5">
              <span className="text-xs px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm border border-white/8 text-white/40" style={{ fontFamily: "var(--font-mono)" }}>
                {project.year}
              </span>
            </div>
          </div>
        ) : (
          /* PLACEHOLDER MODE */
          <div className="border border-white/8 bg-[#0d0d0d] h-64 md:h-[420px] flex items-center justify-center relative rounded-2xl">
            <div
              className="absolute inset-0 rounded-2xl"
              style={{
                background: `radial-gradient(ellipse 70% 70% at 30% 40%, ${accent}22 0%, transparent 65%), repeating-linear-gradient(-45deg, transparent, transparent 20px, rgba(255,255,255,0.015) 20px, rgba(255,255,255,0.015) 21px)`,
              }}
            />
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] blur-[80px] rounded-full pointer-events-none" style={{ background: `${accent}18` }} />
            <span
              className="relative text-[120px] md:text-[160px] font-black tracking-tighter select-none pointer-events-none"
              style={{ fontFamily: "var(--font-mono)", color: accent, opacity: 0.08, lineHeight: 1 }}
            >
              {project.title.slice(0, 2).toUpperCase()}
            </span>
            <div className="absolute top-5 right-5">
              <span className="text-xs px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-sm border border-white/8 text-white/40" style={{ fontFamily: "var(--font-mono)" }}>
                {project.year}
              </span>
            </div>
            <div className="absolute bottom-5 left-5">
              <span
                className="text-xs px-3 py-1.5 rounded-lg border font-medium"
                style={{ background: `${accent}15`, borderColor: `${accent}30`, color: accent, fontFamily: "var(--font-mono)" }}
              >
                {project.category}
              </span>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}