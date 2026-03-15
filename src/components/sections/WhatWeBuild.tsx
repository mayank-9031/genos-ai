'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { BarChart3, PhoneCall, LayoutDashboard } from 'lucide-react'
import { GlowingEffect } from '@/components/ui/glowing-effect'

gsap.registerPlugin(ScrollTrigger)

const PROJECTS = [
  {
    icon: BarChart3,
    label: 'AI Lead Engine',
    title: 'AI-Powered Lead Qualification',
    description:
      'Automated inbound lead processing that scores, qualifies, and routes prospects in real-time. Built for a US-based SaaS company processing 2,000+ leads per month.',
    results: ['60% less manual work', '47x faster response', '35% more conversions'],
    gradient: 'from-white/10 via-white/3 to-transparent',
    accentColor: '#FFFFFF',
    imageBg: 'from-[#0c1a2e] to-[#0A0A0F]',
  },
  {
    icon: PhoneCall,
    label: 'Voice AI',
    title: 'Automated Cold Outreach Engine',
    description:
      'End-to-end voice AI cold calling system for a UAE real estate firm. AI agents make 500+ calls daily, book qualified appointments, and sync everything back to the CRM.',
    results: ['500+ daily calls', '3x more meetings', '80% less effort'],
    gradient: 'from-white/10 via-white/3 to-transparent',
    accentColor: '#FFFFFF',
    imageBg: 'from-[#15102e] to-[#0A0A0F]',
  },
  {
    icon: LayoutDashboard,
    label: 'Custom Dashboard',
    title: 'Internal Ops Dashboard & Automation',
    description:
      'A custom operations platform for an Australian logistics company. Unified order tracking, dispatch, invoicing, and reporting — replacing 4 separate SaaS tools.',
    results: ['4 tools replaced', '12 hrs/week saved', '$2,400/mo saved'],
    gradient: 'from-white/8 via-white/4 to-transparent',
    accentColor: '#FFFFFF',
    imageBg: 'from-[#0e1520] to-[#0A0A0F]',
  },
]

function ProjectImage({ project, index }: { project: typeof PROJECTS[number]; index: number }) {
  const Icon = project.icon
  return (
    <div className={`relative w-full aspect-[4/3] rounded-2xl bg-gradient-to-br ${project.imageBg} border border-white/[0.06] overflow-hidden group-hover:border-white/[0.12] transition-all duration-500`}>
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
      <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-60`} />

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
                  backgroundColor: i === index % 5 ? `${project.accentColor}20` : 'rgba(255,255,255,0.03)',
                  borderLeft: i === index % 5 ? `2px solid ${project.accentColor}40` : 'none',
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
                    backgroundColor: `${project.accentColor}08`,
                    borderColor: `${project.accentColor}15`,
                  }}
                >
                  <div className="h-2.5 w-8 rounded-full mb-1" style={{ backgroundColor: `${project.accentColor}30` }} />
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
                    backgroundColor: `${project.accentColor}${i === 9 ? '40' : '15'}`,
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Center icon */}
      <div className="absolute bottom-4 right-4 w-10 h-10 rounded-lg flex items-center justify-center" style={{ backgroundColor: `${project.accentColor}15` }}>
        <Icon size={18} style={{ color: `${project.accentColor}80` }} />
      </div>
    </div>
  )
}

export function WhatWeBuild() {
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

        // Image: slides in from the side with parallax-like scaling
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

        // Result badges: pop in with scale
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

        // Chart bars inside the image: wave animation
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
    <section ref={sectionRef} id="showcase" className="relative py-16 md:py-24 px-[5vw]">
      <div className="max-w-7xl mx-auto">
        <span className="section-reveal block text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-white/50 mb-4">
          What We Build
        </span>
        <h2 className="section-reveal font-display text-[clamp(2rem,4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-text-on-dark mb-4">
          Real systems. Real results.
        </h2>
        <p className="section-reveal text-[1.05rem] leading-[1.65] text-white/50 max-w-[55ch] mb-12">
          We don&apos;t build demos — we ship production systems that transform how businesses operate. Here&apos;s a look at what we&apos;ve delivered.
        </p>

        <div className="flex flex-col gap-16 md:gap-24">
          {PROJECTS.map((project, i) => {
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
                  <ProjectImage project={project} index={i} />
                </div>

                {/* Content */}
                <div className={`showcase-content ${isReversed ? 'lg:[direction:ltr]' : ''}`}>
                  <span
                    className="reveal-child inline-block text-[0.7rem] font-semibold tracking-[0.15em] uppercase px-3 py-1 rounded-full mb-5"
                    style={{
                      color: `${project.accentColor}cc`,
                      backgroundColor: `${project.accentColor}12`,
                    }}
                  >
                    {project.label}
                  </span>
                  <h3 className="reveal-child font-display text-[clamp(1.5rem,3vw,2.2rem)] text-text-on-dark mb-4 leading-tight">
                    {project.title}
                  </h3>
                  <p className="reveal-child text-[0.95rem] leading-[1.7] text-white/50 mb-6 max-w-[45ch]">
                    {project.description}
                  </p>
                  <div className="reveal-child flex flex-wrap gap-2">
                    {project.results.map((result, j) => (
                      <span
                        key={j}
                        className="result-badge text-[0.75rem] font-semibold tracking-[0.05em] px-3 py-1.5 rounded-lg border"
                        style={{
                          color: project.accentColor,
                          backgroundColor: `${project.accentColor}08`,
                          borderColor: `${project.accentColor}15`,
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
      </div>
    </section>
  )
}
