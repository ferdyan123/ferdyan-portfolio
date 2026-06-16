'use client'

import { useEffect, useRef } from 'react'
import Image from 'next/image'
import { siteConfig } from '@/data/projects'
import { formatWhatsApp } from '@/lib/utils'
import { useLanguage } from '@/context/LanguageContext'

export default function Hero() {
  const card1Ref = useRef(null)
  const card2Ref = useRef(null)
  const { t } = useLanguage()
  const h = t.hero

  useEffect(() => {
    let time = 0
    let animId
    const float = () => {
      time += 0.02
      if (card1Ref.current) card1Ref.current.style.transform = `translateY(${Math.sin(time) * 6}px)`
      if (card2Ref.current) card2Ref.current.style.transform = `translateY(${Math.sin(time + 1.5) * 6}px)`
      animId = requestAnimationFrame(float)
    }
    animId = requestAnimationFrame(float)
    return () => cancelAnimationFrame(animId)
  }, [])

  useEffect(() => {
    const initGSAP = async () => {
      const { gsap } = await import('gsap')
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })
      tl.fromTo('.hero-label', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 })
        .fromTo('.hero-heading', { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, '-=0.3')
        .fromTo('.hero-sub', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.4')
        .fromTo('.hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, '-=0.3')
        .fromTo('.hero-img-wrap', { opacity: 0, x: 40 }, { opacity: 1, x: 0, duration: 0.8 }, '-=0.8')
        .fromTo('.hero-card', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5, stagger: 0.15 }, '-=0.4')
    }
    initGSAP()
  }, [])

  return (
    <section className="relative w-full overflow-hidden" style={{ minHeight: '100vh', paddingTop: '80px' }}>
      {/* Background orb */}
      <div
        className="absolute top-1/3 right-0 w-[500px] h-[500px] rounded-full opacity-10 blur-[140px] pointer-events-none"
        style={{ background: 'radial-gradient(circle, #7F77DD 0%, transparent 70%)' }}
      />

      <div className="w-full max-w-6xl mx-auto px-6 flex flex-col lg:flex-row gap-8 lg:gap-0">

        {/* LEFT — Text */}
        <div className="flex flex-col justify-center lg:w-1/2 py-16 pr-8">

          {/* Badge */}
          <div className="hero-label flex items-center gap-3 mb-8 opacity-0">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="font-mono text-xs text-muted tracking-widest uppercase">
              🟣 {h.badge}
            </span>
          </div>

          {/* Headline */}
          <h1 className="hero-heading text-5xl md:text-6xl font-bold leading-[1.05] tracking-tight mb-6 opacity-0">
            {h.headlineLine1}<br />
            <span className="text-accent">{h.headlineAccent}</span> {h.headlineLine2}<br />
            {h.headlineLine3}
          </h1>

          {/* Sub */}
          <p className="hero-sub text-muted text-base md:text-lg max-w-md mb-10 leading-relaxed opacity-0">
            {h.subTagline}
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta flex flex-wrap items-center gap-4 mb-10 opacity-0">
            <a
              href={formatWhatsApp(siteConfig.whatsapp, siteConfig.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-full font-medium hover:bg-accent-dim transition-all duration-300 hover:scale-105"
            >
              {h.ctaPrimary}
            </a>
            <a
              href="#works"
              className="flex items-center gap-2 px-6 py-3 border border-border text-white rounded-full font-medium hover:border-accent hover:text-accent transition-all duration-300"
            >
              {h.ctaSecondary}
            </a>
          </div>

          {/* Stats */}
          <div className="hero-cta opacity-0">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {h.stats.map((s) => (
                <div
                  key={s.label}
                  className="group relative flex flex-col justify-between p-4 rounded-2xl border border-border bg-surface hover:border-accent/40 hover:bg-accent/5 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-12 h-12 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: 'radial-gradient(circle, rgba(127,119,221,0.15) 0%, transparent 70%)', transform: 'translate(30%, -30%)' }}
                  />
                  <p className="text-2xl font-bold text-white font-mono mb-1 group-hover:text-accent transition-colors duration-300">
                    {s.value}
                  </p>
                  <p className="text-[11px] text-muted leading-tight">{s.label}</p>
                  <div className="absolute bottom-0 left-0 h-[2px] w-0 group-hover:w-full bg-accent/50 transition-all duration-500 rounded-full" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT — Photo */}
        <div
          className="hero-img-wrap lg:w-1/2 hidden lg:flex items-start justify-center opacity-0"
          style={{ paddingTop: '140px', paddingLeft: '20px' }}
        >
          <div className="relative" style={{ width: '300px', height: '400px' }}>
            <div className="absolute rounded-[2rem]" style={{ inset: 0, background: 'linear-gradient(135deg, #3d3494, #1e1b4b)', transform: 'translate(14px, 14px)', zIndex: 1 }} />
            <div className="absolute rounded-[2rem]" style={{ inset: 0, background: 'linear-gradient(135deg, #7F77DD, #534AB7)', transform: 'translate(7px, 7px)', zIndex: 2, opacity: 0.7 }} />
            <div className="absolute rounded-[2rem] overflow-hidden border border-white/10" style={{ inset: 0, zIndex: 3, boxShadow: '0 20px 60px rgba(127,119,221,0.25)' }}>
              <Image src="/profile.png" alt="Ferdyan Syahwal" fill className="object-cover object-top" priority />
              <div className="absolute bottom-0 left-0 right-0 h-1/4 bg-gradient-to-t from-bg/60 to-transparent" />
            </div>

            {/* Floating card 1 */}
            <div
              ref={card1Ref}
              className="hero-card absolute opacity-0 bg-surface/95 backdrop-blur-md border border-border rounded-2xl px-4 py-3 flex items-center gap-3"
              style={{ top: '-16px', left: '-80px', zIndex: 10, boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
            >
              <div className="w-2 h-2 rounded-full bg-accent animate-pulse flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-white whitespace-nowrap">{h.floatingCard1Title}</p>
                <p className="text-xs text-muted">{h.floatingCard1Sub}</p>
              </div>
            </div>

            {/* Floating card 2 */}
            <div
              ref={card2Ref}
              className="hero-card absolute opacity-0 bg-surface/95 backdrop-blur-md border border-border rounded-2xl px-4 py-3 flex items-center gap-3"
              style={{ bottom: '-16px', right: '-80px', zIndex: 10, boxShadow: '0 8px 32px rgba(0,0,0,0.4)' }}
            >
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
              <div>
                <p className="text-sm font-bold text-white whitespace-nowrap">{h.floatingCard2Title}</p>
                <p className="text-xs text-muted">{h.floatingCard2Sub}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}