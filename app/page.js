'use client'

import { useEffect, Suspense } from 'react'
import { useSearchParams } from 'next/navigation'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Works from '@/components/Works'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

function ScrollHandler() {
  const searchParams = useSearchParams()

  useEffect(() => {
    const scrollTo = searchParams.get('scrollTo')
    if (!scrollTo) return
    const timer = setTimeout(() => {
      const el = document.getElementById(scrollTo)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 100)
    return () => clearTimeout(timer)
  }, [searchParams])

  return null
}

export default function Home() {
  return (
    <main>
      <Suspense fallback={null}>
        <ScrollHandler />
      </Suspense>
      <Navbar />
      <Hero />
      <Works />
      <About />
      <Skills />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}