'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  Settings,
  Phone,
  Share2,
  Mail,
  MessageSquare,
  LayoutDashboard,
  Globe,
  Sparkles,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { GlowingEffect } from '@/components/ui/glowing-effect'

gsap.registerPlugin(ScrollTrigger)

interface Service {
  icon: LucideIcon
  label: string
  title: string
  description: string
  results: string[]
  gradient: string
  accentColor: string
  imageBg: string
}

const SERVICES: Service[] = [
  {
    icon: Settings,
    label: 'Ops Automation',
    title: 'Business Ops Automation',
    description:
      'Automate repetitive workflows across CRMs, spreadsheets, ERPs, and internal tools. We connect your stack and eliminate manual data entry, approvals, and reporting.',
    results: ['70% less manual work', '10+ tools connected', 'Zero data entry'],
    gradient: 'from-[#00D4FF]/20 via-[#00D4FF]/5 to-transparent',
    accentColor: '#00D4FF',
    imageBg: 'from-[#0c1a2e] to-[#0A0A0F]',
  },
  {
    icon: Phone,
    label: 'Voice AI',
    title: 'AI Cold Calling Agents',
    description:
      'Deploy voice AI agents that qualify leads, book meetings, and follow up — 24/7. Human-quality conversations at machine scale.',
    results: ['500+ daily calls', '3x more meetings', '24/7 availability'],
    gradient: 'from-[#7B61FF]/20 via-[#7B61FF]/5 to-transparent',
    accentColor: '#7B61FF',
    imageBg: 'from-[#15102e] to-[#0A0A0F]',
  },
  {
    icon: Share2,
    label: 'Social AI',
    title: 'Social Media Automation',
    description:
      'AI-powered content scheduling, engagement tracking, auto-replies, and analytics pipelines. Your social presence runs on autopilot.',
    results: ['Auto scheduling', 'Smart replies', 'Full analytics'],
    gradient: 'from-[#00D4FF]/20 via-[#00D4FF]/5 to-transparent',
    accentColor: '#00D4FF',
    imageBg: 'from-[#0c1a2e] to-[#0A0A0F]',
  },
  {
    icon: Mail,
    label: 'Marketing AI',
    title: 'Outreach & Marketing Automation',
    description:
      'Automated email sequences, lead scoring, campaign triggers, and personalized outreach at scale. Every touchpoint, engineered.',
    results: ['10x outreach scale', '47% open rates', 'Auto follow-ups'],
    gradient: 'from-[#7B61FF]/20 via-[#7B61FF]/5 to-transparent',
    accentColor: '#7B61FF',
    imageBg: 'from-[#15102e] to-[#0A0A0F]',
  },
  {
    icon: MessageSquare,
    label: 'Chatbot AI',
    title: 'AI Chatbots & Assistants',
    description:
      'Intelligent conversational agents trained on your data. Customer support, lead capture, internal help desks — deployed on web, WhatsApp, Slack, or any platform.',
    results: ['24/7 support', '90% auto-resolved', 'Multi-platform'],
    gradient: 'from-[#00D4FF]/10 via-[#7B61FF]/10 to-transparent',
    accentColor: '#00D4FF',
    imageBg: 'from-[#0e1520] to-[#0A0A0F]',
  },
  {
    icon: LayoutDashboard,
    label: 'Internal Tools',
    title: 'Internal Automation Tools',
    description:
      'Custom dashboards, workflow engines, and admin panels built for your team\'s exact needs. No bloated SaaS — just clean, fast tools that work.',
    results: ['4+ tools replaced', '12 hrs/week saved', 'Custom built'],
    gradient: 'from-[#7B61FF]/20 via-[#7B61FF]/5 to-transparent',
    accentColor: '#7B61FF',
    imageBg: 'from-[#15102e] to-[#0A0A0F]',
  },
  {
    icon: Globe,
    label: 'Web Dev',
    title: 'Website & Web App Development',
    description:
      'High-performance websites and web apps built with modern frameworks. From landing pages to full SaaS platforms — designed to convert and scale.',
    results: ['Sub-1s load times', '3x conversions', 'SEO optimized'],
    gradient: 'from-[#00D4FF]/20 via-[#00D4FF]/5 to-transparent',
    accentColor: '#00D4FF',
    imageBg: 'from-[#0c1a2e] to-[#0A0A0F]',
  },
  {
    icon: Sparkles,
    label: 'Custom AI',
    title: 'Custom AI Solutions',
    description:
      'Need something that doesn\'t exist yet? We build bespoke AI systems from scratch — custom models, integrations, and pipelines tailored to your business logic.',
    results: ['Fully bespoke', 'End-to-end delivery', 'Your IP'],
    gradient: 'from-[#7B61FF]/10 via-[#00D4FF]/10 to-transparent',
    accentColor: '#7B61FF',
    imageBg: 'from-[#0e1520] to-[#0A0A0F]',
  },
]

function ServiceImage({ service, index }: { service: Service; index: number }) {
  const Icon = service.icon
  return (
    <div className={`relative w-full aspect-[4/3] rounded-2xl bg-gradient-to-br ${service.imageBg} border border-white/[0.06] overflow-hidden group-hover:border-white/[0.12] transition-all duration-500`}>
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={3}
      />
      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-[0.04]" style={{
        backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
      }} />

      {/* Gradient glow */}
      <div className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-60`} />

      {/* Floating UI mockup elements */}
      <div className="absolute inset-6 md:inset-8 flex flex-col gap-3">
        {/* Top bar mockup */}
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
            <div className="w-2.5 h-2.5 rounded-full bg-white/10" />
          </div>
          <div className="flex-1 h-5 rounded bg-white/[0.04]" />
        </div>

        {/* Content area mockup */}
        <div className="flex-1 flex gap-3">
          {/* Sidebar */}
          <div className="hidden md:flex flex-col gap-2 w-1/4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="h-6 rounded"
                style={{
                  backgroundColor: i === index % 5 ? `${service.accentColor}20` : 'rgba(255,255,255,0.03)',
                  borderLeft: i === index % 5 ? `2px solid ${service.accentColor}40` : 'none',
                }}
              />
            ))}
          </div>

          {/* Main content */}
          <div className="flex-1 flex flex-col gap-3">
            {/* Stats row */}
            <div className="grid grid-cols-3 gap-2">
              {[0, 1, 2].map((j) => (
                <div
                  key={j}
                  className="h-14 md:h-16 rounded-lg border flex flex-col items-center justify-center"
                  style={{
                    backgroundColor: `${service.accentColor}08`,
                    borderColor: `${service.accentColor}15`,
                  }}
                >
                  <div className="h-2.5 w-8 rounded-full mb-1" style={{ backgroundColor: `${service.accentColor}30` }} />
                  <div className="h-1.5 w-12 rounded-full bg-white/[0.06]" />
                </div>
              ))}
            </div>

            {/* Chart area */}
            <div className="flex-1 rounded-lg border border-white/[0.04] bg-white/[0.01] flex items-end p-3 gap-1.5">
              {[40, 65, 45, 80, 55, 90, 70, 85, 60, 95].map((h, i) => (
                <div
                  key={i}
                  className="chart-bar flex-1 rounded-t transition-all duration-300"
                  style={{
                    height: `${h}%`,
                    backgroundColor: `${service.accentColor}${i === 9 ? '40' : '15'}`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Center icon */}
      <div className="absolute bottom-4 right-4 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${service.accentColor}15` }}>
        <Icon size={18} style={{ color: `${service.accentColor}80` }} />
      </div>
    </div>
  )
}

export function ServicesGrid() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Section heading: staggered reveal with slight scale
      const headings = sectionRef.current!.querySelectorAll('.section-reveal')
      gsap.from(headings, {
        y: 50,
        opacity: 0,
        scale: 0.97,
        stagger: 0.12,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // Each showcase item gets rich, staggered child animations
      const items = sectionRef.current!.querySelectorAll('.showcase-item')
      items.forEach((item, i) => {
        const isReversed = i % 2 === 1
        const xDirection = isReversed ? 80 : -80

        // Image: slides in from the side with scaling and rotation
        const image = item.querySelector('.showcase-image')
        if (image) {
          gsap.from(image, {
            x: xDirection,
            opacity: 0,
            scale: 0.9,
            rotation: isReversed ? 2 : -2,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          })

          // Parallax float on scroll
          gsap.to(image, {
            y: -30,
            ease: 'none',
            scrollTrigger: {
              trigger: item,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1,
            },
          })
        }

        // Content: slides in from the opposite side
        const content = item.querySelector('.showcase-content')
        if (content) {
          gsap.from(content, {
            x: -xDirection,
            opacity: 0,
            duration: 1.2,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none none',
            },
          })
        }

        // Staggered reveal: label, title, description, results
        const children = item.querySelectorAll('.reveal-child')
        gsap.from(children, {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 75%',
            toggleActions: 'play none none none',
          },
        })

        // Result badges: pop in with spring bounce
        const badges = item.querySelectorAll('.result-badge')
        gsap.from(badges, {
          scale: 0,
          opacity: 0,
          stagger: 0.08,
          duration: 0.5,
          ease: 'back.out(1.7)',
          scrollTrigger: {
            trigger: item,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        })

        // Chart bars: wave animation from bottom
        const bars = item.querySelectorAll('.chart-bar')
        gsap.from(bars, {
          scaleY: 0,
          transformOrigin: 'bottom',
          stagger: 0.05,
          duration: 0.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 70%',
            toggleActions: 'play none none none',
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="services" className="relative py-16 md:py-24 px-[5vw]">
      <div className="max-w-7xl mx-auto">
        <span className="section-reveal block text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-[#00D4FF]/60 mb-4">
          What We Build
        </span>
        <h2 className="section-reveal font-display text-[clamp(2rem,4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-text-on-dark mb-4">
          We don&apos;t sell templates.<br />We engineer systems.
        </h2>
        <p className="section-reveal text-[1.05rem] leading-[1.65] text-white/50 max-w-[55ch] mb-12">
          Every automation we build is reverse-engineered from your workflow. We identify the bottlenecks, map the logic, and deploy AI that handles the work — so your team doesn&apos;t have to.
        </p>

        <div className="flex flex-col gap-16 md:gap-24">
          {SERVICES.map((service, i) => {
            const isReversed = i % 2 === 1
            return (
              <div
                key={i}
                className={`showcase-item group grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center ${
                  isReversed ? 'lg:[direction:rtl]' : ''
                }`}
              >
                {/* Image */}
                <div className={`showcase-image ${isReversed ? 'lg:[direction:ltr]' : ''}`}>
                  <ServiceImage service={service} index={i} />
                </div>

                {/* Content */}
                <div className={`showcase-content ${isReversed ? 'lg:[direction:ltr]' : ''}`}>
                  <span
                    className="reveal-child inline-block text-[0.7rem] font-semibold tracking-[0.15em] uppercase px-3 py-1 rounded-full mb-5"
                    style={{
                      color: `${service.accentColor}cc`,
                      backgroundColor: `${service.accentColor}12`,
                    }}
                  >
                    {service.label}
                  </span>
                  <h3 className="reveal-child font-display text-[clamp(1.5rem,3vw,2.2rem)] text-text-on-dark mb-4 leading-tight">
                    {service.title}
                  </h3>
                  <p className="reveal-child text-[0.95rem] leading-[1.7] text-white/50 mb-6 max-w-[45ch]">
                    {service.description}
                  </p>
                  <div className="reveal-child flex flex-wrap gap-2">
                    {service.results.map((result, j) => (
                      <span
                        key={j}
                        className="result-badge text-[0.75rem] font-semibold tracking-[0.05em] px-3 py-1.5 rounded-lg border"
                        style={{
                          color: service.accentColor,
                          backgroundColor: `${service.accentColor}08`,
                          borderColor: `${service.accentColor}15`,
                        }}
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

        <div className="mt-16 text-center">
          <a
            href="#contact"
            className="inline-block px-8 py-4 text-[0.85rem] font-semibold tracking-[0.08em] uppercase border border-[#00D4FF]/50 text-[#00D4FF] rounded-full transition-all hover:bg-[#00D4FF]/10 hover:border-[#00D4FF]/80"
          >
            Tell Us What You Need
          </a>
        </div>
      </div>
    </section>
  )
}
