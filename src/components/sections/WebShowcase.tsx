'use client'

import { useEffect, useRef, useCallback } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GlowingEffect } from '@/components/ui/glowing-effect'

gsap.registerPlugin(ScrollTrigger)

/* ─── Web Design Showcase Data ───────────────────────────────── */

const WEB_DESIGNS = [
  {
    label: 'AI & Tech',
    videoSrc: '/videos/ai-tech-showcase.mp4',
    accentColor: '#3b82f6',
  },
  {
    label: 'SaaS Platforms',
    videoSrc: '/videos/ecommerce-showcase.mp4',
    accentColor: '#10b981',
  },
  {
    label: 'E-Commerce',
    videoSrc: '/videos/saas-showcase.mp4',
    accentColor: '#a855f7',
  },
]

/* ─── Video Card Component ────────────────────────────────────── */

function VideoCard({
  design,
  isCenter,
}: {
  design: (typeof WEB_DESIGNS)[number]
  isCenter: boolean
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const video = videoRef.current
    const container = containerRef.current
    if (!video || !container) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { threshold: 0.15 }
    )
    observer.observe(container)
    return () => observer.disconnect()
  }, [])

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (window.innerWidth < 1024) return
      const rect = e.currentTarget.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width - 0.5
      const y = (e.clientY - rect.top) / rect.height - 0.5
      e.currentTarget.style.transform = `perspective(1000px) rotateX(${y * -4}deg) rotateY(${x * 4}deg) scale(1.015)`
    },
    []
  )

  const handleMouseLeave = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.currentTarget.style.transform =
        'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
    },
    []
  )

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`
        relative w-full overflow-hidden transition-all duration-500 ease-out will-change-transform
        rounded-[20px] border border-white/[0.08]
        group-hover:border-white/[0.18]
        ${isCenter ? 'lg:scale-[1.03] lg:shadow-2xl lg:shadow-white/[0.02]' : ''}
      `}
      style={{ transformStyle: 'preserve-3d' }}
    >
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={2}
      />

      {/* Browser chrome */}
      <div className="flex items-center gap-2.5 px-4 py-2 border-b border-white/[0.05] bg-[#0d0d0f]/80 backdrop-blur-md">
        <div className="flex gap-[6px]">
          <div className="w-[10px] h-[10px] rounded-full bg-[#ff5f57]/70 transition-colors duration-200 group-hover:bg-[#ff5f57]" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#febc2e]/70 transition-colors duration-200 group-hover:bg-[#febc2e]" />
          <div className="w-[10px] h-[10px] rounded-full bg-[#28c840]/70 transition-colors duration-200 group-hover:bg-[#28c840]" />
        </div>
        <div className="flex-1 h-[22px] rounded-lg bg-white/[0.03] max-w-[180px] mx-auto flex items-center justify-center gap-1.5">
          <svg className="w-3 h-3 text-white/20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 11c0-1.1.9-2 2-2h2a2 2 0 012 2v1a2 2 0 01-2 2h-2a2 2 0 01-2-2v-1z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 5h14a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2z" />
          </svg>
          <div className="h-[5px] w-14 rounded-full bg-white/[0.06]" />
        </div>
        <div className="w-[62px] flex justify-end gap-1.5">
          <div className="w-[14px] h-[14px] rounded-sm bg-white/[0.04]" />
          <div className="w-[14px] h-[14px] rounded-sm bg-white/[0.04]" />
        </div>
      </div>

      {/* Video content area */}
      <div className="relative aspect-[16/10] overflow-hidden bg-[#080809]">
        <video
          ref={videoRef}
          src={design.videoSrc}
          autoPlay
          loop
          muted
          playsInline
          preload="metadata"
          className="w-full h-full object-cover object-top"
        />

        {/* Soft vignette edges */}
        <div className="pointer-events-none absolute inset-0 shadow-[inset_0_0_30px_rgba(0,0,0,0.3)]" />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-black/10" />
      </div>

      {/* Label overlay — bottom of card */}
      <div className="absolute bottom-0 left-0 right-0 pointer-events-none">
        <div className="flex items-center justify-between px-5 py-3 bg-gradient-to-t from-black/70 via-black/30 to-transparent">
          <span className="text-[0.72rem] font-medium tracking-[0.15em] uppercase text-white/60">
            {design.label}
          </span>
          <div
            className="w-1.5 h-1.5 rounded-full opacity-60"
            style={{ backgroundColor: design.accentColor }}
          />
        </div>
      </div>

      {/* Accent glow on hover */}
      <div
        className="pointer-events-none absolute -bottom-6 left-1/2 -translate-x-1/2 w-2/3 h-20 rounded-full blur-3xl opacity-0 group-hover:opacity-40 transition-opacity duration-700"
        style={{ backgroundColor: design.accentColor }}
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
      // Header reveal
      const headings = Array.from(
        sectionRef.current!.querySelectorAll('.section-reveal')
      )
      gsap.from(headings, {
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      })

      // Cards entrance — staggered with depth
      const cards = Array.from(
        sectionRef.current!.querySelectorAll<HTMLElement>('.web-card')
      )

      cards.forEach((card, i) => {
        // Entrance animation
        gsap.from(card, {
          y: 100 + i * 20,
          opacity: 0,
          scale: 0.9,
          rotateY: i === 0 ? 6 : i === 2 ? -6 : 0,
          duration: 1.1,
          delay: i * 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: cards[0] || sectionRef.current,
            start: 'top 88%',
            toggleActions: 'play none none none',
          },
          onComplete: () => {
            card.style.transform = ''
          },
        })

        // Parallax drift
        gsap.to(card, {
          y: i === 1 ? -25 : -12,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top bottom',
            end: 'bottom top',
            scrub: 0.5,
          },
        })
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative py-16 md:py-28 px-[5vw]">
      <div className="max-w-7xl mx-auto">
        {/* Section header — centered for premium feel */}
        <div className="text-center mb-16 md:mb-20">
          <span className="section-reveal inline-block text-[0.7rem] font-semibold tracking-[0.25em] uppercase text-violet-400/70 mb-5">
            Web Development
          </span>
          <h2 className="section-reveal font-display text-[clamp(2rem,4.5vw,3.8rem)] font-normal leading-[1.05] tracking-[-0.03em] text-text-on-dark mb-5">
            Websites that convert &amp; scale
          </h2>
          <p className="section-reveal text-[1rem] leading-[1.7] text-white/40 max-w-[48ch] mx-auto">
            Modern, high-performance web experiences crafted with precision.
          </p>
        </div>

        {/* Showcase grid — 3 cards, center elevated */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6 lg:items-center">
          {WEB_DESIGNS.map((design, i) => (
            <div
              key={i}
              className={`web-card group ${i === 1 ? 'lg:-mt-4' : 'lg:mt-4'}`}
              style={{ perspective: '1000px' }}
            >
              <VideoCard design={design} isCenter={i === 1} />
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 md:mt-20 text-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2.5 px-8 py-4 text-[0.8rem] font-semibold tracking-[0.1em] uppercase border border-white/20 text-white/80 rounded-full cursor-pointer transition-all duration-400 hover:bg-white/[0.06] hover:border-white/40 hover:text-white hover:scale-[1.03]"
          >
            <span>View All Projects</span>
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </div>
      </div>
    </section>
  )
}
