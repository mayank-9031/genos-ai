'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STEPS = [
  {
    number: '01',
    title: 'Discover & Audit',
    description:
      'We map your current workflows, tech stack, and pain points. No surface-level discovery calls — we dig into the systems, identify what\'s costing you time and money, and define where AI creates the highest ROI.',
  },
  {
    number: '02',
    title: 'Architect & Design',
    description:
      'We design the solution architecture, define integrations, select the right AI models, and prototype the core logic. You approve the blueprint before a single line of code ships.',
  },
  {
    number: '03',
    title: 'Build & Integrate',
    description:
      'Our engineers build the system, connect it to your existing tools, and stress-test every edge case. We deploy in stages so nothing breaks and everything is traceable.',
  },
  {
    number: '04',
    title: 'Launch & Optimize',
    description:
      'Deployment is the starting line, not the finish. We monitor performance, tune the AI based on real usage data, and iterate until the system runs like clockwork.',
  },
]

export function ProcessSteps() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const heading = sectionRef.current!.querySelectorAll('.section-reveal')
      gsap.from(heading, {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      const steps = sectionRef.current!.querySelectorAll('.process-step')
      gsap.from(steps, {
        x: -60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 60%',
          toggleActions: 'play none none none',
        },
      })

      const line = sectionRef.current!.querySelector('.process-line')
      if (line) {
        gsap.from(line, {
          scaleY: 0,
          transformOrigin: 'top',
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 60%',
            toggleActions: 'play none none none',
          },
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="process" className="relative py-16 md:py-24 px-[5vw] bg-white/[0.01]">
      <div className="max-w-5xl mx-auto">
        <span className="section-reveal block text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-[#00D4FF]/60 mb-4">
          Our Process
        </span>
        <h2 className="section-reveal font-display text-[clamp(2rem,4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-text-on-dark mb-4">
          Four steps. Zero guesswork.
        </h2>
        <p className="section-reveal text-[1.05rem] leading-[1.65] text-white/50 max-w-[55ch] mb-10">
          We don&apos;t start building until we understand exactly what needs to change. Every engagement follows a structured methodology designed to ship fast and ship right.
        </p>

        <div className="relative">
          {/* Vertical connecting line */}
          <div className="process-line absolute left-[1.65rem] top-0 bottom-0 w-px bg-gradient-to-b from-[#00D4FF]/40 via-[#7B61FF]/40 to-transparent hidden md:block" />

          <div className="flex flex-col gap-12">
            {STEPS.map((step, i) => (
              <div key={i} className="process-step flex gap-8 items-start">
                <div className="relative z-10 flex-shrink-0 w-[3.3rem] h-[3.3rem] rounded-full border border-[#00D4FF]/30 bg-[#0A0A0F] flex items-center justify-center">
                  <span className="font-display text-[1rem] text-[#00D4FF]">{step.number}</span>
                </div>
                <div className="pt-1">
                  <h3 className="font-display text-[1.4rem] text-text-on-dark mb-3 leading-tight">
                    {step.title}
                  </h3>
                  <p className="text-[0.95rem] leading-[1.65] text-white/45 max-w-[50ch]">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14">
          <a
            href="#contact"
            className="inline-block px-8 py-4 text-[0.85rem] font-semibold tracking-[0.08em] uppercase bg-[#00D4FF] text-[#0A0A0F] rounded-full transition-all hover:-translate-y-0.5 hover:shadow-[0_8px_30px_rgba(0,212,255,0.3)]"
          >
            Start Your Project
          </a>
        </div>
      </div>
    </section>
  )
}
