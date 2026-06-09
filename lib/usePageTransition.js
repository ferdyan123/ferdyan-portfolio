'use client'

import { useRouter } from 'next/navigation'
import { gsap } from 'gsap'
import { useTransitionContext } from '@/components/TransitionContext'

export function usePageTransition() {
  const router = useRouter()
  const ctx = useTransitionContext()

  const navigateTo = (href) => {
    if (!ctx) { router.push(href); return }
    if (ctx.isAnimating.current) return

    const curtain = ctx.curtainRef.current
    if (!curtain) { router.push(href); return }

    ctx.isAnimating.current = true

    // Reset ke bawah layar
    gsap.set(curtain, { yPercent: 100 })

    // Naik menutup layar
    gsap.to(curtain, {
      yPercent: 0,
      duration: 0.4,
      ease: 'power2.inOut',
      onComplete: () => {
        router.push(href)
        // Trigger reveal setelah halaman baru mount
        setTimeout(() => {
          window.dispatchEvent(new Event('page-transition-complete'))
        }, 150)
      },
    })
  }

  return { navigateTo }
}