'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLanguage } from '@/context/LanguageContext'

gsap.registerPlugin(ScrollTrigger)

export default function WhyMe() {
  const sectionRef = useRef(null)
  const headingRef = useRef(null)
  const statsRef = useRef([])
  const cardsRef = useRef([])
  const { t } = useLanguage()
  const w = t.whyme

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headingRef.current, { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: headingRef.current, start: 'top 80%' },
      })
      gsap.fromTo(statsRef.current, { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.5, ease: 'power2.out', stagger: 0.1,
        scrollTrigger: { trigger: headingRef.current, start: 'top 75%' },
      })
      gsap.fromTo(cardsRef.current, { opacity: 0, y: 40 }, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out', stagger: 0.1,
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="why-me" ref={sectionRef} className="relative py-28 px-6 overflow-hidden">
      <div
        className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full opacity-[0.05] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7F77DD 0%, transparent 70%)' }}
      />

      <div className="relative max-w-6xl mx-auto">
        <div className="flex items-center gap-3 mb-12">
          <span className="font-mono text-accent text-sm tracking-widest uppercase">05</span>
          <div className="h-px w-12 bg-accent opacity-40" />
          <span className="font-mono text-muted text-sm tracking-widest uppercase">{w.eyebrow}</span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16 items-end">
          <div ref={headingRef} style={{ opacity: 0 }}>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
              {w.headline}{' '}
              <span className="text-accent">{w.headlineAccent}</span>
            </h2>
            <p className="text-muted text-base md:text-lg leading-relaxed max-w-md">{w.sub}</p>
          </div>

          {/* Stats — dari t.hero.stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4 gap-4">
            {t.hero.stats.map((stat, i) => (
              <div
                key={stat.label}
                ref={(el) => (statsRef.current[i] = el)}
                style={{ opacity: 0 }}
                className="p-4 rounded-xl border border-border bg-surface text-center"
              >
                <p className="text-2xl font-bold text-accent font-mono mb-1">{stat.value}</p>
                <p className="text-muted text-xs leading-tight">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Cards — dari t.whyme.cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {w.cards.map((item, i) => (
            <div
              key={item.title}
              ref={(el) => (cardsRef.current[i] = el)}
              style={{ opacity: 0 }}
              className="group relative p-6 rounded-2xl border border-border bg-surface hover:border-accent/40 transition-all duration-300"
            >
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ background: 'radial-gradient(circle at 50% 0%, rgba(127,119,221,0.07) 0%, transparent 70%)' }}
              />
              <div className="text-2xl mb-4">{item.icon}</div>
              <h3 className="text-white font-semibold text-sm mb-2">{item.title}</h3>
              <p className="text-muted text-xs leading-relaxed">{item.desc}</p>
              <span className="absolute bottom-4 right-5 font-mono text-4xl font-bold text-white/[0.03] select-none pointer-events-none">
                {String(i + 1).padStart(2, '0')}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-12 flex items-center gap-4 p-5 rounded-2xl border border-border/50 bg-surface/50">
          <div className="text-3xl flex-shrink-0">💬</div>
          <p className="text-muted text-sm leading-relaxed">
            <span className="text-white font-medium">{w.quote}</span>{' '}{w.quoteEnd}
          </p>
        </div>
      </div>
    </section>
  )
}