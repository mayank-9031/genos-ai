'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { value: 23, suffix: '+', label: 'Global Clients' },
  { value: 50, suffix: '+', label: 'Projects Delivered' },
  { value: 5, suffix: '', label: 'Countries' },
  { value: 98, suffix: '%', label: 'Client Retention' },
]

export function StatsBar() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const statEls = sectionRef.current!.querySelectorAll('.stat-number')
      statEls.forEach((el) => {
        const htmlEl = el as HTMLElement
        const target = parseFloat(htmlEl.dataset.value || '0')

        gsap.from(htmlEl, {
          textContent: 0,
          duration: 2,
          ease: 'power1.out',
          snap: { textContent: 1 },
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
          onUpdate() {
            const val = parseFloat(htmlEl.textContent || '0')
            htmlEl.textContent = Math.round(val).toString()
          },
        })
      })

      gsap.from(sectionRef.current!.querySelectorAll('.stat-item'), {
        y: 30,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="relative py-14 md:py-20 px-[5vw] border-y border-white/[0.05] bg-gradient-to-b from-white/[0.02] to-transparent"
    >
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {STATS.map((stat, i) => (
            <div key={i} className="stat-item flex flex-col items-center text-center">
              <div className="flex items-baseline gap-1">
                <span
                  className="stat-number font-display text-[clamp(2.5rem,4vw,3.5rem)] font-normal text-text-on-dark leading-none"
                  data-value={stat.value}
                >
                  0
                </span>
                <span className="font-display text-[clamp(1.2rem,2vw,1.8rem)] text-white">
                  {stat.suffix}
                </span>
              </div>
              <span className="mt-2 text-[0.72rem] font-semibold tracking-[0.15em] uppercase text-white/35">
                {stat.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
