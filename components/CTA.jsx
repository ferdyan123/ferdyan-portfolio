"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig, socials } from "@/data/projects";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.104 1.523 5.827L.057 23.428a.75.75 0 00.916.916l5.601-1.466A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.695 9.695 0 01-4.947-1.354l-.355-.21-3.664.96.976-3.566-.23-.368A9.698 9.698 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

const ICON_MAP = { github: GitHubIcon, linkedin: LinkedInIcon, instagram: InstagramIcon };

export default function CTA() {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const { t } = useLanguage();
  const c = t.cta;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: contentRef.current, start: "top 85%", toggleActions: "play none none none" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

  return (
    <section id="contact" ref={sectionRef} className="relative py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-24" />

      <div ref={contentRef} className="relative rounded-3xl border border-white/8 bg-[#111111] overflow-hidden px-8 py-16 md:px-16 md:py-20 text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#7F77DD]/6 blur-[80px] rounded-full" />
        </div>

        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="w-6 h-px bg-[#7F77DD]" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[#7F77DD]" style={{ fontFamily: "var(--font-mono)" }}>
            {c.eyebrow}
          </span>
          <div className="w-6 h-px bg-[#7F77DD]" />
        </div>

        <h2 className="text-4xl md:text-6xl font-black text-white leading-tight tracking-tight mb-4">
          {c.headlineLine1}
          <br />
          <span className="text-[#7F77DD]">{c.headlineAccent}</span>
        </h2>

        <p className="text-base text-white/45 max-w-md mx-auto mb-6 leading-relaxed">{c.sub}</p>

        {c.guaranteeBadge && (
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-10 rounded-full border border-[#7F77DD]/25 bg-[#7F77DD]/8 text-xs sm:text-sm text-white/80 font-medium">
            <span>🛡️</span>
            <span>{c.guaranteeBadge}</span>
          </div>
        )}

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-12">
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-3 px-7 py-3.5 bg-[#7F77DD] hover:bg-[#6d66cc] text-white font-semibold text-sm rounded-xl transition-all duration-300 hover:shadow-[0_0_32px_rgba(127,119,221,0.4)] hover:-translate-y-0.5"
          >
            <WhatsAppIcon />
            {c.ctaPrimary}
          </a>
          <a
            href="#works"
            className="inline-flex items-center gap-2 px-7 py-3.5 border border-white/10 hover:border-[#7F77DD]/50 text-white/70 hover:text-white font-semibold text-sm rounded-xl transition-all duration-300 hover:-translate-y-0.5"
          >
            {c.ctaSecondary}
          </a>
        </div>

        {c.processSteps && (
          <div className="mb-12">
            <p className="text-[11px] uppercase tracking-widest text-white/30 font-mono mb-4">{c.processLabel}</p>
            <div className="flex flex-wrap items-center justify-center gap-x-2 gap-y-3">
              {c.processSteps.map((step, i) => (
                <div key={step.step} className="flex items-center gap-2">
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/8 bg-white/[0.02]">
                    <span className="font-mono text-[#7F77DD] text-xs">{step.step}</span>
                    <span className="text-white/60 text-xs font-medium">{step.title}</span>
                  </div>
                  {i < c.processSteps.length - 1 && <span className="text-white/15 text-xs">→</span>}
                </div>
              ))}
            </div>
          </div>
        )}

        {c.guaranteeDetail && (
          <p className="text-[11px] text-white/25 max-w-lg mx-auto mb-10 leading-relaxed">{c.guaranteeDetail}</p>
        )}

        <div className="flex items-center justify-center gap-3">
          {socials.map((social) => {
            const Icon = ICON_MAP[social.icon];
            if (!Icon) return null;
            return (
              <a
                key={social.platform}
                href={social.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.platform}
                className="w-10 h-10 rounded-xl border border-white/8 flex items-center justify-center text-white/35 hover:text-white hover:border-[#7F77DD]/40 transition-all duration-200"
              >
                <Icon />
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}