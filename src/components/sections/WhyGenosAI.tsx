'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Wrench, Shield, Globe2, Users, Zap } from 'lucide-react'
import { GlowingEffect } from '@/components/ui/glowing-effect'

gsap.registerPlugin(ScrollTrigger)

const DIFFERENTIATORS = [
  {
    icon: Wrench,
    title: 'Custom-Built, Not Cookie-Cutter',
    description:
      'We don\'t resell pre-packaged automations. Every system is reverse-engineered from your specific workflows, tools, and business logic. If it doesn\'t fit how you actually operate, we don\'t ship it.',
  },
  {
    icon: Shield,
    title: 'Production-Grade Engineering',
    description:
      'Our automations aren\'t demos that break in a week. We build for scale, reliability, and edge cases — with proper error handling, logging, and monitoring baked in from day one.',
  },
  {
    icon: Globe2,
    title: 'Global Delivery, Local Understanding',
    description:
      '23+ clients across the USA, UK, UAE, India, and Australia. We understand different markets, compliance requirements, and business cultures — and we deliver on time regardless of timezone.',
  },
  {
    icon: Users,
    title: 'End-to-End Ownership',
    description:
      'From the first discovery call to post-launch optimization, one team owns your project. No handoffs to offshore farms. No scope confusion. One team, total accountability.',
  },
  {
    icon: Zap,
    title: 'Speed Without Shortcuts',
    description:
      'Most projects go live in 2-6 weeks. We move fast because our process is tight, not because we cut corners. You get velocity and quality.',
  },
]

export function WhyGenosAI() {
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

      const items = sectionRef.current!.querySelectorAll('.diff-item')
      gsap.from(items, {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
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
    <section ref={sectionRef} id="why-us" className="relative py-16 md:py-24 px-[5vw]">
      <div className="max-w-6xl mx-auto">
        <span className="section-reveal block text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-[#7B61FF]/60 mb-4">
          Why GenosAI
        </span>
        <h2 className="section-reveal font-display text-[clamp(2rem,4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-text-on-dark mb-4">
          Why Teams Choose Us
        </h2>
        <p className="section-reveal text-[1.05rem] leading-[1.65] text-white/50 max-w-[55ch] mb-10">
          We&apos;re not another &ldquo;AI agency&rdquo; with a ChatGPT wrapper. We&apos;re engineers who build production-grade systems. Every solution we deliver is custom, battle-tested, and designed to run without babysitting.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {DIFFERENTIATORS.map((item, i) => {
            const Icon = item.icon
            return (
              <div key={i} className="diff-item relative rounded-2xl border border-white/[0.07] bg-white/[0.03] p-8">
                <GlowingEffect
                  spread={40}
                  glow={true}
                  disabled={false}
                  proximity={64}
                  inactiveZone={0.01}
                  borderWidth={3}
                />
                <div className="w-10 h-10 rounded-lg bg-[#7B61FF]/10 flex items-center justify-center mb-5">
                  <Icon size={20} className="text-[#7B61FF]" />
                </div>
                <h3 className="font-display text-[1.2rem] text-text-on-dark mb-3 leading-tight">
                  {item.title}
                </h3>
                <p className="text-[0.9rem] leading-[1.65] text-white/45">
                  {item.description}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
