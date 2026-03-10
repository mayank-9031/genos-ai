'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const els = sectionRef.current!.querySelectorAll('.cta-reveal')
      gsap.from(els, {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="contact" className="relative py-20 md:py-28 px-[5vw]">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#00D4FF]/[0.03] to-transparent pointer-events-none" />
      <div className="max-w-3xl mx-auto text-center relative z-10">
        <h2 className="cta-reveal font-display text-[clamp(2.2rem,5vw,4rem)] font-normal leading-[1.05] tracking-[-0.02em] text-text-on-dark mb-6">
          Ready to stop doing manually what AI can handle?
        </h2>
        <p className="cta-reveal text-[1.1rem] leading-[1.65] text-white/50 mb-10 max-w-[45ch] mx-auto">
          Book a free strategy call. We&apos;ll audit your workflows, identify the highest-impact automations, and show you exactly what&apos;s possible.
        </p>
        <div className="cta-reveal">
          {/* Replace with Calendly or booking link when available */}
          <a
            href="mailto:hello@genosai.com?subject=Free%20Strategy%20Call"
            className="inline-block px-10 py-4 text-[0.9rem] font-semibold tracking-[0.08em] uppercase bg-[#00D4FF] text-[#0A0A0F] rounded-full transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(0,212,255,0.35)]"
          >
            Book Your Free Strategy Call
          </a>
        </div>
        <p className="cta-reveal mt-6 text-[0.85rem] text-white/30">
          Or email us directly: <a href="mailto:hello@genosai.com" className="text-[#00D4FF]/60 hover:text-[#00D4FF] transition-colors">hello@genosai.com</a>
        </p>
      </div>
    </section>
  )
}
