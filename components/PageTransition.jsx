'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

// Global ref yang bisa diakses dari hook
export let curtainRef = { current: null }
export let isAnimating = { current: false }

export default function PageTransition() {
  const el = useRef(null)

  useEffect(() => {
    curtainRef.current = el.current

    // Pastikan curtain tersembunyi di bawah layar saat pertama load
    gsap.set(el.current, { yPercent: 100 })

    // Animasi masuk: curtain turun keluar layar (dari atas ke bawah)
    // Dipanggil setelah router.push selesai & halaman baru mount
    const handleRouteComplete = () => {
      if (!el.current) return
      gsap.to(el.current, {
        yPercent: -100,
        duration: 0.35,
        ease: 'power2.inOut',
        onComplete: () => {
          // Reset posisi ke bawah layar setelah selesai, siap untuk transisi berikutnya
          gsap.set(el.current, { yPercent: 100 })
          isAnimating.current = false
        },
      })
    }

    window.addEventListener('page-transition-complete', handleRouteComplete)
    return () => window.removeEventListener('page-transition-complete', handleRouteComplete)
  }, [])

  return (
    <div
      ref={el}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        backgroundColor: '#7F77DD',
        transform: 'translateY(100%)',
        pointerEvents: 'none',
      }}
    >
      {/* Flash accent → dark effect via CSS animation */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: '#0a0a0a',
          animation: 'curtainFlash 0.1s ease forwards',
        }}
      />
      <style>{`
        @keyframes curtainFlash {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  )
}