'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

export default function Process() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const stepsRef = useRef([])
  const lineRef = useRef(null)
  const { t } = useLanguage()
  const p = t.process

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
      })
      gsap.fromTo(lineRef.current, { scaleX: 0 }, {
        scaleX: 1, duration: 1.2, ease: 'power2.inOut',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
      })
      gsap.fromTo(stepsRef.current, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.55, ease: 'power2.out', stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 65%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="process" ref={sectionRef} className="relative py-28 px-6 overflow-hidden">
      <div className="absolute inset-0 bg-surface/20 pointer-events-none" />
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] rounded-full opacity-[0.03] pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #7F77DD 0%, transparent 70%)' }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-accent text-sm tracking-widest uppercase">08</span>
          <div className="h-px w-12 bg-accent opacity-40" />
          <span className="font-mono text-muted text-sm tracking-widest uppercase">{p.eyebrow}</span>
        </div>

        <div ref={headingRef} style={{ opacity: 0 }} className="mb-16">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
            {p.headline}{' '}
            <span className="text-accent">{p.headlineAccent}</span>
          </h2>
          <p className="text-muted text-base md:text-lg max-w-xl leading-relaxed">{p.sub}</p>
        </div>

        {/* Desktop horizontal */}
        <div className="hidden lg:block">
          <div className="relative mb-2">
            <div className="absolute top-5 left-[3.5%] right-[3.5%] h-px bg-border" />
            <div ref={lineRef} className="absolute top-5 left-[3.5%] right-[3.5%] h-px bg-accent/40 origin-left" style={{ scaleX: 0 }} />
          </div>
          <div className="grid grid-cols-7 gap-3 pt-2">
            {p.steps.map((item, i) => (
              <div key={item.step} ref={(el) => (stepsRef.current[i] = el)} style={{ opacity: 0 }} className="group flex flex-col items-center text-center">
                <div className="relative w-10 h-10 rounded-full border border-border bg-surface flex items-center justify-center mb-5 group-hover:border-accent/60 group-hover:bg-accent/10 transition-all duration-300 z-10">
                  <span className="font-mono text-xs font-bold text-accent">{item.step}</span>
                  <div className="absolute inset-0 rounded-full border border-accent/20 scale-0 group-hover:scale-150 opacity-0 group-hover:opacity-0 transition-all duration-500" />
                </div>
                <h4 className="text-white font-semibold text-sm mb-2">{item.title}</h4>
                <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Mobile vertical */}
        <div className="lg:hidden relative">
          <div className="absolute left-5 top-0 bottom-0 w-px bg-border" />
          <div className="flex flex-col gap-8">
            {p.steps.map((item, i) => (
              <div
                key={item.step}
                ref={(el) => { if (!stepsRef.current.includes(el)) stepsRef.current.push(el) }}
                style={{ opacity: 0 }}
                className="group relative flex items-start gap-6 pl-14"
              >
                <div className="absolute left-0 w-10 h-10 rounded-full border border-border bg-surface flex items-center justify-center flex-shrink-0 group-hover:border-accent/60 group-hover:bg-accent/10 transition-all duration-300 z-10">
                  <span className="font-mono text-xs font-bold text-accent">{item.step}</span>
                </div>
                <div className="pt-2">
                  <h4 className="text-white font-semibold text-sm mb-1">{item.title}</h4>
                  <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col sm:flex-row items-start sm:items-center gap-4 p-5 rounded-2xl border border-border/50 bg-surface/50">
          <div className="flex items-center gap-3 flex-shrink-0">
            <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            <span className="text-white text-sm font-medium">{p.availableBadge}</span>
          </div>
          <div className="hidden sm:block h-4 w-px bg-border" />
          <p className="text-muted text-xs">
            {p.noteStart}{' '}
            <span className="text-white font-mono">{p.noteValue1}</span>{' '}
            {p.noteMid}{' '}
            <span className="text-white font-mono">{p.noteValue2}</span>
            {p.noteEnd}
          </p>
        </div>
      </div>
    </section>
  )
}