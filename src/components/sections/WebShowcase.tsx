'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GlowingEffect } from '@/components/ui/glowing-effect'

gsap.registerPlugin(ScrollTrigger)

/* ─── Web Design Showcase Data ───────────────────────────────── */

const WEB_DESIGNS = [
  {
    title: 'AI & Tech Websites',
    description:
      'Futuristic, high-performance websites built for AI and technology companies. Dark themes, immersive animations, and conversion-optimized layouts.',
    tags: ['Next.js', 'GSAP', '3D Animations'],
    gradient: 'from-[#0c1a2e] via-[#0a1628] to-[#0A0A0F]',
    accentColor: '#3b82f6',
  },
  {
    title: 'SaaS Platforms',
    description:
      'Modern web applications with intuitive dashboards, real-time data visualization, and seamless user experiences built for scale.',
    tags: ['React', 'TypeScript', 'Real-time'],
    gradient: 'from-[#0e1520] via-[#0d1320] to-[#0A0A0F]',
    accentColor: '#10b981',
  },
  {
    title: 'E-Commerce & Landing Pages',
    description:
      'High-converting landing pages and e-commerce experiences. Mobile-first, blazing fast, and designed to turn visitors into customers.',
    tags: ['Responsive', 'SEO', 'Conversion'],
    gradient: 'from-[#15102e] via-[#110e25] to-[#0A0A0F]',
    accentColor: '#a855f7',
  },
]

/* ─── Browser Mockup Component ───────────────────────────────── */

function WebMockup({
  design,
}: {
  design: (typeof WEB_DESIGNS)[number]
}) {
  return (
    <div
      className={`relative w-full aspect-[4/3] rounded-2xl bg-gradient-to-br ${design.gradient} border border-white/[0.06] overflow-hidden transition-all duration-500 group-hover:border-white/[0.12]`}
    >
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={3}
      />

      {/* Browser chrome */}
      <div className="flex items-center gap-3 px-4 py-2.5 border-b border-white/[0.04]">
        <div className="flex gap-1.5">
          <div className="w-2 h-2 rounded-full bg-white/10" />
          <div className="w-2 h-2 rounded-full bg-white/10" />
          <div className="w-2 h-2 rounded-full bg-white/10" />
        </div>
        <div className="flex-1 h-4 rounded bg-white/[0.03] max-w-[180px]" />
      </div>

      {/* Mock website content */}
      <div className="p-4 md:p-5">
        {/* Navigation bar */}
        <div className="flex items-center gap-3 mb-5">
          <div
            className="w-6 h-6 rounded"
            style={{ backgroundColor: `${design.accentColor}18` }}
          />
          <div className="flex gap-2.5 ml-auto">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="w-7 h-1.5 rounded-full bg-white/[0.06]" />
            ))}
          </div>
        </div>

        {/* Hero area */}
        <div className="flex gap-4 mb-4">
          <div className="flex-1">
            {/* Tagline */}
            <div className="h-2 w-20 rounded-full bg-white/[0.06] mb-2" />
            {/* Heading lines */}
            <div className="h-4 w-full rounded bg-white/[0.07] mb-1.5" />
            <div className="h-4 w-3/4 rounded bg-white/[0.05] mb-3" />
            {/* Body text */}
            <div className="h-1.5 w-full rounded-full bg-white/[0.04] mb-1" />
            <div className="h-1.5 w-4/5 rounded-full bg-white/[0.03] mb-3" />
            {/* CTA button */}
            <div
              className="h-6 w-20 rounded-md"
              style={{
                backgroundColor: `${design.accentColor}20`,
                border: `1px solid ${design.accentColor}30`,
              }}
            />
          </div>

          {/* Hero image placeholder */}
          <div className="hidden md:block w-2/5">
            <div
              className="w-full aspect-[4/3] rounded-lg"
              style={{
                backgroundColor: `${design.accentColor}06`,
                border: `1px solid ${design.accentColor}10`,
              }}
            >
              {/* Abstract shape inside */}
              <div className="h-full flex items-center justify-center">
                <div
                  className="w-10 h-10 rounded-full opacity-20"
                  style={{ backgroundColor: design.accentColor }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Feature cards row */}
        <div className="grid grid-cols-3 gap-2">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="h-10 md:h-12 rounded-lg border border-white/[0.04] bg-white/[0.015] p-2 flex flex-col justify-center"
            >
              <div
                className="w-4 h-3 rounded mb-1"
                style={{ backgroundColor: `${design.accentColor}12` }}
              />
              <div className="h-1 w-full rounded-full bg-white/[0.04]" />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom glow on hover */}
      <div
        className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-3/4 h-20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"
        style={{ backgroundColor: `${design.accentColor}12` }}
      />
    </div>
  )
}

/* ─── Main Component ─────────────────────────────────────────── */

export function WebShowcase() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!sectionRef.current) return

    const ctx = gsap.context(() => {
      // Section heading reveal
      const headings = Array.from(
        sectionRef.current!.querySelectorAll('.section-reveal')
      )
      gsap.from(headings, {
        y: 50,
        opacity: 0,
        stagger: 0.12,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // Cards staggered reveal
      const cards = Array.from(
        sectionRef.current!.querySelectorAll<HTMLElement>('.web-card')
      )
      gsap.from(cards, {
        y: 60,
        opacity: 0,
        scale: 0.95,
        stagger: 0.15,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: cards[0] || sectionRef.current,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-16 md:py-24 px-[5vw]">
      <div className="max-w-7xl mx-auto">
        {/* Section header */}
        <span className="section-reveal block text-[0.7rem] font-semibold tracking-[0.2em] uppercase text-white/50 mb-4">
          Web Development
        </span>
        <h2 className="section-reveal font-display text-[clamp(2rem,4vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-text-on-dark mb-4">
          Websites that convert &amp; scale
        </h2>
        <p className="section-reveal text-[1.05rem] leading-[1.65] text-white/50 max-w-[55ch] mb-12">
          High-performance websites and web applications built with modern
          frameworks. Designed to convert visitors into customers and scale with
          your business.
        </p>

        {/* Web design showcase grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {WEB_DESIGNS.map((design, i) => (
            <div key={i} className="web-card group">
              <WebMockup design={design} />

              <div className="mt-5">
                <h3 className="font-display text-[1.25rem] text-text-on-dark mb-2 leading-tight">
                  {design.title}
                </h3>
                <p className="text-[0.85rem] leading-[1.65] text-white/50 mb-3">
                  {design.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {design.tags.map((tag, j) => (
                    <span
                      key={j}
                      className="text-[0.68rem] font-semibold tracking-[0.05em] px-2.5 py-1 rounded-md border"
                      style={{
                        color: `${design.accentColor}cc`,
                        backgroundColor: `${design.accentColor}08`,
                        borderColor: `${design.accentColor}15`,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-14 text-center">
          <a
            href="#contact"
            className="inline-block px-8 py-4 text-[0.85rem] font-semibold tracking-[0.08em] uppercase border border-white/30 text-white rounded-full transition-all hover:bg-white/10 hover:border-white/50"
          >
            See Our Work
          </a>
        </div>
      </div>
    </section>
  )
}
