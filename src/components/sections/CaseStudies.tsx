'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ArrowUpRight, BarChart3, PhoneCall, LayoutDashboard } from 'lucide-react'
import { GlowingEffect } from '@/components/ui/glowing-effect'

gsap.registerPlugin(ScrollTrigger)

const CASES = [
  {
    tag: 'SaaS / USA',
    title: 'AI-Powered Lead Qualification System',
    description:
      'Automated inbound lead processing for a US-based SaaS company. AI agents scored, qualified, and routed 2,000+ leads/month — reducing sales team workload by 60% and cutting response time from 4 hours to under 3 minutes.',
    results: ['60% less manual work', '47x faster response', '35% more conversions'],
    icon: BarChart3,
    gradient: 'from-[#00D4FF]/15 to-[#00D4FF]/5',
    accentColor: '#00D4FF',
  },
  {
    tag: 'Real Estate / UAE',
    title: 'Automated Cold Outreach Engine',
    description:
      'Built an end-to-end cold calling + email outreach system for a UAE-based real estate firm. Voice AI agents made 500+ calls/day, booked qualified appointments, and synced everything back to the CRM automatically.',
    results: ['500+ daily calls', '3x more meetings', '80% less manual effort'],
    icon: PhoneCall,
    gradient: 'from-[#7B61FF]/15 to-[#7B61FF]/5',
    accentColor: '#7B61FF',
  },
  {
    tag: 'Logistics / Australia',
    title: 'Internal Ops Dashboard & Automation Suite',
    description:
      'Designed and deployed a custom internal tool for an Australian logistics company. Automated order tracking, dispatch notifications, invoice generation, and reporting — replacing 4 separate SaaS subscriptions.',
    results: ['4 tools → 1', '12 hrs/week saved', '$2,400/mo saved'],
    icon: LayoutDashboard,
    gradient: 'from-[#00D4FF]/10 via-[#7B61FF]/8 to-transparent',
    accentColor: '#00D4FF',
  },
]

export function CaseStudies() {
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

      const cards = sectionRef.current!.querySelectorAll('.case-card')
      gsap.from(cards, {
        y: 60,
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
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="case-studies" className="relative py-16 md:py-24 px-[5vw]">
      <div className="max-w-7xl mx-auto">
        <span className="section-reveal block text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-[#00D4FF]/60 mb-4">
          The Work Speaks
        </span>
        <h2 className="section-reveal font-display text-[clamp(2rem,4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-text-on-dark mb-4">
          50+ projects. Real systems.<br />Measurable results.
        </h2>
        <p className="section-reveal text-[1.05rem] leading-[1.65] text-white/50 max-w-[55ch] mb-10">
          We don&apos;t just build — we ship systems that change how businesses operate. Here&apos;s a look at what we&apos;ve delivered.
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {CASES.map((cs, i) => {
            const Icon = cs.icon
            return (
              <div
                key={i}
                className="case-card group relative rounded-2xl bg-white/[0.03] border border-white/[0.07] transition-all duration-300 hover:border-[#00D4FF]/25 overflow-hidden"
              >
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                {/* Visual header */}
                <div className={`relative h-44 bg-gradient-to-br ${cs.gradient} overflow-hidden`}>
                  <div className="absolute inset-0 opacity-[0.06]" style={{
                    backgroundImage: 'linear-gradient(rgba(255,255,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.3) 1px, transparent 1px)',
                    backgroundSize: '24px 24px',
                  }} />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end gap-1.5 h-16">
                    {[35, 55, 40, 70, 50, 85, 65, 75, 45, 90].map((h, j) => (
                      <div
                        key={j}
                        className="flex-1 rounded-t"
                        style={{
                          height: `${h}%`,
                          backgroundColor: `${cs.accentColor}${j === 9 ? '30' : '12'}`,
                        }}
                      />
                    ))}
                  </div>
                  <div className="absolute top-4 right-4 w-9 h-9 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${cs.accentColor}20` }}>
                    <Icon size={16} style={{ color: cs.accentColor }} />
                  </div>
                </div>

                <div className="p-7">
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[0.7rem] font-semibold tracking-[0.15em] uppercase text-[#00D4FF]/70 bg-[#00D4FF]/10 px-3 py-1 rounded-full">
                      {cs.tag}
                    </span>
                    <ArrowUpRight size={18} className="text-white/20 group-hover:text-[#00D4FF] transition-colors" />
                  </div>
                  <h3 className="font-display text-[1.2rem] text-text-on-dark mb-3 leading-tight">
                    {cs.title}
                  </h3>
                  <p className="text-[0.88rem] leading-[1.6] text-white/40 mb-6">
                    {cs.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {cs.results.map((result, j) => (
                      <span
                        key={j}
                        className="text-[0.75rem] font-semibold tracking-[0.05em] text-[#00D4FF] bg-[#00D4FF]/8 border border-[#00D4FF]/15 px-3 py-1.5 rounded-lg"
                      >
                        {result}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
