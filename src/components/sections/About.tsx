'use client'

import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Globe2, Users, Zap } from 'lucide-react'
import { WorldMap } from '@/components/ui/map'
import { GlowingEffect } from '@/components/ui/glowing-effect'

gsap.registerPlugin(ScrollTrigger)

const STATS = [
  { endValue: 23, suffix: '+', label: 'Clients across 5 countries' },
  { endValue: 50, suffix: '+', label: 'Projects shipped' },
  { endValue: 4, endValue2: 12, suffix: '', label: 'Weeks average delivery', isRange: true },
]

function useCountUp(end: number, duration = 2000, shouldStart: boolean) {
  const [count, setCount] = useState(0)
  const hasStarted = useRef(false)

  useEffect(() => {
    if (!shouldStart || hasStarted.current) return
    hasStarted.current = true

    const startTime = performance.now()
    let rafId: number

    const animate = (now: number) => {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * end))
      if (progress < 1) {
        rafId = requestAnimationFrame(animate)
      }
    }

    rafId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(rafId)
  }, [end, duration, shouldStart])

  return count
}

function StatItem({ stat, inView }: { stat: typeof STATS[number]; inView: boolean }) {
  const val1 = useCountUp(stat.endValue, 2000, inView)
  const val2 = useCountUp(stat.endValue2 ?? 0, 2000, inView)

  const display = stat.isRange
    ? `${val1}-${val2}`
    : `${val1}${stat.suffix}`

  return (
    <div className="flex items-baseline gap-4 border-b border-white/[0.06] pb-5 last:border-0 last:pb-0">
      <span className="font-display text-[2.5rem] text-[#00D4FF] leading-none">
        {display}
      </span>
      <span className="text-[0.85rem] text-white/40 tracking-[0.05em]">
        {stat.label}
      </span>
    </div>
  )
}

export function About() {
  const sectionRef = useRef<HTMLElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)
  const [statsInView, setStatsInView] = useState(false)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      const els = sectionRef.current!.querySelectorAll('.section-reveal')
      gsap.from(els, {
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  useEffect(() => {
    if (!statsRef.current) return

    const trigger = ScrollTrigger.create({
      trigger: statsRef.current,
      start: 'top 85%',
      onEnter: () => setStatsInView(true),
    })

    return () => trigger.kill()
  }, [])

  return (
    <section ref={sectionRef} id="about" className="relative py-16 md:py-24 px-[5vw]">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
          <div>
            <span className="section-reveal block text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-[#7B61FF]/60 mb-4">
              Who We Are
            </span>
            <h2 className="section-reveal font-display text-[clamp(2rem,4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-text-on-dark mb-6">
              We&apos;re engineers,<br />not salespeople.
            </h2>
            <div className="flex flex-col gap-5">
              <p className="section-reveal text-[0.95rem] leading-[1.7] text-white/50">
                GenosAI is a global AI automation agency that builds custom systems for businesses that are done doing things manually. We started because we saw the same problem everywhere: companies drowning in repetitive tasks, duct-taping tools together, and burning hours on work that machines should handle.
              </p>
              <p className="section-reveal text-[0.95rem] leading-[1.7] text-white/50">
                So we built a team of engineers, automation architects, and AI specialists who do one thing exceptionally well — take messy, manual business processes and turn them into fast, reliable, automated systems.
              </p>
              <p className="section-reveal text-[0.95rem] leading-[1.7] text-white/50">
                We&apos;ve worked with 23+ clients across the USA, UK, UAE, India, and Australia. We&apos;ve shipped 50+ projects. And we&apos;re just getting started.
              </p>
              <p className="section-reveal text-[1rem] leading-[1.7] text-text-on-dark font-display italic">
                We don&apos;t chase hype. We ship systems that work.
              </p>
            </div>
          </div>

          {/* Visual stats panel */}
          <div className="section-reveal relative md:mt-12">
            <div className="relative rounded-2xl border border-white/[0.06] bg-gradient-to-br from-white/[0.03] to-transparent overflow-hidden p-8">
              <GlowingEffect
                spread={40}
                glow={true}
                disabled={false}
                proximity={64}
                inactiveZone={0.01}
                borderWidth={3}
              />
              {/* Dot pattern */}
              <div className="absolute inset-0 opacity-[0.03]" style={{
                backgroundImage: 'radial-gradient(rgba(255,255,255,0.5) 1px, transparent 1px)',
                backgroundSize: '24px 24px',
              }} />
              <div className="absolute top-0 right-0 w-48 h-48 bg-[radial-gradient(circle,rgba(123,97,255,0.1),transparent_70%)]" />

              {/* Icon row */}
              <div className="relative flex gap-3 mb-8">
                {[Globe2, Users, Zap].map((Icon, i) => (
                  <div key={i} className="w-9 h-9 rounded-lg bg-[#7B61FF]/10 flex items-center justify-center">
                    <Icon size={16} className="text-[#7B61FF]/60" />
                  </div>
                ))}
              </div>

              {/* Stats */}
              <div ref={statsRef} className="relative flex flex-col gap-6">
                {STATS.map((stat, i) => (
                  <StatItem key={i} stat={stat} inView={statsInView} />
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Global Reach Map */}
        <div className="section-reveal mt-16">
          <WorldMap
            lineColor="#7B61FF"
            dots={[
              // India: New Delhi → Mumbai → Bengaluru
              {
                start: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
                end: { lat: 19.076, lng: 72.8777, label: "Mumbai" },
              },
              {
                start: { lat: 19.076, lng: 72.8777, label: "Mumbai" },
                end: { lat: 12.9716, lng: 77.5946, label: "Bengaluru" },
              },
              // UAE: New Delhi → Dubai → Abu Dhabi → Sharjah
              {
                start: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
                end: { lat: 25.2048, lng: 55.2708, label: "Dubai" },
              },
              {
                start: { lat: 25.2048, lng: 55.2708, label: "Dubai" },
                end: { lat: 24.4539, lng: 54.3773, label: "Abu Dhabi" },
              },
              {
                start: { lat: 25.2048, lng: 55.2708, label: "Dubai" },
                end: { lat: 25.3463, lng: 55.4209, label: "Sharjah" },
              },
              // UK: New Delhi → London → Manchester → Birmingham
              {
                start: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
                end: { lat: 51.5074, lng: -0.1278, label: "London" },
              },
              {
                start: { lat: 51.5074, lng: -0.1278, label: "London" },
                end: { lat: 53.4808, lng: -2.2426, label: "Manchester" },
              },
              {
                start: { lat: 51.5074, lng: -0.1278, label: "London" },
                end: { lat: 52.4862, lng: -1.8904, label: "Birmingham" },
              },
              // USA: New Delhi → New York → Washington D.C. → Los Angeles
              {
                start: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
                end: { lat: 40.7128, lng: -74.006, label: "New York" },
              },
              {
                start: { lat: 40.7128, lng: -74.006, label: "New York" },
                end: { lat: 38.9072, lng: -77.0369, label: "Washington D.C." },
              },
              {
                start: { lat: 40.7128, lng: -74.006, label: "New York" },
                end: { lat: 34.0522, lng: -118.2437, label: "Los Angeles" },
              },
              // Australia: New Delhi → Sydney → Melbourne → Canberra
              {
                start: { lat: 28.6139, lng: 77.209, label: "New Delhi" },
                end: { lat: -33.8688, lng: 151.2093, label: "Sydney" },
              },
              {
                start: { lat: -33.8688, lng: 151.2093, label: "Sydney" },
                end: { lat: -37.8136, lng: 144.9631, label: "Melbourne" },
              },
              {
                start: { lat: -33.8688, lng: 151.2093, label: "Sydney" },
                end: { lat: -35.2809, lng: 149.13, label: "Canberra" },
              },
            ]}
          />
        </div>
      </div>
    </section>
  )
}
