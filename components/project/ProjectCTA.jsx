"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { siteConfig } from "@/data/projects";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

const CTA_CONTENT = {
  id: {
    eyebrow: 'Tertarik?',
    headlinePre: 'Mau Saya Bantu Wujudkan',
    headlineAccent: 'Proyek Anda?',
    sub: 'Saya bisa bantu Anda membangun produk serupa — atau yang lebih kompleks dari ini. Diskusi awal, gratis tanpa komitmen.',
    button: 'Hubungi Saya via WhatsApp',
  },
  en: {
    eyebrow: 'Interested?',
    headlinePre: "Let's Build",
    headlineAccent: 'Your Project Together',
    sub: "I can help you build a similar product — or something more complex than this. Let's talk first, free with no commitment.",
    button: 'Contact Me via WhatsApp',
  },
}

function WhatsAppIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z" />
      <path d="M12 0C5.373 0 0 5.373 0 12c0 2.117.554 4.104 1.523 5.827L.057 23.428a.75.75 0 00.916.916l5.601-1.466A11.945 11.945 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.75a9.695 9.695 0 01-4.947-1.354l-.355-.21-3.664.96.976-3.566-.23-.368A9.698 9.698 0 012.25 12C2.25 6.615 6.615 2.25 12 2.25S21.75 6.615 21.75 12 17.385 21.75 12 21.75z" />
    </svg>
  );
}

export default function ProjectCTA({ project }) {
  const sectionRef = useRef(null);
  const contentRef = useRef(null);
  const { lang } = useLanguage();
  const c = CTA_CONTENT[lang] ?? CTA_CONTENT.id;

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
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const waUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(siteConfig.whatsappMessage)}`;

  return (
    <section ref={sectionRef} className="relative py-16 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-16" />

      <div ref={contentRef} className="relative rounded-3xl border border-white/8 bg-[#111111] overflow-hidden px-8 py-14 md:px-14 text-center">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-[200px] bg-[#7F77DD]/6 blur-[60px] rounded-full" />
        </div>

        <p className="text-xs font-semibold uppercase tracking-widest text-[#7F77DD] mb-4" style={{ fontFamily: "var(--font-mono)" }}>
          {c.eyebrow}
        </p>

        <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">
          {c.headlinePre}{" "}
          <span className="text-[#7F77DD]">{c.headlineAccent}</span>
        </h2>

        <p className="text-sm text-white/40 max-w-sm mx-auto mb-8 leading-relaxed">
          {c.sub}
        </p>

        <a
          href={waUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-6 py-3 bg-[#7F77DD] hover:bg-[#6d66cc] text-white font-semibold text-sm rounded-xl transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_24px_rgba(127,119,221,0.4)]"
        >
          <WhatsAppIcon />
          {c.button}
        </a>
      </div>
    </section>
  );
}