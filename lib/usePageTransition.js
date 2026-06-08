'use client'

import { useRouter } from 'next/navigation'
import { gsap } from 'gsap'
import { curtainRef, isAnimating } from '@/components/PageTransition'

export function usePageTransition() {
  const router = useRouter()

  const navigateTo = (href) => {
    // Cegah double trigger
    if (isAnimating.current) return
    if (!curtainRef.current) {
      router.push(href)
      return
    }

    isAnimating.current = true

    // Step 1: Reset posisi curtain ke bawah layar
    gsap.set(curtainRef.current, { yPercent: 100 })

    // Step 2: Curtain naik menutup layar (bawah → atas)
    gsap.to(curtainRef.current, {
      yPercent: 0,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => {
        // Step 3: Navigasi ke halaman baru
        router.push(href)

        // Step 4: Trigger curtain keluar setelah sedikit delay
        // (beri waktu halaman baru untuk mount)
        setTimeout(() => {
          window.dispatchEvent(new Event('page-transition-complete'))
        }, 120)
      },
    })
  }

  return { navigateTo }
}