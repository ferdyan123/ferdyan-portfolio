import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import Works from '@/components/Works'
import About from '@/components/About'
import Services from '@/components/Services'
import WhyMe from '@/components/WhyMe'
import Skills from '@/components/Skills'
import Testimonials from '@/components/Testimonials'
import Process from '@/components/Process'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Works />
      <About />
      <Services />
      <WhyMe />
      <Skills />
      <Testimonials />
      <Process />
      <CTA />
      <Footer />
    </main>
  )
}