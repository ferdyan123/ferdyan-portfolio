'use client'

import { useEffect, useRef } from 'react'
import { siteConfig } from '@/data/projects'
import { formatWhatsApp } from '@/lib/utils'

export default function Hero() {
  const headingRef = useRef(null)

  useEffect(() => {
    const letters = headingRef.current?.querySelectorAll('.letter')
    if (!letters) return
    letters.forEach((el, i) => {
      el.style.animationDelay = `${i * 0.04}s`
      el.classList.add('animate-fade-up')
    })
  }, [])

  const splitText = (text) =>
    text.split('').map((char, i) => (
      <span
        key={i}
        className="letter inline-block opacity-0"
        style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
      >
        {char}
      </span>
    ))

  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 max-w-6xl mx-auto pt-24 pb-16">
      <div className="flex items-center gap-3 mb-8">
        <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
        <span className="font-mono text-xs text-muted tracking-widest uppercase">
          Available for work
        </span>
      </div>

      <h1
        ref={headingRef}
        className="text-5xl md:text-7xl lg:text-8xl font-bold leading-tight tracking-tight mb-6"
      >
        {splitText("I Don't Just")}
        <br />
        <span className="text-accent">{splitText('Build Websites.')}</span>
        <br />
        {splitText('I Build Products.')}
      </h1>

      <p className="text-muted text-lg md:text-xl max-w-xl mb-10 leading-relaxed">
        {siteConfig.subTagline} — Web apps, landing pages, dan digital
        products untuk pasar Indonesia.
      </p>

      <div className="flex flex-wrap items-center gap-4">
        <a
          href={formatWhatsApp(
            siteConfig.whatsapp,
            siteConfig.whatsappMessage
          )}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-full font-medium hover:bg-accent-dim transition-all duration-300 hover:scale-105"
        >
          Hubungi via WhatsApp
        </a>
        <a
          href="#works"
          className="flex items-center gap-2 px-6 py-3 border border-border text-white rounded-full font-medium hover:border-accent hover:text-accent transition-all duration-300"
        >
          Lihat Projects
        </a>
      </div>

      <div className="flex flex-wrap gap-8 mt-16 pt-8 border-t border-border">
        <div>
          <p className="text-2xl font-bold text-white">8+</p>
          <p className="text-xs text-muted mt-1 font-mono">Projects</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-white">98%</p>
          <p className="text-xs text-muted mt-1 font-mono">Satisfaction</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-white">7-14</p>
          <p className="text-xs text-muted mt-1 font-mono">Days Delivery</p>
        </div>
        <div>
          <p className="text-2xl font-bold text-white">1yr</p>
          <p className="text-xs text-muted mt-1 font-mono">Experience</p>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="font-mono text-xs text-muted">scroll</span>
        <div className="w-px h-8 bg-muted animate-pulse" />
      </div>
    </section>
  )
}