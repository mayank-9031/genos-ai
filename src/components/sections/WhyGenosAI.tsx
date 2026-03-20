'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const CONTENT_BLOCKS = [
  {
    image: '/images/why-genosai/ai-abstract-purple.jpg',
    alt: 'GenosAI AI automation systems and intelligent workflow technology',
    text: 'GenosAI\'s expertise spans multiple domains, including conversational AI, voice and image processing, recommendation systems, and automated decision engines. Every solution we build integrates seamlessly into existing operations, helping organisations work smarter, reduce inefficiencies, and make faster, more informed decisions.',
  },
  {
    image: '/images/why-genosai/ai-blue-orb.jpg',
    alt: 'GenosAI AI-powered data processing and intelligence platform',
    text: 'At GenosAI, our team goes beyond development. We are problem-solvers, thinkers, and innovators. Engineers, data scientists, designers, and AI specialists bring years of hands-on experience creating high-performing digital systems. We welcome challenges that require creative thinking and technical rigor.',
  },
  {
    image: '/images/why-genosai/ai-brain-neural.jpg',
    alt: 'GenosAI neural networks and deep learning technology',
    text: 'GenosAI focuses on AI that understands real-world complexity. Our systems adapt to changing environments, handle imperfect data, and scale as your organisation grows. We value transparency, accountability, and collaboration, ensuring every project meets client needs while maintaining long-term reliability.',
  },
]

const CONTENT_BLOCKS_ROW2 = [
  {
    image: '/images/why-genosai/ai-chatbot.jpg',
    alt: 'GenosAI chatbot and conversational AI systems',
    text: 'Choosing GenosAI means partnering with a team that understands modern business realities. We create AI solutions that are dependable, practical, and built for everyday use, not just for demos. Our systems are engineered to handle production workloads from day one.',
  },
  {
    image: '/images/why-genosai/ai-applications.jpg',
    alt: 'GenosAI enterprise AI applications and solutions',
    text: 'GenosAI\'s solutions handle complex data, high usage, and changing requirements, providing businesses with intelligence that is actionable and reliable. We combine deep technical expertise with a clear understanding of operational needs to deliver systems that truly perform.',
  },
]

export function WhyGenosAI() {
  const sectionRef = useRef<HTMLElement>(null)
  const headerRef = useRef<HTMLDivElement>(null)
  const row1Ref = useRef<HTMLDivElement>(null)
  const row2Ref = useRef<HTMLDivElement>(null)
  const row3Ref = useRef<HTMLDivElement>(null)
  const partnerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(headerRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.9,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: headerRef.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })

      // Row 1: each image slides in from a different direction
      // Directions: left, bottom, right
      const row1Directions = [
        { x: -120, y: 0 },   // from left
        { x: 0, y: 120 },    // from bottom
        { x: 120, y: 0 },    // from right
      ]

      if (row1Ref.current) {
        const row1Items = row1Ref.current.querySelectorAll('.reveal-item')
        row1Items.forEach((item, i) => {
          const dir = row1Directions[i] || { x: 0, y: 120 }
          gsap.from(item, {
            x: dir.x,
            y: dir.y,
            opacity: 0,
            duration: 1,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          })
        })
      }

      // Row 2: each image slides in from a different direction
      // Directions: top, right
      const row2Directions = [
        { x: 0, y: -120 },   // from top
        { x: 120, y: 0 },    // from right
      ]

      if (row2Ref.current) {
        const row2Items = row2Ref.current.querySelectorAll('.reveal-item')
        row2Items.forEach((item, i) => {
          const dir = row2Directions[i] || { x: 0, y: 120 }
          gsap.from(item, {
            x: dir.x,
            y: dir.y,
            opacity: 0,
            duration: 1,
            delay: i * 0.15,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          })
        })
      }

      // Row 3: standalone text - slide from left
      if (row3Ref.current) {
        gsap.from(row3Ref.current, {
          x: -100,
          opacity: 0,
          duration: 0.9,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: row3Ref.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        })
      }

      // Partner block
      if (partnerRef.current) {
        const partnerItems = partnerRef.current.querySelectorAll('.reveal-item')
        const partnerDirs = [
          { x: -100, y: 0 },  // from left
          { x: 100, y: 0 },   // from right
        ]
        partnerItems.forEach((item, i) => {
          const dir = partnerDirs[i] || { x: 0, y: 80 }
          gsap.from(item, {
            x: dir.x,
            y: dir.y,
            opacity: 0,
            duration: 0.9,
            delay: i * 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%',
              toggleActions: 'play none none reverse',
            },
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} id="why-us" className="relative py-20 md:py-32 px-[5vw]" aria-label="Why Teams Choose GenosAI">
      {/* Background ambient glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute left-1/2 top-1/3 -translate-x-1/2 h-[60vh] w-[70vw] rounded-full bg-[radial-gradient(ellipse_at_center,rgba(139,92,246,0.06),transparent_60%)] blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div ref={headerRef} className="text-center mb-20">
          <span className="inline-block text-[0.7rem] font-semibold tracking-[0.25em] uppercase text-violet-400/70 mb-4">
            Your Trusted AI Partner
          </span>
          <h2 className="font-display text-[clamp(2rem,4.5vw,3.5rem)] font-normal leading-[1.05] tracking-[-0.02em] text-text-on-dark mb-5">
            Why Teams Choose GenosAI
          </h2>
          <p className="text-[1.05rem] leading-[1.65] text-white/50 max-w-[60ch] mx-auto">
            We combine deep technical expertise with a clear understanding of operational needs.
            Our AI solutions are dependable, practical, and built for everyday use, not just for demos.
          </p>
        </div>

        {/* Row 1: 3-column staggered image + text grid */}
        <div ref={row1Ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-8">
          {CONTENT_BLOCKS.map((block, i) => (
            <div key={i} className="reveal-item">
              <div className="relative group">
                <div className="relative overflow-hidden rounded-2xl mb-5">
                  <img
                    src={block.image}
                    alt={block.alt}
                    className="w-full h-[320px] md:h-[400px] lg:h-[480px] object-cover transition-all duration-700 group-hover:scale-[1.04] group-hover:brightness-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-white/0 transition-all duration-500 group-hover:ring-violet-400/20 pointer-events-none" />
                </div>
              </div>
              <p className="text-[0.92rem] leading-[1.75] text-white/45 transition-colors duration-300 group-hover:text-white/55">
                {block.text}
              </p>
            </div>
          ))}
        </div>

        {/* Row 2: 2-column layout */}
        <div ref={row2Ref} className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-8">
          {CONTENT_BLOCKS_ROW2.map((block, i) => (
            <div key={i} className="reveal-item">
              <div className="relative group">
                <div className="relative overflow-hidden rounded-2xl mb-5">
                  <img
                    src={block.image}
                    alt={block.alt}
                    className="w-full h-[320px] md:h-[400px] object-cover transition-all duration-700 group-hover:scale-[1.04] group-hover:brightness-110"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 rounded-2xl ring-1 ring-white/0 transition-all duration-500 group-hover:ring-violet-400/20 pointer-events-none" />
                </div>
              </div>
              <p className="text-[0.92rem] leading-[1.75] text-white/45 transition-colors duration-300 group-hover:text-white/55">
                {block.text}
              </p>
            </div>
          ))}
        </div>

        {/* Standalone text block */}
        <div ref={row3Ref} className="mb-20">
          <p className="text-[1rem] leading-[1.8] text-white/40 max-w-3xl">
            GenosAI helps organisations reduce manual work, improve decision-making, and increase overall efficiency. With 50+ projects delivered, a 98% client retention rate, and operations spanning 5 countries, GenosAI has established itself as one of the most reliable AI automation partners for growth-focused businesses worldwide.
          </p>
        </div>

        {/* Partner Section */}
        <div ref={partnerRef} className="grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-10 lg:gap-16 items-start">
          <div className="reveal-item">
            <span className="inline-block text-[0.7rem] font-semibold tracking-[0.25em] uppercase text-violet-400/60 mb-4">
              Your Trusted AI Partner
            </span>
            <h3 className="font-display text-[clamp(1.6rem,3.5vw,2.5rem)] font-normal leading-[1.1] tracking-[-0.02em] text-text-on-dark">
              Your AI development partner, building systems that work.
            </h3>
          </div>
          <div className="reveal-item">
            <p className="text-[1rem] leading-[1.8] text-white/45">
              GenosAI is a focused AI development company building intelligent systems that solve real-world business problems. We bring deep experience delivering complex software solutions, combining strong engineering with advanced AI technologies to create products and services that are innovative, practical, reliable, and scalable. From conversational assistants to automated decision engines, every system we build is designed to function reliably in production environments, because that is where it matters most.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
