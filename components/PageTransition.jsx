'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useTransitionContext } from '@/components/TransitionContext'

export default function PageTransition() {
  const el = useRef(null)
  const ctx = useTransitionContext()

  useEffect(() => {
    if (!el.current || !ctx) return

    // Share ref ke context
    ctx.curtainRef.current = el.current

    // Sembunyikan di bawah layar
    gsap.set(el.current, { yPercent: 100 })

    // Saat halaman baru mount → curtain turun keluar
    const handleComplete = () => {
      if (!el.current) return
      gsap.to(el.current, {
        yPercent: -100,
        duration: 0.35,
        ease: 'power2.inOut',
        onComplete: () => {
          gsap.set(el.current, { yPercent: 100 })
          ctx.isAnimating.current = false
        },
      })
    }

    window.addEventListener('page-transition-complete', handleComplete)
    return () => window.removeEventListener('page-transition-complete', handleComplete)
  }, [ctx])

  return (
    <div
      ref={el}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        transform: 'translateY(100%)',
        background: '#0a0a0a',
        borderTop: '3px solid #7F77DD',
      }}
    />
  )
}