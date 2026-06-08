'use client'

import { useEffect, useState } from 'react'
import { siteConfig } from '@/data/projects'
import { formatWhatsApp } from '@/lib/utils'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navLinks = [
    { label: 'Works', href: '#works' },
    { label: 'Skills', href: '#skills' },
    { label: 'Testimonials', href: '#testimonials' },
    { label: 'Contact', href: '#cta' },
  ]

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center pt-4 px-4">

      {/* Floating pill navbar */}
      <nav
        style={{
          background: scrolled ? 'rgba(10,10,10,0.75)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px)' : 'none',
          border: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
          borderRadius: scrolled ? '999px' : '0px',
          boxShadow: scrolled ? '0 8px 32px rgba(0,0,0,0.4)' : 'none',
          transform: scrolled ? 'translateY(0px)' : 'translateY(-4px)',
          opacity: 1,
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          width: scrolled ? 'auto' : '100%',
          maxWidth: scrolled ? '680px' : '100%',
          padding: scrolled ? '10px 24px' : '12px 24px',
        }}
      >
        <div className="flex items-center justify-between gap-8">

          {/* Logo */}
          <a href="/" className="font-mono text-sm text-accent tracking-widest uppercase hover:opacity-70 transition-opacity flex-shrink-0">
            FS<span className="text-muted">.</span>
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-muted hover:text-white transition-colors duration-200 whitespace-nowrap"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* CTA */}
          <a
            href={formatWhatsApp(siteConfig.whatsapp, siteConfig.whatsappMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-4 py-1.5 rounded-full border border-accent/40 text-sm text-accent hover:bg-accent hover:text-white hover:border-accent transition-all duration-300 flex-shrink-0"
          >
            Hire Me
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-1.5 p-1"
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-px bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-px bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-px bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ${menuOpen ? 'max-h-64 mt-4' : 'max-h-0'}`}
        >
          <div className="flex flex-col gap-4 pb-2">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-sm text-muted hover:text-white transition-colors"
              >
                {link.label}
              </a>
            ))}
            <a
              href={formatWhatsApp(siteConfig.whatsapp, siteConfig.whatsappMessage)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent"
            >
              Hire Me
            </a>
          </div>
        </div>
      </nav>
    </div>
  )
}