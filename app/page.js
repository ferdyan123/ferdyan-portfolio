import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Works from '@/components/Works'
import Skills from '@/components/Skills'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Works />
      <Skills />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}