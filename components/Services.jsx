'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { services } from '@/data/projects'
import { useLanguage } from '@/context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

export default function Services() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const cardsRef = useRef([])
  const { t } = useLanguage()
  const s = t.services

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
      })
      gsap.fromTo(cardsRef.current, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.08,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="services" ref={sectionRef} className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-surface/30 pointer-events-none" />
      <div
        className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full opacity-[0.03] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7F77DD 0%, transparent 70%)' }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-accent text-sm tracking-widest uppercase">04</span>
          <div className="h-px w-12 bg-accent opacity-40" />
          <span className="font-mono text-muted text-sm tracking-widest uppercase">{s.eyebrow}</span>
        </div>

        <div ref={headingRef} style={{ opacity: 0 }} className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {s.headline}{' '}
            <span className="text-accent">{s.headlineAccent}</span>
          </h2>
          <p className="text-muted text-base md:text-lg max-w-xl leading-relaxed">{s.sub}</p>
        </div>

        {/* Data tetap dari projects.js — tidak berubah */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map((service, i) => (
            <div
              key={service.title}
              ref={(el) => (cardsRef.current[i] = el)}
              style={{ opacity: 0 }}
              className="group relative p-6 rounded-2xl border border-border bg-surface hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 cursor-default"
            >
              <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 50% 0%, rgba(127,119,221,0.06) 0%, transparent 70%)' }}
              />
              <div className="w-11 h-11 rounded-xl bg-bg border border-border flex items-center justify-center text-xl mb-4 group-hover:border-accent/30 transition-colors duration-300">
                {service.icon}
              </div>
              <h3 className="text-white font-semibold text-sm mb-2 leading-snug">{service.title}</h3>
              <p className="text-muted text-xs leading-relaxed">{service.desc}</p>
              <div className="absolute bottom-0 left-6 right-6 h-px bg-accent scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left rounded-full" />
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center gap-4">
          <a
            href={`https://wa.me/6281311973602?text=${encodeURIComponent('Halo Ferdyan, saya tertarik untuk diskusi project!')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white text-sm font-semibold hover:bg-accent-dim transition-colors duration-200"
          >
            {s.ctaText} <span>→</span>
          </a>
          <span className="text-muted text-xs font-mono">{s.ctaNote}</span>
        </div>
      </div>
    </section>
  )
}