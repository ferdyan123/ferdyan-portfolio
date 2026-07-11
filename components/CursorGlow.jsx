'use client'

import { useEffect, useRef } from 'react'

export default function CursorGlow() {
  const glowRef = useRef(null)
  const pos = useRef({ x: -300, y: -300 })
  const current = useRef({ x: -300, y: -300 })
  const rafRef = useRef(null)

  useEffect(() => {
    const glow = glowRef.current
    if (!glow) return

    function onMove(x, y) {
      pos.current = { x, y }
    }

    function handleMouse(e) {
      onMove(e.clientX, e.clientY)
    }

    function handleTouch(e) {
      if (e.touches.length > 0) {
        onMove(e.touches[0].clientX, e.touches[0].clientY)
      }
    }

    function lerp(a, b, t) { return a + (b - a) * t }

    function tick() {
      current.current.x = lerp(current.current.x, pos.current.x, 0.08)
      current.current.y = lerp(current.current.y, pos.current.y, 0.08)

      glow.style.transform = `translate(${current.current.x - 300}px, ${current.current.y - 300}px)`

      rafRef.current = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', handleMouse, { passive: true })
    window.addEventListener('touchmove', handleTouch, { passive: true })
    window.addEventListener('touchstart', handleTouch, { passive: true })

    rafRef.current = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', handleMouse)
      window.removeEventListener('touchmove', handleTouch)
      window.removeEventListener('touchstart', handleTouch)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '600px',
        height: '600px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(127,119,221,0.22) 0%, rgba(127,119,221,0.08) 40%, transparent 70%)',
        pointerEvents: 'none',
        zIndex: 9999,
        willChange: 'transform',
        mixBlendMode: 'screen',
      }}
      ref={glowRef}
    />
  )
}