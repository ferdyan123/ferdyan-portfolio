'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const highlights = [
  { label: 'Digital Product Builder', icon: '📦' },
  { label: 'Freelancer', icon: '🧑‍💻' },
  { label: 'UI-Focused Developer', icon: '✦' },
]

const values = [
  {
    title: 'Bukan sekadar ngoding',
    desc: 'Gue mikir dari sisi user, bisnis, dan visual — bukan cuma nulis kode yang jalan.',
  },
  {
    title: 'AI sebagai co-pilot',
    desc: 'Workflow gue ditenagai AI — hasilnya lebih detail, konsisten, dan jauh lebih cepat dari developer biasa.',
  },
  {
    title: 'Output yang bisa dibanggain',
    desc: 'Setiap project gue anggap portofolio — jadi standarnya selalu produksi, bukan asal jadi.',
  },
]

export default function About() {
  const sectionRef = useRef(null)
  const leftRef = useRef(null)
  const rightRef = useRef(null)
  const valuesRef = useRef([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Left col fade in
      gsap.fromTo(
        leftRef.current,
        { opacity: 0, x: -40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      )

      // Right col fade in
      gsap.fromTo(
        rightRef.current,
        { opacity: 0, x: 40 },
        {
          opacity: 1,
          x: 0,
          duration: 0.9,
          ease: 'power3.out',
          delay: 0.15,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
          },
        }
      )

      // Value cards stagger
      gsap.fromTo(
        valuesRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.12,
          scrollTrigger: {
            trigger: rightRef.current,
            start: 'top 80%',
          },
        }
      )
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-28 px-6 overflow-hidden"
    >
      {/* Subtle background accent */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-[0.04] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7F77DD 0%, transparent 70%)' }}
      />

      <div className="max-w-6xl mx-auto">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-16">
          <span className="font-mono text-accent text-sm tracking-widest uppercase">02</span>
          <div className="h-px w-12 bg-accent opacity-40" />
          <span className="font-mono text-muted text-sm tracking-widest uppercase">About Me</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* LEFT — intro + highlights */}
          <div ref={leftRef} style={{ opacity: 0 }}>
            <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 tracking-tight">
              Building Products{' '}
              <span className="text-accent">With Purpose</span>
            </h2>

            <p className="text-muted leading-relaxed mb-6 text-base md:text-lg">
              Halo, gue{' '}
              <span className="text-white font-semibold">Ferdyan</span> — web developer
              yang fokus bikin produk digital yang tidak cuma keliatan bagus, tapi juga
              benar-benar <span className="text-white font-medium">bekerja untuk bisnis</span>.
            </p>

            <p className="text-muted leading-relaxed mb-10 text-base md:text-lg">
              Dengan pengalaman 1 tahun membangun dan mengkomersialkan produk digital
              untuk pasar Indonesia, gue menggabungkan sense of design yang kuat dengan
              pendekatan teknis yang solid — dibantu workflow berbasis AI untuk hasil
              yang lebih detail dan premium.
            </p>

            {/* Highlights / Tags */}
            <div className="flex flex-wrap gap-3 mb-10">
              {highlights.map((h) => (
                <span
                  key={h.label}
                  className="flex items-center gap-2 px-4 py-2 rounded-full border border-border text-sm font-medium text-white bg-surface"
                >
                  <span>{h.icon}</span>
                  {h.label}
                </span>
              ))}
            </div>

            {/* CTA inline */}
            <a
              href={`https://wa.me/6281311973602?text=${encodeURIComponent('Halo Ferdyan, saya tertarik untuk diskusi project!')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-accent font-semibold text-sm hover:gap-3 transition-all duration-200 group"
            >
              Diskusi project bareng gue
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </a>
          </div>

          {/* RIGHT — value cards */}
          <div ref={rightRef} style={{ opacity: 0 }} className="flex flex-col gap-4">
            {/* AI badge */}
            <div className="flex items-center gap-3 p-4 rounded-xl border border-accent/20 bg-accent/5 mb-2">
              <div className="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-lg flex-shrink-0">
                🤖
              </div>
              <div>
                <p className="text-white font-semibold text-sm">AI-Augmented Developer</p>
                <p className="text-muted text-xs mt-0.5">
                  Berkolaborasi dengan AI untuk menghasilkan output yang lebih detail, konsisten, dan efisien dari developer konvensional.
                </p>
              </div>
            </div>

            {values.map((v, i) => (
              <div
                key={v.title}
                ref={(el) => (valuesRef.current[i] = el)}
                style={{ opacity: 0 }}
                className="group p-5 rounded-xl border border-border bg-surface hover:border-accent/40 transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0 group-hover:scale-125 transition-transform duration-200" />
                  <div>
                    <h4 className="text-white font-semibold mb-1.5 text-sm">{v.title}</h4>
                    <p className="text-muted text-sm leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              </div>
            ))}

            {/* Decorative mono quote */}
            <div className="mt-4 p-4 rounded-xl border border-border/50">
              <p className="font-mono text-xs text-muted/60 leading-relaxed">
                <span className="text-accent/60">// filosofi kerja</span>
                <br />
                <span className="text-white/40">const</span>{' '}
                <span className="text-accent/80">output</span>{' '}
                <span className="text-white/40">=</span>{' '}
                <span className="text-white/60">quality</span>{' '}
                <span className="text-white/40">+</span>{' '}
                <span className="text-white/60">speed</span>{' '}
                <span className="text-white/40">+</span>{' '}
                <span className="text-white/60">care</span>
                <span className="text-white/40">;</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}