"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useLanguage } from "@/context/LanguageContext";

gsap.registerPlugin(ScrollTrigger);

function StarIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="#7F77DD" stroke="none">
      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
    </svg>
  );
}

function TestimonialCard({ item, index }) {
  const cardRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(cardRef.current, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.7, delay: index * 0.12, ease: "power3.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 88%", toggleActions: "play none none none" },
      });
    });
    return () => ctx.revert();
  }, [index]);

  return (
    <div ref={cardRef} className="relative rounded-2xl border border-white/8 bg-[#111111] p-7 flex flex-col gap-5 hover:border-[#7F77DD]/30 transition-colors duration-300">
      <div className="flex items-center gap-1">
        {Array.from({ length: item.rating ?? 5 }).map((_, i) => <StarIcon key={i} />)}
      </div>
      <p className="text-sm text-white/60 leading-relaxed flex-1">&ldquo;{item.text}&rdquo;</p>
      <div className="flex items-center gap-3 pt-2 border-t border-white/5">
        <div className="w-9 h-9 rounded-full bg-[#7F77DD]/20 border border-[#7F77DD]/30 flex items-center justify-center flex-shrink-0">
          <span className="text-xs font-bold text-[#7F77DD]">{item.name.slice(0, 1)}</span>
        </div>
        <div>
          <p className="text-sm font-semibold text-white">{item.name}</p>
          <p className="text-xs text-white/35">{item.role}</p>
        </div>
      </div>
    </div>
  );
}

export default function Testimonials() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const { t } = useLanguage();
  const tm = t.testimonials;

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current, { opacity: 0, y: 32 }, {
        opacity: 1, y: 0, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: headerRef.current, start: "top 85%", toggleActions: "play none none none" },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="testimonials" ref={sectionRef} className="relative py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto">
      <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-24" />

      <div ref={headerRef} className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-px bg-[#7F77DD]" />
          <span className="text-xs font-semibold uppercase tracking-widest text-[#7F77DD]" style={{ fontFamily: "var(--font-mono)" }}>
            {tm.eyebrow}
          </span>
        </div>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
            {tm.headline}{" "}
            <span className="relative">
              {tm.headlineAccent}
              <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-[#7F77DD] to-transparent opacity-60" />
            </span>
          </h2>
          <p className="text-sm text-white/35 max-w-xs leading-relaxed">{tm.sub}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {tm.items.map((item, index) => (
          <TestimonialCard key={index} item={item} index={index} />
        ))}
      </div>
    </section>
  );
}