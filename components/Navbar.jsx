'use client'

import { useEffect, useRef, useState } from 'react'
import { siteConfig } from '@/data/projects'
import { formatWhatsApp } from '@/lib/utils'
import { useLanguage } from '@/context/LanguageContext'

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false)
  const navRef = useRef(null)
  const wrapRef = useRef(null)
  const rafRef = useRef(0)
  const progRef = useRef(0)
  const { lang, toggleLang, t } = useLanguage()

  useEffect(() => {
    const THRESHOLD = 60
    const SPEED_IN = 0.04
    const SPEED_OUT = 0.055

    function lerp(a, b, t) { return a + (b - a) * t }
    function ease(t) { return 1 - Math.pow(1 - t, 5) }

    function applyStyles(p) {
      const nav = navRef.current
      const wrap = wrapRef.current
      if (!nav || !wrap) return

      const ep = ease(p)
      const borderRadius = lerp(0, 999, ep)
      const scale = lerp(1, 0.96, ep)
      const translateY = lerp(0, 14, ep)
      const vw = window.innerWidth
      const startW = vw - 32
      const endW = Math.min(920, vw - 32)
      const widthPx = lerp(startW, endW, ep)
      const paddingV = lerp(12, 10, ep)
      const paddingH = lerp(24, 16, ep)
      const bgAlpha = lerp(0, 0.85, ep)
      const blurVal = lerp(0, 24, ep)
      const borderR = lerp(0, 139, ep)
      const borderG = lerp(0, 92, ep)
      const borderB = lerp(0, 246, ep)
      const borderA = lerp(0, 0.25, ep)
      const glow1A = lerp(0, 0.18, ep)
      const glow2A = lerp(0, 0.09, ep)
      const shadowA = lerp(0, 0.45, ep)
      const insetA = lerp(0, 0.1, ep)

      wrap.style.width = widthPx + 'px'
      nav.style.backdropFilter = 'blur(' + blurVal + 'px)'
      nav.style.WebkitBackdropFilter = 'blur(' + blurVal + 'px)'
      nav.style.border = '1px solid rgba(' + borderR + ',' + borderG + ',' + borderB + ',' + borderA + ')'
      nav.style.borderRadius = borderRadius + 'px'
      nav.style.boxShadow = [
        '0 0 30px rgba(139,92,246,' + glow1A + ')',
        '0 0 70px rgba(139,92,246,' + glow2A + ')',
        '0 8px 32px rgba(0,0,0,' + shadowA + ')',
        'inset 0 1px 0 rgba(255,255,255,' + insetA + ')',
      ].join(', ')
      nav.style.transform = 'translateY(' + translateY + 'px) scale(' + scale + ')'
      nav.style.padding = paddingV + 'px ' + paddingH + 'px'
    }

    let target = 0
    function tick() {
      target = window.scrollY > THRESHOLD ? 1 : 0
      const speed = target > progRef.current ? SPEED_IN : SPEED_OUT
      progRef.current = lerp(progRef.current, target, speed)
      if (Math.abs(progRef.current - target) < 0.0008) progRef.current = target
      applyStyles(progRef.current)
      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  function handleMouseEnter(e) {
    var el = e.currentTarget
    el.style.background = 'rgba(139,92,246,0.12)'
    el.style.border = '1px solid rgba(139,92,246,0.3)'
    el.style.boxShadow = '0 0 20px rgba(139,92,246,0.15)'
    el.style.transform = 'scale(1.03)'
    el.style.transition = 'all 300ms ease'
    el.style.color = '#ffffff'
  }

  function handleMouseLeave(e) {
    var el = e.currentTarget
    el.style.background = 'transparent'
    el.style.border = '1px solid transparent'
    el.style.boxShadow = 'none'
    el.style.transform = 'scale(1)'
    el.style.color = ''
  }

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">
      <div ref={wrapRef} style={{ width: '100%', transition: 'none', willChange: 'width' }}>
        <nav
          ref={navRef}
          style={{
            background: 'rgba(10,10,10,0.92)',
            border: '1px solid transparent',
            borderRadius: '0px',
            boxShadow: 'none',
            transform: 'translateY(0px) scale(1)',
            padding: '12px 20px',
            transition: 'none',
            willChange: 'transform, box-shadow, border-radius, border',
          }}
        >
          {/* Top bar */}
          <div className="flex items-center justify-between gap-2">

            {/* Logo */}
            <a
              href="/"
              className="font-mono text-sm text-accent tracking-widest uppercase hover:opacity-70 transition-opacity flex-shrink-0"
            >
              FS<span className="text-muted">.</span>
            </a>

            {/* Desktop nav links — center */}
            <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
              {t.nav.links.map(function(link) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className="px-3 py-1.5 text-sm text-muted rounded-lg whitespace-nowrap"
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {link.label}
                  </a>
                )
              })}
            </div>

            {/* Mobile center — tagline singkat */}
            <span className="flex md:hidden flex-1 justify-center text-xs text-white/20 font-mono tracking-widest truncate px-3">
              Web · App · AI
            </span>

            {/* Desktop right */}
            <div className="hidden md:flex items-center gap-2 flex-shrink-0">
              <button
                onClick={toggleLang}
                aria-label="Toggle language"
                className="flex items-center rounded-full border border-white/20 overflow-hidden text-xs font-mono font-semibold"
                style={{ height: '28px' }}
              >
                <span className="px-2.5 h-full flex items-center transition-colors duration-200" style={{ background: lang === 'id' ? '#7F77DD' : 'transparent', color: lang === 'id' ? '#ffffff' : 'rgba(255,255,255,0.4)' }}>ID</span>
                <span className="px-2.5 h-full flex items-center transition-colors duration-200" style={{ background: lang === 'en' ? '#7F77DD' : 'transparent', color: lang === 'en' ? '#ffffff' : 'rgba(255,255,255,0.4)' }}>EN</span>
              </button>
              <a
                href={formatWhatsApp(siteConfig.whatsapp, siteConfig.whatsappMessage)}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/40 text-sm text-accent hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 flex-shrink-0"
              >
                {t.nav.hireMe}
              </a>
            </div>

            {/* Mobile right: lang toggle + hamburger */}
            <div className="flex md:hidden items-center gap-3 flex-shrink-0">
              <button
                onClick={toggleLang}
                aria-label="Toggle language"
                className="flex items-center rounded-full border border-white/20 overflow-hidden text-xs font-mono font-semibold"
                style={{ height: '26px' }}
              >
                <span className="px-2 h-full flex items-center transition-colors duration-200" style={{ background: lang === 'id' ? '#7F77DD' : 'transparent', color: lang === 'id' ? '#ffffff' : 'rgba(255,255,255,0.4)' }}>ID</span>
                <span className="px-2 h-full flex items-center transition-colors duration-200" style={{ background: lang === 'en' ? '#7F77DD' : 'transparent', color: lang === 'en' ? '#ffffff' : 'rgba(255,255,255,0.4)' }}>EN</span>
              </button>
              <button
                onClick={function() { setMenuOpen(!menuOpen) }}
                className="flex flex-col gap-1.5 p-1"
                aria-label="Toggle menu"
              >
                <span className={'block w-5 h-px bg-white transition-all duration-300 ' + (menuOpen ? 'rotate-45 translate-y-2' : '')} />
                <span className={'block w-5 h-px bg-white transition-all duration-300 ' + (menuOpen ? 'opacity-0' : '')} />
                <span className={'block w-5 h-px bg-white transition-all duration-300 ' + (menuOpen ? '-rotate-45 -translate-y-2' : '')} />
              </button>
            </div>
          </div>

          {/* Mobile dropdown — solid background biar orb Hero ga tembus */}
          {menuOpen && (
            <div className="md:hidden mt-3 rounded-2xl overflow-hidden" style={{ background: 'rgba(10,10,10,0.98)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div className="flex flex-col py-2">
                {t.nav.links.map(function(link) {
                  return (
                    <a
                      key={link.href}
                      href={link.href}
                      onClick={function() { setMenuOpen(false) }}
                      className="text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors px-5 py-3"
                    >
                      {link.label}
                    </a>
                  )
                })}
                <div className="mx-5 my-3 pt-3 border-t border-white/8">
                  <a
                    href={formatWhatsApp(siteConfig.whatsapp, siteConfig.whatsappMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-accent text-white text-sm font-medium w-full justify-center"
                  >
                    {t.nav.hireMe}
                  </a>
                </div>
              </div>
            </div>
          )}
        </nav>
      </div>
    </div>
  )
}