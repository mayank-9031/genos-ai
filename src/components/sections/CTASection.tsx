'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { motion } from 'framer-motion'
import { FloatingPaths } from '@/components/ui/background-paths'

gsap.registerPlugin(ScrollTrigger)

export function CTASection() {
  const sectionRef = useRef<HTMLElement>(null)

  const [titleNumber, setTitleNumber] = useState(0)
  const titles = useMemo(
    () => ["not from you?", "wait till tomorrow?", "Time to catch up."],
    []
  )

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setTitleNumber(prev => (prev === titles.length - 1 ? 0 : prev + 1))
    }, 2000)
    return () => clearTimeout(timeoutId)
  }, [titleNumber, titles])

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
    <section ref={sectionRef} id="contact" className="relative py-20 md:py-28 px-[5vw] overflow-hidden" aria-label="Contact GenosAI">
      <div className="absolute inset-0">
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className="cta-reveal font-display text-[clamp(1.6rem,3.8vw,3rem)] font-normal leading-[1.15] tracking-[-0.02em] text-text-on-dark mb-6">
          <span className="block whitespace-nowrap">Your users are already using AI everywhere.</span>
          <span className="block whitespace-nowrap">
            <motion.span
              className="inline text-white"
              animate={{ opacity: titleNumber === 2 ? 0 : 1 }}
              transition={{ duration: 0.3 }}
              style={{ display: titleNumber === 2 ? 'none' : 'inline' }}
            >
              Why{' '}
            </motion.span>
            <span className="relative inline-block h-[1.15em] overflow-hidden align-bottom">
              <span className="invisible">wait till tomorrow?</span>
              {titles.map((title, index) => (
                <motion.span
                  key={index}
                  className="absolute left-0 top-0 inline-block text-white"
                  initial={{ opacity: 0, y: "-100%" }}
                  transition={{ type: "spring", stiffness: 50 }}
                  animate={
                    titleNumber === index
                      ? { y: 0, opacity: 1 }
                      : { y: titleNumber > index ? "-150%" : "150%", opacity: 0 }
                  }
                >
                  {title}
                </motion.span>
              ))}
            </span>
          </span>
        </h2>
        <p className="cta-reveal text-[1.1rem] leading-[1.65] text-white/50 mb-10 max-w-[45ch] mx-auto">
          Book a free strategy call with GenosAI. We&apos;ll audit your workflows, identify the highest-impact automations, and show you exactly what&apos;s possible.
        </p>
        <div className="cta-reveal">
          <a
            href="mailto:hello@genosai.tech?subject=Free%20Strategy%20Call"
            className="inline-block px-10 py-4 text-[0.9rem] font-semibold tracking-[0.08em] uppercase bg-white text-[#0A0A0F] rounded-full transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_40px_rgba(255,255,255,0.15)]"
          >
            Book Your Free Strategy Call
          </a>
        </div>
        <p className="cta-reveal mt-6 text-[0.85rem] text-white/30">
          Or email us directly: <a href="mailto:hello@genosai.tech" className="text-white/50 hover:text-white transition-colors">hello@genosai.tech</a>
        </p>
      </div>
    </section>
  )
}
