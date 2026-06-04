'use client'

import { useEffect, useState } from 'react'
import { siteConfig } from '@/data/projects'
import { formatWhatsApp } from '@/lib/utils'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
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
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-bg/80 backdrop-blur-md border-b border-border' : 'bg-transparent'}`}>
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">

        <a href="/" className="font-mono text-sm text-accent tracking-widest uppercase hover:opacity-70 transition-opacity">
          FS<span className="text-muted">.</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="text-sm text-muted hover:text-white transition-colors duration-200">
              {link.label}
            </a>
          ))}
        </div>

        <a href={formatWhatsApp(siteConfig.whatsapp, siteConfig.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 text-sm text-accent hover:bg-accent hover:text-white transition-all duration-300">
          Hire Me
        </a>

        <button onClick={() => setMenuOpen(!menuOpen)} className="md:hidden flex flex-col gap-1.5 p-1" aria-label="Toggle menu">
          <span className={`block w-5 h-px bg-white transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-5 h-px bg-white transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-5 h-px bg-white transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      <div className={`md:hidden transition-all duration-300 overflow-hidden ${menuOpen ? 'max-h-64 border-b border-border' : 'max-h-0'} bg-bg/95 backdrop-blur-md`}>
        <div className="px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} onClick={() => setMenuOpen(false)} className="text-sm text-muted hover:text-white transition-colors">
              {link.label}
            </a>
          ))}
          <a href={formatWhatsApp(siteConfig.whatsapp, siteConfig.whatsappMessage)} target="_blank" rel="noopener noreferrer" className="text-sm text-accent">
            Hire Me
          </a>
        </div>
      </div>
    </nav>
  )
}
