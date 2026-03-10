import { Navbar } from '@/components/ui/3d-interactive-navbar'
import { HeroSection } from '@/components/HeroSection'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { WhyGenosAI } from '@/components/sections/WhyGenosAI'
import { Testimonials } from '@/components/sections/Testimonials'
import { TechStack } from '@/components/sections/TechStack'
import { About } from '@/components/sections/About'
import { FAQ } from '@/components/sections/FAQ'
import { CTASection } from '@/components/sections/CTASection'
import { Footer } from '@/components/sections/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <HeroSection />
      <main className="relative z-10 bg-bg-dark/90">
        <ServicesGrid />
        <ProcessSteps />
        <WhyGenosAI />
        <TechStack />
        <About />
        <Testimonials />
        <FAQ />
        <CTASection />
        <Footer />
      </main>
    </>
  )
}
