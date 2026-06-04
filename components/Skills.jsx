"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { skills } from "@/data/projects";

gsap.registerPlugin(ScrollTrigger);

const CATEGORY_ORDER = ["Frontend", "Backend", "Tools"];

function SkillBar({ skill, index }) {
  const barRef = useRef(null);
  const fillRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        barRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          delay: index * 0.07,
          ease: "power3.out",
          scrollTrigger: {
            trigger: barRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
      gsap.fromTo(
        fillRef.current,
        { width: "0%" },
        {
          width: `${skill.level}%`,
          duration: 1.2,
          delay: index * 0.07 + 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: barRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        }
      );
    });
    return () => ctx.revert();
  }, [skill.level, index]);

  return (
    <div ref={barRef} className="group">
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-white/80 group-hover:text-white transition-colors duration-200">
          {skill.name}
        </span>
        <span
          className="text-xs text-white/30 tabular-nums group-hover:text-[#7F77DD] transition-colors duration-200"
          style={{ fontFamily: "var(--font-mono)" }}
        >
          {skill.level}%
        </span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div
          ref={fillRef}
          className="h-full rounded-full bg-gradient-to-r from-[#7F77DD] to-[#a09aeb]"
          style={{ width: "0%" }}
        />
      </div>
    </div>
  );
}

export default function Skills() {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);

  // Group skills by category
  const grouped = CATEGORY_ORDER.reduce((acc, cat) => {
    const items = skills.filter((s) => s.category === cat);
    if (items.length > 0) acc[cat] = items;
    return acc;
  }, {});

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headerRef.current,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative py-24 md:py-32 px-6 md:px-10 max-w-7xl mx-auto"
    >
      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-white/8 to-transparent mb-24" />

      {/* Header */}
      <div ref={headerRef} className="mb-16">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-6 h-px bg-[#7F77DD]" />
          <span
            className="text-xs font-semibold uppercase tracking-widest text-[#7F77DD]"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            Toolkit
          </span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black text-white leading-tight tracking-tight">
          What I Work{" "}
          <span className="relative">
            With
            <span className="absolute -bottom-1 left-0 w-full h-px bg-gradient-to-r from-[#7F77DD] to-transparent opacity-60" />
          </span>
        </h2>
      </div>

      {/* Skills grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-16">
        {Object.entries(grouped).map(([category, items]) => (
          <div key={category}>
            {/* Category label */}
            <div className="flex items-center gap-2 mb-6">
              <span
                className="text-[11px] font-semibold uppercase tracking-widest text-white/25"
                style={{ fontFamily: "var(--font-mono)" }}
              >
                {category}
              </span>
              <div className="flex-1 h-px bg-white/5" />
            </div>

            {/* Skill bars */}
            <div className="flex flex-col gap-5">
              {items.map((skill, i) => (
                <SkillBar key={skill.name} skill={skill} index={i} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}